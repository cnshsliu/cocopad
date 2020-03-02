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
KFK.lineDragging = false;
KFK.afterDragging = false;

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
KFK.linkPos = [];

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


// KFK.container.addEventListener('keyup', function (e) {
//     let preventDefault = false;
//     if (e.keyCode === 16) { //Shift
//         KFK.lockMode = false;
//         KFK.APP.lockMode = false;
//         KFK.pickedNode = null;
//         preventDefault = true;
//     } else if (e.keyCode >= 37 && e.keyCode <= 40) { //Left, Up, Right, Down
//         KFK.moveTip(e);
//         preventDefault = true;
//     } else if (e.keyCode === 46 || e.keyCode === 68) {  //D
//         KFK.deleteTip(e);
//         preventDefault = true;
//     } else if (e.keyCode === 72) { //H
//         // KFK.gotoHome(e);
//         console.log(`${KFK.container.style.zIndex}`);
//         console.log(`${KFK.dragContainer.style.zIndex}`);
//         console.log(`${KFK.scrollContainer.style.zIndex}`);
//         console.log(`normal ${e.keyCode}`);
//         KFK.container.style.zIndex = "1";
//         KFK.scrollContainer.style.zIndex = "1";
//         KFK.dragContainer.style.zIndex = "2";
//         KFK.container.tabIndex = 2
//         KFK.dragContainer.tabIndex = 1;
//         KFK.dragContainer.focus();
//         preventDefault = true;
//     }
//     if (preventDefault) e.preventDefault();
// });
KFK.dragContainer.addEventListener('keyup', function (e) {
    let preventDefault = false;
    if (e.keyCode === 72) { //H
        console.log(`drag ${e.keyCode}`);
        // KFK.gotoHome(e);
        KFK.container.style.zIndex = "0";
        KFK.scrollContainer.style.zIndex = "0";
        KFK.dragContainer.style.zIndex = "-1";
        KFK.container.tabIndex = 1
        KFK.dragContainer.tabIndex = 2;
        KFK.container.focus();
        preventDefault = true;
    }
    if (preventDefault) e.preventDefault();
});

// KFK.layer = new Konva.Layer();
// KFK.layer.clip({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight });
// KFK.stage.add(KFK.layer);

KFK.gridLayer = new Konva.Layer({ id: 'gridLayer' });
KFK.dragStage.add(KFK.gridLayer);

// KFK.stage.on('click', function (e) {
//     var node = e.target;
//     let withShift = e.shiftKey || e.evt.shiftKey;
//     if (!withShift)
//         KFK.pickedNode = null;
//     var oldScale = KFK.stage.scaleX();
//     let stage = e.target.getStage();
//     let pos = KFK.stage.getPointerPosition();
//     let newPos = {
//         x: pos.x / oldScale - KFK.stage.x() / oldScale,
//         y: pos.y / oldScale - KFK.stage.y() / oldScale
//     }
//     // let nodeid = 'node-' + KFK.nodes.length;
//     let nodeid = uuidv4();

//     stage.find('Transformer').destroy();
//     KFK.layer.batchDraw();

//     if (KFK.mode === 'tpl') {
//         let aNode = new Node(nodeid, 'task', newPos.x, newPos.y);
//         console.log(`Create node at ${newPos.x}  ${newPos.y}   ${KFK.stage.width()}`);
//         KFK.nodes.push(aNode);
//         var node = KFK.createNode(aNode);
//         KFK.layer.add(node);
//         if (withShift) {
//             if (KFK.pickedNode === null) {
//                 KFK.pickedNode = node;
//             } else {
//                 KFK.placeConnection(KFK.pickedNode.id(), node.id());
//                 KFK.pickedNode = node;
//             }
//         }
//     } else if (tip_variants[KFK.mode]) {
//         if (KFK.focusOnTip) {
//             KFK.focusOnTip = undefined;
//         } else {
//             let aTip = new Tip(nodeid, KFK.mode, newPos.x, newPos.y);
//             KFK.tips.push(aTip);
//             var guiTip = KFK.createTip(aTip);
//             KFK.layer.add(guiTip);
//             if (withShift) {
//                 if (KFK.pickedTip === null) {
//                     KFK.pickedTip = guiTip;
//                 } else {
//                     KFK.placeTipConnection(KFK.pickedTip.id(), guiTip.id());
//                     KFK.pickedTip = guiTip;
//                 }
//             }
//             console.log(`${pos.x}+100  ${KFK.width()}`);
//             KFK.stage.batchDraw();
//         }
//     }
//     //KFK.redrawLinks();
// });

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

