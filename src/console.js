import url from "url";
import path from "path";
import Konva from "konva";
import suuid from 'short-uuid';
import "core-js/stable";
import "regenerator-runtime/runtime";
// import uuidv4 from "uuid/v4";
import assetIcons from '../assets/*.svg';
import OSS from 'ossnolookup';
import "./importjquery";
import "jquery-ui-dist/jquery-ui.js";
import { BIconFolderSymlinkFill, directivesPlugin } from "bootstrap-vue";

function myuid() {
    return suuid.generate();
}
Array.prototype.clear = function () {
    this.splice(0, this.length);
}

let config = {
    node: {
        image: {
            resizable: true,
        },
        start: {
            width: 40,
            height: 40,
        },
        end: {
            width: 40,
            height: 40,
        },
        text: {
            width: 120,
            height: 20,
            edittable: true,
        },
        yellowtip: {
            width: 200,
            height: 200,
            resizable: true,
            droppable: true,
            edittable: true,
        },
        textblock: {
            width: 200, height: 100, resizable: true,
            background: '#49FFAC', minWidth: 1, minHeight: 1,
            droppable: true,
            edittable: true,
        },
        pin: {
            width: 40,
            height: 40,
        }
    }
}
let tip_variants = {
    'tip': {
        rotateEnabled: false,
        shadowEnabled: false,
        rotation: 0,
        size: 100,
        ratio: 1,
        text: 'Some text here'
    },
    'blanket': {
        rotateEnabled: false,
        shadowEnabled: false,
        rotation: 0,
        size: 60,
        ratio: 0.618,
        text: 'Some text here'
    },
    'p8star': {
        rotateEnabled: false,
        shadowEnabled: false,
        rotation: 0,
        size: 60,
        ratio: 1,
        text: ' '
    },
    'pin': {
        rotateEnabled: false,
        shadowEnabled: true,
        rotation: 0,
        size: 20,
        ratio: 1,
        text: ''
    },
}

const OSSClient = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: '0fKFa2tFodMQQETJ',
    accessKeySecret: 'xpilgsl4KQbfnFDZkRMy0Dp1KuoW8A',
    bucket: 'vts'
});
let KFK = {};
KFK.scaleBy = 1.01;
KFK.centerPos = { x: 0, y: 0 };
KFK.centerPos = { x: 0, y: 0 };
KFK.startNode = null;
KFK.endNode = null;
KFK.lastClickOnNode = Date.now();
KFK.hoverDIV = null;
KFK.hoverLineDIV = null;
KFK.inited = false;
KFK.divInClipboard = undefined;

// KFK._width = window.innerWidth; KFK._height = window.innerHeight;
KFK._width = window.innerWidth * 6; KFK._height = window.innerHeight * 6;

KFK.nodes = [];
KFK.defaultNodeWidth = 40;
KFK.defaultNodeHeight = 40;
KFK.links = [];
KFK.tipLinks = [];
KFK.tips = [];
KFK.images = {};
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
KFK.ctrlDown = false;
KFK.originZIndex = 1;


KFK.dragStage = new Konva.Stage({ container: "containerbkg", width: window.innerWidth, height: window.innerHeight });
KFK.container = document.getElementById('containermain'); KFK.container.tabIndex = 1;
KFK.container.style.width = KFK._width + "px";
KFK.container.style.height = KFK._height + "px";
KFK.focusOnMainContainer = () => {
    KFK.container.focus();
}
KFK.focusOnMainContainer();
KFK.dragContainer = KFK.dragStage.container();
KFK.scrollContainer = document.getElementById('scroll-container');
KFK.lockMode = false;
KFK.selectedDIVs = [];


KFK.currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function (event) {
    KFK.currentMousePos.x = event.pageX;
    KFK.currentMousePos.y = event.pageY;
    el($('#modeIndicator')).style.left = px(KFK.currentMousePos.x + 10);
    el($('#modeIndicator')).style.top = px(KFK.currentMousePos.y + 10);
    if (KFK.mode === 'pointer') {
        $('#modeIndicator').hide();
    } else {
        $('#modeIndicatorImg').attr("src", KFK.images[KFK.mode].src);
        $('#modeIndicator').show();
    }
});


KFK.gridLayer = new Konva.Layer({ id: 'gridLayer' });
KFK.dragStage.add(KFK.gridLayer);

function el(jq) {
    return jq[0];
}


KFK.loadImages = function loadimg(callback) {
    let loadedImages = 0;
    let numImages = 0;
    for (var file in assetIcons) {
        numImages++;
    }
    console.log(assetIcons);
    for (var file in assetIcons) {
        KFK.images[file] = new Image();
        KFK.images[file].onload = function () {
            if (++loadedImages >= numImages) {
                if (KFK.inited === false)
                    callback(KFK.images);
            }
        };
        console.log(`${file}`);
        KFK.images[file].src = assetIcons[file];
        console.log(`${file}  -> ${assetIcons[file]}`);
    }

    KFK.images['toggle_line'].src = KFK.images['line'].src;
};

