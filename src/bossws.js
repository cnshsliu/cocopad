'use strict'
import cocoConfig from "./cococonfig";
const WS = {};
const BOSSWS = {};
BOSSWS.ws = null;
BOSSWS.url = cocoConfig.backend.endpoint;
BOSSWS.isReused = false;
BOSSWS.connectTimes = 0;

BOSSWS.reconnectTimeout = null;
BOSSWS.resetReconnectCount = function () {
    BOSSWS.connectTimes = 0;
}
BOSSWS.reconnect = function reconnect() {
    if (BOSSWS.keepFlag === 'KEEP') {
        BOSSWS.start(BOSSWS.onOpenCallback, BOSSWS.onMsgcallback, 0, BOSSWS.name, BOSSWS.keepFlag);
    }
}
BOSSWS.start = async (onOpenCallback, onMsgcallback, delay, name, keepFlag) => {
    console.log("!!!! Entered BOSSWS.start...");
    if (delay > 0)
        await new Promise(resolve => setTimeout(resolve, delay));
    BOSSWS.onOpenCallback = onOpenCallback;
    BOSSWS.onMsgcallback = onMsgcallback;
    BOSSWS.name = name;
    BOSSWS.keepFlag = keepFlag;
    if (BOSSWS.ws === null || (BOSSWS.ws && (BOSSWS.ws.readyState !== 1))) {
        if (BOSSWS.ws) {
            console.log("terminate existing BOSSWS.ws");
            BOSSWS.ws.close();
            if (BOSSWS.reconnectTimeout != null) {
                clearTimeout(BOSSWS.reconnectTimeout);
                BOSSWS.reconnectTimeout = null;
            }
        }
        BOSSWS.ws = new WebSocket(BOSSWS.url);
        BOSSWS.isReused = false;
        BOSSWS.resetReconnectCount();
    } else {
        BOSSWS.isReused = true;
        console.info("BOSSWS>>> ws connection is reused");
    }
    BOSSWS.ws.onopen = function () {
        console.info("BOSSWS>>> ws opened. name:", BOSSWS.name, "flag:", BOSSWS.keepFlag);
        //成功连接后，把继续重连的interval清除掉
        BOSSWS.isReused = false;
        BOSSWS.connectTimes += 1;
        if (BOSSWS.reconnectTimeout != null) {
            clearTimeout(BOSSWS.reconnectTimeout);
            BOSSWS.reconnectTimeout = null;
        }
        onOpenCallback();
    };
    BOSSWS.ws.onclose = function () {
        console.log("onclose");
        if (BOSSWS.reconnectTimeout === null && keepFlag === 'KEEP') {
            console.info("set reconnect interval ame:", BOSSWS.name, "flag:", BOSSWS.keepFlag, 'Reconnect>', keepFlag === 'KEEP' ? 'YES' : 'NO');
            BOSSWS.reconnectTimeout = setTimeout(BOSSWS.reconnect, 1000);
        } else {
            console.log("No reconnect, because no KEEP or reconnectTimeout is not null");

        }
    };
    BOSSWS.ws.onmessage = function (e) {
        onMsgcallback(e.data);
    };
    BOSSWS.ws.onerror = function (e) {
        console.log("BOSSWS>>> error occured, close it");
        BOSSWS.ws.close();
    };
    if (BOSSWS.isReused) {
        //重用时,onopen不会被触发,因此这里直接调用onOpenCallback()
        console.info("BOSSWS>>> resue connection, call onopencallback directly");
        //同样,因为onopen不会发生,所以,重置连接技术为1,只能在这里手动完成
        BOSSWS.connectTimes = 1;
        onOpenCallback();
    }
};

BOSSWS.close = () => {
    BOSSWS.ws.close();
};

BOSSWS.put = async (cmd, payload) => {
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
    // console.log('readystate=' + BOSSWS.ws.readyState);
    let ret = false;
    if (BOSSWS.ws.readyState === 1) {
        await BOSSWS.ws.send(JSON.stringify(payload));
        ret = true;
    }
    // console.log("return " + ret);
    return ret;
};
export default BOSSWS;