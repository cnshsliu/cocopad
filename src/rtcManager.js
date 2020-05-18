import RtcCommon from './Web/js/common';
import RtcClient from './Web/js/rtc-client';
import ShareClient from './Web/js/share-client';
const RtcManager = {};
const TRTC = require('./Web/js/trtc');
import KFK from './console';

RtcManager.initMediaDevices = async () => {
    // check if browser is compatible with TRTC
    TRTC.checkSystemRequirements().then(result => {
        if (!result) {
            alert('您的浏览器不兼容此应用！\n建议下载最新版Chrome浏览器');
            // window.location.href = 'http://www.google.cn/chrome/';
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
    TRTC.getCameras().then(devices => {
        $('#camera-option').empty();
        devices.forEach(device => {
            if (!RtcCommon.cameraId) {
                RtcCommon.cameraId = device.deviceId;
            }
            let div = $('<div></div>');
            div.attr('id', device.deviceId);
            div.addClass('simplehover');
            div.html(device.label);
            div.appendTo('#camera-option');
            div.on('click', (evt) => {
                RtcCommon.setCameraId($(evt.target).attr("id"));
            });
        });
    });

    // populate microphone options
    TRTC.getMicrophones().then(devices => {
        $('#mic-option').empty();
        devices.forEach(device => {
            if (!RtcCommon.micId) {
                RtcCommon.micId = device.deviceId;
            }
            let div = $('<div></div>');
            div.attr('id', device.deviceId);
            div.addClass('simplehover');
            div.html(device.label);
            div.appendTo('#mic-option');
            div.on('click', (evt) => {
                RtcCommon.setMicId(device.deviceId);
            });
        });
    });
};
RtcManager.stopVideoCall = async () => {
    if (KFK.duringVideo === true) {
        RtcCommon.leave();
        KFK.duringVideo = false;
        $('#video_room').addClass('noshow');
    }
};

RtcManager.startVideoCall = function (config, shareConfig) {
    RtcManager.rtcConfig = config;
    RtcManager.rtcShareConfig = shareConfig;
    KFK.show($('#video_room'));
    RtcManager.QC_RTC_login(false, options => {
        RtcCommon.rtc = new RtcClient(options);
        RtcCommon.join();
    });
    RtcManager.QC_RTC_login(true, options => {
        RtcCommon.shareUserId = options.userId;
        RtcCommon.share = new ShareClient(options);
    });
}


RtcManager.toggleScreenSharing = function () {
    if (RtcManager.lastScreenSharingClick !== undefined) return;
    RtcManager.lastScreenSharingClick = new Date().getTime();
    if (!TRTC.isScreenShareSupported()) {
        alert('当前浏览器不支持屏幕分享！');
        return;
    }
    if (RtcCommon.isScreenOn === true) {
        $('#screen-btn').attr('src', KFK.getFrontEndUrl('rtc/screen-off.png'));
        RtcCommon.stopSharing();
        RtcCommon.isScreenOn = false;
    } else {
        $('#screen-btn').attr('src', KFK.getFrontEndUrl('rtc/screen-on.png'));
        RtcCommon.startSharing();
        RtcCommon.isScreenOn = true;
    }
    setTimeout(function () {
        RtcManager.lastScreenSharingClick = undefined;
    }, 2000);
};

RtcManager.clickMainVideo = () => {
    //释放main-video grid-area
    // mainVideo.css('grid-area', 'auto/auto/auto/auto');
    RtcCommon.exchangeView($('#main-video'), mainVideo);
    //将video-grid中第一个div设为main-video
    // $('.video-box').first().css('grid-area', '1/1/3/4');
    //chromeM71以下会自动暂停，手动唤醒
    if (RtcCommon.getBroswer().broswer == 'Chrome' && RtcCommon.getBroswer().version < '72') {
        RtcCommon.rtc.resumeStreams();
    }
};

RtcManager.stopVideoCall = async () => {
    if (KFK.duringVideo === true) {
        RtcCommon.leave();
        KFK.duringVideo = false;
        $('#video_room').addClass('noshow');
    }
};

RtcManager.startVideoCall = function (config, shareConfig) {
    RtcManager.rtcConfig = config;
    RtcManager.rtcShareConfig = shareConfig;
    KFK.show($('#video_room'));
    RtcManager.QC_RTC_login(false, options => {
        RtcCommon.rtc = new RtcClient(options);
        RtcCommon.join();
    });
    RtcManager.QC_RTC_login(true, options => {
        RtcCommon.shareUserId = options.userId;
        RtcCommon.share = new ShareClient(options);
    });
}

RtcManager.QC_RTC_login = (share, callback) => {
    let userId = KFK.prepareUserIdForRTC(KFK.APP.model.cocouser.userid);
    if (share) {
        userId = 'share_' + userId;
        callback({
            sdkAppId: RtcManager.rtcConfig.sdkAppId,
            userId: userId,
            userSig: RtcManager.rtcShareConfig.userSig,
            roomId: KFK.APP.model.cocodoc.doc_id,
        });
    } else {
        callback({
            sdkAppId: RtcManager.rtcConfig.sdkAppId,
            userId: userId,
            userSig: RtcManager.rtcConfig.userSig,
            roomId: KFK.APP.model.cocodoc.doc_id,
        });
    }
};

RtcManager.switchCamera = function () {
    if (RtcCommon.isCamOn) {
        $('#video-btn').attr('src', KFK.getFrontEndUrl('rtc/big-camera-off.png'));
        $('#video-btn').attr('title', '打开摄像头');
        $('#member-me').find('.member-video-btn').attr('src', KFK.getFrontEndUrl('rtc/camera-off.png'));
        RtcCommon.isCamOn = false;
        RtcCommon.muteVideo();
    } else {
        $('#video-btn').attr('src', KFK.getFrontEndUrl('rtc/big-camera-on.png'));
        $('#video-btn').attr('title', '关闭摄像头');
        $('#member-me').find('.member-video-btn').attr('src', KFK.getFrontEndUrl('rtc/camera-on.png'));
        RtcCommon.isCamOn = true;
        RtcCommon.unmuteVideo();
    }
};

RtcManager.switchMic = function () {
    if (RtcCommon.isMicOn) {
        $('#mic-btn').attr('src', KFK.getFrontEndUrl('rtc/big-mic-off.png'));
        $('#mic-btn').attr('title', '打开麦克风');
        $('#member-me').find('.member-audio-btn').attr('src', KFK.getFrontEndUrl('rtc/mic-off.png'));
        RtcCommon.isMicOn = false;
        RtcCommon.muteAudio();
    } else {
        $('#mic-btn').attr('src', KFK.getFrontEndUrl('rtc/big-mic-on.png'));
        $('#mic-btn').attr('title', '关闭麦克风');
        $('#member-me').find('.member-audio-btn').attr('src', KFK.getFrontEndUrl('rtc/mic-on.png'));
        RtcCommon.isMicOn = true;
        RtcCommon.unmuteAudio();
    }
};
module.exports.RtcManager = RtcManager;

