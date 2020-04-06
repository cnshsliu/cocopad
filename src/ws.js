'use strict'
const WS = {};
WS.ws = null;
WS.url = "ws://localhost:5008/grume/wsquux";

WS.reconnectInterval = null;
WS.reconnect = function reconnect() {
    if (WS.keepFlag === 'KEEP')
        WS.start(WS.onOpenCallback, WS.onMsgcallback, 0, WS.name, WS.keepFlag);
}
WS.start = async (onOpenCallback, onMsgcallback, delay, name, keepFlag) => {
    WS.onOpenCallback = onOpenCallback;
    WS.onMsgcallback = onMsgcallback;
    WS.name = name;
    WS.keepFlag = keepFlag;
    if (delay > 0)
        await new Promise(resolve => setTimeout(resolve, delay));
    WS.ws = new WebSocket(WS.url);
    WS.ws.onopen = function () {
        console.info("ws opened. name:", WS.name, "flag:", WS.keepFlag);
        //成功连接后，把继续重连的interval清除掉
        if (WS.reconnectInterval != null) {
            clearInterval(WS.reconnectInterval);
            WS.reconnectInterval = null;
        }
        onOpenCallback();
    };
    WS.ws.onclose = function () {
        console.info("ws closed. name:", WS.name, "flag:", WS.keepFlag);
        if (WS.reconnectInterval === null && keepFlag === 'KEEP') {
            WS.reconnectInterval = setInterval(WS.reconnect, 1000);
        }
    };
    WS.ws.onmessage = function (e) {
        onMsgcallback(e.data);
    };
    WS.ws.onerror = function (e) {
        console.error(e);
    };
};

WS.close = () => {
    WS.ws.close();
};

WS.put = async (cmd, payload) => {
    payload.cmd = cmd;
    let cocouserStr = localStorage.getItem("cocouser");
    let sharecode = localStorage.getItem("sharecode");
    if (cocouserStr){
        if(cmd !== 'MOUSE')
        payload.Auth = JSON.parse(cocouserStr)["sessionToken"];
    }
    if(sharecode){
        //只要用户没有正式注册，就一直带着带着这个sharecode
        //而且如果本地保存有别人分享的sharecode1的话，就一直待到服务器上
        //当用户执行register操作时，如果同时有sharecode,就去检查是谁share的，然后给这个人加分
        //anyway， 注册完成后，总要检查并删除本地的sharecode
        payload.sharecode = sharecode;
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