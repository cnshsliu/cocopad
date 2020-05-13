import presetting from './presetting';
import rtcCommon from './common';
const  TRTC  = require('./trtc');
presetting.init();

// check if browser is compatible with TRTC
TRTC.checkSystemRequirements().then(result => {
  if (!result) {
    alert('您的浏览器不兼容此应用！\n建议下载最新版Chrome浏览器');
    window.location.href = 'http://www.google.cn/chrome/';
  }
});

// setup logging stuffs
TRTC.Logger.setLogLevel(TRTC.Logger.LogLevel.DEBUG);
TRTC.Logger.enableUploadLog();

TRTC.getDevices()
  .then(devices => {
    devices.forEach(item => {
      console.log('device: ' + item.kind + ' ' + item.label + ' ' + item.deviceId);
    });
  })
  .catch(error => console.error('getDevices error observed ' + error));

// populate camera options
console.log("!!!!!!!!!!>>>>>>>!!!!!!!!!!");
TRTC.getCameras().then(devices => {
  console.log("withn in TRTC getCamers.............");
  devices.forEach(device => {
    if (!rtcCommon.cameraId) {
      rtcCommon.cameraId = device.deviceId;
    }
    let div = $('<div></div>');
    div.attr('id', device.deviceId);
    div.html(device.label);
    div.appendTo('#camera-option');
  });
});

// populate microphone options
TRTC.getMicrophones().then(devices => {
  devices.forEach(device => {
    if (!rtcCommon.micId) {
      rtcCommon.micId = device.deviceId;
    }
    let div = $('<div></div>');
    div.attr('id', device.deviceId);
    div.html(device.label);
    div.appendTo('#mic-option');
  });
});