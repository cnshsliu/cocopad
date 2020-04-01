import url from "url";
import path from "path";
import Konva from "konva";
import suuid from "short-uuid";
import ClipboardJs from "clipboard";
import Demo from "./demo";
import Joi from "@hapi/joi";
import "core-js/stable";
import "regenerator-runtime/runtime";
import SVGs from "./svgs";
// import uuidv4 from "uuid/v4";
import assetIcons from "../assets/*.svg";
import avatarIcons from "../assets/avatar/*.svg";
import OSS from "ossnolookup";
import "./importjquery";
import "jquery-ui-dist/jquery-ui.js";
import "spectrum-colorpicker2/dist/spectrum.min";
import "../lib/fontpicker-jquery-plugin/dist/jquery.fontpicker";
import "../lib/jquery.line/jquery.line";
import "../lib/jquery-minimap/jquery-minimap";
import { SVG } from "@svgdotjs/svg.js";
import WS from "./ws";
import config from "./config";

function x(msg) {
  console.log(msg);
}
function myuid() {
  return suuid.generate();
}
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

let badgeTimers = {};
var FROM_SERVER = true;
var FROM_CLIENT = false;
var NO_SHIFT = false;

const OSSClient = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "0fKFa2tFodMQQETJ",
  accessKeySecret: "xpilgsl4KQbfnFDZkRMy0Dp1KuoW8A",
  bucket: config.vault.bucket
});
let draw = null;
const KFK = {};
KFK.svgAnimDuration = 400;
KFK.svgHoverLine = null;
KFK.tempSvgLine = null;
KFK.isZooming = false;
KFK.zoomlevel = 1;
KFK.designerConf = { scaleX: 1, scaleY: 1, left: 0, top: 0 };
KFK.opstack = [];
KFK.opstacklen = 10;
KFK.opz = -1;
KFK.mouseTimer = null;
KFK.connectTime = 0;
KFK.WS = null;
KFK.JC3 = null;
KFK.zoomFactor = 0;
KFK.lineMoverDragging = false;
KFK.scaleBy = 1.01;
KFK.centerPos = { x: 0, y: 0 };
KFK.centerPos = { x: 0, y: 0 };
KFK.lastFocusOnJqNode = null;
KFK.justCreatedJqNode = null;
KFK._jqhoverdiv = null;
KFK.inited = false;
KFK.divInClipboard = undefined;
KFK.lineTemping = false;
KFK.ignoreClick = false;
KFK.scrollFixed = false;
KFK.actionLogToView = { editor: "", actionlog: [] };
KFK.actionLogToViewIndex = 0;
KFK.expoloerRefreshed = false;
KFK.numberOfNodeToCreate = 0;
KFK.numberOfNodeCreated = 0;

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

KFK.dragStage = new Konva.Stage({
  container: "containerbkg",
  width: window.innerWidth,
  height: window.innerHeight
});
KFK.containermain = document.getElementById("containermain");
KFK.containermain.tabIndex = 1;
// KFK.containermain.style.width = KFK._width + "px";
// KFK.containermain.style.height = KFK._height + "px";
KFK.focusOnMainContainer = () => {
  KFK.containermain.focus();
};
KFK.focusOnMainContainer();
KFK.dragContainer = KFK.dragStage.container();
KFK.scrollContainer = $("#scroll-container");
KFK.lockMode = false;
KFK.selectedDIVs = [];
KFK.selectedLINs = [];
KFK.mouseIsDown = false;
KFK.dragToSelectFrom = { x: 0, y: 0 };
KFK.dragToSelectTo = { x: 0, y: 0 };
KFK.duringKuangXuan = false;

