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

//TODO: 支持PAN canvas为十倍的大小，或者，自动扩展canvas, 类似draw.io的做法， 每次扩展一个屏幕大小
//TODO: TIPS可以钉在桌面上，钉住后，不可移动


KFK.tween = null;


//KFK.stage = new Konva.Stage({ container: "container", width: KFK._width, height: KFK._height, visible: true, });
// KFK.stage.zIndex(100);
KFK.dragStage = new Konva.Stage({ container: "containerbkg", width: window.innerWidth, height: window.innerHeight });
// KFK.dragStage.zIndex(200);
// KFK.container = KFK.stage.container(); KFK.container.tabIndex = 1; KFK.container.focus();
KFK.container = document.getElementById('containermain'); KFK.container.tabIndex = 1; KFK.container.focus();
KFK.dragContainer = KFK.dragStage.container();
KFK.scrollContainer = document.getElementById('scroll-container');
KFK.lockMode = false;
KFK.selectedNode = null;
// KFK.container.addEventListener('keydown', function (e) {
//     switch (e.keyCode) {
//         case 16:  //Shift
//             KFK.lockMode = true;
//             KFK.APP.lockMode = true;
//     }
//     e.preventDefault();
// });


KFK.gridLayer = new Konva.Layer({ id: 'gridLayer' });
KFK.dragStage.add(KFK.gridLayer);


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
                callback(KFK.images);
            }
        };
        console.log(`${file}`);
        KFK.images[file].src = assetIcons[file];
        console.log(`${file}  -> ${assetIcons[file]}`);
    }
};

