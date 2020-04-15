'use strict'
import suuid from "short-uuid";
const WS = {};
WS.ws = null;
WS.url = "ws://localhost:5008/grume/wsquux";
WS.isReused = false;
WS.connectTimes = 0;

WS.myuid = () => {
    return suuid.generate();
}
WS.reconnectTimeout = null;
WS.resetReconnectCount = function () {
    WS.connectTimes = 0;
}
WS.reconnectTries = 0;
WS.reconnect = function reconnect() {
    if (WS.keepFlag === 'KEEP') {
        WS.reconnectTries++;
        if (WS.reconnectTries > 60) {
            console.log('Give up');
        } else {
            WS.start(WS.onOpenCallback, WS.onMsgcallback, 0, WS.name, WS.keepFlag);
        }
    }
}
WS.start = async (onOpenCallback, onMsgcallback, delay, name, keepFlag) => {
    console.log("connect tries." + WS.reconnectTries);
    if (delay > 0)
        await new Promise(resolve => setTimeout(resolve, delay));
    WS.onOpenCallback = onOpenCallback;
    WS.onMsgcallback = onMsgcallback;
    WS.name = name;
    WS.keepFlag = keepFlag;
    if (WS.ws === null || (WS.ws && (WS.ws.readyState !== 1))) {
        if (WS.ws) {
            console.log("terminate existing WS.ws");
            WS.ws.close();
            if (WS.reconnectTimeout != null) {
                clearTimeout(WS.reconnectTimeout);
                WS.reconnectTimeout = null;
            }
        }
        WS.ws = new WebSocket(WS.url);
        WS.isReused = false;
        WS.resetReconnectCount();
    } else {
        WS.isReused = true;
        console.info("WS>>> ws connection is reused");
    }
    WS.ws.onopen = function () {
        console.info("WS>>> ws opened. name:", WS.name, "flag:", WS.keepFlag);
        //成功连接后，把继续重连的interval清除掉
        WS.isReused = false;
        WS.connectTimes += 1;
        if (WS.reconnectTimeout != null) {
            clearTimeout(WS.reconnectTimeout);
            WS.reconnectTimeout = null;
        }
        onOpenCallback();
        WS.sayHello();

    };
    WS.ws.onclose = function () {
        console.log("onclose");
        if (WS.reconnectTimeout === null && keepFlag === 'KEEP') {
            console.info("set reconnect interval ame:", WS.name, "flag:", WS.keepFlag, 'Reconnect>', keepFlag === 'KEEP' ? 'YES' : 'NO');
            WS.reconnectTimeout = setTimeout(WS.reconnect, 1000);
        } else {
            console.log("Not setTimeout, because reconnectTimeout is not null");

        }
    };
    WS.ws.onmessage = function (e) {
        onMsgcallback(e.data);
    };
    WS.ws.onerror = function (e) {
        console.log("WS>>> error occured, close it");
        WS.ws.close();
    };
    if (WS.isReused) {
        //重用时,onopen不会被触发,因此这里直接调用onOpenCallback()
        console.info("WS>>> resue connection, call onopencallback directly");
        //同样,因为onopen不会发生,所以,重置连接技术为1,只能在这里手动完成
        WS.connectTimes = 1;
        onOpenCallback();
        WS.sayHello();
    }
};

WS.close = () => {
    WS.ws.close();
};

WS.sayHello = async function () {
    let localSession = localStorage.getItem('lto');
    if (localSession === undefined || localSession === null) {
        localSession = WS.myuid();
        localStorage.setItem('lto', localSession);
    }
    WS.put('PONG', { lto: localSession });
}
WS.put = async (cmd, payload) => {
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
    // console.log('readystate=' + WS.ws.readyState);
    let ret = false;
    if (WS.ws.readyState === 1) {
        await WS.ws.send(JSON.stringify(payload));
        ret = true;
    }
    // console.log("return " + ret);
    return ret;
};
export default WS;