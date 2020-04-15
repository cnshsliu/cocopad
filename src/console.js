import "./importjquery";
import "regenerator-runtime/runtime";
import Joi from "@hapi/joi";
import { SVG } from "@svgdotjs/svg.js";
import "core-js/stable";
import "jquery-ui-dist/jquery-ui.js";
import OSS from "ossnolookup";
import path from "path";
import suuid from "short-uuid";
import "spectrum-colorpicker2/dist/spectrum.min";
import url from "url";
// import uuidv4 from "uuid/v4";
import assetIcons from "../assets/*.svg";
import avatarIcons from "../assets/avatar/*.svg";
import "./fontpicker/jquery.fontpicker";
import "./minimap/jquery-minimap";
import config from "./config";
import Validator from './validator';
import Demo from "./demo";
import RegHelper from './reghelper';
import SVGs from "./svgs";
import WS from "./ws";
import ACM from "./accountmanage";
import SHARE from "./sharemanage";
import Navigo from "navigo";

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
}
jstr = function (obj) {
  return (JSON.stringify(obj));
}

const NotSet = function (val) {
  if (val === undefined || val === null)
    return true;
  else
    return false;
}
const IsSet = function (val) {
  return !NotSet(val);
}
const IsBlank = function (val) {
  if (val === undefined || val === null || val === '')
    return true;
  else
    return false;
}
const NotBlank = function (val) {
  return !IsBlank(val);
}
const IsFalse = function (val) {
  if (val === undefined || val === null || val === false)
    return true;
  else
    return false;
}

const KFK = {};
KFK.accordion = {};
KFK.currentPage = 0;
KFK.loadedProjectId = null;
KFK.keypool = "";
KFK.svgDraw = null;   //画svg的画布
KFK.wsTryTimesBeforeGiveup = 60;
KFK.OSSClient = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "ACCESSKEY",
  accessKeySecret: "ACCESSECRET",
  bucket: config.vault.bucket
});
KFK.idRowMap = {};
KFK.idSwitchMap = {};
KFK.FROM_SERVER = true; //三个常量
KFK.FROM_CLIENT = false;
KFK.NO_SHIFT = false;
KFK.badgeTimers = {};  //用于存放用户badge显示间隔控制的timer，这样，不是每一个mousemove都要上传，在Timer内，只上传最后一次mouse位置
KFK.updateReceived = 0; //记录接收到的其他用户的改动次数，在startActiveLogWatcher中，使用这个数字来控制是否到服务器端去拉取更新列表
KFK.tempSvgLine = null; //这条线是在划线或者链接node时，那条随着鼠标移动的线
KFK.LOGLEVEL_ERROR = 1;
KFK.LOGLEVEL_WARN = 2;
KFK.LOGLEVEL_INFO = 3;
KFK.LOGLEVEL_DEBUG = 4;
KFK.LOGLEVEL_DETAIL = 5;
KFK.LOGLEVEL_NOTHING = 0;
KFK.loglevel = KFK.LOGLEVEL_DEBUG; //控制log的等级, 级数越小，显示信息越少
KFK.zoomLevel = 1; //记录当前的zoom等级
KFK.designerConf = { scale: 1, left: 0, top: 0 }; //用于在zoom控制计算中
KFK.opstack = []; //Operation Stack, 数组中记录操作记录，用于undo/redo
KFK.opstacklen = 1000; //undo，redo记录次数
KFK.opz = -1; // opstack 当前记录指针
KFK.mouseTimer = null;  //定时器用于控制鼠标移动上传的频次
KFK.WSReconnectTime = 0; //WebSocket重连的次数
KFK.currentView = "unknown";
KFK.WS = null;
KFK.C3 = null;
KFK.JC3 = null;
KFK.docDuringLoading = null;
KFK.inFullScreenMode = false;
KFK.inPresentingMode = false;
KFK.inOverviewMode = false;
KFK.controlButtonsOnly = false;
KFK.showRightTools = true;
KFK.zoomFactor = 0;
KFK.lineMoverDragging = false;
KFK.scaleBy = 1.01;
KFK.centerPos = { x: 0, y: 0 };
KFK.centerPos = { x: 0, y: 0 };
KFK.lastFocusOnJqNode = null;
KFK.justCreatedJqNode = null;
KFK.justCreatedSvgLine = null;
KFK._jqhoverdiv = null;
KFK._svghoverline = null;
KFK.inited = false;
KFK.divInClipboard = undefined;
KFK.lineTemping = false;
KFK.ignoreClick = false;
KFK.scrollBugPatched = false;
KFK.actionLogToView = { editor: "", actionlog: [] };
KFK.actionLogToViewIndex = 0;
KFK.explorerRefreshed = false;
KFK.numberOfNodeToCreate = 0;
KFK.numberOfNodeCreated = 0;
KFK.badgeIdMap = {};

// KFK._width = window.innerWidth; KFK._height = window.innerHeight;
// KFK._width = window.innerWidth * 6; KFK._height = window.innerHeight * 6;
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

KFK.nodes = [];
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
KFK.editting = false;
KFK.resizing = false;
KFK.dragging = false;
KFK.lineDragging = false;
KFK.afterDragging = false;
KFK.afterResizing = false;
KFK.linkPosNode = [];
KFK.linkPosLine = [];
KFK.tween = null;
KFK.KEYDOWN = { ctrl: false, shift: false, alt: false, meta: false };
KFK.originZIndex = 1;
KFK.lastActionLogJqDIV = null;

KFK.JC1 = $('#C1');
KFK.C1 = el(KFK.JC1);
// KFK.C1.style.width = KFK._width + "px";
// KFK.C1.style.height = KFK._height + "px";
KFK.focusOnC3 = () => {
  if (KFK.JC3) {
    KFK.JC3.attr('tabIndex', '0');
    KFK.JC3.focus();
  } else {
    KFK.warn("focusOnC3 failed. not exist");
  }
}


KFK.myuid = () => {
  return suuid.generate();
}
KFK.scrollContainer = $("#S1");
KFK.lockMode = false;
KFK.selectedDIVs = [];
KFK.mouseIsDown = false;
KFK.kuangXuanStartPoint = { x: 0, y: 0 };
KFK.kuangXuanEndPoint = { x: 0, y: 0 };
KFK.duringKuangXuan = false;

KFK.currentMousePos = { x: -1, y: -1 };
KFK.JCBKG = $('#containerbkg');
KFK.hoverJqDiv = function (jqdiv) {
  if (jqdiv !== undefined) {
    KFK._jqhoverdiv = jqdiv;
    if (jqdiv !== null)
      KFK.hoverSvgLine(null);
  } else {
    return KFK._jqhoverdiv;
  }
}
KFK.hoverSvgLine = function (svgline) {
  if (svgline !== undefined) {
    KFK._svghoverline = svgline;
    if (svgline !== null)
      KFK.hoverJqDiv(null);
  } else {
    return KFK._svghoverline;
  }
}
function el(jq) {
  return jq[0];
}

KFK.loadImages = function loadimg() {
  let loadedImages = 0;
  let numImages = 0;
  for (var file in assetIcons) {
    numImages++;
  }
  for (var file in assetIcons) {
    KFK.images[file] = new Image();
    KFK.images[file].onload = function () {
      if (++loadedImages >= numImages) {
        if (KFK.inited === false) KFK.init();
      }
    };
    KFK.images[file].src = assetIcons[file];
  }

  KFK.images["toggle_line"].src = KFK.images["line"].src;

};

KFK.loadAvatars = function loadavatar() {
  let loadedAvatars = 0;
  let numAvatars = 0;
  for (var file in avatarIcons) {
    numAvatars++;
  }
  for (var file in avatarIcons) {
    KFK.avatars[file] = new Image();
    KFK.avatars[file].onload = function () {
      if (++loadedAvatars >= numAvatars) {
        KFK.setAppData("model", "avatars", KFK.avatars);
        KFK.setAppData("model", "avatarLoaded", true);
      }
    };
    KFK.avatars[file].src = avatarIcons[file];
    KFK.avatars[file].id = file;
  }
};

class Node {
  constructor(id, type, variant, x, y, w, h, attach) {
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
    if (KFK.APP.model.cococonfig.snap) {
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

KFK.focusOnNode = function (jqNodeDIV) {
  KFK.lastFocusOnJqNode = jqNodeDIV;
  KFK.justCreatedJqNode = null;
  KFK.justCreatedSvgLine = null;

  if (jqNodeDIV !== null)
    KFK.updatePropertyFormWithNode(jqNodeDIV);
};

KFK.setRightTabIndex = function (tabIndex) {
  if (tabIndex !== undefined) {
    KFK.APP.setData("model", "rightTabIndex", tabIndex);
  } else {
    if (KFK.selectedDIVs.length === 1
      || KFK.pickedSvgLine !== null
      || KFK.justCreatedJqNode !== null
      || KFK.justCreatedSvgLine !== null) {
      KFK.APP.setData("model", "rightTabIndex", 0);
    } else if (KFK.selectedDIVs.length >= 2) {
      KFK.APP.setData("model", "rightTabIndex", 1);
    } else if (KFK.selectedDIVs.length === 0) {
      KFK.APP.setData("model", "rightTabIndex", 2);
    }
  }
};

KFK.updatePropertyFormWithNode = function (jqNodeDIV) {
  let nodeType = "unknown";
  if (jqNodeDIV != null) { nodeType = jqNodeDIV.attr("nodetype"); }

  KFK.APP.setData("show", "customline", false);
  KFK.APP.setData("show", "shape_property", jqNodeDIV != null);
  KFK.APP.setData("show", "customfont", jqNodeDIV != null && getBoolean(config.node[nodeType].edittable));
  KFK.APP.setData("show", "customshape", jqNodeDIV != null && getBoolean(config.node[nodeType].customshape));
  KFK.APP.setData("show", "custombacksvg", jqNodeDIV != null && (nodeType === "yellowtip" || nodeType === "textblock"));
  KFK.APP.setData("show", "layercontrol", jqNodeDIV != null && (nodeType === "text" || nodeType === "yellowtip" || nodeType === "textblock"));
  if (jqNodeDIV != null && getBoolean(config.node[nodeType].customshape)) {
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

  if (jqNodeDIV != null && getBoolean(config.node[nodeType].edittable)) {
    let fontFamily = jqNodeDIV.css("font-family");
    let fontSize = KFK.unpx(jqNodeDIV.css("font-size"));
    let fontColor = jqNodeDIV.css("color");
    let textAlign = jqNodeDIV.css("justify-content");
    let vertAlign = jqNodeDIV.css("align-items");
    textAlign = textAlign === "normal" ? "flex-start" : textAlign;
    vertAlign = vertAlign === "normal" ? "flex-start" : vertAlign;
    if (jqNodeDIV.find(".tip_content").length !== 0) {
      textAlign = jqNodeDIV.find(".tip_content").css("justify-content");
      vertAlign = jqNodeDIV.find(".tip_content").css("align-items");
    }
    $("#fontColor").spectrum("set", fontColor);
    $("#spinner_font_size").spinner("value", fontSize);
    KFK.APP.setData("model", "textAlign", textAlign);
    KFK.APP.setData("model", "vertAlign", vertAlign);
  }
};

KFK.log = function (...info) {
  console.log('LOG>', ...info);
};
KFK.error = function (...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_ERROR)
    console.log('ERROR>', ...info);
}
KFK.warn = function (...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_WARN)
    console.log('WARN>', ...info);
}
KFK.info = function (...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_INFO)
    console.log('INFO', ...info);
}
KFK.debug = function (...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_DEBUG)
    console.log("DEBUG>", ...info);
}
KFK.detail = function (...info) {
  if (KFK.loglevel >= KFK.LOGLEVEL_DETAIL)
    console.log("DETAIL>", ...info);
}

KFK.logKey = function (...info) {
  // KFK.scrLog(...info);
}

KFK.scrLog = function (msg, staytime = 5000) {
  let parent = $("#MSG").parent();
  let msgDIV = $("#MSG");
  let cloneDIV = $("#fadeoutmsg");
  if (cloneDIV.length > 0) {
    cloneDIV.remove();
  }

  cloneDIV = msgDIV.clone().appendTo(parent);
  cloneDIV.attr("id", "fadeoutmsg");
  cloneDIV.html(msg);
  cloneDIV.animate({ top: "10px", }, 50, async function () {
    await KFK.sleep(staytime);
    cloneDIV.animate({ top: "-24px" }, 50, async function () {
      cloneDIV.remove();
    })
  })
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
    to.y + radius * Math.sin(angle)
  ];
};


KFK.replaceNodeInSelectedDIVs = function (jqDIV) {
  for (let i = 0; i < KFK.selectedDIVs.length; i++) {
    if (KFK.selectedDIVs[i].attr("id") === jqDIV.attr("id")) {
      KFK.selectedDIVs[i] = jqDIV;
    }
  }
}

KFK.calculateNodeConnectPoints = function (jqDIV) {
  let divLeft = KFK.unpx(jqDIV.css("left"));
  let divTop = KFK.unpx(jqDIV.css("top"));
  let divWidth = KFK.unpx(jqDIV.css("width"));
  let divHeight = KFK.unpx(jqDIV.css("height"));
  let pos = {
    center: {
      x: divLeft + divWidth * 0.5,
      y: divTop + divHeight * 0.5
    },
    points: [
      {
        x: KFK.unpx(jqDIV.css("left")),
        y: KFK.unpx(jqDIV.css("top")) + KFK.unpx(jqDIV.css("height")) * 0.5
      },
      {
        x: KFK.unpx(jqDIV.css("left")) + KFK.unpx(jqDIV.css("width")) * 0.5,
        y: KFK.unpx(jqDIV.css("top"))
      },
      {
        x: KFK.unpx(jqDIV.css("left")) + KFK.unpx(jqDIV.css("width")),
        y: KFK.unpx(jqDIV.css("top")) + KFK.unpx(jqDIV.css("height")) * 0.5
      },
      {
        x: KFK.unpx(jqDIV.css("left")) + KFK.unpx(jqDIV.css("width")) * 0.5,
        y: KFK.unpx(jqDIV.css("top")) + KFK.unpx(jqDIV.css("height"))
      }
    ]
  };
  return pos;
};

KFK.drawPathBetween = function (A, B) {
  let APos = KFK.calculateNodeConnectPoints(A);
  let BPos = KFK.calculateNodeConnectPoints(B);
  let fromPoint = null;
  let toPoint = null;
  let AIndex = 0;
  let BIndex = 0;
  let shortestDistance = KFK.distance(
    APos.points[0],
    BPos.points[0]
  );
  for (let i = 0; i < APos.points.length; i++) {
    fromPoint = APos.points[i];
    for (let j = 0; j < BPos.points.length; j++) {
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
    BPos.points[BIndex].y,
    {}
  );
};

KFK.yarkLinkNode = function (jqDIV, shiftKey, text) {
  if (KFK.lineDragging) return;
  if (KFK.nodeLocked(jqDIV)) return;
  KFK.tmpPos = KFK.calculateNodeConnectPoints(jqDIV);
  KFK.linkPosNode.push(jqDIV);
  KFK.procLinkNode(shiftKey, text);
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
  //记录在本地
  let tmp1 = KFK.linkPosNode[0].attr('linkto');
  let tmp2 = KFK.linkPosNode[0].attr('linkto');
  KFK.updateLocalNodeLinkIds(KFK.linkPosNode[0], KFK.linkPosNode[1]);
  let tmp3 = KFK.linkPosNode[0].attr('linkto');
  let tmp4 = KFK.linkPosNode[0].attr('linkto');
  if (tmp1 !== tmp3) {
    KFK.debug('The first node linkto has been changed');
    KFK.syncNodePut("U", KFK.linkPosNode[0], 'connect nodes', null, false, 0, 1);
  }
  if (tmp2 !== tmp4) {
    KFK.debug('The second node linkto has been changed');
    KFK.syncNodePut("U", KFK.linkPosNode[1], 'connect nodes', null, false, 0, 1);
  }

  if (!shiftKey) {
    KFK.linkPosNode.splice(0, 2); KFK.setMode("pointer");
  } else { KFK.linkPosNode[0] = KFK.linkPosNode[1]; KFK.linkPosNode.splice(1, 1); }
};

KFK.setLineToRemember = function (theLine) {
  KFK.lineToRemember = theLine.clone();
  KFK.lineToRemember.attr("id", theLine.attr("id"));
  KFK.lineToRemember.attr("stroke-width", theLine.attr("origin-width"));
};



KFK.yarkLinePoint = function (x, y, shiftKey) {
  if (KFK.lineDragging) return;
  if (KFK.linkPosLine.length === 1) {
    if (KFK.KEYDOWN.alt) {
      if (
        Math.abs(x - KFK.linkPosLine[0].center.x) <
        Math.abs(y - KFK.linkPosLine[0].center.y)
      )
        x = KFK.linkPosLine[0].center.x;
      else y = KFK.linkPosLine[0].center.y;
    }
  }
  KFK.linkPosLine.push({
    type: "point",
    center: { x: x, y: y },
    points: [{ x: x, y: y }]
  });
  KFK.procLinkLine(shiftKey);
};
KFK.procLinkLine = function (shiftKey) {
  if (KFK.linkPosLine.length < 2) {
    return;
  } else {
    if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
    KFK.lineTemping = false;
  }
  let fromPoint = null;
  let toPoint = null;
  KFK.justCreatedSvgLine = KFK.svgDrawLine(
    KFK.myuid(),
    KFK.linkPosLine[0].center.x,
    KFK.linkPosLine[0].center.y,
    KFK.linkPosLine[1].center.x,
    KFK.linkPosLine[1].center.y,
    {
      color: KFK.APP.model.line.color,
      width: KFK.APP.model.line.width,
      linecap: KFK.APP.model.line.linecap ? 'round' : 'square'
    }
  );

  let theLine = KFK.justCreatedSvgLine;
  KFK.setLineToRemember(theLine);

  KFK.APP.setData("show", "shape_property", true);
  KFK.APP.setData("show", "customshape", false);
  KFK.APP.setData("show", "customline", true);
  KFK.APP.setData("show", "custombacksvg", false);
  KFK.APP.setData("show", "customfont", false);
  KFK.APP.setData("show", "layercontrol", false);

  KFK.pickedSvgLine = theLine;
  let color = theLine.attr("stroke");
  let width = theLine.attr("origin-width");
  let linecap = theLine.attr("stroke-linecap");
  $("#lineColor").spectrum("set", color);
  $("#spinner_line_width").spinner("value", width);

  KFK.syncLinePut("C", theLine, "create new", null, false);
  if (!shiftKey) {
    KFK.linkPosLine.splice(0, 2);
    KFK.setMode("pointer");
  } else {
    KFK.linkPosLine[0] = KFK.linkPosLine[1];
    KFK.linkPosLine.splice(1, 1);
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
  jq1.attr("linkto", linksArr.join(','));
}
KFK.updateLocalNodeLinkIds = function (jq1, jq2) {
  KFK.addLinkTo(jq1, jq2.attr("id"));
  KFK.removeLinkTo(jq2, jq1.attr("id"));
}
KFK.removeLinkTo = function (jq, idToRemove) {
  let str = jq.attr('linkto');
  let arr = KFK.stringToArray(str);
  //如对手节点在反方向存在，就把反方向的对手节点去掉
  let index = arr.indexOf(idToRemove);
  if (index >= 0) {
    arr.splice(index, 1);
    if (arr.length > 0)
      jq.attr('linkto', arr.join(','));
    else
      jq.removeAttr("linkto");
  }
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
  if (KFK.selectedDIVs.length > 1)
    KFK.setRightTabIndex(1);
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
      nodeid: ope.from
    });
  } else if (ope.cmd === "UNLOCK") {
    KFK.sendCmd("LOCKNODE", {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      nodeid: ope.from
    });
  } else if (ope.cmd === "LOCKLINE") {
    KFK.sendCmd("UNLOCKLINE", {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      nodeid: ope.from
    });
  } else if (ope.cmd === "UNLOCKLINE") {
    KFK.sendCmd("LOCKLINE", {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      nodeid: ope.from
    });
  } else {
    if (ope.etype === 'DIV') {
      for (let i = 0; i < ope.from.length; i++) {
        if (ope.from[i] === '' && ope.to[i] !== "") { //ope is C
          jqTo = $(`#${ope.toId[i]}`);
          await KFK.syncNodePut("D", jqTo, "undo", null, true, 0, 1);
        } else if (ope.from[i] !== "" && ope.to[i] === '') { //ope is D
          let jqFrom = $($.parseHTML(ope.from[i]));
          let nodeid = jqFrom.attr("id");
          KFK.JC3.append(jqFrom);
          jqFrom = $(`#${nodeid}`);
          KFK.setNodeEventHandler(jqFrom);
          KFK.redrawLinkLines(jqFrom, 'undo');
          if (jqFrom.hasClass("lock")) {
            KFK.setNodeEvent(jqFrom, "draggable", "destroy");
            KFK.setNodeEvent(jqFrom, "resizable", "destroy");
            KFK.setNodeEvent(jqFrom, "droppable", "destroy");
          } else {
            KFK.debug(nodeid, "NOT hasclass lock");
          }
          await KFK.syncNodePut("C", jqFrom, "undo", null, true, 0, 1);
        } else if (ope.from[i] !== '' && ope.to[i] !== '') { //ope is U
          let jqTo = $(`#${ope.toId[i]}`);
          jqTo.prop('outerHTML', ope.from[i]);
          jqTo = $(`#${ope.toId[i]}`); //yes, re-select
          KFK.setNodeEventHandler(jqTo);
          KFK.redrawLinkLines(jqTo, 'undo');
          if (jqTo.hasClass("lock")) {
            KFK.setNodeEvent(jqTo, "draggable", "destroy");
            KFK.setNodeEvent(jqTo, "resizable", "destroy");
            KFK.setNodeEvent(jqTo, "droppable", "destroy");
          }
          KFK.replaceNodeInSelectedDIVs(jqTo);
          await KFK.syncNodePut("U", jqTo, 'undo', null, true, 0, 1);
        }
      }
      if (ope.from.length > 1) {
        KFK.debug('selected count after undo', KFK.selectedDIVs.length);
        KFK.setSelectedNodesBoundingRect();
      }
    } else if (ope.etype === 'SLINE') {
      KFK.hideLineTransformer();
      if (ope.from === '' && ope.to !== "") { //ope is C
        let toId = ope.toId;
        let toLine = KFK.svgDraw.findOne(`.${toId}`);
        await KFK.syncLinePut("D", toLine, "undo", null, true);
      } else if (ope.from !== "" && ope.to === "") { //ope is D
        let fromId = ope.fromId;
        let fromLine = KFK.restoreSvgLine(fromId, ope.from);
        await KFK.syncLinePut("C", fromLine, "undo", null, true);
      } else if (ope.from !== "" && ope.to !== "") { //ope is U
        let toLine = KFK.svgDraw.findOne(`.${ope.toId}`);
        let fromLine = KFK.restoreSvgLine(ope.fromId, ope.from);
        //fromLine与toLine的ID相同，因此在restoreSvgLine时，就自动把toLine换成了fromLine
        //不用删除toLine
        await KFK.syncLinePut("U", fromLine, 'undo', toLine, true);
      }
    }
  }

  KFK.opz = KFK.opz - 1;
};

KFK.getLineIdFromString = function (str) {
  let m = str.match(/id\s*=\s*('|")([^"]+)('|")/);
  if (m) { return m[2]; }
  else return null;
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
      nodeid: ope.from
    });
  } else if (ope.cmd === "UNLOCK") {
    KFK.sendCmd("UNLOCKNODE", {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      nodeid: ope.from
    });
  } else if (ope.cmd === "LOCKLINE") {
    KFK.sendCmd("LOCKLINE", {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      nodeid: ope.from
    });
  } else if (ope.cmd === "UNLOCKLINE") {
    KFK.sendCmd("UNLOCKLINE", {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      nodeid: ope.from
    });
  } else {
    if (ope.etype === 'DIV') {
      for (let i = 0; i < ope.from.length; i++) {
        if (ope.from[i] === "" && ope.to[i] !== "") { // ope is C
          let jqTo = $($.parseHTML(ope.to[i]));
          let nodeid = jqTo.attr("id");
          KFK.C3.appendChild(el(jqTo));
          jqTo = $(`#${nodeid}`);
          KFK.setNodeEventHandler(jqTo);
          if (jqTo.hasClass("lock")) {
            KFK.setNodeEvent(jqTo, "draggable", "destroy");
            KFK.setNodeEvent(jqTo, "resizable", "destroy");
            KFK.setNodeEvent(jqTo, "droppable", "destroy");
          } else {
            KFK.debug(nodeid, "NOT hasclass lock");
          }
          await KFK.syncNodePut("C", jqTo, "redo", null, true, 0, 1);
        } else if (ope.from[i] !== '' && ope.to[i] === '') { //ope is D
          let jqFrom = $(`#${ope.fromId[i]}`);
          await KFK.syncNodePut("D", jqFrom, "redo", null, true, 0, 1);
        } else if (ope.from[i] != "" && ope.to[i] !== "") { //ope is U
          let jqFrom = $(`#${ope.fromId[i]}`);
          jqFrom.prop('outerHTML', ope.to[i]);
          jqFrom = $(`#${ope.fromId[i]}`);
          KFK.setNodeEventHandler(jqFrom);
          KFK.redrawLinkLines(jqFrom, 'redo');
          if (jqFrom.hasClass("lock")) {
            KFK.setNodeEvent(jqFrom, "draggable", "destroy");
            KFK.setNodeEvent(jqFrom, "resizable", "destroy");
            KFK.setNodeEvent(jqFrom, "droppable", "destroy");
          }
          KFK.replaceNodeInSelectedDIVs(jqFrom);
          await KFK.syncNodePut("U", jqFrom, 'redo', null, true, 0, 1);
        }
      }
      if (ope.from.length > 1) {
        KFK.setSelectedNodesBoundingRect();

      }
    } else if (ope.etype === 'SLINE') {
      if (ope.from === '' && ope.to !== "") { //ope is C
        let toId = ope.toId;
        let toLine = KFK.restoreSvgLine(toId, ope.to);
        await KFK.syncLinePut("C", toLine, "redo", null, true);
      } else if (ope.from !== "" && ope.to === "") { //ope is D
        let fromId = ope.fromId;
        let fromLine = KFK.svgDraw.findOne(`.${fromId}`);
        await KFK.syncLinePut("D", fromLine, "redo", null, true);
      } else if (ope.from !== "" && ope.to !== "") { //ope is U
        let fromLine = KFK.svgDraw.findOne(`.${ope.fromId}`);
        let toLine = KFK.restoreSvgLine(ope.toId, ope.to);
        //fromLine与toLine的ID相同，因此在restoreSvgLine时，就自动把fromLine换成了toLine
        //不用删除fromLine
        await KFK.syncLinePut("U", toLine, 'redo', fromLine, true);
      }
    }
  }
};

