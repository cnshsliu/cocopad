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
import "../lib/fontpicker-jquery-plugin/dist/jquery.fontpicker";
import "../lib/jquery-minimap/jquery-minimap";
import config from "./config";
import Demo from "./demo";
import RegHelper from './reghelper';
import SVGs from "./svgs";
import WS from "./ws";
import ACM from "./accountmanage";
import SHARE from "./sharemanage";

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

const KFK = {};
KFK.svgDraw = null;   //画svg的画布
KFK.OSSClient = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "ACCESSKEY",
  accessKeySecret: "ACCESSECRET",
  bucket: config.vault.bucket
});
KFK.FROM_SERVER = true; //三个常量
KFK.FROM_CLIENT = false;
KFK.NO_SHIFT = false;
KFK.badgeTimers = {};  //用于存放用户badge显示间隔控制的timer，这样，不是每一个mousemove都要上传，在Timer内，只上传最后一次mouse位置
KFK.updateReceived = 0; //记录接收到的其他用户的改动次数，在startActiveLogWatcher中，使用这个数字来控制是否到服务器端去拉取更新列表
KFK.tempSvgLine = null; //这条线是在划线或者链接node时，那条随着鼠标移动的线
KFK.isZooming = false; //是否是在Zoom状态
KFK.LOGLEVEL_ERROR = 1;
KFK.LOGLEVEL_WARN = 2;
KFK.LOGLEVEL_INFO = 3;
KFK.LOGLEVEL_DEBUG = 4;
KFK.LOGLEVEL_DETAIL = 5;
KFK.LOGLEVEL_NOTHING = 0;
KFK.loglevel = KFK.LOGLEVEL_DEBUG; //控制log的等级, 级数越小，显示信息越少
KFK.zoomlevel = 1; //记录当前的zoom等级
KFK.designerConf = { scaleX: 1, scaleY: 1, left: 0, top: 0 }; //用于在zoom控制计算中
KFK.opstack = []; //Operation Stack, 数组中记录操作记录，用于undo/redo
KFK.opstacklen = 1000; //undo，redo记录次数
KFK.opz = -1; // opstack 当前记录指针
KFK.mouseTimer = null;  //定时器用于控制鼠标移动上传的频次
KFK.WSConnectTime = 0; //WebSocket重连的次数
KFK.currentView = "unknown";
KFK.WS = null;
KFK.C3 = null;
KFK.JC3 = null;
KFK.docDuringLoading = null;
KFK.fullScreen = false;
KFK.controlButtonsOnly = false;
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
KFK._width = 842 * 6;
KFK._height = 595 * 6;
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

KFK.containermain = document.getElementById("containermain");
// KFK.containermain.style.width = KFK._width + "px";
// KFK.containermain.style.height = KFK._height + "px";
KFK.focusOnC3 = () => {
  if (KFK.JC3) {
    KFK.JC3.attr('tabindex', '0');
    KFK.JC3.focus();
  } else {
    KFK.warn("focusOnC3 failed. not exist");
  }
}

KFK.myuid = () => {
  return suuid.generate();
}
KFK.scrollContainer = $("#scroll-container");
KFK.lockMode = false;
KFK.selectedDIVs = [];
KFK.mouseIsDown = false;
KFK.dragToSelectFrom = { x: 0, y: 0 };
KFK.dragToSelectTo = { x: 0, y: 0 };
KFK.duringKuangXuan = false;

KFK.currentMousePos = { x: -1, y: -1 };
KFK.JCM = $('#containerbkg');
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

