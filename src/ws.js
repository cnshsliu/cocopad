'use strict'
const WS = {};
WS.ws = null;
WS.url = "ws://localhost:5008/grume/wsquux";

WS.reconnectInterval = null;
WS.reconnect = function reconnect() {
    WS.start(WS.onOpen, WS.callback, 0);
}
WS.start = async (onOpen, callback, delay) => {
    WS.onOpen = onOpen;
    WS.callback = callback;
    if(delay>0)
        await new Promise(resolve => setTimeout(resolve, delay));
    console.log('connecting....');
    WS.ws = new WebSocket(WS.url);
    WS.ws.onopen = function () {
        // console.info(`ws opened to ${WS.url}`);
        console.log('connected');
        if (WS.reconnectInterval != null) {
            clearInterval(WS.reconnectInterval);
            WS.reconnectInterval = null;
        }
        onOpen();
    };
    WS.ws.onclose = function () {
        console.info(`ws close to ${WS.url}`);
        if (WS.reconnectInterval === null) {
            WS.reconnectInterval = setInterval(WS.reconnect, 1000);
        }
    };
    WS.ws.onmessage = function (e) {
        callback(e.data);
    };
    WS.ws.onerror = function (e) {
        console.error(e);
    };
};

WS.closeSocket = () => {
    WS.ws.close();
};


WS.put = async (cmd, payload) => {
    payload.cmd = cmd;
    console.log('readystate=' + WS.ws.readyState);
    let ret = false;
    if (WS.ws.readyState === 1) {
        await WS.ws.send(JSON.stringify(payload));
        ret = true;
    }
    console.log("return " + ret);
    return ret;
};
export default WS;