KFK.initLayout = function () {
  KFK.debug('...initLayout')
  KFK.JC1 = $('#C1');
  KFK.C1 = el(KFK.JC1);
  KFK.JS1 = $('#S1');
  KFK.S1 = el(KFK.JS1);
  KFK.JC1.css({
    'width': KFK.px(KFK.PageWidth * (KFK.PageNumberHori + 2)),
    'height': KFK.px(KFK.PageHeight * (KFK.PageNumberVert + 2)),
  })
};

KFK.scrollToPos = function (pos) {
  KFK.JS1.scrollLeft(pos.x);
  KFK.JS1.scrollTop(pos.y);
};

//create C3 create c3
KFK.initC3 = function () {
  KFK.debug('...initC3');
  KFK.JC3 = $('#C3');
  KFK.C3 = el(KFK.JC3);
  KFK.JC3.css({
    'width': KFK.px(KFK.PageWidth * KFK.PageNumberHori),
    'height': KFK.px(KFK.PageHeight * KFK.PageNumberVert),
    'left': KFK.px(KFK.LeftB),
    'top': KFK.px(KFK.TopB),
  });
  KFK.JC3.focus((evt) => { KFK.debug("JC3 got focus"); })
  KFK.JCBKG = $('#containerbkg');
  KFK.JCBKG.css({
    'width': KFK.px(KFK.PageWidth * KFK.PageNumberHori),
    'height': KFK.px(KFK.PageHeight * KFK.PageNumberVert),
    'left': KFK.px(KFK.LeftB),
    'top': KFK.px(KFK.TopB),
  });


  //click c3  click C3 click canvas click background
  KFK.JC3.dblclick(function (evt) {
    KFK.debug("...JC3.dblclick");
    if (KFK.inOverviewMode === true) {
      KFK.toggleOnePage({ x: evt.offsetX, y: evt.offsetY });
    } else {
      KFK.toggleOnePage();
    }
    KFK.cancelTempLine();
    evt.preventDefault();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
  });
  KFK.JC3.on("click", async function (evt) {
    if (KFK.inDesigner() === false) return;
    if (KFK.editting || KFK.resizing || KFK.dragging) {
      return;
    }
    evt.preventDefault();
    KFK.closeActionLog();
    if (KFK.ignoreClick) return;

    // KFK.focusOnNode(null);
    KFK.justCreatedJqNode = null;
    KFK.justCreatedSvgLine = null;

    KFK.pickedSvgLine = null;

    // if (KFK.mode === 'lock' || KFK.mode === 'connect') {
    //   KFK.setMode('pointer');
    // }
    if (KFK.docIsReadOnly()) return;

    if (KFK.tobeTransformJqLine) KFK.tobeTransformJqLine.removeClass("shadow2");
    $("#linetransformer").css("visibility", "hidden");
    KFK.tobeTransformJqLine = null;


    if (KFK.afterDragging === true) {
      KFK.afterDragging = false;
      // return;
    }
    if (KFK.afterResizing === true) {
      KFK.afterResizing = false;
      // return;
    }
    if (KFK.mode === "line") {
      KFK.yarkLinePoint(
        KFK.scrXToJc3X(evt.clientX),
        KFK.scrYToJc3Y(evt.clientY),
        evt.shiftKey
      );
      return;
    } else {
      if (KFK.selectedDIVs.length > 0) {
        if (KFK.duringKuangXuan === false) KFK.cancelAlreadySelected();
      }
      if (config.node[KFK.mode]) {
        let variant = "default";
        if (KFK.mode === "yellowtip") {
          variant = config.node.yellowtip.defaultTip;
        }
        let realX = KFK.scrXToJc3X(evt.clientX);
        let realY = KFK.scrYToJc3Y(evt.clientY);
        let jqDIV = KFK.placeNode(
          evt.shiftKey,
          KFK.myuid(),
          KFK.mode,
          variant,
          realX,
          realY
        );
        if (!evt.shiftKey) KFK.setMode("pointer");
        await KFK.syncNodePut("C", jqDIV, "new node", null, false, 0, 1);
      }
    }

    // KFK.setRightTabIndex();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
  });

  KFK.JC3.mousedown(evt => {
    if (KFK.inDesigner() === false) return;
    if (KFK.mode === "pointer" && KFK.docIsReadOnly() === false) {
      KFK.mouseIsDown = true;
      KFK.kuangXuanStartPoint = {
        x: KFK.scrXToJc3X(evt.clientX),
        y: KFK.scrYToJc3Y(evt.clientY)
      };
    }
  });
  KFK.JC3.mouseup(async (evt) => {
    if (KFK.inDesigner() === false) return;
    KFK.ignoreClick = false;
    if (KFK.lineDragging && KFK.docIsReadOnly() === false) {
      let parr = KFK.lineToDrag.array();
      if (KFK.APP.model.cococonfig.snap) {
        let p1 = { x: parr[0][0], y: parr[0][1] };
        let p2 = { x: parr[1][0], y: parr[1][1] };
        p1 = KFK.getNearGridPoint(p1.x, p1.y);
        p2 = KFK.getNearGridPoint(p2.x, p2.y);
        KFK.lineToDrag.dmove(p1.x - parr[0][0], p1.y - parr[0][1]);
        KFK.lineToDrag.attr({ 'stroke-width': KFK.lineToDrag.attr('origin-width') });
        KFK.lineToRemember.attr({ 'stroke-width': KFK.lineToRemember.attr('origin-width') });
        await KFK.syncLinePut("U", KFK.lineToDrag, 'move', KFK.lineToRemember, false);
        KFK.setLineToRemember(KFK.lineToDrag);
      }
      KFK.lineDragging = false;
      KFK.lineToDrag = null;
      $(document.body).css("cursor", "default");
    }
    if (KFK.mode === "pointer" && KFK.docIsReadOnly() === false) {
      KFK.mouseIsDown = false;
      KFK.kuangXuanEndPoint = {
        x: KFK.scrXToJc3X(evt.clientX),
        y: KFK.scrYToJc3Y(evt.clientY)
      };
      if (KFK.duringKuangXuan) {
        KFK.ignoreClick = true;
        KFK.endKuangXuan(KFK.kuangXuanStartPoint, KFK.kuangXuanEndPoint);
        KFK.duringKuangXuan = false;
      }
    }
  });

  KFK.JC3.on("mousemove", function (evt) {
    if (KFK.inDesigner() === false) return;
    if (KFK.inPresentingMode || KFK.inOverviewMode) return;
    KFK.showUserMovingBadge(
      KFK.APP.model.cocouser,
      evt.clientX,
      evt.clientY
    );

    KFK.currentMousePos.x = evt.clientX;
    KFK.currentMousePos.y = evt.clientY;

    let indicatorX = KFK.scrXToJc1X(KFK.currentMousePos.x);
    let indicatorY = KFK.scrYToJc1Y(KFK.currentMousePos.y);

    $("#modeIndicator").css("left", indicatorX + 10);
    $("#modeIndicator").css("top", indicatorY + 10);
    KFK.kuangXuanEndPoint = {
      x: KFK.scrXToJc3X(evt.clientX),
      y: KFK.scrYToJc3Y(evt.clientY)
    };

    if (KFK.docIsReadOnly()) return;

    if (KFK.lineToDrag && KFK.docIsReadOnly() === false && KFK.lineLocked(KFK.lineToDrag) === false) {
      if (KFK.distance(KFK.mousePosToRemember, KFK.currentMousePos) > 5) {
        KFK.lineDragging = true;
      }
    } else {
      KFK.lineToDrag = null;
    }
    //支持按下鼠标， 框选多个node
    if (
      KFK.mode === "pointer" &&
      KFK.mouseIsDown &&
      KFK.lineDragging === false &&
      KFK.lineMoverDragging === false &&
      KFK.minimapMouseDown === false
    ) {
      // KFK.scrLog(
      //   `框选 ${JSON.stringify(KFK.kuangXuanStartPoint)} - ${JSON.stringify(
      //     KFK.kuangXuanEndPoint
      //   )}`
      // );
      KFK.kuangXuan(KFK.kuangXuanStartPoint, KFK.kuangXuanEndPoint);
    }
    if (KFK.lineDragging || KFK.lineMoverDragging || KFK.minimapMouseDown) {
      KFK.duringKuangXuan = false;
    }

    if (KFK.mode === "connect") {
      if (KFK.linkPosNode.length === 1) {
        KFK.lineTemping = true;
        let tmpPoint = {
          x: KFK.scrXToJc3X(KFK.currentMousePos.x),
          y: KFK.scrYToJc3Y(KFK.currentMousePos.y)
        };
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
          { color: "#888888", stroke: 10 }
        );
      }
    }
    if (KFK.mode === "line") {
      if (KFK.linkPosLine.length === 1) {
        KFK.lineTemping = true;
        let tmpPoint = {
          x: KFK.scrXToJc3X(KFK.currentMousePos.x),
          y: KFK.scrYToJc3Y(KFK.currentMousePos.y)
        };
        KFK.svgDrawTmpLine(
          KFK.linkPosLine[0].center.x,
          KFK.linkPosLine[0].center.y,
          tmpPoint.x,
          tmpPoint.y,
          { color: "#888888", stroke: 10 }
        );
      }
    }
    if (KFK.lineDragging && KFK.docIsReadOnly() === false && KFK.lineLocked(KFK.lineToDrag) === false) {
      let realX = KFK.scrXToJc3X(evt.clientX);
      let realY = KFK.scrYToJc3Y(evt.clientY);
      let deltaX = realX - KFK.lineDraggingStartPoint.x;
      let deltaY = realY - KFK.lineDraggingStartPoint.y;
      KFK.lineToDrag.dmove(deltaX, deltaY);
      KFK.lineDraggingStartPoint.x += deltaX;
      KFK.lineDraggingStartPoint.y += deltaY;
    }
  });

  KFK.zoomLevel = 1;
  KFK.addMinimap();
};

KFK.addMinimap = function () {
  KFK.refreshC3event = new CustomEvent("refreshC3");
  KFK.zoomEvent = new CustomEvent("zoomC3");
  $("#minimap").minimap(KFK, KFK.JS1, KFK.JC3, KFK.JC1);
};

KFK.get13Number = function (str) {
  let arr = str.split("");
  let num = 0;
  arr.forEach(ch => {
    num += ch.codePointAt(0);
  });
  num = num % 13;
  return num;
};