KFK.currentMousePos = { x: -1, y: -1 };
$(document).mousedown(event => {
  if (KFK.inDesigner() === false) return;
  if (KFK.mode === "pointer" && KFK.docLocked() === false) {
    KFK.mouseIsDown = true;
    KFK.dragToSelectFrom = {
      x: KFK.scrollX(event.clientX),
      y: KFK.scrollY(event.clientY)
    };
  }
});
$(document).mouseup(event => {
  if (KFK.inDesigner() === false) return;
  KFK.ignoreClick = false;
  if (KFK.lineDragging) {
    let parr = KFK.lineToDrag.array();
    console.log(parr);
    KFK.lineDragging = false;
    KFK.lineToDrag = null;
  }
  if (KFK.mode === "pointer" && KFK.docLocked() === false) {
    KFK.mouseIsDown = false;
    KFK.dragToSelectTo = {
      x: KFK.scrollX(event.clientX),
      y: KFK.scrollY(event.clientY)
    };
    if (KFK.duringKuangXuan) {
      KFK.ignoreClick = true;
      KFK.endKuangXuan(KFK.dragToSelectFrom, KFK.dragToSelectTo);
      KFK.duringKuangXuan = false;
    }
  }
});
$(document).mousemove(function (event) {
  if (KFK.inDesigner() === false) return;
  KFK.currentMousePos.x = event.clientX;
  KFK.currentMousePos.y = event.clientY;

  el($("#modeIndicator")).style.left = px(KFK.currentMousePos.x + 10);
  el($("#modeIndicator")).style.top = px(KFK.currentMousePos.y + 10);
  KFK.dragToSelectTo = {
    x: KFK.scrollX(event.clientX),
    y: KFK.scrollY(event.clientY)
  };

  if (KFK.docLocked()) return;

  //支持按下鼠标， 框选多个node
  if (
    KFK.mode === "pointer" &&
    KFK.mouseIsDown &&
    KFK.lineDragging === false &&
    KFK.lineMoverDragging === false &&
    KFK.minimapMouseDown === false
  ) {
    // KFK.warn(
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
      let shortestDistance = KFK.distance(KFK.linkPosNode[0].points[0], tmpPoint);
      for (let i = 0; i < KFK.linkPosNode[0].points.length; i++) {
        fromPoint = KFK.linkPosNode[0].points[i];
        toPoint = tmpPoint;
        let tmp = KFK.distance(fromPoint, toPoint);
        if (tmp < shortestDistance) {
          shortestDistance = tmp;
          selectedFromIndex = i;
        }
      }
      KFK.svgDrawTmpLine(
        KFK.linkPosNode[0].points[selectedFromIndex].x,
        KFK.linkPosNode[0].points[selectedFromIndex].y,
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
  if (KFK.lineDragging) {
    let realX = KFK.scrollX(event.clientX);
    let realY = KFK.scrollY(event.clientY);
    let deltaX = realX - KFK.lineDraggingStartPoint.x;
    let deltaY = realY - KFK.lineDraggingStartPoint.y;
    KFK.lineToDrag.dmove(deltaX, deltaY);
    KFK.lineDraggingStartPoint.x += deltaX;
    KFK.lineDraggingStartPoint.y += deltaY;
  }
});

KFK.gridLayer = new Konva.Layer({ id: "gridLayer" });
KFK.dragStage.add(KFK.gridLayer);

KFK.hoverJqDiv = function (jqdiv) {
  if (jqdiv !== undefined) {
    KFK._jqhoverdiv = jqdiv;
  } else {
    return KFK._jqhoverdiv;
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
    if (KFK.APP.model.snap) {
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

KFK.setJustCreated = function (jqNodeDIV) {
  KFK.justCreatedJqNode = jqNodeDIV;
  KFK.updatePropertyFormWithNode(jqNodeDIV);
  if (jqNodeDIV && jqNodeDIV.attr("nodetype") === "text") {
    KFK.APP.setData("model", "rightTabIndex", 0);
  }
};

KFK.focusOnNode = function (jqNodeDIV) {
  KFK.lastFocusOnJqNode = jqNodeDIV;
  KFK.justCreatedJqNode = null;

  KFK.updatePropertyFormWithNode(jqNodeDIV);
};

KFK.updatePropertyFormWithNode = function (jqNodeDIV) {
  let nodeType = "unknown";
  if (jqNodeDIV != null) {
    nodeType = jqNodeDIV.attr("nodetype");
  }
  if (KFK.selectedDIVs.length < 2 && KFK.APP.model.rightTabIndex === 2) {
    KFK.APP.setData("model", "rightTabIndex", 0);
  }

  KFK.APP.setData("show", "customline", false);
  KFK.APP.setData("show", "shape_property", jqNodeDIV != null);
  KFK.APP.setData(
    "show",
    "text_property",
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
    let nodeBorderWidth = unpx(jqNodeDIV.css("border-width"));
    let nodeBorderRadius = unpx(jqNodeDIV.css("border-radius"));
    $("#shapeBkgColor").spectrum("set", nodeBkgColor);
    $("#shapeBorderColor").spectrum("set", nodeBorderColor);
    $("#spinner_border_width").spinner("value", nodeBorderWidth);
    $("#spinner_border_radius").spinner("value", nodeBorderRadius);
  }
  if (jqNodeDIV != null && nodeType === "yellowtip") {
    let tipColor = KFK.getTipBkgColor(jqNodeDIV);
    // console.log(`Current tip color: ${tipColor}`);
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

KFK.log = function (msg) {
  KFK.warn(msg);
};
KFK.debug = function (msg) {
  KFK.warn(msg);
}

KFK.warn = function (msg) {
  let parent = $("#MSG").parent();
  let msgDIV = $("#MSG");
  let cloneDIV = $("#fadeoutmsg");
  if (cloneDIV.length > 0) {
    cloneDIV.remove();
  }

  cloneDIV = msgDIV.clone().appendTo(parent);
  cloneDIV.attr("id", "fadeoutmsg");
  cloneDIV.html(msg);
  cloneDIV.fadeOut(4000, function () {
    cloneDIV.remove();
  });
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

KFK.findNode = function (id) {
  let node = KFK.layer.findOne("#" + id);
  if (node === undefined) {
    node = KFK.dragLayer.findOne("#" + id);
  }
  if (node === undefined) console.warn(`Node ${id} not exist`);
  return node;
};

KFK.findConnect = function (linkid) {
  let conn = KFK.layer.findOne("#connect-" + linkid);
  if (conn === undefined) conn = KFK.layer.findOne("#connect-" + linkid);
  if (conn === undefined) console.warn(`Connect #connect-${linkid} not exist`);
  return conn;
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

KFK.yarkLinkNode = function (jqDIV, shiftKey, text, isRebuildFromServer) {
  console.log("yarLinkNode", jqDIV.attr("id"));
  let divLeft = unpx(jqDIV.css("left"));
  let divTop = unpx(jqDIV.css("top"));
  let divWidth = unpx(jqDIV.css("width"));
  let divHeight = unpx(jqDIV.css("height"));
  if (KFK.lineDragging) return;
  let pos = {
    div: jqDIV,
    type: "box",
    center: {
      x: divLeft + divWidth * 0.5,
      y: divTop + divHeight * 0.5
    },
    points: [
      {
        x: unpx(jqDIV.css("left")),
        y: unpx(jqDIV.css("top")) + unpx(jqDIV.css("height")) * 0.5
      },
      {
        x: unpx(jqDIV.css("left")) + unpx(jqDIV.css("width")) * 0.5,
        y: unpx(jqDIV.css("top"))
      },
      {
        x: unpx(jqDIV.css("left")) + unpx(jqDIV.css("width")),
        y: unpx(jqDIV.css("top")) + unpx(jqDIV.css("height")) * 0.5
      },
      {
        x: unpx(jqDIV.css("left")) + unpx(jqDIV.css("width")) * 0.5,
        y: unpx(jqDIV.css("top")) + unpx(jqDIV.css("height"))
      }
    ]
  };
  KFK.linkPosNode.push(pos);
  KFK.procLinkNode(shiftKey, text, isRebuildFromServer);
};

KFK.procLinkLine = function (shiftKey) {
  console.log(`linkPosLine has ${KFK.linkPosLine.length} points, don't draw line`);
  if (KFK.linkPosLine.length < 2) {
    return;
  } else {
    if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
    KFK.lineTemping = false;
  }
  let fromPoint = null;
  let toPoint = null;
  let svgLine = KFK.svgDrawLine(
    myuid(),
    KFK.linkPosLine[0].center.x,
    KFK.linkPosLine[0].center.y,
    KFK.linkPosLine[1].center.x,
    KFK.linkPosLine[1].center.y,
    { color: 'blue', width: 1 }
  );
  KFK.syncLinePut("C", svgLine, "create new", null, false);
  //TODO: Change to notify, then draw on every other's screen
  // KFK.syncNodePut("C", jqLine, "link node", null, false);
  if (!shiftKey) {
    KFK.linkPosLine.splice(0, 2);
    KFK.setMode("pointer");
  } else {
    KFK.linkPosLine[0] = KFK.linkPosLine[1];
    KFK.linkPosLine.splice(1, 1);
  }
};
KFK.procLinkNode = function (shiftKey, text, isRebuildFromServer) {
  if (KFK.linkPosNode.length < 2) {
    return;
  } else if (KFK.linkPosNode[0].div.attr("id") === KFK.linkPosNode[1].div.attr("id")) {
    KFK.linkPosNode.splice(1, 1);
    return;
  } else {
    if (KFK.isRebuildFromServer === false) {
      if (KFK.tempSvgLine) KFK.tempSvgLine.hide();
      KFK.lineTemping = false;
      KFK.cancelAlreadySelected();
    }
  }
  let fromPoint = null;
  let toPoint = null;
  let selectedFromIndex = 0;
  let selectedToIndex = 0;
  let shortestDistance = KFK.distance(
    KFK.linkPosNode[0].points[0],
    KFK.linkPosNode[1].points[0]
  );
  for (let i = 0; i < KFK.linkPosNode[0].points.length; i++) {
    fromPoint = KFK.linkPosNode[0].points[i];
    for (let j = 0; j < KFK.linkPosNode[1].points.length; j++) {
      toPoint = KFK.linkPosNode[1].points[j];
      let tmp = KFK.distance(fromPoint, toPoint);
      if (tmp < shortestDistance) {
        shortestDistance = tmp;
        selectedFromIndex = i;
        selectedToIndex = j;
      }
    }
  }
  //先重新清理节点的连接数据，
  KFK.updateNodeLinkIds(KFK.linkPosNode[0].div, KFK.linkPosNode[1].div);
  console.log('nodelinkids updated:',
    "node 0 link to",
    KFK.linkPosNode[0].div.attr("linkto"),
    "node 1 link from",
    KFK.linkPosNode[1].div.attr("linkfrom"),
  );
  let svgLine = KFK.svgLinkNode(
    KFK.linkPosNode[0].div.attr("id"),
    KFK.linkPosNode[1].div.attr("id"),
    selectedFromIndex,
    selectedToIndex,
    KFK.linkPosNode[0].points[selectedFromIndex].x,
    KFK.linkPosNode[0].points[selectedFromIndex].y,
    KFK.linkPosNode[1].points[selectedToIndex].x,
    KFK.linkPosNode[1].points[selectedToIndex].y,
    {}
  );

  if (isRebuildFromServer === false) {
    let payload = {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      from: KFK.linkPosNode[0].div.attr("id"),
      to: KFK.linkPosNode[1].div.attr("id"),
      text: ''
    };
    KFK.sendCmd("CONNECT", payload);
    if (!shiftKey) {
      KFK.linkPosNode.splice(0, 2);
      KFK.setMode("pointer");
    } else {
      KFK.linkPosNode[0] = KFK.linkPosNode[1];
      KFK.linkPosNode.splice(1, 1);
    }
  }
};


KFK.updateNodeLinkIds = function (jqFrom, jqTo) {
  KFK._setDivLinkIds(jqFrom, jqTo, 'linkto');
  KFK._setDivLinkIds(jqTo, jqFrom, 'linkfrom');
}

KFK._setDivLinkIds = function (jq1, jq2, direction) {
  //从字符串变成数组
  let linksStr = jq1.attr(direction);
  let linksArr = [];
  if (linksStr) {
    linksArr = linksStr.split(',');
    if (linksArr[0] === '')
      linksArr = [];
  }
  //过滤掉不存在的节点
  linksArr = linksArr.filter((aId) => {
    return $(`#${aId}`).length > 0;
  })
  //把新的对手节点放进去
  if (linksArr.indexOf(jq2.attr('id')) < 0) {
    linksArr.push(jq2.attr("id"));
  }
  jq1.attr(direction, linksArr.join(','));

  //然后，如果这个方向连接了，反方向的同样节点的就要去掉·
  //同样，先构造数组
  let reverseDirection = (direction === 'linkto') ? 'linkfrom' : 'linkto';
  linksStr = jq1.attr(reverseDirection);
  linksArr = [];
  if (linksStr) {
    linksArr = linksStr.split(',');
    if (linksArr[0] === '')
      linksArr = [];
  }
  //如对手节点在反方向存在，就把反方向的对手节点去掉
  let index = linksArr.indexOf(jq2.attr("id"));
  if (index >= 0) {
    linksArr.splice(index, 1);
    jq1.attr(reverseDirection, linksArr.join(','));
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
    KFK.deselectNode(KFK.selectedDIVs[0], KFK.selectedLINs[0]);
  }
  KFK.selectedDIVs.clear();
  KFK.selectedLINs.clear();
  KFK.resetPropertyOnMultipleNodesSelected();
  KFK.focusOnNode(null);
};
KFK.resetPropertyOnMultipleNodesSelected = function () {
  KFK.APP.setData("show", "arrange_multi_nodes", KFK.selectedDIVs.length > 1);
  KFK.APP.setData("show", "shape_property", KFK.selectedDIVs.length > 0);
  if (KFK.selectedDIVs.length > 1) {
    KFK.APP.setData("model", "rightTabIndex", 1);
  }
};

KFK.undo = () => {
  if (KFK.opz < 0) {
    console.log("undo 到底了");
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
  } else {
    if (ope.to !== "") {
      let jqTo = $($.parseHTML(ope.to));
      let nodeid = jqTo.attr("id");
      jqTo = $(`#${nodeid}`);
      if (jqTo.hasClass("kfknode")) {
        KFK.setNodeEvent(jqTo, "resizable", "destroy");
        KFK.setNodeEvent(jqTo, "droppable", "destroy");
        KFK.setNodeEvent(jqTo, "draggable", "destroy");
      }
      KFK.syncNodePut("D", jqTo, "undo", null, true);
      jqTo.remove();
      console.log("to node", nodeid, "was removed");
    }
    if (ope.from !== "") {
      let jqFrom = $($.parseHTML(ope.from));
      let nodeid = jqFrom.attr("id");
      KFK.C3.appendChild(el(jqFrom));
      x("from node", nodeid, "was added back");
      jqFrom = $(`#${nodeid}`);
      if (jqFrom.hasClass("kfknode")) {
        x(nodeid, "is a kfknode, set eventhandler for it");
        KFK.setNodeEventHandler(jqFrom);
      }
      if (jqFrom.hasClass("lock")) {
        KFK.setNodeEvent(jqFrom, "draggable", "destroy");
        KFK.setNodeEvent(jqFrom, "resizable", "destroy");
        KFK.setNodeEvent(jqFrom, "droppable", "destroy");
      } else {
        x(nodeid, "NOT hasclass lock");
      }
      KFK.syncNodePut("C", jqFrom, "undo", null, true);
    }
  }

  KFK.opz = KFK.opz - 1;
};
KFK.redo = () => {
  if (KFK.opz >= KFK.opstack.length - 1) {
    console.log("redo 到头了");
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
  } else {
    if (ope.from !== "") {
      let jqFrom = $($.parseHTML(ope.from));
      let nodeid = jqFrom.attr("id");
      jqFrom = $(`#${nodeid}`);
      KFK.syncNodePut("D", jqFrom, "redo", null, true);
      jqFrom.remove();
    }
    if (ope.to !== "") {
      let jqTo = $($.parseHTML(ope.to));
      let nodeid = jqTo.attr("id");
      KFK.C3.appendChild(el(jqTo));
      jqTo = $(`#${nodeid}`);
      if (jqTo.hasClass("kfknode")) {
        KFK.setNodeEventHandler(jqTo);
      }
      if (jqTo.hasClass("lock")) {
        jqTo.draggable("disable");
        jqTo.resizable("disable");
        jqTo.droppable("disable");
      }
      KFK.syncNodePut("C", jqTo, "redo", null, true);
    }
  }
};

KFK.initC3 = function () {
  let c3 = el($("#C3"));
  c3.style.position = "absolute";
  c3.style.userSelect = "none";
  c3.style.left = px(0);
  c3.style.top = px(0);
  c3.style.width = KFK._width + "px";
  c3.style.height = KFK._height + "px";
  c3.style.zIndex = "9";

  // let c3Stages = document.createElement('div');
  // c3Stages.setAttribute("id", "C3Stages");
  // c3Stages.style.position = "relative";
  // c3Stages.style.userSelect = "none";
  // c3Stages.style.left = px(0);
  // c3Stages.style.top = px(0);
  // // c3Stages.style.top = px(-KFK._height);
  // c3Stages.style.width = px(KFK._width);
  // c3Stages.style.height = px(KFK._height);
  // c3Stages.style.zIndex = "10";

  //click c3  click C3 click canvas click background
  $(c3).dblclick(function (evt) {
    if (KFK.isZooming === true) {
      KFK.zoomStop();
    }
    KFK.cancelTempLine();
    evt.preventDefault();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
  });
  $(c3).on("click", function (evt) {
    if (KFK.inDesigner() === false) return;
    evt.preventDefault();
    KFK.closeActionLog();
    if (KFK.ignoreClick) return;

    KFK.focusOnNode(null);
    KFK.setJustCreated(null);
    KFK.pickedJqLine = null;

    if (KFK.docLocked()) return;

    if (KFK.tobeTransformJqLine) KFK.tobeTransformJqLine.removeClass("shadow2");
    $("#linetransformer").css("visibility", "hidden");
    KFK.tobeTransformJqLine = null;

    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "customline", false);
    if (KFK.editting || KFK.resizing || KFK.dragging) {
      // console.log(`ignore click because editting: ${KFK.editting}, resizing: ${KFK.resizing}, dragging: ${KFK.dragging}`);
      return;
    }

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
        console.log(`${clientX},${clientY} -> ${realX},${realY}`);
        let tmp = KFK.placeNode(
          evt.shiftKey,
          myuid(),
          KFK.mode,
          variant,
          realX,
          realY
        );
        if (!evt.shiftKey) KFK.setMode("pointer");
        KFK.syncNodePut("C", $(tmp), "new node", null, false);
        // } else {
        //     console.log(`${KFK.mode} is not supported`);
      }
    }

    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
  });

  $(c3).on("mousemove", function (evt) {
    if (KFK.inDesigner() === false) return;
    // evt.preventDefault();
    // console.log('C3 moving badge');
    KFK.showUserMovingBadge(
      KFK.APP.model.cocouser,
      event.clientX,
      event.clientY
    );
  });

  KFK.C3 = c3;
  KFK.JC3 = $(KFK.C3);
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
  let bgid = user.localSessionId;
  let bglabel = user.name;
  // let jqBadgeDIV = $(document).find('#badge_' + bgid);
  // let class_ser = KFK.get13Number(bgid);
  // if (jqBadgeDIV.length === 0) {
  //     let tmp = document.createElement('div');
  //     KFK.C3.appendChild(tmp);
  //     jqBadgeDIV = $(tmp);
  //     jqBadgeDIV.attr("id", "badge_" + bgid);
  //     jqBadgeDIV.addClass(`userbadge userbadge_${class_ser}`);
  // }
  // jqBadgeDIV.css("display", "block");
  // jqBadgeDIV.css("top", pos.y);
  // jqBadgeDIV.css("left", pos.x);
  // jqBadgeDIV.css("width", "fit-content");
  // jqBadgeDIV.css("height", "fit-content");
  // jqBadgeDIV.html(bglabel);

  if (KFK.mouseTimer !== null) {
    clearTimeout(KFK.mouseTimer);
  }
  KFK.mouseTimer = setTimeout(function () {
    KFK.WS.put("MOUSE", { user: user, pos: pos });
    KFK.mouseTimer = null;
  }, 200);

  // if (badgeTimers[bgid] === undefined) {
  //     badgeTimers[bgid] = setTimeout(() => {
  //         jqBadgeDIV.css("display", "none");
  //         delete badgeTimers[bgid];
  //     }, config.badge.lastSeconds);
  // }
};

KFK.showOtherUserMovingBadge = function (data) {
  let pos = data.pos;
  let bgid = data.user.localSessionId;
  let bglabel = data.user.name;
  let jqBadgeDIV = $(document).find("#badge_" + bgid);
  let class_ser = KFK.get13Number(bgid);
  if (jqBadgeDIV.length === 0) {
    let tmp = document.createElement("div");
    KFK.C3.appendChild(tmp);
    jqBadgeDIV = $(tmp);
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

  if (badgeTimers[bgid] !== undefined) {
    clearTimeout(badgeTimers[bgid]);
  }

  badgeTimers[bgid] = setTimeout(() => {
    jqBadgeDIV.css("display", "none");
    delete badgeTimers[bgid];
  }, config.badge.lastSeconds);
};

KFK.resetNodeZIndex = function (data) {
  $.each(data, (i, val) => {
    // console.log(`${i} ${val}`);
    $(`#${i}`).css("z-index", val);
  });
};

KFK.moveLineMoverTo = function (position) {
  el($("#linetransformer")).style.left = px(position.x - 10);
  el($("#linetransformer")).style.top = px(position.y - 10);
};
KFK.scrollToScreen = function (position) {
  return {
    x: position.x - KFK.scrollContainer.scrollLeft(),
    y: position.y - KFK.scrollContainer.scrollTop()
  };
};
KFK.selectNode = function (theDIV, theLine) {
  if (theLine) {
    // this is a line div
    theLine.stroke(config.line.selectedColor);
    theLine.getLayer().batchDraw();
  } else {
    // this is a node div
    $(theDIV).addClass("selected");
  }
  KFK.selectedLINs.push(theLine);
  KFK.selectedDIVs.push(theDIV);
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
    KFK.deselectNode(KFK.selectedDIVs[0], KFK.selectedLINs[0]);
  }
  //为防止混乱，框选只对node div有效果
  KFK.JC3
    .find(".kfknode")
    .each((index, div) => {
      let divRect = KFK.nodeRect(div);
      if (
        rect.left < divRect.right &&
        rect.right > divRect.left &&
        rect.top < divRect.bottom &&
        rect.bottom > divRect.top
      ) {
        KFK.selectNode(div, undefined);
      }
    });
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
  KFK.selectedLINs.splice(index, 1);
  KFK.setSelectedNodesBoundingRect();
};

KFK.procNodeInArrayOfSelected = function (selDIV, selLine, shiftKey) {
  let exist = KFK.selectedDIVs.indexOf(selDIV);
  if (shiftKey) {
    if (exist >= 0) {
      KFK.deselectNode(KFK.selectedDIVs[exist], KFK.selectedLINs[exist]);
    } else {
      KFK.selectNode(selDIV, selLine);
    }
  } else {
    while (KFK.selectedDIVs.length > 0) {
      KFK.deselectNode(KFK.selectedDIVs[0], KFK.selectedLINs[0]);
    }
    KFK.selectNode(selDIV, selLine);
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

function px(v) {
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

function unpx(v) {
  if (typeof v === "string" && v.endsWith("px")) {
    return parseInt(v.substr(0, v.length - 2));
  }
}

function ltPos(node) {
  return {
    x: node.x - node.width * 0.5,
    y: node.y - node.height * 0.5
  };
}

function editTextNode(textnode, theDIV) {
  KFK.editting = true;
  theDIV.editting = true;
  textnode.editting = true;
  let oldText = textnode.innerText;
  textnode.style.visibility = "hidden";
  // theDIV.style.background = "transparent";
  var areaPosition = { x: unpx(theDIV.style.left), y: unpx(theDIV.style.top) };
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
  // console.log(`${textarea.style.top} ${textarea.style.left}`);
  textarea.style.width = theDIV.style.width;
  textarea.style.height = theDIV.style.height;
  textarea.style.fontSize = textnode.style.fontSize;
  textarea.style.borderColor = "#000";
  textarea.style.borderWidth = "1px";
  textarea.style.padding = "0px";
  textarea.style.margin = "0px";
  textarea.style.overflow = "hidden";
  textarea.style.background = "none";
  textarea.style.outline = "none";
  textarea.style.resize = "none";
  textarea.style.transformOrigin = "left top";

  textarea.focus();

  function removeTextarea(txtChanged) {
    $(textarea).remove();
    window.removeEventListener("click", handleOutsideClick);
    textnode.style.visibility = "visible";
    KFK.editting = false;
    textnode.editting = false;
    theDIV.editting = false;
    KFK.focusOnMainContainer();
    if (txtChanged) {
      KFK.syncNodePut("U", $(theDIV), "change text", KFK.fromJQ, false);
    }
  }

  function setTextareaWidth(newWidth) {
    if (!newWidth) {
      // set width for placeholder
      newWidth = unpx(textnode.style.width);
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
      KFK.focusOnMainContainer();
    }
    // on esc do not set value back to node
    if (evt.keyCode === 27) {
      removeTextarea(false);
      evt.stopImmediatePropagation();
      evt.stopPropagation();
    }
    KFK.focusOnMainContainer();
  });

  function handleOutsideClick(evt) {
    if (evt.target !== textarea) {
      textnode.innerText = textarea.value;
      removeTextarea(textarea.value !== oldText);
    }
    KFK.focusOnMainContainer();
  }
  setTimeout(() => {
    window.addEventListener("click", handleOutsideClick);
    KFK.focusOnMainContainer();
  });
}

KFK.toggleShadow = function (theDIV, selected) {
  let divType = theDIV.getAttribute("nodetype");
  if (divType === "yellowtip") {
    if (selected) {
      $(theDIV).css("box-shadow", "20px 20px 10px -18px #608EFF");
    } else {
      $(theDIV).css("box-shadow", "20px 20px 20px -18px #888888");
    }
  } else if (divType === "image") {
    if (selected) {
      $(theDIV).css("box-shadow", "0px 0px 10px 2px #608EFF");
    } else {
      $(theDIV).css("box-shadow", "");
    }
  } else {
    if (selected) {
      $(theDIV).css("box-shadow", "0px 0px 10px 2px #608EFF");
    } else {
      // theDIV.style.background = "transparent";
      $(theDIV).css("box-shadow", "");
    }
  }
};

KFK.getKFKNodeNumber = function () {
  let nodes = KFK.JC3.find(".kfknode");
  return nodes.length;
};

KFK.placeNode = function (shiftKey, id, type, variant, x, y, w, h, attach) {
  let aNode = new Node(id, type, variant, x, y, w, h, attach);
  KFK.nodes.push(aNode);
  let nodeDIV = KFK._createNode(aNode);
  KFK.setJustCreated($(nodeDIV));

  // //set just created node selected
  // let selDIV = nodeDIV;
  // let selLine = undefined;
  // KFK.procNodeInArrayOfSelected(selDIV, selLine, shiftKey);
  // KFK.resetPropertyOnMultipleNodesSelected();
  return nodeDIV;
};

KFK._createNode = function (node) {
  let textPadding = 2;
  let nodeCount = KFK.getKFKNodeNumber();
  var nodeObj = null;
  if (node.type === "image") {
    nodeObj = document.createElement("img");
    nodeObj.src = node.attach;
    nodeObj.style.width = px(node.width);
    nodeObj.style.height = px(node.height);
  } else if (["start", "end", "pin"].indexOf(node.type) >= 0) {
    nodeObj = document.createElement("img");
    nodeObj.src = KFK.images[node.type].src;
    nodeObj.style.width = px(node.width);
    nodeObj.style.height = px(node.height);
  } else if (node.type === "text") {
    nodeObj = document.createElement("span");
    nodeObj.style.fontSize = "18px";
    nodeObj.innerHTML = node.attach ? node.attach : config.node.text.content;
    nodeObj.style.padding = px(2);
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
    // nodeObj.style.width = px(node.width - textPadding * 2);
    // nodeObj.style.height = px(node.height - textPadding * 2);
    nodeObj.style.padding = px(2);
  }
  if (!nodeObj) {
    // console.log(`${node.type} is not supported`);
    return;
  }

  var nodeDIV = document.createElement("div");
  nodeDIV.id = node.id;
  nodeDIV.style.position = "absolute";

  nodeDIV.style.top = px(ltPos(node).y);
  nodeDIV.style.left = px(ltPos(node).x);
  nodeDIV.style.width = px(node.width);
  nodeDIV.style.height = px(node.height);
  if (node.type === "text") {
    nodeDIV.style.width = "fit-content";
    nodeDIV.style.height = "fit-content";
  }
  nodeDIV.style.zIndex = `${nodeCount + 1}`;
  // console.log(`CREATE NODE AT ${nodeCount + 1}`);
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
      nodeDIV,
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
  let jqNodeDIV = $(nodeDIV);
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

KFK.syncNodePut = async function (cmd, jqDIV, reason, jqFrom, isUndoRedo) {
  if (KFK.docLocked()) return;
  if (KFK.nodeLocked(jqDIV)) return;
  try {
    if (!(jqDIV instanceof jQuery)) {
      jqDIV = $(jqDIV);
    }
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
    if (jqDIV.hasClass("kfkline")) {
      nodeType = "line";
    }
    let tobeSync = jqDIV.clone();
    KFK.cleanNodeEventFootprint(tobeSync);
    let nodeContent = tobeSync.prop("outerHTML");
    console.log(`${cmd} ${nodeType}:${nodeID}, ${reason}`);
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
      if (cmd === "U") {
        if (jqFrom && reason !== "offline_not_undoable") {
          // 参数传递过来
          KFK.cleanNodeEventFootprint(jqFrom);
          fromContent = jqFrom.prop("outerHTML");
        }
        toContent = tobeSync.prop("outerHTML");
      } else if (cmd === "C") {
        fromContent = "";
        if (reason === "MARK_UNDOABLE") {
          KFK.cleanNodeEventFootprint(KFK.fromJQ);
          fromContent = KFK.fromJQ.prop("outerHTML");
        }
        toContent = tobeSync.prop("outerHTML");
      } else if (cmd === "D") {
        fromContent = tobeSync.prop("outerHTML");
        toContent = "";
      }
      let opEntry = {
        cmd: cmd,
        etype: 'DIV',
        from: fromContent,
        to: toContent
      };
      if (reason !== "offline_not_undoable") {
        KFK.yarkOpEntry(opEntry);
      }
    } else {
      x("syncNodePut undoredo", payload);
    }

    jqDIV.removeClass("offline");

    let result = await KFK.sendCmd(cmd, payload);
    if (result === false) {
      jqDIV.addClass("offline");
    }
  } catch (err) {
    console.log(err);
  } finally {
    KFK.C3.dispatchEvent(KFK.refreshC3event);
  }
  //console.log(jqDIV.prop('outerHTML'));
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
    console.log(svgContent);
    svgContent = KFK.codeToBase64(svgContent);
    console.log(svgContent);
    let payload = {
      doc_id: KFK.APP.model.cocodoc.doc_id,
      etype: 'SLINE',
      nodeid: svgLine.attr("id"),
      content: cmd === 'D' ? svgLine.attr("id") : svgContent,
      offline: isOffline,
      lastupdate: svgLine.attr("lastupdate")
    };
    //TODO: Add Recent doc list, which should be display on logon
    //TODO: disable Kuangxuan on linemover dragging
    console.log(payload);

    if (isUndoRedo === false) {
      let opEntry = {
        cmd: cmd,
        etype: 'SLINE',
        from: svgFrom ? svgFrom.svg() : '',
        to: svgLine.svg(),
      };
      if (reason !== "offline_not_undoable") {
        console.log(opEntry);
        KFK.yarkOpEntry(opEntry);
      }
    } else {
      console.log("syncLinePut, isUndoRedo", isUndoRedo, "payload", payload);
    }

    svgLine.removeClass("offline");
    let result = await KFK.sendCmd(cmd, payload);
    if (result === false) {
      svgLine.addClass("offline");
    } else if (cmd === 'D') {
      svgLine.remove();
    }
  } catch (err) {
    console.log(err);
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
  console.log("opstack is", KFK.opstack);
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

KFK.anyLocked = function (jqNode) {
  return KFK.docLocked() || KFK.nodeLocked(jqNode) || KFK.isZooming;
};

KFK.notAnyLocked = function (jqNode) {
  return !KFK.anyLocked(jqNode);
};

KFK.docLocked = function () {
  return KFK.APP.model.cocodoc.readonly;
};

KFK.nodeLocked = function (jqNode) {
  return jqNode.hasClass("lock");
};

KFK.setTipVariant = function (tipvariant) {
  config.node.yellowtip.defaultTip = tipvariant;
  if (KFK.mode === "yellowtip")
    $("#modeIndicatorImg").attr(
      "src",
      KFK.images[config.node.yellowtip.defaultTip].src
    );
  // let theNode = KFK.getPropertyApplyToJqNode();
  let theJqNode = KFK.getPropertyApplyToJqNode();
  if (theJqNode !== null && KFK.notAnyLocked(theJqNode)) {
    let oldColor = KFK.getTipBkgColor(theJqNode);
    // console.log('setTipBkgImage for ' + theNode.getAttribute("id") + "   " + tipvariant + "  to " + oldColor);
    theJqNode.attr("variant", tipvariant);
    KFK.setTipBkgImage(el(theJqNode), tipvariant, oldColor);
  }
};
KFK.setTipBkgImage = function (nodeDIV, svgid, svgcolor) {
  KFK.fromJQ = $(nodeDIV).clone();
  KFK._setTipBkgImage(nodeDIV, svgid, svgcolor);
  KFK.syncNodePut("U", $(nodeDIV), "change bkg image", KFK.fromJQ, false);
};
KFK._setTipBkgImage = function (nodeDIV, svgid, svgcolor) {
  $(nodeDIV).find(".tip_bkg").remove();
  let bkgSVG = $(SVGs[svgid]);
  bkgSVG.addClass("tip_bkg");
  bkgSVG.css("width", "100%");
  bkgSVG.css("height", "100%");
  bkgSVG.css("z-index", "-1");
  let svgMainPath = bkgSVG.find(".svg_main_path");
  svgMainPath.attr("fill", svgcolor);
  bkgSVG.appendTo($(nodeDIV));
};

KFK.setTipBkgColor = function (theJqNode, bgColor) {
  KFK.fromJQ = theJqNode.clone();
  let ret = KFK._setTipBkgColor(theJqNode, bgColor);
  if (ret)
    KFK.syncNodePut("U", theJqNode, "change bkg color", KFK.fromJQ, false);
};

KFK._setTipBkgColor = function (theJqNode, bgColor) {
  if (theJqNode === null) {
    console.warn("setTipBkgColor to null nodeDIV");
    return;
  }
  console.log(
    "setTipBkgColor for " +
    theJqNode.attr("nodetype") +
    " " +
    theJqNode.attr("variant")
  );
  let svgImg = theJqNode.find(".tip_bkg .svg_main_path");
  if (svgImg.length > 0) {
    svgImg.attr("fill", bgColor);
    // console.log('set color to ' + bgColor);
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
    //console.warn(`.tip_bkg .svg_main_path not found> Node type ${theNode.getAttribute("nodetype")} id:${theNode.getAttribute("id")}   .svg_main_path not found`);
    return config.node.yellowtip.defaultColor;
  }
};

KFK.reArrangeNodeLinks = function (jqNode) {
  console.log('reArrangeNodeLinks', jqNode.attr("id"));
  // let toIds = KFK.getNodeLinkIds(jqNode, 'linkto');
  // let fromIds = KFK.getNodeLinkIds(jqNode, 'linkfrom');
  let toIds = [];
  let fromIds = [];
  toIds.forEach((toId, index) => {
    KFK.linkPosNode = [];
    KFK.yarkLinkNode(jqNode, NO_SHIFT, '', FROM_CLIENT);
    KFK.yarkLinkNode($(`#${toId}`), NO_SHIFT, '', FROM_CLIENT);
  });
  fromIds.forEach((fromId, index) => {
    KFK.linkPosNode = [];
    KFK.yarkLinkNode($(`#${fromId}`), NO_SHIFT, '', FROM_CLIENT);
    KFK.yarkLinkNode(jqNode, NO_SHIFT, '', FROM_CLIENT);
  });
};

//resize node时，记下当前shape variant的size，下次创建同样shape时，使用这个size
KFK.setShapeDynamicDefaultSize = function (nodeType, variant, width, height) {
  // console.log(`${nodeType} ${variant} ${width} ${height}`);
  if (config.size[nodeType] === undefined) config.size[nodeType] = {};
  if (config.size[nodeType][variant] === undefined)
    config.size[nodeType][variant] = {};
  config.size[nodeType][variant].width = width;
  config.size[nodeType][variant].height = height;
  // console.log(config.size);
  // console.log(JSON.stringify(config.size[nodeType][variant]));
};

KFK.getShapeDynamicDefaultSize = function (nodeType, variant) {
  let ret = {};
  // console.log(nodeType + " " + variant);
  // console.log(config.size);
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
  // console.log(JSON.stringify(ret));
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
  let nodeDIV = el(jqNodeDIV);
  let jqNodeType = jqNodeDIV.attr("nodetype");
  if (config.node[jqNodeType].resizable) {
    jqNodeDIV.resizable({
      autoHide: true,
      start: () => {
        if (KFK.isZooming) return;
        console.log("Start Resizing...");
        KFK.fromJQ = jqNodeDIV.clone();
        KFK.resizing = true;
      },
      resize: () => { },
      stop: () => {
        if (KFK.isZooming) return;
        x("Stop Resizing...");
        if (KFK.APP.model.snap) {
          let tmpRight = KFK.nodeRight(nodeDIV);
          let tmpBottom = KFK.nodeBottom(nodeDIV);
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
          nodeDIV.style.width = px(
            KFK.nodeWidth(nodeDIV) + (newRight - tmpRight)
          );
          nodeDIV.style.height = px(
            KFK.nodeHeight(nodeDIV) + (newBottom - tmpBottom)
          );
        }
        KFK.setShapeDynamicDefaultSize(
          jqNodeType,
          jqNodeDIV.attr("variant"),
          KFK.nodeWidth(nodeDIV),
          KFK.nodeHeight(nodeDIV)
        );
        if (jqNodeType === "image") {
          // console.log("Resize inner image");
          jqNodeDIV.find(".innerobj").css("width", jqNodeDIV.css("width"));
          jqNodeDIV.find(".innerobj").css("height", jqNodeDIV.css("height"));
        }
        KFK.resizing = false;
        KFK.afterResizing = true;
        //节点大小resize后，也要重画连接线
        KFK.reArrangeNodeLinks(jqNodeDIV);

        KFK.setSelectedNodesBoundingRect();

        KFK.syncNodePut("U", jqNodeDIV, "resize node", KFK.fromJQ, false);
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
    start: (event, ui) => {
      if (KFK.isZooming) return;
      // console.log('Start node dragging...')
      KFK.fromJQ = jqNodeDIV.clone();
      event.stopImmediatePropagation();
      event.stopPropagation();
      KFK.originZIndex = KFK.getZIndex(jqNodeDIV);
      jqNodeDIV.css("z-index", "99999");
      KFK.dragging = true;
      KFK.positionBeforeDrag = {
        x: KFK.nodeLeft(el(jqNodeDIV)),
        y: KFK.nodeTop(el(jqNodeDIV))
      };
    },
    drag: (event, ui) => { },
    stop: (event, ui) => {
      if (KFK.isZooming) return;
      KFK.dragging = false;
      if (KFK.APP.model.snap) {
        let tmpLeft = KFK.nodeLeft(el(jqNodeDIV));
        let tmpTop = KFK.nodeTop(el(jqNodeDIV));
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

      //如果按住了shiftkey, 则只移动当前node, 不移动其他被选定Node
      if (!event.shiftKey) {
        //拖动其它被同时选中的对象
        let index = KFK.selectedDIVs.indexOf(el(jqNodeDIV));
        if (KFK.selectedDIVs.length > 1 && index >= 0) {
          let delta = {
            x: KFK.nodeLeft(el(jqNodeDIV)) - KFK.positionBeforeDrag.x,
            y: KFK.nodeTop(el(jqNodeDIV)) - KFK.positionBeforeDrag.y
          };
          for (let i = 0; i < KFK.selectedDIVs.length; i++) {
            let tmpFromJQ = $(KFK.selectedDIVs[i]).clone();
            if (i === index) continue;
            $(KFK.selectedDIVs[i]).css(
              "left",
              KFK.nodeLeft(KFK.selectedDIVs[i]) + delta.x
            );
            $(KFK.selectedDIVs[i]).css(
              "top",
              KFK.nodeTop(KFK.selectedDIVs[i]) + delta.y
            );
            if (KFK.selectedDIVs[i].getAttribute("nodetype") === "kfkline") {
              KFK.offsetLineDataAttr(KFK.selectedDIVs[i], delta);
            }
            KFK.syncNodePut(
              "U",
              $(KFK.selectedDIVs[i]),
              "move following selected",
              tmpFromJQ,
              false
            );
          }
        }
      }

      KFK.afterDragging = true;
      jqNodeDIV.css("z-index", KFK.originZIndex);
      KFK.originZIndex = 1;
      //节点移动后，对连接到节点上的连接线重新划线
      KFK.reArrangeNodeLinks(jqNodeDIV);
      KFK.setSelectedNodesBoundingRect();
      KFK.syncNodePut("U", jqNodeDIV, "after drag", KFK.fromJQ, false);
    }
  });
  if (config.node[jqNodeType].droppable) {
    // console.log(`${jqNodeType} is droppable`);
    jqNodeDIV.droppable({
      activeClass: "ui-state-hover",
      hoverClass: "ui-state-active",
      accept: ".kfknode",
      drop: (event, ui) => {
        if (KFK.isZooming) return;
        // console.log(`dropped, locMode = ${KFK.lockMode}`);
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
          let elBig = el(jqNodeDIV);
          let elSmall = el(ui.draggable);
          if (
            unpx(elSmall.style.left) > unpx(elBig.style.left) &&
            unpx(elSmall.style.top) > unpx(elBig.style.top) &&
            unpx(elSmall.style.left) + unpx(elSmall.style.width) <
            unpx(elBig.style.left) + unpx(elBig.style.width) &&
            unpx(elSmall.style.top) + unpx(elSmall.style.height) <
            unpx(elBig.style.top) + unpx(elBig.style.height)
          ) {
            innerObj.html(newText);
            //删掉之前那个被拖动的
            KFK._deleteNode(ui.draggable);
            //更新这个被粘贴的
            KFK.syncNodePut("U", jqNodeDIV, "new text", fromJQ, false);
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
    // console.log('mousedown on nodeDIV');
    evt.stopImmediatePropagation();
    evt.stopPropagation();
  });
  //click node
  jqNodeDIV.click(evt => {
    // console.log('click on nodeDIV');
    if (KFK.isZooming) return;
    KFK.afterDragging = false;
    KFK.afterResizing = false;
    let selDIV = el(jqNodeDIV);
    let selLine = undefined;
    if (KFK.mode === "pointer")
      KFK.procNodeInArrayOfSelected(selDIV, selLine, evt.shiftKey);
    if (KFK.mode === "connect") {
      if (KFK.afterDragging === false) {
        // console.log('yark link node')
        KFK.yarkLinkNode(jqNodeDIV, evt.shiftKey, '', FROM_CLIENT);
      } else {
        // console.log('NO yark link node because afterDragging');
        KFK.afterDragging = true;
      }
      evt.stopImmediatePropagation();
      return;
    }

    KFK.resetPropertyOnMultipleNodesSelected();
    KFK.focusOnNode(jqNodeDIV);

    if (KFK.mode === "lock") {
      if (KFK.isMyDoc() && KFK.docLocked() === false) {
        if (KFK.nodeLocked(jqNodeDIV)) {
          let opEntry = {
            cmd: "UNLOCK",
            from: jqNodeDIV.attr("id"),
            to: jqNodeDIV.attr("id")
          };
          KFK.yarkOpEntry(opEntry);
          KFK.sendCmd("UNLOCKNODE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: jqNodeDIV.attr("id")
          });
        } else {
          let opEntry = {
            cmd: "LOCK",
            from: jqNodeDIV.attr("id"),
            to: jqNodeDIV.attr("id")
          };
          KFK.yarkOpEntry(opEntry);
          KFK.sendCmd("LOCKNODE", {
            doc_id: KFK.APP.model.cocodoc.doc_id,
            nodeid: jqNodeDIV.attr("id")
          });
        }
      }
      if (!evt.shiftKey) {
        KFK.setMode("pointer");
      }
    }

    evt.stopPropagation();
  });

  jqNodeDIV.dblclick(function (evt) {
    if (KFK.isZooming) return;
    if (
      getBoolean(jqNodeDIV.attr("edittable")) &&
      KFK.notAnyLocked(jqNodeDIV)
    ) {
      // let innerText = el($(`#${jqNodeDIV.attr("id")}`));
      KFK.fromJQ = jqNodeDIV.clone();
      let innerText = el(jqNodeDIV.find(".innerobj"));
      editTextNode(innerText, el(jqNodeDIV));
    }
  });
};

KFK.dumpNode = function (node) {
  let jqNode = node;
  if (!(node instanceof jQuery)) {
    jqNode = $(node);
  }
  console.log(jqNode.prop("outerHTML"));
};

KFK.nodeLeft = function (aNode) {
  return $(aNode).position().left;
};
KFK.nodeCenter = function (aNode) {
  return KFK.nodeLeft(aNode) + KFK.nodeWidth(aNode) * 0.5;
};
KFK.nodeRight = function (aNode) {
  return KFK.nodeLeft(aNode) + KFK.nodeWidth(aNode);
};
KFK.nodeTop = function (aNode) {
  return $(aNode).position().top;
};
KFK.nodeMiddle = function (aNode) {
  return KFK.nodeTop(aNode) + KFK.nodeHeight(aNode) * 0.5;
};
KFK.nodeBottom = function (aNode) {
  return KFK.nodeTop(aNode) + KFK.nodeHeight(aNode);
};
KFK.nodeWidth = function (aNode) {
  return $(aNode).width();
};
KFK.nodeHeight = function (aNode) {
  return $(aNode).height();
};
KFK.nodeRect = function (aNode) {
  return {
    left: KFK.nodeLeft(aNode),
    top: KFK.nodeTop(aNode),
    right: KFK.nodeRight(aNode),
    bottom: KFK.nodeBottom(aNode),
    center: KFK.nodeCenter(aNode),
    middle: KFK.nodeMiddle(aNode),
    width: KFK.nodeWidth(aNode),
    height: KFK.nodeHeight(aNode)
  };
};

KFK.alignNodes = function (direction) {
  if (KFK.isZooming) return;
  if (KFK.selectedDIVs.length < 2) return;
  let hasOneLocked = false;
  KFK.selectedDIVs.forEach(aNode => {
    if (KFK.anyLocked($(aNode))) {
      hasOneLocked = true;
    }
  });
  if (hasOneLocked) return;
  switch (direction) {
    case "left":
      let left = KFK.nodeLeft(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
        let tmp = KFK.nodeLeft(aNode);
        left = tmp < left ? tmp : left;
      });

      break;
    case "center":
      let centerX =
        KFK.nodeLeft(KFK.selectedDIVs[0]) +
        KFK.nodeWidth(KFK.selectedDIVs[0]) * 0.5;
      KFK.selectedDIVs.forEach(aNode => {
        aNode.style.left = px(centerX - KFK.nodeWidth(aNode) * 0.5);
      });
      break;
    case "right":
      let right = KFK.nodeRight(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
        let tmp = KFK.nodeRight(aNode);
        right = tmp > right ? tmp : right;
      });
      KFK.selectedDIVs.forEach(aNode => {
        aNode.style.left = px(right - KFK.nodeWidth(aNode));
      });
      break;
    case "top":
      let top = KFK.nodeTop(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
        let tmp = KFK.nodeTop(aNode);
        top = tmp < top ? tmp : top;
      });
      KFK.selectedDIVs.forEach(aNode => {
        aNode.style.top = px(top);
      });
      break;
    case "middle":
      let centerY =
        KFK.nodeTop(KFK.selectedDIVs[0]) +
        KFK.nodeHeight(KFK.selectedDIVs[0]) * 0.5;
      KFK.selectedDIVs.forEach(aNode => {
        aNode.style.top = px(centerY - KFK.nodeHeight(aNode) * 0.5);
      });
      break;
    case "bottom":
      let bottom = KFK.nodeBottom(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
        let tmp = KFK.nodeBottom(aNode);
        bottom = tmp > bottom ? tmp : bottom;
      });
      KFK.selectedDIVs.forEach(aNode => {
        aNode.style.top = px(bottom - KFK.nodeHeight(aNode));
      });
      break;
    case "hori":
      let nodeLeftMost = KFK.selectedDIVs[0];
      let totalWidth = 0;
      let leftMost = KFK.nodeLeft(KFK.selectedDIVs[0]);
      //找到最左边的node及其left位置， leftMost
      KFK.selectedDIVs.forEach(aNode => {
        totalWidth += KFK.nodeWidth(aNode);
        let tmp = KFK.nodeLeft(aNode);
        if (tmp < leftMost) {
          nodeLeftMost = aNode;
          leftMost = tmp;
        }
      });
      //找到最右边的node及其右侧边位置， rightMost
      let nodeAtRightMost = KFK.selectedDIVs[0];
      let rightMost = KFK.nodeRight(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
        let tmp = KFK.nodeRight(aNode);
        if (tmp > rightMost) {
          nodeAtRightMost = aNode;
          rightMost = tmp;
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
      tmpHoriArr.splice(tmpHoriArr.indexOf(nodeLeftMost), 1);
      //把除nodeLeftMos之外节点的中间X放入数组
      let centerArr = tmpHoriArr.map(aNode => {
        return KFK.nodeCenter(aNode);
      });
      let posX = KFK.nodeRight(nodeLeftMost);
      while (centerArr.length > 0) {
        //找到剩余Node中最靠右边的一个
        let min = Math.min.apply(null, centerArr);
        let index = centerArr.indexOf(min);
        let newLeft = posX + space_hori;
        //重设其位置
        tmpHoriArr[index].style.left = px(newLeft);

        //为下一个节点准备基准点
        posX = newLeft + KFK.nodeWidth(tmpHoriArr[index]);
        centerArr.splice(index, 1);
        tmpHoriArr.splice(index, 1);
      }
      break;
    case "vert":
      let nodeTopMost = KFK.selectedDIVs[0];
      let totalHeight = 0;
      let topMost = KFK.nodeTop(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
        totalHeight += KFK.nodeHeight(aNode);
        let tmp = KFK.nodeTop(aNode);
        if (tmp < topMost) {
          nodeTopMost = aNode;
          topMost = tmp;
        }
      });
      let nodeAtBottomMost = KFK.selectedDIVs[0];
      let bottomMost = KFK.nodeBottom(KFK.selectedDIVs[0]);
      KFK.selectedDIVs.forEach(aNode => {
        let tmp = KFK.nodeBottom(aNode);
        if (tmp > bottomMost) {
          nodeAtBottomMost = aNode;
          bottomMost = tmp;
        }
      });
      let availableHeight = bottomMost - topMost;
      let space_vert =
        (availableHeight - totalHeight) / (KFK.selectedDIVs.length - 1);
      let tmpVertArr = [];
      KFK.selectedDIVs.forEach(aNode => {
        tmpVertArr.push(aNode);
      });
      tmpVertArr.splice(tmpVertArr.indexOf(nodeTopMost), 1);
      let middleArr = tmpVertArr.map(aNode => {
        return KFK.nodeMiddle(aNode);
      });
      let posY = KFK.nodeBottom(nodeTopMost);
      while (middleArr.length > 0) {
        let min = Math.min.apply(null, middleArr);
        let index = middleArr.indexOf(min);
        let newTop = posY + space_vert;
        tmpVertArr[index].style.top = px(newTop);

        posY = newTop + KFK.nodeHeight(tmpVertArr[index]);
        middleArr.splice(index, 1);
        tmpVertArr.splice(index, 1);
      }
      break;
  }
  this.setSelectedNodesBoundingRect();
  KFK.selectedDIVs.forEach(aNode => {
    let tmpJQ = $(aNode).clone();
    aNode.style.left = px(left);
    KFK.syncNodePut("U", $(aNode), "align left", tmpJQ, false);
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

KFK.moveNodeByArrowKey = function (evt) {
  if (KFK.isZooming) return;
  let DELTA = 5;
  if (evt.shiftKey && evt.ctrlKey) DELTA = 20;
  else if (evt.shiftKey) DELTA = 1;

  KFK.selectedDIVs.forEach((tmp, index) => {
    let theLine = KFK.selectedLINs[index];
    let offset = { x: 0, y: 0 };
    if (evt.keyCode === 37) {
      tmp.style.left = px(unpx(tmp.style.left) - DELTA);
      offset = { x: -DELTA, y: 0 };
    } else if (evt.keyCode === 38) {
      tmp.style.top = px(unpx(tmp.style.top) - DELTA);
      offset = { x: 0, y: -DELTA };
    } else if (evt.keyCode === 39) {
      tmp.style.left = px(unpx(tmp.style.left) + DELTA);
      offset = { x: DELTA, y: 0 };
    } else if (evt.keyCode === 40) {
      tmp.style.top = px(unpx(tmp.style.top) + DELTA);
      offset = { x: 0, y: DELTA };
    }
    if (theLine !== undefined)
      //this is a line div
      KFK.offsetLineDataAttr(tmp, offset);
  });
  evt.stopImmediatePropagation();
  evt.stopPropagation();
};

KFK._deleteNode = function (jqDIV) {
  let myZI = KFK.getZIndex(jqDIV);
  let count = 0;
  let allnodes = KFK.JC3.find(".kfknode");
  allnodes.each((index, aDIV) => {
    count += 1;
    let jqDIV = $(aDIV);
    let tmp = KFK.getZIndex(jqDIV);
    if (tmp > myZI) {
      KFK.setZIndex(jqDIV, tmp - 1);
    }
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
      OSSClient.delete(parsed.pathname);
    } catch (err) {
      console.error(err);
    }
  }
  //这里是需要处理的，
  let nodeIndex = KFK.selectedDIVs.indexOf(el(jqDIV));
  if (nodeIndex >= 0) {
    KFK.selectedDIVs.splice(nodeIndex, 1);
    KFK.selectedLINs.splice(nodeIndex, 1);
  }
  x("sync D to delete this node");
  KFK.syncNodePut("D", jqDIV, "delete node", null, false);
  jqDIV.remove();
};

KFK._deleteLine = function (svgLine) {
  x("sync D to delete this node");
  KFK.syncLinePut("D", svgLine, "delete node", null, false);
};

KFK.deleteHoverDiv = function (evt) {
  if (KFK.isZooming) return;
  if (KFK.hoverJqDiv()) {
    if (KFK.anyLocked(KFK.hoverJqDiv())) return;
    KFK._deleteNode(KFK.hoverJqDiv());
    KFK.hoverJqDiv(null);
  } else if (KFK.svgHoverLine) {
    if (KFK.anyLocked(KFK.svgHoverLine)) return;
    KFK._deleteLine(KFK.svgHoverLine);
    KFK.svgHoverLine = null;
  }
};

KFK.duplicateHoverObject = function (evt) {
  if (KFK.docLocked()) return;
  if (KFK.isZooming) return;
  let offset = { x: 0, y: 0 };
  if (KFK.hoverJqDiv()) {
    KFK.jqToCopy = KFK.hoverJqDiv();
    offset = { x: 20, y: 0 };
    if (KFK.jqToCopy.hasClass("kfknode")) {
      offset = { x: 20, y: 20 };
      let jqNewNode = KFK.jqToCopy.clone(false);
      jqNewNode.attr("id", myuid());
      jqNewNode.css("left", KFK.scrollX(KFK.currentMousePos.x) - parseInt(jqNewNode.css("width")) * 0.5);
      jqNewNode.css("top", KFK.scrollY(KFK.currentMousePos.y) - parseInt(jqNewNode.css("height")) * 0.5);
      KFK.cleanNodeEventFootprint(jqNewNode);
      jqNewNode.appendTo(KFK.C3);
      KFK.setNodeEventHandler(jqNewNode);
      KFK.focusOnNode(jqNewNode);
      KFK.syncNodePut("C", jqNewNode, "duplicate node", null, false);
    }
  } else if (KFK.svgHoverLine) {
    KFK.svgHoverLine.attr({ 'stroke-width': KFK.svgHoverLine.attr('origin-width') });
    let newLine = KFK.svgHoverLine.clone();
    let newline_id = "line_" + myuid();
    let classes = newLine.classes();
    classes.forEach((className, index) => {
      if (className !== 'kfkline') {
        newLine.removeClass(className);
      }
    });
    newLine.attr("id", newline_id);
    newLine.addClass(newline_id);
    newLine.center(KFK.scrollX(KFK.currentMousePos.x) + 20, KFK.scrollY(KFK.currentMousePos.y) + 20);
    newLine.addTo(KFK.svgHoverLine.parent());
    KFK.addSvgLineEventListner(newLine);
    KFK.syncLinePut("C", newLine, "duplicate line", null, false);
  }
  evt.stopPropagation();
};

KFK.getBoundingRectOfSelectedDIVs = function () {
  if (KFK.selectedDIVs.length == 0) return;
  let ret = {
    left: KFK.nodeLeft(KFK.selectedDIVs[0]),
    top: KFK.nodeTop(KFK.selectedDIVs[0]),
    right: KFK.nodeRight(KFK.selectedDIVs[0]),
    bottom: KFK.nodeBottom(KFK.selectedDIVs[0])
  };
  for (let i = 0; i < KFK.selectedDIVs.length; i++) {
    let tmp = {
      left: KFK.nodeLeft(KFK.selectedDIVs[i]),
      top: KFK.nodeTop(KFK.selectedDIVs[i]),
      right: KFK.nodeRight(KFK.selectedDIVs[i]),
      bottom: KFK.nodeBottom(KFK.selectedDIVs[i])
    };
    if (tmp.left < ret.left) {
      ret.left = tmp.left;
    }
    if (tmp.top < ret.top) {
      ret.top = tmp.top;
    }
    if (tmp.right > ret.right) {
      ret.right = tmp.right;
    }
    if (tmp.bottom > ret.bottom) {
      ret.bottom = tmp.bottom;
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

KFK.createConnect = function (link) {
  let arrow = new Konva.Arrow({
    stroke: "black",
    fill: "black",
    tension: 1,
    pointerLength: 10,
    pointerWidth: 8,
    id: "arrow-" + link.id
  });
  // let label = new Konva.Text({
  //     x: this.labelPos.x,
  //     y: this.labelPos.y,
  //     text: 'Simple Text',
  //     fontSize: 30,
  //     fontFamily: 'Calibri',
  //     fill: 'green'
  // });

  let connect = new Konva.Group({
    id: "connect-" + link.id,
    draggable: false
  });

  // connect.add(arrow).add(label);
  connect.add(arrow);
  return connect;
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

KFK.init = async function () {
  if (KFK.inited === true) {
    console.error("KFK.init was called more than once, maybe loadImages error");
    return;
  }
  KFK.initGridLayer();
  new ClipboardJs(".shareit", {
    text: function (trigger) {
      return KFK.dataToShare;
    }
  });

  $("#left_menu").removeClass("noshow");
  await WS.start(KFK.onWsConnected, KFK.onWsMsg, 500);
};

KFK.onWsConnected = function () {
  KFK.connectTime = KFK.connectTime + 1;
  KFK.APP.setData("show", "wsready", true);
  console.log("WS Connnected");
  if (KFK.connectTime === 1) {
    //The first time
    KFK.WS = WS;
    KFK.initC3();
    KFK.initPropertyForm();
    KFK.initLineMover();
    KFK.initColorPicker();
    KFK.showCenterIndicator();
    // clear footprint
    // localStorage.removeItem('cocouser');
    // localStorage.removeItem('cocoprj');
    KFK.showSection({
      login: false,
      register: false,
      explorer: false,
      designer: false
    });
    KFK.checkUser(false);
  } else {
    //重新连接
    //TODO: sames like line is not offline marked
    let count = 0;
    $(document)
      .find(".offline")
      .each((index, aNodeDIV) => {
        count += 1;
        KFK.syncNodePut("U", $(aNodeDIV), "offline_not_undoable", null, false);
      });
    console.log(`There are ${count} offline nodes `);
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

KFK.checkUser = function (isAfterLogin) {
  let cocouser = localStorage.getItem("cocouser");
  if (cocouser) {
    cocouser = JSON.parse(cocouser);
    cocouser.localSessionId = myuid();
    KFK.APP.setData("model", "cocouser", cocouser);
    KFK.setAppData("model", "isDemoEnv", Demo.isDemoUser(cocouser));
    if (!isAfterLogin)
      //从localstorage中找到用户名
      KFK.sendCmd("COMEBACK", { userid: cocouser.userid });
    KFK.log("欢迎回来， " + cocouser.name + "");
    let pathname = $(location).attr("pathname");
    if (pathname.match(/\/doc\/(.+)/)) {
      let doc_id = pathname.substring(pathname.lastIndexOf("/") + 1);
      if (doc_id === "history" || doc_id === "list") {
        KFK.refreshExplorer();
      } else {
        //load demo point
        KFK.refreshDesigner(doc_id, "");
      }
    } else {
      KFK.refreshExplorer();
    }
  } else {
    console.log("there is no cocosuer in local, show loginform now");
    if (!isAfterLogin) KFK.showRegisterForm();
    else {
      KFK.warn("登录失败，请重试");
    }
  }
};

KFK.refreshDesigner = function (doc_id, docpwd) {
  KFK.JC3.empty();
  KFK.initSvgLayer();
  let main = $("#containermain");
  main.css("transform", "scale(1, 1)");
  KFK.isZooming = false;

  KFK.opstack.splice(0, KFK.opstacklen);
  KFK.opz = -1;
  KFK.setAppData("model", "actionlog", []);

  KFK.showSection({
    login: false,
    register: false,
    explorer: false,
    designer: true
  });
  KFK.tryToOpenDocId = doc_id;
  KFK.APP.setData("model", "cocodoc", KFK.DocController.getDummyDoc());
  localStorage.removeItem("cocodoc");
  KFK.loadDoc(doc_id, docpwd);
};

KFK.refreshExplorer = function () {
  KFK.APP.setData("model", "docLoaded", false);
  KFK.showSection({
    login: false,
    register: false,
    explorer: true,
    designer: false
  });
  KFK.showConsole();
  KFK.showPrjs();
  KFK.expoloerRefreshed = true;
};

//这里检查是否有project
KFK.showConsole = function () {
  KFK.showForm({
    newdoc: false,
    newprj: false,
    prjlist: true,
    doclist: true,
    explorerTabIndex: 0
  });
  let currentprj = localStorage.getItem("cocoprj");
  if (!getNull(currentprj)) {
    let prj = JSON.parse(currentprj);
    // console.log("Find local project " + prj.prjid + " " + prj.name);
    let found = -1;
    for (let i = 2; i < KFK.APP.model.prjs.length; i++) {
      if (prj.prjid === KFK.APP.model.prjs[i].prjid) {
        found = i;
        break;
      }
    }
    if (found < 0) {
      if (KFK.APP.model.prjs.length > 2) {
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
  if (prj.prjid !== "all" && prj.prjid !== "mine") {
    KFK.APP.setData("model", "lastrealproject", prj);
  }
  localStorage.setItem("cocoprj", JSON.stringify(prj));
};

KFK.signin = function () {
  let userid = KFK.APP.model.login.userid;
  let pwd = KFK.APP.model.login.pwd;
  KFK.log("singin " + userid);
  KFK.WS.put("LOGIN", { userid: userid, pwd: pwd });
};

KFK.signOut = function () {
  localStorage.removeItem("cocouser");
  KFK.APP.model.cocouser = {
    userid: "",
    name: "",
    avatar: "avatar-0",
    avatar_src: null
  };
  //TODO: notify server  not to send data anymore
  //直接断掉WS？ 断掉后不去重试连接， 回到登录界面，用户重新登录后，可再连接
  KFK.checkUser(false);
};

KFK.showCreateNewDoc = function () {
  console.log(KFK.APP.model.lastrealproject.name);
  if (
    KFK.APP.model.lastrealproject.prjid === "" ||
    KFK.APP.model.lastrealproject.prjid === "all" ||
    KFK.APP.model.lastrealproject.prjid === "mine"
  ) {
    KFK.onPrjSelected = KFK.showCreateNewDoc;
    KFK.showPrjs("请选择新建共创的项目");
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
  console.log("showHelp not implemented");
};

KFK.showLoginForm = function () {
  KFK.APP.setData("model", "login", { userid: "", pwd: "" });
  KFK.showSection({
    register: false,
    login: true,
    explorer: false,
    designer: false
  });
};

KFK.showRegisterForm = function () {
  KFK.APP.setData("model", "register", {
    userid: "",
    pwd: "",
    pwd2: "",
    name: ""
  });
  KFK.showSection({
    login: false,
    register: true,
    explorer: false,
    designer: false
  });
};

KFK.remoteCheckUserId = function (userid) {
  console.log("send IFEXIST checking");
  KFK.usefAlreadyExist = false;
  KFK.WS.put("IFEXIST", { userid: userid });
};

KFK.registerUser = function () {
  let tmp = KFK.APP.model.register;
  let userid = tmp.userid.trim();
  let pwd = tmp.pwd.trim();
  let name = tmp.name.trim();
  let pwd2 = tmp.pwd2.trim();
  let foundError = false;
  KFK.APP.state.reg.userid = KFK.validateUserId(userid);
  KFK.APP.state.reg.name = KFK.validateUserName(name);
  KFK.APP.state.reg.pwd = KFK.validateUserPassword(pwd);
  KFK.APP.state.reg.pwd2 = pwd === pwd2;
  if (
    KFK.APP.state.reg.userid &&
    KFK.APP.state.reg.name &&
    KFK.APP.state.reg.pwd &&
    KFK.APP.state.reg.pwd2
  ) {
    //KFK.WS.put('REGUSER', { userid: userid, pwd: pwd, name: name });
    KFK.sendCmd("REGUSER", { userid: userid, pwd: pwd, name: name });
  } else {
    KFK.APP.setData("model", "register", tmp);
  }
  return;
};

KFK.pickPrjForCreateDoc = function () {
  KFK.onPrjSelected = KFK.showCreateNewDoc;
  KFK.showPrjs("请选择一个项目用于在其中共创");
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
KFK.showPrjs = function (msg) {
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
    console.log("createNewDoc " + docName);
    KFK.sendCmd("NEWDOC", {
      prjid: KFK.APP.model.lastrealproject.prjid,
      name: docName,
      pwd: docPwd
    });
    return true;
  } else {
    console.log("文档名不符合要求");
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
    console.log("createNewPrj " + prjName);
    KFK.sendCmd("NEWPRJ", { name: prjName });
    return true;
  } else {
    return false;
  }
};
KFK.sayHello = function () {
  KFK.warn("hello, cocopad");
};

KFK.loadDoc = function (doc_id, pwd) {
  try {
    let payload = { doc_id: doc_id, pwd: pwd };
    KFK.sendCmd("OPEN", payload);
    KFK.showSection({
      login: false,
      register: false,
      explorer: false,
      designer: true
    });
  } catch (err) {
    console.error(err);
  } finally {
    KFK.inited = true;
    // callback();
  }
};

KFK._onDocLoaded = function () {
  console.log(">>>>>>._onDocLoaded");
  KFK.initShowEditors("none");
  KFK.startPadDesigner();
  KFK.APP.setData("model", "docLoaded", true);
  if (KFK.APP.model.cocodoc.readonly) {
    $("#linetransformer").draggable("disable");
    $("#right").toggle("slide", { duration: 100, direction: "right" });
    $("#left").toggle("slide", { duration: 100, direction: "left" });
    $("#top").toggle("slide", { duration: 100, direction: "left" });
  } else {
    $("#linetransformer").draggable("enable");
  }
};

KFK.startPadDesigner = function () {
  x(">>>>>>>.startPadDesigner");
  KFK.addContainerMainEventHandler();
  KFK.focusOnMainContainer();
  KFK.cancelAlreadySelected();

  KFK.APP.setData("model", "rightTabIndex", 2);
  $(".padlayout").removeClass("noshow");
  $(".padlayout").fadeIn(1000, function () {
    // Animation complete
  });
  x(">>>>>>padDesigner done");
  KFK._onDesignerReady();
};

KFK._onDesignerReady = function () {
  console.log(">>>>>>Designer is fully ready");
  KFK.refreshNodeLinkLines();
  KFK.C3.dispatchEvent(KFK.refreshC3event);
}
KFK.refreshNodeLinkLines = function () {
  KFK.JC3.find('.kfknode').each((index, node) => {
    let jqNode = $(node);
    console.log(jqNode.attr("id"));
    KFK.reArrangeNodeLinks(jqNode);
  });
};

KFK.onWsMsg = function (data) {
  data = JSON.parse(data);
  if (data.cmd === "PING") {
    KFK.WS.put("PONG", {});
  }
  if (!data.payload) {
    return;
  }
  if (data.res === "INFO") {
    KFK.warn(data.payload.msg);
    return;
  } else if (data.res !== "OK") {
    KFK.warn("unknow res" + data.res);
  }
  console.log('Received', data);
  if (data.payload.cmd !== 'MOUSE') console.log(data.payload.cmd);
  switch (data.payload.cmd) {
    case "IFEXIST-TRUE":
      console.log("IFEXIST-TRUE");
      let justInputUid = $("#regUserId").val();
      KFK.warn(justInputUid + "已被占用");
      break;
    case "IFEXIST-FALSE":
      console.log("IFEXIST-FALSE");
      break;
    case "REGUSER-TRUE":
      KFK.warn("注册成功，请登录");
      if (KFK.isSettingupDemoEnv() === false) KFK.showLoginForm();
      break;
    case "REGUSER-FALSE":
      KFK.warn("注册失败，请重试");
      break;
    case "REGUSER-DUP":
      KFK.warn(`账号${data.payload.data.userid}已存在，请直接登录`);
      break;
    case "LOGIN":
      console.log("login success");
      let user = data.payload.data;
      KFK.updateCocouser(user);
      KFK.checkUser(true);
      break;
    case "PLSLOGIN":
      console.log("login failed");
      KFK.APP.setData("show", "loginfailed", true);
      localStorage.removeItem("cocouser");
      KFK.checkUser(true);
      break;
    case "OPEN":
      KFK.numberOfNodeToCreate = data.payload.data.length;
      KFK.numberOfNodeCreated = 0;
      KFK.recreateMultipleObjects(data.payload.data, KFK.checkDocLoaded);
      break;
    case "UPD":
      KFK.recreateObject(data.payload.data);
      break;
    case "SYNC":
      console.log('Receivied', data.payload.data);
      KFK.recreateObject(data.payload.data);
      break;
    case "DEL":
      KFK.deleteObject(data.payload.data);
      break;
    case "ASKPWD":
      KFK.showDialog({ inputDocPasswordDialog: true });
      break;
    case "RESETPWD":
      KFK.APP.model.docs.forEach(doc => {
        if (doc._id === data.payload.doc_id) {
          console.log(
            "RESETPWD return pwd:" + data.payload.pwd + " for doc " + doc.name
          );
          if (data.payload.pwd === "") {
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
        if (doc._id === data.payload.doc_id) {
          console.log(
            "REMOVEPWD return pwd:" + data.payload.pwd + " for doc " + doc.name
          );
          if (data.payload.pwd === "") {
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
      KFK.showDialog({ inputDocPasswordDialog: true });
      this.$bvModal
        .msgBoxOk("文档不存在")
        .then(value => {
          KFK.showSection({
            login: false,
            register: false,
            explorer: true,
            designer: false
          });
          KFK.showDocs();
        })
        .catch(err => { });
      break;
    case "TGLREAD":
      KFK.APP.model.docs.forEach(doc => {
        if (doc._id === data.payload.doc_id) {
          doc.readonly = data.payload.readonly;
          if (doc.readonly === true) {
            doc.readonly_icon = "lock";
            doc.readonly_variant = "primary";
          } else {
            doc.readonly_icon = "blank";
            doc.readonly_variant = "outline-primary";
          }
        }
      });
      if (data.payload.doc_id === KFK.APP.model.cocodoc.doc_id) {
        KFK.APP.model.cocodoc.readonly = data.payload.readonly;
        KFK.APP.setData("model", "cocodoc", KFK.APP.model.cocodoc);
        localStorage.setItem("cocodoc", JSON.stringify(KFK.APP.model.cocodoc));
      }
      break;
    case "NEWPRJ":
      console.log(data.payload);
      let cocoprj = {
        prjid: data.payload.data[0].prjid,
        name: data.payload.data[0].name
      };
      KFK.setCurrentPrj(cocoprj);
      if (KFK.isSettingupDemoEnv() === false) {
        KFK.showConsole();
        KFK.showPrjs();
      }
      break;
    case "NEWDOC":
      console.log(data.payload);
      KFK.updatePrjDoclist(data.payload.data.prjid);
      KFK.refreshDesigner(
        data.payload.data._id,
        KFK.APP.model.newdocpwd.trim()
      );
      break;
    case "LISTDOC":
      KFK.APP.setData("model", "listdocoption", data.payload.option);
      let docs = data.payload.data;
      docs.forEach(doc => {
        if (doc.pwd === "") {
          doc.security_icon = "blank";
          doc.security_variant = "outline-success";
        } else {
          doc.security_icon = "three-dots";
          doc.security_variant = "success";
        }
        if (doc.readonly === true) {
          doc.readonly_icon = "lock";
          doc.readonly_variant = "primary";
        } else {
          doc.readonly_icon = "blank";
          doc.readonly_variant = "outline-primary";
        }
        if (doc.ownerAvatar !== "") {
          doc.ownerAvatarSrc = KFK.avatars[doc.ownerAvatar].src;
        }
      });
      KFK.APP.setData("model", "docs", docs);
      break;
    case "GETBLKOPS":
      let blkops = data.payload.data;
      blkops.forEach(blkop => {
        if (blkop.avatar !== "") {
          blkop.avatarSrc = KFK.avatars[blkop.avatar].src;
        }
        blkop.pos = -1;
      });
      KFK.setAppData("model", "actionlog", blkops);
      break;
    case "LISTPRJ":
      KFK.APP.setData("model", "listprjoption", data.payload.option);
      let option = data.payload.option;
      // let skip = option.skip;
      // let count = option.count;
      let prjs = data.payload.data;
      prjs.unshift({
        _id: "mine",
        prjid: "mine",
        name: "我创建的所有项目中的白板",
        owner: "me"
      });
      prjs.unshift({
        _id: "all",
        prjid: "all",
        name: "我参与过的别人共享的白板",
        owner: "me"
      });
      KFK.APP.setData("model", "prjs", prjs);
      break;

    case "MOUSE":
      KFK.showOtherUserMovingBadge(data.payload.data);
      break;
    case "ZI":
      KFK.resetNodeZIndex(data.payload.data);
      break;
    case "LOCKNODE":
      console.log("------------GOT LOCKNODE, LOCK IT-----");
      KFK.NodeController.lock($(`#${data.payload.data.nodeid}`));
      break;
    case "UNLOCKNODE":
      KFK.NodeController.unlock($(`#${data.payload.data.nodeid}`));
      break;
    case "COPYDOC":
      KFK.onCopyDoc(data.paylaod.data);
      break;
    case "CONNECT":
      KFK.onLinkConnect(data.payload.data);
      break;
    case "GOTOPRJ":
      let gotoPrjId = data.payload.prjid;
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
      KFK.warn("基本资料已设置成功");
      console.log("SETPROFILE-TRUE: ", JSON.stringify(data.payload.data));
      KFK.updateCocouser(data.payload.data);
      break;
    case "SETPROFILE-FAIL":
      KFK.warn("基本资料未成功设置，请重试");
      break;
  }
};

KFK.updateCocouser = function (cocouser) {
  cocouser.avatar_src = KFK.avatars[cocouser.avatar].src;
  KFK.APP.setData("model", "cocouser", cocouser);
  localStorage.setItem("cocouser", JSON.stringify(cocouser));
};

KFK.deletePrj = async function (prjid) {
  let payload = { prjid: prjid };
  console.log(payload);
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

KFK.getCocouser = function () {
  // return JSON.parse(localStorage.getItem('cocouser'));
  return KFK.APP.model.cocouser;
};

KFK.deleteDoc = async function (doc_id) {
  let payload = { doc_id: doc_id };
  console.log(payload);
  await KFK.sendCmd("DELDOC", payload);
  if (KFK.APP.model.docs.length > 0) {
    let nextdoc = KFK.APP.model.docs[0];
    KFK.APP.setData("model", "cocodoc", nextdoc);
    KFK.showDocs();
  } else {
    KFK.APP.setData("model", "cocodoc", KFK.DocController.getDummyDoc());
  }
};

KFK.setDocReadonly = async function (doc, index, event) {
  KFK.sendCmd("TGLREAD", { doc_id: doc._id });
};

KFK.prjRowClickHandler = function (record, index) {
  KFK.APP.setData("model", "project", {
    prjid: record.prjid,
    name: record.name
  });
  if (record.prjid !== "all" && record.prjid !== "mine") {
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

KFK.updatePrjDoclist = function (prjid) {
  KFK.sendCmd("LISTDOC", { prjid: prjid });
};

KFK.sendCmd = async function (cmd, payload) {
  payload.cocouser = KFK.getCocouser();
  await KFK.WS.put(cmd, payload);
};

KFK.docRowClickHandler = function (record, index) {
  if (record.pwd === "*********") {
    console.log("ask for password");
    KFK.APP.setData("model", "opendocpwd", "");
    KFK.showDialog({ inputDocPasswordDialog: true });
    KFK.tryToOpenDocId = record._id;
  } else {
    KFK.refreshDesigner(record._id, "");
  }
};

KFK.getDocPwd = function () {
  KFK.APP.setData("model", "passwordinputok", "ok");
  KFK.refreshDesigner(KFK.tryToOpenDocId, KFK.APP.model.opendocpwd);
};
KFK.cancelDocPwd = function () {
  KFK.APP.setData("model", "passwordinputok", "cancel");
  KFK.refreshExplorer();
};
KFK.onDocPwdHidden = function (bvModalEvt) {
  if (KFK.APP.model.passwordinputok === "show") bvModalEvt.preventDefault();
};

KFK.shareDoc = function (item, index, button) {
  KFK.setAppData("model", "docNameToShare", item.name);
  KFK.dataToShare = `http://localhost:1234/doc/${item._id}`;
  KFK.showForm({ share: true });
};
KFK.shareThisDoc = function () {
  KFK.setAppData("model", "docNameToShare", KFK.APP.model.cocodoc.name);
  KFK.dataToShare = `http://localhost:1234/doc/${KFK.APP.model.cocodoc.doc_id}`;
  KFK.showForm({ share: true });
};
KFK.shareDone = function () {
  KFK.showForm({ share: false });
  KFK.log("分享地址以放入剪贴板，请粘贴给其他人");
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
    userid: KFK.getCocouser().userid,
    pwd: KFK.APP.model.inputUserPwd
  };
  KFK.sendCmd("REMOVEPWD", payload);
};

KFK.resetDocPwd = function () {
  console.log("old:" + KFK.APP.model.docOldPwd);
  console.log("new:" + KFK.APP.model.docNewPwd);
  let payload = {
    doc_id: KFK.tryToResetPwdDoc._id,
    oldpwd: KFK.APP.model.docOldPwd ? KFK.APP.model.docOldPwd : "",
    newpwd: KFK.APP.model.docNewPwd ? KFK.APP.model.docNewPwd : ""
  };
  console.log(payload);
  KFK.sendCmd("RESETPWD", payload);
};
KFK.recreateMultipleObjects = function (objects, callback) {
  objects.forEach(obj => {
    KFK.recreateObject(obj, callback);
  });
};

KFK.recreateObject = function (obj, callback) {
  if (obj.etype === 'document') {
    KFK.recreateDoc(obj, callback);
  } else if (obj.etype === 'DIV') {
    KFK.recreateNode(obj, callback);
  } else if (obj.etype === 'SLINE') {
    KFK.recreateSLine(obj, callback);
  }
};
KFK.recreateDoc = function (obj, callback) {
  let html = obj.html;
  try {
    let jqDIV = $($.parseHTML(html));
    let docRet = {
      doc_id: jqDIV.attr("doc_id"),
      name: jqDIV.attr("name"),
      prjid: jqDIV.attr("prjid"),
      owner: jqDIV.attr("owner"),
      readonly: getBoolean(jqDIV.attr("readflag"))
    };
    console.log('recreateDoc', docRet);
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
    let content = KFK.base64ToCode(obj.html);
    console.log('Recreate', content);
    let line_id = obj.nodeid;
    KFK.restoreSvgLine(line_id, content);
  } catch (err) {
    console.error(err);
  } finally {
    if (callback) callback(1);
  }

};
KFK.recreateNode = function (obj, callback) {
  try {
    let isALockedNode = false;
    let html = KFK.base64ToCode(obj.html);
    if (html.startsWith("[LOCK]")) {
      isALockedNode = true;
      html = html.substring(6);
    }
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
        KFK.C3.appendChild(el(jqDIV));
      }
      jqDIV = $(`#${nodeid}`);

      if (jqDIV.hasClass("kfknode")) {
        if (KFK.APP.model.cocodoc.readonly === false) {
          KFK.setNodeEventHandler(jqDIV);
          if (isALockedNode) {
            KFK.NodeController.lock(jqDIV);
          }
        }
      } else if (jqDIV.hasClass("kfkline")) {
        console.error("Old code, change it");
        // KFK.setLineEventHandler(jqDIV);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (callback) callback(1);
    KFK.C3.dispatchEvent(KFK.refreshC3event);
  }
};

KFK.checkDocLoaded = function (num) {
  KFK.numberOfNodeCreated += num;
  if (KFK.numberOfNodeCreated >= KFK.numberOfNodeToCreate) {
    console.log("loaded: ", KFK.numberOfNodeCreated, "of", KFK.numberOfNodeToCreate);
    KFK._onDocLoaded();
  }
};
KFK.deleteObject = function (obj) {
  console.log('deleteObject', obj);
  try {
    if (obj.etype === 'DIV') {
      let tobeDelete = $(`#${obj.nodeid}`);
      if (tobeDelete.length <= 0)
        console.warn("Sync delete", obj.nodeid, "does not exist");
      else
        tobeDelete.remove();
    } else if (obj.etype === 'SLINE') {
      let selector = `.${obj.nodeid}`;
      try {
        draw.findOne(selector).remove();
      } catch (error) {
        console.log(error);
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

KFK.initPropertyForm = function () {
  let spinnerBorderWidth = $("#spinner_border_width").spinner({
    min: 0,
    max: 20,
    step: 1,
    start: 1,
    spin: function (event, ui) {
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("border-width", ui.value);
        jqNode.css("border-style", "solid");
        KFK.syncNodePut("U", jqNode, "set border width", KFK.fromJQ, false);
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
    spin: function (event, ui) {
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("border-radius", ui.value);
        KFK.syncNodePut("U", jqNode, "set border radius", KFK.fromJQ, false);
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
    spin: function (event, ui) {
      if (KFK.pickedJqLine != null && KFK.docLocked() === false) {
        KFK.fromJQ = KFK.pickedJqLine.clone();
        KFK.pickedJqLine.css("border-bottom-width", ui.value);
        let options = KFK.getLineOptions(KFK.pickedJqLine);
        options.stroke = ui.value;
        KFK.setLineOptions(KFK.pickedJqLine, options);
        KFK.syncNodePut(
          "U",
          KFK.pickedJqLine,
          "set line width",
          KFK.fromJQ,
          false
        );
      }
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
    .on("change", function () {
      // Split font into family and weight/style
      var tmp = $("input.fonts").val().split(":"),
        family = tmp[0],
        variant = tmp[1] || "400",
        weight = parseInt(variant, 10),
        italic = /i$/.test(variant);

      // Set selected font on body
      var css = {
        fontFamily: "'" + family + "'",
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal"
      };

      //set font

      // console.log(css);
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css(css);
        KFK.syncNodePut("U", jqNode, "set node font", KFK.fromJQ, false);
      }

      KFK.focusOnMainContainer();
    });
  $("input.fonts").height(12);
};

KFK.initShowEditors = function (show_editor) {
  KFK.APP.setData("model", "showEditor", show_editor);
  KFK.onShowEditorChanged(show_editor);
};

KFK.onShowEditorChanged = function (show_editor) {
  // console.log(KFK.APP.model.showEditor + " -> " + show_editor);
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
    color: config.defaultDocBgcolor,
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
    change: function (color) {
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      KFK.APP.setData("model", "shapeBkgColor", rgb);
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode !== null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("background-color", rgb);
        KFK.syncNodePut("U", jqNode, "set node bg color", KFK.fromJQ, false);
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
    change: function (color) {
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      // KFK.APP.setBGto(color.toRgbString());
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("border-color", color.toRgbString());
        KFK.syncNodePut(
          "U",
          jqNode,
          "set node border-color",
          KFK.fromJQ,
          false
        );
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
    change: function (color) {
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      // KFK.APP.setBGto(color.toRgbString());
      if (KFK.pickedJqLine != null && KFK.docLocked() === false) {
        KFK.fromJQ = KFK.pickedJqLine.clone();
        KFK.pickedJqLine.css("border-color", color.toRgbString());
        let options = KFK.getLineOptions(KFK.pickedJqLine);
        options.color = rgb;
        KFK.setLineOptions(KFK.pickedJqLine, options);
        KFK.syncNodePut(
          "U",
          KFK.pickedJqLine,
          "set line color",
          KFK.fromJQ,
          false
        );
      }
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
    change: function (color) {
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      // KFK.APP.setBGto(color.toRgbString());
      let jqNode = KFK.getPropertyApplyToJqNode();
      if (jqNode != null && KFK.notAnyLocked(jqNode)) {
        KFK.fromJQ = jqNode.clone();
        jqNode.css("color", color.toRgbString());
        KFK.syncNodePut("U", jqNode, "set color", KFK.fromJQ, false);
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
    change: function (color) {
      var hsv = color.toHsv();
      var rgb = color.toRgbString();
      var hex = color.toHexString();
      KFK.APP.setData("model", "tipBkgColor", rgb);
      let theJqNode = KFK.getPropertyApplyToJqNode();
      if (theJqNode != null && KFK.notAnyLocked(theJqNode)) {
        KFK.fromJQ = theJqNode.clone();
        KFK.setTipBkgColor(theJqNode, rgb);
        KFK.syncNodePut(
          "U",
          theJqNode,
          "set tip bkg color",
          KFK.fromJQ,
          false
        );
      }
    }
  });
};

KFK.textAlignChanged = function (event, value) {
  let tmp = $("#textAlign").val();
  let jqNode = KFK.getPropertyApplyToJqNode();
  if (jqNode != null && KFK.notAnyLocked(jqNode)) {
    KFK.fromJQ = jqNode.clone();
    if (jqNode.find(".tip_content").length !== 0) {
      jqNode.find(".tip_content").css("justify-content", tmp);
    } else {
      jqNode.css("justify-content", tmp);
    }
    KFK.syncNodePut("U", jqNode, "set text alignment", KFK.fromJQ, false);
  }
  KFK.focusOnMainContainer();
};

KFK.vertAlignChanged = function (event, value) {
  let tmp = $("#vertAlign").val();
  let jqNode = KFK.getPropertyApplyToJqNode();
  if (jqNode != null && KFK.notAnyLocked(jqNode)) {
    KFK.fromJQ = jqNode.clone();
    if (jqNode.find(".tip_content").length !== 0) {
      jqNode.find(".tip_content").css("align-items", tmp);
    } else {
      jqNode.css("align-items", tmp);
    }
    KFK.syncNodePut("U", jqNode, "set text vert alignment", KFK.fromJQ, false);
  }
  KFK.focusOnMainContainer();
};

KFK.setTenant = tenant => {
  config.tenant = tenant;
};
KFK.getOSSFileName = basename => {
  return `${config.tenant.id} / ${KFK.APP.model.cocodoc.doc_id} / ${basename}`;
};

KFK.initGridLayer = function () {
  KFK.drawGridlines();
};
KFK.drawGridlines = function (deltaX, deltaY) {
  deltaX = deltaX ? deltaX : 0;
  deltaY = deltaY ? deltaY : 0;
  KFK.gridLayer.destroyChildren();
  let step = KFK.APP.model.gridWidth;
  for (let i = 0; i < 1000; i++) {
    KFK.gridLayer.add(
      new Konva.Line({
        points: [
          (i + 1) * step + deltaX,
          0,
          (i + 1) * step + deltaX,
          KFK._height
        ],
        stroke: "#E1FCF9",
        strokeWidth: 1
      })
    );
    if ((i + 1) * step > KFK._width) {
      break;
    }
  }
  for (let i = 0; i < 1000; i++) {
    KFK.gridLayer.add(
      new Konva.Line({
        points: [
          0,
          (i + 1) * step + deltaY,
          KFK._width,
          (i + 1) * step + deltaY
        ],
        stroke: "#E1FCF9",
        strokeWidth: 1
      })
    );
    if ((i + 1) * step > KFK._height) {
      break;
    }
  }
  KFK.gridLayer.batchDraw();
};

KFK.setMode = function (mode) {
  if (KFK.docLocked()) mode = "pointer";

  let oldMode = KFK.mode;
  KFK.mode = mode;
  for (let key in KFK.APP.active) {
    KFK.APP.active[key] = false;
  }
  if (KFK.APP.active[mode] == undefined)
    console.warn(`APP.active.${mode} does not exist`);
  else KFK.APP.active[mode] = true;

  if ((oldMode === "line" && mode !== "line") ||
    (oldMode === "connect" && mode !== "connect")) {
    KFK.cancelTempLine();
  }

  if (KFK.mode === "pointer") {
    $("#modeIndicator").hide();
  } else {
    if (KFK.mode === "yellowtip") {
      $("#modeIndicatorImg").attr(
        "src",
        KFK.images[config.node.yellowtip.defaultTip].src
      );
      KFK.APP.setData("model", "rightTabIndex", 0);
    } else $("#modeIndicatorImg").attr("src", KFK.images[KFK.mode].src);
    $("#modeIndicator").show();
  }

  if (KFK.mode === "yellowtip") {
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "custombacksvg", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "layercontrol", true);
  } else if (KFK.mode === "textblock") {
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", true);
    KFK.APP.setData("show", "custombacksvg", false);
    KFK.APP.setData("show", "layercontrol", true);
  } else if (KFK.mode === "text") {
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "custombacksvg", false);
    KFK.APP.setData("show", "text_property", true);
    KFK.APP.setData("show", "layercontrol", true);
  }
  KFK.APP.setData("model", "rightTabIndex", 0);

  KFK.focusOnMainContainer();
};

KFK.toggleMinimap = function () {
  for (let key in KFK.APP.active) {
    KFK.APP.active[key] = false;
  }
  KFK.APP.active["minimap"] = true;
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

KFK.addContainerMainEventHandler = function () {
  x(">>>>>>.addContainerMainEventHandler");
  let preventDefault = false;
  // $('#right').keydown(function (evt) {
  //     // evt.stopImmediatePropagation();
  //     // evt.stopPropagation();
  // });
  $("#containermain").focus();
  $(document).keydown(function (evt) {
    switch (evt.keyCode) {
      case 16:
        //Shift
        KFK.lockMode = KFK.lockMode ? false : true;
        KFK.APP.lockMode = KFK.lockMode;
        KFK.pickedNode = null;
        preventDefault = true;
        if (KFK.linkPosNode.length === 1) {
          KFK.linkPosNode = [];
        }
        KFK.KEYDOWN.shift = true;
        break;
      case 17:
        //Ctrl key ctrl
        KFK.KEYDOWN.ctrl = true;
        break;
      case 18:
        //Option
        KFK.KEYDOWN.alt = true;
        break;
      case 91:
        KFK.KEYDOWN.meta = true;
        break;
      case 27:
        //ESC
        if (KFK.isZooming === true) {
          KFK.zoomStop();
        }
        KFK.cancelAlreadySelected();
        if (!KFK.editting && KFK.mode !== "line") KFK.setMode("pointer");
        KFK.cancelTempLine();
        KFK.setMode("pointer");
        break;
      case 90:
        if (evt.metaKey && evt.shiftKey) KFK.redo();
        if (evt.metaKey && !evt.shiftKey) KFK.undo();
        break;
    }
  });
  $(document).keyup(function (evt) {
    if (KFK.inDesigner() === false) return;
    console.log(evt.keyCode);
    let preventDefault = true;
    if (KFK.editting) return;
    if (KFK.isZooming) return;

    switch (evt.keyCode) {
      case 16:
        KFK.KEYDOWN.shift = false;
        break;
      case 17:
        KFK.KEYDOWN.ctrl = false;
        break;
      case 18:
        KFK.KEYDOWN.alt = false;
        break;
      case 91:
        KFK.KEYDOWN.meta = false;
        break;
      case 82:
        if (evt.ctrlKey)
          //Ctrl-R  key R
          KFK.toggleRight();
        break;
      case 46:
      case 8:
      case 88:
        // key DELETE  key X
        preventDefault = true;
        KFK.deleteHoverDiv(evt);
        break;
      case 68:
        // key D
        preventDefault = true;
        KFK.duplicateHoverObject(evt);
        break;
      case 84:
        // key t
        preventDefault = true;
        KFK.debug('Press T');
        preventDefault = true;
        KFK.ZiToTop();
        break;
      case 66:
        // key b
        preventDefault = true;
        KFK.debug('Press B');
        preventDefault = true;
        KFK.ZiToBottom();
        break;
      case 72:
        // key h
        preventDefault = true;
        KFK.debug('Press H');
        preventDefault = true;
        KFK.ZiToHigher();
        break;
      case 71:
        // key g
        preventDefault = true;
        KFK.debug('Press G');
        preventDefault = true;
        KFK.ZiToLower();
        break;
      case 76:
        if (evt.shiftKey) {
          //key L key l
          KFK.tryToLockUnlock();
        }
        break;
      default:
        preventDefault = false;
    }
    if (preventDefault) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      evt.stopPropagation();
    }
  });

  let timer = null;
  $("#scroll-container").scroll(() => {
    if (KFK.inDesigner() === false) return;
    console.log("scroll-container is scrolling");
    let sx = $("#scroll-container").scrollLeft();
    let sy = $("#scroll-container").scrollTop();
    if (KFK.scrollFixed === false) {
      KFK.scrollContainer = $("#scroll-container");
      KFK.scrollFixed = true;
    }
    $("#linetransformer").css("visibility", "hidden");
    if (timer === null && KFK.gridLayer.visible()) {
      timer = setTimeout(() => {
        let tmp = KFK.getNearGridPoint(
          KFK.scrollContainer.scrollLeft(),
          KFK.scrollContainer.scrollTop()
        );
        let deltaX = tmp.x - KFK.scrollContainer.scrollLeft();
        let deltaY = tmp.y - KFK.scrollContainer.scrollTop();
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
      let tmp = KFK.getZIndex(jqNode);
      if (tmp > myZI) {
        KFK.setZIndex(jqNode, tmp - 1);
        zIndexChanger.ZI[jqNode.attr("id")] = tmp - 1;
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
      let tmp = KFK.getZIndex(jqNode);
      if (tmp < myZI) {
        KFK.setZIndex(jqNode, tmp + 1);
        zIndexChanger.ZI[jqNode.attr("id")] = tmp + 1;
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
      let tmp = KFK.getZIndex(jqNode);
      if (tmp === myZI + 1) {
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
        let tmp = KFK.getZIndex(jqNode);
        if (tmp === myZI - 1) {
          KFK.setZIndex(jqNode, myZI);
          zIndexChanger.ZI[jqNode.attr("id")] = myZI;
        }
      });
    KFK.setZIndex(curJQ, myZI - 1);
    zIndexChanger.ZI[curJQ.attr("id")] = myZI - 1;
    KFK.sendCmd("ZI", zIndexChanger);
  }
};

KFK.tryToLockUnlock = function () {
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
  } else {
    console.log("lock bypass");
  }
};
KFK.toggleRight = function (flag) {
  $("#right").toggle("slide", { duration: 100, direction: "right" });
};

KFK.toggleFullScreen = function (event) {
  let leftdisplay = $("#left").css("display");
  let rightdisplay = $("#right").css("display");
  KFK.log(leftdisplay + " " + rightdisplay);
  $("#left").toggle("slide", { duration: 100, direction: "left" });
  $("#top").toggle("slide", { duration: 100, direction: "left" });
  if (leftdisplay === rightdisplay)
    $("#right").toggle("slide", { duration: 100, direction: "right" });
};
KFK.showHidePanel = function (flag) {
  if (flag === true) {
    $("#left").css("display", "block");
    $("#right").css("display", "block");
  } else {
    $("#left").css("display", "none");
    $("#right").css("display", "none");
  }
};

KFK.gotoExplorer = function () {
  if (KFK.expoloerRefreshed) {
    KFK.showSection({ explorer: true, designer: false });
    KFK.showForm({
      newdoc: false,
      newprj: false,
      prjlist: true,
      doclist: true,
      share: false,
      explorerTabIndex: 1
    });
  } else {
    KFK.refreshExplorer();
  }
};

KFK.gotoDesigner = function () {
  KFK.showSection({ explorer: false, designer: true });
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
  reader.onload = function (event) {
    let file = KFK.dataURLtoFile(event.target.result, "");
    let tmpid = myuid();
    OSSClient.multipartUpload(KFK.getOSSFileName(`${tmpid}.png`), file)
      .then(res => {
        let tmp = KFK.placeNode(
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
        KFK.syncNodePut("C", $(tmp), "create image node", null, false);
      })
      .catch(err => {
        console.log(err);
      });
  }; // data url!
  reader.readAsDataURL(blob);
};

KFK.save = async function () {
  let docPath = `/${config.tenant.id}/${KFK.APP.model.cocodoc.doc_id}/`;
  // let result = await OSSClient.list({
  //     prefix: 'lucas/',
  // });
  try {
    // 不带任何参数，默认最多返回1000个文件。
    let result = await OSSClient.list({
      prefix: "lucas/"
    });
    console.log(result);
    // 根据nextMarker继续列出文件。
    if (result.isTruncated) {
      let result = await client.list({
        marker: result.nextMarker
      });
      console.log(result);
    }
    // // 列举前缀为'my-'的文件。
    // let result = await client.list({
    //    prefix: 'my-'
    // });
    // console.log(result);
    // // 列举前缀为'my-'且在'my-object'之后的文件。
    // let result = await client.list({
    //    prefix: 'my-',
    //    marker: 'my-object'
    // });
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
  // console.log(result.objects);
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
  console.log("to be replaced", html);
  try {
    let jq = $($.parseHTML(html));
    jq.find("a").prop("target", "_blank");
    ret = jq.prop("innerHTML");
  } catch (err) {
    ret = "";
  }
  console.log("repalce target ret", ret);
  return ret;
};

KFK.addTextToHoverDIV = function (content) {
  let toAdd = content.text;
  if (content.html === "") {
    toAdd = content.text;
    if (KFK.checkUrl(toAdd)) {
      toAdd = `<a href="${toAdd}">${toAdd}</a>`;
    }
    toAdd = KFK.replaceHTMLTarget(toAdd);
    console.log("past text", toAdd);
  } else {
    toAdd = content.html;
    toAdd = KFK.replaceHTMLTarget(toAdd);
    console.log("past html", toAdd);
  }
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
      KFK.syncNodePut(
        "U",
        KFK.hoverJqDiv(),
        "add text to hover div",
        KFK.fromJQ,
        false
      );
    }
  } else {
    let tmp = KFK.placeNode(
      false, //shiftKey
      myuid(),
      "textblock",
      "default",
      KFK.currentMousePos.x + KFK.scrollContainer.scrollLeft(),
      KFK.currentMousePos.y + KFK.scrollContainer.scrollTop(),
      100,
      100,
      toAdd
    );
    KFK.syncNodePut("C", $(tmp), "create text node", null, false);
  }
};

KFK.onPaste = function (event) {
  console.log("here0");
  if (KFK.docLocked() || KFK.isZooming) return;
  let content = { html: "", text: "", image: null };
  content.html = event.clipboardData.getData("text/html");
  content.text = event.clipboardData.getData("Text");
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  console.log(items[1] ? "items[1]" : "items[0]");
  console.log(content);
  if (items[1]) {
    KFK.addTextToHoverDIV(content);
  } else if (items[0]) {
    if (items[0].kind === "string") {
      KFK.addTextToHoverDIV(content);
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
    console.log("set editor for line");
    console.log(jqNode.find(".cocoeditors").length);
    if (jqNode.find(".cocoeditors").length === 0) {
      let allEditorDIV = document.createElement("div");
      $(allEditorDIV).addClass("cocoeditors");
      el(jqNode).appendChild(allEditorDIV);
      let lastEditorDIV = document.createElement("div");
      $(lastEditorDIV).addClass("lastcocoeditor");
      el(jqNode).appendChild(lastEditorDIV);
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
  console.log(new Error().stack);
};

KFK.zoomStop = function () {
  $("#centerpoint").addClass("noshow");
  $(".ui-resizable").resizable("enable");
  $(".ui-draggable").draggable("enable");
  $(".ui-droppable").droppable("enable");
  KFK.showHidePanel(!KFK.APP.model.cocodoc.readonly);
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
  KFK.sendCmd("GETBLKOPS", { doc_id: KFK.APP.model.cocodoc.doc_id });
};

KFK.navActionLog = function (item, direction) {
  if (item.logs.length === 0) {
    x("no logs");
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
    console.log("node ", nodeid, "not found");
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
  console.log(left, top, width, height, scrollX, scrollY);
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

KFK.showTip = KFK.log;

KFK.createDemoEnv = async function () {
  console.log("Current cocouser is ", KFK.APP.model.cocouser);
  if (Demo.isDemoUser(KFK.APP.model.cocouser)) {
    console.log(
      "Current cocouser is already a demo user, open demo doc directly"
    );
    KFK.refreshDesigner("5e7b85765cc6ca507fbda3a6", "");
  } else {
    console.log("Current cocouser is not a demo user, create new demo user");
    localStorage.setItem("settingupdemoenv", "true");
    try {
      let demoAccount = Demo.genearteDemoUser();
      KFK.updateCocouser(demoAccount);
      console.log("Demo user created", demoAccount);
      KFK.setAppData("model", "isDemoEnv", true);
      await KFK.WS.put("REGUSER", {
        userid: demoAccount.userid,
        pwd: myuid(),
        name: "测试用户"
      });
      await KFK.sendCmd("NEWPRJ", { name: "测试项目" });
      KFK.refreshDesigner("5e7b85765cc6ca507fbda3a6", "");
      console.log("Demo doc has been opened");
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(function () {
        localStorage.removeItem("settingupdemoenv");
      }, 5000);
    }
  }
};

KFK.setAppData = (data, key, value) => {
  KFK.APP.setData(data, key, value);
};

KFK.upgradeToStartAccount = function () {
  KFK.toBeUpgradeDemoAccount = JSON.parse(
    JSON.stringify(KFK.APP.model.cocouser)
  );
  console.log(KFK.toBeUpgradeDemoAccount);
  KFK.showRegisterForm();
};

KFK.isSettingupDemoEnv = function () {
  let res = localStorage.getItem("settingupdemoenv");
  if (res && res === "true") return true;
  else return false;
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
  console.log(data);
};
KFK.onLinkConnect = async function (data) {
  let selectorFrom = `#${data.from}`;
  let selectorTo = `#${data.to}`;
  let nodeFrom = $(selectorFrom);
  let nodeTo = $(selectorTo);
  if (nodeFrom.length > 0 && nodeTo.length > 0) {
    let tmp = KFK.linkPosNode;
    KFK.linkPosNode = [];
    KFK.yarkLinkNode(nodeFrom, NO_SHIFT, data.text, FROM_SERVER);
    KFK.yarkLinkNode(nodeTo, NO_SHIFT, data.text, FROM_SERVER);
    KFK.linkPosNode = tmp;
    //TODO: add text to link;
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
KFK.setProfileAvatar = function (avatar) {
  let profile = KFK.APP.model.profileToSet;
  profile.avatar = avatar;
  KFK.setAppData("model", "profileToSet", profile);
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
    KFK.warn("录入信息不符合要求");
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
  if (error === undefined) {
    console.log("english checking ", str, "true");
    return true;
  } else {
    let { error, value } = schema2.validate(str);
    if (error === undefined) {
      console.log("chinese checking ", str, "true");
      return true;
    } else {
      console.log("checking ", str, "false");
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
  if (error === undefined) {
    console.log("checking ", str, "true");
    return true;
  } else {
    console.log("checking ", str, "false");
    return false;
  }
};

KFK.validateUserId = function (str) {
  const schema = Joi.string()
    .regex(
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      // 邮箱地址
    )
    .required();
  let { error, value } = schema.validate(str);
  if (error === undefined) {
    console.log("checking ", str, "true");
    return true;
  } else console.log("checking ", str, "false");
  return false;
};

// localStorage.removeItem('cocouser');
// console.log(config.defaultDocBgcolor);
config.defaultDocBgcolor = "#ABABAB";
// console.log(config.defaultDocBgcolor);
// console.log("console.js begin loadimages");
//Start the APP
KFK.loadImages();
KFK.loadAvatars();

KFK.initSvgLayer = function () {
  KFK.svgDraw = SVG().addTo("#C3").size(KFK._width, KFK._height);
  draw = KFK.svgDraw;
  console.log('svg layer initialized');
};

KFK.restoreSvgLine = function (line_id, html) {
  let aLine = null;
  let selector = `.${line_id}`;
  console.log('Restore SVG line line_id is ', line_id);
  aLine = draw.findOne(selector);
  if (aLine === null || aLine === undefined) {
    aLine = draw.line();
  }
  let parent = aLine.svg(html, true);
  aLine = parent.findOne(selector);
  KFK.addSvgLineEventListner(aLine);
};
//TODO: delete SVGLine

KFK.makePath = function (p1, p2) {
  let rad = 10;
  let c1 = { x: p2.x - rad, y: p1.y };
  let c2 = { x: p2.x, y: p1.y + rad };

  let pStr = `M${p1.x} ${p1.y} H${c1.x} S${c2.x} ${c1.y} ${c2.x} ${c2.y} V${p2.y}`;
  console.log(pStr);
  return pStr;
};

KFK._svgDrawNodesLink = function (lineClass, lineClassReverse, pstr, triangle) {
  console.log(pstr);
  let reverseLine = draw.findOne(`.${lineClassReverse}`);
  let oldLine = draw.findOne(`.${lineClass}`);
  let reverseTriangle = draw.findOne(`.${lineClassReverse}_triangle`);
  let oldTriangle = draw.findOne(`.${lineClass}_triangle`);
  if (oldLine) {
    // 有动画时， 带箭头的线出错
    // oldLine.animate(KFK.svgAnimDuration).plot(pstr);
    oldLine.plot(pstr);
    oldTriangle.plot(triangle);
  } else {
    if (reverseLine) {
      reverseLine.removeClass(lineClassReverse);
      reverseLine.addClass(lineClass);
      // reverseLine.animate(KFK.svgAnimDuration).plot(pstr);
      reverseLine.plot(pstr);
      reverseTriangle.removeClass(lineClassReverse + "_triangle");
      reverseTriangle.addClass(lineClass + "_triangle");
      reverseTriangle.plot(triangle);
    } else {
      draw.path(pstr).addClass(lineClass).addClass('connect').fill("none").stroke({ width: 3, color: "#FF0000" });
      draw.polygon(triangle).addClass(lineClass + "_triangle").addClass('connect').fill("red").stroke({ width: 1, color: "#FF0000" });
    }
  }
};
KFK.svgDrawLine = function (id, fx, fy, tx, ty, option) {
  if (KFK.APP.model.snap) {
    let p1 = { x: fx, y: fy };
    let p2 = { x: tx, y: ty };
    p1 = KFK.getNearGridPoint(p1.x, p1.y);
    p2 = KFK.getNearGridPoint(p2.x, p2.y);
    fx = p1.x; fy = p1.y;
    tx = p2.x; ty = p2.y;
  }
  let lineClass = "kfkline";
  let lineId = "line_" + id;
  let theLine = draw.findOne(`#line_${id}`);
  if (theLine) {
    theLine.plot(fx, fy, tx, ty).stroke(option);
  } else {
    theLine = draw.line(fx, fy, tx, ty);
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
  jqDiv.css('left', pos.x - unpx(jqDiv.css('width')) * 0.5);
  jqDiv.css('top', pos.y - unpx(jqDiv.css('height')) * 0.5);
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

KFK.addSvgLineEventListner = function (theLine) {
  theLine.on('mouseover', (evt) => {
    console.log('mouse over svg line');
    let originWidth = theLine.attr('origin-width');
    let newWidth = originWidth > 10 ? originWidth : 10;
    theLine.attr({ 'stroke-width': newWidth });
    KFK.svgHoverLine = theLine;
    KFK.clonedSLine = theLine.clone();
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
      console.log('KFK.lineToResize:', KFK.lineToResize);
      KFK.moveLineMoverTo(KFK.scrollToScreen({ x: parr[0][0], y: parr[0][1] }));
    } else if (KFK.mouseNear(
      KFK.C3MousePos(evt),
      { x: parr[1][0], y: parr[1][1] },
      20
    )) {
      $("#linetransformer").css("visibility", "visible");
      KFK.moveLinePoint = "to";
      KFK.lineToResize = theLine;
      console.log('KFK.lineToResize:', KFK.lineToResize);
      KFK.moveLineMoverTo(KFK.scrollToScreen({ x: parr[1][0], y: parr[1][1] }));
    } else {
      $("#linetransformer").css("visibility", "hidden");
    }
  });
  theLine.on('mouseout', () => {
    KFK.svgHoverLine = null;
    $(document.body).css("cursor", "default");
    theLine.attr({ 'stroke-width': theLine.attr('origin-width') });
  });
  theLine.on('mousedown', (evt) => {
    KFK.closeActionLog();
    KFK.lineDragging = true;
    KFK.lineToDrag = theLine;
    //TODO: don't drag when docLocked = true;
    KFK.lineDraggingStartPoint = {
      x: KFK.scrollX(evt.clientX),
      y: KFK.scrollY(evt.clientY)
    }
    console.log(theLine.x(), theLine.y());
    KFK.focusOnNode(null);
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "customline", true);
    KFK.pickedSvgLine = theLine;
    let color = theLine.attr("stroke");
    let width = theLine.attr("stroke-width");
    $("#lineColor").spectrum("set", color);
    $("#spinner_line_width").spinner("value", width);
  });
  theLine.on('mouseup', () => {
    if (KFK.lineDragging) {
      let parr = KFK.lineToDrag.array();
      if (KFK.APP.model.snap) {
        let p1 = { x: parr[0][0], y: parr[0][1] };
        let p2 = { x: parr[1][0], y: parr[1][1] };
        p1 = KFK.getNearGridPoint(p1.x, p1.y);
        p2 = KFK.getNearGridPoint(p2.x, p2.y);
        theLine.dmove(p1.x - parr[0][0], p1.y - parr[0][1]);
        theLine.attr({ 'stroke-width': theLine.attr('origin-width') });
        KFK.syncLinePut('U', theLine, 'move', KFK.clonedSLine, false);
      }
      KFK.lineDragging = false;
      KFK.lineToDrag = null;
    }
  });
  // theLine.on('mousemove', (evt) => {
  //   if (KFK.lineDragging === false) return;
  //   let realX = KFK.scrollX(evt.clientX);
  //   let realY = KFK.scrollY(evt.clientY);
  //   let deltaX = realX - KFK.lineDraggingStartPoint.x;
  //   let deltaY = realY - KFK.lineDraggingStartPoint.y;
  //   theLine.dmove(deltaX, deltaY);
  //   KFK.lineDraggingStartPoint.x += deltaX;
  //   KFK.lineDraggingStartPoint.y += deltaY;
  // });
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
        let tmp = KFK.lineToResize.plot([
          [stopAtPos.x, stopAtPos.y],
          parr[1]
        ]
        );
      } else {
        let tmp = KFK.lineToResize.plot([
          parr[0],
          [stopAtPos.x, stopAtPos.y],
        ]
        );
      }
    },
    stop: (evt, ui) => {
      //transform line  change line
      KFK.lineMoverDragging = false;
      KFK.lineMoverNewPosition = $("#linetransformer").position();
      if (KFK.lineToResize === null) return;
      let parr = KFK.lineToResize.array();
      let stopAtPos = KFK.C3MousePos(evt);
      if (KFK.APP.model.snap) {
        stopAtPos = KFK.getNearGridPoint(stopAtPos);
        let smp = KFK.ScreenMousePos(stopAtPos);
        KFK.moveDIVCenterToPos($('#linetransformer'), smp);
      }
      if (KFK.moveLinePoint === "from") {
        let tmp = KFK.lineToResize.plot([
          [stopAtPos.x, stopAtPos.y],
          parr[1]
        ]
        );
        tmp.stroke({ color: 'red' });
      } else {
        let tmp = KFK.lineToResize.plot([
          parr[0],
          [stopAtPos.x, stopAtPos.y],
        ]
        );
        tmp.stroke({ color: 'blue' });
      }
      KFK.syncLinePut('U', KFK.lineToResize, 'resize', KFK.clonedSLine, false);
    }
  }); //line transformer. draggable()
};

KFK.svgDrawTmpLine = function (fx, fy, tx, ty, option) {
  let tmpLineClass = "line_temp";
  // console.log("svgDrawTmpLine", fx, fy, tx, ty);
  if (KFK.KEYDOWN.alt) {
    if (Math.abs(tx - fx) < Math.abs(ty - fy))
      tx = fx;
    else ty = fy;
  }
  KFK.tempSvgLine = draw.findOne(`.${tmpLineClass}`);
  if (KFK.tempSvgLine) {
    KFK.tempSvgLine.show();
    KFK.tempSvgLine.plot(fx, fy, tx, ty).stroke(option);
  } else {
    KFK.tempSvgLine = draw.line(fx, fy, tx, ty).addClass(tmpLineClass).stroke(option);
  }
};

KFK.svgLinkNode = function (fid, tid, fbp, tbp, fx, fy, tx, ty) {
  console.log('from', fid, 'to', tid);
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
  KFK._svgDrawNodesLink(lineClass, lineClassReverse, pstr, triangle);
};

module.exports = KFK;

//TODO: Add Link, paste link
//TODO: add Picture by URL
//TODO: Paste link, auto check, if URL, add href, if image, show it.
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
//TODO: 自动折现
//TODO: replace Konva draw grid with SVG repeatable img?
//TODO: Ask for link text, open a modal dialog
