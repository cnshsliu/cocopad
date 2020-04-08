'use strict'
const BossWS = {};
BossWS.BossWS = null;
BossWS.url = "ws://localhost:5008/grume/wsquux";
BossWS.isReused = false;
BossWS.connectTimes = 0;

BossWS.reconnectInterval = null;
BossWS.resetReconnectCount = function () {
    BossWS.connectTimes = 0;
}
BossWS.reconnect = function reconnect() {
    if (BossWS.keepFlag === 'KEEP') {
        BossWS.BossWS = null;
        BossWS.start(BossWS.onOpenCallback, BossWS.onMsgcallback, 0, BossWS.name, BossWS.keepFlag);
    }
}
BossWS.start = async (onOpenCallback, onMsgcallback, delay, name, keepFlag) => {
    if (delay > 0)
        await new Promise(resolve => setTimeout(resolve, delay));
    if (keepFlag === true) {
        console.warn("It should be better to use BOSSWS in NO-AUTO-RECONNECT mode");
    }
    BossWS.onOpenCallback = onOpenCallback;
    BossWS.onMsgcallback = onMsgcallback;
    BossWS.name = name;
    BossWS.keepFlag = keepFlag;
    if (BossWS.BossWS === null || (BossWS.BossWS && (BossWS.BossWS.readyState === 2 || BossWS.BossWS.readyState === 3))) {
        if (BossWS.BossWS) delete BossWS.BossWS;
        BossWS.BossWS = new WebSocket(BossWS.url);
        BossWS.isReused = false;
        BossWS.resetReconnectCount();
    } else {
        BossWS.isReused = true;
        console.info("BossWS>>> BossWS connection is reused");
    }
    BossWS.BossWS.onopen = function () {
        console.info("BossWS>>> BossWS opened. name:", BossWS.name, "flag:", BossWS.keepFlag);
        //成功连接后，把继续重连的interval清除掉
        BossWS.isReused = false;
        BossWS.connectTimes += 1;
        if (BossWS.reconnectInterval != null) {
            clearInterval(BossWS.reconnectInterval);
            BossWS.reconnectInterval = null;
        }
        onOpenCallback();
    };
    BossWS.BossWS.onclose = function () {
        console.info("BossWS>>> BossWS closed. name:", BossWS.name, "flag:", BossWS.keepFlag);
        if (BossWS.reconnectInterval === null && keepFlag === 'KEEP') {
            BossWS.reconnectInterval = setInterval(BossWS.reconnect, 1000);
        }
    };
    BossWS.BossWS.onmessage = function (e) {
        onMsgcallback(e.data);
    };
    BossWS.BossWS.onerror = function (e) {
        console.error("BossWS>>> ", e);
    };
    if (BossWS.isReused) {
        //重用时,onopen不会被触发,因此这里直接调用onOpenCallback()
        console.info("BossWS>>> resue connection, call onopencallback directly");
        //同样,因为onopen不会发生,所以,重置连接技术为1,只能在这里手动完成
        BossWS.connectTimes = 1;
        onOpenCallback();
    }
};

BossWS.close = () => {
    BossWS.BossWS.close();
};

BossWS.put = async (cmd, payload) => {
    payload.cmd = cmd;
    let cocouserStr = localStorage.getItem("cocouser");
    let shareCode = localStorage.getItem("shareCode");
    if (cocouserStr) {
        if (cmd !== 'MOUSE')
            payload.Auth = JSON.parse(cocouserStr)["sessionToken"];
    }
    if (shareCode) {
        //只要用户没有正式注册，就一直带着带着这个sharecode
        //而且如果本地保存有别人分享的sharecode1的话，就一直待到服务器上
        //当用户执行register操作时，如果同时有sharecode,就去检查是谁share的，然后给这个人加分
        //anyway， 注册完成后，总要检查并删除本地的sharecode
        payload.shareCode = shareCode;
    }
    // console.log('readystate=' + BossWS.BossWS.readyState);
    let ret = false;
    if (BossWS.BossWS.readyState === 1) {
        await BossWS.BossWS.send(JSON.stringify(payload));
        ret = true;
    }
    // console.log("return " + ret);
    return ret;
};
export default BossWS;