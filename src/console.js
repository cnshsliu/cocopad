import Konva from "konva";
import assetIcons from '../assets/*.svg';
import uuidv4 from 'uuid/v4';
import "./importjquery";
import "jquery-ui-dist/jquery-ui.js";
import './test.html';
import { BIconFolderSymlinkFill, directivesPlugin } from "bootstrap-vue";

let config = {
    node: {
        start: {
            width: 40,
            height: 40,
        },
        end: {
            width: 40,
            height: 40,
        },
        tpl: {
            width: 40,
            height: 40,
        },
        text: {
            width: 120,
            height: 20,
        },
        yellowtip: {
            width: 200,
            height: 200,
            resizable: true,
        },
        textblock: {
            width: 200, height: 100, resizable: true, background: '#49FFAC', minWidth: 1, minHeight: 1
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

let KFK = {};
KFK.scaleBy = 1.01;
KFK.centerPos = { x: 0, y: 0 };
KFK.centerPos = { x: 0, y: 0 };
KFK.startNode = null;
KFK.endNode = null;
KFK.lastClickOnNode = Date.now();
KFK.hoverDIV = null;
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
KFK.mode = "tpl";
KFK.editting = false;
KFK.resizing = false;
KFK.dragging = false;
KFK.lineDragging = false;
KFK.afterDragging = false;
KFK.afterResizing = false;
KFK.linkPos = [];
KFK.toggleMode = false;
KFK.tween = null;


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
KFK.selectedNode = null;
KFK.container.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 16:  //Shift
            KFK.lockMode = true;
            KFK.APP.lockMode = true;
    }
    // e.preventDefault();
});

KFK.currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function (event) {
    KFK.currentMousePos.x = event.pageX;
    KFK.currentMousePos.y = event.pageY;
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
    constructor(id, type, x, y, w, h) {
        this.id = id;
        this.type = type;
        console.log(type);
        this.width = w ? w : config.node[type].width;
        this.height = h ? h : config.node[type].height;
        this.iconscale = 0.8;
        this.x = x;
        this.y = y;
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
    console.log(`yark link node `);
    console.log(pos);
    KFK.linkPos.push(pos);
    KFK.procLink(shiftKey);
};

KFK.procLink = function (shiftKey) {
    if (KFK.linkPos.length < 2) return;
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
        $(lineDIV).resizable('disable');
        // $(lineDIV).unbind('mouseenter mouseleave');
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

//TODO: debug here
KFK.getZIndex = function (div) {
    let zz = parseInt(div.style.zIndex);
    zz = (isNaN(zz) ? 0 : zz);
    return zz;
};
KFK.setZIndex = function (div, zz) {
    div.style.zIndex = zz;
};



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

    $(c3).on('click', function (e) {
        if (KFK.editting || KFK.resizing || KFK.dragging) {
            console.log(`ignore click because editting: ${KFK.editting}, resizing: ${KFK.resizing}, dragging: ${KFK.dragging}`);
            return;
        }
        //TODO: 原来的return导致在resizing后，后续的第一个点击不起作用，现在去掉了return好像也没问题，考虑把afterDragging和afterResizing取消掉
        if (KFK.afterDragging === true) {
            KFK.afterDragging = false;
            // return;
        }
        if (KFK.afterResizing === true) {
            KFK.afterResizing = false;
            // return;
        }
        if (KFK.mode === 'line') {
            KFK.yarkLinkPoint(
                e.clientX + KFK.scrollContainer.scrollLeft,
                e.clientY + KFK.scrollContainer.scrollTop,
                e.shiftKey
            );
            return;
        }
        if (KFK.selectedNode) {
            KFK.toggleShadow(KFK.selectedNode, false);
            KFK.selectedNode = null;
            // } else {
        }
        if (config.node[KFK.mode]) {
            let aNode = new Node(
                uuidv4(),
                KFK.mode,
                e.clientX + KFK.scrollContainer.scrollLeft,
                e.clientY + KFK.scrollContainer.scrollTop
            );
            KFK.nodes.push(aNode);
            KFK.createNode(aNode);
        } else {
            console.log(`${KFK.mode} is not supported`);
            if (KFK.mode === "line") {
                KFK.drawLine(100, 100, 300, 300);
            }
        }
        // }

        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    });

    let preventDefault = false;
    $('#containermain').keydown(function (e) {
        let preventDefault = false;
        console.log(`keydown = ${e.keyCode}`);
        if (e.keyCode === 16) { //Shift
            KFK.lockMode = false;
            KFK.APP.lockMode = false;
            KFK.pickedNode = null;
            preventDefault = true;
            if (KFK.linkPos.length === 1) {
                KFK.linkPos = [];
            }
        } else if (e.keyCode === 18) { //Option
            //按下option键，切换toggleMode
            KFK.toggleMode = !KFK.toggleMode;
            if (KFK.mode === 'line') {
                KFK.APP.toggle('line', KFK.toggleMode);
            }
        } else if (e.keyCode >= 37 && e.keyCode <= 40) { //Left, Up, Right, Down
            if (KFK.selectedNode)
                KFK.moveNode(e);
        } else if (e.keyCode === 46 || e.keyCode === 68) {  // key D
            // KFK.deleteNode(e);
            KFK.deleteHoverDiv(e);
        } else if (e.keyCode === 67 && e.metaKey) {  //Meta-C
            console.log('meta c');
            KFK.copyHoverDiv(e);
        } else if (e.keyCode === 86 && e.metaKey) { //Meta-D
            console.log('meta d')
            KFK.pasteHoverDiv(e);
        } else if (e.keyCode === 84 && KFK.hoverDIV) { // key T
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
        } else if (e.keyCode === 66 && KFK.hoverDIV) { // key B
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
        } else if (e.keyCode === 72) { // key H
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
        } else if (e.keyCode === 76) { // key L
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
        } else if (e.keCode === 27) { // ESC
            if (KFK.selectedNode) {
                KFK.selectedNode.style.background = "transparent";
                KFK.selectedNode = null;
            }
        }
        if (preventDefault) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        }


    });
    document.getElementById('containermain').appendChild(c3);

    KFK.C3 = c3;

}

