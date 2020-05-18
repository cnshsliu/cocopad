// import "./importjquery";
import bent from "bent";
import "regenerator-runtime/runtime";
// import imageCompression from 'browser-image-compression';
// import { SVG } from "@svgdotjs/svg.js";
// import "jquery-ui-dist/jquery-ui.js";
// import OSS from "ossnolookup";
// import COS from "cos-js-sdk-v5";
import suuid from "short-uuid";
import Bowser from "../lib/bowser/bowser";
// import Quill from 'quill';
// import { QuillDeltaToHtmlConverter } from '../lib/quill/quill2html/quill2html';
import { gzip, ungzip } from "../lib/gzip";
import AIXJ from "./aixj";
import assetIcons from './assetIcons';
import avatarIcons from './avatarIcons';
import BossWS from "./bossws";
// import uuidv4 from "uuid/v4";
// import "./fontpicker/jquery.fontpicker";
// import "./minimap/jquery-minimap";
import cocoConfig from "./cococonfig";
import RegHelper from "./reghelper";
import SHARE from "./sharemanage";
import SVGs from "./svgs";
import Validator from "./validator";
// import { BIconFileEarmarkBreak } from "bootstrap-vue";
import RtcCommon from './Web/js/common';
import RtcClient from './Web/js/rtc-client';
import ShareClient from './Web/js/share-client';
import WS from "./ws";
const TRTC = require('./Web/js/trtc');



Quill.prototype.getHtml = function () {
    return this.container.querySelector(".ql-editor").innerHTML;
};
Array.prototype.clear = function () {
    this.splice(0, this.length);
};
Array.prototype.remove = function () {
    var what,
        a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
jlog = function (obj) {
    console.log(JSON.stringify(obj));
};
jstr = function (obj) {
    return JSON.stringify(obj);
};

const NotSetOrFalse = function (val) {
    return NotSet(val) || val === false;
}
const NotSet = function (val) {
    if (val === undefined || val === null) return true;
    else return false;
};
const IsSet = function (val) {
    return !NotSet(val);
};
const IsBlank = function (val) {
    if (val === undefined || val === null || val === "") return true;
    else return false;
};
const NotBlank = function (val) {
    return !IsBlank(val);
};
const IsFalse = function (val) {
    if (val === undefined || val === null || val === false) return true;
    else return false;
};

const KFK = {};
KFK.config = cocoConfig;
KFK.duringVideo = false;
KFK.pct = 1; //Peers count;
KFK.accordion = {};
KFK.rtcUsers = {};
KFK.noCopyPaste = false;
KFK.touchChatTodo = false;
KFK.todoShown = true;
KFK.todoMouseIn = false;
KFK.scaleRatio = 1;
KFK.currentPage = 0;
KFK.loadedProjectId = null;
KFK.keypool = "";
KFK.showStatus = {};
KFK.QUICKGLANCE = false;
KFK.svgDraw = null; //画svg的画布
KFK.jumpStack = [];
KFK.isFreeHandDrawing = false;
KFK.isShowingModal = false;
KFK.jumpStackPointer = -1;
KFK.wsTryTimesBeforeGiveup = 60;
KFK.idRowMap = {};
KFK.idSwitchMap = {};
KFK.FROM_SERVER = true; //三个常量
KFK.FROM_CLIENT = false;
KFK.NO_SHIFT = false;
KFK.badgeTimers = {}; //用于存放用户badge显示间隔控制的timer，这样，不是每一个mousemove都要上传，在Timer内，只上传最后一次mouse位置
KFK.updateReceived = 0; //记录接收到的其他用户的改动次数，在startActiveLogWatcher中，使用这个数字来控制是否到服务器端去拉取更新列表
KFK.tempSvgLine = null; //这条线是在划线或者链接node时，那条随着鼠标移动的线
KFK.LOGLEVEL_ERROR = 1;
KFK.LOGLEVEL_WARN = 2;
KFK.LOGLEVEL_INFO = 3;
KFK.LOGLEVEL_DEBUG = 4;
KFK.LOGLEVEL_DETAIL = 5;
KFK.LOGLEVEL_NOTHING = 0;
KFK.autoScroll = {};
KFK.

document.onpaste = KFK.onPaste;
document.oncopy = KFK.onCopy;
document.oncut = KFK.onCut;

let urlFull = window.location.href;
let host = $(location).attr("host");
let protocol = $(location).attr("protocol");
KFK.urlBase = protocol + "//" + host + cocoConfig.product.basedir;
let urlSearch = window.location.search;
let urlPath = window.location.pathname;
WS.remoteEndpoint = cocoConfig.ws_server.endpoint.url;
BossWS.remoteEndpoint = cocoConfig.ws_server.endpoint.url;
if (urlSearch.startsWith("?dou=")) {
    KFK.urlMode = "sharecode";
    KFK.shareCode = urlSearch.substr(5);
    KFK.debug("Sharecode in URL", KFK.shareCode);
    // window.history.replaceState({}, null, KFK.urlBase);
} else if (urlSearch.startsWith("?r=")) {
    KFK.debug("Ivtcode in URL");
    KFK.urlMode = "ivtcode";
    KFK.shareCode = urlSearch.substr(3);
    window.history.replaceState({}, null, KFK.urlBase);
} else if (urlPath.startsWith("/reg") || urlPath.startsWith('/signup')) {
    KFK.urlMode = "gotoRegister";
    console.log('KFK.gotoRegister.....');
    window.history.replaceState({}, null, KFK.urlBase);
} else if (urlPath.startsWith("/signin")) {
    KFK.urlMode = "gotoSignin";
    console.log('KFK.gotoRegister.....');
    window.history.replaceState({}, null, KFK.urlBase);
} else {
    window.history.replaceState({}, null, KFK.urlBase);
}
KFK.debug("Path:", urlPath, "Search:", urlSearch, "Mode:", KFK.urlMode);

export default KFK;