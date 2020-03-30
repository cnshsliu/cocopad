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

const OSSClient = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "0fKFa2tFodMQQETJ",
  accessKeySecret: "xpilgsl4KQbfnFDZkRMy0Dp1KuoW8A",
  bucket: config.vault.bucket
});
let draw = null;
const KFK = {};
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
KFK.lastFocusOnNode = null;
KFK.justCreatedNode = null;
KFK.jqHoverDIV = null;
KFK.jqHoverLine = null;
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
KFK.linkPos = [];
KFK.toggleMode = false;
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
    KFK.lineMoverDragging === false &&
    KFK.minimapMouseDown === false
  ) {
    KFK.warn(
      `框选 ${JSON.stringify(KFK.dragToSelectFrom)} - ${JSON.stringify(
        KFK.dragToSelectTo
      )}`
    );
    KFK.kuangXuan(KFK.dragToSelectFrom, KFK.dragToSelectTo);
  }

  if (KFK.mode === "line") {
    if (KFK.linkPos.length === 1) {
      KFK.lineTemping = true;
      let tmpPoint = {
        x: KFK.scrollX(KFK.currentMousePos.x),
        y: KFK.scrollY(KFK.currentMousePos.y)
      };
      let fromPoint = null;
      let toPoint = null;
      let selectedFromIndex = 0;
      let shortestDistance = KFK.distance(KFK.linkPos[0].points[0], tmpPoint);
      for (let i = 0; i < KFK.linkPos[0].points.length; i++) {
        fromPoint = KFK.linkPos[0].points[i];
        toPoint = tmpPoint;
        let tmp = KFK.distance(fromPoint, toPoint);
        if (tmp < shortestDistance) {
          shortestDistance = tmp;
          selectedFromIndex = i;
        }
      }
      if (KFK.tmpJQLine) {
        KFK.tmpJQLine.remove();
      }
      KFK.tmpJQLine = KFK.drawLine(
        KFK.linkPos[0].points[selectedFromIndex].x,
        KFK.linkPos[0].points[selectedFromIndex].y,
        tmpPoint.x,
        tmpPoint.y,
        { color: "#888888", stroke: 1 }
      );
    }
  }
});

KFK.gridLayer = new Konva.Layer({ id: "gridLayer" });
KFK.dragStage.add(KFK.gridLayer);

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

KFK.setJustCreated = function (nodeDIV) {
  KFK.justCreatedNode = nodeDIV;
  KFK.updatePropertyFormWithNode(nodeDIV);
  if ($(nodeDIV).attr("nodetype") === "text") {
    KFK.APP.setData("model", "rightTabIndex", 0);
  }
};

KFK.focusOnNode = function (nodeDIV) {
  KFK.lastFocusOnNode = nodeDIV;
  KFK.justCreatedNode = null;

  KFK.updatePropertyFormWithNode(nodeDIV);
};

KFK.updatePropertyFormWithNode = function (nodeDIV) {
  let nodeType = "unknown";
  if (nodeDIV != null) {
    nodeType = $(nodeDIV).attr("nodetype");
  }
  if (KFK.selectedDIVs.length < 2) {
    KFK.APP.setData("model", "rightTabIndex", 0);
  }

  KFK.APP.setData("show", "customline", false);
  KFK.APP.setData("show", "shape_property", nodeDIV != null);
  KFK.APP.setData(
    "show",
    "text_property",
    nodeDIV != null && getBoolean(config.node[nodeType].edittable)
  );
  KFK.APP.setData(
    "show",
    "customshape",
    nodeDIV != null && getBoolean(config.node[nodeType].customshape)
  );
  KFK.APP.setData(
    "show",
    "custombacksvg",
    nodeDIV != null && (nodeType === "yellowtip" || nodeType === "textblock")
  );
  if (nodeDIV != null && getBoolean(config.node[nodeType].customshape)) {
    let nodeBkgColor = $(nodeDIV).css("background-color");
    let nodeBorderColor = $(nodeDIV).css("border-color");
    let nodeBorderWidth = unpx($(nodeDIV).css("border-width"));
    let nodeBorderRadius = unpx($(nodeDIV).css("border-radius"));
    $("#shapeBkgColor").spectrum("set", nodeBkgColor);
    $("#shapeBorderColor").spectrum("set", nodeBorderColor);
    $("#spinner_border_width").spinner("value", nodeBorderWidth);
    $("#spinner_border_radius").spinner("value", nodeBorderRadius);
  }
  if (nodeDIV != null && nodeType === "yellowtip") {
    let tipColor = KFK.getTipBkgColor(nodeDIV);
    // console.log(`Current tip color: ${tipColor}`);
    $("#tipBkgColor").spectrum("set", tipColor);
  }

  if (nodeDIV != null && getBoolean(config.node[nodeType].edittable)) {
    let fontFamily = $(nodeDIV).css("font-family");
    let fontSize = $(nodeDIV).css("font-size");
    let fontColor = $(nodeDIV).css("color");
    let textAlign = $(nodeDIV).css("justify-content");
    let vertAlign = $(nodeDIV).css("align-items");
    textAlign = textAlign === "normal" ? "flex-start" : textAlign;
    vertAlign = vertAlign === "normal" ? "flex-start" : vertAlign;
    if ($(nodeDIV).find(".tip_content").length !== 0) {
      textAlign = $(nodeDIV).find(".tip_content").css("justify-content");
      vertAlign = $(nodeDIV).find(".tip_content").css("align-items");
    }
    $("#fontColor").spectrum("set", fontColor);
    KFK.APP.setData("model", "textAlign", textAlign);
    KFK.APP.setData("model", "vertAlign", vertAlign);
  }
};

KFK.log = function (msg) {
  KFK.warn(msg);
};

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

KFK.yarkLinkPoint = function (x, y, shiftKey) {
  if (KFK.lineDragging) return;
  if (KFK.linkPos.length === 1) {
    //按下option键，切换toggleMode
    if (KFK.toggleMode) {
      if (
        Math.abs(x - KFK.linkPos[0].center.x) <
        Math.abs(y - KFK.linkPos[0].center.y)
      )
        x = KFK.linkPos[0].center.x;
      else y = KFK.linkPos[0].center.y;
    }
  }
  KFK.linkPos.push({
    type: "point",
    center: { x: x, y: y },
    points: [{ x: x, y: y }]
  });
  KFK.procLink(shiftKey);
};