KFK.createNode2 = function (node) {
    let circle = new Konva.Circle({
        radius: node.size,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowOpacity: 0.6,
        draggable: false,
    });
    console.log(node.type);
    let icon = new Konva.Image({
        image: KFK.images[node.type],
        // image: icons['and.svg'],
        x: -(node.size * node.iconscale),
        y: -(node.size * node.iconscale),
        width: (node.size * node.iconscale) * 2,
        height: (node.size * node.iconscale) * 2,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowOpacity: 0.6,
        draggable: false,
    });

    let tplNode = new Konva.Group({
        x: node.x,
        y: node.y,
        draggable: true,
        startScale: 1,
        id: node.id,
        dragBoundFunc: function (pos) {
            var newX = pos.x < 50 ? 50 : pos.x;
            var newY = pos.y < 100 ? 100 : pos.y;
            newX = newX > KFK.width() - 50 ? KFK.width() - 50 : newX;
            newY = newY > KFK.height() - 50 ? KFK.height() - 50 : newY;
            return {
                x: newX,
                y: newY
            };
        }
    });
    tplNode.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    tplNode.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    tplNode.on('click', function (e) {
        let withShift = e.shiftKey || e.evt.shiftKey;
        e.cancelBubble = true;

        if (withShift) {
            if (KFK.pickedNode === null) {
                KFK.pickedNode = tplNode;
            } else {
                KFK.placeConnection(KFK.pickedNode.id(), tplNode.id());
                KFK.pickedNode = tplNode;
            }
        }
    });

    tplNode.add(circle).add(icon);
    tplNode.background = circle;

    return tplNode;
}