KFK.drawLine = function (x1, y1, x2, y2, strokeColor, strokeWidth) {
    console.log(`draw line now ${x1} ${y1} - ${x2} ${y2}`);
    strokeColor = strokeColor ? strokeColor : 'blue';
    strokeWidth = strokeWidth ? strokeWidth : 1;
    let p1 = { x: x1, y: y1 };
    let p2 = { x: x2, y: y2 };
    let rect = {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
        width: Math.max(Math.abs(p1.x - p2.x), strokeWidth),
        height: Math.max(Math.abs(p1.y - p2.y), strokeWidth),
    }
    let points = [x1 - rect.x, y1 - rect.y, x2 - rect.x, y2 - rect.y];
    let divid = `div_${uuidv4()}`;
    let lineDIV = document.createElement("div");
    $(lineDIV).attr("id", divid);
    lineDIV.style.position = "absolute";
    // lineDIV.style.background = '#CCFFCC';
    lineDIV.style.left = px(rect.x);
    lineDIV.style.top = px(rect.y);
    lineDIV.style.width = px(rect.width);
    lineDIV.style.height = px(rect.height);
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
    let theLine = new Konva.Line({ points: points, stroke: strokeColor, strokeWidth: strokeWidth, tension: 1, scale: { x: 1, y: 1 } });
    console.log(`rect.width ${rect.width} rect.height ${rect.height}, line strokWidth: ${strokeWidth} `);
    lineLayer.add(theLine);
    lineStage.add(lineLayer);
    lineLayer.batchDraw();

    jqLineDIV.addClass('kfkline');

    jqLineDIV.draggable({
        start: () => {
            console.log('Start linedragging...')
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
        },
    });
    let dynamicRect = {};
    jqLineDIV.resizable({
        handles: "se", autoHide: true, ghost: false,
        minHeight: 1,
        minWidth: 1,
        start: function (event, ui) {
            console.log("start resizing...");
            KFK.resizing = true;
            dynamicRect = {
                x: unpx(el(jqLineDIV).style.left),
                y: unpx(el(jqLineDIV).style.top),
                width: unpx(el(jqLineDIV).style.width),
                height: unpx(el(jqLineDIV).style.height),
            }
            let newRect = {
                x: ui.position.left,
                y: ui.position.top,
                width: ui.size.width,
                height: ui.size.height
            };
            let lineFrom = { x: theLine.points()[0], y: theLine.points()[1] };
            let lineTo = { x: theLine.points()[2], y: theLine.points()[3] };
            if (lineFrom.x === 0 && lineFrom.y === 0) {
                theLine.lineFromAt = "lt";
            } else if (lineFrom.x === 0 && lineFrom.y === dynamicRect.height) {
                theLine.lineFromAt = "lb";
            } else if (lineFrom.x === dynamicRect.width && lineFrom.y === 0) {
                theLine.lineFromAt = "rt";
            } else if (lineFrom.x === dynamicRect.width && lineFrom.y === dynamicRect.height) {
                theLine.lineFromAt = "rb";
            }
            if (lineTo.x === 0 && lineTo.y === 0) {
                theLine.lineToAt = "lt";
            } else if (lineTo.x === 0 && lineTo.y === dynamicRect.height) {
                theLine.lineToAt = "lb";
            } else if (lineTo.x === dynamicRect.width && lineTo.y === 0) {
                theLine.lineToAt = "rt";
            } else if (lineTo.x === dynamicRect.width && lineTo.y === dynamicRect.height) {
                theLine.lineToAt = "rb";
            }
            console.log(`${theLine.lineFromAt} --- ${theLine.lineToAt}`);
        },
        resize: function (event, ui) {
            //Rest DIV size
            lineStage.width(unpx(el(jqLineDIV).style.width));
            lineStage.height(unpx(el(jqLineDIV).style.height));
            function calcArea(rect) {
                return rect.width * rect.height;
            }
            let newRect = {
                x: ui.position.left,
                y: ui.position.top,
                width: ui.size.width,
                height: ui.size.height
            };
            let p1 = {}; let p2 = {};
            switch (theLine.lineFromAt) {
                case "lt":
                    p1 = { x: 0, y: 0 };
                    break;
                case "lb":
                    p1 = { x: 0, y: newRect.height };
                    break;
                case "rt":
                    p1 = { x: newRect.width, y: 0 };
                    break;
                case "rb":
                    p1 = { x: newRect.width, y: newRect.height };
                    break;
            }
            switch (theLine.lineToAt) {
                case "lt":
                    p2 = { x: 0, y: 0 };
                    break;
                case "lb":
                    p2 = { x: 0, y: newRect.height };
                    break;
                case "rt":
                    p2 = { x: newRect.width, y: 0 };
                    break;
                case "rb":
                    p2 = { x: newRect.width, y: newRect.height };
                    break;
            }
            //TODO: try 删掉layer, 再新建layer, 再划线，看可否解决显示不准确的问题
            theLine.points([p1.x, p1.y, p2.x, p2.y]);
            console.log(`div Rect: x:${unpx(el(jqLineDIV).style.left)} y:${unpx(el(jqLineDIV).style.top)} w:${unpx(el(jqLineDIV).style.width)} h:${unpx(el(jqLineDIV).style.height)}`);
            console.log(`new Rect: x:${newRect.x} y:${newRect.y} w:${newRect.width} h:${newRect.height}`);
            console.log(`new line: ${p1.x},${p1.y} --- ${p2.x},${p2.y}`);
            lineLayer.batchDraw();
            console.log(`realline: ${theLine.points()[0]},${theLine.points()[1]} --- ${theLine.points()[2]},${theLine.points()[3]}`)
            jqLineDIV.attr('x1', p1.x);
            jqLineDIV.attr('y1', p1.y);
            jqLineDIV.attr('x2', p2.x);
            jqLineDIV.attr('y2', p2.y);

            // $("#resizable-16").text("top = " + ui.position.top +
            //     ", left = " + ui.position.left +
            //     ", width = " + ui.size.width +
            //     ", height = " + ui.size.height);
        },
        stop: () => {
            KFK.resizing = false;
            KFK.afterResizing = true;
        }
    });
    jqLineDIV.hover(
        () => {
            $(document.body).css('cursor', 'pointer');
            if (!(jqLineDIV.attr('fdiv') || jqLineDIV.attr('tdiv')))
                el(jqLineDIV).style.background = "#CCFFCC";
            // theLine.shadowColor('#33FF33');
            // theLine.shadowEnabled(true);
            // theLine.shadowOffset({ x: 2, y: 2 });
            theLine.dash([10, 2, 5, 2]);
            theLine.dashEnabled(true);
            lineLayer.batchDraw();
            KFK.hoverDIV = el(jqLineDIV);
        },
        () => {
            $(document.body).css('cursor', 'default');
            if (!(jqLineDIV.attr('fdiv') || jqLineDIV.attr('tdiv')))
                el(jqLineDIV).style.background = "";
            // theLine.shadowColor('#33FF33');
            // theLine.shadowEnabled(false);
            // theLine.shadowOffset({ x: 2, y: 2 });
            theLine.dash([10, 20, 5, 20]);
            theLine.dashEnabled(false);
            lineLayer.batchDraw();
            KFK.hoverDIV = null;
        }
    );
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
    if (theDIV.type !== 'yellowtip') {
        if (selected) {
            // theDIV.style.background = "red";
            $(theDIV).css("box-shadow", "inset 0px 0px 10px 2px #608EFF");
        } else {
            // theDIV.style.background = "transparent";
            $(theDIV).css("box-shadow", "");
        }
    } else {
        if (selected) {
            $(theDIV).css("box-shadow", "20px 20px 18px -18px #608EFF");
        } else {
            $(theDIV).css("box-shadow", "20px 20px 18px -18px #888888");
        }
    }
}

