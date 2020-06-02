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
import assetIcons from "./assetIcons";
import avatarIcons from "./avatarIcons";
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

Quill.prototype.getHtml = function() {
  return this.container.querySelector(".ql-editor").innerHTML;
};
Array.prototype.clear = function() {
  this.splice(0, this.length);
};
Array.prototype.remove = function() {
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
jlog = function(obj) {
  console.log(JSON.stringify(obj));
};
jstr = function(obj) {
  return JSON.stringify(obj);
};

const KFK = {};

const NotSetOrFalse = function(val) {
  return NotSet(val) || val === false;
};
const NotSet = function(val) {
  if (val === undefined || val === null) return true;
  else return false;
};
KFK.NotSet = NotSet;
const IsSet = function(val) {
  return !NotSet(val);
};
KFK.IsSet = IsSet;
const IsBlank = function(val) {
  if (val === undefined || val === null || val === "") return true;
  else return false;
};
const NotBlank = function(val) {
  return !IsBlank(val);
};
const IsFalse = function(val) {
  if (val === undefined || val === null || val === false) return true;
  else return false;
};

KFK.dynamic = {
  connect: {
    width: 2,
    color: "#0000ff",
    style: "solid",
  },
};
KFK.version = "1.0";
KFK.MDEs = {};
KFK.MDEIntervals = {};
KFK.config = cocoConfig;
KFK.duringVideo = false;
KFK.pct = 1; //Peers count;
KFK.column = "no";
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
KFK.presentMaskMode = false;
KFK.isFreeHandDrawing = false;
KFK.isShowingModal = false;
KFK.jumpStackPointer = -1;
KFK.wsTryTimesBeforeGiveup = 60;
KFK.toolboxMouseDown = false;
KFK.toolboxMouseDownOn = null;
KFK.isZoomingShape = false;
KFK.idRowMap = {};
KFK.dynamicSize = {};
KFK.idSwitchMap = {};
KFK.FROM_SERVER = true; //三个常量
KFK.FROM_CLIENT = false;
KFK.NO_SHIFT = false;
KFK.badgeTimers = {}; //用于存放用户badge显示间隔控制的timer，这样，不是每一个mousemove都要上传，在Timer内，只上传最后一次mouse位置
KFK.updateReceived = 0; //记录接收到的其他用户的改动次数，在startActiveLogWatcher中，使用这个数字来控制是否到服务器端去拉取更新列表
KFK.tempSvgLine = null; //这条线是在划线或者链接node时，那条随着鼠标移动的线
KFK.LOGLEVEL_NOTHING = 0;
KFK.LOGLEVEL_ERROR = 1;
KFK.LOGLEVEL_WARN = 2;
KFK.LOGLEVEL_INFO = 3;
KFK.LOGLEVEL_DEBUG = 4;
KFK.LOGLEVEL_DETAIL = 5;
KFK.LOGLEVEL_KEY = 6;
KFK.loglevel = KFK.LOGLEVEL_DETAIL; //控制log的等级, 级数越小，显示信息越少
//在designer页面输入logerror, logwarn, loginfo, lodebug...
KFK.designerConf = {
  scale: 1,
  left: 0,
  top: 0,
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
  y: 0,
};
KFK.centerPos = {
  x: 0,
  y: 0,
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
  actionlog: [],
};
KFK.actionLogToViewIndex = 0;
KFK.explorerRefreshed = false;
KFK.numberOfNodeToCreate = 0;
KFK.numberOfNodeCreated = 0;
KFK.freeHandPoints = [];
KFK.freeHandDrawing = null;
KFK.firstShown = {
  right: false,
  chat: false,
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
KFK.jumpNodes = [];
KFK.drawPoints = [];
KFK.drawMode = "line";
KFK.tween = null;
KFK.KEYDOWN = {
  ctrl: false,
  shift: false,
  alt: false,
  meta: false,
};
KFK.originZIndex = 1;
KFK.lastActionLogJqDIV = null;

KFK.brainstormMode = true;
KFK.brNodeId = undefined;

KFK.JC1 = $("#C1");
KFK.C1 = el(KFK.JC1);
KFK.scrollContainer = $("#S1");
KFK.lockMode = false;
KFK.selectedDIVs = [];
KFK.selectedShapes = [];
KFK.kuangXuanMouseIsDown = false;
KFK.kuangXuanStartPoint = {
  x: 0,
  y: 0,
};
KFK.kuangXuanEndPoint = {
  x: 0,
  y: 0,
};
KFK.duringKuangXuan = false;

KFK.currentMousePos = {
  x: -1,
  y: -1,
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

KFK.getScrollPos = function() {
  let sc = $("#S1");
  return {
    x: sc.scrollLeft(),
    y: sc.scrollTop(),
  };
};

//Following solution to prevetn scrolling after focus  cause a problem of juqery
//So, dont' use it but adapt getScrollPos then scrollToPos solution
//https://stackoverflow.com/questions/4963053/focus-to-input-without-scrolling
// element.focus({
//     preventScroll: true
//   });
KFK.focusOnC3 = () => {
  if (KFK.isEditting || KFK.resizing || KFK.dragging) return;
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
KFK.hoverJqDiv = function(jqdiv) {
  if (jqdiv !== undefined) {
    KFK._jqhoverdiv = jqdiv;
    if (jqdiv !== null) KFK.hoverSvgLine(null);
  } else {
    return KFK._jqhoverdiv;
  }
};
KFK.hoverSvgLine = function(svgline) {
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

KFK.loadImages = function() {
  if (KFK.imagesLoaded) return;
  let loadedImages = 0;
  let numImages = assetIcons.length;
  for (let i = 0; i < assetIcons.length; i++) {
    let imgKey = assetIcons[i];
    KFK.images[imgKey] = new Image();
    KFK.images[imgKey].onload = function() {
      if (++loadedImages >= numImages) {
        KFK.imagesLoaded = true;
        KFK.debug("[Loaded] images fully loaded");
      }
    };
    let imgurl = cocoConfig.frontend.url + "/assets/" + imgKey + ".svg";
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
    KFK.avatars[avatarKey].onload = function() {
      if (++loadedAvatars >= numAvatars) {
        KFK.setAppData("model", "avatars", KFK.avatars);
        KFK.avatarsLoaded = true;
        KFK.debug("[Loaded] avatars");
      }
    };
    KFK.avatars[avatarKey].src =
      cocoConfig.frontend.url + "/avatars/" + avatarKey + ".svg";
    KFK.avatars[avatarKey].id = avatarKey;
  }
};

class Node {
  constructor(id, type, variant, x, y, w, h, attach, attach2) {
    this.id = id;
    this.type = type;
    this.variant = variant;
    this.iconscale = 0.8;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
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

KFK.onWsMsg = async function(response) {
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
    case "DOCLIMIT":
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
        KFK.APP.setData("model", "isDemoEnv", true);
      } else {
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
        KFK.checkSession(true);
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
      await KFK.deleteObject_for_Response(response.block);
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
    case "STOPMD":
      KFK.onStopMd(response.nodeid, response.by);
      break;
    case "OKTOMD":
      KFK.onOkToMd(response.nodeid);
      break;
    case "ASKPWD":
      KFK.scrLog("请输入正确的白板密码", 2000);
      KFK.tryToOpenDocId = response.doc_id;
      KFK.showDialog({
        inputDocPasswordDialog: true,
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
        userPasswordDialog: true,
      });
      break;
    case "SHARECODE_NOT_EXIST":
      KFK.setAppData("model", "msgbox", {
        title: "邀请码不存在",
        content: "邀请码不存在，返回协作管理",
      });
      KFK.showDialog({
        MsgBox: true,
      });
      break;
    case "NONEXIST":
      KFK.info("Server says document does not exist");
      KFK.setAppData("model", "msgbox", {
        title: "文档不存在",
        content: "你要查看的白板文档不存在",
      });
      KFK.showDialog({
        MsgBox: true,
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
          name: "",
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
        doc.thumbnail = "https://liuzijin.com/scr/" + doc._id + ".png";
        doc.bkgstyle = `background-image: url('${doc.thumbnail}'); background-repeat: no-repeat; background-size: 84px 60px;`;
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
    case "LISTCH":
      console.log(response);
      KFK.APP.setData("model", "listcolumnoption", response.option);
      KFK.APP.model.columndoclist.cname = response.cname;
      KFK.APP.model.columndoclist.owner.name = response.owner.name;
      try {
        KFK.APP.model.columndoclist.owner.avatar =
          KFK.avatars[response.owner.avatar].src;
      } catch (error) {
        KFK.debug("set column avatar src failed", error.message);
        KFK.debug("column.ownerAvatar is", response.owner.avatar);
      }
      docs = response.docs;
      docs.forEach((doc) => {
        doc.thumbnail = "https://liuzijin.com/scr/" + doc._id + ".png";
        doc.bkgstyle = `background-image: url('${doc.thumbnail}'); background-repeat: no-repeat; background-size: 100% 100%; height: 100px; width:100%; max-width:200px`;
        if (doc.ownerAvatar !== "") {
          try {
            doc.ownerAvatarSrc = KFK.avatars[doc.ownerAvatar].src;
          } catch (error) {
            KFK.debug("set doc avatar src failed", error.message);
            KFK.debug("doc.ownerAvatar is", doc.ownerAvatar);
          }
        }
      });
      KFK.APP.setData("model", "chdocs", docs);
      $(".showAfterColumnLoad").removeClass("showAfterColumnLoad");
      break;
    case "SEARCHDOC":
      KFK.APP.setData("model", "interLinkDocs", response.docs);
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
    case "LISTSUB":
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
      console.log("Received LISTPRJ");
      let option = response.option;
      // let skip = option.skip;
      // let count = option.count;
      console.log(response.prjs);
      for (let i = 0; i < response.prjs.length; i++) {
        if (response.prjs[i].cid === response.prjs[i].prjid) {
          response.prjs[i].column = "";
        } else {
          response.prjs[
            i
          ].column = `<a href='${KFK.urlBase}/@${response.prjs[i].cid}'>${response.prjs[i].cname}</a>`;
        }
      }
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
      console.log("Set explorerRefreshed to true");
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
      KFK.NodeController.lockline(
        KFK,
        KFK.svgDraw.findOne(`.${response.nodeid}`)
      );
      break;
    case "UNLOCKLINE":
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
        prjid: gotoPrjId,
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
    case "SETPMS":
      console.log(response);
      if (KFK.APP.model.cocodoc.doc_id === response.doc_id) {
        try {
          KFK.APP.model.cocodoc.pms = parseInt(response.pms);
        } catch (error) {
          console.error(error);
          KFK.APP.model.cocodoc.pms = 0;
        }
        KFK.scrLog("文档内容权限已修改");
      }
      break;
    case "SHARECODE2":
      if (response.code === "DOC_NOT_EXIST") {
        KFK.APP.model.share.okToShare = true;
        KFK.APP.model.share.okToSetACL = false;
        KFK.APP.model.share.url =
          KFK.getProductUrl() + "/?dou=welcome_new_user";
        KFK.APP.model.share.warning =
          "您要分享的文档不存在，以设为分享新用户欢迎";
      } else {
        KFK.APP.model.share.okToShare = true;
        KFK.APP.model.share.okToSetACL = true;
        KFK.APP.model.share.url =
          KFK.getProductUrl() + "/?dou=" + response.code;
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
        myorgs: true,
      });
      console.log("refreshProjectList in ENTEROG");
      KFK.refreshProjectList();
      break;
    case "LISTMYORG":
      KFK.APP.model.myorgs = [];
      for (let i = 0; i < response.orgs.length; i++) {
        KFK.APP.model.myorgs.push(Object.assign({}, response.orgs[i]));
      }
      KFK.setAppData("model", "myorgs", KFK.APP.model.myorgs);
      break;
    case "LISTVORG":
      KFK.APP.model.vorgs = [];
      for (let i = 0; i < response.orgs.length; i++) {
        KFK.APP.model.vorgs.push(Object.assign({}, response.orgs[i]));
      }
      KFK.setAppData("model", "vorgs", KFK.APP.model.vorgs);
      break;
    case "ORGUSERLIST":
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
      KFK.hide("#right");
      KFK.hide("#left");
      KFK.hide("#top");
      break;
    case "SCRLOG":
      KFK.scrLog(response.msg);
      break;
    case "ERROR":
      KFK.error("SERVER ERROR:", response.msg);
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
    case "CHAT":
      KFK.scrLog(response.msg);
      KFK.appendChatItem(response.msg, response.avatar, response.name, "other");
      break;
    case "BUY1":
      KFK.scrLog("购买成功，请在我的订阅中查看");
      break;
    case "BUY2":
      KFK.scrLog("购买成功，已放入“购买的彩板”项目");
      break;
    case "GENSIG":
      KFK.startVideoCall(response.config, response.shareConfig);
      break;
    case "RTCSIGREQ":
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
    avatar: res.avatar,
  };
};

KFK.focusOnNode = function(jqNodeDIV) {
  KFK.lastFocusOnJqNode = jqNodeDIV;
  KFK.justCreatedJqNode = null;
  KFK.justCreatedShape = null;

  if (jqNodeDIV !== null) KFK.updatePropertyFormWithNode(jqNodeDIV);
};

KFK.setRightTabIndex = function(tabIndex) {
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
  tabIndex = tabIndex < 0 ? 0 : tabIndex > 2 ? 2 : tabIndex;
  KFK.APP.setData("model", "rightTabIndex", tabIndex);
  localStorage.setItem("righttabindex", tabIndex);
};

KFK.updatePropertyFormWithNode = function(jqNodeDIV) {
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
    jqNodeDIV != null &&
      (nodeType === "yellowtip" ||
        nodeType === "textblock" ||
        nodeType === "comment")
  );
  KFK.APP.setData(
    "show",
    "layercontrol",
    jqNodeDIV != null &&
      (nodeType === "text" ||
        nodeType === "yellowtip" ||
        nodeType === "textblock" ||
        nodeType === "md" ||
        nodeType === "richtext")
  );
  //有customShape即可支持改变背景色/边框色/边框宽度，这里其实在cocoConfig中只有textblock支持
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
  //yellowtip和comment支持设置贴纸的背景颜色
  if (
    jqNodeDIV != null &&
    (nodeType === "yellowtip" || nodeType === "comment")
  ) {
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

  $("#spectrum_connect_line_color").spectrum("set", jqNodeDIV.attr("cncolor"));
  $("#spinner_connect_line_width").spinner("value", jqNodeDIV.attr("cnwidth"));
  KFK.APP.model.property.connect.line.style = jqNodeDIV.attr("cnstyle");
};

KFK.log = function(...info) {
  console.log("LOG>", ...info);
};
KFK.error = function(...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_ERROR) console.log("ERROR>", ...info);
};
KFK.warn = function(...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_WARN) console.log("WARN >", ...info);
};
KFK.info = function(...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_INFO) console.log("INFO >", ...info);
};
KFK.debug = function(...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_DEBUG) console.log("DEBUG>", ...info);
};
KFK.detail = function(...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_DETAIL) console.log("DETAL>", ...info);
};
KFK.logKey = function(...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_KEY) console.log("KEY>", ...info);
};

KFK.keepLog = function(msg = "", staytime = 30000) {
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
    acl: acl,
  });
};
KFK.getShareWarningByDocACL = (acl) => {
  let ret = "";
  switch (acl) {
    case "S":
      ret =
        "白板当前权限为仅发起人可用, 会导致协作者无法正常参与，请注意调整白板权限";
      break;
    case "O":
      ret =
        "白板当前权限为仅当前组织可用，非当前组织用户无法正常参与，请检查受邀者是否在当前组织";
      break;
    case "P":
      ret = "白板当前权限为公开使用，任何接收到分享码的人都可以参与协作";
      break;
  }
  return ret;
};
KFK.scrLog = function(msg, staytime = 5000) {
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
  cloneDIV.removeClass("noshow");
  cloneDIV.attr("id", "fadeoutmsg");
  cloneDIV.html(msg);
  KFK.msgTimer = setTimeout(() => {
    cloneDIV.animate(
      {
        opacity: 0,
      },
      500,
      async function() {
        cloneDIV.remove();
      }
    );
  }, staytime);
};