KFK.yarkLinkPoint = function (x, y, shiftKey) {
    if (KFK.lineDragging) return;
    console.log(`yark Link Point at ${x}, ${y}`);
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
    KFK.drawLine(
        KFK.linkPos[0].points[selectedFromIndex].x,
        KFK.linkPos[0].points[selectedFromIndex].y,
        KFK.linkPos[1].points[selectedToIndex].x,
        KFK.linkPos[1].points[selectedToIndex].y,
    );
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

    c3.addEventListener('click', function (e) {
        if (KFK.editting) return;
        if (KFK.mode === 'line') {
            if (KFK.afterDragging === false)
                KFK.yarkLinkPoint(
                    e.clientX + KFK.scrollContainer.scrollLeft,
                    e.clientY + KFK.scrollContainer.scrollTop,
                    e.shiftKey
                );
            else
                KFK.afterDragging = false;
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
    $('#containermain').keydown(function (e) {
        let preventDefault = false;
        console.log(e.keyCode);
        if (e.keyCode === 16) { //Shift
            KFK.lockMode = false;
            KFK.APP.lockMode = false;
            KFK.pickedNode = null;
            preventDefault = true;
        } else if (e.keyCode >= 37 && e.keyCode <= 40) { //Left, Up, Right, Down
            if (KFK.selectedNode)
                KFK.moveNode(e);
            preventDefault = true;
        } else if (e.keyCode === 46 || e.keyCode === 68) {  //D
            KFK.deleteNode(e);
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

KFK.drawLine = function (x1, y1, x2, y2) {
    console.log(`draw line now ${x1} ${y1} - ${x2} ${y2}`);
    let p1 = { x: x1, y: y1 };
    let p2 = { x: x2, y: y2 };
    let rect = {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
        width: Math.max(Math.abs(p1.x - p2.x), 1),
        height: Math.max(Math.abs(p1.y - p2.y), 1),
    }
    let points = [x1 - rect.x, y1 - rect.y, x2 - rect.x, y2 - rect.y];
    let divid = `div_${uuidv4()}`;
    let lineDIV = document.createElement("div");
    $(lineDIV).attr("id", divid);
    lineDIV.style.position = "absolute";
    lineDIV.style.background = '#CCFFCC';
    lineDIV.style.left = px(rect.x);
    lineDIV.style.top = px(rect.y);
    lineDIV.style.width = px(rect.width);
    lineDIV.style.height = px(rect.height);
    document.getElementById('C3').appendChild(lineDIV);
    let stage = new Konva.Stage({ container: divid, x: 0, y: 0, width: rect.width, height: rect.height });
    let layer = new Konva.Layer();
    let line = new Konva.Line({ points: points, stroke: 'red', tension: 1 });
    layer.add(line);
    stage.add(layer);
    layer.batchDraw();

    $(lineDIV).draggable({
        start: () => {
            console.log('Start linedragging...')
            KFK.linkPos = [];
            KFK.lineDragging = true;
        },
        drag: () => {
            KFK.lineDragging = true;
        },
        stop: () => {
            console.log('Stop linedragging...')
            KFK.linkPos = [];
            KFK.lineDragging = false;
            KFK.afterDragging = true;
        }
    });
    $(lineDIV).resizable({
        handles: "se", autoHide: true, ghost: false,
        minHeight: 1,
        minWidth: 1,
        start: function(event, ui){
            console.log("start resizing...");
        },
        resize: function (event, ui) {
            // line.points([0, 0, 100, 100]);
            //TODO: change line length and width
            layer.batchDraw();
            // $("#resizable-16").text("top = " + ui.position.top +
            //     ", left = " + ui.position.left +
            //     ", width = " + ui.size.width +
            //     ", height = " + ui.size.height);
        }
    });
    $(lineDIV).hover(
        () => {
            $(document.body).css('cursor', 'pointer');
            // $(lineDIV).resizable("option", "disabled", false);
        },
        () => {
            $(document.body).css('cursor', 'default');
            // $(lineDIV).resizable("option", "disabled", true);
        }
    );
    // layer.add(line); layer.batchDraw();
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
    if (nodeDIV.type === 'text' || nodeDIV.type === 'yellowtip')
        nodeDIV.style.padding = `${textPadding}px`;
    nodeDIV.style.margin = '0px';
    nodeDIV.style.overflow = 'hidden';
    nodeDIV.style.background = 'transparent';
    nodeDIV.style.outline = 'none';
    // nodeDIV.style.resize = 'none';
    nodeDIV.style.display = 'block';
    //click时，切换selected状态
    if (node.type === 'yellowtip') {
        $(nodeDIV).css("background-image", `url(${KFK.images['yellowtip'].src})`);
        $(nodeDIV).css("background-repeat", 'no-repeat');
        $(nodeDIV).css("background-size", '100% 100%');
        $(nodeDIV).css("box-shadow", "20px 20px 18px -18px #888888");
        $(nodeDIV).resizable();
    }

    nodeDIV.appendChild(nodeObj);
    KFK.C3.appendChild(nodeDIV);

    let jqNodeDIV = $(nodeDIV);
    jqNodeDIV.draggable({ scroll: true });

    jqNodeDIV.hover(
        () => { $(document.body).css('cursor', 'pointer'); },
        () => { $(document.body).css('cursor', 'default'); }
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

KFK.deleteNode = function (e) {
    if (KFK.selectedNode) {
        $(KFK.selectedNode).remove();
        KFK.selectedNode = null;
    }
}

KFK.createTip = function (node) {
    let background = new Konva.Image({
        image: KFK.images[`${node.type}`],
        x: -(node.size * node.iconscale),
        y: -(node.size * node.iconscale),
        width: (node.size * node.iconscale) * 2,
        height: (node.size * node.iconscale) * 2 * node.ratio,
        shadowEnabled: tip_variants[node.type].shadowEnabled,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowOpacity: 0.6,
        draggable: false,
        perfectDrawEnabled: false,
        name: 'background',
    });

    background.cache();
    var textNode = new Konva.Text({
        text: tip_variants[node.type].text,
        x: -(node.size * node.iconscale - 5),
        y: -(node.size * node.iconscale - 5),
        fontSize: 20,
        draggable: true,
        width: (node.size * node.iconscale) * 2,
        height: (node.size * node.iconscale) * 2 * node.ratio,
        draggable: false,
        name: 'text',
        listening: false,
    });
    textNode.cache();

    let oneTIP = new Konva.Group({
        x: node.x,
        y: node.y,
        width: background.width(),
        height: background.height(),
        draggable: true,
        startScale: 1,
        id: node.id,
        perfectDrawEnabled: false,
        dragBoundFunc: function (pos) {
            var newX = pos.x < 50 ? 50 : pos.x;
            var newY = pos.y < 100 ? 100 : pos.y;
            newX = newX > KFK.width() - 50 ? KFK.width() - 50 : newX;
            newY = newY > KFK.height() - 50 ? KFK.height() - 50 : newY;
            return {
                x: newX,
                y: newY
            };
        }
    });

    oneTIP.background = background;
    oneTIP.textNode = textNode;
    oneTIP.width(200);
    oneTIP.height(200);
    oneTIP.on('mouseover', function (e) {
        document.body.style.cursor = 'pointer';
        if (e.evt.ctrlKey) {

        }
    });
    oneTIP.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    oneTIP.on('dblclick', (e) => {
        e.cancelBubble = true;
        textNode.hide();
        oneTIP.tr.hide();
        var textPosition = textNode.absolutePosition();
        var stageBox = KFK.stage.container().getBoundingClientRect();
        var areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y
        };
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height =
            textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        let rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }
        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            oneTIP.tr.show();
            try { oneTIP.tr.forceUpdate(); } catch (e) { }
            KFK.layer.batchDraw();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
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
                textNode.text(textarea.value);
                removeTextarea();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeTextarea();
            }
        });

        textarea.addEventListener('keydown', function (e) {
            let scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                textNode.text(textarea.value);
                removeTextarea();
                KFK.focusOnTip = undefined;
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });

    });

    oneTIP.on('click', function (e) {
        KFK.focusOnTip = oneTIP;
        let withShift = e.shiftKey || e.evt.shiftKey;
        oneTIP.moveToTop();
        e.cancelBubble = true;

        KFK.stage.find('Transformer').destroy();
        var tr = new Konva.Transformer({
            // node: oneTIP,
            // enabledAnchors: ['middle-left', 'middle-right'],
            // set minimum width of text
            rotateEnabled: tip_variants[node.type]['rotateEnabled'],
            boundBoxFunc: function (oldBox, newBox) {
                newBox.width = Math.max(30, newBox.width);
                return newBox;
            }
        });
        KFK.layer.add(tr);
        tr.attachTo(oneTIP);
        oneTIP.tr = tr;


        if (withShift) {
            if (KFK.pickedTip === null) {
                KFK.pickedTip = oneTIP;
            } else {
                KFK.placeTipConnection(KFK.pickedTip.id(), oneTIP.id());
                KFK.pickedTip = oneTIP;
            }
        }
        KFK.layer.batchDraw();
    });

    oneTIP.add(background).add(textNode);
    oneTIP.rotation(tip_variants[node.type]['rotation']);

    oneTIP.on('transform', function () {
        // reset scale, so only with is changing by transformer
        background.setAttrs({
            width: background.width() * oneTIP.scaleX(),
            height: background.height() * oneTIP.scaleY(),
            scaleX: 1
        });
        textNode.setAttrs({
            width: textNode.width() * oneTIP.scaleX(),
            height: textNode.height() * oneTIP.scaleY(),
            scaleX: 1
        });
        oneTIP.setAttrs({
            width: background.width() * oneTIP.scaleX(),
            height: background.height() * oneTIP.scaleY(),
            scaleX: 1
        });
        KFK.layer.batchDraw();
    });

    return oneTIP;
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


KFK.placeConnection = function (from, to) {
    if (from == to || from == 'END' || to == 'START')
        return;
    if (typeof from !== 'string' || typeof to !== 'string') {
        console.error(`linkTogether with node ID (a string) pls`);
        return;
    }
    if (!KFK.removeLink(from, to))
        KFK.removeLink(to, from);
    let linkId = uuidv4();
    let aLink = new Link('link-' + linkId, from, to, '');
    KFK.links.push(aLink);
    let connect = KFK.createConnect(aLink);
    KFK.layer.add(connect);
    //KFK.redrawLinks();
};

KFK.placeTipConnection = function (from, to) {
    if (from == to)
        return;
    if (typeof from !== 'string' || typeof to !== 'string') {
        console.error(`linkTogether with node ID (a string) pls`);
        return;
    }
    if (!KFK.removeTipLink(from, to))
        KFK.removeTipLink(to, from);
    let linkId = uuidv4();
    let aLink = new Link('link-' + linkId, from, to, '');
    KFK.tipLinks.push(aLink);
    let connect = KFK.createConnect(aLink);
    KFK.layer.add(connect);
    //KFK.redrawLinks();
};

KFK.redrawLinks = function redrawLinks() {
    KFK.links.forEach(link => {
        var arrow = KFK.layer.findOne('#arrow-' + link.id);
        var fromNode = KFK.findNode(link.from);
        var toNode = KFK.findNode(link.to);

        const points = KFK.getConnectorPoints(
            fromNode.position(),
            toNode.position(),
            20,
        );
        arrow.points(points);
    });
    KFK.tipLinks.forEach(link => {
        var arrow = KFK.layer.findOne('#arrow-' + link.id);
        var fromNode = KFK.findNode(link.from);
        var toNode = KFK.findNode(link.to);
        var fromPosition = fromNode.position();
        var toPosition = toNode.position();

        const points = KFK.getConnectorPoints(
            fromPosition,
            toPosition,
            0
        );
        arrow.stroke('red');
        arrow.fill('red');
        arrow.points(points);
    });

    KFK.layer.batchDraw();
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
    //  KFK.placeConnection('START', 'END');
    // KFK.centerPos = { x: 120 + (KFK.width() - 50 - 120) * 0.5, y: KFK.height() * 0.5 };

    KFK.drawLine(200, 200, 500, 200);
    KFK.drawLine(200, 200, 200, 500);
    KFK.drawLine(500, 200, 500, 500);
    KFK.drawLine(200, 500, 500, 500);
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
KFK.isActive = function (mode) {
    console.log(`${KFK.mode} === ${mode}`);
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


KFK.inViewPort = function (r1) {
    return !(
        r1.x > window.innerWidth + KFK.scrollContainer.scrollLeft ||
        r1.x + r1.width < KFK.scrollContainer.scrollLeft ||
        r1.y > window.innerHeight + KFK.scrollContainer.scrollTop ||
        r1.y + r1.height < KFK.scrollContainer.scrollTop);
}

//TODO: 可以不要了？
KFK.setVisible = function () {
    //layer上已经不做拖动操作，如果改变visible, 必须执行batchDraw才能看到变化
    //这样导致性能极低。 既然layer上已经不做拖动操作，可以不改变node的visible状态
    console.log(KFK.layer.children.length);
    for (let i = 0; i < KFK.layer.children.length; i++) {
        let v = KFK.inViewPort(KFK.layer.children[i].getClientRect());
        KFK.layer.children[i].visible(v);
        // KFK.layer.batchDraw();
        console.log(v);
    }
};

//KFK.scrollContainer.addEventListener('scroll', KFK.setVisible);

module.exports = KFK;


//TODO: Zoom in / Zoom out
//TODO: RichText
//TODO: Free Drawing