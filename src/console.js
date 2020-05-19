// import "./importjquery";
// import bent from "bent";
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
import WS from "./ws";



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
KFK.isZoomingShape = false;
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
KFK.loglevel = KFK.LOGLEVEL_DETAIL; //控制log的等级, 级数越小，显示信息越少
//在designer页面输入logerror, logwarn, loginfo, lodebug...
KFK.designerConf = {
    scale: 1,
    left: 0,
    top: 0
}; //用于在zoom控制计算中
KFK.opstack = []; //Operation Stack, 数组中记录操作记录，用于undo/redo
KFK.opstacklen = 1000; //undo，redo记录次数
KFK.opz = -1; // opstack 当前记录指针
KFK.mouseTimer = null; //定时器用于控制鼠标移动上传的频次
KFK.WSReconnectTime = 0; //WebSocket重连的次数
KFK.currentView = "unknown";
KFK.lockTool = false;
KFK.WS = null;
KFK.C3 = null;
KFK.JC3 = null;
KFK.onC3 = false;
KFK.docDuringLoading = null;
KFK.inFullScreenMode = false;
KFK.inPresentingMode = false;
KFK.inOverviewMode = false;
KFK.controlButtonsOnly = false;
KFK.showRightTools = true;
KFK.zoomFactor = 0;
KFK.lineTransfomerDragging = false;
KFK.scaleBy = 1.01;
KFK.centerPos = {
    x: 0,
    y: 0
};
KFK.centerPos = {
    x: 0,
    y: 0
};
KFK.lastFocusOnJqNode = null;
KFK.justCreatedJqNode = null;
KFK.lastCreatedJqNode = null;
KFK.justCreatedShape = null;
KFK._jqhoverdiv = null;
KFK._svghoverline = null;
KFK.inited = false;
KFK.divInClipboard = undefined;
KFK.lineTemping = false;
KFK.ignoreClick = false;
KFK.scrollBugPatched = false;
KFK.actionLogToView = {
    editor: "",
    actionlog: []
};
KFK.actionLogToViewIndex = 0;
KFK.explorerRefreshed = false;
KFK.numberOfNodeToCreate = 0;
KFK.numberOfNodeCreated = 0;
KFK.freeHandPoints = [];
KFK.freeHandDrawing = null;
KFK.firstShown = {
    'right': false,
    'chat': false,
};
KFK.badgeIdMap = {};

// A4
// KFK.PageWidth = 842;
// KFK.PageHeight = 595;
//上面是A4的真实大小,但因为网格线是20位单位,所以近似看下面两个值
KFK.PageWidth = 840 * 2;
KFK.PageHeight = 600 * 2;
KFK.PageNumberHori = 6;
KFK.PageNumberVert = 6;
KFK.LeftB = KFK.PageWidth;
KFK.TopB = KFK.PageHeight;
KFK._width = KFK.PageWidth * KFK.PageNumberHori;
KFK._height = KFK.PageHeight * KFK.PageNumberVert;
KFK.minimapMouseDown = false;

KFK.defaultNodeWidth = 40;
KFK.defaultNodeHeight = 40;
KFK.links = [];
KFK.tipLinks = [];
KFK.tips = [];
KFK.images = {};
KFK.avatars = {};
KFK.pickedNode = null;
KFK.pickedTip = null;
KFK.mode = "pointer";
KFK.isEditting = false;
KFK.resizing = false;
KFK.dragging = false;
KFK.shapeDragging = false;
KFK.afterDragging = false;
KFK.afterResizing = false;
KFK.linkPosNode = [];
KFK.drawPoints = [];
KFK.drawMode = 'line';
KFK.tween = null;
KFK.KEYDOWN = {
    ctrl: false,
    shift: false,
    alt: false,
    meta: false
};
KFK.originZIndex = 1;
KFK.lastActionLogJqDIV = null;

KFK.brainstormMode = true;
KFK.brainstormFocusNode = undefined;

KFK.JC1 = $("#C1");
KFK.C1 = el(KFK.JC1);
KFK.scrollContainer = $("#S1");
KFK.lockMode = false;
KFK.selectedDIVs = [];
KFK.kuangXuanMouseIsDown = false;
KFK.kuangXuanStartPoint = {
    x: 0,
    y: 0
};
KFK.kuangXuanEndPoint = {
    x: 0,
    y: 0
};
KFK.duringKuangXuan = false;

KFK.currentMousePos = {
    x: -1,
    y: -1
};
KFK.JCBKG = $("#containerbkg");
KFK.SYSMSG = $("#system_message");

KFK.urlMode = "";
KFK.shareCode = null;

KFK.fsElem = document.documentElement;

KFK.C3GotFocus = () => {
    KFK.onC3 = true;
};

KFK.C3Blur = () => {
    KFK.onC3 = false;
};

KFK.getScrollPos = function () {
    let sc = $("#S1");
    return {
        x: sc.scrollLeft(),
        y: sc.scrollTop()
    };
};


//Following solution to prevetn scrolling after focus  cause a problem of juqery
//So, dont' use it but adapt getScrollPos then scrollToPos solution
//https://stackoverflow.com/questions/4963053/focus-to-input-without-scrolling
// element.focus({
//     preventScroll: true
//   });
KFK.focusOnC3 = () => {
    if (KFK.isEditting || KFK.resizing || KFK.dragging)
        return;
    if (KFK.JC3) {
        let pos = KFK.getScrollPos();
        KFK.JC3.attr("tabIndex", "0");
        KFK.JC3.focus();
        KFK.scrollToPos(pos);
    } else {
        KFK.warn("focusOnC3 failed. not exist");
    }
};

KFK.myuid = () => {
    return suuid.generate();
};
KFK.hoverJqDiv = function (jqdiv) {
    if (jqdiv !== undefined) {
        KFK._jqhoverdiv = jqdiv;
        if (jqdiv !== null) KFK.hoverSvgLine(null);
    } else {
        return KFK._jqhoverdiv;
    }
};
KFK.hoverSvgLine = function (svgline) {
    if (svgline !== undefined) {
        KFK._svghoverline = svgline;
        if (svgline !== null) KFK.hoverJqDiv(null);
    } else {
        return KFK._svghoverline;
    }
};

function el(jq) {
    return jq[0];
}

KFK.loadImages = function () {
    if (KFK.imagesLoaded) return;
    let loadedImages = 0;
    let numImages = assetIcons.length;
    for (let i = 0; i < assetIcons.length; i++) {
        let imgKey = assetIcons[i];
        KFK.images[imgKey] = new Image();
        KFK.images[imgKey].onload = function () {
            if (++loadedImages >= numImages) {
                KFK.imagesLoaded = true;
                KFK.debug("[Loaded] images fully loaded");
            }
        };
        let imgurl = cocoConfig.frontend.url + "/assets/" + imgKey + ".svg"
        KFK.images[imgKey].src = imgurl;
    }

    // KFK.images["toggle_line"].src = KFK.images["line"].src;
};

KFK.loadAvatars = function loadavatar() {
    if (KFK.avatarsLoaded) return;
    let loadedAvatars = 0;
    let numAvatars = avatarIcons.length;
    for (let i = 0; i < avatarIcons.length; i++) {
        let avatarKey = avatarIcons[i];
        KFK.avatars[avatarKey] = new Image();
        KFK.avatars[avatarKey].onload = function () {
            if (++loadedAvatars >= numAvatars) {
                KFK.setAppData("model", "avatars", KFK.avatars);
                KFK.avatarsLoaded = true;
                KFK.debug("[Loaded] avatars");
            }
        };
        KFK.avatars[avatarKey].src = cocoConfig.frontend.url + "/avatars/" + avatarKey + ".svg";
        KFK.avatars[avatarKey].id = avatarKey;
    }
};

class Node {
    constructor(id, type, variant, x, y, w, h, attach, attach2) {
        this.id = id;
        this.type = type;
        this.variant = variant;
        let dds = KFK.getShapeDynamicDefaultSize(type, variant);
        this.width = w ? w : dds.w;
        this.height = h ? h : dds.h;
        this.iconscale = 0.8;
        this.x = x;
        this.y = y;
        this.attach = attach;
        this.attach2 = attach2;
        if (
            isNaN(this.x) ||
            isNaN(this.y) ||
            isNaN(this.width) ||
            isNaN(this.height)
        ) {
            console.error("in Node contructor, x, y, w, h should be number");
            console.error(
                "this.x:",
                this.x,
                "this.y:",
                this.y,
                "this.width:",
                this.width,
                "this.height:",
                this.height
            );
        }
        if (KFK.APP.model.viewConfig.snap) {
            let tmpLeft = this.x - this.width * 0.5;
            let tmpTop = this.y - this.height * 0.5;
            let newLeft = tmpLeft;
            let newTop = tmpTop;
            if (tmpLeft % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
                newLeft =
                    Math.floor(tmpLeft / KFK.APP.model.gridWidth) *
                    KFK.APP.model.gridWidth;
            } else {
                newLeft =
                    (Math.floor(tmpLeft / KFK.APP.model.gridWidth) + 1) *
                    KFK.APP.model.gridWidth;
            }
            if (tmpTop % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
                newTop =
                    Math.floor(tmpTop / KFK.APP.model.gridWidth) *
                    KFK.APP.model.gridWidth;
            } else {
                newTop =
                    (Math.floor(tmpTop / KFK.APP.model.gridWidth) + 1) *
                    KFK.APP.model.gridWidth;
            }

            this.x += newLeft - tmpLeft;
            this.y += newTop - tmpTop;
        }
    }
}

class Link {
    constructor(id, fromId, toId, route) {
        this.id = id;
        this.from = fromId;
        this.to = toId;
        this.route = route === undefined ? "" : route === null ? "" : route;
    }
}

KFK.onWsMsg = async function (response) {
    response = JSON.parse(response);
    if (!response.cmd) {
        return;
    }
    if (response.payload) {
        KFK.error("Still has payload response", response.cmd);
    }
    if (response.cmd === "PING") {
        KFK.WS.put("PONG", {});
    }
    switch (response.cmd) {
        case "ONLY":
            KFK.scrLog(response.msg);
            KFK.WS.keepFlag = "ONCE";
            KFK.WS.close();
            KFK.gotoSignin();
            break;
        case "NEEDAUTH":
            KFK.scrLog(response.msg);
            KFK.removeCocouser("cocouser");
            KFK.WS.keepFlag = "ONCE";
            KFK.WS.close();
            KFK.gotoSignin();
            break;
        case "SIGNOUT":
            KFK.scrLog("你已成功退出共创协同平台");
            KFK.removeCocouser("cocouser");
            KFK.resetAllLocalData();
            KFK.WS.keepFlag = "ONCE";
            KFK.WS.close();
            KFK.gotoSignin();
            break;
        case "ENTER":
            KFK.pct = response.pct;
            KFK.scrLog(response.name + " 进入协作", 1000);
            break;
        case 'DOCLIMIT':
            $("#system_message").removeClass("noshow");
            $("#system_message").prop(
                "innerHTML",
                "文档数量超限了，为不影响您正常使用，请点这里尽快升级"
            );
            break;
        case "UPLDLIMIT":
            $("#system_message").removeClass("noshow");
            $("#system_message").prop(
                "innerHTML",
                "您文件上传次数超限了，为不影响您正常使用，请点这里尽快升级"
            );
            break;
        case "QUOTA":
            KFK.pct = response.pct;
            // if (response.tag === "almost") {
            //     KFK.debug("Quota left", response.quota);
            //     $("#system_message").removeClass("noshow");
            //     $("#system_message").prop(
            //         "innerHTML",
            //         "您组织的操作分已接近耗光， 建议尽早充值"
            //     );
            // } else if (response.tag === "useup") {
            //     KFK.debug("Quota left", response.quota);
            //     $("#system_message").removeClass("noshow");
            //     $("#system_message").prop(
            //         "innerHTML",
            //         "当前组织的操作分已耗尽，为不影响您正常使用，请点这里尽快升级"
            //     );
            // } else {
            //     //ok
            //     KFK.debug("Quota left", response.quota);
            //     $("#system_message").addClass("noshow");
            // }
            break;
        case "PCT":
            KFK.pct = response.pct;
            break;
        case "RESTRICT":
            KFK.scrLog(response.msg);
            break;
        case "OPENDOC":
            if (response.demo) {
                KFK.debug("set isDemoEnv to TRUE. after received OPENDOC");
                KFK.APP.setData("model", "isDemoEnv", true);
            } else {
                KFK.debug("set isDemoEnv to FALSE. after received OPENDOC");
                KFK.APP.setData("model", "isDemoEnv", false);
            }
            KFK.recreateFullDoc(response.doc, KFK.checkLoading);
            break;
        case "OPENANN":
            let annUser = response.user;
            KFK.updateCocouser(annUser);
            KFK.APP.setData("model", "isDemoEnv", true);
            KFK.resetAllLocalData();
            setTimeout(() => {
                KFK.checkSession();
            }, 500);
            break;
        case "C":
            KFK.updateReceived++;
            KFK.recreateObject(response.block);
            break;
        case "U":
            KFK.updateReceived++;
            KFK.recreateObject(response.block);
            break;
        case "D":
            KFK.updateReceived++;
            KFK.deleteObject_for_Response(response.block);
            break;
        case "CONTENT":
            KFK.updateQuillingContent(response);
            break;
        case "STOPQUILL":
            KFK.onStopQuill(response.nodeid, response.by);
            break;
        case "OKTOQUILL":
            KFK.onOkToQuill(response.nodeid);
            break;
        case "ASKPWD":
            KFK.scrLog("请输入正确的白板密码", 2000);
            KFK.tryToOpenDocId = response.doc_id;
            KFK.showDialog({
                inputDocPasswordDialog: true
            });
            break;
        case "RESETPWD":
            KFK.APP.model.docs.forEach((doc) => {
                if (doc._id === response.doc_id) {
                    if (response.pwd === "") {
                        doc.protect_icon = "toggle-off";
                        doc.pwd = "";
                        KFK.scrLog("协作密码已清除");
                    } else {
                        doc.protect_icon = "toggle-on";
                        doc.pwd = "*********";
                        KFK.scrLog("已添加密码保护");
                    }
                }
            });
            break;
        case "REMOVEPWD":
            KFK.APP.model.docs.forEach((doc) => {
                if (doc._id === response.doc_id) {
                    if (response.pwd === "") {
                        doc.protect_icon = "toggle-off";
                        doc.pwd = "";
                        KFK.scrLog("协作密码已清除");
                    } else {
                        doc.protect_icon = "toggle-on";
                        doc.pwd = "*********";
                        KFK.scrLog("已保护");
                    }
                }
            });
            break;
        case "ASKUSERPWD":
            KFK.APP.setData("model", "inputUserPwd", "");
            KFK.showDialog({
                userPasswordDialog: true
            });
            break;
        case "SHARECODE_NOT_EXIST":
            KFK.setAppData("model", "msgbox", {
                title: "邀请码不存在",
                content: "邀请码不存在，返回协作管理",
            });
            KFK.showDialog({
                MsgBox: true
            });
            break;
        case "NONEXIST":
            KFK.info("Server says document does not exist");
            KFK.setAppData("model", "msgbox", {
                title: "文档不存在",
                content: "你要查看的白板文档不存在",
            });
            KFK.showDialog({
                MsgBox: true
            });
            break;
        case "TGLREAD":
            KFK.APP.model.docs.forEach((doc) => {
                if (doc._id === response.doc_id) {
                    doc.readonly = response.readonly;
                    if (doc.readonly === true) {
                        doc.readonly_icon = "eye";
                        doc.readonly_variant = "primary";
                        KFK.scrLog("已设为只读");
                    } else {
                        doc.readonly_icon = "pencil";
                        doc.readonly_variant = "outline-primary";
                        KFK.scrLog("已设为可编辑");
                    }
                }
            });
            if (response.doc_id === KFK.APP.model.cocodoc.doc_id) {
                KFK.APP.model.cocodoc.readonly = response.readonly;
                KFK.APP.setData("model", "cocodoc", KFK.APP.model.cocodoc);
                localStorage.setItem("cocodoc", JSON.stringify(KFK.APP.model.cocodoc));
            }
            break;
        case "NEWPRJ":
            let cocoprj = {
                prjid: response.prj.prjid,
                name: response.prj.name,
            };
            KFK.setCurrentPrj(cocoprj);
            KFK.showProjects();
            KFK.gotoPrjList();
            break;
        case "DELPRJ":
            for (let i = 0; i < KFK.APP.model.prjs.length; i++) {
                if (KFK.APP.model.prjs[i].prjid === response.prjid) {
                    KFK.APP.model.prjs.splice(i, 1);
                    break;
                }
            }
            if (KFK.APP.model.prjs.length > 0) {
                KFK.setCurrentPrj(KFK.APP.model.prjs[0]);
                // KFK.sendCmd("LISTDOC", { prjid: KFK.APP.model.prjs[0].prjid });
                KFK.gotoPrjList();
            } else {
                KFK.showCreateNewPrj();
                KFK.APP.setData("model", "lastrealproject", {
                    prjid: "",
                    name: ""
                });
            }
            break;
        case "NEWDOC":
            KFK.APP.docNavTabIndex = 0;
            await KFK.gotoPrj(response.prjid, response.prjname);
            break;
        case "DELDOC":
            for (let i = 0; i < KFK.APP.model.docs.length; i++) {
                if (KFK.APP.model.docs[i]._id === response.doc_id) {
                    KFK.APP.model.docs.splice(i, 1);
                    break;
                }
            }
            if (KFK.APP.model.docs.length > 0) {
                let nextdoc = KFK.APP.model.docs[0];
                KFK.APP.setData("model", "cocodoc", nextdoc);
            } else {
                KFK.APP.setData("model", "cocodoc", KFK.DocController.getDummyDoc());
            }
            break;
        case "LISTDOC":
            KFK.APP.setData("model", "listdocoption", response.option);
            let docs = response.docs;
            docs.forEach((doc) => {
                if (doc.pwd === "") {
                    doc.protect_icon = "toggle-off";
                    doc.security_variant = "outline-success";
                } else {
                    doc.protect_icon = "toggle-on";
                    doc.security_variant = "success";
                }
                if (doc.readonly === true) {
                    doc.readonly_icon = "eye";
                    doc.readonly_variant = "primary";
                } else {
                    doc.readonly_icon = "pencil";
                    doc.readonly_variant = "outline-primary";
                }
                if (doc.acl === "S") {
                    doc.acl_desc = "仅发起人";
                } else if (doc.acl === "O") {
                    doc.acl_desc = "所在组织";
                } else if (doc.acl === "P") {
                    doc.acl_desc = "公开使用";
                }
                if (doc.ownerAvatar !== "") {
                    try {
                        doc.ownerAvatarSrc = KFK.avatars[doc.ownerAvatar].src;
                    } catch (error) {
                        KFK.debug("set doc avatar src failed", error.message);
                        KFK.debug("doc.ownerAvatar is", doc.ownerAvatar);
                    }
                }
            });
            KFK.APP.setData("model", "docs", docs);
            break;
        case "LISTPUB":
            let pubs = response.pubs;
            pubs.forEach((pub) => {
                pub.tags_display = pub.tags.join(" ");
            });
            KFK.APP.setData("model", "pubs", pubs);
            break;
        case "GOODS":
            let goods = response.goods;
            goods.forEach((item) => {
                item._showDetails = false;
            });
            KFK.APP.setData("model", "goods", goods);
            break;
        case 'LISTSUB':
            let subs = response.subs;
            subs.forEach((item) => {
                item._showDetails = false;
            });
            KFK.APP.setData("model", "subs", subs);
            break;
        case "GETBLKOPS":
            let blkops = response.blkops;
            blkops.forEach((blkop) => {
                if (
                    blkop.avatar === undefined ||
                    blkop.avatar === null ||
                    blkop.avatar === ""
                ) {
                    blkop.avatarSrc = KFK.avatars["avatar-0"].src;
                } else {
                    blkop.avatarSrc = KFK.avatars[blkop.avatar].src;
                }
                blkop.pos = -1;
            });
            KFK.setAppData("model", "actionlog", blkops);
            break;
        case "LISTPRJ":
            KFK.APP.setData("model", "listprjoption", response.option);
            let option = response.option;
            // let skip = option.skip;
            // let count = option.count;
            KFK.APP.setData("model", "prjs", response.prjs);
            await KFK.showSection({
                signin: false,
                register: false,
                explorer: true,
                designer: false,
            });
            KFK.showProjects();
            KFK.gotoPrjList();
            KFK.explorerRefreshed = true;
            break;

        case "MOUSE":
            KFK.showOtherUserMovingBadge(response.mouse);
            break;
        case "ZI":
            KFK.resetNodeZIndex(response.ZI);
            break;
        case "LOCKNODE":
            KFK.NodeController.lock($(`#${response.nodeid}`));
            break;
        case "UNLOCKNODE":
            KFK.NodeController.unlock($(`#${response.nodeid}`));
            break;
        case "LOCKLINE":
            KFK.debug("------------GOT LOCKLINE, LOCK IT-----");
            KFK.NodeController.lockline(
                KFK,
                KFK.svgDraw.findOne(`.${response.nodeid}`)
            );
            break;
        case "UNLOCKLINE":
            KFK.debug("------------GOT UNLOCKLINE, LOCK IT-----");
            KFK.NodeController.unlockline(
                KFK,
                KFK.svgDraw.findOne(`.${response.nodeid}`)
            );
            break;
        case "GOTOPRJ":
            let gotoPrjId = response.prjid;
            let found = -1;
            for (let i = 0; i < KFK.APP.model.prjs.length; i++) {
                if (gotoPrjId === KFK.APP.model.prjs[i].prjid) {
                    found = i;
                    break;
                }
            }
            if (found >= 0) {
                KFK.setCurrentPrj(KFK.APP.model.prjs[found]);
            }
            KFK.sendCmd("LISTDOC", {
                prjid: gotoPrjId
            });
            KFK.gotoDocs();
            break;
        case "SETPROFILE-TRUE":
            KFK.scrLog("基本资料已设置成功");
            KFK.updateCocouser(response.info);
            break;
        case "SETPROFILE-FAIL":
            KFK.scrLog("基本资料未成功设置，请重试" + response.error);
            break;
        case "CLEANUP":
            KFK.doCleanUp();
            break;
        case "SETBGCOLOR":
            KFK.scrLog("发起人改变了白板背景颜色", response.bgcolor);
            KFK.setBGColorTo(response.bgcolor);
            break;
        case "EMAILSHARE":
        case "SHARECODE":
            SHARE.onWsMsg(response);
            break;
        case "SETACL":
            KFK.APP.model.share.acl = response.acl;
            KFK.APP.model.share.warning = KFK.getShareWarningByDocACL(response.acl);
            break;
        case "SHARECODE2":
            if (response.code === 'DOC_NOT_EXIST') {
                KFK.APP.model.share.okToShare = true;
                KFK.APP.model.share.okToSetACL = false;
                KFK.APP.model.share.url = KFK.getProductUrl() + '/?dou=welcome_new_user';
                KFK.APP.model.share.warning = '您要分享的文档不存在，以设为分享新用户欢迎';
            } else {
                KFK.APP.model.share.okToShare = true;
                KFK.APP.model.share.okToSetACL = true;
                KFK.APP.model.share.url = KFK.getProductUrl() + '/?dou=' + response.code;
                KFK.APP.model.share.doc_id = response.doc_id;
                KFK.APP.model.share.docname = response.name;
                KFK.APP.model.share.acl = response.acl;
                KFK.APP.model.share.warning = KFK.getShareWarningByDocACL(response.acl);
            }
            break;
        case "UPDUSRORG":
            KFK.updateCocouser(response.data);
            break;
        case "ENTERORG":
            KFK.updateCocouser(response.data);
            //切换组织时, 本地的用户, 已经拉取的vorgs, 以及myorgs不用清空
            KFK.resetAllLocalData({
                user: true,
                vorgs: true,
                myorgs: true
            });
            KFK.refreshProjectList();
            break;
        case "LISTMYORG":
            KFK.debug("got listmyorg", response);
            KFK.APP.model.myorgs = [];
            for (let i = 0; i < response.orgs.length; i++) {
                KFK.APP.model.myorgs.push(Object.assign({}, response.orgs[i]));
            }
            KFK.setAppData("model", "myorgs", KFK.APP.model.myorgs);
            break;
        case "LISTVORG":
            KFK.debug("got listvorg", response);
            KFK.APP.model.vorgs = [];
            for (let i = 0; i < response.orgs.length; i++) {
                KFK.APP.model.vorgs.push(Object.assign({}, response.orgs[i]));
            }
            KFK.setAppData("model", "vorgs", KFK.APP.model.vorgs);
            break;
        case "ORGUSERLIST":
            KFK.debug("got orguserlist", response);
            let tmp = KFK.APP.model.orgusers;
            tmp[response._id] = response.userids;
            KFK.setAppData("model", "orgusers", tmp);
            if (response.toggle === "TOGGLE")
                KFK.idRowMap[response._id].toggleDetails();
            else {
                KFK.idRowMap[response._id].toggleDetails();
                KFK.idRowMap[response._id].toggleDetails();
            }
            break;
        case "GETINVITOR":
            KFK.mergeAppData("model.invitor", {
                userid: response.userid,
                name: response.name,
            });
            break;
        case "BOSSLIMIT":
            KFK.setAppData(
                "model",
                "readonlyDesc",
                "只读: 协作者人数超过组织设定的" + response.limit + "人"
            );
            let cocodoc = KFK.APP.model.cocodoc;
            cocodoc.readonly = true;
            KFK.setAppData("model", "cocodoc", cocodoc);
            $("#linetransformer").draggable("disable");
            $(".kfknode").draggable("disabled");
            $(".kfknode").resizable("disabled");
            $(".kfknode").droppable("disabled");
            KFK.hide('#right');
            KFK.hide('#left');
            KFK.hide('#top');
            break;
        case "SCRLOG":
            KFK.scrLog(response.msg);
            break;
        case "ERROR":
            KFK.error('SERVER ERROR:', response.msg);
            break;
        case "STS":
            KFK.onGotSTS(response);
            break;
        case "LISTMAT":
            let mats = response.mats.map((mat) => {
                let matUrl = `https://${cocoConfig.cos.reverseproxy}/${mat.Key}`;
                return {
                    matid: mat.Key,
                    url: matUrl,
                    thumbnail: `${matUrl}?imageMogr2/thumbnail/x100/interlace/0`,
                };
            });
            KFK.APP.setData("model", "mats", mats);
            KFK.materialUpdated = true;
            break;
        case "REFRESHMAT":
            mats = response.mats.map((mat) => {
                let matUrl = `https://${cocoConfig.cos.reverseproxy}/${mat.Key}`;
                return {
                    matid: mat.Key,
                    url: matUrl,
                    thumbnail: `${matUrl}?imageMogr2/thumbnail/x100/interlace/0`,
                };
            });
            KFK.APP.setData("model", "mats", mats);
            KFK.materialUpdated = true;
            break;
        case 'CHAT':
            KFK.scrLog(response.msg);
            KFK.appendChatItem(response.msg, response.avatar, response.name, 'other');
            break;
        case 'BUY1':
            KFK.scrLog('购买成功，请在我的订阅中查看');
            break;
        case 'BUY2':
            KFK.scrLog('购买成功，已放入“购买的彩板”项目');
            break;
        case 'GENSIG':
            KFK.startVideoCall(response.config, response.shareConfig);
            break;
        case 'RTCSIGREQ':
            KFK.regRtcUser(response);
            break;
        default:
            break;
    }
};

KFK.regRtcUser = (res) => {
    KFK.rtcUsers[res.user_ser] = {
        userid: res.userid,
        name: res.name,
        avatar: res.avatar
    };
};


KFK.focusOnNode = function (jqNodeDIV) {
    KFK.lastFocusOnJqNode = jqNodeDIV;
    KFK.justCreatedJqNode = null;
    KFK.justCreatedShape = null;

    if (jqNodeDIV !== null) KFK.updatePropertyFormWithNode(jqNodeDIV);
};

KFK.setRightTabIndex = function (tabIndex) {
    if (tabIndex === undefined) {
        if (
            KFK.selectedDIVs.length === 1 ||
            KFK.pickedShape !== null ||
            KFK.justCreatedJqNode !== null ||
            KFK.justCreatedShape !== null
        ) {
            tabIndex = 0;
        } else if (KFK.selectedDIVs.length >= 2) {
            tabIndex = 1;
        } else if (KFK.selectedDIVs.length === 0) {
            tabIndex = 2;
        }
    }
    tabIndex = tabIndex < 0 ? 0 : (tabIndex > 2 ? 2 : tabIndex);
    KFK.APP.setData("model", "rightTabIndex", tabIndex);
    localStorage.setItem('righttabindex', tabIndex);
};

KFK.updatePropertyFormWithNode = function (jqNodeDIV) {
    let nodeType = "unknown";
    if (jqNodeDIV != null) {
        nodeType = jqNodeDIV.attr("nodetype");
    }

    KFK.APP.setData("show", "customline", false);
    KFK.APP.setData("show", "shape_property", jqNodeDIV != null);
    KFK.APP.setData(
        "show",
        "customfont",
        jqNodeDIV != null && getBoolean(cocoConfig.node[nodeType].edittable)
    );
    KFK.APP.setData(
        "show",
        "customshape",
        jqNodeDIV != null && getBoolean(cocoConfig.node[nodeType].customshape)
    );
    KFK.APP.setData(
        "show",
        "custombacksvg",
        jqNodeDIV != null && (nodeType === "yellowtip" || nodeType === "textblock")
    );
    KFK.APP.setData(
        "show",
        "layercontrol",
        jqNodeDIV != null &&
        (nodeType === "text" ||
            nodeType === "yellowtip" ||
            nodeType === "textblock" ||
            nodeType === "richtext")
    );
    if (jqNodeDIV != null && getBoolean(cocoConfig.node[nodeType].customshape)) {
        let nodeBkgColor = jqNodeDIV.css("background-color");
        let nodeBorderColor = jqNodeDIV.css("border-color");
        let nodeBorderWidth = KFK.unpx(jqNodeDIV.css("border-width"));
        let nodeBorderRadius = KFK.unpx(jqNodeDIV.css("border-radius"));
        $("#shapeBkgColor").spectrum("set", nodeBkgColor);
        $("#shapeBorderColor").spectrum("set", nodeBorderColor);
        $("#spinner_border_width").spinner("value", nodeBorderWidth);
        $("#spinner_border_radius").spinner("value", nodeBorderRadius);
    }
    if (jqNodeDIV != null && nodeType === "yellowtip") {
        let tipColor = KFK.getTipBkgColor(jqNodeDIV);
        $("#tipBkgColor").spectrum("set", tipColor);
    }

    if (jqNodeDIV != null && getBoolean(cocoConfig.node[nodeType].edittable)) {
        let jqInner = jqNodeDIV.find(".innerobj");
        let fontFamily = jqInner.css("font-family");
        let fontSize = KFK.unpx(jqInner.css("font-size"));
        let fontColor = jqInner.css("color");
        let textAlign = jqInner.css("justify-content");
        let vertAlign = jqInner.css("align-items");
        textAlign = textAlign === "normal" ? "flex-start" : textAlign;
        vertAlign = vertAlign === "normal" ? "flex-start" : vertAlign;
        $("#fontColor").spectrum("set", fontColor);
        $("#spinner_font_size").spinner("value", fontSize);
        KFK.APP.setData("model", "textAlign", textAlign);
        KFK.APP.setData("model", "vertAlign", vertAlign);
    }
};

KFK.log = function (...info) {
    console.log("LOG>", ...info);
};
KFK.error = function (...info) {
    if (KFK.loglevel >= KFK.LOGLEVEL_ERROR) console.log("ERROR>", ...info);
};
KFK.warn = function (...info) {
    if (KFK.loglevel >= KFK.LOGLEVEL_WARN) console.log("WARN >", ...info);
};
KFK.info = function (...info) {
    if (KFK.loglevel >= KFK.LOGLEVEL_INFO) console.log("INFO >", ...info);
};
KFK.debug = function (...info) {
    if (KFK.loglevel >= KFK.LOGLEVEL_DEBUG) console.log("DEBUG>", ...info);
};
KFK.detail = function (...info) {
    if (KFK.loglevel >= KFK.LOGLEVEL_DETAIL) console.log("DETAL>", ...info);
};

KFK.logKey = function (...info) {
    // KFK.scrLog(...info);
};

KFK.keepLog = function (msg = "", staytime = 30000) {
    if (msg === "") {
        $("#keepLog").prop("innerHTML", "");
        KFK.keepTimer && clearTimeout(KFK.keepTimer);
        $("#keepLog").addClass("noshow");
    }
    $("#keepLog").prop("innerHTML", msg);
    $("#keepLog").removeClass("noshow");
    KFK.keepTimer && clearTimeout(KFK.keepTimer);
    KFK.keepLogTimer = setTimeout(() => {
        $("#keepLog").addClass("noshow");
        KFK.keepTimer = undefined;
    }, staytime);
};
KFK.setAclInShare = async (acl) => {
    await KFK.sendCmd("SETACL", {
        doc_id: KFK.APP.model.share.doc_id,
        acl: acl
    });
};
KFK.getShareWarningByDocACL = (acl) => {
    let ret = '';
    switch (acl) {
        case 'S':
            ret = '白板当前权限为仅发起人可用, 会导致协作者无法正常参与，请注意调整白板权限';
            break;
        case 'O':
            ret = '白板当前权限为仅当前组织可用，非当前组织用户无法正常参与，请检查受邀者是否在当前组织';
            break;
        case 'P':
            ret = '白板当前权限为公开使用，任何接收到分享码的人都可以参与协作';
            break;
    }
    return ret;
};
KFK.scrLog = function (msg, staytime = 5000) {
    let parent = $("#MSG").parent();
    let msgDIV = $("#MSG");
    let cloneDIV = $("#fadeoutmsg");
    if (cloneDIV.length > 0) {
        if (KFK.msgTimer) {
            clearTimeout(KFK.msgTimer);
            KFK.msgTimer = undefined;
        }
        cloneDIV.remove();
    }
    cloneDIV = msgDIV.clone().appendTo(parent);
    cloneDIV.removeClass('noshow');
    cloneDIV.attr("id", "fadeoutmsg");
    cloneDIV.html(msg);
    KFK.msgTimer = setTimeout(() => {
        cloneDIV.animate({
            opacity: 0
        }, 500, async function () {
            cloneDIV.remove();
        });
    }, staytime);
};

KFK.getConnectorPoints = function (from, to, rad) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);

    let radius = rad;

    return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle),
    ];
};

KFK.replaceNodeInSelectedDIVs = function (jqDIV) {
    for (let i = 0; i < KFK.selectedDIVs.length; i++) {
        if (KFK.selectedDIVs[i].attr("id") === jqDIV.attr("id")) {
            KFK.selectedDIVs[i] = jqDIV;
        }
    }
};

KFK.calculateNodeConnectPoints = function (jqDIV) {
    let divLeft = KFK.unpx(jqDIV.css("left"));
    let divTop = KFK.unpx(jqDIV.css("top"));
    let divWidth = KFK.unpx(jqDIV.css("width"));
    let divHeight = KFK.unpx(jqDIV.css("height"));
    let pos = {
        center: {
            x: divLeft + divWidth * 0.5,
            y: divTop + divHeight * 0.5,
        },
        points: [{
            x: KFK.unpx(jqDIV.css("left")),
            y: KFK.unpx(jqDIV.css("top")) + KFK.unpx(jqDIV.css("height")) * 0.5,
        },
        {
            x: KFK.unpx(jqDIV.css("left")) + KFK.unpx(jqDIV.css("width")) * 0.5,
            y: KFK.unpx(jqDIV.css("top")),
        },
        {
            x: KFK.unpx(jqDIV.css("left")) + KFK.unpx(jqDIV.css("width")),
            y: KFK.unpx(jqDIV.css("top")) + KFK.unpx(jqDIV.css("height")) * 0.5,
        },
        {
            x: KFK.unpx(jqDIV.css("left")) + KFK.unpx(jqDIV.css("width")) * 0.5,
            y: KFK.unpx(jqDIV.css("top")) + KFK.unpx(jqDIV.css("height")),
        },
        ],
    };
    return pos;
};

KFK.drawPathBetween = function (A, B, posLimitA = [0, 1, 2, 3], posLimitB = [0, 1, 2, 3]) {
    let APos = KFK.calculateNodeConnectPoints(A);
    let BPos = KFK.calculateNodeConnectPoints(B);
    let fromPoint = null;
    let toPoint = null;
    let AIndex = 0;
    let BIndex = 0;
    let shortestDistance = KFK.distance(APos.points[0], BPos.points[0]);
    for (let i = 0; i < APos.points.length; i++) {
        if (posLimitA.indexOf(i) < 0)
            continue;
        fromPoint = APos.points[i];
        for (let j = 0; j < BPos.points.length; j++) {
            if (posLimitB.indexOf(j) < 0)
                continue;
            toPoint = BPos.points[j];
            let tmp_drawPathBetween_distance = KFK.distance(fromPoint, toPoint);
            if (tmp_drawPathBetween_distance < shortestDistance) {
                shortestDistance = tmp_drawPathBetween_distance;
                AIndex = i;
                BIndex = j;
            }
        }
    }
    let svgLine = KFK.svgConnectNode(
        A.attr("id"),
        B.attr("id"),
        AIndex,
        BIndex,
        APos.points[AIndex].x,
        APos.points[AIndex].y,
        BPos.points[BIndex].x,
        BPos.points[BIndex].y, {}
    );
};

KFK.yarkLinkNode = function (jqDIV, shiftKey, text) {
    if (KFK.shapeDragging) return;
    if (KFK.nodeLocked(jqDIV)) return;
    KFK.tmpPos = KFK.calculateNodeConnectPoints(jqDIV);
    KFK.linkPosNode.push(jqDIV);
    KFK.procLinkNode(shiftKey, text);
};

KFK.cancelLinkNode = function () {
    KFK.cancelTempLine();
    KFK.linkPosNode.splice(0, 2);
    if (KFK.lockTool === false)
        KFK.setMode("pointer");
};
KFK.procLinkNode = function (shiftKey, text) {
    if (KFK.linkPosNode.length < 2) {
        return;
    } else if (KFK.linkPosNode[0].attr("id") === KFK.linkPosNode[1].attr("id")) {
        KFK.linkPosNode.splice(1, 1);
        return;
    }
    if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
    KFK.lineTemping = false;
    KFK.cancelAlreadySelected();
    KFK.drawPathBetween(KFK.linkPosNode[0], KFK.linkPosNode[1]);
    //看两个节点的Linkto属性，在添加一个连接线后有没有什么变化，
    //如果有变化，就上传U， 如果没变化，就不用U
    //没有变化的情况：之前就有从linkPosNode[0]到 linkPosNode[1]的链接存在
    //有变化的情况：1. 之前不存在； 2. 之前存在方向相反的链接，从linkPosNode[1]到linkPosNode[0]的
    //以上两种情况中，1会只导致只U第一个； 2会导致U；两端两个节点
    let tmp1 = KFK.linkPosNode[0].attr("linkto");
    let tmp2 = KFK.linkPosNode[1].attr("linkto");
    KFK.buildConnectionBetween(KFK.linkPosNode[0], KFK.linkPosNode[1]);
    let tmp3 = KFK.linkPosNode[0].attr("linkto");
    let tmp4 = KFK.linkPosNode[1].attr("linkto");
    if (tmp1 !== tmp3) {
        KFK.debug("The first node linkto has been changed");
        KFK.syncNodePut("U", KFK.linkPosNode[0].clone(), "connect nodes", null, false, 0, 1);
    }
    if (tmp2 !== tmp4) {
        KFK.debug("The second node linkto has been changed");
        KFK.syncNodePut("U", KFK.linkPosNode[1].clone(), "connect nodes", null, false, 0, 1);
    }

    if (!shiftKey) {
        KFK.linkPosNode.splice(0, 2);
    } else {
        KFK.linkPosNode[0] = KFK.linkPosNode[1];
        KFK.linkPosNode.splice(1, 1);
    }
};

KFK.setShapeToRemember = function (theShape) {
    KFK.shapeToRemember = theShape.clone();
    KFK.shapeToRemember.attr("id", theShape.attr("id"));
    KFK.shapeToRemember.attr("stroke-width", theShape.attr("origin-width"));
};

KFK.closePolyPoint = function (x, y, shiftKey) {
    KFK.polyId = undefined;
    KFK.drawPoints.splice(0, KFK.drawPoints.length);

    let shapeId = KFK.polyShape.attr("id");
    KFK.addShapeEventListner(KFK.polyShape);
    KFK.setShapeToRemember(KFK.polyShape);

    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "customline", true);
    KFK.APP.setData("show", "custombacksvg", false);
    KFK.APP.setData("show", "customfont", false);
    KFK.APP.setData("show", "layercontrol", false);

    KFK.pickedShape = KFK.polyShape;
    let color = KFK.polyShape.attr("stroke");
    let width = KFK.polyShape.attr("origin-width");
    let linecap = KFK.polyShape.attr("stroke-linecap");
    $("#lineColor").spectrum("set", color);
    $("#spinner_line_width").spinner("value", width);

    KFK.syncLinePut("C", KFK.polyShape, "create new", null, false);
};
KFK.yarkShapePoint = function (x, y, shiftKey) {
    if (KFK.shapeDragging) return;
    if (KFK.isFreeHandDrawing) return;

    //如果这是划线时，所点的第二个点(此时，开始画线)
    if (KFK.drawMode === 'line' && KFK.drawPoints.length === 1) {
        //如果按着alt键，则应该画直线
        if (KFK.KEYDOWN.alt) {
            //如果更起始点的x距离比y距离更小，则画垂直线，否则画水平线
            if (
                Math.abs(x - KFK.drawPoints[0].center.x) <
                Math.abs(y - KFK.drawPoints[0].center.y)
            ) {
                //画垂直线(x相等)
                x = KFK.drawPoints[0].center.x;
            } else {
                //画水平线(y相等)
                y = KFK.drawPoints[0].center.y;
            }
        }
    }
    KFK.drawPoints.push({
        type: "point",
        center: {
            x: x,
            y: y
        },
        points: [{
            x: x,
            y: y
        }],
    });
    KFK.procDrawShape(shiftKey);
};
KFK.procDrawShape = function (shiftKey) {
    if (KFK.drawPoints.length < 2) {
        return;
    } else {
        if (KFK.tempShape) KFK.tempShape.hide();
        KFK.lineTemping = false;
    }
    if (['line', 'rectangle', 'ellipse'].indexOf(KFK.drawMode) >= 0)
        KFK.justCreatedShape = KFK.svgDrawShape(KFK.drawMode,
            KFK.myuid(),
            KFK.drawPoints[0].center.x,
            KFK.drawPoints[0].center.y,
            KFK.drawPoints[1].center.x,
            KFK.drawPoints[1].center.y, {
            color: KFK.YIQColorAux || KFK.APP.model.svg[KFK.drawMode].color,
            width: KFK.APP.model.svg[KFK.drawMode].width,
            linecap: KFK.APP.model.svg[KFK.drawMode].linecap ? "round" : "square",
        }
        );
    else if (['polyline', 'polygon'].indexOf(KFK.drawMode) >= 0) {
        if (KFK.polyId === undefined) {
            KFK.polyId = KFK.myuid();
        }
        KFK.justCreatedShape = KFK.svgDrawPoly(KFK.drawMode,
            KFK.polyId, {
            color: KFK.YIQColorAux || KFK.APP.model.svg.line.color,
            width: KFK.APP.model.svg.line.width,
            linecap: KFK.APP.model.svg.line.linecap ? "round" : "square",
        }
        );
        KFK.polyShape = KFK.justCreatedShape;
    }

    let theShape = KFK.justCreatedShape;
    KFK.setShapeToRemember(theShape);

    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "customline", true);
    KFK.APP.setData("show", "custombacksvg", false);
    KFK.APP.setData("show", "customfont", false);
    KFK.APP.setData("show", "layercontrol", false);

    KFK.pickedShape = theShape;
    let color = theShape.attr("stroke");
    let width = theShape.attr("origin-width");
    let linecap = theShape.attr("stroke-linecap");
    $("#lineColor").spectrum("set", color);
    $("#spinner_line_width").spinner("value", width);


    if (['line', 'rectangle', 'ellipse'].indexOf(KFK.drawMode) >= 0) {
        KFK.syncLinePut("C", theShape, "create new", null, false);
        KFK.drawPoints.splice(0, 2);
    }
};

KFK.addLinkTo = function (jq1, idToAdd) {
    let linksArr = KFK.stringToArray(jq1.attr("linkto"));
    //过滤掉不存在的节点
    // linksArr = linksArr.filter((aId) => {
    //   return ($(`#${aId}`).length > 0) && aId !== jq1.attr("id");
    // })
    //把新的对手节点放进去
    if (linksArr.indexOf(idToAdd) < 0) {
        linksArr.push(idToAdd);
    }
    jq1.attr("linkto", linksArr.join(","));
};
/**
 * 建立两个节点之间的连接
 * 建立从jq1到jq2的连接，会同时删除反方向从jq2到jq1的连接
 * @param jq1 从这个节点开始
 * @param jq2 连到这个节点
 * 
 * 
 */
KFK.buildConnectionBetween = function (jq1, jq2) {
    KFK.addLinkTo(jq1, jq2.attr("id"));
    KFK.removeLinkTo(jq2, jq1.attr("id"));
};

/**
 * 断掉两个节点之间的连接
 * @param jq 连接的from节点
 * @param idToRemove 连接的to节点的id
 */
KFK.removeLinkTo = function (jq, idToRemove) {
    let str = jq.attr("linkto");
    let arr = KFK.stringToArray(str);
    //如对手节点在反方向存在，就把反方向的对手节点去掉
    let index = arr.indexOf(idToRemove);
    if (index >= 0) {
        arr.splice(index, 1);
        if (arr.length > 0) jq.attr("linkto", arr.join(","));
        else jq.removeAttr("linkto");
    }
};

/**
 * 获得一个节点的所有父节点
 * @param jq 子节点
 * @return 一个包含所有父节点的数组
 */
KFK.getParent = (jq) => {
    let ret = [];
    let myId = jq.attr("id");
    KFK.JC3.find(".kfknode").each((index, aNode) => {
        let jqConnectFrom = $(aNode);
        if (jqConnectFrom.attr("id") !== myId) {
            let arr = KFK.stringToArray(jqConnectFrom.attr("linkto"));
            if (arr.indexOf(myId) >= 0)
                ret.push(jqConnectFrom);
        }
    });
    return ret;
};

/**
 * 获得一个节点的所有子节点
 * @param jq 父节点
 * @return 所有子节点
 */
KFK.getChildren = function (jq) {
    let str = jq.attr("linkto");
    if (NotSet(str)) return [];
    let arr = KFK.stringToArray(str);
    arr = arr.filter((id) => {
        if ($('#' + id).length > 0) {
            return true;
        } else {
            return false;
        }
    });
    let ret = arr.map((id) => {
        return $('#' + id);
    });
    return ret;
};

/**
 * 两个节点之间是否有连接？
 * @param jq1  from节点
 * @param jq2  to节点
 */
KFK.hasConnection = function (jq1, jq2) {
    let str = jq1.attr("linkto");
    if (NotSet(str))
        return fasle;
    let arr = KFK.stringToArray(str);

    let linkToId = '';
    if (typeof jq2 === 'string') {
        linkToId = jq2;
    } else {
        linkToId = jq2.attr("id");
    }

    let index = arr.indexOf(linkToId);
    return (index >= 0);
};

KFK.distance = function (p1, p2) {
    return Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
    );
};

KFK.getZIndex = function (jqDiv) {
    let zz = parseInt(jqDiv.css("z-index"));
    zz = isNaN(zz) ? 0 : zz;
    return zz;
};
KFK.setZIndex = function (jqDiv, zz) {
    jqDiv.css("z-index", zz);
};
KFK.cancelAlreadySelected = function () {
    while (KFK.selectedDIVs.length > 0) {
        KFK.deselectNode(KFK.selectedDIVs[0]);
    }
    KFK.selectedDIVs.clear();
    KFK.resetPropertyOnMultipleNodesSelected();
    KFK.focusOnNode(null);
};
KFK.resetPropertyOnMultipleNodesSelected = function () {
    KFK.APP.setData("show", "arrange_multi_nodes", KFK.selectedDIVs.length > 1);
    KFK.APP.setData("show", "shape_property", KFK.selectedDIVs.length > 0);
    //if (KFK.selectedDIVs.length > 1) KFK.setRightTabIndex(1);
};

KFK.undo = async () => {
    if (KFK.opz < 0) {
        KFK.debug("undo 到底了");
        return;
    }
    let ope = KFK.opstack[KFK.opz];
    if (ope.cmd === "LOCK") {
        KFK.sendCmd("UNLOCKNODE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: ope.from,
        });
    } else if (ope.cmd === "UNLOCK") {
        KFK.sendCmd("LOCKNODE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: ope.from,
        });
    } else if (ope.cmd === "LOCKLINE") {
        KFK.sendCmd("UNLOCKLINE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: ope.from,
        });
    } else if (ope.cmd === "UNLOCKLINE") {
        KFK.sendCmd("LOCKLINE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: ope.from,
        });
    } else {
        if (ope.etype === "DIV") {
            for (let i = 0; i < ope.from.length; i++) {
                if (ope.from[i] === "" && ope.to[i] !== "") {
                    //ope is C
                    jqTo = $(`#${ope.toId[i]}`);
                    await KFK.syncNodePut("D", jqTo, "undo", null, true, 0, 1);
                } else if (ope.from[i] !== "" && ope.to[i] === "") {
                    //ope is D
                    let jqFrom = $($.parseHTML(ope.from[i]));
                    let nodeid = jqFrom.attr("id");
                    KFK.JC3.append(jqFrom);
                    jqFrom = $(`#${nodeid}`);
                    await KFK.setNodeEventHandler(jqFrom, async function () {
                        KFK.redrawLinkLines(jqFrom, "undo");
                        if (jqFrom.hasClass("lock")) {
                            KFK.updateNodeEvent(jqFrom, "draggable", "destroy");
                            KFK.updateNodeEvent(jqFrom, "resizable", "destroy");
                            KFK.updateNodeEvent(jqFrom, "droppable", "destroy");
                        } else {
                            KFK.debug(nodeid, "NOT hasclass lock");
                        }
                        //对TODO/CHAT要做如下修复
                        if (KFK.isTodoListOrChatListDIV(jqFrom)) {
                            jqFrom.find('.coco_list').addClass('original');
                            if (KFK.isTodoListDIV(jqFrom)) {
                                jqFrom.addClass('todolist');
                                KFK.setTodoItemEventHandler(jqFrom);
                            } else if (KFK.isChatListDIV(jqFrom)) {
                                jqFrom.addClass('chatlist');
                            }
                        }
                        await KFK.syncNodePut("C", jqFrom, "undo", null, true, 0, 1);
                    });
                } else if (ope.from[i] !== "" && ope.to[i] !== "") {
                    //ope is U
                    let jqTo = $(`#${ope.toId[i]}`);
                    jqTo.prop("outerHTML", ope.from[i]);
                    jqTo = $(`#${ope.toId[i]}`); //yes, re-select
                    await KFK.setNodeEventHandler(jqTo, async function () {
                        KFK.redrawLinkLines(jqTo, "undo", true);
                        if (jqTo.hasClass("lock")) {
                            KFK.updateNodeEvent(jqTo, "draggable", "destroy");
                            KFK.updateNodeEvent(jqTo, "resizable", "destroy");
                            KFK.updateNodeEvent(jqTo, "droppable", "destroy");
                        }
                        KFK.replaceNodeInSelectedDIVs(jqTo);
                        await KFK.syncNodePut("U", jqTo, "undo", null, true, 0, 1);
                    });
                }
            }
            if (ope.from.length > 1) {
                KFK.debug("selected count after undo", KFK.selectedDIVs.length);
                KFK.setSelectedNodesBoundingRect();
            }
        } else if (ope.etype === "SLINE") {
            KFK.hideLineTransformer();
            if (ope.from === "" && ope.to !== "") {
                //ope is C
                let toId = ope.toId;
                let toLine = KFK.svgDraw.findOne(`.${toId}`);
                await KFK.syncLinePut("D", toLine, "undo", null, true);
            } else if (ope.from !== "" && ope.to === "") {
                //ope is D
                let fromId = ope.fromId;
                let fromLine = KFK.restoreShape(fromId, ope.from);
                await KFK.syncLinePut("C", fromLine, "undo", null, true);
            } else if (ope.from !== "" && ope.to !== "") {
                //ope is U
                let toLine = KFK.svgDraw.findOne(`.${ope.toId}`);
                let fromLine = KFK.restoreShape(ope.fromId, ope.from);
                //fromLine与toLine的ID相同，因此在restoreShape时，就自动把toLine换成了fromLine
                //不用删除toLine
                await KFK.syncLinePut("U", fromLine, "undo", toLine, true);
            }
        }
    }

    KFK.opz = KFK.opz - 1;
};

KFK.getLineIdFromString = function (str) {
    let m = str.match(/id\s*=\s*('|")([^"]+)('|")/);
    if (m) {
        return m[2];
    } else return null;
};

KFK.redo = async () => {
    if (KFK.opz >= KFK.opstack.length - 1) {
        KFK.debug("redo 到头了");
        return;
    }
    KFK.opz = KFK.opz + 1;
    let ope = KFK.opstack[KFK.opz];
    if (ope.cmd === "LOCK") {
        KFK.sendCmd("LOCKNODE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: ope.from,
        });
    } else if (ope.cmd === "UNLOCK") {
        KFK.sendCmd("UNLOCKNODE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: ope.from,
        });
    } else if (ope.cmd === "LOCKLINE") {
        KFK.sendCmd("LOCKLINE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: ope.from,
        });
    } else if (ope.cmd === "UNLOCKLINE") {
        KFK.sendCmd("UNLOCKLINE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: ope.from,
        });
    } else {
        if (ope.etype === "DIV") {
            for (let i = 0; i < ope.from.length; i++) {
                if (ope.from[i] === "" && ope.to[i] !== "") {
                    // ope is C
                    let jqTo = $($.parseHTML(ope.to[i]));
                    let nodeid = jqTo.attr("id");
                    KFK.C3.appendChild(el(jqTo));
                    jqTo = $(`#${nodeid}`);
                    await KFK.setNodeEventHandler(jqTo, async function () {
                        KFK.redrawLinkLines(jqTo, "redo", true);
                        if (jqTo.hasClass("lock")) {
                            KFK.updateNodeEvent(jqTo, "draggable", "destroy");
                            KFK.updateNodeEvent(jqTo, "resizable", "destroy");
                            KFK.updateNodeEvent(jqTo, "droppable", "destroy");
                        } else {
                            KFK.debug(nodeid, "NOT hasclass lock");
                        }
                        await KFK.syncNodePut("C", jqTo, "redo", null, true, 0, 1);
                    });
                } else if (ope.from[i] !== "" && ope.to[i] === "") {
                    //ope is D
                    let jqFrom = $(`#${ope.fromId[i]}`);
                    await KFK.syncNodePut("D", jqFrom, "redo", null, true, 0, 1);
                } else if (ope.from[i] != "" && ope.to[i] !== "") {
                    //ope is U
                    let jqFrom = $(`#${ope.fromId[i]}`);
                    jqFrom.prop("outerHTML", ope.to[i]);
                    jqFrom = $(`#${ope.fromId[i]}`);
                    await KFK.setNodeEventHandler(jqFrom, async function () {
                        KFK.redrawLinkLines(jqFrom, "redo", true);
                        if (jqFrom.hasClass("lock")) {
                            KFK.updateNodeEvent(jqFrom, "draggable", "destroy");
                            KFK.updateNodeEvent(jqFrom, "resizable", "destroy");
                            KFK.updateNodeEvent(jqFrom, "droppable", "destroy");
                        }
                        KFK.replaceNodeInSelectedDIVs(jqFrom);
                        await KFK.syncNodePut("U", jqFrom, "redo", null, true, 0, 1);
                    });
                }
            }
            if (ope.from.length > 1) {
                KFK.setSelectedNodesBoundingRect();
            }
        } else if (ope.etype === "SLINE") {
            if (ope.from === "" && ope.to !== "") {
                //ope is C
                let toId = ope.toId;
                let toLine = KFK.restoreShape(toId, ope.to);
                await KFK.syncLinePut("C", toLine, "redo", null, true);
            } else if (ope.from !== "" && ope.to === "") {
                //ope is D
                let fromId = ope.fromId;
                let fromLine = KFK.svgDraw.findOne(`.${fromId}`);
                await KFK.syncLinePut("D", fromLine, "redo", null, true);
            } else if (ope.from !== "" && ope.to !== "") {
                //ope is U
                let fromLine = KFK.svgDraw.findOne(`.${ope.fromId}`);
                let toLine = KFK.restoreShape(ope.toId, ope.to);
                //fromLine与toLine的ID相同，因此在restoreShape时，就自动把fromLine换成了toLine
                //不用删除fromLine
                await KFK.syncLinePut("U", toLine, "redo", fromLine, true);
            }
        }
    }
};

KFK.initLayout = function () {
    KFK.debug("...initLayout");
    KFK.JC1 = $("#C1");
    KFK.C1 = el(KFK.JC1);
    KFK.JS1 = $("#S1");
    KFK.S1 = el(KFK.JS1);
    KFK.JC1.css({
        width: KFK.px(KFK.PageWidth * (KFK.PageNumberHori + 2)),
        height: KFK.px(KFK.PageHeight * (KFK.PageNumberVert + 2)),
    });
};

KFK.scrollToPos = function (pos) {
    KFK.JS1.scrollLeft(pos.x);
    KFK.JS1.scrollTop(pos.y);
};

//create C3 create c3
KFK.initC3 = function () {
    KFK.debug("...initC3");
    KFK.JC3 = $("#C3");
    KFK.C3 = el(KFK.JC3);
    KFK.JC3.css({
        width: KFK.px(KFK.PageWidth * KFK.PageNumberHori),
        height: KFK.px(KFK.PageHeight * KFK.PageNumberVert),
        left: KFK.px(KFK.LeftB),
        top: KFK.px(KFK.TopB),
    });
    // KFK.JC3.focus((evt) => { KFK.debug("JC3 got focus"); })
    KFK.JCBKG = $("#containerbkg");
    KFK.SYSMSG = $("#system_message");
    KFK.SYSMSG.removeClass("noshow");
    KFK.JCBKG.css({
        width: KFK.px(KFK.PageWidth * KFK.PageNumberHori),
        height: KFK.px(KFK.PageHeight * KFK.PageNumberVert),
        left: KFK.px(KFK.LeftB),
        top: KFK.px(KFK.TopB),
    });

    KFK.JC3.dblclick(async function (evt) {
        if (KFK.inDesigner() === false) return;
        if (KFK.isEditting && KFK.quillEdittingNode) {
            await KFK.finishQuillEditting();
            return;
        } else if (KFK.isEditting && KFK.inlineEditor) {
            KFK.endInlineEditing();
        }
        if (KFK.isEditting || KFK.resizing || KFK.dragging) {
            return;
        } else {
            console.log("continue dbl click");
        }
        if (KFK.inOverviewMode === true) {
            KFK.toggleOverview({
                x: evt.offsetX,
                y: evt.offsetY
            });
        } else if (KFK.mode === 'pointer') {
            KFK.toggleOverview();
        }
        KFK.cancelTempLine();
        evt.preventDefault();
        evt.stopImmediatePropagation();
        evt.stopPropagation();
    });
    //click c3
    KFK.JC1.on("click", async function (evt) {
        if (IsSet(KFK.selectedTodo)) {
            KFK.selectedTodo.removeClass('current');
        }
        KFK.hide($('.clickOuterToHide'));
    });
    KFK.JC3.keydown(function (evt) {
        // console.log('JC3.keydown', evt.keyCode, KFK.mode, KFK.drawMode);
        if ((evt.keyCode === 13 || evt.keyCode === 27) && KFK.mode === 'line' && (KFK.drawMode === 'polyline' || KFK.drawMode === 'polygon')) {
            KFK.closePolyPoint();
        }
    });
    KFK.JC3.on("click", async function (evt) {
        if (KFK.inDesigner() === false) return;
        let tmpPoint = {
            x: evt.clientX,
            y: evt.clientY
        };
        if (KFK.pointAfterResize) {
            if (KFK.distance(tmpPoint, KFK.pointAfterResize) < 10) {
                KFK.pointAfterResize = undefined;
                return;
            } else {
                KFK.pointAfterResize = undefined;
            }
        }
        if (KFK.isEditting && KFK.quillEdittingNode) {
            await KFK.finishQuillEditting();
            return;
        } else if (KFK.isEditting && KFK.inlineEditor) {
            KFK.endInlineEditing();
        }
        if (KFK.isEditting || KFK.resizing || KFK.dragging) {
            return;
        }
        evt.preventDefault();
        KFK.closeActionLog();
        if (IsSet(KFK.selectedTodo)) {
            KFK.selectedTodo.removeClass('current');
        }
        KFK.hide($('.clickOuterToHide'));
        if (KFK.ignoreClick) return;

        // KFK.focusOnNode(null);
        KFK.justCreatedJqNode = null;
        KFK.justCreatedShape = null;

        KFK.pickedShape = null;
        KFK.morphedShape = null;

        // if (KFK.mode === 'lock' || KFK.mode === 'connect') {
        //   KFK.setMode('pointer');
        // }
        if (KFK.docIsReadOnly()) return;

        if (KFK.tobeTransformJqLine) KFK.tobeTransformJqLine.removeClass("shadow2");
        KFK.hide("#linetransformer");
        KFK.tobeTransformJqLine = null;

        if (KFK.afterDragging === true) {
            KFK.afterDragging = false;
            // return;
        }
        if (KFK.afterResizing === true) {
            KFK.afterResizing = false;
            // return;
        }

        //place image, place material
        if (KFK.mode === "material" && KFK.materialPicked) {
            let fileId = KFK.myuid();

            await KFK.makeImageDiv(
                fileId,
                KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
                KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
                KFK.materialPicked.url
            );
            return;
        } else if (KFK.mode === "line" && KFK.isFreeHandDrawing === false && IsFalse(KFK.isZoomingShape)) {
            // console.log("yarkShapePoint");
            KFK.yarkShapePoint(
                KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
                KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
                evt.shiftKey
            );
            return;
        } else {
            if (KFK.selectedDIVs.length > 0) {
                if (KFK.duringKuangXuan === false) KFK.cancelAlreadySelected();
            }
            if (cocoConfig.node[KFK.mode]) {
                let variant = "default";
                if (KFK.mode === "yellowtip") {
                    variant = cocoConfig.node.yellowtip.defaultTip;
                }
                let realX = KFK.scalePoint(KFK.scrXToJc3X(evt.clientX));
                let realY = KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY));
                let jqDIV = await KFK.placeNode(
                    evt.shiftKey, KFK.myuid(), KFK.mode, variant, realX, realY, undefined, undefined, "", ""
                );
                await KFK.syncNodePut("C", jqDIV, "new node", null, false, 0, 1);
            }
        }

        // KFK.setRightTabIndex();
        evt.stopImmediatePropagation();
        evt.stopPropagation();
        evt.preventDefault();
    });

    KFK.JC3.mousedown(async (evt) => {
        if (KFK.mode === 'line' && KFK.drawMode === 'freehand' &&
            KFK.shapeDragging === false) {
            KFK.isFreeHandDrawing = true;
            KFK.freeHandPoints = [];
        }
    });
    KFK.JC3.mouseup(async (evt) => {
        if (KFK.inDesigner() === false) return;
        if (KFK.mode === 'line' && KFK.drawMode === 'freehand' &&
            KFK.isFreeHandDrawing === true) {
            if (KFK.freeHandDrawing) {
                KFK.simplifyPoints(KFK.freeHandDrawing, KFK.freeHandPoints, 5);
                let shapeId = "shape_" + KFK.myuid();
                KFK.freeHandDrawing.attr("id", shapeId);
                let option = {
                    color: KFK.YIQColorAux || KFK.APP.model.svg.freehand.color,
                    width: KFK.APP.model.svg.freehand.width,
                    linecap: KFK.APP.model.svg.freehand.linecap ? "round" : "square",
                }
                KFK.freeHandDrawing.addClass("kfkshape").addClass(shapeId).addClass('kfkfreehand').stroke(option);
                KFK.freeHandDrawing.attr("origin-width", option.width);
                KFK.freeHandDrawing.attr("origin-color", option.color);
                KFK.addShapeEventListner(KFK.freeHandDrawing);
                KFK.syncLinePut("C", KFK.freeHandDrawing, "create new", null, false);
            }
            KFK.freeHandDrawing = null;
            KFK.freeHandPoints = [];
            KFK.isFreeHandDrawing = false;
            evt.stopPropagation();
            evt.preventDefault();
            KFK.ignoreClick = true;
        } else {
            KFK.ignoreClick = false;
        }
    });

    KFK.simplifyPoints = function (polyline, points, tolerance) {
        let lastPoint = points[0];
        let newPoints = [];
        newPoints.push(lastPoint);
        let lastIndex = 0;
        for (let i = 1; i < points.length; i++) {
            if (KFK.distance(points[i], lastPoint) >= tolerance) {
                lastPoint = points[i];
                lastIndex = i;
                newPoints.push(points[i]);
            }
        }
        if (lastIndex < points.length - 1) {
            newPoints.push(points[points.length - 1]);
        }
        KFK.plotFreeHandPoints(polyline, newPoints);
    };


    KFK.JC3.on("mousemove", function (evt) {
        if (KFK.inDesigner() === false) return;
        if (KFK.inPresentingMode || KFK.inOverviewMode) return;
        KFK.upateUserMousePos(KFK.APP.model.cocouser, evt.clientX, evt.clientY);

        KFK.currentMousePos.x = evt.clientX;
        KFK.currentMousePos.y = evt.clientY;

        let indicatorX = KFK.scrXToJc1X(KFK.currentMousePos.x);
        let indicatorY = KFK.scrYToJc1Y(KFK.currentMousePos.y);

        $("#modeIndicator").css("left", indicatorX + 10);
        $("#modeIndicator").css("top", indicatorY + 10);
        // KFK.kuangXuanEndPoint = {
        //   x: KFK.scrXToJc3X(evt.clientX),
        //   y: KFK.scrYToJc3Y(evt.clientY)
        // };

        if (KFK.docIsReadOnly()) return;

        let tmpPoint = {
            x: KFK.scalePoint(KFK.scrXToJc3X(KFK.currentMousePos.x)),
            y: KFK.scalePoint(KFK.scrYToJc3Y(KFK.currentMousePos.y)),
        };

        if (
            KFK.shapeToDrag &&
            KFK.docIsReadOnly() === false &&
            KFK.lineLocked(KFK.shapeToDrag) === false
        ) {
            if (KFK.distance(KFK.mousePosToRemember, KFK.currentMousePos) > 5) {
                KFK.shapeDragging = true;
                KFK.isFreeHandDrawing = false;
            }
        } else {
            KFK.shapeToDrag = null;
            if (KFK.isFreeHandDrawing) {
                KFK.addFreeHandPoint(tmpPoint);
                return;
            }
        }
        if (KFK.isEditting || KFK.shapeDragging || KFK.lineTransfomerDragging || KFK.minimapMouseDown) {
            KFK.duringKuangXuan = false;
        }



        if (KFK.mode === "connect") {
            if (KFK.linkPosNode.length === 1) {
                KFK.lineTemping = true;
                let fromPoint = null;
                let toPoint = null;
                let selectedFromIndex = 0;
                let shortestDistance = KFK.distance(KFK.tmpPos.points[0], tmpPoint);
                for (let i = 0; i < KFK.tmpPos.points.length; i++) {
                    fromPoint = KFK.tmpPos.points[i];
                    toPoint = tmpPoint;
                    let tmp_dis = KFK.distance(fromPoint, toPoint);
                    if (tmp_dis < shortestDistance) {
                        shortestDistance = tmp_dis;
                        selectedFromIndex = i;
                    }
                }
                KFK.svgDrawTmpLine(
                    KFK.tmpPos.points[selectedFromIndex].x,
                    KFK.tmpPos.points[selectedFromIndex].y,
                    tmpPoint.x,
                    tmpPoint.y, {
                    color: KFK.YIQColorAux || "#888888",
                    stroke: 10
                }
                );
            }
        }
        if (KFK.mode === "line") {
            if (KFK.drawPoints.length === 1) {
                KFK.lineTemping = true;
                KFK.svgDrawTmpShape(
                    KFK.drawMode,
                    KFK.drawPoints[0].center.x,
                    KFK.drawPoints[0].center.y,
                    tmpPoint.x,
                    tmpPoint.y, {
                    color: KFK.YIQColorAux || "#888888",
                    stroke: 10
                }
                );
            }
        }
        if (
            KFK.shapeDragging &&
            KFK.docIsReadOnly() === false &&
            KFK.lineLocked(KFK.shapeToDrag) === false
        ) {
            let realX = KFK.scalePoint(KFK.scrXToJc3X(evt.clientX));
            let realY = KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY));
            let deltaX = realX - KFK.shapeDraggingStartPoint.x;
            let deltaY = realY - KFK.shapeDraggingStartPoint.y;
            // if (KFK.shapeToDrag.array) {
            //     console.log(typeof KFK.shapeToDrag.array);
            //     console.log(typeof KFK.shapeToDrag.array());
            //     console.log(KFK.shapeToDrag.array());
            // }
            if (
                KFK.shapeToDrag.hasClass("kfkpolyline") ||
                KFK.shapeToDrag.hasClass("kfkpolygon")
            ) {
                let arr = KFK.shapeToDrag.array();
                KFK.shapeToDrag.plot(arr);
            }
            KFK.shapeToDrag.dmove(deltaX, deltaY);
            KFK.shapeDraggingStartPoint.x += deltaX;
            KFK.shapeDraggingStartPoint.y += deltaY;
        }
    });

    KFK.addMinimap();
    KFK.autoScroll.yellow = KFK.JC3;
    KFK.autoScroll.offset = KFK.autoScroll.yellow.offset();
    KFK.autoScroll.offsetWidth = KFK.autoScroll.offset.left + KFK.autoScroll.yellow.width();
    KFK.autoScroll.offsetHeight = KFK.autoScroll.offset.top + KFK.autoScroll.yellow.height();


    KFK.autoScroll.intRightHandler = null;
    KFK.autoScroll.intLeftHandler = null;
    KFK.autoScroll.intTopHandler = null;
    KFK.autoScroll.intBottomHandler = null;
    KFK.autoScroll.distance = 70;
    KFK.autoScroll.timer = 100;
    KFK.autoScroll.step = 10;

    KFK.autoScroll.clearInetervals = function () {
        clearInterval(KFK.autoScroll.intRightHandler);
        clearInterval(KFK.autoScroll.intLeftHandler);
        clearInterval(KFK.autoScroll.intTopHandler);
        clearInterval(KFK.autoScroll.intBottomHandler);
    }

};

KFK.zoomInOut = function (direction) {
    if (KFK.inDesigner() === false || KFK.inOverviewMode || KFK.inPresentingMode) return;
    let scrCenter = KFK.scrCenter();
    let window_width = scrCenter.x * 2;
    let window_height = scrCenter.y * 2;
    let scaleX = window_width / KFK._width;
    let scaleY = window_height / KFK._height;
    let minScale = Math.min(scaleX, scaleY);
    let pageScale = Math.min(window_width / KFK.PageWidth, window_height / KFK.PageHeight);
    let tmp = KFK.scaleRatio;
    try {
        if (direction === 'zoomin') {
            if (tmp < 1) {
                tmp = tmp * 1.2;
                if (tmp > 1) tmp = 1;
                KFK.scale(tmp);
            }
        } else if (direction === '100%') {
            KFK.scale(1);
        } else if (direction === 'page') {
            KFK.scale(pageScale);
        } else {
            if (tmp > minScale) {
                tmp = tmp / 1.2;
                if (tmp < minScale) tmp = minScale;
                KFK.scale(tmp);
            }
        }
    } catch (error) { } finally {
        KFK.C3.dispatchEvent(KFK.refreshC3event);
    }
};

KFK.addFreeHandPoint = function (point) {
    KFK.freeHandPoints.push(point);
    if (KFK.freeHandPoints.length === 2) {
        KFK.freeHandDrawing = KFK.svgDraw.polyline(
            [
                [KFK.freeHandPoints[0].x, KFK.freeHandPoints[0].y],
                [KFK.freeHandPoints[1].x, KFK.freeHandPoints[1].y]
            ]
        ).fill('none').stroke({
            width: 1,
            color: '#FF0000'
        });
    } else if (KFK.freeHandPoints.length > 2) {
        KFK.plotFreeHandPoints(KFK.freeHandDrawing, KFK.freeHandPoints);
    }
};
KFK.plotFreeHandPoints = function (drawing, points) {
    let arr = [];
    for (let i = 0; i < points.length; i++) {
        arr.push([points[i].x, points[i].y]);
    }
    drawing.plot(arr);
};

KFK.isDuringKuangXuan = function () {
    if (
        KFK.mode === "pointer" &&
        KFK.kuangXuanMouseIsDown &&
        KFK.shapeDragging === false &&
        KFK.lineTransfomerDragging === false &&
        KFK.minimapMouseDown === false &&
        KFK.isShowingModal === false &&
        KFK.touchChatTodo === false &&
        KFK.isEditting === false &&
        KFK.isZoomingShape === false
    )
        return true;
    else {
        return false;
    }
};

KFK.addMinimap = function () {
    KFK.refreshC3event = new CustomEvent("refreshC3");
    KFK.zoomEvent = new CustomEvent("zoomC3");
    $("#minimap").minimap(KFK, KFK.JS1, KFK.JC3, KFK.JC1);
};

KFK.get13Number = function (str) {
    let arr = str.split("");
    let num = 0;
    arr.forEach((ch) => {
        num += ch.codePointAt(0);
    });
    num = num % 13;
    return num;
};

KFK.upateUserMousePos = function (user, x, y) {
    let pos = {
        x: KFK.scrXToJc1X(x),
        y: KFK.scrYToJc1Y(y)
    };
    let bglabel = user.name;

    if (KFK.mouseTimer !== null) {
        clearTimeout(KFK.mouseTimer);
    }
    let consisedUser = {
        userid: user.userid,
        name: user.name
    };
    KFK.mouseTimer = setTimeout(function () {
        KFK.WS.put("MOUSE", {
            user: consisedUser,
            pos: pos
        });
        KFK.mouseTimer = null;
    }, 5);
    //  KFK.WS.put("MOUSE", { user: consisedUser, pos: pos });
};

KFK.showOtherUserMovingBadge = function (mouse) {
    let pos = mouse.pos;
    let userid = mouse.user.userid;
    let bgid = KFK.badgeIdMap[userid];
    if (!bgid) {
        bgid = KFK.myuid();
        KFK.badgeIdMap[userid] = bgid;
    }
    let bglabel = mouse.user.name;
    let jqBadgeDIV = $(document).find("#badge_" + bgid);
    let class_ser = KFK.get13Number(bgid);
    if (jqBadgeDIV.length === 0) {
        let tmpdiv = document.createElement("div");
        KFK.C3.appendChild(tmpdiv);
        jqBadgeDIV = $(tmpdiv);
        jqBadgeDIV.attr("id", "badge_" + bgid);
        jqBadgeDIV.addClass(`userbadge userbadge_${class_ser}`);
    }
    jqBadgeDIV.css("display", "block");
    jqBadgeDIV.html(bglabel);

    let width = jqBadgeDIV.width();
    let height = jqBadgeDIV.height();

    let wwidth = window.innerWidth;
    let wheight = window.innerHeight;
    let x = KFK.jc1XToJc3X(pos.x);
    let y = KFK.jc1YToJc3Y(pos.y);
    let sc = $("#S1");
    let deltaX = sc.scrollLeft() - KFK.LeftB;
    let deltaY = sc.scrollTop() - KFK.TopB;
    if (x - deltaX > wwidth) {
        x = deltaX + wwidth - width;
    } else if (x < deltaX) {
        x = deltaX;
    }
    if (y - deltaY > wheight) {
        y = deltaY + wheight - height;
    } else if (y < deltaY) {
        y = deltaY;
    }

    jqBadgeDIV.css("top", y);
    jqBadgeDIV.css("left", x);

    if (KFK.badgeTimers[bgid] !== undefined) {
        clearTimeout(KFK.badgeTimers[bgid]);
    }
    //过一段时后消失, 如果其他用户再动, 再显示
    KFK.badgeTimers[bgid] = setTimeout(() => {
        jqBadgeDIV.css("display", "none");
        delete KFK.badgeTimers[bgid];
    }, cocoConfig.badge.lastSeconds);
};

KFK.getImageSrc = (img) => {
    if (KFK.APP && KFK.APP.images && KFK.APP.images[img]) {
        return KFK.APP.images[img].src;
    } else {
        return undefined;
    }
};

KFK.resetNodeZIndex = function (data) {
    $.each(data, (i, val) => {
        $(`#${i}`).css("z-index", val);
    });
};

KFK.moveLineMoverTo = function (position) {
    $("#linetransformer").css("left", position.x - 10);
    $("#linetransformer").css("top", position.y - 10);
};
/**
 * 选定一个元素
 */
KFK.selectNode = function (jqDIV) {
    jqDIV.addClass("selected");
    KFK.selectedDIVs.push(jqDIV);
    KFK.setSelectedNodesBoundingRect();
};

/**
 * 根据选定的多个元素，显示其周围的边框
 */
KFK.setSelectedNodesBoundingRect = function () {
    let brect = $(".boundingrect");
    if (brect.length <= 0) {
        let rect = document.createElement("div");
        brect = $(rect);
        brect.addClass("boundingrect");
        brect.appendTo(KFK.JC3);
        brect.css("z-index", -1);
    }
    if (KFK.selectedDIVs.length > 1) {
        let rect = KFK.getBoundingRectOfSelectedDIVs();
        brect.css("left", rect.left - cocoConfig.ui.boundingrect_padding);
        brect.css("top", rect.top - cocoConfig.ui.boundingrect_padding);
        brect.css("width", rect.width + cocoConfig.ui.boundingrect_padding * 2);
        brect.css("height", rect.height + cocoConfig.ui.boundingrect_padding * 2);
        brect.show();
    } else {
        brect.hide();
    }
};
KFK.kuangXuan = function (pt1, pt2) {
    KFK.debug("pt1", jstr(pt1), "pt2", jstr(pt2));
    let x1 = pt1.x + KFK.LeftB;
    let y1 = pt1.y + KFK.TopB;
    let x2 = pt2.x + KFK.LeftB;
    let y2 = pt2.y + KFK.TopB;
    KFK.debug(x1, y1, x2, y2);
    if (Math.abs(x1 - x2) < 10 && Math.abs(y1 - y2) < 10) {
        //这里，如果滑动大小横向和纵向都小于10， 则不作为框选
        return;
    }
    let jqRect = $("#selectingrect");
    jqRect.css("left", Math.min(x1, x2));
    jqRect.css("top", Math.min(y1, y2));
    jqRect.css("width", Math.abs(x1 - x2));
    jqRect.css("height", Math.abs(y1 - y2));
    KFK.duringKuangXuan = true;
    jqRect.show();
};

KFK.scaleRect = (rect) => {
    for (let key in rect) {
        rect[key] = rect[key] / KFK.scaleRatio;
    }
    return rect;
};
KFK.scalePoint = (pt) => {
    return pt / KFK.scaleRatio;
};
KFK.endKuangXuan = function (pt1, pt2, shiftKey) {
    pt1.x = KFK.scalePoint(pt1.x);
    pt1.y = KFK.scalePoint(pt1.y);
    pt2.x = KFK.scalePoint(pt2.x);
    pt2.y = KFK.scalePoint(pt2.y);

    let jqRect = $("#selectingrect");
    jqRect.hide();
    let rect = {
        left: Math.min(pt1.x, pt2.x),
        top: Math.min(pt1.y, pt2.y),
        width: Math.abs(pt1.x - pt2.x),
        height: Math.abs(pt1.y - pt2.y),
    };
    rect.right = rect.left + rect.width;
    rect.bottom = rect.top + rect.height;
    if (rect.width < 10 && rect.height < 10) {
        //这里，如果滑动大小横向和纵向都小于10， 则不作为框选
        return;
    }

    if (shiftKey === false) {
        while (KFK.selectedDIVs.length > 0) {
            KFK.deselectNode(KFK.selectedDIVs[0]);
        }
    }
    //为防止混乱，框选只对node div有效果
    KFK.JC3.find(".kfknode").each((index, div) => {
        let jqDiv = $(div);
        let divRect = KFK.divRect(jqDiv);
        if (
            rect.left < divRect.right &&
            rect.right > divRect.left &&
            rect.top < divRect.bottom &&
            rect.bottom > divRect.top
        ) {
            KFK.selectNode(jqDiv);
        }
    });
    if (KFK.selectedDIVs.length > 1) {
        KFK.AI('multi_select');
        KFK.resetPropertyOnMultipleNodesSelected();
    }
};

KFK.deselectNode = function (theDIV) {
    $(theDIV).removeClass("selected");
    let index = KFK.selectedDIVs.indexOf(theDIV);
    KFK.selectedDIVs.splice(index, 1);
    KFK.setSelectedNodesBoundingRect();
};

KFK.selectNodesOnClick = function (jqDIV, shiftKey) {
    let exist = KFK.selectedDIVs.indexOf(jqDIV);
    if (shiftKey) {
        if (exist >= 0) {
            KFK.deselectNode(KFK.selectedDIVs[exist]);
        } else {
            KFK.selectNode(jqDIV);
        }
    } else {
        while (KFK.selectedDIVs.length > 0) {
            KFK.deselectNode(KFK.selectedDIVs[0]);
        }
        KFK.selectNode(jqDIV);
    }
};

KFK.getNearGridPoint = function (x, y) {
    if (y === undefined && x.x) {
        return KFK._getNearGridPoint(x.x, x.y);
    } else {
        return KFK._getNearGridPoint(x, y);
    }
};
KFK._getNearGridPoint = function (x, y) {
    let newX = x;
    let newY = y;
    if (x % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
        newX = Math.floor(x / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
    } else {
        newX =
            (Math.floor(x / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
    }
    if (y % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
        newY = Math.floor(y / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
    } else {
        newY =
            (Math.floor(y / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
    }
    return {
        x: newX,
        y: newY
    };
};

KFK.px = (v) => {
    if (typeof v === "string") {
        if (v.endsWith("px")) {
            return v;
        } else {
            return v + "px";
        }
    } else {
        return v + "px";
    }
};

KFK.unpx = (v) => {
    if (typeof v === "string" && v.endsWith("px")) {
        return parseInt(v.substr(0, v.length - 2));
    }
};

/**
 * a Node object 放在起中心位置，构建Node对象时使用的x,y指的是其中心位置
 * 在实际放置时，需要算出它的左上角位置
 * 
 * @param node a Node object
 * @return the left/top point of the node
 */
KFK.ltPos = function (node) {
    return {
        x: node.x - node.width * 0.5,
        y: node.y - node.height * 0.5,
    };
};

KFK.getNodeTextAlignment = function (jqDiv) {
    let ret = "left";
    let jcTmp = jqDiv.css("justify-content");
    if (jcTmp === "flex-start") ret = "left";
    else if (jcTmp === "center") ret = "center";
    else if (jcTmp === "flex-end") ret = "right";

    return ret;
};

KFK.setNodeTextAlignment = function (jqElem, theType, align) {
    if (theType === "textarea") {
        if (align === "left") {
            jqElem.css("text-align", "left");
            jqElem.css("text-align-last", "left");
        } else if (align === "center") {
            jqElem.css("text-align", "center");
            jqElem.css("text-align-last", "center");
        } else if (align === "right") {
            jqElem.css("text-align", "right");
            jqElem.css("text-align-last", "right");
        }
    }
};

KFK.editTextNodeWithTextArea = function (
    innerNode,
    theDIV,
    enterSelect = false
) {
    KFK.isEditting = true;
    theDIV.editting = true;
    innerNode.editting = true;
    let oldText = innerNode.innerText;
    let oldHTML = innerNode.innerHTML;
    innerNode.style.visibility = "hidden";
    // theDIV.style.background = "transparent";
    var textarea = null;
    if (theDIV.type === "text") textarea = document.createElement("input");
    else {
        textarea = document.createElement("textarea");
        $(textarea).css("word-wrap", "break-word");
        $(textarea).css("word-break", "break-all");
        $(textarea).css("text-wrap", "unrestricted");
    }
    textarea.style.zIndex = parseInt(theDIV.style.zIndex) + 1;
    KFK.C3.appendChild(textarea);
    textarea.style.position = "absolute";
    textarea.style.top = theDIV.style.top;
    textarea.style.left = theDIV.style.left;
    textarea.style.width = theDIV.style.width;
    textarea.style.height = theDIV.style.height;
    textarea.style.borderRadius = theDIV.style.borderRadius;
    textarea.style.color = theDIV.style.color;
    textarea.style.background = theDIV.style.background;
    // textarea.style.backgroundColor = theDIV.style.backgroundColor;
    textarea.style.backgroundColor = "transparent";
    textarea.style.justifyContent = theDIV.style.justifyContent;
    textarea.style.fontSize = innerNode.style.fontSize;
    textarea.style.fontFamily = innerNode.style.fontFamily;
    textarea.style.borderColor = "#000";
    textarea.style.borderWidth = innerNode.style.borderWidth;

    textarea.style.padding = innerNode.style.padding;
    textarea.style.margin = innerNode.style.margin;
    textarea.style.overflow = "hidden";
    textarea.style.outline = innerNode.style.outline;
    textarea.style.resize = "none";
    textarea.style.transformOrigin = "left top";

    KFK.setNodeTextAlignment(
        $(textarea),
        "textarea",
        KFK.getNodeTextAlignment($(theDIV))
    );
    textarea.style.verticalAlign = "middle";

    textarea.focus();
    textarea.value = oldText;
    textarea.select();

    async function removeTextarea(txtChanged) {
        $(textarea).remove();
        window.removeEventListener("click", handleOutsideClick);
        innerNode.style.visibility = "visible";
        KFK.isEditting = false;
        innerNode.editting = false;
        theDIV.editting = false;
        KFK.focusOnC3();
        if (txtChanged) {
            await KFK.syncNodePut(
                "U",
                $(theDIV).clone(),
                "change text",
                KFK.fromJQ,
                false,
                0,
                1
            );
        }
    }

    function setTextareaWidth(newWidth) {
        if (!newWidth) {
            // set width for placeholder
            newWidth = KFK.unpx(innerNode.style.width);
        }
        // some extra fixes on different browsers
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth);
        }

        var isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
        if (isEdge) {
            newWidth += 1;
        }
        textarea.style.width = newWidth + "px";
    }

    textarea.oncopy = function (evt) {
        evt.stopPropagation();
    };
    textarea.onpaste = function (evt) {
        evt.stopPropagation();
    };

    textarea.addEventListener("keydown", function (evt) {

        if (evt.keyCode === 13) {
            let finishEdit = false;
            if (KFK.APP.model.viewConfig.enterToConfirmInput && !(evt.shiftKey || evt.ctrlKey || evt.metaKey)) {
                finishEdit = true;
            } else if (!KFK.APP.model.viewConfig.enterToConfirmInput && (evt.shiftKey || evt.ctrlKey || evt.metaKey)) {
                finishEdit = true;
            }
            if (finishEdit) {
                innerNode.innerText = textarea.value;
                removeTextarea(textarea.value !== oldText);
                KFK.focusOnC3();
            }
        }
        // on esc do not set value back to node
        else if (evt.keyCode === 27) {
            removeTextarea(false);
            evt.stopImmediatePropagation();
            evt.stopPropagation();
            KFK.focusOnC3();
        } else {
            if (evt.keyCode == 35 || evt.keyCode === 34) {
                //END  || PageDown
                evt.preventDefault();
                evt.stopPropagation();
            } else if (evt.keyCode === 36 || evt.keyCode === 33) {
                //HOME
                evt.preventDefault();
                evt.stopPropagation();
            }
        }
        evt.stopImmediatePropagation();
        evt.stopPropagation();
    });

    function handleOutsideClick(evt) {
        if (evt.target !== textarea) {
            innerNode.innerText = textarea.value;
            removeTextarea(textarea.value !== oldText);
            KFK.focusOnC3();
        }
    }
    setTimeout(() => {
        window.addEventListener("click", handleOutsideClick);
    });
};

KFK.getKFKNodeNumber = function () {
    let nodes = KFK.JC3.find(".kfknode");
    return nodes.length;
};

KFK.onImportBrKeyDown = async function (evt) {
    evt.stopPropagation();
    //缺省情况下，textarea中输入tab时，会跳到下一个控件上，
    //下面的代码防止缺省行为，并在正确位置插入TAB符号
    if (evt.keyCode == 9) {
        evt.preventDefault();
        let txtarea = document.getElementById('textarea-importbr');
        var start = txtarea.selectionStart;
        var end = txtarea.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(txtarea).val($(txtarea).val().substring(0, start) +
            "\t" +
            $(txtarea).val().substring(end));

        // put caret at right position again
        txtarea.selectionStart =
            txtarea.selectionEnd = start + 1;
    }
};

KFK.beginImportBr = async function () {
    const TP = require("./textParser").TP;
    let brainRoot = KFK.lastFocusOnJqNode;
    if (NotSet(brainRoot)) {
        let x = y = w = h = 0;
        x = KFK.scalePoint(KFK.scrXToJc3X(KFK.currentMousePos.x));
        y = KFK.scalePoint(KFK.scrYToJc3Y(KFK.currentMousePos.y));
        w = 140;
        h = 100;
        brainRoot = await KFK.placeNode(false, KFK.myuid(),
            'textblock', 'default',
            x, y, w, h, "脑图中心节点", '');
    };
    let rootX = KFK.divCenter(brainRoot);
    let rootY = KFK.divMiddle(brainRoot);
    let rootWidth = KFK.divWidth(brainRoot);
    TP.setDimension(100, 20, 40, 80, rootX, rootY, rootWidth);
    TP.parse(KFK.APP.model.importbrtext, async function (arr) {
        let brainRootClone = brainRoot.clone();
        let Nodes = [];
        for (let i = 0; i < arr.length; i++) {
            let aJNode = await KFK.placeNode(false, arr[i].nodeid,
                'textblock', 'default',
                arr[i].left, arr[i].top, TP.nodeWidth, TP.nodeHeight,
                arr[i].str, '');
            //修改背景和边框为透明
            aJNode.css("background-color", "transparent");
            aJNode.css("border-color", "transparent");
            if (arr[i].tab === 0) {
                KFK.drawPathBetween(brainRoot, aJNode);
                KFK.buildConnectionBetween(brainRoot, aJNode);
            } else {
                let parentJQ = $('#' + arr[i].parent_nodeid);
                KFK.drawPathBetween(parentJQ, aJNode);
                KFK.buildConnectionBetween(parentJQ, aJNode);
            }
            Nodes.push(aJNode);
        }
        for (let i = 0; i < Nodes.length; i++) {
            await KFK.syncNodePut("C", Nodes[i], "importBr", null, false, i, arr.length);
            await KFK.sleep(100);
        }
        await KFK.syncNodePut("U", brainRoot, "importBr", brainRootClone, false, 0, 1);
    });
};

/**
 * 在C3上放置一个对象
 * @param  shfitKey，是否按着shiftkey
 * @param  id, id of the new node,
 * @param  type  one of text/textblock/yellowtip/richtext
 * @param  variant  default, usefull for yellowtip only.
 * @param   x  the x of the center point, in C3's dimension
 * @param   y  the y of the center point, in C3's dimension
 * @param   w  the width of the node
 * @param   h  the height of the node
 * @param   attach  the inner content
 * @param   attach2  the lower inner content, which has a ossimage class which z-index is -1, normally, attach2 is suitable for place a backgrund div
 */
KFK.placeNode = async function (shiftKey, id, type, variant, x, y, w, h, attach, attach2) {
    let aNode = new Node(id, type, variant, x, y, w, h, attach, attach2);

    let nodeDIV = await KFK._createNode(aNode);
    let jqDIV = $(nodeDIV);
    KFK.justCreatedJqNode = jqDIV;
    KFK.lastCreatedJqNode = jqDIV;

    //如果在脑图模式下，则自动建立脑图链接
    await KFK.LinkFromBrainCenter(KFK.justCreatedJqNode);

    return jqDIV;
};

KFK.LinkFromBrainCenter = async function (jqNode) {
    if (KFK.brainstormMode && KFK.brainstormFocusNode) {
        let divBefore = KFK.brainstormFocusNode.clone();
        divBefore.find(".brsnode").remove();
        KFK.drawPathBetween(KFK.brainstormFocusNode, jqNode);
        KFK.buildConnectionBetween(KFK.brainstormFocusNode, jqNode);

        await KFK.syncNodePut(
            "U",
            KFK.brainstormFocusNode.clone(),
            "brainstorm",
            divBefore,
            false,
            0,
            1
        );
    }
};
KFK._createNode = async function (node) {
    let nodeCount = KFK.getKFKNodeNumber();
    KFK.debug("createNode ", JSON.stringify(node));
    var innerObj = null;
    if (node.type === "image") {
        innerObj = document.createElement("img");
        innerObj.src = node.attach;
        innerObj.style.width = KFK.px(node.width);
        innerObj.style.height = KFK.px(node.height);
    } else if (node.type === "text") {
        innerObj = document.createElement("div");
    } else if (node.type === "yellowtip") {
        innerObj = document.createElement("span");
    } else if (node.type === "textblock") {
        innerObj = document.createElement("div");
    } else if (node.type === "richtext") {
        innerObj = document.createElement("div");
    } else {
        KFK.debug(`${node.type} is not supported`);
        return;
    }
    innerObj.innerHTML = node.attach ?
        node.attach :
        cocoConfig.node[node.type].inner.content;
    if (node.attach2 === undefined) {
        KFK.printCallStack("attach2 should not be undefined");
    }
    let jInner = $(innerObj);
    jInner.css(cocoConfig.node[node.type].inner.style);
    jInner.addClass("innerobj");
    jInner.addClass("inner_" + node.type);
    if (node.type === "text") {
        jInner.attr("contenteditable", "true");
        jInner.attr("spellcheck", "false");
    } else if (node.type === "richtext") {
        jInner.addClass("ql-viewer");
        jInner.addClass("ql-editor");
        //保证 ql-editor-pointer存在, 这个class用于覆盖ql-editor的text光标
        jInner.addClass("ql-editor-pointer");
    }

    let nodeDIV = document.createElement("div");
    let jqNodeDIV = $(nodeDIV);
    jqNodeDIV.attr("id", node.id);
    jqNodeDIV.css(cocoConfig.node[node.type].style);
    jqNodeDIV.css("position", "absolute");
    jqNodeDIV.css("top", KFK.px(KFK.ltPos(node).y));
    jqNodeDIV.css("left", KFK.px(KFK.ltPos(node).x));
    jqNodeDIV.css("width", KFK.px(node.width));
    jqNodeDIV.css("height", KFK.px(node.height));
    jqNodeDIV.css("z-index", `${nodeCount + 1}`);
    //default padding for all
    $(nodeDIV).attr("variant", "default");
    //click时，切换selected状态
    if (node.type === "yellowtip") {
        //create tip
        let rect = KFK.getShapeDynamicDefaultSize(
            "yellowtip",
            cocoConfig.node.yellowtip.defaultTip
        );
        KFK._setTipBkgImage(
            jqNodeDIV,
            cocoConfig.node.yellowtip.defaultTip,
            cocoConfig.node.yellowtip.defaultColor
        );
        jqNodeDIV.attr("variant", cocoConfig.node.yellowtip.defaultTip);
        jqNodeDIV.css("width", rect.w);
        jqNodeDIV.css("height", rect.h);
        jqNodeDIV.addClass("yellowtip");
    }

    jqNodeDIV.addClass("kfknode");
    jqNodeDIV.addClass("kfk_" + node.type);
    nodeDIV.appendChild(innerObj);
    if (node.attach2 !== "") {
        let jBkg = $('<div class="ossimage">' + node.attach2 + "</div>");
        jBkg.appendTo(jqNodeDIV);
    }

    //set editors
    let allEditorDIV = document.createElement("div");
    $(allEditorDIV).addClass("cocoeditors");
    nodeDIV.appendChild(allEditorDIV);
    let lastEditorDIV = document.createElement("div");
    $(lastEditorDIV).addClass("lastcocoeditor");
    nodeDIV.appendChild(lastEditorDIV);
    if (KFK.APP.model.showEditor === "none") {
        $(allEditorDIV).css("display", "none");
        $(lastEditorDIV).css("display", "none");
    } else if (KFK.APP.model.showEditor === "last") {
        $(allEditorDIV).css("display", "none");
        $(lastEditorDIV).css("display", "block");
    } else if (KFK.APP.model.showEditor === "all") {
        $(allEditorDIV).css("display", "block");
        $(lastEditorDIV).css("display", "none");
    }
    jqNodeDIV.attr("nodetype", node.type);
    jqNodeDIV.attr(
        "edittable",
        cocoConfig.node[node.type].edittable ? true : false
    );
    if (node.type === "yellowtip") {
        //设置图形的缺省颜色
        KFK.setTipBkgColor(jqNodeDIV, KFK.APP.model.tipBkgColor);
    }

    KFK.C3.appendChild(nodeDIV);

    await KFK.setNodeEventHandler(jqNodeDIV);

    return nodeDIV;
};

//删除添加eventHandler带来的额外的、会引起复制节点event响应不正常的内容
KFK.cleanNodeEventFootprint = function (jqNodeDIV) {
    jqNodeDIV.find(".ui-resizable-handle").remove();
    jqNodeDIV.find(".locklabel").remove();
    jqNodeDIV.removeClass(
        "ui-resizable ui-draggable ui-draggable-handle ui-draggable-dragging ui-droppable selected ui-resizable-autohide shadow1 shadow2 lock"
    );
};

/**
 * 在复制剪切节点时，需要把original, chatlist, todolist这些类去掉
 * 预约区别开原始列表和复制列表
 */
KFK.cleanTodoChatForBackup = function (jqNodeDIV) {
    jqNodeDIV.find(".original").removeClass('original');
    jqNodeDIV.removeClass(
        "chatlist todolist"
    );
};

KFK.syncNodeContentPut = async function (nodeID, content) {
    if (KFK.docIsReadOnly()) return;
    try {
        let zipped = await gzip(content);
        let payload = {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            etype: "DIV",
            nodeid: nodeID,
            content: zipped,
            offline: false,
            lastupdate: new Date().getTime(),
        };
        let result = await KFK.sendCmd("CONTENT", payload);
    } catch (err) {
        KFK.debug(err);
    }
};

KFK.syncNodePut = async function (
    cmd,
    jqDIV,
    reason,
    jqBeforeChange,
    isUndoRedo = false,
    ser = 0,
    count = 1
) {
    if (KFK.docIsReadOnly()) return;
    if (KFK.nodeLocked(jqDIV)) return;
    if (jqDIV)
        jqDIV.find('.brsnode').remove();
    if (jqBeforeChange)
        jqBeforeChange.find('.brsnode').remove();
    if (ser === undefined || count === undefined) {
        KFK.error("syncNodePut call must have ser and count provided");
    }
    try {
        if (!(KFK.APP.model.cocouser && KFK.APP.model.cocouser.name)) {
            console.error("userinfo was not configured");
            return;
        }

        if (cmd === "C" || cmd === "U") {
            KFK.addEditorToNode(jqDIV, KFK.APP.model.cocouser.name);
        }
        //在服务端更新offline时，用lastupdate做比较
        jqDIV.attr("lastupdate", new Date().getTime());
        let nodeID = jqDIV.attr("id");
        let nodeType = jqDIV.attr("nodetype");
        let tobeSync = jqDIV.clone();
        KFK.cleanNodeEventFootprint(tobeSync);
        if (cmd === "U") {
            //如果这是一个quilling
            if (tobeSync.find(".innerobj").hasClass("ql-editor")) {
                //保证ql-toolbar不被上传
                tobeSync.find(".ql-toolbar").remove();
                //保证 quilling-by不被上传
                tobeSync.find(".quilling-by").remove();
                //保证 ql-editor-pointer存在, 这个class用于覆盖ql-editor的text光标
                tobeSync.find(".innerobj").addClass("ql-editor-pointer");
            }
        }
        let nodeContent = tobeSync.prop("outerHTML");
        let isOffline = tobeSync.hasClass("offline");
        tobeSync.removeClass("offline");

        let htmlContent = tobeSync.prop("outerHTML");
        let base64Content = KFK.codeToBase64(htmlContent);
        let gzipped = await gzip(htmlContent);
        let payload = {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            etype: "DIV",
            nodeid: nodeID,
            content: cmd === "D" ? nodeID : gzipped,
            offline: isOffline,
            lastupdate: tobeSync.attr("lastupdate"),
        };
        //undo redo操作不能再次放入opentry
        //todo, chat不支持undo / redo
        if (isUndoRedo === false && reason !== 'todo' && reason !== 'chat') {
            let fromContent = "";
            let toContent = "";
            let fromId = "";
            let toId = "";
            if (cmd === "U") {
                if (jqBeforeChange && reason !== "offline_not_undoable") {
                    // 参数传递过来
                    KFK.cleanNodeEventFootprint(jqBeforeChange);
                    fromContent = jqBeforeChange.prop("outerHTML");
                    fromId = jqBeforeChange.attr("id");
                }
                toContent = tobeSync.prop("outerHTML");
                toId = tobeSync.attr("id");
            } else if (cmd === "C") {
                fromContent = "";
                fromId = "";
                if (reason === "MARK_UNDOABLE") {
                    KFK.cleanNodeEventFootprint(KFK.fromJQ);
                    fromContent = KFK.fromJQ.prop("outerHTML");
                    fromId = KFK.fromJQ.attr("id");
                }
                toContent = tobeSync.prop("outerHTML");
                toId = tobeSync.attr("id");
            } else if (cmd === "D") {
                fromContent = tobeSync.prop("outerHTML");
                fromId = tobeSync.attr("id");
                toContent = "";
                toId = "";
            }
            if (ser === 0) {
                KFK.opArr_from = [];
                KFK.opArr_to = [];
                KFK.opArr_fromId = [];
                KFK.opArr_toId = [];
            }
            KFK.opArr_from.push(fromContent);
            KFK.opArr_to.push(toContent);
            KFK.opArr_fromId.push(fromId);
            KFK.opArr_toId.push(toId);

            if (reason !== "offline_not_undoable") {
                if (ser === count - 1) {
                    let opEntry = {
                        cmd: cmd,
                        etype: "DIV",
                        from: KFK.opArr_from,
                        to: KFK.opArr_to,
                        fromId: KFK.opArr_fromId,
                        toId: KFK.opArr_toId,
                    };
                    // KFK.debug('Batch :', ser, 'of', count);
                    // KFK.debug("Compele batch op_entry: ", opEntry);
                    KFK.yarkOpEntry(opEntry);
                }
            }
        }

        jqDIV.removeClass("offline");

        let result = await KFK.sendCmd(cmd, payload);
        //TODO: 仔细考虑离线处理策略
        if (result === false) {
            jqDIV.addClass("offline");
        }
    } catch (err) {
        KFK.debug(err);
    } finally {
        KFK.C3.dispatchEvent(KFK.refreshC3event);
    }
};

KFK.syncLinePut = async function (cmd, svgLine, reason, svgFrom, isUndoRedo) {
    if (KFK.docIsReadOnly()) return;

    try {
        if (!(KFK.APP.model.cocouser && KFK.APP.model.cocouser.name)) {
            console.error("userinfo was not configured");
            return;
        }
        if (cmd === "C" || cmd === "U") {
            svgLine.attr("lastEditor", KFK.APP.model.cocouser.name);
        }
        svgLine.attr("lastupdate", new Date().getTime());
        let isOffline = svgLine.hasClass("offline");
        svgLine.removeClass("offline");
        let svgContent = svgLine.svg();
        let gzipped = await gzip(svgContent);
        let payload = {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            etype: "SLINE",
            nodeid: svgLine.attr("id"),
            content: cmd === "D" ? svgLine.attr("id") : gzipped,
            offline: isOffline,
            lastupdate: svgLine.attr("lastupdate"),
        };

        let formContent = (toContent = fromId = toId = "");
        switch (cmd) {
            case "C":
                fromContent = "";
                fromId = "";
                toContent = svgLine ? svgLine.svg() : "";
                toId = svgLine ? svgLine.attr("id") : "";
                break;
            case "U":
                fromContent = svgFrom ? svgFrom.svg() : "";
                fromId = svgFrom ? svgFrom.attr("id") : "";
                toContent = svgLine ? svgLine.svg() : "";
                toId = svgLine ? svgLine.attr("id") : "";
                break;
            case "D":
                fromContent = svgLine ? svgLine.svg() : "";
                fromId = svgLine ? svgLine.attr("id") : "";
                toContent = "";
                toId = "";
                break;
        }
        if (isUndoRedo === false) {
            let opEntry = {
                cmd: cmd,
                etype: "SLINE",
                from: fromContent,
                fromId: fromId,
                to: toContent,
                toId: toId,
            };
            if (reason !== "offline_not_undoable") {
                KFK.yarkOpEntry(opEntry);
            }
        } else {
            KFK.debug("syncLinePut, isUndoRedo", isUndoRedo, "payload", payload);
        }

        svgLine.removeClass("offline");
        let result = await KFK.sendCmd(cmd, payload);
        if (result === false) {
            svgLine.addClass("offline");
        }
    } catch (err) {
        KFK.debug(err);
    } finally {
        KFK.C3.dispatchEvent(KFK.refreshC3event);
    }
};

KFK.yarkOpEntry = function (opEntry) {
    KFK.opstack.splice(KFK.opz + 1, KFK.opstacklen);
    if (KFK.opstack.length >= KFK.opstacklen) {
        KFK.opstack.shift();
        KFK.opz = KFK.opz - 1;
        if (KFK.opz < -1) KFK.opz = -1;
    }
    KFK.opstack.push(opEntry);
    KFK.opz = KFK.opz + 1;
};

function getNull(value) {
    switch (value) {
        case undefined:
        case null:
        case "undefined":
        case "null":
            return true;
        default:
            return false;
    }
}

function getBoolean(value) {
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}

KFK.showDocOpMenu = function (doc, index, evt) {
    evt.stopPropagation();
    let docopmenu = $(".docopmenu");
    KFK.APP.setData("model", "currentDoc", doc);
    if (docopmenu.hasClass("noshow") || index !== KFK.lastDocOpIndex) {
        let x = evt.pageX;
        let y = evt.pageY;
        docopmenu.css({
            position: "absolute",
            left: x - 135,
            top: y - 10,
            "z-index": 999999,
        });
        docopmenu.removeClass("noshow");
        KFK.lastDocOpIndex = index;
    } else {
        docopmenu.addClass("noshow");
    }
};

KFK.hideDocOpMenu = function () {
    let docopmenu = $(".docopmenu");
    docopmenu.addClass("noshow");
};

//jqNode can be a node or even a svgline
KFK.anyLocked = function (jqNode) {
    if (jqNode) return KFK.docIsReadOnly() || KFK.nodeLocked(jqNode);
    else return KFK.docIsReadOnly();
};

KFK.notAnyLocked = function (jqNode) {
    return !KFK.anyLocked(jqNode);
};

KFK.docIsReadOnly = function () {
    return KFK.APP.model.cocodoc.readonly;
};
KFK.docIsNotReadOnly = function () {
    return !KFK.APP.model.cocodoc.readonly;
};

KFK.nodeLocked = function (jqNode) {
    //Even works for svline, because svg line has .hasClass function as well
    return jqNode.hasClass("lock");
};
KFK.lineLocked = function (svgLine) {
    return svgLine.hasClass("lock");
};

KFK.setModeIndicatorForYellowTip = function (tipvariant) {
    if ($("#modeIndicatorDiv").length < 1) {
        KFK.debug("modeIndicatorDiv not found");
        return;
    }
    $("#modeIndicatorDiv").empty();
    let svg = $(SVGs[tipvariant]);
    if (NotSet(svg)) {
        svg = $("<img src='" + cocoConfig.frontend.url + "/svgs/" + tipvariant + ".svg'/>");
    }
    svg.css("width", "18px");
    svg.css("height", "18px");
    svg.appendTo($("#modeIndicatorDiv"));
};

KFK.setTipVariant = async function (tipvariant, shiftKey = false) {
    if (shiftKey) {
        await KFK.updateSelectedDIVs('set tip variant', async function (jqNode) {
            let oldColor = KFK.getTipBkgColor(jqNode);
            jqNode.attr("variant", tipvariant);
            await KFK.setTipBkgImage(jqNode, tipvariant, oldColor);
        });
    } else {
        cocoConfig.node.yellowtip.defaultTip = tipvariant;
        if (KFK.mode === "yellowtip") {
            KFK.setModeIndicatorForYellowTip(tipvariant);
            $("#modeIndicatorImg").hide();
            $("#modeIndicatorDiv").show();
        }
    }
};
KFK.setTipBkgImage = async function (jqDIV, svgid, svgcolor) {
    KFK.fromJQ = jqDIV.clone();
    KFK._setTipBkgImage(jqDIV, svgid, svgcolor);
    await KFK.syncNodePut(
        "U",
        jqDIV,
        "change bkg image",
        KFK.fromJQ,
        false,
        0,
        1
    );
};
KFK._setTipBkgImage = function (jqDIV, svgid, svgcolor) {
    jqDIV.find(".tip_bkg").remove();
    let bkg = undefined;
    let isInnerSvg = false;
    if (NotSet(SVGs[svgid])) {
        bkg = $("<img src='" + cocoConfig.frontend.url + "/svgs/" + svgid + ".svg'/>");
    } else {
        isInnerSvg = true;
        bkg = $(SVGs[svgid]);
    }
    bkg.addClass("tip_bkg");
    bkg.css("width", "100%");
    bkg.css("height", "100%");
    bkg.css("z-index", "-3");
    if (isInnerSvg) {
        bkg.find(".svg_main_path").attr("fill", svgcolor);
    }
    bkg.appendTo(jqDIV);
};


KFK.setTipBkgColor = function (theJqNode, bgColor) {
    if (theJqNode === null) {
        console.warn("setTipBkgColor to null nodeDIV");
        return;
    }
    let svgImg = theJqNode.find(".tip_bkg .svg_main_path");
    if (svgImg.length > 0) {
        svgImg.attr("fill", bgColor);
        return true;
    } else {
        KFK.debug(
            `Can't change main path color. Node type ${theJqNode.attr(
                "nodetype"
            )} id:${theJqNode.attr("id")}   .svg_main_path not found`
        );
        return false;
    }
};
KFK.getTipBkgColor = function (jqNode) {
    if (jqNode === null) {
        console.warn("getTipBkgColor to null nodeDIV, return default");
        return cocoConfig.node.yellowtip.defaultColor;
    }
    let svgImg = jqNode.find(".tip_bkg .svg_main_path");
    if (svgImg.length > 0) {
        return svgImg.attr("fill");
    } else {
        return cocoConfig.node.yellowtip.defaultColor;
    }
};

KFK.stringToArray = function (str) {
    let arr = [];
    if (str) {
        arr = str.split(",");
        if (arr.length === 1 && arr[0] === "") arr = [];
    }
    return arr;
};

KFK.getNodeLinkIds = function (jq1, direction) {
    let linksStr = jq1.attr(direction);
    let linksArr = KFK.stringToArray(linksStr);
    //过滤掉不存在的节点
    // linksArr = linksArr.filter((aId) => {
    //   return $(`#${aId}`).length > 0;
    // })
    return linksArr;
};

KFK.removeConnectById = function (connect_id) {
    try {
        KFK.svgDraw.find(`.${connect_id}`).remove();
    } catch (err) { }
    let triangle_id = connect_id + "_triangle";
    try {
        KFK.svgDraw.find(`.${triangle_id}`).remove();
    } catch (err) { }
};

/**
 * 从新画节点所有的连接线
 * @param jqNode 要重画连接线的节点
 * @param reason 画线的原因
 * @param bothside 如果为false， 则只画从jqNode出去的线； 如为true, 则也画连到jqNode的线
 * @param allowConnectPoints 控制画线的上下左右连接点。缺省为全部可自动根据最短路线来选择。 一共四个数组，缺省为[[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]]
 * 第一个数组为连接出去的线条的，from的连接点控制
 * 第二个数组为连接出去的线条的，to的连接点控制
 * 第三个数组为连接进来的线条的，from的连接点控制
 * 第四个数组为连接进来的线条的，to的连接点控制
 * 每个连接点控制数组中，0表示 左中点； 1表示上中点； 2表示右中点； 3表示下中点
 */

KFK.redrawLinkLines = function (jqNode, reason = "unknown", bothside = true, allowConnectPoints = [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3]
]) {
    // KFK.debug('Redrawlinks', reason, 'bothside', bothside);
    if (!(jqNode instanceof jQuery)) {
        console.error("redrawLinkLines for a non-jquery object, sometime caused by no await");
        return;
    }
    let myId = jqNode.attr("id");
    let toIds = KFK.getNodeLinkIds(jqNode, "linkto");
    let list = KFK.svgDraw.find(".connect");
    list.each((connect) => {
        if (connect.attr("fid") === myId) {
            let connect_id = connect.attr("id");
            connect.remove();
            let triangle_id = connect_id + "_triangle";
            KFK.svgDraw.find(`.${triangle_id}`).remove();
        }
    });
    toIds.forEach((toId, index) => {
        if (toId !== myId) {
            let jqTo = $(`#${toId}`);
            KFK.drawPathBetween(jqNode, jqTo, allowConnectPoints[0], allowConnectPoints[1]);
        }
    });
    if (bothside) {
        KFK.JC3.find(".kfknode").each((index, aNode) => {
            let jqConnectFrom = $(aNode);
            if (jqConnectFrom.attr("id") !== myId) {
                let arr = KFK.stringToArray(jqConnectFrom.attr("linkto"));
                if (arr.indexOf(myId) >= 0) KFK.drawPathBetween(jqConnectFrom, jqNode, allowConnectPoints[2], allowConnectPoints[3]);
            }
        });
    }
};

//resize node时，记下当前shape variant的size，下次创建同样shape时，使用这个size
KFK.setShapeDynamicDefaultSize = function (nodeType, variant, width, height) {
    if (cocoConfig.defaultSize[nodeType] === undefined)
        cocoConfig.defaultSize[nodeType] = {};
    if (cocoConfig.defaultSize[nodeType][variant] === undefined)
        cocoConfig.defaultSize[nodeType][variant] = {};
    cocoConfig.defaultSize[nodeType][variant].width = width;
    cocoConfig.defaultSize[nodeType][variant].height = height;
    cocoConfig.defaultSize[nodeType].width = width;
    cocoConfig.defaultSize[nodeType].height = height;
};

KFK.getShapeDynamicDefaultSize = function (nodeType, variant) {
    let ret = {};
    console.log(nodeType, variant);
    //如果有 defaultSize[nodeType][variant]
    if (
        cocoConfig.defaultSize[nodeType] &&
        cocoConfig.defaultSize[nodeType][variant] &&
        cocoConfig.defaultSize[nodeType][variant].width &&
        cocoConfig.defaultSize[nodeType][variant].height
    ) {
        ret = {
            w: cocoConfig.defaultSize[nodeType][variant].width,
            h: cocoConfig.defaultSize[nodeType][variant].height,
        };
    } else if (
        cocoConfig.defaultSize[nodeType].width &&
        cocoConfig.defaultSize[nodeType].height
    ) {
        //如果有 defaultSize[nodeType]
        ret = {
            w: cocoConfig.defaultSize[nodeType].width,
            h: cocoConfig.defaultSize[nodeType].height,
        };
    } else {
        //如果上面两个都没有，则用style的定义
        ret = {
            w: cocoConfig.node[nodeType].style.width,
            h: cocoConfig.node[nodeType].style.height,
        };
    }
    return ret;
};

//用于对已有的nodeEvent进行修改控制，如enable, disable, destroy
//action: one of resizable/droppable/draggable
//cmd: one of enable, disable destroy
KFK.updateNodeEvent = function (jqNode, action, cmd) {
    if (action === "resizable") {
        if (cocoConfig.node[jqNode.attr("nodetype")].resizable) {
            jqNode.resizable(cmd);
        }
    } else if (action === "droppable") {
        if (cocoConfig.node[jqNode.attr("nodetype")].droppable) {
            jqNode.droppable(cmd);
        }
    } else if (action === "draggable") {
        jqNode.draggable(cmd);
    }
};
KFK.setNodeEventHandler = async function (jqNodeDIV, callback) {
    let jqNodeType = jqNodeDIV.attr("nodetype");
    if (jqNodeType === undefined) {
        KFK.warn("strange thing, setNodeEventHandler for an undefined node");
        KFK.printCallStack();
    }
    //resize node
    try {
        if (cocoConfig.node[jqNodeType].resizable) {
            jqNodeDIV.resizable({
                autoHide: true,
                start: () => {
                    KFK.fromJQ = jqNodeDIV.clone();
                    KFK.resizing = true;
                },
                resize: () => { },
                stop: async (evt) => {
                    KFK.debug("Stop Resizing...");
                    KFK.pointAfterResize = {
                        x: evt.clientX,
                        y: evt.clientY
                    };
                    if (KFK.APP.model.viewConfig.snap) {
                        let tmpRight = KFK.divRight(jqNodeDIV);
                        let tmpBottom = KFK.divBottom(jqNodeDIV);
                        let newRight = tmpRight;
                        let newBottom = tmpBottom;
                        if (
                            tmpRight % KFK.APP.model.gridWidth <
                            KFK.APP.model.gridWidth * 0.5
                        ) {
                            newRight =
                                Math.floor(tmpRight / KFK.APP.model.gridWidth) *
                                KFK.APP.model.gridWidth;
                        } else {
                            newRight =
                                (Math.floor(tmpRight / KFK.APP.model.gridWidth) + 1) *
                                KFK.APP.model.gridWidth;
                        }
                        if (
                            tmpBottom % KFK.APP.model.gridWidth <
                            KFK.APP.model.gridWidth * 0.5
                        ) {
                            newBottom =
                                Math.floor(tmpBottom / KFK.APP.model.gridWidth) *
                                KFK.APP.model.gridWidth;
                        } else {
                            newBottom =
                                (Math.floor(tmpBottom / KFK.APP.model.gridWidth) + 1) *
                                KFK.APP.model.gridWidth;
                        }
                        jqNodeDIV.css(
                            "width",
                            KFK.divWidth(jqNodeDIV) + (newRight - tmpRight)
                        );
                        jqNodeDIV.css(
                            "height",
                            KFK.divHeight(jqNodeDIV) + (newBottom - tmpBottom)
                        );
                    }
                    KFK.setShapeDynamicDefaultSize(
                        jqNodeType,
                        jqNodeDIV.attr("variant"),
                        KFK.divWidth(jqNodeDIV),
                        KFK.divHeight(jqNodeDIV)
                    );
                    if (jqNodeType === "image") {
                        jqNodeDIV.find(".innerobj").css("width", jqNodeDIV.css("width"));
                        jqNodeDIV.find(".innerobj").css("height", jqNodeDIV.css("height"));
                    }
                    KFK.resizing = false;
                    KFK.afterResizing = true;
                    //节点大小resize后，也要重画连接线
                    KFK.redrawLinkLines(jqNodeDIV, "after resize");

                    KFK.setSelectedNodesBoundingRect();

                    if (KFK.isNotA(jqNodeDIV, "noedit")) {
                        await KFK.syncNodePut("U", jqNodeDIV.clone(), "resize node", KFK.fromJQ, false, 0, 1);
                    }

                },
            });
        }
        if (cocoConfig.node[jqNodeType].minWidth) {
            jqNodeDIV.resizable(
                "option",
                "minWidth",
                cocoConfig.node[jqNodeType].minWidth
            );
        }
        if (cocoConfig.node[jqNodeType].minHeight) {
            jqNodeDIV.resizable(
                "option",
                "minHeight",
                cocoConfig.node[jqNodeType].minHeight
            );
        }
    } catch (error) {
        console.error(error);
    }
    // jqNodeDIV.resizable('disable');

    //drag node
    try {
        var click = {
            x: 0,
            y: 0
        };
        jqNodeDIV.draggable({
            scroll: true,
            containment: "parent",
            start: (evt, ui) => {
                click.x = evt.clientX;
                click.y = evt.clientY;
                KFK.fromJQ = jqNodeDIV.clone();
                evt.stopImmediatePropagation();
                evt.stopPropagation();
                KFK.originZIndex = KFK.getZIndex(jqNodeDIV);
                jqNodeDIV.css("z-index", "99999");
                KFK.dragging = true;
                KFK.positionBeforeDrag = {
                    x: KFK.divLeft(jqNodeDIV),
                    y: KFK.divTop(jqNodeDIV),
                };
            },
            drag: (evt, ui) => {
                var original = ui.originalPosition;

                // jQuery will simply use the same object we alter here
                ui.position = {
                    left: (evt.clientX - click.x + original.left) / KFK.scaleRatio,
                    top: (evt.clientY - click.y + original.top) / KFK.scaleRatio
                };

                //BEGIN auto drag scroll
                var isMoving = false;
                //Left
                if (evt.pageX <= KFK.autoScroll.distance) {
                    isMoving = true;
                    KFK.autoScroll.clearInetervals();
                    KFK.autoScroll.intLeftHandler = setInterval(function () {
                        KFK.JS1.scrollLeft(KFK.JS1.scrollLeft() - KFK.autoScroll.step);
                    }, KFK.autoScroll.timer);
                }

                //Right
                if (evt.pageX >= (window.innerWidth - KFK.autoScroll.distance)) {
                    isMoving = true;
                    KFK.autoScroll.clearInetervals();
                    KFK.autoScroll.intRightHandler = setInterval(function () {
                        KFK.JS1.scrollLeft(KFK.JS1.scrollLeft() + KFK.autoScroll.step);
                        jqNodeDIV.css('left', jqNodeDIV.css('left') + KFK.autoScroll.step);
                    }, KFK.autoScroll.timer);
                }

                //Top
                if (evt.pageY <= KFK.autoScroll.distance) {
                    isMoving = true;
                    KFK.autoScroll.clearInetervals();
                    KFK.autoScroll.intTopHandler = setInterval(function () {
                        KFK.JS1.scrollTop(KFK.JS1.scrollTop() - KFK.autoScroll.step);
                    }, KFK.autoScroll.timer);
                }

                //Bottom
                if (evt.pageY >= (window.innerHeight - KFK.autoScroll.distance)) {
                    isMoving = true;
                    KFK.autoScroll.clearInetervals();
                    KFK.autoScroll.intBottomHandler = setInterval(function () {
                        KFK.JS1.scrollTop(KFK.JS1.scrollTop() + KFK.autoScroll.step);
                    }, KFK.autoScroll.timer);
                }

                //No events
                if (!isMoving)
                    KFK.autoScroll.clearInetervals();
            },
            stop: async (evt, ui) => {
                KFK.dragging = false;
                KFK.autoScroll.clearInetervals();


                //如果做了这个标记，则不再做U操作，否则，节点又会被同步回来
                if (jqNodeDIV.shouldBeDeleted === true) {
                    return;
                }
                if (KFK.APP.model.viewConfig.snap) {
                    let tmpLeft = KFK.divLeft(jqNodeDIV);
                    let tmpTop = KFK.divTop(jqNodeDIV);
                    let newLeft = tmpLeft;
                    let newTop = tmpTop;
                    if (
                        tmpLeft % KFK.APP.model.gridWidth <
                        KFK.APP.model.gridWidth * 0.5
                    ) {
                        newLeft =
                            Math.floor(tmpLeft / KFK.APP.model.gridWidth) *
                            KFK.APP.model.gridWidth;
                    } else {
                        newLeft =
                            (Math.floor(tmpLeft / KFK.APP.model.gridWidth) + 1) *
                            KFK.APP.model.gridWidth;
                    }
                    if (
                        tmpTop % KFK.APP.model.gridWidth <
                        KFK.APP.model.gridWidth * 0.5
                    ) {
                        newTop =
                            Math.floor(tmpTop / KFK.APP.model.gridWidth) *
                            KFK.APP.model.gridWidth;
                    } else {
                        newTop =
                            (Math.floor(tmpTop / KFK.APP.model.gridWidth) + 1) *
                            KFK.APP.model.gridWidth;
                    }
                    jqNodeDIV.css("left", newLeft);
                    jqNodeDIV.css("top", newTop);
                }

                let movedSer = 0;
                let movedCount = 1;
                //如果按住了shiftkey, 则只移动当前node, 不移动其他被选定Node
                if (!evt.shiftKey) {
                    //拖动其它被同时选中的对象
                    let index = -1;
                    for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                        if (KFK.selectedDIVs[i].attr("id") === jqNodeDIV.attr("id")) {
                            index = i;
                            break;
                        }
                    }

                    if (KFK.selectedDIVs.length > 1 && index >= 0) {
                        KFK.debug("others shuld be moved");
                        //要移动的个数是被选中的全部
                        movedCount = KFK.selectedDIVs.length;
                        let delta = {
                            x: KFK.divLeft(jqNodeDIV) - KFK.positionBeforeDrag.x,
                            y: KFK.divTop(jqNodeDIV) - KFK.positionBeforeDrag.y,
                        };
                        for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                            let tmpFromJQ = KFK.selectedDIVs[i].clone();
                            if (i === index) continue;
                            //虽然这出跳过了被拖动的节点，但在后面这个节点一样要被移动
                            //因此，所有被移动的节点数量就是所有被选中的节点数量
                            KFK.selectedDIVs[i].css(
                                "left",
                                KFK.divLeft(KFK.selectedDIVs[i]) + delta.x
                            );
                            KFK.selectedDIVs[i].css(
                                "top",
                                KFK.divTop(KFK.selectedDIVs[i]) + delta.y
                            );
                            if (KFK.isNotA(KFK.selectedDIVs[i], "noedit")) {
                                await KFK.syncNodePut(
                                    "U",
                                    KFK.selectedDIVs[i].clone(),
                                    "move following selected",
                                    tmpFromJQ,
                                    false,
                                    movedSer,
                                    movedCount
                                );
                            }
                            movedSer = movedSer + 1;
                        }
                        for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                            KFK.redrawLinkLines(KFK.selectedDIVs[i], "codrag", true);
                        }
                    } else {
                        KFK.debug(
                            "will not move other nodes, selectedDIVs",
                            KFK.selectedDIVs.length,
                            " first index",
                            index
                        );
                    }
                }

                KFK.afterDragging = true;
                jqNodeDIV.css("z-index", KFK.originZIndex);
                KFK.originZIndex = 1;
                //节点移动后，对连接到节点上的连接线重新划线
                KFK.redrawLinkLines(jqNodeDIV, "after moving");
                KFK.setSelectedNodesBoundingRect();
                if (KFK.isNotA(jqNodeDIV, "noedit")) {
                    await KFK.syncNodePut(
                        "U",
                        jqNodeDIV.clone(),
                        "after drag",
                        KFK.fromJQ,
                        false,
                        movedSer,
                        movedCount
                    );
                }

                movedSer = movedSer + 1;
            },
        });
    } catch (error) {
        console.error(error);
    }
    try {
        if (cocoConfig.node[jqNodeType].droppable) {
            jqNodeDIV.droppable({
                activeClass: "ui-state-hover",
                hoverClass: "ui-state-active",
                accept: ".kfknode",
                drop: async (evt, ui) => {
                    if (KFK.isA(jqNodeDIV, "noedit"))
                        return;
                    //lockMode时可以Marge
                    if (KFK.KEYDOWN.ctrl === false && KFK.KEYDOWN.meta === false) return;
                    if (KFK.anyLocked(jqNodeDIV) || KFK.anyLocked(ui.draggable)) return;
                    let parent_node_type = jqNodeDIV.attr("nodetype");
                    let child_node_type = ui.draggable.attr("nodetype");
                    //同种类型可以merge
                    // if (parent_node_type === child_node_type) {
                    // let innerObj = $(`#${jqNodeDIV.attr("id")}`);
                    let fromJQ = jqNodeDIV.clone();
                    let innerObj = jqNodeDIV.find(".innerobj");
                    let oldHtml = innerObj.html();
                    let droppedInner = ui.draggable.find(".innerobj");
                    let droppedHtml = droppedInner.html();
                    let newHtml = oldHtml + droppedHtml;
                    //如果shift也按着，则直接使用dropped对象的html替换
                    if (KFK.KEYDOWN.shift === true) {
                        newHtml = droppedHtml;
                    }
                    let jqBig = jqNodeDIV;
                    let jqSmall = ui.draggable;
                    //这里要求，被替换的node要比被拖动的node尺寸大，
                    //如果不做这个要求，那么，一个拖动过来，遮住被替换node一个边的情况下，也会执行替换，这不是所期望的
                    if (
                        KFK.unpx(jqSmall.css("left")) > KFK.unpx(jqBig.css("left")) &&
                        KFK.unpx(jqSmall.css("top")) > KFK.unpx(jqBig.css("top")) &&
                        KFK.unpx(jqSmall.css("left")) + KFK.unpx(jqSmall.css("width")) <
                        KFK.unpx(jqBig.css("left")) + KFK.unpx(jqBig.css("width")) &&
                        KFK.unpx(jqSmall.css("top")) + KFK.unpx(jqSmall.css("height")) <
                        KFK.unpx(jqBig.css("top")) + KFK.unpx(jqBig.css("height"))
                    ) {
                        innerObj.html(newHtml);
                        //删掉之前那个被拖动的
                        //在拖动覆盖其它节点，内容合并后删除被拖动节点时，这个标志是一定要加的，防止draggable end事件中，重新上传U指令，这样内容又会update回来
                        //请参考draggable end事件处
                        ui.draggable.shouldBeDeleted = true;
                        await KFK.deleteNode_request(ui.draggable);
                        //更新这个被粘贴的
                        await KFK.syncNodePut(
                            "U",
                            jqNodeDIV,
                            "new text",
                            fromJQ,
                            false,
                            0,
                            1
                        );
                    }
                    // }
                },
            });
        }
    } catch (error) {
        console.error(error);
    }

    try {
        jqNodeDIV.hover(
            () => {
                $(document.body).css("cursor", "pointer");
                KFK.hoverJqDiv(jqNodeDIV);
                jqNodeDIV.addClass("shadow1");
                KFK.AI('hover_div');
                KFK.onC3 = true;
                // jqNodeDIV.resizable('enable');
            },
            () => {
                $(document.body).css("cursor", "default");
                jqNodeDIV.removeClass("shadow1");
                // jqNodeDIV.resizable('disable');
                KFK.hoverJqDiv(null);
                KFK.onC3 = true;
            }
        );
    } catch (error) {
        console.error(error);
    }

    try {
        //防止点在节点上，以后，画出框选框
        jqNodeDIV.mousedown((evt) => {
            KFK.closeActionLog();
            evt.stopImmediatePropagation();
            evt.stopPropagation();
        });
    } catch (error) {
        console.error(error);
    }
    //click node
    try {
        jqNodeDIV.click((evt) => {
            KFK.hide($('.clickOuterToHide'));
            if (KFK.inPresentingMode || KFK.inOverviewMode) return;
            if (KFK.isEditting && KFK.quillEdittingNode) {
                if (KFK.quillEdittingNode !== jqNodeDIV) {
                    KFK.finishQuillEditting();
                }
                evt.stopImmediatePropagation();
                evt.stopPropagation();
                evt.preventDefault();
                return;
            }
            // if (KFK.firstShown['right'] === false && KFK.docIsNotReadOnly() && jqNodeDIV.hasClass('todolist') === false) {
            //     KFK.show('#right');
            //     KFK.firstShown['right'] = true;
            // }


            KFK.pickedShape = null;
            KFK.afterDragging = false;
            KFK.afterResizing = false;
            evt.stopImmediatePropagation();
            evt.stopPropagation();
            evt.preventDefault();
            KFK.focusOnNode(jqNodeDIV);
            let tmpIdx = KFK.jumpStack.indexOf(jqNodeDIV);
            if (tmpIdx < 0) {
                KFK.jumpStack.push(jqNodeDIV);
                KFK.jumpStackPointer = KFK.jumpStack.length - 1;
            } else if (tmpIdx !== KFK.jumpStack.length - 1) {
                KFK.jumpStack.push(jqNodeDIV);
                KFK.jumpStackPointer = KFK.jumpStack.length - 1;
            } else {
                KFK.jumpStackPointer = tmpIdx;
            }
            if (KFK.mode === "pointer") {
                KFK.selectNodesOnClick(jqNodeDIV, evt.shiftKey);
                KFK.resetPropertyOnMultipleNodesSelected();
            } else if (KFK.mode === "connect") {
                if (KFK.afterDragging === false) {
                    KFK.yarkLinkNode(jqNodeDIV, evt.shiftKey, "", KFK.FROM_CLIENT);
                } else {
                    KFK.afterDragging = true;
                }
                evt.stopImmediatePropagation();
                evt.stopPropagation();
                evt.preventDefault();
                return;
            } else if (KFK.mode === "lock") {
                KFK.hoverJqDiv(jqNodeDIV);
                KFK.hoverSvgLine(null);
                KFK.tryToLockUnlock(evt.shiftKey);
                evt.preventDefault();
                evt.stopPropagation();
                return;
            } else if (KFK.mode === "brain") {
                KFK.hoverJqDiv(jqNodeDIV);
                KFK.hoverSvgLine(null);
                KFK.toggleBrainstorm();
                evt.preventDefault();
                evt.stopPropagation();
                KFK.setMode("pointer");
                return;
            } else {
                KFK.setMode('pointer');
            }
        });
    } catch (error) {
        console.error(error);
    }

    try {
        jqNodeDIV.dblclick(async function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            //Don't edit todolist direclty, show edit dialog instead.
            //double click to edit
            if (jqNodeDIV.hasClass('noedit')) {
                if (jqNodeDIV.attr("id") === "coco_todo") {
                    KFK.toggleInputFor("todo");
                    await KFK.showMsgInputDlg();
                } else if (jqNodeDIV.attr("id") === "coco_chat") {
                    KFK.toggleInputFor("chat");
                    await KFK.showMsgInputDlg();
                }
                return;
            }
            if (KFK.anyLocked(jqNodeDIV)) return;
            //下面这句判断其实没用，因为在演示模式和概览模式下，都加了遮罩，点不到nodeDIV上
            if (KFK.inPresentingMode === true || KFK.inOverviewMode) return;

            //如果正在quill编辑的话
            if (KFK.isEditting && KFK.quillEdittingNode) {
                //看是否是当前节点, 如果是，正在编辑的节点，返回
                if (KFK.quillEdittingNode === jqNodeDIV) {
                    return;
                } else {
                    //否则的话， 就把前一个Quill编辑结束
                    await KFK.finishQuillEditting();
                    //然后启动，当前节点的Quill编辑
                    // console.log("Then start my quilling");
                    KFK.startNodeEditing(jqNodeDIV);
                }
            } else {
                // console.log("Not quilling");
                KFK.startNodeEditing(jqNodeDIV);
            }
        });
    } catch (error) {
        console.error(error);
    }
    if (callback) await callback();
};

// getSelection、createRange兼容
KFK.isSupportRange = function () {
    return (
        typeof document.createRange === "function" ||
        typeof window.getSelection === "function"
    );
};

KFK.getCurrentRange = function () {
    let range = null;
    let selection = null;
    if (KFK.isSupportRange()) {
        selection = document.getSelection();
        if (selection.getRangeAt && selection.rangeCount) {
            range = document.getSelection().getRangeAt(0);
        }
    } else {
        range = document.selection.createRange();
    }
    return range;
};
KFK.insertHtmlAfterRange = function (html) {
    let selection = null;
    let range = null;
    if (KFK.isSupportRange()) {
        // IE > 9 and 其它浏览器
        selection = document.getSelection();
        if (selection.getRangeAt && selection.rangeCount) {
            let fragment, node, lastNode;
            range = selection.getRangeAt(0);
            range.deleteContents();
            let el = document.createElement("span");
            el.innerHTML = html;
            // 创建空文档对象,IE > 8支持documentFragment
            fragment = document.createDocumentFragment();

            while ((node = el.firstChild)) {
                lastNode = fragment.appendChild(node);
            }
            range.insertNode(fragment);

            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
};

KFK.cleanTextInput = function (jInner, allowBR) {
    let html = jInner.prop("innerHTML");
    html = html.replace("<div>", " ");
    html = html.replace("</div>", " ");
    if (allowBR) {
        html = html.replace(/<br><br>$/, "<br>");
        html = html + "<br><br>";
    } else {
        html = html.replace("<br>", "");
    }
    jInner.prop("innerHTML", html);
    // KFK.insertHtmlAfterRange('<br><br>');
    if (window.getSelection) {
        //ie11 10 9 ff safari
        jInner.focus();
        var range = window.getSelection(); //创建range
        range.selectAllChildren(jInner[0]); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
    } else if (document.selection) {
        //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(jInner[0]); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
    }
};

//启动单行文字编辑
KFK.startInlineEditing = function (jqNodeDIV) {
    KFK.isEditting = true;
    jqNodeDIV.find(".innerobj").focus();
    KFK.inlineEditor = jqNodeDIV;
    let allowBR = jqNodeDIV.attr("nodetype") !== "text";
    //div keydown
    jqNodeDIV.keydown(function (evt) {
        if (evt.keyCode === 13 && (evt.shiftKey || evt.ctrlKey || evt.metaKey)) {
            let jInner = jqNodeDIV.find(".innerobj");
            KFK.cleanTextInput(jInner, allowBR);
            evt.stopPropagation();
            evt.preventDefault();
        } else if (evt.keyCode === 13) {
            //ENTER || PageUp
            let jInner = jqNodeDIV.find(".innerobj");
            KFK.cleanTextInput(jInner, allowBR);
            evt.stopPropagation();
            evt.preventDefault();
        } else if (evt.keyCode == 35 || evt.keyCode === 34) {
            //END  || PageDown
            //阻止浏览器滚动窗口的缺省动作
            evt.stopPropagation();
            evt.preventDefault();
        } else if (evt.keyCode === 36 || evt.keyCode === 33 || evt.keyCode === 32) {
            //HOME
            //阻止浏览器滚动窗口的缺省动作
            evt.stopPropagation();
            evt.preventDefault();
            // let jInner = jqNodeDIV.find('.innerobj');
            // if (window.getSelection) { //ie11 10 9 ff safari
            //   jInner.focus();
            //   var range = window.getSelection(); //创建range
            //   range.selectAllChildren(jInner[0]); //range 选择obj下所有子内容
            //   range.collapseToStart(); //光标移至最后
            // } else if (document.selection) { //ie10 9 8 7 6 5
            //   var range = document.selection.createRange(); //创建选择对象
            //   //var range = document.body.createTextRange();
            //   range.moveToElementText(jInner[0]); //range定位到obj
            //   range.moveEnd(jInner[0], 0);
            //   range.moveStart(jInner[0], 0);
            //   range.collapse(); //光标移至最后
            // }
        }
        // on esc do not set value back to node
        // if (evt.keyCode === 27) {
        //   console.log("presessed ESC");
        // }
    });
};
KFK.endInlineEditing = function () {
    KFK.isEditting = false;
    KFK.inlineEditor = null;
};

/**
 * 开始节点编辑，根据节点类型，相应使用不同的编辑器
 * 单行文字用inline editing，  textblock和yellowtip用textarea， richtext用Quill
 */
KFK.startNodeEditing = async function (jqNodeDIV, enterSelect) {
    if (KFK.anyLocked(jqNodeDIV)) return;
    if (KFK.isEditting && KFK.quillEdittingNode) {
        return;
    }
    if (jqNodeDIV.attr("nodetype") === "text") {
        KFK.startInlineEditing(jqNodeDIV);
    } else if (jqNodeDIV.attr("nodetype") === "richtext") {
        KFK.askQuill = jqNodeDIV;
        //Quill编辑，先往服务器发送ASKQUILL， 获得节点的QUill权限，其他用户如果在同时Quill同一个节点，将被退出编辑
        //服务器会返回 “OKTOQUILL”， 客户端接到OKTOQUILL后，才会进入QUILL编辑
        await KFK.sendCmd("ASKQUILL", {
            nodeid: jqNodeDIV.attr("id")
        });
    } else KFK.startNodeEditing_withTextArea(jqNodeDIV, enterSelect);
};

KFK.finishQuillEditting = async function () {
    let jInner = KFK.quillEdittingNode.find(".innerobj");
    let inner = el(jInner);
    let delta = KFK.quill.getContents();
    let converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    let html = converter.convert();
    // jInner.removeClass('ql-container');
    // jInner.removeClass('ql-snow');
    jInner.addClass("ql-viewer");
    jInner.addClass("ql-editor");
    $(".ql-toolbar").remove();
    KFK.quillEdittingNode.draggable("enable");
    inner.innerHTML = html;

    await KFK.syncNodePut(
        "U",
        KFK.quillEdittingNode,
        "quill edit",
        KFK.beforeQuillEdit,
        false,
        0,
        1
    );
    KFK.isEditting = false;
    KFK.quillEdittingNode = undefined;
};

KFK.cancelQuillEditting = async function (byName) {
    let jInner = KFK.quillEdittingNode.find(".innerobj");
    if (!jInner.hasClass("ql-viewer")) jInner.addClass("ql-viewer");
    if (!jInner.hasClass("ql-editor")) jInner.addClass("ql-editor");
    $(".ql-toolbar").remove();
    KFK.quillEdittingNode.draggable("enable");

    //quilling-by显示两秒
    $(".quilling-by").remove();
    let jtmp = $(`<div class="quilling-by">${byName}</div>`);
    jtmp.appendTo(KFK.quillEdittingNode);
    setTimeout(function () {
        jtmp.remove();
    }, 2000);

    KFK.isEditting = false;
    KFK.quillEdittingNode = undefined;
};

KFK.onStopQuill = async function (nodeid, byName) {
    if (KFK.quillEdittingNode) {
        if (KFK.quillEdittingNode.attr("id") === nodeid) {
            KFK.cancelQuillEditting(byName);
        }
    }
};

/**
 * 从服务器接收到 OKTOQUILL指令，启动QUILL编辑
 * @param nodeid  服务器传回的quill编辑对象ID， 是ASKTOQUILL时传上去的ID
 */
KFK.onOkToQuill = async function (nodeid) {
    //做一些必要的检查后，启动quill编辑
    if (KFK.askQuill !== undefined) {
        //服务器返回的nodeid应该与ASKTOQILL时所记录的KFK.askQuill对象的id一致
        let id = KFK.askQuill.attr("id");
        let tmp = $(`#${id}`);
        if (tmp.length > 0 && id === nodeid) {
            KFK.startNodeEditing_withQuill(KFK.askQuill);
        }
        KFK.askQuill = undefined;
    }
};

KFK.startNodeEditing_withQuill = function (jqNodeDIV) {
    if (KFK.anyLocked(jqNodeDIV)) return;
    //disableBodyScroll(el(jqNodeDIV));
    KFK.beforeQuillEdit = jqNodeDIV.clone();
    let jInner = jqNodeDIV.find(".innerobj");
    jInner.removeClass("ql-viewer");
    jInner.removeClass("ql-editor");
    let inner = el(jInner);

    KFK.isEditting = true;
    jqNodeDIV.css("display", "block");
    jqNodeDIV.draggable("disable");
    KFK.quillEdittingNode = jqNodeDIV;
    var toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{
            list: "ordered"
        }, {
            list: "bullet"
        }],
        [{
            script: "sub"
        }, {
            script: "super"
        }], // superscript/subscript
        [{
            indent: "-1"
        }, {
            indent: "+1"
        }], // outdent/indent

        [{
            size: ["small", false, "large", "huge"]
        }], // custom dropdown
        [{
            header: [1, 2, 3, 4, 5, 6, false]
        }],

        [{
            color: []
        }, {
            background: []
        }], // dropdown with defaults from theme
        [{
            font: KFK.customQuillFontNames
        }],
        [{
            align: []
        }],

        ["clean"], // remove formatting button
    ];

    var Font = Quill.import("formats/font");
    Font.whitelist = KFK.customQuillFontNames;
    Quill.register(Font, true);
    KFK.quill = new Quill(inner, {
        modules: {
            toolbar: toolbarOptions,
        },
        placeholder: "点这里开始编辑...",
        theme: "snow", // or 'bubble'
    });
    //这个地方直观重要，这样就把这些按键限制在Quill Editor中
    //如果propogation上去的话，会导致整个浏览器窗口滚动
    jInner.keydown(function (evt) {
        // console.log('quill editor key ' + evt.keyCode);
        evt.stopPropagation();
        if (!evt.shiftKey) {
            if (evt.keyCode == 35 || evt.keyCode === 34) {
                //END  || PageDown
                evt.preventDefault();
            } else if (evt.keyCode === 36 || evt.keyCode === 33) {
                //HOME
                evt.preventDefault();
            }
        }
    });
    jInner.addClass("ql-editor-pointer");
    KFK.quill.on("text-change", function (delta1, delta2, source) {
        if (KFK.pct > 1) {
            //只有当有其它人在线时，再做syncNodeContentPut
            if (KFK.quillChangeTimer === undefined) {
                KFK.quillChangeTimer = setTimeout(async () => {
                    //两秒钟后，可能用户已经退出编辑，此时的quillEdittingNode会被置为undefined
                    if (KFK.quillEdittingNode !== null) {
                        let delta = KFK.quill.getContents();
                        let converter = new QuillDeltaToHtmlConverter(delta.ops, {});
                        let html = converter.convert();
                        await KFK.syncNodeContentPut(
                            KFK.quillEdittingNode.attr("id"),
                            html
                        );
                    }
                    KFK.quillChangeTimer = undefined;
                }, 1000);
            }
        }
    });
};

KFK.startNodeEditing_withTextArea = function (jqNodeDIV, enterSelect) {
    if (getBoolean(jqNodeDIV.attr("edittable")) && KFK.notAnyLocked(jqNodeDIV)) {
        KFK.fromJQ = jqNodeDIV.clone();
        let innerText = el(jqNodeDIV.find(".innerobj"));
        KFK.editTextNodeWithTextArea(innerText, el(jqNodeDIV), enterSelect);
    }
};

KFK.divLeft = function (jqDiv) {
    return KFK.unpx(jqDiv.css("left"));
};
KFK.divCenter = function (jqDiv) {
    return KFK.divLeft(jqDiv) + KFK.divWidth(jqDiv) * 0.5;
};
KFK.divRight = function (jqDiv) {
    return KFK.divLeft(jqDiv) + KFK.divWidth(jqDiv);
};
KFK.divTop = function (jqDiv) {
    return KFK.unpx(jqDiv.css("top"));
};
KFK.divMiddle = function (jqDiv) {
    return KFK.divTop(jqDiv) + KFK.divHeight(jqDiv) * 0.5;
};
KFK.divBottom = function (jqDiv) {
    return KFK.divTop(jqDiv) + KFK.divHeight(jqDiv);
};
KFK.divWidth = function (jqDiv) {
    // return jqDiv.width();
    return KFK.unpx(jqDiv.css('width'));
};
KFK.divHeight = function (jqDiv) {
    // return jqDiv.height();
    return KFK.unpx(jqDiv.css('height'));
};
KFK.divRect = function (jqDiv) {
    return {
        left: KFK.divLeft(jqDiv),
        top: KFK.divTop(jqDiv),
        right: KFK.divRight(jqDiv),
        bottom: KFK.divBottom(jqDiv),
        center: KFK.divCenter(jqDiv),
        middle: KFK.divMiddle(jqDiv),
        width: KFK.divWidth(jqDiv),
        height: KFK.divHeight(jqDiv),
    };
};

/**
 * 得到所选DIVS中没有被锁定的div的个数
 * @param divs  如为undefined，则自动处理KFK.selectedDIVs
 */
KFK.getUnlockedCount = function (divs) {
    if (divs === undefined) {
        divs = KFK.selectedDIVs;
    }
    let numberOfNotLocked = 0;
    for (let i = 0; i < divs.length; i++) {
        if (KFK.anyLocked(divs[i]) === false) {
            numberOfNotLocked = numberOfNotLocked + 1;
        }
    }
    return numberOfNotLocked;
};

KFK.alignNodes = async function (direction) {
    if (KFK.selectedDIVs.length < 2) return;
    let hasOneLocked = false;
    KFK.selectedDIVs.forEach((aJQ) => {
        if (KFK.anyLocked(aJQ)) {
            hasOneLocked = true;
        }
    });
    // if (hasOneLocked) return;
    let numberOfNotLocked = 0;
    let movedSer = 0;
    let movedCount = 0;
    switch (direction) {
        case "left":
            let left = KFK.divLeft(KFK.selectedDIVs[0]);
            for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                let tmp_left = KFK.divLeft(KFK.selectedDIVs[i]);
                left = tmp_left < left ? tmp_left : left;
            }
            movedSer = 0;
            movedCount = KFK.getUnlockedCount();

            for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                let jqDIV = $(KFK.selectedDIVs[i]);
                let jqOld = jqDIV.clone();
                if (KFK.anyLocked(jqDIV) === false) {
                    jqDIV.css("left", left);
                    await KFK.syncNodePut("U", jqDIV, "after align left", jqOld, false, movedSer, movedCount);
                    movedSer = movedSer + 1;
                }
            }
            break;
        case "center":
            let centerX =
                KFK.divLeft(KFK.selectedDIVs[0]) +
                KFK.divWidth(KFK.selectedDIVs[0]) * 0.5;
            movedSer = 0;
            movedCount = KFK.getUnlockedCount();
            for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                let jqDIV = $(KFK.selectedDIVs[i]);
                let jqOld = jqDIV.clone();
                if (KFK.anyLocked(jqDIV) === false) {
                    jqDIV.css("left", centerX - KFK.divWidth(KFK.selectedDIVs[i]) * 0.5);
                    await KFK.syncNodePut(
                        "U",
                        jqDIV,
                        "after align center",
                        jqOld,
                        false,
                        movedSer,
                        movedCount
                    );
                    movedSer = movedSer + 1;
                }
            }
            break;
        case "right":
            let right = KFK.divRight(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp_right = KFK.divRight(aNode);
                right = tmp_right > right ? tmp_right : right;
            });
            movedSer = 0;
            movedCount = KFK.getUnlockedCount();
            for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                let jqDIV = KFK.selectedDIVs[i];
                let jqOld = jqDIV.clone();
                if (KFK.anyLocked(jqDIV) === false) {
                    jqDIV.css("left", right - KFK.divWidth(KFK.selectedDIVs[i]));
                    await KFK.syncNodePut("U", jqDIV, "after align right", jqOld, false, movedSer, movedCount);
                    movedSer = movedSer + 1;
                }
            }
            break;
        case "top":
            let top = KFK.divTop(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp_top = KFK.divTop(aNode);
                top = tmp_top < top ? tmp_top : top;
            });
            movedSer = 0;
            movedCount = KFK.getUnlockedCount();
            for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                let jqDIV = KFK.selectedDIVs[i];
                let jqOld = jqDIV.clone();
                if (KFK.anyLocked(jqDIV) === false) {
                    jqDIV.css("top", top);
                    await KFK.syncNodePut("U", jqDIV, "after align top", jqOld, false, movedSer, movedCount);
                    movedSer = movedSer + 1;
                }
            }
            break;
        case "middle":
            let centerY =
                KFK.divTop(KFK.selectedDIVs[0]) +
                KFK.divHeight(KFK.selectedDIVs[0]) * 0.5;

            movedSer = 0;
            movedCount = KFK.getUnlockedCount();
            for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                let jqDIV = KFK.selectedDIVs[i];
                let jqOld = jqDIV.clone();
                if (KFK.anyLocked(jqDIV) === false) {
                    jqDIV.css("top", centerY - KFK.divHeight(KFK.selectedDIVs[i]) * 0.5);
                    await KFK.syncNodePut("U", jqDIV, "after align middle", jqOld, false, movedSer, movedCount);
                    movedSer = movedSer + 1;
                }
            }
            break;
        case "bottom":
            let bottom = KFK.divBottom(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp_bottom = KFK.divBottom(aNode);
                bottom = tmp_bottom > bottom ? tmp_bottom : bottom;
            });

            movedSer = 0;
            movedCount = KFK.getUnlockedCount();
            for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                let jqDIV = KFK.selectedDIVs[i];
                let jqOld = jqDIV.clone();
                if (KFK.anyLocked(jqDIV) === false) {
                    jqDIV.css("top", bottom - KFK.divHeight(KFK.selectedDIVs[i]));
                    await KFK.syncNodePut("U", jqDIV, "after align middle", jqOld, false, movedSer, movedCount);
                    movedSer = movedSer + 1;
                }
            }
            break;
        case "hori":
            let nodeLeftMost = KFK.selectedDIVs[0];
            let totalWidth = 0;
            let leftMost = KFK.divLeft(KFK.selectedDIVs[0]);
            //找到最左边的node及其left位置， leftMost
            KFK.selectedDIVs.forEach((aNode) => {
                totalWidth += KFK.divWidth(aNode);
                let tmp_left = KFK.divLeft(aNode);
                if (tmp_left < leftMost) {
                    nodeLeftMost = aNode;
                    leftMost = tmp_left;
                }
            });
            //找到最右边的node及其右侧边位置， rightMost
            let nodeAtRightMost = KFK.selectedDIVs[0];
            let rightMost = KFK.divRight(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp_right = KFK.divRight(aNode);
                if (tmp_right > rightMost) {
                    nodeAtRightMost = aNode;
                    rightMost = tmp_right;
                }
            });
            //计算中间的space
            let availableWidth = rightMost - leftMost;
            let space_hori =
                (availableWidth - totalWidth) / (KFK.selectedDIVs.length - 1);
            let tmpHoriArr = [];
            KFK.selectedDIVs.forEach((aNode) => {
                tmpHoriArr.push(aNode);
            });
            //最左边一个不移动
            tmpHoriArr.splice(tmpHoriArr.indexOf(nodeLeftMost), 1);
            //把除nodeLeftMos之外节点的中间X放入数组
            let centerArr = tmpHoriArr.map((aNode) => {
                return KFK.divCenter(aNode);
            });
            let posX = KFK.divRight(nodeLeftMost);
            movedSer = 0;
            //这里要减去一，因为最左边的一个不移动
            movedCount = KFK.getUnlockedCount() - 1;
            while (centerArr.length > 0) {
                //找到剩余Node中最靠右边的一个
                let min = Math.min.apply(null, centerArr);
                let index = centerArr.indexOf(min);
                let newLeft = posX + space_hori;
                let jqDIV = tmpHoriArr[index];
                let jqOld = jqDIV.clone();
                if (KFK.anyLocked(jqDIV) === false) {
                    //重设其位置
                    jqDIV.css("left", newLeft);
                    await KFK.syncNodePut("U", jqDIV, "after align hori", jqOld, false, movedSer, movedCount);
                    movedSer = movedSer + 1;
                }

                //为下一个节点准备基准点
                posX = newLeft + KFK.divWidth(tmpHoriArr[index]);
                centerArr.splice(index, 1);
                tmpHoriArr.splice(index, 1);
            }
            break;
        case "vert":
            let nodeTopMost = KFK.selectedDIVs[0];
            let totalHeight = 0;
            let topMost = KFK.divTop(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                totalHeight += KFK.divHeight(aNode);
                let tmp_top = KFK.divTop(aNode);
                if (tmp_top < topMost) {
                    nodeTopMost = aNode;
                    topMost = tmp_top;
                }
            });
            let nodeAtBottomMost = KFK.selectedDIVs[0];
            let bottomMost = KFK.divBottom(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp_bottom = KFK.divBottom(aNode);
                if (tmp_bottom > bottomMost) {
                    nodeAtBottomMost = aNode;
                    bottomMost = tmp_bottom;
                }
            });
            let availableHeight = bottomMost - topMost;
            let space_vert =
                (availableHeight - totalHeight) / (KFK.selectedDIVs.length - 1);
            let tmpVertArr = [];
            KFK.selectedDIVs.forEach((aNode) => {
                tmpVertArr.push(aNode);
            });
            //最上面一个不移动
            tmpVertArr.splice(tmpVertArr.indexOf(nodeTopMost), 1);
            let middleArr = tmpVertArr.map((aNode) => {
                return KFK.divMiddle(aNode);
            });
            let posY = KFK.divBottom(nodeTopMost);
            movedSer = 0;
            //这里要减去一，因为最上面一个不移动
            movedCount = KFK.getUnlockedCount() - 1;
            while (middleArr.length > 0) {
                let min = Math.min.apply(null, middleArr);
                let index = middleArr.indexOf(min);
                let newTop = posY + space_vert;
                let jqDIV = tmpVertArr[index];
                let jqOld = jqDIV.clone();
                if (KFK.anyLocked(jqDIV) === false) {
                    jqDIV.css("top", newTop);
                    await KFK.syncNodePut(
                        "U",
                        jqDIV,
                        "after align right",
                        jqOld,
                        false,
                        movedSer,
                        movedCount
                    );
                    movedSer = movedSer + 1;
                }
                posY = newTop + KFK.divHeight(tmpVertArr[index]);
                middleArr.splice(index, 1);
                tmpVertArr.splice(index, 1);
            }
            break;
    }
    KFK.setSelectedNodesBoundingRect();
    KFK.selectedDIVs.forEach((aNode) => {
        KFK.redrawLinkLines(aNode, "align", true);
    });
};

KFK.scroll_posX = function (x) {
    return x + KFK.scrollContainer.scrollLeft();
};
KFK.scroll_posY = function (y) {
    return y + KFK.scrollContainer.scrollTop();
};

KFK.offsetLineDataAttr = function (lineDIV, offset) {
    let x1 = parseInt($(lineDIV).attr("x1"));
    let y1 = parseInt($(lineDIV).attr("y1"));
    let x2 = parseInt($(lineDIV).attr("x2"));
    let y2 = parseInt($(lineDIV).attr("y2"));
    x1 += offset.x;
    y1 += offset.y;
    x2 += offset.x;
    y2 += offset.y;
    $(lineDIV).attr("x1", x1);
    $(lineDIV).attr("y1", y1);
    $(lineDIV).attr("x2", x2);
    $(lineDIV).attr("y2", y2);
};

KFK.deleteNode_request = async function (jqDIV) {
    KFK.debug("sync D to delete this node " + jqDIV.attr("id"));
    await KFK.syncNodePut("D", jqDIV, "delete node", null, false, 0, 1);
};
KFK.deleteNode_exec = function (jqDIV) {
    //删除linkto线条
    let myId = jqDIV.attr("id");
    let toIds = KFK.stringToArray(jqDIV.attr("linkto"));
    toIds.forEach((toId) => {
        let lineClassSelector = `.connect_${myId}_${toId}`;
        let triClassSelector = `.connect_${myId}_${toId}_triangle`;
        try {
            KFK.svgDraw.findOne(lineClassSelector).remove();
        } catch (err) { } finally { }
        try {
            KFK.svgDraw.findOne(triClassSelector).remove();
        } catch (err) { } finally { }
    });
    //重置全局ZIndex 同时，删除那些链接到当前节点的连接线
    let myZI = KFK.getZIndex(jqDIV);
    let count = 0;
    let allnodes = KFK.JC3.find(".kfknode");
    let tmp1 = "";
    let tmp2 = "";
    allnodes.each((index, aDIV) => {
        count += 1;
        let jqDIV = $(aDIV);
        let fromId = jqDIV.attr("id");
        let tmpzi = KFK.getZIndex(jqDIV);
        if (tmpzi > myZI) {
            KFK.setZIndex(jqDIV, tmpzi - 1);
        }
        tmp1 = jqDIV.attr("linkto");
        let arr = KFK.stringToArray(tmp1);
        if (arr.indexOf(myId) >= 0) {
            let lineClassSelector = `.connect_${fromId}_${myId}`;
            let triClassSelector = `.connect_${fromId}_${myId}_triangle`;
            try {
                KFK.svgDraw.findOne(lineClassSelector).remove();
            } catch (err) { } finally { }
            try {
                KFK.svgDraw.findOne(triClassSelector).remove();
            } catch (err) { } finally { }
        }
        // KFK.removeLinkTo(jqDIV, myId);
        // tmp2 = jqDIV.attr("linkto");
        // if (tmp1 !== tmp2) {
        //   KFK.debug("remove link for ", fromId);
        //   let lineClassSelector = `.connect_${fromId}_${myId}`;
        //   let triClassSelector = `.connect_${fromId}_${myId}_triangle`;
        //   try { KFK.svgDraw.findOne(lineClassSelector).remove(); }catch(err){} finally { };
        //   try { KFK.svgDraw.findOne(triClassSelector).remove(); }catch(err){} finally { };
        // } else {
        //   KFK.debug(fromId, ' has no link to me');
        // }
    });
    let nodeIndex = KFK.selectedDIVs.indexOf(jqDIV);
    if (nodeIndex >= 0) {
        KFK.selectedDIVs.splice(nodeIndex, 1);
    }

    jqDIV.remove();
};

KFK._deleteLine = function (svgLine) {
    KFK.debug("sync D to delete this node");
    svgLine.attr({
        "stroke-width": svgLine.attr("origin-width")
    });
    KFK.syncLinePut("D", svgLine, "delete node", null, false);
};

KFK.getNodeIdsFromConnectId = function (cid) {
    let nid = (tid = cid);
    nid = nid.substr(nid.indexOf("_") + 1);
    nid = nid.substr(0, nid.indexOf("_"));
    tid = tid.substr(tid.lastIndexOf("_") + 1);
    return [nid, tid];
};

/**
 * 删除hover或者selected 节点
 * @param evt oncut事件
 * @param cutMode， 是否是cut方式，cut方式下，删除前先复制
 */
KFK.deleteHoverOrSelectedDiv = async function (evt, cutMode = false) {
    //如果有多个节点被选择，则优先进行多项删除
    try {
        KFK.copyCandidateDIVs = [];
        KFK.copyCandidateLines = [];
        if (KFK.selectedDIVs.length > 1) {
            KFK.debug("delete, selected >1");
            let notLockedCount = 0;
            for (let i = 0; i < KFK.selectedDIVs.length; i++) {
                if (KFK.anyLocked(KFK.selectedDIVs[i]) === false) {
                    notLockedCount += 1;
                }
            }
            KFK.debug(
                `没锁定的节点数量是 ${notLockedCount}, 一共是${KFK.selectedDIVs.length}`
            );
            if (notLockedCount > 0) {
                let delSer = 0;
                let delCount = notLockedCount;
                for (let i = 0; i < KFK.selectedDIVs.length;) {
                    if (KFK.anyLocked(KFK.selectedDIVs[i]) === false) {
                        if (cutMode === true) {
                            //copy时不过滤nocopy
                            let jTemp = KFK.selectedDIVs[i].clone();
                            let jTitle = jTemp.find('.coco_title');
                            if (jTitle.length > 0) {
                                jTitle.text(jTitle.text() + "的复制");
                            }
                            KFK.copyCandidateDIVs.push(jTemp);
                        }
                        await KFK.syncNodePut(
                            "D",
                            KFK.selectedDIVs[i],
                            "delete node",
                            null,
                            false,
                            i,
                            delCount
                        );
                        i++;
                    }
                }

            }
        } else {
            //没有多项选择时，则进行单项删除
            //首先，先处理鼠标滑过的NODE
            if (KFK.hoverJqDiv()) {
                let theDIV = KFK.hoverJqDiv();
                if (KFK.anyLocked(theDIV)) return;
                let jTemp = theDIV.clone();
                let jTitle = jTemp.find('.coco_title');
                if (jTitle.length > 0) {
                    jTitle.text(jTitle.text() + "的复制");
                }
                KFK.copyCandidateDIVs = [jTemp];
                //这个地方加上shouldBeDeleted标志应该没有必要，不过还是加一下
                //在拖动覆盖其它节点，内容合并后删除被拖动节点时，这个标志是一定要加的，防止draggable end事件中，重新上传U指令，这样内容又会update回来
                theDIV.shouldBeDeleted = true;
                KFK.deleteNode_request(theDIV);
                KFK.hoverJqDiv(null);
            } else if (KFK.hoverSvgLine()) {
                let theSvgLine = KFK.hoverSvgLine();
                //然后，再看鼠标滑过的线条
                if (KFK.anyLocked(theSvgLine)) return;
                KFK.copyCandidateLines = [theSvgLine.clone()];
                KFK._deleteLine(theSvgLine);
                KFK.hoverSvgLine(null);
            } else if (KFK.hoveredConnectId) {
                //delete connect
                //最后看鼠标滑过的connect（节点间连接线）
                if (KFK.docIsReadOnly()) return;
                //Find ids of the two nodes connected by this connect.
                let tmpNodeIdPair = KFK.getNodeIdsFromConnectId(KFK.hoveredConnectId);
                nid = tmpNodeIdPair[0];
                tid = tmpNodeIdPair[1];
                let jqFrom = $(`#${nid}`);
                let jqTo = $(`#${tid}`);
                if (KFK.anyLocked(jqFrom)) return;
                if (KFK.anyLocked(jqTo)) return;
                let oldJq = jqFrom.clone();
                //Remove this connect from the FROM node
                KFK.removeLinkTo(jqFrom, tid);
                let connect_id = `connect_${nid}_${tid}`;
                //Remove ths connect drawing
                KFK.removeConnectById(connect_id);
                //删除一个connect, 则jqFrom被修改
                await KFK.syncNodePut("U", jqFrom.clone(), "remove connect", oldJq, false, 0, 1);
                KFK.debug(KFK.hoveredConnectId, nid, tid);
            }
        }
        if (KFK.copyCandidateDIVs.length > 0 ||
            KFK.copyCandidateLines.length > 0) {
            //判断是否是cut， 而不是delete， cut有clipbaordData, delete没有
            if (evt && evt.clipboardData) {
                evt.clipboardData.setData("text/plain", "usediv");
                evt.clipboardData.setData("text/html", "usediv");
            }
        }
        evt.preventDefault();
        KFK.holdEvent(evt);
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(() => {
            KFK.setSelectedNodesBoundingRect();
        }, 500);
    }
};

/**
 * get Hovered, if null, then focused, if null, then lastcraeted node
 */
KFK.getHoverFocusLastCreateInner = () => {
    let div = KFK.getHoverFocusLastCreate();
    if (NotSet(div)) return undefined;
    let inner = div.find('.innerobj');
    if (inner.length > 0) return inner;
    else return undefined;
}
KFK.getHoverFocusLastCreate = () => {
    let ret = KFK.hoverJqDiv();
    if (NotSet(ret)) {
        ret = KFK.lastFocusOnJqNode;
        if (NotSet(ret)) {
            ret = KFK.lastCreatedJqNode;
            if (NotSet(ret)) {
                ret = undefined;
            }
        }
    }
    return ret;
};

KFK.getFocusHoverLastCreate = () => {
    let ret = KFK.lastFocusOnJqNode;
    if (NotSet(ret)) {
        ret = KFK.hoverJqDiv();
        if (NotSet(ret)) {
            ret = KFK.lastCreatedJqNode;
            if (NotSet(ret)) {
                ret = undefined;
            }
        }
    }
    return ret;
};

/**
 * 进入当前hover对象的编辑状态。
 * 锁定状态的对象不可编辑。
 * todolist，如果是 待办， 则打开底部编辑窗，进行中，已完成，无动作
 * 
 * @param evt  键盘事件，有document的keydown事件处理传递过来
 * @param enterSelect 之前考虑用来控制开始编辑后是否全选，现在看好像没什么用，缺省全选了
 */
KFK.editFocusedThenHoveredObject = async function (evt, enterSelect = false) {
    //如果是todolist, 不允许编辑
    let jqNodeDIV = KFK.getFocusHoverLastCreate();
    if (NotSet(jqNodeDIV)) return;
    if (KFK.anyLocked(jqNodeDIV)) return;
    //Don't edit todolist directly, show edit dialog instead.

    if (jqNodeDIV.hasClass('noedit')) {
        if (jqNodeDIV.attr("id") === "coco_todo") {
            KFK.toggleInputFor("todo");
            await KFK.showMsgInputDlg();
        } else if (jqNodeDIV.attr("id") === "coco_chat") {
            KFK.toggleInputFor("chat");
            await KFK.showMsgInputDlg();
        }
        return;
    }
    //回车的evt要组织掉,否则,在textarea.select()时,会导致文字丢失
    evt.preventDefault();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    KFK.startNodeEditing(jqNodeDIV, enterSelect);
};

/**
 * 复制对象
 */
KFK.duplicateHoverObject = async function (evt, action = undefined) {
    KFK.debug("entered duplicateHoverObject");
    if (KFK.docIsReadOnly()) {
        KFK.debug("docIsReady, no duplicate");
        return;
    }
    let offset = {
        x: 0,
        y: 0
    };
    if (action === "copy") {
        if (KFK.selectedDIVs.length > 1) {
            //优先多选
            KFK.debug("multiple nodes were selected");
            //过滤掉TODOLISTDIV/chatmessage 等nocopy DIV
            let filteredDIVs = KFK.selectedDIVs.filter((div) => {
                return (div.hasClass("nocopy") === false);
            });
            KFK.copyCandidateDIVs = filteredDIVs.map((div) => {
                let jTemp = div.clone();
                let jTitle = jTemp.find('.coco_title');
                if (jTitle.length > 0) {
                    jTitle.text(jTitle.text() + "的复制");
                }
                return jTemp;
            });
            return true;
        } else if (KFK.getPropertyApplyToJqNode()) {
            //然后selected
            //过滤掉TODOLISTDIV
            if (KFK.getPropertyApplyToJqNode().hasClass("nocopy")) {
                KFK.copyCandidateDIVs = [];
                KFK.copyCandidateLines = [];
            } else {
                let jTemp = KFK.getPropertyApplyToJqNode().clone();
                let jTitle = jTemp.find('.coco_title');
                if (jTitle.length > 0) {
                    jTitle.text(jTitle.text() + "的复制");
                }
                KFK.copyCandidateDIVs = [jTemp];
                KFK.copyCandidateLines = [];
            }
            return true;
        } else if (
            KFK.hoverSvgLine() &&
            (action === undefined || action === "copy")
        ) {
            KFK.hoverSvgLine().attr({
                "stroke-width": KFK.hoverSvgLine().attr("origin-width"),
            });
            KFK.copyCandidateLines = [KFK.hoverSvgLine().clone()];
            KFK.copyCandidateDIVs = [];
            // KFK.scrLog('对象已复制, 移动鼠标看所需位置再次按META-D或META-V安放')
            //下面这句代码在第一次按META-D时就粘贴了一条,有些不用,
            // await KFK.makeACopyOfLine(KFK.lineToCopy, evt.shiftKey);
            return true;
        } else {
            return false;
        }
    } else if (action === "paste") {
        if (KFK.copyCandidateDIVs && KFK.copyCandidateDIVs.length > 0) {
            await KFK.makeCopyOfJQs(KFK.copyCandidateDIVs, evt.shiftKey);
        } else if (KFK.copyCandidateLines && KFK.copyCandidateLines.length > 0) {
            await KFK.makeCopyOfLines(KFK.copyCandidateLines, evt.shiftKey);
        } else {
            KFK.debug("Nothing to paste");
        }
        // if (KFK.jqToCopy) {
        // } else if (KFK.lineToCopy) {
        //   await KFK.makeACopyOfLine(KFK.lineToCopy, evt.shiftKey);
        //   //await KFK.makeACopyOfLine(KFK.lineToCopy, evt.shiftKey);
        // }
        return true;
    }
    return true;
    evt.stopPropagation();
};

KFK.makeCopyOfJQs = async function (jqstocopy, shiftKey) {
    //现在是移动指定位置再次META-D才放置对象,因此offset没用.事实上,offset在复制node时就一直没有用到
    let offset = {
        x: 0,
        y: 0
    };
    let theDIV = el(jqstocopy[0]);

    let startPoint = {
        x: KFK.divLeft(jqstocopy[0]),
        y: KFK.divTop(jqstocopy[0]),
    };
    for (let i = 0; i < jqstocopy.length; i++) {
        let oldJqPos = {
            x: KFK.divLeft(jqstocopy[i]),
            y: KFK.divTop(jqstocopy[i]),
        };
        let deltaX = oldJqPos.x - startPoint.x;
        let deltaY = oldJqPos.y - startPoint.y;
        let jqNewNode = KFK.makeCloneDIV(
            jqstocopy[i], KFK.myuid(), {
            "left": KFK.scalePoint(KFK.scrXToJc3X(KFK.currentMousePos.x)) -
                parseInt(jqstocopy[0].css("width")) * 0.5 +
                deltaX,

            "top": KFK.scalePoint(KFK.scrYToJc3Y(KFK.currentMousePos.y)) -
                parseInt(jqstocopy[0].css("height")) * 0.5 +
                deltaY
        },
        )
        //按住shift 复制时，也就是META-SHIFT-D, 则保留linkto
        if (!shiftKey) {
            jqNewNode.removeAttr("linkto");
        }
        KFK.justCreatedJqNode = jqNewNode;
        KFK.lastCreatedJqNode = jqNewNode;

        jqNewNode.appendTo(KFK.C3);
        await KFK.setNodeEventHandler(jqNewNode, async function () {
            if (i === 0) KFK.focusOnNode(jqNewNode);
            await KFK.syncNodePut(
                "C",
                jqNewNode,
                "duplicate node",
                null,
                false,
                0,
                1
            );
            await KFK.LinkFromBrainCenter(jqNewNode);
        });
    }
    return;
};

KFK.makeCloneDIV = function (orig, newid, newcss) {
    let ret = orig.clone(false);
    ret.attr("id", newid);
    if (newcss) ret.css(newcss);
    KFK.cleanNodeEventFootprint(ret);
    KFK.cleanTodoChatForBackup(ret);

    return ret;
};
KFK.makeCopyOfLines = async function (linestocopy) {
    let startPoint = {
        x: linestocopy[0].cx(),
        y: linestocopy[0].cy()
    };
    for (let i = 0; i < linestocopy.length; i++) {
        let newLine = linestocopy[i].clone();
        let deltaX = linestocopy[i].cx() - startPoint.x;
        let deltaY = linestocopy[i].cy() - startPoint.y;

        let newline_id = "shape_" + KFK.myuid();
        let classes = newLine.classes();
        classes.forEach((className, index) => {
            if (className !== "kfkshape") {
                newLine.removeClass(className);
            }
        });
        newLine.attr("id", newline_id);
        newLine.addClass(newline_id);
        //现在是移动指定位置再次META-D才放置对象,因此offset没用.
        //之前的代码在x,y后面分别加了个20, 以便不覆盖到节点
        //现在第一次点取不马上复制了,+offset已经没有了必要
        newLine.center(
            KFK.scalePoint(KFK.scrXToJc3X(KFK.currentMousePos.x)) + deltaX,
            KFK.scalePoint(KFK.scrYToJc3Y(KFK.currentMousePos.y)) + deltaY
        );
        // newLine.addTo(linestocopy[i].parent());
        newLine.addTo(KFK.svgDraw);
        KFK.addShapeEventListner(newLine);
        await KFK.syncLinePut("C", newLine, "duplicate line", null, false);
    }
};
KFK.makeACopyOfLine = async function (linetocopy) {
    let newLine = KFK.lineToCopy.clone();

    let newline_id = "shape_" + KFK.myuid();
    let classes = newLine.classes();
    classes.forEach((className, index) => {
        if (className !== "kfkshape") {
            newLine.removeClass(className);
        }
    });
    newLine.attr("id", newline_id);
    newLine.addClass(newline_id);
    //现在是移动指定位置再次META-D才放置对象,因此offset没用.
    //之前的代码在x,y后面分别加了个20, 以便不覆盖到节点
    //现在第一次点取不马上复制了,+offset已经没有了必要
    //TODO: curentMousePos位置有问题, 现在应该是JC3的了
    newLine.center(
        KFK.scalePoint(KFK.scrXToJc3X(KFK.currentMousePos.x)),
        KFK.scalePoint(KFK.scrYToJc3Y(KFK.currentMousePos.y))
    );
    newLine.addTo(KFK.lineToCopy.parent());
    KFK.addShapeEventListner(newLine);
    await KFK.syncLinePut("C", newLine, "duplicate line", null, false);
};

KFK.getBoundingRectOfSelectedDIVs = function () {
    if (KFK.selectedDIVs.length == 0) return;
    let ret = {
        left: KFK.divLeft(KFK.selectedDIVs[0]),
        top: KFK.divTop(KFK.selectedDIVs[0]),
        right: KFK.divRight(KFK.selectedDIVs[0]),
        bottom: KFK.divBottom(KFK.selectedDIVs[0]),
    };
    for (let i = 0; i < KFK.selectedDIVs.length; i++) {
        let tmpRect = {
            left: KFK.divLeft(KFK.selectedDIVs[i]),
            top: KFK.divTop(KFK.selectedDIVs[i]),
            right: KFK.divRight(KFK.selectedDIVs[i]),
            bottom: KFK.divBottom(KFK.selectedDIVs[i]),
        };
        if (tmpRect.left < ret.left) {
            ret.left = tmpRect.left;
        }
        if (tmpRect.top < ret.top) {
            ret.top = tmpRect.top;
        }
        if (tmpRect.right > ret.right) {
            ret.right = tmpRect.right;
        }
        if (tmpRect.bottom > ret.bottom) {
            ret.bottom = tmpRect.bottom;
        }
    }
    ret.width = ret.right - ret.left;
    ret.height = ret.bottom - ret.top;

    return ret;
};

KFK.getText = function (jqdiv) {
    let text_filter = ".innerobj";
    return jqdiv.find(text_filter).text();
};

KFK.setText = function (jqdiv, text) {
    let text_filter = ".innerobj";
    return jqdiv.find(text_filter).text(text);
};

KFK.jc3PosToJc1Pos = function (pos) {
    return {
        x: pos.x * KFK.scaleRatio + KFK.LeftB,
        y: pos.y * KFK.scaleRatio + KFK.TopB,
    };
};

KFK.jc3XToJc1X = function (x) {
    return x + KFK.LeftB;
};
KFK.jc3YToJc1Y = function (y) {
    return y + KFK.TopB;
};
KFK.jc1XToJc3X = function (x) {
    return x - KFK.LeftB;
};
KFK.jc1YToJc3Y = function (y) {
    return y - KFK.TopB;
};

//Screen pos x to JC3 pos x
KFK.scrXToJc3X = function (x) {
    return KFK.scrXToJc1X(x) - KFK.LeftB;
};
KFK.scrYToJc3Y = function (y) {
    return KFK.scrYToJc1Y(y) - KFK.TopB;
};

//Screen pos x to JC1 pos x
KFK.scrXToJc1X = function (x) {
    return x + KFK.JS1.scrollLeft();
};
KFK.scrYToJc1Y = function (y) {
    return y + KFK.JS1.scrollTop();
};
KFK.jc1XToScrX = function (x) {
    return x - KFK.JS1.scrollLeft();
};
KFK.jc1YToScrY = function (y) {
    return y - KFK.JS1.scrollTop();
};

KFK.saveLocalViewConfig = function () {
    jlog(KFK.APP.model.viewConfig);
    localStorage.setItem("viewConfig", JSON.stringify(KFK.APP.model.viewConfig));
};

KFK.rgba2hex = function (orig) {
    var a,
        isPercent,
        rgb = orig
            .replace(/\s/g, "")
            .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = ((rgb && rgb[4]) || "").trim(),
        hex = rgb ?
            (rgb[1] | (1 << 8)).toString(16).slice(1) +
            (rgb[2] | (1 << 8)).toString(16).slice(1) +
            (rgb[3] | (1 << 8)).toString(16).slice(1) :
            orig;
    if (alpha !== "") {
        a = alpha;
    } else {
        a = 01;
    }

    a = Math.round(a * 100) / 100;
    var alpha = Math.round(a * 255);
    var hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
    hex = hex + hexAlpha;

    return "#" + hex;
};

KFK.secureHexColor = function (color) {
    if (color.startsWith("rgb")) {
        return KFK.rgba2hex(color);
    } else {
        return color;
    }
};

KFK.toggleShowGrid = function (checked) {
    if (checked) {
        let bgcolor = $("#containerbkg").css("background-color");
        bgcolor = KFK.secureHexColor(bgcolor);
        KFK.setGridColor(bgcolor);
    } else {
        $("#containerbkg").removeClass("grid1");
        $("#containerbkg").removeClass("grid2");
    }
    KFK.saveLocalViewConfig();
};
KFK.setShowBounding = function (checked) {
    if (checked) {
        $(".pageBoundingLine").removeClass("noshow");
    } else {
        $(".pageBoundingLine").addClass("noshow");
    }
};
KFK.toggleShowBounding = function (checked) {
    KFK.setShowBounding(checked);
    KFK.saveLocalViewConfig();
};
KFK.toggleSnap = function (checked) {
    KFK.saveLocalViewConfig();
};

KFK.toggleShowLock = function (checked) {
    //.locklabel无论是在DIV上,还是在svgline上,下面的代码都起作用, svg真神奇
    if (checked) {
        $(".locklabel").removeClass("noshow");
    } else {
        $(".locklabel").addClass("noshow");
    }
    KFK.saveLocalViewConfig();
};

KFK.toggleEnterToConfirmInput = function (checked) {
    KFK.saveLocalViewConfig();
};

KFK.toggleEnterWithChat = function (checked) {
    KFK.saveLocalViewConfig();
    if (KFK.APP.model.viewConfig.enterWithChat) {
        KFK.beginChatMode();
    }
};
KFK.toggleUseAI = function (checked) {
    KFK.saveLocalViewConfig();
    if (KFK.APP.model.viewConfig.useAI === false) {
        KFK.scrLog('如果您初次使用，强烈建议打开自动提示');
    } else {
        KFK.scrLog('自动提示已打开，请稍候');
    }
};

KFK.lineCapChanged = function (checked) {
    let theShape = KFK.getPropertyApplyToShape();
    KFK.setShapeToRemember(theShape);
    if (theShape === null || KFK.anyLocked(theShape)) return;
    KFK.setLineModel({
        linecap: checked
    });
    theShape.attr({
        "stroke-linecap": checked ? "round" : "square",
    });
    KFK.syncLinePut("U", theShape, "set line color", KFK.shapeToRemember, false);
};

KFK.init = async function () {
    if (KFK.inited === true) {
        console.error("KFK.init was called more than once, maybe loadImages error");
        return;
    }
    KFK.debug("Initializing...");
    KFK.checkBrowser();
    KFK.initTypeWriter();
    KFK.pickerMatlib = $(".matlib-topick");

    $('.showAfterInit').removeClass('showAfterInit');
    $("#minimap").removeClass("noshow");
    $("#left_scenarios").removeClass("noshow");
    //先不做重新载入,每次进入使用缺省配置可能对培养用户习惯更合适一些
    KFK.initExplorer();
    if (KFK.urlMode === 'gotoSignin') {
        KFK.gotoSignin();
        KFK.setAppData("show", "waiting", false);
    } else if (KFK.urlMode == 'gotoRegister') {
        KFK.gotoRegister();
        KFK.setAppData("show", "waiting", false);
    } else {
        await KFK.showSection({
            sigin: false,
            register: false,
            explorer: false,
            designer: false,
        });

        await KFK.checkSession();
        setInterval(() => {
            KFK.AI('hover_c3');
        }, 10000);
    }

};

KFK.initExplorer = function () {
    if (KFK.explorerInitialized) return;
    try {
        KFK.loadAvatars();
        KFK.explorerInitialized = true;
        KFK.debug("[Initialized] explorer");
    } catch (error) {
        console.error("Explorer initialization error");
        console.error(error);
    }
};

/**
 * 在refreshDesignerWithDoc中被调用
 */
KFK.initDesigner = async function () {
    if (KFK.designerInitialized) return;
    try {
        KFK.loadImages();
        // KFK.loadSvgs();
        KFK.initLayout();
        KFK.initQuillFonts();
        KFK.initC3();
        KFK.initPropertyForm();
        KFK.initLineTransformer();
        //KFK.initColorPicker();
        KFK.showCenterIndicator();
        KFK.initPropertySvgGroup();
        await KFK.initCocoChat();
        await KFK.initVideoRoom();
        KFK.designerInitialized = true;
        KFK.debug("[Initialized] designer");
    } catch (error) {
        console.error("Designer initialization error");
        console.error(error);
    }
};

KFK.initTypeWriter = function () {
    KFK.dataText = ["异地办公", "跨地域团队", "在家办公", "通过网络开展工作时", "出差在外", "需要远程工作时", "无法跟同事当面讨论时",
        "订不到会议室时", "找不到可以一起写写画画的白板时"
    ];

    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
        // chekc if text isn't finished yet
        if (i < (text.length)) {
            // add next character to h1
            $('.typewriter').prop('innerHTML', text.substring(0, i + 1) + '<span aria-hidden="true"></span>');

            // wait for a while and call this function again for next character
            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback)
            }, 150);
        }
        // text finished, call callback if there is a callback function
        else if (typeof fnCallback == 'function') {
            // call callback after timeout
            setTimeout(fnCallback, 1000);
        }
    }
    // start a typewriter animation for a text in the dataText array
    function StartTextAnimation(i) {
        if (i >= KFK.dataText.length) {
            setTimeout(function () {
                StartTextAnimation(0);
            }, 1000);
        } else {
            // text exists! start typewriter animation
            typeWriter(KFK.dataText[i], 0, function () {
                // after callback (and whole text has been animated), start next text
                StartTextAnimation(i + 1);
            });
        }
    }
    // start the text animation
    StartTextAnimation(0);
};



KFK.initCocoChat = async function () {
    let jqCocoChat = $('#coco_chat');
    await this.loadDIVPositon('coco_chat_pos', '#coco_chat');
    // jqCocoChat.removeClass('noshow');
    jqCocoChat.draggable({
        start: (evt, ui) => {
            KFK.touchChatTodo = true;
        },
        drag: (evt, ui) => { },
        stop: async (evt, ui) => {
            KFK.touchChatTodo = false;
            KFK.saveDIVPosition('coco_chat_pos',
                jqCocoChat.css('left'),
                jqCocoChat.css('top'),
                jqCocoChat.css('width'),
                jqCocoChat.css('height')
            );
        },
    });
    jqCocoChat.resizable({
        autoHide: true,
        start: () => {
            KFK.touchChatTodo = true;
        },
        resize: () => { },
        stop: async () => {
            KFK.touchChatTodo = false;
            KFK.saveDIVPosition('coco_chat_pos',
                jqCocoChat.css('left'),
                jqCocoChat.css('top'),
                jqCocoChat.css('width'),
                jqCocoChat.css('height')
            );
        },
    });
};

KFK.initVideoRoom = async function () {
    let jqRoom = $('#video_room');
    await KFK.loadDIVPositon('video_room_pos', '#video_room');
    jqRoom.on('click', (evt) => {
        evt.stopPropagation();
    });
    jqRoom.draggable({
        start: (evt, ui) => {
            KFK.touchChatTodo = true;
        },
        drag: (evt, ui) => { },
        stop: async (evt, ui) => {
            KFK.touchChatTodo = false;
            KFK.saveDIVPosition('video_room_pos',
                jqRoom.css('left'),
                jqRoom.css('top'),
                jqRoom.css('width'),
                jqRoom.css('height')
            );
        },
    });
    jqRoom.resizable({
        autoHide: true,
        start: () => {
            KFK.touchChatTodo = true;
        },
        resize: () => { },
        stop: async () => {
            KFK.touchChatTodo = false;
            KFK.saveDIVPosition('video_room_pos',
                jqRoom.css('left'),
                jqRoom.css('top'),
                jqRoom.css('width'),
                jqRoom.css('height')
            );
        },
    });
};

/*
   KFK.loadSvgs = function () {
   if (NotSet(KFK.svgLoaded)) {
   const getString = bent('string');
   $.each(KFK.APP.tip_groups, async (index, group) => {
   let svgs = group.svgs;
   for (let i = 0; i < svgs.length; i++) {
   let name = svgs[i];
   let svgurl = cocoConfig.frontend.url + "/svgs/" + name + ".svg";
   let svgstr = await getString(svgurl);
   SVGs[name] = svgstr;
   }
   });
   KFK.svgLoaded = true;
   }
   };
   */

KFK.initPropertySvgGroup = function () {
    //在pad.js中的tip_groups中定义了要用到的svgs。
    //如果这些svgts在svgs.js中被定义的话，则表示这是一个内建svg，支持对其属性进行操作
    //如果在svgs。js中没有定义，则表示是一个需要从云端加载的image，且不支持属性修改
    $.each(KFK.APP.tip_groups, async (index, group) => {
        let title = group.title;
        let svgHolder = $(group.div);
        let svgs = group.svgs;
        for (let i = 0; i < svgs.length; i++) {
            let span = document.createElement("span");
            let jspan = $(span);
            let name = svgs[i];
            let svgImg = undefined;
            //在SVGS中定义的svg, 是内建svg对象，可以修改它的属性
            //从云端加载的img不支持修改svg属性
            if (NotSet(SVGs[name])) {
                svgImg = $(`<img src='${cocoConfig.frontend.url}/svgs/${name}.svg'/>"`);
            } else {
                svgImg = $(SVGs[name]);
            }
            svgImg.css("width", "36px");
            svgImg.css("height", "36px");
            svgImg.css("padding", "2px");
            jspan.css("width", "36px");
            jspan.css("height", "36px");
            jspan.css("padding", "2px");
            jspan.on("mouseover", (evt) => {
                let target = svgImg;
                let svgMainPath = target.find(".svg_main_path");
                if (svgMainPath.length > 0) svgMainPath.attr("fill", "#E5DBFF");
                else jspan.css("background-color", "#E5DBFF");
            });
            jspan.on("mouseout", (evt) => {
                let target = svgImg;
                let svgMainPath = target.find(".svg_main_path");
                if (svgMainPath.length > 0) svgMainPath.attr("fill", "#F7F7C6");
                else jspan.css("background-color", "#FFFFFF");
            });
            svgImg.on("click", async (evt) => {
                KFK.justCreatedJqNode = null;
                //KFK.setMode("yellowtip");
                await this.setTipVariant(name, evt.shiftKey);
            });
            svgImg.appendTo(jspan);
            jspan.appendTo(svgHolder);
        }
    });
};

KFK.connectToWS = async () => {
    await WS.start(
        KFK.onWsConnected,
        KFK.onWsMsg,
        KFK.onWsClosed,
        KFK.onWsReconnect,
        KFK.onWsGiveup,
        100,
        "checkSession",
        "KEEP",
        KFK.wsTryTimesBeforeGiveup
    );
};

//checkSesion有两个地方被调用,一个是在第一次进入, init 方法中, 一个是在OPENANN后
//OPENANN后调用,会发生WS连接被第二次打开的情况,ws.js中使用了重用,杜绝发生连接两个websocket的情况
KFK.checkSession = async function () {
    KFK.info("...checkSession");
    //WSReconnectTime只用来记录在Designer使用过程中的网络断掉后的重连次数
    //那个是ws.js自动控制重连的,重连时,ws.js会调用KFK.onWSConnected, 在那里,对WSReconnectTime进行技术
    KFK.setAppData("model", "prjs", []);

    KFK.cocouser = null;
    await KFK.readLocalCocoUser();
    if (KFK.cocouser) {
        KFK.debug("checksession: found KFK.cocouser" + KFK.cocouser.name);
        KFK.setAppData(
            "model",
            "isDemoEnv",
            KFK.cocouser.userid.indexOf("@cocopad_demo.org") > 0
        );
    }
    if (KFK.cocouser && KFK.cocouser.sessionToken) {
        //匿名用户获得临时身份后,会重新进入CheckSession,就也会运行到这里
        //这时,WS.ws已经是处于连接状态的,再次调用WS.start时, ws.js中会重用之前的连接,
        //但是会充值WS.connectTimes为0
        KFK.debug("checksession: LU yes, connect server");
        await KFK.connectToWS();
    } else if (KFK.shareCode) {
        //没有localUser, but URL中有shareCode
        //两种URL形式都连接WS
        if (KFK.urlMode === "ivtcode") {
            KFK.debug("checksession: LU no, ivtURL yes,  connect server");
        } else {
            KFK.debug("checksession: LU no, scURL yes, connect server");
        }
        await KFK.connectToWS();
    } else {
        //no local user, URL中无shareCode
        //读本地存储shareCode
        let localShareCode = localStorage.getItem("shareCode");
        if (localShareCode === null) {
            //no local user nor local sharecode
            KFK.debug("checksession: LU no, SCURL no, LSC no, goto fresh register");
            if (KFK.urlBase.indexOf('liuzijin') || KFK.urlBase.indexOf('localhost')) {
                KFK.gotoSignin();
                //KFK.gotoRegister();
                KFK.setAppData("show", "waiting", false);
            } else {
                KFK.urlMode = 'sharecode';
                KFK.shareCode = 'welcome_new_user';
                await KFK.connectToWS();
            }
        } else {
            //no local user but has local sharecode
            if (localShareCode.length === 8) {
                //local sharecode is a ivtcode
                KFK.urlMode = "ivtcode";
                KFK.shareCode = localShareCode;
                KFK.debug(
                    "checksession: LU no, SCURL no, LSC no, LIVT yes, goto register"
                );
                KFK.gotoRegister();
                KFK.setAppData("show", "waiting", false);
            } else {
                //local sharecod is a sharecode
                KFK.urlMode = "sharecode";
                KFK.shareCode = localShareCode;
                KFK.debug("checksession: LU no, SCURL no, LSC yes, connect server");
                await KFK.connectToWS();
            }
        }
    }
};

KFK.onWsClosed = function () {
    KFK.debug("WS Closed");
};

KFK.onWsGiveup = function () {
    KFK.debug("WS connect giveup");
    KFK.setAppData("show", "waiting", false);
    $(".reconnect-mask").removeClass("nodisplay");
    $("#reconnect-warning").html("多次尝试后，网络依然无法连接, 请稍后刷新重试");
};
KFK.onWsReconnect = function () {
    $(".reconnect-mask").removeClass("nodisplay");
    $("#reconnect-warning").html("网络竟然开小差了，正在尝试重连。。。");
    KFK.setAppData("show", "waiting", true);
    KFK.isTryingToReconnect = true;
};
KFK.onWsConnected = function () {
    KFK.WS = WS;
    KFK.debug("Connect Times", KFK.WS.connectTimes);
    KFK.setAppData("show", "waiting", false);
    $(".reconnect-mask").addClass("nodisplay");
    KFK.APP.setData("show", "wsready", true);
    //第一次连接，这条消息会被kj迎回来覆盖，正常
    if (KFK.isTryingToReconnect === undefined) {
        //The first time
        //这里是第一次启动cocopad，服务器连接成功时的处理方式
        //refreshProjectList会用到很多需要Auth的操作，但shareDocInUrl不需要
        //如果URL中没有ShareCodeInURL
        //正常情况下，会进入到浏览器界面
        if (KFK.cocouser && KFK.cocouser.sessionToken) {
            KFK.sendCmd("UPDMYORG", {});
            if (KFK.shareCode === null) {
                KFK.refreshProjectList();
            } else {
                //URL中有shareCode或者ivtCode
                if (KFK.cocouser.userid.indexOf("@cocopad_demo.org") < 0) {
                    //已经正常注册的用户,不需要有shareCode记录在本地
                    localStorage.removeItem("shareCode");
                    KFK.debug("正常用户不保存sharecode");
                } else {
                    //如果是demo用户
                    //sharecode根据情况,都放一个,这样后面正式注册时,删除
                    //docIdInUrl时,这个sharecode与其实际doc_id不符,不过无所谓
                    //这样,本地localStorage中的shareCode即可能是个shareCode, 也可能是个ivtcode
                    localStorage.setItem("shareCode", KFK.shareCode);
                }
                if (KFK.urlMode === "sharecode") KFK.openSharedDoc(KFK.shareCode);
                else KFK.refreshProjectList();
            }
        } else {
            //no local user
            if (KFK.shareCode === null) {
                //这个运行不到,因为,只要连接服务器,要么是有本地用户信息,要么有shareCode
                KFK.gotoRegister();
            } else {
                // has sharecode
                localStorage.setItem("shareCode", KFK.shareCode);
                if (KFK.urlMode === "sharecode") KFK.openSharedDoc(KFK.shareCode);
                else {
                    KFK.sendCmd("GETINVITOR", {});
                    KFK.gotoRegister();
                }
            }
        }
    } else {
        //重新连接
        KFK.debug(">>>>>>>>WS Reconnect success...");
        let count = 0;
        $(document)
            .find(".offline")
            .each(async (index, aNodeDIV) => {
                count += 1;
                await KFK.syncNodePut(
                    "U",
                    $(aNodeDIV),
                    "offline_not_undoable",
                    null,
                    false,
                    0,
                    1
                );
            });
        KFK.info(`There are ${count} offline nodes `);
        if (count === 0) {
            let cocodcoInStorage = JSON.parse(localStorage.getItem("cocodoc"))
            if (cocodcoInStorage && cocodcoInStorage.doc_id) {
                KFK.sendCmd("DOC_ID", {
                    doc_id: cocodcoInStorage.doc_id
                });
            }
        }
        KFK.isTryingToReconnect = undefined;
    }
};
KFK.rememberLayoutDisplay = function () {
    KFK.layoutRemembered = {
        showbounding: KFK.APP.model.viewConfig.showbounding,
        showgrid: KFK.APP.model.viewConfig.showgrid,
        minimap: KFK.APP.show.section.minimap,
        toplogo: $("#toplogo").hasClass('noshow'),
        docHeaderInfo: $("#docHeaderInfo").hasClass('noshow'),
        rtcontrol: $("#rtcontrol").hasClass('noshow'),
        left: $("#left").hasClass('noshow'),
        right: $("#right").hasClass('noshow')
    };
};
KFK.restoreLayoutDisplay = async function () {
    KFK.APP.model.viewConfig.showgrid = KFK.layoutRemembered.showgrid;
    if (KFK.layoutRemembered.showgrid) $("#containerbkg").addClass("grid1");
    else $("#containerbkg").removeClass("grid1");
    KFK.APP.model.viewConfig.showbounding = KFK.layoutRemembered.showbounding;
    if (KFK.layoutRemembered.showbounding === true)
        $(".pageBoundingLine").removeClass("noshow");
    else $(".pageBoundingLine").addClass("noshow");

    await KFK.showSection({
        minimap: KFK.layoutRemembered.minimap
    });
    KFK.layoutRemembered.toplogo ? $('#toplogo').addClass('noshow') : $('#toplogo').removeClass('noshow');
    KFK.layoutRemembered.docHeaderInfo ? $("#docHeaderInfo").addClass('noshow') : $("#docHeaderInfo").removeClass('noshow');
    KFK.layoutRemembered.rtcontrol ? $("#rtcontrol").addClass('noshow') : $("#rtcontrol").removeClass('noshow');
    KFK.layoutRemembered.left ? $("#left").addClass('noshow') : $("#left").removeClass('noshow');
    KFK.layoutRemembered.right ? $("#right").addClass('noshow') : $("#right").removeClass('noshow');
};
KFK.setLayoutDisplay = async function (config) {
    KFK.debug("setlayoutdisplay", JSON.stringify(config));
    KFK.rememberLayoutDisplay();
    if (config.showgrid !== null) {
        KFK.APP.model.viewConfig.showgrid = config.showgrid;
        if (config.showgrid === true) $("#containerbkg").addClass("grid1");
        else $("#containerbkg").removeClass("grid1");
    }

    if (config.showbounding !== undefined) {
        KFK.APP.model.viewConfig.showbounding = config.showbounding;
        if (config.showbounding === true) {
            $(".pageBoundingLine").removeClass("noshow");
        } else {
            $(".pageBoundingLine").addClass("noshow");
        }
    }

    await KFK.showSection({
        minimap: config.minimap
    });
    config.toplogo ? $('#toplogo').removeClass('noshow') : $('#toplogo').addClass('noshow');
    config.docHeaderInfo ? $('#docHeaderInfo').removeClass('noshow') : $('#docHeaderInfo').addClass('noshow');
    config.rtcontrol ? $('#rtcontrol').removeClass('noshow') : $('#rtcontrol').addClass('noshow');
    config.left ? $('#left').removeClass('noshow') : $('#left').addClass('noshow');
    config.right ? $('#right').removeClass('noshow') : $('#right').addClass('noshow');
};

KFK.showSection = async function (options) {
    let section = $.extend({}, KFK.APP.show.section, options);
    await KFK.APP.setData("show", "section", section);
};

KFK.showForm = async function (options) {
    let form = $.extend({}, KFK.APP.show.form, options);
    await KFK.APP.setData("show", "form", form);
};

KFK.showDialog = async function (options) {
    let dialog = $.extend({}, KFK.APP.show.dialog, options);
    await KFK.APP.setData("show", "dialog", dialog);
};
KFK.mergeAppData = async (data, key, value) => {
    if (
        typeof data === "string" &&
        typeof key === "string" &&
        typeof value === "object"
    ) {
        let tmpData = $.extend({}, KFK.APP[data][key], value);
        await KFK.APP.setData(data, key, tmpData);
    } else if (
        typeof data === "string" &&
        data.indexOf(".") > 0 &&
        typeof key === "object"
    ) {
        let arr = data.split(".");
        let tmpData = $.extend({}, KFK.APP[arr[0]][arr[1]], key);
        await KFK.APP.setData(arr[0], arr[1], tmpData);
    }
};

KFK.setAppData = (data, key, value) => {
    KFK.APP.setData(data, key, value);
};

KFK.openSharedDoc = async function (shareCode) {
    KFK.debug(">>>>>>>>openSharedDoc", shareCode);
    //如果是sharecode, 则去服务器取
    await KFK.refreshDesignerWithDoc(null, "");
    KFK.debug("send OPENSHAREDDOC ", shareCode);
    setTimeout(function () {
        KFK.sendCmd("OPENSHAREDDOC", {
            shareCode: shareCode
        });
    }, 200);
};

KFK.quickGlance = async (doc) => {
    if (NotSet(doc.qgTimes)) {
        doc.qgTimes = 0;
    }
    doc.qgTimes++;
    if (doc.qgTimes > 3) return;
    KFK.refreshDesignerWithDoc(doc._id, '', true);
};

/**
 * 载入文档前的初始化Designer动作
 * 如果doc_id, 只初始化,不载入文档. 在用户执行清除文档时,就执行这个操作
 */
KFK.refreshDesignerWithDoc = async function (doc_id, docpwd, quickGlance = false, forceReadonly = false) {
    if (doc_id !== null) KFK.info(">>>>>>refereshDesigner for doc", doc_id);
    else KFK.info(">>>>>>refereshDesigner only, no doc will be load");
    if ($("#S1").length < 1) {
        console.warn("S1 not found, designer is missing, should not happen");
        return;
    }
    await KFK.initDesigner();
    await KFK.readLocalCocoUser();
    KFK.hide($("#docHeaderInfo"));
    KFK.hide(KFK.JC3);

    await KFK.initViewByLocalConfig();
    if (KFK.APP.model.viewConfig.enterWithChat) {
        KFK.beginChatMode();
    }
    //每次进入Designer, 都会清空内部所有对象
    //清空以后,先把svgLayer做出来
    KFK.addSvgLayer();

    KFK.opstack.splice(0, KFK.opstacklen);
    KFK.opz = -1;
    KFK.setAppData("model", "actionlog", []);

    await KFK.showSection({
        signin: false,
        register: false,
        explorer: false,
        designer: true,
    });
    KFK.showForm({
        newdoc: false,
        newprj: false,
        prjlist: false,
        doclist: false,
        share: false,
    });
    KFK.tryToOpenDocId = doc_id;
    // KFK.APP.setData("model", "cocodoc", KFK.DocController.getDummyDoc());
    // localStorage.removeItem("cocodoc");

    KFK.initShowEditors("none");
    KFK.addDocumentEventHandler();
    KFK.focusOnC3();
    KFK.cancelAlreadySelected();

    KFK.setRightTabIndex(2);
    //需要在explorer状态下隐藏的，都可以加上noshow, 在进入Designer时，noshow会被去掉
    //并以动画形式显示出来
    $(".padlayout").removeClass("noshow");
    KFK.hide('#right');
    $(".padlayout").fadeIn(1000, function () {
        // Animation complete
    });

    if (doc_id !== null)
        KFK.info("Designer is fully ready, load doc[", doc_id, "] now");
    else
        KFK.info("Designer is fully ready, but no doc load since doc_id not set");
    KFK.currentView = "designer";
    if (doc_id !== null) await KFK.loadDoc(doc_id, docpwd, quickGlance, forceReadonly);
};

KFK.loadDoc = async function (doc_id, pwd, quickGlance = false, forceReadonly = false) {
    KFK.info("loadDoc", doc_id, pwd);
    KFK.QUICKGLANCE = quickGlance;
    KFK.FORCEREADONLY = forceReadonly;
    try {
        let payload = {
            doc_id: doc_id,
            pwd: pwd
        };
        if (KFK.cocouser && KFK.cocouser.sessionToken) {
            if (KFK.docDuringLoading !== null) {
                KFK.debug("docduringloading is not null, cancel loading");
                KFK.cancelLoading = true;
                KFK.JC3.empty();
            }
            KFK.docDuringLoading = doc_id;
            KFK.hide(KFK.JC3);
            KFK.debug("Open doc normally");
            KFK.sendCmd("OPENDOC", payload);
        } else {
            KFK.debug("Open doc annonymously");
            KFK.sendCmd("OPENANN", payload);
        }

        await KFK.showSection({
            signin: false,
            register: false,
            explorer: false,
            designer: true,
        });
    } catch (err) {
        console.error(err);
    } finally {
        KFK.inited = true;
    }
};

KFK.refreshProjectList = async function () {
    await KFK.sendCmd("LISTPRJ", {
        skip: 0
    });
};

KFK.setCurrentPrj = function (prj) {
    KFK.APP.setData("model", "cocoprj", prj);
    if (prj.prjid !== "all" && prj.prjid !== "others" && prj.prjid !== "mine") {
        KFK.APP.setData("model", "lastrealproject", prj);
    }
    localStorage.setItem("cocoprj", JSON.stringify(prj));
};

KFK.clearCurrentProject = function () {
    KFK.APP.setData("model", "cocoprj", {
        prjid: "",
        name: ""
    });
    KFK.APP.setData("model", "lastrealproject", {
        prjid: "",
        name: ""
    });
    localStorage.removeItem("cocoprj");
};
KFK.resetAllLocalData = function (keep = {}) {
    localStorage.removeItem("cocoprj");
    localStorage.removeItem("cocodoc");
    KFK.APP.setData("model", "cocodoc", {
        doc_id: "dummydocnotallowed",
        name: "",
        prjid: "dummydocnotallowed",
        owner: "dummydocnotallowed",
        readonly: false,
    });
    if (NotSet(keep.user))
        KFK.APP.setData("model", "cocouser", {
            userid: "",
            name: "",
            avatar: "avatar-0",
            avatar_src: null,
        });
    KFK.APP.setData("model", "cocoprj", {
        prjid: "",
        name: ""
    });
    KFK.APP.setData("model", "lastrealproject", {
        prjid: "",
        name: ""
    });
    KFK.APP.setData("model", "prjs", []);
    KFK.APP.setData("model", "docs", []);
    //清除vorgs和 myorgs数据
    if (NotSet(keep.vorgs)) KFK.APP.setData("model", "vorgs", []);
    if (NotSet(keep.myorgs)) KFK.APP.setData("model", "myorgs", []);
    KFK.APP.setData("model", "org", {
        neworg: {
            name: ""
        },
        newuserid: "",
        changeorgname: "",
    });
    //标志 左侧的org tab没有被打开过
    KFK.orgTabInitialized = false;
    KFK.explorerRefreshed = false;
};
KFK.toggleDetails = function (row) {
    if (row.detailsShowing) {
        row.toggleDetails();
    } else {
        let theorg = row.item;
        KFK.APP.model.org.changeorgname = theorg.name;
        KFK.sendCmd("ORGUSERLIST", {
            _id: theorg._id
        });
        KFK.idRowMap[theorg._id] = row;
    }
};
KFK.showCreateNewDoc = function () {
    if (
        KFK.APP.model.lastrealproject.prjid === "" ||
        KFK.APP.model.lastrealproject.prjid === "all" ||
        KFK.APP.model.lastrealproject.prjid === "others" ||
        KFK.APP.model.lastrealproject.prjid === "mine"
    ) {
        //如果没有选择项目,则去选择项目
        //设置选择项目(gotoPrj)后的回调方法
        KFK.onPrjSelected = KFK.showCreateNewDoc;
        KFK.gotoPrjList("在哪个项目中新建白板？", true);
    } else {
        KFK.onPrjSelected = undefined;
        KFK.APP.setData("show", "form", {
            newdoc: true,
            newprj: false,
            prjlist: true,
            doclist: false,
            explorerTabIndex: 1,
            bottomlinks: true,
        });
    }
};

KFK.showFullHelp = function () {
    KFK.info("showFullHelp not implemented");
};

KFK.gotoSignin = async function () {
    // KFK.APP.setData("model", "signin", { userid: "", pwd: "" });
    KFK.setAppData("model", "signInButWaitVerify", false);
    await KFK.showSection({
        register: false,
        signin: true,
        explorer: false,
        designer: false,
    });
};

KFK.gotoRegister = async function () {
    KFK.APP.setData("model", "register", {
        userid: "",
        pwd: "",
        pwd2: "",
        name: "",
        step: "reg",
        code: "",
    });
    await KFK.showSection({
        signin: false,
        register: true,
        explorer: false,
        designer: false,
    });
};

KFK.remoteCheckUserId = function (userid) {
    KFK.usefAlreadyExist = false;
    KFK.WS.put("IFEXIST", {
        userid: userid
    });
};

KFK.showCreateNewPrj = function () {
    KFK.APP.setData("show", "form", {
        newdoc: false,
        newprj: true,
        prjlist: false,
        doclist: true,
        explorerTabIndex: 0,
        bottomlinks: true,
    });
};
KFK.selectPrjTab = function () {
    KFK.APP.setData("show", "form", {
        newdoc: false,
        newprj: false,
        prjlist: true,
        doclist: true,
        explorerTabIndex: 0,
        bottomlinks: true,
    });
};
KFK.onClickOrgTab = async function () {
    //用户第一次进入,或者推出登录(此时,在Signout中,orgTabInitialized会被重置为False),重新进入时
    if (IsFalse(KFK.orgTabInitialized)) {
        //我创建的组织myorg accordion是否为打开状态?
        if (KFK.accordion["myorg"]) {
            await KFK.sendCmd("LISTMYORG", {});
        }
        //我加入的组织vorg accordion是否为打开状态?
        if (KFK.accordion["vorg"]) {
            await KFK.sendCmd("LISTVORG", {});
        }
        //接下去再点我的组织, 上面if中的过程就不会再执行了
        KFK.orgTabInitialized = true;
    }
};
KFK.onClickMatTab = async function () {
    KFK.materialUpdated || (await KFK.loadMatLibForMyself());
};
KFK.loadMatLibForMyself = async function () {
    await KFK.sendCmd("LISTMAT", {});
};
KFK.refreshMatLibForAll = async function () {
    await KFK.sendCmd("REFRESHMAT", {});
};
KFK.gotoExplorerTab = function (tabIndex) {
    KFK.mergeAppData("show.form", {
        explorerTabIndex: tabIndex
    });
};
KFK.gotoDocNavTab = function (tabIndex) {
    KFK.APP.docNavTabIndex = tabIndex;
};

//这里检查是否有project
KFK.showProjects = async function () {
    KFK.showForm({
        newdoc: false,
        newprj: false,
        prjlist: true,
        doclist: true
    });
    let currentprj = localStorage.getItem("cocoprj");
    if (!getNull(currentprj)) {
        let prj = JSON.parse(currentprj);
        let found = -1;
        for (let i = 2; i < KFK.APP.model.prjs.length; i++) {
            if (prj.prjid === KFK.APP.model.prjs[i].prjid) {
                found = i;
                break;
            }
        }
        if (found < 0) {
            if (KFK.APP.model.prjs.length > 0) {
                KFK.gotoPrjList("请选择一个项目");
            } else {
                KFK.showCreateNewPrj();
            }
        } else {
            KFK.setCurrentPrj(prj);
            await KFK.sendCmd("LISTDOC", {
                prjid: prj.prjid
            });
        }
    } else {
        await KFK.sendCmd("LISTDOC", {
            prjid: "all"
        });
    }
};
KFK.gotoPrjList = async function (msg = null, userealprjs = false) {
    sessionStorage.setItem('leftTabIndex', 0);
    if (KFK.APP.model.cocoprj.name === "") {
        KFK.setAppData("model", "cocoprj", {
            prjid: "all",
            name: "我最近使用过的白板",
        });
    };
    if (KFK.explorerRefreshed === false) {
        KFK.refreshProjectList();
    }
    let prjs = KFK.APP.model.prjs;
    if (Array.isArray(prjs) === false) prjs = [];
    // if (prjs.length >= 3 && prjs[0].prjid === 'all' && userealprjs === true) {
    //   prjs.splice(0, 3);
    //   KFK.APP.setData("model", "prjs", prjs);
    // }
    // if (userealprjs === false && (prjs.length < 3 || prjs[0].prjid !== 'all')) {
    //   prjs.unshift({ _id: "mine", prjid: "mine", name: "我创建的所有项目中的白板", owner: "me" });
    //   prjs.unshift({ _id: "others", prjid: "others", name: "我参与过的别人共享的白板", owner: "me" });
    //   prjs.unshift({ _id: "all", prjid: "all", name: "我最近使用过的白板", owner: "me" });
    //   KFK.APP.setData("model", "prjs", prjs);
    // }

    if (msg && typeof msg === "string") {
        KFK.APP.setData("model", "prjwarning", msg);
    } else {
        KFK.APP.setData("model", "prjwarning", " ");
    }

    KFK.APP.setData("show", "form", {
        newdoc: false,
        newprj: false,
        prjlist: true,
        doclist: true,
        bottomlinks: true,
        explorerTabIndex: 0,
    });
    if (KFK.currentView === "designer") {
        KFK.currentView = "explorer";
        await KFK.showSection({
            explorer: true,
            designer: false
        });
    }
};

KFK.deleteMatItem = function (item, index, button) {
    const h = KFK.APP.$createElement;
    // Using HTML string
    const titleVNode = h("div", {
        domProps: {
            innerHTML: "确定要删除素材吗？"
        },
    });
    // More complex structure
    const messageVNode = h("div", {
        class: ["foobar"]
    }, [
        h("b-img", {
            props: {
                src: item.thumbnail,
                thumbnail: true,
                center: true,
                fluid: true,
            },
        }),
    ]);
    KFK.APP.$bvModal
        .msgBoxConfirm([messageVNode], {
            title: [titleVNode],
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "确认",
            cancelTitle: "取消",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
        })
        .then((isOkay) => {
            if (isOkay) {
                KFK.sendCmd("DELMAT", {
                    matid: item.matid
                });
                KFK.APP.model.mats.splice(index, 1);
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
};

KFK.deletePrjItem = function (item, index, button) {
    KFK.APP.$bvModal
        .msgBoxConfirm("删除项目: [" + item.name + "]", {
            title: "请确认删除",
            size: "md",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "确认",
            cancelTitle: "取消",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
        })
        .then((isOkay) => {
            if (isOkay) {
                KFK.deletePrj(item.prjid);
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
};

KFK.deleteDocItem = function (item, index, button) {
    KFK.APP.$bvModal
        .msgBoxConfirm("删除文档: [" + item.name + "]", {
            title: "请确认删除",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "确认",
            cancelTitle: "取消",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
        })
        .then((isOkay) => {
            if (isOkay) {
                KFK.deleteDoc(item._id);
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
};

KFK.sleep = async function (miliseconds) {
    await new Promise((resolve) => setTimeout(resolve, miliseconds));
};

KFK.toggleShowHelp = function () {
    KFK.APP.model.showInModalMiniHelp = !KFK.APP.model.showInModalMiniHelp;
};

KFK.createNewDoc = function () {
    let docName = KFK.APP.model.newdocname;
    let docPwd = KFK.APP.model.newdocpwd;
    KFK.APP.state.newdoc.name = Validator.validateDocName(docName);
    // KFK.APP.state.newdoc.pwd = Validator.validateDocPwd(docPwd);
    if (KFK.APP.state.newdoc.name) {
        KFK.sendCmd("NEWDOC", {
            prjid: KFK.APP.model.lastrealproject.prjid,
            name: docName,
            pwd: docPwd,
        });
    }
};
KFK.createNewPrj = function () {
    let prjName = KFK.APP.model.newprjname;
    if (Validator.validatePrjName(prjName)) {
        KFK.APP.state.newprj.name = true;
        KFK.sendCmd("NEWPRJ", {
            name: prjName
        });
    } else {
        KFK.APP.state.newprj.name = false;
    }
};
KFK.sayHello = function () {
    KFK.scrLog("hello, cocopad");
};

KFK.startActiveLogWatcher = function () {
    KFK.getActionLog();
    //自动刷新活动记录，但不是每次接收到有更新，就去服务器端刷新，
    //而是每五秒钟，检查收到的更新数量，如果五秒钟内有更新，updateReceived>0,
    //才调用KFK.getActionLog()去服务器端拉取
    setInterval(function () {
        if (KFK.updateReceived > 0) {
            KFK.updateReceived = 0;
            KFK.getActionLog();
        }
    }, 5000);
};

KFK.enterOrg = async function (_id) {
    await KFK.sendCmd("ENTERORG", {
        _id: _id
    });
};
KFK.deleteOrg = async function (aOrg, name) {
    if (aOrg.grade === "C") {
        KFK.scrLog("缺省组织不能删除");
        return;
    }
    KFK.APP.$bvModal
        .msgBoxConfirm("删除组织: [" + name + "]", {
            title: "请确认删除",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "确认",
            cancelTitle: "取消",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
        })
        .then(async (isOkay) => {
            if (isOkay) {
                await KFK.sendCmd("DELETEORG", {
                    _id: aOrg._id
                });
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
};

KFK.createNewOrg = async function () {
    let orgname = KFK.APP.model.org.neworg.name;
    if (Validator.validateOrgName(orgname)) {
        await KFK.sendCmd("NEWORG", {
            name: orgname
        });
    } else {
        KFK.scrLog("组织名称不符合要求");
    }
};
KFK.addOrgUser = async function (org_id, rowIndex) {
    let jInput = $("#inline-form-input-newuserid-" + rowIndex);
    let newuserid = jInput.val();
    if (Validator.validateUserId(newuserid)) {
        await KFK.sendCmd("ORGUSERADD", {
            _id: org_id,
            tobeadd_userid: newuserid
        });
    } else {
        KFK.scrLog("用户ID格式有误");
    }
};
KFK.changeOrgName = async function (org, rowIndex) {
    let jInput = $("#inline-form-input-changeorgname-" + rowIndex);
    let newName = jInput.val();
    if (Validator.validateOrgName(newName)) {
        await KFK.sendCmd("SETORGNAME", {
            orgid: org.orgid,
            name: newName,
            cocouser_orgid: KFK.APP.model.cocouser.orgid,
        });
    } else {
        KFK.scrLog("新名字不符合要求");
    }
};
KFK.deleteOrgUser = function (org, orguser, index, evt) {
    KFK.sendCmd("ORGUSERDEL", {
        _id: org._id,
        orgid: org.orgid,
        memberid: orguser.userid,
    });
};

KFK.toggleAccordionEnteredOrg = async function () {
    if (KFK.accordion["vorg"] === undefined || KFK.accordion["vorg"] === false) {
        KFK.accordion["vorg"] = true;
        await KFK.sendCmd("LISTVORG", {});
    } else {
        KFK.accordion["vorg"] = false;
    }
};

KFK.toggleAccordionMyOrg = async function () {
    if (
        KFK.accordion["myorg"] === undefined ||
        KFK.accordion["myorg"] === false
    ) {
        KFK.accordion["myorg"] = true;
        await KFK.sendCmd("LISTMYORG", {});
    } else {
        KFK.accordion["myorg"] = false;
    }
};

KFK.signout = async function () {
    KFK.stopVideoCall();
    await KFK.sendCmd("SIGNOUT", {
        userid: KFK.APP.model.cocouser.userid
    });
};

KFK.getProductUrl = function () {
    // return cocoConfig.product.url;
    return KFK.urlBase;
};
KFK.getInvitationUrl = function () {
    return KFK.getProductUrl() + "/?r=" + KFK.APP.model.cocouser.ivtcode;
};

KFK.updateCocouser = function (data) {
    let oldCocouser = KFK.APP.model.cocouser;
    let cocouser = $.extend({}, oldCocouser, data);
    if (cocouser.avatar === "avatar_temp" || cocouser.avatar === 'avatar-temp')
        cocouser.avatar = "avatar-0";
    cocouser.avatar_src = KFK.avatars[cocouser.avatar].src;
    localStorage.setItem("cocouser", JSON.stringify(cocouser));
    KFK.APP.setData("model", "cocouser", cocouser);
    KFK.cocouser = cocouser;
    KFK.debug("updateCocouser to ", cocouser.userid);
};
KFK.removeCocouser = function () {
    localStorage.removeItem("cocouser");
    KFK.APP.setData("model", "cocouser", {
        userid: "",
        name: "",
        avatar: "avatar-0",
        avatar_src: null,
    });
};
KFK.readLocalCocoUser = async function () {
    let cuinls = localStorage.getItem("cocouser");
    await KFK.sleep(10);
    let cocouser = JSON.parse(cuinls);
    if (cocouser && cocouser.sessionToken) {
        KFK.cocouser = cocouser;
        KFK.APP.setData("model", "cocouser", cocouser);
        //这个用于控制HTML显示，不能设置为null, 但又不方便使用，所以，再加上使用KFK.cocouser
    } else {
        KFK.cocouser = null;
    }
};
KFK.notImplemented = function () {
    KFK.debug("not implemented");
};
KFK.openDemoDoc = function () {
    KFK.log("Not implemented");
};

KFK.deletePrj = async function (prjid) {
    await KFK.sendCmd("DELPRJ", {
        prjid: prjid
    });
};

KFK.msgOK = async function () {
    await KFK.showSection({
        sigin: false,
        register: false,
        explorer: true,
        designer: false,
    });
    KFK.gotoDocs();
};

KFK.deleteDoc = async function (doc_id) {
    let payload = {
        doc_id: doc_id
    };
    await KFK.sendCmd("DELDOC", payload);
};

KFK.setDocReadonly = async function (doc) {
    KFK.sendCmd("TGLREAD", {
        doc_id: doc._id
    });
};

KFK.gotoLastRealProject = function () {
    if (NotBlank(KFK.APP.model.lastrealproject.prjid)) {
        // KFK.APP.docNavTabIndex = 3;
        KFK.gotoPrj(
            KFK.APP.model.lastrealproject.prjid,
            KFK.APP.model.lastrealproject.name
        );
    } else {
        KFK.APP.model.docs = [];
        KFK.scrLog("尚没有选定的项目", 1000);
    }
};

KFK.gotoPubs = async function () {
    sessionStorage.setItem('leftTabIndex', 2);
    await KFK.sendCmd("LISTPUB", {});
};
KFK.gotoSub = async function () {
    sessionStorage.setItem('leftTabIndex', 3);
    if (NotSet(KFK.subscription_Listed)) {
        await KFK.sendCmd("LISTSUB", {});
        KFK.subscription_Listed = true;
    }
};
KFK.refreshSub = async () => {
    sessionStorage.setItem('leftTabIndex', 3);
    await KFK.sendCmd("LISTSUB", {});
    KFK.subscription_Listed = true;
};
KFK.gotoMarket = async function () {
    sessionStorage.setItem('leftTabIndex', 4);
    let lastQ = localStorage.getItem('lastQ');
    if (NotSet(lastQ)) {
        lastQ = 'latest';
    }
    await KFK.sendCmd("SEARCHPUB", {
        q: lastQ
    });
};
KFK.gotoMarketSearch = async function () {
    let q = KFK.APP.goodsSearchQ;
    if (q.length > 0) {
        await KFK.sendCmd("SEARCHPUB", {
            q: q
        });
        localStorage.setItem('lastQ', q);
    } else {
        await KFK.sendCmd("SEARCHPUB", {
            q: 'latest'
        });
    }
};
KFK.gotoMarketLatest = async function () {
    await KFK.sendCmd("SEARCHPUB", {
        q: 'latest'
    });
};
KFK.gotoMarketMostSubscribed = async function () {
    await KFK.sendCmd("SEARCHPUB", {
        q: 'mostsub'
    });
};


KFK.gotoPrj = async function (prjid, name) {
    try {
        let cocoprj = {
            prjid: prjid,
            name: name
        };
        KFK.setCurrentPrj(cocoprj);
        await KFK.sendCmd("LISTDOC", {
            prjid: prjid
        });
        KFK.loadedProjectId = prjid;
        if (KFK.onPrjSelected) {
            //回调方法, 在选择了项目(gotoPrj)后,回调选择项目后的动作
            //用于选择项目做某件事
            KFK.onPrjSelected();
        } else {
            await KFK.mergeAppData("show", "form", {
                newdoc: false,
                newprj: false,
                prjlist: true,
                doclist: true,
                explorerTabIndex: 1,
            });
        }
    } catch (error) {
        console.error("gotoPrj found error", error.message);
    }
};
KFK.gotoRecent = function () {
    KFK.APP.docNavTabIndex = 2;
    KFK.gotoPrj("all", "最近访问的");
};
KFK.gotoDocs = async function () {
    sessionStorage.setItem('leftTabIndex', 1);
    if (KFK.loadedProjectId === null) {
        KFK.gotoRecent();
    }
};

KFK.pickPrjForCreateDoc = function () {
    KFK.onPrjSelected = KFK.showCreateNewDoc;
    KFK.gotoPrjList("在哪个项目中新建白板？", true);
};
KFK.prjRowClickHandler = function (record, index) {
    KFK.APP.docNavTabIndex = 3;
    KFK.gotoPrj(record.prjid, record.name);
};
KFK.matRowClickHandler = function (record, index) {
    console.log("show big image has not been implemented");
};
KFK.buy1 = (goods, index) => {
    KFK.APP.goodsToBuy = goods;
    KFK.showDialog({
        buy1Dialog: true
    });
};
KFK.buy2 = (goods, index) => {
    KFK.APP.goodsToBuy = goods;
    KFK.showDialog({
        buy2Dialog: true
    });
};
KFK.paidPlsCheck = (goods, buymode) => {
    //TODO: 接入微信支付
    KFK.sendCmd('BUY', {
        doc_id: goods._id,
        buymode: buymode
    });
    KFK.showDialog({
        buy1Dialog: false,
        buy2Dialog: false
    });
};
KFK.sendCmd = async function (cmd, payload = {}) {
    if (KFK.WS === null) {
        KFK.warn(
            "sendCmcd when KFK.WS is null. cmd is",
            cmd,
            "payload is",
            payload
        );
    } else await KFK.WS.put(cmd, payload);
};

KFK.docRowClickHandler = async function (doc, index) {
    if (KFK.getAclAccessable(doc)) {
        if (doc.pwd === "*********") {
            KFK.APP.setData("model", "opendocpwd", "");
            KFK.showDialog({
                inputDocPasswordDialog: true
            });
            KFK.tryToOpenDocId = doc._id;
        } else {
            await KFK.refreshDesignerWithDoc(doc._id, "");
        }
    } else {
        KFK.showNotAclAccessable();
    }
};

KFK.subsRowClickHandler = async function (sub, index) {
    await KFK.refreshDesignerWithDoc(sub._id, '', false, true);
};
KFK.openSubs = async function (sub) {
    await KFK.refreshDesignerWithDoc(sub._id, '', false, true);
}

KFK.modalShown = () => {
    KFK.isShowingModal = true;
    KFK.hideDIVsWithStatus(['.msgInputWindow', '#system_message', '#right', '#minimap']);
};
KFK.modalHidden = () => {
    KFK.isShowingModal = false;
    KFK.restoreDIVsWithStatus(['.msgInputWindow', '#system_message', '#right', '#minimap']);
};

//这个时候,在服务端
//client: checcksession , openSharedDoc -> server: this is a annoy user-> server: Annymouse User open doc->OpenANN to set local session to a temp user
//-> on client side got OPENANNY -> record temp uer -> checksession again
//-> openharedDoc again -> sever: is a temp uer, then OpenDoc -> ASKPWD? (yes)
//-> input passwd, then come to here
KFK.getDocPwd = async function () {
    KFK.APP.setData("model", "passwordinputok", "ok");
    await KFK.refreshDesignerWithDoc(KFK.tryToOpenDocId, KFK.APP.model.opendocpwd);
};
KFK.cancelDocPwd = function () {
    KFK.APP.setData("model", "passwordinputok", "cancel");
    KFK.gotoRecent();
};
KFK.onDocPwdHide = function (bvModalEvt) {
    //这个值初始为show,这样，不运行点对话框外部，把对话框隐藏起来
    if (KFK.APP.model.passwordinputok === "show") bvModalEvt.preventDefault();
};

KFK.showRechargeDialog = function () {
    KFK.showDialog({
        rechargeDialog: true
    });
};
KFK.showPriceListDialog = function () {
    KFK.showDialog({
        rechargeDialog: false,
        priceListDialog: true
    });
};
KFK.showResetPwdModal = function (item) {
    KFK.tryToResetPwdDoc = item;
    KFK.APP.setData("model", "docOldPwd", "");
    KFK.APP.setData("model", "docNewPwd", "");
    KFK.showDialog({
        resetDocPasswordDialog: true
    });
};

KFK.showRemovePwdModal = function (item, index, button) {
    KFK.tryToRemovePwdDoc = item;
    KFK.APP.setData("model", "inputUserPwd", "");
    KFK.showDialog({
        userPasswordDialog: true
    });
};

KFK.toggleFromResetToRemovePwd = function () {
    KFK.tryToRemovePwdDoc = KFK.tryToResetPwdDoc;
    KFK.APP.setData("model", "inputUserPwd", "");
    KFK.showDialog({
        resetDocPasswordDialog: false,
        userPasswordDialog: true
    });
};

KFK.removeDocPwd = function () {
    let payload = {
        doc_id: KFK.tryToRemovePwdDoc._id,
        userid: KFK.cocouser.userid,
        pwd: KFK.APP.model.inputUserPwd,
    };
    KFK.sendCmd("REMOVEPWD", payload);
};

KFK.resetDocPwd = function () {
    let payload = {
        doc_id: KFK.tryToResetPwdDoc._id,
        oldpwd: KFK.APP.model.docOldPwd ? KFK.APP.model.docOldPwd : "",
        newpwd: KFK.APP.model.docNewPwd ? KFK.APP.model.docNewPwd : "",
    };
    KFK.sendCmd("RESETPWD", payload);
};


KFK._onDocFullyLoaded = async function () {
    if (KFK.QUICKGLANCE) {
        KFK.APP.model.cocodoc.readonly = true;
        if (NotSet(KFK.qgIntervalId)) {
            let quickGlanceCountDown = cocoConfig.quickglance.timer;
            KFK.qgIntervalId = setInterval(() => {
                if (quickGlanceCountDown < 0) {
                    clearInterval(KFK.qgIntervalId);
                    KFK.gotoExplorer();
                    KFK.scrLog("返回市场");
                    KFK.cleanupJC3();
                    KFK.qgIntervalId = undefined;
                } else {
                    KFK.scrLog('快速预览倒计时' + quickGlanceCountDown);
                    quickGlanceCountDown = quickGlanceCountDown - 1;
                }
            }, 1000);
        }
    } else if (KFK.FORCEREADONLY) {
        KFK.APP.model.cocodoc.readonly = true;
    }
    KFK.show($("#docHeaderInfo"));
    KFK.docDuringLoading = null;
    // KFK.JC3.removeClass("noshow");
    KFK.APP.setData("model", "docLoaded", true);
    if (KFK.APP.model.cocodoc.readonly) {
        $("#linetransformer").draggable("disable");
        $("#right").toggle("slide", {
            duration: 100,
            direction: "right"
        });
        $("#left").toggle("slide", {
            duration: 100,
            direction: "left"
        });
        $("#top").toggle("slide", {
            duration: 100,
            direction: "left"
        });
    } else {
        $("#linetransformer").draggable("enable");
    }
    KFK.JC3.find(".kfknode").each((index, node) => {
        let jqNode = $(node);
        let str = jqNode.attr("linkto");
        let arr = KFK.stringToArray(str);
        let tmp1 = arr.length;
        arr = arr.filter((aId) => {
            return $(`#${aId}`).length > 0;
        });
        let tmp2 = arr.length;
        if (tmp1 !== tmp2) {
            if (tmp2 === 0) {
                jqNode.removeAttr("linkto");
            } else {
                jqNode.attr("linkto", arr.join(","));
            }
        }
        KFK.redrawLinkLines(jqNode, " after designer ready", false);
    });
    // KFK.info('ondocFullyLoaded, doc is', KFK.APP.model.cocodoc);
    KFK.C3.dispatchEvent(KFK.refreshC3event);
    KFK.myFadeOut($(".loading"));
    KFK.myFadeIn(KFK.JC3, 100);
    $("#overallbackground").removeClass("grid1");
    //focusOnC3会导致C3居中
    KFK.focusOnC3();
    KFK.setTodoItemEventHandler();
    //因此,这里再重新滚动一下.这样保证在文档新导入时,可以滚动到第一屏
    KFK.scrollToPos({
        x: KFK.LeftB,
        y: KFK.TopB
    });
    if (KFK.JC3.find(".kfknode").length === 0) {
        //YIQCooor要么是出black, 要么是white, 在style.css中放了color-dynamic-black和color-dynamic-white
        $(".showFirstTimeHelp").addClass(`color-dynamic-${KFK.YIQColor}`);
        KFK.setAppData("model", "firstTime", true);
        setTimeout(function () {
            KFK.setAppData("model", "firstTime", false);
        }, 3000);
    } else {
        KFK.setAppData("model", "firstTime", false);
    }
};

KFK.checkLoading = async function (num) { };

KFK.cleanupJC3 = async function () {
    await KFK.JC3.empty();
    KFK.addSvgLayer();
};

KFK.recreateFullDoc = async function (objects, callback) {
    KFK.cancelLoading = false;
    KFK.show($(".loading"));
    KFK.cleanupJC3();
    KFK.stopBrainstorm();
    for (let i = 0; i < objects.length; i++) {
        if (KFK.cancelLoading) {
            //也就是把之前正在loading的中断掉
            KFK.hide($(".loading"));
            KFK.cancelLoading = false;
            break;
        } else {
            if (KFK.currentView === "designer") {
                KFK.show($(".loading"));
            } else {
                KFK.hide($(".loading"));
            }
            await KFK.recreateObject(objects[i], callback);

            let progress = Math.round((i / objects.length) * 100);
            let strprogress = progress < 10 ? `0${progress}` : `${progress}`;
            if (progress % 5 === 0) {
                KFK.setAppData("model", "loading_value", strprogress);
                await KFK.sleep(5);
            }
        }
    }
    KFK.setAppData("model", "loading_value", "100");
    KFK._onDocFullyLoaded();
};

KFK.recreateObject = async function (obj, callback) {
    if (obj.etype === "document") {
        KFK.recreateDoc(obj, callback);
    } else if (obj.etype === "DIV") {
        await KFK.recreateNode(obj, callback);
    } else if (obj.etype === "SLINE") {
        await KFK.recreateShape(obj, callback);
    } else {
        KFK.error("Unknown etype, guess it");
        let tmpHtml = await KFK.gzippedContentToString(obj.content);
        KFK.detail(tmpHtml);
        if (
            tmpHtml.indexOf("nodetype") > 0 &&
            tmpHtml.indexOf("edittable") > 0 &&
            tmpHtml.indexOf("kfknode") > 0
        ) {
            obj.etype = "DIV";
            KFK.recreateNode(obj, callback);
        }
    }
};

KFK.recreateDoc = function (obj, callback) {
    try {
        KFK.firstShown['right'] = false;
        KFK.firstShown['chat'] = false;
        KFK.jumpStack = [];
        KFK.jumpStackPointer = -1;
        let docRet = obj.content;
        docRet.ownerAvatar_src = KFK.avatars[docRet.ownerAvatar].src;
        KFK.debug("recreateDoc()", docRet);
        KFK.APP.setData("model", "cocodoc", docRet);
        KFK.setAppData(
            "model",
            "readonlyDesc",
            docRet.readonlyReason === "OWNER" ?
                "只读: 白板发起人设置为只读" :
                docRet.readonlyReason.startsWith("BOSS") ?
                    "只读: 协作者人数超过组织设定的" +
                    docRet.readonlyReason.substr(4) +
                    "人" :
                    ""
        );
        if (docRet.bgcolor !== undefined) {
            KFK.setBGColorTo(docRet.bgcolor);
            $("#cocoBkgColor").spectrum("set", docRet.bgcolor);
        }
        localStorage.setItem("cocodoc", JSON.stringify(docRet));
    } catch (err) {
        console.error(err);
    } finally {
        if (callback) callback(1);
    }
};
KFK.recreateShape = async function (obj, callback) {
    try {
        let isALockedNode = obj.lock;
        let content = await KFK.gzippedContentToString(obj.content);
        let shape_id = obj.nodeid;
        let theShape = KFK.restoreShape(shape_id, content);
        if (isALockedNode) {
            KFK.NodeController.lockline(KFK, theShape);
        } else {
            KFK.NodeController.unlockline(KFK, theShape);
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (callback) callback(1);
    }
};

KFK.gzippedContentToString = async function (content) {
    if (content.type !== "Buffer" || content.data === undefined) {
        console.error(
            "gzippedContentToString was passed in wrong content",
            content
        );
    }
    let tmp = await ungzip(new Buffer(content.data));
    return tmp.toString("utf8");
};

KFK.recreateNode = async function (obj, callback) {
    if (
        KFK.quillEdittingNode &&
        KFK.quillEdittingNode.attr("id") === obj.nodeid
    ) {
        //如果我正在编辑，别人更新过来的不做处理
        // console.log("I am quilling, but other is changing it");
        return;
    }

    try {
        let isALockedNode = obj.lock;

        html = await KFK.gzippedContentToString(obj.content);
        // console.log('html = ', html);

        let jqDIV = $($.parseHTML(html));
        let nodeid = jqDIV.attr("id");

        if (jqDIV.hasClass("notify")) {
            //TODO: notification
        } else if (jqDIV.hasClass("ad")) {
            //TODO: Advertisement
        } else {
            //需要先清理，否则在替换已有node时，会导致无法resize
            KFK.cleanNodeEventFootprint(jqDIV);
            KFK.setNodeShowEditor(jqDIV);
            if ($(`#${nodeid}`).length > 0) {
                $(`#${nodeid}`).prop("outerHTML", jqDIV.prop("outerHTML"));
            } else {
                KFK.JC3.append(jqDIV);
            }
            jqDIV = $(`#${nodeid}`);
            if (KFK.APP.model.cocodoc.readonly === false) {
                await KFK.setNodeEventHandler(jqDIV, async function () {
                    if (isALockedNode) {
                        // KFK.debug('is a locked');
                        KFK.NodeController.lock(jqDIV);
                    }
                });
            }
            KFK.redrawLinkLines(jqDIV, "server update");
            //如果是todolist， 则需要设置里面的todoitem的eventhandler
            if (jqDIV.hasClass('todolist')) {
                KFK.setTodoItemEventHandler(jqDIV);
            }
        }
    } catch (error) {
        KFK.error(error);
    } finally {
        if (callback) callback(1);
        KFK.C3.dispatchEvent(KFK.refreshC3event);
    }
};

KFK.isTodoListDIV = function (jqDIV) {
    return (['coco_todo', 'coco_inprogress', 'coco_done'].indexOf(jqDIV.attr("id")) >= 0);
};
KFK.isTodoListOrChatListDIV = function (jqDIV) {
    return (['coco_chat', 'coco_todo', 'coco_inprogress', 'coco_done'].indexOf(jqDIV.attr("id")) >= 0);
};
KFK.isChatListDIV = function (jqDIV) {
    return 'coco_chat' === jqDIV.attr("id");
};

KFK.updateQuillingContent = async function (response) {
    try {
        let doc_id = response.doc_id;
        let nodeid = response.nodeid;
        if (doc_id !== KFK.APP.model.cocodoc.doc_id) {
            KFK.debug(
                "updateQuillingContent should not send to me,  I am in another doc"
            );
            return;
        }
        let jqInner = $(`#${nodeid} .innerobj`);
        if (jqInner.length > 0) {
            html = await KFK.gzippedContentToString(response.content);
            el(jqInner).innerHTML = html;
            let div = $(`#${nodeid}`);

            //quilling-by显示两秒
            if ($(".quilling-by").length === 0) {
                let jtmp = $(`<div class="quilling-by">${response.by}</div>`);
                jtmp.appendTo(div);
                setTimeout(function () {
                    jtmp.remove();
                }, 2000);
            }
        }
    } catch (error) {
        KFK.error(error);
    }
};
//从服务器收到D指令，
KFK.deleteObject_for_Response = function (obj) {
    try {
        if (obj.etype === "DIV") {
            let tobeDelete = $(`#${obj.nodeid}`);
            if (tobeDelete.length <= 0)
                KFK.debug(
                    "Server ask to delete",
                    obj.nodeid,
                    ", but it does not exist"
                );
            else KFK.deleteNode_exec(tobeDelete);
        } else if (obj.etype === "SLINE") {
            let selector = `.${obj.nodeid}`;
            try {
                KFK.svgDraw.findOne(selector).remove();
            } catch (error) {
                KFK.error(error);
            }
        }
    } finally {
        KFK.C3.dispatchEvent(KFK.refreshC3event);
    }
};

KFK.getLineOptions = function (div) {
    return JSON.parse(KFK.base64ToCode(div.attr("options")));
};
KFK.setLineOptions = function (div, options) {
    div.attr("options", KFK.codeToBase64(JSON.stringify(options)));
};
KFK.codeToBase64 = function (code) {
    return Buffer.from(code).toString("base64");
};
KFK.base64ToCode = function (base64) {
    return Buffer.from(base64, "base64").toString("utf-8");
};

KFK.getPropertyApplyToJqNode = function () {
    let ret = null;
    if (KFK.hoverJqDiv() !== null) {
        ret = KFK.hoverJqDiv();
    } else if (KFK.lastFocusOnJqNode != null) {
        ret = KFK.lastFocusOnJqNode;
    } else if (KFK.justCreatedJqNode != null) {
        ret = KFK.justCreatedJqNode;
    } else {
        ret = null;
    }
    // console.log('getProprtyApplyToJqNode ret', ret);
    return ret;
};

KFK.getPropertyApplyToJqNodeFocusedFirst = function () {
    let ret = null;
    if (KFK.lastFocusOnJqNode != null) {
        ret = KFK.lastFocusOnJqNode;
    } else if (KFK.hoverJqDiv() !== null) {
        ret = KFK.hoverJqDiv();
    } else if (KFK.justCreatedJqNode != null) {
        ret = KFK.justCreatedJqNode;
    } else {
        ret = null;
    }
    // console.log('getProprtyApplyToJqNode ret', ret);
    return ret;
};

KFK.getPropertyApplyToShape = function () {
    if (KFK.hoverSvgLine() != null) {
        return KFK.hoverSvgLine();
    } else if (KFK.pickedShape != null) {
        return KFK.pickedShape;
    } else if (KFK.justCreatedShape != null) {
        return KFK.justCreatedShape;
    } else {
        return null;
    }
};

KFK.setLineModel = function (options) {
    let setting = $.extend({}, KFK.APP.model.svg.connect.line, options);
    KFK.APP.setData("model", "line", setting);
};
KFK.changeBorderRadius = async function (radius) {
    await KFK.updateSelectedDIVs('', async function (jqNode) {
        jqNode.css("border-radius", radius);
    });
};
KFK.changeToTransparent = async function () {
    await KFK.updateSelectedDIVs('', async function (jqNode) {
        jqNode.css("background-color", "transparent");
        jqNode.css("border-color", "transparent");
    });
};
KFK.setWritingMode = async function (wmode) {
    await KFK.updateSelectedDIVs('', async function (jqNode) {
    jqNode.css("writing-mode", wmode);
    });
};
KFK.initViewByLocalConfig = async function () {
    try {
        let localViewConfigStr = localStorage.getItem('viewConfig');
        if (localViewConfigStr) {
            let viewConfig = JSON.parse(localViewConfigStr);
            //下面这个判断语句只是用于判断viewConfig是否合法
            if (viewConfig.showgrid !== undefined) {
                await KFK.mergeAppData('model.viewConfig', viewConfig);
                KFK.setShowBounding(viewConfig.showbounding);
            }
        }
    } catch (error) {
        KFK.error("load local viewConfig found error");
    }
};

KFK.changeShapeStyle = async () => {
    let theShape = KFK.getPropertyApplyToShape();
    if (theShape === null || KFK.anyLocked(theShape)) return;
    KFK.setShapeToRemember(theShape);
    let lineWidth = theShape.attr('stroke-width');
    if (KFK.APP.model.svg.line.style === 'solid')
        theShape.removeAttr('style');
    else {
        theShape.css('stroke-dasharray', `${lineWidth * 3} ${lineWidth}`);
    }

    await KFK.syncLinePut(
        "U",
        theShape,
        "set line color",
        KFK.shapeToRemember,
        false
    );
};

/**
 * 改变多个元素,
 * 先对所有选择的对象进行处理，如果没有选定对象，则使用当前的hover，selecte， justcreated对象
 *
 * @reason,  百变的原因备注
 * @callback   对每个元素做改变的callback function
 *
 * @return 选中的元素的个数
 */
KFK.updateSelectedDIVs = async function (reason, callback) {
    let divs = [];
    if (KFK.selectedDIVs.length > 0) {
        divs = KFK.selectedDIVs;
    } else {
        let jqNode = KFK.getPropertyApplyToJqNode();
        if (jqNode != null && KFK.notAnyLocked(jqNode)) {
            divs.push(jqNode);
        }
    }
    let changeSer = 0;
    let changeCount = KFK.getUnlockedCount(divs);
    for (let i = 0; i < divs.length; i++) {
        let jqDIV = divs[i];
        let jqOld = jqDIV.clone();
        if (KFK.anyLocked(jqDIV) === false) {
            await callback(jqDIV);
            await KFK.syncNodePut("U", jqDIV, reason, jqOld, false, changeSer, changeCount);
            changeSer = changeSer + 1;
        }
    }
    return divs.length;
};
KFK.initPropertyForm = function () {
    KFK.debug("...initPropertyForm");
    let spinnerFontSize = $("#spinner_font_size").spinner({
        min: 8,
        max: 100,
        step: 1,
        start: 18,
        spin: async function (evt, ui) {
            await KFK.updateSelectedDIVs('set font size', async function (jqNode) {
                await jqNode.find(".innerobj").css("font-size", KFK.px(ui.value));
            });
        },
    });
    spinnerFontSize.spinner("value", 18);
    $("#spinner_font_size").height("6px");
    let spinnerBorderWidth = $("#spinner_border_width").spinner({
        min: 0,
        max: 20,
        step: 1,
        start: 1,
        spin: async function (evt, ui) {
            await KFK.updateSelectedDIVs('set border width', async function (jqNode) {
                await jqNode.css("border-width", ui.value);
                await jqNode.css("border-style", "solid");
            });
        },
    });
    spinnerBorderWidth.spinner("value", 0);
    $("#spinner_border_width").height("6px");

    let spinnerBorderRadius = $("#spinner_border_radius").spinner({
        min: 0,
        max: 200,
        step: 1,
        start: 20,
        spin: async function (evt, ui) {
            await KFK.updateSelectedDIVs('set border width', async function (jqNode) {
                await jqNode.css("border-radius", ui.value);
            });
        },
    });
    spinnerBorderRadius.spinner("value", 20);
    $("#spinner_border_radius").height("6px");

    let spinnerLineWidth = $("#spinner_line_width").spinner({
        min: 1,
        max: 1000,
        step: 1,
        start: 1,
        spin: async function (evt, ui) {
            let theShape = KFK.getPropertyApplyToShape();
            if (theShape === null || KFK.anyLocked(theShape)) return;
            KFK.setShapeToRemember(theShape);
            KFK.setLineModel({
                width: ui.value
            });
            theShape.attr({
                "stroke-width": ui.value,
                "origin-width": ui.value,
            });
            await KFK.syncLinePut("U", theShape, "set line color", KFK.shapeToRemember, false);
        },
    });
    spinnerLineWidth.spinner("value", 1);
    $("#spinner_line_width").height("6px");

    $("input.fonts-selector")
        .fontpicker({
            lang: "zh-CN",
            variants: true,
            lazyload: true,
            nrRecents: 3,
            googleFonts: "Alegreya,Boogaloo,Coiny,Dosis,Emilys Candy,Faster One,Galindo".split(
                ","
            ),
            localFonts: {
                // Default: web safe fonts
                Arial: {
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                "Courier New": {
                    category: "monospace",
                    variants: "400,400i,600,600i,900,900i",
                },
                Georgia: {
                    category: "serif",
                    variants: "400,400i,600,600i,900,900i"
                },
                Tahoma: {
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                "Times New Roman": {
                    category: "serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                "Trebuchet MS": {
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                Verdana: {
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                SimSun: {
                    label: "宋体简",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                SimHei: {
                    label: "黑体简",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                "Microsoft Yahei": {
                    label: "微软雅黑",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                KaiTi: {
                    label: "楷体",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                FangSong: {
                    label: "仿宋",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                STHeiti: {
                    label: "黑体繁",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                "Hanzipen SC": {
                    label: "钢笔手写体",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                "Hannotate SC": {
                    label: "手札体",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                "Xingkai SC": {
                    label: "行楷",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
                "Yuanti SC": {
                    label: "圆体",
                    category: "sans-serif",
                    variants: "400,400i,600,600i,900,900i",
                },
            },
        })
        .on("change", async function () {
            // Split font into family and weight/style
            var fontInfo = $("input.fonts-selector").val().split(":"),
                family = fontInfo[0],
                variant = fontInfo[1] || "400",
                weight = parseInt(variant, 10),
                italic = /i$/.test(variant);

            // Set selected font on body
            var css = {
                fontFamily: "'" + family + "'",
                fontWeight: weight,
                fontStyle: italic ? "italic" : "normal",
            };

            //set font

            await KFK.updateSelectedDIVs('set font', async function (jqNode) {
                await jqNode.find(".innerobj").css(css);
            });
        });
    $("input.fonts-selector").height(12);

    KFK.debug("...initColorPicker");
    $("#cocoBkgColor").spectrum({
        color: "#f00",
        type: "color",
        hideAfterPaletteSelect: "true",
        chooseText: "选定",
        cancelText: "放弃",
        change: function (color) {
            //发起人可以设置所有人的bgcolor
            try {
                var hex = color.toHexString();
                if (KFK.APP.model.cocodoc.owner === KFK.APP.model.cocouser.userid)
                    KFK.sendCmd("SETBGCOLOR", {
                        doc_id: KFK.APP.model.cocodoc.doc_id,
                        bgcolor: hex,
                    });
                else {
                    //非发起人只能设置当前自己的
                    KFK.setBGColorTo(hex);
                }
            } catch (error) {
                console.error(error);
            }
        },
    });
    $("#shapeBkgColor").spectrum({
        color: "#f00",
        type: "color",
        hideAfterPaletteSelect: "true",
        chooseText: "选定",
        cancelText: "放弃",
        change: async function (color) {
            var hex = color.toHexString();
            KFK.APP.setData("model", "shapeBkgColor", hex);
            await KFK.updateSelectedDIVs('set border width', async function (jqNode) {
                await jqNode.css("background-color", hex);
            });
        },
    });
    $("#shapeBorderColor").spectrum({
        color: "#f00",
        type: "color",
        hideAfterPaletteSelect: "true",
        chooseText: "选定",
        cancelText: "放弃",
        change: async function (color) {
            var hex = color.toHexString();
            await KFK.updateSelectedDIVs('set border width', async function (jqNode) {
                await jqNode.css("border-color", hex);
            });
        },
    });
    $("#lineColor").spectrum({
        color: "#f00",
        type: "color",
        hideAfterPaletteSelect: "true",
        chooseText: "选定",
        cancelText: "放弃",
        change: async function (color) {
            var hex = color.toHexString();
            let theShape = KFK.getPropertyApplyToShape();
            if (theShape === null || KFK.anyLocked(theShape)) return;
            KFK.setShapeToRemember(theShape);
            theShape.attr("stroke", hex);
            KFK.setLineModel({
                color: hex
            });
            await KFK.syncLinePut("U", theShape, "set line color", KFK.shapeToRemember, false);
        },
    });
    $("#fontColor").spectrum({
        color: "#f00",
        type: "color",
        hideAfterPaletteSelect: "true",
        chooseText: "选定",
        cancelText: "放弃",
        change: async function (color) {
            var hex = color.toHexString();
            await KFK.updateSelectedDIVs('set border width', async function (jqNode) {
                await jqNode.find(".innerobj").css("color", hex);
            });
        },
    });
    $("#tipBkgColor").spectrum({
        color: "#f00",
        type: "color",
        hideAfterPaletteSelect: "true",
        chooseText: "选定",
        cancelText: "放弃",
        change: async function (color) {
            var hex = color.toHexString();
            KFK.APP.setData("model", "tipBkgColor", hex);
            await KFK.updateSelectedDIVs('set border width', async function (jqNode) {
                await KFK.setTipBkgColor(jqNode, hex);
            });
        },
    });
};

KFK.initShowEditors = function (show_editor) {
    KFK.APP.setData("model", "showEditor", show_editor);
    KFK.onShowEditorChanged(show_editor);
};

KFK.onShowEditorChanged = function (show_editor) {
    if (show_editor === "none") {
        $(document).find(".cocoeditors").css("display", "none");
        $(document).find(".lastcocoeditor").css("display", "none");
    } else if (show_editor === "last") {
        $(document).find(".cocoeditors").css("display", "none");
        $(document).find(".lastcocoeditor").css("display", "block");
    } else if (show_editor === "all") {
        $(document).find(".cocoeditors").css("display", "block");
        $(document).find(".lastcocoeditor").css("display", "none");
    }
};

KFK.setNodeShowEditor = function (jqNode) {
    let show_editor = KFK.APP.model.showEditor;
    if (show_editor === "none") {
        jqNode.find(".cocoeditors").css("display", "none");
        jqNode.find(".lastcocoeditor").css("display", "none");
    } else if (show_editor === "last") {
        jqNode.find(".cocoeditors").css("display", "none");
        jqNode.find(".lastcocoeditor").css("display", "block");
    } else if (show_editor === "all") {
        jqNode.find(".cocoeditors").css("display", "block");
        jqNode.find(".lastcocoeditor").css("display", "none");
    }
};

KFK.getContrastYIQ = function (hexcolor) {
    if (hexcolor.startsWith("#") && hexcolor.length === 7)
        hexcolor = hexcolor.substr(1);
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
};

/**
 * 设置背景色。
 * 该方法在三个地方调用：一是文档加载时，二是非owner用户设置自己的背景色时，三是owner用户设置颜色，服务器发回设置背景色指令时
 * 该方法同时会计算YIQColor和YIQColorAux， 并且根据bgcolor设置调用setGridColor
 */
KFK.setBGColorTo = function (bgcolor) {
    if (bgcolor.length > 7) console.warn("bgcolor ", bgcolor, "may not be hex");
    $("#containerbkg").css("background-color", bgcolor);
    $("#overallbackground").css("background-color", bgcolor);
    //YIQColor要么是black要么是white
    KFK.YIQColor = KFK.getContrastYIQ(bgcolor);
    //YIQColorAux是black或者white的近似色，用在连接线等元素上，因为纯色黑白太刺眼了
    KFK.YIQColorAux = KFK.YIQColor === "black" ? "#6666F6" : "#CCCCCC";

    $("#docHeaderInfo").removeClass("yiq-black");
    $("#docHeaderInfo").removeClass("yiq-white");
    $(".loading").removeClass("yiq-black");
    $(".loading").removeClass("yiq-white");
    $("#docHeaderInfo").addClass(`yiq-${KFK.YIQColor}`);
    $(".loading").addClass(`yiq-${KFK.YIQColor}`);
    $(".connect").attr("stroke", KFK.YIQColorAux);
    $(".triangle").attr("fill", KFK.YIQColorAux);

    if (KFK.APP.model.viewConfig.showgrid)
        KFK.setGridColor(bgcolor);
};

/**
 * 设置网格颜色，通过设置containerbkg的class为grid1/grid2来实现
 */
KFK.setGridColor = function (bgcolor) {
    if (!bgcolor) {
        bgcolor = $("#overallbackground").css("background-color");
    }
    if (KFK.YIQColor === "black") {
        $("#containerbkg").removeClass("grid1");
        $("#containerbkg").addClass("grid2");
        // console.log("Bgcolor is ", bgcolor, 'YIQColor is', KFK.YIQColor, 'grid is grid2');
    } else {
        $("#containerbkg").removeClass("grid2");
        $("#containerbkg").addClass("grid1");
        // console.log("Bgcolor is ", bgcolor, 'YIQColor is', KFK.YIQColor, 'grid is grid1');
    }
};


KFK.textAlignChanged = async function (evt, value) {
    let alignInfo = $("#textAlign").val();
    let divNum = await KFK.updateSelectedDIVs('', async function(jqNode) {
        let jqInner = jqNode.find('.innerobj');
        if (jqInner.length !== 0) {
            jqInner.css("justify-content", alignInfo);
            jqInner.css(
                    "text-align-last",
                    alignInfo === "flex-start" ?
                        "left" :
                        alignInfo === "flex-end" ?
                            "right" :
                            "center"
                );
            jqInner.css(
                    "text-align",
                    alignInfo === "flex-start" ?
                        "left" :
                        alignInfo === "flex-end" ?
                            "right" :
                            "center"
                );
        } else {
            jqNode.css("justify-content", alignInfo);
            jqNode.css(
                "text-align-last",
                alignInfo === "flex-start" ?
                    "left" :
                    alignInfo === "flex-end" ?
                        "right" :
                        "center"
            );
            jqNode.css(
                "text-align",
                alignInfo === "flex-start" ?
                    "left" :
                    alignInfo === "flex-end" ?
                        "right" :
                        "center"
            );
        }
    });
};
KFK.toggleCustomShape = function (evt) {
    if ($(".customcontrol").hasClass("btn_collapse")) {
        $(".customcontrol").removeClass("btn_collapse");
        $(".customcontrol").addClass("btn_expand");
        KFK.rememberWhich = [];
        if (KFK.APP.show.customshape === true) {
            KFK.APP.setData("show", "customshape", false);
            KFK.rememberWhich.push("customshape");
        }
        if (KFK.APP.show.customfont === true) {
            KFK.APP.setData("show", "customfont", false);
            KFK.rememberWhich.push("customfont");
        }
        if (KFK.APP.show.customline == true) {
            KFK.APP.setData("show", "customline", false);
            KFK.rememberWhich.push("customline");
        }
    } else {
        $(".customcontrol").removeClass("btn_expand");
        $(".customcontrol").addClass("btn_collapse");
        for (let i = 0; i < KFK.rememberWhich.length; i++) {
            KFK.APP.setData("show", KFK.rememberWhich[i], true);
        }
    }
};


KFK.vertAlignChanged = async function (evt, value) {
    let valignInfo = $("#vertAlign").val();
    let divNum = await KFK.updateSelectedDIVs('set border width', async function(jqNode) {
        if (jqNode.find(".innerobj").length !== 0) {
            jqNode.find(".innerobj").css("align-items", valignInfo);
        } else {
            jqNode.css("align-items", valignInfo);
        }
    });
};

KFK.setDrawMode = function (mode, event) {
    KFK.setMode('line');
    let jExpand = $('#lineExpand');
    jExpand.addClass('noshow');
    KFK.drawMode = mode;
    $('#tool_line').src = KFK.getFrontEndUrl('assets/' + mode + '.svg');
};
KFK.setMode = function (mode, event) {
    if (KFK.docIsReadOnly()) mode = "pointer";

    let shiftKey = event ? event.shiftKey : false;

    let oldMode = KFK.mode;
    KFK.mode = mode;
    for (let key in KFK.APP.toolActiveState) {
        KFK.APP.toolActiveState[key] = false;
    }
    if (KFK.APP.toolActiveState[mode] == undefined)
        console.warn(`APP.toolActiveState.${mode} does not exist`);
    else KFK.APP.toolActiveState[mode] = true;

    if (
        (oldMode === "line" && mode !== "line") ||
        (oldMode === "connect" && mode !== "connect")
    ) {
        KFK.cancelTempLine();
    }

    if (shiftKey) {
        if (KFK.mode === 'connect') {
            KFK.lockTool = true;
        } else {
            KFK.lockTool = false;
        }
    } else {
        KFK.lockTool = false;
    }

    if (KFK.mode !== 'material') {
        KFK.hidePickerMatlib();
    }
    if (KFK.mode === "pointer") {
        $("#modeIndicator").hide();
    } else {
        if (KFK.mode === "yellowtip") {
            KFK.setModeIndicatorForYellowTip(cocoConfig.node.yellowtip.defaultTip);
            $("#modeIndicatorImg").hide();
            $("#modeIndicatorDiv").show();
        } else {
            $("#modeIndicatorImg").attr("src", KFK.images[KFK.mode].src);
            $("#modeIndicatorImg").show();
            $("#modeIndicatorDiv").hide();
        }
        $("#modeIndicator").show();
    }

    if (KFK.mode === "text") {
        KFK.APP.setData("show", "shape_property", true);
        KFK.APP.setData("show", "customshape", false);
        KFK.APP.setData("show", "custombacksvg", false);
        KFK.APP.setData("show", "customfont", true);
        KFK.APP.setData("show", "layercontrol", true);
        KFK.APP.setData("show", "customline", false);
        // KFK.setRightTabIndex(0);
    } else if (KFK.mode === "textblock") {
        KFK.APP.setData("show", "shape_property", true);
        KFK.APP.setData("show", "customshape", true);
        KFK.APP.setData("show", "customfont", true);
        KFK.APP.setData("show", "custombacksvg", true);
        KFK.APP.setData("show", "layercontrol", true);
        KFK.APP.setData("show", "customline", false);
        // KFK.setRightTabIndex(0);
    } else if (KFK.mode === "yellowtip") {
        KFK.APP.setData("show", "shape_property", true);
        KFK.APP.setData("show", "customfont", true);
        KFK.APP.setData("show", "custombacksvg", true);
        KFK.APP.setData("show", "customshape", false);
        KFK.APP.setData("show", "layercontrol", true);
        KFK.APP.setData("show", "customline", false);
        // KFK.setRightTabIndex(0);
    } else if (KFK.mode === "line") {
        KFK.APP.setData("show", "shape_property", true);
        KFK.APP.setData("show", "customshape", false);
        KFK.APP.setData("show", "custombacksvg", false);
        KFK.APP.setData("show", "customfont", false);
        KFK.APP.setData("show", "layercontrol", false);
        KFK.APP.setData("show", "customline", true);
        // KFK.setRightTabIndex(0);
    } else if (KFK.mode === "material") {
        KFK.materialUpdated || KFK.loadMatLibForMyself();
        if (KFK.pickerMatlib.hasClass("noshow")) {
            KFK.showPickerMatlib();
        } else {
            KFK.hidePickerMatlib();
            KFK.setMode("pointer");
        }
    } else if (KFK.mode === "todo") {
        KFK.showTodo();
        KFK.setMode("pointer");
    } else if (KFK.mode === "chat") {
        KFK.showChat();
        KFK.setMode("pointer");
    } else if (KFK.mode === 'draw') {
        KFK.drawMode = 'polyline';
    }

    KFK.focusOnC3();
};

KFK.showPickerMatlib = function (matid, url) {
    KFK.pickerMatlib.removeClass("noshow");
};
KFK.hidePickerMatlib = function () {
    KFK.pickerMatlib.addClass("noshow");
    KFK.materialPicked = undefined;
};

KFK.pickMaterial = function (matid, url) {
    KFK.materialPicked = {
        matid: matid,
        url: url
    };
};

KFK.cleanAllNodes = function () {
    if (KFK.APP.model.cocodoc.owner !== KFK.APP.model.cocouser.userid) {
        KFK.scrLog('只有协作发起人可以使用白板擦');
        return;
    }
    KFK.APP.$bvModal
        .msgBoxConfirm(
            "请确认要清空白板, 其他协作用户的白板也会一起清除, 且本操作无法回退.", {
            title: "请确认",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "确认清除白板",
            cancelTitle: "放弃",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
        }
        )
        .then(async (isOkay) => {
            if (isOkay === true) {
                await KFK.sendCmd("CLEANUP", {
                    doc_id: KFK.APP.model.cocodoc.doc_id
                });
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
};
KFK.doCleanUp = async function () {
    await KFK.refreshDesignerWithDoc(KFK.APP.model.cocodoc.doc_id, "");
    KFK.scrLog("白板已被发起人擦除");
    KFK.stopBrainstorm();
    KFK.C3.dispatchEvent(KFK.refreshC3event);
};

KFK.toggleMinimap = async function () {
    for (let key in KFK.APP.toolActiveState) {
        KFK.APP.toolActiveState[key] = false;
    }
    KFK.APP.toolActiveState["minimap"] = true;
    await KFK.showSection({
        minimap: !KFK.APP.show.section.minimap
    });
    KFK.setMode("pointer");
    KFK.keypool = "";
};

KFK.toggleBrainstorm = function () {
    let jqNodeDIV = KFK.hoverJqDiv();
    if (NotSet(jqNodeDIV)) {
        jqNodeDIV = KFK.lastFocusOnJqNode;
    }
    if (NotSet(jqNodeDIV)) return;

    if (KFK.anyLocked(jqNodeDIV)) return;
    if (KFK.brainstormFocusNode === jqNodeDIV) {
        KFK.brainstormFocusNode = undefined;
        KFK.stopBrainstorm();
    } else {
        KFK.startBrainstorm(jqNodeDIV);
    }
};

KFK.stopBrainstorm = function () {
    KFK.brainstormMode = false;
    KFK.brainstormFocusNode = undefined;
    $(".brsnode").remove();
};

KFK.startBrainstorm = function (jqNode) {
    if (NotSet(jqNode)) return;
    KFK.brainstormFocusNode = jqNode;
    KFK.brainstormMode = true;
    $(".brsnode").remove();
    let jBrsNode = $("<div class='brsnode' style='z-index:-1'></div>");
    jBrsNode.appendTo(KFK.brainstormFocusNode);
};

//用在index.js中的boostrapevue
KFK.isActive = function (mode) {
    return KFK.mode === mode;
};

KFK.width = function (w) {
    if (w) {
        KFK._width = w;
        KFK.stage.width(w);
    }
    return KFK._width;
};
KFK.height = function (h) {
    if (h) {
        KFK._height = h;
        KFK.stage.height(h);
    }
    return KFK._height;
};

KFK.size = function (w, h) {
    KFK.width(w);
    KFK.height(h);
};
/**
 * 是否是一个kfknode
 * @param a node div
 */
KFK.isKfkNode = function (jqdiv) {
    return KFK.isA(jqdiv, "kfknode");
};
/**
 * 是否是一个有某个className的对象
 * @param jqdiv  要检查的对象
 * @param className 要检查的className
 * @return true，如果有这个className， false如果没有这个className
 */
KFK.isA = function (jqdiv, className) {
    return jqdiv && jqdiv.hasClass(className);
};
/**
 * 是否不是一个有某个className的对象
 * 跟 KFK.isA(jqdiv, className)相反
 * 
 * @param jqdiv  要检查的对象
 * @param className 要检查的className
 * @return true，如果没有这个className， false如果有这个className
 */
KFK.isNotA = function (jqdiv, className) {
    return !KFK.isA(jqdiv, className);
};
KFK.inDesigner = function () {
    return KFK.APP.show.section.designer;
};
KFK.holdEvent = function (evt) {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
};
KFK.addDocumentEventHandler = function () {
    if (IsSet(KFK.documentEventHandlerSet)) return;
    //document keydown
    $(document).keydown(async function (evt) {
        if (KFK.isShowingModal === true) return;
        if (KFK.onC3 === false) return;
        if (evt.keyCode === 16) KFK.KEYDOWN.shift = true;
        else if (evt.keyCode === 17) KFK.KEYDOWN.ctrl = true;
        else if (evt.keyCode === 18) KFK.KEYDOWN.alt = true;
        else if (evt.keyCode === 91) KFK.KEYDOWN.meta = true;
        //如果正处于编辑状态，则不做处理
        if (KFK.inDesigner() && KFK.isEditting) {
            return;
        }
        if (KFK.inDesigner()) {
            if (
                KFK.inPresentingMode &&
                KFK.presentMaskMode &&
                evt.keyCode !== 66 &&
                evt.keyCode != 87
            ) {
                KFK.presentNoneMask();
            }
            if (
                (evt.keyCode >= 48 && evt.keyCode <= 57) ||
                (evt.keyCode >= 65 && evt.keyCode <= 90) || evt.keyCode === 32
            ) {
                KFK.keypool += evt.key;
                // KFK.scrLog(KFK.keypool);
                KFK.keypool = KFK.keypool.toLowerCase();
                if (
                    KFK.keypool.endsWith("haola") ||
                    KFK.keypool.endsWith("hl") ||
                    KFK.keypool.endsWith("pr")
                ) {
                    if (KFK.inPresentingMode === false) KFK.startPresentation();
                    else KFK.endPresentation();
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("ctl")) { //Children to my left
                    await KFK.childrenToMySide('left');
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("ctr")) { //Children to right
                    await KFK.childrenToMySide('right');
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("ctb")) { //Children to my bottom
                    await KFK.childrenToMySide('bottom');
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("ctt")) { //Children to my top
                    await KFK.childrenToMySide('top');
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("td") || KFK.keypool.endsWith('todo')) {
                    KFK.keypool = "";
                    KFK.toggleInputFor("todo");
                    evt.stopPropagation();
                    evt.preventDefault();
                    await KFK.beginTodoMode();
                    return;
                } else if (KFK.keypool.endsWith("tt")) {
                    KFK.keypool = "";
                    await KFK.toggleControlButtonOnly();
                    return;
                } else if (KFK.keypool.endsWith("nn")) {
                    KFK.keypool = "";
                    await KFK.toggleNoControls();
                    return;
                } else if (KFK.keypool.endsWith("nh")) {
                    KFK.keypool = "";
                    await KFK.toggleNoDocHeader();
                    return;
                } else if (KFK.keypool.endsWith("tl")) {
                    KFK.keypool = "";
                    await KFK.toggleTopAndLeftOnly();
                    return;
                } else if (KFK.keypool.endsWith("1tr")) {
                    KFK.keypool = "";
                    await KFK.toggleRightPanel(0, true);
                    return;
                } else if (KFK.keypool.endsWith("2tr")) {
                    KFK.keypool = "";
                    await KFK.toggleRightPanel(1, true);
                    return;
                } else if (KFK.keypool.endsWith("3tr")) {
                    KFK.keypool = "";
                    await KFK.toggleRightPanel(2, true);
                    return;
                } else if (KFK.keypool.endsWith("tr")) {
                    KFK.keypool = "";
                    await KFK.toggleRightPanel(-1, false);
                    return;
                } else if (KFK.keypool.endsWith("jl")) { //jump to last created
                    await KFK.jumpToLastCreated(false);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("jr")) { //jump to last created
                    await KFK.jumpToBrain(false);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("rr")) { //link to brain
                    await KFK.linkToBrain(false);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("sc1")) { //link to brain
                    KFK.scale(1);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("sc5")) { //link to brain
                    KFK.scale(0.5);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("rl")) { //brain to last created
                    await KFK.jumpToLastCreated(true);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("jn")) { //jump to next focused
                    await KFK.jumpToNext(false);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("rn")) { //brain to next focused
                    await KFK.jumpToNext(true);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("jp")) { //jump to previous focused
                    await KFK.jumpToPrevious(false);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("rp")) { //bran to previous focused
                    await KFK.jumpToPrevious(true);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("fl")) {
                    await KFK.flushJumpStack(); // no take brain
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith('imp')) {
                    KFK.keypool = "";
                    KFK.showDialog({
                        importbr: true
                    });
                    return;
                } else if (KFK.keypool.endsWith("mm")) {
                    KFK.keypool = "";
                    await KFK.toggleMinimap();
                    return;
                } else if (KFK.keypool.endsWith("br")) {
                    KFK.toggleBrainstorm();
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("chat")) {
                    KFK.toggleInputFor("chat");
                    evt.stopPropagation();
                    evt.preventDefault();
                    KFK.beginChatMode();
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("logerror")) {
                    KFK.loglevel = KFK.LOGLEVEL_ERROR;
                    console.log('log level', KFK.loglevel);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("logwarn")) {
                    KFK.loglevel = KFK.LOGLEVEL_WARN;
                    console.log('log level', KFK.loglevel);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("loginfo")) {
                    KFK.loglevel = KFK.LOGLEVEL_INFO;
                    console.log('log level', KFK.loglevel);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("logdebug")) {
                    KFK.loglevel = KFK.LOGLEVEL_DEBUG;
                    console.log('log level', KFK.loglevel);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("logdetail")) {
                    KFK.loglevel = KFK.LOGLEVEL_DETAIL;
                    console.log('log level', KFK.loglevel);
                    KFK.keypool = "";
                    return;
                } else if (
                    KFK.keypool.endsWith('done') ||
                    KFK.keypool.endsWith('t90') ||
                    KFK.keypool.endsWith('t80') ||
                    KFK.keypool.endsWith('t70') ||
                    KFK.keypool.endsWith('t60') ||
                    KFK.keypool.endsWith('t50') ||
                    KFK.keypool.endsWith('t40') ||
                    KFK.keypool.endsWith('t30') ||
                    KFK.keypool.endsWith('t20') ||
                    KFK.keypool.endsWith('t10') ||
                    KFK.keypool.endsWith('start') ||
                    KFK.keypool.endsWith('t0')
                ) {
                    let progress = 0;
                    if (KFK.keypool.endsWith('done')) {
                        progress = 100;
                    } else if (KFK.keypool.endsWith('start')) {
                        progress = 1;
                    } else {
                        progress = parseInt(KFK.keypool.substr(1));
                    }
                    await KFK.moveTodoByProgress(progress);
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("fs")) {
                    KFK.toggleFullScreen();
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("ov")) {
                    if (KFK.inOverviewMode === true) {
                        KFK.toggleOverview(KFK.currentMousePos);
                    } else {
                        KFK.toggleOverview();
                    }
                } else if (KFK.inPresentingMode && KFK.keypool.endsWith("stop")) {
                    KFK.endPresentation();
                    KFK.keypool = "";
                    return;
                } else if (
                    KFK.keypool.endsWith("first") ||
                    KFK.keypool.endsWith("home")
                ) {
                    if (KFK.inPresentingMode) {
                        KFK.presentFirstPage();
                    } else {
                        KFK.gotoFirstPage();
                    }
                    KFK.keypool = "";
                    return;
                } else if (
                    KFK.keypool.endsWith("last") ||
                    KFK.keypool.endsWith("end")
                ) {
                    if (KFK.inPresentingMode) {
                        KFK.presentLastPage();
                    } else {
                        KFK.gotoLastPage();
                    }
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("prev")) {
                    if (KFK.inPresentingMode) {
                        KFK.presentPrevPage();
                    } else {
                        KFK.gotoPrevPage();
                    }
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("next")) {
                    if (KFK.inPresentingMode) {
                        KFK.presentNextPage();
                    } else {
                        KFK.gotoNextPage();
                    }
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.match(/([0-9]+)g$/)) {
                    let m = KFK.keypool.match(/([0-9]+)g$/);
                    let pindex = parseInt(m[1]) - 1;
                    pindex = Math.max(
                        0,
                        Math.min(pindex, KFK.pageBounding.Pages.length - 1)
                    );
                    if (KFK.inPresentingMode) {
                        KFK.presentAnyPage(pindex);
                    } else {
                        KFK.gotoAnyPage(pindex);
                    }
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.match(/([0-9]+)g$/)) {
                    let m = KFK.keypool.match(/([0-9]+)g$/);
                    let pindex = parseInt(m[1]) - 1;
                    pindex = Math.max(
                        0,
                        Math.min(pindex, KFK.pageBounding.Pages.length - 1)
                    );
                    if (KFK.inPresentingMode) {
                        KFK.presentAnyPage(pindex);
                    } else {
                        KFK.gotoAnyPage(pindex);
                    }
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith("zt")) {
                    KFK.ZiToTop();
                } else if (KFK.keypool.endsWith("zb")) {
                    KFK.ZiToBottom();
                } else if (KFK.keypool.endsWith("zh")) {
                    KFK.ZiToHigher();
                } else if (KFK.keypool.endsWith("zl")) {
                    KFK.ZiToLower();
                } else if (KFK.keypool.endsWith("lk") || KFK.keypool.endsWith("lock")) {
                    KFK.tryToLockUnlock();
                } else if (KFK.inPresentingMode && KFK.keypool.endsWith("b")) {
                    KFK.presentBlackMask();
                    KFK.keypool = "";
                    return;
                } else if (KFK.inPresentingMode && KFK.keypool.endsWith("w")) {
                    KFK.presentWhiteMask();
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.endsWith(" f") ||
                    KFK.keypool.endsWith(' v') ||
                    KFK.keypool.endsWith(' c') ||
                    KFK.keypool.endsWith(' x') ||
                    KFK.keypool.endsWith(' s') ||
                    KFK.keypool.endsWith(' w') ||
                    KFK.keypool.endsWith(' e') ||
                    KFK.keypool.endsWith(' r')
                ) {
                    KFK.placeFollowerNode(KFK.getPropertyApplyToJqNodeFocusedFirst(),
                        KFK.keypool.substr(-1));
                    KFK.keypool = "";
                    return;
                } else if (KFK.keypool.length > 10) {
                    KFK.keypool = KFK.keypool.substr(-9);
                }
            }
            if (KFK.inPresentingMode === true) {
                if (evt.keyCode === 33) {
                    //Page Up
                    KFK.presentPrevPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 34) {
                    //Page Down
                    KFK.presentNextPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 35) {
                    //End
                    KFK.presentLastPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 36) {
                    //Home
                    KFK.presentFirstPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 37) {
                    //Left
                    KFK.presentLeftPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 38) {
                    //Top
                    KFK.presentUpperPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 39) {
                    //Right
                    KFK.presentRightPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 40) {
                    //Down
                    KFK.presentLowerPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                // in presentation mode
            } else {
                // not in presentation mode
                if (evt.keyCode === 33) {
                    //Page Up
                    KFK.gotoPrevPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 34) {
                    //Page Down
                    KFK.gotoNextPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 35) {
                    //END
                    KFK.gotoLastPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 36) {
                    //HOME
                    KFK.gotoFirstPage();
                    evt.preventDefault();
                    evt.stopPropagation();
                } else if (evt.keyCode === 37) {
                    //Left
                    if (evt.shiftKey) {
                        let delta = evt.ctrlKey ? KFK.config.morph.delta * 3 : KFK.config.morph.delta;
                        KFK.DivStyler ? KFK.DivStyler.horiSizeSmaller(delta) :
                            import('./divStyler').then((pack) => {
                                KFK.DivStyler = pack.DivStyler;
                                KFK.DivStyler.horiSizeSmaller(delta);
                            });
                    }
                    // else KFK.gotoLeftPage();
                    KFK.holdEvent(evt);
                } else if (evt.keyCode === 38) {
                    //UP
                    if (evt.shiftKey) {
                        let delta = evt.ctrlKey ? KFK.config.morph.delta * 3 : KFK.config.morph.delta;
                        KFK.DivStyler ? KFK.DivStyler.vertSizeBigger(delta) :
                            import('./divStyler').then((pack) => {
                                KFK.DivStyler = pack.DivStyler;
                                KFK.DivStyler.vertSizeBigger(delta);
                            });
                    }
                    // else KFK.gotoUpperPage();
                    KFK.holdEvent(evt);
                } else if (evt.keyCode === 39) {
                    //Right
                    if (evt.shiftKey) {
                        let delta = evt.ctrlKey ? KFK.config.morph.delta * 3 : KFK.config.morph.delta;
                        KFK.DivStyler ? KFK.DivStyler.horiSizeBigger(delta) :
                            import('./divStyler').then((pack) => {
                                KFK.DivStyler = pack.DivStyler;
                                KFK.DivStyler.horiSizeBigger(delta);
                            });
                    }
                    // else KFK.gotoRightPage();
                    KFK.holdEvent(evt);
                } else if (evt.keyCode === 40) {
                    //Down
                    if (evt.shiftKey) {
                        let delta = evt.ctrlKey ? KFK.config.morph.delta * 3 : KFK.config.morph.delta;
                        KFK.DivStyler ? KFK.DivStyler.vertSizeSmaller(delta) :
                            import('./divStyler').then((pack) => {
                                KFK.DivStyler = pack.DivStyler;
                                KFK.DivStyler.vertSizeSmaller(delta);
                            });
                    }
                    // else KFK.gotoLowerPage();
                    KFK.holdEvent(evt);
                } else if (evt.keyCode === 32) { //space
                    //浏览器中按空格时，浏览器会滚动， 这里把它屏蔽掉
                    evt.preventDefault();
                    evt.stopPropagation();
                    //如果coco_chat显示着，就尝试把它隐藏，相应的，在space keyup时，再显示出来
                    $('.spaceToHide').stop();
                    $('.spaceToHide').animate({
                        opacity: 0
                    }, 500);

                } else if (evt.keyCode === 9) { //TAB
                    let jdiv = KFK.getHoverFocusLastCreate();
                    if (IsSet(jdiv)) {
                        if (evt.shiftKey) {
                            evt.stopPropagation();
                            evt.preventDefault();
                            let newdiv = await KFK.placeFollowerNode(jdiv, 's');
                            KFK.jumpToNode(newdiv);
                        } else {
                            evt.stopPropagation();
                            evt.preventDefault();
                            let newdiv = await KFK.placeFollowerNode(jdiv, 'f');
                            KFK.jumpToNode(newdiv);
                        }
                    }
                }
            } // not in presentation mode
        } // inDesigner

        // if (evt.keyCode === 69 && evt.shiftKey && (evt.ctrlKey || evt.metaKey)) {
        //     KFK.logKey("CTRL-SHIFT-E");
        //     if (KFK.inDesigner())
        //         //在Desinger中时，可切换到explorer
        //         KFK.gotoExplorer();
        //     else if (KFK.currentView === "explorer") KFK.gotoDesigner();
        //     //这里不能用 KFK.inDesigner===false来判断
        //     //因为即便不在designer中，如果designer没有被显示过，不能切换过去
        //     //因为不知道designer中显示什么，只有designer打开过一次后，才能切换过去
        //     //程序中， KFK.currentView的初始值为unknown, 当第一次显示designer后，
        //     //KFK.currentView的值变为designer, 切换回到explorer时，KFK.currentView的值是explorer
        //     //这时，用KFK.currentView === 'explorer'进行判断是可以的
        //     return
        // }

        if (KFK.inDesigner() === false) return;
        if (KFK.isEditting) return;
        switch (evt.keyCode) {
            case 13:
                //回车进入编辑 回车编辑
                if (evt.shiftKey) { //shift-enter shift enter
                    //如果按住了shift，则在其上下放置sibling
                    //如果有脑图中心节点
                    let theDIV = KFK.getFocusHoverLastCreate();
                    if (IsSet(theDIV) && theDIV.find('.brsnode').length < 1) {
                        let parents = KFK.getParent(theDIV);
                        if (parents.length > 0) {
                            let parent = parents[parents.length - 1];
                            //从cocoConfig中取得总向间隔
                            let divSpacing = cocoConfig.layout.spacing.vert;
                            //取得脑图中心节点的全部子节点
                            let children = KFK.getChildren(parent);
                            let myLeft = KFK.divLeft(theDIV);
                            let myWidth = KFK.divWidth(theDIV);
                            //过滤出来所有同侧节点
                            let sameSideChildren = children.filter((child) => {
                                let tmpLeft = KFK.divLeft(child);
                                if (Math.abs(myLeft - tmpLeft) < myWidth * 0.5) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            //根据在屏幕上的位置，从上向下
                            sameSideChildren.sort((a, b) => {
                                let aTop = KFK.divTop(a);
                                let bTop = KFK.divTop(b);
                                if (aTop < bTop) return -1;
                                else if (aTop > bTop) return 1;
                                else return 0;
                            });
                            let tmpHeight = 0;
                            let myIndex = -1;
                            //加入在这一侧的子节点所占的总高度
                            for (let i = 0; i < sameSideChildren.length; i++) {
                                tmpHeight += KFK.divHeight(sameSideChildren[i]);
                                if (sameSideChildren[i].attr("id") === theDIV.attr("id")) {
                                    myIndex = i;
                                    //为新节点空出位置，
                                    tmpHeight += KFK.divHeight(sameSideChildren[i]);
                                }
                            }
                            tmpHeight += (sameSideChildren.length) * divSpacing;
                            //脑图中心节点的中心高度
                            let brPosY = KFK.divMiddle(parent);
                            let accumulatedHeight = 0;
                            //移动所有已存在节点
                            for (let i = 0; i < sameSideChildren.length; i++) {
                                let newY = brPosY - tmpHeight * 0.5 + accumulatedHeight;
                                let old = sameSideChildren[i].clone();
                                sameSideChildren[i].css("top", newY);
                                accumulatedHeight += KFK.divHeight(sameSideChildren[i]) + divSpacing;
                                if (i === myIndex) {
                                    accumulatedHeight += KFK.divHeight(sameSideChildren[i]) + divSpacing;
                                }
                                //作为父节点，可连接左右中点，其子节点可连接打开左右中点；
                                //作为子节点，父节点可任意中点，但自身只能连接到左右中点；
                                KFK.redrawLinkLines(sameSideChildren[i], 'move', true, [
                                    [0, 2],
                                    [0, 2],
                                    [0, 1, 2, 3],
                                    [0, 2]
                                ]);
                                KFK.syncNodePut("U", sameSideChildren[i].clone(), "new child", old, false, i, sameSideChildren.length);
                            }
                            //插入新节点
                            let newNode = await KFK.placeNode(false, KFK.myuid, theDIV.attr("nodetype"), "default",
                                KFK.divCenter(sameSideChildren[myIndex]),
                                KFK.divMiddle(sameSideChildren[myIndex]) + divSpacing + KFK.divHeight(sameSideChildren[myIndex]),
                                KFK.divWidth(sameSideChildren[myIndex]),
                                KFK.divHeight(sameSideChildren[myIndex]),
                                "", "");

                            if (KFK.hasConnection(parent, newNode) === false) {
                                let tmp = parent.clone();
                                KFK.drawPathBetween(parent, newNode);
                                KFK.buildConnectionBetween(parent, newNode);
                                await KFK.syncNodePut("U", parent.clone(), "new child", tmp, false, 0, 1);
                            }
                            KFK.redrawLinkLines(newNode, 'shiftreturn', true, [
                                [0, 2],
                                [0, 2],
                                [0, 1, 2, 3],
                                [0, 2]
                            ]);
                            await KFK.syncNodePut("C", newNode, "new node", null, false, 0, 1);
                            KFK.jumpToNode(newNode);
                        } //parents.lenth > 0
                    } //IsSet (theDIV)
                    //evt.shiftKey === true;
                } else {
                    KFK.editFocusedThenHoveredObject(evt, true);
                }
                break;
            case 27: //ESC
                if (KFK.inFullScreenMode === true) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    KFK.toggleFullScreen();
                    KFK.inFullScreenMode = false;
                } else if (KFK.inPresentingMode === true) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    KFK.presentNoneMask();
                    KFK.endPresentation();
                }

                KFK.cancelAlreadySelected();
                if (!KFK.isEditting && KFK.mode !== "line") KFK.setMode("pointer");
                KFK.cancelTempLine();
                KFK.setMode("pointer");
                KFK.hidePickerMatlib();
                break;
            case 90:
                //不要移动META-Z代码，一定要在document的key-down里面，
                //否则，在其他地方没有用。这个问题花了我三个小时时间，FX
                if ((evt.metaKey || evt.ctrlKey) && evt.shiftKey) {
                    KFK.logKey("META-SHIFT-Z");
                    KFK.redo();
                }
                if ((evt.metaKey || evt.ctrlKey) && !evt.shiftKey) {
                    KFK.logKey("META-Z");
                    KFK.undo();
                }
                break;
            case 69: //E
            case 76: //L
            case 82: //R
            case 66: // key B
            case 73: //key I
                if (([69, 76, 82].indexOf(evt.keyCode) >= 0 && evt.metaKey && evt.ctrlKey) ||
                    ([66, 73].indexOf(evt.keyCode) >= 0 && (evt.metaKey || evt.ctrlKey))) {
                    KFK.holdEvent(evt);
                    KFK.DivStyler ? KFK.DivStyler.alignItem(evt.keyCode) :
                        import('./divStyler').then((pack) => {
                            KFK.DivStyler = pack.DivStyler;
                            KFK.DivStyler.alignItem(evt.keyCode);
                        });
                }
                break;
            case 8: //Backspace
            case 46: //Delete
                KFK.deleteHoverOrSelectedDiv(evt, false);
                break;
            case 48: //key 0
                if (evt.ctrlKey || evt.metaKey) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    KFK.zoomInOut('100%');
                }
                break;
            case 49: //key 1
                if (evt.ctrlKey || evt.metaKey) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    KFK.zoomInOut('page');
                }
                break;
            case 187: //key =
                if (evt.ctrlKey || evt.metaKey) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    KFK.zoomInOut('zoomin');
                }
                break;
            case 189: //key -
                if (evt.ctrlKey || evt.metaKey) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    KFK.zoomInOut('zoomout');
                }
                break;
            case 67: //Ctrl-Shift-C
                if (evt.ctrlKey && evt.shiftKey) {
                    KFK.holdEvent(evt);
                    KFK.DivStyler ? KFK.DivStyler.copyStyle() :
                        import('./divStyler').then((pack) => {
                            KFK.DivStyler = pack.DivStyler;
                            KFK.DivStyler.copyStyle();
                        });
                }
                break;
            case 86: //Ctrl-Shift-V
                if (evt.ctrlKey && evt.shiftKey) {
                    KFK.holdEvent(evt);
                    KFK.DivStyler ? KFK.DivStyler.pasteStyle() :
                        import('./divStyler').then((pack) => {
                            KFK.DivStyler = pack.DivStyler;
                            KFK.DivStyler.pasteStyle();
                        });
                }
                break;
            case 219: //Ctrl-[
                if (evt.shiftKey || evt.ctrlKey) {
                    KFK.holdEvent(evt);
                    KFK.DivStyler ? KFK.DivStyler.fontSmaller() :
                        import('./divStyler').then((pack) => {
                            KFK.DivStyler = pack.DivStyler;
                            KFK.DivStyler.fontSmaller();
                        });
                }
                break;
            case 221: //Ctrl-]
                if (evt.shiftKey || evt.ctrlKey) {
                    KFK.holdEvent(evt);
                    KFK.DivStyler ? KFK.DivStyler.fontBigger() :
                        import('./divStyler').then((pack) => {
                            KFK.DivStyler = pack.DivStyler;
                            KFK.DivStyler.fontBigger();
                        });
                }
                break;
            default:
                preventDefault = false;
        }
    });
    $(document).keyup(function (evt) {
        switch (evt.keyCode) {
            case 16:
                KFK.KEYDOWN.shift = false;
                break;
            case 17:
                KFK.KEYDOWN.ctrl = false;
                KFK.stopZoomShape();
                break;
            case 18:
                KFK.KEYDOWN.alt = false;
                break;
            case 91:
                KFK.KEYDOWN.meta = false;
                KFK.stopZoomShape();
                break;
            case 32:
                //如果coco_chat显示着，就尝试把它隐藏，相应的，在space keyup时，再显示出来
                $('.spaceToHide').stop();
                $('.spaceToHide').animate({
                    opacity: 1
                }, 500);
                break;
            default:
                break;
        }
    });

    //标记框选开始，是在JC3的mousedown中做记录的
    //标记框选结束，也是在JC3的mouseup中做记录的
    //但mousemove需要在document的mousemove事件处理中进行处理。
    //因为，如果不这样做，滑动鼠标出现选择框后，如果鼠标回到选择框内，则JC3抓不到mousemove事件
    //导致的现象就是选择框只可以放大，不可以缩小
    $(document).on("mousemove", function (evt) {
        if (KFK.inDesigner() === false) return;
        KFK.globalMouseX = evt.clientX;
        KFK.globalMouseY = evt.clientY;
        if (KFK.inPresentingMode || KFK.inOverviewMode) return;
        let tmp = {
            x: KFK.scrXToJc3X(evt.clientX),
            y: KFK.scrYToJc3Y(evt.clientY),
        };
        if (KFK.isDuringKuangXuan()) {
            KFK.kuangXuan(KFK.kuangXuanStartPoint, tmp);
        } else if (KFK.isZoomingShape) {
            KFK.zoomShape(evt);
        }
    });
    $(document).on("mousedown", function (evt) {
        if (KFK.inDesigner() === false) return;
        if (KFK.mode === "pointer" && KFK.docIsReadOnly() === false) {
            KFK.kuangXuanMouseIsDown = true;
            KFK.kuangXuanStartPoint = {
                x: KFK.scrXToJc3X(evt.clientX),
                y: KFK.scrYToJc3Y(evt.clientY),
            };
        }
    });
    $(document).on("mouseup", async function (evt) {
        if (KFK.inDesigner() === false) return;
        if (KFK.mode === "pointer" && KFK.docIsReadOnly() === false) {
            KFK.kuangXuanMouseIsDown = false;
            KFK.kuangXuanEndPoint = {
                x: KFK.scrXToJc3X(evt.clientX),
                y: KFK.scrYToJc3Y(evt.clientY),
            };
            if (KFK.duringKuangXuan) {
                KFK.ignoreClick = true;
                KFK.endKuangXuan(KFK.kuangXuanStartPoint, KFK.kuangXuanEndPoint, evt.shfitKey);
                KFK.duringKuangXuan = false;
            }
        }
        //线条点下去以后，shapeToDrag就设置好了
        //移动距离大于5时，才会设置shapeDragging=true
        //如果在距离小于5内，抬起鼠标，此时，shapeDragging还是false,此时，应该把shapeToDrag置为null
        if (KFK.shapeDragging === false && KFK.shapeToDrag) {
            KFK.shapeToDrag = null;
        }
        if (KFK.shapeDragging && KFK.docIsReadOnly() === false) {
            let realX = KFK.scalePoint(KFK.scrXToJc3X(evt.clientX));
            let realY = KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY));
            let pt = {
                x: realX,
                y: realY
            };
            if (KFK.APP.model.viewConfig.snap) {
                let pt = KFK.getNearGridPoint(realX, realY);
            }
            let deltaX = pt.x - KFK.shapeDraggingStartPoint.x;
            let deltaY = pt.y - KFK.shapeDraggingStartPoint.y;
            KFK.shapeToDrag.dmove(deltaX, deltaY);
            KFK.shapeToDrag.attr({
                "stroke-width": KFK.shapeToDrag.attr("origin-width"),
            });
            KFK.shapeToRemember.attr({
                "stroke-width": KFK.shapeToRemember.attr("origin-width"),
            });
            await KFK.syncLinePut(
                "U",
                KFK.shapeToDrag,
                "move",
                KFK.shapeToRemember,
                false
            );
            KFK.setShapeToRemember(KFK.shapeToDrag);
            KFK.shapeDragging = false;
            KFK.shapeToDrag = null;
            $(document.body).css("cursor", "default");
        }
    });

    let timer = null;
    // onscroll onScroll on scroll on Scroll
    $("#S1").scroll(() => {
        if (KFK.inDesigner() === false) return;
        /*
           let sx = $("#S1").scrollLeft();
           let sy = $("#S1").scrollTop();
           if (KFK.scrollBugPatched === false) {
           KFK.scrollContainer = $("#S1");
           KFK.scrollBugPatched = true;
           }
        // $("#linetransformer").css("visibility", "hidden");
        if (timer === null) {
        timer = setTimeout(() => {
        let pt = KFK.getNearGridPoint(
        KFK.scrollContainer.scrollLeft(),
        KFK.scrollContainer.scrollTop()
        );
        let deltaX = pt.x - KFK.scrollContainer.scrollLeft();
        let deltaY = pt.y - KFK.scrollContainer.scrollTop();
        KFK.JCBKG.css('background-position-x', deltaX);
        KFK.JCBKG.css('background-position-y', deltaY);
        timer = null;
        }, 500);
        }
        */
    });

    KFK.documentEventHandlerSet = true;
};

KFK.executeFunctionByName = function (functionName, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
};


KFK.toggleTodoMode = async function () {
    KFK.jInputMsgDlg || (KFK.jInputMsgDlg = $('.msgInputWindow'));
    if (KFK.jInputMsgDlg.hasClass('noshow')) {
        KFK.beginTodoMode();
    } else {
        KFK.stopTodoMode();
    }
};

KFK.beginTodoMode = async function () {
    KFK.toggleInputFor("todo");
    KFK.APP.inputMsg = "";
    await KFK.showMsgInputDlg();
    if ($('.coco_todo').length > 0) {
        KFK.scrollToNodeById('coco_todo');
    }
};

KFK.stopTodoMode = function () {
    KFK.toggleInputFor(undefined);
    KFK.hideMsgInputDlg();
};
KFK.stopChatMode = function () {
    KFK.toggleInputFor(undefined);
    KFK.hideMsgInputDlg();
};
KFK.closeInput = () => {
    KFK.toggleInputFor(undefined);
    KFK.hideMsgInputDlg();
};
/**
 * Hide the input dlg, and record its status
 */
KFK.hideDIVsWithStatus = (jqs) => {
    if (Array.isArray(jqs) === false) jqs = [jqs];
    for (let i = 0; i < jqs.length; i++) {
        let jq = jqs[i];
        let divId = '';
        if (typeof jq === 'string') {
            divId = jq;
            jq = $(jq);
        } else {
            divId = jq.attr("id");
        }
        if (KFK.isShowing(jq)) {
            KFK.hide(jq);
            KFK.showStatus[divId] = 'show';
        } else {
            KFK.showStatus[divId] = 'hide';
        }
    }
};
/**
 * Restore input dlg show status, show only when it was shown before
 */
KFK.restoreDIVsWithStatus = (jqs) => {
    if (Array.isArray(jqs) === false) jqs = [jqs];
    for (let i = 0; i < jqs.length; i++) {
        let jq = jqs[i];
        let divId = '';
        if (typeof jq === 'string') {
            divId = jq;
            jq = $(jq);
        } else {
            divId = jq.attr("id");
        }
        if (KFK.showStatus[divId] !== undefined) {
            if (KFK.showStatus[divId] === 'show') {
                KFK.show(jq);
            }
            delete KFK.showStatus[divId];
        }
    }
};
/**
 * Toggle msg input dlg status
 * If not show, show it; or hide it otherwise
 */
KFK.toggleInputMsgDlg = () => {
    KFK.jInputMsgDlg || (KFK.jInputMsgDlg = $('.msgInputWindow'));
    if (KFK.isShowing(KFK.jInputMsgDlg)) {
        KFK.hide(KFK.jInputMsgDlg);
    } else {
        KFK.show(KFK.jInputMsgDlg);
    }
};
/**
 * Just hide the msg input dialog, nothing else
 */
KFK.hideMsgInputDlg = function () {
    KFK.jInputMsgDlg || (KFK.jInputMsgDlg = $('.msgInputWindow'));
    KFK.hide(KFK.jInputMsgDlg);
};

KFK.getTodoDivIdByItem = function (jItem) {
    let parent = jItem.parent();
    let parentId = "";
    if (parent.attr("id") === "coco_todo_list") {
        parentId = "coco_todo";
    } else if (parent.attr("id") === "coco_inprogress_list") {
        parentId = "coco_inprogress";
    } else if (parent.attr("id") === "coco_done_list") {
        parentId = "coco_done";
    }
    return parentId;
};

KFK.deleteTodo = async function () {
    let fromDIVId = KFK.getTodoDivIdByItem(KFK.selectedTodo);
    let fromDIV = $('#' + fromDIVId);
    KFK.selectedTodo.remove();
    KFK.selectedTodo = undefined;
    KFK.closeTodoOption();
    await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
};

/**
 * Show the message input dialog
 * @param autofocus Focus in the text input, default is true
 */
KFK.showMsgInputDlg = async function (autofocus = true) {
    KFK.jInputMsgDlg || (KFK.jInputMsgDlg = $('.msgInputWindow'));
    KFK.show(KFK.jInputMsgDlg);
    await KFK.jInputMsgDlg.find('input').focus();
};

KFK.modifyTodo = async function (evt) {
    KFK.closeTodoOption();
    KFK.toggleInputFor("todo");
    await KFK.showMsgInputDlg();
    KFK.APP.inputMsg = KFK.selectedTodo.find('.todolabel').text();
    KFK.modifyTodoText = true;
};

KFK.onNormalInput = async function (evt) {
    evt.stopPropagation();
};

/**
 * 检测TODO inut框的键盘输入
 * 
 */
KFK.onMsgInput = async function (evt) {
    evt.stopPropagation();
    KFK.noCopyPaste = true;
    if (evt.keyCode === 27) { //ESC
        KFK.noCopyPaste = false;
        if (KFK.inputFor === 'todo')
            KFK.stopTodoMode();
        else if (KFK.inputFor === 'chat')
            KFK.stopChatMode();
        return;
    } else if (evt.keyCode === 13) {
        if (KFK.APP.inputMsg === 'todo') {
            KFK.toggleInputFor('todo');
            KFK.APP.inputMsg = "";
            return;
        } else if (KFK.APP.inputMsg === 'chat') {
            KFK.toggleInputFor('chat');
            KFK.APP.inputMsg = "";
            return;
        }
        if (KFK.inputFor === 'todo') {
            if (IsSet(KFK.modifyTodoText)) {
                if (KFK.APP.inputMsg.trim().length > 0) {
                    KFK.selectedTodo.find('.todolabel').text(KFK.APP.inputMsg.trim());
                    let fromDIVId = KFK.getTodoDivIdByItem(KFK.selectedTodo);
                    let fromDIV = $('#' + fromDIVId);
                    await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
                }
                KFK.modifyTodoText = undefined;
                KFK.selectedTodo = undefined;
                KFK.APP.inputMsg = "";
            } else {
                let jqCocoTodo = $('#coco_todo');
                if (jqCocoTodo.length < 1) {
                    jqCocoTodo = await KFK.placeNode(
                        false,
                        "coco_todo",
                        "textblock", 'default',
                        150, -480, 400, 400,

                        "<div id='coco_todo_title' class='coco_title'>待办事项</div>" +
                        "<div id='coco_todo_list' class='coco_list original'>" +
                        "<div class='todo_item' prg='0' id='" + KFK.myuid() + "'><div class='todolabel'>" + KFK.APP.inputMsg + "</div><div class='prg'></div></div>" +
                        "</div>",

                        '',
                    );
                    jqCocoTodo.addClass("todolist noedit");
                    jqCocoTodo.find('.innerobj').css({
                        "justify-content": 'flex-start',
                        "align-items": 'flex-start'
                    });
                    KFK.APP.inputMsg = '';
                    await KFK.syncNodePut("C", jqCocoTodo, "todo", null, false, 0, 1);
                    KFK.setTodoItemEventHandler(jqCocoTodo);
                    KFK.scrollToNodeById('coco_todo');
                } else {
                    if (KFK.APP.inputMsg.trim().length > 0) {
                        await KFK.addTodoItem(KFK.APP.inputMsg);
                    }
                }
            }
        } else if (KFK.inputFor === 'chat') {
            //new chat window new chat dialog show chat
            if (KFK.APP.inputMsg.trim().length > 0) {
                await KFK.ISayChatItem(KFK.APP.inputMsg);
            }
        }
    }
};

KFK.saveDIVPosition = async (key, x, y, w, h) => {
    localStorage.setItem(key, JSON.stringify({
        x: x,
        y: y,
        w: w,
        h: h
    }));
};
KFK.saveVideoRoomPosition = async (x, y, w, h) => {
    localStorage.setItem("cocovideoroom", JSON.stringify({
        x: x,
        y: y,
        w: w,
        h: h
    }));
};

KFK.loadDIVPositon = async (key, selector) => {
    let tmp = localStorage.getItem(key);
    if (IsSet(tmp)) {
        let cocoChatPos = JSON.parse(tmp);
        $(selector).css({
            'left': cocoChatPos.x,
            'top': cocoChatPos.y,
            'width': cocoChatPos.w,
            'height': cocoChatPos.h
        });
    }
};

KFK.toggleInputFor = function (inputFor) {
    KFK.inputFor = inputFor;
    switch (inputFor) {
        case "chat":
            KFK.APP.inputMsgIcon = "chat-dots-fill";
            break;
        case "todo":
            KFK.APP.inputMsgIcon = "kanban-fill";
            break;
        default:
            KFK.APP.inputMsgIcon = "arrow-return-left";
            break;
    }
};

KFK.beginChatMode = async function () {
    KFK.toggleInputFor("chat");
    KFK.APP.inputMsg = "";
    await KFK.showMsgInputDlg();
};

KFK.setTodoItemEventHandler = function (jqDIV = undefined) {
    let theItem = null;
    if (jqDIV) theItem = jqDIV.find('.todo_item');
    else theItem = $('.todo_item');
    theItem.on("click", function (evt) {
        evt.stopPropagation();
        KFK.hoveredTodo = $(this);
        let x = KFK.scrXToJc1X(evt.clientX) + 30;
        let y = KFK.scrYToJc1Y(evt.clientY) + 5;
        $('#todo_option').css("left", KFK.px(x));
        $('#todo_option').css("top", KFK.px(y));
        KFK.show($('#todo_option'));
        $('.todo_item.current').removeClass('current');
        KFK.selectedTodo = $(this);
        $(this).addClass("current");
    });
    theItem.on("mouseover", function () {
        KFK.hoveredTodo = $(this);
        KFK.AI('hover_todoitem');
    })
};

KFK.setChatItemEventHandler = function (theItem) {
    theItem.on("click", function (evt) {
        evt.stopPropagation();
        KFK.hoveredChatItem = $(this);
        let x = KFK.scrXToJc1X(evt.clientX) + 30;
        let y = KFK.scrYToJc1Y(evt.clientY) + 5;
        $('#chatitem_option').css("left", KFK.px(x));
        $('#chatitem_option').css("top", KFK.px(y));
        KFK.show($('#chatitem_option'));
        KFK.selectedChatItem = $(this);
    });
    theItem.on("mouseover", function () {
        KFK.hoveredChatItem = $(this);
    })
};

KFK.addChatMsgToTodo = async () => {
    await KFK.addTodoItem(KFK.selectedChatItem.text());
    KFK.hide($('.clickOuterToHide'));
};

KFK.closeTodoOption = function () {
    KFK.hide($('#todo_option'));
};

KFK.addTodoItem = async function (label) {
    let todo_list = $('#coco_todo_list.original');
    let newItem = $("<div class='todo_item' prg='0' id='" + KFK.myuid() + "'><div class='todolabel'>" + label + "</div><div class='prg'></div></div>");
    newItem.prependTo(todo_list);
    KFK.setTodoItemEventHandler($('#coco_todo'));

    //todo 节点的update不做undo/redo记录，所以，只需要传递最新节点数据
    await KFK.syncNodePut("U", $('#coco_todo'), "todo", undefined, false, 0, 1);

    KFK.APP.inputMsg = "";
};

KFK.hideChat = () => {
    $('#coco_chat').addClass('noshow');
}
KFK.showChat = async () => {
    if ($('#coco_chat').hasClass('noshow')) {
        KFK.firstShown['chat'] = true;
        $('#coco_chat').removeClass('noshow');
        $('.chat_reddot').addClass('noshow');
        await KFK.loadDIVPositon('coco_chat_pos', '#coco_chat');
        KFK.beginChatMode();
        KFK.toggleInputFor("chat");
    } else {
        $('#coco_chat').addClass('noshow');
    }
};

KFK.showTodo = () => {
    KFK.todoShown = true;
    $('.todolist').removeClass('noshow');
    KFK.scrollToNodeById('coco_todo');
    KFK.toggleInputFor("todo");
    KFK.beginTodoMode();
};


KFK.ISayChatItem = async function (msg) {
    KFK.appendChatItem(msg, KFK.APP.model.cocouser.avatar, KFK.APP.model.cocouser.name, "me");
    if ($('#coco_chat').hasClass('noshow')) {
        await KFK.showChat();
    }
    //chat 节点的update不做undo/redo记录，所以，只需要传递最新节点数据
    await KFK.sendCmd("CHAT", {
        msg: msg
    });
    KFK.APP.inputMsg = "";
};

KFK.appendChatItem = async function (msg, avatar, name, who) {
    if (KFK.firstShown['chat'] === false) {
        await KFK.showChat();
    }
    if ($('#coco_chat').hasClass('noshow')) {
        $('.chat_reddot').removeClass('noshow');
    }
    $('.chat_icon').addClass('jelloOnce');
    setTimeout(() => {
        $('.chat_icon').removeClass('jelloOnce');
    }, 3000);
    let chat_list = $('#coco_chat_list.original');

    let avatarSrc = KFK.avatars[avatar] ? KFK.avatars[avatar].src : KFK.avatars['avatar-0'].src;
    let html = "<div class='chat_item " + who + "'>";
    if (who !== 'me') {
        html +=
            "<img class='chatavatar' src='" + avatarSrc + "'/>" +
            "<div class='chatbody'><div class='chatname'>" + name + "</div>" +
            "<div class='chatmsg'>" + msg + "</div>" +
            "</div>";
    } else {
        html += "<div class='chatmsg'>" + msg + "</div>" +
            "<img class='chatavatar' src='" + avatarSrc + "'/>";
    }
    html += "</div>";
    let newItem = $(html);
    newItem.appendTo(chat_list);
    KFK.setChatItemEventHandler(newItem);
    chat_list.scrollTop(chat_list[0].scrollHeight);
};

KFK.moveTodoByProgress = async function (progress) {
    KFK.hide($('#todo_option'));
    let fromDIVId = KFK.getTodoDivIdByItem(KFK.hoveredTodo);
    let fromDIV = $('#' + fromDIVId);
    if (NotSet(fromDIV)) {
        KFK.printCallStack("fromDIV should not be undefined");
        return;
    }
    if (progress === 100) {
        if (fromDIVId !== 'coco_done') {
            await KFK.moveTodoItemTo('#coco_done', progress);
            await KFK.syncNodePut("U", $('#coco_done'), "todo", undefined, false, 0, 1);
            await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
        }
    } else if (progress === 0) {
        if (fromDIVId !== 'coco_todo') {
            await KFK.moveTodoItemTo('#coco_todo', progress);
            await KFK.syncNodePut("U", $('#coco_todo'), "todo", undefined, false, 0, 1);
            await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
        }
    } else {
        if (fromDIVId !== "coco_inprogress") {
            await KFK.moveTodoItemTo('#coco_inprogress', progress);
            await KFK.syncNodePut("U", $('#coco_inprogress'), "todo", undefined, false, 0, 1);
            await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
        } else {
            KFK.hoveredTodo.attr("prg", progress);
            await KFK.syncNodePut("U", $('#coco_inprogress'), "todo", undefined, false, 0, 1);
        }
    }
}

KFK.moveTodoItemTo = async function (todoListName, progress) {
    if (NotSet(KFK.hoveredTodo)) {
        return;
    }
    let jqCocoTodo = $('#coco_todo');
    let jqCocoInProgress = $('#coco_inprogress');
    let jqCocoDone = $('#coco_done');
    let jqMoveTo = undefined;
    if (todoListName === '#coco_inprogress') {
        if (jqCocoInProgress.length < 1) {
            jqCocoInProgress = await KFK.placeNode(
                false,
                "coco_inprogress",
                "textblock", "default",
                KFK.divCenter(jqCocoTodo) + KFK.divWidth(jqCocoTodo) + 40,
                KFK.divMiddle(jqCocoTodo),
                KFK.divWidth(jqCocoTodo), KFK.divHeight(jqCocoTodo),
                "<div id='coco_inprogress_title' class='coco_title'>进行中</div>" +
                "<div id='coco_inprogress_list' class='coco_list original'>" +
                "</div>",
                ''
            );
            jqCocoInProgress.attr("tabIndex", 1);
            jqCocoInProgress.addClass("todolist noedit");
            jqCocoInProgress.find('.innerobj').css({
                "justify-content": 'flex-start',
                "align-items": 'flex-start'
            });
            // KFK.scrollToNodeById('coco_inprogress');
        }
        jqMoveTo = $('#coco_inprogress_list.original');
        KFK.hoveredTodo.detach().prependTo(jqMoveTo);
    } else if (todoListName === '#coco_done') {
        //如果目的地是 done
        //先看看 done div是否存在
        if (jqCocoDone.length < 1) {
            let x = y = w = h = 0;
            //如果不存在，就要根据进行中或者待办事项来新建
            //进行中存在吗？
            if (jqCocoInProgress.length < 1) {
                //进行中不存在，那就根据待办事项来创建
                x = KFK.divCenter(jqCocoTodo) + KFK.divWidth(jqCocoTodo) * 2 + 80;
                y = KFK.divMiddle(jqCocoTodo);
                w = KFK.divWidth(jqCocoTodo);
                h = KFK.divHeight(jqCocoTodo);
            } else {
                //进行中存在，就根据进行中来创建
                x = KFK.divCenter(jqCocoInProgress) + KFK.divWidth(jqCocoInProgress) + 40;
                y = KFK.divMiddle(jqCocoInProgress);
                w = KFK.divWidth(jqCocoInProgress);
                h = KFK.divHeight(jqCocoInProgress);
            }


            jqCocoDone = await KFK.placeNode(
                false,
                "coco_done",
                "textblock", "default",
                x, y, w, h,
                "<div id='coco_done_title' class='coco_title'>已完成</div>" +
                "<div id='coco_done_list' class='coco_list original'>" +
                "</div>",
                ''
            );
            //标记为nocopy则，不会被拷贝
            jqCocoDone.addClass("todolist noedit");
            //缺省的对齐方式是居中，这里换成居左居上
            jqCocoDone.find('.innerobj').css({
                "justify-content": 'flex-start',
                "align-items": 'flex-start'
            });
            //创建完成，滚动过去
            // KFK.scrollToNodeById('coco_done');
        }
        //找到内部的列表
        jqMoveTo = $('#coco_done_list.original');
        //把要运动的todoitem放到新的list中
        KFK.hoveredTodo.detach().prependTo(jqMoveTo);
    } else if (todoListName === '#coco_todo') {
        jqMoveTo = $('#coco_todo_list.original');
        KFK.hoveredTodo.detach().prependTo(jqMoveTo);
    }
    //设置prg属性的值，css会根据这个值来显示进度条
    KFK.hoveredTodo.attr("prg", progress);
};

KFK.cancelTempLine = function () {
    if (KFK.lineTemping) {
        KFK.lineTemping = false;
        if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
        KFK.linkPosNode.clear();
        KFK.drawPoints.clear();
    }
};

KFK.ZiToTop = function () {
    let curJQ = KFK.getPropertyApplyToJqNode();
    if (curJQ === null) return;
    if (KFK.isKfkNode(curJQ) === false) return;
    let myZI = KFK.getZIndex(curJQ);
    let count = 0;
    let zIndexChanger = {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        ZI: {}
    };
    KFK.JC3.find(".kfknode").each((index, aNodeDIV) => {
        count += 1;
        let jqNode = $(aNodeDIV);
        let tmpZi = KFK.getZIndex(jqNode);
        if (tmpZi > myZI) {
            KFK.setZIndex(jqNode, tmpZi - 1);
            zIndexChanger.ZI[jqNode.attr("id")] = tmpZi - 1;
        }
    });
    KFK.setZIndex(curJQ, count);
    zIndexChanger.ZI[curJQ.attr("id")] = count;
    KFK.WS.put("ZI", zIndexChanger);
};

KFK.ZiToBottom = function () {
    let curJQ = KFK.getPropertyApplyToJqNode();
    if (curJQ === null) return;
    if (KFK.isKfkNode(curJQ) === false) return;

    let myZI = KFK.getZIndex(curJQ);
    let count = 0;
    let zIndexChanger = {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        ZI: {}
    };
    KFK.JC3.find(".kfknode").each((index, aNodeDIV) => {
        count += 1;
        let jqNode = $(aNodeDIV);
        let tmpZi = KFK.getZIndex(jqNode);
        if (tmpZi < myZI) {
            KFK.setZIndex(jqNode, tmpZi + 1);
            zIndexChanger.ZI[jqNode.attr("id")] = tmpZi + 1;
        }
    });
    KFK.setZIndex(curJQ, 1);
    zIndexChanger.ZI[curJQ.attr("id")] = 1;
    KFK.sendCmd("ZI", zIndexChanger);
};
KFK.ZiToHigher = function () {
    let curJQ = KFK.getPropertyApplyToJqNode();
    if (curJQ === null) return;
    if (KFK.isKfkNode(curJQ) === false) return;
    let myZI = KFK.getZIndex(curJQ);
    let count = 0;
    let allnodes = KFK.JC3.find(".kfknode");
    let zIndexChanger = {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        ZI: {}
    };
    if (myZI < allnodes.length) {
        allnodes.each((index, aNodeDIV) => {
            count += 1;
            let jqNode = $(aNodeDIV);
            let tmpZi = KFK.getZIndex(jqNode);
            if (tmpZi === myZI + 1) {
                KFK.setZIndex(jqNode, myZI);
                zIndexChanger.ZI[jqNode.attr("id")] = myZI;
            }
        });
        KFK.setZIndex(curJQ, myZI + 1);
        zIndexChanger.ZI[curJQ.attr("id")] = myZI + 1;
        KFK.sendCmd("ZI", zIndexChanger);
    }
};

KFK.ZiToLower = function () {
    let curJQ = KFK.getPropertyApplyToJqNode();
    if (curJQ === null) return;
    if (KFK.isKfkNode(curJQ) === false) return;
    let zIndexChanger = {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        ZI: {}
    };
    let myZI = KFK.getZIndex(curJQ);
    if (myZI > 1) {
        let count = 0;
        KFK.JC3.find(".kfknode").each((index, aNodeDIV) => {
            count += 1;
            let jqNode = $(aNodeDIV);
            let tmpZi = KFK.getZIndex(jqNode);
            if (tmpZi === myZI - 1) {
                KFK.setZIndex(jqNode, myZI);
                zIndexChanger.ZI[jqNode.attr("id")] = myZI;
            }
        });
        KFK.setZIndex(curJQ, myZI - 1);
        zIndexChanger.ZI[curJQ.attr("id")] = myZI - 1;
        KFK.sendCmd("ZI", zIndexChanger);
    }
};

KFK.tryToLockUnlock = function (shiftKey) {
    //对于节点，只有文档未锁定，以及这是当前用户为发起人时才能执行加解锁
    if (KFK.hoverJqDiv() && KFK.isMyDoc() && KFK.docIsReadOnly() === false) {
        if (KFK.nodeLocked(KFK.hoverJqDiv())) {
            let opEntry = {
                cmd: "UNLOCK",
                from: KFK.hoverJqDiv().attr("id"),
                to: KFK.hoverJqDiv().attr("id"),
            };
            KFK.yarkOpEntry(opEntry);
            KFK.sendCmd("UNLOCKNODE", {
                doc_id: KFK.APP.model.cocodoc.doc_id,
                nodeid: KFK.hoverJqDiv().attr("id"),
            });
        } else {
            let opEntry = {
                cmd: "LOCK",
                from: KFK.hoverJqDiv().attr("id"),
                to: KFK.hoverJqDiv().attr("id"),
            };
            KFK.yarkOpEntry(opEntry);
            KFK.sendCmd("LOCKNODE", {
                doc_id: KFK.APP.model.cocodoc.doc_id,
                nodeid: KFK.hoverJqDiv().attr("id"),
            });
        }
    } else if (
        KFK.hoverSvgLine() &&
        KFK.isMyDoc() &&
        KFK.docIsReadOnly() === false
    ) {
        //对于直线，只有文档未锁定，以及这是当前用户为发起人时才能执行加解锁
        if (KFK.lineLocked(KFK.hoverSvgLine())) {
            KFK.shapeToDrag = null;
            let opEntry = {
                cmd: "UNLOCKLINE",
                from: KFK.hoverSvgLine().attr("id"),
                to: KFK.hoverSvgLine().attr("id"),
            };
            KFK.yarkOpEntry(opEntry);
            KFK.sendCmd("UNLOCKLINE", {
                doc_id: KFK.APP.model.cocodoc.doc_id,
                nodeid: KFK.hoverSvgLine().attr("id"),
            });
        } else {
            let opEntry = {
                cmd: "LOCKLINE",
                from: KFK.hoverSvgLine().attr("id"),
                to: KFK.hoverSvgLine().attr("id"),
            };
            KFK.yarkOpEntry(opEntry);
            KFK.sendCmd("LOCKLINE", {
                doc_id: KFK.APP.model.cocodoc.doc_id,
                nodeid: KFK.hoverSvgLine().attr("id"),
            });
        }
    } else {
        KFK.scrLog("只有发起人能够进行加解锁");
    }
    if (!shiftKey) {
        KFK.setMode("pointer");
    }
};
/**
 * 切换右侧属性框
 * @param flag   true: 总是打开， false: 切换
 * @param tab    显示第几个页面， 如果有值，flag按true1处理
 */
KFK.toggleRightPanel = function (tab = -1, flag = false) {
    if (KFK.APP.model.cocodoc.readonly) {
        return;
    }
    if (flag === false) {
        if ($('#right').hasClass('noshow')) {
            KFK.show($('#right'));
        } else {
            KFK.hide($('#right'));
        }
        return;
    } else {
        KFK.show($('#right'));
    }
    if (tab < 0) {
        let tabstr = localStorage.getItem('righttabindex');
        if (NotSet(tabstr)) {
            tabstr = "2";
        }
        tab = parseInt(tabstr);
    }
    if (tab < 0) {
        tab = 0;
    } else if (tab > 2) {
        tag = 2;
    }

    KFK.APP.model.rightTabIndex = tab;
    localStorage.setItem('righttabindex', tab);
};

KFK.toggleFullScreen = function (evt) {
    if (KFK.inPresentingMode) return;
    KFK.inFullScreenMode = !KFK.inFullScreenMode;
    if (KFK.inFullScreenMode === true) {
        /*
           if (KFK.inOverviewMode === false) {
           KFK.setLayoutDisplay({ minimap: false, toplogo: false, docHeaderInfo: false, rtcontrol: true, left: true, right: true, });
           }
           */
        KFK.scrLog("进入全屏模式: 输入fs退出");
    } else {
        KFK.scrLog("");
        /*
           if (KFK.inOverviewMode === false)
           KFK.restoreLayoutDisplay();
           */
    }
    KFK.APP.setData("show", "actionlog", false);
    if (KFK.inFullScreenMode === true) {
        KFK.openFullscreen();
    } else {
        KFK.closeFullscreen();
    }
};

KFK.toggleTopAndLeftOnly = async function (evt) {
    if (KFK.APP.model.cocodoc.readonly) {
        return;
    }
    if (NotSet(KFK.topAndLeftOnly)) KFK.topAndLeftOnly = false;
    KFK.topAndLeftOnly = !KFK.topAndLeftOnly;
    await KFK.showSection({
        minimap: !KFK.topAndLeftOnly
    });
    //左侧和右侧的工具栏，可进行切换
    if (KFK.topAndLeftOnly) {
        KFK.hide('#left');
        KFK.hide('#right');
    } else {
        KFK.show('#left');
        KFK.show('#right');
    }
    KFK.APP.setData("show", "actionlog", false);
    KFK.keypool = "";
};

KFK.toggleControlButtonOnly = async function (evt) {
    KFK.controlButtonsOnly = !KFK.controlButtonsOnly;
    if (KFK.APP.model.cocodoc.readonly) {
        //文档锁定时，依然可以对minimap切换显示与否
        await KFK.showSection({
            minimap: !KFK.controlButtonsOnly
        });
        return;
    }
    KFK.APP.setData("show", "actionlog", false);
    //切换minimap
    await KFK.showSection({
        minimap: !KFK.controlButtonsOnly
    });
    if (KFK.controlButtonsOnly) {
        KFK.hide("#left");
        KFK.hide("#right");
        KFK.hide("#docHeaderInfo");
        KFK.hide("#toplogo");
        KFK.hideDIVsWithStatus(['.msgInputWindow', '#coco_chat']);
    } else {
        KFK.show("#left");
        KFK.show("#right");
        KFK.show("#docHeaderInfo");
        KFK.show("#toplogo");
        KFK.restoreDIVsWithStatus(['.msgInputWindow', '#coco_chat']);
    }
    KFK.keypool = "";
    //add a mask layer
};

KFK.toggleNoControls = async function (evt) {
    KFK.controlNoControl = !KFK.controlNoControl;
    KFK.APP.setData("show", "actionlog", false);
    //切换minimap
    await KFK.showSection({
        minimap: false
    });
    if (KFK.controlNoControl) {
        KFK.hide("#left");
        KFK.hide("#right");
        KFK.hide("#docHeaderInfo");
        KFK.hide("#toplogo");
        KFK.hide('#rtcontrol')
        KFK.hideDIVsWithStatus(['.msgInputWindow', '#coco_chat']);
    } else {
        KFK.show("#left");
        KFK.show("#right");
        KFK.show("#docHeaderInfo");
        KFK.show("#toplogo");
        KFK.shlow('#rtcontrol')
        KFK.restoreDIVsWithStatus(['.msgInputWindow', '#coco_chat']);
    }
    KFK.keypool = "";
    //add a mask layer
};
KFK.toggleNoDocHeader = async function (evt) {
    KFK.noDocHeader = !KFK.noDocHeader;
    if (KFK.APP.model.cocodoc.readonly) {
        //文档锁定时，依然可以对minimap切换显示与否
        await KFK.showSection({
            minimap: !KFK.controlButtonsOnly
        });
        return;
    }
    KFK.APP.setData("show", "actionlog", false);
    //切换minimap
    await KFK.showSection({
        minimap: !KFK.noDocHeader
    });
    if (KFK.noDocHeader) {
        KFK.hide("#docHeaderInfo");
        KFK.hide("#toplogo");
        KFK.hideDIVsWithStatus(['.msgInputWindow', '#coco_chat']);
    } else {
        KFK.show("#docHeaderInfo");
        KFK.show("#toplogo");
        KFK.restoreDIVsWithStatus(['.msgInputWindow', '#coco_chat']);
    }
    KFK.keypool = "";
    //add a mask layer
};
KFK.showHidePanel = function (flag) {
    if (
        flag === true &&
        KFK.inFullScreenMode === false &&
        KFK.controlButtonsOnly === false
    ) {
        KFK.show('#left');
        KFK.show('#right');
    } else {
        KFK.hide('#left');
        KFK.hide('#right');
    }
};

KFK.getAclOwnerDescription = function (doc) {
    if (doc.acl === "S") {
        return doc.ownerName;
    } else if (doc.acl === "O") {
        return doc.orgName;
    } else if (doc.acl === "P") {
        return "公共";
    }
};

KFK.iAmOwner = function (doc) {
    return doc.owner === KFK.APP.model.cocouser.userid;
};

KFK.getAclAccessable = function (doc) {
    let ret = false;
    if (doc.acl === "S") {
        if (KFK.APP.model.cocouser.userid === doc.owner) {
            ret = true;
            KFK.AclDeniedReason = "";
        } else {
            KFK.AclDeniedReason = "仅发起人可使用, 但当前用户不是发起人";
        }
    } else if (doc.acl === "O") {
        if (KFK.APP.model.cocouser.orgid === doc.orgid) {
            ret = true;
            KFK.AclDeniedReason = "";
        } else {
            KFK.AclDeniedReason = "仅在白板所在组织内使用, 但当前用户组织不符";
        }
    } else if (doc.acl === "P") {
        ret = true;
        KFK.AclDeniedReason = "";
    }
    return ret;
};

KFK.showNotAclAccessable = function (doc) {
    KFK.scrLog(KFK.AclDeniedReason);
};

KFK.gotoExplorer = async function () {
    if (KFK.APP.model.cocoprj.name === "") {
        KFK.setAppData("model", "cocoprj", {
            prjid: "all",
            name: "我最近使用过的白板",
        });
    }
    KFK.cancelAlreadySelected();
    if (!KFK.isEditting && KFK.mode !== "line") KFK.setMode("pointer");
    KFK.cancelTempLine();
    KFK.setMode("pointer");
    KFK.hidePickerMatlib();
    //不用每次gotoExplorer都refreshProjectList, 因为refreshProjectList要跟服务器刷新数据
    //仅仅是切换explorer或者designer视图，没必要拉取数据
    //只在首次切换到explorer时，拉取数据。
    //其他时候，在creaeproject等操作的地方，会调用refreshProjectList重新拉取数据，在那时，Projects发生了变化，重新拉取是有必要的。
    if (KFK.explorerRefreshed === false) {
        KFK.refreshProjectList();
    }
    KFK.currentView = "explorer";
    await KFK.showSection({
        explorer: true,
        designer: false
    });
    let lastTabIndex = sessionStorage.getItem('leftTabIndex');
    if (IsSet(lastTabIndex)) {
        lastTabIndex = parseInt(lastTabIndex);
    } else {
        lastTabIndex = 1;
    }
    KFK.showForm({
        newdoc: false,
        newprj: false,
        prjlist: true,
        doclist: true,
        share: false,
        explorerTabIndex: lastTabIndex,
    });
    $("#overallbackground").addClass("grid1");
    KFK.sendCmd("SETWSSEC", {
        section: "EXPLORER"
    });
};

KFK.gotoDesigner = async function () {
    KFK.debug("...gotoDesigner");
    await KFK.showSection({
        explorer: false,
        designer: true
    });
    KFK.showForm({
        newdoc: false,
        newprj: false,
        prjlist: false,
        doclist: false,
        share: false,
    });
    KFK.currentView = "designer";
    KFK.focusOnC3();
    $("#overallbackground").removeClass("grid1");
    KFK.sendCmd("SETWSSEC", {
        section: "DESIGNER"
    });
};

KFK.dataURLtoFile = function (dataurl, filename) {
    let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
};

KFK.save = async function () {
    let docPath = `/${cocoConfig.tenant.id}/${KFK.APP.model.cocodoc.doc_id}/`;
    // let result = await KFK.OSSClient.list({
    //     prefix: 'lucas/',
    // });
    try {
        // 不带任何参数，默认最多返回1000个文件。
        let result = await KFK.OSSClient.list({
            prefix: "lucas/",
        });
        // 根据nextMarker继续列出文件。
        if (result.isTruncated) {
            let result = await client.list({
                marker: result.nextMarker,
            });
        }
        // // 列举前缀为'my-'的文件。
        // let result = await client.list({
        //    prefix: 'my-'
        // });
        // // 列举前缀为'my-'且在'my-object'之后的文件。
        // let result = await client.list({
        //    prefix: 'my-',
        //    marker: 'my-object'
        // });
    } catch (err) {
        KFK.error(err);
    }
};

KFK.checkUrl = function (str_url) {
    let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return str.match(regex) !== null;
};

KFK.replaceHTMLTarget = function (html) {
    html = `<div>${html}</div>`;
    try {
        let jq = $($.parseHTML(html));
        jq.find("a").prop("target", "_blank");
        jq.find("[style]").removeAttr("style");
        ret = jq.prop("innerHTML");
    } catch (err) {
        ret = "";
    }
    return ret;
};
KFK.pasteContent = function () {
    let paste = KFK.APP.model.paste;
};

KFK.showTextPasteDialog = async function (content) {
    if (KFK.anyLocked(KFK.hoverJqDiv())) return;
    let toDisplay = content.text;
    let toAdd = content.text;
    let showbox = false;
    if (content.html !== "") {
        let tmpText = RegHelper.removeMeta(content.html);
        toAdd = "<div>" + KFK.replaceHTMLTarget(tmpText) + "</div>";
        let tmp = $(toAdd);
        tmp.find("[style]").removeAttr("style");
        toAdd = "<div class='pastedHtml'>" + tmp.prop('innerHTML') + "</div>";
        showbox = KFK.hoverJqDiv() ? false : true;
        if (showbox) {
            await KFK.mergeAppData("model", "paste", {
                format: '粘贴内容格式为HTML',
                showcontent: false,
                showdisplay: false,
                showbox: showbox,
                content: toAdd,
                displayBackup: toDisplay,
                convertHTMLToText: true,
                display: toDisplay,
                ctype: "html",
            });
            KFK.showDialog({
                pasteContentDialog: true
            });
        } else {
            KFK.APP.model.paste.content = toAdd;
            KFK.placePastedContent();
        }
    } else {
        if (content.text !== "") {
            toAdd = content.text;
            if (RegHelper.isUrl(toAdd)) {
                // Plain text is a URL
                showbox = KFK.hoverJqDiv() ? false : true;
                await KFK.mergeAppData("model", "paste", {
                    format: '粘贴内容格式为URL地址链接',
                    showcontent: true,
                    showdisplay: true,
                    showbox: showbox,
                    content: toAdd,
                    display: "请点击访问",
                    ctype: "url",
                });
                KFK.showDialog({
                    pasteContentDialog: true
                });
            } else {
                //Normal plain text
                showbox = KFK.hoverJqDiv() ? false : true;
                if (showbox) {
                    await KFK.mergeAppData("model", "paste", {
                        format: '粘贴内容格式为纯文本',
                        showcontent: false,
                        showdisplay: false,
                        showbox: showbox,
                        content: toAdd,
                        display: toAdd,
                        ctype: "text",
                    });
                    KFK.showDialog({
                        pasteContentDialog: true
                    });
                } else {
                    KFK.APP.model.paste.content = toAdd;
                    KFK.placePastedContent();
                }
            }
        }
    }
};

KFK.placePastedContent = async function () {
    let toAdd = KFK.APP.model.paste.content;
    let display = KFK.APP.model.paste.display;
    let ctype = KFK.APP.model.paste.ctype;
    if (ctype === "url") {
        toAdd = `<a href="${toAdd}" target="_blank">${display}</a>`;
    } else if (ctype === "html" && KFK.APP.model.paste.convertHTMLToText === true) {
        let tmp = $(toAdd);
        toAdd = tmp.text();
    }
    //paste image or paste text
    let hoveredJQ = KFK.hoverJqDiv();
    //TODO， chat 的标志是nocopy，
    if (hoveredJQ && hoveredJQ.hasClass('noedit') === false) {
        if (KFK.anyLocked(hoveredJQ)) return;
        //把文字内容粘贴到hover div上

        if (cocoConfig.node[hoveredJQ.attr("nodetype")].edittable) {
            KFK.fromJQ = hoveredJQ.clone();
            let innerObj = hoveredJQ.find(".innerobj");
            let oldHtml = innerObj.html();
            //如果同时按着shift键，则使用粘贴内容覆盖原内容，如果没有按shift键，则把粘贴内容加载原内容后面
            let newHtml = oldHtml + "<BR> " + toAdd;
            if (KFK.KEYDOWN.shift === false) {
                newHtml = toAdd;
            }
            innerObj.html(newHtml);
            await KFK.syncNodePut(
                "U",
                KFK.hoveredJQ,
                "add text to hover div",
                KFK.fromJQ,
                false,
                0,
                1
            );
        }
    } else {
        //box是在pad.js中定义的paste对象时，是否显示边框和背景色的配置信息
        //paste image in a new node
        let box = KFK.APP.model.paste.box;
        let jBox = await KFK.placeNode(
            false, //shiftKey
            KFK.myuid(),
            "textblock",
            "default",
            KFK.scalePoint(KFK.scrXToJc3X(KFK.currentMousePos.x)),
            KFK.scalePoint(KFK.scrYToJc3Y(KFK.currentMousePos.y)),
            100,
            100,
            toAdd,
            ""
        );
        switch (box) {
            case "none":
                jBox.css("background", "#FFFFFF00");
                jBox.css("border-color", "#33333300");
                break;
            case "border":
                jBox.css("background", "#FFFFFF00");
                jBox.css("border-color", "#333333FF");
                break;
            case "all":
                jBox.css("background", "#FFFFFFFF");
                jBox.css("border-color", "#333333FF");
                break;
        }
        await KFK.syncNodePut("C", jBox, "create text node", null, false, 0, 1);
    }
};



KFK.onCut = async function (evt) {
    if (KFK.isShowingModal) return;
    KFK.deleteHoverOrSelectedDiv(evt, true);
};

KFK.onCopy = async function (evt) {
    if (KFK.isShowingModal) return;
    if (KFK.inDesigner() === false) return;
    if (KFK.noCopyPaste) return;
    if (KFK.APP.show.dialog.ivtCodeDialog) {
        return;
    }
    let someDIVcopyed = await KFK.duplicateHoverObject(evt, "copy");
    if (someDIVcopyed) {
        evt.clipboardData.setData("text/plain", "usediv");
        evt.clipboardData.setData("text/html", "usediv");
    }
    evt.preventDefault();
    evt.preventDefault();
    KFK.holdEvent(evt);
};

KFK.onPaste = async function (evt) {
    if (KFK.isShowingModal) return;
    if (KFK.inDesigner() === false) return;
    if (KFK.noCopyPaste) return;
    if (KFK.docIsReadOnly()) return;
    let content = {
        html: "",
        text: "",
        image: null
    };
    content.html = evt.clipboardData.getData("text/html");
    content.text = evt.clipboardData.getData("Text");
    if (content.text === "usediv") {
        await KFK.duplicateHoverObject(evt, "paste");
        return;
    } else {
        var items = (evt.clipboardData || evt.originalEvent.clipboardData).items;
        if (items[1] && (content.html !== "" || content.text !== "")) {
            KFK.showTextPasteDialog(content);
        } else if (items[0]) {
            if (
                items[0].kind === "string" &&
                (content.html !== "" || content.text !== "")
            ) {
                KFK.showTextPasteDialog(content);
            } else if (items[0].kind === "file") {
                var blob = items[0].getAsFile();
                KFK.dropAtPos = {
                    x: KFK.scalePoint(KFK.scrXToJc3X(KFK.globalMouseX)),
                    y: KFK.scalePoint(KFK.scrYToJc3Y(KFK.globalMouseY)),
                };
                KFK.procPasteBlob(blob);
            }
        }
    }
};

KFK.addEditorToNode = function (jqNode, editor) {
    let editors = jqNode.attr("editors");
    if (editors === undefined || editors === null || editors === "") {
        editors = editor;
    } else {
        let editorsArr = editors.split("$$");
        if (editorsArr[0] === editor) {
            return;
        }
        editorsArr.unshift(editor);
        editors = editorsArr.join("$$");
    }
    jqNode.attr("editors", editors);
    if (jqNode.hasClass("kfkshape")) {
        if (jqNode.find(".cocoeditors").length === 0) {
            let allEditorDIV = document.createElement("div");
            $(allEditorDIV).addClass("cocoeditors");
            let lastEditorDIV = document.createElement("div");
            $(lastEditorDIV).addClass("lastcocoeditor");
            el(jqNode).appendChild(lastEditorDIV);
            el(jqNode).appendChild(allEditorDIV);
            if (KFK.APP.model.showEditor === "none") {
                $(allEditorDIV).css("display", "none");
                $(lastEditorDIV).css("display", "none");
            } else if (KFK.APP.model.showEditor === "last") {
                $(allEditorDIV).css("display", "none");
                $(lastEditorDIV).css("display", "block");
            } else if (KFK.APP.model.showEditor === "all") {
                $(allEditorDIV).css("display", "block");
                $(lastEditorDIV).css("display", "none");
            }
        }
    }
    jqNode.find(".cocoeditors").html(KFK.getNodeEditors(jqNode).join(", "));
    jqNode.find(".lastcocoeditor").html(editor);
};

KFK.getNodeEditors = function (jqNode) {
    let editors = jqNode.attr("editors");
    if (editors === undefined || editors === null || editors === "") {
        return [];
    }
    let editorsArr = editors.split("$$");
    return editorsArr;
};

KFK.changeSVGFill = function () { };
KFK.scrCenter = function () {
    return {
        x: $(window).width() * 0.5,
        y: $(window).height() * 0.5
    };
};
KFK.showCenterIndicator = function (cx, cy) {
    KFK.debug("...showCenterIndicator");
    let center = KFK.scrCenter();
    let centerX = cx ? cx : center.x;
    let centerY = cy ? cy : center.y;
    $("#centerpoint").css("left", centerX - 10);
    $("#centerpoint").css("top", centerY - 10);
};
KFK.gotoFirstPage = function () {
    KFK.currentPage = 0;
    KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoNextPage = function () {
    if (KFK.currentPage < KFK.pageBounding.Pages.length - 1) {
        KFK.currentPage++;
        KFK.___gotoPage(KFK.currentPage);
    } else {
        KFK.scrLog("这已经在最后一页了", 1000);
    }
};
KFK.gotoPrevPage = function () {
    if (KFK.currentPage > 0) {
        KFK.currentPage--;
        KFK.___gotoPage(KFK.currentPage);
    } else {
        KFK.scrLog("这已经在第一页了", 1000);
    }
};
KFK.gotoLastPage = function () {
    KFK.currentPage = KFK.pageBounding.Pages.length - 1;
    KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoAnyPage = function (pageIndex) {
    if (pageIndex >= 0 && pageIndex < KFK.pageBounding.Pages.length) {
        KFK.currentPage = pageIndex;
        KFK.___gotoPage(KFK.currentPage);
    } else if (pageIndex >= KFK.pageBounding.Page.length) {
        KFK.currentPage = KFK.pageBounding.Pages.length - 1;
        KFK.___gotoPage(KFK.currentPage);
    } else {
        KFK.currentPage = 0;
        KFK.___gotoPage(KFK.currentPage);
    }
};
KFK.gotoUpperPage = function () {
    let pidx = KFK.currentPage - KFK.PageNumberHori;
    if (pidx < 0) {
        KFK.scrLog("已经在最顶部了", 1000);
        return;
    }
    KFK.currentPage = pidx;
    KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoLowerPage = function () {
    let pidx = KFK.currentPage + KFK.PageNumberHori;
    if (pidx > KFK.pageBounding.Pages.length - 1) {
        KFK.scrLog("已经在最底部了", 1000);
        return;
    }
    KFK.currentPage = pidx;
    KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoLeftPage = function () {
    let rowIdx = Math.floor(KFK.currentPage / KFK.PageNumberHori);
    let columIdx = KFK.currentPage % KFK.PageNumberHori;
    let nextColumIdx = columIdx - 1;
    if (nextColumIdx < 0) {
        KFK.scrLog("已经在最左边了", 1000);
        return;
    }
    let pidx = rowIdx * KFK.PageNumberHori + nextColumIdx;
    KFK.currentPage = pidx;
    KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoRightPage = function () {
    let rowIdx = Math.floor(KFK.currentPage / KFK.PageNumberHori);
    let columIdx = KFK.currentPage % KFK.PageNumberHori;
    let nextColumIdx = columIdx + 1;
    if (nextColumIdx > KFK.PageNumberVert - 1) {
        KFK.scrLog("已经在最右边了", 1000);
        return;
    }
    let pidx = rowIdx * KFK.PageNumberHori + nextColumIdx;
    KFK.currentPage = pidx;
    KFK.___gotoPage(KFK.currentPage);
};
KFK.___gotoPage = function (pageIndex) {
    // KFK.scrLog(`goto page ${pageIndex + 1}`);
    let main = $("#C1");
    let scroller = $("#S1");
    let scrCenter = KFK.scrCenter();
    let window_width = scrCenter.x * 2;
    let window_height = scrCenter.y * 2;

    let pageCenterX =
        (KFK.currentPage % KFK.PageNumberHori) * KFK.PageWidth +
        KFK.PageWidth * 0.5;
    let pageCenterY =
        Math.floor(KFK.currentPage / KFK.PageNumberHori) * KFK.PageHeight +
        KFK.PageHeight * 0.5;

    toLeft = pageCenterX + KFK.LeftB - scrCenter.x;
    toTop = pageCenterY + KFK.TopB - scrCenter.y;

    KFK.scrollToPos({
        x: toLeft,
        y: toTop
    });
};

KFK.startPresentation = async function () {
    if (KFK.inOverviewMode) return;
    KFK.hideDIVsWithStatus(['.msgInputWindow', '#coco_chat', '#system_message']);
    KFK.maskScreen();
    KFK.openFullscreen();
    await KFK.sleep(500);
    KFK.setLayoutDisplay({
        showbounding: false,
        showgrid: false,
        minimap: false,
        toplogo: false,
        docHeaderInfo: false,
        rtcontrol: false,
        left: false,
        right: false,
    });
    let cbkg = $("#containerbkg");
    KFK.rememberGrid = cbkg.hasClass("grid1") ?
        "grid1" :
        cbkg.hasClass("grid2") ?
            "grid2" :
            "";
    if (KFK.rememberGrid !== "") cbkg.removeClass(KFK.rememberGrid);
    // KFK.rememberOverallBackgroundColor = $('#overallbackground').css('background-color');
    // $('#overallbackground').css('background-color', 'black');
    KFK.scrLog("进入演示模式: 输入pr退出");
    KFK.inPresentingMode = true;
    KFK.___presentPage(KFK.currentPage);
};
KFK.endPresentation = function () {
    if (KFK.inOverviewMode) return;
    KFK.restoreDIVsWithStatus(['.msgInputWindow', '#coco_chat', '#system_message']);
    KFK.unmaskScreen();
    KFK.closeFullscreen();
    KFK.restoreLayoutDisplay();
    KFK.scrLog("已退出演示模式");
    KFK.inPresentingMode = false;
    KFK.___unsetSlideMask();
    let cbkg = $("#containerbkg");
    if (KFK.rememberGrid !== "") cbkg.addClass(KFK.rememberGrid);
    // $('#overallbackground').css('background-color', KFK.rememberOverallBackgroundColor);
    let main = $("#C1");
    let scroller = $("#S1");
    let scrCenter = KFK.scrCenter();
    let window_width = scrCenter.x * 2;
    let window_height = scrCenter.y * 2;

    KFK.JC3.css({
        "transform-origin": `0px 0px`,
        "-webkit-transform-origin": `0px 0px`,
    });
    KFK.JC3.css("transform", `scale(1, 1)`);
    setTimeout(function () {
        KFK.JC3.css("transform", `scale(1, 1) translate(0px, 0px)`);
    }, 100);
};

KFK.presentNoneMask = function () {
    KFK.presentMaskMode = false;
    $(".present-mask").removeClass("white-mask");
    $(".present-mask").removeClass("black-mask");
    $(".present-mask").addClass("nodisplay");
};
KFK.presentBlackMask = function () {
    if (
        KFK.presentMaskMode &&
        KFK.presentMaskMode === true &&
        $(".present-mask").hasClass("black-mask")
    ) {
        KFK.presentMaskMode = false;
        $(".present-mask").removeClass("black-mask");
        $(".present-mask").addClass("nodisplay");
    } else {
        KFK.presentMaskMode = true;
        $(".present-mask").removeClass("white-mask");
        $(".present-mask").removeClass("nodisplay");
        $(".present-mask").addClass("black-mask");
    }
};
KFK.presentWhiteMask = function () {
    if (
        KFK.presentMaskMode &&
        KFK.presentMaskMode === true &&
        $(".present-mask").hasClass("white-mask")
    ) {
        KFK.presentMaskMode = false;
        $(".present-mask").removeClass("white-mask");
        $(".present-mask").addClass("nodisplay");
    } else {
        KFK.presentMaskMode = true;
        $(".present-mask").removeClass("black-mask");
        $(".present-mask").removeClass("nodisplay");
        $(".present-mask").addClass("white-mask");
    }
};
KFK.presentFirstPage = function () {
    KFK.currentPage = 0;
    KFK.___presentPage(KFK.currentPage);
};
KFK.presentNextPage = function () {
    if (KFK.currentPage < KFK.pageBounding.Pages.length - 1) {
        KFK.currentPage++;
        KFK.___presentPage(KFK.currentPage);
    } else {
        KFK.scrLog("这是在最后一页了", 1000);
    }
};
KFK.presentPrevPage = function () {
    if (KFK.currentPage > 0) {
        KFK.currentPage--;
        KFK.___presentPage(KFK.currentPage);
    } else {
        KFK.scrLog("这已经在第一页了", 1000);
    }
};
KFK.presentLastPage = function () {
    KFK.currentPage = KFK.pageBounding.Pages.length - 1;
    KFK.___presentPage(KFK.currentPage);
};
KFK.presentAnyPage = function (pageIndex) {
    if (pageIndex >= 0 && pageIndex < KFK.pageBounding.Pages.length) {
        KFK.currentPage = pageIndex;
        KFK.___presentPage(KFK.currentPage);
    } else if (pageIndex >= KFK.pageBounding.Page.length) {
        KFK.currentPage = KFK.pageBounding.Pages.length - 1;
        KFK.___presentPage(KFK.currentPage);
    }
};
KFK.presentLeftPage = function () {
    let rowIdx = Math.floor(KFK.currentPage / KFK.PageNumberHori);
    let columIdx = KFK.currentPage % KFK.PageNumberHori;
    let nextColumIdx = columIdx - 1;
    if (nextColumIdx < 0) {
        KFK.scrLog("已经在最左边了", 1000);
        return;
    }
    let pidx = rowIdx * KFK.PageNumberHori + nextColumIdx;
    KFK.currentPage = pidx;
    KFK.___presentPage(KFK.currentPage);
};
KFK.presentRightPage = function () {
    let rowIdx = Math.floor(KFK.currentPage / KFK.PageNumberHori);
    let columIdx = KFK.currentPage % KFK.PageNumberHori;
    let nextColumIdx = columIdx + 1;
    if (nextColumIdx > KFK.PageNumberVert - 1) {
        KFK.scrLog("已经在最右边了", 1000);
        return;
    }
    let pidx = rowIdx * KFK.PageNumberHori + nextColumIdx;
    KFK.currentPage = pidx;
    KFK.___presentPage(KFK.currentPage);
};

KFK.presentUpperPage = function () {
    let pidx = KFK.currentPage - KFK.PageNumberHori;
    if (pidx < 0) {
        KFK.scrLog("已经在最顶部了", 1000);
        return;
    }
    KFK.currentPage = pidx;
    KFK.___presentPage(KFK.currentPage);
};
KFK.presentLowerPage = function () {
    let pidx = KFK.currentPage + KFK.PageNumberHori;
    if (pidx > KFK.pageBounding.Pages.length - 1) {
        KFK.scrLog("已经在最底部了", 1000);
        return;
    }
    KFK.currentPage = pidx;
    KFK.___presentPage(KFK.currentPage);
};
KFK.___presentPage = function (pageIndex) {
    KFK.inPresentingMode = true;
    KFK.scrLog(`第${pageIndex + 1}页`);
    let pages = KFK.pageBounding.Pages;
    let main = $("#C1");
    let scroller = $("#S1");
    let scrCenter = KFK.scrCenter();
    let window_width = scrCenter.x * 2;
    let window_height = scrCenter.y * 2;

    KFK.scrollToPos({
        x: pages[pageIndex].left + KFK.LeftB,
        y: pages[pageIndex].top + KFK.TopB,
    });

    KFK.___setSlideMask(pageIndex);

    let scaleX = window_width / KFK.PageWidth;
    let scaleY = window_height / KFK.PageHeight;
    let scale = Math.min(scaleX, scaleY);
    let scaledW = scale * KFK.PageWidth;
    let scaledH = scale * KFK.PageHeight;
    let offsetX = Math.round((window_width - scaledW) * 0.5) / scale;
    let offsetY = Math.round((window_height - scaledH) * 0.5) / scale;

    KFK.JC3.css({
        "transform-origin": `${pages[pageIndex].left}px ${pages[pageIndex].top}px`,
        "-webkit-transform-origin": `${pages[pageIndex].left}px ${pages[pageIndex].top}px`,
        transform: `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`,
    });
    // setTimeout(function () {
    //   //  main.css("transform", `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`);
    //   KFK.JC3.css("transform", `translate(${offsetX}px, ${offsetY}px)`);
    // }, 100);
};

KFK.___unsetSlideMask = function (page) {
    $(".slidemask").remove();
};
KFK.___setSlideMask = function (pageIndex) {
    let pages = KFK.pageBounding.Pages;
    let jLeft = $(".maskLeft");
    let jTop = $(".maskTop");
    let jRight = $(".maskRight");
    let jBottom = $(".maskBottom");
    if (jLeft.length === 0) {
        let maskLeft = document.createElement("div");
        jLeft = $(maskLeft);
        jLeft.addClass("maskLeft slidemask");
        jLeft.css({
            "background-color": "black",
            position: "absolute",
            "z-index": 1000000000,
        });
        KFK.C3.appendChild(maskLeft);
    }
    if (jTop.length === 0) {
        let maskTop = document.createElement("div");
        jTop = $(maskTop);
        jTop.addClass("maskTop slidemask");
        jTop.css({
            "background-color": "black",
            position: "absolute",
            "z-index": 1000000000,
        });
        KFK.C3.appendChild(maskTop);
    }
    if (jRight.length === 0) {
        let maskRight = document.createElement("div");
        jRight = $(maskRight);
        jRight.addClass("maskRight slidemask");
        jRight.css({
            "background-color": "black",
            position: "absolute",
            "z-index": 1000000000,
        });
        KFK.C3.appendChild(maskRight);
    }
    if (jBottom.length === 0) {
        let maskBottom = document.createElement("div");
        jBottom = $(maskBottom);
        jBottom.addClass("maskBottom slidemask");
        jBottom.css({
            "background-color": "black",
            position: "absolute",
            "z-index": 1000000000,
        });
        KFK.C3.appendChild(maskBottom);
    }

    jLeft.css({
        left: `-${KFK.LeftB}px`,
        top: `-${KFK.TopB}px`,
        width: KFK.px(pages[pageIndex].left + KFK.LeftB),
        height: KFK.px(KFK._height + 2 * KFK.TopB),
    });
    jTop.css({
        left: `-${KFK.LeftB}px`,
        top: `-${KFK.TopB}px`,
        width: KFK.px(KFK._width + 2 * KFK.LeftB),
        height: KFK.px(pages[pageIndex].top + KFK.TopB),
    });
    jRight.css({
        left: KFK.px(pages[pageIndex].left + KFK.PageWidth),
        top: `-${KFK.TopB}px`,
        width: KFK.px(
            (KFK.PageNumberHori - (pageIndex % KFK.PageNumberHori) - 1) *
            KFK.PageWidth +
            KFK.LeftB
        ),
        height: KFK.px(KFK._height + 2 * KFK.TopB),
    });
    jBottom.css({
        left: `-${KFK.LeftB}px`,
        top: KFK.px(pages[pageIndex].top + KFK.PageHeight),
        width: KFK.px(KFK._width + 2 * KFK.LeftB),
        height: KFK.px(
            (KFK.PageNumberVert - Math.floor(pageIndex / KFK.PageNumberHori) - 1) *
            KFK.PageHeight +
            KFK.TopB
        ),
    });
};

KFK.toggleOverview = function (jc3MousePos) {
    if (KFK.inPresentingMode) return;
    let main = $("#C1");
    let scroller = $("#S1");
    let scrCenter = KFK.scrCenter();
    let window_width = scrCenter.x * 2;
    let window_height = scrCenter.y * 2;
    KFK.APP.setData("show", "actionlog", false);
    if (KFK.inOverviewMode === true) {
        KFK.scrLog("");
        KFK.restoreDIVsWithStatus(['.msgInputWindow', '#coco_chat', '#system_message']);

        let cbkg = $("#containerbkg");
        if (KFK.rememberGrid !== "") cbkg.addClass(KFK.rememberGrid);

        KFK.JC3.css({
            "transform-origin": "0px 0px",
            "-webkit-transform-origin": "0px 0px",
            transform: `scale(1, 1)`,
        });
        KFK.scaleRatio = 1;
        if (jc3MousePos !== undefined) {
            KFK.scrollToPos({
                x: jc3MousePos.x - scrCenter.x + KFK.LeftB,
                y: jc3MousePos.y - scrCenter.y + KFK.TopB,
            });
        }
        KFK.unmaskScreen();
        KFK.inOverviewMode = false;
        if (KFK.inFullScreenMode === false) KFK.restoreLayoutDisplay();
    } else {
        if (KFK.inFullScreenMode === false) {
            KFK.setLayoutDisplay({
                showgrid: false,
                minimap: false,
                toplogo: false,
                docHeaderInfo: false,
                rtcontrol: false,
                left: false,
                right: false,
            });
        }
        KFK.hideDIVsWithStatus(['.msgInputWindow', '#coco_chat', '#system_message']);
        $('#lineExpand').addClass('noshow');
        let cbkg = $("#containerbkg");
        KFK.rememberGrid = cbkg.hasClass("grid1") ?
            "grid1" :
            cbkg.hasClass("grid2") ?
                "grid2" :
                "";
        if (KFK.rememberGrid !== "") cbkg.removeClass(KFK.rememberGrid);

        KFK.scrollPosToRemember = {
            x: scroller.scrollLeft(),
            y: scroller.scrollTop(),
        };
        let scaleX = window_width / KFK._width;
        let scaleY = window_height / KFK._height;
        let scale = Math.min(scaleX, scaleY);
        let scaledW = scale * KFK._width;
        let scaledH = scale * KFK._height;

        let offsetX = Math.round((window_width - scaledW) * 0.5) / scale;
        let offsetY = Math.round((window_height - scaledH) * 0.5) / scale;
        KFK.scrollToPos({
            x: KFK.LeftB,
            y: KFK.TopB,
        });
        KFK.JC3.css({
            "transform-origin": "0px 0px",
            "-webkit-transform-origin": "0px 0px",
        });
        KFK.JC3.css("transform", `scale(${scale}, ${scale})`);
        setTimeout(function () {
            KFK.JC3.css(
                "transform",
                `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`
            );
        }, 200);
        // main.css( "transform", `translate(${offsetX}px, ${offsetY}px)`)
        KFK.inOverviewMode = true;
        KFK.maskScreen();
        KFK.scrLog("进入全局要览: 要看哪里, 就双击哪里吧", 1000);
    }
};

KFK.scale = (ratio) => {
    if (KFK.inDesigner() === false || KFK.inOverviewMode || KFK.inPresentingMode) return;
    let scrCenterPoint = KFK.scrCenter();
    let jC3CenterOn = {
        x: KFK.scalePoint(KFK.scrXToJc3X(scrCenterPoint.x)),
        y: KFK.scalePoint(KFK.scrYToJc3Y(scrCenterPoint.y))
    };
    // console.log('JC3Center:', JSON.stringify(jC3CenterOn));
    KFK.JC3.css({
        "transform-origin": "0px 0px",
        "-webkit-transform-origin": "0px 0px",
    });
    KFK.JC3.css("transform", `scale(${ratio}, ${ratio})`);
    KFK.JCBKG.css({
        "transform-origin": "0px 0px",
        "-webkit-transform-origin": "0px 0px",
    });
    KFK.JCBKG.css("transform", `scale(${ratio}, ${ratio})`);
    KFK.scaleRatio = ratio;

    let tmpx = jC3CenterOn.x * KFK.scaleRatio + KFK.LeftB - scrCenterPoint.x;
    let tmpy = jC3CenterOn.y * KFK.scaleRatio + KFK.TopB - scrCenterPoint.y;
    // console.log('scrollTo:', tmpx, tmpy);

    KFK.scrollToPos({
        x: tmpx,
        y: tmpy
    });
};

KFK.maskScreen = function () {
    let mask = document.createElement("div");
    let jmask = $(mask);
    jmask.width(KFK._width);
    jmask.height(KFK._height);
    jmask.addClass("mask");
    // jmask.appendTo(KFK.JC3);
    KFK.C3.appendChild(mask);
};
KFK.unmaskScreen = function () {
    KFK.JC3.find(".mask").remove();
};

KFK.printCallStack = function (msg = "") {
    KFK.info(new Error(msg).stack);
};

KFK.closeActionLog = function () {
    KFK.APP.setData("show", "actionlog", false);
};

KFK.showActionLog = function () {
    if (!KFK.APP.show.actionlog) {
        KFK.getActionLog();
    }
    KFK.APP.setData("show", "actionlog", !KFK.APP.show.actionlog);
};

KFK.getActionLog = function () {
    KFK.debug("refresh actionlog now");
    KFK.sendCmd("GETBLKOPS", {
        doc_id: KFK.APP.model.cocodoc.doc_id
    });
};

KFK.navActionLog = function (item, direction) {
    if (item.logs.length === 0) {
        KFK.debug("no logs");
        return;
    }
    if (direction === "first") {
        //go left
        item.pos = 0;
    } else if (direction === "prev") {
        //go left
        item.pos = item.pos - 1;
        if (item.pos < 0) {
            item.pos = item.logs.length - 1;
        }
    } else if (direction === "next") {
        item.pos = item.pos + 1;
        if (item.pos >= item.logs.length) {
            item.pos = 0;
        }
    } else if (direction === "last") {
        item.pos = item.logs.length - 1;
    }
    let nodeid = item.logs[item.pos];
    KFK.scrollToNodeById(nodeid);
};

KFK.actionLogFirst = function () {
    if (KFK.actionLogToView.actionlog.length > 0) {
        KFK.actionLogToViewIndex = 0;
        KFK.actionLogGoto(KFK.actionLogToViewIndex);
    }
};
KFK.actionLogLast = function () {
    if (KFK.actionLogToView.actionlog.length > 0) {
        KFK.actionLogToViewIndex = KFK.actionLogToView.actionlog.length - 1;
        KFK.actionLogGoto(KFK.actionLogToViewIndex);
    }
};
//滚动到某个对象上,并把这个对象放在屏幕中央
KFK.scrollToNodeById = function (nodeid) {
    let jqDIV = $(`#${nodeid}`);
    if (jqDIV.length <= 0) {
        KFK.warn("node ", nodeid, "not found");
        return;
    }
    jqDIV = jqDIV.first();
    KFK.scrollToNode(jqDIV);
};

KFK.scrollToNode = (jqDIV) => {
    let top = KFK.divTop(jqDIV);
    let left = KFK.divLeft(jqDIV);
    let width = KFK.divWidth(jqDIV);
    let height = KFK.divHeight(jqDIV);
    let pos = {
        x: left + width * 0.5,
        y: top + height * 0.5
    };

    KFK.scrollContainer = $("#S1");
    let scrollX = pos.x * KFK.scaleRatio + KFK.LeftB - $(window).width() * 0.5;
    let scrollY = pos.y * KFK.scaleRatio + KFK.TopB - $(window).height() * 0.5;
    KFK.scrollToPos({
        x: scrollX,
        y: scrollY,
    });

    if (KFK.lastActionLogJqDIV != null && KFK.lastActionLogJqDIV !== jqDIV)
        KFK.lastActionLogJqDIV.removeClass("shadow1");
    jqDIV.addClass("shadow1");
    KFK.lastActionLogJqDIV = jqDIV;
    // KFK.scrollContainer.animate({ // animate your right div
    //     scrollTop: 300 // to the position of the target
    // }, 400);
};

KFK.upgradeToStartAccount = function () {
    // KFK.toBeUpgradeDemoAccount = JSON.parse(
    //   JSON.stringify(KFK.APP.model.cocouser)
    // );
    KFK.gotoRegister();
};

KFK.isMyDoc = () => {
    return KFK.APP.model.cocouser.userid === KFK.APP.model.cocodoc.owner;
};

KFK.showCopyDocDialog = (doc) => {
    KFK.tobeCopyDocId = doc._id;
    KFK.setAppData("model", "copyToDocName", doc.name);
    KFK.setAppData(
        "model",
        "showCopyOrMove",
        doc.owner === KFK.APP.model.cocouser.userid
    );
    KFK.showDialog({
        copyDocDialog: true
    });
};

KFK.showSetAclDialog = (doc) => {
    KFK.showDialog({
        setAclDialog: true
    });
};

KFK.showPublishDialog = (doc) => {
    KFK.APP.tobePublishDoc = doc;
    KFK.APP.model.publish.name = doc.name;
    KFK.showDialog({
        publishDialog: true
    });
};

KFK.publishDoc = () => {
    if (KFK.APP.model.publish.priceForRead < 0) {
        KFK.APP.model.publish.priceForRead = 0;
    }
    if (KFK.APP.model.publish.allowCopy &&
        KFK.APP.model.publish.priceForCopy < 0) {
        KFK.APP.model.publish.priceForCopy = 0;
    }
    KFK.sendCmd("PUBLISH", {
        doc_id: KFK.APP.tobePublishDoc._id,
        name: KFK.APP.model.publish.name,
        tags: KFK.APP.model.publish.tags,
        allowCopy: KFK.APP.model.publish.allowCopy,
        price1: KFK.APP.model.publish.priceForRead,
        price2: KFK.APP.model.publish.priceForCopy,
        desc: KFK.APP.model.publish.desc,
    });
};

KFK.stopPub = (pub, index) => {
    KFK.sendCmd("STOPPUB", {
        doc_id: pub._id,
    });
    KFK.APP.model.pubs.splice(index, 1);
};

KFK.setAcl = async () => {
    let desc = {
        S: "仅发起人",
        O: "所在组织",
        P: "公开使用",
    };
    KFK.APP.model.currentDoc.acl_desc = desc[KFK.APP.model.currentDoc.acl];
    await KFK.sendCmd("SETACL", {
        doc_id: KFK.APP.model.currentDoc._id,
        acl: KFK.APP.model.currentDoc.acl,
    });
};

KFK.copyDoc = () => {
    let newname = KFK.APP.model.copyToDocName;
    if (Validator.validateDocName(newname)) {
        let payload = {
            fromDocId: KFK.tobeCopyDocId,
            toPrjId: KFK.APP.model.copyToPrjId,
            toName: KFK.APP.model.copyToDocName,
            copyOrMove: KFK.APP.model.check.copyOrMove,
        };
        KFK.sendCmd("COPYDOC", payload);
        KFK.APP.state.copydoc.name = true;
    } else {
        KFK.scrLog("新文档名不符合要求");
        KFK.APP.state.copydoc.name = false;
    }
};

KFK.onLinkConnect = async function (data) {
    let selectorFrom = `#${response.from}`;
    let selectorTo = `#${response.to}`;
    let nodeFrom = $(selectorFrom);
    let nodeTo = $(selectorTo);
    if (nodeFrom.length > 0 && nodeTo.length > 0) {
        KFK.drawPathBetween(nodeFrom, nodeTo);
        KFK.buildConnectionBetween(nodeFrom, nodeTo);
    }
};

KFK.showSetProfileDialog = function () {
    let profile = {
        name: KFK.APP.model.cocouser.name,
        avatar: KFK.APP.model.cocouser.avatar,
        oldpwd: "",
        newpwd: "",
        newpwd2: "",
    };
    KFK.APP.state.profile.name = null;
    KFK.APP.state.profile.oldpwd = null;
    KFK.APP.state.profile.newpwd = null;
    KFK.APP.state.profile.newpwd2 = null;
    KFK.setAppData("model", "profileToSet", profile);
    KFK.showDialog({
        setProfileDialog: true
    });
};

KFK.setUserProfile = function (bvModalEvt) {
    bvModalEvt.preventDefault();
    KFK.handleProfileSubmit();
};

KFK.handleProfileSubmit = function () {
    KFK.APP.state.profile.name = Validator.validateUserName(
        KFK.APP.model.profileToSet.name
    );
    KFK.APP.state.profile.oldpwd = Validator.validateUserPassword(
        KFK.APP.model.profileToSet.oldpwd
    );
    KFK.APP.state.profile.newpwd = true;
    KFK.APP.state.profile.newpwd2 = true;
    //修改Profile时，新密码可以为空，则表示不修改密码，
    if (KFK.APP.model.profileToSet.newpwd.trim() !== "") {
        KFK.APP.state.profile.newpwd = Validator.validateUserPassword(
            KFK.APP.model.profileToSet.newpwd
        );
        KFK.APP.state.profile.newpwd2 = Validator.validateUserPassword(
            KFK.APP.model.profileToSet.newpwd2
        );
    }
    KFK.APP.state.profile.newpwd2 =
        KFK.APP.model.profileToSet.newpwd === KFK.APP.model.profileToSet.newpwd2;

    if (
        KFK.APP.state.profile.name &&
        KFK.APP.state.profile.oldpwd &&
        KFK.APP.state.profile.newpwd &&
        KFK.APP.state.profile.newpwd2
    ) {
        KFK.sendCmd("SETPROFILE", KFK.APP.model.profileToSet);
        KFK.showDialog({
            setProfileDialog: false
        });
    } else {
        KFK.scrLog("录入信息不符合要求");
        return;
    }
};

KFK.addSvgLayer = function () {
    KFK.svgDraw && delete KFK.svgDraw;
    KFK.svgDraw = SVG().addTo("#C3").size(KFK._width, KFK._height);
    KFK.svgDraw.attr("id", "D3");
    KFK.svgDraw.addClass("svgcanvas");
    KFK.debug("svg layer initialized");
    KFK.pageBounding = {
        Pages: []
    };
    let boundingLineOption = {
        color: "#FFFFFFCC",
        width: 4,
        linecap: "square",
    };
    for (let i = 0; i < KFK.PageNumberVert; i++) {
        for (let j = 0; j < KFK.PageNumberHori; j++) {
            KFK.pageBounding.Pages.push({
                left: j * KFK.PageWidth,
                top: i * KFK.PageHeight,
            });
        }
    }
    for (let i = 0; i <= KFK.PageNumberHori; i++) {
        let tmpLine = KFK.svgDraw.line(
            i * KFK.PageWidth,
            0,
            i * KFK.PageWidth,
            KFK._height
        );
        tmpLine.addClass("pageBoundingLine").stroke(boundingLineOption);
        if (KFK.APP.model.viewConfig.showbounding === false) {
            tmpLine.addClass('noshow');
        }
    }
    for (let j = 0; j <= KFK.PageNumberVert; j++) {
        let tmpLine = KFK.svgDraw.line(
            0,
            j * KFK.PageHeight,
            KFK._width,
            j * KFK.PageHeight
        );
        tmpLine.addClass("pageBoundingLine").stroke(boundingLineOption);
        if (KFK.APP.model.viewConfig.showbounding === false) {
            tmpLine.addClass('noshow');
        }
    }
};

KFK.restoreShape = function (shape_id, html) {
    let aLine = null;
    let selector = `.${shape_id}`;
    aLine = KFK.svgDraw.findOne(selector);
    if (aLine === null || aLine === undefined) {
        aLine = KFK.svgDraw.line();
    }
    let parent = aLine.svg(html, true);
    aLine = parent.findOne(selector);
    KFK.addShapeEventListner(aLine);
    return aLine;
};

KFK.makePath = function (p1, p2) {
    let rad = 10;
    let c1 = {
        x: p2.x - rad,
        y: p1.y
    };
    let c2 = {
        x: p2.x,
        y: p1.y + rad
    };

    let pStr = `M${p1.x} ${p1.y} H${c1.x} S${c2.x} ${c1.y} ${c2.x} ${c2.y} V${p2.y}`;
    return pStr;
};

KFK._svgDrawNodesConnect = function (
    fid,
    tid,
    lineClass,
    lineClassReverse,
    pstr,
    triangle
) {
    let theConnect = null;
    let reverseLine = KFK.svgDraw.findOne(`.${lineClassReverse}`);
    let oldLine = KFK.svgDraw.findOne(`.${lineClass}`);
    let reverseTriangle = KFK.svgDraw.findOne(`.${lineClassReverse}_triangle`);
    let oldTriangle = KFK.svgDraw.findOne(`.${lineClass}_triangle`);
    if (oldLine) {
        oldLine.plot(pstr);
        oldTriangle.plot(triangle);
        theConnect = oldLine;
    } else {
        if (reverseLine) {
            reverseLine.removeClass(lineClassReverse);
            reverseLine.addClass(lineClass);
            reverseLine.plot(pstr);
            reverseTriangle.removeClass(lineClassReverse + "_triangle");
            reverseTriangle.addClass(lineClass + "_triangle");
            reverseTriangle.plot(triangle);
            theConnect = reverseLine;
        } else {
            theConnect = KFK.svgDraw.path(pstr);
            theConnect
                .addClass(lineClass)
                .addClass("connect")
                .fill("none")
                .stroke({
                    width: KFK.APP.model.svg.connect.width,
                    color: KFK.YIQColorAux || KFK.APP.model.svg.connect.color,
                });
            KFK.svgDraw
                .polygon(triangle)
                .addClass(lineClass + "_triangle")
                .addClass("triangle")
                .fill(KFK.YIQColorAux)
                .stroke({
                    width: KFK.APP.model.svg.connect.triangle.width,
                    color: KFK.APP.model.svg.connect.triangle.color,
                });
            theConnect.attr({
                id: lineClass,
                "origin-width": KFK.APP.model.svg.connect.width,
            });
        }
    }
    theConnect.attr({
        fid: fid,
        tid: tid,
    });
    theConnect.off("mouseover mouseout");
    theConnect.on("mouseover", () => {
        theConnect.attr("stroke-width", KFK.APP.model.svg.connect.width * 2);
        KFK.hoveredConnectId = theConnect.attr("id");
        KFK.AI('hover_connect');
        KFK.debug("hover connect id", KFK.hoveredConnectId);
        KFK.onC3 = true;
    });
    theConnect.on("mouseout", () => {
        theConnect.attr("stroke-width", KFK.APP.model.svg.connect.width);
        KFK.hoveredConnectId = null;
    });
};
KFK.lockLine = function (line, lock = true) {
    if (lock) {
        let arr = line.array();
        let x1 = arr[0][0],
            y1 = arr[0][1],
            x2 = arr[1][0],
            y2 = arr[1][1];
        let r = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        let d = 10;
        let y3 = (d * (y2 - y1)) / r + y1;
        let x3 = (d * (x2 - x1)) / r + x1;
        let dot = KFK.svgDraw.circle(10);
        dot
            .center(x3, y3)
            .fill("red")
            .addClass(line.attr("id") + "_lock")
            .addClass("locklabel");
        dot.addTo(line.parent());
        return dot;
    } else {
        try {
            KFK.svgDraw.findOne("." + line.attr("id") + "_lock").remove();
        } catch (err) { }
    }
};

KFK.svgDrawShape = function (shapeType, id, fx, fy, tx, ty, option) {
    if (KFK.APP.model.viewConfig.snap) {
        let p1 = {
            x: fx,
            y: fy
        };
        let p2 = {
            x: tx,
            y: ty
        };
        p1 = KFK.getNearGridPoint(p1.x, p1.y);
        p2 = KFK.getNearGridPoint(p2.x, p2.y);
        fx = p1.x;
        fy = p1.y;
        tx = p2.x;
        ty = p2.y;
    }
    let width = Math.abs(fx - tx);
    let height = Math.abs(fy - ty);
    let originX = Math.min(fx, tx);
    let originY = Math.min(fy, ty);
    let shapeClass = "kfkshape";
    let shapeId = "shape_" + id;
    let theShape = KFK.svgDraw.findOne(`#shape_${id}`);
    if (theShape) theShape.remove();
    if (shapeType === 'line') {
        theShape = KFK.svgDraw.line(fx, fy, tx, ty);
    } else if (shapeType === 'rectangle') {
        theShape = KFK.svgDraw.rect(width, height).fill('none').move(originX, originY);
    } else if (shapeType === 'ellipse') {
        theShape = KFK.svgDraw.ellipse(width, height).fill('none').move(originX, originY);
    }
    theShape.attr("id", shapeId);
    theShape.addClass(shapeClass).addClass(shapeId).addClass('kfk' + shapeType).stroke(option);
    theShape.attr("origin-width", option.width);
    theShape.attr("origin-color", option.color);
    KFK.addShapeEventListner(theShape);
    return theShape;
};

KFK.svgDrawPoly = function (shapeType, id, option) {
    let shapeClass = "kfkshape";
    let shapeId = "shape_" + id;
    let theShape = KFK.svgDraw.findOne(`.${shapeId}`);
    try {
        theShape.remove();
    } catch (error) {
        console.log(error);
    }


    let arr = [];
    for (let i = 0; i < KFK.drawPoints.length; i++) {
        arr.push([KFK.drawPoints[i].center.x, KFK.drawPoints[i].center.y]);
    }
    if (shapeType === 'polyline')
        theShape = KFK.svgDraw.polyline(arr).fill('none').stroke(option);
    else
        theShape = KFK.svgDraw.polygon(arr).fill('none').stroke(option);

    theShape.attr("id", shapeId);
    theShape.addClass(shapeClass).addClass(shapeId).addClass('kfk' + shapeType).stroke(option);
    theShape.attr("origin-width", option.width);
    theShape.attr("origin-color", option.color);
    // KFK.addShapeEventListner(theShape);
    return theShape;
};

KFK.svgDrawTmpShape = function (shapeType, fx, fy, tx, ty, option) {
    let tmpLineClass = "shape_temp";

    KFK.tempShape = KFK.svgDraw.findOne(`.${tmpLineClass}`);
    if (KFK.tempShape) {
        KFK.tempShape.remove();
    }
    let width = Math.abs(fx - tx);
    let height = Math.abs(fy - ty);
    let originX = Math.min(fx, tx);
    let originY = Math.min(fy, ty);
    if (shapeType === 'line') {
        KFK.tempShape = KFK.svgDraw.line(fx, fy, tx, ty).addClass(tmpLineClass).stroke(option);
    } else if (shapeType === 'rectangle') {
        KFK.tempShape = KFK.svgDraw.rect(width, height).move(originX, originY).fill('none').addClass(tmpLineClass).stroke(option);
    } else if (shapeType === 'ellipse') {
        KFK.tempShape = KFK.svgDraw.ellipse(width, height).move(originX, originY).fill('none').addClass(tmpLineClass).stroke(option);
    }
};

KFK.mouseNear = function (p1, p2, distance) {
    return (
        Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) <= distance
    );
};

KFK.moveDIVCenterToPos = function (jqDiv, pos) {
    jqDiv.css("left", pos.x - KFK.unpx(jqDiv.css("width")) * 0.5);
    jqDiv.css("top", pos.y - KFK.unpx(jqDiv.css("height")) * 0.5);
};
KFK.C3MousePos = function (evt) {
    return {
        x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
        y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY))
    };
};
KFK.ScreenMousePos = function (pos) {
    return {
        x: pos.x - KFK.scrollContainer.scrollLeft(),
        y: pos.y - KFK.scrollContainer.scrollTop(),
    };
};
KFK.hideLineTransformer = function () {
    KFK.hide($("#linetransformer"));
};
KFK.showLineTransformer = function () {
    KFK.show($("#linetransformer"));
};
KFK.reverseColor = function (color) {
    if (color[0] === '#')
        color = color.substr(1);
    return '#' + (Number(`0x1${color}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
};
KFK.addShapeEventListner = function (theShape) {
    theShape.on("mouseover", (evt) => {
        if (KFK.shapeDragging || KFK.isFreeHandDrawing) return;
        KFK.hoverSvgLine(theShape);
        let color = theShape.attr("stroke");
        KFK.shapeOriginColor = color;
        let color1 = KFK.reverseColor(color);
        KFK.onC3 = true;
        KFK.AI('hover_line');
        let originWidth = theShape.attr("origin-width");
        let newWidth =
            originWidth > 10 ? originWidth * 1.2 : Math.max(originWidth * 1.2, 5);
        theShape.attr({
            "stroke-width": newWidth
        });
        theShape.attr("stroke", color1);
        if (KFK.lineLocked(theShape)) {
            KFK.hide($("#linetransformer"));
            return;
        }

        $(document.body).css("cursor", "pointer");
        if (theShape.array && theShape.hasClass("kfkline")) {
            let parr = theShape.array();
            if (
                KFK.mouseNear(KFK.C3MousePos(evt), {
                    x: parr[0][0],
                    y: parr[0][1]
                }, 20)
            ) {
                KFK.show("#linetransformer");
                KFK.moveLinePoint = "from";
                KFK.lineToResize = theShape;
                KFK.AI('line_transformer');
                KFK.setShapeToRemember(theShape);
                KFK.moveLineMoverTo(KFK.jc3PosToJc1Pos({
                    x: parr[0][0],
                    y: parr[0][1]
                }));
            } else if (
                KFK.mouseNear(KFK.C3MousePos(evt), {
                    x: parr[1][0],
                    y: parr[1][1]
                }, 20)
            ) {
                KFK.show("#linetransformer");
                KFK.moveLinePoint = "to";
                KFK.lineToResize = theShape;
                KFK.AI('line_transformer');
                KFK.setShapeToRemember(theShape);
                KFK.moveLineMoverTo(KFK.jc3PosToJc1Pos({
                    x: parr[1][0],
                    y: parr[1][1]
                }));
            } else {
                KFK.hide("#linetransformer");
            }
        }
    });
    theShape.on("mouseout", () => {
        if (KFK.shapeDragging === false) {
            KFK.hoverSvgLine(null);
            $(document.body).css("cursor", "default");
            theShape.attr({
                "stroke-width": theShape.attr("origin-width")
            });
            theShape.attr("stroke", KFK.shapeOriginColor);
        }
    });
    theShape.on("mousedown", (evt) => {
        KFK.closeActionLog();

        KFK.mousePosToRemember = {
            x: KFK.currentMousePos.x,
            y: KFK.currentMousePos.y,
        };
        if ((evt.ctrlKey || evt.metaKey)) {
            KFK.isZoomingShape = true;
            KFK.shapeToZoom = theShape;
            KFK.setShapeToRemember(theShape);
            KFK.shapeSizeCenter = {
                x: KFK.scalePoint(theShape.cx()),
                y: KFK.scalePoint(theShape.cy())
            }
            KFK.shapeSizeOrigin = {
                w: theShape.width(),
                h: theShape.height(),
            }
            KFK.shapeZoomStartPoint = {
                x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
                y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
            };
            let dis = KFK.distance(KFK.shapeSizeCenter,
                KFK.shapeZoomStartPoint);
        } else {
            KFK.isZoomingShape = false;
            KFK.shapeToDrag = theShape;
            KFK.setShapeToRemember(theShape);
            KFK.shapeDraggingStartPoint = {
                x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
                y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
            };
        }
    });
    theShape.on("mouseup", (evt) => {
        KFK.stopZoomShape();
    });
    //click line
    theShape.on("click", (evt) => {
        evt.stopImmediatePropagation();
        evt.stopPropagation();
        evt.preventDefault();
        KFK.hoverSvgLine(theShape);
        if (KFK.anyLocked(theShape)) return;
        // if (KFK.firstShown['right'] === false && KFK.docIsNotReadOnly()) {
        // KFK.show('#right');
        // KFK.firstShown['right'] = true;
        // }
        if (KFK.mode === "lock") {
            KFK.tryToLockUnlock(evt.shiftKey);
        }
        // KFK.shapeToDrag = null;
        KFK.focusOnNode(null);
        KFK.APP.setData("show", "shape_property", true);
        KFK.APP.setData("show", "customshape", false);
        KFK.APP.setData("show", "customline", true);
        KFK.APP.setData("show", "custombacksvg", false);
        KFK.APP.setData("show", "customfont", false);
        KFK.APP.setData("show", "layercontrol", false);

        KFK.setShapeToRemember(theShape);

        KFK.pickedShape = theShape;
        // KFK.setRightTabIndex();
        let color = theShape.attr("stroke");
        let width = theShape.attr("origin-width");
        let linecap = theShape.attr("stroke-linecap");
        $("#lineColor").spectrum("set", KFK.shapeOriginColor);
        $("#spinner_line_width").spinner("value", width);
        let lineSetting = KFK.APP.model.svg.connect.line;
        lineSetting = {
            color: color,
            width: width,
            linecap: linecap === "round" ? true : false,
        };
        KFK.setAppData("model", "line", lineSetting);
    });
};

KFK.zoomShape = function (evt) {
    let zoomTo = {
        x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
        y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
    };
    let dis_1 = KFK.distance(KFK.shapeZoomStartPoint, KFK.shapeSizeCenter);
    let dis_2 = KFK.distance(zoomTo, KFK.shapeSizeCenter);
    let delta = 3 * (dis_2 - dis_1);
    KFK.DivStyler ? KFK.DivStyler.zoom('in', delta) :
        import('./divStyler').then((pack) => {
            KFK.DivStyler = pack.DivStyler;
            KFK.DivStyler.zoom('in', delta);
        });
};
KFK.stopZoomShape = async function () {
    if (KFK.isZoomingShape) {
        KFK.isZoomingShape = false;
        KFK.morphedShape = null;
        if ((KFK.shapeToZoom.width() !== KFK.shapeToRemember.width()) ||
            (KFK.shapeToZoom.height() !== KFK.shapeToZoom.height()))
            await KFK.syncLinePut("U", KFK.shapeToZoom, "resize", KFK.shapeToRemember, false);
    }
};

KFK.initLineTransformer = function () {
    KFK.debug("...initLineTransformer");
    $("#linetransformer").draggable({
        // move line resize line transform line
        start: (evt, ui) => {
            KFK.closeActionLog();
            KFK.lineTransfomerDragging = true;
            // KFK.fromJQ = KFK.tobeTransformJqLine.clone();
            // KFK.setMode('line');
            evt.stopImmediatePropagation();
            evt.stopPropagation();
        },

        drag: (evt, ui) => {
            if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
            if (KFK.lineToResize === null) return;
            let parr = KFK.lineToResize.array();
            let stopAtPos = KFK.C3MousePos(evt);
            if (KFK.moveLinePoint === "from") {
                KFK.lineToResize.plot([
                    [stopAtPos.x, stopAtPos.y], parr[1]
                ]);
            } else {
                KFK.lineToResize.plot([parr[0],
                [stopAtPos.x, stopAtPos.y]
                ]);
            }
        },
        stop: async (evt, ui) => {
            //transform line  change line
            KFK.lineTransfomerDragging = false;
            if (KFK.lineToResize === null) return;
            KFK.setShapeToRemember(KFK.lineToResize);
            let parr = KFK.lineToResize.array();
            let stopAtPos = KFK.C3MousePos(evt);
            if (KFK.APP.model.viewConfig.snap) {
                stopAtPos = KFK.getNearGridPoint(stopAtPos);
                let smp = KFK.ScreenMousePos(stopAtPos);
                KFK.moveDIVCenterToPos($("#linetransformer"), smp);
            }
            if (KFK.moveLinePoint === "from") {
                KFK.lineToResize.plot([
                    [stopAtPos.x, stopAtPos.y], parr[1]
                ]);
            } else {
                KFK.lineToResize.plot([parr[0],
                [stopAtPos.x, stopAtPos.y]
                ]);
            }
            await KFK.syncLinePut("U", KFK.lineToResize, "resize", KFK.shapeToRemember, false);
            KFK.hide("#linetransformer");
        },
    }); //line transformer. draggable()
};

KFK.svgDrawTmpLine = function (fx, fy, tx, ty, option) {
    let tmpLineClass = "shape_temp";

    //按着alt的话，需要画成垂直或水平线
    if (KFK.KEYDOWN.alt) {
        if (Math.abs(tx - fx) < Math.abs(ty - fy)) tx = fx;
        else ty = fy;
    }
    KFK.tempSvgLine = KFK.svgDraw.findOne(`.${tmpLineClass}`);
    if (KFK.tempSvgLine) {
        KFK.tempSvgLine.show();
        KFK.tempSvgLine.plot(fx, fy, tx, ty).stroke(option);
    } else {
        KFK.tempSvgLine = KFK.svgDraw
            .line(fx, fy, tx, ty)
            .addClass(tmpLineClass)
            .stroke(option);
    }
};

KFK.svgConnectNode = function (fid, tid, fbp, tbp, fx, fy, tx, ty) {
    if (!(fid && tid)) {
        KFK.debug("svgConnectNode between, from", fid, "to", tid);
        return;
    }
    let lineClass = `connect_${fid}_${tid}`;
    let lineClassReverse = `connect_${tid}_${fid}`;
    let pstr = "";
    let triangle = [];
    let rad = 20;
    let tri = 20;
    let tri_half = tri * 0.5;
    let tri_height = 17.3;
    let tsx = tx,
        tsy = ty - tri_height;
    switch (tbp) {
        case 0:
            tsx = tx - tri_height;
            tsy = ty;
            triangle = [tsx, tsy + tri_half, tx, ty, tsx, tsy - tri_half];
            break;
        case 1:
            tsx = tx;
            tsy = ty - tri_height;
            triangle = [tsx - tri_half, tsy, tx, ty, tsx + tri_half, tsy];
            break;
        case 2:
            tsx = tx + tri_height;
            tsy = ty;
            triangle = [tsx, tsy - tri_half, tx, ty, tsx, tsy + tri_half];
            break;
        case 3:
            tsx = tx;
            tsy = ty + tri_height;
            triangle = [tsx - tri_half, tsy, tx, ty, tsx + tri_half, tsy];
            break;
    }
    switch (fbp) {
        case 0:
            switch (tbp) {
                case 0:
                    pstr = `M${fx} ${fy} C${fx - rad} ${fy} ${
                        tx - rad
                        } ${ty} ${tx} ${ty}`;
                    break;
                case 1:
                    pstr = `M${fx} ${fy} C${tx} ${fy} ${tx} ${ty} ${tx} ${ty}`;
                    break;
                case 2:
                    pstr = `M${fx} ${fy} C${tx} ${fy} ${fx} ${ty} ${tx} ${ty}`;
                    break;
                case 3:
                    pstr = `M${fx} ${fy} C${tx} ${fy} ${tx} ${ty} ${tx} ${ty}`;
                    break;
            }
            break;
        case 1:
            switch (tbp) {
                case 0:
                    pstr = `M${fx} ${fy} C${fx} ${ty} ${tx} ${ty} ${tx} ${ty}`;
                    break;
                case 1:
                    pstr = `M${fx} ${fy} C${fx} ${ty - rad} ${tx} ${
                        ty - rad
                        } ${tx} ${ty}`;
                    break;
                case 2:
                    pstr = `M${fx} ${fy} C${fx} ${ty} ${tx} ${ty} ${tx} ${ty}`;
                    break;
                case 3:
                    pstr = `M${fx} ${fy} C${fx} ${ty} ${tx} ${fy} ${tx} ${ty}`;
                    break;
            }
            break;
        case 2:
            switch (tbp) {
                case 0:
                    pstr = `M${fx} ${fy} C${tx} ${fy} ${fx} ${ty} ${tx} ${ty}`;
                    break;
                case 1:
                    pstr = `M${fx} ${fy} C${tx} ${fy} ${tx} ${ty} ${tx} ${ty}`;
                    break;
                case 2:
                    pstr = `M${fx} ${fy} C${fx + rad} ${fy} ${
                        tx + rad
                        } ${ty} ${tx} ${ty}`;
                    break;
                case 3:
                    pstr = `M${fx} ${fy} C${tx} ${fy} ${tx} ${ty} ${tx} ${ty}`;
                    break;
            }
            break;
        case 3:
            switch (tbp) {
                case 0:
                    pstr = `M${fx} ${fy} C${fx} ${ty} ${tx} ${ty} ${tx} ${ty}`;
                    break;
                case 1:
                    pstr = `M${fx} ${fy} C${fx} ${ty} ${tx} ${fy} ${tx} ${ty}`;
                    break;
                case 2:
                    pstr = `M${fx} ${fy} C${fx} ${ty} ${tx} ${ty} ${tx} ${ty}`;
                    break;
                case 3:
                    pstr = `M${fx} ${fy} C${fx} ${fy + rad} ${tx} ${
                        ty + rad
                        } ${tx} ${ty}`;
                    break;
            }
            break;
    }
    KFK._svgDrawNodesConnect(
        fid,
        tid,
        lineClass,
        lineClassReverse,
        pstr,
        triangle
    );
};

KFK.myFadeIn = function (jq, ms = 200) {
    jq &&
        jq
            .css({
                visibility: "visible",
                opacity: 0.0
            })
            .animate({
                opacity: 1.0
            }, ms);
};
KFK.myFadeOut = function (jq, ms = 200) {
    jq &&
        jq.animate({
            opacity: 0.0
        }, ms, function () {
            jq.css("visibility", "hidden");
        });
};
KFK.hide = function (jq) {
    if (typeof jq === 'string')
        jq = $(jq);
    jq.addClass('noshow');
};
KFK.show = function (jq) {
    if (typeof jq === 'string')
        jq = $(jq);
    jq.removeClass('noshow');
};
/**
 * Is a div visible, visible means it has not 'noshow' class
 */
KFK.isShowing = function (jq) {
    if (typeof jq === 'string')
        jq = $(jq);
    return jq.hasClass('noshow') === false;
};

/* View in fullscreen */
KFK.openFullscreen = function () {
    if (KFK.fsElem.requestFullscreen) {
        KFK.fsElem.requestFullscreen();
    } else if (KFK.fsElem.mozRequestFullScreen) {
        /* Firefox */
        KFK.fsElem.mozRequestFullScreen();
    } else if (KFK.fsElem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        KFK.fsElem.webkitRequestFullscreen();
    } else if (KFK.fsElem.msRequestFullscreen) {
        /* IE/Edge */
        KFK.fsElem.msRequestFullscreen();
    }
};

/* Close fullscreen */
KFK.closeFullscreen = function () {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }
    } catch (error) { }
};

KFK.showIvtCodeDialog = function () {
    KFK.showDialog({
        ivtCodeDialog: true
    });
};

KFK.initQuillFonts = function () {
    KFK.customQuillFonts = [{
        key: "arial",
        family: "Arial",
        label: "Arial",
    },
    {
        key: "courier",
        family: "Courier",
        label: "Courier",
    },
    {
        key: "impact",
        family: "Impact",
        label: "Impact",
    },
    {
        key: "garamond",
        family: "Garamond",
        label: "Garamond",
    },
    {
        key: "tahoma",
        family: "Tahoma",
        label: "Tahoma",
    },
    {
        key: "times-new-roman",
        family: "Times New Roman",
        label: "TimesNewRoman",
    },
    {
        key: "verdana",
        family: "Verdana",
        label: "Verdana",
    },
    {
        key: "microsoft-yahei",
        family: "Microsoft Yahei",
        label: "微软雅黑",
    },
    {
        key: "heiti",
        family: "STHeiti",
        label: "黑体",
        variants: "SimHei",
    },
    {
        key: "kaiti",
        family: "STKaiti",
        label: "楷体",
        variants: "KaiTi",
    },
    {
        key: "songti",
        family: "STSong",
        label: "宋体",
        variants: "SimSun",
    },
    {
        key: "fangsong",
        family: "STFangsong",
        label: "仿宋",
        variants: "FangSong",
    },
    {
        key: "pmingliu",
        family: "PMingLiU",
        label: "新细明体",
        variants: "STXihei",
    },
    {
        key: "lisu",
        family: "LiSu",
        label: "隶书",
        variants: "STKaiti",
    },
    {
        key: "youyuan",
        family: "YouYuan",
        label: "幼圆",
        variants: "STKaiti",
    },
    {
        key: "fzyaoti",
        family: "FZYaoti",
        label: "方正姚体",
        variants: "STKaiti",
    },
    {
        key: "stxingkai",
        family: "STXingkai",
        label: "华文行楷",
        variants: "STKaiti",
    },
    {
        key: "stxinwei",
        family: "STXinwei",
        label: "华文新魏",
        variants: "STKaiti", //variants中可以多个，用逗号分开，有空格的要加单引号
    },
    ];
    // generate code friendly names
    KFK.customQuillFontNames = KFK.customQuillFonts.map((fontDef) => fontDef.key);
    // add fonts to style
    var fontStyles = "";
    KFK.customQuillFonts.forEach(function (fontDef) {
        var fontName = fontDef.key;
        var fontVariants = fontDef.variants ? fontDef.variants + ", " : "";
        fontStyles +=
            ".ql-snow .ql-picker.ql-font .ql-picker-label[data-value=" +
            fontName +
            "]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=" +
            fontName +
            "]::before {" +
            "content: '" +
            fontDef.label +
            "';" +
            "font-family: '" +
            fontDef.family +
            "', " +
            fontVariants +
            "sans-serif;" +
            "}" +
            ".ql-font-" +
            fontName +
            "{" +
            " font-family: '" +
            fontDef.family +
            "', " +
            fontVariants +
            "sans-serif;" +
            "}";
    });
    var node = document.createElement("style");
    node.innerHTML = fontStyles;
    document.body.appendChild(node);
};

KFK.checkBrowser = function () {
    const browser = Bowser.getParser(window.navigator.userAgent);
    let isValidBrowser = browser.satisfies({
        // or in general
        chrome: ">70",
        edge: ">70",
    });
    KFK.setAppData("model", "isValidBrowser", isValidBrowser);
    KFK.setAppData("model", "isNotValidBrowser", !isValidBrowser);
    KFK.APP.model.osName = browser.getOSName(true);
    KFK.debug("isValidBrowser", isValidBrowser);
};

KFK.exportPDF = function () {
    try {
        html2canvas(document.body, {
            onrendered: function (canvas) {
                document.body.appendChild(canvas);
            },
        });
    } catch (error) {
        console.error(error.message);
    }
};

KFK.exportPDF2 = function () {
    var html = KFK.JC3.html();
    var printWindow = window.open("", "", "height=400,width=800");
    printWindow.document.write("<html><head><title>DIV Contents</title>");
    printWindow.document.write("</head><body >");
    printWindow.document.write(html);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
};

KFK.onDropFiles = async function (files) {
    let aFile = files[0];
    if (aFile.type !== "image/png" && aFile.type !== "image/jpeg") {
        await KFK.onDropDocFile(aFile);
    } else {
        await KFK.onDropImage(aFile);
    }
};
KFK.onDropDocFile = async function (aFile) {
    KFK.scrLog("当前用户只能上传JPG或PNG格式图片");
    let fileData = new Blob(aFile);
    // Pass getBuffer to promise.
    var promise = new Promise(getBuffer(fileData));
    // Wait for promise to be resolved, or log error.
    promise.then(function (data) {
        // Here you can pass the bytes to another function.
        console.log(data);
    }).catch(function (err) {
        console.log('Error: ', err);
    });
};
KFK.getBuffer = function (fileData) {
    return function (resolve) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(fileData);
        reader.onload = function () {
            var arrayBuffer = reader.result
            var bytes = new Uint8Array(arrayBuffer);
            resolve(bytes);
        }
    }
}

KFK.onDropImage = async function (imageFile) {
    function onProgress(p) {
        KFK.scrLog(`正在为您准备图片, 请稍候${p}%`, 2000);
    }
    const options = {
        // maxSizeMB: 3,
        maxWidthOrHeight: Math.round(
            Math.min(KFK.PageHeight * 0.5, KFK.PageWidth * 0.5)
        ),
        useWebWorker: true,
        onProgress: onProgress,
    };
    try {
        const compressedImage = await imageCompression(imageFile, options);

        KFK.fileToUpload = compressedImage;
        await KFK.sendCmd("GETSTS", {
            stsFor: "drop"
        });
    } catch (error) {
        console.error(error);
    }
};

KFK.onGotSTS = function (response) {
    KFK.sts = response.credential;
    // KFK.uploadToQcloudCOS();
    if (response.stsFor === "drop") {
        KFK.uploadFileToQcloudCOS(KFK.fileToUpload);
    } else if (response.stsFor === "paste") {
        KFK.uploadFileToQcloudCOS(KFK.blobToPaste);
    }
};

KFK.procPasteBlob = async function (blob) {
    KFK.blobToPaste = blob;
    await KFK.sendCmd("GETSTS", {
        stsFor: "paste"
    });
};

KFK.makeImageDiv = async function (fileId, posx, posy, imgUrl) {
    let jqDIV = await KFK.placeNode(
        false, fileId, "textblock", "default", posx, posy, 100, 100, "", `<img src="${imgUrl} "/>`
    );
    await KFK.syncNodePut("C", jqDIV, "create image node", null, false, 0, 1);
};

KFK.getInputPrependImg = function () {
    if (NotSet(KFK.inputFor))
        return `<img src='${cocoConfig.frontend.url}/assets/chatmsg.svg'/>`;
    if (KFK.inputFor === 'chat')
        return `<img src='${cocoConfig.frontend.url}/assets/chatmsg.svg'/>`;
    else
        return `<img src='${cocoConfig.frontend.url}/assets/chatmsg.svg'/>`;
};

KFK.uploadFileToQcloudCOS = function (file) {
    let cos = new COS({
        getAuthorization: function (options, callback) {
            callback({
                TmpSecretId: KFK.sts.credentials.tmpSecretId, // 临时密钥的 tmpSecretId
                TmpSecretKey: KFK.sts.credentials.tmpSecretKey, // 临时密钥的 tmpSecretKey
                XCosSecurityToken: KFK.sts.credentials.sessionToken, // 临时密钥的 sessionToken
                StartTime: KFK.sts.startTime,
                ExpiredTime: KFK.sts.expiredTime,
            });
        },
    });
    let fileId = KFK.myuid();
    let fileName = fileId + "." + file.type.substr(file.type.indexOf("/") + 1);
    let fileKeyName = KFK.APP.model.cocouser.orgid + "/" + fileName;
    if (file.size > 1024 * 1024) {
        cos.sliceUploadFile({
            Bucket: cocoConfig.cos.bucket,
            Region: cocoConfig.cos.region,
            Key: fileKeyName,
            Body: file,
            onTaskReady: function (tid) {
                KFK.TaskId = tid;
            },
            onHashProgress: function (progressData) {
                console.log("onHashProgress", JSON.stringify(progressData));
            },
            onProgress: function (progressData) {
                console.log("onProgress", JSON.stringify(progressData));
            },
        },
            async function (err, data) {
                if (err) {
                    console.log("putObject got error:", err);
                } else {
                    console.log("putObject success:", data);
                    try {
                        let imgUrl =
                            "https://" +
                            cocoConfig.cos.reverseproxy +
                            data.Location.substr(data.Location.indexOf("/"));
                        await KFK.makeImageDiv(
                            fileId,
                            KFK.dropAtPos.x,
                            KFK.dropAtPos.y,
                            imgUrl
                        );
                        await KFK.refreshMatLibForAll();
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        );
    } else {
        // console.log( "Bebegin putObject, Bucket", cocoConfig.cos.bucket, "region", cocoConfig.cos.region, "Key", fileKeyName);
        cos.putObject({
            Bucket: cocoConfig.cos.bucket, // Bucket 格式：test-1250000000
            Region: cocoConfig.cos.region,
            Key: fileKeyName,
            Body: file,
            onTaskReady: function (tid) {
                KFK.TaskId = tid;
            },
            onHashProgress: function (progressData) {
                console.log("onHashProgress", JSON.stringify(progressData));
            },
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            },
        },
            async function (err, data) {
                if (err) {
                    console.log("putObject got error:", err);
                } else {
                    console.log("putObject success:", data);
                    try {
                        let imgUrl =
                            "https://" +
                            cocoConfig.cos.reverseproxy +
                            data.Location.substr(data.Location.indexOf("/"));
                        // console.log(data); console.log(imgUrl);
                        await KFK.makeImageDiv(
                            fileId,
                            KFK.dropAtPos.x,
                            KFK.dropAtPos.y,
                            imgUrl
                        );
                        await KFK.refreshMatLibForAll();
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        );
    }
};

/**
 * 360度放置后续节点， 
 * @param jdiv 原点节点
 * @param direction  f:left; v:left-bottom: c:bottom; x:right-bottom;s:right; w:left-top; e: top; r: right-top
 * @return thenew created node
 */
KFK.placeFollowerNode = async (jdiv, direction) => {
    if (NotSet(jdiv)) {
        KFK.warn('placeFollowerNode for undefined node, just return');
        return;
    }
    let cx = KFK.divCenter(jdiv);
    let cy = KFK.divMiddle(jdiv);
    let width = KFK.divWidth(jdiv);
    let height = KFK.divHeight(jdiv);
    let distance = width * 0.5;
    if (direction === 'f') {
        flwCx = cx + width + distance;
        flwCy = cy;
    } else if (direction === 'v') {
        flwCx = cx + width + distance;
        flwCy = cy + height + distance;
    } else if (direction === 'c') {
        flwCx = cx;
        flwCy = cy + height + distance;
    } else if (direction === 'x') {
        flwCx = cx - width - distance;
        flwCy = cy + height + distance;
    } else if (direction === 's') {
        flwCx = cx - width - distance;
        flwCy = cy;
    } else if (direction === 'w') {
        flwCx = cx - width - distance;
        flwCy = cy - height - distance;
    } else if (direction === 'e') {
        flwCx = cx;
        flwCy = cy - height - distance;
    } else if (direction === 'r') {
        flwCx = cx + width + distance;
        flwCy = cy - height - distance;
    }
    let newDIV = KFK.makeCloneDIV(
        jdiv, KFK.myuid(), {
        "left": flwCx - width * 0.5,
        "top": flwCy - height * 0.5
    });
    newDIV.appendTo(KFK.C3);
    await KFK.setNodeEventHandler(newDIV, async function () {
        await KFK.syncNodePut("C", newDIV, "new node", null, false, 0, 1);
        await KFK.LinkFromBrainCenter(newDIV);
    });
    return newDIV;
};

KFK.getFrontEndUrl = (obj) => {
    return cocoConfig.frontend.url + "/" + obj;
};

KFK.getBossImageUrl = (img) => {
    return cocoConfig.frontend.url + "/boss/" + img;
};

/**
 * 判断一个div是否存在
 * @param div 可以是一个jqdiv对象，也可以是一个jqdiv的id
 */
KFK.nodeExist = (div) => {
    //
    let jqObjById = null;
    if (typeof div === 'string') {
        jqObjById = $('#' + div);
    } else {
        jqObjById = $('#' + div.attr("id"));
    }
    if (jqObjById.length > 0) {
        return true;
    } else {
        return false;
    }
};
KFK.nodeNotExist = (jqdiv) => {
    return !KFK.nodeExist(jqdiv);
};

/**
 * 跳到当前脑图中心节点上
 */
KFK.jumpToBrain = async () => {
    await KFK.flushJumpStack();
    if (NotSet(KFK.brainstormFocusNode)) {
        // console.log("brain not set, just return");
        return;
    }
    let tmpIdx = KFK.jumpStack.indexOf(KFK.brainstormFocusNode);
    if (tmpIdx < 0) {
        KFK.jumpStack.push(KFK.brainstormFocusNode);
        tmpIdx = KFK.jumpStack.length - 1;
        KFK.jumpStackPointer = tmpIdx;
    } else {
        KFK.jumpStackPointer = tmpIdx;
    }
    KFK.jumpToNode(KFK.brainstormFocusNode, true, true);
};

KFK.linkToBrain = async () => { //rr
    if (NotSet(KFK.brainstormFocusNode)) {
        // console.log("brain not set, just return");
        return;
    }
    let jqDiv = KFK.getHoverFocusLastCreate();
    await KFK.LinkFromBrainCenter(jqDiv);
};
KFK.jumpToLastCreated = async (takeBrain) => {
    await KFK.flushJumpStack();
    if (NotSet(KFK.lastCreatedJqNode)) {
        // console.log("lastcreated is null, just return");
        return;
    } else if (KFK.nodeNotExist(KFK.lastCreatedJqNode)) {
        // console.log("lastcreated not exist, just return");
        return;
    }
    let tmpIdx = KFK.jumpStack.indexOf(KFK.lastCreatedJqNode);
    if (tmpIdx < 0) {
        KFK.jumpStack.push(KFK.lastCreatedJqNode);
        tmpIdx = KFK.jumpStack.length - 1;
        KFK.jumpStackPointer = tmpIdx;
    } else {
        KFK.jumpStackPointer = tmpIdx;
    }
    KFK.jumpToNode(KFK.lastCreatedJqNode, takeBrain);
};

/**
 * 跳到一个节点上
 * @param jdiv 要跳到的节点
 * @param takeBrain 脑图模式下，是否把节点成为新的脑图中心
 * @param iamBrain jdiv是否自身就是脑图中心， 是的话不重复设置, 缺省为false
 */
KFK.jumpToNode = (jdiv, takeBrain, iamBrain = false) => {
    KFK.scrollToNode(jdiv);
    KFK.focusOnNode(jdiv);
    KFK.selectNodesOnClick(jdiv, false);
    if (KFK.brainstormMode && takeBrain && iamBrain === false) {
        KFK.startBrainstorm(jdiv);
    }
};

KFK.flushJumpStack = async () => {
    // console.log("flushJumpStack", KFK.jumpStack.length);
    KFK.jumpStack = KFK.jumpStack.filter((jdiv) => {
        if ($('#' + jdiv.attr("id")).length > 0) {
            return true;
        } else {
            return false;
        }
    });
    if (KFK.jumpStackPointer >= KFK.jumpStack.length) {
        KFK.jumpStackPointer = KFK.jumpStack.length - 1;
    }
    // if($('#' + KFK.lastCreatedJqNode.attr("id")).length < 1){
    //     KFK.lastCreatedJqNode = undefined;
    // }
    // console.log('new lenth', KFK.jumpStack.length);
};


/**
 * 跳到jumpStack中的下一个上，jumpStack由点选的节点组成
 */
KFK.jumpToNext = async (takeBrain) => {
    await KFK.flushJumpStack();
    if (KFK.jumpStack.length === 0) return;
    KFK.jumpStackPointer++;
    if (KFK.jumpStackPointer > KFK.jumpStack.length - 1) {
        KFK.jumpStackPointer = KFK.jumpStack.length - 1;
    }
    if (KFK.jumpStackPointer < 0) {
        KFK.jumpStackPointer = 0;
    }
    KFK.jumpToNode(KFK.jumpStack[KFK.jumpStackPointer], takeBrain);
};
/**
 * 跳到jumpStack中的上一个上，jumpStack由点选的节点组成
 */
KFK.jumpToPrevious = async (takeBrain) => {
    await KFK.flushJumpStack();
    if (KFK.jumpStack.length === 0) return;
    KFK.jumpStackPointer--;
    if (KFK.jumpStackPointer > KFK.jumpStack.length - 1) {
        KFK.jumpStackPointer = KFK.jumpStack.length - 1;
    }
    if (KFK.jumpStackPointer < 0) {
        KFK.jumpStackPointer = 0;
    }
    KFK.jumpToNode(KFK.jumpStack[KFK.jumpStackPointer], takeBrain);
};

KFK.childrenToMySide = async (side) => {
    if (KFK.selectedDIVs.length > 1) {
        for (let i = 0; i < KFK.selectedDIVs.length; i++) {
            KFK.__childrenToMySide(KFK.selectedDIVs[i], side);
        }
    } else {
        KFK.__childrenToMySide(KFK.hoverJqDiv(), side);
    }
};

KFK.__childrenToMySide = async (theDIV, side) => {
    if (NotSet(theDIV)) return;
    let divSpacingVert = cocoConfig.layout.spacing.vert;
    let divSpacingHori = cocoConfig.layout.spacing.hori;
    let sameSideChildren = KFK.getChildren(theDIV);
    let myTop = KFK.divTop(theDIV);
    let myHeight = KFK.divHeight(theDIV);
    let myLeft = KFK.divLeft(theDIV);
    let myWidth = KFK.divWidth(theDIV);
    let tmpTotalHeight = 0,
        tmpTotalWidth = 0;
    let myIndex = -1;
    //加入在这一侧的子节点所占的总高度
    for (let i = 0; i < sameSideChildren.length; i++) {
        tmpTotalHeight += KFK.divHeight(sameSideChildren[i]);
        tmpTotalWidth += KFK.divWidth(sameSideChildren[i]);

    }
    tmpTotalHeight += (sameSideChildren.length - 1) * divSpacingVert;
    tmpTotalWidth += (sameSideChildren.length - 1) * divSpacingHori;
    //脑图中心节点的中心高度
    let brPosY = KFK.divMiddle(theDIV);
    let brPosX = KFK.divCenter(theDIV);
    let accumulatedHeight = 0,
        accumulatedWidth = 0;
    //移动所有已存在节点
    for (let i = 0; i < sameSideChildren.length; i++) {
        let old = sameSideChildren[i].clone();
        if (side === 'left' || side === 'right') {
            let newY = brPosY - tmpTotalHeight * 0.5 + accumulatedHeight;
            sameSideChildren[i].css("top", newY);
            if (side === 'left')
                sameSideChildren[i].css("left", myLeft - 80 - KFK.divWidth(sameSideChildren[i]));
            else
                sameSideChildren[i].css("left", myLeft + myWidth + 80);
            accumulatedHeight += KFK.divHeight(sameSideChildren[i]) + divSpacingVert;
        } else { //top or bottom
            let newX = brPosX - tmpTotalWidth * 0.5 + accumulatedWidth;
            sameSideChildren[i].css("left", newX);
            if (side === 'top')
                sameSideChildren[i].css("top", myTop - 80 - KFK.divHeight(sameSideChildren[i]));
            else
                sameSideChildren[i].css("top", myTop + myHeight + 80);
            accumulatedWidth += KFK.divWidth(sameSideChildren[i]) + divSpacingHori;
        }
        //作为父节点，可连接左右中点，其子节点可连接打开左右中点；
        //作为子节点，父节点可任意中点，但自身只能连接到左右中点；
        KFK.redrawLinkLines(sameSideChildren[i], 'move', true, [
            [0, 2],
            [0, 2],
            [0, 1, 2, 3],
            [0, 2]
        ]);
        KFK.syncNodePut("U", sameSideChildren[i].clone(), "new child", old, false, i, sameSideChildren.length);
    }
};

KFK.AI = (idx) => {
    if (KFK.APP.model.viewConfig.useAI === false) return;
    let msg = AIXJ.getMsg(idx, KFK.APP.model.osName);
    if (IsSet(msg)) {
        KFK.SYSMSG.prop("innerHTML", msg);
    }
};

KFK.clickOnLeftPanel = function (evt) {
    // console.log("Clcik on Left Panel");
    // console.log(evt);
    evt.stopPropagation();
    evt.preventDefault();
};
KFK.clickOnRightPanel = function (evt) {
    evt.stopPropagation();
};

KFK.prepareUserIdForRTC = (userId) => {
    return userId.replace(/[@|\.]/g, '_');
};
KFK.toggleVideoCall = async () => {
    if (KFK.duringVideo === false) {
        await KFK.askVideoCall();
    } else {
        await KFK.stopVideoCall();
    }
}
KFK.askVideoCall = async () => {
    KFK.RtcManager ? await KFK.RtcManager.initRtc() :
        import('./rtcManager').then(async (pack) => {
            KFK.RtcManager = pack.RtcManager;
            await KFK.RtcManager.initRtc();
        });
    KFK.duringVideo = true;
    let user_ser = KFK.prepareUserIdForRTC(KFK.APP.model.cocouser.userid);
    await KFK.sendCmd('GENSIG', {
        user_ser: user_ser
    });
};
KFK.stopVideoCall = async () => {
    await KFK.RtcManager.stopVideoCall();
}
KFK.toggleScreenSharing = function () {
    KFK.RtcManager.toggleScreenSharing();
};
KFK.switchCamera = function () {
    KFK.RtcManager.switchCamera();
}
KFK.switchMic = function () {
    KFK.RtcManager.switchMic();
}
KFK.clickMainVideo = function () {
    let mainVideo = $('.video-box').first();
    if ($('#main-video').is(mainVideo)) {
        return;
    }
    KFK.RtcManager.clickMainVideo();
};

KFK.expandTool = function (evt, tool) {
    let jTool = $(evt.target);
    if (jTool.hasClass('toolbox') === false) {
        jTool = jTool.parent();
    }
    let jExpand = $('#lineExpand');
    jExpand.removeClass('noshow');
    let top = evt.clientY - 50;
    jExpand.css({
        'top': top,
        'left': 65
    });
};


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
    window.history.replaceState({}, null, KFK.urlBase);
} else if (urlPath.startsWith("/signin")) {
    KFK.urlMode = "gotoSignin";
    window.history.replaceState({}, null, KFK.urlBase);
} else {
    window.history.replaceState({}, null, KFK.urlBase);
}
KFK.debug("Path:", urlPath, "Search:", urlSearch, "Mode:", KFK.urlMode);

export default KFK;