KFK.getKFKNodeNumber = function () {
    let nodes = $(KFK.C3).find('.kfknode');
    return nodes.length;
}

//TODO: parent offset
KFK.createNode = function (node) {
    let textPadding = 2;
    let nodeCount = KFK.getKFKNodeNumber();
    var nodeObj = null;
    if (["start", "end", "pin"].indexOf(node.type) >= 0) {
        nodeObj = document.createElement('img');
        nodeObj.src = KFK.images[node.type].src;
        nodeObj.edittable = false;
        nodeObj.style.width = px(node.width); nodeObj.style.height = px(node.height);
    } else if (node.type === "text") {
        nodeObj = document.createElement('span');
        nodeObj.style.fontSize = "18px";
        nodeObj.innerText = "Some text here";
        nodeObj.edittable = true;
        nodeObj.style.width = px(node.width - textPadding * 2);
        nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    } else if (node.type === "yellowtip") {
        nodeObj = document.createElement('span');
        nodeObj.style.fontSize = "18px";
        nodeObj.innerText = "Multiple line text";
        nodeObj.edittable = true;
        nodeObj.style.width = px(node.width - textPadding * 2);
        nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    } else if (node.type === "textblock") {
        nodeObj = document.createElement('span');
        nodeObj.style.fontSize = "18px";
        nodeObj.innerText = "";
        nodeObj.edittable = true;
        nodeObj.style.width = px(node.width - textPadding * 2);
        nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    }
    if (!nodeObj) {
        console.log(`${node.type} is not supported`);
        return;
    }

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
    console.log(`CREATE NODE AT ${nodeCount+1}`);
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
        $(nodeDIV).css("box-shadow", "20px 20px 18px -18px #888888");
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

KFK.setNodeEventHandler = function (jqNodeDIV) {
    //TODO: 把依赖本地变量的，以属性形式放到node里，根据属性值来处理
    //TODO: 这些event处理方法，放到一个function里，这样，后面在copy paste时直接调用这些方法，即可让paste的node具有同样的功能
    jqNodeDIV.addClass('kfknode');
    let jqNodeType = jqNodeDIV.attr('nodetype');
    if (config.node[jqNodeType].resizable) {
        jqNodeDIV.resizable({
            autoHide: true,
            start: () => { KFK.resizing = true; },
            resize: () => {
            },
            stop: () => { KFK.resizing = false; KFK.afterResizing = true; }
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
            KFK.dragging = true;
        },
        drag: () => {
        },
        stop: () => {
            KFK.dragging = false;
            KFK.afterDragging = true;
            //循环找kfkline，找到所有line
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
            })
        },
    });

    jqNodeDIV.hover(
        () => {
            $(document.body).css('cursor', 'pointer');
            KFK.hoverDIV = el(jqNodeDIV);
            KFK.toggleShadow(KFK.hoverDIV, true);
        },
        () => {
            $(document.body).css('cursor', 'default');
            KFK.toggleShadow(KFK.hoverDIV, false);
            KFK.hoverDIV = null;
        }
    );
    jqNodeDIV.click((e) => {
        let now = Date.now();
        if (KFK.selectedNode === el(jqNodeDIV)) {
            KFK.toggleShadow(KFK.selectedNode, false);
            KFK.selectedNode = null;
        } else {
            if (KFK.selectedNode === null) {
                KFK.selectedNode = el(jqNodeDIV);
                KFK.toggleShadow(KFK.selectedNode, true);
            } else {
                KFK.toggleShadow(KFK.selectedNode, false);
                KFK.selectedNode = el(jqNodeDIV);
                KFK.toggleShadow(KFK.selectedNode, true);
            }
        }
        if (KFK.mode === 'line') {
            if (KFK.afterDragging === false) {
                KFK.yarkLinkNode(el(jqNodeDIV), e.shiftKey);
            } else
                KFK.afterDragging = true;
            e.stopImmediatePropagation();
            return;
        }
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

KFK.scroll_posX = function (x) {
    return x + KFK.scrollContainer.scrollLeft;
};
KFK.scroll_posY = function (y) {
    return y + KFK.scrollContainer.scrollTop;
};

KFK.moveNode = function (e) {
    let DELTA = 5;
    if (e.shiftKey && e.ctrlKey) DELTA = 20;
    else if (e.shiftKey) DELTA = 1;

    if (KFK.selectedNode) {
        if (e.keyCode === 37)
            KFK.selectedNode.style.left = px(unpx(KFK.selectedNode.style.left) - DELTA);
        else if (e.keyCode === 38)
            KFK.selectedNode.style.top = px(unpx(KFK.selectedNode.style.top) - DELTA);
        else if (e.keyCode === 39)
            KFK.selectedNode.style.left = px(unpx(KFK.selectedNode.style.left) + DELTA);
        else if (e.keyCode === 40)
            KFK.selectedNode.style.top = px(unpx(KFK.selectedNode.style.top) + DELTA);
    }
    e.stopImmediatePropagation();
    e.stopPropagation();
};

KFK.deleteHoverDiv = function (e) {
    if (KFK.hoverDIV) {
        $(KFK.C3).find('.kfkline').each((index, aLineDiv) => {
            //如果从当前node开始连接
            if (
                aLineDiv.getAttribute('fdiv') === KFK.hoverDIV.getAttribute('id') ||
                aLineDiv.getAttribute('tdiv') === KFK.hoverDIV.getAttribute('id')
            ) {
                $(aLineDiv).remove();
            }
        })
        $(KFK.hoverDIV).remove();
        KFK.hoverDIV = null;
    }
};

KFK.copyHoverDiv = function (e) {
    if (KFK.hoverDIV) {
        KFK.divToCopy = KFK.hoverDIV;
        console.log(KFK.divToCopy);
    }
};

//TODO: undo redo by using display=hidden or block?
KFK.pasteHoverDiv = function (e) {
    if (KFK.divToCopy) {
        if ($(KFK.divToCopy).hasClass('kfknode')) {
            let aNode = new Node(
                uuidv4(),
                KFK.divToCopy.getAttribute("nodetype"),
                KFK.currentMousePos.x + KFK.scrollContainer.scrollLeft,
                KFK.currentMousePos.y + KFK.scrollContainer.scrollTop,
                unpx(KFK.divToCopy.style.width),
                unpx(KFK.divToCopy.style.height),
            );
            KFK.nodes.push(aNode);
            let newNode = KFK.createNode(aNode);
            KFK.setText($(newNode), KFK.getText($(KFK.divToCopy)));
        } else if ($(KFK.divToCopy).hasClass('kfkline')) {
            let x1 = parseInt($(KFK.divToCopy).attr('x1'));
            let y1 = parseInt($(KFK.divToCopy).attr('y1'));
            let x2 = parseInt($(KFK.divToCopy).attr('x2'));
            let y2 = parseInt($(KFK.divToCopy).attr('y2'));
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
};

KFK.getText = function (jqdiv) {
    let text_filter = "#innerobj_" + jqdiv.attr("id");
    return jqdiv.find(text_filter).text();
};

KFK.setText = function (jqdiv, text) {
    let text_filter = "#innerobj_" + jqdiv.attr("id");
    return jqdiv.find(text_filter).text(text);
};

KFK.deleteNode = function (e) {
    if (KFK.selectedNode) {
        $(KFK.selectedNode).remove();
        KFK.selectedNode = null;
    }
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

KFK.placeNode = function (id, type, x, y) {
    let aNode = new Node(id, type, x + KFK.scrollContainer.scrollLeft, y + KFK.scrollContainer.scrollTop);
    KFK.nodes.push(aNode);
    let nodeGraph = KFK.createNode(aNode);
    //KFK.layer.add(nodeGraph);
    //KFK.layer.draw();
    return aNode;
};

KFK.init = function () {
    if (KFK.inited === true) {
        console.error('KFK.init was called more than once, maybe loadImages error');
        return;
    }
    KFK.gridLayer.add(new Konva.Line({
        x: 100,
        y: 200,
        points: [73, 70, 340, 23, 450, 60, 500, 20],
        stroke: 'red',
        tension: 1,
    }));
    KFK.gridLayer.batchDraw();
    KFK.createC3();
    // KFK.startNode = KFK.placeNode('START', 'start', 120, KFK.height() * 0.25);
    KFK.startNode = KFK.placeNode('START', 'start', 120, 120);
    // KFK.endNode = KFK.placeNode('END', 'end', KFK.width() * 0.5 - 50, KFK.height() * 0.25);
    KFK.endNode = KFK.placeNode('END', 'end', 300, 120);
    // KFK.centerPos = { x: 120 + (KFK.width() - 50 - 120) * 0.5, y: KFK.height() * 0.5 };

    KFK.drawLine(200, 200, 500, 200);
    KFK.drawLine(200, 200, 200, 500);
    KFK.drawLine(500, 200, 500, 500);
    KFK.drawLine(200, 500, 500, 500);
    KFK.drawLine(200, 200, 500, 500);

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



module.exports = KFK;


//TODO: Zoom in / Zoom out
//TODO: RichText
//TODO: Font 选择窗
//TODO: 颜色，对齐选择
//TODO: Free Drawing
//TODO: hover then Copy & Paste
//TODO: paste images
//TODO: draw an multiple angles
//TODO: drag a textnode and drop into another
//TODO: z-index move up and down
//TODO: align 