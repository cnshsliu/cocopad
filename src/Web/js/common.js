import presetting from './presetting';
import KFK from '../../console';
const RtcCommon = {};
RtcCommon.isCamOn = true;
RtcCommon.isMicOn = true;
RtcCommon.isScreenOn = false;
RtcCommon.isJoined = true;
RtcCommon.rtc = null;
RtcCommon.share = null;
RtcCommon.shareUserId = '';
RtcCommon.cameraId = '';
RtcCommon.micId = '';


RtcCommon.join = () => {
    RtcCommon.rtc.join();
}

RtcCommon.leave = () => {
    console.log("Leave", RtcCommon.rtc.userId_);
    RtcCommon.rtc.leave();
    if (RtcCommon.share.isJoined_) {
        console.log("Leave", RtcCommon.share.userId_);
        RtcCommon.share.leave();
    }
}

RtcCommon.publish = () => {
    RtcCommon.rtc.publish();
}

RtcCommon.unpublish = () => {
    RtcCommon.rtc.unpublish();
}

RtcCommon.muteAudio = () => {
    RtcCommon.rtc.muteLocalAudio();
}

RtcCommon.unmuteAudio = () => {
    RtcCommon.rtc.unmuteLocalAudio();
}

RtcCommon.muteVideo = () => {
    // $('#mask_main').removeClass('noshow');
    RtcCommon.rtc.muteLocalVideo();
}

RtcCommon.unmuteVideo = () => {
    RtcCommon.rtc.unmuteLocalVideo();
    // $('#mask_main').addClass('noshow');
}

RtcCommon.startSharing = () => {
    RtcCommon.share.join();
}

RtcCommon.stopSharing = () => {
    RtcCommon.share.leave();
}

RtcCommon.setCameraId = (cameraId) => {
    RtcCommon.cameraId = cameraId;
    console.log('setCameraId: ' + RtcCommon.cameraId);
}

RtcCommon.setMicId = (micId) => {
    RtcCommon.micId = micId;
    console.log('setMicId: ' + RtcCommon.micId);
}

RtcCommon.addVideoView = (id, uid, isLocal = false) => {
    console.log(">>>>> addVideoView", id);
    let div = $('<div/>', {
        id: id,
        class: 'video-box',
        style: 'justify-content: center'
    });
    // div.appendTo('#video-grid');
    div.appendTo('#video-table');
    let userInfoDiv = $('<div/>', {
        class: 'rtc_member',
    });
    //设置监听
    div.click(() => {
        let mainVideo = $('.video-box').first();
        if (div.is(mainVideo)) {
            return;
        }
        //释放main-video grid-area
        // mainVideo.css('grid-area', 'auto/auto/auto/auto');
        RtcCommon.exchangeView(div, mainVideo);
        //将video-grid中第一个div设为main-video
        // $('.video-box').first().css('grid-area', '1/1/3/4');
        //chromeM71以下会自动暂停，手动唤醒
        if (RtcCommon.getBroswer().broswer == 'Chrome' && RtcCommon.getBroswer().version < '72') {
            RtcCommon.rtc.resumeStreams();
        }
    });
    if (uid !== RtcCommon.shareUserId) {
        RtcCommon.addMemberView(id, uid);
    }
}

RtcCommon.addMemberView = (vid, uid) => {
    console.log(">>>KFK ignored. Add memberView", uid);
    let memberElm = $('#member-me').clone();
    memberElm.attr('id', uid);
    let userName = KFK.rtcUsers[uid] ? KFK.rtcUsers[uid].name : uid;
    memberElm.find('div.member-id').html(userName);
    memberElm.appendTo($('#' + vid));
};

RtcCommon.removeView = (id) => {
    console.log(">>>RemoveView", id);
    let mainVideo = $('.video-box').first();
    let firstInTable = $('.video-table .video-box').first();
    let div = $('#' + id);
    if (div[0]) {
        if (div.is(mainVideo)) {
            RtcCommon.exchangeView(div, firstInTable);
            return;
        }
        div.remove();
    }
}

RtcCommon.exchangeView = (a, b) => {
    console.log(">>>Exchange view", a, b);
    var $div1 = $(a);
    var $div3 = $(b);
    var $temobj1 = $("<div></div>");
    var $temobj2 = $("<div></div>");
    $temobj1.insertBefore($div1);
    $temobj2.insertBefore($div3);
    $div1.insertAfter($temobj2);
    $div3.insertAfter($temobj1);
    $temobj1.remove();
    $temobj2.remove();
}

RtcCommon.isPC = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

RtcCommon.getCameraId = () => {
    console.log('selected RtcCommon.cameraId: ' + RtcCommon.cameraId);
    return RtcCommon.cameraId;
}

RtcCommon.getMicrophoneId = () => {
    console.log('selected microphoneId: ' + RtcCommon.micId);
    return RtcCommon.micId;
}

RtcCommon.throttle = (func, delay) => {
    var timer = null;
    var startTime = Date.now();
    return function () {
        var curTime = Date.now();
        var remaining = delay - (curTime - startTime);
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(() => {
                console.log('duplicate click');
            }, remaining);
        }
    };
}

RtcCommon.resetView = () => {
    RtcCommon.isCamOn = true;
    RtcCommon.isMicOn = true;
    RtcCommon.isScreenOn = false;
    RtcCommon.isJoined = true;
    $('.main-video-btns').addClass('noshow');
    $('#video-btn').attr('src', KFK.getFrontEndUrl('rtc/big-camera-on.png'));
    $('#mic-btn').attr('src', KFK.getFrontEndUrl('rtc/big-mic-on.png'));
    $('#screen-btn').attr('src', KFK.getFrontEndUrl('rtc/screen-off.png'));
    $('#member-me').find('.member-video-btn').attr('src', KFK.getFrontEndUrl('rtc/camera-on.png'));
    $('#member-me').find('.member-audio-btn').attr('src', KFK.getFrontEndUrl('rtc/mic-on.png'));
    // $('.mask_video').addClass('noshow');
}

RtcCommon.getBroswer = () => {
    var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
            (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
                (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
                    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
                        (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
                            (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (sys.edge) return { broswer: "Edge", version: sys.edge };
    if (sys.ie) return { broswer: "IE", version: sys.ie };
    if (sys.firefox) return { broswer: "Firefox", version: sys.firefox };
    if (sys.chrome) return { broswer: "Chrome", version: sys.chrome };
    if (sys.opera) return { broswer: "Opera", version: sys.opera };
    if (sys.safari) return { broswer: "Safari", version: sys.safari };

    return { broswer: "", version: "0" };
}

RtcCommon.isHidden = () => {
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    return document[hidden];
}

export default RtcCommon;