class Node {
    constructor(id, type, x, y, w, h, attach) {
        this.id = id;
        this.type = type;
        console.log(type);
        this.width = w ? w : config.node[type].width;
        this.height = h ? h : config.node[type].height;
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
                newLeft = Math.floor(tmpLeft / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
            } else {
                newLeft = (Math.floor(tmpLeft / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
            }
            if (tmpTop % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
                newTop = Math.floor(tmpTop / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
            } else {
                newTop = (Math.floor(tmpTop / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
            }

            this.x += newLeft - tmpLeft;
            this.y += newTop - tmpTop;
        }
    }
}

class Tip {
    constructor(id, type, x, y) {
        this.id = id;
        this.type = type;
        this.size = tip_variants[type]["size"];
        this.ratio = tip_variants[type]["ratio"];
        this.iconscale = 1;
        this.x = x;
        this.y = y;
    }
}
class Link {
    constructor(id, fromId, toId, route) {
        this.id = id;
        this.from = fromId;
        this.to = toId;
        this.route = route === undefined ? '' : (route === null ? '' : route);
    }
}

KFK.gotoHome = function () {
    // var oldScale = KFK.stage.scaleX();
    // KFK.stage.scale({ x: 1, y: 1 });
    // var mousePointTo = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    // var newPos = {
    //     x: (KFK.stage.width() - window.innerWidth) * 0.5,
    //     y: (KFK.stage.height() - window.innerHeight) * 0.5,
    // };
    // KFK.stage.position(newPos);
    // KFK.stage.batchDraw();

    // console.log(`${KFK.startNode.x}`);
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
    let node = KFK.layer.findOne('#' + id);
    if (node === undefined) {
        node = KFK.dragLayer.findOne('#' + id);
    }
    if (node === undefined)
        console.warn(`Node ${id} not exist`);
    return node;
};

KFK.findConnect = function (linkid) {
    let conn = KFK.layer.findOne('#connect-' + linkid);
    if (conn === undefined)
        conn = KFK.layer.findOne('#connect-' + linkid);
    if (conn === undefined)
        console.warn(`Connect #connect-${linkid} not exist`);
    return conn;
};


KFK.yarkLinkPoint = function (x, y, shiftKey) {
    if (KFK.lineDragging) return;
    console.log(`yark Link Point at ${x}, ${y}`);
    if (KFK.linkPos.length === 1) {
        //按下option键，切换toggleMode
        if (KFK.toggleMode) {
            if (Math.abs(x - KFK.linkPos[0].center.x) <
                Math.abs(y - KFK.linkPos[0].center.y))
                x = KFK.linkPos[0].center.x;
            else
                y = KFK.linkPos[0].center.y;
        }
    }
    KFK.linkPos.push({
        type: 'point',
        center: { x: x, y: y },
        points: [{ x: x, y: y }]
    });
    KFK.procLink(shiftKey);
};

KFK.yarkLinkNode = function (theDIV, shiftKey) {
    console.log(`left:${theDIV.style.left} top: ${theDIV.style.top} width: ${theDIV.style.width} height: ${theDIV.style.height}`);
    let divLeft = unpx(theDIV.style.left);
    let divTop = unpx(theDIV.style.top);
    let divWidth = unpx(theDIV.style.width);
    let divHeight = unpx(theDIV.style.height);
    console.log(`left:${divLeft} top: ${divTop} width: ${divWidth} height: ${divHeight}`);
    if (KFK.lineDragging) return;
    let pos = {
        div: theDIV,
        type: 'box',
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
            }]
    };
    KFK.linkPos.push(pos);
    KFK.procLink(shiftKey);
};

KFK.procLink = function (shiftKey) {
    if (KFK.linkPos.length < 2) {
        console.log(`linkPos has ${KFK.linkPos.length} points, don't draw line`);
        return;
    } else {
        console.log(`linkPos has ${KFK.linkPos.length} points, draw`);
    }
    let fromPoint = null;
    let toPoint = null;
    let selectedFromIndex = 0;
    let selectedToIndex = 0;
    let shortestDistance = KFK.distance(KFK.linkPos[0].points[0], KFK.linkPos[1].points[0]);
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
    let lineDIV = KFK.drawLine(
        KFK.linkPos[0].points[selectedFromIndex].x,
        KFK.linkPos[0].points[selectedFromIndex].y,
        KFK.linkPos[1].points[selectedToIndex].x,
        KFK.linkPos[1].points[selectedToIndex].y,
    );
    //这四个属性都是有的
    lineDIV.setAttribute('fx', KFK.linkPos[0].points[selectedFromIndex].x);
    lineDIV.setAttribute('fy', KFK.linkPos[0].points[selectedFromIndex].y);
    lineDIV.setAttribute('tx', KFK.linkPos[1].points[selectedToIndex].x);
    lineDIV.setAttribute('ty', KFK.linkPos[1].points[selectedToIndex].y);
    //在连接到nodeDIV时，再加两个属性
    if (KFK.linkPos[0].type === 'box') {
        lineDIV.setAttribute('fdiv', KFK.linkPos[0].div.getAttribute('id'));
    }
    if (KFK.linkPos[1].type === 'box') {
        lineDIV.setAttribute('tdiv', KFK.linkPos[1].div.getAttribute('id'));
    }
    //有一端连在nodeDIV上，则，不允许拖动和改变大小
    if (KFK.linkPos[0].type === 'box' || KFK.linkPos[1].type === 'box') {
        $(lineDIV).draggable('disable');
    }
    if (!shiftKey)
        KFK.linkPos.splice(0, 2);
    else {
        KFK.linkPos[0] = KFK.linkPos[1];
        KFK.linkPos.splice(1, 1);
    }
};

KFK.distance = function (p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

KFK.getZIndex = function (div) {
    let zz = parseInt(div.style.zIndex);
    zz = (isNaN(zz) ? 0 : zz);
    return zz;
};
KFK.setZIndex = function (div, zz) {
    div.style.zIndex = zz;
};
KFK.selectNone = function () {
    KFK.selectedDIVs.forEach(tmp => {
        $(tmp).removeClass('selected');
    });
    KFK.selectedDIVs.clear();
    KFK.selectedDIVsChanged();
};
KFK.selectedDIVsChanged = function () {
    KFK.APP.setData('show', 'arrange_multi_nodes', KFK.selectedDIVs.length > 1);
    KFK.APP.setData('show', 'shape_property', KFK.selectedDIVs.length > 0);
    if (KFK.selectedDIVs.length > 1) {
        KFK.APP.setData('model', 'rightTabIndex', 2);
    }
};

KFK.undo = () => {
    console.log("Unimplemented");
    //很复杂，对于dragging, resizing, 如何恢复，都是问题
    //留以后处理
}
KFK.redo = () => {
    console.log("Unimplemented");
}

KFK.createC3 = function () {
    let c3 = document.createElement('div');
    c3.setAttribute("id", "C3");
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

    //click c3
    $(c3).on('click', function (e) {
        console.log('click on C3');
        if (KFK.editting || KFK.resizing || KFK.dragging) {
            console.log(`ignore click because editting: ${KFK.editting}, resizing: ${KFK.resizing}, dragging: ${KFK.dragging}`);
            return;
        }

        // if (KFK.selectedDIVs.length > 0) {
        //     if (KFK.mode !== 'line') {
        //         KFK.selectNone();
        //         console.log(`mode is not line, but has selectedDIVS, clear and return`);
        //         return;
        //     }
        // }
        if (KFK.afterDragging === true) {
            KFK.afterDragging = false;
            // return;
        }
        if (KFK.afterResizing === true) {
            KFK.afterResizing = false;
            console.log(`Return cauze afterResizing`);
            return;
        }
        if (KFK.mode === 'line') {
            KFK.yarkLinkPoint(
                e.clientX + KFK.scrollContainer.scrollLeft,
                e.clientY + KFK.scrollContainer.scrollTop,
                e.shiftKey
            );
            return;
        }
        console.log("before placeNode...");
        if (config.node[KFK.mode]) {
            console.log("now placeNode...");
            KFK.placeNode(
                myuid(), KFK.mode,
                KFK.scrollX(e.clientX),
                KFK.scrollY(e.clientY)
            );
        } else {
            console.log(`${KFK.mode} is not supported`);
            if (KFK.mode === "line") {
                KFK.drawLine(100, 100, 300, 300);
            }
        }

        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    });

    document.getElementById('containermain').appendChild(c3);

    KFK.C3 = c3;

}

KFK.getPositionOfTwoEndsOfLine = function (lineDIV, theLine) {
    let dynamicRect = {
        x: unpx(lineDIV.style.left),
        y: unpx(lineDIV.style.top),
        width: unpx(lineDIV.style.width),
        height: unpx(lineDIV.style.height),
    };
    let lineFrom = { x: theLine.points()[0], y: theLine.points()[1] };
    let lineTo = { x: theLine.points()[2], y: theLine.points()[3] };
    let fromPosition = {};
    let toPosition = {};
    if (lineFrom.x === 0 && lineFrom.y === 0) {
        theLine.lineFromAt = "lt";
        fromPosition = { x: KFK.nodeLeft(lineDIV), y: KFK.nodeTop(lineDIV) };
    } else if (lineFrom.x === 0 && lineFrom.y === dynamicRect.height) {
        theLine.lineFromAt = "lb";
        fromPosition = { x: KFK.nodeLeft(lineDIV), y: KFK.nodeBottom(lineDIV) };
    } else if (lineFrom.x === dynamicRect.width && lineFrom.y === 0) {
        theLine.lineFromAt = "rt";
        fromPosition = { x: KFK.nodeRight(lineDIV), y: KFK.nodeTop(lineDIV) };
    } else if (lineFrom.x === dynamicRect.width && lineFrom.y === dynamicRect.height) {
        theLine.lineFromAt = "rb";
        fromPosition = { x: KFK.nodeRight(lineDIV), y: KFK.nodeBottom(lineDIV) };
    }
    if (lineTo.x === 0 && lineTo.y === 0) {
        theLine.lineToAt = "lt";
        toPosition = { x: KFK.nodeLeft(lineDIV), y: KFK.nodeTop(lineDIV) };
    } else if (lineTo.x === 0 && lineTo.y === dynamicRect.height) {
        theLine.lineToAt = "lb";
        toPosition = { x: KFK.nodeLeft(lineDIV), y: KFK.nodeBottom(lineDIV) };
    } else if (lineTo.x === dynamicRect.width && lineTo.y === 0) {
        theLine.lineToAt = "rt";
        toPosition = { x: KFK.nodeRight(lineDIV), y: KFK.nodeTop(lineDIV) };
    } else if (lineTo.x === dynamicRect.width && lineTo.y === dynamicRect.height) {
        theLine.lineToAt = "rb";
        toPosition = { x: KFK.nodeRight(lineDIV), y: KFK.nodeBottom(lineDIV) };
    }
    return {
        from: { x: fromPosition.x, y: fromPosition.y },
        to: { x: toPosition.x, y: toPosition.y },
    };
};

KFK.moveLineMoverTo = function (position) {
    el($('#linetransformer')).style.left = px(position.x - 10);
    el($('#linetransformer')).style.top = px(position.y - 10);
};
KFK.scrollToScreen = function (position) {
    return {
        x: position.x - KFK.scrollContainer.scrollLeft,
        y: position.y - KFK.scrollContainer.scrollTop
    };
}
KFK.getNearGridPoint = function (x, y) {
    let newX = x;
    let newY = y;
    if (x % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
        newX = Math.floor(x / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
    } else {
        newX = (Math.floor(x / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
    }
    if (y % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
        newY = Math.floor(y / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
    } else {
        newY = (Math.floor(y / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
    }
    return ({ x: newX, y: newY });
};
KFK.drawLine = function (x1, y1, x2, y2, strokeColor, strokeWidth) {
    strokeColor = strokeColor ? strokeColor : 'blue';
    strokeWidth = strokeWidth ? strokeWidth : 3;
    let p1 = { x: x1, y: y1 };
    let p2 = { x: x2, y: y2 };
    // console.log(JSON.stringify(p1) + "    " + JSON.stringify(p2));
    if (KFK.APP.model.snap) {
        p1 = KFK.getNearGridPoint(p1.x, p1.y);
        p2 = KFK.getNearGridPoint(p2.x, p2.y);
        x1 = p1.x; y1 = p1.y; x2 = p2.x; y2 = p2.y;
    }
    console.log(JSON.stringify(p1) + "    " + JSON.stringify(p2));

    let rect = {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
        width: Math.max(Math.abs(p1.x - p2.x), strokeWidth),
        height: Math.max(Math.abs(p1.y - p2.y), strokeWidth),
    }
    let points = [x1 - rect.x, y1 - rect.y, x2 - rect.x, y2 - rect.y];
    let divid = `div_${myuid()}`;
    let lineDIV = document.createElement("div");
    $(lineDIV).attr("id", divid);
    lineDIV.style.position = "absolute";
    // lineDIV.style.background = '#CCFFCC';
    lineDIV.style.left = px(rect.x);
    lineDIV.style.top = px(rect.y);
    lineDIV.style.width = px(rect.width);
    lineDIV.style.height = px(rect.height);
    // lineDIV.style.pointerEvents = "none";   
    document.getElementById('C3').appendChild(lineDIV);

    let jqLineDIV = $(lineDIV);
    jqLineDIV.attr('strokeColor', strokeColor);
    jqLineDIV.attr('strokeWidth', strokeWidth);
    jqLineDIV.attr('x1', x1);
    jqLineDIV.attr('y1', y1);
    jqLineDIV.attr('x2', x2);
    jqLineDIV.attr('y2', y2);

    let lineStage = new Konva.Stage({ container: jqLineDIV.attr("id"), x: 0, y: 0, width: rect.width, height: rect.height });
    let lineLayer = new Konva.Layer();
    let theLine = new Konva.Line({
        points: points, stroke: strokeColor, strokeWidth: strokeWidth, tension: 0, scale: { x: 1, y: 1 },
        shadowColor: '#0000CC', shadowOffset: { x: 2, y: 2 }, shadowBlur: 4, shadowEnabled: false,
    });

    // console.log(`rect.width ${rect.width} rect.height ${rect.height}, line strokWidth: ${strokeWidth} `);
    lineLayer.add(theLine);
    lineStage.add(lineLayer);
    lineLayer.batchDraw();
    jqLineDIV.addClass('kfkline');
    theLine.on('mouseover', function () {
        if (KFK.lineDragging) return;
        $(document.body).css('cursor', 'pointer');
        theLine.dash([10, 2, 5, 2]);
        theLine.dashEnabled(true);
        theLine.shadowEnabled(false);
        lineLayer.batchDraw();
        KFK.hoverLineDIV = el(jqLineDIV);

        if (!lineDIV.getAttribute('fdiv') && !lineDIV.getAttribute('tdiv')) {
            function mouseNear(p1, p2) {
                if (Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)) <= 20) {
                    return true;
                } else {
                    return false;
                }
            }
            KFK.lineTwoEnds = KFK.getPositionOfTwoEndsOfLine(lineDIV, theLine);

            if (!lineDIV.getAttribute('fdiv') && mouseNear(KFK.scrollToScreen(KFK.lineTwoEnds.from), KFK.currentMousePos)) {
                $('#linetransformer').show();
                KFK.moveLinePoint = 'from';
                KFK.tobeSetLineDIV = lineDIV;
                KFK.moveLineMoverTo(KFK.scrollToScreen(KFK.lineTwoEnds.from));
            } else if (!lineDIV.getAttribute('tdiv') && mouseNear(KFK.scrollToScreen(KFK.lineTwoEnds.to), KFK.currentMousePos)) {
                $('#linetransformer').show();
                KFK.tobeSetLineDIV = lineDIV;
                console.log("tobe move end of " + KFK.tobeSetLineDIV.getAttribute("id"));
                KFK.moveLinePoint = 'to';
                KFK.moveLineMoverTo(KFK.scrollToScreen(KFK.lineTwoEnds.to));
            } else {
                $('#linetransformer').hide();
            }
        } else {
            $('#linetransformer').hide();
        }
    });
    theLine.on('mouseout', function () {
        if (KFK.lineDragging) return;
        $(document.body).css('cursor', 'default');
        theLine.dash([10, 20, 5, 20]);
        theLine.dashEnabled(false);
        theLine.shadowEnabled(false);
        lineLayer.batchDraw();
        KFK.hoverLineDIV = null;
    });
    jqLineDIV.hover(
        () => {
            $(document.body).css('cursor', 'pointer');
            // if (!(jqLineDIV.attr('fdiv') || jqLineDIV.attr('tdiv')))
            //     el(jqLineDIV).style.background = "#EEFFEE";
            theLine.dash([10, 2, 5, 2]);
            theLine.dashEnabled(true);
            lineLayer.batchDraw();
            KFK.hoverLineDIV = el(jqLineDIV);
        },
        () => {
            $(document.body).css('cursor', 'default');
            // if (!(jqLineDIV.attr('fdiv') || jqLineDIV.attr('tdiv')))
            //     el(jqLineDIV).style.background = "";
            theLine.dash([10, 20, 5, 20]);
            theLine.dashEnabled(false);
            lineLayer.batchDraw();
            KFK.hoverLineDIV = null;
        }
    );

    jqLineDIV.draggable({
        start: () => {
            console.log('Start linedragging...')
            $('#linetransformer').hide();
            KFK.dragging = true;
            KFK.linkPos = [];
            KFK.lineDragging = true;
        },
        drag: () => {
            KFK.lineDragging = true;
        },
        stop: () => {
            console.log('Stop linedragging...')
            KFK.linkPos = [];
            KFK.dragging = false;
            KFK.lineDragging = false;
            KFK.afterDragging = true;
            let newPosition = KFK.getPositionOfTwoEndsOfLine(lineDIV, theLine);
            if (KFK.APP.model.snap) {
                let topLeftPoint = KFK.getNearGridPoint(KFK.nodeLeft(lineDIV), KFK.nodeTop(lineDIV));
                lineDIV.style.left = px(topLeftPoint.x);
                lineDIV.style.top = px(topLeftPoint.y);
                newPosition = KFK.getPositionOfTwoEndsOfLine(lineDIV, theLine);
            }
            jqLineDIV.attr("x1", newPosition.from.x);
            jqLineDIV.attr("y1", newPosition.from.y);
            jqLineDIV.attr("x2", newPosition.to.x);
            jqLineDIV.attr("y2", newPosition.to.y);
        },
    });

    //click line
    jqLineDIV.click((e) => {
        console.log('click on line DIV');
        KFK.afterDragging = false;
        KFK.afterResizing = false;
        let index = KFK.selectedDIVs.indexOf(el(jqLineDIV));
        if (index >= 0) {
            KFK.selectedDIVs.splice(index, 1);
        } else {
            if (e.shiftKey) {
                KFK.selectedDIVs.push(el(jqLineDIV));
            } else {
                KFK.selectedDIVs.clear();
                KFK.selectedDIVs.push(el(jqLineDIV));
            }
        }
        KFK.selectedDIVsChanged();
    });
    let dynamicRect = {};
    // jqLineDIV.resizable({
    //     handles: "se", autoHide: true, ghost: false,
    //     minHeight: 1,
    //     minWidth: 1,
    //     start: function (event, ui) {
    //         console.log("start resizing...");
    //         KFK.resizing = true;
    //         dynamicRect = {
    //             x: unpx(el(jqLineDIV).style.left),
    //             y: unpx(el(jqLineDIV).style.top),
    //             width: unpx(el(jqLineDIV).style.width),
    //             height: unpx(el(jqLineDIV).style.height),
    //         }
    //         let newRect = {
    //             x: ui.position.left,
    //             y: ui.position.top,
    //             width: ui.size.width,
    //             height: ui.size.height
    //         };
    //         let lineFrom = { x: theLine.points()[0], y: theLine.points()[1] };
    //         let lineTo = { x: theLine.points()[2], y: theLine.points()[3] };
    //         if (lineFrom.x === 0 && lineFrom.y === 0) {
    //             theLine.lineFromAt = "lt";
    //         } else if (lineFrom.x === 0 && lineFrom.y === dynamicRect.height) {
    //             theLine.lineFromAt = "lb";
    //         } else if (lineFrom.x === dynamicRect.width && lineFrom.y === 0) {
    //             theLine.lineFromAt = "rt";
    //         } else if (lineFrom.x === dynamicRect.width && lineFrom.y === dynamicRect.height) {
    //             theLine.lineFromAt = "rb";
    //         }
    //         if (lineTo.x === 0 && lineTo.y === 0) {
    //             theLine.lineToAt = "lt";
    //         } else if (lineTo.x === 0 && lineTo.y === dynamicRect.height) {
    //             theLine.lineToAt = "lb";
    //         } else if (lineTo.x === dynamicRect.width && lineTo.y === 0) {
    //             theLine.lineToAt = "rt";
    //         } else if (lineTo.x === dynamicRect.width && lineTo.y === dynamicRect.height) {
    //             theLine.lineToAt = "rb";
    //         }
    //         console.log(`${theLine.lineFromAt} --- ${theLine.lineToAt}`);
    //     },
    //     resize: function (event, ui) {
    //         //Rest DIV size
    //         lineStage.width(unpx(el(jqLineDIV).style.width));
    //         lineStage.height(unpx(el(jqLineDIV).style.height));
    //         function calcArea(rect) {
    //             return rect.width * rect.height;
    //         }
    //         let newRect = {
    //             x: ui.position.left,
    //             y: ui.position.top,
    //             width: ui.size.width,
    //             height: ui.size.height
    //         };
    //         let p1 = {}; let p2 = {};
    //         switch (theLine.lineFromAt) {
    //             case "lt":
    //                 p1 = { x: 0, y: 0 };
    //                 break;
    //             case "lb":
    //                 p1 = { x: 0, y: newRect.height };
    //                 break;
    //             case "rt":
    //                 p1 = { x: newRect.width, y: 0 };
    //                 break;
    //             case "rb":
    //                 p1 = { x: newRect.width, y: newRect.height };
    //                 break;
    //         }
    //         switch (theLine.lineToAt) {
    //             case "lt":
    //                 p2 = { x: 0, y: 0 };
    //                 break;
    //             case "lb":
    //                 p2 = { x: 0, y: newRect.height };
    //                 break;
    //             case "rt":
    //                 p2 = { x: newRect.width, y: 0 };
    //                 break;
    //             case "rb":
    //                 p2 = { x: newRect.width, y: newRect.height };
    //                 break;
    //         }
    //         theLine.points([p1.x, p1.y, p2.x, p2.y]);
    //         console.log(`div Rect: x:${unpx(el(jqLineDIV).style.left)} y:${unpx(el(jqLineDIV).style.top)} w:${unpx(el(jqLineDIV).style.width)} h:${unpx(el(jqLineDIV).style.height)}`);
    //         console.log(`new Rect: x:${newRect.x} y:${newRect.y} w:${newRect.width} h:${newRect.height}`);
    //         console.log(`new line: ${p1.x},${p1.y} --- ${p2.x},${p2.y}`);
    //         lineLayer.batchDraw();
    //         console.log(`realline: ${theLine.points()[0]},${theLine.points()[1]} --- ${theLine.points()[2]},${theLine.points()[3]}`)
    //         jqLineDIV.attr('x1', p1.x);
    //         jqLineDIV.attr('y1', p1.y);
    //         jqLineDIV.attr('x2', p2.x);
    //         jqLineDIV.attr('y2', p2.y);

    //         // $("#resizable-16").text("top = " + ui.position.top +
    //         //     ", left = " + ui.position.left +
    //         //     ", width = " + ui.size.width +
    //         //     ", height = " + ui.size.height);
    //     },
    //     stop: () => {
    //         KFK.resizing = false;
    //         KFK.afterResizing = true;
    //     }
    // });
    return lineDIV;
}


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
        deg = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) / Math.PI * 180;
        if (p2.x < p1.x) {
            deg += 180;
        }
    }


    console.log(deg);
    return deg;
}

KFK.getDegree({ x: 100, y: 100 }, { x: 200, y: 100 });
KFK.getDegree({ x: 100, y: 100 }, { x: 200, y: 200 });
KFK.getDegree({ x: 100, y: 100 }, { x: 100, y: 200 });
KFK.getDegree({ x: 100, y: 100 }, { x: 0, y: 200 });
KFK.getDegree({ x: 100, y: 100 }, { x: 0, y: 100 });
KFK.getDegree({ x: 100, y: 100 }, { x: 0, y: 0 });
KFK.getDegree({ x: 100, y: 100 }, { x: 100, y: 0 });
KFK.getDegree({ x: 100, y: 100 }, { x: 200, y: 0 });

function px(v) {
    if (typeof v === 'string') {
        if (v.endsWith('px')) {
            return v;
        } else {
            return v + "px";
        }
    } else {
        return v + "px";
    }
}

function unpx(v) {
    if (typeof v === 'string' && v.endsWith('px')) {
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
    console.log(`edit textnode ${textnode.innerText}`);
    let oldText = textnode.innerText;
    textnode.style.visibility = "hidden";
    // theDIV.style.background = "transparent";
    var areaPosition = { x: unpx(theDIV.style.left), y: unpx(theDIV.style.top) };
    var textarea = null;
    if (theDIV.type === "text")
        textarea = document.createElement('input');
    else {
        textarea = document.createElement('textarea');
        $(textarea).css("word-wrap", "break-word");
        $(textarea).css("word-break", "break-all");
        $(textarea).css("text-wrap", "unrestricted");
    }
    textarea.style.zIndex = "999";
    KFK.C3.appendChild(textarea);
    textarea.value = oldText;
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    console.log(`${textarea.style.top} ${textarea.style.left}`);
    textarea.style.width = theDIV.style.width;
    textarea.style.height = theDIV.style.height;
    textarea.style.fontSize = textnode.style.fontSize;
    textarea.style.borderColor = '#000';
    textarea.style.borderWidth = '1px';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.transformOrigin = 'left top';

    textarea.focus();

    function removeTextarea() {
        $(textarea).remove();
        window.removeEventListener('click', handleOutsideClick);
        textnode.style.visibility = "visible";
        KFK.editting = false;
        textnode.editting = false;
        theDIV.editting = false;
        KFK.focusOnMainContainer();
    }

    function setTextareaWidth(newWidth) {
        if (!newWidth) {
            // set width for placeholder
            newWidth = unpx(textnode.style.width);
        }
        // some extra fixes on different browsers
        var isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
        );
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth);
        }

        var isEdge =
            document.documentMode || /Edge/.test(navigator.userAgent);
        if (isEdge) {
            newWidth += 1;
        }
        textarea.style.width = newWidth + 'px';
    }

    textarea.oncopy = function (e) {
        e.stopPropagation();
    }
    textarea.onpaste = function (e) {
        e.stopPropagation();
    }

    textarea.addEventListener('keydown', function (e) {
        // hide on enter
        // but don't hide on shift + enter
        if (e.keyCode === 13 && !e.shiftKey) {
            textnode.innerText = textarea.value;
            removeTextarea();
        }
        // on esc do not set value back to node
        if (e.keyCode === 27) {
            removeTextarea();
            e.stopImmediatePropagation();
            e.stopPropagation();
        }
    });

    function handleOutsideClick(e) {
        if (e.target !== textarea) {
            textnode.innerText = textarea.value;
            removeTextarea();
        }
    }
    setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
    });
}