KFK.yarkLinkNode = function (theDIV, shiftKey) {
  let divLeft = unpx(theDIV.style.left);
  let divTop = unpx(theDIV.style.top);
  let divWidth = unpx(theDIV.style.width);
  let divHeight = unpx(theDIV.style.height);
  if (KFK.lineDragging) return;
  let pos = {
    div: theDIV,
    type: "box",
    center: {
      x: divLeft + divWidth * 0.5,
      y: divTop + divHeight * 0.5
    },
    points: [
      {
        x: unpx(theDIV.style.left),
        y: unpx(theDIV.style.top) + unpx(theDIV.style.height) * 0.5
      },
      {
        x: unpx(theDIV.style.left) + unpx(theDIV.style.width) * 0.5,
        y: unpx(theDIV.style.top)
      },
      {
        x: unpx(theDIV.style.left) + unpx(theDIV.style.width),
        y: unpx(theDIV.style.top) + unpx(theDIV.style.height) * 0.5
      },
      {
        x: unpx(theDIV.style.left) + unpx(theDIV.style.width) * 0.5,
        y: unpx(theDIV.style.top) + unpx(theDIV.style.height)
      }
    ]
  };
  KFK.linkPos.push(pos);
  KFK.procLink(shiftKey);
};

KFK.procLink = function (shiftKey) {
  if (KFK.linkPos.length < 2) {
    // console.log(`linkPos has ${KFK.linkPos.length} points, don't draw line`);
    return;
  } else {
    if (KFK.tmpJQLine) {
      KFK.tmpJQLine.remove();
      KFK.tmpJQLine = undefined;
    }
    KFK.lineTemping = false;
  }
  let fromPoint = null;
  let toPoint = null;
  let selectedFromIndex = 0;
  let selectedToIndex = 0;
  let shortestDistance = KFK.distance(
    KFK.linkPos[0].points[0],
    KFK.linkPos[1].points[0]
  );
  for (let i = 0; i < KFK.linkPos[0].points.length; i++) {
    fromPoint = KFK.linkPos[0].points[i];
    for (let j = 0; j < KFK.linkPos[1].points.length; j++) {
      toPoint = KFK.linkPos[1].points[j];
      let tmp = KFK.distance(fromPoint, toPoint);
      if (tmp < shortestDistance) {
        shortestDistance = tmp;
        selectedFromIndex = i;
        selectedToIndex = j;
      }
    }
  }
  let jqLine = KFK.drawLine(
    KFK.linkPos[0].points[selectedFromIndex].x,
    KFK.linkPos[0].points[selectedFromIndex].y,
    KFK.linkPos[1].points[selectedToIndex].x,
    KFK.linkPos[1].points[selectedToIndex].y,
    {}
  );
  //这四个属性都是有的
  jqLine.attr("fx", KFK.linkPos[0].points[selectedFromIndex].x);
  jqLine.attr("fy", KFK.linkPos[0].points[selectedFromIndex].y);
  jqLine.attr("tx", KFK.linkPos[1].points[selectedToIndex].x);
  jqLine.attr("ty", KFK.linkPos[1].points[selectedToIndex].y);
  //在连接到nodeDIV时，再加两个属性
  if (KFK.linkPos[0].type === "box") {
    jqLine.attr("fdiv", KFK.linkPos[0].div.getAttribute("id"));
  }
  if (KFK.linkPos[1].type === "box") {
    jqLine.attr("tdiv", KFK.linkPos[1].div.getAttribute("id"));
  }
  //有一端连在nodeDIV上，则，不允许拖动和改变大小
  // if (KFK.linkPos[0].type === 'box' || KFK.linkPos[1].type === 'box') {
  //     $(lineDIV).draggable('disable');
  // }

  KFK.syncNodePut("C", jqLine, "link node", null, false);
  if (!shiftKey) {
    KFK.linkPos.splice(0, 2);
    KFK.setMode("pointer");
  } else {
    KFK.linkPos[0] = KFK.linkPos[1];
    KFK.linkPos.splice(1, 1);
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
KFK.selectNone = function () {
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
  $(c3).dblclick(function (e) {
    if (KFK.isZooming === true) {
      KFK.zoomStop();
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
  });
  $(c3).on("click", function (e) {
    if (KFK.inDesigner() === false) return;
    e.preventDefault();
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
      KFK.yarkLinkPoint(
        e.clientX + KFK.scrollContainer.scrollLeft(),
        e.clientY + KFK.scrollContainer.scrollTop(),
        e.shiftKey
      );
      return;
    } else {
      if (KFK.selectedDIVs.length > 0) {
        if (KFK.duringKuangXuan === false) KFK.selectNone();
      }
      if (config.node[KFK.mode]) {
        let variant = "default";
        if (KFK.mode === "yellowtip") {
          variant = config.node.yellowtip.defaultTip;
        }
        let clientX = e.clientX;
        let clientY = e.clientY;
        let realX = KFK.scrollX(clientX);
        let realY = KFK.scrollY(clientY);
        console.log(`${clientX},${clientY} -> ${realX},${realY}`);
        let tmp = KFK.placeNode(
          e.shiftKey,
          myuid(),
          KFK.mode,
          variant,
          realX,
          realY
        );
        if (!e.shiftKey) KFK.setMode("pointer");
        KFK.syncNodePut("C", $(tmp), "new node", null, false);
        // } else {
        //     console.log(`${KFK.mode} is not supported`);
      }
    }

    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
  });

  $(c3).on("mousemove", function (e) {
    if (KFK.inDesigner() === false) return;
    e.preventDefault();
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
  $(KFK.C3)
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

KFK.drawLine = function (x1, y1, x2, y2, options) {
  if (options === undefined) options = {};
  let p1 = { x: x1, y: y1 };
  let p2 = { x: x2, y: y2 };
  if (KFK.APP.model.snap) {
    p1 = KFK.getNearGridPoint(p1.x, p1.y);
    p2 = KFK.getNearGridPoint(p2.x, p2.y);
    x1 = p1.x;
    y1 = p1.y;
    x2 = p2.x;
    y2 = p2.y;
  }

  let divid = myuid();
  let lineDIV = KFK.JC3.line(x1, y1, x2, y2, options);
  let jqLine = $(lineDIV);
  jqLine.attr("id", divid);
  jqLine.attr("options", KFK.codeToBase64(JSON.stringify(options)));
  jqLine.attr("x1", x1);
  jqLine.attr("y1", y1);
  jqLine.attr("x2", x2);
  jqLine.attr("y2", y2);
  jqLine.css("border-color", options.color);
  jqLine.css("border-width", px(options.stroke));
  if (options.tmp) {
    return jqLine;
  }
  jqLine.addClass("kfkline");
  KFK.setLineEventHandler(jqLine);
  return jqLine;
};

KFK.setLineEventHandler = function (jqLine) {
  let x1 = jqLine.attr("x1");
  let x2 = jqLine.attr("x2");
  let y1 = jqLine.attr("y1");
  let y2 = jqLine.attr("y2");
  jqLine.hover(
    function () {
      if (KFK.lineDragging) return;
      if (KFK.lineMoverDragging) return;
      $(document.body).css("cursor", "pointer");
      jqLine.addClass("shadow1");
      // theLine.dash([10, 2, 5, 2]);
      // theLine.dashEnabled(true);
      // theLine.shadowEnabled(false);
      // lineLayer.batchDraw();
      KFK.jqHoverLine = jqLine;

      if (
        !jqLine.attr("fdiv") &&
        !jqLine.attr("tdiv") &&
        !KFK.lineTemping &&
        KFK.docLocked() === false
      ) {
        function mouseNear(p1, p2) {
          if (
            Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) <= 20
          ) {
            return true;
          } else {
            return false;
          }
        }
        KFK.lineTwoEnds = {
          from: { x: x1, y: y1 },
          to: { x: x2, y: y2 }
        };

        if (KFK.tobeTransformJqLine && KFK.tobeTransformJqLine !== jqLine) {
          KFK.tobeTransformJqLine.removeClass("shadow2");
        }
        if (
          !jqLine.attr("fdiv") &&
          mouseNear(
            KFK.scrollToScreen(KFK.lineTwoEnds.from),
            KFK.currentMousePos
          )
        ) {
          $("#linetransformer").css("visibility", "visible");
          KFK.moveLinePoint = "from";
          KFK.tobeTransformJqLine = jqLine;
          KFK.tobeTransformJqLine.addClass("shadow2");
          KFK.moveLineMoverTo(KFK.scrollToScreen(KFK.lineTwoEnds.from));
        } else if (
          !jqLine.attr("tdiv") &&
          mouseNear(KFK.scrollToScreen(KFK.lineTwoEnds.to), KFK.currentMousePos)
        ) {
          $("#linetransformer").css("visibility", "visible");
          KFK.tobeTransformJqLine = jqLine;
          KFK.tobeTransformJqLine.addClass("shadow2");
          KFK.moveLinePoint = "to";
          KFK.moveLineMoverTo(KFK.scrollToScreen(KFK.lineTwoEnds.to));
        } else {
          $("#linetransformer").css("visibility", "hidden");
          if (KFK.tobeTransformJqLine)
            KFK.tobeTransformJqLine.removeClass("shadow2");
        }
      } else {
        $("#linetransformer").css("visibility", "hidden");
      }
    },
    function () {
      if (KFK.lineDragging) return;
      if (KFK.lineMoverDragging) return;
      $(document.body).css("cursor", "default");
      jqLine.removeClass("shadow1");
      // theLine.dash([10, 20, 5, 20]);
      // theLine.dashEnabled(false);
      // theLine.shadowEnabled(false);
      // lineLayer.batchDraw();
      KFK.jqHoverLine = null;
    }
  );

  // jqLine.draggable({
  //     start: (event, ui) => {
  //         console.log('line drag start');
  //         $('#linetransformer').css('visibility', 'hidden');
  //         KFK.dragging = true;
  //         KFK.linkPos = [];
  //         KFK.lineDragging = true;
  //         KFK.linePosStart = ui.position;
  //     },
  //     drag: () => {
  //         KFK.lineDragging = true;
  //     },
  //     //drag line
  //     stop: (event, ui) => {
  //         KFK.linePosStop = ui.position;
  //         console.log('line drag end ' + ui.offset.left + ":"+ ui.offset.top);
  //         console.log('line drag end ' + ui.position.left + ":"+ ui.position.top);
  //         KFK.linkPos = [];
  //         KFK.dragging = false;
  //         KFK.lineDragging = false;
  //         KFK.afterDragging = true;
  //         if (KFK.APP.model.snap) {
  //              let topLeftPoint = KFK.getNearGridPoint(KFK.linePosStop.left, KFK.linePosStop.top);
  //              KFK.linePosStop.left = topLeftPoint.x;
  //              KFK.linePosStop.top = topLeftPoint.y;
  //         }
  //             let delta = {
  //                 x: KFK.linePosStop.left - KFK.linePosStart.left,
  //                 y: KFK.linePosStop.top - KFK.linePosStart.top
  //             }
  //         KFK.offsetLineDataAttr(lineDIV, delta);

  //         // let newPosition = KFK.getPositionOfTwoEndsOfLine2(lineDIV);
  //         // if (KFK.APP.model.snap) {
  //         //     let topLeftPoint = KFK.getNearGridPoint(KFK.nodeLeft(lineDIV), KFK.nodeTop(lineDIV));
  //         //     lineDIV.style.left = px(topLeftPoint.x);
  //         //     lineDIV.style.top = px(topLeftPoint.y);
  //         //     newPosition = KFK.getPositionOfTwoEndsOfLine2(lineDIV);
  //         // }
  //         //     let delta = {
  //         //         x: KFK.nodeLeft(lineDIV) - KFK.positionBeforeDrag.x,
  //         //         y: KFK.nodeTop(lineDIV) - KFK.positionBeforeDrag.y
  //         //     }

  //         //     if (!event.shiftKey) {
  //         //         //拖动其它被同时选中的对象
  //         //         let index = KFK.selectedDIVs.indexOf(el(jqLine));
  //         //         if (KFK.selectedDIVs.length > 1 && index >= 0) {
  //         //             for (let i = 0; i < KFK.selectedDIVs.length; i++) {
  //         //                 if (i === index)
  //         //                     continue;
  //         //                 KFK.selectedDIVs[i].style.left = px(
  //         //                     KFK.nodeLeft(KFK.selectedDIVs[i]) + delta.x);
  //         //                 KFK.selectedDIVs[i].style.top = px(
  //         //                     KFK.nodeTop(KFK.selectedDIVs[i]) + delta.y);
  //         //                 if (KFK.selectedDIVs[i].getAttribute('nodetype') === 'kfkline') {
  //         //                     KFK.offsetLineDataAttr(KFK.selectedDIVs[i], delta);
  //         //                 }
  //         //             }
  //         //         }
  //         //     }
  //         //     KFK.setSelectedNodesBoundingRect();
  //     },
  // });

  //防止点在线上，以后，画出框选框
  jqLine.mousedown(e => {
    KFK.closeActionLog();
    e.stopImmediatePropagation();
    e.stopPropagation();
  });
  //click line
  jqLine.click(e => {
    KFK.focusOnNode(null);
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "customline", true);
    console.log("here");
    KFK.pickedJqLine = jqLine;
    let color = jqLine.css("border-color");
    let width = jqLine.css("border-bottom-width");
    console.log("line width " + width);
    $("#lineColor").spectrum("set", color);
    $("#spinner_line_width").spinner("value", width);
    e.stopImmediatePropagation();
    e.stopPropagation();
  });
};

KFK.initLineMover = function () {
  $("#linetransformer").draggable({
    // move line drag line
    start: () => {
      KFK.closeActionLog();
      KFK.lineMoverDragging = true;
      KFK.fromJQ = KFK.tobeTransformJqLine.clone();
      KFK.tobeTransformJqLine.css("visibility", "hidden");
      KFK.lineMoverOldPosition = $("#linetransformer").position();
      // KFK.setMode('line');
    },

    drag: () => {
      KFK.lineMoverNewPosition = $("#linetransformer").position();
      // console.log(KFK.lineMoverNewPosition);
      if (
        KFK.lineMoverNewPosition.left != 0 &&
        KFK.lineMoverNewPosition.top != 0
      ) {
        if (KFK.tmpJQLine) {
          KFK.tmpJQLine.remove();
        }
        if (KFK.tobeTransformJqLine) {
          let options = JSON.parse(
            KFK.base64ToCode(KFK.tobeTransformJqLine.attr("options"))
          );
          options.tmp = true;
          if (KFK.moveLinePoint === "from") {
            KFK.tmpJQLine = KFK.drawLine(
              KFK.scrollX(KFK.lineMoverNewPosition.left + 10),
              KFK.scrollY(KFK.lineMoverNewPosition.top + 10),
              KFK.lineTwoEnds.to.x,
              KFK.lineTwoEnds.to.y,
              options
            );
          } else {
            KFK.tmpJQLine = KFK.drawLine(
              KFK.lineTwoEnds.from.x,
              KFK.lineTwoEnds.from.y,
              KFK.scrollX(KFK.lineMoverNewPosition.left + 10),
              KFK.scrollY(KFK.lineMoverNewPosition.top + 10),
              options
            );
          }
        }
      } else {
        console.log(new Error().stack);
      }
    },
    stop: () => {
      //transform line  change line
      KFK.lineMoverDragging = false;
      if (KFK.tmpJQLine) {
        KFK.tmpJQLine.remove();
      }
      KFK.lineTemping = false;
      KFK.lineMoverNewPosition = $("#linetransformer").position();
      if (KFK.APP.model.snap) {
        let tmp = KFK.getNearGridPoint(
          KFK.lineMoverNewPosition.left + 10,
          KFK.lineMoverNewPosition.top + 10
        );
        $("#linetransformer").css("left", tmp.x - 10);
        $("#linetransformer").css("top", tmp.y - 10);
        KFK.lineMoverNewPosition = $("#linetransformer").position();
      }
      let tmp = null;
      if (KFK.tobeTransformJqLine) {
        let options = JSON.parse(
          KFK.base64ToCode(KFK.tobeTransformJqLine.attr("options"))
        );
        if (KFK.moveLinePoint === "from") {
          tmp = KFK.drawLine(
            KFK.scrollX(KFK.lineMoverNewPosition.left + 10),
            KFK.scrollY(KFK.lineMoverNewPosition.top + 10),
            KFK.lineTwoEnds.to.x,
            KFK.lineTwoEnds.to.y,
            options
          );
        } else {
          tmp = KFK.drawLine(
            KFK.lineTwoEnds.from.x,
            KFK.lineTwoEnds.from.y,
            KFK.scrollX(KFK.lineMoverNewPosition.left + 10),
            KFK.scrollY(KFK.lineMoverNewPosition.top + 10),
            options
          );
        }
        KFK.syncNodePut(
          "D",
          KFK.tobeTransformJqLine,
          " delete old line",
          null,
          false
        );
        KFK.tobeTransformJqLine.remove();
        KFK.tobeTransformJqLine = tmp;
        KFK.tobeTransformJqLine.addClass("shadow2");
        KFK.pickedJqLine = tmp;
        KFK.syncNodePut("C", KFK.pickedJqLine, "MARK_UNDOABLE", null, false);
      }
      KFK.setSelectedNodesBoundingRect();
    }
  });
};

KFK.getDegree = function (p1, p2) {
  let deg = 0;
  if (p2.x === p1.x) {
    if (p2.y === p1.y) {
      deg = 0;
    } else if (p2.y < p1.y) {
      deg = -90;
    } else if (p2.y > p1.y) {
      deg = 90;
    }
  } else if (p2.y === p1.y) {
    if (p2.x < p1.x) {
      deg = 180;
    } else {
      deg = 0;
    }
  } else {
    deg = (Math.atan((p2.y - p1.y) / (p2.x - p1.x)) / Math.PI) * 180;
    if (p2.x < p1.x) {
      deg += 180;
    }
  }

  return deg;
};

KFK.getDegree({ x: 100, y: 100 }, { x: 200, y: 100 });
KFK.getDegree({ x: 100, y: 100 }, { x: 200, y: 200 });
KFK.getDegree({ x: 100, y: 100 }, { x: 100, y: 200 });
KFK.getDegree({ x: 100, y: 100 }, { x: 0, y: 200 });
KFK.getDegree({ x: 100, y: 100 }, { x: 0, y: 100 });
KFK.getDegree({ x: 100, y: 100 }, { x: 0, y: 0 });
KFK.getDegree({ x: 100, y: 100 }, { x: 100, y: 0 });
KFK.getDegree({ x: 100, y: 100 }, { x: 200, y: 0 });

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

  textarea.oncopy = function (e) {
    e.stopPropagation();
  };
  textarea.onpaste = function (e) {
    e.stopPropagation();
  };

  textarea.addEventListener("keydown", function (e) {
    // hide on enter
    // but don't hide on shift + enter
    if (e.keyCode === 13 && !e.shiftKey) {
      textnode.innerText = textarea.value;
      removeTextarea(textarea.value !== oldText);
      KFK.focusOnMainContainer();
    }
    // on esc do not set value back to node
    if (e.keyCode === 27) {
      removeTextarea(false);
      e.stopImmediatePropagation();
      e.stopPropagation();
    }
    KFK.focusOnMainContainer();
  });

  function handleOutsideClick(e) {
    if (e.target !== textarea) {
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
  let nodes = $(KFK.C3).find(".kfknode");
  return nodes.length;
};

KFK.placeNode = function (shiftKey, id, type, variant, x, y, w, h, attach) {
  let aNode = new Node(id, type, variant, x, y, w, h, attach);
  KFK.nodes.push(aNode);
  let nodeDIV = KFK._createNode(aNode);
  KFK.setJustCreated(nodeDIV);

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
    KFK._setTipBkgColor(nodeDIV, KFK.APP.model.tipBkgColor);
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
      nodeid: nodeID,
      content: cmd === "D" ? nodeID : tobeSync.prop("outerHTML"),
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
  } catch (e) {
    console.log(e);
  } finally {
    KFK.C3.dispatchEvent(KFK.refreshC3event);
  }
  //console.log(jqDIV.prop('outerHTML'));
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

KFK.getLastSelectedNode = function () {
  if (KFK.selectedDIVs.length > 0) {
    return KFK.selectedDIVs[KFK.selectedDIVs.length - 1];
  } else {
    return null;
  }
};

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
  let theNode = KFK.getLastSelectedNode();
  if (theNode !== null && KFK.notAnyLocked($(theNode))) {
    let oldColor = KFK.getTipBkgColor(theNode);
    // console.log('setTipBkgImage for ' + theNode.getAttribute("id") + "   " + tipvariant + "  to " + oldColor);
    $(theNode).attr("variant", tipvariant);
    KFK.setTipBkgImage(theNode, tipvariant, oldColor);
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

KFK.setTipBkgColor = function (theNode, bgColor) {
  KFK.fromJQ = $(theNode).clone();
  let ret = KFK._setTipBkgColor(theNode, bgColor);
  if (ret)
    KFK.syncNodePut("U", $(theNode), "change bkg color", KFK.fromJQ, false);
};

KFK._setTipBkgColor = function (theNode, bgColor) {
  if (theNode === null) {
    console.warn("setTipBkgColor to null nodeDIV");
    return;
  }
  console.log(
    "setTipBkgColor for " +
      theNode.getAttribute("nodetype") +
      " " +
      theNode.getAttribute("variant")
  );
  let svgImg = $(theNode).find(".tip_bkg .svg_main_path");
  if (svgImg.length > 0) {
    svgImg.attr("fill", bgColor);
    // console.log('set color to ' + bgColor);
    return true;
  } else {
    console.warn(
      `Can't change main path color. Node type ${theNode.getAttribute(
        "nodetype"
      )} id:${theNode.getAttribute("id")}   .svg_main_path not found`
    );
    return false;
  }
};
KFK.getTipBkgColor = function (theNode) {
  if (theNode === null) {
    console.warn("getTipBkgColor to null nodeDIV, return default");
    return config.node.yellowtip.defaultColor;
  }
  let svgImg = $(theNode).find(".tip_bkg .svg_main_path");
  if (svgImg.length > 0) {
    return svgImg.attr("fill");
  } else {
    //console.warn(`.tip_bkg .svg_main_path not found> Node type ${theNode.getAttribute("nodetype")} id:${theNode.getAttribute("id")}   .svg_main_path not found`);
    return config.node.yellowtip.defaultColor;
  }
};

KFK.reArrangeLinks = function (jqNodeDIV) {
  $(KFK.C3)
    .find(".kfkline")
    .each((index, aLineDiv) => {
      //如果从当前node开始连接
      if (
        aLineDiv.getAttribute("fdiv") &&
        aLineDiv.getAttribute("fdiv") === jqNodeDIV.attr("id")
      ) {
        // console.log(`line ${index} link from this node`);
        KFK.linkPos = [];
        //如果结束点也是一个nodediv
        if (aLineDiv.getAttribute("tdiv")) {
          KFK.yarkLinkNode(el(jqNodeDIV));
          let divFilter = `#${aLineDiv.getAttribute("tdiv")}`;
          KFK.yarkLinkNode($(divFilter)[0]);
        } else {
          //如果结束点是一个 point
          KFK.yarkLinkNode(el(jqNodeDIV));
          KFK.yarkLinkPoint(
            aLineDiv.getAttribute("tx"),
            aLineDiv.getAttribute("ty")
          );
        }
        //老的link line不用从selectedDIVs中删除
        //因为link line不放入selectedDIVs
        KFK.syncNodePut("D", $(aLineDiv), "remove old line", null, false);
        $(aLineDiv).remove();
      } else if (
        aLineDiv.getAttribute("tdiv") &&
        aLineDiv.getAttribute("tdiv") === jqNodeDIV.attr("id")
      ) {
        // console.log(`line ${index} link to this node`);
        KFK.linkPos = [];
        if (aLineDiv.getAttribute("fdiv")) {
          let divFilter = `#${aLineDiv.getAttribute("fdiv")}`;
          KFK.yarkLinkNode($(divFilter)[0]);
          KFK.yarkLinkNode(el(jqNodeDIV));
        } else {
          KFK.yarkLinkPoint(
            aLineDiv.getAttribute("fx"),
            aLineDiv.getAttribute("fy")
          );
          KFK.yarkLinkNode(el(jqNodeDIV));
        }
        //老的link line不用从selectedDIVs中删除
        //因为link line不放入selectedDIVs
        KFK.syncNodePut("D", $(aLineDiv), "remove old line", null, false);
        $(aLineDiv).remove();
      }
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
      resize: () => {},
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
        KFK.reArrangeLinks(jqNodeDIV);
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
    drag: (event, ui) => {},
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
      KFK.reArrangeLinks(jqNodeDIV);
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
      KFK.jqHoverDIV = jqNodeDIV;
      jqNodeDIV.addClass("shadow1");
      // jqNodeDIV.resizable('enable');
    },
    () => {
      $(document.body).css("cursor", "default");
      jqNodeDIV.removeClass("shadow1");
      // jqNodeDIV.resizable('disable');
      KFK.jqHoverDIV = null;
    }
  );

  //防止点在节点上，以后，画出框选框
  jqNodeDIV.mousedown(e => {
    KFK.closeActionLog();
    // console.log('mousedown on nodeDIV');
    e.stopImmediatePropagation();
    e.stopPropagation();
  });
  //click node
  jqNodeDIV.click(e => {
    // console.log('click on nodeDIV');
    if (KFK.isZooming) return;
    KFK.afterDragging = false;
    KFK.afterResizing = false;
    let selDIV = el(jqNodeDIV);
    let selLine = undefined;
    KFK.procNodeInArrayOfSelected(selDIV, selLine, e.shiftKey);
    if (KFK.mode === "line") {
      if (KFK.afterDragging === false) {
        // console.log('yark link node')
        KFK.yarkLinkNode(el(jqNodeDIV), e.shiftKey);
      } else {
        // console.log('NO yark link node because afterDragging');
        KFK.afterDragging = true;
      }
      e.stopImmediatePropagation();
      return;
    }

    KFK.resetPropertyOnMultipleNodesSelected();
    KFK.focusOnNode(selDIV);

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
      if (!e.shiftKey) {
        KFK.setMode("pointer");
      }
    }

    e.stopPropagation();
  });

  jqNodeDIV.dblclick(function (e) {
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

KFK.moveNodeByArrowKey = function (e) {
  if (KFK.isZooming) return;
  let DELTA = 5;
  if (e.shiftKey && e.ctrlKey) DELTA = 20;
  else if (e.shiftKey) DELTA = 1;

  KFK.selectedDIVs.forEach((tmp, index) => {
    let theLine = KFK.selectedLINs[index];
    let offset = { x: 0, y: 0 };
    if (e.keyCode === 37) {
      tmp.style.left = px(unpx(tmp.style.left) - DELTA);
      offset = { x: -DELTA, y: 0 };
    } else if (e.keyCode === 38) {
      tmp.style.top = px(unpx(tmp.style.top) - DELTA);
      offset = { x: 0, y: -DELTA };
    } else if (e.keyCode === 39) {
      tmp.style.left = px(unpx(tmp.style.left) + DELTA);
      offset = { x: DELTA, y: 0 };
    } else if (e.keyCode === 40) {
      tmp.style.top = px(unpx(tmp.style.top) + DELTA);
      offset = { x: 0, y: DELTA };
    }
    if (theLine !== undefined)
      //this is a line div
      KFK.offsetLineDataAttr(tmp, offset);
  });
  e.stopImmediatePropagation();
  e.stopPropagation();
};

KFK._deleteNode = function (jqDIV) {
  $(KFK.C3)
    .find(".kfkline")
    .each((index, aLinkDiv) => {
      //如果从当前node开始连接
      if (
        aLinkDiv.getAttribute("fdiv") === jqDIV.attr("id") ||
        aLinkDiv.getAttribute("tdiv") === jqDIV.attr("id")
      ) {
        //link div不会放入selectedDIVs, 因此也不用去从中删除
        KFK.syncNodePut(
          "D",
          $(aLineDiv),
          "delete line for deleting node",
          null,
          false
        );
        $(aLinkDiv).remove();
      }
    });
  let myZI = KFK.getZIndex(jqDIV);
  let count = 0;
  let allnodes = $(KFK.C3).find(".kfknode");
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

KFK.deleteHoverDiv = function (e) {
  if (KFK.isZooming) return;
  if (KFK.jqHoverDIV) {
    if (KFK.anyLocked(KFK.jqHoverDIV)) return;
    KFK._deleteNode(KFK.jqHoverDIV);
    KFK.jqHoverDIV = null;
  } else if (KFK.jqHoverLine) {
    if (KFK.anyLocked(KFK.jqHoverLine)) return;
    KFK._deleteNode(KFK.jqHoverLine);
    KFK.jqHoverLine = null;
  }
};

KFK.duplicateHoverDiv = function (e) {
  if (KFK.docLocked()) return;
  if (KFK.isZooming) return;
  let offset = { x: 0, y: 0 };
  if (KFK.jqHoverDIV) {
    KFK.divToCopy = el(KFK.jqHoverDIV);
    offset = { x: 20, y: 0 };
  } else if (KFK.jqHoverLine) {
    KFK.divToCopy = el(KFK.jqHoverLine);
    offset = { x: 20, y: 0 };
  }
  e.stopPropagation();
  if (KFK.divToCopy) {
    if ($(KFK.divToCopy).hasClass("kfknode")) {
      offset = { x: 20, y: 20 };
      let jqNewNode = $(KFK.divToCopy).clone(false);
      jqNewNode.attr("id", myuid());
      console.log(KFK.currentMousePos);
      console.log(
        KFK.scrollX(KFK.currentMousePos.x),
        KFK.scrollY(KFK.currentMousePos.y)
      );
      console.log(
        parseInt(jqNewNode.css("width")),
        parseInt(jqNewNode.css("height"))
      );
      console.log(
        KFK.scrollX(KFK.currentMousePos.x) -
          parseInt(jqNewNode.css("width")) * 0.5
      );
      console.log(
        KFK.scrollY(KFK.currentMousePos.y) -
          parseInt(jqNewNode.css("height")) * 0.5
      );

      jqNewNode.css(
        "left",
        KFK.scrollX(KFK.currentMousePos.x) -
          parseInt(jqNewNode.css("width")) * 0.5
      );
      jqNewNode.css(
        "top",
        KFK.scrollY(KFK.currentMousePos.y) -
          parseInt(jqNewNode.css("height")) * 0.5
      );
      KFK.cleanNodeEventFootprint(jqNewNode);
      jqNewNode.appendTo(KFK.C3);
      KFK.setNodeEventHandler(jqNewNode);
      KFK.focusOnNode(el(jqNewNode));
      KFK.syncNodePut("C", jqNewNode, "duplicate node", null, false);
    } else if ($(KFK.divToCopy).hasClass("kfkline")) {
      let x1 = parseInt($(KFK.divToCopy).attr("x1"));
      let y1 = parseInt($(KFK.divToCopy).attr("y1"));
      let x2 = parseInt($(KFK.divToCopy).attr("x2"));
      let y2 = parseInt($(KFK.divToCopy).attr("y2"));
      let jqLine = null;
      if (offset.x > 0) {
        jqLine = KFK.drawLine(
          KFK.scrollX(x1 + offset.x),
          KFK.scrollY(y1 + offset.y),
          KFK.scrollX(x2 + offset.x),
          KFK.scrollY(y2 + offset.y),

          {
            color: $(KFK.divToCopy).attr("strokeColor"),
            stroke: parseInt($(KFK.divToCopy).attr("strokeWidth"))
          }
        );
      } else {
        let cx = (x1 + x2) * 0.5;
        let cy = (y1 + y2) * 0.5;
        let ncx = KFK.currentMousePos.x;
        let ncy = KFK.currentMousePos.y;
        let deltax = ncx - cx;
        let deltay = ncy - cy;
        jqLine = KFK.drawLine(
          x1 + deltax + KFK.scrollContainer.scrollLeft(),
          y1 + deltay + KFK.scrollContainer.scrollTop(),
          x2 + deltax + KFK.scrollContainer.scrollLeft(),
          y2 + deltay + KFK.scrollContainer.scrollTop(),
          {
            color: $(KFK.divToCopy).attr("strokeColor"),
            stroke: parseInt($(KFK.divToCopy).attr("strokeWidth"))
          }
        );
      }
      KFK.syncNodePut("C", jqLine, "duplicate line", null, false);
    }
  }
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
    KFK.initSvgLayer();
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
  } catch (e) {
    console.error(e);
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
  KFK.selectNone();

  KFK.APP.setData("model", "rightTabIndex", 2);
  $(".padlayout").removeClass("noshow");
  $(".padlayout").fadeIn(1000, function () {
    // Animation complete
  });
  x(">>>>>>padDesigner done");
};

KFK.onWsMsg = function (data) {
  data = JSON.parse(data);
  if (data.cmd === "PING") {
    KFK.WS.put("PONG", {});
  }
  if (!data.payload) {
    return;
  }
  console.log(data.payload.cmd);
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
    case "SYNC":
    case "UPD":
      KFK.numberOfNodeToCreate = data.payload.data.length;
      KFK.numberOfNodeCreated = 0;
      data.payload.data.forEach(html => {
        KFK.recreateNodeFromHTML(html);
      });
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
        .catch(err => {});
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

    case "DEL":
      data.payload.data.forEach(nodeid => {
        $(`#${nodeid}`).remove();
      });
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

KFK.recreateNodeFromHTML = function (html) {
  // console.log(html);
  try {
    let isALockedNode = false;
    if (html.startsWith("[LOCK]")) {
      isALockedNode = true;
      html = html.substring(6);
    }
    let jqDIV = $($.parseHTML(html));
    let nodeid = jqDIV.attr("id");
    if (nodeid === "document") {
      //在handlers.js 中，第一个进入doc时，返回document的doc_id和name
      let docRet = {
        doc_id: jqDIV.attr("doc_id"),
        name: jqDIV.attr("name"),
        prjid: jqDIV.attr("prjid"),
        owner: jqDIV.attr("owner"),
        readonly: getBoolean(jqDIV.attr("readflag"))
      };
      KFK.APP.setData("model", "cocodoc", docRet);
      localStorage.setItem("cocodoc", JSON.stringify(docRet));
      KFK._onDocLoaded();
    } else if (jqDIV.hasClass("notify")) {
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
      } else if (jqDIV.hasClass("kfkline")) KFK.setLineEventHandler(jqDIV);
    }
  } catch (error) {
    console.log(error);
  } finally {
    KFK.numberOfNodeCreated += 1;
    if (KFK.numberOfNodeCreated >= KFK.numberOfNodeToCreate) {
      KFK.C3.dispatchEvent(KFK.refreshC3event);
    }
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
  if (KFK.lastFocusOnNode != null) {
    return $(KFK.lastFocusOnNode);
  } else if (KFK.justCreatedNode != null) {
    return $(KFK.justCreatedNode);
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
      let theNode = KFK.getLastSelectedNode();
      if (theNode != null && KFK.notAnyLocked($(theNode))) {
        KFK.fromJQ = $(theNode).clone();
        KFK.setTipBkgColor(theNode, rgb);
        KFK.syncNodePut(
          "U",
          $(theNode),
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

  if (oldMode === "line" && mode !== "line") {
    if (KFK.tmpJQLine) {
      KFK.tmpJQLine.remove();
      KFK.tmpJQLine = undefined;
    }
    KFK.lineTemping = false;
    KFK.linkPos = [];
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
  } else if (KFK.mode === "textblock") {
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", true);
    KFK.APP.setData("show", "custombacksvg", false);
  } else if (KFK.mode === "text") {
    KFK.APP.setData("show", "shape_property", true);
    KFK.APP.setData("show", "customshape", false);
    KFK.APP.setData("show", "custombacksvg", false);
    KFK.APP.setData("show", "text_property", true);
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
  // $('#right').keydown(function (e) {
  //     // e.stopImmediatePropagation();
  //     // e.stopPropagation();
  // });
  $("#containermain").focus();
  $(document).keydown(function (e) {
    switch (e.keyCode) {
      case 16:
        //Shift
        KFK.lockMode = KFK.lockMode ? false : true;
        KFK.APP.lockMode = KFK.lockMode;
        KFK.pickedNode = null;
        preventDefault = true;
        if (KFK.linkPos.length === 1) {
          KFK.linkPos = [];
        }
        KFK.KEYDOWN.shift = true;
        break;
      case 17:
        //Ctrl key ctrl
        KFK.KEYDOWN.ctrl = true;
        break;
      case 18:
        //Option
        //按下option键，切换toggleMode
        KFK.toggleMode = !KFK.toggleMode;
        if (KFK.mode === "line") {
          KFK.APP.setData("model", "lineToggleMode", KFK.toggleMode);
        }
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
        KFK.selectNone();
        if (!KFK.editting && KFK.mode !== "line") KFK.setMode("pointer");
        if (KFK.lineTemping) {
          KFK.lineTemping = false;
        }
        if (KFK.tmpJQLine) {
          KFK.tmpJQLine.remove();
          KFK.tmpJQLine = null;
          KFK.linkPos.clear();
        }
        KFK.setMode("pointer");
        break;
      case 90:
        if (e.metaKey && e.shiftKey) KFK.redo();
        if (e.metaKey && !e.shiftKey) KFK.undo();
        break;
    }
  });
  $(document).keyup(function (e) {
    if (KFK.inDesigner() === false) return;
    console.log(e.keyCode);
    let preventDefault = true;
    if (KFK.editting) return;
    if (KFK.isZooming) return;

    switch (e.keyCode) {
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
        if (e.ctrlKey)
          //Ctrl-R  key R
          KFK.toggleRight();
        break;
      case 46:
      case 8:
      case 88:
        // key DELETE  key X
        preventDefault = true;
        KFK.deleteHoverDiv(e);
        break;
      case 68:
        // key D
        preventDefault = true;
        KFK.duplicateHoverDiv(e);
        break;
      case 35:
        // key end
        preventDefault = true;
        KFK.ZiToTop();
        break;
      case 36:
        // key home
        preventDefault = true;
        KFK.ZiToBottom();
        break;
      case 33:
        // key pageup
        preventDefault = true;
        KFK.ZiToHigher();
        break;
      case 34:
        // key pagedown
        preventDefault = true;
        KFK.ZiToLower();
        break;
      case 76:
        if (e.shiftKey) {
          //key L key l
          KFK.tryToLockUnlock();
        }
        break;
      default:
        preventDefault = false;
    }
    if (preventDefault) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
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

KFK.ZiToTop = function () {
  if (KFK.isKfkNode(KFK.jqHoverDIV) === false) return;
  let myZI = KFK.getZIndex(KFK.jqHoverDIV);
  let count = 0;
  let zIndexChanger = { doc_id: KFK.APP.model.cocodoc.doc_id, ZI: {} };
  $(KFK.C3)
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
  KFK.setZIndex(KFK.jqHoverDIV, count);
  zIndexChanger.ZI[KFK.jqHoverDIV.attr("id")] = count;
  KFK.WS.put("ZI", zIndexChanger);
};

KFK.ZiToBottom = function () {
  if (KFK.isKfkNode(KFK.jqHoverDIV) === false) return;

  let myZI = KFK.getZIndex(KFK.jqHoverDIV);
  let count = 0;
  let zIndexChanger = { doc_id: KFK.APP.model.cocodoc.doc_id, ZI: {} };
  $(KFK.C3)
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
  KFK.setZIndex(KFK.jqHoverDIV, 1);
  zIndexChanger.ZI[KFK.jqHoverDIV.attr("id")] = 1;
  KFK.sendCmd("ZI", zIndexChanger);
};
KFK.ZiToHigher = function () {
  if (KFK.isKfkNode(KFK.jqHoverDIV) === false) return;
  let myZI = KFK.getZIndex(KFK.jqHoverDIV);
  let count = 0;
  let allnodes = $(KFK.C3).find(".kfknode");
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
    KFK.setZIndex(KFK.jqHoverDIV, myZI + 1);
    zIndexChanger.ZI[KFK.jqHoverDIV.attr("id")] = myZI + 1;
    KFK.sendCmd("ZI", zIndexChanger);
  }
};

KFK.ZiToLower = function () {
  if (KFK.isKfkNode(KFK.jqHoverDIV) === false) return;
  let zIndexChanger = { doc_id: KFK.APP.model.cocodoc.doc_id, ZI: {} };
  let myZI = KFK.getZIndex(KFK.jqHoverDIV);
  if (myZI > 1) {
    let count = 0;
    $(KFK.C3)
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
    KFK.setZIndex(KFK.jqHoverDIV, myZI - 1);
    zIndexChanger.ZI[KFK.jqHoverDIV.attr("id")] = myZI - 1;
    KFK.sendCmd("ZI", zIndexChanger);
  }
};

KFK.tryToLockUnlock = function () {
  if (KFK.jqHoverDIV && KFK.isMyDoc() && KFK.docLocked() === false) {
    if (KFK.nodeLocked(KFK.jqHoverDIV)) {
      let opEntry = {
        cmd: "UNLOCK",
        from: KFK.jqHoverDIV.attr("id"),
        to: KFK.jqHoverDIV.attr("id")
      };
      KFK.yarkOpEntry(opEntry);
      KFK.sendCmd("UNLOCKNODE", {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        nodeid: KFK.jqHoverDIV.attr("id")
      });
    } else {
      let opEntry = {
        cmd: "LOCK",
        from: KFK.jqHoverDIV.attr("id"),
        to: KFK.jqHoverDIV.attr("id")
      };
      KFK.yarkOpEntry(opEntry);
      KFK.sendCmd("LOCKNODE", {
        doc_id: KFK.APP.model.cocodoc.doc_id,
        nodeid: KFK.jqHoverDIV.attr("id")
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
  } catch (e) {
    console.log(e);
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
  if (KFK.jqHoverDIV) {
    if (KFK.anyLocked(KFK.jqHoverDIV)) return;
    if (KFK.isZooming) return;

    if (config.node[KFK.jqHoverDIV.attr("nodetype")].edittable) {
      KFK.fromJQ = KFK.jqHoverDIV.clone();
      let innerObj = KFK.jqHoverDIV.find(".innerobj");
      let oldText = innerObj.html();
      let newText = oldText + "<BR> " + toAdd;
      if (KFK.KEYDOWN.shift === false) {
        newText = toAdd;
      }
      innerObj.html(newText);
      KFK.syncNodePut(
        "U",
        KFK.jqHoverDIV,
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

KFK.changeSVGFill = function () {};
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
    } catch (e) {
      console.error(e);
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
  KFK.svgDraw = SVG().addTo("body").size("1000", "1000");
  draw = KFK.svgDraw;
  KFK.playWithSVGdotJS();
};
KFK.playWithSVGdotJS = function () {
  var path = draw.path("M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z");
  path.fill("none").move(20, 20);
  path.stroke({ color: "#f06", width: 4, linecap: "round", linejoin: "round" });
  path.text("SVG.js is rock, yes, rock and roll");

  var text = draw.text(function (add) {
    add.tspan("Lorem ipsum dolor sit amet ").newLine();
    add.tspan("consectetur").fill("#f06");
    add.tspan(".");
    add.tspan("Cras sodales imperdiet auctor.").newLine().dx(20);
    add.tspan("Nunc ultrices lectus at erat").newLine();
    add.tspan("dictum pharetra elementum ante").newLine();
  });

  
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