KFK.getConnectorPoints = function(from, to, rad) {
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

KFK.replaceNodeInSelectedDIVs = function(jqDIV) {
  for (let i = 0; i < KFK.selectedDIVs.length; i++) {
    if (KFK.selectedDIVs[i].attr("id") === jqDIV.attr("id")) {
      KFK.selectedDIVs[i] = jqDIV;
    }
  }
};

KFK.calculateNodeConnectPoints = function(jqDIV) {
  let divLeft = KFK.unpx(jqDIV.css("left"));
  let divTop = KFK.unpx(jqDIV.css("top"));
  let divWidth = KFK.unpx(jqDIV.css("width"));
  let divHeight = KFK.unpx(jqDIV.css("height"));
  let pos = {
    center: {
      x: divLeft + divWidth * 0.5,
      y: divTop + divHeight * 0.5,
    },
    points: [
      {
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

KFK.drawConnect = function(
  A,
  B,
  posLimitA = [0, 1, 2, 3],
  posLimitB = [0, 1, 2, 3]
) {
  let APos = KFK.calculateNodeConnectPoints(A);
  let BPos = KFK.calculateNodeConnectPoints(B);
  let fromPoint = null;
  let toPoint = null;
  let AIndex = 0;
  let BIndex = 0;
  let shortestDistance = KFK.distance(APos.points[0], BPos.points[0]);
  for (let i = 0; i < APos.points.length; i++) {
    if (posLimitA.indexOf(i) < 0) continue;
    fromPoint = APos.points[i];
    for (let j = 0; j < BPos.points.length; j++) {
      if (posLimitB.indexOf(j) < 0) continue;
      toPoint = BPos.points[j];
      let tmp_drawConnect_distance = KFK.distance(fromPoint, toPoint);
      if (tmp_drawConnect_distance < shortestDistance) {
        shortestDistance = tmp_drawConnect_distance;
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
    BPos.points[BIndex].y,
    {}
  );
};

KFK.yarkLinkNode = function(jqDIV, shiftKey, text) {
  if (KFK.shapeDragging) return;
  if (KFK.nodeLocked(jqDIV)) return;
  KFK.tmpPos = KFK.calculateNodeConnectPoints(jqDIV);
  KFK.linkPosNode.push(jqDIV);
  KFK.procLinkNode(shiftKey, text);
};

KFK.yarkJumpNode = async function(jqDIV, shiftKey, text) {
  if (KFK.shapeDragging) return;
  if (KFK.nodeLocked(jqDIV)) return;
  KFK.jumpNodes.push(jqDIV);
  await KFK.procJumpNode();
};

KFK.cancelLinkNode = function() {
  KFK.cancelTempLine();
  KFK.linkPosNode.splice(0, 2);
  if (KFK.lockTool === false) KFK.setMode("pointer");
};
KFK.procLinkNode = function(shiftKey, text) {
  if (KFK.linkPosNode.length < 2) {
    KFK.showNodeMessage(KFK.linkPosNode[0], "A点选定，请继续点选B点");
    return;
  } else if (KFK.linkPosNode[0].attr("id") === KFK.linkPosNode[1].attr("id")) {
    KFK.linkPosNode.splice(1, 1);
    return;
  }
  if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
  KFK.lineTemping = false;
  KFK.cancelAlreadySelected();
  KFK.clearNodeMessage();
  KFK.drawConnect(KFK.linkPosNode[0], KFK.linkPosNode[1]);
  //看两个节点的Linkto属性，在添加一个连接线后有没有什么变化，
  //如果有变化，就上传U， 如果没变化，就不用U
  //没有变化的情况：之前就有从linkPosNode[0]到 linkPosNode[1]的链接存在
  //有变化的情况：1. 之前不存在； 2. 之前存在方向相反的链接，从linkPosNode[1]到linkPosNode[0]的
  //以上两种情况中，1会只导致只U第一个； 2会导致U；两端两个节点
  let oldNode0 = KFK.linkPosNode[0].clone();
  let oldNode1 = KFK.linkPosNode[1].clone();
  let tmp1 = KFK.linkPosNode[0].attr("linkto");
  let tmp2 = KFK.linkPosNode[1].attr("linkto");
  KFK.buildConnectionBetween(KFK.linkPosNode[0], KFK.linkPosNode[1]);
  let tmp3 = KFK.linkPosNode[0].attr("linkto");
  let tmp4 = KFK.linkPosNode[1].attr("linkto");
  if (tmp1 !== tmp3) {
    KFK.syncNodePut(
      "U",
      KFK.linkPosNode[0].clone(),
      "connect nodes",
      oldNode0,
      false,
      0,
      1
    );
  }
  if (tmp2 !== tmp4) {
    KFK.syncNodePut(
      "U",
      KFK.linkPosNode[1].clone(),
      "connect nodes",
      oldNode1,
      false,
      0,
      1
    );
  }

  if (!shiftKey) {
    KFK.linkPosNode.splice(0, 2);
  } else {
    KFK.linkPosNode[0] = KFK.linkPosNode[1];
    KFK.linkPosNode.splice(1, 1);
  }
};

KFK.procJumpNode = async function() {
  if (KFK.jumpNodes.length < 2) {
    KFK.showNodeMessage(KFK.jumpNodes[0], "起始节点，请选择跳往节点");
    return;
  } else if (KFK.jumpNodes[0].attr("id") === KFK.jumpNodes[1].attr("id")) {
    KFK.jumpNodes.splice(1, 1);
    return;
  }
  KFK.showNodeMessage(
    KFK.jumpNodes[1],
    "点原节点右上角跳转，或按f，即可跳转到这里"
  );
  let oldDIV = KFK.jumpNodes[0].clone();
  KFK.jumpNodes[0].attr("jump", KFK.jumpNodes[1].attr("id"));
  await KFK.syncNodePut(
    "U",
    KFK.jumpNodes[0].clone(),
    "add jump",
    oldDIV,
    false,
    0,
    1
  );
  KFK.jumpNodes.splice(0, 2);
  KFK.setMode("pointer");
};

KFK.clearNodeMessage = function(jqDiv) {
  if (KFK.nodeMessageTimer) {
    clearTimeout(KFK.nodeMessageTimer);
  }
  $(".nodeMessage").remove();
};
KFK.showNodeMessage = function(jqDiv, msg, lastSec = 3) {
  if (KFK.APP.model.viewConfig.nodemessage === false) return;
  if (KFK.nodeMessageTimer) {
    clearTimeout(KFK.nodeMessageTimer);
    $(".nodeMessage").remove();
  }
  let msgDiv = $("<div></div>");
  msgDiv.addClass("nodeMessage");
  msgDiv.appendTo(jqDiv);
  msgDiv.prop("innerHTML", msg);
  KFK.nodeMessageTimer = setTimeout(() => {
    msgDiv.remove();
    KFK.nodeMessageTimer = undefined;
  }, lastSec * 1000);
};

KFK.setShapeToRemember = function(theShape) {
  KFK.shapeToRemember = theShape.clone();
  KFK.shapeToRemember.attr("id", theShape.attr("id"));
  KFK.shapeToRemember.attr("stroke-width", theShape.attr("origin-width"));
};

KFK.closePolyPoint = function(x, y, shiftKey) {
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
  let color = KFK.polyShape.attr("origin-color");
  let width = KFK.polyShape.attr("origin-width");
  let linecap = KFK.polyShape.attr("stroke-linecap");
  $("#lineColor").spectrum("set", color);
  $("#spinner_line_width").spinner("value", width);

  KFK.polyShape.attr("creator", KFK.APP.model.cocouser.userid);
  KFK.syncLinePut("C", KFK.polyShape, "create new", null, false);
};
KFK.yarkShapePoint = function(x, y, shiftKey) {
  if (KFK.shapeDragging) return;
  if (KFK.isFreeHandDrawing) return;

  //如果这是划线时，所点的第二个点(此时，开始画线)
  if (KFK.drawMode === "line" && KFK.drawPoints.length === 1) {
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
      y: y,
    },
    points: [
      {
        x: x,
        y: y,
      },
    ],
  });
  KFK.procDrawShape(shiftKey);
};
KFK.procDrawShape = function(shiftKey) {
  if (KFK.drawPoints.length < 2) {
    return;
  } else {
    if (KFK.tempShape) KFK.tempShape.hide();
    KFK.lineTemping = false;
  }
  if (["line", "rectangle", "ellipse"].indexOf(KFK.drawMode) >= 0)
    KFK.justCreatedShape = KFK.svgDrawShape(
      KFK.drawMode,
      KFK.myuid(),
      KFK.drawPoints[0].center.x,
      KFK.drawPoints[0].center.y,
      KFK.drawPoints[1].center.x,
      KFK.drawPoints[1].center.y,
      {
        color: KFK.YIQColorAux || KFK.APP.model.svg[KFK.drawMode].color,
        width: KFK.APP.model.svg[KFK.drawMode].width,
        linecap: KFK.APP.model.svg[KFK.drawMode].linecap ? "round" : "square",
      }
    );
  else if (["polyline", "polygon"].indexOf(KFK.drawMode) >= 0) {
    if (KFK.polyId === undefined) {
      KFK.polyId = KFK.myuid();
    }
    KFK.justCreatedShape = KFK.svgDrawPoly(KFK.drawMode, KFK.polyId, {
      color: KFK.YIQColorAux || KFK.APP.model.svg[KFK.drawMode].color,
      width: KFK.APP.model.svg[KFK.drawMode].width,
      linecap: KFK.APP.model.svg[KFK.drawMode].linecap ? "round" : "square",
    });
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

  if (["line", "rectangle", "ellipse"].indexOf(KFK.drawMode) >= 0) {
    theShape.attr("creator", KFK.APP.model.cocouser.userid);
    KFK.syncLinePut("C", theShape, "create new", null, false);
    KFK.drawPoints.splice(0, 2);
  }
};

KFK.addLinkTo = function(jq1, idToAdd) {
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
KFK.buildConnectionBetween = function(jq1, jq2) {
  KFK.addLinkTo(jq1, jq2.attr("id"));
  KFK.removeLinkTo(jq2, jq1.attr("id"));
};

/**
 * 断掉两个节点之间的连接
 * @param jq 连接的from节点
 * @param idToRemove 连接的to节点的id
 */
KFK.removeLinkTo = function(jq, idToRemove) {
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
      if (arr.indexOf(myId) >= 0) ret.push(jqConnectFrom);
    }
  });
  return ret;
};

/**
 * 获得一个节点的所有子节点
 * @param jq 父节点
 * @return 所有子节点
 */
KFK.getChildren = function(jq) {
  let str = jq.attr("linkto");
  if (NotSet(str)) return [];
  let arr = KFK.stringToArray(str);
  arr = arr.filter((id) => {
    if ($("#" + id).length > 0) {
      return true;
    } else {
      return false;
    }
  });
  let ret = arr.map((id) => {
    return $("#" + id);
  });
  return ret;
};

/**
 * 两个节点之间是否有连接？
 * @param jq1  from节点
 * @param jq2  to节点
 */
KFK.hasConnection = function(jq1, jq2) {
  let str = jq1.attr("linkto");
  if (NotSet(str)) return fasle;
  let arr = KFK.stringToArray(str);

  let linkToId = "";
  if (typeof jq2 === "string") {
    linkToId = jq2;
  } else {
    linkToId = jq2.attr("id");
  }

  let index = arr.indexOf(linkToId);
  return index >= 0;
};

KFK.distance = function(p1, p2) {
  return Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
  );
};

KFK.getZIndex = function(jqDiv) {
  let zz = parseInt(jqDiv.css("z-index"));
  zz = isNaN(zz) ? 0 : zz;
  return zz;
};
KFK.setZIndex = function(jqDiv, zz) {
  jqDiv.css("z-index", zz);
};
//unselect all, deselect all
KFK.cancelAlreadySelected = function() {
  while (KFK.selectedDIVs.length > 0) {
    KFK.deselectNode(KFK.selectedDIVs[0]);
  }
  KFK.selectedDIVs.clear();
  KFK.resetPropertyOnMultipleNodesSelected();
  KFK.focusOnNode(null);

  while (KFK.selectedShapes.length > 0) {
    KFK.deselectShape(KFK.selectedShapes[0]);
  }
};
KFK.resetPropertyOnMultipleNodesSelected = function() {
  KFK.APP.setData("show", "arrange_multi_nodes", KFK.selectedDIVs.length > 1);
  KFK.APP.setData("show", "shape_property", KFK.selectedDIVs.length > 0);
  //if (KFK.selectedDIVs.length > 1) KFK.setRightTabIndex(1);
};

KFK.undo = async () => {
  if (KFK.opz < 0) {
    KFK.scrLog("undo 到底了");
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
          await KFK.setNodeEventHandler(jqFrom, async function() {
            KFK.redrawLinkLines(jqFrom, "undo");
            if (jqFrom.hasClass("lock")) {
              KFK.updateNodeEvent(jqFrom, "draggable", "destroy");
              KFK.updateNodeEvent(jqFrom, "resizable", "destroy");
              KFK.updateNodeEvent(jqFrom, "droppable", "destroy");
            }
            //对TODO/CHAT要做如下修复
            if (KFK.isTodoListOrChatListDIV(jqFrom)) {
              jqFrom.find(".coco_list").addClass("original");
              if (KFK.isTodoListDIV(jqFrom)) {
                jqFrom.addClass("todolist");
                KFK.setTodoItemEventHandler
                  ? KFK.setTodoItemEventHandler(jqFrom)
                  : import("./todo").then((pack) => {
                      KFK.setTodoItemEventHandler =
                        pack.Todo.setTodoItemEventHandler;
                      KFK.setTodoItemEventHandler(jqFrom);
                    });
              } else if (KFK.isChatListDIV(jqFrom)) {
                jqFrom.addClass("chatlist");
              }
            }
            jqFrom.attr("creator", KFK.APP.model.cocouser.userid);
            await KFK.syncNodePut("C", jqFrom, "undo", null, true, 0, 1);
          });
        } else if (ope.from[i] !== "" && ope.to[i] !== "") {
          //ope is U
          let jqTo = $(`#${ope.toId[i]}`);
          jqTo.prop("outerHTML", ope.from[i]);
          jqTo = $(`#${ope.toId[i]}`); //yes, re-select
          await KFK.setNodeEventHandler(jqTo, async function() {
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
        fromLine.attr("creator", KFK.APP.model.cocouser.userid);
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

KFK.getLineIdFromString = function(str) {
  let m = str.match(/id\s*=\s*('|")([^"]+)('|")/);
  if (m) {
    return m[2];
  } else return null;
};

KFK.redo = async () => {
  if (KFK.opz >= KFK.opstack.length - 1) {
    KFK.scrLog("redo 到头了");
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
          await KFK.setNodeEventHandler(jqTo, async function() {
            KFK.redrawLinkLines(jqTo, "redo", true);
            if (jqTo.hasClass("lock")) {
              KFK.updateNodeEvent(jqTo, "draggable", "destroy");
              KFK.updateNodeEvent(jqTo, "resizable", "destroy");
              KFK.updateNodeEvent(jqTo, "droppable", "destroy");
            } else {
              KFK.debug(nodeid, "NOT hasclass lock");
            }
            jqTo.attr("creator", KFK.APP.model.cocouser.userid);
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
          await KFK.setNodeEventHandler(jqFrom, async function() {
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
        toLine.attr("creator", KFK.APP.model.cocouser.userid);
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

KFK.initLayout = function() {
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

KFK.scrollToPos = function(pos) {
  KFK.JS1.scrollLeft(pos.x);
  KFK.JS1.scrollTop(pos.y);
};

//create C3 create c3
KFK.initC3 = function() {
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

  KFK.JC3.dblclick(async function(evt) {
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
        y: evt.offsetY,
      });
    } else if (KFK.mode === "pointer") {
      KFK.toggleOverview();
    }
    KFK.cancelTempLine();
    evt.preventDefault();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
  });
  KFK.JC1.on("contextmenu", function(evt) {
    evt.preventDefault();
    KFK.kuangXuanMouseIsDown = false;
    KFK.panStartAt = undefined;
  });
  KFK.JC1.on("click", async function(evt) {
    if (IsSet(KFK.selectedTodo)) {
      KFK.selectedTodo.removeClass("current");
    }
    KFK.kuangXuanMouseIsDown = false;
    KFK.panStartAt = undefined;
    KFK.hide($(".clickOuterToHide"));
  });
  KFK.JC3.keydown(function(evt) {
    // console.log('JC3.keydown', evt.keyCode, KFK.mode, KFK.drawMode);
    if (
      (evt.keyCode === 13 || evt.keyCode === 27) &&
      KFK.mode === "line" &&
      (KFK.drawMode === "polyline" || KFK.drawMode === "polygon")
    ) {
      KFK.closePolyPoint();
    }
  });
  //click c3
  KFK.JC3.on("contextmenu", function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    KFK.kuangXuanMouseIsDown = false;
    KFK.panStartAt = { x: evt.clientX, y: evt.clientY };
  });
  KFK.JC3.on("click", async function(evt) {
    if (KFK.inDesigner() === false) return;
    if (evt.ctrlKey) {
      evt.stopPropagation();
      evt.preventDefault();
      return;
    }

    if (evt.target.getAttribute("id") === "D3") {
      console.log("click on D3");
      if (KFK.isEditting && KFK.mdEdittingNode) {
        KFK.myMDE.finishMdEditting(true, KFK.mdEdittingNode.attr("id"));
      }
    }

    let tmpPoint = {
      x: evt.clientX,
      y: evt.clientY,
    };
    //KFK.pointAfterResize 记录着DIV重新拖动大小后，释放鼠标的一霎那间的鼠标位置
    //这样，在鼠标释放同时，click事件发起时，下面的代码避免执行
    if (KFK.pointAfterResize) {
      if (KFK.distance(tmpPoint, KFK.pointAfterResize) < 10) {
        KFK.pointAfterResize = undefined;
        return;
      } else {
        KFK.pointAfterResize = undefined;
      }
    }
    if (KFK.mode === "interlink") {
      if (KFK.pmsOk("C")) {
        KFK.placeInterLinkDoc(evt);
      }
      return;
    }
    if (KFK.pmsOk("C")) {
      await KFK.placeNodeOnClick(evt);
    }
    if (KFK.mode === "md") {
      KFK.setMode("pointer");
    }
  });

  //place node on click
  KFK.placeNodeOnClick = async function(evt) {
    if (KFK.isEditting && KFK.quillEdittingNode) {
      await KFK.finishQuillEditting();
    } else if (KFK.isEditting && KFK.inlineEditor) {
      KFK.endInlineEditing();
    }
    if (KFK.isEditting || KFK.resizing || KFK.dragging) {
      return;
    }
    evt.preventDefault();
    KFK.closeActionLog();
    if (IsSet(KFK.selectedTodo)) {
      KFK.selectedTodo.removeClass("current");
    }
    KFK.hide($(".clickOuterToHide"));
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
    KFK.divStylerRefDiv = null;

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
    } else if (
      KFK.mode === "line" &&
      KFK.isFreeHandDrawing === false &&
      IsFalse(KFK.isZoomingShape) &&
      KFK.pmsOk("C") === true
    ) {
      // console.log("yarkShapePoint");
      KFK.yarkShapePoint(
        KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
        KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
        evt.shiftKey
      );
      return;
    } else {
      if (KFK.selectedDIVs.length > 0 || KFK.selectedShapes.length > 0) {
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
          evt.shiftKey,
          KFK.myuid(),
          KFK.mode,
          variant,
          realX,
          realY,
          undefined,
          undefined,
          "",
          ""
        );
        jqDIV.attr("creator", KFK.APP.model.cocouser.userid);
        await KFK.syncNodePut("C", jqDIV, "new node", null, false, 0, 1);
      }
    }

    // KFK.setRightTabIndex();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
  };

  KFK.JC3.mousedown(async (evt) => {
    if (
      KFK.mode === "freehand" &&
      KFK.drawMode === "freehand" &&
      KFK.shapeDragging === false &&
      KFK.isZoomingShape === false
    ) {
      KFK.isFreeHandDrawing = true;
      KFK.freeHandPoints = [];
    }
  });
  KFK.JC3.mouseup(async (evt) => {
    if (KFK.inDesigner() === false) return;
    KFK.panStartAt = undefined;
    // 下面的尝试不起作用，在pad.js中的dropevent中是起作用的
    // console.log('JC3 mouseup');
    // if (KFK.toolboxMouseDown === true){
    //     console.log("place", KFK.toolboxMouseDownOn);
    //     KFK.placeNodeOnClick(evt);
    //     KFK.toolboxMouseDown = false;
    //     KFK.toolboxMouseDownOn = null;
    // }
    if (
      KFK.mode === "freehand" &&
      KFK.drawMode === "freehand" &&
      KFK.isFreeHandDrawing === true
    ) {
      if (KFK.freeHandDrawing && KFK.pmsOk("C") === true) {
        KFK.simplifyPoints(KFK.freeHandDrawing, KFK.freeHandPoints, 5);
        let shapeId = "shape_" + KFK.myuid();
        KFK.freeHandDrawing.attr("id", shapeId);
        let lineColor = KFK.APP.model.svg.freehand.color;
        if (KFK.dynamicLineStroke) lineColor = KFK.dynamicLineStroke;
        let option = {
          color: lineColor,
          width: KFK.APP.model.svg.freehand.width,
          linecap: KFK.APP.model.svg.freehand.linecap ? "round" : "square",
        };
        KFK.freeHandDrawing
          .addClass("kfkshape")
          .addClass(shapeId)
          .addClass("kfkfreehand")
          .stroke(option);
        KFK.freeHandDrawing.attr("origin-width", option.width);
        KFK.freeHandDrawing.attr("origin-color", option.color);
        KFK.freeHandDrawing.attr("lasteditorid", KFK.APP.model.cocouser.userid);
        KFK.addShapeEventListner(KFK.freeHandDrawing);
        KFK.freeHandDrawing.attr("creator", KFK.APP.model.cocouser.userid);
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

  KFK.simplifyPoints = function(polyline, points, tolerance) {
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

  KFK.JC3.on("mousemove", function(evt) {
    if (KFK.inDesigner() === false) return;
    if (KFK.inPresentingMode || KFK.inOverviewMode) return;
    KFK.upateUserMousePos(KFK.APP.model.cocouser, evt.clientX, evt.clientY);

    if (KFK.panStartAt) {
      let delta = {
        x: evt.clientX - KFK.panStartAt.x,
        y: evt.clientY - KFK.panStartAt.y,
      };
      KFK.JS1.scrollLeft(KFK.JS1.scrollLeft() - delta.x * 3);
      KFK.JS1.scrollTop(KFK.JS1.scrollTop() - delta.y * 3);
      KFK.panStartAt.x = evt.clientX;
      KFK.panStartAt.y = evt.clientY;
      return;
    }

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
      if (KFK.isFreeHandDrawing && KFK.pmsOk("C") === true) {
        KFK.addFreeHandPoint(tmpPoint);
        return;
      }
    }
    if (
      KFK.isEditting ||
      KFK.shapeDragging ||
      KFK.lineTransfomerDragging ||
      KFK.minimapMouseDown
    ) {
      KFK.duringKuangXuan = false;
    }

    if (KFK.mode === "connect" && KFK.pmsOk("C") === true) {
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
          tmpPoint.y,
          {
            color: KFK.YIQColorAux || "#888888",
            stroke: 10,
          }
        );
      }
    }
    if (KFK.mode === "line" && KFK.pmsOk("C") === true) {
      if (KFK.drawPoints.length === 1) {
        KFK.lineTemping = true;
        KFK.svgDrawTmpShape(
          KFK.drawMode,
          KFK.drawPoints[0].center.x,
          KFK.drawPoints[0].center.y,
          tmpPoint.x,
          tmpPoint.y,
          {
            color: KFK.YIQColorAux || "#888888",
            stroke: 10,
          }
        );
      }
    }
    if (
      KFK.shapeDragging &&
      KFK.docIsReadOnly() === false &&
      KFK.lineLocked(KFK.shapeToDrag) === false &&
      KFK.pmsOk("U", KFK.shapeToDrag) === true
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
};

KFK.zoomInOut = function(direction) {
  if (KFK.inDesigner() === false || KFK.inOverviewMode || KFK.inPresentingMode)
    return;
  let scrCenter = KFK.scrCenter();
  let window_width = scrCenter.x * 2;
  let window_height = scrCenter.y * 2;
  let scaleX = window_width / KFK._width;
  let scaleY = window_height / KFK._height;
  let minScale = Math.min(scaleX, scaleY);
  let pageScale = Math.min(
    window_width / KFK.PageWidth,
    window_height / KFK.PageHeight
  );
  let tmp = KFK.scaleRatio;
  try {
    if (direction === "zoomin") {
      if (tmp < 1) {
        tmp = tmp * 1.2;
        if (tmp > 1) tmp = 1;
        KFK.scale(tmp);
      }
    } else if (direction === "100%") {
      KFK.scale(1);
    } else if (direction === "page") {
      KFK.scale(pageScale);
    } else {
      if (tmp > minScale) {
        tmp = tmp / 1.2;
        if (tmp < minScale) tmp = minScale;
        KFK.scale(tmp);
      }
    }
  } catch (error) {
  } finally {
    KFK.C3.dispatchEvent(KFK.refreshC3Event);
  }
};

KFK.addFreeHandPoint = function(point) {
  KFK.freeHandPoints.push(point);
  if (KFK.freeHandPoints.length === 2) {
    KFK.freeHandDrawing = KFK.svgDraw
      .polyline([
        [KFK.freeHandPoints[0].x, KFK.freeHandPoints[0].y],
        [KFK.freeHandPoints[1].x, KFK.freeHandPoints[1].y],
      ])
      .fill("none")
      .stroke({
        width: 1,
        color: "#FF0000",
      });
  } else if (KFK.freeHandPoints.length > 2) {
    KFK.plotFreeHandPoints(KFK.freeHandDrawing, KFK.freeHandPoints);
  }
};
KFK.plotFreeHandPoints = function(drawing, points) {
  let arr = [];
  for (let i = 0; i < points.length; i++) {
    arr.push([Math.round(points[i].x), Math.round(points[i].y)]);
  }
  drawing.plot(arr);
};

KFK.isDuringKuangXuan = function() {
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

KFK.addMinimap = function() {
  KFK.refreshC3Event = new CustomEvent("refreshC3");
  KFK.zoomEvent = new CustomEvent("zoomC3");
  //$("#minimap").minimap(KFK, KFK.JS1, KFK.JC3, KFK.JC1);
  import("./minimap/jquery-minimap").then((pack) => {
    KFK.MiniMap = pack.MiniMap;
    KFK.MiniMap.minimap($("#minimap"), KFK);
    KFK.MiniMap.init();
  });
};

KFK.get13Number = function(str) {
  let arr = str.split("");
  let num = 0;
  arr.forEach((ch) => {
    num += ch.codePointAt(0);
  });
  num = num % 13;
  return num;
};

KFK.upateUserMousePos = function(user, x, y) {
  let pos = {
    x: KFK.scrXToJc1X(x),
    y: KFK.scrYToJc1Y(y),
  };
  let bglabel = user.name;

  if (KFK.mouseTimer !== null) {
    clearTimeout(KFK.mouseTimer);
  }
  let consisedUser = {
    userid: user.userid,
    name: user.name,
  };
  KFK.mouseTimer = setTimeout(function() {
    KFK.WS.put("MOUSE", {
      user: consisedUser,
      pos: pos,
    });
    KFK.mouseTimer = null;
  }, 5);
  //  KFK.WS.put("MOUSE", { user: consisedUser, pos: pos });
};

KFK.showOtherUserMovingBadge = function(mouse) {
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
  wwidth = KFK.scalePoint(wwidth);
  wheight = KFK.scalePoint(wheight);
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

KFK.resetNodeZIndex = function(data) {
  $.each(data, (i, val) => {
    $(`#${i}`).css("z-index", val);
  });
};

KFK.moveLineMoverTo = function(position) {
  $("#linetransformer").css("left", position.x - 10);
  $("#linetransformer").css("top", position.y - 10);
};
/**
 * 选定一个元素
 */
KFK.selectNode = function(jqDIV) {
  jqDIV.addClass("selected");
  KFK.selectedDIVs.push(jqDIV);
  KFK.setSelectedNodesBoundingRect();
};

/**
 * 根据选定的多个元素，显示其周围的边框
 */
KFK.setSelectedNodesBoundingRect = function() {
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
KFK.kuangXuan = function(pt1, pt2) {
  let x1 = pt1.x + KFK.LeftB;
  let y1 = pt1.y + KFK.TopB;
  let x2 = pt2.x + KFK.LeftB;
  let y2 = pt2.y + KFK.TopB;
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
KFK.unScalePoint = (pt) => {
  return pt * KFK.scaleRatio;
};
KFK.endKuangXuan = function(pt1, pt2, shiftKey) {
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
  console.log(rect);
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

  KFK.JC3.find(".kfkshape").each((index, shape) => {
    let svgShape = SVG(shape);
    let shapeRect = KFK.getShapeRect(svgShape);
    if (
      rect.left < shapeRect.right &&
      rect.right > shapeRect.left &&
      rect.top < shapeRect.bottom &&
      rect.bottom > shapeRect.top
    ) {
      KFK.selectShape(svgShape);
      console.log(svgShape.attr("id"));
    }
  });
  if (KFK.selectedDIVs.length > 1) {
    KFK.AI("multi_select");
    KFK.resetPropertyOnMultipleNodesSelected();
  }
};

KFK.selectShape = function(theShape) {
  let alreadySelected = false;
  for (let i = 0; i < KFK.selectedShapes.length; i++) {
    if (KFK.selectedShapes[i].attr("id") === theShape.attr("id")) {
      alreadySelected = true;
      break;
    }
  }
  if (alreadySelected) return;
  KFK.selectedShapes.push(theShape);
  let prevWidth = theShape.attr("stroke-width");
  prevWidth = KFK.unpx(prevWidth);
  theShape.addClass("selected");
  let color = theShape.attr("origin-color");
  KFK.shapeOriginColor = color;
  let color1 = KFK.reverseColor(color);
  let originWidth = theShape.attr("origin-width");
  let newWidth = originWidth * 2 > 6 ? originWidth : 6;
  theShape.stroke({
    width: newWidth,
    color: "#0000FF",
  });
};
KFK.isShapeSelected = function(theShape) {
  if (KFK.selectedShapes.length <= 0) {
    return false;
  } else {
    if (KFK.selectedShapes.indexOf(theShape) >= 0) {
      return true;
    } else {
      return false;
    }
  }
};
KFK.deselectShape = function(theShape) {
  let color = theShape.attr("origin-color");
  console.log("deselectShape", theShape, "origin-color", color);
  theShape.removeClass("selected");
  KFK.shapeOriginColor = color;
  let originWidth = theShape.attr("origin-width");
  theShape.stroke({
    width: originWidth,
    color: color,
  });
  let index = KFK.selectedShapes.indexOf(theShape);
  if (index >= 0) {
    KFK.selectedShapes.splice(index, 1);
  }
};

KFK.getShapeConfig = function(shapeType) {
  return KFK.APP.model.svg[shapeType];
};

KFK.getShapeRectFromJqObj = function(shape) {
  return KFK.getShapeRect(SVG(shape));
};
KFK.getShapeRect = function(svgShape) {
  let x = svgShape.x();
  let y = svgShape.y();
  let width = svgShape.width();
  let height = svgShape.height();
  return {
    left: x,
    top: y,
    right: x + width,
    bottom: y + height,
    center: x + width * 0.5,
    middle: y + height * 0.5,
    width: width,
    height: height,
  };
};

KFK.deselectNode = function(theDIV) {
  $(theDIV).removeClass("selected");
  let index = KFK.selectedDIVs.indexOf(theDIV);
  KFK.selectedDIVs.splice(index, 1);
  KFK.setSelectedNodesBoundingRect();
};

KFK.selectNodeOnClick = function(jqDIV, shiftKey) {
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

KFK.getNearGridPoint = function(x, y) {
  if (y === undefined && x.x) {
    return KFK._getNearGridPoint(x.x, x.y);
  } else {
    return KFK._getNearGridPoint(x, y);
  }
};
KFK._getNearGridPoint = function(x, y) {
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
    y: newY,
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
  } else {
    return v;
  }
};

/**
 * a Node object 放在起中心位置，构建Node对象时使用的x,y指的是其中心位置
 * 在实际放置时，需要算出它的左上角位置
 *
 * @param node a Node object
 * @return the left/top point of the node
 */
KFK.ltPos = function(node) {
  return {
    x: node.x - node.width * 0.5,
    y: node.y - node.height * 0.5,
  };
};

KFK.getNodeTextAlignment = function(jqDiv) {
  let ret = "left";
  let jcTmp = jqDiv.css("justify-content");
  if (jcTmp === "flex-start") ret = "left";
  else if (jcTmp === "center") ret = "center";
  else if (jcTmp === "flex-end") ret = "right";

  return ret;
};

KFK.setNodeTextAlignment = function(jqElem, theType, align) {
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

KFK.editTextNodeWithTextArea = function(
  innerNode,
  theDIV,
  enterSelect = false
) {
  let jDIV = $(theDIV);
  KFK.isEditting = true;
  theDIV.editting = true;
  innerNode.editting = true;
  let oldText = innerNode.innerText;
  let oldHTML = innerNode.innerHTML;
  if (jDIV.attr("nodetype") === "comment") {
    if (oldText.indexOf("---") > 0)
      oldText = oldText.substr(0, oldText.indexOf("---"));
  }
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
  let nodeType = theDIV.getAttribute("nodetype");
  if (nodeType && nodeType === "comment") {
    textarea.style.left = KFK.px(KFK.unpx(theDIV.style.left) + 15);
    textarea.style.width = KFK.px(KFK.unpx(theDIV.style.width) - 15);
  } else {
    textarea.style.left = theDIV.style.left;
    textarea.style.width = theDIV.style.width;
  }
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

  textarea.oncopy = function(evt) {
    evt.stopPropagation();
  };
  textarea.onpaste = function(evt) {
    evt.stopPropagation();
  };
  textarea.oncut = function(evt) {
    evt.stopPropagation();
  };

  textarea.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 13) {
      let finishEdit = false;
      if (
        KFK.APP.model.viewConfig.enterToConfirmInput &&
        !(evt.shiftKey || evt.ctrlKey || evt.metaKey)
      ) {
        finishEdit = true;
      } else if (
        !KFK.APP.model.viewConfig.enterToConfirmInput &&
        (evt.shiftKey || evt.ctrlKey || evt.metaKey)
      ) {
        finishEdit = true;
      }
      if (finishEdit) {
        console.log("finishEdit now");
        innerNode.innerText = textarea.value;
        if (jDIV.attr("nodetype") === "comment") {
          innerNode.innerHTML =
            textarea.value + "<BR>---" + KFK.APP.model.cocouser.name;
        }
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
      if (jDIV.attr("nodetype") === "comment") {
        innerNode.innerHTML =
          textarea.value + "<BR>---" + KFK.APP.model.cocouser.name;
      }
      removeTextarea(textarea.value !== oldText);
      KFK.focusOnC3();
    }
  }
  setTimeout(() => {
    window.addEventListener("click", handleOutsideClick);
  });
};

KFK.getKFKNodeNumber = function() {
  let nodes = KFK.JC3.find(".kfknode");
  return nodes.length;
};

KFK.onImportBrKeyDown = async function(evt) {
  evt.stopPropagation();
  //缺省情况下，textarea中输入tab时，会跳到下一个控件上，
  //下面的代码防止缺省行为，并在正确位置插入TAB符号
  if (evt.keyCode == 9) {
    evt.preventDefault();
    let txtarea = document.getElementById("textarea-importbr");
    var start = txtarea.selectionStart;
    var end = txtarea.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(txtarea).val(
      $(txtarea)
        .val()
        .substring(0, start) +
        "\t" +
        $(txtarea)
          .val()
          .substring(end)
    );

    // put caret at right position again
    txtarea.selectionStart = txtarea.selectionEnd = start + 1;
  }
};

KFK.beginImportBr = async function() {
  const TP = require("./textParser").TP;
  let brainRoot = KFK.lastFocusOnJqNode;
  if (NotSet(brainRoot)) {
    let x = (y = w = h = 0);
    x = KFK.scalePoint(KFK.scrXToJc3X(KFK.currentMousePos.x));
    y = KFK.scalePoint(KFK.scrYToJc3Y(KFK.currentMousePos.y));
    w = 140;
    h = 100;
    brainRoot = await KFK.placeNode(
      false,
      KFK.myuid(),
      "textblock",
      "default",
      x,
      y,
      w,
      h,
      "脑图中心节点",
      ""
    );
  }
  let rootX = KFK.divCenter(brainRoot);
  let rootY = KFK.divMiddle(brainRoot);
  let rootWidth = KFK.divWidth(brainRoot);
  TP.setDimension(100, 20, 40, 80, rootX, rootY, rootWidth);
  TP.parse(KFK.APP.model.importbrtext, async function(arr) {
    let brainRootClone = brainRoot.clone();
    let Nodes = [];
    for (let i = 0; i < arr.length; i++) {
      let aJNode = await KFK.placeNode(
        false,
        arr[i].nodeid,
        "textblock",
        "default",
        arr[i].left,
        arr[i].top,
        TP.nodeWidth,
        TP.nodeHeight,
        arr[i].str,
        ""
      );
      //修改背景和边框为透明
      aJNode.css("background-color", "transparent");
      aJNode.css("border-color", "transparent");
      if (arr[i].tab === 0) {
        KFK.drawConnect(brainRoot, aJNode);
        KFK.buildConnectionBetween(brainRoot, aJNode);
      } else {
        let parentJQ = $("#" + arr[i].parent_nodeid);
        KFK.drawConnect(parentJQ, aJNode);
        KFK.buildConnectionBetween(parentJQ, aJNode);
      }
      Nodes.push(aJNode);
    }
    for (let i = 0; i < Nodes.length; i++) {
      await KFK.syncNodePut(
        "C",
        Nodes[i],
        "importBr",
        null,
        false,
        i,
        arr.length
      );
      await KFK.sleep(100);
    }
    await KFK.syncNodePut(
      "U",
      brainRoot,
      "importBr",
      brainRootClone,
      false,
      0,
      1
    );
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
KFK.placeNode = async function(
  shiftKey,
  id,
  type,
  variant,
  x,
  y,
  w,
  h,
  attach,
  attach2
) {
  if (w === undefined || h === undefined) {
    console.log(w, h);
    let dds = { w: 100, h: 40 };
    if (shiftKey) {
      dds = KFK.getNodeDynamicDefaultSize(type, variant);
    } else {
      dds = KFK.getNodeDefaultSize(type, variant);
    }
    w = dds.w;
    h = dds.h;
  }
  if (KFK.pmsOk("C") === false) {
    KFK.scrLog("请检查文档内容权限");
    return;
  }
  let aNode = new Node(id, type, variant, x, y, w, h, attach, attach2);

  let nodeDIV = await KFK._createNode(aNode);
  let jqDIV = $(nodeDIV);
  jqDIV.attr("creator", KFK.APP.model.cocouser.userid);
  KFK.justCreatedJqNode = jqDIV;
  KFK.lastCreatedJqNode = jqDIV;
  if (type === "md") {
    console.log("Cretaed node is a MD, set preview now");
    KFK.setMarkdownWithPreview(jqDIV);
  } else {
    console.log("Cretaed node is not a MD");
  }

  //如果在脑图模式下，则自动建立脑图链接
  await KFK.LinkFromBrainCenter(KFK.justCreatedJqNode);

  return jqDIV;
};

KFK.setMarkdownWithPreview = function(jqDIV) {
  let textAreaId = "ta_" + jqDIV.attr("id");
  if (KFK.addEasyMDE) {
    KFK.addEasyMDE(textAreaId);
    setTimeout(() => {
      console.log("preview", textAreaId);
      KFK.MDEs[textAreaId].togglePreview();
    }, 2);
  } else {
    import("./easyMDE").then((pack) => {
      KFK.myMDE = pack.MyMDE;
      KFK.addEasyMDE = pack.MyMDE.addEasyMDE;
      KFK.addEasyMDE(textAreaId);
      setTimeout(() => {
        console.log("preview", textAreaId);
        KFK.MDEs[textAreaId].togglePreview();
      }, 2);
    });
  }
};

KFK.LinkFromBrainCenter = async function(jqNode) {
  if (KFK.brainstormMode && KFK.brNodeId) {
    let brNode = KFK.getNodeById(KFK.brNodeId);
    let divBefore = brNode.clone();
    divBefore.find(".brsnode").remove();
    KFK.drawConnect(brNode, jqNode);
    KFK.buildConnectionBetween(brNode, jqNode);

    await KFK.syncNodePut(
      "U",
      brNode.clone(),
      "brainstorm",
      divBefore,
      false,
      0,
      1
    );
  }
};
KFK._createNode = async function(node) {
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
  } else if (node.type === "md") {
    innerObj = document.createElement("div");
  } else if (node.type === "comment") {
    innerObj = document.createElement("div");
  } else {
    KFK.debug(`${node.type} is not supported`);
    return;
  }
  innerObj.innerHTML = node.attach
    ? node.attach
    : cocoConfig.node[node.type].inner.content;
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
  if (node.type === "md") {
    let textAreaId = "ta_" + node.id;
    let textAreaStyle = "width:100%; height:100%; resize:none;";
    let tmp = $(
      "<textarea id='" +
        textAreaId +
        "' style='" +
        textAreaStyle +
        "'>" +
        "# header #" +
        "</textarea>"
    );
    tmp.appendTo(jInner);
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
  jqNodeDIV.attr("cnwidth", KFK.dynamic.connect.width);
  jqNodeDIV.attr("cncolor", KFK.dynamic.connect.color);
  jqNodeDIV.attr("cnstyle", KFK.dynamic.connect.style);
  //default padding for all
  $(nodeDIV).attr("variant", "default");
  //click时，切换selected状态
  if (node.type === "yellowtip") {
    //create tip
    KFK._setTipBkgImage(
      jqNodeDIV,
      cocoConfig.node.yellowtip.defaultTip,
      cocoConfig.node.yellowtip.defaultColor
    );
    jqNodeDIV.attr("variant", cocoConfig.node.yellowtip.defaultTip);
    jqNodeDIV.addClass("yellowtip");
  } else if (node.type === "comment") {
    KFK._setTipBkgImage(
      jqNodeDIV,
      cocoConfig.node.comment.defaultTip,
      cocoConfig.node.comment.defaultColor
    );
    jqNodeDIV.attr("variant", cocoConfig.node.comment.defaultTip);
    // jqNodeDIV.css("width", rect.w);
    // jqNodeDIV.css("height", rect.h);
    jqNodeDIV.addClass("comment");
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
    KFK.setTipBkgColor(jqNodeDIV, cocoConfig.node.yellowtip.defaultColor);
  } else if (node.type === "comment") {
    KFK.setTipBkgColor(jqNodeDIV, cocoConfig.node.comment.defaultColor);
  }

  KFK.C3.appendChild(nodeDIV);

  await KFK.setNodeEventHandler(jqNodeDIV);

  return nodeDIV;
};

//删除添加eventHandler带来的额外的、会引起复制节点event响应不正常的内容
KFK.cleanNodeEventFootprint = function(jqNodeDIV) {
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
KFK.cleanTodoChatForBackup = function(jqNodeDIV) {
  jqNodeDIV.find(".original").removeClass("original");
  jqNodeDIV.removeClass("chatlist todolist");
};

KFK.syncNodeContentPut = async function(nodeID, content) {
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

KFK.syncNodePut = async function(
  cmd,
  jqDIV,
  reason,
  jqBeforeChange,
  isUndoRedo = false,
  ser = 0,
  count = 1
) {
  if (KFK.docIsReadOnly()) return;
  if (KFK.pmsOk(cmd, jqDIV) === false) {
    KFK.scrLog("未保存，请检查内容权限");
    return;
  }
  if (KFK.nodeLocked(jqDIV)) return;
  if (jqDIV) {
    jqDIV.find(".brsnode").remove();
    jqDIV.find(".node_button_area").remove();
    jqDIV.find(".nodeMessage").remove();
  }
  if (jqBeforeChange) jqBeforeChange.find(".brsnode").remove();
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
    let isOffline = tobeSync.hasClass("offline");
    tobeSync.removeClass("offline");
    if (tobeSync.find(".CodeMirror").length > 0) {
      tobeSync = KFK.myMDE.getCleanMdDiv(tobeSync);
    }

    let htmlContent = tobeSync.prop("outerHTML");
    console.log("PUT", htmlContent);
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
    if (isUndoRedo === false && reason !== "todo" && reason !== "chat") {
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

    let rect = {
      left: 0,
      top: 0,
      right: KFK.PageWidth,
      bottom: KFK.PageHeight,
    };
    let onP1Before = false;
    let onP1New = false;
    if (jqBeforeChange) {
      let divBeforeRect = KFK.divRect(jqBeforeChange);
      if (
        rect.left < divBeforeRect.right &&
        rect.right > divBeforeRect.left &&
        rect.top < divBeforeRect.bottom &&
        rect.bottom > divBeforeRect.top
      ) {
        onP1Before = true;
      }
    }
    let divRect = KFK.divRect(jqDIV);
    if (
      rect.left < divRect.right &&
      rect.right > divRect.left &&
      rect.top < divRect.bottom &&
      rect.bottom > divRect.top
    ) {
      onP1New = true;
    }
    payload.onp1 = onP1Before || onP1New;

    console.log("onP1", payload.onp1);

    let result = await KFK.sendCmd(cmd, payload);
    //TODO: 仔细考虑离线处理策略
    if (result === false) {
      jqDIV.addClass("offline");
    }
  } catch (err) {
    KFK.debug(err);
  } finally {
    KFK.C3.dispatchEvent(KFK.refreshC3Event);
  }
};

KFK.syncLinePut = async function(cmd, svgLine, reason, svgFrom, isUndoRedo) {
  if (KFK.docIsReadOnly()) return;
  if (KFK.pmsOk(cmd, svgLine) === false) {
    KFK.scrLog("未保存，请检查内容权限");
    return;
  }

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

    //let svgShape = SVG(shape);
    let rect = {
      left: 0,
      top: 0,
      right: KFK.PageWidth,
      bottom: KFK.PageHeight,
    };
    let onP1Before = false;
    let onP1New = false;
    if (svgFrom) {
      let beforeRect = KFK.getShapeRect(svgFrom);
      if (
        rect.left < beforeRect.right &&
        rect.right > beforeRect.left &&
        rect.top < beforeRect.bottom &&
        rect.bottom > beforeRect.top
      ) {
        onP1Before = true;
      }
    }
    let shapeRect = KFK.getShapeRect(svgLine);
    if (
      rect.left < shapeRect.right &&
      rect.right > shapeRect.left &&
      rect.top < shapeRect.bottom &&
      rect.bottom > shapeRect.top
    ) {
      onP1New = true;
    }
    payload.onp1 = onP1Before || onP1New;
    console.log("onP1", payload.onp1);
    let result = await KFK.sendCmd(cmd, payload);
    if (result === false) {
      svgLine.addClass("offline");
    }
  } catch (err) {
    KFK.debug(err);
  } finally {
    KFK.C3.dispatchEvent(KFK.refreshC3Event);
  }
};

KFK.yarkOpEntry = function(opEntry) {
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

KFK.showDocOpMenu = function(doc, index, evt) {
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

KFK.hideDocOpMenu = function() {
  let docopmenu = $(".docopmenu");
  docopmenu.addClass("noshow");
};

//jqNode can be a node or even a svgline
KFK.anyLocked = function(jqNode) {
  if (jqNode) return KFK.docIsReadOnly() || KFK.nodeLocked(jqNode);
  else return KFK.docIsReadOnly();
};

KFK.notAnyLocked = function(jqNode) {
  return !KFK.anyLocked(jqNode);
};

KFK.docIsReadOnly = function() {
  return KFK.APP.model.cocodoc.readonly;
};
KFK.docIsNotReadOnly = function() {
  return !KFK.APP.model.cocodoc.readonly;
};

KFK.nodeLocked = function(jqNode) {
  //Even works for svline, because svg line has .hasClass function as well
  return jqNode.hasClass("lock");
};
KFK.lineLocked = function(svgLine) {
  return svgLine.hasClass("lock");
};

KFK.setModeIndicatorForYellowTip = function(tipvariant) {
  if ($("#modeIndicatorDiv").length < 1) {
    KFK.debug("modeIndicatorDiv not found");
    return;
  }
  $("#modeIndicatorDiv").empty();
  console.log(tipvariant);
  let svg = $(SVGs[tipvariant]);
  if (NotSet(svg)) {
    svg = $(
      "<img src='" + cocoConfig.frontend.url + "/svgs/" + tipvariant + ".svg'/>"
    );
    console.log("use div");
  }
  svg.css("width", "18px");
  svg.css("height", "18px");
  console.log(svg);
  svg.appendTo($("#modeIndicatorDiv"));
};

KFK.setTipVariant = async function(tipvariant, shiftKey = false) {
  if (shiftKey) {
    await KFK.updateSelectedDIVs("set tip variant", async function(jqNode) {
      let oldColor = KFK.getTipBkgColor(jqNode);
      jqNode.attr("variant", tipvariant);
      KFK._setTipBkgImage(jqNode, tipvariant, oldColor);
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

KFK._setTipBkgImage = function(jqDIV, svgid, svgcolor) {
  jqDIV.find(".tip_bkg").remove();
  let bkg = undefined;
  let isInnerSvg = false;
  if (NotSet(SVGs[svgid])) {
    bkg = $(
      "<img src='" + cocoConfig.frontend.url + "/svgs/" + svgid + ".svg'/>"
    );
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

KFK.setTipBkgColor = function(theJqNode, bgColor) {
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
KFK.getTipBkgColor = function(jqNode) {
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

KFK.stringToArray = function(str) {
  let arr = [];
  if (str) {
    arr = str.split(",");
    if (arr.length === 1 && arr[0] === "") arr = [];
  }
  return arr;
};

KFK.getNodeLinkIds = function(jq1, direction) {
  let linksStr = jq1.attr(direction);
  let linksArr = KFK.stringToArray(linksStr);
  //过滤掉不存在的节点
  // linksArr = linksArr.filter((aId) => {
  //   return $(`#${aId}`).length > 0;
  // })
  return linksArr;
};

KFK.removeConnectById = function(connect_id) {
  try {
    KFK.svgDraw.find(`.${connect_id}`).remove();
  } catch (err) {}
  let triangle_id = connect_id + "_triangle";
  try {
    KFK.svgDraw.find(`.${triangle_id}`).remove();
  } catch (err) {}
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

KFK.redrawLinkLines = function(
  jqNode,
  reason = "unknown",
  bothside = true,
  allowConnectPoints = [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ]
) {
  // KFK.debug('Redrawlinks', reason, 'bothside', bothside);
  if (!(jqNode instanceof jQuery)) {
    console.error(
      "redrawLinkLines for a non-jquery object, sometime caused by no await"
    );
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
      KFK.drawConnect(
        jqNode,
        jqTo,
        allowConnectPoints[0],
        allowConnectPoints[1]
      );
    }
  });
  if (bothside) {
    KFK.JC3.find(".kfknode").each((index, aNode) => {
      let jqConnectFrom = $(aNode);
      if (jqConnectFrom.attr("id") !== myId) {
        let arr = KFK.stringToArray(jqConnectFrom.attr("linkto"));
        if (arr.indexOf(myId) >= 0)
          KFK.drawConnect(
            jqConnectFrom,
            jqNode,
            allowConnectPoints[2],
            allowConnectPoints[3]
          );
      }
    });
  }
};

//resize node时，记下当前shape variant的size，下次创建同样shape时，使用这个size
KFK.setNodeDynamicDefaultSize = function(nodeType, variant, width, height) {
  if (KFK.dynamicSize[nodeType] === undefined) KFK.dynamicSize[nodeType] = {};
  if (KFK.dynamicSize[nodeType][variant] === undefined)
    KFK.dynamicSize[nodeType][variant] = {};
  KFK.dynamicSize[nodeType][variant].width = width;
  KFK.dynamicSize[nodeType][variant].height = height;
  KFK.dynamicSize[nodeType].width = width;
  KFK.dynamicSize[nodeType].height = height;
};

KFK.getNodeDynamicDefaultSize = function(nodeType, variant) {
  let ret = {};
  //如果有 defaultSize[nodeType][variant]
  if (
    KFK.dynamicSize[nodeType] &&
    KFK.dynamicSize[nodeType][variant] &&
    KFK.dynamicSize[nodeType][variant].width &&
    KFK.dynamicSize[nodeType][variant].height
  ) {
    ret = {
      w: KFK.dynamicSize[nodeType][variant].width,
      h: KFK.dynamicSize[nodeType][variant].height,
    };
  } else if (
    KFK.dynamicSize[nodeType] &&
    KFK.dynamicSize[nodeType].width &&
    KFK.dynamicSize[nodeType].height
  ) {
    //如果有 defaultSize[nodeType]
    ret = {
      w: KFK.dynamicSize[nodeType].width,
      h: KFK.dynamicSize[nodeType].height,
    };
  } else {
    //如果上面两个都没有，则调用getNodeDefaultSize
    ret = KFK.getNodeDefaultSize(nodeType, variant);
  }
  return ret;
};

KFK.getNodeDefaultSize = function(nodeType, variant) {
  if (
    KFK.config.defaultSize[nodeType] &&
    KFK.config.defaultSize[nodeType][variant] &&
    KFK.config.defaultSize[nodeType][variant].width &&
    KFK.config.defaultSize[nodeType][variant].height
  ) {
    ret = {
      w: KFK.config.defaultSize[nodeType][variant].width,
      h: KFK.config.defaultSize[nodeType][variant].height,
    };
  } else if (
    KFK.config.node[nodeType] &&
    KFK.config.node[nodeType].style &&
    KFK.config.node[nodeType].style.width &&
    KFK.config.node[nodeType].style.height
  ) {
    ret = {
      w: KFK.config.node[nodeType].style.width,
      h: KFK.config.node[nodeType].style.height,
    };
  } else {
    ret = {
      w: 100,
      h: 40,
    };
  }
  return ret;
};

//用于对已有的nodeEvent进行修改控制，如enable, disable, destroy
//action: one of resizable/droppable/draggable
//cmd: one of enable, disable destroy
KFK.updateNodeEvent = function(jqNode, action, cmd) {
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

/**
 * 只是检查是否不包含“noedit" class, 以及是否有innerlink属性
 */
KFK.updateable = function(jqNode) {
  if (KFK.isNotA(jqNode, "noedit") || jqNode.attr("innerlink")) {
    return true;
  } else {
    return false;
  }
};
KFK.setNodeEventHandler = async function(jqNodeDIV, callback) {
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
        resize: () => {},
        stop: async (evt) => {
          KFK.debug("Stop Resizing...");
          KFK.pointAfterResize = {
            x: evt.clientX,
            y: evt.clientY,
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
          KFK.setNodeDynamicDefaultSize(
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

          if (KFK.updateable(jqNodeDIV)) {
            await KFK.syncNodePut(
              "U",
              jqNodeDIV.clone(),
              "resize node",
              KFK.fromJQ,
              false,
              0,
              1
            );
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
      y: 0,
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
          top: (evt.clientY - click.y + original.top) / KFK.scaleRatio,
        };
      },
      stop: async (evt, ui) => {
        KFK.dragging = false;

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
        //move nodes, move divs, drag divs end, end drag divs
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
              if (KFK.updateable(KFK.selectedDIVs[i])) {
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
        if (KFK.updateable(jqNodeDIV)) {
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
          if (KFK.isA(jqNodeDIV, "noedit")) return;
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
        KFK.AI("hover_div");
        KFK.onC3 = true;
        // jqNodeDIV.find(".cocoeditors").css("display", "block");
        // jqNodeDIV.find(".lastcocoeditor").css("display", "none");
        // jqNodeDIV.resizable('enable');

        if (jqNodeDIV.attr("jump")) {
          let nodeButtonArea = jqNodeDIV.find(".node_button_area");
          if (nodeButtonArea.length === 0) {
            nodeButtonArea = $("<div></div>");
            nodeButtonArea.addClass("node_button_area");
            nodeButtonArea.appendTo(jqNodeDIV);
          }
          let jumpDot = $("<div></div>");
          jumpDot.addClass("jump");
          jumpDot.appendTo(nodeButtonArea);
          jumpDot.on("click", async (evt) => {
            evt.stopPropagation();
            await KFK.tryToJump(jqNodeDIV);
          });
          jumpDot.hover(
            () => {
              KFK.showNodeMessage(jqNodeDIV, "点击跳转");
            },
            () => {
              KFK.clearNodeMessage(jqNodeDIV);
            }
          );
          let jumpRemoveDot = $("<div></div>");
          jumpRemoveDot.addClass("jumpremove");
          jumpRemoveDot.appendTo(nodeButtonArea);
          jumpRemoveDot.hover(
            () => {
              KFK.showNodeMessage(jqNodeDIV, "点击删除跳转");
            },
            () => {
              KFK.clearNodeMessage(jqNodeDIV);
            }
          );
          jumpRemoveDot.on("click", async (evt) => {
            evt.stopPropagation();
            jqNodeDIV.find(".node_button_area").remove();
            let oldDIV = jqNodeDIV.clone();
            jqNodeDIV.removeAttr("jump");
            await KFK.syncNodePut(
              "U",
              jqNodeDIV.clone(),
              "remove jump",
              oldDIV,
              false,
              0,
              1
            );
          });
        }
        // }else{
        //     let addJumpDot = $("<div></div>");
        //     addJumpDot.addClass("addjump");
        //     addJumpDot.appendTo(jqNodeDIV);
        //     addJumpDot.on('click', (evt)=>{
        //         evt.stopPropagation();
        //         KFK.waitForJumpDotDIV = jqNodeDIV;
        //         console.log("Waiting ndoe", KFK.waitForJumpDotDIV.attr("id"));
        //         KFK.scrLog("点选要跳转的节点");
        //     });
        // }
      },
      () => {
        $(document.body).css("cursor", "default");
        jqNodeDIV.removeClass("shadow1");
        // jqNodeDIV.resizable('disable');
        KFK.hoverJqDiv(null);
        KFK.onC3 = true;
        jqNodeDIV.find(".node_button_area").remove();
        let show_editor = KFK.APP.model.viewConfig.showEditor;
        if (show_editor === "none") {
          jqNodeDIV.find(".cocoeditors").css("display", "none");
          jqNodeDIV.find(".lastcocoeditor").css("display", "none");
        } else if (show_editor === "last") {
          jqNodeDIV.find(".cocoeditors").css("display", "none");
          jqNodeDIV.find(".lastcocoeditor").css("display", "block");
        } else if (show_editor === "all") {
          jqNodeDIV.find(".cocoeditors").css("display", "block");
          jqNodeDIV.find(".lastcocoeditor").css("display", "none");
        }
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
    jqNodeDIV.click(async (evt) => {
      KFK.hide($(".clickOuterToHide"));
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
      if (KFK.isEditting && KFK.mdEdittingNode) {
        if (KFK.mdEdittingNode !== jqNodeDIV) {
          KFK.myMDE.finishMdEditting(false, KFK.mdEdittingNode.attr("id"));
        }
        evt.stopImmediatePropagation();
        evt.stopPropagation();
        evt.preventDefault();
        return;
      }

      if (KFK.waitForJumpDotDIV) {
        let oldDIV = KFK.waitForJumpDotDIV.clone();
        KFK.waitForJumpDotDIV.attr("jump", jqNodeDIV.attr("id"));
        console.log(
          KFK.waitForJumpDotDIV.attr("id"),
          "jump to ",
          jqNodeDIV.attr("id")
        );
        await KFK.syncNodePut(
          "U",
          KFK.waitForJumpDotDIV.clone(),
          "add jump",
          oldDIV,
          false,
          0,
          1
        );
        KFK.waitForJumpDotDIV = undefined;
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
        let innerLink = jqNodeDIV.attr("innerlink");
        if (innerLink) {
          evt.preventDefault();
          console.log(evt);
          if (evt.target.href) {
            if (innerLink.startsWith("dou=")) {
              let dou = innerLink.substr(4);
              await KFK.sendCmd("OPENSHAREDDOC", { shareCode: dou });
            } else if (innerLink.match(/^[0-9a-fA-F]{24}$/)) {
              await KFK.refreshDesignerWithDoc(innerLink, "");
            }
          }
        }
        KFK.selectNodeOnClick(jqNodeDIV, evt.shiftKey);
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
      } else if (KFK.mode === "jump") {
        if (KFK.afterDragging === false) {
          KFK.yarkJumpNode(jqNodeDIV, evt.shiftKey, "", KFK.FROM_CLIENT);
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
        KFK.setMode("pointer");
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    //dblclick to edit
    jqNodeDIV.dblclick(async function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      //Don't edit todolist direclty, show edit dialog instead.
      //double click to edit
      if (jqNodeDIV.hasClass("noedit")) {
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

KFK.cancelMdEditting = function(nodeid) {
  KFK.myMDE.cancelMdEditting(false, nodeid);
};
/**
 * 从一个节点，向其attr jump所记录ID的节点跳转
 */
KFK.tryToJump = async function(jqDIV) {
  if (NotSet(jqDIV)) jqDIV = KFK.getFocusHoverLastCreate();
  console.log("tryToJump at ", jqDIV.text());
  if (jqDIV && jqDIV.attr("jump")) {
    let followDIV = $(`#${jqDIV.attr("jump")}`);
    if (followDIV.length <= 0) {
      return;
    }
    followDIV = followDIV.first();
    await KFK.addFromTo(jqDIV, followDIV);
    console.log(jqDIV.text(), " jump to ", followDIV.text());
    KFK.scrollToNode(followDIV);
  }
};

KFK.tryToJumpBack = function() {
  KFK.jumpToPrevious(false);
};

// getSelection、createRange兼容
KFK.isSupportRange = function() {
  return (
    typeof document.createRange === "function" ||
    typeof window.getSelection === "function"
  );
};

KFK.getCurrentRange = function() {
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
KFK.insertHtmlAfterRange = function(html) {
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

KFK.cleanTextInput = function(jInner, allowBR) {
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
KFK.startInlineEditing = function(jqNodeDIV) {
  KFK.isEditting = true;
  jqNodeDIV.find(".innerobj").focus();
  KFK.inlineEditor = jqNodeDIV;
  let allowBR = jqNodeDIV.attr("nodetype") !== "text";
  //div keydown
  jqNodeDIV.keydown(function(evt) {
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
KFK.endInlineEditing = function() {
  KFK.isEditting = false;
  KFK.inlineEditor = null;
};

/**
 * 开始节点编辑，根据节点类型，相应使用不同的编辑器
 * 单行文字用inline editing，  textblock和yellowtip用textarea， richtext用Quill
 */
KFK.startNodeEditing = async function(jqNodeDIV, enterSelect) {
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
      nodeid: jqNodeDIV.attr("id"),
    });
  } else if (jqNodeDIV.attr("nodetype") === "md") {
    KFK.askMd = jqNodeDIV;
    await KFK.sendCmd("ASKMD", {
      nodeid: jqNodeDIV.attr("id"),
    });
  } else KFK.startNodeEditing_withTextArea(jqNodeDIV, enterSelect);
};

KFK.finishQuillEditting = async function() {
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

KFK.cancelQuillEditting = async function(byName) {
  let jInner = KFK.quillEdittingNode.find(".innerobj");
  if (!jInner.hasClass("ql-viewer")) jInner.addClass("ql-viewer");
  if (!jInner.hasClass("ql-editor")) jInner.addClass("ql-editor");
  $(".ql-toolbar").remove();
  KFK.quillEdittingNode.draggable("enable");

  //quilling-by显示两秒
  $(".quilling-by").remove();
  let jtmp = $(`<div class="quilling-by">${byName}</div>`);
  jtmp.appendTo(KFK.quillEdittingNode);
  setTimeout(function() {
    jtmp.remove();
  }, 2000);

  KFK.isEditting = false;
  KFK.quillEdittingNode = undefined;
};

KFK.onStopQuill = async function(nodeid, byName) {
  if (KFK.quillEdittingNode) {
    if (KFK.quillEdittingNode.attr("id") === nodeid) {
      KFK.cancelQuillEditting(byName);
    }
  }
};
KFK.onStopMd = async function(nodeid, byName) {
  if (KFK.mdEdittingNode) {
    if (KFK.mdEdittingNode.attr("id") === nodeid) {
      KFK.cancelMdEditting(nodeid);
    }
  }
};

/**
 * 从服务器接收到 OKTOQUILL指令，启动QUILL编辑
 * @param nodeid  服务器传回的quill编辑对象ID， 是ASKTOQUILL时传上去的ID
 */
KFK.onOkToQuill = async function(nodeid) {
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

KFK.onOkToMd = async function(nodeid) {
  //做一些必要的检查后，启动quill编辑
  if (KFK.askMd !== undefined) {
    //服务器返回的nodeid应该与ASKTOQILL时所记录的KFK.askQuill对象的id一致
    let id = KFK.askMd.attr("id");
    let tmp = $(`#${id}`);
    if (tmp.length > 0 && id === nodeid) {
      KFK.startNodeEditing_withMd(KFK.askMd);
    }
    KFK.askMd = undefined;
  }
};

KFK.startNodeEditing_withQuill = function(jqNodeDIV) {
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

    [
      {
        list: "ordered",
      },
      {
        list: "bullet",
      },
    ],
    [
      {
        script: "sub",
      },
      {
        script: "super",
      },
    ], // superscript/subscript
    [
      {
        indent: "-1",
      },
      {
        indent: "+1",
      },
    ], // outdent/indent

    [
      {
        size: ["small", false, "large", "huge"],
      },
    ], // custom dropdown
    [
      {
        header: [1, 2, 3, 4, 5, 6, false],
      },
    ],

    [
      {
        color: [],
      },
      {
        background: [],
      },
    ], // dropdown with defaults from theme
    [
      {
        font: KFK.customQuillFontNames,
      },
    ],
    [
      {
        align: [],
      },
    ],

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
  jInner.keydown(function(evt) {
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
  KFK.quill.on("text-change", function(delta1, delta2, source) {
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

KFK.startNodeEditing_withMd = function(jqNodeDIV) {
  if (KFK.anyLocked(jqNodeDIV)) return;
  //disableBodyScroll(el(jqNodeDIV));
  KFK.beforeMdEdit = jqNodeDIV.clone();
  let jInner = jqNodeDIV.find(".innerobj");
  let divId = jqNodeDIV.attr("id");

  KFK.isEditting = true;
  jqNodeDIV.css("display", "block");
  jqNodeDIV.draggable("disable");
  KFK.mdEdittingNode = jqNodeDIV;
  //这个地方直观重要，这样就把这些按键限制在Quill Editor中
  //如果propogation上去的话，会导致整个浏览器窗口滚动
  jInner.keydown(function(evt) {
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
  let textAreaId = "ta_" + divId;
  KFK.lastMDInner = jInner;
  KFK.lastMDTextAreaId = textAreaId;
  KFK.lastTextArea = $("#" + textAreaId);
  //if (jInner.find(".CodeMirror").length < 1) {
  if (KFK.MDEs[KFK.lastMDTextAreaId]) {
    KFK.MDEs[KFK.lastMDTextAreaId].togglePreview();
  } else {
    KFK.addEasyMDE
      ? KFK.addEasyMDE(textAreaId)
      : import("./easyMDE").then((pack) => {
          KFK.myMDE = pack.MyMDE;
          KFK.addEasyMDE = pack.MyMDE.addEasyMDE;
          KFK.addEasyMDE(textAreaId);
        });
  }
  if (KFK.MDEIntervals[divId]) {
    clearInterval(KFK.MDEIntervals[divId]);
    delete KFK.MDEIntervals[divId];
  }
  KFK.MDEIntervals[divId] = setInterval(function() {
    KFK.myMDE.saveMdEditting(divId);
  }, 3000);
};

KFK.startNodeEditing_withTextArea = function(jqNodeDIV, enterSelect) {
  if (getBoolean(jqNodeDIV.attr("edittable")) && KFK.notAnyLocked(jqNodeDIV)) {
    KFK.fromJQ = jqNodeDIV.clone();
    let innerText = el(jqNodeDIV.find(".innerobj"));
    KFK.editTextNodeWithTextArea(innerText, el(jqNodeDIV), enterSelect);
  }
};

KFK.divLeft = function(jqDiv) {
  return KFK.unpx(jqDiv.css("left"));
};
KFK.divCenter = function(jqDiv) {
  return KFK.divLeft(jqDiv) + KFK.divWidth(jqDiv) * 0.5;
};
KFK.divRight = function(jqDiv) {
  return KFK.divLeft(jqDiv) + KFK.divWidth(jqDiv);
};
KFK.divTop = function(jqDiv) {
  return KFK.unpx(jqDiv.css("top"));
};
KFK.divMiddle = function(jqDiv) {
  return KFK.divTop(jqDiv) + KFK.divHeight(jqDiv) * 0.5;
};
KFK.divBottom = function(jqDiv) {
  return KFK.divTop(jqDiv) + KFK.divHeight(jqDiv);
};
KFK.divWidth = function(jqDiv) {
  // return jqDiv.width();
  return KFK.unpx(jqDiv.css("width"));
};
KFK.divHeight = function(jqDiv) {
  // return jqDiv.height();
  return KFK.unpx(jqDiv.css("height"));
};
KFK.divRect = function(jqDiv) {
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
KFK.divMove = function(jqDiv, left, top) {
  jqDiv.css({
    left: left,
    top: top,
  });
};
KFK.divDMove = function(jqDiv, deltaX, deltaY) {
  let left = KFK.divLeft(jqDiv);
  let top = KFK.divTop(jqDiv);
  jqDiv.css({
    left: left + deltaX,
    top: top + deltaY,
  });
};

/**
 * 得到所选DIVS中没有被锁定的div的个数
 * @param divs  如为undefined，则自动处理KFK.selectedDIVs
 */
KFK.getUnlockedCount = function(divs) {
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

KFK.sameSize = async function(direction) {
  KFK.DivStyler
    ? KFK.DivStyler.sameSize(direction)
    : import("./divStyler").then((pack) => {
        KFK.DivStyler = pack.DivStyler;
        KFK.DivStyler.sameSize(direction);
      });
};
KFK.arrangeNodes = async function(direction) {
  KFK.DivStyler
    ? KFK.DivStyler.arrangeNodes(direction)
    : import("./divStyler").then((pack) => {
        KFK.DivStyler = pack.DivStyler;
        KFK.DivStyler.arrangeNodes(direction);
      });
};

KFK.scroll_posX = function(x) {
  return x + KFK.scrollContainer.scrollLeft();
};
KFK.scroll_posY = function(y) {
  return y + KFK.scrollContainer.scrollTop();
};

KFK.offsetLineDataAttr = function(lineDIV, offset) {
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

KFK.deleteNode_request = async function(jqDIV) {
  KFK.debug("sync D to delete this node " + jqDIV.attr("id"));
  await KFK.syncNodePut("D", jqDIV, "delete node", null, false, 0, 1);
};

KFK.deleteNode_exec = async function(jqDIV) {
  await KFK.cleanUpConnection(jqDIV, true);
  jqDIV.remove();
};

KFK.removeNodeConnections = async function() {
  let jqDIV = KFK.getHoverFocusLastCreate();
  await KFK.cleanUpConnection(jqDIV, false);
};

/**
 * 去掉一个div的所有链接
 * @param jqDIV 元素
 * @param forDelete 这个节点是要被删除吗？
 */
KFK.cleanUpConnection = async function(jqDIV, forDelete = false) {
  //删除linkto线条
  let myId = jqDIV.attr("id");
  let toIds = KFK.stringToArray(jqDIV.attr("linkto"));
  toIds.forEach((toId) => {
    let lineClassSelector = `.connect_${myId}_${toId}`;
    let triClassSelector = `.connect_${myId}_${toId}_triangle`;
    try {
      KFK.svgDraw.findOne(lineClassSelector).remove();
    } catch (err) {
    } finally {
    }
    try {
      KFK.svgDraw.findOne(triClassSelector).remove();
    } catch (err) {
    } finally {
    }
  });
  //如果这个节点不是要删除，那么它的变化要被记录
  if (forDelete === false) {
    if (toIds.length > 0) {
      let oldJq = jqDIV.clone();
      jqDIV.attr("linkto", "");
      await KFK.syncNodePut(
        "U",
        jqDIV.clone(),
        "remove connect",
        oldJq,
        false,
        0,
        1
      );
    }
  }

  //重置全局ZIndex 同时，删除那些链接到当前节点的连接线
  let myZI = KFK.getZIndex(jqDIV);
  let count = 0;
  let allnodes = KFK.JC3.find(".kfknode");
  let tmp1 = "";
  let tmp2 = "";
  allnodes.each(async (index, aDIV) => {
    count += 1;
    let jqDIV = $(aDIV);
    let fromId = jqDIV.attr("id");
    let tmpzi = KFK.getZIndex(jqDIV);
    //if (tmpzi > myZI) {
    //KFK.setZIndex(jqDIV, tmpzi - 1);
    //}
    tmp1 = jqDIV.attr("linkto");
    let arr = KFK.stringToArray(tmp1);
    if (arr.indexOf(myId) >= 0) {
      let oldJq = jqDIV.clone();
      arr.splice(arr.indexOf(myId), 1);
      jqDIV.attr("linkto", arr.join(","));
      await KFK.syncNodePut(
        "U",
        jqDIV.clone(),
        "remove connect",
        oldJq,
        false,
        0,
        1
      );

      let lineClassSelector = `.connect_${fromId}_${myId}`;
      let triClassSelector = `.connect_${fromId}_${myId}_triangle`;
      try {
        KFK.svgDraw.findOne(lineClassSelector).remove();
      } catch (err) {
      } finally {
      }
      try {
        KFK.svgDraw.findOne(triClassSelector).remove();
      } catch (err) {
      } finally {
      }
    }
  });
  let nodeIndex = KFK.selectedDIVs.indexOf(jqDIV);
  if (nodeIndex >= 0) {
    KFK.selectedDIVs.splice(nodeIndex, 1);
    KFK.setSelectedNodesBoundingRect();
  }
};

KFK._deleteShape = async function(svgLine) {
  svgLine.attr({
    "stroke-width": svgLine.attr("origin-width"),
  });
  await KFK.syncLinePut("D", svgLine, "delete shape", null, false);
};

KFK.getNodeIdsFromConnectId = function(cid) {
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
KFK.deleteObjects = async function(evt, cutMode = false) {
  //如果有多个节点被选择，则优先进行多项删除
  try {
    if (KFK.docIsReadOnly()) return;

    KFK.copyCandidateDIVs = [];
    KFK.copyCandidateLines = [];
    if (KFK.selectedDIVs.length > 1 || KFK.selectedShapes.length > 1) {
      if (KFK.selectedDIVs.length > 1) {
        KFK.debug("delete, selected DIVS >1");
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
          for (let i = 0; i < KFK.selectedDIVs.length; ) {
            if (KFK.anyLocked(KFK.selectedDIVs[i]) === false) {
              if (cutMode === true) {
                //copy时不过滤nocopy
                let jTemp = KFK.selectedDIVs[i].clone();
                let jTitle = jTemp.find(".coco_title");
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
      }
      if (KFK.selectedShapes.length > 1) {
        KFK.debug("delete, selected Shapes >1");
        let notLockedCount = 0;
        for (let i = 0; i < KFK.selectedShapes.length; i++) {
          if (KFK.lineLocked(KFK.selectedShapes[i]) === false) {
            notLockedCount += 1;
          }
        }
        KFK.debug(
          `没锁定的Shape数量是 ${notLockedCount}, 一共是${KFK.selectedShapes.length}`
        );
        if (notLockedCount > 0) {
          let delSer = 0;
          let delCount = notLockedCount;
          for (let i = 0; i < KFK.selectedShapes.length; ) {
            if (KFK.lineLocked(KFK.selectedShapes[i]) === false) {
              KFK._deleteShape(KFK.selectedShapes[i]);
              i++;
            }
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
        let jTitle = jTemp.find(".coco_title");
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
        if (KFK.lineLocked(theSvgLine)) return;
        KFK.copyCandidateLines = [theSvgLine.clone()];
        KFK._deleteShape(theSvgLine);
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
        await KFK.syncNodePut(
          "U",
          jqFrom.clone(),
          "remove connect",
          oldJq,
          false,
          0,
          1
        );
        KFK.debug(KFK.hoveredConnectId, nid, tid);
      }
    }
    if (KFK.copyCandidateDIVs.length > 0 || KFK.copyCandidateLines.length > 0) {
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
  let inner = div.find(".innerobj");
  if (inner.length > 0) return inner;
  else return undefined;
};
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
KFK.editFocusedThenHoveredObject = async function(evt, enterSelect = false) {
  //如果是todolist, 不允许编辑
  let jqNodeDIV = KFK.getFocusHoverLastCreate();
  if (NotSet(jqNodeDIV)) return;
  if (KFK.anyLocked(jqNodeDIV)) return;
  //Don't edit todolist directly, show edit dialog instead.

  if (jqNodeDIV.hasClass("noedit")) {
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
KFK.duplicateHoverObject = async function(evt, action = undefined) {
  KFK.debug("entered duplicateHoverObject");
  if (KFK.docIsReadOnly()) {
    KFK.debug("docIsReady, no duplicate");
    return;
  }
  let offset = {
    x: 0,
    y: 0,
  };
  if (action === "copy") {
    if (KFK.selectedDIVs.length > 1) {
      //优先多选
      KFK.debug("multiple nodes were selected");
      //过滤掉TODOLISTDIV/chatmessage 等nocopy DIV
      let filteredDIVs = KFK.selectedDIVs.filter((div) => {
        return div.hasClass("nocopy") === false;
      });
      KFK.copyCandidateDIVs = filteredDIVs.map((div) => {
        let jTemp = div.clone();
        let jTitle = jTemp.find(".coco_title");
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
        let jTitle = jTemp.find(".coco_title");
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

KFK.makeCopyOfJQs = async function(jqstocopy, shiftKey) {
  //现在是移动指定位置再次META-D才放置对象,因此offset没用.事实上,offset在复制node时就一直没有用到
  let offset = {
    x: 0,
    y: 0,
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
    let jqNewNode = KFK.makeCloneDIV(jqstocopy[i], KFK.myuid(), {
      left:
        KFK.scalePoint(KFK.scrXToJc3X(KFK.currentMousePos.x)) -
        parseInt(jqstocopy[0].css("width")) * 0.5 +
        deltaX,

      top:
        KFK.scalePoint(KFK.scrYToJc3Y(KFK.currentMousePos.y)) -
        parseInt(jqstocopy[0].css("height")) * 0.5 +
        deltaY,
    });
    //按住shift 复制时，也就是META-SHIFT-D, 则保留linkto
    if (!shiftKey) {
      jqNewNode.removeAttr("linkto");
    }
    KFK.justCreatedJqNode = jqNewNode;
    KFK.lastCreatedJqNode = jqNewNode;

    jqNewNode.appendTo(KFK.C3);
    await KFK.setNodeEventHandler(jqNewNode, async function() {
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

KFK.makeCloneDIV = function(orig, newid, newcss) {
  let ret = orig.clone(false);
  ret.attr("id", newid);
  if (newcss) ret.css(newcss);
  KFK.cleanNodeEventFootprint(ret);
  KFK.cleanTodoChatForBackup(ret);

  return ret;
};
KFK.makeCopyOfLines = async function(linestocopy) {
  let startPoint = {
    x: linestocopy[0].cx(),
    y: linestocopy[0].cy(),
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
    newLine.attr("creator", KFK.APP.model.cocouser.userid);
    await KFK.syncLinePut("C", newLine, "duplicate line", null, false);
  }
};
KFK.makeACopyOfLine = async function(linetocopy) {
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
  newLine.attr("creator", KFK.APP.model.cocouser.userid);
  await KFK.syncLinePut("C", newLine, "duplicate line", null, false);
};

KFK.getBoundingRectOfSelectedDIVs = function() {
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

KFK.getText = function(jqdiv) {
  let text_filter = ".innerobj";
  return jqdiv.find(text_filter).text();
};

KFK.setText = function(jqdiv, text) {
  let text_filter = ".innerobj";
  return jqdiv.find(text_filter).text(text);
};

KFK.jc3PosToJc1Pos = function(pos) {
  return {
    x: pos.x * KFK.scaleRatio + KFK.LeftB,
    y: pos.y * KFK.scaleRatio + KFK.TopB,
  };
};

KFK.jc3XToJc1X = function(x) {
  return x + KFK.LeftB;
};
KFK.jc3YToJc1Y = function(y) {
  return y + KFK.TopB;
};
KFK.jc1XToJc3X = function(x) {
  return x - KFK.LeftB;
};
KFK.jc1YToJc3Y = function(y) {
  return y - KFK.TopB;
};

//Screen pos x to JC3 pos x
KFK.scrXToJc3X = function(x) {
  return KFK.scrXToJc1X(x) - KFK.LeftB;
};
KFK.scrYToJc3Y = function(y) {
  return KFK.scrYToJc1Y(y) - KFK.TopB;
};

//Screen pos x to JC1 pos x
KFK.scrXToJc1X = function(x) {
  return x + KFK.JS1.scrollLeft();
};
KFK.scrYToJc1Y = function(y) {
  return y + KFK.JS1.scrollTop();
};
KFK.jc1XToScrX = function(x) {
  return x - KFK.JS1.scrollLeft();
};
KFK.jc1YToScrY = function(y) {
  return y - KFK.JS1.scrollTop();
};

KFK.saveLocalViewConfig = function() {
  localStorage.setItem("viewConfig", JSON.stringify(KFK.APP.model.viewConfig));
};

KFK.rgba2hex = function(orig) {
  var a,
    isPercent,
    rgb = orig
      .replace(/\s/g, "")
      .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = ((rgb && rgb[4]) || "").trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig;
  if (alpha !== "") {
    a = alpha;
  } else {
    a = 01;
  }

  a = Math.round(a * 100) / 100;
  var alpha = Math.round(a * 255);
  var hexAlpha = (alpha + 0x10000)
    .toString(16)
    .substr(-2)
    .toUpperCase();
  hex = hex + hexAlpha;

  return "#" + hex;
};

KFK.secureHexColor = function(color) {
  if (color.startsWith("rgb")) {
    return KFK.rgba2hex(color);
  } else {
    return color;
  }
};

KFK.toggleShowGrid = function(checked) {
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
KFK.setShowBounding = function(checked) {
  if (checked) {
    $(".pageBoundingLine").removeClass("noshow");
  } else {
    $(".pageBoundingLine").addClass("noshow");
  }
};
KFK.toggleShowBounding = function(checked) {
  KFK.setShowBounding(checked);
  KFK.saveLocalViewConfig();
};
KFK.toggleSnap = function(checked) {
  KFK.saveLocalViewConfig();
};

KFK.toggleShowLock = function(checked) {
  //.locklabel无论是在DIV上,还是在svgline上,下面的代码都起作用, svg真神奇
  if (checked) {
    $(".locklabel").removeClass("noshow");
  } else {
    $(".locklabel").addClass("noshow");
  }
  KFK.saveLocalViewConfig();
};

KFK.toggleEnterToConfirmInput = function(checked) {
  KFK.saveLocalViewConfig();
};

KFK.toggleEnterWithChat = function(checked) {
  KFK.saveLocalViewConfig();
  if (KFK.APP.model.viewConfig.enterWithChat) {
    KFK.beginChatMode();
  }
};
KFK.toggleUseAI = function(checked) {
  KFK.saveLocalViewConfig();
  if (KFK.APP.model.viewConfig.useAI === false) {
    //KFK.scrLog("如果您初次使用，强烈建议打开自动提示");
    KFK.hide(KFK.SYSMSG);
  } else {
    KFK.scrLog("自动提示已打开，请稍候");
    KFK.show(KFK.SYSMSG);
  }
};
KFK.toggleNodeMessage = function(checked) {
  KFK.saveLocalViewConfig();
};
KFK.toggleAutoFollow = function(checked) {
  KFK.saveLocalViewConfig();
};

KFK.lineCapChanged = function(checked) {
  let theShape = KFK.getPropertyApplyToShape();
  KFK.setShapeToRemember(theShape);
  if (theShape === null || KFK.anyLocked(theShape)) return;
  KFK.setShapeLineModel(theShape.attr("shapetype"), {
    linecap: checked,
  });
  theShape.attr({
    "stroke-linecap": checked ? "round" : "square",
  });
  KFK.syncLinePut("U", theShape, "set line color", KFK.shapeToRemember, false);
};

KFK.init = async function() {
  if (KFK.inited === true) {
    console.error("KFK.init was called more than once, maybe loadImages error");
    return;
  }
  KFK.debug("Initializing...");
  KFK.checkBrowser();
  KFK.initTypeWriter();
  KFK.pickerMatlib = $(".matlib-topick");
  //if (KFK.urlBase.indexOf('liuzijin')>0) {
  //    KFK.hide(".introduce_svg_inner");
  //}

  $("#minimap").removeClass("noshow");
  $("#left_scenarios").removeClass("noshow");
  //先不做重新载入,每次进入使用缺省配置可能对培养用户习惯更合适一些
  KFK.initExplorer();
  if (KFK.urlMode === "gotoSignin") {
    KFK.gotoSignin();
    KFK.hide("#waiting");
  } else if (KFK.urlMode === "gotoRegister") {
    KFK.gotoRegister();
    KFK.hide("#waiting");
  } else {
    await KFK.showSection({
      sigin: false,
      register: false,
      explorer: false,
      designer: false,
    });

    await KFK.checkSession(false);
    setInterval(() => {
      KFK.AI("hover_c3");
    }, 10000);
  }
  $(".showAfterInit").removeClass("showAfterInit");
};

KFK.initExplorer = function() {
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
KFK.initDesigner = async function() {
  if (KFK.designerInitialized) return;
  try {
    KFK.loadImages();
    // KFK.loadSvgs();
    KFK.initLayout();
    KFK.initQuillFonts();
    KFK.initC3();
    KFK.initPropertyForm
      ? KFK.initPropertyForm()
      : import("./propSetting").then((pack) => {
          KFK.initPropertyForm = pack.PropSetting.initPropertyForm;
          KFK.initPropertyForm();
        });
    KFK.initLineTransformer();
    //KFK.initColorPicker();
    KFK.showCenterIndicator();
    KFK.initPropertySvgGroup
      ? KFK.initPropertySvgGroup()
      : import("./propSetting").then((pack) => {
          KFK.initPropertySvgGroup = pack.PropSetting.initPropertySvgGroup;
          KFK.initPropertySvgGroup();
        });
    //$("#right").draggable();
    await KFK.initCocoChat();
    await KFK.initVideoRoom();
    KFK.designerInitialized = true;
    KFK.debug("[Initialized] designer");
    KFK.initLeftRightPanelEventHandler();
  } catch (error) {
    console.error("Designer initialization error");
    console.error(error);
  }
};

KFK.initLeftRightPanelEventHandler = function() {
  $("#left").on("click", function(evt) {
    console.log("left click");
    evt.stopPropagation();
  });
  $("#right").on("click", function(evt) {
    evt.stopPropagation();
  });
  $("#left").on("mousedown", function(evt) {
    evt.stopPropagation();
  });
  $("#right").on("mousedown", function(evt) {
    evt.stopPropagation();
  });
};

KFK.onToolboxMouseDown = function(mode, evt) {
  KFK.toolboxMouseDown = true;
  KFK.mode = mode;
  KFK.debug("Set drop toolbox mode to ", KFK.mode);
  console.log("mouse down on toolbox", mode);
};
KFK.onToolboxMouseUp = function(mode, evt) {
  KFK.toolboxMouseDown = false;
  KFK.toolboxMouseDownOn = null;
  console.log("mouse up on toolbox", mode);
};

KFK.initTypeWriter = function() {
  KFK.dataText = [
    "异地办公",
    "跨地域工作团队",
    "在家办公",
    "网络化沟通",
    "远程工作",
    "网络会议",
    "疫情期间减少接触",
  ];

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < text.length) {
      // add next character to h1
      $(".typewriter").prop(
        "innerHTML",
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>'
      );

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback);
      }, 200);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == "function") {
      // call callback after timeout
      setTimeout(fnCallback, 5000);
    }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    if (i >= KFK.dataText.length) {
      setTimeout(function() {
        StartTextAnimation(0);
      }, 1000);
    } else {
      // text exists! start typewriter animation
      typeWriter(KFK.dataText[i], 0, function() {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
      });
    }
  }
  // start the text animation
  StartTextAnimation(0);
};

KFK.initCocoChat = async function() {
  let jqCocoChat = $("#coco_chat");
  await this.loadDIVPositon("coco_chat_pos", "#coco_chat");
  // jqCocoChat.removeClass('noshow');
  jqCocoChat.draggable({
    start: (evt, ui) => {
      KFK.touchChatTodo = true;
    },
    drag: (evt, ui) => {},
    stop: async (evt, ui) => {
      KFK.touchChatTodo = false;
      KFK.saveDIVPosition(
        "coco_chat_pos",
        jqCocoChat.css("left"),
        jqCocoChat.css("top"),
        jqCocoChat.css("width"),
        jqCocoChat.css("height")
      );
    },
  });
  jqCocoChat.resizable({
    autoHide: true,
    start: () => {
      KFK.touchChatTodo = true;
    },
    resize: () => {},
    stop: async () => {
      KFK.touchChatTodo = false;
      KFK.saveDIVPosition(
        "coco_chat_pos",
        jqCocoChat.css("left"),
        jqCocoChat.css("top"),
        jqCocoChat.css("width"),
        jqCocoChat.css("height")
      );
    },
  });
};

KFK.initVideoRoom = async function() {
  let jqRoom = $("#video_room");
  await KFK.loadDIVPositon("video_room_pos", "#video_room");
  jqRoom.on("click", (evt) => {
    evt.stopPropagation();
  });
  jqRoom.draggable({
    start: (evt, ui) => {
      KFK.touchChatTodo = true;
    },
    drag: (evt, ui) => {},
    stop: async (evt, ui) => {
      KFK.touchChatTodo = false;
      KFK.saveDIVPosition(
        "video_room_pos",
        jqRoom.css("left"),
        jqRoom.css("top"),
        jqRoom.css("width"),
        jqRoom.css("height")
      );
    },
  });
  jqRoom.resizable({
    autoHide: true,
    start: () => {
      KFK.touchChatTodo = true;
    },
    resize: () => {},
    stop: async () => {
      KFK.touchChatTodo = false;
      KFK.saveDIVPosition(
        "video_room_pos",
        jqRoom.css("left"),
        jqRoom.css("top"),
        jqRoom.css("width"),
        jqRoom.css("height")
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
KFK.checkSession = async function(isOpenAnn) {
  KFK.info("...checkSession");
  //WSReconnectTime只用来记录在Designer使用过程中的网络断掉后的重连次数
  //那个是ws.js自动控制重连的,重连时,ws.js会调用KFK.onWSConnected, 在那里,对WSReconnectTime进行技术
  KFK.setAppData("model", "prjs", []);

  KFK.cocouser = null;
  await KFK.readLocalCocoUser();
  let userMode = "NORMAL"; //Normal | DEMO | ANNONYMOUS
  console.log("KFK.urlMode", KFK.urlMode);
  if (KFK.urlMode === "column") {
    //await KFK.connectToWS();
    //return;
  }
  if (KFK.cocouser) {
    KFK.debug("checksession: found KFK.cocouser" + KFK.cocouser.name);
    KFK.setAppData(
      "model",
      "isDemoEnv",
      KFK.cocouser.userid.indexOf("@cocopad_demo.org") > 0
    );
    if (KFK.cocouser.userid.indexOf("@cocopad_demo.org") > 0) {
      userMode = "DEMO";
    } else {
      userMode = "NORMAL";
    }
  } else {
    userMode = "ANNONYMOUS";
  }
  if (userMode === "NORMAL") {
    //匿名用户获得临时身份后,会重新进入CheckSession,就也会运行到这里
    //这时,WS.ws已经是处于连接状态的,再次调用WS.start时, ws.js中会重用之前的连接,
    //但是会充值WS.connectTimes为0
    KFK.debug("checksession: NORMAL, connect server");
    await KFK.connectToWS();
    return;
  }
  if (userMode === "ANNONYMOUS") {
    if (KFK.shareCode) {
      //没有localUser, but URL中有shareCode
      //两种URL形式都连接WS
      if (KFK.urlMode === "ivtcode") {
        KFK.debug("checksession: ANN ivtURL yes,  connect server");
      } else {
        KFK.debug("checksession: ANN scURL yes, connect server");
      }
      await KFK.connectToWS();
    } else {
      KFK.debug("checksession: ANN, goto signin");
      KFK.gotoSignin();
      //KFK.gotoRegister();
      KFK.hide("#waiting");
    }
    return;
  }
  if (userMode === "DEMO") {
    KFK.debug("checksession: switch to DEMO");
    if (KFK.shareCode) {
      //没有localUser, but URL中有shareCode
      //两种URL形式都连接WS
      if (KFK.urlMode === "ivtcode") {
        KFK.debug("checksession: DEMO, ivtURL yes,  connect server");
        KFK.gotoRegister();
        KFK.hide("#waiting");
      } else {
        KFK.debug("checksession: DEMO, scURL yes, connect server");
        await KFK.connectToWS();
      }
    } else {
      //no local user, URL中无shareCode
      //读本地存储shareCode
      let localShareCode = localStorage.getItem("shareCode");
      if (localShareCode === null) {
        //no local user nor local sharecode
        KFK.debug("checksession: LU no, SCURL no, LSC no, goto fresh register");
        KFK.gotoSignin();
        KFK.hide("#waiting");
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
          KFK.hide("#waiting");
        } else {
          //local sharecod is a sharecode
          KFK.urlMode = "sharecode";
          KFK.shareCode = localShareCode;
          KFK.debug("checksession: LU no, SCURL no, LSC yes, connect server");
          await KFK.connectToWS();
        }
      }
    }
    return;
  }
};

KFK.onWsClosed = function() {
  KFK.debug("WS Closed");
};

KFK.onWsGiveup = function() {
  KFK.debug("WS connect giveup");
  KFK.hide("#waiting");
  $(".reconnect-mask").removeClass("nodisplay");
  $("#reconnect-warning").html("多次尝试后，网络依然无法连接, 请稍后刷新重试");
};
KFK.onWsReconnect = function() {
  console.log("onWsReconnect");
  $(".reconnect-mask").removeClass("nodisplay");
  $("#reconnect-warning").html("服务器竟然开小差了，正在尝试重连。。。");
  KFK.show("#waiting");
  KFK.isTryingToReconnect = true;
};
KFK.onWsConnected = function() {
  KFK.WS = WS;
  KFK.debug("Connect Times", KFK.WS.connectTimes);
  KFK.hide("#waiting");
  $(".reconnect-mask").addClass("nodisplay");
  KFK.APP.setData("show", "wsready", true);
  //console.log("KFK.urlMode=", KFK.urlMode);
  //第一次连接，这条消息会被kj迎回来覆盖，正常
  if (KFK.isTryingToReconnect === undefined) {
    if (KFK.column !== "no") {
      console.log("KFK.column = ", KFK.column);
      KFK.refreshColumn();
    } else {
      //The first time
      //这里是第一次启动cocopad，服务器连接成功时的处理方式
      //refreshProjectList会用到很多需要Auth的操作，但shareDocInUrl不需要
      //如果URL中没有ShareCodeInURL
      //正常情况下，会进入到浏览器界面
      if (KFK.cocouser && KFK.cocouser.sessionToken) {
        KFK.sendCmd("UPDMYORG", {});
        if (KFK.shareCode === null) {
          console.log("refereshProjectList in onWsConnected 1");
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
          if (KFK.urlMode === "sharecode") {
            KFK.openSharedDoc(KFK.shareCode);
          } else if (KFK.urlMode === "directopen") {
            //console.log('Open Doc Direclty', KFK.docToOpen);
            KFK.refreshDesignerWithDoc(KFK.docToOpen, "");
          } else {
            console.log("refreshProjectList in onWsConnected 2");
            KFK.refreshProjectList();
          }
        }
      } else {
        //no local user
        if (KFK.shareCode === null) {
          //这个运行不到,因为,只要连接服务器,要么是有本地用户信息,要么有shareCode
          KFK.gotoRegister();
        } else {
          // has sharecode
          localStorage.setItem("shareCode", KFK.shareCode);
          if (KFK.urlMode === "sharecode") {
            KFK.openSharedDoc(KFK.shareCode);
          } else if (KFK.urlMode === "directopen") {
            KFK.refreshDesignerWithDoc(KFK.docToOpen, "");
          } else {
            KFK.sendCmd("GETINVITOR", {});
            KFK.gotoRegister();
          }
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
      let cocodcoInStorage = JSON.parse(localStorage.getItem("cocodoc"));
      if (cocodcoInStorage && cocodcoInStorage.doc_id) {
        KFK.sendCmd("DOC_ID", {
          doc_id: cocodcoInStorage.doc_id,
        });
      }
    }
    KFK.isTryingToReconnect = undefined;
  }
};
KFK.rememberLayoutDisplay = function() {
  KFK.layoutRemembered = {
    showbounding: KFK.APP.model.viewConfig.showbounding,
    showgrid: KFK.APP.model.viewConfig.showgrid,
    minimap: KFK.APP.show.section.minimap,
    toplogo: $("#toplogo").hasClass("noshow"),
    docHeaderInfo: $("#docHeaderInfo").hasClass("noshow"),
    rtcontrol: $("#rtcontrol").hasClass("noshow"),
    left: $("#left").hasClass("noshow"),
    right: $("#right").hasClass("noshow"),
  };
};
KFK.restoreLayoutDisplay = async function() {
  KFK.APP.model.viewConfig.showgrid = KFK.layoutRemembered.showgrid;
  if (KFK.layoutRemembered.showgrid) $("#containerbkg").addClass("grid1");
  else $("#containerbkg").removeClass("grid1");
  KFK.APP.model.viewConfig.showbounding = KFK.layoutRemembered.showbounding;
  if (KFK.layoutRemembered.showbounding === true)
    $(".pageBoundingLine").removeClass("noshow");
  else $(".pageBoundingLine").addClass("noshow");

  await KFK.showSection({
    minimap: KFK.layoutRemembered.minimap,
  });
  KFK.layoutRemembered.toplogo
    ? $("#toplogo").addClass("noshow")
    : $("#toplogo").removeClass("noshow");
  KFK.layoutRemembered.docHeaderInfo
    ? $("#docHeaderInfo").addClass("noshow")
    : $("#docHeaderInfo").removeClass("noshow");
  KFK.layoutRemembered.rtcontrol
    ? $("#rtcontrol").addClass("noshow")
    : $("#rtcontrol").removeClass("noshow");
  KFK.layoutRemembered.left
    ? $("#left").addClass("noshow")
    : $("#left").removeClass("noshow");
  KFK.layoutRemembered.right
    ? $("#right").addClass("noshow")
    : $("#right").removeClass("noshow");
};
KFK.setLayoutDisplay = async function(config) {
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
    minimap: config.minimap,
  });
  config.toplogo
    ? $("#toplogo").removeClass("noshow")
    : $("#toplogo").addClass("noshow");
  config.docHeaderInfo
    ? $("#docHeaderInfo").removeClass("noshow")
    : $("#docHeaderInfo").addClass("noshow");
  config.rtcontrol
    ? $("#rtcontrol").removeClass("noshow")
    : $("#rtcontrol").addClass("noshow");
  config.left
    ? $("#left").removeClass("noshow")
    : $("#left").addClass("noshow");
  config.right
    ? $("#right").removeClass("noshow")
    : $("#right").addClass("noshow");
};

KFK.showSection = async function(options) {
  let section = $.extend({}, KFK.APP.show.section, options);
  await KFK.APP.setData("show", "section", section);
};

KFK.showForm = async function(options) {
  let form = $.extend({}, KFK.APP.show.form, options);
  await KFK.APP.setData("show", "form", form);
};

KFK.showDialog = async function(options) {
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

KFK.openSharedDoc = async function(shareCode) {
  KFK.debug(">>>>>>>>openSharedDoc", shareCode);
  //如果是sharecode, 则去服务器取
  await KFK.refreshDesignerWithDoc(null, "");
  KFK.debug("send OPENSHAREDDOC ", shareCode);
  setTimeout(function() {
    KFK.sendCmd("OPENSHAREDDOC", {
      shareCode: shareCode,
    });
  }, 200);
};

KFK.quickGlance = async (doc) => {
  if (NotSet(doc.qgTimes)) {
    doc.qgTimes = 0;
  }
  doc.qgTimes++;
  if (doc.qgTimes > 3) return;
  KFK.refreshDesignerWithDoc(doc._id, "", true);
};

/**
 * 载入文档前的初始化Designer动作
 * 如果doc_id, 只初始化,不载入文档. 在用户执行清除文档时,就执行这个操作
 */
KFK.refreshDesignerWithDoc = async function(
  doc_id,
  docpwd,
  quickGlance = false,
  forceReadonly = false
) {
  //KFK.APP.$router.push("/designer");
  if (doc_id !== null) KFK.info(">>>>>>refreshDesigner for doc", doc_id);
  else KFK.info(">>>>>>refreshDesigner only, no doc will be load");
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

  KFK.addDocumentEventHandler();
  KFK.focusOnC3();
  KFK.cancelAlreadySelected();

  KFK.setRightTabIndex(2);
  //需要在explorer状态下隐藏的，都可以加上noshow, 在进入Designer时，noshow会被去掉
  //并以动画形式显示出来
  $(".padlayout").removeClass("noshow");
  $(".padlayout").fadeIn(1000, function() {
    // Animation complete
  });

  if (doc_id !== null)
    KFK.info("Designer is fully ready, load doc[", doc_id, "] now");
  else
    KFK.info("Designer is fully ready, but no doc load since doc_id not set");
  KFK.currentView = "designer";
  if (doc_id !== null)
    await KFK.loadDoc(doc_id, docpwd, quickGlance, forceReadonly);
  if (KFK.APP.model.viewConfig.hideRight) KFK.hide("#right");
};

KFK.loadDoc = async function(
  doc_id,
  pwd,
  quickGlance = false,
  forceReadonly = false
) {
  KFK.info("loadDoc", doc_id, pwd);
  KFK.QUICKGLANCE = quickGlance;
  KFK.FORCEREADONLY = forceReadonly;
  try {
    let payload = {
      doc_id: doc_id,
      pwd: pwd,
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

KFK.refreshProjectList = async function() {
  console.log("refreshProjectList");
  await KFK.sendCmd("LISTPRJ", {
    skip: 0,
  });
  KFK.explorerRefreshed = true;
};

KFK.refreshColumn = async function(cid = undefined) {
  if (!cid) cid = KFK.column;
  console.log("refreshColumn", cid);
  await KFK.sendCmd("LISTCH", {
    cid: cid,
    skip: 0,
  });
};

KFK.setCurrentPrj = function(prj) {
  KFK.APP.setData("model", "cocoprj", prj);
  if (prj.prjid !== "all" && prj.prjid !== "others" && prj.prjid !== "mine") {
    KFK.APP.setData("model", "lastrealproject", prj);
  }
  localStorage.setItem("cocoprj", JSON.stringify(prj));
};

KFK.clearCurrentProject = function() {
  KFK.APP.setData("model", "cocoprj", {
    prjid: "",
    name: "",
  });
  KFK.APP.setData("model", "lastrealproject", {
    prjid: "",
    name: "",
  });
  localStorage.removeItem("cocoprj");
};
KFK.resetAllLocalData = function(keep = {}) {
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
    name: "",
  });
  KFK.APP.setData("model", "lastrealproject", {
    prjid: "",
    name: "",
  });
  KFK.APP.setData("model", "prjs", []);
  KFK.APP.setData("model", "docs", []);
  //清除vorgs和 myorgs数据
  if (NotSet(keep.vorgs)) KFK.APP.setData("model", "vorgs", []);
  if (NotSet(keep.myorgs)) KFK.APP.setData("model", "myorgs", []);
  KFK.APP.setData("model", "org", {
    neworg: {
      name: "",
    },
    newuserid: "",
    changeorgname: "",
  });
  //标志 左侧的org tab没有被打开过
  KFK.orgTabInitialized = false;
  KFK.explorerRefreshed = false;
};
KFK.toggleDetails = function(row) {
  if (row.detailsShowing) {
    row.toggleDetails();
  } else {
    let theorg = row.item;
    KFK.APP.model.org.changeorgname = theorg.name;
    KFK.sendCmd("ORGUSERLIST", {
      _id: theorg._id,
    });
    KFK.idRowMap[theorg._id] = row;
  }
};
KFK.showCreateNewDoc = function() {
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

KFK.showFullHelp = function() {
  KFK.info("showFullHelp not implemented");
};

KFK.gotoSignin = async function() {
  // KFK.APP.setData("model", "signin", { userid: "", pwd: "" });
  KFK.setAppData("model", "signInButWaitVerify", false);
  await KFK.showSection({
    register: false,
    signin: true,
    explorer: false,
    designer: false,
  });
};

KFK.gotoRegister = async function() {
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

KFK.remoteCheckUserId = function(userid) {
  KFK.usefAlreadyExist = false;
  KFK.WS.put("IFEXIST", {
    userid: userid,
  });
};

KFK.showCreateNewPrj = function() {
  KFK.APP.setData("show", "form", {
    newdoc: false,
    newprj: true,
    prjlist: false,
    doclist: true,
    explorerTabIndex: 0,
    bottomlinks: true,
  });
};
KFK.selectPrjTab = function() {
  KFK.APP.setData("show", "form", {
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
    explorerTabIndex: 0,
    bottomlinks: true,
  });
};
KFK.onClickOrgTab = async function() {
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
KFK.onClickMatTab = async function() {
  KFK.materialUpdated || (await KFK.loadMatLibForMyself());
};
KFK.loadMatLibForMyself = async function() {
  await KFK.sendCmd("LISTMAT", {});
};
KFK.refreshMatLibForAll = async function() {
  await KFK.sendCmd("REFRESHMAT", {});
};
KFK.gotoExplorerTab = function(tabIndex) {
  KFK.mergeAppData("show.form", {
    explorerTabIndex: tabIndex,
  });
};
KFK.gotoDocNavTab = function(tabIndex) {
  KFK.APP.docNavTabIndex = tabIndex;
};

//这里检查是否有project
KFK.showProjects = async function() {
  KFK.showForm({
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
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
        prjid: prj.prjid,
      });
    }
  } else {
    await KFK.sendCmd("LISTDOC", {
      prjid: "all",
    });
  }
};
KFK.gotoPrjList = async function(msg = null, userealprjs = false) {
  sessionStorage.setItem("leftTabIndex", 0);
  if (KFK.APP.model.cocoprj.name === "") {
    KFK.setAppData("model", "cocoprj", {
      prjid: "all",
      name: "我最近使用过的白板",
    });
  }
  if (KFK.explorerRefreshed === false) {
    KFK.debug("refreshProjectList in gotoPrjList");
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
      designer: false,
    });
  }
};

KFK.deleteMatItem = function(item, index, button) {
  const h = KFK.APP.$createElement;
  // Using HTML string
  const titleVNode = h("div", {
    domProps: {
      innerHTML: "确定要删除素材吗？",
    },
  });
  // More complex structure
  const messageVNode = h(
    "div",
    {
      class: ["foobar"],
    },
    [
      h("b-img", {
        props: {
          src: item.thumbnail,
          thumbnail: true,
          center: true,
          fluid: true,
        },
      }),
    ]
  );
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
          matid: item.matid,
        });
        KFK.APP.model.mats.splice(index, 1);
      }
    })
    .catch((err) => {
      console.error(err.message);
    });
};

KFK.deletePrjItem = function(item, index, button) {
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

KFK.deleteDocItem = function(item, index, button) {
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

KFK.sleep = async function(miliseconds) {
  await new Promise((resolve) => setTimeout(resolve, miliseconds));
};

KFK.toggleShowHelp = function() {
  KFK.APP.model.showInModalMiniHelp = !KFK.APP.model.showInModalMiniHelp;
};

KFK.createNewDoc = function() {
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
KFK.createNewPrj = function() {
  let prjName = KFK.APP.model.newprjname;
  if (Validator.validatePrjName(prjName)) {
    KFK.APP.state.newprj.name = true;
    KFK.sendCmd("NEWPRJ", {
      name: prjName,
    });
  } else {
    KFK.APP.state.newprj.name = false;
  }
};
KFK.sayHello = function() {
  KFK.scrLog("hello, cocopad");
};

KFK.startActiveLogWatcher = function() {
  KFK.getActionLog();
  //自动刷新活动记录，但不是每次接收到有更新，就去服务器端刷新，
  //而是每五秒钟，检查收到的更新数量，如果五秒钟内有更新，updateReceived>0,
  //才调用KFK.getActionLog()去服务器端拉取
  setInterval(function() {
    if (KFK.updateReceived > 0) {
      KFK.updateReceived = 0;
      KFK.getActionLog();
    }
  }, 5000);
};

KFK.enterOrg = async function(_id) {
  await KFK.sendCmd("ENTERORG", {
    _id: _id,
  });
};
KFK.deleteOrg = async function(aOrg, name) {
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
          _id: aOrg._id,
        });
      }
    })
    .catch((err) => {
      console.error(err.message);
    });
};

KFK.createNewOrg = async function() {
  let orgname = KFK.APP.model.org.neworg.name;
  if (Validator.validateOrgName(orgname)) {
    await KFK.sendCmd("NEWORG", {
      name: orgname,
    });
  } else {
    KFK.scrLog("组织名称不符合要求");
  }
};
KFK.addOrgUser = async function(org_id, rowIndex) {
  let jInput = $("#inline-form-input-newuserid-" + rowIndex);
  let newuserid = jInput.val();
  if (Validator.validateUserId(newuserid)) {
    await KFK.sendCmd("ORGUSERADD", {
      _id: org_id,
      tobeadd_userid: newuserid,
    });
  } else {
    KFK.scrLog("用户ID格式有误");
  }
};
KFK.changeOrgName = async function(org, rowIndex) {
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
KFK.deleteOrgUser = function(org, orguser, index, evt) {
  KFK.sendCmd("ORGUSERDEL", {
    _id: org._id,
    orgid: org.orgid,
    memberid: orguser.userid,
  });
};

KFK.toggleAccordionEnteredOrg = async function() {
  if (KFK.accordion["vorg"] === undefined || KFK.accordion["vorg"] === false) {
    KFK.accordion["vorg"] = true;
    await KFK.sendCmd("LISTVORG", {});
  } else {
    KFK.accordion["vorg"] = false;
  }
};

KFK.toggleAccordionMyOrg = async function() {
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

KFK.signout = async function() {
  KFK.stopVideoCall();
  await KFK.sendCmd("SIGNOUT", {
    userid: KFK.APP.model.cocouser.userid,
  });
};

KFK.getProductUrl = function() {
  // return cocoConfig.product.url;
  return KFK.urlBase;
};
KFK.getInvitationUrl = function() {
  return KFK.getProductUrl() + "/?r=" + KFK.APP.model.cocouser.ivtcode;
};

KFK.updateCocouser = function(data) {
  let oldCocouser = KFK.APP.model.cocouser;
  let cocouser = $.extend({}, oldCocouser, data);
  if (cocouser.avatar === "avatar_temp" || cocouser.avatar === "avatar-temp")
    cocouser.avatar = "avatar-0";
  cocouser.avatar_src = KFK.avatars[cocouser.avatar].src;
  localStorage.setItem("cocouser", JSON.stringify(cocouser));
  KFK.APP.setData("model", "cocouser", cocouser);
  KFK.cocouser = cocouser;
  KFK.debug("updateCocouser to ", cocouser.userid);
};
KFK.removeCocouser = function() {
  localStorage.removeItem("cocouser");
  KFK.APP.setData("model", "cocouser", {
    userid: "",
    name: "",
    avatar: "avatar-0",
    avatar_src: null,
  });
};
KFK.readLocalCocoUser = async function() {
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
KFK.notImplemented = function() {
  KFK.debug("not implemented");
};
KFK.openDemoDoc = function() {
  KFK.log("Not implemented");
};

KFK.deletePrj = async function(prjid) {
  await KFK.sendCmd("DELPRJ", {
    prjid: prjid,
  });
};

KFK.msgOK = async function() {
  await KFK.showSection({
    sigin: false,
    register: false,
    explorer: true,
    designer: false,
  });
  KFK.gotoDocs();
};

KFK.deleteDoc = async function(doc_id) {
  let payload = {
    doc_id: doc_id,
  };
  await KFK.sendCmd("DELDOC", payload);
};

KFK.setDocReadonly = async function(doc) {
  KFK.sendCmd("TGLREAD", {
    doc_id: doc._id,
  });
};

KFK.gotoLastRealProject = function() {
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

KFK.gotoPubs = async function() {
  sessionStorage.setItem("leftTabIndex", 2);
  await KFK.sendCmd("LISTPUB", {});
};
KFK.gotoSub = async function() {
  sessionStorage.setItem("leftTabIndex", 3);
  if (NotSet(KFK.subscription_Listed)) {
    await KFK.sendCmd("LISTSUB", {});
    KFK.subscription_Listed = true;
  }
};
KFK.refreshSub = async () => {
  sessionStorage.setItem("leftTabIndex", 3);
  await KFK.sendCmd("LISTSUB", {});
  KFK.subscription_Listed = true;
};
KFK.gotoMarket = async function() {
  sessionStorage.setItem("leftTabIndex", 4);
  let lastQ = localStorage.getItem("lastQ");
  if (NotSet(lastQ)) {
    lastQ = "latest";
  }
  await KFK.sendCmd("SEARCHPUB", {
    q: lastQ,
  });
};
KFK.gotoMarketSearch = async function() {
  let q = KFK.APP.goodsSearchQ;
  if (q.length > 0) {
    await KFK.sendCmd("SEARCHPUB", {
      q: q,
    });
    localStorage.setItem("lastQ", q);
  } else {
    await KFK.sendCmd("SEARCHPUB", {
      q: "latest",
    });
  }
};
KFK.gotoMarketLatest = async function() {
  await KFK.sendCmd("SEARCHPUB", {
    q: "latest",
  });
};
KFK.gotoMarketMostSubscribed = async function() {
  await KFK.sendCmd("SEARCHPUB", {
    q: "mostsub",
  });
};

KFK.searchDoc = async function() {
  await KFK.sendCmd("SEARCHDOC", { name: KFK.APP.model.search.docName });
};

KFK.onSearchInput = async function(evt) {
  evt.stopPropagation();
  KFK.noCopyPaste = true;
  if (evt.keyCode === 27) {
    //ESC
    KFK.noCopyPaste = false;
    return;
  } else if (evt.keyCode === 13) {
    evt.preventDefault();
    KFK.searchDoc();
  }
};

KFK.onSigninInput = async function(evt) {
  evt.stopPropagation();
  KFK.noCopyPaste = true;
  if (evt.keyCode === 27) {
    //ESC
    KFK.noCopyPaste = false;
    return;
  } else if (evt.keyCode === 13) {
    ACM.signin();
  }
};

KFK.gotoPrj = async function(prjid, name) {
  try {
    let cocoprj = {
      prjid: prjid,
      name: name,
    };
    KFK.setCurrentPrj(cocoprj);
    await KFK.sendCmd("LISTDOC", {
      prjid: prjid,
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
KFK.gotoRecent = function() {
  KFK.APP.docNavTabIndex = 2;
  KFK.gotoPrj("all", "最近访问的");
};
KFK.gotoDocs = async function() {
  sessionStorage.setItem("leftTabIndex", 1);
  if (KFK.loadedProjectId === null) {
    KFK.gotoRecent();
  }
};

KFK.pickPrjForCreateDoc = function() {
  KFK.onPrjSelected = KFK.showCreateNewDoc;
  KFK.gotoPrjList("在哪个项目中新建白板？", true);
};
KFK.prjRowClickHandler = function(record, index) {
  KFK.APP.docNavTabIndex = 3;
  KFK.gotoPrj(record.prjid, record.name);
};
KFK.matRowClickHandler = function(record, index) {
  console.log("show big image has not been implemented");
};
KFK.buy1 = (goods, index) => {
  KFK.APP.goodsToBuy = goods;
  KFK.showDialog({
    buy1Dialog: true,
  });
};
KFK.buy2 = (goods, index) => {
  KFK.APP.goodsToBuy = goods;
  KFK.showDialog({
    buy2Dialog: true,
  });
};
KFK.paidPlsCheck = (goods, buymode) => {
  //TODO: 接入微信支付
  KFK.sendCmd("BUY", {
    doc_id: goods._id,
    buymode: buymode,
  });
  KFK.showDialog({
    buy1Dialog: false,
    buy2Dialog: false,
  });
};
KFK.sendCmd = async function(cmd, payload = {}) {
  if (KFK.WS === null) {
    KFK.warn("sendCmd when KFK.WS is null. cmd is", cmd, "payload is", payload);
  } else {
    KFK.debug("sendCmd", cmd, payload);
    await KFK.WS.put(cmd, payload);
  }
};

//Click doc row to open, open doc opendoc
KFK.docRowClickHandler = async function(doc, index) {
  if (KFK.getAclAccessable(doc)) {
    if (doc.pwd === "*********") {
      KFK.APP.setData("model", "opendocpwd", "");
      KFK.showDialog({
        inputDocPasswordDialog: true,
      });
      KFK.tryToOpenDocId = doc._id;
    } else {
      await KFK.refreshDesignerWithDoc(doc._id, "");
    }
  } else {
    KFK.showNotAclAccessable();
  }
};

KFK.subsRowClickHandler = async function(sub, index) {
  await KFK.refreshDesignerWithDoc(sub._id, "", false, true);
};
KFK.openSubs = async function(sub) {
  await KFK.refreshDesignerWithDoc(sub._id, "", false, true);
};

KFK.modalShown = () => {
  KFK.isShowingModal = true;
  KFK.hideDIVsWithStatus([
    ".msgInputWindow",
    "#system_message",
    "#right",
    "#minimap",
  ]);
};
KFK.modalHidden = () => {
  KFK.isShowingModal = false;
  KFK.restoreDIVsWithStatus([
    ".msgInputWindow",
    "#system_message",
    "#right",
    "#minimap",
  ]);
};

//这个时候,在服务端
//client: checcksession , openSharedDoc -> server: this is a annoy user-> server: Annymouse User open doc->OpenANN to set local session to a temp user
//-> on client side got OPENANNY -> record temp uer -> checksession again
//-> openharedDoc again -> sever: is a temp uer, then OpenDoc -> ASKPWD? (yes)
//-> input passwd, then come to here
KFK.getDocPwd = async function() {
  KFK.APP.setData("model", "passwordinputok", "ok");
  await KFK.refreshDesignerWithDoc(
    KFK.tryToOpenDocId,
    KFK.APP.model.opendocpwd
  );
};
KFK.cancelDocPwd = function() {
  KFK.APP.setData("model", "passwordinputok", "cancel");
  KFK.gotoRecent();
};
KFK.onDocPwdHide = function(bvModalEvt) {
  //这个值初始为show,这样，不运行点对话框外部，把对话框隐藏起来
  if (KFK.APP.model.passwordinputok === "show") bvModalEvt.preventDefault();
};

KFK.showRechargeDialog = function() {
  KFK.showDialog({
    rechargeDialog: true,
  });
};
KFK.showPriceListDialog = function() {
  KFK.showDialog({
    rechargeDialog: false,
    priceListDialog: true,
  });
};
KFK.showResetPwdModal = function(item) {
  KFK.tryToResetPwdDoc = item;
  KFK.APP.setData("model", "docOldPwd", "");
  KFK.APP.setData("model", "docNewPwd", "");
  KFK.showDialog({
    resetDocPasswordDialog: true,
  });
};

KFK.showRemovePwdModal = function(item, index, button) {
  KFK.tryToRemovePwdDoc = item;
  KFK.APP.setData("model", "inputUserPwd", "");
  KFK.showDialog({
    userPasswordDialog: true,
  });
};

KFK.toggleFromResetToRemovePwd = function() {
  KFK.tryToRemovePwdDoc = KFK.tryToResetPwdDoc;
  KFK.APP.setData("model", "inputUserPwd", "");
  KFK.showDialog({
    resetDocPasswordDialog: false,
    userPasswordDialog: true,
  });
};

KFK.removeDocPwd = function() {
  let payload = {
    doc_id: KFK.tryToRemovePwdDoc._id,
    userid: KFK.cocouser.userid,
    pwd: KFK.APP.model.inputUserPwd,
  };
  KFK.sendCmd("REMOVEPWD", payload);
};

KFK.resetDocPwd = function() {
  let payload = {
    doc_id: KFK.tryToResetPwdDoc._id,
    oldpwd: KFK.APP.model.docOldPwd ? KFK.APP.model.docOldPwd : "",
    newpwd: KFK.APP.model.docNewPwd ? KFK.APP.model.docNewPwd : "",
  };
  KFK.sendCmd("RESETPWD", payload);
};

KFK._onDocFullyLoaded = async function() {
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
          KFK.scrLog("快速预览倒计时" + quickGlanceCountDown);
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
  window.history.replaceState(
    {},
    null,
    KFK.urlBase + "/" + KFK.APP.model.cocodoc.doc_id
  );
  KFK.APP.setData("model", "docLoaded", true);
  if (KFK.APP.model.cocodoc.readonly) {
    $("#linetransformer").draggable("disable");
    $("#right").toggle("slide", {
      duration: 100,
      direction: "right",
    });
    $("#left").toggle("slide", {
      duration: 100,
      direction: "left",
    });
    $("#top").toggle("slide", {
      duration: 100,
      direction: "left",
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
    //cleanup linkto
  });
  // KFK.info('ondocFullyLoaded, doc is', KFK.APP.model.cocodoc);
  KFK.C3.dispatchEvent(KFK.refreshC3Event);
  KFK.myFadeOut($(".loading"));
  KFK.myFadeIn(KFK.JC3, 100);
  $("#overallbackground").removeClass("grid1");
  //focusOnC3会导致C3居中
  KFK.focusOnC3();
  KFK.setTodoItemEventHandler
    ? KFK.setTodoItemEventHandler()
    : import("./todo").then((pack) => {
        KFK.setTodoItemEventHandler = pack.Todo.setTodoItemEventHandler;
        KFK.setTodoItemEventHandler();
      });
  //
  //
  //
  //
  //因此,这里再重新滚动一下.这样保证在文档新导入时,可以滚动到第一屏
  let docPos = {};
  //从localStorage中读取docPos记录
  let scrollPositionCache = localStorage.getItem("docPos");
  if (scrollPositionCache) {
    docPos = JSON.parse(scrollPositionCache);
  }
  //如果有当前文档的滚动位置记录，则滚动到起位置去
  if (docPos[KFK.APP.model.cocodoc.doc_id]) {
    KFK.scrollToPos(docPos[KFK.APP.model.cocodoc.doc_id]);
  } else {
    //如果没有，则滚动到第一屏
    KFK.scrollToPos({ x: KFK.LeftB, y: KFK.TopB });
  }
  //
  //
  //
  //
  //检查这个白板中是否是空白板，如果是，则显示showFirstTimeHelp
  if (KFK.JC3.find(".kfknode").length === 0) {
    //YIQCooor要么是出black, 要么是white, 在style.css中放了color-dynamic-black和color-dynamic-white
    $(".showFirstTimeHelp").addClass(`color-dynamic-${KFK.YIQColor}`);
    KFK.setAppData("model", "firstTime", true);
    setTimeout(function() {
      KFK.setAppData("model", "firstTime", false);
    }, 3000);
  } else {
    KFK.setAppData("model", "firstTime", false);
  }

  KFK.initShowEditors(KFK.APP.model.viewConfig.showEditor);
  if (KFK.APP.model.cocodoc.readonlyReason === "render") {
    await KFK.toggleNoControls();
    KFK.APP.model.viewConfig.useAI = false;
    KFK.APP.model.viewConfig.showgrid = false;
    KFK.APP.model.viewConfig.showbounding = false;
    KFK.APP.model.viewConfig.showEditor = "none";
    KFK.gotoAnyPage(0);
    KFK.zoomInOut("page");
  }
};

KFK.checkLoading = async function(num) {};

KFK.cleanupJC3 = async function() {
  await KFK.JC3.empty();
  KFK.addSvgLayer();
};

KFK.recreateFullDoc = async function(objects, callback) {
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

KFK.recreateObject = async function(obj, callback) {
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

KFK.recreateDoc = function(obj, callback) {
  try {
    KFK.firstShown["right"] = false;
    KFK.firstShown["chat"] = false;
    KFK.jumpStack = [];
    KFK.jumpStackPointer = -1;
    let docRet = obj.content;
    docRet.ownerAvatar_src = KFK.avatars[docRet.ownerAvatar].src;
    KFK.APP.setData("model", "cocodoc", docRet);
    KFK.setAppData(
      "model",
      "readonlyDesc",
      docRet.readonlyReason === "OWNER"
        ? "只读: 白板发起人设置为只读"
        : docRet.readonlyReason.startsWith("BOSS")
        ? "只读: 协作者人数超过组织设定的" +
          docRet.readonlyReason.substr(4) +
          "人"
        : ""
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
KFK.recreateShape = async function(obj, callback) {
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

KFK.gzippedContentToString = async function(content) {
  if (content.type !== "Buffer" || content.data === undefined) {
    console.error(
      "gzippedContentToString was passed in wrong content",
      content
    );
  }
  let tmp = await ungzip(new Buffer(content.data));
  return tmp.toString("utf8");
};

KFK.recreateNode = async function(obj, callback) {
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
      let existingNode = KFK.getNodeById(nodeid);
      if (existingNode.length > 0) {
        //节点存在，需要刷新
        let isBrNode = false;
        console.log(existingNode.prop("outerHTML"));
        if (existingNode.find(".brsnode").length > 0) {
          isBrNode = true;
        }
        console.log("isBrNode", isBrNode);
        existingNode.prop("outerHTML", jqDIV.prop("outerHTML"));
        console.log(existingNode.prop("outerHTML"));
        if (isBrNode) {
          KFK.startBrainstorm(existingNode);
        }
        jqDIV = existingNode;
        if (KFK.isA(jqDIV, "kfk_md")) {
          KFK.setMarkdownWithPreview(jqDIV);
        }
      } else {
        //新载入
        KFK.JC3.append(jqDIV);
        if (KFK.isA(jqDIV, "kfk_md")) {
          console.log("recreate a MD", jqDIV.prop("outerHTML"));
          KFK.setMarkdownWithPreview(jqDIV);
        }
      }
      jqDIV = KFK.getNodeById(nodeid);
      if (KFK.APP.model.cocodoc.readonly === false) {
        await KFK.setNodeEventHandler(jqDIV, async function() {
          if (isALockedNode) {
            // KFK.debug('is a locked');
            KFK.NodeController.lock(jqDIV);
          }
        });
      }
      KFK.redrawLinkLines(jqDIV, "server update");
      //如果是todolist， 则需要设置里面的todoitem的eventhandler
      if (jqDIV.hasClass("todolist")) {
        KFK.setTodoItemEventHandler
          ? KFK.setTodoItemEventHandler(jqDIV)
          : import("./todo").then((pack) => {
              KFK.setTodoItemEventHandler = pack.Todo.setTodoItemEventHandler;
              KFK.setTodoItemEventHandler(jqDIV);
            });
      }
    }
  } catch (error) {
    KFK.error(error);
  } finally {
    if (callback) callback(1);
    KFK.C3.dispatchEvent(KFK.refreshC3Event);
  }
};

KFK.isTodoListDIV = function(jqDIV) {
  return (
    ["coco_todo", "coco_inprogress", "coco_done"].indexOf(jqDIV.attr("id")) >= 0
  );
};
KFK.isTodoListOrChatListDIV = function(jqDIV) {
  return (
    ["coco_chat", "coco_todo", "coco_inprogress", "coco_done"].indexOf(
      jqDIV.attr("id")
    ) >= 0
  );
};
KFK.isChatListDIV = function(jqDIV) {
  return "coco_chat" === jqDIV.attr("id");
};

KFK.updateQuillingContent = async function(response) {
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
        setTimeout(function() {
          jtmp.remove();
        }, 2000);
      }
    }
  } catch (error) {
    KFK.error(error);
  }
};
//从服务器收到D指令，
KFK.deleteObject_for_Response = async function(obj) {
  try {
    if (obj.etype === "DIV") {
      let tobeDelete = $(`#${obj.nodeid}`);
      if (tobeDelete.length <= 0)
        KFK.debug(
          "Server ask to delete",
          obj.nodeid,
          ", but it does not exist"
        );
      else await KFK.deleteNode_exec(tobeDelete);
    } else if (obj.etype === "SLINE") {
      let selector = `.${obj.nodeid}`;
      try {
        KFK.svgDraw.findOne(selector).remove();
      } catch (error) {
        KFK.error(error);
      }
    }
  } finally {
    KFK.C3.dispatchEvent(KFK.refreshC3Event);
  }
};

KFK.getLineOptions = function(div) {
  return JSON.parse(KFK.base64ToCode(div.attr("options")));
};
KFK.setLineOptions = function(div, options) {
  div.attr("options", KFK.codeToBase64(JSON.stringify(options)));
};
KFK.codeToBase64 = function(code) {
  return Buffer.from(code).toString("base64");
};
KFK.base64ToCode = function(base64) {
  return Buffer.from(base64, "base64").toString("utf-8");
};

KFK.getPropertyApplyToJqNode = function() {
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

KFK.getPropertyApplyToShape = function() {
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

KFK.setShapeLineModel = function(shapeType, options) {
  let setting = $.extend({}, KFK.APP.model.svg[shapeType], options);
  KFK.APP.setData("model", "line", setting);
};
KFK.changeBorderRadius = async function(radius) {
  await KFK.updateSelectedDIVs("", async function(jqNode) {
    jqNode.css("border-radius", radius);
  });
};
KFK.changeToTransparent = async function() {
  await KFK.updateSelectedDIVs("", async function(jqNode) {
    jqNode.css("background-color", "transparent");
    jqNode.css("border-color", "transparent");
  });
};
KFK.setWritingMode = async function(wmode) {
  await KFK.updateSelectedDIVs("", async function(jqNode) {
    jqNode.css("writing-mode", wmode);
  });
};
KFK.initViewByLocalConfig = async function() {
  try {
    let localViewConfigStr = localStorage.getItem("viewConfig");
    if (localViewConfigStr) {
      let viewConfig = JSON.parse(localViewConfigStr);
      //下面这个判断语句只是用于判断viewConfig是否合法
      if (viewConfig.showgrid !== undefined) {
        await KFK.mergeAppData("model.viewConfig", viewConfig);
        KFK.setShowBounding(viewConfig.showbounding);
      }
    }
  } catch (error) {
    KFK.error("load local viewConfig found error");
  }
};

KFK.changeShapeStyle = async () => {
  if (KFK.selectedShapes.length === 0) {
    let theShape = KFK.getPropertyApplyToShape();
    KFK.selectShape(theShape);
  }
  await KFK.updateMultiShapes(KFK.selectedShapes, async function(theShape) {
    let lineWidth = theShape.attr("stroke-width");
    if (KFK.APP.model.svg.line.style === "solid") theShape.removeAttr("style");
    else {
      theShape.css("stroke-dasharray", `${lineWidth * 3} ${lineWidth}`);
    }
    return theShape;
  });
};

KFK.changeConnectStyle = async () => {
  if (KFK.selectedDIVs.length === 0) {
    let theDiv = KFK.getHoverFocusLastCreate();
    if (NotSet(theDIV)) return;
    KFK.selectNode(theDiv);
  }
  KFK.dynamic.connect.style = KFK.APP.model.property.connect.line.style;

  await KFK.updateSelectedDIVs("set connect width", async function(theDiv) {
    theDiv.attr("cnstyle", KFK.APP.model.property.connect.line.style);
    KFK.redrawLinkLines(theDiv, "property change", false);
    return theDiv;
  });
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
KFK.updateSelectedDIVs = async function(reason, callback) {
  let divs = [];
  if (KFK.selectedDIVs.length > 0) {
    divs = KFK.selectedDIVs;
  } else {
    let jqNode = KFK.getHoverFocusLastCreate();
    if (jqNode != null && KFK.notAnyLocked(jqNode)) {
      divs.push(jqNode);
    } else {
      if (KFK.divStylerRefDiv !== null) {
        divs.push(KFK.divStylerRefDiv);
      }
    }
  }
  let changeSer = 0;
  let changeCount = KFK.getUnlockedCount(divs);
  for (let i = 0; i < divs.length; i++) {
    let jqDIV = divs[i];
    let jqOld = jqDIV.clone();
    if (KFK.anyLocked(jqDIV) === false) {
      await callback(jqDIV);
      //if (isBrainstorm) {
      //KFK.startBrainstorm(jqDIV);
      //}
      await KFK.syncNodePut(
        "U",
        jqDIV.clone(),
        reason,
        jqOld,
        false,
        changeSer,
        changeCount
      );
      changeSer = changeSer + 1;
    }
  }
  KFK.setSelectedNodesBoundingRect();
  return divs.length;
};

KFK.updateMultiShapes = async function(shapes, worker) {
  let tmp = 0;
  for (let i = 0; i < shapes.length; i++) {
    if (KFK.lineLocked(shapes[i]) === false) {
      tmp = tmp + 1;
    }
  }
  let movedSer = 0;
  let movedCount = tmp;
  for (let i = 0; i < shapes.length; i++) {
    let theShape = shapes[i];
    if (theShape === null || KFK.anyLocked(theShape)) continue;
    KFK.setShapeToRemember(theShape);
    theShape = await worker(theShape);
    await KFK.syncLinePut(
      "U",
      theShape,
      "set line color",
      KFK.shapeToRemember,
      false,
      movedSer,
      movedCount
    );
    movedSer = movedSer + 1;
  }
};

KFK.initShowEditors = function(show_editor) {
  KFK.onShowEditorChanged(show_editor, true);
};

KFK.onShowEditorChanged = async function(show_editor, isInit = false) {
  KFK.APP.model.viewConfig.showEditor = show_editor;
  if (isInit === false) {
    KFK.saveLocalViewConfig();
  }
  if (show_editor === "none") {
    $(document)
      .find(".cocoeditors")
      .css("display", "none");
    $(document)
      .find(".lastcocoeditor")
      .css("display", "none");
  } else if (show_editor === "last") {
    $(document)
      .find(".cocoeditors")
      .css("display", "none");
    $(document)
      .find(".lastcocoeditor")
      .css("display", "block");
  } else if (show_editor === "all") {
    $(document)
      .find(".cocoeditors")
      .css("display", "block");
    $(document)
      .find(".lastcocoeditor")
      .css("display", "none");
  }
};

KFK.setNodeShowEditor = function(jqNode) {
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

KFK.getContrastYIQ = function(hexcolor) {
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
KFK.setBGColorTo = function(bgcolor) {
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

  if (KFK.APP.model.viewConfig.showgrid) KFK.setGridColor(bgcolor);
};

/**
 * 设置网格颜色，通过设置containerbkg的class为grid1/grid2来实现
 */
KFK.setGridColor = function(bgcolor) {
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

KFK.textAlignChanged = async function(evt, value) {
  let alignInfo = $("#textAlign").val();
  let divNum = await KFK.updateSelectedDIVs("", async function(jqNode) {
    let jqInner = jqNode.find(".innerobj");
    if (jqInner.length !== 0) {
      jqInner.css("justify-content", alignInfo);
      jqInner.css(
        "text-align-last",
        alignInfo === "flex-start"
          ? "left"
          : alignInfo === "flex-end"
          ? "right"
          : "center"
      );
      jqInner.css(
        "text-align",
        alignInfo === "flex-start"
          ? "left"
          : alignInfo === "flex-end"
          ? "right"
          : "center"
      );
    } else {
      jqNode.css("justify-content", alignInfo);
      jqNode.css(
        "text-align-last",
        alignInfo === "flex-start"
          ? "left"
          : alignInfo === "flex-end"
          ? "right"
          : "center"
      );
      jqNode.css(
        "text-align",
        alignInfo === "flex-start"
          ? "left"
          : alignInfo === "flex-end"
          ? "right"
          : "center"
      );
    }
  });
};
KFK.toggleCustomShape = function(evt) {
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

KFK.vertAlignChanged = async function(evt, value) {
  let valignInfo = $("#vertAlign").val();
  let divNum = await KFK.updateSelectedDIVs("set border width", async function(
    jqNode
  ) {
    if (jqNode.find(".innerobj").length !== 0) {
      jqNode.find(".innerobj").css("align-items", valignInfo);
    } else {
      jqNode.css("align-items", valignInfo);
    }
  });
};

KFK.setDrawMode = function(mode, event) {
  KFK.setMode("line");
  let jExpand = $("#lineExpand");
  jExpand.addClass("noshow");
  KFK.drawMode = mode;
  if (mode !== "freehand") {
    $("#tool_line").attr("src", KFK.getFrontEndUrl("assets/" + mode + ".svg"));
  }
  $("#modeIndicatorImg").attr(
    "src",
    KFK.getFrontEndUrl("assets/" + mode + ".svg")
  );
};
KFK.setMode = function(mode, event) {
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

  if (oldMode === "interlink" && mode !== "interlink") {
    KFK.hide(KFK.interLinkDialog);
  }
  if (
    (oldMode === "line" && mode !== "line") ||
    (oldMode === "connect" && mode !== "connect")
  ) {
    KFK.cancelTempLine();
  }

  if (shiftKey) {
    if (KFK.mode === "connect") {
      KFK.lockTool = true;
    } else {
      KFK.lockTool = false;
    }
  } else {
    KFK.lockTool = false;
  }

  if (KFK.mode !== "material") {
    KFK.hidePickerMatlib();
  }
  if (KFK.mode === "pointer") {
    $("#modeIndicator").hide();
  } else {
    if (KFK.mode === "yellowtip") {
      KFK.setModeIndicatorForYellowTip(cocoConfig.node.yellowtip.defaultTip);
      $("#modeIndicatorImg").hide();
      $("#modeIndicatorDiv").show();
    } else if (KFK.mode === "line") {
      $("#modeIndicatorImg").attr(
        "src",
        KFK.getFrontEndUrl("assets/" + KFK.drawMode + ".svg")
      );
      $("#modeIndicatorImg").show();
      $("#modeIndicatorDiv").hide();
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
  } else if (KFK.mode === "yellowtip" || KFK.mode === "comment") {
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
  } else if (KFK.mode === "freehand") {
    KFK.drawMode = KFK.mode;
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
  } else if (KFK.mode === "draw") {
    KFK.drawMode = "polyline";
  } else if (KFK.mode === "interlink") {
    KFK.showInterLinkDialog();
  }

  KFK.focusOnC3();
};

KFK.showInterLinkDialog = function() {
  KFK.interLinkDialog || (KFK.interLinkDialog = $("#interLinkDialog"));
  if (KFK.interLinkDialog.hasClass("noshow")) {
    KFK.show(KFK.interLinkDialog);
    try {
      KFK.interLinkDialog.draggable();
    } catch (error) {}
  } else {
    KFK.hide(KFK.interLinkDialog);
    KFK.setMode("pointer");
  }
};

KFK.showPickerMatlib = function(matid, url) {
  KFK.pickerMatlib.removeClass("noshow");
};
KFK.hidePickerMatlib = function() {
  KFK.pickerMatlib.addClass("noshow");
  KFK.materialPicked = undefined;
};

KFK.pickMaterial = function(matid, url) {
  KFK.materialPicked = {
    matid: matid,
    url: url,
  };
};

KFK.clearFreeHand = function() {
  KFK.JC3.find(".kfkfreehand").each(async (index, shape) => {
    shape = SVG(shape);
    if (shape.attr("lasteditorid") === KFK.APP.model.cocouser.userid) {
      await KFK._deleteShape(shape);
    }
  });
};

KFK.isDocOwner = function() {
  if (KFK.APP.model.cocodoc.owner !== KFK.APP.model.cocouser.userid) {
    return false;
  } else {
    return true;
  }
};

KFK.pmsOk = function(action, jdiv) {
  console.log(typeof KFK.APP.model.cocodoc.pms);
  if (KFK.APP.model.cocodoc.pms === 0) return true;
  if (KFK.isDocOwner()) return true;

  if (KFK.APP.model.cocodoc.pms === 1) {
    if (action === "C") {
      return true;
    } else {
      if (jdiv.attr("creator") === KFK.APP.model.cocouser.userid) {
        return true;
      } else {
        console.log(action, jdiv, KFK.APP.model.cocodoc.pms);
        return false;
      }
    }
  } else {
    console.log(action, jdiv, KFK.APP.model.cocodoc.pms);
    return false;
  }
};

KFK.cleanAllNodes = function() {
  if (KFK.APP.model.cocodoc.owner !== KFK.APP.model.cocouser.userid) {
    KFK.scrLog("只有协作发起人可以使用白板擦");
    return;
  }
  KFK.APP.$bvModal
    .msgBoxConfirm(
      "请确认要清空白板, 其他协作用户的白板也会一起清除, 且本操作无法回退.",
      {
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
          doc_id: KFK.APP.model.cocodoc.doc_id,
        });
      }
    })
    .catch((err) => {
      console.error(err.message);
    });
};
KFK.doCleanUp = async function() {
  await KFK.refreshDesignerWithDoc(KFK.APP.model.cocodoc.doc_id, "");
  KFK.scrLog("白板已被发起人擦除");
  KFK.stopBrainstorm();
  KFK.C3.dispatchEvent(KFK.refreshC3Event);
};

KFK.toggleMinimap = async function() {
  for (let key in KFK.APP.toolActiveState) {
    KFK.APP.toolActiveState[key] = false;
  }
  KFK.APP.toolActiveState["minimap"] = true;
  await KFK.showSection({
    minimap: !KFK.APP.show.section.minimap,
  });
  KFK.setMode("pointer");
  KFK.keypool = "";
};

KFK.toggleBrainstorm = function() {
  let jqNodeDIV = KFK.getHoverFocusLastCreate();
  if (NotSet(jqNodeDIV)) return;

  if (KFK.anyLocked(jqNodeDIV)) return;
  if (KFK.brNodeId && KFK.brNodeId === jqNodeDIV.attr("id")) {
    KFK.brNodeId = undefined;
    KFK.stopBrainstorm();
  } else {
    KFK.startBrainstorm(jqNodeDIV);
  }
};

KFK.stopBrainstorm = function() {
  KFK.brainstormMode = false;
  KFK.brNodeId = undefined;
  $(".brsnode").remove();
};

KFK.startBrainstorm = function(jqNode) {
  if (NotSet(jqNode)) return;
  KFK.brNodeId = jqNode.attr("id");
  KFK.brainstormMode = true;
  $(".brsnode").remove();
  let jBrsNode = $("<div class='brsnode' style='z-index:-1'></div>");
  jBrsNode.appendTo(KFK.getNodeById(KFK.brNodeId));
};

KFK.getNodeById = function(nodeId) {
  return $("#" + nodeId);
};

//用在index.js中的boostrapevue
KFK.isActive = function(mode) {
  return KFK.mode === mode;
};

KFK.width = function(w) {
  if (w) {
    KFK._width = w;
    KFK.stage.width(w);
  }
  return KFK._width;
};
KFK.height = function(h) {
  if (h) {
    KFK._height = h;
    KFK.stage.height(h);
  }
  return KFK._height;
};

KFK.size = function(w, h) {
  KFK.width(w);
  KFK.height(h);
};
/**
 * 是否是一个kfknode
 * @param a node div
 */
KFK.isKfkNode = function(jqdiv) {
  return KFK.isA(jqdiv, "kfknode");
};
/**
 * 是否是一个有某个className的对象
 * @param jqdiv  要检查的对象
 * @param className 要检查的className
 * @return true，如果有这个className， false如果没有这个className
 */
KFK.isA = function(jqdiv, className) {
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
KFK.isNotA = function(jqdiv, className) {
  return !KFK.isA(jqdiv, className);
};
KFK.inDesigner = function() {
  return KFK.APP.show.section.designer;
};
KFK.holdEvent = function(evt) {
  evt.stopImmediatePropagation();
  evt.stopPropagation();
  evt.preventDefault();
};
KFK.addDocumentEventHandler = function() {
  if (IsSet(KFK.documentEventHandlerSet)) return;
  //document keydown
  $(document).keydown(async function(evt) {
    if (KFK.isShowingModal === true) return;
    if (KFK.inDesigner() === false) return;
    if (KFK.onC3 === false) return;
    if (KFK.isEditting) return;
    if (evt.keyCode === 16) KFK.KEYDOWN.shift = true;
    else if (evt.keyCode === 17) KFK.KEYDOWN.ctrl = true;
    else if (evt.keyCode === 18) KFK.KEYDOWN.alt = true;
    else if (evt.keyCode === 91) KFK.KEYDOWN.meta = true;
    //如果正处于编辑状态，则不做处理
    //禁止Ctrl-A  and Ctrl-S
    if (
      (evt.keyCode === 65 || evt.keyCode === 83) &&
      (evt.ctrlKey || evt.metaKey)
    ) {
      evt.stopPropagation();
      evt.preventDefault();
      return;
    }
    //key pool
    if (
      (evt.keyCode >= 48 && evt.keyCode <= 57) ||
      (evt.keyCode >= 65 && evt.keyCode <= 90) ||
      evt.keyCode === 32 ||
      evt.keyCode === 186
    ) {
      KFK.keypool += evt.key;
      // KFK.scrLog(KFK.keypool);
      KFK.keypool = KFK.keypool.toLowerCase();
      KFK.logKey(KFK.keypool);

      if (KFK.inPresentingMode) {
        if (
          KFK.keypool.endsWith("haola") ||
          KFK.keypool.endsWith("hl") ||
          KFK.keypool.endsWith("pr")
        ) {
          KFK.endPresentation();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("b")) {
          if (KFK.presentMaskMode === true) {
            KFK.presentNoneMask();
          } else {
            KFK.presentBlackMask();
          }
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("w")) {
          if (KFK.presentMaskMode === true) {
            KFK.presentNoneMask();
          } else {
            KFK.presentWhiteMask();
          }
          KFK.keypool = "";
          return;
        } else if (
          KFK.keypool.endsWith("first") ||
          KFK.keypool.endsWith("home")
        ) {
          KFK.presentFirstPage();
          KFK.keypool = "";
          return;
        } else if (
          KFK.keypool.endsWith("last") ||
          KFK.keypool.endsWith("end")
        ) {
          KFK.presentLastPage();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("prev")) {
          KFK.presentPrevPage();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("next")) {
          KFK.presentNextPage();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.match(/([0-9]+)g$/)) {
          let m = KFK.keypool.match(/([0-9]+)g$/);
          let pindex = parseInt(m[1]) - 1;
          pindex = Math.max(
            0,
            Math.min(pindex, KFK.pageBounding.Pages.length - 1)
          );
          KFK.presentAnyPage(pindex);
          KFK.keypool = "";
          return;
        }
      } // inPresentingMode
      else {
        if (
          KFK.keypool.endsWith("haola") ||
          KFK.keypool.endsWith("hl") ||
          KFK.keypool.endsWith("pr")
        ) {
          KFK.startPresentation();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("ctl")) {
          //Children to my left
          await KFK.childrenToMySide("left");
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("ctr")) {
          //Children to right
          await KFK.childrenToMySide("right");
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("ctb")) {
          //Children to my bottom
          await KFK.childrenToMySide("bottom");
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("ctt")) {
          //Children to my top
          await KFK.childrenToMySide("top");
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("ttd")) {
          KFK.copyToTodo
            ? await KFK.copyToTodo()
            : import("./todo").then(async (pack) => {
                KFK.copyToTodo = pack.Todo.copyToTodo;
                await KFK.copyToTodo();
              });
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("td") || KFK.keypool.endsWith("todo")) {
          KFK.keypool = "";
          KFK.toggleInputFor("todo");
          evt.stopPropagation();
          evt.preventDefault();
          await KFK.beginTodoMode();
          return;
        } else if (KFK.keypool.endsWith("rt")) {
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
          KFK.toggleRightPanel(0, true);
          return;
        } else if (KFK.keypool.endsWith("2tr")) {
          KFK.keypool = "";
          KFK.toggleRightPanel(1, true);
          return;
        } else if (KFK.keypool.endsWith("3tr")) {
          KFK.keypool = "";
          KFK.toggleRightPanel(2, true);
          return;
        } else if (KFK.keypool.endsWith("tr")) {
          KFK.keypool = "";
          KFK.toggleRightPanel(-1, false);
          return;
        } else if (KFK.keypool.endsWith("jl")) {
          //jump to last created
          await KFK.jumpToLastCreated(false);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("jr")) {
          //jump to last created
          await KFK.jumpToBrain(false);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("rr")) {
          //link to brain
          await KFK.linkToBrain();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("uj")) {
          //link to brain
          await KFK.removeNodeConnections();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("rl")) {
          //brain to last created
          await KFK.jumpToLastCreated(true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("jn")) {
          //jump to next focused
          await KFK.jumpToNext(false);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("rn")) {
          //brain to next focused
          await KFK.jumpToNext(true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("jp")) {
          //jump to previous focused
          await KFK.jumpToPrevious(false);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("rp")) {
          //bran to previous focused
          await KFK.jumpToPrevious(true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("fl")) {
          await KFK.flushJumpStack(); // no take brain
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("imp")) {
          KFK.keypool = "";
          KFK.showDialog({
            importbr: true,
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
          console.log("log level", KFK.loglevel);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("logwarn")) {
          KFK.loglevel = KFK.LOGLEVEL_WARN;
          console.log("log level", KFK.loglevel);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("loginfo")) {
          KFK.loglevel = KFK.LOGLEVEL_INFO;
          console.log("log level", KFK.loglevel);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("logkey")) {
          KFK.loglevel = KFK.LOGLEVEL_KEY;
          console.log("log level", KFK.loglevel);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("logdebug")) {
          KFK.loglevel = KFK.LOGLEVEL_DEBUG;
          console.log("log level", KFK.loglevel);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("logdetail")) {
          KFK.loglevel = KFK.LOGLEVEL_DETAIL;
          console.log("log level", KFK.loglevel);
          KFK.keypool = "";
          return;
        } else if (
          KFK.keypool.endsWith("done") ||
          KFK.keypool.endsWith("d90") ||
          KFK.keypool.endsWith("d80") ||
          KFK.keypool.endsWith("d70") ||
          KFK.keypool.endsWith("d60") ||
          KFK.keypool.endsWith("d50") ||
          KFK.keypool.endsWith("d40") ||
          KFK.keypool.endsWith("d30") ||
          KFK.keypool.endsWith("d20") ||
          KFK.keypool.endsWith("d10") ||
          KFK.keypool.endsWith("start") ||
          KFK.keypool.endsWith("d0")
        ) {
          let progress = 0;
          if (KFK.keypool.endsWith("done")) {
            progress = 100;
          } else if (KFK.keypool.endsWith("start")) {
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
          KFK.keypool = "";
          return;
        } else if (
          KFK.keypool.endsWith("first") ||
          KFK.keypool.endsWith("home")
        ) {
          KFK.gotoFirstPage();
          KFK.keypool = "";
          return;
        } else if (
          KFK.keypool.endsWith("last") ||
          KFK.keypool.endsWith("end")
        ) {
          KFK.gotoLastPage();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("prev")) {
          KFK.gotoPrevPage();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith("next")) {
          KFK.gotoNextPage();
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.match(/([0-9]+)g$/)) {
          let m = KFK.keypool.match(/([0-9]+)g$/);
          if (parseInt(m[1]) === 99) {
            KFK.gotoTodo();
            KFK.keypool = "";
          } else {
            let pindex = parseInt(m[1]) - 1;
            pindex = Math.max(
              0,
              Math.min(pindex, KFK.pageBounding.Pages.length - 1)
            );
            KFK.gotoAnyPage(pindex);
            KFK.zoomInOut("page");
            KFK.keypool = "";
          }
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
        } else if (
          KFK.keypool.endsWith(";f") ||
          KFK.keypool.endsWith(";v") ||
          KFK.keypool.endsWith(";c") ||
          KFK.keypool.endsWith(";x") ||
          KFK.keypool.endsWith(";s") ||
          KFK.keypool.endsWith(";w") ||
          KFK.keypool.endsWith(";e") ||
          KFK.keypool.endsWith(";r")
        ) {
          KFK.placeFollowerNode(
            KFK.getHoverFocusLastCreate(),
            KFK.keypool.substr(-1)
          );
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 0")) {
          KFK.setMode("text");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 1")) {
          KFK.setMode("textblock");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 2")) {
          KFK.setMode("yellowtip");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 3")) {
          KFK.setMode("richtext");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 4")) {
          KFK.setMode("md");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 5")) {
          KFK.setMode("comment");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 6")) {
          KFK.setMode("jump");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 7")) {
          KFK.setMode("interlink");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 8")) {
          KFK.setMode("material");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" 9")) {
          KFK.setMode("line");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" s")) {
          KFK.setMode("freehand");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" j")) {
          KFK.setMode("connect");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" l")) {
          KFK.setMode("lock");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.endsWith(" n")) {
          KFK.setMode("brain");
          KFK.toggleRightPanel(0, true);
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.length > 10) {
          KFK.keypool = KFK.keypool.substr(-9);
        } else if (KFK.keypool.match(/mv([0-9]{2})$/)) {
          let m = KFK.keypool.match(/mv([0-9]{2})$/);
          let pindex = parseInt(m[1]) - 1;
          pindex = Math.max(
            0,
            Math.min(pindex, KFK.pageBounding.Pages.length - 1)
          );
          KFK.AdvOps
            ? KFK.AdvOps.moveSingleElement(pindex)
            : import("./advOps").then((pack) => {
                KFK.AdvOps = pack.AdvOps;
                KFK.AdvOps.moveSingleElement(pindex);
              });
          KFK.keypool = "";
          return;
        } else if (KFK.keypool.match(/ma([0-9]{2})$/)) {
          let m = KFK.keypool.match(/ma([0-9]{2})$/);
          let pindex = parseInt(m[1]) - 1;
          pindex = Math.max(
            0,
            Math.min(pindex, KFK.pageBounding.Pages.length - 1)
          );
          KFK.AdvOps
            ? KFK.AdvOps.moveAllElements(pindex)
            : import("./advOps").then((pack) => {
                KFK.AdvOps = pack.AdvOps;
                KFK.AdvOps.moveAllElements(pindex);
              });
          KFK.keypool = "";
          return;
        }
      } //Not inPresentingMode
    } else {
      KFK.keypool = "";
    }

    //Special keys
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
          let delta = evt.ctrlKey
            ? KFK.config.morph.delta * 3
            : KFK.config.morph.delta;
          KFK.DivStyler
            ? KFK.DivStyler.horiSizeSmaller(delta)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.horiSizeSmaller(delta);
              });
        } else if (
          evt.shiftKey === false &&
          evt.altKey === false &&
          evt.ctrlKey === false &&
          evt.metaKey === false
        ) {
          KFK.DivStyler
            ? KFK.DivStyler.moveDIV(evt.keyCode, evt.ctrlKey)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.moveDIV(evt.keyCode, evt.ctrlKey);
              });
        }
        // else KFK.gotoLeftPage();
        KFK.holdEvent(evt);
      } else if (evt.keyCode === 38) {
        //UP
        if (evt.shiftKey) {
          let delta = evt.ctrlKey
            ? KFK.config.morph.delta * 3
            : KFK.config.morph.delta;
          KFK.DivStyler
            ? KFK.DivStyler.vertSizeBigger(delta)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.vertSizeBigger(delta);
              });
        } else if (
          evt.shiftKey === false &&
          evt.altKey === false &&
          evt.ctrlKey === false &&
          evt.metaKey === false
        ) {
          KFK.DivStyler
            ? KFK.DivStyler.moveDIV(evt.keyCode, evt.ctrlKey)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.moveDIV(evt.keyCode, evt.ctrlKey);
              });
        }
        // else KFK.gotoUpperPage();
        KFK.holdEvent(evt);
      } else if (evt.keyCode === 39) {
        //Right
        if (evt.shiftKey) {
          let delta = evt.ctrlKey
            ? KFK.config.morph.delta * 3
            : KFK.config.morph.delta;
          KFK.DivStyler
            ? KFK.DivStyler.horiSizeBigger(delta)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.horiSizeBigger(delta);
              });
        } else if (
          evt.shiftKey === false &&
          evt.altKey === false &&
          evt.ctrlKey === false &&
          evt.metaKey === false
        ) {
          KFK.DivStyler
            ? KFK.DivStyler.moveDIV(evt.keyCode, evt.ctrlKey)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.moveDIV(evt.keyCode, evt.ctrlKey);
              });
        }
        // else KFK.gotoRightPage();
        KFK.holdEvent(evt);
      } else if (evt.keyCode === 40) {
        //Down
        if (evt.shiftKey) {
          let delta = evt.ctrlKey
            ? KFK.config.morph.delta * 3
            : KFK.config.morph.delta;
          KFK.DivStyler
            ? KFK.DivStyler.vertSizeSmaller(delta)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.vertSizeSmaller(delta);
              });
        } else if (
          evt.shiftKey === false &&
          evt.altKey === false &&
          evt.ctrlKey === false &&
          evt.metaKey === false
        ) {
          KFK.DivStyler
            ? KFK.DivStyler.moveDIV(evt.keyCode, evt.ctrlKey)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.moveDIV(evt.keyCode, evt.ctrlKey);
              });
        }
        // else KFK.gotoLowerPage();
        KFK.holdEvent(evt);
      } else if (evt.keyCode === 32) {
        //space key space
        //浏览器中按空格时，浏览器会滚动， 这里把它屏蔽掉
        evt.preventDefault();
        evt.stopPropagation();
        //如果coco_chat显示着，就尝试把它隐藏，相应的，在space keyup时，再显示出来
        $(".spaceToHide").stop();
        $(".spaceToHide").animate(
          {
            opacity: 0,
          },
          500
        );
      } else if (evt.keyCode === 9) {
        // key TAB
        let jdiv = KFK.getHoverFocusLastCreate();
        if (IsSet(jdiv)) {
          if (evt.shiftKey) {
            evt.stopPropagation();
            evt.preventDefault();
            let newdiv = await KFK.placeFollowerNode(jdiv, "s");
            KFK.jumpToNode(newdiv);
          } else {
            evt.stopPropagation();
            evt.preventDefault();
            let newdiv = await KFK.placeFollowerNode(jdiv, "f");
            KFK.jumpToNode(newdiv);
          }
        }
      }
    } // not in presentation mode

    switch (evt.keyCode) {
      case 13:
        //回车进入编辑 回车编辑
        if (evt.shiftKey) {
          //shift-enter shift enter
          //如果按住了shift，则在其上下放置sibling
          //如果有脑图中心节点
          let theDIV = KFK.getFocusHoverLastCreate();
          if (IsSet(theDIV) && theDIV.find(".brsnode").length < 1) {
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
              tmpHeight += sameSideChildren.length * divSpacing;
              //脑图中心节点的中心高度
              let brPosY = KFK.divMiddle(parent);
              let accumulatedHeight = 0;
              //移动所有已存在节点
              for (let i = 0; i < sameSideChildren.length; i++) {
                let newY = brPosY - tmpHeight * 0.5 + accumulatedHeight;
                let old = sameSideChildren[i].clone();
                sameSideChildren[i].css("top", newY);
                accumulatedHeight +=
                  KFK.divHeight(sameSideChildren[i]) + divSpacing;
                if (i === myIndex) {
                  accumulatedHeight +=
                    KFK.divHeight(sameSideChildren[i]) + divSpacing;
                }
                //作为父节点，可连接左右中点，其子节点可连接打开左右中点；
                //作为子节点，父节点可任意中点，但自身只能连接到左右中点；
                KFK.redrawLinkLines(sameSideChildren[i], "move", true, [
                  [0, 2],
                  [0, 2],
                  [0, 1, 2, 3],
                  [0, 2],
                ]);
                KFK.syncNodePut(
                  "U",
                  sameSideChildren[i].clone(),
                  "new child",
                  old,
                  false,
                  i,
                  sameSideChildren.length
                );
              }
              //插入新节点
              let newNode = await KFK.placeNode(
                false,
                KFK.myuid,
                theDIV.attr("nodetype"),
                "default",
                KFK.divCenter(sameSideChildren[myIndex]),
                KFK.divMiddle(sameSideChildren[myIndex]) +
                  divSpacing +
                  KFK.divHeight(sameSideChildren[myIndex]),
                KFK.divWidth(sameSideChildren[myIndex]),
                KFK.divHeight(sameSideChildren[myIndex]),
                "",
                ""
              );

              if (KFK.hasConnection(parent, newNode) === false) {
                let tmp = parent.clone();
                KFK.drawConnect(parent, newNode);
                KFK.buildConnectionBetween(parent, newNode);
                await KFK.syncNodePut(
                  "U",
                  parent.clone(),
                  "new child",
                  tmp,
                  false,
                  0,
                  1
                );
              }
              KFK.redrawLinkLines(newNode, "shiftreturn", true, [
                [0, 2],
                [0, 2],
                [0, 1, 2, 3],
                [0, 2],
              ]);
              await KFK.syncNodePut(
                "C",
                newNode,
                "new node",
                null,
                false,
                0,
                1
              );
              KFK.jumpToNode(newNode);
            } //parents.lenth > 0
          } //IsSet (theDIV)
          //evt.shiftKey === true;
        } else {
          KFK.editFocusedThenHoveredObject(evt, true);
        }
        break;
      case 27: // key ESC
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
        KFK.onESC();

        break;
      case 90: //key z
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
      case 69: // key E
      case 76: // key L
      case 82: // key R
      case 66: // key B
      case 73: //key I
        if (
          ([69, 76, 82].indexOf(evt.keyCode) >= 0 &&
            evt.metaKey &&
            evt.ctrlKey) ||
          ([66, 73].indexOf(evt.keyCode) >= 0 && (evt.metaKey || evt.ctrlKey))
        ) {
          KFK.holdEvent(evt);
          KFK.DivStyler
            ? KFK.DivStyler.alignInnerContent(evt.keyCode)
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.alignInnerContent(evt.keyCode);
              });
        }
        break;
      case 81: //key q key mode clearfreehand
        if (evt.ctrlKey === false && evt.metaKey === false) {
          let oldMode = KFK.mode;
          KFK.setMode("clearfreehand");
          KFK.clearFreeHand();
          KFK.setMode(oldMode);
          return;
        }
        break;
      case 8: //Backspace
      case 46: //Delete key del  key delete
        KFK.deleteObjects(evt, false);
        break;
      case 48: //key 0
        if (evt.ctrlKey || evt.metaKey) {
          evt.preventDefault();
          evt.stopPropagation();
          KFK.zoomInOut("100%");
        }
        break;
      case 49: //key 1
        if (evt.ctrlKey || evt.metaKey) {
          evt.preventDefault();
          evt.stopPropagation();
          KFK.zoomInOut("page");
        }
        break;
      case 187: //key =
        if (evt.ctrlKey || evt.metaKey) {
          evt.preventDefault();
          evt.stopPropagation();
          KFK.zoomInOut("zoomin");
        }
        break;
      case 189: //key -
        if (evt.ctrlKey || evt.metaKey) {
          evt.preventDefault();
          evt.stopPropagation();
          KFK.zoomInOut("zoomout");
        }
        break;
      case 67: //Ctrl-Shift-C
        if (evt.ctrlKey && evt.shiftKey) {
          KFK.holdEvent(evt);
          KFK.DivStyler
            ? KFK.DivStyler.copyStyle()
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.copyStyle();
              });
        }
        break;
      case 86: //Ctrl-Shift-V
        if (evt.ctrlKey && evt.shiftKey) {
          KFK.holdEvent(evt);
          KFK.DivStyler
            ? KFK.DivStyler.pasteStyle()
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.pasteStyle();
              });
        }
        break;
      case 219: //Ctrl-[
        if (evt.shiftKey || evt.ctrlKey) {
          KFK.holdEvent(evt);
          KFK.DivStyler
            ? KFK.DivStyler.fontSmaller()
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.fontSmaller();
              });
        }
        break;
      case 221: //Ctrl-]
        if (evt.shiftKey || evt.ctrlKey) {
          KFK.holdEvent(evt);
          KFK.DivStyler
            ? KFK.DivStyler.fontBigger()
            : import("./divStyler").then((pack) => {
                KFK.DivStyler = pack.DivStyler;
                KFK.DivStyler.fontBigger();
              });
        }
        break;
      case 70: // key f
        await KFK.tryToJump();
        break;
      case 71: // key g
        KFK.tryToJumpBack();
        break;
      default:
        preventDefault = false;
    }
  });
  $(document).keyup(function(evt) {
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
        $(".spaceToHide").stop();
        $(".spaceToHide").animate(
          {
            opacity: 1,
          },
          500
        );
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
  $(document).on("mousemove", function(evt) {
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
      KFK.zoomShape(evt, KFK.shapeToZoom);
    }
  });
  $(document).on("mousedown", function(evt) {
    console.log("document.mousedown");
    if (KFK.inDesigner() === false) return;
    if (KFK.mode === "pointer" && KFK.docIsReadOnly() === false) {
      KFK.kuangXuanMouseIsDown = true;
      KFK.kuangXuanStartPoint = {
        x: KFK.scrXToJc3X(evt.clientX),
        y: KFK.scrYToJc3Y(evt.clientY),
      };
    }
  });
  $(document).on("mouseup", async function(evt) {
    if (KFK.inDesigner() === false) return;
    KFK.panStartAt = undefined;
    if (KFK.mode === "pointer" && KFK.docIsReadOnly() === false) {
      KFK.kuangXuanMouseIsDown = false;
      KFK.kuangXuanEndPoint = {
        x: KFK.scrXToJc3X(evt.clientX),
        y: KFK.scrYToJc3Y(evt.clientY),
      };
      if (KFK.duringKuangXuan) {
        KFK.ignoreClick = true;
        KFK.endKuangXuan(
          KFK.kuangXuanStartPoint,
          KFK.kuangXuanEndPoint,
          evt.shfitKey
        );
        KFK.duringKuangXuan = false;
      }
    }
    //线条点下去以后，shapeToDrag就设置好了
    //移动距离大于5时，才会设置shapeDragging=true
    //如果在距离小于5内，抬起鼠标，此时，shapeDragging还是false,此时，应该把shapeToDrag置为null
    if (KFK.shapeDragging === false && KFK.shapeToDrag) {
      KFK.shapeToDrag = null;
    }
    //end shape drag, end drag shape
    if (
      KFK.shapeDragging &&
      KFK.docIsReadOnly() === false &&
      KFK.lineLocked(KFK.shapeToDrag) === false
    ) {
      if (
        KFK.isShapeSelected(KFK.shapeToDrag) === false &&
        KFK.selectedShapes.length > 0
      ) {
        KFK.cancelAlreadySelected();
      }
      let realX = KFK.scalePoint(KFK.scrXToJc3X(evt.clientX));
      let realY = KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY));
      let pt = {
        x: realX,
        y: realY,
      };
      // if (KFK.APP.model.viewConfig.snap) {
      //     pt = KFK.getNearGridPoint(realX, realY);
      // }
      let alreadySelected = false;
      for (let i = 0; i < KFK.selectedShapes.length; i++) {
        if (KFK.selectedShapes[i].attr("id") == KFK.shapeToDrag.attr("id")) {
          alreadySelected = true;
          break;
        }
      }
      if (alreadySelected === false) {
        KFK.selectedShapes.push(KFK.shapeToDrag);
      }
      console.log("mouseup, end drag");
      console.log("selectedShapes", KFK.selectedShapes.length);
      let unlockedShapeCount = 0;
      for (let i = 0; i < KFK.selectedShapes.length; i++) {
        if (KFK.lineLocked(KFK.selectedShapes[i]) === false) {
          unlockedShapeCount++;
        }
      }
      let unlockedDivCount = 0;
      for (let i = 0; i < KFK.selectedDIVs.length; i++) {
        if (
          KFK.anyLocked(KFK.selectedDIVs[i]) === false &&
          KFK.updateable(KFK.selectedDIVs[i])
        ) {
          unlockedDivCount++;
        }
      }
      let movedCount = unlockedDivCount + unlockedShapeCount;
      let movedSer = 0;

      for (let i = 0; i < KFK.selectedShapes.length; i++) {
        let aShape = KFK.selectedShapes[i];
        if (KFK.lineLocked(aShape)) continue;
        KFK.setShapeToRemember(aShape);
        //在拖动鼠标时， shapeDraggingStartPoint 是跟着变化的,在鼠标移动时，已经对shapeToDrag做了位移
        if (aShape.attr("id") === KFK.shapeToDrag.attr("id")) {
          let deltaX = pt.x - KFK.shapeDraggingStartPoint.x;
          let deltaY = pt.y - KFK.shapeDraggingStartPoint.y;
          console.log("self dmove", deltaX, deltaY);
          //aShape.dmove(deltaX, deltaY);
        } else {
          //其它对象要从原始位置计算位移
          let deltaX = pt.x - KFK.shapeFirstDraggingStartPoint.x;
          let deltaY = pt.y - KFK.shapeFirstDraggingStartPoint.y;
          console.log(aShape.attr("shapetype"), "dmove", deltaX, deltaY);
          await aShape.dmove(deltaX, deltaY);
        }
        let beforeSaveWidth = aShape.attr("stroke-width");
        let beforeSaveColor = aShape.attr("stroke");
        KFK.resetShapeStyleToOrigin(aShape);
        KFK.resetShapeStyleToOrigin(KFK.shapeToRemember);
        await KFK.syncLinePut(
          "U",
          aShape,
          "move",
          KFK.shapeToRemember,
          false,
          movedSer,
          movedCount
        );
        movedSer = movedSer + 1;
        aShape.attr({
          "stroke-width": beforeSaveWidth,
          stroke: beforeSaveColor,
        });
      }

      let delta = {
        x: pt.x - KFK.shapeFirstDraggingStartPoint.x,
        y: pt.y - KFK.shapeFirstDraggingStartPoint.y,
      };
      for (let i = 0; i < KFK.selectedDIVs.length; i++) {
        if (
          KFK.anyLocked(KFK.selectedDIVs[i]) ||
          KFK.updateable(KFK.selectedDIVs[i]) === false
        )
          continue;
        let tmpFromJQ = KFK.selectedDIVs[i].clone();
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
        await KFK.syncNodePut(
          "U",
          KFK.selectedDIVs[i].clone(),
          "move following selected",
          tmpFromJQ,
          false,
          movedSer,
          movedCount
        );
        movedSer = movedSer + 1;
      }
      for (let i = 0; i < KFK.selectedDIVs.length; i++) {
        KFK.redrawLinkLines(KFK.selectedDIVs[i], "codrag", true);
      }

      KFK.setShapeToRemember(KFK.shapeToDrag);
      KFK.shapeDragging = false;
      KFK.shapeToDrag = null;
      $(document.body).css("cursor", "default");
    }
  });
  window.addEventListener(
    "wheel",
    function(evt) {
      if (evt.ctrlKey) {
        evt.preventDefault();
        if (evt.wheelDelta / 120 > 0) {
          console.log("scrolling up !");
          evt.preventDefault();
          evt.stopPropagation();
          KFK.zoomInOut("zoomin");
        } else {
          console.log("scrolling down !");
          evt.preventDefault();
          evt.stopPropagation();
          KFK.zoomInOut("zoomout");
        }
      }
    },
    { passive: false }
  );
  /*
  function pinchStart(evt) {
    console.log("pinch Start");
  }
  function pinchMove(evt) {
    console.log("pinch Move");
  }
  function pinchEnd(evt) {
    console.log("pinch End");
  }
  $(document).on("touchstart", async function(evt) {
    if (KFK.inDesigner() === false) return;
    console.log("touchstart");
    if (evt.touches.length === 2) {
      KFK.pinching = true;
      pinchStart(evt);
    }
  });

  $(document).on("touchmove", async function(evt) {
    if (KFK.inDesigner() === false) return;
    if (KFK.pinching) {
      pinchMove(evt);
    }
  });

  $(document).on("touchend", async function(evt) {
    if (KFK.pinching) {
      pinchEnd(evt);
      KFK.pinching = undefined;
    }
  });
  */

  // onscroll onScroll on scroll on Scroll
  $("#S1").scroll(() => {
    if (KFK.inDesigner() === false) return;
    let sx = $("#S1").scrollLeft();
    let sy = $("#S1").scrollTop();
    try {
      //不是每次滚动都记录，滚动停止一秒后再记录
      if (KFK.scrollPosTimer) {
        clearTimeout(KFK.scrollPosTimer);
        KFK.scrollPosTimer = undefined;
      }
      KFK.scrollPosTimer = setTimeout(function() {
        let docPos = {};
        let scrollPositionCache = localStorage.getItem("docPos");
        if (scrollPositionCache) {
          docPos = JSON.parse(scrollPositionCache);
        }
        if (docPos[KFK.APP.model.cocodoc.doc_id]) {
          docPos[KFK.APP.model.cocodoc.doc_id] = { x: sx, y: sy };
        } else {
          let keyCount = 0;
          for (key in docPos) {
            keyCount++;
          }
          if (keyCount > 30) {
            let tmp = {};
            let j = 0;
            for (key in docPos) {
              if (j > 10) {
                tmp[key] = docPos[key];
              }
              j++;
            }
            docPos = tmp;
          }
          docPos[KFK.APP.model.cocodoc.doc_id] = { x: sx, y: sy };
        }
        localStorage.setItem("docPos", JSON.stringify(docPos));
      }, 1000);
    } catch (error) {
      console.log("save docPos error", error);
    }

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

KFK.executeFunctionByName = function(functionName, context) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
};

KFK.onESC = function() {
  KFK.cancelAlreadySelected();
  if (!KFK.isEditting && KFK.mode !== "line") KFK.setMode("pointer");
  KFK.cancelTempLine();
  KFK.setMode("pointer");
  if (KFK.tempShape) KFK.tempShape.hide();
  KFK.hidePickerMatlib();
};

KFK.toggleTodoMode = async function() {
  KFK.jInputMsgDlg || (KFK.jInputMsgDlg = $(".msgInputWindow"));
  if (KFK.jInputMsgDlg.hasClass("noshow")) {
    KFK.beginTodoMode();
  } else {
    KFK.stopTodoMode();
  }
};

KFK.resetShapeStyleToOrigin = function(shape) {
  shape.attr({
    "stroke-width": shape.attr("origin-width"),
    stroke: shape.attr("origin-color"),
  });
};
KFK.beginTodoMode = async function() {
  KFK.toggleInputFor("todo");
  KFK.APP.inputMsg = "";
  await KFK.showMsgInputDlg();
  if ($(".coco_todo").length > 0) {
    KFK.scrollToNodeById("coco_todo");
  }
};

KFK.stopTodoMode = function() {
  KFK.toggleInputFor(undefined);
  KFK.hideMsgInputDlg();
};
KFK.stopChatMode = function() {
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
    let divId = "";
    if (typeof jq === "string") {
      divId = jq;
      jq = $(jq);
    } else {
      divId = jq.attr("id");
    }
    if (KFK.isShowing(jq)) {
      KFK.hide(jq);
      KFK.showStatus[divId] = "show";
    } else {
      KFK.showStatus[divId] = "hide";
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
    let divId = "";
    if (typeof jq === "string") {
      divId = jq;
      jq = $(jq);
    } else {
      divId = jq.attr("id");
    }
    if (KFK.showStatus[divId] !== undefined) {
      if (KFK.showStatus[divId] === "show") {
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
  KFK.jInputMsgDlg || (KFK.jInputMsgDlg = $(".msgInputWindow"));
  if (KFK.isShowing(KFK.jInputMsgDlg)) {
    KFK.hide(KFK.jInputMsgDlg);
  } else {
    KFK.show(KFK.jInputMsgDlg);
  }
};
/**
 * Just hide the msg input dialog, nothing else
 */
KFK.hideMsgInputDlg = function() {
  KFK.jInputMsgDlg || (KFK.jInputMsgDlg = $(".msgInputWindow"));
  KFK.hide(KFK.jInputMsgDlg);
};

KFK.getTodoDivIdByItem = function(jItem) {
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

KFK.deleteTodo = async function() {
  let fromDIVId = KFK.getTodoDivIdByItem(KFK.selectedTodo);
  let fromDIV = $("#" + fromDIVId);
  KFK.selectedTodo.remove();
  KFK.selectedTodo = undefined;
  KFK.closeTodoOption();
  await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
};

/**
 * Show the message input dialog
 * @param autofocus Focus in the text input, default is true
 */
KFK.showMsgInputDlg = async function(autofocus = true) {
  KFK.jInputMsgDlg || (KFK.jInputMsgDlg = $(".msgInputWindow"));
  KFK.show(KFK.jInputMsgDlg);
  await KFK.jInputMsgDlg.find("input").focus();
};

KFK.modifyTodo = async function(evt) {
  KFK.closeTodoOption();
  KFK.toggleInputFor("todo");
  await KFK.showMsgInputDlg();
  KFK.APP.inputMsg = KFK.selectedTodo.find(".todolabel").text();
  KFK.modifyTodoText = true;
};

KFK.onNormalInput = async function(evt) {
  evt.stopPropagation();
};

/**
 * 检测TODO inut框的键盘输入
 *
 */
KFK.onMsgInput = async function(evt) {
  evt.stopPropagation();
  KFK.noCopyPaste = true;
  if (evt.keyCode === 27) {
    //key ESC
    KFK.noCopyPaste = false;
    if (KFK.inputFor === "todo") KFK.stopTodoMode();
    else if (KFK.inputFor === "chat") KFK.stopChatMode();
    return;
  } else if (evt.keyCode === 13) {
    if (KFK.APP.inputMsg === "todo") {
      KFK.toggleInputFor("todo");
      KFK.scrollToNodeById("coco_todo");
      KFK.APP.inputMsg = "";
      return;
    } else if (KFK.APP.inputMsg === "chat") {
      KFK.toggleInputFor("chat");
      KFK.APP.inputMsg = "";
      return;
    }
    if (KFK.inputFor === "todo") {
      if (IsSet(KFK.modifyTodoText)) {
        if (KFK.APP.inputMsg.trim().length > 0) {
          KFK.selectedTodo.find(".todolabel").text(KFK.APP.inputMsg.trim());
          let fromDIVId = KFK.getTodoDivIdByItem(KFK.selectedTodo);
          let fromDIV = $("#" + fromDIVId);
          await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
        }
        KFK.modifyTodoText = undefined;
        KFK.selectedTodo = undefined;
        KFK.APP.inputMsg = "";
      } else {
        if (KFK.APP.inputMsg.trim().length > 0) {
          KFK.placeNewTodoItem
            ? await KFK.placeNewTodoItem(KFK.APP.inputMsg)
            : import("./todo").then(async (pack) => {
                KFK.placeNewTodoItem = pack.Todo.placeNewTodoItem;
                await KFK.placeNewTodoItem(KFK.APP.inputMsg);
              });
          KFK.APP.inputMsg = "";
        }
      }
    } else if (KFK.inputFor === "chat") {
      //new chat window new chat dialog show chat
      if (KFK.APP.inputMsg.trim().length > 0) {
        await KFK.ISayChatItem(KFK.APP.inputMsg);
      }
    }
  }
};

KFK.saveDIVPosition = async (key, x, y, w, h) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      x: x,
      y: y,
      w: w,
      h: h,
    })
  );
};
KFK.saveVideoRoomPosition = async (x, y, w, h) => {
  localStorage.setItem(
    "cocovideoroom",
    JSON.stringify({
      x: x,
      y: y,
      w: w,
      h: h,
    })
  );
};

KFK.loadDIVPositon = async (key, selector) => {
  let tmp = localStorage.getItem(key);
  if (IsSet(tmp)) {
    let cocoChatPos = JSON.parse(tmp);
    $(selector).css({
      left: cocoChatPos.x,
      top: cocoChatPos.y,
      width: cocoChatPos.w,
      height: cocoChatPos.h,
    });
  }
};

KFK.toggleInputFor = function(inputFor) {
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

KFK.beginChatMode = async function() {
  KFK.toggleInputFor("chat");
  KFK.APP.inputMsg = "";
  await KFK.showMsgInputDlg();
};

KFK.setChatItemEventHandler = function(theItem) {
  theItem.on("click", function(evt) {
    evt.stopPropagation();
    KFK.hoveredChatItem = $(this);
    let x = KFK.scrXToJc1X(evt.clientX) + 30;
    let y = KFK.scrYToJc1Y(evt.clientY) + 5;
    $("#chatitem_option").css("left", KFK.px(x));
    $("#chatitem_option").css("top", KFK.px(y));
    KFK.show($("#chatitem_option"));
    KFK.selectedChatItem = $(this);
  });
  theItem.on("mouseover", function() {
    KFK.hoveredChatItem = $(this);
  });
};

KFK.addChatMsgToTodo = async () => {
  await KFK.addTodoItem(KFK.selectedChatItem.text());
  KFK.hide($(".clickOuterToHide"));
};

KFK.closeTodoOption = function() {
  KFK.hide($("#todo_option"));
};

KFK.addTodoItem = async function(label) {
  let todo_list = $("#coco_todo_list.original");
  let newItem = $(
    "<div class='todo_item' prg='0' id='" +
      KFK.myuid() +
      "'><div class='todolabel'>" +
      label +
      "</div><div class='prg'></div></div>"
  );
  newItem.prependTo(todo_list);
  KFK.setTodoItemEventHandler
    ? KFK.setTodoItemEventHandler($("#coco_todo"))
    : import("./todo").then((pack) => {
        KFK.setTodoItemEventHandler = pack.Todo.setTodoItemEventHandler;
        KFK.setTodoItemEventHandler($("#coco_todo"));
      });

  //todo 节点的update不做undo/redo记录，所以，只需要传递最新节点数据
  await KFK.syncNodePut("U", $("#coco_todo"), "todo", undefined, false, 0, 1);

  KFK.APP.inputMsg = "";
};

KFK.hideChat = () => {
  $("#coco_chat").addClass("noshow");
};
KFK.showChat = async () => {
  if ($("#coco_chat").hasClass("noshow")) {
    KFK.firstShown["chat"] = true;
    $("#coco_chat").removeClass("noshow");
    $(".chat_reddot").addClass("noshow");
    await KFK.loadDIVPositon("coco_chat_pos", "#coco_chat");
    KFK.beginChatMode();
    KFK.toggleInputFor("chat");
  } else {
    $("#coco_chat").addClass("noshow");
  }
};

KFK.gotoTodo = () => {
  $(".todolist").removeClass("noshow");
  KFK.scrollToNodeById("coco_todo");
};
KFK.showTodo = () => {
  KFK.todoShown = true;
  $(".todolist").removeClass("noshow");
  KFK.scrollToNodeById("coco_todo");
  KFK.toggleInputFor("todo");
  KFK.beginTodoMode();
};

KFK.ISayChatItem = async function(msg) {
  KFK.appendChatItem(
    msg,
    KFK.APP.model.cocouser.avatar,
    KFK.APP.model.cocouser.name,
    "me"
  );
  if ($("#coco_chat").hasClass("noshow")) {
    await KFK.showChat();
  }
  //chat 节点的update不做undo/redo记录，所以，只需要传递最新节点数据
  await KFK.sendCmd("CHAT", {
    msg: msg,
  });
  KFK.APP.inputMsg = "";
};

KFK.appendChatItem = async function(msg, avatar, name, who) {
  if (KFK.firstShown["chat"] === false) {
    await KFK.showChat();
  }
  if ($("#coco_chat").hasClass("noshow")) {
    $(".chat_reddot").removeClass("noshow");
  }
  $(".chat_icon").addClass("jelloOnce");
  setTimeout(() => {
    $(".chat_icon").removeClass("jelloOnce");
  }, 3000);
  let chat_list = $("#coco_chat_list.original");

  let avatarSrc = KFK.avatars[avatar]
    ? KFK.avatars[avatar].src
    : KFK.avatars["avatar-0"].src;
  let html = "<div class='chat_item " + who + "'>";
  if (who !== "me") {
    html +=
      "<img class='chatavatar' src='" +
      avatarSrc +
      "'/>" +
      "<div class='chatbody'><div class='chatname'>" +
      name +
      "</div>" +
      "<div class='chatmsg'>" +
      msg +
      "</div>" +
      "</div>";
  } else {
    html +=
      "<div class='chatmsg'>" +
      msg +
      "</div>" +
      "<img class='chatavatar' src='" +
      avatarSrc +
      "'/>";
  }
  html += "</div>";
  let newItem = $(html);
  newItem.appendTo(chat_list);
  KFK.setChatItemEventHandler(newItem);
  chat_list.scrollTop(chat_list[0].scrollHeight);
};

KFK.moveTodoByProgress = async function(progress) {
  KFK.hide($("#todo_option"));
  let fromDIVId = KFK.getTodoDivIdByItem(KFK.hoveredTodo);
  let fromDIV = $("#" + fromDIVId);
  if (NotSet(fromDIV)) {
    KFK.printCallStack("fromDIV should not be undefined");
    return;
  }
  if (progress === 100) {
    if (fromDIVId !== "coco_done") {
      await KFK.moveTodoItemTo("#coco_done", progress);
      await KFK.syncNodePut(
        "U",
        $("#coco_done"),
        "todo",
        undefined,
        false,
        0,
        1
      );
      await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
    }
  } else if (progress === 0) {
    if (fromDIVId !== "coco_todo") {
      await KFK.moveTodoItemTo("#coco_todo", progress);
      await KFK.syncNodePut(
        "U",
        $("#coco_todo"),
        "todo",
        undefined,
        false,
        0,
        1
      );
      await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
    }
  } else {
    if (fromDIVId !== "coco_inprogress") {
      await KFK.moveTodoItemTo("#coco_inprogress", progress);
      await KFK.syncNodePut(
        "U",
        $("#coco_inprogress"),
        "todo",
        undefined,
        false,
        0,
        1
      );
      await KFK.syncNodePut("U", fromDIV, "todo", undefined, false, 0, 1);
    } else {
      KFK.hoveredTodo.attr("prg", progress);
      await KFK.syncNodePut(
        "U",
        $("#coco_inprogress"),
        "todo",
        undefined,
        false,
        0,
        1
      );
    }
  }
};

KFK.moveTodoItemTo = async function(todoListName, progress) {
  if (NotSet(KFK.hoveredTodo)) {
    return;
  }
  let jqCocoTodo = $("#coco_todo");
  let jqCocoInProgress = $("#coco_inprogress");
  let jqCocoDone = $("#coco_done");
  let jqMoveTo = undefined;
  if (todoListName === "#coco_inprogress") {
    if (jqCocoInProgress.length < 1) {
      jqCocoInProgress = await KFK.placeNode(
        false,
        "coco_inprogress",
        "textblock",
        "default",
        KFK.divCenter(jqCocoTodo) + KFK.divWidth(jqCocoTodo) + 40,
        KFK.divMiddle(jqCocoTodo),
        KFK.divWidth(jqCocoTodo),
        KFK.divHeight(jqCocoTodo),
        "<div id='coco_inprogress_title' class='coco_title'>进行中</div>" +
          "<div id='coco_inprogress_list' class='coco_list original'>" +
          "</div>",
        ""
      );
      jqCocoInProgress.attr("tabIndex", 1);
      jqCocoInProgress.addClass("todolist noedit");
      jqCocoInProgress.find(".innerobj").css({
        "justify-content": "flex-start",
        "align-items": "flex-start",
      });
      // KFK.scrollToNodeById('coco_inprogress');
    }
    jqMoveTo = $("#coco_inprogress_list.original");
    KFK.hoveredTodo.detach().prependTo(jqMoveTo);
  } else if (todoListName === "#coco_done") {
    //如果目的地是 done
    //先看看 done div是否存在
    if (jqCocoDone.length < 1) {
      let x = (y = w = h = 0);
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
        x =
          KFK.divCenter(jqCocoInProgress) + KFK.divWidth(jqCocoInProgress) + 40;
        y = KFK.divMiddle(jqCocoInProgress);
        w = KFK.divWidth(jqCocoInProgress);
        h = KFK.divHeight(jqCocoInProgress);
      }

      jqCocoDone = await KFK.placeNode(
        false,
        "coco_done",
        "textblock",
        "default",
        x,
        y,
        w,
        h,
        "<div id='coco_done_title' class='coco_title'>已完成</div>" +
          "<div id='coco_done_list' class='coco_list original'>" +
          "</div>",
        ""
      );
      //标记为nocopy则，不会被拷贝
      jqCocoDone.addClass("todolist noedit");
      //缺省的对齐方式是居中，这里换成居左居上
      jqCocoDone.find(".innerobj").css({
        "justify-content": "flex-start",
        "align-items": "flex-start",
      });
      //创建完成，滚动过去
      // KFK.scrollToNodeById('coco_done');
    }
    //找到内部的列表
    jqMoveTo = $("#coco_done_list.original");
    //把要运动的todoitem放到新的list中
    KFK.hoveredTodo.detach().prependTo(jqMoveTo);
  } else if (todoListName === "#coco_todo") {
    jqMoveTo = $("#coco_todo_list.original");
    KFK.hoveredTodo.detach().prependTo(jqMoveTo);
  }
  //设置prg属性的值，css会根据这个值来显示进度条
  KFK.hoveredTodo.attr("prg", progress);
};

KFK.cancelTempLine = function() {
  if (KFK.lineTemping) {
    KFK.lineTemping = false;
    if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
    KFK.linkPosNode.clear();
    KFK.drawPoints.clear();
  }
};

KFK.ZiToTop = function() {
  let curJQ = KFK.getPropertyApplyToJqNode();
  if (curJQ === null) return;
  if (KFK.isKfkNode(curJQ) === false) return;
  let myZI = KFK.getZIndex(curJQ);
  let count = 0;
  let zIndexChanger = {
    doc_id: KFK.APP.model.cocodoc.doc_id,
    ZI: {},
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

KFK.ZiToBottom = function() {
  let curJQ = KFK.getPropertyApplyToJqNode();
  if (curJQ === null) return;
  if (KFK.isKfkNode(curJQ) === false) return;

  let myZI = KFK.getZIndex(curJQ);
  let count = 0;
  let zIndexChanger = {
    doc_id: KFK.APP.model.cocodoc.doc_id,
    ZI: {},
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
KFK.ZiToHigher = function() {
  let curJQ = KFK.getPropertyApplyToJqNode();
  if (curJQ === null) return;
  if (KFK.isKfkNode(curJQ) === false) return;
  let myZI = KFK.getZIndex(curJQ);
  let count = 0;
  let allnodes = KFK.JC3.find(".kfknode");
  let zIndexChanger = {
    doc_id: KFK.APP.model.cocodoc.doc_id,
    ZI: {},
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

KFK.ZiToLower = function() {
  let curJQ = KFK.getPropertyApplyToJqNode();
  if (curJQ === null) return;
  if (KFK.isKfkNode(curJQ) === false) return;
  let zIndexChanger = {
    doc_id: KFK.APP.model.cocodoc.doc_id,
    ZI: {},
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

KFK.tryToLockUnlock = function(shiftKey) {
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
};
/**
 * 切换右侧属性框
 * @param flag   true: 总是打开， false: 切换
 * @param tab    显示第几个页面， 如果有值，flag按true1处理
 */
KFK.toggleRightPanel = function(tab = -1, flag = false) {
  if (KFK.APP.model.cocodoc.readonly) {
    return;
  }
  if (flag === false) {
    if ($("#right").hasClass("noshow")) {
      KFK.show($("#right"));
      KFK.APP.model.viewConfig.hideRight = false;
      KFK.saveLocalViewConfig();
    } else {
      KFK.hide($("#right"));
      KFK.APP.model.viewConfig.hideRight = true;
      KFK.saveLocalViewConfig();
    }
    return;
  } else {
    KFK.show($("#right"));
    KFK.APP.model.viewConfig.hideRight = false;
    KFK.saveLocalViewConfig();
  }
  if (tab < 0) {
    let tabstr = localStorage.getItem("righttabindex");
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
  localStorage.setItem("righttabindex", tab);
};

KFK.toggleFullScreen = function(evt) {
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

KFK.toggleTopAndLeftOnly = async function(evt) {
  if (KFK.APP.model.cocodoc.readonly) {
    return;
  }
  if (NotSet(KFK.topAndLeftOnly)) KFK.topAndLeftOnly = false;
  KFK.topAndLeftOnly = !KFK.topAndLeftOnly;
  await KFK.showSection({
    minimap: !KFK.topAndLeftOnly,
  });
  //左侧和右侧的工具栏，可进行切换
  if (KFK.topAndLeftOnly) {
    KFK.hide("#left");
    KFK.hide("#right");
  } else {
    KFK.show("#left");
    KFK.show("#right");
  }
  KFK.APP.setData("show", "actionlog", false);
  KFK.keypool = "";
};

KFK.toggleControlButtonOnly = async function(evt) {
  KFK.controlButtonsOnly = !KFK.controlButtonsOnly;
  if (KFK.APP.model.cocodoc.readonly) {
    //文档锁定时，依然可以对minimap切换显示与否
    await KFK.showSection({
      minimap: !KFK.controlButtonsOnly,
    });
    return;
  }
  KFK.APP.setData("show", "actionlog", false);
  //切换minimap
  await KFK.showSection({
    minimap: !KFK.controlButtonsOnly,
  });
  if (KFK.controlButtonsOnly) {
    KFK.hide("#left");
    KFK.hide("#right");
    KFK.hide("#docHeaderInfo");
    KFK.hide("#toplogo");
    KFK.hideDIVsWithStatus([".msgInputWindow", "#coco_chat"]);
  } else {
    KFK.show("#left");
    KFK.show("#right");
    KFK.show("#docHeaderInfo");
    KFK.show("#toplogo");
    KFK.restoreDIVsWithStatus([".msgInputWindow", "#coco_chat"]);
  }
  KFK.keypool = "";
  //add a mask layer
};

KFK.toggleNoControls = async function(evt) {
  KFK.controlNoControl = !KFK.controlNoControl;
  KFK.APP.setData("show", "actionlog", false);
  //切换minimap
  await KFK.showSection({
    minimap: false,
  });
  if (KFK.controlNoControl) {
    KFK.hide("#left");
    KFK.hide("#right");
    KFK.hide("#docHeaderInfo");
    KFK.hide("#toplogo");
    KFK.hide("#rtcontrol");
    KFK.hideDIVsWithStatus([".msgInputWindow", "#coco_chat"]);
  } else {
    KFK.show("#left");
    KFK.show("#right");
    KFK.show("#docHeaderInfo");
    KFK.show("#toplogo");
    KFK.show("#rtcontrol");
    KFK.restoreDIVsWithStatus([".msgInputWindow", "#coco_chat"]);
  }
  KFK.keypool = "";
  //add a mask layer
};
KFK.toggleNoDocHeader = async function(evt) {
  KFK.noDocHeader = !KFK.noDocHeader;
  if (KFK.APP.model.cocodoc.readonly) {
    //文档锁定时，依然可以对minimap切换显示与否
    await KFK.showSection({
      minimap: !KFK.controlButtonsOnly,
    });
    return;
  }
  KFK.APP.setData("show", "actionlog", false);
  //切换minimap
  await KFK.showSection({
    minimap: !KFK.noDocHeader,
  });
  if (KFK.noDocHeader) {
    KFK.hide("#docHeaderInfo");
    KFK.hide("#toplogo");
    KFK.hideDIVsWithStatus([".msgInputWindow", "#coco_chat"]);
  } else {
    KFK.show("#docHeaderInfo");
    KFK.show("#toplogo");
    KFK.restoreDIVsWithStatus([".msgInputWindow", "#coco_chat"]);
  }
  KFK.keypool = "";
  //add a mask layer
};
KFK.showHidePanel = function(flag) {
  if (
    flag === true &&
    KFK.inFullScreenMode === false &&
    KFK.controlButtonsOnly === false
  ) {
    KFK.show("#left");
    KFK.show("#right");
  } else {
    KFK.hide("#left");
    KFK.hide("#right");
  }
};

KFK.getAclOwnerDescription = function(doc) {
  if (doc.acl === "S") {
    return doc.ownerName;
  } else if (doc.acl === "O") {
    return doc.orgName;
  } else if (doc.acl === "P") {
    return "公共";
  }
};

KFK.iAmOwner = function(doc) {
  return doc.owner === KFK.APP.model.cocouser.userid;
};

KFK.getAclAccessable = function(doc) {
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

KFK.showNotAclAccessable = function(doc) {
  KFK.scrLog(KFK.AclDeniedReason);
};

KFK.gotoExplorer = async function() {
  if (KFK.APP.model.cocoprj.name === "") {
    KFK.setAppData("model", "cocoprj", {
      prjid: "all",
      name: "我最近使用过的白板",
    });
  }
  KFK.cancelAlreadySelected();
  KFK.closeTool();
  if (!KFK.isEditting && KFK.mode !== "line") KFK.setMode("pointer");
  KFK.cancelTempLine();
  KFK.setMode("pointer");
  KFK.hidePickerMatlib();
  //不用每次gotoExplorer都refreshProjectList, 因为refreshProjectList要跟服务器刷新数据
  //仅仅是切换explorer或者designer视图，没必要拉取数据
  //只在首次切换到explorer时，拉取数据。
  //其他时候，在creaeproject等操作的地方，会调用refreshProjectList重新拉取数据，在那时，Projects发生了变化，重新拉取是有必要的。
  if (KFK.explorerRefreshed === false) {
    console.log("refereshProjectList in gotoExplorer");
    KFK.refreshProjectList();
  }
  KFK.currentView = "explorer";
  await KFK.showSection({
    explorer: true,
    designer: false,
  });
  let lastLeftTabIndex = sessionStorage.getItem("leftTabIndex");
  if (IsSet(lastLeftTabIndex)) {
    lastLeftTabIndex = parseInt(lastLeftTabIndex);
  } else {
    lastLeftTabIndex = 1; //如果是第一次，进入“我的白板”
  }
  console.log("lastLeftTabIndex", lastLeftTabIndex);
  KFK.showForm({
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
    share: false,
    //lastLeftTabIndex 记录着用户所选的左侧哪个TAB， 再次gotoExplorer时，切换过去
    explorerTabIndex: lastLeftTabIndex,
  });
  $("#overallbackground").addClass("grid1");
  KFK.sendCmd("SETWSSEC", {
    section: "EXPLORER",
  });
};

KFK.gotoDesigner = async function() {
  await KFK.showSection({
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
  KFK.currentView = "designer";
  KFK.focusOnC3();
  $("#overallbackground").removeClass("grid1");
  KFK.sendCmd("SETWSSEC", {
    section: "DESIGNER",
  });
};

KFK.dataURLtoFile = function(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime,
  });
};

KFK.save = async function() {
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

KFK.checkUrl = function(str_url) {
  let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  return str.match(regex) !== null;
};

KFK.replaceHTMLTarget = function(html) {
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
KFK.pasteContent = function() {
  let paste = KFK.APP.model.paste;
};

KFK.showTextPasteDialog = async function(content) {
  if (KFK.anyLocked(KFK.hoverJqDiv())) return;
  let toDisplay = content.text;
  let urlInHTML = null;
  let toAdd = content.text;
  let showbox = false;
  if (content.html !== "") {
    let tmpText = RegHelper.removeMeta(content.html);
    tmpText = KFK.replaceHTMLTarget(tmpText);
    let m = tmpText.match(/^\s*<a\s+href\s*=\s*"([^"]*)".*<\/a>$/i);
    if (m) {
      urlInHTML = m[1];
    }
    toAdd = "<div>" + tmpText + "</div>";
    let tmp = $(toAdd);
    tmp.find("[style]").removeAttr("style");
    toAdd = "<div class='pastedHtml'>" + tmp.prop("innerHTML") + "</div>";
    showbox = KFK.hoverJqDiv() ? false : true;
    if (showbox) {
      if (urlInHTML) {
        await KFK.mergeAppData("model", "paste", {
          format: "粘贴内容格式为URL地址链接",
          showcontent: true,
          showdisplay: true,
          showbox: showbox,
          content: urlInHTML,
          display: urlInHTML,
          ctype: "url",
        });
      } else {
        await KFK.mergeAppData("model", "paste", {
          format: "粘贴内容格式为HTML",
          showcontent: false,
          showdisplay: false,
          showbox: showbox,
          content: toAdd,
          displayBackup: toDisplay,
          convertHTMLToText: false,
          display: toDisplay,
          ctype: "html",
        });
      }
      KFK.showDialog({
        pasteContentDialog: true,
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
          format: "粘贴内容格式为URL地址链接",
          showcontent: true,
          showdisplay: true,
          showbox: showbox,
          content: toAdd,
          display: "请点击访问",
          ctype: "url",
        });
        KFK.showDialog({
          pasteContentDialog: true,
        });
      } else {
        //Normal plain text
        showbox = KFK.hoverJqDiv() ? false : true;
        if (showbox) {
          await KFK.mergeAppData("model", "paste", {
            format: "粘贴内容格式为纯文本",
            showcontent: false,
            showdisplay: false,
            showbox: showbox,
            content: toAdd,
            display: toAdd,
            ctype: "text",
          });
          KFK.showDialog({
            pasteContentDialog: true,
          });
        } else {
          KFK.APP.model.paste.content = toAdd;
          KFK.placePastedContent();
        }
      }
    }
  }
};

KFK.placePastedContent = async function() {
  let toAdd = KFK.APP.model.paste.content;
  console.log("toAdd ", toAdd.length);
  let display = KFK.APP.model.paste.display;
  let ctype = KFK.APP.model.paste.ctype;
  let innerLink = null;
  let contentLength = 0;
  if (ctype === "url") {
    let theUrl = toAdd;
    toAdd = `<a href="${toAdd}" target="_blank">${display}</a>`;
    contentLength = display.length;
    try {
      let m = theUrl.match(/(http|https):\/\/([^\/]*)\/(\??)(.*)/);
      if (
        m[2].indexOf("localhost") >= 0 ||
        m[2].indexOf("colobod.com") >= 0 ||
        m[2].indexOf("weteam.work") >= 0 ||
        m[2].indexOf("meetintune.com") >= 0 ||
        m[2].indexOf("liuzijin.com") >= 0
      ) {
        innerLink = m[4];
      }
    } catch (error) {
      console.log(error);
    }
  } else if (
    ctype === "html" &&
    KFK.APP.model.paste.convertHTMLToText === true
  ) {
    let tmp = $(toAdd);
    toAdd = tmp.text();
    contentLength = toAdd.length;
  } else {
    let tmp = $(toAdd);
    contentLength = tmp.text().length;
  }
  //paste image or paste text
  let hoveredJQ = KFK.hoverJqDiv();
  //TODO， chat 的标志是nocopy，
  if (hoveredJQ && hoveredJQ.hasClass("noedit") === false) {
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
    let width = undefined;
    let height = undefined;
    //估算所需的文本框大小, 不会精确，用户需要继续手工调整
    if (contentLength > 100) {
      width = (contentLength / 6) * 18;
      height = width * 0.6;
    }
    let jBox = await KFK.placeNode(
      false, //shiftKey
      KFK.myuid(),
      "textblock",
      "default",
      KFK.scalePoint(KFK.scrXToJc3X(KFK.pasteAt.x)),
      KFK.scalePoint(KFK.scrYToJc3Y(KFK.pasteAt.y)),
      width,
      height,
      toAdd,
      ""
    );
    if (ctype === "url") jBox.addClass("noedit");
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
    //如果这个一个innerLink, 添加属性innerlink
    //然后在click node的时候，再检查是否有innerlink属性，如果有，那么
    //对event添加preventDefault(), 并根据innerlink打开文档
    if (innerLink !== null) {
      jBox.attr("innerlink", innerLink);
    }
    jBox.attr("creator", KFK.APP.model.cocouser.userid);
    await KFK.syncNodePut("C", jBox, "create text node", null, false, 0, 1);
  }
};

KFK.onCut = async function(evt) {
  if (KFK.isShowingModal) return;
  console.log("capture onCut");
  KFK.deleteObjects(evt, true);
};

KFK.onCopy = async function(evt) {
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

KFK.onPaste = async function(evt) {
  if (KFK.isShowingModal) return;
  if (KFK.inDesigner() === false) return;
  if (KFK.noCopyPaste) return;
  if (KFK.docIsReadOnly()) return;
  KFK.pasteAt = {
    x: KFK.globalMouseX,
    y: KFK.globalMouseY,
  };
  let content = {
    html: "",
    text: "",
    image: null,
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

KFK.addEditorToNode = function(jqNode, editor) {
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

KFK.getNodeEditors = function(jqNode) {
  let editors = jqNode.attr("editors");
  if (editors === undefined || editors === null || editors === "") {
    return [];
  }
  let editorsArr = editors.split("$$");
  return editorsArr;
};

KFK.changeSVGFill = function() {};
KFK.scrCenter = function() {
  return {
    x: $(window).width() * 0.5,
    y: $(window).height() * 0.5,
  };
};
KFK.showCenterIndicator = function(cx, cy) {
  let center = KFK.scrCenter();
  let centerX = cx ? cx : center.x;
  let centerY = cy ? cy : center.y;
  $("#centerpoint").css("left", centerX - 10);
  $("#centerpoint").css("top", centerY - 10);
};
KFK.gotoFirstPage = function() {
  KFK.currentPage = 0;
  KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoNextPage = function() {
  if (KFK.currentPage < KFK.pageBounding.Pages.length - 1) {
    KFK.currentPage++;
    KFK.___gotoPage(KFK.currentPage);
  } else {
    KFK.scrLog("这已经在最后一页了", 1000);
  }
};
KFK.gotoPrevPage = function() {
  if (KFK.currentPage > 0) {
    KFK.currentPage--;
    KFK.___gotoPage(KFK.currentPage);
  } else {
    KFK.scrLog("这已经在第一页了", 1000);
  }
};
KFK.gotoLastPage = function() {
  KFK.currentPage = KFK.pageBounding.Pages.length - 1;
  KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoAnyPage = function(pageIndex) {
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
KFK.gotoUpperPage = function() {
  let pidx = KFK.currentPage - KFK.PageNumberHori;
  if (pidx < 0) {
    KFK.scrLog("已经在最顶部了", 1000);
    return;
  }
  KFK.currentPage = pidx;
  KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoLowerPage = function() {
  let pidx = KFK.currentPage + KFK.PageNumberHori;
  if (pidx > KFK.pageBounding.Pages.length - 1) {
    KFK.scrLog("已经在最底部了", 1000);
    return;
  }
  KFK.currentPage = pidx;
  KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoLeftPage = function() {
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
KFK.gotoRightPage = function() {
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
KFK.___gotoPage = function(pageIndex) {
  let pos = {
    x: KFK.pageBounding.Pages[pageIndex].left + KFK.PageWidth * 0.5,
    y: KFK.pageBounding.Pages[pageIndex].top + KFK.PageHeight * 0.5,
  };

  KFK.lastPosition = { x: KFK.JS1.scrollLeft(), y: KFK.JS1.scrollTop() };
  let scrollX = pos.x * KFK.scaleRatio + KFK.LeftB - $(window).width() * 0.5;
  let scrollY = pos.y * KFK.scaleRatio + KFK.TopB - $(window).height() * 0.5;
  KFK.scrollToPos({
    x: scrollX,
    y: scrollY,
  });
};

KFK.startPresentation = async function() {
  if (KFK.inOverviewMode) return;
  KFK.hideDIVsWithStatus([".msgInputWindow", "#coco_chat", "#system_message"]);
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
  KFK.rememberGrid = cbkg.hasClass("grid1")
    ? "grid1"
    : cbkg.hasClass("grid2")
    ? "grid2"
    : "";
  if (KFK.rememberGrid !== "") cbkg.removeClass(KFK.rememberGrid);
  // KFK.rememberOverallBackgroundColor = $('#overallbackground').css('background-color');
  // $('#overallbackground').css('background-color', 'black');
  KFK.scrLog("进入演示模式: 输入pr退出");
  KFK.inPresentingMode = true;
  KFK.___presentPage(KFK.currentPage);
};
KFK.endPresentation = function() {
  if (KFK.inOverviewMode) return;
  KFK.restoreDIVsWithStatus([
    ".msgInputWindow",
    "#coco_chat",
    "#system_message",
  ]);
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
  setTimeout(function() {
    KFK.JC3.css("transform", `scale(1, 1) translate(0px, 0px)`);
  }, 100);
};

KFK.presentNoneMask = function() {
  KFK.presentMaskMode = false;
  $(".present-mask").removeClass("white-mask");
  $(".present-mask").removeClass("black-mask");
  $(".present-mask").addClass("nodisplay");
};
KFK.presentBlackMask = function() {
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
KFK.presentWhiteMask = function() {
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
KFK.presentFirstPage = function() {
  KFK.currentPage = 0;
  KFK.___presentPage(KFK.currentPage);
};
KFK.presentNextPage = function() {
  if (KFK.currentPage < KFK.pageBounding.Pages.length - 1) {
    KFK.currentPage++;
    KFK.___presentPage(KFK.currentPage);
  } else {
    KFK.scrLog("这是在最后一页了", 1000);
  }
};
KFK.presentPrevPage = function() {
  if (KFK.currentPage > 0) {
    KFK.currentPage--;
    KFK.___presentPage(KFK.currentPage);
  } else {
    KFK.scrLog("这已经在第一页了", 1000);
  }
};
KFK.presentLastPage = function() {
  KFK.currentPage = KFK.pageBounding.Pages.length - 1;
  KFK.___presentPage(KFK.currentPage);
};
KFK.presentAnyPage = function(pageIndex) {
  if (pageIndex >= 0 && pageIndex < KFK.pageBounding.Pages.length) {
    KFK.currentPage = pageIndex;
    KFK.___presentPage(KFK.currentPage);
  } else if (pageIndex >= KFK.pageBounding.Page.length) {
    KFK.currentPage = KFK.pageBounding.Pages.length - 1;
    KFK.___presentPage(KFK.currentPage);
  }
};
KFK.presentLeftPage = function() {
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
KFK.presentRightPage = function() {
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

KFK.presentUpperPage = function() {
  let pidx = KFK.currentPage - KFK.PageNumberHori;
  if (pidx < 0) {
    KFK.scrLog("已经在最顶部了", 1000);
    return;
  }
  KFK.currentPage = pidx;
  KFK.___presentPage(KFK.currentPage);
};
KFK.presentLowerPage = function() {
  let pidx = KFK.currentPage + KFK.PageNumberHori;
  if (pidx > KFK.pageBounding.Pages.length - 1) {
    KFK.scrLog("已经在最底部了", 1000);
    return;
  }
  KFK.currentPage = pidx;
  KFK.___presentPage(KFK.currentPage);
};
KFK.___presentPage = function(pageIndex) {
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

KFK.___unsetSlideMask = function(page) {
  $(".slidemask").remove();
};
KFK.___setSlideMask = function(pageIndex) {
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

KFK.toggleOverview = function(jc3MousePos) {
  if (KFK.inPresentingMode) return;
  let main = $("#C1");
  let scroller = $("#S1");
  let scrCenter = KFK.scrCenter();
  let window_width = scrCenter.x * 2;
  let window_height = scrCenter.y * 2;
  KFK.APP.setData("show", "actionlog", false);
  if (KFK.inOverviewMode === true) {
    KFK.scrLog("");
    KFK.restoreDIVsWithStatus([
      ".msgInputWindow",
      "#coco_chat",
      "#system_message",
    ]);

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
    KFK.hideDIVsWithStatus([
      ".msgInputWindow",
      "#coco_chat",
      "#system_message",
    ]);
    $("#lineExpand").addClass("noshow");
    let cbkg = $("#containerbkg");
    KFK.rememberGrid = cbkg.hasClass("grid1")
      ? "grid1"
      : cbkg.hasClass("grid2")
      ? "grid2"
      : "";
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
    setTimeout(function() {
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
  if (KFK.inDesigner() === false || KFK.inOverviewMode || KFK.inPresentingMode)
    return;
  let scrCenterPoint = KFK.scrCenter();
  let jC3CenterOn = {
    x: KFK.scalePoint(KFK.scrXToJc3X(scrCenterPoint.x)),
    y: KFK.scalePoint(KFK.scrYToJc3Y(scrCenterPoint.y)),
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
    y: tmpy,
  });
};

KFK.maskScreen = function() {
  let mask = document.createElement("div");
  let jmask = $(mask);
  jmask.width(KFK._width);
  jmask.height(KFK._height);
  jmask.addClass("mask");
  // jmask.appendTo(KFK.JC3);
  KFK.C3.appendChild(mask);
};
KFK.unmaskScreen = function() {
  KFK.JC3.find(".mask").remove();
};

KFK.printCallStack = function(msg = "") {
  KFK.info(new Error(msg).stack);
};

KFK.closeActionLog = function() {
  KFK.APP.setData("show", "actionlog", false);
};

KFK.showActionLog = function() {
  if (!KFK.APP.show.actionlog) {
    KFK.getActionLog();
  }
  KFK.APP.setData("show", "actionlog", !KFK.APP.show.actionlog);
};

KFK.getActionLog = function() {
  KFK.sendCmd("GETBLKOPS", {
    doc_id: KFK.APP.model.cocodoc.doc_id,
  });
};

KFK.navActionLog = function(item, direction) {
  if (item.logs.length === 0) {
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

KFK.actionLogFirst = function() {
  if (KFK.actionLogToView.actionlog.length > 0) {
    KFK.actionLogToViewIndex = 0;
    KFK.actionLogGoto(KFK.actionLogToViewIndex);
  }
};
KFK.actionLogLast = function() {
  if (KFK.actionLogToView.actionlog.length > 0) {
    KFK.actionLogToViewIndex = KFK.actionLogToView.actionlog.length - 1;
    KFK.actionLogGoto(KFK.actionLogToViewIndex);
  }
};
//滚动到某个对象上,并把这个对象放在屏幕中央
KFK.scrollToNodeById = function(nodeid) {
  let jqDIV = $(`#${nodeid}`);
  if (jqDIV.length <= 0) {
    KFK.warn("node ", nodeid, "not found");
    return;
  }
  jqDIV = jqDIV.first();
  KFK.scrollToNode(jqDIV, true);
};

/**
 * 滚动到一个DIV， DIV位于屏幕中心
 */
KFK.scrollToNode = (jqDIV, nolog = false) => {
  let top = KFK.divTop(jqDIV);
  let left = KFK.divLeft(jqDIV);
  let width = KFK.divWidth(jqDIV);
  let height = KFK.divHeight(jqDIV);
  let pos = {
    x: left + width * 0.5,
    y: top + height * 0.5,
  };

  KFK.lastPosition = { x: KFK.JS1.scrollLeft(), y: KFK.JS1.scrollTop() };
  let scrollX = pos.x * KFK.scaleRatio + KFK.LeftB - $(window).width() * 0.5;
  let scrollY = pos.y * KFK.scaleRatio + KFK.TopB - $(window).height() * 0.5;
  KFK.scrollToPos({
    x: scrollX,
    y: scrollY,
  });

  if (nolog === false) {
    if (KFK.lastActionLogJqDIV != null && KFK.lastActionLogJqDIV !== jqDIV)
      KFK.lastActionLogJqDIV.removeClass("shadow1");
    jqDIV.addClass("shadow1");
    KFK.lastActionLogJqDIV = jqDIV;
  }
};
/**
 * 滚动到一个Shape的位置，Shape位于屏幕中心
 */
KFK.scrollToShape = (aShape, nolog = false) => {
  let rect = KFK.getShapeRect(aShape);
  let pos = {
    x: rect.left + rect.width * 0.5,
    y: rect.top + rect.height * 0.5,
  };

  KFK.lastPosition = { x: KFK.JS1.scrollLeft(), y: KFK.JS1.scrollTop() };
  let scrollX = pos.x * KFK.scaleRatio + KFK.LeftB - $(window).width() * 0.5;
  let scrollY = pos.y * KFK.scaleRatio + KFK.TopB - $(window).height() * 0.5;
  KFK.scrollToPos({
    x: scrollX,
    y: scrollY,
  });

  if (nolog === false) {
    if (KFK.lastActionLogJqDIV != null && KFK.lastActionLogJqDIV !== jqDIV)
      KFK.lastActionLogJqDIV.removeClass("shadow1");
    jqDIV.addClass("shadow1");
    KFK.lastActionLogJqDIV = jqDIV;
  }
};

KFK.upgradeToStartAccount = function() {
  // KFK.toBeUpgradeDemoAccount = JSON.parse(
  //   JSON.stringify(KFK.APP.model.cocouser)
  // );
  KFK.gotoRegister();
};

KFK.isMyDoc = () => {
  return KFK.APP.model.cocouser.userid === KFK.APP.model.cocodoc.owner;
};

KFK.showCopyDocDialog = (doc) => {
  KFK.tobeCopyDoc = doc;
  KFK.APP.model.copydoc.copyToDocName = doc.name;
  KFK.APP.model.copydoc.showCopyOrMove =
    doc.owner === KFK.APP.model.cocouser.userid;
  KFK.showDialog({
    copyDocDialog: true,
  });
};

KFK.showSetAclDialog = (doc) => {
  KFK.showDialog({
    setAclDialog: true,
  });
};

KFK.showPublishDialog = (doc) => {
  KFK.APP.tobePublishDoc = doc;
  KFK.APP.model.publish.name = doc.name;
  KFK.showDialog({
    publishDialog: true,
  });
};

KFK.publishDoc = () => {
  if (KFK.APP.model.publish.priceForRead < 0) {
    KFK.APP.model.publish.priceForRead = 0;
  }
  if (
    KFK.APP.model.publish.allowCopy &&
    KFK.APP.model.publish.priceForCopy < 0
  ) {
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
  let newname = KFK.APP.model.copydoc.copyToDocName;
  if (Validator.validateDocName(newname)) {
    let payload = {
      fromDocId: KFK.tobeCopyDoc._id,
      toPrjId: KFK.APP.model.copydoc.copyToPrjId,
      toName: KFK.APP.model.copydoc.copyToDocName,
    };
    if (KFK.APP.model.copydoc.op === "rename") {
      payload.toPrjId = KFK.tobeCopyDoc.prjid;
      payload.copyOrMove = "move";
    } else if (KFK.APP.model.copydoc.op === "copy") {
      payload.copyOrMove = "copy";
    } else if (KFK.APP.model.copydoc.op === "move") {
      payload.copyOrMove = "move";
    }
    KFK.sendCmd("COPYDOC", payload);
    KFK.APP.state.copydoc.name = true;
  } else {
    KFK.scrLog("新文档名不符合要求");
    KFK.APP.state.copydoc.name = false;
  }
};

KFK.onLinkConnect = async function(data) {
  let selectorFrom = `#${response.from}`;
  let selectorTo = `#${response.to}`;
  let nodeFrom = $(selectorFrom);
  let nodeTo = $(selectorTo);
  if (nodeFrom.length > 0 && nodeTo.length > 0) {
    KFK.drawConnect(nodeFrom, nodeTo);
    KFK.buildConnectionBetween(nodeFrom, nodeTo);
  }
};

KFK.showSetProfileDialog = function() {
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
    setProfileDialog: true,
  });
};

KFK.setUserProfile = function(bvModalEvt) {
  bvModalEvt.preventDefault();
  KFK.handleProfileSubmit();
};

KFK.handleProfileSubmit = function() {
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
      setProfileDialog: false,
    });
  } else {
    KFK.scrLog("录入信息不符合要求");
    return;
  }
};

KFK.addSvgLayer = function() {
  KFK.svgDraw && delete KFK.svgDraw;
  KFK.svgDraw = SVG()
    .addTo("#C3")
    .size(KFK._width, KFK._height);
  KFK.svgDraw.attr("id", "D3");
  KFK.svgDraw.addClass("svgcanvas");
  KFK.debug("svg layer initialized");
  KFK.pageBounding = {
    Pages: [],
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
      tmpLine.addClass("noshow");
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
      tmpLine.addClass("noshow");
    }
  }
};

KFK.restoreShape = function(shape_id, html) {
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

KFK.makePath = function(p1, p2) {
  let rad = 10;
  let c1 = {
    x: p2.x - rad,
    y: p1.y,
  };
  let c2 = {
    x: p2.x,
    y: p1.y + rad,
  };

  let pStr = `M${p1.x} ${p1.y} H${c1.x} S${c2.x} ${c1.y} ${c2.x} ${c2.y} V${p2.y}`;
  return pStr;
};

KFK._svgDrawNodesConnect = function(
  fid,
  tid,
  lineClass,
  lineClassReverse,
  pstr,
  triangle
) {
  try {
    let theConnect = null;
    let fromDIV = $(`#${fid}`);
    let toDIV = $(`#${tid}`);
    let cnColor = fromDIV.attr("cncolor");
    let cnWidth = fromDIV.attr("cnwidth");
    let cnStyle = fromDIV.attr("cnstyle");
    let reverseLine = KFK.svgDraw.findOne(`.${lineClassReverse}`);
    let oldLine = KFK.svgDraw.findOne(`.${lineClass}`);
    let reverseTriangle = KFK.svgDraw.findOne(`.${lineClassReverse}_triangle`);
    let oldTriangle = KFK.svgDraw.findOne(`.${lineClass}_triangle`);
    if (oldLine) {
      oldLine.plot(pstr);
      oldTriangle && oldTriangle.plot(triangle);
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
          .attr("styleid", "style1")
          .fill("none")
          .stroke({
            width: cnWidth || KFK.config.connect.styles.style1.normal.width,
            color:
              cnColor ||
              KFK.YIQColorAux ||
              KFK.config.connect.styles.style1.normal.color,
          });
        if (cnStyle === "solid") {
          theConnect.css("stroke-dasharray", "");
        } else {
          theConnect.css("stroke-dasharray", `${cnWidth * 3} ${cnWidth}`);
        }
        KFK.svgDraw
          .polygon(triangle)
          .addClass(lineClass + "_triangle")
          .fill(cnColor);
        /*
        .stroke({
          width: KFK.APP.model.svg.connect.triangle.width,
          color: cnColor || KFK.APP.model.svg.connect.triangle.color,
        });
        */
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
      let styleid = theConnect.attr("styleid");
      theConnect.stroke({
        width: KFK.config.connect.styles[styleid].hover.width,
        color:
          KFK.YIQColorAux || KFK.config.connect.styles[styleid].hover.color,
      });
      KFK.hoveredConnectId = theConnect.attr("id");
      KFK.AI("hover_connect");
      KFK.onC3 = true;
    });
    theConnect.on("mouseout", () => {
      let styleid = theConnect.attr("styleid");
      theConnect.stroke({
        width: cnWidth || KFK.config.connect.styles[styleid].normal.width,
        color:
          cnColor ||
          KFK.YIQColorAux ||
          KFK.config.connect.styles[styleid].normal.color,
      });
      KFK.hoveredConnectId = null;
    });
  } catch (error) {
    console.error(error);
  }
};

KFK.lockLine = function(line, lock = true) {
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
    } catch (err) {}
  }
};

KFK.svgDrawShape = function(shapeType, id, fx, fy, tx, ty, option) {
  if (KFK.APP.model.viewConfig.snap) {
    let p1 = {
      x: fx,
      y: fy,
    };
    let p2 = {
      x: tx,
      y: ty,
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
  if (shapeType === "line") {
    theShape = KFK.svgDraw.line(fx, fy, tx, ty);
  } else if (shapeType === "rectangle") {
    theShape = KFK.svgDraw
      .rect(width, height)
      .fill("none")
      .move(originX, originY);
  } else if (shapeType === "ellipse") {
    theShape = KFK.svgDraw
      .ellipse(width, height)
      .fill("none")
      .move(originX, originY);
  }
  theShape.attr("id", shapeId);
  theShape
    .addClass(shapeClass)
    .addClass(shapeId)
    .addClass("kfk" + shapeType)
    .stroke(option);
  theShape.attr("shapetype", shapeType);
  theShape.attr("origin-width", option.width);
  theShape.attr("origin-color", option.color);
  KFK.addShapeEventListner(theShape);
  return theShape;
};

KFK.svgDrawPoly = function(shapeType, id, option) {
  let shapeClass = "kfkshape";
  let shapeId = "shape_" + id;
  let theShape = KFK.svgDraw.findOne(`.${shapeId}`);
  try {
    theShape.remove();
  } catch (error) {}

  let arr = [];
  for (let i = 0; i < KFK.drawPoints.length; i++) {
    arr.push([KFK.drawPoints[i].center.x, KFK.drawPoints[i].center.y]);
  }
  if (shapeType === "polyline")
    theShape = KFK.svgDraw
      .polyline(arr)
      .fill("none")
      .stroke(option);
  else
    theShape = KFK.svgDraw
      .polygon(arr)
      .fill("none")
      .stroke(option);

  theShape.attr("id", shapeId);
  theShape
    .addClass(shapeClass)
    .addClass(shapeId)
    .addClass("kfk" + shapeType)
    .stroke(option);
  theShape.attr("shapetype", shapeType);
  theShape.attr("origin-width", option.width);
  theShape.attr("origin-color", option.color);
  // KFK.addShapeEventListner(theShape);
  return theShape;
};

KFK.svgDrawTmpShape = function(shapeType, fx, fy, tx, ty, option) {
  let tmpLineClass = "shape_temp";

  KFK.tempShape = KFK.svgDraw.findOne(`.${tmpLineClass}`);
  if (KFK.tempShape) {
    KFK.tempShape.remove();
  }
  let width = Math.abs(fx - tx);
  let height = Math.abs(fy - ty);
  let originX = Math.min(fx, tx);
  let originY = Math.min(fy, ty);
  if (shapeType === "line") {
    KFK.tempShape = KFK.svgDraw
      .line(fx, fy, tx, ty)
      .addClass(tmpLineClass)
      .stroke(option);
  } else if (shapeType === "rectangle") {
    KFK.tempShape = KFK.svgDraw
      .rect(width, height)
      .move(originX, originY)
      .fill("none")
      .addClass(tmpLineClass)
      .stroke(option);
  } else if (shapeType === "ellipse") {
    KFK.tempShape = KFK.svgDraw
      .ellipse(width, height)
      .move(originX, originY)
      .fill("none")
      .addClass(tmpLineClass)
      .stroke(option);
  }
};

KFK.mouseNear = function(p1, p2, distance) {
  return (
    Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) <= distance
  );
};

KFK.moveDIVCenterToPos = function(jqDiv, pos) {
  jqDiv.css("left", pos.x - KFK.unpx(jqDiv.css("width")) * 0.5);
  jqDiv.css("top", pos.y - KFK.unpx(jqDiv.css("height")) * 0.5);
};
KFK.C3MousePos = function(evt) {
  return {
    x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
    y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
  };
};
KFK.ScreenMousePos = function(pos) {
  return {
    x: pos.x - KFK.scrollContainer.scrollLeft(),
    y: pos.y - KFK.scrollContainer.scrollTop(),
  };
};
KFK.hideLineTransformer = function() {
  KFK.hide($("#linetransformer"));
};
KFK.showLineTransformer = function() {
  KFK.show($("#linetransformer"));
};
KFK.reverseColor = function(color) {
  if (color[0] === "#") color = color.substr(1);
  return (
    "#" +
    (Number(`0x1${color}`) ^ 0xffffff)
      .toString(16)
      .substr(1)
      .toUpperCase()
  );
};
//shape event
KFK.addShapeEventListner = function(theShape) {
  //mouseover shape
  theShape.on("mouseover", (evt) => {
    if (KFK.shapeDragging || KFK.isFreeHandDrawing) return;
    KFK.hoverSvgLine(theShape);
    let color = theShape.attr("origin-color");
    KFK.shapeOriginColor = color;
    let color1 = KFK.reverseColor(color);
    KFK.onC3 = true;
    KFK.AI("hover_line");
    let originWidth = theShape.attr("origin-width");
    let newWidth = originWidth * 2 > 6 ? originWidth : 6;
    if (theShape.hasClass("selected") === false) {
      theShape.stroke({
        width: newWidth,
        color: color1,
      });
    }
    if (KFK.lineLocked(theShape)) {
      KFK.hide($("#linetransformer"));
      return;
    }

    $(document.body).css("cursor", "pointer");
    if (theShape.array && theShape.hasClass("kfkline")) {
      let parr = theShape.array();
      if (
        KFK.mouseNear(
          KFK.C3MousePos(evt),
          {
            x: parr[0][0],
            y: parr[0][1],
          },
          20
        )
      ) {
        KFK.show("#linetransformer");
        KFK.moveLinePoint = "from";
        KFK.lineToResize = theShape;
        KFK.AI("line_transformer");
        KFK.setShapeToRemember(theShape);
        KFK.moveLineMoverTo(
          KFK.jc3PosToJc1Pos({
            x: parr[0][0],
            y: parr[0][1],
          })
        );
      } else if (
        KFK.mouseNear(
          KFK.C3MousePos(evt),
          {
            x: parr[1][0],
            y: parr[1][1],
          },
          20
        )
      ) {
        KFK.show("#linetransformer");
        KFK.moveLinePoint = "to";
        KFK.lineToResize = theShape;
        KFK.AI("line_transformer");
        KFK.setShapeToRemember(theShape);
        KFK.moveLineMoverTo(
          KFK.jc3PosToJc1Pos({
            x: parr[1][0],
            y: parr[1][1],
          })
        );
      } else {
        KFK.hide("#linetransformer");
      }
    }
  });
  //mouseout shape
  theShape.on("mouseout", () => {
    if (KFK.shapeDragging === false) {
      KFK.hoverSvgLine(null);
      $(document.body).css("cursor", "default");
      if (theShape.hasClass("selected") === false) {
        theShape.stroke({
          width: theShape.attr("origin-width"),
          color: theShape.attr("origin-color"),
        });
      }
    }
  });
  theShape.on("mousedown", (evt) => {
    KFK.closeActionLog();
    if (KFK.mode === "lock") {
      KFK.tryToLockUnlock(evt.shiftKey);
      return;
    }

    KFK.mousePosToRemember = {
      x: KFK.currentMousePos.x,
      y: KFK.currentMousePos.y,
    };
    //begin shape zoom, begin zoom shape
    if (evt.ctrlKey || evt.metaKey) {
      KFK.isZoomingShape = true;
      //这里必须重新plot一遍，否则，在zoom时会出错
      if (theShape.array) {
        let arr = theShape.array();
        theShape = theShape.plot(arr);
      }
      KFK.shapeToZoom = theShape;
      KFK.setShapeToRemember(theShape);
      KFK.shapeSizeCenter = {
        x: KFK.scalePoint(theShape.cx()),
        y: KFK.scalePoint(theShape.cy()),
      };
      KFK.shapeSizeOrigin = {
        w: theShape.width(),
        h: theShape.height(),
      };
      KFK.shapeZoomStartPoint = {
        x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
        y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
      };
      let dis = KFK.distance(KFK.shapeSizeCenter, KFK.shapeZoomStartPoint);
    } else {
      //begin drag shape, begin shape drag
      KFK.isZoomingShape = false;
      KFK.shapeToDrag = theShape;
      KFK.setShapeToRemember(theShape);
      KFK.shapeDraggingStartPoint = {
        x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
        y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
      };
      KFK.shapeFirstDraggingStartPoint = {
        x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
        y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
      };
      console.log(
        "shapeToDrag",
        KFK.shapeToDrag.attr("shapetype"),
        "mousedown, set shapeFirstDraggingStartPoint to",
        KFK.shapeFirstDraggingStartPoint
      );
    }
  });
  //stop zoom shape
  theShape.on("mouseup", (evt) => {
    KFK.stopZoomShape();
  });
  //click line click shape
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
    // KFK.shapeToDrag = null;
    KFK.focusOnNode(null);
    KFK.divStylerRefDiv = null;
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "customline", true);
    KFK.APP.setData("show", "custombacksvg", false);
    KFK.APP.setData("show", "customfont", false);
    KFK.APP.setData("show", "layercontrol", false);

    KFK.setShapeToRemember(theShape);
    KFK.selectShape(theShape);

    KFK.pickedShape = theShape;
    // KFK.setRightTabIndex();
    let color = theShape.attr("origin-color");
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

KFK.zoomShape = function(evt, shapeToZoom) {
  let zoomTo = {
    x: KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
    y: KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
  };
  let dis_1 = KFK.distance(KFK.shapeZoomStartPoint, KFK.shapeSizeCenter);
  let dis_2 = KFK.distance(zoomTo, KFK.shapeSizeCenter);
  let delta = 3 * (dis_2 - dis_1);
  KFK.DivStyler
    ? KFK.DivStyler.zoom("in", shapeToZoom, delta)
    : import("./divStyler").then((pack) => {
        KFK.DivStyler = pack.DivStyler;
        KFK.DivStyler.zoom("in", shapeToZoom, delta);
      });
};
KFK.stopZoomShape = async function() {
  if (KFK.isZoomingShape) {
    KFK.isZoomingShape = false;
    KFK.morphedShape = null;
    if (
      KFK.shapeToZoom.width() !== KFK.shapeToRemember.width() ||
      KFK.shapeToZoom.height() !== KFK.shapeToZoom.height()
    )
      await KFK.syncLinePut(
        "U",
        KFK.shapeToZoom,
        "resize",
        KFK.shapeToRemember,
        false
      );
  }
};

KFK.initLineTransformer = function() {
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
        KFK.lineToResize.plot([[stopAtPos.x, stopAtPos.y], parr[1]]);
      } else {
        KFK.lineToResize.plot([parr[0], [stopAtPos.x, stopAtPos.y]]);
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
        KFK.lineToResize.plot([[stopAtPos.x, stopAtPos.y], parr[1]]);
      } else {
        KFK.lineToResize.plot([parr[0], [stopAtPos.x, stopAtPos.y]]);
      }
      await KFK.syncLinePut(
        "U",
        KFK.lineToResize,
        "resize",
        KFK.shapeToRemember,
        false
      );
      KFK.hide("#linetransformer");
    },
  }); //line transformer. draggable()
};

KFK.svgDrawTmpLine = function(fx, fy, tx, ty, option) {
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

KFK.svgConnectNode = function(fid, tid, fbp, tbp, fx, fy, tx, ty) {
  if (!(fid && tid)) {
    return;
  }
  let fromDIV = $(`#${fid}`);
  let lineClass = `connect_${fid}_${tid}`;
  let lineClassReverse = `connect_${tid}_${fid}`;
  let pstr = "";
  let triangle = [];
  let rad = 20;
  let tri = 10;
  if (fromDIV.attr("cnwidth"))
    tri = Math.max(parseInt(fromDIV.attr("cnwidth")) * 2, 10);
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
  switch (tbp) {
    case 0:
      tx = tx - tri_height;
      break;
    case 1:
      ty = ty - tri_height;
      break;
    case 2:
      tx = tx + tri_height;
      break;
    case 3:
      ty = ty + tri_height;
      break;
  }
  switch (fbp) {
    case 0:
      switch (tbp) {
        case 0:
          pstr = `M${fx} ${fy} C${fx - rad} ${fy} ${tx -
            rad} ${ty} ${tx} ${ty}`;
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
          pstr = `M${fx} ${fy} C${fx} ${ty - rad} ${tx} ${ty -
            rad} ${tx} ${ty}`;
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
          pstr = `M${fx} ${fy} C${fx + rad} ${fy} ${tx +
            rad} ${ty} ${tx} ${ty}`;
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
          pstr = `M${fx} ${fy} C${fx} ${fy + rad} ${tx} ${ty +
            rad} ${tx} ${ty}`;
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

KFK.myFadeIn = function(jq, ms = 200) {
  jq &&
    jq
      .css({
        visibility: "visible",
        opacity: 0.0,
      })
      .animate(
        {
          opacity: 1.0,
        },
        ms
      );
};
KFK.myFadeOut = function(jq, ms = 200) {
  jq &&
    jq.animate(
      {
        opacity: 0.0,
      },
      ms,
      function() {
        jq.css("visibility", "hidden");
      }
    );
};
KFK.hide = function(jq) {
  if (typeof jq === "string") jq = $(jq);
  jq.addClass("noshow");
};
KFK.show = function(jq) {
  if (typeof jq === "string") jq = $(jq);
  jq.removeClass("noshow");
};
/**
 * Is a div visible, visible means it has not 'noshow' class
 */
KFK.isShowing = function(jq) {
  if (typeof jq === "string") jq = $(jq);
  return jq.hasClass("noshow") === false;
};

/* View in fullscreen */
KFK.openFullscreen = function() {
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
KFK.closeFullscreen = function() {
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
  } catch (error) {}
};

KFK.showIvtCodeDialog = function() {
  KFK.showDialog({
    ivtCodeDialog: true,
  });
};

KFK.initQuillFonts = function() {
  KFK.customQuillFonts = [
    {
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
  KFK.customQuillFonts.forEach(function(fontDef) {
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

KFK.checkBrowser = function() {
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

KFK.exportPDF = function() {
  try {
    html2canvas(document.body, {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

KFK.exportPDF2 = function() {
  var html = KFK.JC3.html();
  var printWindow = window.open("", "", "height=400,width=800");
  printWindow.document.write("<html><head><title>DIV Contents</title>");
  printWindow.document.write("</head><body >");
  printWindow.document.write(html);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
};

KFK.onDropFiles = async function(files) {
  console.log(files, files.length);
  let aFile = files[0];
  if (NotSet(aFile)) return;
  if (aFile.type !== "image/png" && aFile.type !== "image/jpeg") {
    await KFK.onDropDocFile(aFile);
  } else {
    await KFK.onDropImage(aFile);
  }
};
KFK.onDropDocFile = async function(aFile) {
  KFK.scrLog("当前用户只能上传JPG或PNG格式图片");
  let fileData = new Blob(aFile);
  // Pass getBuffer to promise.
  var promise = new Promise(getBuffer(fileData));
  // Wait for promise to be resolved, or log error.
  promise
    .then(function(data) {
      // Here you can pass the bytes to another function.
      console.log(data);
    })
    .catch(function(err) {
      console.log("Error: ", err);
    });
};
KFK.getBuffer = function(fileData) {
  return function(resolve) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileData);
    reader.onload = function() {
      var arrayBuffer = reader.result;
      var bytes = new Uint8Array(arrayBuffer);
      resolve(bytes);
    };
  };
};

KFK.onDropImage = async function(imageFile) {
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
      stsFor: "drop",
    });
  } catch (error) {
    console.error(error);
  }
};

KFK.onGotSTS = function(response) {
  KFK.sts = response.credential;
  // KFK.uploadToQcloudCOS();
  if (response.stsFor === "drop") {
    KFK.uploadFileToQcloudCOS(KFK.fileToUpload);
  } else if (response.stsFor === "paste") {
    KFK.uploadFileToQcloudCOS(KFK.blobToPaste);
  }
};

KFK.procPasteBlob = async function(blob) {
  KFK.blobToPaste = blob;
  await KFK.sendCmd("GETSTS", {
    stsFor: "paste",
  });
};

KFK.makeImageDiv = async function(fileId, posx, posy, imgUrl) {
  let jqDIV = await KFK.placeNode(
    false,
    fileId,
    "textblock",
    "default",
    posx,
    posy,
    100,
    100,
    "",
    `<img src="${imgUrl} "/>`
  );
  jqDIV.attr("creator", KFK.APP.model.cocouser.userid);
  await KFK.syncNodePut("C", jqDIV, "create image node", null, false, 0, 1);
};

KFK.getInputPrependImg = function() {
  if (NotSet(KFK.inputFor))
    return `<img src='${cocoConfig.frontend.url}/assets/chatmsg.svg'/>`;
  if (KFK.inputFor === "chat")
    return `<img src='${cocoConfig.frontend.url}/assets/chatmsg.svg'/>`;
  else return `<img src='${cocoConfig.frontend.url}/assets/chatmsg.svg'/>`;
};

KFK.uploadFileToQcloudCOS = function(file) {
  let cos = new COS({
    getAuthorization: function(options, callback) {
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
    cos.sliceUploadFile(
      {
        Bucket: cocoConfig.cos.bucket,
        Region: cocoConfig.cos.region,
        Key: fileKeyName,
        Body: file,
        onTaskReady: function(tid) {
          KFK.TaskId = tid;
        },
        onHashProgress: function(progressData) {
          console.log("onHashProgress", JSON.stringify(progressData));
        },
        onProgress: function(progressData) {
          console.log("onProgress", JSON.stringify(progressData));
        },
      },
      async function(err, data) {
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
    cos.putObject(
      {
        Bucket: cocoConfig.cos.bucket, // Bucket 格式：test-1250000000
        Region: cocoConfig.cos.region,
        Key: fileKeyName,
        Body: file,
        onTaskReady: function(tid) {
          KFK.TaskId = tid;
        },
        onHashProgress: function(progressData) {
          console.log("onHashProgress", JSON.stringify(progressData));
        },
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData));
        },
      },
      async function(err, data) {
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
    KFK.warn("placeFollowerNode for undefined node, just return");
    return;
  }
  let cx = KFK.divCenter(jdiv);
  let cy = KFK.divMiddle(jdiv);
  let width = KFK.divWidth(jdiv);
  let height = KFK.divHeight(jdiv);
  let distance = width * 0.5;
  if (direction === "f") {
    flwCx = cx + width + distance;
    flwCy = cy;
  } else if (direction === "v") {
    flwCx = cx + width + distance;
    flwCy = cy + height + distance;
  } else if (direction === "c") {
    flwCx = cx;
    flwCy = cy + height + distance;
  } else if (direction === "x") {
    flwCx = cx - width - distance;
    flwCy = cy + height + distance;
  } else if (direction === "s") {
    flwCx = cx - width - distance;
    flwCy = cy;
  } else if (direction === "w") {
    flwCx = cx - width - distance;
    flwCy = cy - height - distance;
  } else if (direction === "e") {
    flwCx = cx;
    flwCy = cy - height - distance;
  } else if (direction === "r") {
    flwCx = cx + width + distance;
    flwCy = cy - height - distance;
  }
  let newDIV = KFK.makeCloneDIV(jdiv, KFK.myuid(), {
    left: flwCx - width * 0.5,
    top: flwCy - height * 0.5,
  });
  newDIV.appendTo(KFK.C3);
  await KFK.setNodeEventHandler(newDIV, async function() {
    newDIV.attr("creator", KFK.APP.model.cocouser.userid);
    await KFK.syncNodePut("C", newDIV, "new node", null, false, 0, 1);
    await KFK.LinkFromBrainCenter(newDIV);
  });
  KFK.justCreatedJqNode = newDIV;
  KFK.lastCreatedJqNode = newDIV;
  if (KFK.APP.model.viewConfig.autoFollow) {
    console.log("auto jump");
    await KFK.addToStackThenJumpTo(KFK.lastCreatedJqNode, false, false);
  } else {
    console.log("no auto jump");
  }
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
  if (typeof div === "string") {
    jqObjById = $("#" + div);
  } else {
    jqObjById = $("#" + div.attr("id"));
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
  await KFK.addToStackThenJumpTo(KFK.getNodeById(KFK.brNodeId), false, true);
};
KFK.addFromTo = async function(fDiv, tDiv) {
  await KFK.flushJumpStack();
  if (KFK.jumpStack.length === 0) {
    KFK.jumpStack.push(fDiv);
    KFK.jumpStack.push(tDiv);
    KFK.jumpStackPointer = 1;
  } else {
    if (
      KFK.jumpStack[KFK.jumpStack.length - 1].attr("id") === fDiv.attr("id")
    ) {
      KFK.jumpStack.push(tDiv);
      KFK.jumpStackPointer = KFK.jumpStack.length - 1;
    } else {
      KFK.jumpStack.push(fDiv);
      KFK.jumpStack.push(tDiv);
      KFK.jumpStackPointer = KFK.jumpStack.length - 1;
    }
  }
};
KFK.addToStackThenJumpTo = async function(
  jqDiv,
  takeBrain = false,
  imBrain = false
) {
  await KFK.flushJumpStack();
  if (NotSet(jqDiv)) {
    // console.log("brain not set, just return");
    return;
  }
  let found = false;
  for (let i = 0; i < KFK.jumpStack.length; i++) {
    if (KFK.jumpStack[i].attr("id") === jqDiv.attr("id")) {
      found = true;
      break;
    }
  }
  if (found === false) {
    KFK.jumpStack.push(KFK.getNodeById(KFK.brNodeId));
    tmpIdx = KFK.jumpStack.length - 1;
    KFK.jumpStackPointer = tmpIdx;
  } else {
    KFK.jumpStackPointer = tmpIdx;
  }
  KFK.jumpToNode(jqDiv, takeBrain, imBrain);
};

KFK.linkToBrain = async () => {
  //rr
  if (NotSet(KFK.brNodeId)) {
    // console.log("brain not set, just return");
    return;
  }
  let jqDiv = KFK.getHoverFocusLastCreate();
  await KFK.LinkFromBrainCenter(jqDiv);
};
KFK.jumpToLastCreated = async (takeBrain) => {
  await KFK.addToStackThenJumpTo(KFK.lastCreatedJqNode, takeBrain, false);
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
  KFK.selectNodeOnClick(jdiv, false);
  if (KFK.brainstormMode && takeBrain && iamBrain === false) {
    KFK.startBrainstorm(jdiv);
  }
};

KFK.flushJumpStack = async () => {
  // console.log("flushJumpStack", KFK.jumpStack.length);
  KFK.jumpStack = KFK.jumpStack.filter((jdiv) => {
    if (jdiv && $("#" + jdiv.attr("id")).length > 0) {
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
    if (side === "left" || side === "right") {
      let newY = brPosY - tmpTotalHeight * 0.5 + accumulatedHeight;
      sameSideChildren[i].css("top", newY);
      if (side === "left")
        sameSideChildren[i].css(
          "left",
          myLeft - 80 - KFK.divWidth(sameSideChildren[i])
        );
      else sameSideChildren[i].css("left", myLeft + myWidth + 80);
      accumulatedHeight += KFK.divHeight(sameSideChildren[i]) + divSpacingVert;
    } else {
      //top or bottom
      let newX = brPosX - tmpTotalWidth * 0.5 + accumulatedWidth;
      sameSideChildren[i].css("left", newX);
      if (side === "top")
        sameSideChildren[i].css(
          "top",
          myTop - 80 - KFK.divHeight(sameSideChildren[i])
        );
      else sameSideChildren[i].css("top", myTop + myHeight + 80);
      accumulatedWidth += KFK.divWidth(sameSideChildren[i]) + divSpacingHori;
    }
    //作为父节点，可连接左右中点，其子节点可连接打开左右中点；
    //作为子节点，父节点可任意中点，但自身只能连接到左右中点；
    KFK.redrawLinkLines(sameSideChildren[i], "move", true, [
      [0, 2],
      [0, 2],
      [0, 1, 2, 3],
      [0, 2],
    ]);
    KFK.syncNodePut(
      "U",
      sameSideChildren[i].clone(),
      "new child",
      old,
      false,
      i,
      sameSideChildren.length
    );
  }
};

KFK.AI = (idx) => {
  if (KFK.APP.model.viewConfig.useAI === false) return;
  let msg = AIXJ.getMsg(idx, KFK.APP.model.osName);
  if (IsSet(msg)) {
    KFK.show(KFK.SYSMSG);
    KFK.SYSMSG.prop("innerHTML", msg);
  }
};

KFK.clickOnLeftPanel = function(evt) {
  // console.log("Clcik on Left Panel");
  // console.log(evt);
  evt.stopPropagation();
  evt.preventDefault();
};
KFK.clickOnRightPanel = function(evt) {
  evt.stopPropagation();
};

KFK.prepareUserIdForRTC = (userId) => {
  return userId.replace(/[@|\.]/g, "_");
};
KFK.toggleVideoCall = async () => {
  if (KFK.duringVideo === false) {
    await KFK.askVideoCall();
  } else {
    await KFK.stopVideoCall();
  }
};
/**
 * Ask to start video call
 */
KFK.askVideoCall = async () => {
  if (KFK.waitVideoTimer) {
    KFK.scrLog("非企业客户有时长限制，请稍后重试");
    return;
  } else {
    KFK.RtcManager
      ? await KFK.RtcManager.initRtc()
      : import("./rtcManager").then(async (pack) => {
          KFK.RtcManager = pack.RtcManager;
          await KFK.RtcManager.initRtc();
        });
    KFK.duringVideo = true;
    let user_ser = KFK.prepareUserIdForRTC(KFK.APP.model.cocouser.userid);
    await KFK.sendCmd("GENSIG", {
      user_ser: user_ser,
    });
  }
};
KFK.startVideoCall = async (config, shareConfig) => {
  try {
    KFK.RtcManager &&
      (await KFK.RtcManager.startVideoCall(config, shareConfig));
  } catch (error) {
    console.log(error);
  }
  setTimeout(() => {
    KFK.scrLog("非企业客户提供五分钟试用, 过五分钟可重新发起");
    KFK.stopVideoCall();
    KFK.waitVideoTimer = setTimeout(() => {
      KFK.waitVideoTimer = undefined;
    }, 5 * 60 * 1000);
  }, 5 * 60 * 1000);
};
KFK.stopVideoCall = async () => {
  try {
    KFK.RtcManager && (await KFK.RtcManager.stopVideoCall());
  } catch (error) {
    console.log(error);
  }
  if (KFK.waitVideoTimer) {
    clearTimeout(KFK.waitVideoTimer);
  }
};
KFK.toggleScreenSharing = function() {
  KFK.RtcManager.toggleScreenSharing();
};
KFK.switchCamera = function() {
  KFK.RtcManager.switchCamera();
};
KFK.switchMic = function() {
  KFK.RtcManager.switchMic();
};
KFK.clickMainVideo = function() {
  let mainVideo = $(".video-box").first();
  if ($("#main-video").is(mainVideo)) {
    return;
  }
  KFK.RtcManager.clickMainVideo();
};
KFK.resendAfter15Seconds = function() {
  let resendCodeMsg = $(".resendCodeMsg");
  resendCodeMsg.prop("innerHTML", "15 秒后可重新发送");
  resendCodeMsg.show();
  $(".resendCodeLink").hide();
  let a = 15;
  let timerId = setInterval(function() {
    a = a - 1;
    resendCodeMsg.prop("innerHTML", a + "秒后可重新发送");
    if (a === 0) {
      clearInterval(timerId);
      resendCodeMsg.hide();
      $(".resendCodeLink").show();
    }
  }, 1000);
};

KFK.overTool = function(evt, tool) {
  if (tool === "line") {
    KFK.expandTool(evt, tool);
  } else {
    KFK.closeTool();
  }
};
KFK.expandTool = function(evt, tool) {
  let jTool = $(evt.target);
  if (jTool.hasClass("toolbox") === false) {
    jTool = jTool.parent();
  }
  let jExpand = $("#lineExpand");
  jExpand.removeClass("noshow");
  let top = evt.clientY - 50;
  jExpand.css({
    top: top,
    left: 65,
  });
};
KFK.closeTool = function() {
  let jExpand = $("#lineExpand");
  jExpand.addClass("noshow");
};

KFK.interLinkDocRowClickHandler = async function(doc, index) {
  KFK.scrLog("点击空白处放置文档链接");
  KFK.interLinkDocToPlace = doc;
};

KFK.placeInterLinkDoc = async function(evt) {
  let doc = KFK.interLinkDocToPlace;
  if (NotSet(doc)) return;
  let toAdd = "<a href='#'>" + doc.name + "</a>";
  let innerLink = doc._id;
  let jBox = await KFK.placeNode(
    false, //shiftKey
    KFK.myuid(),
    "textblock",
    "default",
    KFK.scalePoint(KFK.scrXToJc3X(evt.clientX)),
    KFK.scalePoint(KFK.scrYToJc3Y(evt.clientY)),
    100,
    100,
    toAdd,
    ""
  );
  jBox.addClass("noedit");
  jBox.css("background", "#FFFFFF00");
  jBox.css("border-color", "#33333300");
  jBox.attr("innerlink", innerLink);
  //interlink 的实现方法时检测到用户点击的taget.href不为空，表明点在了<a href>上，并且div有innerlink attr，
  //则载入innerLink，内容是doc_id, 并且 通过evt.preventDefault, 避免<a href>链接起作用
  jBox.attr("creator", KFK.APP.model.cocouser.userid);
  await KFK.syncNodePut("C", jBox, "place interlink", null, false, 0, 1);
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
console.log("URLSEARCH:", urlSearch);
console.log("URLPATH:", urlPath);
WS.remoteEndpoint = cocoConfig.ws_server.endpoint.url;
BossWS.remoteEndpoint = cocoConfig.ws_server.endpoint.url;
if (urlSearch.startsWith("?dou=")) {
  KFK.urlMode = "sharecode";
  KFK.shareCode = urlSearch.substr(5);
  // window.history.replaceState({}, null, KFK.urlBase);
} else if (urlSearch.startsWith("?r=")) {
  KFK.urlMode = "ivtcode";
  KFK.shareCode = urlSearch.substr(3);
  window.history.replaceState({}, null, KFK.urlBase);
} else if (urlPath.startsWith("/reg0") || urlPath.startsWith("/signup")) {
  KFK.urlMode = "gotoRegister";
  window.history.replaceState({}, null, KFK.urlBase);
} else if (urlPath.startsWith("/signin")) {
  KFK.urlMode = "gotoSignin";
  window.history.replaceState({}, null, KFK.urlBase);
} else if (urlPath.substr(1).match(/^[0-9a-fA-F]+$/)) {
  KFK.docToOpen = urlPath.substr(1);
  KFK.urlMode = "directopen";
  KFK.shareCode = KFK.docToOpen;
  console.log("Open Doc Direclty", KFK.docToOpen);
  //KFK.refreshDesignerWithDoc(KFK.docToOpen, "");
} else if (urlPath.match(/@(.*)$/)) {
  console.log("Column", urlPath.substr(2));
  KFK.column = urlPath.substr(2);
  KFK.urlMode = "column";
  KFK.shareCode = urlPath.substr(2);
  // } else {
  //   window.history.replaceState({}, null, KFK.urlBase);
}

KFK.gotoDocById = async function(doc_id) {
  window.location = KFK.urlBase + "/" + doc_id;
};

KFK.debug("Path:", urlPath, "Search:", urlSearch, "Mode:", KFK.urlMode);

KFK.onDocPmsChanged = function(pms) {
  if (KFK.pms) {
    KFK.pms.onDocPmsChanged(pms);
  } else {
    import("./pms").then((pack) => {
      KFK.pms = pack.PMS;
      KFK.pms.onDocPmsChanged(pms);
    });
  }
};

KFK.setToColumn = function(prj) {
  KFK.prjToColumn = prj;
  KFK.showDialog({
    prjToColumnDialog: true,
  });
};

KFK.createColumnFromProject = function() {
  let payload = {
    id: KFK.APP.model.toColumn.id,
    name: KFK.APP.model.toColumn.name,
    prjid: KFK.prjToColumn.prjid,
  };
  if (Validator.validateColumnId(payload.id) === false) {
    KFK.scrLog("专栏ID请在8-20个字符之间");
    return;
  }
  if (Validator.validateColumnName(payload.name) === false) {
    KFK.scrLog("专栏名称请在3-20个字符之间");
    return;
  }
  KFK.sendCmd("COLUMN", payload);
};
export default KFK;