KFK.setRightTabIndex = function (tabindex) {
  if (tabindex !== undefined) {
    KFK.APP.setData("model", "rightTabIndex", tabindex);
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
  if (jqNodeDIV != null) {
    nodeType = jqNodeDIV.attr("nodetype");
  }

  KFK.APP.setData("show", "customline", false);
  KFK.APP.setData("show", "shape_property", jqNodeDIV != null);
  KFK.APP.setData(
    "show",
    "customfont",
    jqNodeDIV != null && getBoolean(config.node[nodeType].edittable)
  );
  KFK.APP.setData(
    "show",
    "customshape",
    jqNodeDIV != null && getBoolean(config.node[nodeType].customshape)
  );
  KFK.APP.setData(
    "show",
    "custombacksvg",
    jqNodeDIV != null && (nodeType === "yellowtip" || nodeType === "textblock")
  );
  KFK.APP.setData(
    "show",
    "layercontrol",
    jqNodeDIV != null && (nodeType === "text" || nodeType === "yellowtip" || nodeType === "textblock")
  );
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
    let fontSize = jqNodeDIV.css("font-size");
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
  KFK.scrLog(...info);
}

KFK.scrLog = function (msg) {
  let parent = $("#MSG").parent();
  let msgDIV = $("#MSG");
  let cloneDIV = $("#fadeoutmsg");
  if (cloneDIV.length > 0) {
    cloneDIV.remove();
  }

  cloneDIV = msgDIV.clone().appendTo(parent);
  cloneDIV.attr("id", "fadeoutmsg");
  cloneDIV.html(msg);
  cloneDIV.animate({ top: "10px", }, 200, async function () {
    await KFK.sleep(5000);
    cloneDIV.animate({ top: "-24px" }, 1000, async function () {
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

//create C3 create c3
KFK.initC3 = function () {
  KFK.C3 = el($("#C3"));
  KFK.JC3 = $(KFK.C3);
  KFK.JC3.focus((evt) => { KFK.debug("JC3 got focus"); })
  KFK.JC3.css("position", "absolute");
  KFK.JC3.css("user-select", "none");
  KFK.JC3.css("left", 0);
  KFK.JC3.css("top", 0);
  KFK.JC3.css("width", KFK._width);
  KFK.JC3.css("height", KFK._height);
  KFK.JC3.css("z-index", 9);
  console.log('===============');
  KFK.JCM = $('#containerbkg');
  console.log(KFK.JCM.css('width'));
  KFK.JCM.css('background-image', `url(${KFK.images['grid1'].src})`);
  KFK.JCM.css('background-size', '20px 20px');


  //click c3  click C3 click canvas click background
  KFK.JC3.dblclick(function (evt) {
    if (KFK.isZooming === true) {
      KFK.zoomStop();
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

    KFK.debug('click c3');
    // KFK.focusOnNode(null);
    KFK.justCreatedJqNode = null;
    KFK.justCreatedSvgLine = null;

    KFK.pickedSvgLine = null;

    // if (KFK.mode === 'lock' || KFK.mode === 'connect') {
    //   KFK.setMode('pointer');
    // }
    if (KFK.docLocked()) return;

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
        evt.clientX + KFK.scrollContainer.scrollLeft(),
        evt.clientY + KFK.scrollContainer.scrollTop(),
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
        let clientX = evt.clientX;
        let clientY = evt.clientY;
        let realX = KFK.scrollX(clientX);
        let realY = KFK.scrollY(clientY);
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
    if (KFK.mode === "pointer" && KFK.docLocked() === false) {
      KFK.mouseIsDown = true;
      KFK.dragToSelectFrom = {
        x: KFK.scrollX(evt.clientX),
        y: KFK.scrollY(evt.clientY)
      };
    }
  });
  KFK.JC3.mouseup(async (evt) => {
    if (KFK.inDesigner() === false) return;
    KFK.ignoreClick = false;
    if (KFK.lineDragging) {
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
    if (KFK.mode === "pointer" && KFK.docLocked() === false) {
      KFK.mouseIsDown = false;
      KFK.dragToSelectTo = {
        x: KFK.scrollX(evt.clientX),
        y: KFK.scrollY(evt.clientY)
      };
      if (KFK.duringKuangXuan) {
        KFK.ignoreClick = true;
        KFK.endKuangXuan(KFK.dragToSelectFrom, KFK.dragToSelectTo);
        KFK.duringKuangXuan = false;
      }
    }
  });

  KFK.JC3.on("mousemove", function (evt) {
    if (KFK.inDesigner() === false) return;
    KFK.showUserMovingBadge(
      KFK.APP.model.cocouser,
      evt.clientX,
      evt.clientY
    );

    KFK.currentMousePos.x = evt.clientX;
    KFK.currentMousePos.y = evt.clientY;

    $("#modeIndicator").css("left", KFK.currentMousePos.x + 10);
    $("#modeIndicator").css("top", KFK.currentMousePos.y + 10);
    KFK.dragToSelectTo = {
      x: KFK.scrollX(evt.clientX),
      y: KFK.scrollY(evt.clientY)
    };

    if (KFK.docLocked()) return;

    if (KFK.lineToDrag && KFK.lineLocked(KFK.lineToDrag) === false) {
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
      //   `框选 ${JSON.stringify(KFK.dragToSelectFrom)} - ${JSON.stringify(
      //     KFK.dragToSelectTo
      //   )}`
      // );
      KFK.kuangXuan(KFK.dragToSelectFrom, KFK.dragToSelectTo);
    }
    if (KFK.lineDragging || KFK.lineMoverDragging || KFK.minimapMouseDown) {
      KFK.duringKuangXuan = false;
    }

    if (KFK.mode === "connect") {
      if (KFK.linkPosNode.length === 1) {
        KFK.lineTemping = true;
        let tmpPoint = {
          x: KFK.scrollX(KFK.currentMousePos.x),
          y: KFK.scrollY(KFK.currentMousePos.y)
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
          x: KFK.scrollX(KFK.currentMousePos.x),
          y: KFK.scrollY(KFK.currentMousePos.y)
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
    if (KFK.lineDragging && KFK.lineLocked(KFK.lineToDrag) === false) {
      let realX = KFK.scrollX(evt.clientX);
      let realY = KFK.scrollY(evt.clientY);
      let deltaX = realX - KFK.lineDraggingStartPoint.x;
      let deltaY = realY - KFK.lineDraggingStartPoint.y;
      KFK.lineToDrag.dmove(deltaX, deltaY);
      KFK.lineDraggingStartPoint.x += deltaX;
      KFK.lineDraggingStartPoint.y += deltaY;
    }
  });

  KFK.zoomlevel = 1;
  KFK.addMinimap();
};

KFK.addMinimap = function () {
  KFK.refreshC3event = new CustomEvent("refreshC3");
  KFK.zoomEvent = new CustomEvent("zoomC3");
  $("#minimap").minimap(KFK, $("#scroll-container"), KFK.JC3);
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
  let pos = { x: KFK.scrollX(x), y: KFK.scrollY(y) };
  let bglabel = user.name;


  if (KFK.mouseTimer !== null) {
    clearTimeout(KFK.mouseTimer);
  }
  let consisedUser = { userid: user.userid, name: user.name };
  KFK.mouseTimer = setTimeout(function () {
    KFK.WS.put("MOUSE", { user: consisedUser, pos: pos });
    KFK.mouseTimer = null;
  }, 200);

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
  jqBadgeDIV.css("top", pos.y);
  jqBadgeDIV.css("left", pos.x);
  jqBadgeDIV.css("width", "fit-content");
  jqBadgeDIV.css("height", "fit-content");
  jqBadgeDIV.html(bglabel);

  let width = jqBadgeDIV.width();
  let height = jqBadgeDIV.height();

  let wwidth = window.innerWidth;
  let wheight = window.innerHeight;
  if (pos.x < KFK.scrollContainer.scrollLeft()) {
    pos.x = KFK.scrollContainer.scrollLeft();
  } else if (pos.x + width > KFK.scrollContainer.scrollLeft() + wwidth) {
    pos.x = KFK.scrollContainer.scrollLeft() + wwidth - width;
  }
  if (pos.y < KFK.scrollContainer.scrollTop()) {
    pos.y = KFK.scrollContainer.scrollTop();
  } else if (pos.y + height > KFK.scrollContainer.scrollTop() + wheight) {
    pos.y = KFK.scrollContainer.scrollTop() + wheight - height;
  }
  jqBadgeDIV.css("top", pos.y);
  jqBadgeDIV.css("left", pos.x);

  if (KFK.badgeTimers[bgid] !== undefined) {
    clearTimeout(KFK.badgeTimers[bgid]);
  }

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
KFK.scrollToScreen = function (position) {
  return {
    x: position.x - KFK.scrollContainer.scrollLeft(),
    y: position.y - KFK.scrollContainer.scrollTop()
  };
};
KFK.selectNode = function (jqDIV) {
  jqDIV.addClass("selected");
  KFK.selectedDIVs.push(jqDIV);
  KFK.setSelectedNodesBoundingRect();
};

KFK.setSelectedNodesBoundingRect = function () {
  if (KFK.selectedDIVs.length > 1) {
    let rect = KFK.getBoundingRectOfSelectedDIVs();
    $("#boundingrect").css("left", rect.left - config.ui.boundingrect_padding);
    $("#boundingrect").css("top", rect.top - config.ui.boundingrect_padding);
    $("#boundingrect").css(
      "width",
      rect.width + config.ui.boundingrect_padding * 2
    );
    $("#boundingrect").css(
      "height",
      rect.height + config.ui.boundingrect_padding * 2
    );
    $("#boundingrect").show();
  } else {
    $("#boundingrect").hide();
  }
};

KFK.kuangXuan = function (pt1, pt2) {
  KFK.duringKuangXuan = true;
  let jqRect = $("#selectingrect");
  jqRect.css("left", Math.min(pt1.x, pt2.x));
  jqRect.css("top", Math.min(pt1.y, pt2.y));
  jqRect.css("width", Math.abs(pt1.x - pt2.x));
  jqRect.css("height", Math.abs(pt1.y - pt2.y));
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

KFK.editTextNode = function (textnode, theDIV) {
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
  textarea.value = oldText;
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
    // hide on enter
    // but don't hide on shift + enter
    if (evt.keyCode === 13 && !evt.shiftKey) {
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
    nodeObj.style.fontSize = "18px";
    nodeObj.innerHTML = node.attach ? node.attach : config.node.text.content;
    nodeObj.style.padding = KFK.px(2);
  } else if (node.type === "yellowtip") {
    nodeObj = document.createElement("span");
    nodeObj.style.fontSize = "18px";
    nodeObj.innerText = config.node.yellowtip.content;
    $(nodeObj).css("width", "100%");
    $(nodeObj).css("height", "100%");
    $(nodeObj).css("padding", 2);
    $(nodeObj).css("z-index", 1);
    $(nodeObj).css("display", "flex");
    $(nodeObj).css("justify-content", config.node.yellowtip.textAlign);
    $(nodeObj).css("align-items", config.node.yellowtip.vertAlign);
    $(nodeObj).css("position", "absolute");
    $(nodeObj).addClass("tip_content");
  } else if (node.type === "textblock") {
    nodeObj = document.createElement("div");
    nodeObj.style.fontSize = "18px";
    nodeObj.innerHTML = node.attach
      ? node.attach
      : config.node.textblock.content;
    // nodeObj.style.width = KFK.px(node.width - textPadding * 2);
    // nodeObj.style.height = KFK.px(node.height - textPadding * 2);
    nodeObj.style.padding = KFK.px(2);
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
    $(nodeDIV).attr("variant", config.node.yellowtip.defaultTip);
    $(nodeDIV).css("width", rect.w);
    $(nodeDIV).css("height", rect.h);
    $(nodeDIV).css("color", config.node.yellowtip.color);
    $(nodeDIV).addClass("yellowtip");
  } else if (node.type === "textblock") {
    let rect = KFK.getShapeDynamicDefaultSize("textblock", "default");
    $(nodeDIV).css("width", rect.w);
    $(nodeDIV).css("height", rect.h);
    $(nodeDIV).css("border-radius", config.node.textblock.borderRadius);
    $(nodeDIV).css("border-style", config.node.textblock.borderStyle);
    $(nodeDIV).css("border-color", config.node.textblock.borderColor);
    $(nodeDIV).css("border-width", config.node.textblock.borderWidth);
    $(nodeDIV).css("color", config.node.textblock.color);
    $(nodeDIV).css("justify-content", config.node.yellowtip.textAlign);
    $(nodeDIV).css("align-items", config.node.yellowtip.vertAlign);
    $(nodeDIV).css("background-color", KFK.APP.model.shapeBkgColor);
  }

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
    KFK._setTipBkgColor($(nodeDIV), KFK.APP.model.tipBkgColor);
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

KFK.syncNodePut = async function (cmd, jqDIV, reason, jqFrom, isUndoRedo, ser, count) {
  if (KFK.docLocked()) return;
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
          KFK.debug('Batch :', ser, 'of', count);
          KFK.debug("Compele batch op_entry: ", opEntry);
          KFK.yarkOpEntry(opEntry);
        } else {
          KFK.debug('Batch :', ser, 'of', count);
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
  if (KFK.docLocked()) return;

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

//jqNode can be a node or even a svgline
KFK.anyLocked = function (jqNode) {
  if (jqNode)
    return KFK.docLocked() || KFK.nodeLocked(jqNode) || KFK.isZooming;
  else
    return KFK.docLocked() || KFK.isZooming;
};

KFK.notAnyLocked = function (jqNode) {
  return !KFK.anyLocked(jqNode);
};

KFK.docLocked = function () {
  return KFK.APP.model.cocodoc.doclocked;
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
  console.log(config.node.yellowtip.defaultTip);
  // console.log(KFK.images[config.node.yellowtip.defaultTip].src);
  if (KFK.mode === "yellowtip") {
    KFK.setModeIndicatorForYellowTip(tipvariant);
    $("#modeIndicatorImg").hide();
    $("#modeIndicatorDiv").show();
  }
  let theNode = KFK.getPropertyApplyToJqNode();
  let theJqNode = KFK.getPropertyApplyToJqNode();
  if (theJqNode !== null && KFK.notAnyLocked(theJqNode)) {
    let oldColor = KFK.getTipBkgColor(theJqNode);
    theJqNode.attr("variant", tipvariant);
    console.log(theJqNode.attr("variant"));
    KFK.setTipBkgImage(theJqNode, tipvariant, oldColor);
  }
};
KFK.setTipBkgImage = async function (jqDIV, svgid, svgcolor) {
  KFK.fromJQ = jqDIV.clone();
  KFK._setTipBkgImage(jqDIV, svgid, svgcolor);
  await KFK.syncNodePut("U", jqDIV, "change bkg image", KFK.fromJQ, false, 0, 1);
};
KFK._setTipBkgImage = function (jqDIV, svgid, svgcolor) {
  console.log("Come here");
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
    console.warn(
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
        if (KFK.isZooming) return;
        KFK.fromJQ = jqNodeDIV.clone();
        KFK.resizing = true;
      },
      resize: () => { },
      stop: async () => {
        if (KFK.isZooming) return;
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
    start: (evt, ui) => {
      if (KFK.isZooming) return;
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
      if (KFK.isZooming) return;
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
        let index = KFK.selectedDIVs.indexOf(jqNodeDIV);
        if (KFK.selectedDIVs.length > 1 && index >= 0) {
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
        if (KFK.isZooming) return;
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
    if (KFK.isZooming) return;
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
    if (KFK.isZooming) return;
    if (
      getBoolean(jqNodeDIV.attr("edittable")) &&
      KFK.notAnyLocked(jqNodeDIV)
    ) {
      KFK.fromJQ = jqNodeDIV.clone();
      let innerText = el(jqNodeDIV.find(".innerobj"));
      KFK.editTextNode(innerText, el(jqNodeDIV));
    }
  });
};

KFK.dumpNode = function (node) {
  let jqNode = node;
  if (!(node instanceof jQuery)) {
    jqNode = $(node);
  }
  KFK.info(jqNode.prop("outerHTML"));
};

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
  if (KFK.isZooming) return;
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
KFK.deleteHoverOrSelectedDiv = async function (evt) {
  if (KFK.isZooming) return;
  //如果有多个节点被选择，则优先进行多项删除
  if (KFK.selectedDIVs.length > 1) {
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
      KFK.deleteNode_request(KFK.hoverJqDiv());
      KFK.hoverJqDiv(null);
    } else if (KFK.hoverSvgLine()) {
      //然后，再看鼠标滑过的线条
      if (KFK.anyLocked(KFK.hoverSvgLine())) return;
      KFK._deleteLine(KFK.hoverSvgLine());
      KFK.hoverSvgLine(null);
    } else if (KFK.hoveredConnectId) {
      //最后看鼠标滑过的connect（节点间连接线）
      if (KFK.docLocked()) return;
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

KFK.duplicateHoverObject = async function (evt) {
  KFK.debug("entered duplicateHoverObject");
  if (KFK.docLocked()) return;
  if (KFK.isZooming) return;
  let offset = { x: 0, y: 0 };
  if (KFK.hoverJqDiv()) {
    KFK.jqToCopy = KFK.hoverJqDiv();
    await KFK.makeACopyOfJQ(KFK.jqToCopy, evt.shiftKey);
  } else if (KFK.hoverSvgLine()) {
    KFK.hoverSvgLine().attr({ 'stroke-width': KFK.hoverSvgLine().attr('origin-width') });
    KFK.lineToCopy = KFK.hoverSvgLine();
    await KFK.makeACopyOfLine(KFK.lineToCopy, evt.shiftKey);
  } else if (KFK.jqToCopy) {
    await KFK.makeACopyOfJQ(KFK.jqToCopy, evt.shiftKey);
  } else if (KFK.lineToCopy) {
    await KFK.makeACopyOfLine(KFK.lineToCopy, evt.shiftKey);
  }
  evt.stopPropagation();
};

KFK.makeACopyOfJQ = async function (jqtocopy, shiftKey) {
  let offset = { x: 20, y: 0 };
  let jqNewNode = KFK.jqToCopy.clone(false);
  jqNewNode.attr("id", KFK.myuid());
  jqNewNode.css("left", KFK.scrollX(KFK.currentMousePos.x) - parseInt(jqNewNode.css("width")) * 0.5);
  jqNewNode.css("top", KFK.scrollY(KFK.currentMousePos.y) - parseInt(jqNewNode.css("height")) * 0.5);
  //按住shift 复制时，也就是META-SHIFT-D, 则保留linkto
  if (!shiftKey) {
    jqNewNode.removeAttr("linkto");
  }
  KFK.cleanNodeEventFootprint(jqNewNode);
  jqNewNode.appendTo(KFK.C3);
  KFK.setNodeEventHandler(jqNewNode);
  KFK.focusOnNode(jqNewNode);
  await KFK.syncNodePut("C", jqNewNode, "duplicate node", null, false, 0, 1);
  return;
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
  newLine.center(KFK.scrollX(KFK.currentMousePos.x) + 20, KFK.scrollY(KFK.currentMousePos.y) + 20);
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


KFK.scrollX = function (x) {
  return x + KFK.scrollContainer.scrollLeft();
};
KFK.scrollY = function (y) {
  return y + KFK.scrollContainer.scrollTop();
};

KFK.showGridChanged = function (checked) {
  KFK.gridLayer.visible(checked);
};


KFK.toggleShowLock = function (checked) {
  if (checked) {
    $('.locklabel').removeClass('noshow');
  } else {
    $('.locklabel').addClass('noshow');
  }
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


  $("#left_menu").removeClass("noshow");
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
  let svgHolder = $('#toolbox2');
  $.each(SVGs, (name, svgstr) => {
    let div = document.createElement("span");
    let jdiv = $(div);
    let svgImg = $(svgstr);
    svgImg.css("width", "36px");
    svgImg.css("height", "36px");
    svgImg.css("padding", "0px");
    jdiv.css("width", "36px");
    jdiv.css("height", "36px");
    jdiv.css("padding", "2px");
    jdiv.on('mouseover', (evt) => {
      let target = svgImg;
      let svgMainPath = target.find(".svg_main_path");
      svgMainPath.attr("fill", '#E5DBFF');
    });
    jdiv.on('mouseout', (evt) => {
      let target = svgImg;
      let svgMainPath = target.find(".svg_main_path");
      svgMainPath.attr("fill", '#F7F7C6');
    });
    svgImg.on('click', (evt) => {
      console.log('mouse click on ', name);
      this.setTipVariant(name);
    });
    svgImg.appendTo(jdiv);
    jdiv.appendTo(svgHolder);
  });

  await KFK.checkSession();
};
//TODO: onPaste, disable when is not in designer
//TODO: onPaste paste position is wrong, need to fix.
KFK.checkSession = async function () {
  KFK.info(">>>checkSession");
  KFK.WSConnectTime = 0;
  KFK.setAppData("model", "prjs", []);
  //长期分享的URL格式为 HOST/doc/{doc_id}/code/{sharecode}
  //sharecode用于在新用户打开出,在其localStorage中记录这个sharecode
  //等该用户注册时,可以根据这个sharecode在服务器端的redis中查到是谁分享的
  //这样,就把quota给分享者加上去
  //对短期分享,URL格式为 hOST/share/{sharecode}
  //短期分享在REDIS服务器上的share_{sharecode}记录有48小时有效期
  let m = RegHelper.getDocIdInUrl($(location).attr("pathname"));
  if (m !== null) {
    KFK.docIdInUrl = m[1];
    KFK.docShareCode = m[2];
  } else {
    KFK.docIdInUrl = null;
    KFK.docShareCode = null;
  }
  KFK.shareCodeInUrl = RegHelper.getShareCodeInUrl($(location).attr("pathname"));
  let cocouser = await KFK.readLocalCocoUser();
  if (cocouser) {
    KFK.debug("checksession: found cocouser" + cocouser.name);
    KFK.setAppData('model', 'isDemoEnv', (cocouser.userid.indexOf("@cocopad_demo.org") > 0));
  } else {
    KFK.debug('checksession: NO local user');
  }
  if (cocouser && cocouser.sessionToken) {
    await WS.start(KFK.onWsConnected, KFK.onWsMsg, 500, "checkSession", "KEEP");
  } else if (KFK.shareCodeInUrl || KFK.docIdInUrl) {
    //两种URL形式都连接WS
    KFK.debug('checksession: connect to open sharecode');
    await WS.start(KFK.onWsConnected, KFK.onWsMsg, 500, "checkSession", "KEEP");
  } else {
    KFK.gotoRegister();
  }
  KFK.setAppData('show', 'waiting', false);
};

KFK.onWsConnected = function () {
  KFK.WSConnectTime = KFK.WSConnectTime + 1;
  KFK.info(">>>>>>>>>Connect Times", KFK.WSConnectTime);
  KFK.APP.setData("show", "wsready", true);
  //第一次连接，这条消息会被kj迎回来覆盖，正常
  if (KFK.WSConnectTime === 1) {
    KFK.scrLog("欢迎来到共创协作工作平台");
    //The first time
    KFK.WS = WS;
    //这里是第一次启动cocopad，服务器连接成功时的处理方式
    //refreshExplorer会用到很多需要Auth的操作，但shareDocInUrl不需要
    //如果URL中没有ShareCodeInURL
    //正常情况下，会进入到浏览器界面
    if (KFK.cocouser && KFK.cocouser.sessionToken && KFK.shareCodeInUrl === null && KFK.docIdInUrl === null) {
      KFK.refreshExplorer();
    }
    //如果有shareCodeInURL的话，则尝试直接打开这个分享文档
    //处理localStorage中的sharecode
    if (KFK.shareCodeInUrl !== null || KFK.docIdInUrl !== null) {
      //已经正常注册登陆的用户，不需要在本地保存shareCode
      if (KFK.cocouser && KFK.cocouser.sessionToken && KFK.cocouser.userid.indexOf("@cocopad_demo.org") < 0) {
        KFK.debug("正常用户不保存sharecode");
      } else {
        //sharecode根据情况,都放一个,这样后面正式注册时,删除
        //docIdInUrl时,这个sharecode与其实际doc_id不符,不过无所谓
        if (KFK.docIdInUrl !== null)
          localStorage.setItem('sharecode', KFK.docShareCode);
        else
          localStorage.setItem('sharecode', KFK.shareCodeInUrl);
      }
      if (KFK.shareCodeInUrl !== null)
        KFK.openShareCode(KFK.shareCodeInUrl, 'code');
      else
        KFK.openShareCode(KFK.docIdInUrl, 'doc');
    }
  } else {
    //重新连接
    KFK.debug('>>>>>>>>>Reconnect success...');
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
  KFK.APP.setData(data, key, value);
};

KFK.askShareCode = (doc_id) => {
  KFK.sendCmd("SHARECODE", { doc_id: doc_id });
}


//tyep is whether code or doc
//code. means url is HOST/share/sharecode format, from a temporary share (48 hours)
//doc, means url is HOST/doc/codi_id format, for a long term share
KFK.openShareCode = function (shareCode, type) {
  KFK.debug("openShareCode", shareCode, "type is", type);
  //如果是sharecode, 则去服务器取
  if (type === 'code') {
    KFK.debug("send OPENSHARECODE ", shareCode);
    KFK.sendCmd('OPENSHARECODE', { code: shareCode });
  } else//否则,就直接打开这个doc_id(放在shareCode变量中,为保持代码简化, 里面放的其实是doc_id) 
    KFK.refreshDesigner(shareCode, '');
};

KFK.refreshDesigner = async function (doc_id, docpwd) {
  KFK.info('>>>>>>refereshDesigner:', doc_id);
  await KFK.readLocalCocoUser();
  KFK.myHide($('#docHeaderInfo'));
  KFK.myHide(KFK.JC3);
  KFK.JC3.empty();
  KFK.initSvgLayer();
  let main = $("#containermain");
  main.css("transform", "scale(1, 1)");
  KFK.isZooming = false;

  KFK.opstack.splice(0, KFK.opstacklen);
  KFK.opz = -1;
  KFK.setAppData("model", "actionlog", []);

  KFK.showSection({
    signin: false,
    register: false,
    explorer: false,
    designer: true
  });
  KFK.tryToOpenDocId = doc_id;
  KFK.APP.setData("model", "cocodoc", KFK.DocController.getDummyDoc());
  localStorage.removeItem("cocodoc");
  // KFK.loadDoc(doc_id, docpwd);

  KFK.initShowEditors("none");
  KFK.addDocumentEventHandler();
  KFK.scrollContainer.scrollTop(0);
  KFK.scrollContainer.scrollLeft(0);
  KFK.focusOnC3();
  KFK.cancelAlreadySelected();

  KFK.setRightTabIndex(2);
  //需要在explorer状态下隐藏的，都可以加上noshow, 在进入Designer时，noshow会被去掉
  //并以动画形式显示出来
  $(".padlayout").removeClass("noshow");
  $(".padlayout").fadeIn(3000, function () {
    // Animation complete
  });

  KFK.info(">>>>>>Designer is fully ready, load doc[", doc_id, "] now");
  KFK.currentView = "designer";
  KFK.loadDoc(doc_id, docpwd);
}


KFK.loadDoc = function (doc_id, pwd) {
  KFK.info(">>>>>>loadDoc", doc_id);
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



KFK.refreshExplorer = function () {
  // KFK.APP.setData("model", "docLoaded", false);
  KFK.showSection({ signin: false, register: false, explorer: true, designer: false });
  KFK.refreshProjects();
  KFK.showPrjs();
  KFK.explorerRefreshed = true;
};

//这里检查是否有project
KFK.refreshProjects = function () {
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
      if (KFK.APP.model.prjs.length > 3) {
        KFK.showPrjs("请选择一个项目");
      } else {
        KFK.showCreateNewPrj();
      }
    } else {
      KFK.setCurrentPrj(prj);
      KFK.sendCmd("LISTDOC", { prjid: prj.prjid });
    }
  } else {
    KFK.sendCmd("LISTDOC", { prjid: "all" });
  }

  KFK.sendCmd("LISTPRJ", { skip: 0 });
};

KFK.setCurrentPrj = function (prj) {
  KFK.APP.setData("model", "project", prj);
  if (prj.prjid !== "all" && prj.prjid !== 'others' && prj.prjid !== "mine") {
    KFK.APP.setData("model", "lastrealproject", prj);
  }
  localStorage.setItem("cocoprj", JSON.stringify(prj));
};

KFK.clearCurrentProject = function () {
  KFK.APP.setData("model", "project", { prjid: '', name: '' });
  KFK.APP.setData("model", "lastrealproject", { prjid: '', name: '' });
  localStorage.removeItem("cocoprj");
};

KFK.gotoWork = async function () {
  KFK.debug(KFK.APP.model.prjs);
  KFK.debug(KFK.APP.model.docs);
  await KFK.checkSession();
}

KFK.resetAllLocalData = function () {
  localStorage.removeItem("cocoprj");
  localStorage.removeItem("cocodoc");
  KFK.APP.setData("model", "cocodoc", { doc_id: 'dummydocnotallowed', name: '', prjid: 'dummydocnotallowed', owner: 'dummydocnotallowed', doclocked: false }),
    KFK.APP.setData("model", "cocouser", { userid: '', name: '', avatar: 'avatar-0', avatar_src: null }),
    KFK.APP.setData("model", "project", { prjid: '', name: '' });
  KFK.APP.setData("model", "lastrealproject", { prjid: '', name: '' });
  KFK.APP.setData("model", "prjs", []);
  KFK.APP.setData("model", "docs", []);
};

KFK.showCreateNewDoc = function () {
  if (
    KFK.APP.model.lastrealproject.prjid === "" ||
    KFK.APP.model.lastrealproject.prjid === "all" ||
    KFK.APP.model.lastrealproject.prjid === "others" ||
    KFK.APP.model.lastrealproject.prjid === "mine"
  ) {
    KFK.pickPrjForCreateDoc();
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
  KFK.removeCocouser();
};

KFK.gotoRegister = function (docIdInUrl = null) {
  if (docIdInUrl) {
    KFK.setAppData('model', 'regforShared', true);
  }
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



KFK.pickPrjForCreateDoc = function () {
  KFK.onPrjSelected = KFK.showCreateNewDoc;
  KFK.showPrjs("在哪个项目中新建共创文档？", true);
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
KFK.selectDocTab = function () {
  KFK.APP.setData("show", "form", {
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
    explorerTabIndex: 1,
    bottomlinks: true
  });
};
KFK.showPrjs = function (msg = null, userealprjs = false) {
  let prjs = KFK.APP.model.prjs;
  if (Array.isArray(prjs) === false)
    prjs = [];
  if (prjs.length >= 3 && prjs[0].prjid === 'all' && userealprjs === true) {
    prjs.splice(0, 3);
    KFK.APP.setData("model", "prjs", prjs);
  }
  if (userealprjs === false && (prjs.length < 3 || prjs[0].prjid !== 'all')) {
    prjs.unshift({ _id: "mine", prjid: "mine", name: "我创建的所有项目中的白板", owner: "me" });
    prjs.unshift({ _id: "others", prjid: "others", name: "我参与过的别人共享的白板", owner: "me" });
    prjs.unshift({ _id: "all", prjid: "all", name: "我最近使用过的白板", owner: "me" });
    KFK.APP.setData("model", "prjs", prjs);
  }

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
KFK.showDocs = async function () {
  await KFK.APP.setData("show", "form", {
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
    bottomlinks: true,
    explorerTabIndex: 1
  });
};
KFK.sleep = async function (miliseconds) {
  await new Promise(resolve => setTimeout(resolve, miliseconds));
};

KFK.createNewDoc = function () {
  let docName = KFK.APP.model.newdocname;
  let docPwd = KFK.APP.model.newdocpwd;
  const schema = Joi.string()
    .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/)
    .required();
  let { error, value } = schema.validate(docName);
  if (error === undefined) {
    KFK.sendCmd("NEWDOC", {
      prjid: KFK.APP.model.lastrealproject.prjid,
      name: docName,
      pwd: docPwd
    });
    return true;
  } else {
    return false;
  }
};
KFK.createNewPrj = function () {
  let prjName = KFK.APP.model.newprjname;
  const schema = Joi.string()
    .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/)
    .required();
  let { error, value } = schema.validate(prjName);
  if (error === undefined) {
    KFK.sendCmd("NEWPRJ", { name: prjName });
    return true;
  } else {
    return false;
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
    case "NEEDAUTH":
      KFK.scrLog('需要先登录，谢谢');
      KFK.debug(response.msg);
      KFK.removeCocouser("cocouser");
      KFK.WS.keepFlag = "ONCE";
      KFK.WS.close();
      KFK.gotoSignin();
      break;
    case "SIGNOUT":
      KFK.scrLog('你已成功退出共创协同平台');
      KFK.removeCocouser("cocouser");
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
      setTimeout(() => { KFK.gotoWork(); }, 500);
      break;
    case "UPD":
      KFK.updateReceived++;
      KFK.recreateObject(response.block);
      break;
    case "SYNC":
      KFK.updateReceived++;
      KFK.recreateObject(response.block);
      break;
    case "DEL":
      KFK.updateReceived++;
      KFK.deleteObject_for_Response(response.block);
      break;
    case "ASKPWD":
      KFK.showDialog({ inputDocPasswordDialog: true });
      break;
    case "RESETPWD":
      KFK.APP.model.docs.forEach(doc => {
        if (doc._id === response.doc_id) {
          if (response.pwd === "") {
            doc.security_icon = "blank";
            doc.pwd = "";
          } else {
            doc.security_icon = "three-dots";
            doc.pwd = "*********";
          }
        }
      });
      break;
    case "REMOVEPWD":
      KFK.APP.model.docs.forEach(doc => {
        if (doc._id === response.doc_id) {
          if (response.pwd === "") {
            doc.security_icon = "blank";
            doc.pwd = "";
          } else {
            doc.security_icon = "three-dots";
            doc.pwd = "*********";
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
          doc.doclocked = response.doclocked;
          if (doc.doclocked === true) {
            doc.doclocked_icon = "lock";
            doc.doclocked_variant = "primary";
          } else {
            doc.doclocked_icon = "blank";
            doc.doclocked_variant = "outline-primary";
          }
        }
      });
      if (response.doc_id === KFK.APP.model.cocodoc.doc_id) {
        KFK.APP.model.cocodoc.doclocked = response.doclocked;
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
      KFK.refreshProjects();
      KFK.showPrjs();
      break;
    case "NEWDOC":
      KFK.updatePrjDoclist(response.doc.prjid);
      await KFK.refreshDesigner(
        response.doc._id,
        KFK.APP.model.newdocpwd.trim()
      );
      break;
    case "LISTDOC":
      KFK.APP.setData("model", "listdocoption", response.option);
      let docs = response.docs;
      docs.forEach(doc => {
        if (doc.pwd === "") {
          doc.security_icon = "blank";
          doc.security_variant = "outline-success";
        } else {
          doc.security_icon = "three-dots";
          doc.security_variant = "success";
        }
        if (doc.doclocked === true) {
          doc.doclocked_icon = "lock";
          doc.doclocked_variant = "primary";
        } else {
          doc.doclocked_icon = "blank";
          doc.doclocked_variant = "outline-primary";
        }
        if (doc.ownerAvatar !== "") {
          doc.ownerAvatarSrc = KFK.avatars[doc.ownerAvatar].src;
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
      let prjs = response.prjs;
      KFK.APP.setData("model", "prjs", prjs);
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
      for (let i = 2; i < KFK.APP.model.prjs.length; i++) {
        if (gotoPrjId === KFK.APP.model.prjs[i].prjid) {
          found = i;
          break;
        }
      }
      if (found > 1) {
        KFK.setCurrentPrj(KFK.APP.model.prjs[found]);
      }
      KFK.sendCmd("LISTDOC", { prjid: gotoPrjId });
      KFK.showDocs();
      break;
    case "SETPROFILE-TRUE":
      KFK.scrLog("基本资料已设置成功");
      KFK.updateCocouser(response.info);
      break;
    case "SETPROFILE-FAIL":
      KFK.scrLog("基本资料未成功设置，请重试" + response.error);
      break;
    case 'EMAILSHARE':
    case 'SHARECODE':
    case 'OPENSHARECODE':
    case 'OPENSHARECODE-FALSE':
      SHARE.onWsMsg(response);
      break;
    case 'ERROR':
      KFK.error(response.msg);
      break;
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
  return cocouser;
};

KFK.openDemoDoc = function () {
  KFK.log("Not implemented");
}

KFK.deletePrj = async function (prjid) {
  let payload = { prjid: prjid };
  await KFK.sendCmd("DELPRJ", payload);
  if (KFK.APP.model.prjs.length > 2) {
    KFK.APP.setData("model", "project", KFK.APP.model.prjs[2]);
    KFK.APP.setData("model", "lastrealproject", KFK.APP.model.prjs[2]);
    KFK.sendCmd("LISTDOC", { prjid: KFK.APP.model.prjs[2].prjid });
    KFK.showPrjs();
  } else {
    KFK.showCreateNewPrj();
    KFK.APP.setData("model", "lastrealproject", { prjid: "", name: "" });
  }
};

KFK.msgOK = function () {
  KFK.showSection({
    sigin: false,
    register: false,
    explorer: true,
    designer: false
  });
  KFK.showDocs();
};

KFK.deleteDoc = async function (doc_id) {
  let payload = { doc_id: doc_id };
  await KFK.sendCmd("DELDOC", payload);
  if (KFK.APP.model.docs.length > 0) {
    let nextdoc = KFK.APP.model.docs[0];
    KFK.APP.setData("model", "cocodoc", nextdoc);
    KFK.showDocs();
  } else {
    KFK.APP.setData("model", "cocodoc", KFK.DocController.getDummyDoc());
  }
};

KFK.setDocReadonly = async function (doc, index, evt) {
  KFK.sendCmd("TGLREAD", { doc_id: doc._id });
};

KFK.prjRowClickHandler = function (record, index) {
  KFK.APP.setData("model", "project", {
    prjid: record.prjid,
    name: record.name
  });
  if (record.prjid !== "all" && record.prjid !== "mine"
    && record.prjid !== 'others') {
    let cocoprj = { prjid: record.prjid, name: record.name };
    KFK.setCurrentPrj(cocoprj);
  }
  KFK.sendCmd("LISTDOC", { prjid: record.prjid });
  if (KFK.onPrjSelected) {
    KFK.onPrjSelected();
  } else {
    KFK.showDocs();
  }
};

KFK.gotoRecent = function () {
  KFK.sendCmd("LISTDOC", { prjid: 'all' });
  KFK.showDocs();
  KFK.showForm({
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
    explorerTabIndex: 1,
  });

}

KFK.updatePrjDoclist = function (prjid) {
  KFK.sendCmd("LISTDOC", { prjid: prjid });
};

KFK.sendCmd = async function (cmd, payload) {
  if (KFK.WS === null) {
    KFK.warn('sendCmcd when KFK.WS is null. cmd is', cmd, 'payload is', payload);
  } else
    await KFK.WS.put(cmd, payload);
};

KFK.docRowClickHandler = async function (record, index) {
  if (record.pwd === "*********") {
    KFK.APP.setData("model", "opendocpwd", "");
    KFK.showDialog({ inputDocPasswordDialog: true });
    KFK.tryToOpenDocId = record._id;
  } else {
    await KFK.refreshDesigner(record._id, "");
  }
};

KFK.getDocPwd = async function () {
  KFK.APP.setData("model", "passwordinputok", "ok");
  await KFK.refreshDesigner(KFK.tryToOpenDocId, KFK.APP.model.opendocpwd);
};
KFK.cancelDocPwd = function () {
  KFK.APP.setData("model", "passwordinputok", "cancel");
  KFK.refreshExplorer();
};
KFK.onDocPwdHidden = function (bvModalEvt) {
  //这个值初始为show,这样，不运行点对话框外部，把对话框隐藏起来
  if (KFK.APP.model.passwordinputok === "show") bvModalEvt.preventDefault();
};


KFK.shareThisDoc = function () {
  KFK.setAppData("model", "docNameToShare", KFK.APP.model.cocodoc.name);
  KFK.dataToShare = `http://localhost:1234/doc/${KFK.APP.model.cocodoc.doc_id}`;
  KFK.showForm({ share: true });
};
KFK.shareDone = function () {
  KFK.showForm({ share: false });
  KFK.scrLog("分享地址以放入剪贴板，请粘贴给其他人");
};

KFK.showResetPwdModal = function (item, index, button) {
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
  KFK.myFadeIn($('#docHeaderInfo'));
  KFK.docDuringLoading = null;
  // KFK.JC3.removeClass("noshow");
  KFK.APP.setData("model", "docLoaded", true);
  if (KFK.APP.model.cocodoc.doclocked) {
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
  KFK.info(KFK.APP.model.cocodoc);
  KFK.C3.dispatchEvent(KFK.refreshC3event);
  await KFK.sleep(500);
  KFK.myFadeOut($('.loading'));
  KFK.myFadeIn(KFK.JC3, 400);
  KFK.focusOnC3();
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
KFK.recreateDoc = function (obj, callback) {
  let html = obj.html;
  try {
    let docRet = html;
    docRet.ownerAvatar_src = KFK.avatars[docRet.ownerAvatar].src;
    KFK.debug('recreateDoc()', docRet);
    KFK.APP.setData("model", "cocodoc", docRet);
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
      if (KFK.APP.model.cocodoc.doclocked === false) {
        KFK.setNodeEventHandler(jqDIV);
        if (isALockedNode) {
          // KFK.debug('is a locked');
          KFK.NodeController.lock(jqDIV);
        }
        //不能有下面这个判断，因为即便一个节点没有linkTo, 但可能还有节点的linkTO指向这个节点
        // if (jqDIV.attr("linkto") && jqDIV.attr("linkto").length > 0)
        KFK.redrawLinkLines(jqDIV, 'server update');
      }
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
  if (KFK.hoverJqDiv() !== null)
    return KFK.hoverJqDiv();
  if (KFK.lastFocusOnJqNode != null) {
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

KFK.initPropertyForm = function () {
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

  $("input.fonts")
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
        Arial: { category: "sans-serif", variants: "400,400i,600,600i" },
        "Courier New": { category: "monospace", variants: "400,400i,600,600i" },
        Georgia: { category: "serif", variants: "400,400i,600,600i" },
        Tahoma: { category: "sans-serif", variants: "400,400i,600,600i" },
        "Times New Roman": { category: "serif", variants: "400,400i,600,600i" },
        "Trebuchet MS": {
          category: "sans-serif",
          variants: "400,400i,600,600i"
        },
        Verdana: { category: "sans-serif", variants: "400,400i,600,600i" },
        SimSun: { category: "sans-serif", variants: "400,400i,600,600i" },
        SimHei: { category: "sans-serif", variants: "400,400i,600,600i" },
        "Microsoft Yahei": {
          category: "sans-serif",
          variants: "400,400i,600,600i"
        },
        KaiTi: { category: "sans-serif", variants: "400,400i,600,600i" },
        FangSong: { category: "sans-serif", variants: "400,400i,600,600i" },
        STHeiti: { category: "sans-serif", variants: "400,400i,600,600i" },
        "Hanzipen SC": {
          category: "sans-serif",
          variants: "400,400i,600,600i"
        },
        "Hannotate SC": {
          category: "sans-serif",
          variants: "400,400i,600,600i"
        },
        "Xingkai SC": { category: "sans-serif", variants: "400,400i,600,600i" },
        "Yapi SC": { category: "sans-serif", variants: "400,400i,600,600i" },
        "Yuanti SC": { category: "sans-serif", variants: "400,400i,600,600i" }
      }
    })
    .on("change", async function () {
      // Split font into family and weight/style
      var fontInfo = $("input.fonts").val().split(":"),
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
  $("input.fonts").height(12);
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

KFK.initColorPicker = function () {
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
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      KFK.APP.setBGto(color.toRgbString());
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
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      KFK.APP.setData("model", "shapeBkgColor", rgb);
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode !== null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("background-color", rgb);
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
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      // KFK.APP.setBGto(color.toRgbString());
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("border-color", color.toRgbString());
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
      let theLine = KFK.getPropertyApplyToSvgLine();
      if (theLine === null || KFK.anyLocked(theLine)) return;
      theLine.attr("stroke", color.toRgbString());
      KFK.setLineModel({ color: color.toRgbString() });
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
      // KFK.APP.setBGto(color.toRgbString());
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("color", color.toRgbString());
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
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      KFK.APP.setData("model", "tipBkgColor", rgb);
      let theJqNode = KFK.getPropertyApplyToJqNode();
      if (theJqNode != null && KFK.notAnyLocked(theJqNode)) {
        KFK.fromJQ = theJqNode.clone();
        KFK.setTipBkgColor(theJqNode, rgb);
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
  if (KFK.docLocked()) mode = "pointer";

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
    if (KFK.editting || KFK.isZooming) return;
    switch (evt.keyCode) {
      case 27:
        //ESC
        //TODO: make real fullscreen? how can Miro do?
        if (KFK.fullScreen) {
          KFK.toggleFullScreen();
        }
        if (KFK.isZooming === true) {
          KFK.zoomStop();
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
      case 88:
        if (evt.metaKey || evt.ctrlKey) {
          KFK.logKey('META-X');
          KFK.deleteHoverOrSelectedDiv(evt);
          KFK.holdEvent(evt);
        }
        break;
      case 68:
        if (evt.metaKey || evt.ctrlKey) {
          KFK.logKey('META-D');
          KFK.duplicateHoverObject(evt);
          KFK.holdEvent(evt);
        }
        break;
      case 84:
        if (evt.metaKey || evt.ctrlKey) {
          KFK.logKey('META-T');
          KFK.ZiToTop();
          KFK.holdEvent(evt);
        }
        break;
      case 66:
        if (evt.metaKey || evt.ctrlKey) {
          KFK.logKey('META-B');
          KFK.ZiToBottom();
          KFK.holdEvent(evt);
        }
        break;
      case 72:
        if (evt.metaKey || evt.ctrlKey) {
          KFK.logKey('META-H');
          KFK.ZiToHigher();
          KFK.holdEvent(evt);
        }
        break;
      case 71:
        if (evt.metaKey || evt.ctrlKey) {
          KFK.logKey('META-G');
          KFK.ZiToLower();
          KFK.holdEvent(evt);
        }
        break;
      case 76:
        if (evt.metaKey || evt.ctrlKey) {
          KFK.logKey('META-SHIFT-L');
          KFK.tryToLockUnlock();
          KFK.holdEvent(evt);
        }
        break;
      /*
    case 55:
      if (evt.metaKey || evt.ctrlKey) {
        KFK.logKey('META-7');
        let tmpJq= KFK.getPropertyApplyToJqNode();
        if (tmpJq !== null && KFK.notAnyLocked(tmpJq)) {
          KFK.setAlignmentDirectly(tmpJq, 'flex-start');
        }
      }
      break;
    case 56:
      if (evt.metaKey || evt.ctrlKey) {
        KFK.logKey('META-8');
        let jqNode = KFK.getPropertyApplyToJqNode();
        if (jqNode != null && KFK.notAnyLocked(jqNode)) {
          KFK.setAlignmentDirectly(jqNode, 'center');
        }
      }
      break;
    case 57:
      if (evt.metaKey || evt.ctrlKey) {
        KFK.logKey('META-9');
        let jqNode = KFK.getPropertyApplyToJqNode();
        if (jqNode != null && KFK.notAnyLocked(jqNode)) {
          KFK.setAlignmentDirectly(jqNode, 'flex-end');
        }
      }
      evt.preventDefault();
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      break;
      */
      default:
        preventDefault = false;

    }
  });

  let timer = null;
  $("#scroll-container").scroll(() => {
    if (KFK.inDesigner() === false) return;
    let sx = $("#scroll-container").scrollLeft();
    let sy = $("#scroll-container").scrollTop();
    if (KFK.scrollBugPatched === false) {
      KFK.scrollContainer = $("#scroll-container");
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
        // KFK.drawGridlines(deltaX, deltaY);
        KFK.JCM.css('background-position-x', deltaX);
        KFK.JCM.css('background-position-y', deltaY);
        timer = null;
      }, 500);
    }
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
  if (KFK.hoverJqDiv() && KFK.isMyDoc() && KFK.docLocked() === false) {
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
  } else if (KFK.hoverSvgLine() && KFK.isMyDoc() && KFK.docLocked() === false) {
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
  if (KFK.APP.model.cocodoc.doclocked) {
    return;
  }
  if (KFK.fullScreen || KFK.controlButtonsOnly) return;
  $("#right").toggle("slide", { duration: 100, direction: "right" });
};
KFK.toggleFullScreen = function (evt) {
  if (KFK.isZooming === true) {
    KFK.zoomStop();
  }
  KFK.fullScreen = !KFK.fullScreen;
  KFK.showSection({ minimap: !KFK.fullScreen });
  let display = KFK.fullScreen ? 'none' : 'block';
  $("#left").css("display", display);
  $("#right").css("display", display);
  KFK.APP.setData('show', 'actionlog', false);
  $('#docHeaderInfo').css("visibility", KFK.fullScreen ? 'hidden' : 'visible');
  $('#rtcontrol').css("visibility", KFK.fullScreen ? 'hidden' : 'visible');
  $('#toplogo').css("visibility", KFK.fullScreen ? 'hidden' : 'visible');
  if (KFK.fullScreen) {
    KFK.openFullscreen();
  } else {
    KFK.closeFullscreen();
  }
};

KFK.toggleControlButtonOnly = function (evt) {
  KFK.controlButtonsOnly = !KFK.controlButtonsOnly;
  if (KFK.APP.model.cocodoc.doclocked) {
    //文档锁定时，依然可以对minimap切换显示与否
    KFK.showSection({ minimap: !KFK.controlButtonsOnly });
    return;
  }
  //左侧和右侧的工具栏，可进行切换
  let display = KFK.controlButtonsOnly ? 'none' : 'block';
  $("#left").css("display", display);
  $("#right").css("display", display);
  //actionlog总是关闭
  KFK.APP.setData('show', 'actionlog', false);
  //切换minimap
  KFK.showSection({ minimap: !KFK.controlButtonsOnly });
};
KFK.showHidePanel = function (flag) {
  if (flag === true && (KFK.fullScreen === false && KFK.controlButtonsOnly === false)) {
    $("#left").css("display", "block");
    $("#right").css("display", "block");
  } else {
    $("#left").css("display", "none");
    $("#right").css("display", "none");
  }
};

KFK.gotoExplorer = function () {
  if (KFK.APP.model.project.name === '') {
    KFK.setAppData("model", "project", { "prjid": "all", "name": "我最近使用过的白板" });
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
};

KFK.gotoDesigner = function () {
  KFK.showSection({ explorer: false, designer: true });
  KFK.currentView = "designer";
  KFK.focusOnC3();
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
      .catch(err => {
        KFK.error(err);
      });
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
      KFK.debug(showbox ? 'showbox' : 'no showbox');
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
    if (KFK.isZooming) return;

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
      KFK.currentMousePos.x + KFK.scrollContainer.scrollLeft(),
      KFK.currentMousePos.y + KFK.scrollContainer.scrollTop(),
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

KFK.onPaste = function (evt) {
  if (KFK.docLocked() || KFK.isZooming) return;
  if (KFK.currentView !== 'designer') return;
  let content = { html: "", text: "", image: null };
  content.html = evt.clipboardData.getData("text/html");
  content.text = evt.clipboardData.getData("Text");
  var items = (evt.clipboardData || evt.originalEvent.clipboardData).items;
  if (items[1]) {
    KFK.showTextPasteDialog(content);
  } else if (items[0]) {
    if (items[0].kind === "string") {
      KFK.showTextPasteDialog(content);
    } else if (items[0].kind === "file") {
      var blob = items[0].getAsFile();
      KFK.saveBlobToOSS(blob);
    }
  }
};

document.onpaste = KFK.onPaste;

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
  let center = KFK.scrCenter();
  let centerX = cx ? cx : center.x;
  let centerY = cy ? cy : center.y;
  $("#centerpoint").css("left", centerX - 10);
  $("#centerpoint").css("top", centerY - 10);
};

//just before rebuild zoomin/zoomout
KFK.zoomIn = function () {
  KFK.zoomStart("in");
  if (KFK.designerConf.scaleX > 4) return;
  let main = $("#containermain");
  let scroller = $("#scroll-container");

  let scaleBy = 1.1;
  let oldScaleX = KFK.designerConf.scaleX;
  let oldScaleY = KFK.designerConf.scaleY;
  let newScaleX = oldScaleX * scaleBy;
  let newScaleY = oldScaleY * scaleBy;
  KFK.designerConf.scaleX = newScaleX;
  KFK.designerConf.scaleY = newScaleY;
  let scrCenter = KFK.scrCenter();

  KFK.showCenterIndicator(scrCenter.x, scrCenter.y);
  try {
    if (newScaleX >= 1) {
      let physicalX = (scroller.scrollLeft() + scrCenter.x) / oldScaleX;
      let physicalY = (scroller.scrollTop() + scrCenter.y) / oldScaleY;

      let newLeft = (newScaleX - 1) * KFK._width * 0.5;
      let newTop = (newScaleY - 1) * KFK._height * 0.5;
      main.css("left", newLeft);
      main.css("top", newTop);
      main.css("transform", `scale(${newScaleX}, ${newScaleY})`);
      KFK.designerConf.left = newLeft;
      KFK.designerConf.top = newTop;

      let tmpX = physicalX * newScaleX - scrCenter.x;
      let tmpY = physicalY * newScaleY - scrCenter.y;
      scroller.scrollLeft(tmpX);
      scroller.scrollTop(tmpY);
    } else {
      let tmpX =
        (1 - newScaleX) * KFK._width * 0.5 +
        $(window).width() * newScaleX * 0.5 -
        $(window).width() * 1 * 0.5;
      let tmpY =
        (1 - newScaleY) * KFK._height * 0.5 +
        $(window).height() * newScaleY * 0.5 -
        $(window).height() * 1 * 0.5;
      main.css("left", -tmpX);
      main.css("top", -tmpY);
      main.css("transform", `scale(${newScaleX}, ${newScaleY})`);
      let sx = (scroller.scrollLeft() / oldScaleX) * newScaleX;
      let sy = (scroller.scrollTop() / oldScaleY) * newScaleY;
      scroller.scrollLeft(sx);
      scroller.scrollTop(sy);
    }
  } finally {
    KFK.zoomlevel = newScaleX;
    KFK.C3.dispatchEvent(KFK.zoomEvent);
  }
};
KFK.zoomOut = function () {
  KFK.zoomStart("out");
  if (KFK.designerConf.scaleX < 0.25) return;
  let main = $("#containermain");
  let scroller = $("#scroll-container");

  let scaleBy = 1.1;
  let oldScaleX = KFK.designerConf.scaleX;
  let oldScaleY = KFK.designerConf.scaleY;
  let newScaleX = oldScaleX / scaleBy;
  let newScaleY = oldScaleY / scaleBy;
  KFK.designerConf.scaleX = newScaleX;
  KFK.designerConf.scaleY = newScaleY;
  let scrCenter = KFK.scrCenter();

  KFK.showCenterIndicator(scrCenter.x, scrCenter.y);
  try {
    if (newScaleX >= 1) {
      let physicalX = (scroller.scrollLeft() + scrCenter.x) / oldScaleX;
      let physicalY = (scroller.scrollTop() + scrCenter.y) / oldScaleY;

      let newLeft = (newScaleX - 1) * KFK._width * 0.5;
      let newTop = (newScaleY - 1) * KFK._height * 0.5;
      main.css("left", newLeft);
      main.css("top", newTop);
      main.css("transform", `scale(${newScaleX}, ${newScaleY})`);
      KFK.designerConf.left = newLeft;
      KFK.designerConf.top = newTop;

      let tmpX = physicalX * newScaleX - scrCenter.x;
      let tmpY = physicalY * newScaleY - scrCenter.y;
      if (newScaleX === 1 && tmpX !== 0) {
        console.error("something wrong tmpX should be 0, but got", tmpX);
        tmpX = 0;
        tmpY = 0;
      }
      scroller.scrollLeft(tmpX);
      scroller.scrollTop(tmpY);
    } else {
      let tmpX =
        (1 - newScaleX) * KFK._width * 0.5 +
        $(window).width() * newScaleX * 0.5 -
        $(window).width() * 1 * 0.5;
      let tmpY =
        (1 - newScaleY) * KFK._height * 0.5 +
        $(window).height() * newScaleY * 0.5 -
        $(window).height() * 1 * 0.5;
      main.css("left", -tmpX);
      main.css("top", -tmpY);
      main.css("transform", `scale(${newScaleX}, ${newScaleY})`);
      let sx = (scroller.scrollLeft() / oldScaleX) * newScaleX;
      let sy = (scroller.scrollTop() / oldScaleY) * newScaleY;
      scroller.scrollLeft(sx);
      scroller.scrollTop(sy);
    }
  } finally {
    KFK.zoomlevel = newScaleX;
    KFK.C3.dispatchEvent(KFK.zoomEvent);
  }
};

KFK.zoomStart = function (inOrOut) {
  KFK.isZooming = true;
  KFK.lastZoomTool = inOrOut;
  KFK.showHidePanel(false);
  $("#centerpoint").removeClass("noshow");
  $(".ui-resizable").resizable("disable");
  $(".ui-draggable").draggable("disable");
  $(".ui-droppable").droppable("disable");
};
KFK.printCallStack = function () {
  KFK.info(new Error().stack);
};

KFK.zoomStop = function () {
  $("#centerpoint").addClass("noshow");
  $(".ui-resizable").resizable("enable");
  $(".ui-draggable").draggable("enable");
  $(".ui-droppable").droppable("enable");
  KFK.showHidePanel(!KFK.APP.model.cocodoc.doclocked);
  try {
    let main = $("#containermain");
    let scroller = $("#scroll-container");

    let scaleBy = 1.1;
    let oldScaleX = KFK.designerConf.scaleX;
    let oldScaleY = KFK.designerConf.scaleY;
    let newScaleX = 1;
    let newScaleY = 1;
    KFK.designerConf.scaleX = newScaleX;
    KFK.designerConf.scaleY = newScaleY;
    let scrCenter = KFK.scrCenter();

    KFK.showCenterIndicator(scrCenter.x, scrCenter.y);
    if (oldScaleX > 1) {
      let physicalX = (scroller.scrollLeft() + scrCenter.x) / oldScaleX;
      let physicalY = (scroller.scrollTop() + scrCenter.y) / oldScaleY;

      let newLeft = (newScaleX - 1) * KFK._width * 0.5;
      let newTop = (newScaleY - 1) * KFK._height * 0.5;
      main.css("left", newLeft);
      main.css("top", newTop);
      main.css("transform", `scale(${newScaleX}, ${newScaleY})`);
      KFK.designerConf.left = newLeft;
      KFK.designerConf.top = newTop;

      let tmpX = physicalX * newScaleX - scrCenter.x;
      let tmpY = physicalY * newScaleY - scrCenter.y;
      scroller.scrollLeft(tmpX);
      scroller.scrollTop(tmpY);
    } else if (oldScaleX < 1) {
      let tmpX =
        (1 - newScaleX) * KFK._width * 0.5 +
        $(window).width() * newScaleX * 0.5 -
        $(window).width() * 1 * 0.5;
      let tmpY =
        (1 - newScaleY) * KFK._height * 0.5 +
        $(window).height() * newScaleY * 0.5 -
        $(window).height() * 1 * 0.5;
      main.css("left", -tmpX);
      main.css("top", -tmpY);
      main.css("transform", `scale(${newScaleX}, ${newScaleY})`);
      let sx = (scroller.scrollLeft() / oldScaleX) * newScaleX;
      let sy = (scroller.scrollTop() / oldScaleY) * newScaleY;
      scroller.scrollLeft(sx);
      scroller.scrollTop(sy);
    }
  } finally {
    KFK.zoomlevel = 1;
    KFK.C3.dispatchEvent(KFK.zoomEvent);
    KFK.isZooming = false;
  }
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

  KFK.scrollContainer = $("#scroll-container");
  let scrollX = left - $(window).width() * 0.5 + width * 0.5;
  let scrollY = top - $(window).height() * 0.5 + height * 0.5;
  KFK.scrollContainer.scrollTop(scrollY);
  KFK.scrollContainer.scrollLeft(scrollX);

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

KFK.showCopyDocDialog = (item, index, target) => {
  KFK.tobeCopyDocId = item._id;
  KFK.setAppData("model", "copyToDocName", item.name);
  KFK.setAppData(
    "model",
    "showCopyOrMove",
    item.owner === KFK.APP.model.cocouser.userid
  );
  KFK.showDialog({ copyDocDialog: true });
};

KFK.copyDoc = () => {
  let payload = {
    fromDocId: KFK.tobeCopyDocId,
    toPrjId: KFK.APP.model.copyToPrjId,
    toName: KFK.APP.model.copyToDocName,
    copyOrMove: KFK.APP.model.check.copyOrMove
  };
  KFK.sendCmd("COPYDOC", payload);
  // let payload = { from: from, to: to };
  // KFK.sendCmd('COPYDOC', payload);
};

KFK.onCopyDoc = async function (data) {
  KFK.info(data);
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
  KFK.APP.state.profile.name = KFK.validateUserName(
    KFK.APP.model.profileToSet.name
  );
  KFK.APP.state.profile.oldpwd = KFK.validateUserPassword(
    KFK.APP.model.profileToSet.oldpwd
  );
  KFK.APP.state.profile.newpwd = true;
  KFK.APP.state.profile.newpwd2 = true;
  //修改Profile时，新密码可以为空，则表示不修改密码，
  if (KFK.APP.model.profileToSet.newpwd.trim() !== "") {
    KFK.APP.state.profile.newpwd = KFK.validateUserPassword(
      KFK.APP.model.profileToSet.newpwd
    );
    KFK.APP.state.profile.newpwd2 = KFK.validateUserPassword(
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

KFK.validateUserName = function (str) {
  const schema1 = Joi.string()
    .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{4,10}$/)
    .required();
  const schema2 = Joi.string()
    .regex(/^[\u4e00-\u9fa5]{2,10}$/)
    .required();
  let { error, value } = schema1.validate(str);
  if (!error) {
    KFK.debug("english checking ", str, "true");
    return true;
  } else {
    let { error, value } = schema2.validate(str);
    if (!error) {
      KFK.debug("chinese checking ", str, "true");
      return true;
    } else {
      KFK.debug("checking ", str, "false");
      return false;
    }
  }
};

KFK.validateUserPassword = function (str) {
  const schema = Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
      // 至少8个字符，至少1个大写字母，1个小写字母，1个数字和1个特殊字符：
    )
    .required();
  let { error, value } = schema.validate(str);
  if (!error) {
    KFK.debug("checking ", str, "true");
    return true;
  } else {
    KFK.debug("checking ", str, "false");
    return false;
  }
};

KFK.validateUserId = function (str) {
  const schema = Joi.string()
    .regex(
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      // 邮箱地址  validate email address
    )
    .required();
  let { error, value } = schema.validate(str);
  if (!error) {
    KFK.debug("checking ", str, "true");
    return true;
  } else KFK.debug("checking ", str, "false");
  return false;
};

// localStorage.removeItem('cocouser');
// KFK.debug(config.defaultDocBgcolor);
config.defaultDocBgcolor = "#ABABAB";
// KFK.debug(config.defaultDocBgcolor);
// KFK.debug("console.js begin loadimages");
//Start the APP
KFK.loadImages();
KFK.loadAvatars();

KFK.initSvgLayer = function () {
  KFK.svgDraw = SVG().addTo("#C3").size(KFK._width, KFK._height);
  KFK.debug('svg layer initialized');
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
  return { x: KFK.scrollX(evt.clientX), y: KFK.scrollY(evt.clientY) };
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
      KFK.moveLineMoverTo(KFK.scrollToScreen({ x: parr[0][0], y: parr[0][1] }));
    } else if (KFK.mouseNear(
      KFK.C3MousePos(evt),
      { x: parr[1][0], y: parr[1][1] },
      20
    )) {
      $("#linetransformer").css("visibility", "visible");
      KFK.moveLinePoint = "to";
      KFK.lineToResize = theLine;
      KFK.setLineToRemember(theLine);
      KFK.moveLineMoverTo(KFK.scrollToScreen({ x: parr[1][0], y: parr[1][1] }));
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
      x: KFK.scrollX(evt.clientX),
      y: KFK.scrollY(evt.clientY)
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
  $("#linetransformer").draggable({
    // move line drag line
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
  console.log('open Full screen');
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
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
};

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
