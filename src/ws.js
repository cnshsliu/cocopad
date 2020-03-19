'use strict'
const WS = {};
WS.ws = null;
WS.url = "ws://localhost:5008/grume/wsquux";

WS.sleep =  function (delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { try { console.log('-------->return from sleep..'); resolve(1) } catch (e) { reject(0) } }, delay);
    })
};

WS.start = async (onOpen, callback) => {
    await WS.sleep(1000);
    WS.ws = new WebSocket(WS.url);
    WS.ws.onopen = function () {
        console.info(`ws opened to ${WS.url}`);
        onOpen();
    };
    WS.ws.onclose = function () {
        console.info(`ws close to ${WS.url}`);
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
    await WS.ws.send(JSON.stringify(payload));
};
export default WS;