KFK.toggleShadow = function (theDIV, selected) {
    let divType = theDIV.getAttribute("nodetype");
    if (divType === 'yellowtip') {
        if (selected) {
            $(theDIV).css("box-shadow", "20px 20px 10px -18px #608EFF");
        } else {
            $(theDIV).css("box-shadow", "20px 20px 20px -18px #888888");
        }
    } else if (divType === 'image') {
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
}

KFK.getKFKNodeNumber = function () {
    let nodes = $(KFK.C3).find('.kfknode');
    return nodes.length;
}


KFK.placeNode = function (id, type, x, y, w, h, attach) {
    let aNode = new Node(id, type, x, y, w, h, attach);
    KFK.nodes.push(aNode);
    let nodeDIV = KFK._createNode(aNode);
    return nodeDIV;
};

KFK._createNode = function (node) {
    let textPadding = 2;
    let nodeCount = KFK.getKFKNodeNumber();
    var nodeObj = null;
    if (node.type === 'image') {
        nodeObj = document.createElement('img');
        nodeObj.src = node.attach;
        nodeObj.style.width = px(node.width); nodeObj.style.height = px(node.height);
    } else if (["start", "end", "pin"].indexOf(node.type) >= 0) {
        nodeObj = document.createElement('img');
        nodeObj.src = KFK.images[node.type].src;
        nodeObj.style.width = px(node.width); nodeObj.style.height = px(node.height);
    } else if (node.type === "text") {
        nodeObj = document.createElement('span');
        nodeObj.style.fontSize = "18px";
        nodeObj.innerText = "Some text here";
        nodeObj.style.width = px(node.width - textPadding * 2);
        nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    } else if (node.type === "yellowtip") {
        nodeObj = document.createElement('span');
        nodeObj.style.fontSize = "18px";
        nodeObj.innerText = "Multiple line text";
        nodeObj.style.width = px(node.width - textPadding * 2);
        nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    } else if (node.type === "textblock") {
        nodeObj = document.createElement('span');
        nodeObj.style.fontSize = "18px";
        nodeObj.innerText = "";
        nodeObj.style.width = px(node.width - textPadding * 2);
        nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    }
    if (!nodeObj) {
        console.log(`${node.type} is not supported`);
        return;
    }
    nodeObj.edittable = config.node[node.type].edittable ? true : false;

    var nodeDIV = document.createElement('div');
    nodeDIV.id = node.id;
    nodeDIV.style.position = 'absolute';
    nodeDIV.style.top = px(ltPos(node).y);
    nodeDIV.style.left = px(ltPos(node).x);
    nodeDIV.style.width = px(node.width);
    nodeDIV.style.height = px(node.height);
    if (node.type === "text") {
        nodeDIV.style.width = "fit-content";
        nodeDIV.style.height = "fit-content";
    }
    nodeDIV.style.zIndex = `${nodeCount + 1}`;
    console.log(`CREATE NODE AT ${nodeCount + 1}`);
    nodeDIV.style.border = 'none';
    nodeDIV.style.padding = '0px';
    if (node.type === 'text' || node.type === 'yellowtip' || node.type === 'textblock')
        nodeDIV.style.padding = `${textPadding}px`;
    nodeDIV.style.margin = '0px';
    nodeDIV.style.overflow = 'hidden';
    if (config.node[node.type].background) {
        nodeDIV.style.background = config.node[node.type].background;
    } else {
        nodeDIV.style.background = 'transparent';
    }
    nodeDIV.style.outline = 'none';
    // nodeDIV.style.resize = 'none';
    nodeDIV.style.display = 'block';
    //click时，切换selected状态
    if (node.type === 'yellowtip') {
        $(nodeDIV).css("background-image", `url(${KFK.images['yellowtip'].src})`);
        $(nodeDIV).css("background-repeat", 'no-repeat');
        $(nodeDIV).css("background-size", '100% 100%');
    }

    nodeObj.setAttribute("id", 'innerobj_' + node.id);
    // nodeDIV.attr('w', node.width);
    // nodeDIV.attr('h', node.height);
    nodeDIV.appendChild(nodeObj);
    KFK.C3.appendChild(nodeDIV);

    let jqNodeDIV = $(nodeDIV);
    jqNodeDIV.attr('nodetype', node.type);
    jqNodeDIV.attr('edittable', nodeObj.edittable);
    KFK.setNodeEventHandler(jqNodeDIV);

    return nodeDIV;
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

KFK.reArrangeLinks = function (jqNodeDIV) {
    $(KFK.C3).find('.kfkline').each((index, aLineDiv) => {
        //如果从当前node开始连接
        if (aLineDiv.getAttribute('fdiv') && aLineDiv.getAttribute('fdiv') === jqNodeDIV.attr('id')) {
            console.log(`line ${index} link from this node`);
            KFK.linkPos = [];
            //如果结束点也是一个nodediv
            if (aLineDiv.getAttribute('tdiv')) {
                KFK.yarkLinkNode(el(jqNodeDIV));
                let divFilter = `#${aLineDiv.getAttribute('tdiv')}`;
                KFK.yarkLinkNode($(divFilter)[0]);
            } else { //如果结束点是一个 point
                KFK.yarkLinkNode(el(jqNodeDIV));
                KFK.yarkLinkPoint(aLineDiv.getAttribute('tx'), aLineDiv.getAttribute('ty'));
            }
            $(aLineDiv).remove();
        } else if (aLineDiv.getAttribute('tdiv') && aLineDiv.getAttribute('tdiv') === jqNodeDIV.attr('id')) {
            console.log(`line ${index} link to this node`);
            KFK.linkPos = [];
            if (aLineDiv.getAttribute('fdiv')) {
                let divFilter = `#${aLineDiv.getAttribute('fdiv')}`;
                KFK.yarkLinkNode($(divFilter)[0]);
                KFK.yarkLinkNode(el(jqNodeDIV));
            } else {
                KFK.yarkLinkPoint(aLineDiv.getAttribute('fx'), aLineDiv.getAttribute('fy'));
                KFK.yarkLinkNode(el(jqNodeDIV));
            }
            $(aLineDiv).remove();
        }
    });
};


KFK.setNodeEventHandler = function (jqNodeDIV) {
    jqNodeDIV.addClass('kfknode');
    let nodeDIV = el(jqNodeDIV);
    let jqNodeType = jqNodeDIV.attr('nodetype');
    if (config.node[jqNodeType].resizable) {
        jqNodeDIV.resizable({
            autoHide: true,
            start: () => { KFK.resizing = true; },
            resize: () => {
            },
            stop: () => {
                if (KFK.APP.model.snap) {
                    let tmpRight = KFK.nodeRight(nodeDIV);
                    let tmpBottom = KFK.nodeBottom(nodeDIV);
                    let newRight = tmpRight;
                    let newBottom = tmpBottom;
                    if (tmpRight % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
                        newRight = Math.floor(tmpRight / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
                    } else {
                        newRight = (Math.floor(tmpRight / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
                    }
                    if (tmpBottom % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
                        newBottom = Math.floor(tmpBottom / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
                    } else {
                        newBottom = (Math.floor(tmpBottom / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
                    }
                    nodeDIV.style.width = px(KFK.nodeWidth(nodeDIV) + (newRight - tmpRight));
                    nodeDIV.style.height = px(KFK.nodeHeight(nodeDIV) + (newBottom - tmpBottom));
                }
                if (jqNodeType === 'image') {
                    console.log("Resize inner image");
                    let imageId = `#innerobj_${jqNodeDIV.attr('id')}`;
                    el($(imageId)).style.width = el(jqNodeDIV).style.width;
                    el($(imageId)).style.height = el(jqNodeDIV).style.height;
                }
                KFK.resizing = false; KFK.afterResizing = true;
                KFK.reArrangeLinks(jqNodeDIV);
            }
        });
    }
    if (config.node[jqNodeType].minWidth) {
        jqNodeDIV.resizable("option", "minWidth", config.node[jqNodeType].minWidth);
    }
    if (config.node[jqNodeType].minHeight) {
        jqNodeDIV.resizable("option", "minHeight", config.node[jqNodeType].minHeight);
    }
    jqNodeDIV.draggable({
        scroll: true,
        start: () => {
            console.log('Start node dragging...')
            KFK.originZIndex = KFK.getZIndex(el(jqNodeDIV));
            el(jqNodeDIV).style.zIndex = "99999";
            KFK.dragging = true;
        },
        drag: () => {
        },
        stop: () => {
            KFK.dragging = false;
            if (KFK.APP.model.snap) {
                let tmpLeft = KFK.nodeLeft(el(jqNodeDIV));
                let tmpTop = KFK.nodeTop(el(jqNodeDIV));
                let newLeft = tmpLeft;
                let newTop = tmpTop;
                if (tmpLeft % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
                    newLeft = Math.floor(tmpLeft / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
                } else {
                    newLeft = (Math.floor(tmpLeft / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
                }
                if (tmpTop % KFK.APP.model.gridWidth < KFK.APP.model.gridWidth * 0.5) {
                    newTop = Math.floor(tmpTop / KFK.APP.model.gridWidth) * KFK.APP.model.gridWidth;
                } else {
                    newTop = (Math.floor(tmpTop / KFK.APP.model.gridWidth) + 1) * KFK.APP.model.gridWidth;
                }
                el(jqNodeDIV).style.left = px(newLeft);
                el(jqNodeDIV).style.top = px(newTop);
            }

            KFK.afterDragging = true;
            el(jqNodeDIV).style.zIndex = KFK.originZIndex;
            KFK.originZIndex = 1;
            //节点移动后，对连接到节点上的连接线重新划线
            KFK.reArrangeLinks(jqNodeDIV);
        },
    });
    if (config.node[jqNodeType].droppable) {
        console.log(`${jqNodeType} is droppable`);
        jqNodeDIV.droppable({
            activeClass: "ui-state-hover",
            hoverClass: "ui-state-active",
            accept: ".kfknode",
            drop: (event, ui) => {
                console.log(`dropped, locMode = ${KFK.lockMode}`);
                //lockMode时可以Marge
                if (KFK.lockMode === false)
                    return;
                let parent_node_type = jqNodeDIV.attr('nodetype');
                let child_node_type = ui.draggable.attr('nodetype');
                //同种类型可以merge
                if (parent_node_type === child_node_type) {
                    let innerObj = $(`#innerobj_${jqNodeDIV.attr("id")}`);
                    let oldText = innerObj.html();
                    let newText = oldText + "<BR> " + ui.draggable.html();
                    let elBig = el(jqNodeDIV);
                    let elSmall = el(ui.draggable);
                    if (
                        unpx(elSmall.style.left) > unpx(elBig.style.left) &&
                        unpx(elSmall.style.top) > unpx(elBig.style.top) &&
                        unpx(elSmall.style.left) + unpx(elSmall.style.width) < unpx(elBig.style.left) + unpx(elBig.style.width) &&
                        unpx(elSmall.style.top) + unpx(elSmall.style.height) < unpx(elBig.style.top) + unpx(elBig.style.height)
                    ) {
                        innerObj.html(newText);
                        KFK.deleteNode(el(ui.draggable));
                    }
                }
            }
        });
    }

    jqNodeDIV.hover(
        () => {
            $(document.body).css('cursor', 'pointer');
            KFK.hoverDIV = el(jqNodeDIV);
            jqNodeDIV.addClass('hover');
        },
        () => {
            $(document.body).css('cursor', 'default');
            jqNodeDIV.removeClass('hover');
            KFK.hoverDIV = null;
        }
    );
    //click node
    jqNodeDIV.click((e) => {
        console.log('click on nodeDIV');
        KFK.afterDragging = false;
        KFK.afterResizing = false;
        let now = Date.now();
        let index = KFK.selectedDIVs.indexOf(el(jqNodeDIV));
        if (index >= 0) {
            jqNodeDIV.removeClass('selected');
            KFK.selectedDIVs.splice(index, 1);
        } else {
            if (e.shiftKey) {
                KFK.selectedDIVs.push(el(jqNodeDIV));
                jqNodeDIV.addClass('selected');
            } else {
                KFK.selectedDIVs.forEach(tmp => {
                    $(tmp).removeClass('selected');
                })
                KFK.selectedDIVs.clear();
                KFK.selectedDIVs.push(el(jqNodeDIV));
                jqNodeDIV.addClass('selected');
            }
        }
        if (KFK.mode === 'line') {
            if (KFK.afterDragging === false) {
                console.log('yark link node')
                KFK.yarkLinkNode(el(jqNodeDIV), e.shiftKey);
            } else {
                console.log('NO yark link node because afterDragging');
                KFK.afterDragging = true;
            }
            e.stopImmediatePropagation();
            return;
        }

        KFK.selectedDIVsChanged();
        KFK.lastClickOnNode = now;
        e.stopPropagation();
    });



    jqNodeDIV.dblclick(function (e) {
        console.log("double click now");
        console.log(jqNodeDIV.attr('edittable'));
        if (getBoolean(jqNodeDIV.attr('edittable'))) {
            let theObj = el($(`#innerobj_${jqNodeDIV.attr("id")}`));
            console.log(theObj);
            editTextNode(theObj, el(jqNodeDIV));
        }
    });
}

KFK.nodeLeft = function (aNode) { return $(aNode).position().left; };
KFK.nodeCenter = function (aNode) { return KFK.nodeLeft(aNode) + KFK.nodeWidth(aNode) * 0.5; };
KFK.nodeRight = function (aNode) { return KFK.nodeLeft(aNode) + KFK.nodeWidth(aNode); };
KFK.nodeTop = function (aNode) { return $(aNode).position().top; };
KFK.nodeMiddle = function (aNode) { return KFK.nodeTop(aNode) + KFK.nodeHeight(aNode) * 0.5; };
KFK.nodeBottom = function (aNode) { return KFK.nodeTop(aNode) + KFK.nodeHeight(aNode); };
KFK.nodeWidth = function (aNode) { return $(aNode).width(); };
KFK.nodeHeight = function (aNode) { return $(aNode).height(); };

KFK.alignNodes = function (direction) {
    if (KFK.selectedDIVs.length < 2) return;
    console.log(`Align ${direction}`);
    switch (direction) {
        case 'left':
            let left = KFK.nodeLeft(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp = KFK.nodeLeft(aNode);
                left = (tmp < left) ? tmp : left;
            });
            KFK.selectedDIVs.forEach((aNode) => {
                aNode.style.left = px(left);
            });
            break;
        case 'center':
            let centerX = KFK.nodeLeft(KFK.selectedDIVs[0]) + KFK.nodeWidth(KFK.selectedDIVs[0]) * 0.5;
            KFK.selectedDIVs.forEach((aNode) => {
                aNode.style.left = px(centerX - KFK.nodeWidth(aNode) * 0.5);
            });
            break;
        case 'right':
            let right = KFK.nodeRight(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp = KFK.nodeRight(aNode);
                right = (tmp > right) ? tmp : right;
            });
            KFK.selectedDIVs.forEach((aNode) => {
                aNode.style.left = px(right - KFK.nodeWidth(aNode));
            });
            break;
        case 'top':
            let top = KFK.nodeTop(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp = KFK.nodeTop(aNode);
                top = (tmp < top) ? tmp : top;
            });
            KFK.selectedDIVs.forEach((aNode) => {
                aNode.style.top = px(top);
            });
            break;
        case 'middle':
            let centerY = KFK.nodeTop(KFK.selectedDIVs[0]) + KFK.nodeHeight(KFK.selectedDIVs[0]) * 0.5;
            KFK.selectedDIVs.forEach((aNode) => {
                aNode.style.top = px(centerY - KFK.nodeHeight(aNode) * 0.5);
            });
            break;
        case 'bottom':
            let bottom = KFK.nodeBottom(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp = KFK.nodeBottom(aNode);
                bottom = (tmp > bottom) ? tmp : bottom;
            });
            KFK.selectedDIVs.forEach((aNode) => {
                aNode.style.top = px(bottom - KFK.nodeHeight(aNode));
            });
            break;
        case 'hori':
            let nodeLeftMost = KFK.selectedDIVs[0];
            let totalWidth = 0;
            let leftMost = KFK.nodeLeft(KFK.selectedDIVs[0]);
            //找到最左边的node及其left位置， leftMost
            KFK.selectedDIVs.forEach((aNode) => {
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
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp = KFK.nodeRight(aNode);
                if (tmp > rightMost) {
                    nodeAtRightMost = aNode;
                    rightMost = tmp;
                }
            });
            //计算中间的space
            let availableWidth = rightMost - leftMost;
            let space_hori = (availableWidth - totalWidth) / (KFK.selectedDIVs.length - 1);
            console.log(`leftMost = ${leftMost} rightMost = ${rightMost}  space_hori=${space_hori}`);
            let tmpHoriArr = [];
            KFK.selectedDIVs.forEach((aNode) => {
                tmpHoriArr.push(aNode);
            })
            tmpHoriArr.splice(tmpHoriArr.indexOf(nodeLeftMost), 1);
            //把除nodeLeftMos之外节点的中间X放入数组
            let centerArr = tmpHoriArr.map((aNode) => {
                return KFK.nodeCenter(aNode);
            });
            console.log(`centerArr  ${JSON.stringify(centerArr)}`);
            let posX = KFK.nodeRight(nodeLeftMost);
            while (centerArr.length > 0) {
                //找到剩余Node中最靠右边的一个
                let min = Math.min.apply(null, centerArr);
                let index = centerArr.indexOf(min);
                let newLeft = posX + space_hori;
                console.log(`move index ${index} left from ${KFK.nodeLeft(tmpHoriArr[index])} to ${newLeft}`);
                //重设其位置
                tmpHoriArr[index].style.left = px(newLeft);

                //为下一个节点准备基准点
                posX = newLeft + KFK.nodeWidth(tmpHoriArr[index]);
                centerArr.splice(index, 1);
                tmpHoriArr.splice(index, 1);
            }
            break;
        case 'vert':
            let nodeTopMost = KFK.selectedDIVs[0];
            let totalHeight = 0;
            let topMost = KFK.nodeTop(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                totalHeight += KFK.nodeHeight(aNode);
                let tmp = KFK.nodeTop(aNode);
                if (tmp < topMost) {
                    nodeTopMost = aNode;
                    topMost = tmp;
                }
            });
            let nodeAtBottomMost = KFK.selectedDIVs[0];
            let bottomMost = KFK.nodeBottom(KFK.selectedDIVs[0]);
            KFK.selectedDIVs.forEach((aNode) => {
                let tmp = KFK.nodeBottom(aNode);
                if (tmp > bottomMost) {
                    nodeAtBottomMost = aNode;
                    bottomMost = tmp;
                }
            });
            let availableHeight = bottomMost - topMost;
            let space_vert = (availableHeight - totalHeight) / (KFK.selectedDIVs.length - 1);
            console.log(`topMost = ${topMost} bottomMost = ${bottomMost}  space_vert=${space_vert}`);
            let tmpVertArr = [];
            KFK.selectedDIVs.forEach((aNode) => {
                tmpVertArr.push(aNode);
            })
            tmpVertArr.splice(tmpVertArr.indexOf(nodeTopMost), 1);
            let middleArr = tmpVertArr.map((aNode) => {
                return KFK.nodeMiddle(aNode);
            });
            console.log(`middleArr  ${JSON.stringify(middleArr)}`);
            let posY = KFK.nodeBottom(nodeTopMost);
            while (middleArr.length > 0) {
                let min = Math.min.apply(null, middleArr);
                let index = middleArr.indexOf(min);
                let newTop = posY + space_vert;
                console.log(`move index ${index} top from ${KFK.nodeTop(tmpVertArr[index])} to ${newTop}`);
                tmpVertArr[index].style.top = px(newTop);

                posY = newTop + KFK.nodeHeight(tmpVertArr[index]);
                middleArr.splice(index, 1);
                tmpVertArr.splice(index, 1);
            }
            break;
    }
}

KFK.scroll_posX = function (x) {
    return x + KFK.scrollContainer.scrollLeft;
};
KFK.scroll_posY = function (y) {
    return y + KFK.scrollContainer.scrollTop;
};

KFK.offsetLineDataAttr = function (lineDIV, offset) {
    let x1 = parseInt($(lineDIV).attr('x1'));
    let y1 = parseInt($(lineDIV).attr('y1'));
    let x2 = parseInt($(lineDIV).attr('x2'));
    let y2 = parseInt($(lineDIV).attr('y2'));
    x1 += offset.x; y1 += offset.y;
    x2 += offset.x; y2 += offset.y;
    $(lineDIV).attr('x1', x1);
    $(lineDIV).attr('y1', y1);
    $(lineDIV).attr('x2', x2);
    $(lineDIV).attr('y2', y2);
};

KFK.moveNode = function (e) {
    let DELTA = 5;
    if (e.shiftKey && e.ctrlKey) DELTA = 20;
    else if (e.shiftKey) DELTA = 1;

    KFK.selectedDIVs.forEach(tmp => {
        if (e.keyCode === 37)
            tmp.style.left = px(unpx(tmp.style.left) - DELTA);
        else if (e.keyCode === 38)
            tmp.style.top = px(unpx(tmp.style.top) - DELTA);
        else if (e.keyCode === 39)
            tmp.style.left = px(unpx(tmp.style.left) + DELTA);
        else if (e.keyCode === 40)
            tmp.style.top = px(unpx(tmp.style.top) + DELTA);
    });
    e.stopImmediatePropagation();
    e.stopPropagation();
};

KFK.deleteNode = function (nodeDIV) {
    $(KFK.C3).find('.kfkline').each((index, aLineDiv) => {
        //如果从当前node开始连接
        if (
            aLineDiv.getAttribute('fdiv') === nodeDIV.getAttribute('id') ||
            aLineDiv.getAttribute('tdiv') === nodeDIV.getAttribute('id')
        ) {
            $(aLineDiv).remove();
        }
    });
    let myZI = KFK.getZIndex(nodeDIV);
    let count = 0;
    let allnodes = $(KFK.C3).find('.kfknode');
    allnodes.each((index, aDIV) => {
        count += 1;
        let tmp = KFK.getZIndex(aDIV);
        if (tmp > myZI) {
            KFK.setZIndex(aDIV, tmp - 1);
        }
    });
    let divid = $(nodeDIV).attr("id");
    let nodetype = $(nodeDIV).attr("nodetype");
    if (nodetype === "image") {
        console.log()
        let innerObj_id = `#innerobj_${divid}`;
        let innerObj = $(innerObj_id);
        console.log(innerObj.attr("src"));
        let imageSrc = innerObj.attr("src");
        let parsed = url.parse(imageSrc);
        let oss_filename = path.basename(parsed.pathname);
        try {
            OSSClient.delete(oss_filename);
        } catch (err) {
            console.error(err);
        }
    }
    $(nodeDIV).remove();
};

KFK.deleteHoverDiv = function (e) {
    if (KFK.hoverDIV) {
        KFK.deleteNode(KFK.hoverDIV);
        KFK.hoverDIV = null;
    } else if (KFK.hoverLineDIV) {
        KFK.deleteNode(KFK.hoverLineDIV);
        KFK.hoverLineDIV = null;
    }
};

KFK.duplicateHoverDiv = function (e) {
    let offset = { x: 0, y: 0 };
    if (KFK.hoverDIV) {
        KFK.divToCopy = KFK.hoverDIV;
        offset = { x: 20, y: 0 };
    }
    else if (KFK.hoverLineDIV) {
        KFK.divToCopy = KFK.hoverLineDIV;
        offset = { x: 20, y: 0 };
    }
    e.stopPropagation();
    if (KFK.divToCopy) {
        if ($(KFK.divToCopy).hasClass('kfknode')) {
            let newNode = KFK.placeNode(
                myuid(),
                KFK.divToCopy.getAttribute("nodetype"),
                KFK.scrollX(KFK.currentMousePos.x + offset.x),
                KFK.scrollY(KFK.currentMousePos.y + offset.y),
                unpx(KFK.divToCopy.style.width),
                unpx(KFK.divToCopy.style.height),
            );
            KFK.setText($(newNode), KFK.getText($(KFK.divToCopy)));
        } else if ($(KFK.divToCopy).hasClass('kfkline')) {
            let x1 = parseInt($(KFK.divToCopy).attr('x1'));
            let y1 = parseInt($(KFK.divToCopy).attr('y1'));
            let x2 = parseInt($(KFK.divToCopy).attr('x2'));
            let y2 = parseInt($(KFK.divToCopy).attr('y2'));
            if (offset.x > 0) {
                KFK.drawLine(
                    KFK.scrollX(x1 + offset.x),
                    KFK.scrollY(y1 + offset.y),
                    KFK.scrollX(x2 + offset.x),
                    KFK.scrollY(y2 + offset.y),
                    $(KFK.divToCopy).attr('strokeColor'),
                    parseInt($(KFK.divToCopy).attr('strokeWidth')),
                );
            } else {
                let cx = (x1 + x2) * 0.5;
                let cy = (y1 + y2) * 0.5;
                let ncx = KFK.currentMousePos.x;
                let ncy = KFK.currentMousePos.y;
                let deltax = ncx - cx;
                let deltay = ncy - cy;
                KFK.drawLine(
                    x1 + deltax + KFK.scrollContainer.scrollLeft,
                    y1 + deltay + KFK.scrollContainer.scrollTop,
                    x2 + deltax + KFK.scrollContainer.scrollLeft,
                    y2 + deltay + KFK.scrollContainer.scrollTop,
                    $(KFK.divToCopy).attr('strokeColor'),
                    parseInt($(KFK.divToCopy).attr('strokeWidth')),
                );
            }
        }
    }
};


KFK.getText = function (jqdiv) {
    let text_filter = "#innerobj_" + jqdiv.attr("id");
    return jqdiv.find(text_filter).text();
};

KFK.setText = function (jqdiv, text) {
    let text_filter = "#innerobj_" + jqdiv.attr("id");
    return jqdiv.find(text_filter).text(text);
};

KFK.createConnect = function (link) {
    let arrow = new Konva.Arrow({
        stroke: 'black',
        fill: 'black',
        tension: 1,
        pointerLength: 10,
        pointerWidth: 8,
        id: 'arrow-' + link.id,
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
        id: 'connect-' + link.id,
        draggable: false,
    });

    // connect.add(arrow).add(label);
    connect.add(arrow);
    return connect;
};


KFK.removeLink = function (from, to) {
    let foundOneDirection = false;
    for (var i = 0; i < KFK.links.length; i++) {
        if ((from === null && KFK.links[i].to === to) ||
            (KFK.links[i].from === from && to === null) ||
            (KFK.links[i].from === from && KFK.links[i].to === to)) {
            let theConn = KFK.findConnect(KFK.links[i].id);
            theConn.destroy();
            KFK.links.splice(i, 1);
            foundOneDirection = true;
            break;
        }
    }
    return foundOneDirection;
};

KFK.removeTipLink = function (from, to) {
    let foundOneDirection = false;
    for (var i = 0; i < KFK.tipLinks.length; i++) {
        if ((from === null && KFK.tipLinks[i].to === to) ||
            (KFK.tipLinks[i].from === from && to === null) ||
            (KFK.tipLinks[i].from === from && KFK.tipLinks[i].to === to)) {
            let theConn = KFK.findConnect(KFK.tipLinks[i].id);
            theConn.destroy();
            KFK.tipLinks.splice(i, 1);
            foundOneDirection = true;
            break;
        }
    }
    return foundOneDirection;
};

KFK.scrollX = function (x) {
    return x + KFK.scrollContainer.scrollLeft;
}
KFK.scrollY = function (y) {
    return y + KFK.scrollContainer.scrollTop;
}

KFK.showGridChanged = function (checked) {
    KFK.gridLayer.visible(checked);
};

KFK.init = function () {
    if (KFK.inited === true) {
        console.error('KFK.init was called more than once, maybe loadImages error');
        return;
    }
    KFK.drawGridlines();
    KFK.createC3();
    KFK.placeWelcomeObjects();
    KFK.initializeToolboxDrop();
    KFK.initLineMover();
};

KFK.initLineMover = function () {
    $('#linetransformer').draggable({
        start: () => {
            KFK.lineMoverOldPosition = $('#linetransformer').position();
            // KFK.setMode('line');
        },
        stop: () => {
            KFK.lineMoverNewPosition = $('#linetransformer').position();
            if (KFK.APP.model.snap) {
                let tmp = KFK.getNearGridPoint(KFK.lineMoverNewPosition.left + 10, KFK.lineMoverNewPosition.top + 10);
                el($('#linetransformer')).style.left = px(tmp.x - 10);
                el($('#linetransformer')).style.top = px(tmp.y - 10);
                KFK.lineMoverNewPosition = $('#linetransformer').position();
            }
            let tmp = null;
            if (KFK.tobeSetLineDIV) {
                if (KFK.moveLinePoint === 'from') {
                    tmp = KFK.drawLine(
                        KFK.scrollX(KFK.lineMoverNewPosition.left + 10),
                        KFK.scrollY(KFK.lineMoverNewPosition.top + 10),
                        KFK.lineTwoEnds.to.x,
                        KFK.lineTwoEnds.to.y,
                        $(KFK.tobeSetLineDIV).attr('strokeColor'),
                        parseInt($(KFK.tobeSetLineDIV).attr('strokeWidth')),
                    );
                    $(KFK.tobeSetLineDIV).remove();
                } else {
                    console.log("move to end of " + KFK.tobeSetLineDIV.getAttribute("id"));
                    tmp = KFK.drawLine(
                        KFK.lineTwoEnds.from.x,
                        KFK.lineTwoEnds.from.y,
                        KFK.scrollX(KFK.lineMoverNewPosition.left + 10),
                        KFK.scrollY(KFK.lineMoverNewPosition.top + 10),
                        $(KFK.tobeSetLineDIV).attr('strokeColor'),
                        parseInt($(KFK.tobeSetLineDIV).attr('strokeWidth')),
                    );
                    $(KFK.tobeSetLineDIV).remove();
                }
                KFK.tobeSetLineDIV = tmp;
            }
        },
    })
};

KFK.initializeToolboxDrop = function () {
    // $('.cocotool').each((index,tool)=>{
    //     $(tool).draggable({
    //         start:(event, ui)=>{
    //         },
    //         drag: (event, ui)=>{
    //         },
    //         stop: (event, ui)=>{
    //             console.log(ui);
    //         },
    //     })
    // } );

    // $(KFK.C3).droppable({
    //     activeClass: "ui-state-hover",
    //     hoverClass: "ui-state-active",
    //     accept: ".cocotool",
    //     drop: (event, ui) => {
    //         console.log(`dropped`);
    //     },
    // });
};

KFK.drawGridlines = function (deltaX, deltaY) {
    deltaX = deltaX ? deltaX : 0;
    deltaY = deltaY ? deltaY : 0;
    KFK.gridLayer.destroyChildren();
    let step = KFK.APP.model.gridWidth;
    for (let i = 0; i < 1000; i++) {
        KFK.gridLayer.add(new Konva.Line({
            points: [(i + 1) * step + deltaX, 0, (i + 1) * step + deltaX, KFK._height],
            stroke: '#E1FCF9',
            strokeWidth: 1,
        }));
        if ((i + 1) * step > KFK._width) {
            console.log(`break at ${i}`);
            break;
        }
    }
    for (let i = 0; i < 1000; i++) {
        KFK.gridLayer.add(new Konva.Line({
            points: [0, (i + 1) * step + deltaY, KFK._width, (i + 1) * step + deltaY],
            stroke: '#E1FCF9',
            strokeWidth: 1,
        }));
        if ((i + 1) * step > KFK._height) {
            break;
        }
    }
    KFK.gridLayer.batchDraw();
};

KFK.placeWelcomeObjects = function () {
    KFK.startNode = KFK.placeNode('START', 'start', KFK.scrollX(120), KFK.scrollY(120));
    KFK.endNode = KFK.placeNode('END', 'end', KFK.scrollX(300), KFK.scrollY(120));
    KFK.endNode2 = KFK.placeNode('END2', 'end', KFK.scrollX(400), KFK.scrollY(120));
    // KFK.centerPos = { x: 120 + (KFK.width() - 50 - 120) * 0.5, y: KFK.height() * 0.5 };
    KFK.drawLine(200, 200, 500, 200);
    KFK.drawLine(200, 200, 200, 500);
    KFK.drawLine(500, 200, 500, 500);
    KFK.drawLine(200, 500, 500, 500);
    KFK.drawLine(200, 200, 500, 500);

    KFK.addContainerMainEventHander();
    KFK.focusOnMainContainer();

    KFK.inited = true;
};
KFK.loadImages(KFK.init);

KFK.setMode = function (mode) {
    KFK.mode = mode;
    console.log(`Set mode to ${mode}`);
    for (let key in KFK.APP.active) {
        KFK.APP.active[key] = false;
    }
    if (KFK.APP.active[mode] == undefined)
        console.warn(`APP.active.${mode} does not exist`);
    else
        KFK.APP.active[mode] = true;

    KFK.focusOnMainContainer();
}
//用在index.js中的boostrapevue
KFK.isActive = function (mode) {
    return KFK.mode === mode;
}

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
KFK.isKfkNode = function (div) {
    return (div && $(div).hasClass('kfknode'));
};
KFK.addContainerMainEventHander = function () {
    let preventDefault = false;
    $(document).keydown(function (e) {
        let preventDefault = false;
        if (KFK.editting) return;
        console.log(`keydown = ${e.keyCode}`);
        if (e.keyCode === 16) { //Shift
            KFK.lockMode = KFK.lockMode ? false : true;
            KFK.APP.lockMode = KFK.lockMode;
            KFK.pickedNode = null;
            preventDefault = true;
            if (KFK.linkPos.length === 1) {
                KFK.linkPos = [];
            }
        } else if (e.keyCode === 82 && e.ctrlKey) { //Ctrl-R
            KFK.toggleRightPanel();
        } else if (e.keyCode === 17) { //Ctrl
            KFK.ctrlDown = true;
        } else if (e.keyCode === 18) { //Option
            //按下option键，切换toggleMode
            KFK.toggleMode = !KFK.toggleMode;
            if (KFK.mode === 'line') {
                KFK.APP.setData('model', 'lineToggleMode', KFK.toggleMode);
            }
        } else if (e.keyCode === 27) { //ESC
            KFK.selectNone();
            if (!KFK.editting)
                KFK.setMode('pointer');
        } else if (e.keyCode >= 37 && e.keyCode <= 40) { //Left, Up, Right, Down
            if (KFK.selectedDIVs.length > 0)
                KFK.moveNode(e);
        } else if (e.keyCode === 46 || e.keyCode === 8) {  // key DELETE
            KFK.deleteHoverDiv(e);
        } else if (e.keyCode === 68) {  // key D
            KFK.duplicateHoverDiv(e);
        } else if (e.keyCode === 90 && e.metaKey) { //Meta-Z
            if (e.shiftKey) {
                KFK.redo();
            } else {
                KFK.undo();
            }
        } else if (e.keyCode === 84 && KFK.isKfkNode(KFK.hoverDIV)) { // key T
            let myZI = KFK.getZIndex(KFK.hoverDIV);
            let count = 0;
            $(KFK.C3).find('.kfknode').each((index, aNodeDIV) => {
                count += 1;
                let tmp = KFK.getZIndex(aNodeDIV);
                if (tmp > myZI) {
                    KFK.setZIndex(aNodeDIV, tmp - 1);
                }
            });
            KFK.setZIndex(KFK.hoverDIV, count);
        } else if (e.keyCode === 66 && KFK.isKfkNode(KFK.hoverDIV)) { // key B
            let myZI = KFK.getZIndex(KFK.hoverDIV);
            let count = 0;
            $(KFK.C3).find('.kfknode').each((index, aNodeDIV) => {
                count += 1;
                let tmp = KFK.getZIndex(aNodeDIV);
                if (tmp < myZI) {
                    KFK.setZIndex(aNodeDIV, tmp + 1);
                }
            });
            KFK.setZIndex(KFK.hoverDIV, 1);
        } else if (e.keyCode === 72 && KFK.isKfkNode(KFK.hoverDIV)) { // key H
            let myZI = KFK.getZIndex(KFK.hoverDIV);
            let count = 0;
            let allnodes = $(KFK.C3).find('.kfknode');
            if (myZI < allnodes.length) {
                allnodes.each((index, aNodeDIV) => {
                    count += 1;
                    let tmp = KFK.getZIndex(aNodeDIV);
                    if (tmp === myZI + 1) {
                        KFK.setZIndex(aNodeDIV, myZI);
                    }
                });
                KFK.setZIndex(KFK.hoverDIV, myZI + 1);
            }
        } else if (e.keyCode === 76 && KFK.isKfkNode(KFK.hoverDIV)) { // key L
            let myZI = KFK.getZIndex(KFK.hoverDIV);
            if (myZI > 1) {
                let count = 0;
                $(KFK.C3).find('.kfknode').each((index, aNodeDIV) => {
                    count += 1;
                    let tmp = KFK.getZIndex(aNodeDIV);
                    if (tmp === myZI - 1) {
                        KFK.setZIndex(aNodeDIV, myZI);
                    }
                });
                KFK.setZIndex(KFK.hoverDIV, myZI - 1);
            }
        }
        if (preventDefault) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        }
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 17) { //Ctrl
            KFK.ctrlDown = false;
        }
    });

};

KFK.toggleRightPanel = function (flag) {
    $('#right').toggle("slide", { duration: 200, direction: "right" });
};

KFK.dataURLtoFile = function (dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

KFK.saveBlobToOSS = function (blob) {
    var reader = new FileReader();
    reader.onload = function (event) {
        console.log(event.target.result)
        let file = KFK.dataURLtoFile(event.target.result, '');
        // OSSClient.putBucketCORS('vts', [
        //     {
        //         allowedOrigin: '*',
        //         allowedMethod: [
        //             'GET',
        //             'HEAD',
        //             'PUT',
        //         ],
        //         allowedHeader: *,
        //     }
        // ]).then((result) => { });
        // OSSClient.getBucketCORS('vts').then((res) => {
        //     console.log(res);
        // }).catch(e => {
        //     console.log(e)
        // })

        OSSClient.multipartUpload(`ccp_${myuid()}.png`, file).then((res) => {
            console.log(res);
            console.log(res.res.requestUrls[0]);
            KFK.placeNode(
                myuid(),
                "image",
                KFK.currentMousePos.x + KFK.scrollContainer.scrollLeft,
                KFK.currentMousePos.y + KFK.scrollContainer.scrollTop,
                100,
                100,
                res.res.requestUrls[0]
            );
        }).catch((err) => {
            console.log(err)
        });
    }; // data url!
    reader.readAsDataURL(blob);
};

KFK.addTextToHoverDIV = function (text) {
    if (KFK.hoverDIV) {
        let jqHover = $(KFK.hoverDIV);
        if (config.node[jqHover.attr('nodetype')].edittable) {
            let innerObj = $(`#innerobj_${jqHover.attr("id")}`);
            let oldText = innerObj.html();
            let newText = oldText + "<BR> " + text;
            innerObj.html(newText);
        }
    }
};

document.onpaste = function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    // console.log("clipboad items[0].kind " + items[0].kind);
    if (items[1]) {
        console.log('items[1] is true');
        if (items[0].kind === 'string' && items[1].kind === 'string') {
            items[0].getAsString((text) => {
                console.log(`items[0] ${text}`);
                KFK.addTextToHoverDIV(text);
            });
            items[1].getAsString((text) => {
                console.log(`items[1] ${text}`);
            });
        } else if (items[0].kind === 'string' && items[1].kind === 'file') {
            items[0].getAsString((text) => {
                console.log(`items[0] ${text}`);
            });
            var blob = items[1].getAsFile();
            KFK.saveBlobToOSS(blob);
        }
    } else if (items[0]) {
        if (items[0].kind === 'string') {
            items[0].getAsString((text) => {
                KFK.addTextToHoverDIV(text);
            });
        } else if (items[0].kind === 'file') {
            var blob = items[0].getAsFile();
            KFK.saveBlobToOSS(blob);
        }
    }
};
let timer = null;
$('#scroll-container').scroll(() => {
    $('#linetransformer').hide();
    if (timer === null) {
        timer = setTimeout(() => {
            let tmp = KFK.getNearGridPoint(KFK.scrollContainer.scrollLeft, KFK.scrollContainer.scrollTop);
            let deltaX = tmp.x - KFK.scrollContainer.scrollLeft;
            let deltaY = tmp.y - KFK.scrollContainer.scrollTop;
            KFK.drawGridlines(deltaX, deltaY);
            timer = null;
        }, 500);
    }
});


module.exports = KFK;


//TODO: selected line style
//TODO: Zoom in / Zoom out
//TODO: RichText with QuilJS
//TODO: Font  颜色
//TODO: Free Drawing
//TODO: draw an multiple angles
//TODO: 清理OSS图片
// OSS路径名使用 tenant_id/doc_id/pic_name.png
// 一开始生成文档的ID， 然后的OSS图片的目录使用这个ID， 最后保存时，检查真正剩余的图片，并与OSS中的对应，没有用到的从OSS中删除掉
//TODO: double click line to add text label
//TODO: when one point picked, draw ghost line while mouse moving
//TODO: background color: hide canvas layer, add another layer below canvas layer, set color of the layer at the bottom