class Node {
    constructor(id, type, x, y) {
        this.id = id;
        this.type = type;
        console.log(type);
        this.width = config.node[type].width;
        this.height = config.node[type].height;
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
        if (KFK.editting || KFK.resizing || KFK.dragging) return;
        if (KFK.afterDragging === true) {
            KFK.afterDragging = false;
            return;
        }
        if (KFK.afterResizing === true) {
            KFK.afterResizing = false;
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
            console.log("Before createNode");
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
    $('#containermain').keyup(function (e) {
        let preventDefault = false;
        console.log(e.keyCode);
        if (e.keyCode === 16) { //Shift
            KFK.lockMode = false;
            KFK.APP.lockMode = false;
            KFK.pickedNode = null;
            preventDefault = true;
            if (KFK.linkPos.length === 1) {
                KFK.linkPos = [];
            }
            //按下option键，切换toggleMode
            //TODO: toggleMode显示提示
            //TODO: 切换时同时切换显示工具栏图标
        } else if (e.keyCode === 18) { //Option
            KFK.toggleMode = !KFK.toggleMode;
        } else if (e.keyCode >= 37 && e.keyCode <= 40) { //Left, Up, Right, Down
            if (KFK.selectedNode)
                KFK.moveNode(e);
            preventDefault = true;
        } else if (e.keyCode === 46 || e.keyCode === 68) {  //D
            // KFK.deleteNode(e);
            KFK.deleteHoverDiv(e);
            preventDefault = true;
        } else if (e.keCode === 27) { // ESC
            if (KFK.selectedNode) {
                KFK.selectedNode.style.background = "transparent";
                KFK.selectedNode = null;
            }

        }
        if (preventDefault) {
            e.stopPropagation();
            e.preventDefault();
        }


    });
    // document.getElementById('containermain').appendChild(c3Stages);
    document.getElementById('containermain').appendChild(c3);

    KFK.C3 = c3;

    // KFK.C3.addEventListener('mousemove', function (e) {
    //     console.log(`${e.clientX} ${e.clientY}`);
    // })
    // let soloDIV = document.createElement('textarea');
    // $(soloDIV).resizable();
    // KFK.C3.appendChild(soloDIV);
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
    let lineStage = new Konva.Stage({ container: divid, x: 0, y: 0, width: rect.width, height: rect.height });
    let lineLayer = new Konva.Layer();
    let theLine = new Konva.Line({ points: points, stroke: strokeColor, strokeWidth: strokeWidth, tension: 1, scale: { x: 1, y: 1 } });
    console.log(`rect.width ${rect.width} rect.height ${rect.height}, line strokWidth: ${strokeWidth} `);
    lineLayer.add(theLine);
    lineStage.add(lineLayer);
    lineLayer.batchDraw();
    $(lineDIV).addClass('kfkline');

    $(lineDIV).draggable({
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
    lineDIV.dynamicRect = {};
    $(lineDIV).resizable({
        handles: "se", autoHide: true, ghost: false,
        minHeight: 1,
        minWidth: 1,
        start: function (event, ui) {
            console.log("start resizing...");
            KFK.resizing = true;
            lineDIV.dynamicRect = {
                x: unpx(lineDIV.style.left),
                y: unpx(lineDIV.style.top),
                width: unpx(lineDIV.style.width),
                height: unpx(lineDIV.style.height),
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
            } else if (lineFrom.x === 0 && lineFrom.y === lineDIV.dynamicRect.height) {
                theLine.lineFromAt = "lb";
            } else if (lineFrom.x === lineDIV.dynamicRect.width && lineFrom.y === 0) {
                theLine.lineFromAt = "rt";
            } else if (lineFrom.x === lineDIV.dynamicRect.width && lineFrom.y === lineDIV.dynamicRect.height) {
                theLine.lineFromAt = "rb";
            }
            if (lineTo.x === 0 && lineTo.y === 0) {
                theLine.lineToAt = "lt";
            } else if (lineTo.x === 0 && lineTo.y === lineDIV.dynamicRect.height) {
                theLine.lineToAt = "lb";
            } else if (lineTo.x === lineDIV.dynamicRect.width && lineTo.y === 0) {
                theLine.lineToAt = "rt";
            } else if (lineTo.x === lineDIV.dynamicRect.width && lineTo.y === lineDIV.dynamicRect.height) {
                theLine.lineToAt = "rb";
            }
            console.log(`${theLine.lineFromAt} --- ${theLine.lineToAt}`);
        },
        resize: function (event, ui) {
            //Rest DIV size
            $(lineDIV).find('.konvajs-content')[0].style.width = lineDIV.style.width;
            $(lineDIV).find('.konvajs-content')[0].style.height = lineDIV.style.height;
            $(lineDIV).find('.konvajs-content').find('canvas')[0].style.width = lineDIV.style.width;
            $(lineDIV).find('.konvajs-content').find('canvas')[0].style.height = lineDIV.style.height;
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
            theLine.points([p1.x, p1.y, p2.x, p2.y]);
            console.log(`div Rect: x:${unpx(lineDIV.style.left)} y:${unpx(lineDIV.style.top)} w:${unpx(lineDIV.style.width)} h:${unpx(lineDIV.style.height)}`);
            console.log(`new Rect: x:${newRect.x} y:${newRect.y} w:${newRect.width} h:${newRect.height}`);
            console.log(`new line: ${p1.x},${p1.y} --- ${p2.x},${p2.y}`);
            lineLayer.batchDraw();
            console.log(`realline: ${theLine.points()[0]},${theLine.points()[1]} --- ${theLine.points()[2]},${theLine.points()[3]}`)

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
    $(lineDIV).hover(
        () => {
            $(document.body).css('cursor', 'pointer');
            if (!(lineDIV.getAttribute('fdiv') || lineDIV.getAttribute('tdiv')))
                lineDIV.style.background = "#CCFFCC";
            KFK.hoverDIV = lineDIV;
            // $(lineDIV).resizable("option", "disabled", false);
        },
        () => {
            $(document.body).css('cursor', 'default');
            lineDIV.style.background = "";
            KFK.hoverDIV = null;
            // $(lineDIV).resizable("option", "disabled", true);
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

//TODO: parent offset
KFK.createNode = function (node) {
    let textPadding = 2;
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
        nodeObj.style.width = px(node.width - textPadding * 2); nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    } else if (node.type === "yellowtip") {
        nodeObj = document.createElement('span');
        nodeObj.style.fontSize = "18px";
        nodeObj.innerText = "Multiple line text";
        nodeObj.edittable = true;
        nodeObj.style.width = px(node.width - textPadding * 2); nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    } else if (node.type === "textblock") {
        nodeObj = document.createElement('span');
        nodeObj.style.fontSize = "18px";
        nodeObj.innerText = "";
        nodeObj.edittable = true;
        nodeObj.style.width = px(node.width - textPadding * 2); nodeObj.style.height = px(node.height - textPadding * 2);
        nodeObj.style.left = px(2); nodeObj.style.top = px(2);
    }
    if (!nodeObj) {
        console.log(`${node.type} is not supported`);
        return;
    }

    var nodeDIV = document.createElement('div');
    nodeDIV.id = node.id;
    nodeDIV.type = node.type;
    nodeDIV.style.position = 'absolute';
    nodeDIV.style.top = px(ltPos(node).y);
    nodeDIV.style.left = px(ltPos(node).x);
    nodeDIV.style.width = px(node.width);
    nodeDIV.style.height = px(node.height);
    if (node.type === "text") {
        nodeDIV.style.width = "fit-content";
        nodeDIV.style.height = "fit-content";
    }
    nodeDIV.style.zIndex = '1';
    nodeDIV.style.border = 'none';
    nodeDIV.style.padding = '0px';
    if (nodeDIV.type === 'text' || nodeDIV.type === 'yellowtip' || nodeDIV.type === 'textblock')
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
    if (config.node[node.type].resizable) {
        $(nodeDIV).resizable({
            autoHide: true,
            start: () => { KFK.resizing = true; },
            resize: () => { },
            stop: () => { KFK.resizing = false; KFK.afterResizing = true; }
        });
    }
    if (config.node[node.type].minWidth) {
        $(nodeDIV).resizable("option", "minWidth", config.node[node.type].minWidth);
    }
    if (config.node[node.type].minHeight) {
        $(nodeDIV).resizable("option", "minHeight", config.node[node.type].minHeight);
    }

    nodeDIV.appendChild(nodeObj);
    KFK.C3.appendChild(nodeDIV);

    let jqNodeDIV = $(nodeDIV);
    jqNodeDIV.addClass('kfknode');
    jqNodeDIV.draggable({
        scroll: true,
        start: () => {
            console.log('Start node dragging...')
            KFK.dragging = true;
        },
        drag: () => {
        },
        stop: () => {
            console.log('Stop node dragging...')
            console.log(KFK.C3);
            KFK.dragging = false;
            KFK.afterDragging = true;
            //循环找kfkline，找到所有line
            $(KFK.C3).find('.kfkline').each((index, aLineDiv) => {
                //如果从当前node开始连接
                if (aLineDiv.getAttribute('fdiv') && aLineDiv.getAttribute('fdiv') === nodeDIV.getAttribute('id')) {
                    console.log(`line ${index} link from this node`);
                    KFK.linkPos = [];
                    //如果结束点也是一个nodediv
                    if (aLineDiv.getAttribute('tdiv')) {
                        KFK.yarkLinkNode(nodeDIV);
                        let divFilter = `#${aLineDiv.getAttribute('tdiv')}`;
                        KFK.yarkLinkNode($(divFilter)[0]);
                    } else { //如果结束点是一个 point
                        KFK.yarkLinkNode(nodeDIV);
                        KFK.yarkLinkPoint(aLineDiv.getAttribute('tx'), aLineDiv.getAttribute('ty'));
                    }
                    $(aLineDiv).remove();
                } else if (aLineDiv.getAttribute('tdiv') && aLineDiv.getAttribute('tdiv') === nodeDIV.getAttribute('id')) {
                    console.log(`line ${index} link to this node`);
                    KFK.linkPos = [];
                    if (aLineDiv.getAttribute('fdiv')) {
                        let divFilter = `#${aLineDiv.getAttribute('fdiv')}`;
                        KFK.yarkLinkNode($(divFilter)[0]);
                        KFK.yarkLinkNode(nodeDIV);
                    } else {
                        KFK.yarkLinkPoint(aLineDiv.getAttribute('fx'), aLineDiv.getAttribute('fy'));
                        KFK.yarkLinkNode(nodeDIV);
                    }
                    $(aLineDiv).remove();
                }
            })
        },
    });

    jqNodeDIV.hover(
        () => {
            $(document.body).css('cursor', 'pointer');
            KFK.hoverDIV = nodeDIV;
            KFK.toggleShadow(KFK.hoverDIV, true);
        },
        () => {
            $(document.body).css('cursor', 'default');
            KFK.toggleShadow(KFK.hoverDIV, false);
            KFK.hoverDIV = null;
        }
    );
    jqNodeDIV.click((e) => {
        console.log(nodeDIV.style.left);
        console.log(`${KFK.mode} ${KFK.afterDragging} `);
        let now = Date.now();
        if (KFK.selectedNode === nodeDIV) {
            KFK.toggleShadow(KFK.selectedNode, false);
            KFK.selectedNode = null;
        } else {
            if (KFK.selectedNode === null) {
                KFK.selectedNode = nodeDIV;
                KFK.toggleShadow(KFK.selectedNode, true);
            } else {
                KFK.toggleShadow(KFK.selectedNode, false);
                KFK.selectedNode = nodeDIV;
                KFK.toggleShadow(KFK.selectedNode, true);
            }
        }
        if (KFK.mode === 'line') {
            if (KFK.afterDragging === false) {
                KFK.yarkLinkNode(nodeDIV, e.shiftKey);
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
        if (nodeObj.edittable)
            editTextNode(nodeObj, nodeDIV);
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
}

KFK.deleteHoverDiv = function (e) {
    if (KFK.hoverDIV) {
        $(KFK.hoverDIV).remove();
        KFK.hoverDIV = null;
    }
}


KFK.deleteNode = function (e) {
    if (KFK.selectedNode) {
        $(KFK.selectedNode).remove();
        KFK.selectedNode = null;
    }
}

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
}


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