KFK.showUserMovingBadge = function (user, x, y) {
  let pos = { x: KFK.scrXToJc1X(x), y: KFK.scrYToJc1Y(y) };
  let bglabel = user.name;


  if (KFK.mouseTimer !== null) {
    clearTimeout(KFK.mouseTimer);
  }
  let consisedUser = { userid: user.userid, name: user.name };
  KFK.mouseTimer = setTimeout(function () {
    KFK.WS.put("MOUSE", { user: consisedUser, pos: pos });
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
  let sc = $('#S1');
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
  }, config.badge.lastSeconds);
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
KFK.selectNode = function (jqDIV) {
  jqDIV.addClass("selected");
  KFK.selectedDIVs.push(jqDIV);
  KFK.setSelectedNodesBoundingRect();
};

KFK.setSelectedNodesBoundingRect = function () {
  let brect = $('.boundingrect');
  if (brect.length <= 0) {
    let rect = document.createElement('div');
    brect = $(rect);
    brect.addClass('boundingrect');
    brect.appendTo(KFK.JC3);
    brect.css('z-index', -1);
  }
  if (KFK.selectedDIVs.length > 1) {
    let rect = KFK.getBoundingRectOfSelectedDIVs();
    brect.css("left", rect.left - config.ui.boundingrect_padding);
    brect.css("top", rect.top - config.ui.boundingrect_padding);
    brect.css(
      "width",
      rect.width + config.ui.boundingrect_padding * 2
    );
    brect.css(
      "height",
      rect.height + config.ui.boundingrect_padding * 2
    );
    brect.show();
  } else {
    brect.hide();
  }
};
KFK.kuangXuan = function (pt1, pt2) {
  KFK.debug('pt1', jstr(pt1), 'pt2', jstr(pt2));
  let x1 = pt1.x + KFK.LeftB;
  let y1 = pt1.y + KFK.TopB;
  let x2 = pt2.x + KFK.LeftB;
  let y2 = pt2.y + KFK.TopB;
  KFK.debug(x1, y1, x2, y2);
  KFK.duringKuangXuan = true;
  let jqRect = $("#selectingrect");
  jqRect.css("left", Math.min(x1, x2));
  jqRect.css("top", Math.min(y1, y2));
  jqRect.css("width", Math.abs(x1 - x2));
  jqRect.css("height", Math.abs(y1 - y2));
  jqRect.show();
};

KFK.endKuangXuan = function (pt1, pt2) {
  let jqRect = $("#selectingrect");
  jqRect.hide();
  let rect = {
    left: Math.min(pt1.x, pt2.x),
    top: Math.min(pt1.y, pt2.y),
    width: Math.abs(pt1.x - pt2.x),
    height: Math.abs(pt1.y - pt2.y)
  };
  rect.right = rect.left + rect.width;
  rect.bottom = rect.top + rect.height;

  while (KFK.selectedDIVs.length > 0) {
    KFK.deselectNode(KFK.selectedDIVs[0]);
  }
  //为防止混乱，框选只对node div有效果
  KFK.JC3
    .find(".kfknode")
    .each((index, div) => {
      let jqDiv = $(div)
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
    KFK.resetPropertyOnMultipleNodesSelected();
  }
};

KFK.deselectNode = function (theDIV, theLine) {
  if (theLine) {
    // this is a line div
    theLine.stroke(config.line.strokeColor);
    theLine.getLayer().batchDraw();
  } else {
    // this is a node div
    $(theDIV).removeClass("selected");
  }
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
  return { x: newX, y: newY };
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
}

KFK.unpx = (v) => {
  if (typeof v === "string" && v.endsWith("px")) {
    return parseInt(v.substr(0, v.length - 2));
  }
}

KFK.ltPos = function (node) {
  return {
    x: node.x - node.width * 0.5,
    y: node.y - node.height * 0.5
  };
}

KFK.getNodeTextAlignment = function (jqDiv) {
  let ret = "left";
  let jcTmp = jqDiv.css("justify-content");
  if (jcTmp === 'flex-start')
    ret = "left";
  else if (jcTmp === "center")
    ret = "center";
  else if (jcTmp === "flex-end")
    ret = "right";

  return ret;
};

KFK.setNodeTextAlignment = function (jqElem, theType, align) {
  if (theType === "textarea") {
    if (align === 'left') {
      jqElem.css("text-align", "justify");
      jqElem.css("text-align-last", "left");
    } else if (align === 'center') {
      jqElem.css("text-align", "justify");
      jqElem.css("text-align-last", "center");
    } else if (align === "right") {
      jqElem.css("text-align", "justify");
      jqElem.css("text-align-last", "right");
    }
  }
};

KFK.editTextNode = function (textnode, theDIV, enterSelect = false) {
  KFK.editting = true;
  theDIV.editting = true;
  textnode.editting = true;
  let oldText = textnode.innerText;
  textnode.style.visibility = "hidden";
  // theDIV.style.background = "transparent";
  var areaPosition = { x: KFK.unpx(theDIV.style.left), y: KFK.unpx(theDIV.style.top) };
  var textarea = null;
  if (theDIV.type === "text") textarea = document.createElement("input");
  else {
    textarea = document.createElement("textarea");
    $(textarea).css("word-wrap", "break-word");
    $(textarea).css("word-break", "break-all");
    $(textarea).css("text-wrap", "unrestricted");
  }
  textarea.style.zIndex = "999";
  KFK.C3.appendChild(textarea);
  textarea.style.position = "absolute";
  textarea.style.top = areaPosition.y + "px";
  textarea.style.left = areaPosition.x + "px";
  $(textarea).width($(theDIV).width());
  $(textarea).height($(theDIV).height());
  textarea.style.borderRadius = theDIV.style.borderRadius;
  textarea.style.color = theDIV.style.color;
  $(textarea).css("background", $(textnode).css("background"));
  textarea.style.justifyContent = theDIV.style.justifyContent;
  textarea.style.fontSize = textnode.style.fontSize;
  textarea.style.borderColor = "#000";
  textarea.style.borderWidth = textnode.style.borderWidth;

  // if ($(textnode).find(".tip_content").length !== 0) {
  // $(textarea).css("padding",  unpx(textnode.style.padding) + unpx($(textnode).find(".tip_content")[0].style.padding));
  // }else{
  // textarea.style.padding = textnode.style.padding;
  // }
  textarea.style.padding = "4px";
  textarea.style.margin = textnode.style.margin;
  textarea.style.overflow = "hidden";
  textarea.style.outline = textnode.style.outline;
  textarea.style.resize = "none";
  textarea.style.transformOrigin = "left top";

  KFK.setNodeTextAlignment($(textarea), "textarea", KFK.getNodeTextAlignment($(theDIV)));
  textarea.style.verticalAlign = "middle";

  textarea.focus();
  textarea.value = oldText;
  textarea.select();

  async function removeTextarea(txtChanged) {
    $(textarea).remove();
    window.removeEventListener("click", handleOutsideClick);
    textnode.style.visibility = "visible";
    KFK.editting = false;
    textnode.editting = false;
    theDIV.editting = false;
    KFK.focusOnC3();
    if (txtChanged) {
      await KFK.syncNodePut("U", $(theDIV), "change text", KFK.fromJQ, false, 0, 1);
    }
  }

  function setTextareaWidth(newWidth) {
    if (!newWidth) {
      // set width for placeholder
      newWidth = KFK.unpx(textnode.style.width);
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
    if (evt.keyCode === 13 && (evt.shiftKey || evt.ctrlKey || evt.metaKey)) {
      textnode.innerText = textarea.value;
      removeTextarea(textarea.value !== oldText);
      KFK.focusOnC3();
    }
    // on esc do not set value back to node
    if (evt.keyCode === 27) {
      removeTextarea(false);
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      KFK.focusOnC3();
    }
    evt.stopImmediatePropagation();
    evt.stopPropagation();
  });

  function handleOutsideClick(evt) {
    if (evt.target !== textarea) {
      textnode.innerText = textarea.value;
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

KFK.placeNode = function (shiftKey, id, type, variant, x, y, w, h, attach) {
  let aNode = new Node(id, type, variant, x, y, w, h, attach);
  KFK.nodes.push(aNode);
  let nodeDIV = KFK._createNode(aNode);
  let jqDIV = $(nodeDIV);
  KFK.justCreatedJqNode = jqDIV;

  return jqDIV;
};

KFK._createNode = function (node) {
  let textPadding = 2;
  let nodeCount = KFK.getKFKNodeNumber();
  var nodeObj = null;
  if (node.type === "image") {
    nodeObj = document.createElement("img");
    nodeObj.src = node.attach;
    nodeObj.style.width = KFK.px(node.width);
    nodeObj.style.height = KFK.px(node.height);
  } else if (["start", "end", "pin"].indexOf(node.type) >= 0) {
    nodeObj = document.createElement("img");
    nodeObj.src = KFK.images[node.type].src;
    nodeObj.style.width = KFK.px(node.width);
    nodeObj.style.height = KFK.px(node.height);
  } else if (node.type === "text") {
    nodeObj = document.createElement("div");
    nodeObj.innerHTML = node.attach ? node.attach : config.node.text.content;
    nodeObj.style.padding = KFK.px(0);
  } else if (node.type === "yellowtip") {
    nodeObj = document.createElement("span");
    nodeObj.innerText = config.node.yellowtip.content;
    $(nodeObj).css("width", "100%");
    $(nodeObj).css("height", "100%");
    $(nodeObj).css("padding", 0);
    $(nodeObj).css("z-index", 1);
    $(nodeObj).css("display", "flex");
    $(nodeObj).css("justify-content", config.node.yellowtip.textAlign);
    $(nodeObj).css("align-items", config.node.yellowtip.vertAlign);
    $(nodeObj).css("position", "absolute");
    $(nodeObj).addClass("tip_content");
  } else if (node.type === "textblock") {
    nodeObj = document.createElement("div");
    nodeObj.innerHTML = node.attach
      ? node.attach
      : config.node.textblock.content;
    // nodeObj.style.width = KFK.px(node.width - textPadding * 2);
    // nodeObj.style.height = KFK.px(node.height - textPadding * 2);
    nodeObj.style.padding = KFK.px(0);
  }
  if (!nodeObj) {
    KFK.debug(`${node.type} is not supported`);
    return;
  }

  let nodeDIV = document.createElement("div");
  let jqNodeDIV = $(nodeDIV);
  nodeDIV.id = node.id;
  nodeDIV.style.position = "absolute";

  nodeDIV.style.top = KFK.px(KFK.ltPos(node).y);
  nodeDIV.style.left = KFK.px(KFK.ltPos(node).x);
  nodeDIV.style.width = KFK.px(node.width);
  nodeDIV.style.height = KFK.px(node.height);
  if (node.type === "text") {
    nodeDIV.style.width = "fit-content";
    nodeDIV.style.height = "fit-content";
  }
  nodeDIV.style.zIndex = `${nodeCount + 1}`;
  nodeDIV.style.padding = "0px";
  if (
    node.type === "text" ||
    node.type === "yellowtip" ||
    node.type === "textblock"
  )
    nodeDIV.style.padding = `${textPadding}px`;
  nodeDIV.style.margin = "0px";
  nodeDIV.style.overflow = "show";
  if (config.node[node.type].background) {
    nodeDIV.style.background = config.node[node.type].background;
  } else {
    nodeDIV.style.background = "transparent";
  }
  // nodeDIV.style.outline = 'none';
  // nodeDIV.style.resize = 'none';
  nodeDIV.style.display = "flex";
  $(nodeDIV).attr("variant", "default");
  //click时，切换selected状态
  if (node.type === "yellowtip") {
    //create tip
    let rect = KFK.getShapeDynamicDefaultSize(
      "yellowtip",
      config.node.yellowtip.defaultTip
    );
    KFK._setTipBkgImage(
      jqNodeDIV,
      config.node.yellowtip.defaultTip,
      config.node.yellowtip.defaultColor
    );
    jqNodeDIV.attr("variant", config.node.yellowtip.defaultTip);
    jqNodeDIV.css("width", rect.w);
    jqNodeDIV.css("height", rect.h);
    jqNodeDIV.css("color", config.node.yellowtip.color);
    jqNodeDIV.addClass("yellowtip");
  } else if (node.type === "textblock") {
    let rect = KFK.getShapeDynamicDefaultSize("textblock", "default");
    jqNodeDIV.css("width", rect.w);
    jqNodeDIV.css("height", rect.h);
    jqNodeDIV.css("border-radius", config.node.textblock.borderRadius);
    jqNodeDIV.css("border-style", config.node.textblock.borderStyle);
    jqNodeDIV.css("border-color", config.node.textblock.borderColor);
    jqNodeDIV.css("border-width", config.node.textblock.borderWidth);
    jqNodeDIV.css("color", config.node.textblock.color);
    jqNodeDIV.css("justify-content", config.node.yellowtip.textAlign);
    jqNodeDIV.css("align-items", config.node.yellowtip.vertAlign);
    jqNodeDIV.css("background-color", KFK.APP.model.shapeBkgColor);
  }
  if (config.node && config.node[node.type] && config.node[node.type].fontSize)
    jqNodeDIV.css("font-size", KFK.px(KFK.unpx(config.node[node.type].fontSize)));
  else if (config.node && config.node.fontSize)
    jqNodeDIV.css("font-size", KFK.px(KFK.unpx(config.node.fontSize)));
  else
    jqNodeDIV.css("font-size", KFK.px(18));

  $(nodeObj).addClass("innerobj");
  // nodeDIV.attr('w', node.width);
  // nodeDIV.attr('h', node.height);
  nodeDIV.appendChild(nodeObj);

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
  jqNodeDIV.attr("edittable", config.node[node.type].edittable ? true : false);
  if (node.type === "yellowtip") {
    KFK._setTipBkgColor(jqNodeDIV, KFK.APP.model.tipBkgColor);
  }

  KFK.C3.appendChild(nodeDIV);

  KFK.setNodeEventHandler(jqNodeDIV);

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

KFK.syncNodePut = async function (cmd, jqDIV, reason, jqFrom, isUndoRedo=false, ser=0, count=1) {
  if (KFK.docIsReadOnly()) return;
  if (KFK.nodeLocked(jqDIV)) return;
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
    let nodeContent = tobeSync.prop("outerHTML");
    let isOffline = tobeSync.hasClass("offline");
    tobeSync.removeClass("offline");

    let payload = {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      etype: 'DIV',
      nodeid: nodeID,
      content: cmd === "D" ? nodeID : KFK.codeToBase64(tobeSync.prop("outerHTML")),
      offline: isOffline,
      lastupdate: tobeSync.attr("lastupdate")
    };
    if (isUndoRedo === false) {
      let fromContent = "";
      let toContent = "";
      let fromId = "";
      let toId = "";
      if (cmd === "U") {
        if (jqFrom && reason !== "offline_not_undoable") {
          // 参数传递过来
          KFK.cleanNodeEventFootprint(jqFrom);
          fromContent = jqFrom.prop("outerHTML");
          fromId = jqFrom.attr("id");
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
            etype: 'DIV',
            from: KFK.opArr_from,
            to: KFK.opArr_to,
            fromId: KFK.opArr_fromId,
            toId: KFK.opArr_toId
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
      svgLine.attr('lastEditor', KFK.APP.model.cocouser.name);
    }
    svgLine.attr('lastupdate', new Date().getTime());
    let isOffline = svgLine.hasClass("offline");
    svgLine.removeClass("offline");
    let svgContent = svgLine.svg();
    svgContent = KFK.codeToBase64(svgContent);
    let payload = {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      etype: 'SLINE',
      nodeid: svgLine.attr("id"),
      content: cmd === "D" ? svgLine.attr("id") : svgContent,
      offline: isOffline,
      lastupdate: svgLine.attr("lastupdate")
    };

    let formContent = toContent = fromId = toId = "";
    switch (cmd) {
      case "C":
        fromContent = ""; fromId = "";
        toContent = svgLine ? svgLine.svg() : "";
        toId = svgLine ? svgLine.attr("id") : "";
        break;
      case "U":
        fromContent = svgFrom ? svgFrom.svg() : "";
        fromId = svgFrom ? svgFrom.attr("id") : "";
        toContent = svgLine ? svgLine.svg() : '';
        toId = svgLine ? svgLine.attr("id") : '';
        break;
      case "D":
        fromContent = svgLine ? svgLine.svg() : '';
        fromId = svgLine ? svgLine.attr("id") : '';
        toContent = ""; toId = "";
        break;
    }
    if (isUndoRedo === false) {
      let opEntry = {
        cmd: cmd,
        etype: 'SLINE',
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
  let docopmenu = $('.docopmenu');
  KFK.APP.setData('model', 'currentDoc', doc);
  if (docopmenu.hasClass('noshow') || index !== KFK.lastDocOpIndex) {
    console.log(evt);
    console.log(evt.pageX, evt.pageY);
    let x = evt.pageX;
    let y = evt.pageY;
    console.log(x, y);
    docopmenu.css({
      'position': "absolute",
      'left': x - 135,
      'top': y - 10,
      'z-index': 999999
    });
    docopmenu.removeClass('noshow');
    KFK.lastDocOpIndex = index;
  } else {
    docopmenu.addClass('noshow');
  }
};

KFK.hideDocOpMenu = function () {
  let docopmenu = $('.docopmenu');
  docopmenu.addClass('noshow');
}

//jqNode can be a node or even a svgline
KFK.anyLocked = function (jqNode) {
  if (jqNode)
    return KFK.docIsReadOnly() || KFK.nodeLocked(jqNode);
  else
    return KFK.docIsReadOnly();
};

KFK.notAnyLocked = function (jqNode) {
  return !KFK.anyLocked(jqNode);
};

KFK.docIsReadOnly = function () {
  return KFK.APP.model.cocodoc.readonly;
};

KFK.nodeLocked = function (jqNode) {
  //Even works for svline, because svg line has .hasClass function as well
  return jqNode.hasClass("lock");
};
KFK.lineLocked = function (svgLine) {
  return svgLine.hasClass("lock");
};


KFK.setModeIndicatorForYellowTip = function (tipvariant) {
  $("#modeIndicatorDiv").empty();
  let svg = $(SVGs[tipvariant]);
  svg.css("width", "18px");
  svg.css("height", "18px");
  svg.appendTo($("#modeIndicatorDiv"));
};

KFK.setTipVariant = function (tipvariant) {
  config.node.yellowtip.defaultTip = tipvariant;
  if (KFK.mode === "yellowtip") {
    KFK.setModeIndicatorForYellowTip(tipvariant);
    $("#modeIndicatorImg").hide();
    $("#modeIndicatorDiv").show();
  }
  let theJqNode = KFK.getPropertyApplyToJqNode();
  if (theJqNode !== null && KFK.notAnyLocked(theJqNode)) {
    let oldColor = KFK.getTipBkgColor(theJqNode);
    theJqNode.attr("variant", tipvariant);
    KFK.setTipBkgImage(theJqNode, tipvariant, oldColor);
  }
};
KFK.setTipBkgImage = async function (jqDIV, svgid, svgcolor) {
  KFK.fromJQ = jqDIV.clone();
  KFK._setTipBkgImage(jqDIV, svgid, svgcolor);
  await KFK.syncNodePut("U", jqDIV, "change bkg image", KFK.fromJQ, false, 0, 1);
};
KFK._setTipBkgImage = function (jqDIV, svgid, svgcolor) {
  jqDIV.find(".tip_bkg").remove();
  let bkgSVG = $(SVGs[svgid]);
  bkgSVG.addClass("tip_bkg");
  bkgSVG.css("width", "100%");
  bkgSVG.css("height", "100%");
  bkgSVG.css("z-index", "-1");
  let svgMainPath = bkgSVG.find(".svg_main_path");
  svgMainPath.attr("fill", svgcolor);
  bkgSVG.appendTo(jqDIV);
};

KFK.setTipBkgColor = async function (theJqNode, bgColor) {
  KFK.fromJQ = theJqNode.clone();
  let ret = KFK._setTipBkgColor(theJqNode, bgColor);
  if (ret)
    await KFK.syncNodePut("U", theJqNode, "change bkg color", KFK.fromJQ, false, 0, 1);
};

KFK._setTipBkgColor = function (theJqNode, bgColor) {
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
      `Can't change main path color. Node type ${theJqNode.attr("nodetype")} id:${theJqNode.attr("id")}   .svg_main_path not found`
    );
    return false;
  }
};
KFK.getTipBkgColor = function (jqNode) {
  if (jqNode === null) {
    console.warn("getTipBkgColor to null nodeDIV, return default");
    return config.node.yellowtip.defaultColor;
  }
  let svgImg = jqNode.find(".tip_bkg .svg_main_path");
  if (svgImg.length > 0) {
    return svgImg.attr("fill");
  } else {
    return config.node.yellowtip.defaultColor;
  }
};

KFK.stringToArray = function (str) {
  let arr = [];
  if (str) {
    arr = str.split(',');
    if (arr.length === 1 && arr[0] === '')
      arr = [];
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
}

KFK.removeConnectById = function (connect_id) {
  try { KFK.svgDraw.find(`.${connect_id}`).remove(); } catch (err) { }
  let triangle_id = connect_id + "_triangle";
  try { KFK.svgDraw.find(`.${triangle_id}`).remove(); } catch (err) { }
};

KFK.redrawLinkLines = function (jqNode, reason = 'unknown', bothside = true) {
  // KFK.debug('Redrawlinks', reason, 'bothside', bothside);
  let myId = jqNode.attr("id");
  let toIds = KFK.getNodeLinkIds(jqNode, 'linkto');
  let list = KFK.svgDraw.find('.connect');
  list.each((connect) => {
    if (connect.attr('fid') === myId) {
      let connect_id = connect.attr("id");
      connect.remove();
      let triangle_id = connect_id + "_triangle";
      KFK.svgDraw.find(`.${triangle_id}`).remove();
    }
  });
  toIds.forEach((toId, index) => {
    if (toId !== myId) {
      let jqTo = $(`#${toId}`);
      KFK.drawPathBetween(jqNode, jqTo);
    }
  });
  if (bothside) {
    KFK.JC3.find('.kfknode').each((index, aNode) => {
      let jqFrom = $(aNode);
      if (jqFrom.attr("id") !== myId) {
        let arr = KFK.stringToArray(jqFrom.attr('linkto'));
        if (arr.indexOf(myId) >= 0)
          KFK.drawPathBetween(jqFrom, jqNode);
      }
    });
  }
};

//resize node时，记下当前shape variant的size，下次创建同样shape时，使用这个size
KFK.setShapeDynamicDefaultSize = function (nodeType, variant, width, height) {
  if (config.size[nodeType] === undefined) config.size[nodeType] = {};
  if (config.size[nodeType][variant] === undefined)
    config.size[nodeType][variant] = {};
  config.size[nodeType][variant].width = width;
  config.size[nodeType][variant].height = height;
};

KFK.getShapeDynamicDefaultSize = function (nodeType, variant) {
  let ret = {};
  if (config.size[nodeType] === undefined) {
    ret = {
      w: config.node[nodeType].width,
      h: config.node[nodeType].height
    };
  } else if (config.size[nodeType][variant] === undefined) {
    ret = {
      w: config.node[nodeType].width,
      h: config.node[nodeType].height
    };
  } else {
    let tmpw = 0;
    let tmph = 0;
    tmpw = config.size[nodeType][variant].width;
    tmph = config.size[nodeType][variant].height;
    ret = {
      w: tmpw,
      h: tmph
    };
  }
  return ret;
};

KFK.setNodeEvent = function (jqNode, action, cmd) {
  if (action === "resizable") {
    if (config.node[jqNode.attr("nodetype")].resizable) {
      jqNode.resizable(cmd);
    }
  } else if (action === "droppable") {
    if (config.node[jqNode.attr("nodetype")].droppable) {
      jqNode.droppable(cmd);
    }
  } else if (action === "draggable") {
    jqNode.draggable(cmd);
  }
};
KFK.setNodeEventHandler = function (jqNodeDIV) {
  jqNodeDIV.addClass("kfknode");
  let jqNodeType = jqNodeDIV.attr("nodetype");
  //resize node
  if (config.node[jqNodeType].resizable) {
    jqNodeDIV.resizable({
      autoHide: true,
      start: () => {
        KFK.fromJQ = jqNodeDIV.clone();
        KFK.resizing = true;
      },
      resize: () => { },
      stop: async () => {
        KFK.debug("Stop Resizing...");
        if (KFK.APP.model.cococonfig.snap) {
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
          jqNodeDIV.css("width", KFK.divWidth(jqNodeDIV) + (newRight - tmpRight));
          jqNodeDIV.css("height", KFK.divHeight(jqNodeDIV) + (newBottom - tmpBottom));
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
        KFK.redrawLinkLines(jqNodeDIV, 'after resize');

        KFK.setSelectedNodesBoundingRect();

        await KFK.syncNodePut("U", jqNodeDIV, "resize node", KFK.fromJQ, false, 0, 1);
      }
    });
  }
  if (config.node[jqNodeType].minWidth) {
    jqNodeDIV.resizable("option", "minWidth", config.node[jqNodeType].minWidth);
  }
  if (config.node[jqNodeType].minHeight) {
    jqNodeDIV.resizable(
      "option",
      "minHeight",
      config.node[jqNodeType].minHeight
    );
  }
  // jqNodeDIV.resizable('disable');

  //drag node
  jqNodeDIV.draggable({
    scroll: true,
    containment: "parent",
    start: (evt, ui) => {
      KFK.fromJQ = jqNodeDIV.clone();
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      KFK.originZIndex = KFK.getZIndex(jqNodeDIV);
      jqNodeDIV.css("z-index", "99999");
      KFK.dragging = true;
      KFK.positionBeforeDrag = {
        x: KFK.divLeft(jqNodeDIV),
        y: KFK.divTop(jqNodeDIV)
      };
    },
    drag: (evt, ui) => { },
    stop: async (evt, ui) => {
      KFK.dragging = false;
      if (KFK.APP.model.cococonfig.snap) {
        let tmpLeft = KFK.divLeft(jqNodeDIV);
        let tmpTop = KFK.divTop(jqNodeDIV);
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
            y: KFK.divTop(jqNodeDIV) - KFK.positionBeforeDrag.y
          };
          for (let i = 0; i < KFK.selectedDIVs.length; i++) {
            let tmpFromJQ = KFK.selectedDIVs[i].clone();
            if (i === index) continue;
            //虽然这出跳过了被拖动的节点，但在后面这个节点一样要被移动
            //因此，所有被移动的节点数量就是所有被选中的节点数量
            KFK.selectedDIVs[i].css("left", KFK.divLeft(KFK.selectedDIVs[i]) + delta.x);
            KFK.selectedDIVs[i].css("top", KFK.divTop(KFK.selectedDIVs[i]) + delta.y);
            await KFK.syncNodePut("U", KFK.selectedDIVs[i], "move following selected", tmpFromJQ, false, movedSer, movedCount);
            movedSer = movedSer + 1;
          }
          for (let i = 0; i < KFK.selectedDIVs.length; i++) {
            KFK.redrawLinkLines(KFK.selectedDIVs[i], "codrag", true);
          }
        } else {
          KFK.debug("will not move other nodes, selectedDIVs", KFK.selectedDIVs.length, " first index", index);
        }
      }

      KFK.afterDragging = true;
      jqNodeDIV.css("z-index", KFK.originZIndex);
      KFK.originZIndex = 1;
      //节点移动后，对连接到节点上的连接线重新划线
      KFK.redrawLinkLines(jqNodeDIV, 'after moving');
      KFK.setSelectedNodesBoundingRect();
      await KFK.syncNodePut("U", jqNodeDIV, "after drag", KFK.fromJQ, false, movedSer, movedCount);
      movedSer = movedSer + 1;
    }
  });
  if (config.node[jqNodeType].droppable) {
    jqNodeDIV.droppable({
      activeClass: "ui-state-hover",
      hoverClass: "ui-state-active",
      accept: ".kfknode",
      drop: async (evt, ui) => {
        //lockMode时可以Marge
        if (KFK.KEYDOWN.ctrl === false && KFK.KEYDOWN.meta === false) return;
        let parent_node_type = jqNodeDIV.attr("nodetype");
        let child_node_type = ui.draggable.attr("nodetype");
        //同种类型可以merge
        if (parent_node_type === child_node_type) {
          // let innerObj = $(`#${jqNodeDIV.attr("id")}`);
          let fromJQ = jqNodeDIV.clone();
          let innerObj = jqNodeDIV.find(".innerobj");
          let oldText = innerObj.html();
          let newText = oldText + ui.draggable.html();
          let jqBig = jqNodeDIV;
          let jqSmall = ui.draggable;
          if (
            KFK.unpx(jqSmall.css("left")) > KFK.unpx(jqBig.css("left")) &&
            KFK.unpx(jqSmall.css("top")) > KFK.unpx(jqBig.css("top")) &&
            KFK.unpx(jqSmall.css("left")) + KFK.unpx(jqSmall.css("width")) <
            KFK.unpx(jqBig.css("left")) + KFK.unpx(jqBig.css("width")) &&
            KFK.unpx(jqSmall.css("top")) + KFK.unpx(jqSmall.css("height")) <
            KFK.unpx(jqBig.css("top")) + KFK.unpx(jqBig.css("height"))
          ) {
            innerObj.html(newText);
            //删掉之前那个被拖动的
            KFK.deleteNode_request(ui.draggable);
            //更新这个被粘贴的
            await KFK.syncNodePut("U", jqNodeDIV, "new text", fromJQ, false, 0, 1);
          }
        }
      }
    });
  }

  jqNodeDIV.hover(
    () => {
      $(document.body).css("cursor", "pointer");
      KFK.hoverJqDiv(jqNodeDIV);
      jqNodeDIV.addClass("shadow1");
      // jqNodeDIV.resizable('enable');
    },
    () => {
      $(document.body).css("cursor", "default");
      jqNodeDIV.removeClass("shadow1");
      // jqNodeDIV.resizable('disable');
      KFK.hoverJqDiv(null);
    }
  );

  //防止点在节点上，以后，画出框选框
  jqNodeDIV.mousedown(evt => {
    KFK.closeActionLog();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
  });
  //click node
  jqNodeDIV.click(evt => {
    if (KFK.inPresentingMode || KFK.inOverviewMode) return;
    KFK.pickedSvgLine = null;
    KFK.afterDragging = false;
    KFK.afterResizing = false;
    if (KFK.mode === "pointer")
      KFK.selectNodesOnClick(jqNodeDIV, evt.shiftKey);
    if (KFK.mode === "connect") {
      if (KFK.afterDragging === false) {
        KFK.yarkLinkNode(jqNodeDIV, evt.shiftKey, '', KFK.FROM_CLIENT);
      } else {
        KFK.afterDragging = true;
      }
      evt.stopImmediatePropagation();
      return;
    }

    KFK.resetPropertyOnMultipleNodesSelected();
    KFK.focusOnNode(jqNodeDIV);

    if (KFK.mode === "lock") {
      KFK.hoverJqDiv(jqNodeDIV);
      KFK.hoverSvgLine(null);
      KFK.tryToLockUnlock(evt.shiftKey);
    }

    evt.stopPropagation();
  });

  jqNodeDIV.dblclick(function (evt) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (KFK.inPresentingMode === true || KFK.inOverviewMode) return;
    KFK.startNodeEditing(jqNodeDIV);
  });
};

KFK.startNodeEditing = function (jqNodeDIV, enterSelect) {
  if (
    getBoolean(jqNodeDIV.attr("edittable")) &&
    KFK.notAnyLocked(jqNodeDIV)
  ) {
    KFK.fromJQ = jqNodeDIV.clone();
    let innerText = el(jqNodeDIV.find(".innerobj"));
    KFK.editTextNode(innerText, el(jqNodeDIV), enterSelect);
  }
}

KFK.divLeft = function (jqDiv) {
  return KFK.unpx(jqDiv.css('left'));
};
KFK.divCenter = function (jqDiv) {
  return KFK.divLeft(jqDiv) + KFK.divWidth(jqDiv) * 0.5;
};
KFK.divRight = function (jqDiv) {
  return KFK.divLeft(jqDiv) + KFK.divWidth(jqDiv);
};
KFK.divTop = function (jqDiv) {
  return KFK.unpx(jqDiv.css('top'));
};
KFK.divMiddle = function (jqDiv) {
  return KFK.divTop(jqDiv) + KFK.divHeight(jqDiv) * 0.5;
};
KFK.divBottom = function (jqDiv) {
  return KFK.divTop(jqDiv) + KFK.divHeight(jqDiv);
};
KFK.divWidth = function (jqDiv) {
  return jqDiv.width();
};
KFK.divHeight = function (jqDiv) {
  return jqDiv.height();
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
    height: KFK.divHeight(jqDiv)
  };
};


KFK.getUnlockedCount = function () {
  let numberOfNotLocked = 0;
  for (let i = 0; i < KFK.selectedDIVs.length; i++) {
    if (KFK.anyLocked(KFK.selectedDIVs[i]) === false) {
      numberOfNotLocked = numberOfNotLocked + 1;
    }
  }
  return numberOfNotLocked;
};


KFK.alignNodes = async function (direction) {
  if (KFK.selectedDIVs.length < 2) return;
  let hasOneLocked = false;
  KFK.selectedDIVs.forEach(aJQ => {
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
          await KFK.syncNodePut("U", jqDIV, "after align center", jqOld, false, movedSer, movedCount);
          movedSer = movedSer + 1;
        }
      }
      break;
    case "right":
      let right = KFK.divRight(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
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
      KFK.selectedDIVs.forEach(aNode => {
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
      KFK.selectedDIVs.forEach(aNode => {
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
      KFK.selectedDIVs.forEach(aNode => {
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
      KFK.selectedDIVs.forEach(aNode => {
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
      KFK.selectedDIVs.forEach(aNode => {
        tmpHoriArr.push(aNode);
      });
      //最左边一个不移动
      tmpHoriArr.splice(tmpHoriArr.indexOf(nodeLeftMost), 1);
      //把除nodeLeftMos之外节点的中间X放入数组
      let centerArr = tmpHoriArr.map(aNode => {
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
      KFK.selectedDIVs.forEach(aNode => {
        totalHeight += KFK.divHeight(aNode);
        let tmp_top = KFK.divTop(aNode);
        if (tmp_top < topMost) {
          nodeTopMost = aNode;
          topMost = tmp_top;
        }
      });
      let nodeAtBottomMost = KFK.selectedDIVs[0];
      let bottomMost = KFK.divBottom(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
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
      KFK.selectedDIVs.forEach(aNode => {
        tmpVertArr.push(aNode);
      });
      //最上面一个不移动
      tmpVertArr.splice(tmpVertArr.indexOf(nodeTopMost), 1);
      let middleArr = tmpVertArr.map(aNode => {
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
          await KFK.syncNodePut("U", jqDIV, "after align right", jqOld, false, movedSer, movedCount);
          movedSer = movedSer + 1;
        }
        posY = newTop + KFK.divHeight(tmpVertArr[index]);
        middleArr.splice(index, 1);
        tmpVertArr.splice(index, 1);
      }
      break;
  }
  KFK.setSelectedNodesBoundingRect();
  KFK.selectedDIVs.forEach(aNode => {
    KFK.redrawLinkLines(aNode, 'align', true);
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

KFK.deleteNode_request = function (jqDIV) {
  KFK.debug("sync D to delete this node " + jqDIV.attr("id"));
  KFK.syncNodePut("D", jqDIV, "delete node", null, false, 0, 1);
}
KFK.deleteNode_exec = function (jqDIV) {
  //删除linkto线条
  let myId = jqDIV.attr("id");
  let toIds = KFK.stringToArray(jqDIV.attr("linkto"));
  toIds.forEach((toId) => {
    let lineClassSelector = `.line_${myId}_${toId}`;
    let triClassSelector = `.line_${myId}_${toId}_triangle`;
    try { KFK.svgDraw.findOne(lineClassSelector).remove(); } catch (err) { } finally { };
    try { KFK.svgDraw.findOne(triClassSelector).remove(); } catch (err) { } finally { };
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
      let lineClassSelector = `.line_${fromId}_${myId}`;
      let triClassSelector = `.line_${fromId}_${myId}_triangle`;
      try { KFK.svgDraw.findOne(lineClassSelector).remove(); } catch (err) { } finally { };
      try { KFK.svgDraw.findOne(triClassSelector).remove(); } catch (err) { } finally { };
    }
    // KFK.removeLinkTo(jqDIV, myId);
    // tmp2 = jqDIV.attr("linkto");
    // if (tmp1 !== tmp2) {
    //   KFK.debug("remove link for ", fromId);
    //   let lineClassSelector = `.line_${fromId}_${myId}`;
    //   let triClassSelector = `.line_${fromId}_${myId}_triangle`;
    //   try { KFK.svgDraw.findOne(lineClassSelector).remove(); }catch(err){} finally { };
    //   try { KFK.svgDraw.findOne(triClassSelector).remove(); }catch(err){} finally { };
    // } else {
    //   KFK.debug(fromId, ' has no link to me');
    // }
  });
  let divid = jqDIV.attr("id");
  let nodetype = jqDIV.attr("nodetype");
  //TODO: 现在没有用image类型了，图片粘贴到textblock里，怎么处理删除远端文件呢？
  if (nodetype === "image") {
    let innerObj = jqDIV.find(".innerobj");
    let imageSrc = innerObj.attr("src");
    let parsed = url.parse(imageSrc);
    let oss_filename = path.basename(parsed.pathname);
    try {
      KFK.OSSClient.delete(parsed.pathname);
    } catch (err) {
      console.error(err);
    }
  }
  //这里是需要再仔细看看的处理的，
  let nodeIndex = KFK.selectedDIVs.indexOf(jqDIV);
  if (nodeIndex >= 0) {
    KFK.selectedDIVs.splice(nodeIndex, 1);
  }


  jqDIV.remove();
};

KFK._deleteLine = function (svgLine) {
  KFK.debug("sync D to delete this node");
  svgLine.attr({ 'stroke-width': svgLine.attr('origin-width') });
  KFK.syncLinePut("D", svgLine, "delete node", null, false);
};

KFK.getNodeIdsFromConnectId = function (cid) {
  let nid = tid = cid;
  nid = nid.substr(nid.indexOf('_') + 1);
  nid = nid.substr(0, nid.indexOf('_'));
  tid = tid.substr(tid.lastIndexOf('_') + 1);
  return [nid, tid];
};
KFK.deleteHoverOrSelectedDiv = async function (evt, cutMode = false) {
  //如果有多个节点被选择，则优先进行多项删除
  if (KFK.selectedDIVs.length > 1) {
    KFK.copyCandidateDIVs = [];
    KFK.debug("delete, selected >1");
    let notLockedCount = 0;
    for (let i = 0; i < KFK.selectedDIVs.length; i++) {
      if (KFK.anyLocked(KFK.selectedDIVs[i]) === false) {
        notLockedCount += 1;
      }
    }
    KFK.debug(`没锁定的节点数量是 ${notLockedCount}, 一共是${KFK.selectedDIVs.length}`);
    if (notLockedCount > 0) {
      let delSer = 0;
      let delCount = notLockedCount;
      for (let i = 0; i < KFK.selectedDIVs.length;) {
        if (KFK.anyLocked(KFK.selectedDIVs[i]) === false) {
          if (cutMode === true)
            KFK.copyCandidateDIVs.push(KFK.selectedDIVs[i]);
          await KFK.syncNodePut("D", KFK.selectedDIVs[i], "delete node", null, false, i, delCount);
          i++;
        }
      }
    }
  } else {
    //没有多项选择时，则进行单项删除
    //首先，先处理鼠标滑过的NODE
    if (KFK.hoverJqDiv()) {
      if (KFK.anyLocked(KFK.hoverJqDiv())) return;
      KFK.copyCandidateDIVs = [KFK.hoverJqDiv().clone()];
      KFK.deleteNode_request(KFK.hoverJqDiv());
      KFK.hoverJqDiv(null);
    } else if (KFK.hoverSvgLine()) {
      //然后，再看鼠标滑过的线条
      if (KFK.anyLocked(KFK.hoverSvgLine())) return;
      KFK.copyCandidateLines = [KFK.hoverSvgLine().clone()];
      KFK._deleteLine(KFK.hoverSvgLine());
      KFK.hoverSvgLine(null);
    } else if (KFK.hoveredConnectId) {
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
      let connect_id = `line_${nid}_${tid}`;
      //Remove ths connect drawing
      KFK.removeConnectById(connect_id);
      //删除一个connect, 则jqFrom被修改
      await KFK.syncNodePut("U", jqFrom, "remove connect", oldJq, false, 0, 1);
      KFK.debug(KFK.hoveredConnectId, nid, tid);
    }
  }
};

KFK.editHoverObject = async function (evt, enterSelect = false) {
  if (KFK.hoverJqDiv()) {
    if (KFK.anyLocked(KFK.hoverJqDiv())) return;
    //回车的evt要组织掉,否则,在textarea.select()时,会导致文字丢失
    evt.preventDefault();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    KFK.startNodeEditing(KFK.hoverJqDiv(), enterSelect);
  }
};

KFK.duplicateHoverObject = async function (evt, action = undefined) {
  KFK.debug("entered duplicateHoverObject");
  if (KFK.docIsReadOnly()) return;
  let offset = { x: 0, y: 0 };
  if (action === "copy") {
    if (KFK.selectedDIVs.length > 1) { //优先多选
      KFK.debug("multiple nodes were selected");
      KFK.copyCandidateDIVs = KFK.selectedDIVs.map(div => {
        return div.clone();
      });
      return true;
    } else if (KFK.getPropertyApplyToJqNode()) { //然后selected
      KFK.copyCandidateDIVs = [KFK.getPropertyApplyToJqNode().clone()];
      KFK.copyCandidateLines = [];
      return true;
    } else if (KFK.hoverSvgLine() && (action === undefined || action === "copy")) {
      KFK.hoverSvgLine().attr({ 'stroke-width': KFK.hoverSvgLine().attr('origin-width') });
      KFK.copyCandidateLines = [KFK.hoverSvgLine().clone()];
      KFK.copyCandidateDIVs = [];
      // KFK.scrLog('对象已复制, 移动鼠标看所需位置再次按META-D或META-V安放')
      //下面这句代码在第一次按META-D时就粘贴了一条,有些不用,
      // await KFK.makeACopyOfLine(KFK.lineToCopy, evt.shiftKey);
      return true;
    } else {
      return false;
    }
  } else if (action === 'paste') {
    if (KFK.copyCandidateDIVs && KFK.copyCandidateDIVs.length > 0) {
      await KFK.makeCopyOfJQs(KFK.copyCandidateDIVs, evt.shiftKey);
    } else if (KFK.copyCandidateLines && KFK.copyCandidateLines.length > 0) {
      await KFK.makeCopyOfLines(KFK.copyCandidateLines, evt.shiftKey);
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
  let offset = { x: 0, y: 0 };
  console.log('past DIVs number', jqstocopy.length);
  console.log('jqstocopy', jqstocopy[0].prop("outerHTML"));
  let theDIV = el(jqstocopy[0]);
  console.log(theDIV.style.left, theDIV.style.top);
  console.log(KFK.divLeft(jqstocopy[0]));

  let startPoint = { x: KFK.divLeft(jqstocopy[0]), y: KFK.divTop(jqstocopy[0]) };
  console.log(startPoint);
  for (let i = 0; i < jqstocopy.length; i++) {
    let oldJqPos = { x: KFK.divLeft(jqstocopy[i]), y: KFK.divTop(jqstocopy[i]) };
    console.log("here1", oldJqPos);
    let deltaX = oldJqPos.x - startPoint.x;
    let deltaY = oldJqPos.y - startPoint.y;
    console.log("here2", deltaX, deltaY);
    let jqNewNode = jqstocopy[i].clone(false);
    jqNewNode.attr("id", KFK.myuid());
    jqNewNode.css("left", KFK.scrXToJc3X(KFK.currentMousePos.x) - parseInt(jqNewNode.css("width")) * 0.5 + deltaX);
    jqNewNode.css("top", KFK.scrYToJc3Y(KFK.currentMousePos.y) - parseInt(jqNewNode.css("height")) * 0.5 + deltaY);
    //按住shift 复制时，也就是META-SHIFT-D, 则保留linkto
    if (!shiftKey) {
      jqNewNode.removeAttr("linkto");
    }
    KFK.cleanNodeEventFootprint(jqNewNode);
    jqNewNode.appendTo(KFK.C3);
    KFK.setNodeEventHandler(jqNewNode);
    if (i === 0)
      KFK.focusOnNode(jqNewNode);
    await KFK.syncNodePut("C", jqNewNode, "duplicate node", null, false, 0, 1);
  }
  return;
};
KFK.makeCopyOfLines = async function (linestocopy) {
  console.log('makeCopyOfLines', linestocopy);
  let startPoint = { x: linestocopy[0].cx(), y: linestocopy[0].cy() };
  console.log('makeCopyOfLines', startPoint);
  for (let i = 0; i < linestocopy.length; i++) {
    let newLine = linestocopy[i].clone();
    let deltaX = linestocopy[i].cx() - startPoint.x;
    let deltaY = linestocopy[i].cy() - startPoint.y;
    console.log(deltaX, deltaY);

    let newline_id = "line_" + KFK.myuid();
    let classes = newLine.classes();
    classes.forEach((className, index) => {
      if (className !== 'kfkline') {
        newLine.removeClass(className);
      }
    });
    newLine.attr("id", newline_id);
    newLine.addClass(newline_id);
    //现在是移动指定位置再次META-D才放置对象,因此offset没用.
    //之前的代码在x,y后面分别加了个20, 以便不覆盖到节点
    //现在第一次点取不马上复制了,+offset已经没有了必要
    newLine.center(KFK.scrXToJc3X(KFK.currentMousePos.x) + deltaX, KFK.scrYToJc3Y(KFK.currentMousePos.y) + deltaY);
    newLine.addTo(KFK.lineToCopy.parent());
    KFK.addSvgLineEventListner(newLine);
    await KFK.syncLinePut("C", newLine, "duplicate line", null, false);
  }
};
KFK.makeACopyOfLine = async function (linetocopy) {
  let newLine = KFK.lineToCopy.clone();

  let newline_id = "line_" + KFK.myuid();
  let classes = newLine.classes();
  classes.forEach((className, index) => {
    if (className !== 'kfkline') {
      newLine.removeClass(className);
    }
  });
  newLine.attr("id", newline_id);
  newLine.addClass(newline_id);
  //现在是移动指定位置再次META-D才放置对象,因此offset没用.
  //之前的代码在x,y后面分别加了个20, 以便不覆盖到节点
  //现在第一次点取不马上复制了,+offset已经没有了必要
  newLine.center(KFK.scrXToJc3X(KFK.currentMousePos.x), KFK.scrYToJc3Y(KFK.currentMousePos.y));
  newLine.addTo(KFK.lineToCopy.parent());
  KFK.addSvgLineEventListner(newLine);
  await KFK.syncLinePut("C", newLine, "duplicate line", null, false);
};

KFK.getBoundingRectOfSelectedDIVs = function () {
  if (KFK.selectedDIVs.length == 0) return;
  let ret = {
    left: KFK.divLeft(KFK.selectedDIVs[0]),
    top: KFK.divTop(KFK.selectedDIVs[0]),
    right: KFK.divRight(KFK.selectedDIVs[0]),
    bottom: KFK.divBottom(KFK.selectedDIVs[0])
  };
  for (let i = 0; i < KFK.selectedDIVs.length; i++) {
    let tmpRect = {
      left: KFK.divLeft(KFK.selectedDIVs[i]),
      top: KFK.divTop(KFK.selectedDIVs[i]),
      right: KFK.divRight(KFK.selectedDIVs[i]),
      bottom: KFK.divBottom(KFK.selectedDIVs[i])
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
    x: pos.x + KFK.LeftB,
    y: pos.y + KFK.TopB
  };
};

KFK.jc3XToJc1X = function (x) {
  return x + KFK.LeftB;
}
KFK.jc3YToJc1Y = function (y) {
  return y + KFK.TopB;
}
KFK.jc1XToJc3X = function (x) {
  return x - KFK.LeftB;
}
KFK.jc1YToJc3Y = function (y) {
  return y - KFK.TopB;
}

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
}
KFK.jc1YToScrY = function (y) {
  return y - KFK.JS1.scrollTop();
}

KFK.saveLocalCocoConfig = function () {
  localStorage.setItem('cococonfig', JSON.stringify(KFK.APP.model.cococonfig));
};
KFK.showGridChanged = function (checked) {
  KFK.APP.model.cococonfig.showgrid = checked;
  if (checked)
    $('#containerbkg').addClass("grid1");
  else
    $('#containerbkg').removeClass("grid1");
  KFK.saveLocalCocoConfig();
};
KFK.showBoundingChanged = function (checked) {
  KFK.APP.model.showbounding = checked;
  if (checked) {
    $('.pageBoundingLine').removeClass('noshow');
  } else {
    $('.pageBoundingLine').addClass('noshow');
  }
  KFK.saveLocalCocoConfig();
};
KFK.snapChanged = function (checked) {
  KFK.APP.model.snap = checked;
  KFK.saveLocalCocoConfig();
};

KFK.toggleShowLock = function (checked) {
  KFK.APP.model.showlock = checked;
  //.locklabel无论是在DIV上,还是在svgline上,下面的代码都起作用, svg真神奇
  if (checked) {
    $('.locklabel').removeClass('noshow');
  } else {
    $('.locklabel').addClass('noshow');
  }
  KFK.saveLocalCocoConfig();
};

KFK.lineCapChanged = function (checked) {
  let theLine = KFK.getPropertyApplyToSvgLine();
  KFK.setLineToRemember(theLine);
  if (theLine === null || KFK.anyLocked(theLine)) return;
  KFK.setLineModel({ linecap: checked });
  theLine.attr({
    "stroke-linecap": checked ? 'round' : 'square',
  });
  KFK.syncLinePut(
    "U",
    theLine,
    "set line color",
    KFK.lineToRemember,
    false
  );
};

KFK.init = async function () {
  if (KFK.inited === true) {
    console.error("KFK.init was called more than once, maybe loadImages error");
    return;
  }
  KFK.debug("Initializing...");

  $("#minimap").removeClass("noshow");
  $("#left_menu").removeClass("noshow");
  /*
  //先不做重新载入,每次进入使用缺省配置可能对培养用户习惯更合适一些
  try {
    let localCocoConfigStr = localStorage.getItem('cococonfig');
    if (localCocoConfigStr) {
      let cococonfig = JSON.parse(localCocoConfigStr);
      if (cococonfig.showgrid !== undefined) {
        KFK.mergeAppData('model.cococonfig', cococonfig);
        if (cococonfig.showgrid === true)
          $('#containerbkg').show();
        else
          $('#containerbkg').hide();
      }
    }
  } catch (error) {
    KFK.error("load local cococonfig found error");
  }
  */
  KFK.initLayout();
  KFK.initC3();
  KFK.initPropertyForm();
  KFK.initLineMover();
  KFK.initColorPicker();
  KFK.showCenterIndicator();
  // clear footprint
  // localStorage.removeItem('cocouser');
  // localStorage.removeItem('cocoprj');
  KFK.showSection({
    sigin: false,
    register: false,
    explorer: false,
    designer: false
  });

  let loadedSvgObjs = {};
  $.each(KFK.APP.tip_groups, (index, group) => {
    let title = group.title;
    let svgHolder = $(group.div);
    let svgs = group.svgs;
    for (let i = 0; i < svgs.length; i++) {
      let span = document.createElement("span");
      let jspan = $(span);
      let name = svgs[i];
      let svgstr = SVGs[name];
      let svgImg = $(svgstr);
      svgImg.css("width", "36px");
      svgImg.css("height", "36px");
      svgImg.css("padding", "2px");
      jspan.css("width", "36px");
      jspan.css("height", "36px");
      jspan.css("padding", "2px");
      jspan.on('mouseover', (evt) => {
        let target = svgImg;
        let svgMainPath = target.find(".svg_main_path");
        if (svgMainPath.length > 0)
          svgMainPath.attr("fill", '#E5DBFF');
        else
          jspan.css('background-color', '#E5DBFF');
      });
      jspan.on('mouseout', (evt) => {
        let target = svgImg;
        let svgMainPath = target.find(".svg_main_path");
        if (svgMainPath.length > 0)
          svgMainPath.attr("fill", '#F7F7C6');
        else
          jspan.css('background-color', '#FFFFFF');
      });
      svgImg.on('click', (evt) => {
        KFK.justCreatedJqNode = null;
        KFK.setMode('yellowtip');
        this.setTipVariant(name);
      });
      svgImg.appendTo(jspan);
      jspan.appendTo(svgHolder);

    }
  })

  KFK.scrLog("欢迎使用在线协作白板", 1000);
  await KFK.checkSession();
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
    KFK.setAppData('model', 'isDemoEnv', (KFK.cocouser.userid.indexOf("@cocopad_demo.org") > 0));
  }
  if (KFK.cocouser && KFK.cocouser.sessionToken) {
    //匿名用户获得临时身份后,会重新进入CheckSession,就也会运行到这里
    //这时,WS.ws已经是处于连接状态的,再次调用WS.start时, ws.js中会重用之前的连接,
    //但是会充值WS.connectTimes为0
    KFK.debug('checksession: LU yes, connect server');
    await WS.start(KFK.onWsConnected, KFK.onWsMsg, KFK.onWsClosed, KFK.onWsReconnect, KFK.onWsGiveup, 100, "checkSession", "KEEP", KFK.wsTryTimesBeforeGiveup);
  } else if (KFK.shareCode) { //没有localUser, but URL中有shareCode
    //两种URL形式都连接WS
    if (KFK.urlMode === 'ivtcode') {
      KFK.debug('checksession: LU no, ivtURL yes,  connect server');
    } else {
      KFK.debug('checksession: LU no, scURL yes, connect server');
    }
    await WS.start(KFK.onWsConnected, KFK.onWsMsg, KFK.onWsClosed, KFK.onWsReconnect, KFK.onWsGiveup, 100, "checkSession", "KEEP", KFK.wsTryTimesBeforeGiveup);
  } else { //no local user, URL中无shareCode
    //读本地存储shareCode
    let localShareCode = localStorage.getItem('shareCode');
    if (localShareCode === null) { //no local user nor local sharecode
      KFK.debug('checksession: LU no, SCURL no, LSC no, goto fresh register');
      KFK.gotoRegister();
      KFK.setAppData('show', 'waiting', false);
    } else { //no local user but has local sharecode
      if (localShareCode.length === 8) { //local sharecode is a ivtcode
        KFK.urlMode = "ivtcode";
        KFK.shareCode = localShareCode;
        KFK.debug('checksession: LU no, SCURL no, LSC no, LIVT yes, goto register');
        KFK.gotoRegister();
        KFK.setAppData('show', 'waiting', false);
      } else { //local sharecod is a sharecode
        KFK.urlMode = "sharecode";
        KFK.shareCode = localShareCode;
        KFK.debug('checksession: LU no, SCURL no, LSC yes, connect server');
        await WS.start(KFK.onWsConnected, KFK.onWsMsg, KFK.onWsClosed, KFK.onWsReconnect, KFK.onWsGiveup, 100, "checkSession", "KEEP", KFK.wsTryTimesBeforeGiveup);
      }
    }
  }
};

KFK.onWsClosed = function () {
  KFK.debug("WS Closed");
};

KFK.onWsGiveup = function () {
  KFK.debug("WS connect giveup");
  KFK.setAppData('show', 'waiting', false);
  $('.reconnect-mask').removeClass('nodisplay');
  $('#reconnect-warning').html('服务器连接失败, 请稍后刷新重试');
};
KFK.onWsReconnect = function () {
  $('.reconnect-mask').removeClass('nodisplay');
  $('#reconnect-warning').html('Reconnecting...');
  KFK.setAppData('show', 'waiting', true);
};
KFK.onWsConnected = function () {
  KFK.WS = WS;
  KFK.info(">>>>>>>>>Connect Times", KFK.WS.connectTimes);
  KFK.setAppData('show', 'waiting', false);
  $('.reconnect-mask').addClass('nodisplay');
  KFK.APP.setData("show", "wsready", true);
  //第一次连接，这条消息会被kj迎回来覆盖，正常
  if (KFK.WS.connectTimes === 1) {
    //The first time
    //这里是第一次启动cocopad，服务器连接成功时的处理方式
    //refreshExplorer会用到很多需要Auth的操作，但shareDocInUrl不需要
    //如果URL中没有ShareCodeInURL
    //正常情况下，会进入到浏览器界面
    if (KFK.cocouser && KFK.cocouser.sessionToken) {
      KFK.sendCmd('UPDMYORG', {});
      if (KFK.shareCode === null) {
        KFK.refreshExplorer();
      } else { //URL中有shareCode或者ivtCode
        if (KFK.cocouser.userid.indexOf("@cocopad_demo.org") < 0) {
          //已经正常注册的用户,不需要有shareCode记录在本地
          localStorage.removeItem("shareCode");
          KFK.debug("正常用户不保存sharecode");
        } else { //如果是demo用户
          //sharecode根据情况,都放一个,这样后面正式注册时,删除
          //docIdInUrl时,这个sharecode与其实际doc_id不符,不过无所谓
          //这样,本地localStorage中的shareCode即可能是个shareCode, 也可能是个ivtcode
          localStorage.setItem('shareCode', KFK.shareCode);
        }
        if (KFK.urlMode === 'sharecode')
          KFK.openSharedDoc(KFK.shareCode);
        else
          KFK.refreshExplorer();
      }
    } else { //no local user
      if (KFK.shareCode === null) { //这个运行不到,因为,只要连接服务器,要么是有本地用户信息,要么有shareCode
        KFK.gotoRegister();
      } else { // has sharecode
        localStorage.setItem('shareCode', KFK.shareCode);
        if (KFK.urlMode === 'sharecode')
          KFK.openSharedDoc(KFK.shareCode);
        else {
          console.log("urMode is ivtcode, go to register");
          KFK.sendCmd('GETINVITOR', {});
          KFK.gotoRegister();
        }
      }
    }
  } else {
    //重新连接
    KFK.debug('>>>>>>>>WS Reconnect success...');
    //TODO: sames like line is not offline marked
    let count = 0;
    $(document)
      .find(".offline")
      .each(async (index, aNodeDIV) => {
        count += 1;
        await KFK.syncNodePut("U", $(aNodeDIV), "offline_not_undoable", null, false, 0, 1);
      });
    KFK.info(`There are ${count} offline nodes `);
    if (count === 0) {
      KFK.debug('cocodoc in storage', JSON.parse(localStorage.getItem('cocodoc')));
      KFK.debug('cocodoc in mem', KFK.APP.model.cocodoc);
      KFK.sendCmd('DOC_ID', { doc_id: KFK.APP.model.cocodoc.doc_id });
    }
  }
};
KFK.rememberLayoutDisplay = function () {
  KFK.layoutRemembered = {
    showbounding: KFK.APP.model.cococonfig.showbounding,
    showgrid: KFK.APP.model.cococonfig.showgrid,
    minimap: KFK.APP.show.section.minimap,
    toplogo: $('#toplogo').css("visibility"),
    docHeaderInfo: $('.docHeaderInfo').css("visibility"),
    rtcontrol: $('#rtcontrol').css("visibility"),
    left: $('#left').css("display"),
    right: $('#right').css("display"),
  }
};
KFK.restoreLayoutDisplay = function () {
  KFK.APP.model.cococonfig.showgrid = KFK.layoutRemembered.showgrid;
  if (KFK.layoutRemembered.showgrid)
    $('#containerbkg').addClass('grid1');
  else
    $('#containerbkg').removeClass('grid1');
  KFK.APP.model.cococonfig.showbounding = KFK.layoutRemembered.showbounding;
  if (KFK.layoutRemembered.showbounding === true)
    $('.pageBoundingLine').removeClass('noshow');
  else
    $('.pageBoundingLine').addClass('noshow');


  KFK.showSection({ minimap: KFK.layoutRemembered.minimap });
  $('#toplogo').css("visibility", KFK.layoutRemembered.toplogo);
  $('.docHeaderInfo').css("visibility", KFK.layoutRemembered.docHeaderInfo);
  $('#rtcontrol').css("visibility", KFK.layoutRemembered.rtcontrol);
  $('#left').css("display", KFK.layoutRemembered.left);
  $('#right').css("display", KFK.layoutRemembered.right);
};
KFK.setLayoutDisplay = function (config) {
  KFK.debug('setlayoutdisplay', JSON.stringify(config));
  KFK.rememberLayoutDisplay();
  if (config.showgrid !== null) {
    KFK.APP.model.cococonfig.showgrid = config.showgrid;
    if (config.showgrid === true)
      $('#containerbkg').addClass('grid1');
    else
      $('#containerbkg').removeClass('grid1');
  }

  if (config.showbounding !== undefined) {
    KFK.APP.model.cococonfig.showbounding = config.showbounding;
    if (config.showbounding === true) {
      $('.pageBoundingLine').removeClass('noshow');
    } else {
      $('.pageBoundingLine').addClass('noshow');
    }
  }

  KFK.showSection({ minimap: config.minimap });
  $('#toplogo').css("visibility", config.toplogo);
  $('.docHeaderInfo').css("visibility", config.docHeaderInfo);
  $('#rtcontrol').css("visibility", config.rtcontrol);
  $('#left').css("display", config.left);
  $('#right').css("display", config.right);
};

KFK.showSection = function (options) {
  let section = $.extend({}, KFK.APP.show.section, options);
  KFK.APP.setData("show", "section", section);
};

KFK.showForm = function (options) {
  let form = $.extend({}, KFK.APP.show.form, options);
  KFK.APP.setData("show", "form", form);
};

KFK.showDialog = function (options) {
  let dialog = $.extend({}, KFK.APP.show.dialog, options);
  KFK.APP.setData("show", "dialog", dialog);
};
KFK.mergeAppData = async (data, key, value) => {
  if (typeof data === 'string' && typeof key === 'string' && typeof value === 'object') {
    let tmpData = $.extend({}, KFK.APP[data][key], value);
    await KFK.APP.setData(data, key, tmpData);
  } else if (typeof data === 'string' && data.indexOf('.') > 0 && typeof key === 'object') {
    let arr = data.split('.');
    let tmpData = $.extend({}, KFK.APP[arr[0]][arr[1]], key);
    await KFK.APP.setData(arr[0], arr[1], tmpData);
  }
};

KFK.setAppData = (data, key, value) => {
  console.log('setAppData', data, key);
  KFK.APP.setData(data, key, value);
};


KFK.openSharedDoc = async function (shareCode) {
  KFK.debug('>>>>>>>>openSharedDoc', shareCode);
  //如果是sharecode, 则去服务器取
  await KFK.refreshDesigner(null, '');
  KFK.debug("send OPENSHAREDDOC ", shareCode);
  setTimeout(function () {
    KFK.sendCmd('OPENSHAREDDOC', { shareCode: shareCode });
  }, 200);
};

//载入文档前的初始化
//如果doc_id, 只初始化,不载入文档. 在用户执行清除文档时,就执行这个操作
KFK.refreshDesigner = async function (doc_id, docpwd) {
  if (doc_id !== null)
    KFK.info('>>>>>>refereshDesigner for doc', doc_id);
  else
    KFK.info('>>>>>>refereshDesigner only, no doc will be load');
  await KFK.readLocalCocoUser();
  KFK.myHide($('.docHeaderInfo'));
  KFK.myHide(KFK.JC3);
  //每次进入Designer, 都会清空内部所有对象
  KFK.JC3.empty();
  //清空以后,先把svgLayer做出来
  KFK.initSvgLayer();

  KFK.opstack.splice(0, KFK.opstacklen);
  KFK.opz = -1;
  KFK.setAppData("model", "actionlog", []);

  KFK.showSection({
    signin: false,
    register: false,
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
  $(".padlayout").fadeIn(1000, function () {
    // Animation complete
  });

  if (doc_id !== null)
    KFK.info(">>>>>>Designer is fully ready, load doc[", doc_id, "] now");
  else
    KFK.info(">>>>>>Designer is fully ready, but no doc load since doc_id not set");
  KFK.currentView = "designer";
  if (doc_id !== null)
    KFK.loadDoc(doc_id, docpwd);
}


KFK.loadDoc = function (doc_id, pwd) {
  KFK.info(">>>>>>loadDoc", doc_id, pwd);
  try {
    let payload = { doc_id: doc_id, pwd: pwd };
    if (KFK.cocouser && KFK.cocouser.sessionToken) {
      if (KFK.docDuringLoading !== null) {
        KFK.debug('docduringloading is not null, cancel loading');
        KFK.cancelLoading = true;
        KFK.JC3.empty();
      }
      KFK.docDuringLoading = doc_id;
      KFK.myHide(KFK.JC3);
      KFK.debug('Open doc normally');
      KFK.sendCmd("OPENDOC", payload);
    } else {
      KFK.debug('Open doc annonymously');
      KFK.sendCmd('OPENANN', payload);
    }

    KFK.showSection({
      signin: false,
      register: false,
      explorer: false,
      designer: true
    });
  } catch (err) {
    console.error(err);
  } finally {
    KFK.inited = true;
  }
};

KFK.refreshExplorer = async function () {
  await KFK.sendCmd("LISTPRJ", { skip: 0 });
}

KFK.setCurrentPrj = function (prj) {
  KFK.APP.setData("model", "cocoprj", prj);
  if (prj.prjid !== "all" && prj.prjid !== 'others' && prj.prjid !== "mine") {
    KFK.APP.setData("model", "lastrealproject", prj);
  }
  localStorage.setItem("cocoprj", JSON.stringify(prj));
};

KFK.clearCurrentProject = function () {
  KFK.APP.setData("model", "cocoprj", { prjid: '', name: '' });
  KFK.APP.setData("model", "lastrealproject", { prjid: '', name: '' });
  localStorage.removeItem("cocoprj");
};
KFK.resetAllLocalData = function (keep = {}) {
  localStorage.removeItem("cocoprj");
  localStorage.removeItem("cocodoc");
  KFK.APP.setData("model", "cocodoc", { doc_id: 'dummydocnotallowed', name: '', prjid: 'dummydocnotallowed', owner: 'dummydocnotallowed', readonly: false });
  if (NotSet(keep.user))
    KFK.APP.setData("model", "cocouser", { userid: '', name: '', avatar: 'avatar-0', avatar_src: null });
  KFK.APP.setData("model", "cocoprj", { prjid: '', name: '' });
  KFK.APP.setData("model", "lastrealproject", { prjid: '', name: '' });
  KFK.APP.setData("model", "prjs", []);
  KFK.APP.setData("model", "docs", []);
  //清除vorgs和 myorgs数据
  if (NotSet(keep.vorgs))
    KFK.APP.setData("model", "vorgs", []);
  if (NotSet(keep.myorgs))
    KFK.APP.setData("model", "myorgs", []);
  KFK.APP.setData("model", "org", { neworg: { name: '', }, newuserid: '', changeorgname: '', });
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
    KFK.sendCmd('ORGUSERLIST', { _id: theorg._id });
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
    KFK.gotoPrjList("在哪个项目中发起协作？", true);
  } else {
    KFK.onPrjSelected = undefined;
    KFK.APP.setData("show", "form", {
      newdoc: true,
      newprj: false,
      prjlist: true,
      doclist: false,
      explorerTabIndex: 1,
      bottomlinks: true
    });
  }
};

KFK.showHelp = function () {
  KFK.info("showHelp not implemented");
};

KFK.gotoSignin = function () {
  // KFK.APP.setData("model", "signin", { userid: "", pwd: "" });
  KFK.setAppData("model", "signInButWaitVerify", false);
  KFK.showSection({
    register: false,
    signin: true,
    explorer: false,
    designer: false
  });
};

KFK.gotoRegister = function () {
  KFK.APP.setData("model", "register", {
    userid: "",
    pwd: "",
    pwd2: "",
    name: "",
    step: 'reg',
    code: '',
  });
  KFK.showSection({
    signin: false,
    register: true,
    explorer: false,
    designer: false
  });
};

KFK.remoteCheckUserId = function (userid) {
  KFK.usefAlreadyExist = false;
  KFK.WS.put("IFEXIST", { userid: userid });
};



KFK.showCreateNewPrj = function () {
  KFK.APP.setData("show", "form", {
    newdoc: false,
    newprj: true,
    prjlist: false,
    doclist: true,
    explorerTabIndex: 0,
    bottomlinks: true
  });
};
KFK.selectPrjTab = function () {
  KFK.APP.setData("show", "form", {
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
    explorerTabIndex: 0,
    bottomlinks: true
  });
};
KFK.onClickOrgTab = async function () {
  //用户第一次进入,或者推出登录(此时,在Signout中,orgTabInitialized会被重置为False),重新进入时
  if (IsFalse(KFK.orgTabInitialized)) {
    //我创建的组织myorg accordion是否为打开状态?
    if (KFK.accordion['myorg']) {
      await KFK.sendCmd('LISTMYORG', {});
    }
    //我加入的组织vorg accordion是否为打开状态?
    if (KFK.accordion['vorg']) {
      await KFK.sendCmd('LISTVORG', {});
    }
    //接下去再点我的组织, 上面if中的过程就不会再执行了
    KFK.orgTabInitialized = true;
  }
};
KFK.gotoExplorerTab = function (tabIndex) {
  KFK.mergeAppData("show.form", { explorerTabIndex: tabIndex });
}
KFK.gotoDocNavTab = function (tabIndex) {
  console.log('gotoDocNavTab', tabIndex);
  KFK.APP.docNavTabIndex = tabIndex;
};

//这里检查是否有project
KFK.showProjects = async function () {
  KFK.showForm({ newdoc: false, newprj: false, prjlist: true, doclist: true });
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
      await KFK.sendCmd("LISTDOC", { prjid: prj.prjid });
    }
  } else {
    await KFK.sendCmd("LISTDOC", { prjid: "all" });
  }
};
KFK.gotoPrjList = function (msg = null, userealprjs = false) {
  let prjs = KFK.APP.model.prjs;
  if (Array.isArray(prjs) === false)
    prjs = [];
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
    explorerTabIndex: 0
  });
  if (KFK.currentView === 'designer') {
    KFK.currentView = "explorer";
    KFK.showSection({ explorer: true, designer: false });
  }
};

KFK.deletePrjItem = function (item, index, button) {
  KFK.APP.$bvModal.msgBoxConfirm('删除项目: [' + item.name + ']', {
    title: '请确认删除', size: 'md', buttonSize: 'sm', okVariant: 'danger',
    okTitle: '确认', cancelTitle: '取消',
    footerClass: 'p-2', hideHeaderClose: false, centered: true
  }).then(isOkay => {
    if (isOkay) { KFK.deletePrj(item.prjid); }
  }).catch(err => { console.error(err.message); })
};

KFK.deleteDocItem = function (item, index, button) {
  KFK.APP.$bvModal.msgBoxConfirm('删除文档: [' + item.name + ']', {
    title: '请确认删除', size: 'sm', buttonSize: 'sm', okVariant: 'danger',
    okTitle: '确认', cancelTitle: '取消',
    footerClass: 'p-2', hideHeaderClose: false, centered: true
  }).then(isOkay => {
    if (isOkay) { KFK.deleteDoc(item._id); }
  }).catch(err => { console.error(err.message); })
};

KFK.sleep = async function (miliseconds) {
  await new Promise(resolve => setTimeout(resolve, miliseconds));
};

KFK.toggleShowHelp = function () {
  KFK.APP.model.showHelp = !KFK.APP.model.showHelp;
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
      pwd: docPwd
    });
  }
};
KFK.createNewPrj = function () {
  let prjName = KFK.APP.model.newprjname;
  if (Validator.validatePrjName(prjName)) {
    KFK.APP.state.newprj.name = true;
    KFK.sendCmd("NEWPRJ", { name: prjName });
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
  setInterval(
    function () {
      if (KFK.updateReceived > 0) {
        KFK.updateReceived = 0;
        KFK.getActionLog();
      }
    },
    5000);
};

KFK.onWsMsg = async function (response) {
  response = JSON.parse(response);
  if (!response.cmd) { return; }
  if (response.payload) { KFK.error("Still has payload response", response.cmd) };
  if (response.cmd === "PING") { KFK.WS.put("PONG", {}); }
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
      KFK.scrLog('你已成功退出共创协同平台');
      KFK.removeCocouser("cocouser");
      KFK.resetAllLocalData();
      KFK.WS.keepFlag = "ONCE";
      KFK.WS.close();
      KFK.gotoSignin();
      break;
    case "ENTER":
      KFK.scrLog(response.name + " 进入协作");
      break;
    case 'RESTRICT':
      KFK.scrLog(response.msg);
      break;
    case "OPENDOC":
      KFK.debug("<<<<OPENDOC");
      if (response.demo) {
        KFK.debug("set isDemoEnv to TRUE. after received OPENDOC");
        KFK.APP.setData('model', 'isDemoEnv', true);
      }
      else {
        KFK.debug("set isDemoEnv to FALSE. after received OPENDOC");
        KFK.APP.setData('model', 'isDemoEnv', false);
      }
      KFK.recreateFullDoc(response.doc, KFK.checkLoading);
      break;
    case "OPENANN":
      let annUser = response.user;
      KFK.updateCocouser(annUser);
      KFK.APP.setData('model', 'isDemoEnv', true);
      KFK.resetAllLocalData();
      setTimeout(() => { KFK.checkSession(); }, 500);
      break;
    case "U":
      KFK.updateReceived++;
      KFK.recreateObject(response.block);
      break;
    case "C":
      KFK.updateReceived++;
      console.log("I received a create message");
      KFK.recreateObject(response.block);
      break;
    case "D":
      KFK.updateReceived++;
      KFK.deleteObject_for_Response(response.block);
      break;
    case "ASKPWD":
      KFK.scrLog("请输入正确的白板密码", 2000);
      KFK.tryToOpenDocId = response.doc_id;
      KFK.showDialog({ inputDocPasswordDialog: true });
      break;
    case "RESETPWD":
      KFK.APP.model.docs.forEach(doc => {
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
      KFK.APP.model.docs.forEach(doc => {
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
      KFK.showDialog({ userPasswordDialog: true });
      break;
    case "NONEXIST":
      KFK.info('Server says document does not exist');
      KFK.setAppData("model", "msgbox", { title: "文档不存在", content: "你要查看的白板文档不存在" });
      KFK.showDialog({ MsgBox: true });
      break;
    case "TGLREAD":
      KFK.APP.model.docs.forEach(doc => {
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
        name: response.prj.name
      };
      KFK.setCurrentPrj(cocoprj);
      KFK.showProjects();
      KFK.gotoPrjList();
      break;
    case 'DELPRJ':
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
        KFK.APP.setData("model", "lastrealproject", { prjid: "", name: "" });
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
      docs.forEach(doc => {
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
        if (doc.acl === 'S') {
          doc.acl_desc = "仅发起人";
        } else if (doc.acl === 'O') {
          doc.acl_desc = "所在组织";
        } else if (doc.acl === 'P') {
          doc.acl_desc = "公开使用";
        }
        if (doc.ownerAvatar !== "") {
          try {
            doc.ownerAvatarSrc = KFK.avatars[doc.ownerAvatar].src;
          } catch (error) {
            console.log("set doc avatar src failed", error.message);
            console.log("doc.ownerAvatar is", doc.ownerAvatar);
          }
        }
      });
      KFK.APP.setData("model", "docs", docs);
      break;
    case "GETBLKOPS":
      let blkops = response.blkops;
      blkops.forEach(blkop => {
        if (blkop.avatar === undefined || blkop.avatar === null || blkop.avatar === "") {
          blkop.avatarSrc = KFK.avatars['avatar-0'].src;
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
      KFK.showSection({ signin: false, register: false, explorer: true, designer: false });
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
      KFK.NodeController.lockline(KFK, KFK.svgDraw.findOne(`.${response.nodeid}`));
      break;
    case "UNLOCKLINE":
      KFK.debug("------------GOT UNLOCKLINE, LOCK IT-----");
      KFK.NodeController.unlockline(KFK, KFK.svgDraw.findOne(`.${response.nodeid}`));
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
      KFK.sendCmd("LISTDOC", { prjid: gotoPrjId });
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
      KFK.scrLog("发起人改变了白板背景颜色")
      KFK.setBGColorTo(response.bgcolor);
      break;
    case 'EMAILSHARE':
    case 'SHARECODE':
      SHARE.onWsMsg(response);
      break;
    case 'UPDUSRORG':
      console.log("Received UPDUSROG", response.data)
      KFK.updateCocouser(response.data);
      break;
    case 'ENTERORG':
      KFK.updateCocouser(response.data);
      //切换组织时, 本地的用户, 已经拉取的vorgs, 以及myorgs不用清空
      KFK.resetAllLocalData({ user: true, vorgs: true, myorgs: true });
      KFK.refreshExplorer();
      break;
    case 'LISTMYORG':
      KFK.debug('got listmyorg', response);
      KFK.APP.model.myorgs = [];
      for (let i = 0; i < response.orgs.length; i++) {
        KFK.APP.model.myorgs.push(Object.assign({}, response.orgs[i]));
      }
      KFK.setAppData('model', 'myorgs', KFK.APP.model.myorgs);
      break;
    case 'LISTVORG':
      KFK.debug('got listvorg', response);
      KFK.APP.model.vorgs = [];
      for (let i = 0; i < response.orgs.length; i++) {
        KFK.APP.model.vorgs.push(Object.assign({}, response.orgs[i]));
      }
      KFK.setAppData('model', 'vorgs', KFK.APP.model.vorgs);
      jlog(KFK.APP.model.vorgs);
      break;
    case 'ORGUSERLIST':
      KFK.debug('got orguserlist', response);
      let tmp = KFK.APP.model.orgusers;
      tmp[response._id] = response.userids;
      KFK.setAppData("model", "orgusers", tmp);
      if (response.toggle === 'TOGGLE')
        KFK.idRowMap[response._id].toggleDetails();
      else {
        KFK.idRowMap[response._id].toggleDetails();
        KFK.idRowMap[response._id].toggleDetails();
      }
      break;
    case 'GETINVITOR':
      KFK.mergeAppData("model.invitor", { userid: response.userid, name: response.name });
      break;
    case 'BOSSLIMIT':
      KFK.setAppData('model', 'readonlyDesc', '只读: 协作者人数超过组织设定的' + response.limit + '人');
      let cocodoc = KFK.APP.model.cocodoc;
      cocodoc.readonly = true;
      KFK.setAppData("model", "cocodoc", cocodoc);
      $("#linetransformer").draggable("disable");
      $('.kfknode').draggable("disabled");
      $('.kfknode').resizable("disabled");
      $('.kfknode').droppable("disabled");
      $("#right").css("display", 'none');
      $("#left").css("display", "none");
      $("#top").toggle("display", "none");
      break;
    case 'SCRLOG':
      KFK.scrLog(response.msg);
      break;
    case 'ERROR':
      KFK.error(response.msg);
      break;
  }
};
KFK.enterOrg = async function (_id) {
  await KFK.sendCmd('ENTERORG', { _id: _id });
};
KFK.deleteOrg = async function (aOrg, name) {
  if (aOrg.grade === 'C') {
    KFK.scrLog('缺省组织不能删除');
    return;
  }
  KFK.APP.$bvModal.msgBoxConfirm('删除组织: [' + name + ']', {
    title: '请确认删除', size: 'sm', buttonSize: 'sm', okVariant: 'danger',
    okTitle: '确认', cancelTitle: '取消',
    footerClass: 'p-2', hideHeaderClose: false, centered: true
  }).then(async (isOkay) => {
    console.log(isOkay);
    if (isOkay) { await KFK.sendCmd('DELETEORG', { _id: aOrg._id }); }
  }).catch(err => { console.error(err.message); })
};

KFK.createNewOrg = async function () {
  let orgname = KFK.APP.model.org.neworg.name;
  if (Validator.validateOrgName(orgname)) {
    await KFK.sendCmd('NEWORG', { name: orgname });
  } else {
    KFK.scrLog("组织名称不符合要求");
  }
}
KFK.addOrgUser = async function (org_id, rowIndex) {
  let jInput = $('#inline-form-input-newuserid-' + rowIndex);
  let newuserid = jInput.val();
  if (Validator.validateUserId(newuserid)) {
    await KFK.sendCmd('ORGUSERADD', { _id: org_id, tobeadd_userid: newuserid })
  } else {
    KFK.scrLog("用户ID格式有误");
  }
};
KFK.changeOrgName = async function (org, rowIndex) {
  let jInput = $('#inline-form-input-changeorgname-' + rowIndex);
  let newName = jInput.val();
  if (Validator.validateOrgName(newName)) {
    await KFK.sendCmd('SETORGNAME', { orgid: org.orgid, name: newName, cocouser_orgid: KFK.APP.model.cocouser.orgid });
  } else {
    KFK.scrLog("新名字不符合要求");
  }
};
KFK.deleteOrgUser = function (org, orguser, index, evt) {
  KFK.sendCmd("ORGUSERDEL", { _id: org._id, orgid: org.orgid, memberid: orguser.userid });
};

KFK.toggleAccordionEnteredOrg = async function () {
  if (KFK.accordion['vorg'] === undefined ||
    KFK.accordion['vorg'] === false) {
    KFK.accordion['vorg'] = true;
    await KFK.sendCmd('LISTVORG', {});
  } else {
    KFK.accordion['vorg'] = false;
  }
};

KFK.toggleAccordionMyOrg = async function () {
  if (KFK.accordion['myorg'] === undefined ||
    KFK.accordion['myorg'] === false) {
    KFK.accordion['myorg'] = true;
    await KFK.sendCmd('LISTMYORG', {});
  } else {
    KFK.accordion['myorg'] = false;
  }
};


KFK.signout = async function () {
  await KFK.sendCmd("SIGNOUT", { userid: KFK.APP.model.cocouser.userid });
};

KFK.getInvitationUrl = function () {
  if (KFK.APP.model.cocouser.ivtcode === null) {
    return '';
  } else {
    let jloc = $(location);
    return jloc.attr('protocol') + "//" + jloc.attr('host') + "/r/" + KFK.APP.model.cocouser.ivtcode;
  }
};

KFK.updateCocouser = function (data) {
  let oldCocouser = KFK.APP.model.cocouser;
  let cocouser = $.extend({}, oldCocouser, data);
  if (cocouser.avatar === 'avatar-temp')
    cocouser.avatar_src = KFK.images[cocouser.avatar].src;
  else
    cocouser.avatar_src = KFK.avatars[cocouser.avatar].src;
  localStorage.setItem("cocouser", JSON.stringify(cocouser));
  KFK.APP.setData("model", "cocouser", cocouser);
  KFK.cocouser = cocouser;
  KFK.debug('>>>> updateCocouser to ', cocouser.userid);
};
KFK.removeCocouser = function () {
  localStorage.removeItem("cocouser");
  KFK.APP.setData("model", "cocouser", { userid: '', name: '', avatar: 'avatar-0', avatar_src: null });
}
KFK.readLocalCocoUser = async function () {
  let cuinls = localStorage.getItem('cocouser');
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
  await KFK.sendCmd("DELPRJ", { prjid: prjid });
};

KFK.msgOK = function () {
  KFK.showSection({
    sigin: false,
    register: false,
    explorer: true,
    designer: false
  });
  KFK.gotoDocs();
};

KFK.deleteDoc = async function (doc_id) {
  let payload = { doc_id: doc_id };
  await KFK.sendCmd("DELDOC", payload);

};

KFK.setDocReadonly = async function (doc) {
  KFK.sendCmd("TGLREAD", { doc_id: doc._id });
};

KFK.gotoLastRealProject = function () {
  if (NotBlank(KFK.APP.model.lastrealproject.prjid)) {
    // KFK.APP.docNavTabIndex = 3;
    KFK.gotoPrj(KFK.APP.model.lastrealproject.prjid, KFK.APP.model.lastrealproject.name)
  } else {
    KFK.APP.model.docs = [];
    KFK.scrLog("尚没有选定的项目", 1000);
  }
};

KFK.gotoPrj = async function (prjid, name) {
  try {
    let cocoprj = { prjid: prjid, name: name };
    KFK.setCurrentPrj(cocoprj);
    await KFK.sendCmd("LISTDOC", { prjid: prjid });
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
        explorerTabIndex: 1
      });
    }
  } catch (error) {
    console.error("gotoPrj found error", error.message);
  }
};
KFK.gotoRecent = function () {
  KFK.APP.docNavTabIndex = 2;
  KFK.gotoPrj('all', '最近访问的');
};
KFK.gotoDocs = async function () {
  console.log('KFK.loadedProjectIdl', KFK.loadedProjectId);
  if (KFK.loadedProjectId === null) {
    KFK.gotoRecent();
  }
  console.log(KFK.APP.docNavTabIndex);
  console.log("[" + KFK.APP.model.lastrealproject.prjid + "]");
};

KFK.pickPrjForCreateDoc = function () {
  KFK.onPrjSelected = KFK.showCreateNewDoc;
  KFK.gotoPrjList("在哪个项目中发起协作？", true);
};
KFK.prjRowClickHandler = function (record, index) {
  KFK.APP.docNavTabIndex = 3;
  KFK.gotoPrj(record.prjid, record.name);
};

KFK.sendCmd = async function (cmd, payload) {
  if (KFK.WS === null) {
    KFK.warn('sendCmcd when KFK.WS is null. cmd is', cmd, 'payload is', payload);
  } else
    await KFK.WS.put(cmd, payload);
};

KFK.docRowClickHandler = async function (doc, index) {
  if (KFK.getAclAccessable(doc)) {
    if (doc.pwd === "*********") {
      KFK.APP.setData("model", "opendocpwd", "");
      KFK.showDialog({ inputDocPasswordDialog: true });
      KFK.tryToOpenDocId = doc._id;
    } else {
      await KFK.refreshDesigner(doc._id, "");
    }
  } else {
    KFK.showNotAclAccessable();
  }
};

//这个时候,在服务端
//client: checcksession , openSharedDoc -> server: this is a annoy user-> server: Annymouse User open doc->OpenANN to set local session to a temp user
//-> on client side got OPENANNY -> record temp uer -> checksession again
//-> openharedDoc again -> sever: is a temp uer, then OpenDoc -> ASKPWD? (yes)
//-> input passwd, then come to here
KFK.getDocPwd = async function () {
  KFK.APP.setData("model", "passwordinputok", "ok");
  await KFK.refreshDesigner(KFK.tryToOpenDocId, KFK.APP.model.opendocpwd);
};
KFK.cancelDocPwd = function () {
  KFK.APP.setData("model", "passwordinputok", "cancel");
  KFK.gotoRecent();
};
KFK.onDocPwdHidden = function (bvModalEvt) {
  //这个值初始为show,这样，不运行点对话框外部，把对话框隐藏起来
  if (KFK.APP.model.passwordinputok === "show") bvModalEvt.preventDefault();
};

KFK.showResetPwdModal = function (item) {
  KFK.tryToResetPwdDoc = item;
  KFK.APP.setData("model", "docOldPwd", "");
  KFK.APP.setData("model", "docNewPwd", "");
  KFK.showDialog({ resetDocPasswordDialog: true });
};

KFK.showRemovePwdModal = function (item, index, button) {
  KFK.tryToRemovePwdDoc = item;
  KFK.APP.setData("model", "inputUserPwd", "");
  KFK.showDialog({ userPasswordDialog: true });
};

KFK.toggleFromResetToRemovePwd = function () {
  KFK.tryToRemovePwdDoc = KFK.tryToResetPwdDoc;
  KFK.APP.setData("model", "inputUserPwd", "");
  KFK.showDialog({ resetDocPasswordDialog: false, userPasswordDialog: true });
};

KFK.removeDocPwd = function () {
  let payload = {
    doc_id: KFK.tryToRemovePwdDoc._id,
    userid: KFK.cocouser.userid,
    pwd: KFK.APP.model.inputUserPwd
  };
  KFK.sendCmd("REMOVEPWD", payload);
};

KFK.resetDocPwd = function () {
  let payload = {
    doc_id: KFK.tryToResetPwdDoc._id,
    oldpwd: KFK.APP.model.docOldPwd ? KFK.APP.model.docOldPwd : "",
    newpwd: KFK.APP.model.docNewPwd ? KFK.APP.model.docNewPwd : ""
  };
  KFK.sendCmd("RESETPWD", payload);
};


KFK._onDocFullyLoaded = async function () {
  KFK.myFadeIn($('.docHeaderInfo'));
  KFK.docDuringLoading = null;
  // KFK.JC3.removeClass("noshow");
  KFK.APP.setData("model", "docLoaded", true);
  if (KFK.APP.model.cocodoc.readonly) {
    $("#linetransformer").draggable("disable");
    $("#right").toggle("slide", { duration: 100, direction: "right" });
    $("#left").toggle("slide", { duration: 100, direction: "left" });
    $("#top").toggle("slide", { duration: 100, direction: "left" });
  } else {
    $("#linetransformer").draggable("enable");
  }
  KFK.JC3.find('.kfknode').each((index, node) => {
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
        jqNode.removeAttr('linkto');
      } else {
        jqNode.attr('linkto', arr.join(','));
      }
    }
    KFK.redrawLinkLines(jqNode, ' after designer ready', false);
  });
  // KFK.info('ondocFullyLoaded, doc is', KFK.APP.model.cocodoc);
  KFK.C3.dispatchEvent(KFK.refreshC3event);
  KFK.myFadeOut($('.loading'));
  KFK.myFadeIn(KFK.JC3, 100);
  $('#overallbackground').removeClass('grid1');
  //focusOnC3会导致C3居中
  KFK.focusOnC3();
  //因此,这里再重新滚动一下.这样保证在文档新导入时,可以滚动到第一屏
  KFK.scrollToPos({ x: KFK.LeftB, y: KFK.TopB });
};

KFK.checkLoading = async function (num) {
};

KFK.recreateFullDoc = async function (objects, callback) {
  KFK.cancelLoading = false;
  KFK.myShow($('.loading'));
  await KFK.sleep(10);
  for (let i = 0; i < objects.length; i++) {
    if (KFK.cancelLoading) {
      KFK.myHide($('.loading'));
      KFK.JC3.empty();
      KFK.cancelLoading = false;
      break;
    } else {
      if (KFK.currentView === 'designer') {
        KFK.myShow($('.loading'));
      } else {
        KFK.myHide($('.loading'));
      }
      KFK.recreateObject(objects[i], callback);

      let progress = Math.round(i / objects.length * 100);
      let strprogress = (progress < 10) ? `0${progress}` : `${progress}`;
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
  if (obj.etype === 'document') {
    KFK.recreateDoc(obj, callback);
  } else if (obj.etype === 'DIV') {
    KFK.recreateNode(obj, callback);
  } else if (obj.etype === 'SLINE') {
    KFK.recreateSLine(obj, callback);
  } else {
    KFK.error('Unknow etype, guess it');
    let tmpHtml = KFK.base64ToCode(obj.html);
    KFK.detail(tmpHtml);
    if (
      tmpHtml.indexOf('nodetype') > 0 &&
      tmpHtml.indexOf('edittable') > 0 &&
      tmpHtml.indexOf('kfknode') > 0
    ) {
      obj.etype = 'DIV';
      KFK.recreateNode(obj, callback);
    }
  }
};
KFK.getContrastYIQ = function (hexcolor) {
  if (hexcolor.startsWith('#') && hexcolor.length === 7)
    hexcolor = hexcolor.substr(1);
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}
KFK.recreateDoc = function (obj, callback) {
  let html = obj.html;
  try {
    let docRet = html;
    docRet.ownerAvatar_src = KFK.avatars[docRet.ownerAvatar].src;
    KFK.debug('recreateDoc()', docRet);
    KFK.APP.setData("model", "cocodoc", docRet);
    KFK.setAppData('model', 'readonlyDesc', (docRet.readonlyReason === 'OWNER' ? '只读: 白板发起人设置为只读' :
      docRet.readonlyReason.startsWith('BOSS') ? '只读: 协作者人数超过组织设定的' + docRet.readonlyReason.substr(4) + '人' : ''));
    if (docRet.bgcolor !== undefined) {
      KFK.setBGColorTo(docRet.bgcolor);
      $("#cocoBkgColor").spectrum("set", docRet.bgcolor);

      let contractColor = KFK.getContrastYIQ(docRet.bgcolor.substr(1));
      console.log("SET BGCOLOR TO", docRet.bgcolor, contractColor);
      $('.docname').css('color', contractColor);
      $('.loading').css('color', contractColor);
      $('.docpeople').css('color', contractColor);
    }
    localStorage.setItem("cocodoc", JSON.stringify(docRet));
  } catch (err) {
    console.error(err);
  } finally {
    if (callback) callback(1);
  }
};
KFK.recreateSLine = function (obj, callback) {
  try {
    let isALockedNode = false;
    let html = obj.html;
    if (html.startsWith("[LOCK]")) {
      isALockedNode = true;
      html = html.substring(6);
    }
    let content = KFK.base64ToCode(html);
    let line_id = obj.nodeid;
    let theLine = KFK.restoreSvgLine(line_id, content);
    if (isALockedNode) {
      KFK.NodeController.lockline(KFK, theLine);
    } else {
      KFK.NodeController.unlockline(KFK, theLine);
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (callback) callback(1);
  }
};
KFK.recreateNode = function (obj, callback) {
  try {
    let isALockedNode = false;
    let html = obj.html;
    if (html.startsWith("[LOCK]")) {
      isALockedNode = true;
      html = html.substring(6);
    }
    html = KFK.base64ToCode(html);

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
        KFK.setNodeEventHandler(jqDIV);
        if (isALockedNode) {
          // KFK.debug('is a locked');
          KFK.NodeController.lock(jqDIV);
        }
      }
      KFK.redrawLinkLines(jqDIV, 'server update');
    }
  } catch (error) {
    KFK.error(error);
  } finally {
    if (callback) callback(1);
    KFK.C3.dispatchEvent(KFK.refreshC3event);
  }
};

KFK.deleteObject_for_Response = function (obj) {
  try {
    if (obj.etype === 'DIV') {
      let tobeDelete = $(`#${obj.nodeid}`);
      if (tobeDelete.length <= 0)
        console.warn("Sync delete", obj.nodeid, "does not exist");
      else
        KFK.deleteNode_exec(tobeDelete);
    } else if (obj.etype === 'SLINE') {
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
}

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
  if (KFK.hoverJqDiv() !== null) {
    return KFK.hoverJqDiv();
  } else if (KFK.lastFocusOnJqNode != null) {
    return KFK.lastFocusOnJqNode;
  } else if (KFK.justCreatedJqNode != null) {
    return KFK.justCreatedJqNode;
  } else {
    return null;
  }
};
KFK.getPropertyApplyToSvgLine = function () {
  if (KFK.hoverSvgLine() != null) {
    return KFK.hoverSvgLine();
  } else if (KFK.pickedSvgLine != null) {
    return KFK.pickedSvgLine;
  } else if (KFK.justCreatedSvgLine != null) {
    return KFK.justCreatedSvgLine;
  } else {
    return null;
  }
};

KFK.setLineModel = function (options) {
  let setting = $.extend({}, KFK.APP.model.line, options);
  KFK.APP.setData("model", "line", setting);
}
KFK.changeBorderRadius = async function (radius) {
  let jqNode = KFK.getPropertyApplyToJqNode();
  if (jqNode != null && KFK.notAnyLocked(jqNode)) {
    KFK.fromJQ = jqNode.clone();
    jqNode.css("border-radius", radius);
    await KFK.syncNodePut("U", jqNode, "set border radius", KFK.fromJQ, false, 0, 1);
  }
};
KFK.changeToTransparent = async function () {
  let jqNode = KFK.getPropertyApplyToJqNode();
  if (jqNode != null && KFK.notAnyLocked(jqNode)) {
    KFK.fromJQ = jqNode.clone();
    jqNode.css("background-color", "transparent");
    jqNode.css("border-color", "transparent");
    await KFK.syncNodePut("U", jqNode, "set border radius", KFK.fromJQ, false, 0, 1);
  }
};
KFK.setWritingMode = async function (wmode) {
  let jqNode = KFK.getPropertyApplyToJqNode();
  if (NotSet(jqNode) || KFK.anyLocked(jqNode)) return;
  KFK.fromJQ = jqNode.clone();
  jqNode.css("writing-mode", wmode);
  await KFK.syncNodePut("U", jqNode, "set font writing-mode", KFK.fromJQ, false, 0, 1);
};
KFK.initPropertyForm = function () {
  KFK.debug('...initPropertyForm');
  let spinnerFontSize = $("#spinner_font_size").spinner({
    min: 8,
    max: 100,
    step: 1,
    start: 18,
    spin: async function (evt, ui) {
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("font-size", KFK.px(ui.value));
        await KFK.syncNodePut("U", jqNode, "set font size", KFK.fromJQ, false, 0, 1);
      }
    }
  });
  spinnerFontSize.spinner("value", 18);
  $("#spinner_font_size").height("6px");
  let spinnerBorderWidth = $("#spinner_border_width").spinner({
    min: 0,
    max: 20,
    step: 1,
    start: 1,
    spin: async function (evt, ui) {
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("border-width", ui.value);
        jqNode.css("border-style", "solid");
        await KFK.syncNodePut("U", jqNode, "set border width", KFK.fromJQ, false, 0, 1);
      }
    }
  });
  spinnerBorderWidth.spinner("value", 0);
  $("#spinner_border_width").height("6px");

  let spinnerBorderRadius = $("#spinner_border_radius").spinner({
    min: 0,
    max: 200,
    step: 1,
    start: 20,
    spin: async function (evt, ui) {
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("border-radius", ui.value);
        await KFK.syncNodePut("U", jqNode, "set border radius", KFK.fromJQ, false, 0, 1);
      }
    }
  });
  spinnerBorderRadius.spinner("value", 20);
  $("#spinner_border_radius").height("6px");

  let spinnerLineWidth = $("#spinner_line_width").spinner({
    min: 1,
    max: 1000,
    step: 1,
    start: 1,
    spin: async function (evt, ui) {
      let theLine = KFK.getPropertyApplyToSvgLine();
      if (theLine === null || KFK.anyLocked(theLine)) return;
      KFK.setLineModel({ width: ui.value });
      theLine.attr({
        "stroke-width": ui.value,
        "origin-width": ui.value
      });
      await KFK.syncLinePut(
        "U",
        theLine,
        "set line color",
        KFK.lineToRemember,
        false
      );
      KFK.setLineToRemember(theLine);
    }
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
        Arial: { category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        "Courier New": { category: "monospace", variants: "400,400i,600,600i,900,900i" },
        Georgia: { category: "serif", variants: "400,400i,600,600i,900,900i" },
        Tahoma: { category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        "Times New Roman": { category: "serif", variants: "400,400i,600,600i,900,900i" },
        "Trebuchet MS": {
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i"
        },
        Verdana: { category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        SimSun: { label:'宋体简', category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        SimHei: { label: '黑体简', category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        "Microsoft Yahei": {
          label: '微软雅黑',
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i"
        },
        KaiTi: { label: '楷体', category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        FangSong: { label: '仿宋', category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        STHeiti: { label: '黑体繁', category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        "Hanzipen SC": {
          label: '钢笔手写体',
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i"
        },
        "Hannotate SC": {
          label: '手札体',
          category: "sans-serif",
          variants: "400,400i,600,600i,900,900i"
        },
        "Xingkai SC": { label: '行楷', category: "sans-serif", variants: "400,400i,600,600i,900,900i" },
        "Yuanti SC": { label: '圆体', category: "sans-serif", variants: "400,400i,600,600i,900,900i" }
      }
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
        fontStyle: italic ? "italic" : "normal"
      };

      //set font

      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css(css);
        await KFK.syncNodePut("U", jqNode, "set node font", KFK.fromJQ, false, 0, 1);
      }

      KFK.focusOnC3();
    });
  $("input.fonts-selector").height(12);
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

KFK.setBGColorTo = function (color) {
  $('#containerbkg').css('background-color', color);
  $('#overallbackground').css('background-color', color);
};

KFK.initColorPicker = function () {
  KFK.debug('...initColorPicker');
  $("#cocoBkgColor").spectrum({
    type: "color",
    color: KFK.APP.model.cococonfig.bgcolor,
    localStorageKey: "color.cocoBkgColor",
    showPaletteOnly: "true",
    togglePaletteOnly: "true",
    hideAfterPaletteSelect: "true",
    showInitial: "true",
    showButtons: "false",
    change: function (color) {
      //发起人可以设置所有人的bgcolor
      try {
        var hex = color.toHexString();
        console.log(hex);
        if (KFK.APP.model.cocodoc.owner === KFK.APP.model.cocouser.userid)
          KFK.sendCmd('SETBGCOLOR', { doc_id: KFK.APP.model.cocodoc.doc_id, bgcolor: hex });
        else {
          //非发起人只能设置当前自己的
          KFK.setBGColorTo(hex);
        }

        let contractColor = KFK.getContrastYIQ(hex.substr(1));
        $('.docname').css('color', contractColor);
        $('.loading').css('color', contractColor);
        $('.docpeople').css('color', contractColor);

      } catch (error) {
        console.error(error);
      }
    }
  });
  $("#shapeBkgColor").spectrum({
    type: "color",
    color: config.node.textblock.background,
    localStorageKey: "color.shapeBkgColor",
    showPaletteOnly: "true",
    togglePaletteOnly: "true",
    hideAfterPaletteSelect: "true",
    showInitial: "true",
    showButtons: "false",
    change: async function (color) {
      var hex = color.toHexString();
      KFK.APP.setData("model", "shapeBkgColor", hex);
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode !== null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("background-color", hex);
        await KFK.syncNodePut("U", jqNode, "set node bg color", KFK.fromJQ, false, 0, 1);
      }
    }
  });
  $("#shapeBorderColor").spectrum({
    type: "color",
    localStorageKey: "color.shapeBorderColor",
    showPaletteOnly: "true",
    togglePaletteOnly: "true",
    hideAfterPaletteSelect: "true",
    showInitial: "true",
    showButtons: "false",
    change: async function (color) {
      var hex = color.toHexString();
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("border-color", hex);
        await KFK.syncNodePut("U", jqNode, "set node border-color", KFK.fromJQ, false, 0, 1);
      }
    }
  });
  $("#lineColor").spectrum({
    type: "color",
    localStorageKey: "color.lineColor",
    showPaletteOnly: "true",
    togglePaletteOnly: "true",
    hideAfterPaletteSelect: "true",
    showInitial: "true",
    showButtons: "false",
    change: async function (color) {
      var hex = color.toHexString();
      let theLine = KFK.getPropertyApplyToSvgLine();
      if (theLine === null || KFK.anyLocked(theLine)) return;
      theLine.attr("stroke", hex);
      KFK.setLineModel({ color: hex });
      await KFK.syncLinePut(
        "U",
        theLine,
        "set line color",
        KFK.lineToRemember,
        false
      );
      KFK.setLineToRemember(theLine);
    }
  });
  $("#fontColor").spectrum({
    type: "color",
    localStorageKey: "color.fontColor",
    showPaletteOnly: "true",
    togglePaletteOnly: "true",
    hideAfterPaletteSelect: "true",
    showInitial: "true",
    showButtons: "false",
    change: async function (color) {
      var hex = color.toHexString();
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("color", hex);
        await KFK.syncNodePut("U", jqNode, "set color", KFK.fromJQ, false, 0, 1);
      }
    }
  });
  $("#tipBkgColor").spectrum({
    type: "color",
    color: "#FEF2D0",
    localStorageKey: "color.tipBkgColor",
    showPaletteOnly: "true",
    togglePaletteOnly: "true",
    hideAfterPaletteSelect: "true",
    showInitial: "true",
    showButtons: "false",
    change: async function (color) {
      var hex = color.toHexString();
      KFK.APP.setData("model", "tipBkgColor", hex);
      let theJqNode = KFK.getPropertyApplyToJqNode();
      if (theJqNode != null && KFK.notAnyLocked(theJqNode)) {
        KFK.fromJQ = theJqNode.clone();
        KFK.setTipBkgColor(theJqNode, hex);
        await KFK.syncNodePut("U", theJqNode, "set tip bkg color", KFK.fromJQ, false, 0, 1);
      }
    }
  });
};

KFK.textAlignChanged = async function (evt, value) {
  let alignInfo = $("#textAlign").val();
  let jqNode = KFK.getPropertyApplyToJqNode();
  KFK.setAlignmentDirectly(jqNode, alignInfo);
  KFK.focusOnC3();
};
KFK.toggleCustomShape = function (evt) {
  if ($('.customcontrol').hasClass('btn_collapse')) {
    $('.customcontrol').removeClass('btn_collapse');
    $('.customcontrol').addClass('btn_expand');
    KFK.rememberWhich = [];
    if (KFK.APP.show.customshape === true) {
      KFK.APP.setData('show', 'customshape', false);
      KFK.rememberWhich.push("customshape");
    } if (KFK.APP.show.customfont === true) {
      KFK.APP.setData('show', 'customfont', false);
      KFK.rememberWhich.push("customfont");
    } if (KFK.APP.show.customline == true) {
      KFK.APP.setData('show', 'customline', false);
      KFK.rememberWhich.push("customline");
    }
  } else {
    $('.customcontrol').removeClass('btn_expand');
    $('.customcontrol').addClass('btn_collapse');
    for (let i = 0; i < KFK.rememberWhich.length; i++) {
      KFK.APP.setData('show', KFK.rememberWhich[i], true);
    }
  }
};

KFK.setAlignmentDirectly = async function (jqNode, alignInfo) {
  if (jqNode != null && KFK.notAnyLocked(jqNode)) {
    KFK.fromJQ = jqNode.clone();
    if (jqNode.find(".tip_content").length !== 0) {
      jqNode.find(".tip_content").css("justify-content", alignInfo);
      jqNode.find(".tip_content").css("text-align-last",
        alignInfo === 'flex-start' ? 'left' : alignInfo === 'flex-end' ? 'right' : 'center');
    } else {
      jqNode.css("justify-content", alignInfo);
      jqNode.css("text-align-last",
        alignInfo === 'flex-start' ? 'left' : alignInfo === 'flex-end' ? 'right' : 'center');
    }
    await KFK.syncNodePut("U", jqNode, "set text alignment", KFK.fromJQ, false, 0, 1);
  }
};

KFK.vertAlignChanged = async function (evt, value) {
  let valignInfo = $("#vertAlign").val();
  let jqNode = KFK.getPropertyApplyToJqNode();
  if (jqNode != null && KFK.notAnyLocked(jqNode)) {
    KFK.fromJQ = jqNode.clone();
    if (jqNode.find(".tip_content").length !== 0) {
      jqNode.find(".tip_content").css("align-items", valignInfo);
    } else {
      jqNode.css("align-items", valignInfo);
    }
    await KFK.syncNodePut("U", jqNode, "set text vert alignment", KFK.fromJQ, false, 0, 1);
  }
  KFK.focusOnC3();
};

KFK.setTenant = tenant => {
  config.tenant = tenant;
};
KFK.getOSSFileName = basename => {
  return `${config.tenant.id} / ${KFK.APP.model.cocodoc.doc_id} / ${basename}`;
};


KFK.setMode = function (mode) {
  if (KFK.docIsReadOnly()) mode = "pointer";

  let oldMode = KFK.mode;
  KFK.mode = mode;
  for (let key in KFK.APP.toolActiveState) {
    KFK.APP.toolActiveState[key] = false;
  }
  if (KFK.APP.toolActiveState[mode] == undefined)
    console.warn(`APP.toolActiveState.${mode} does not exist`);
  else KFK.APP.toolActiveState[mode] = true;

  if ((oldMode === "line" && mode !== "line") ||
    (oldMode === "connect" && mode !== "connect")) {
    KFK.cancelTempLine();
  }

  if (KFK.mode === "pointer") {
    $("#modeIndicator").hide();
  } else {
    if (KFK.mode === "yellowtip") {
      KFK.setModeIndicatorForYellowTip(config.node.yellowtip.defaultTip);
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
  }


  KFK.focusOnC3();
};

KFK.cleanAllNodes = function () {
  KFK.APP.$bvModal.msgBoxConfirm('请确认要清空白板, 其他协作用户的白板也会一起清除, 且本操作无法回退.', {
    title: '请确认', size: 'sm', buttonSize: 'sm',
    okVariant: 'danger', okTitle: '确认清除白板',
    cancelTitle: '放弃', footerClass: 'p-2', hideHeaderClose: false, centered: true
  }).then(async (isOkay) => {
    if (isOkay === true) { await KFK.sendCmd("CLEANUP", { doc_id: KFK.APP.model.cocodoc.doc_id }); }
  }).catch(err => { console.error(err.message); })
};
KFK.doCleanUp = async function () {
  await KFK.refreshDesigner(KFK.APP.model.cocodoc.doc_id, '');
  KFK.scrLog("白板已被发起人擦除");
  KFK.C3.dispatchEvent(KFK.refreshC3event);
};

KFK.toggleMinimap = function () {
  for (let key in KFK.APP.toolActiveState) {
    KFK.APP.toolActiveState[key] = false;
  }
  KFK.APP.toolActiveState["minimap"] = true;
  KFK.showSection({ minimap: !KFK.APP.show.section.minimap });
  KFK.setMode("pointer");
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
KFK.isKfkNode = function (jqdiv) {
  return jqdiv && jqdiv.hasClass("kfknode");
};
KFK.inDesigner = function () {
  return KFK.APP.show.section.designer;
};
KFK.holdEvent = function (evt) {
  evt.stopImmediatePropagation();
  evt.stopPropagation();
  evt.preventDefault();
}
KFK.addDocumentEventHandler = function () {
  $(document).keydown(function (evt) {
    if (KFK.inDesigner()) {
      if ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 65 && evt.keyCode <= 90)) {
        KFK.keypool += evt.key;
        if (KFK.keypool.endsWith('haola') || KFK.keypool.endsWith('hl') || KFK.keypool.endsWith('pr')) {
          if (KFK.inPresentingMode === false)
            KFK.startPresentation();
          else
            KFK.endPresentation();
          KFK.keypool = ""; return;
        } else if (KFK.keypool.endsWith('fs')) {
          KFK.toggleFullScreen(); KFK.keypool = ""; return;
        } else if (KFK.inPresentingMode && KFK.keypool.endsWith('stop')) {
          KFK.endPresentation(); KFK.keypool = ""; return;
        } else if (KFK.keypool.endsWith('first') || KFK.keypool.endsWith('home')) {
          if (KFK.inPresentingMode) { KFK.presentFirstPage(); }
          else { KFK.gotoFirstPage(); }
          KFK.keypool = ""; return;
        } else if (KFK.keypool.endsWith('last') || KFK.keypool.endsWith('end')) {
          if (KFK.inPresentingMode) { KFK.presentLastPage(); }
          else { KFK.gotoLastPage(); }
          KFK.keypool = ""; return;
        } else if (KFK.keypool.endsWith('prev')) {
          if (KFK.inPresentingMode) { KFK.presentPrevPage(); }
          else { KFK.gotoPrevPage(); }
          KFK.keypool = ""; return;
        } else if (KFK.keypool.endsWith('next')) {
          if (KFK.inPresentingMode) { KFK.presentNextPage(); }
          else { KFK.gotoNextPage(); }
          KFK.keypool = ""; return;
        } else if (KFK.keypool.match(/([0-9]+)g$/)) {
          let m = KFK.keypool.match(/([0-9]+)g$/);
          let pindex = parseInt(m[1]) - 1;
          pindex = Math.max(0, Math.min(pindex, KFK.pageBounding.Pages.length - 1));
          if (KFK.inPresentingMode) {
            KFK.presentAnyPage(pindex);
          } else {
            KFK.gotoAnyPage(pindex);
          }
          KFK.keypool = ""; return;
        } else if (KFK.keypool.endsWith('gt')) {
          //TODO:  Add help icon and key shortcuts pages
          //TODO:  combine fullscreen, top only and hide right
          KFK.ZiToTop();
        } else if (KFK.keypool.endsWith('gb')) {
          KFK.ZiToBottom();
        } else if (KFK.keypool.endsWith('gh')) {
          KFK.ZiToHigher();
        } else if (KFK.keypool.endsWith('gl')) {
          KFK.ZiToLower();
        } else if (KFK.keypool.endsWith('lk') || KFK.keypool.endsWith('lock')) {
          KFK.tryToLockUnlock();
        } else if (KFK.inPresentingMode && KFK.keypool.endsWith('b')) {
          //TODO: presentBlackMask();
          KFK.presentBlackMask(); KFK.keypool = ""; return;
        } else if (KFK.inPresentingMode && KFK.keypool.endsWith('w')) {
          //TODO: presentWhiteMask();
          KFK.presentWhiteMask(); KFK.keypool = ""; return;
        } else if (KFK.keypool.length > 5) {
          KFK.keypool = KFK.keypool.substr(-4);
        }
      }
      if (KFK.inPresentingMode === true) {
        if (evt.keyCode === 34 || evt.keyCode === 39 || evt.keyCode === 40) {
          //Page down, arrow right or arrow down
          KFK.presentNextPage();
          evt.preventDefault();
        } else if (evt.keyCode === 33 || evt.keyCode === 37 || evt.keyCode === 38) {
          //Page up, arrow left or arrow up
          KFK.presentPrevPage();
          evt.preventDefault();
        } else if (evt.keyCode === 36) {
          KFK.presentFirstPage();
          evt.preventDefault();
        } else if (evt.keyCode === 35) {
          KFK.presentLastPage();
          evt.preventDefault();
        }
      } else {
        if (evt.keyCode === 34) {
          //Page down
          KFK.gotoNextPage();
          evt.preventDefault();
        } else if (evt.keyCode === 38) { //UP
          KFK.gotoUpperPage();
          evt.preventDefault();
        } else if (evt.keyCode === 40) { //Down
          KFK.gotoLowerPage();
          evt.preventDefault();
        } else if (evt.keyCode === 37) { //Left
          KFK.gotoLeftPage();
          evt.preventDefault();
        } else if (evt.keyCode === 39) { //Right
          KFK.gotoRightPage();
          evt.preventDefault();
        } else if (evt.keyCode === 33) {
          //Page up
          KFK.gotoPrevPage();
          evt.preventDefault();
        } else if (evt.keyCode === 36) {
          KFK.gotoFirstPage();
          evt.preventDefault();
        } else if (evt.keyCode === 35) {
          KFK.gotoLastPage();
          evt.preventDefault();
        }

      }
    } // inDesigner

    if (evt.keyCode === 69 && evt.shiftKey && (evt.ctrlKey || evt.metaKey)) {
      KFK.logKey('CTRL-SHIFT-E');
      if (KFK.inDesigner()) //在Desinger中时，可切换到explorer
        KFK.gotoExplorer();
      else if (KFK.currentView === 'explorer')
        KFK.gotoDesigner();
      //这里不能用 KFK.inDesigner===false来判断
      //因为即便不在designer中，如果designer没有被显示过，不能切换过去
      //因为不知道designer中显示什么，只有designer打开过一次后，才能切换过去
      //程序中， KFK.currentView的初始值为unknown, 当第一次显示designer后，
      //KFK.currentView的值变为designer, 切换回到explorer时，KFK.currentView的值是explorer
      //这时，用KFK.currentView === 'explorer'进行判断是可以的
      return;
    } else if (evt.keyCode === 81 && (evt.ctrlKey || evt.metaKey)) {
      KFK.logKey("CTRL-R");
      // KFK.toggleRight();
      KFK.holdEvent(evt);
      return;
    }

    if (KFK.inDesigner() === false) return;
    if (KFK.editting) return;
    switch (evt.keyCode) {
      case 13:
        KFK.editHoverObject(evt, true);
        break;
      case 27:
        //ESC
        //TODO: make real fullscreen? how can Miro do?
        if (KFK.inFullScreenMode === true) {
          evt.preventDefault();
          KFK.toggleFullScreen();
        }
        KFK.cancelAlreadySelected();
        if (!KFK.editting && KFK.mode !== "line") KFK.setMode("pointer");
        KFK.cancelTempLine();
        KFK.setMode("pointer");
        break;
      case 90:
        //不要移动META-Z代码，一定要在document的keydown里面，
        //否则，在其他地方没有用。这个问题花了我三个小时时间，FX
        if ((evt.metaKey || evt.ctrlKey) && evt.shiftKey) {
          KFK.logKey('META-SHIFT-Z');
          KFK.redo();
        }
        if ((evt.metaKey || evt.ctrlKey) && !evt.shiftKey) {
          KFK.logKey('META-Z');
          KFK.undo();
        }
        break;
      case 76:
        if (evt.metaKey || evt.ctrlKey) {
          KFK.logKey('META-SHIFT-L');
          KFK.tryToLockUnlock();
          KFK.holdEvent(evt);
        }
        break;
      case 8: //Backspace
      case 46: //Delete
        KFK.deleteHoverOrSelectedDiv(evt, false);
        break;
      default:
        preventDefault = false;

    }
  });

  let timer = null;
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
};

KFK.cancelTempLine = function () {
  if (KFK.lineTemping) {
    KFK.lineTemping = false;
    if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
    KFK.linkPosNode.clear();
    KFK.linkPosLine.clear();
  }
};

KFK.ZiToTop = function () {
  let curJQ = KFK.getPropertyApplyToJqNode();
  if (curJQ === null) return;
  if (KFK.isKfkNode(curJQ) === false) return;
  let myZI = KFK.getZIndex(curJQ);
  let count = 0;
  let zIndexChanger = { doc_id: KFK.APP.model.cocodoc.doc_id, ZI: {} };
  KFK.JC3
    .find(".kfknode")
    .each((index, aNodeDIV) => {
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
  let zIndexChanger = { doc_id: KFK.APP.model.cocodoc.doc_id, ZI: {} };
  KFK.JC3
    .find(".kfknode")
    .each((index, aNodeDIV) => {
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
  let zIndexChanger = { doc_id: KFK.APP.model.cocodoc.doc_id, ZI: {} };
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
  let zIndexChanger = { doc_id: KFK.APP.model.cocodoc.doc_id, ZI: {} };
  let myZI = KFK.getZIndex(curJQ);
  if (myZI > 1) {
    let count = 0;
    KFK.JC3
      .find(".kfknode")
      .each((index, aNodeDIV) => {
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
        to: KFK.hoverJqDiv().attr("id")
      };
      KFK.yarkOpEntry(opEntry);
      KFK.sendCmd("UNLOCKNODE", {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        nodeid: KFK.hoverJqDiv().attr("id")
      });
    } else {
      let opEntry = {
        cmd: "LOCK",
        from: KFK.hoverJqDiv().attr("id"),
        to: KFK.hoverJqDiv().attr("id")
      };
      KFK.yarkOpEntry(opEntry);
      KFK.sendCmd("LOCKNODE", {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        nodeid: KFK.hoverJqDiv().attr("id")
      });
    }
  } else if (KFK.hoverSvgLine() && KFK.isMyDoc() && KFK.docIsReadOnly() === false) {
    //对于直线，只有文档未锁定，以及这是当前用户为发起人时才能执行加解锁
    if (KFK.lineLocked(KFK.hoverSvgLine())) {
      KFK.lineToDrag = null;
      let opEntry = {
        cmd: "UNLOCKLINE",
        from: KFK.hoverSvgLine().attr("id"),
        to: KFK.hoverSvgLine().attr("id")
      };
      KFK.yarkOpEntry(opEntry);
      KFK.sendCmd("UNLOCKLINE", {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        nodeid: KFK.hoverSvgLine().attr("id")
      });
    } else {
      let opEntry = {
        cmd: "LOCKLINE",
        from: KFK.hoverSvgLine().attr("id"),
        to: KFK.hoverSvgLine().attr("id")
      };
      KFK.yarkOpEntry(opEntry);
      KFK.sendCmd("LOCKLINE", {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        nodeid: KFK.hoverSvgLine().attr("id")
      });
    }
  } else {
    KFK.scrLog("只有发起人能够进行加解锁");
  }
  if (!shiftKey) {
    KFK.setMode('pointer');
  }
};
KFK.toggleRight = function (flag) {
  if (KFK.APP.model.cocodoc.readonly) {
    return;
  }
  if (KFK.inFullScreenMode === true || KFK.controlButtonsOnly === true) return;
  KFK.showRightTools = !KFK.showRightTools;
  let display = KFK.showRightTools ? 'block' : 'none';
  $("#right").css("display", display);
};
KFK.toggleFullScreen = function (evt) {
  if (KFK.inPresentingMode) return;
  KFK.inFullScreenMode = !KFK.inFullScreenMode;
  if (KFK.inFullScreenMode === true) {
    // if (KFK.inOverviewMode === false) {
    //   KFK.setLayoutDisplay({
    //     showgrid: KFK.APP.model.cococonfig.showgrid,
    //     minimap: false,
    //     toplogo: 'hidden',
    //     docHeaderInfo: 'hidden',
    //     rtcontrol: 'hidden',
    //     left: 'none',
    //     right: 'none',
    //   });
    // }
    KFK.scrLog('进入全屏模式: 输入fs退出');
  } else {
    KFK.scrLog('');
    // if (KFK.inOverviewMode === false)
    //   KFK.restoreLayoutDisplay();
  }
  KFK.APP.setData('show', 'actionlog', false);
  if (KFK.inFullScreenMode === true) {
    KFK.openFullscreen();
  } else {
    KFK.closeFullscreen();
  }
};

KFK.toggleControlButtonOnly = function (evt) {
  KFK.controlButtonsOnly = !KFK.controlButtonsOnly;
  if (KFK.APP.model.cocodoc.readonly) {
    //文档锁定时，依然可以对minimap切换显示与否
    KFK.showSection({ minimap: !KFK.controlButtonsOnly });
    return;
  }
  //左侧和右侧的工具栏，可进行切换
  let display = KFK.controlButtonsOnly ? 'none' : 'block';
  $("#left").css("display", display);
  $("#right").css("display", display); //actionlog总是关闭
  KFK.APP.setData('show', 'actionlog', false);
  //切换minimap
  KFK.showSection({ minimap: !KFK.controlButtonsOnly });
  $('.docHeaderInfo').css("visibility", KFK.controlButtonsOnly ? 'hidden' : 'visible');
  $('#toplogo').css("visibility", KFK.controlButtonsOnly ? 'hidden' : 'visible');
  //add a mask layer
};
KFK.showHidePanel = function (flag) {
  if (flag === true && (KFK.inFullScreenMode === false && KFK.controlButtonsOnly === false)) {
    $("#left").css("display", "block");
    $("#right").css("display", "block");
  } else {
    $("#left").css("display", "none");
    $("#right").css("display", "none");
  }
};

KFK.getAclOwnerDescription = function (doc) {
  if (doc.acl === 'S') {
    return doc.ownerName;
  } else if (doc.acl === 'O') {
    return doc.orgName;
  } else if (doc.acl === 'P') {
    return "公共"
  }
};

KFK.iAmOwner = function (doc) {
  return doc.owner === KFK.APP.model.cocouser.userid;
};

KFK.getAclAccessable = function (doc) {
  let ret = false;
  if (doc.acl === 'S') {
    if (KFK.APP.model.cocouser.userid === doc.owner) {
      ret = true;
      KFK.AclDeniedReason = '';
    } else {
      KFK.AclDeniedReason = '仅发起人可使用, 但当前用户不是发起人';
    }
  } else if (doc.acl === 'O') {
    if (KFK.APP.model.cocouser.orgid === doc.orgid) {
      ret = true;
      KFK.AclDeniedReason = ''
    } else {
      KFK.AclDeniedReason = "仅在白板所在组织内使用, 但当前用户组织不符";
    }
  } else if (doc.acl === 'P') {
    ret = true;
    KFK.AclDeniedReason = '';
  }
  return ret;
}

KFK.showNotAclAccessable = function (doc) {
  KFK.scrLog(KFK.AclDeniedReason);
};

KFK.gotoExplorer = function () {
  if (KFK.APP.model.cocoprj.name === '') {
    KFK.setAppData("model", "cocoprj", { "prjid": "all", "name": "我最近使用过的白板" });
  }
  //不用每次gotoExplorer都refreshExplorer, 因为refreshExplorer要跟服务器刷新数据
  //仅仅是切换explorer或者designer视图，没必要拉取数据
  //只在首次切换到explorer时，拉取数据。
  //其他时候，在creaeproject等操作的地方，会调用refreshExplorer重新拉取数据，在那时，Projects发生了变化，重新拉取是有必要的。
  if (KFK.explorerRefreshed === false) {
    KFK.refreshExplorer();
  }
  KFK.currentView = "explorer";
  KFK.showSection({ explorer: true, designer: false });
  KFK.showForm({
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
    share: false,
    explorerTabIndex: 1
  });
  $('#overallbackground').addClass('grid1');
  KFK.sendCmd("SETWSSEC", { section: 'EXPLORER' });
};

KFK.gotoDesigner = function () {
  KFK.debug("...gotoDesigner")
  KFK.showSection({ explorer: false, designer: true });
  KFK.showForm({
    newdoc: false,
    newprj: false,
    prjlist: false,
    doclist: false,
    share: false,
  });
  KFK.currentView = "designer";
  KFK.focusOnC3();
  $('#overallbackground').removeClass('grid1');
  KFK.sendCmd("SETWSSEC", { section: 'DESIGNER' });
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
  return new File([u8arr], filename, { type: mime });
};

KFK.saveBlobToOSS = function (blob) {
  var reader = new FileReader();
  reader.onload = function (evt) {
    let file = KFK.dataURLtoFile(evt.target.result, "");
    let tmpid = KFK.myuid();
    KFK.OSSClient.multipartUpload(KFK.getOSSFileName(`${tmpid}.png`), file)
      .then(async (res) => {
        let jqDIV = KFK.placeNode(
          false, //shiftKey
          tmpid,
          "textblock",
          "default",
          KFK.currentMousePos.x + KFK.scrollContainer.scrollLeft(),
          KFK.currentMousePos.y + KFK.scrollContainer.scrollTop(),
          100,
          100,
          `<img src='${res.res.requestUrls[0]}'/>`
        );
        await KFK.syncNodePut("C", jqDIV, "create image node", null, false, 0, 1);
      })
      .catch(err => { KFK.error(err); });
  }; // data url!
  reader.readAsDataURL(blob);
};

KFK.save = async function () {
  let docPath = `/${config.tenant.id}/${KFK.APP.model.cocodoc.doc_id}/`;
  // let result = await KFK.OSSClient.list({
  //     prefix: 'lucas/',
  // });
  try {
    // 不带任何参数，默认最多返回1000个文件。
    let result = await KFK.OSSClient.list({
      prefix: "lucas/"
    });
    // 根据nextMarker继续列出文件。
    if (result.isTruncated) {
      let result = await client.list({
        marker: result.nextMarker
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
  const schema = Joi.string()
    .regex(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    )
    .required();
  let { error, value } = schema.validate(str_url);
  return error === undefined;
};

KFK.replaceHTMLTarget = function (html) {
  html = `<div>${html}</div>`;
  try {
    let jq = $($.parseHTML(html));
    jq.find("a").prop("target", "_blank");
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
  let toAdd = content.text;
  let showbox = false;
  if (content.text !== "") {
    toAdd = content.text;
    if (RegHelper.isUrl(toAdd)) { // Plain text is a URL
      showbox = KFK.hoverJqDiv() ? false : true;
      await KFK.mergeAppData("model", "paste", {
        showcontent: true, showdisplay: true, showbox: showbox,
        content: toAdd, display: '请点击访问',
        ctype: 'url',
      });
      KFK.showDialog({ pasteContentDialog: true });
    } else {          //Normal plain text
      showbox = KFK.hoverJqDiv() ? false : true;
      if (showbox) {
        await KFK.mergeAppData("model", "paste", {
          showcontent: false, showdisplay: false, showbox: showbox,
          content: toAdd, display: toAdd,
          ctype: 'text',
        });
        KFK.showDialog({ pasteContentDialog: true });
      } else {
        KFK.APP.model.paste.content = toAdd;
        KFK.placePastedContent();
      }
    }
  } else if (content.html !== "") {
    let tmpText = RegHelper.removeMeta(content.html);
    toAdd = KFK.replaceHTMLTarget(tmpText);
    showbox = KFK.hoverJqDiv() ? false : true;
    if (showbox) {
      await KFK.mergeAppData("model", "paste", {
        showcontent: false, showdisplay: false, showbox: showbox,
        content: toAdd, display: toAdd,
        ctype: 'html',
      });
      KFK.showDialog({ pasteContentDialog: true });
    } else {
      KFK.APP.model.paste.content = toAdd;
      KFK.placePastedContent();
    }
  }
};

KFK.placePastedContent = async function () {
  let toAdd = KFK.APP.model.paste.content;
  let display = KFK.APP.model.paste.display;
  let ctype = KFK.APP.model.paste.ctype;
  if (ctype === 'url') {
    toAdd = `<a href="${toAdd}" target="_blank">${display}</a>`;
  }
  //paste image or paste text
  if (KFK.hoverJqDiv()) {
    if (KFK.anyLocked(KFK.hoverJqDiv())) return;

    if (config.node[KFK.hoverJqDiv().attr("nodetype")].edittable) {
      KFK.fromJQ = KFK.hoverJqDiv().clone();
      let innerObj = KFK.hoverJqDiv().find(".innerobj");
      let oldText = innerObj.html();
      let newText = oldText + "<BR> " + toAdd;
      if (KFK.KEYDOWN.shift === false) {
        newText = toAdd;
      }
      innerObj.html(newText);
      await KFK.syncNodePut("U", KFK.hoverJqDiv(), "add text to hover div", KFK.fromJQ, false, 0, 1);
    }
  } else {
    //box是在pad.js中定义的paste对象时，是否显示边框和背景色的配置信息
    //paste image in a new node
    let box = KFK.APP.model.paste.box;
    let jBox = KFK.placeNode(false, //shiftKey
      KFK.myuid(), "textblock", "default",
      KFK.scrXToJc3X(KFK.currentMousePos.x),
      KFK.scrYToJc3Y(KFK.currentMousePos.y),
      100, 100, toAdd);
    switch (box) {
      case 'none':
        jBox.css("background", "rgba(255,255,255,0)");
        jBox.css("border-color", "rgba(51,51,51,0)");
        break;
      case 'border':
        jBox.css("background", "rgba(255,255,255,0)");
        jBox.css("border-color", "rgba(51,51,51,255)");
        break;
      case 'all':
        jBox.css("background", "rgba(255,255,255,255)");
        jBox.css("border-color", "rgba(51,51,51,255)");
        break;
    }
    await KFK.syncNodePut("C", jBox, "create text node", null, false, 0, 1);
  }
};
KFK.onCopy = async function (evt) {
  KFK.logKey('META-C');
  if (KFK.inDesigner() === false) return;
  if (KFK.APP.show.dialog.ivtCodeDialog) {
    return;
  }
  let someDIVcopyed = await KFK.duplicateHoverObject(evt, 'copy');
  if (someDIVcopyed) {
    evt.clipboardData.setData('text/plain', 'usediv');
    evt.clipboardData.setData('text/html', 'usediv');
    evt.preventDefault();
    KFK.holdEvent(evt);
  }
  evt.preventDefault();
  console.log(someDIVcopyed, evt.clipboardData);
  evt.preventDefault();
  KFK.holdEvent(evt);
};

KFK.onPaste = async function (evt) {
  if (KFK.docIsReadOnly()) return;
  if (KFK.currentView !== 'designer') return;
  let content = { html: "", text: "", image: null };
  content.html = evt.clipboardData.getData("text/html");
  content.text = evt.clipboardData.getData("Text");
  if (content.text === "usediv") {
    console.log("paste usediv");
    await KFK.duplicateHoverObject(evt, 'paste');
    return;
  } else {
    var items = (evt.clipboardData || evt.originalEvent.clipboardData).items;
    console.log("paste", items);
    if (items[1] && (content.html !== '' || content.text !== '')) {
      KFK.showTextPasteDialog(content);
    } else if (items[0]) {
      if (items[0].kind === "string" && (content.html !== '' || content.text !== '')) {
        KFK.showTextPasteDialog(content);
      } else if (items[0].kind === "file") {
        var blob = items[0].getAsFile();
        KFK.scrLog("剪贴板图片粘贴功能只对AAAA级租户开放, 但您可以自由粘贴网络图片");
        //KFK.saveBlobToOSS(blob);
      }
    }
  }
};

KFK.onCut = async function (evt) {
  console.log('on cut');
  KFK.deleteHoverOrSelectedDiv(evt, true);
};

document.onpaste = KFK.onPaste;
document.oncopy = KFK.onCopy;
document.oncut = KFK.onCut;

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
  if (jqNode.hasClass("kfkline")) {
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
  return { x: $(window).width() * 0.5, y: $(window).height() * 0.5 };
};
KFK.showCenterIndicator = function (cx, cy) {
  KFK.debug('...showCenterIndicator');
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
  }
};
KFK.gotoPrevPage = function () {
  if (KFK.currentPage > 0) {
    KFK.currentPage--;
    KFK.___gotoPage(KFK.currentPage);
  } else {
    KFK.scrLog("这已经是第一页了");
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
  if (pidx < 0) return;
  KFK.currentPage = pidx;
  KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoLowerPage = function () {
  let pidx = KFK.currentPage + KFK.PageNumberHori;
  if (pidx > KFK.pageBounding.Pages.length - 1) return;
  KFK.currentPage = pidx;
  KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoLeftPage = function () {
  let rowIdx = Math.floor(KFK.currentPage / KFK.PageNumberHori);
  let columIdx = KFK.currentPage % KFK.PageNumberHori;
  let nextColumIdx = columIdx - 1;
  if (nextColumIdx < 0) return;
  let pidx = rowIdx * KFK.PageNumberHori + nextColumIdx;
  KFK.currentPage = pidx;
  KFK.___gotoPage(KFK.currentPage);
};
KFK.gotoRightPage = function () {
  let rowIdx = Math.floor(KFK.currentPage / KFK.PageNumberHori);
  let columIdx = KFK.currentPage % KFK.PageNumberHori;
  let nextColumIdx = columIdx + 1;
  if (nextColumIdx > KFK.PageNumberVert - 1) return;
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

  let pageCenterX = KFK.currentPage % KFK.PageNumberHori * KFK.PageWidth + KFK.PageWidth * 0.5;
  let pageCenterY = Math.floor(KFK.currentPage / KFK.PageNumberHori) * KFK.PageHeight + KFK.PageHeight * 0.5;

  toLeft = pageCenterX + KFK.LeftB - scrCenter.x;
  toTop = pageCenterY + KFK.TopB - scrCenter.y;

  KFK.scrollToPos({ x: toLeft, y: toTop });
};

KFK.startPresentation = async function () {
  if (KFK.inOverviewMode) return;
  KFK.maskScreen();
  KFK.openFullscreen();
  await KFK.sleep(500);
  KFK.setLayoutDisplay({
    showbounding: false,
    showgrid: false,
    minimap: false,
    toplogo: 'hidden',
    docHeaderInfo: 'hidden',
    rtcontrol: 'hidden',
    left: 'none',
    right: 'none',
  });
  KFK.rememberOverallBackgroundColor = $('#overallbackground').css('background-color');
  $('#overallbackground').css('background-color', 'black');
  KFK.scrLog('进入演示模式: 输入pr退出');
  KFK.inPresentingMode = true;
  KFK.___presentPage(KFK.currentPage);
};
KFK.endPresentation = function () {
  if (KFK.inOverviewMode) return;
  KFK.unmaskScreen();
  // KFK.closeFullscreen();
  KFK.restoreLayoutDisplay();
  KFK.scrLog('退出演示模式');
  KFK.inPresentingMode = false;
  KFK.___unsetSlideMask();
  $('#overallbackground').css('background-color', KFK.rememberOverallBackgroundColor);
  let main = $("#C1");
  let scroller = $("#S1");
  let scrCenter = KFK.scrCenter();
  let window_width = scrCenter.x * 2;
  let window_height = scrCenter.y * 2;

  KFK.JC3.css({ 'transform-origin': `0px 0px`, '-webkit-transform-origin': `0px 0px` });
  KFK.JC3.css("transform", `scale(1, 1)`);
  setTimeout(function () {
    KFK.JC3.css("transform", `scale(1, 1) translate(0px, 0px)`);
  }, 100);
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
    KFK.scrLog("这是最后一页了");
  }
};
KFK.presentPrevPage = function () {
  if (KFK.currentPage > 0) {
    KFK.currentPage--;
    KFK.___presentPage(KFK.currentPage);
  } else {
    KFK.scrLog("这已经是第一页了");
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
KFK.___presentPage = function (pageIndex) {
  KFK.inPresentingMode = true;
  let pages = KFK.pageBounding.Pages;
  let main = $("#C1");
  let scroller = $("#S1");
  let scrCenter = KFK.scrCenter();
  let window_width = scrCenter.x * 2;
  let window_height = scrCenter.y * 2;
  jlog(pages[pageIndex].top);
  jlog(KFK.TopB);
  jlog({
    x: pages[pageIndex].left + KFK.LeftB,
    y: pages[pageIndex].top + KFK.TopB
  });

  KFK.scrollToPos({
    x: pages[pageIndex].left + KFK.LeftB,
    y: pages[pageIndex].top + KFK.TopB
  });

  KFK.___setSlideMask(pageIndex);

  let scaleX = window_width / KFK.PageWidth;
  let scaleY = window_height / KFK.PageHeight;
  let scale = Math.min(scaleX, scaleY);
  let scaledW = scale * KFK.PageWidth;
  let scaledH = scale * KFK.PageHeight;
  let offsetX = (Math.round((window_width - scaledW) * 0.5)) / scale;
  let offsetY = (Math.round((window_height - scaledH) * 0.5)) / scale;

  KFK.JC3.css({
    'transform-origin': `${pages[pageIndex].left}px ${pages[pageIndex].top}px`,
    '-webkit-transform-origin': `${pages[pageIndex].left}px ${pages[pageIndex].top}px`,
    'transform': `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`,
  });
  // setTimeout(function () {
  //   //  main.css("transform", `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`);
  //   KFK.JC3.css("transform", `translate(${offsetX}px, ${offsetY}px)`);
  // }, 100);
};

KFK.___unsetSlideMask = function (page) {
  $('.slidemask').remove();
}
KFK.___setSlideMask = function (pageIndex) {
  let pages = KFK.pageBounding.Pages;
  let jLeft = $('.maskLeft');
  let jTop = $('.maskTop');
  let jRight = $('.maskRight');
  let jBottom = $('.maskBottom');
  if (jLeft.length === 0) {
    let maskLeft = document.createElement("div");
    jLeft = $(maskLeft);
    jLeft.addClass('maskLeft slidemask');
    jLeft.css({ "background-color": "black", "position": "absolute", "z-index": 1000000000 });
    KFK.C3.appendChild(maskLeft);
  }
  if (jTop.length === 0) {
    let maskTop = document.createElement("div");
    jTop = $(maskTop);
    jTop.addClass('maskTop slidemask');
    jTop.css({ "background-color": "black", "position": "absolute", "z-index": 1000000000 });
    KFK.C3.appendChild(maskTop);
  }
  if (jRight.length === 0) {
    let maskRight = document.createElement("div");
    jRight = $(maskRight);
    jRight.addClass('maskRight slidemask');
    jRight.css({ "background-color": "black", "position": "absolute", "z-index": 1000000000 });
    KFK.C3.appendChild(maskRight);
  }
  if (jBottom.length === 0) {
    let maskBottom = document.createElement("div");
    jBottom = $(maskBottom);
    jBottom.addClass('maskBottom slidemask');
    jBottom.css({ "background-color": "black", "position": "absolute", "z-index": 1000000000 });
    KFK.C3.appendChild(maskBottom);
  }

  jLeft.css({
    "left": "0px",
    "top": "0px",
    "width": KFK.px(pages[pageIndex].left),
    "height": KFK.px(KFK._height),
  });
  jTop.css({
    "left": KFK.px(pages[pageIndex].left),
    "top": "0px",
    "width": KFK.px(KFK.PageWidth),
    "height": KFK.px(Math.floor(pageIndex / KFK.PageNumberHori) * KFK.PageHeight)
  });
  jRight.css({
    "left": KFK.px(pages[pageIndex].left + KFK.PageWidth),
    "top": "0px",
    "width": KFK.px((KFK.PageNumberHori - pageIndex % KFK.PageNumberHori - 1) * KFK.PageWidth),
    "height": KFK.px(KFK._height),
  });
  jBottom.css({
    "left": KFK.px(pages[pageIndex].left),
    "top": KFK.px(pages[pageIndex].top + KFK.PageHeight),
    "width": KFK.px(KFK.PageWidth),
    "height": KFK.px(KFK.PageNumberVert - Math.floor(pageIndex / KFK.PageNumberHori - 1) * KFK.PageHeight)
  });
}

KFK.toggleOnePage = function (jc3MousePos) {
  if (KFK.inPresentingMode) return;
  let main = $("#C1");
  let scroller = $("#S1");
  let scrCenter = KFK.scrCenter();
  let window_width = scrCenter.x * 2;
  let window_height = scrCenter.y * 2;
  KFK.APP.setData('show', 'actionlog', false);
  if (KFK.inOverviewMode === true) {
    KFK.scrLog("");
    KFK.JC3.css({
      'transform-origin': '0px 0px',
      '-webkit-transform-origin': '0px 0px',
      "transform": `scale(1, 1)`,
    });
    if (jc3MousePos !== undefined) {
      KFK.scrollToPos({
        x: jc3MousePos.x - scrCenter.x + KFK.LeftB,
        y: jc3MousePos.y - scrCenter.y + KFK.TopB,
      });
    }
    KFK.unmaskScreen();
    KFK.inOverviewMode = false;
    if (KFK.inFullScreenMode === false)
      KFK.restoreLayoutDisplay();
  } else {
    if (KFK.inFullScreenMode === false) {
      KFK.setLayoutDisplay({
        showgrid: false,
        minimap: false,
        toplogo: 'hidden',
        docHeaderInfo: 'hidden',
        rtcontrol: 'hidden',
        left: 'none',
        right: 'none',
      });
    }

    KFK.scrollPosToRemember = { x: scroller.scrollLeft(), y: scroller.scrollTop() };
    let scaleX = window_width / KFK._width;
    let scaleY = window_height / KFK._height;
    let scale = Math.min(scaleX, scaleY);
    let scaledW = scale * KFK._width;
    let scaledH = scale * KFK._height;

    let offsetX = (Math.round((window_width - scaledW) * 0.5)) / scale;
    let offsetY = (Math.round((window_height - scaledH) * 0.5)) / scale;
    KFK.scrollToPos({
      x: KFK.LeftB,
      y: KFK.TopB
    })
    KFK.JC3.css({ 'transform-origin': '0px 0px', '-webkit-transform-origin': '0px 0px' });
    KFK.JC3.css("transform", `scale(${scale}, ${scale})`);
    setTimeout(function () {
      KFK.JC3.css("transform", `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`);
    }, 200);
    // main.css( "transform", `translate(${offsetX}px, ${offsetY}px)`)
    KFK.inOverviewMode = true;
    KFK.maskScreen();
    KFK.scrLog("进入全局要览: 要看哪里, 就双击哪里吧", 1000);
  }
};


KFK.maskScreen = function () {
  let mask = document.createElement('div');
  let jmask = $(mask);
  jmask.width(KFK._width);
  jmask.height(KFK._height);
  jmask.addClass("mask");
  // jmask.appendTo(KFK.JC3);
  KFK.C3.appendChild(mask);
};
KFK.unmaskScreen = function () {
  KFK.JC3.find('.mask').remove();
};

KFK.printCallStack = function () {
  KFK.info(new Error().stack);
};


KFK.closeActionLog = function () {
  KFK.APP.setData("show", "actionlog", false);
};

KFK.showActionLog = function () {
  if (!KFK.APP.show.actionlog) {
    KFK.getActionLog();
    // KFK.showTip("点击选择参与者，然后用上下键查看其参与的内容");
  }
  KFK.APP.setData("show", "actionlog", !KFK.APP.show.actionlog);
};

KFK.getActionLog = function () {
  KFK.debug('refresh actionlog now');
  KFK.sendCmd("GETBLKOPS", { doc_id: KFK.APP.model.cocodoc.doc_id });
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
  KFK.scrollToNode(nodeid);
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
KFK.scrollToNode = function (nodeid) {
  let jqDIV = $(`#${nodeid}`);
  if (jqDIV.length <= 0) {
    KFK.warn("node ", nodeid, "not found");
    return;
  }
  jqDIV = jqDIV.first();

  let top = jqDIV.position().top;
  let left = jqDIV.position().left;
  let width = jqDIV.width();
  let height = jqDIV.height();

  //TODO: Test scrollToNode
  KFK.scrollContainer = $("#S1");
  let scrollX = left - $(window).width() * 0.5 + width * 0.5 + KFK.LeftB;
  let scrollY = top - $(window).height() * 0.5 + height * 0.5 + KFK.TopB;
  KFK.scrollToPos({
    x: scrollX,
    y: scrollY,
  })

  if (KFK.lastActionLogJqDIV != null && KFK.lastActionLogJqDIV !== jqDIV)
    KFK.lastActionLogJqDIV.removeClass("shadow1");
  jqDIV.addClass("shadow1");
  KFK.lastActionLogJqDIV = jqDIV;
  // KFK.scrollContainer.animate({ // animate your right div
  //     scrollTop: 300 // to the position of the target
  // }, 400);
};

KFK.showTip = KFK.scrLog;

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
  KFK.showDialog({ copyDocDialog: true });
};

KFK.showSetAclDialog = (doc) => {
  KFK.showDialog({ setAclDialog: true });
};
KFK.setAcl = async () => {
  let desc = {
    'S': '仅发起人',
    'O': '所在组织',
    'P': '公开使用'
  }
  KFK.APP.model.currentDoc.acl_desc = desc[KFK.APP.model.currentDoc.acl];
  await KFK.sendCmd('SETACL', { doc_id: KFK.APP.model.currentDoc._id, acl: KFK.APP.model.currentDoc.acl });
}

KFK.copyDoc = () => {
  let newname = KFK.APP.model.copyToDocName;
  if (Validator.validateDocName(newname)) {
    let payload = {
      fromDocId: KFK.tobeCopyDocId,
      toPrjId: KFK.APP.model.copyToPrjId,
      toName: KFK.APP.model.copyToDocName,
      copyOrMove: KFK.APP.model.check.copyOrMove
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
    KFK.updateLocalNodeLinkIds(nodeFrom, nodeTo);
  }
};

KFK.showSetProfileDialog = function () {
  let profile = {
    name: KFK.APP.model.cocouser.name,
    avatar: KFK.APP.model.cocouser.avatar,
    oldpwd: "",
    newpwd: "",
    newpwd2: ""
  };
  KFK.APP.state.profile.name = null;
  KFK.APP.state.profile.oldpwd = null;
  KFK.APP.state.profile.newpwd = null;
  KFK.APP.state.profile.newpwd2 = null;
  KFK.setAppData("model", "profileToSet", profile);
  KFK.showDialog({ setProfileDialog: true });
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
    KFK.showDialog({ setProfileDialog: false });
  } else {
    KFK.scrLog("录入信息不符合要求");
    return;
  }
};


// localStorage.removeItem('cocouser');
// KFK.debug(config.defaultDocBgcolor);
config.defaultDocBgcolor = "#ABABAB";
// KFK.debug(config.defaultDocBgcolor);
// KFK.debug("console.js begin loadimages");
//Start the APP
let host = $(location).attr('host');
let protocol = $(location).attr('protocol');
let navigoRoot = protocol + "//" + host + "/";
KFK.router = new Navigo(navigoRoot);
KFK.urlMode = "";
KFK.shareCode = null;
KFK.router.on({
  '/r/:ivtcode': function (params) {
    KFK.urlMode = "ivtcode";
    KFK.shareCode = params.ivtcode;
    // console.log('this is a invitation', params.ivtcode);
    window.history.replaceState({}, null, navigoRoot);
  },
  '/doc/:sharecode': function (params) {
    KFK.urlMode = "sharecode";
    KFK.shareCode = params.sharecode;
    // console.log('this is a sharecode', params.sharecode);
    window.history.replaceState({}, null, navigoRoot);
  },
}).resolve();
KFK.loadImages();
KFK.loadAvatars();

KFK.initSvgLayer = function () {
  KFK.svgDraw = SVG().addTo("#C3").size(KFK._width, KFK._height);
  KFK.debug('svg layer initialized');
  KFK.pageBounding = { Pages: [] };
  let boundingLineOption = {
    color: 'rgba(255, 255, 255, 0.8)',
    width: 4,
    linecap: 'square'
  }
  for (let i = 0; i < KFK.PageNumberVert; i++) {
    for (let j = 0; j < KFK.PageNumberHori; j++) {
      KFK.pageBounding.Pages.push({
        left: j * KFK.PageWidth,
        top: i * KFK.PageHeight
      });
    }
  }
  for (let i = 0; i <= KFK.PageNumberHori; i++) {
    let tmpLine = KFK.svgDraw.line(i * KFK.PageWidth, 0, i * KFK.PageWidth, KFK._height);
    tmpLine.addClass('pageBoundingLine').stroke(boundingLineOption);
  }
  for (let j = 0; j <= KFK.PageNumberVert; j++) {
    let tmpLine = KFK.svgDraw.line(0, j * KFK.PageHeight, KFK._width, j * KFK.PageHeight);
    tmpLine.addClass('pageBoundingLine').stroke(boundingLineOption);
  }
};

KFK.restoreSvgLine = function (line_id, html) {
  let aLine = null;
  let selector = `.${line_id}`;
  aLine = KFK.svgDraw.findOne(selector);
  if (aLine === null || aLine === undefined) {
    aLine = KFK.svgDraw.line();
  }
  let parent = aLine.svg(html, true);
  aLine = parent.findOne(selector);
  KFK.addSvgLineEventListner(aLine);
  return aLine;
};

KFK.makePath = function (p1, p2) {
  let rad = 10;
  let c1 = { x: p2.x - rad, y: p1.y };
  let c2 = { x: p2.x, y: p1.y + rad };

  let pStr = `M${p1.x} ${p1.y} H${c1.x} S${c2.x} ${c1.y} ${c2.x} ${c2.y} V${p2.y}`;
  return pStr;
};

KFK._svgDrawNodesConnect = function (fid, tid, lineClass, lineClassReverse, pstr, triangle) {
  let theLine = null;
  let reverseLine = KFK.svgDraw.findOne(`.${lineClassReverse}`);
  let oldLine = KFK.svgDraw.findOne(`.${lineClass}`);
  let reverseTriangle = KFK.svgDraw.findOne(`.${lineClassReverse}_triangle`);
  let oldTriangle = KFK.svgDraw.findOne(`.${lineClass}_triangle`);
  if (oldLine) {
    oldLine.plot(pstr);
    oldTriangle.plot(triangle);
    theLine = oldLine;
  } else {
    if (reverseLine) {
      reverseLine.removeClass(lineClassReverse);
      reverseLine.addClass(lineClass);
      reverseLine.plot(pstr);
      reverseTriangle.removeClass(lineClassReverse + "_triangle");
      reverseTriangle.addClass(lineClass + "_triangle");
      reverseTriangle.plot(triangle);
      theLine = reverseLine;
    } else {
      theLine = KFK.svgDraw.path(pstr);
      theLine.addClass(lineClass).addClass('connect').fill("none").stroke({ width: KFK.APP.model.connect.width, color: KFK.APP.model.connect.color });
      KFK.svgDraw.polygon(triangle).addClass(lineClass + "_triangle").addClass('connect').fill(KFK.APP.model.connect.triangle.fill).stroke({ width: KFK.APP.model.connect.triangle.width, color: KFK.APP.model.connect.triangle.color });
      theLine.attr({
        "id": lineClass,
        "origin-width": KFK.APP.model.connect.width
      });
    }
  }
  theLine.attr({
    fid: fid,
    tid: tid
  });
  theLine.off('mouseover mouseout');
  theLine.on('mouseover', () => {
    theLine.attr('stroke-width', KFK.APP.model.connect.width * 2);
    KFK.hoveredConnectId = theLine.attr("id");
    KFK.debug('hover connect id', KFK.hoveredConnectId);
  });
  theLine.on('mouseout', () => {
    theLine.attr('stroke-width', KFK.APP.model.connect.width);
    KFK.hoveredConnectId = null;
  });
};
KFK.lockLine = function (line, lock = true) {
  if (lock) {
    let arr = line.array();
    let x1 = arr[0][0], y1 = arr[0][1], x2 = arr[1][0], y2 = arr[1][1];
    let r = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    let d = 10;
    let y3 = (d * (y2 - y1)) / r + y1;
    let x3 = (d * (x2 - x1)) / r + x1;
    let dot = KFK.svgDraw.circle(10);
    dot.center(x3, y3).fill('red').addClass(line.attr('id') + "_lock").addClass('locklabel');
    dot.addTo(line.parent());
    return dot;
  } else {
    try { KFK.svgDraw.findOne('.' + line.attr('id') + '_lock').remove(); } catch (err) { }
  }
};

KFK.svgDrawLine = function (id, fx, fy, tx, ty, option) {
  if (KFK.APP.model.cococonfig.snap) {
    let p1 = { x: fx, y: fy };
    let p2 = { x: tx, y: ty };
    p1 = KFK.getNearGridPoint(p1.x, p1.y);
    p2 = KFK.getNearGridPoint(p2.x, p2.y);
    fx = p1.x; fy = p1.y;
    tx = p2.x; ty = p2.y;
  }
  let lineClass = "kfkline";
  let lineId = "line_" + id;
  let theLine = KFK.svgDraw.findOne(`#line_${id}`);
  if (theLine) {
    theLine.plot(fx, fy, tx, ty).stroke(option);
  } else {
    theLine = KFK.svgDraw.line(fx, fy, tx, ty);
    theLine.attr("id", lineId);
    theLine.addClass(lineClass).addClass(lineId).stroke(option);
    theLine.attr('origin-width', option.width);
    theLine.attr('origin-color', option.color);
    KFK.addSvgLineEventListner(theLine);
  }
  return theLine;
};

KFK.mouseNear = function (p1, p2, distance) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) <= distance;
};

KFK.moveDIVCenterToPos = function (jqDiv, pos) {
  jqDiv.css('left', pos.x - KFK.unpx(jqDiv.css('width')) * 0.5);
  jqDiv.css('top', pos.y - KFK.unpx(jqDiv.css('height')) * 0.5);
}
KFK.C3MousePos = function (evt) {
  return { x: KFK.scrXToJc3X(evt.clientX), y: KFK.scrYToJc3Y(evt.clientY) };
}
KFK.ScreenMousePos = function (pos) {
  return {
    x: pos.x - KFK.scrollContainer.scrollLeft(),
    y: pos.y - KFK.scrollContainer.scrollTop()
  };
}
KFK.hideLineTransformer = function () {
  $("#linetransformer").css("visibility", "hidden");
};
KFK.showLineTransformer = function () {
  $("#linetransformer").css("visibility", "visible");
};
KFK.addSvgLineEventListner = function (theLine) {
  theLine.on('mouseover', (evt) => {
    KFK.hoverSvgLine(theLine);
    let originWidth = theLine.attr('origin-width');
    let newWidth = originWidth > 10 ? originWidth * 1.2 : Math.max(originWidth * 1.2, 5);
    theLine.attr({ 'stroke-width': newWidth });
    if (KFK.lineLocked(theLine)) { $("#linetransformer").css("visibility", "hidden"); return; }

    $(document.body).css("cursor", "pointer");
    let parr = theLine.array();
    if (KFK.mouseNear(
      KFK.C3MousePos(evt),
      { x: parr[0][0], y: parr[0][1] },
      20
    )) {
      $("#linetransformer").css("visibility", "visible");
      KFK.moveLinePoint = "from";
      KFK.lineToResize = theLine;
      KFK.setLineToRemember(theLine);
      KFK.moveLineMoverTo(KFK.jc3PosToJc1Pos({ x: parr[0][0], y: parr[0][1] }));
    } else if (KFK.mouseNear(
      KFK.C3MousePos(evt),
      { x: parr[1][0], y: parr[1][1] },
      20
    )) {
      $("#linetransformer").css("visibility", "visible");
      KFK.moveLinePoint = "to";
      KFK.lineToResize = theLine;
      KFK.setLineToRemember(theLine);
      KFK.moveLineMoverTo(KFK.jc3PosToJc1Pos({ x: parr[1][0], y: parr[1][1] }));
    } else {
      $("#linetransformer").css("visibility", "hidden");
    }
  });
  theLine.on('mouseout', () => {
    if (KFK.lineDragging === false) {
      KFK.hoverSvgLine(null);
      $(document.body).css("cursor", "default");
      theLine.attr({ 'stroke-width': theLine.attr('origin-width') });
    }
  });
  theLine.on('mousedown', (evt) => {
    KFK.closeActionLog();
    ;

    KFK.lineToDrag = theLine;
    KFK.mousePosToRemember = {
      x: KFK.currentMousePos.x,
      y: KFK.currentMousePos.y,
    };
    KFK.setLineToRemember(theLine);
    KFK.lineDraggingStartPoint = {
      x: KFK.scrXToJc3X(evt.clientX),
      y: KFK.scrYToJc3Y(evt.clientY)
    }
  });
  //click line
  theLine.on("click", (evt) => {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    KFK.hoverSvgLine(theLine)
    if (KFK.anyLocked(theLine)) return;
    if (KFK.mode === 'lock') {
      KFK.tryToLockUnlock(evt.shiftKey);
    }
    KFK.lineToDrag = null;
    KFK.focusOnNode(null);
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "customline", true);
    KFK.APP.setData("show", "custombacksvg", false);
    KFK.APP.setData("show", "customfont", false);
    KFK.APP.setData("show", "layercontrol", false);

    KFK.setLineToRemember(theLine);

    KFK.pickedSvgLine = theLine;
    // KFK.setRightTabIndex();
    let color = theLine.attr("stroke");
    let width = theLine.attr("origin-width");
    let linecap = theLine.attr("stroke-linecap");
    $("#lineColor").spectrum("set", color);
    $("#spinner_line_width").spinner("value", width);
    let lineSetting = KFK.APP.model.line;
    lineSetting = { color: color, width: width, linecap: linecap === 'round' ? true : false };
    KFK.setAppData('model', "line", lineSetting);
  });

};

KFK.initLineMover = function () {
  KFK.debug('...initLineMover');
  $("#linetransformer").draggable({
    // move line resize line transform line
    start: (evt, ui) => {
      KFK.closeActionLog();
      KFK.lineMoverDragging = true;
      // KFK.fromJQ = KFK.tobeTransformJqLine.clone();
      KFK.lineMoverOldPosition = $("#linetransformer").position();
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
          [stopAtPos.x, stopAtPos.y],
          parr[1]
        ]
        );
      } else {
        KFK.lineToResize.plot([
          parr[0],
          [stopAtPos.x, stopAtPos.y],
        ]
        );
      }
    },
    stop: async (evt, ui) => {
      //transform line  change line
      KFK.lineMoverDragging = false;
      KFK.lineMoverNewPosition = $("#linetransformer").position();
      if (KFK.lineToResize === null) return;
      let parr = KFK.lineToResize.array();
      let stopAtPos = KFK.C3MousePos(evt);
      if (KFK.APP.model.cococonfig.snap) {
        stopAtPos = KFK.getNearGridPoint(stopAtPos);
        let smp = KFK.ScreenMousePos(stopAtPos);
        KFK.moveDIVCenterToPos($('#linetransformer'), smp);
      }
      if (KFK.moveLinePoint === "from") {
        KFK.lineToResize.plot([
          [stopAtPos.x, stopAtPos.y],
          parr[1]
        ]
        );
      } else {
        KFK.lineToResize.plot([
          parr[0],
          [stopAtPos.x, stopAtPos.y],
        ]
        );
      }
      await KFK.syncLinePut("U", KFK.lineToResize, 'resize', KFK.lineToRemember, false);
      KFK.setLineToRemember(KFK.lineToResize);
      $("#linetransformer").css("visibility", "hidden");
    }
  }); //line transformer. draggable()
};

KFK.svgDrawTmpLine = function (fx, fy, tx, ty, option) {
  let tmpLineClass = "line_temp";
  if (KFK.KEYDOWN.alt) {
    if (Math.abs(tx - fx) < Math.abs(ty - fy))
      tx = fx;
    else ty = fy;
  }
  KFK.tempSvgLine = KFK.svgDraw.findOne(`.${tmpLineClass}`);
  if (KFK.tempSvgLine) {
    KFK.tempSvgLine.show();
    KFK.tempSvgLine.plot(fx, fy, tx, ty).stroke(option);
  } else {
    KFK.tempSvgLine = KFK.svgDraw.line(fx, fy, tx, ty).addClass(tmpLineClass).stroke(option);
  }
};

KFK.svgConnectNode = function (fid, tid, fbp, tbp, fx, fy, tx, ty) {
  if (!(fid && tid)) {
    KFK.debug('svgConnectNode between, from', fid, 'to', tid);
    return;
  }
  let lineClass = `line_${fid}_${tid}`;
  let lineClassReverse = `line_${tid}_${fid}`;
  let pstr = "";
  let triangle = [];
  let rad = 20;
  let tri = 20;
  let tri_half = tri * 0.5;
  let tri_height = 17.3;
  let tsx = tx, tsy = ty - tri_height;
  switch (tbp) {
    case 0:
      tsx = tx - tri_height; tsy = ty;
      triangle = [tsx, tsy + tri_half, tx, ty, tsx, tsy - tri_half];
      break;
    case 1:
      tsx = tx; tsy = ty - tri_height;
      triangle = [tsx - tri_half, tsy, tx, ty, tsx + tri_half, tsy];
      break;
    case 2:
      tsx = tx + tri_height; tsy = ty;
      triangle = [tsx, tsy - tri_half, tx, ty, tsx, tsy + tri_half];
      break;
    case 3:
      tsx = tx; tsy = ty + tri_height;
      triangle = [tsx - tri_half, tsy, tx, ty, tsx + tri_half, tsy];
      break;
  };
  switch (fbp) {
    case 0:
      switch (tbp) {
        case 0:
          pstr = `M${fx} ${fy} C${fx - rad} ${fy} ${tx - rad} ${ty} ${tx} ${ty}`;
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
          pstr = `M${fx} ${fy} C${fx} ${ty - rad} ${tx} ${ty - rad} ${tx} ${ty}`;
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
          pstr = `M${fx} ${fy} C${fx + rad} ${fy} ${tx + rad} ${ty} ${tx} ${ty}`;
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
          pstr = `M${fx} ${fy} C${fx} ${fy + rad} ${tx} ${ty + rad} ${tx} ${ty}`;
          break;
      }
      break;
  }
  KFK._svgDrawNodesConnect(fid, tid, lineClass, lineClassReverse, pstr, triangle);
};




KFK.myFadeIn = function (jq, ms = 200) {
  jq.css({ visibility: "visible", opacity: 0.0 }).animate({ opacity: 1.0 }, ms);
};
KFK.myFadeOut = function (jq, ms = 200) {
  jq.animate({ opacity: 0.0 }, ms, function () {
    jq.css("visibility", 'hidden');
  });
};
KFK.myHide = function (jq) {
  jq.css("visibility", 'hidden');
};
KFK.myShow = function (jq) {
  jq.css({ "visibility": 'visible', opacity: 1.0 });
};

KFK.fsElem = document.documentElement;

/* View in fullscreen */
KFK.openFullscreen = function () {
  if (KFK.fsElem.requestFullscreen) {
    KFK.fsElem.requestFullscreen();
  } else if (KFK.fsElem.mozRequestFullScreen) { /* Firefox */
    KFK.fsElem.mozRequestFullScreen();
  } else if (KFK.fsElem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    KFK.fsElem.webkitRequestFullscreen();
  } else if (KFK.fsElem.msRequestFullscreen) { /* IE/Edge */
    KFK.fsElem.msRequestFullscreen();
  }
};

/* Close fullscreen */
KFK.closeFullscreen = function () {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  } catch (error) {

  }
};

KFK.showIvtCodeDialog = function () {
  KFK.showDialog({ ivtCodeDialog: true });
}
export default KFK;

//TODO: direct loginas demo user story
//TODO: 流量计费
//TODO: 多个演示文档ID，随机选择给Demo用户使用
//TODO: do not send mouse in zoom mode
//TODO: 演示文档中，放入广告，招投资，招团队
//TODO: ToolTips 在demo状态下每次进来分别提示一次
//TODO: 清理OSS图片
// OSS路径名使用 tenant_id/doc_id/pic_name.png
// 一开始生成文档的ID， 然后的OSS图片的目录使用这个ID， 最后保存时，检查真正剩余的图片，并与OSS中的对应，没有用到的从OSS中删除掉
//TODO: RichText with QuilJS
//TODO: double click on line to add text label
