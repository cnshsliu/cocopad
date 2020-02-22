import Konva from "konva";
// import { TableSimplePlugin } from "bootstrap-vue";
import iconStartURL from '../assets/start.svg';
import iconEndURL from '../assets/end.svg';
import iconGroundURL from '../assets/terminate.svg';
import iconTimerURL from '../assets/timer.svg';
import iconSwitchURL from '../assets/conditional.svg';
import iconNotifyURL from '../assets/message.svg';
import iconAndURL from '../assets/and.svg';
import iconOrURL from '../assets/or.svg';
import iconTaskURL from '../assets/task.svg';
import iconSubURL from '../assets/sub.svg';
import iconLinkURL from '../assets/link.svg';
import iconArrowURL from '../assets/arrow.svg';
import iconTipURL from '../assets/tip.svg';
import iconBlanketURL from '../assets/blanket.svg';
import iconP8StarURL from '../assets/p8star.svg';
import uuidv4 from 'uuid/v4';
import { BIconFolderSymlinkFill } from "bootstrap-vue";


let tip_variants = {
    'tip': {
        rotateEnabled: true,
        rotation: -5,
        size: 100,
        ratio: 1,
        text: 'Some text here'
    },
    'blanket': {
        rotateEnabled: false,
        rotation: 0,
        size: 60,
        ratio: 0.618,
        text: 'Some text here'
    },
    'p8star': {
        rotateEnabled: false,
        rotation: 0,
        size: 60,
        ratio: 1,
        text: ' '
    },
}
var images_urls = {
    start: iconStartURL,
    end: iconEndURL,
    ground: iconGroundURL,
    timer: iconTimerURL,
    switch: iconSwitchURL,
    notify: iconNotifyURL,
    and: iconAndURL,
    or: iconOrURL,
    task: iconTaskURL,
    sub: iconSubURL,
    tip_tip: iconTipURL,
    tip_blanket: iconBlanketURL,
    tip_p8star: iconP8StarURL,
};

let KFK = {};

KFK.width = window.innerWidth;
KFK.height = window.innerHeight;

KFK.nodes = [];
KFK.links = [];
KFK.tipLinks = [];
KFK.tips = [];
KFK.images = {};
KFK.pickedNode = null;
KFK.pickedTip = null;
KFK.mode = "tpl";

//TODO: 支持PAN
//TODO: 把TIPS通用化为通用text， 如果是小黄帖就用小黄帖背景，如果是文本框就不用背景（如果为了拖拽，需要一个透明背景，或者必须用一个背框框背景？）
//TODO: TIPS可以钉在桌面上，钉住后，不可移动
//TODO: canvas为十倍的大小，或者，自动扩展canvas, 类似draw.io的做法， 每次扩展一个屏幕大小


KFK.tween = null;

KFK.addStar = function addStar(layer, stage, posx, posy) {
    var scale = Math.random();

    if (!posx)
        posx = Math.random() * stage.getWidth();
    if (!posy)
        posy = Math.random() * stage.getHeight();
    var star = new Konva.Star({
        x: posx,
        y: posy,
        numPoints: 5,
        innerRadius: 30,
        outerRadius: 50,
        fill: "#89b717",
        opacity: 0.8,
        draggable: true,
        scale: {
            x: scale,
            y: scale
        },
        rotation: Math.random() * 180,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowOpacity: 0.6,
        // custom attribute
        startScale: scale
    });

    layer.add(star);
};

KFK.stage = new Konva.Stage({
    container: "container",
    width: KFK.width,
    height: KFK.height
});
KFK.container = KFK.stage.container();
KFK.container.tabIndex = 1;
KFK.container.focus();
KFK.lockMode = false;
KFK.container.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 16:
            KFK.lockMode = true;
            KFK.APP.lockMode = true;
    }
    e.preventDefault();
});

KFK.container.addEventListener('keyup', function (e) {
    if (e.keyCode === 16) {
        KFK.lockMode = false;
        KFK.APP.lockMode = false;
        KFK.pickedNode = null;
    } else if (e.keyCode >= 37 && e.keyCode <= 40) {
        KFK.moveTip(e);
    } else if (e.keyCode === 46 || e.keyCode === 68) {
        KFK.deleteTip(e);
    }
    e.preventDefault();
});

KFK.layer = new Konva.Layer();
KFK.dragLayer = new Konva.Layer();
KFK.lineLayer = new Konva.Layer();
KFK.tipLineLayer = new Konva.Layer();
KFK.dragLineLayer = new Konva.Layer();
KFK.stage.add(KFK.lineLayer, KFK.dragLineLayer, KFK.layer, KFK.dragLayer, KFK.tipLineLayer);

// for (var n = 0; n < 30; n++) {
//     KFK.addStar(KFK.layer, KFK.stage);
// }


KFK.stage.on('click', function (e) {
    var node = e.target;
    let withShift = e.shiftKey || e.evt.shiftKey;
    if (!withShift)
        KFK.pickedNode = null;
    let stage = e.target.getStage();
    let pos = stage.getPointerPosition();
    // let nodeid = 'node-' + KFK.nodes.length;
    let nodeid = uuidv4();

    stage.find('Transformer').destroy();
    KFK.layer.draw();

    if (KFK.mode === 'tpl') {
        let aNode = new Node(nodeid, 'task', pos.x, pos.y);
        KFK.nodes.push(aNode);
        var node = KFK.createNode(aNode);
        KFK.layer.add(node);
        if (withShift) {
            if (KFK.pickedNode === null) {
                KFK.pickedNode = node;
            } else {
                KFK.placeConnection(KFK.pickedNode.id(), node.id());
                KFK.pickedNode = node;
            }
        }
    } else if (tip_variants[KFK.mode]) {
        if (KFK.focusOnTip) {
            KFK.focusOnTip = undefined;
        } else {
            let aTip = new Tip(nodeid, KFK.mode, pos.x, pos.y);
            KFK.tips.push(aTip);
            var guiTip = KFK.createTip(aTip);
            KFK.layer.add(guiTip);
            if (withShift) {
                if (KFK.pickedTip === null) {
                    KFK.pickedTip = guiTip;
                } else {
                    KFK.placeTipConnection(KFK.pickedTip.id(), guiTip.id());
                    KFK.pickedTip = guiTip;
                }
            }
        }
    }
    KFK.redrawLinks();
});

KFK.stage.on("dragstart", function (evt) {
    var node = evt.target;
    // moving to another layer will improve dragging performance
    node.moveTo(KFK.dragLayer);
    let transformer = KFK.stage.find('Transformer');
    if (transformer && transformer[0]) {
        let theNode = transformer[0].getNode();
        let bNode = transformer[0]._node;
        if (bNode == node) {
            transformer.moveTo(KFK.dragLayer);
        }
    }

    KFK.stage.draw();
    let nodeid = node.getAttr('nodeid');

    if (KFK.tween) {
        KFK.tween.pause();
    }
    node.setAttrs({
        shadowOffset: {
            x: 15,
            y: 15
        },
        scale: {
            x: node.getAttr("startScale") * 1.2,
            y: node.getAttr("startScale") * 1.2
        }
    });
});

KFK.stage.on("dragmove", function (evt) {
    var node = evt.target;

    KFK.redrawLinks();

});

KFK.stage.on("dragend", function (evt) {
    var node = evt.target;
    node.moveTo(KFK.layer);
    let transformer = KFK.stage.find('Transformer');
    if (transformer && transformer[0]) {
        let theNode = transformer[0].getNode();
        let bNode = transformer[0]._node;
        if (bNode == node) {
            transformer.moveTo(KFK.layer);
        }
    }
    KFK.stage.draw();
    node.to({
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: node.getAttr("startScale"),
        scaleY: node.getAttr("startScale"),
        shadowOffsetX: 5,
        shadowOffsetY: 5
    });
});

KFK.loadImages = function loadimg(sources, callback) {
    let loadedImages = 0;
    let numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        KFK.images[src] = new Image();
        KFK.images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(KFK.images);
            }
        };
        KFK.images[src].src = sources[src];
    }
};


class Node {
    constructor(id, type, x, y) {
        this.id = id;
        this.type = type;
        this.size = 20;
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
    let conn = KFK.lineLayer.findOne('#connect-' + linkid);
    if (conn === undefined)
        conn = KFK.tipLineLayer.findOne('#connect-' + linkid);
    if (conn === undefined)
        console.warn(`Connect #connect-${linkid} not exist`);
    return conn;
};

KFK.createNode = function (node) {
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
    let icon = new Konva.Image({
        image: KFK.images[node.type],
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

    let group = new Konva.Group({
        x: node.x,
        y: node.y,
        draggable: true,
        startScale: 1,
        id: node.id,
        dragBoundFunc: function (pos) {
            // var newY = pos.y < 50 ? 50 : (pos.y > KFK.height-50? KFK.height-50: pos.y);
            // var newX = pos.x < 50 ? 50 : (pos.x > KFK.width-50? KFK.height-50: pos.y);
            var newX = pos.x < 50 ? 50 : pos.x;
            var newY = pos.y < 100 ? 100 : pos.y;
            newX = newX > KFK.width - 50 ? KFK.width - 50 : newX;
            newY = newY > KFK.height - 50 ? KFK.height - 50 : newY;
            return {
                x: newX,
                y: newY
            };
        }
    });
    group.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    group.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    group.on('click', function (e) {
        let withShift = e.shiftKey || e.evt.shiftKey;
        e.cancelBubble = true;

        if (withShift) {
            if (KFK.pickedNode === null) {
                KFK.pickedNode = group;
            } else {
                KFK.placeConnection(KFK.pickedNode.id(), group.id());
                KFK.pickedNode = group;
            }
        }
    });

    group.add(circle).add(icon);

    return group;
}

KFK.moveTip = function (e) {
    let DELTA = 5;
    if (e.shiftKey && e.ctrlKey) DELTA = 20;
    else if (e.shiftKey) DELTA = 1;

    if (KFK.focusOnTip) {
        if (e.keyCode === 37)
            KFK.focusOnTip.x(KFK.focusOnTip.x() - DELTA);
        else if (e.keyCode === 38)
            KFK.focusOnTip.y(KFK.focusOnTip.y() - DELTA);
        else if (e.keyCode === 39)
            KFK.focusOnTip.x(KFK.focusOnTip.x() + DELTA);
        else if (e.keyCode === 40)
            KFK.focusOnTip.y(KFK.focusOnTip.y() + DELTA);
        KFK.layer.batchDraw();
    }
}

KFK.createTip = function (node) {
    let background = new Konva.Image({
        image: KFK.images[`tip_${node.type}`],
        x: -(node.size * node.iconscale),
        y: -(node.size * node.iconscale),
        width: (node.size * node.iconscale) * 2,
        height: (node.size * node.iconscale) * 2 * node.ratio,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowOpacity: 0.6,
        draggable: false,
    });

    var textNode = new Konva.Text({
        text: tip_variants[node.type].text,
        x: -(node.size * node.iconscale - 5),
        y: -(node.size * node.iconscale - 5),
        fontSize: 20,
        draggable: true,
        width: (node.size * node.iconscale) * 2,
        draggable: false,
    });

    let oneTIP = new Konva.Group({
        x: node.x,
        y: node.y,
        draggable: true,
        startScale: 1,
        id: node.id,
    });

    oneTIP.background = background;
    oneTIP.textNode = textNode;
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

    oneTIP.on('')
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
        if (KFK.links[i].from === from && KFK.links[i].to === to) {
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
        if (KFK.tipLinks[i].from === from && KFK.tipLinks[i].to === to) {
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
    let aNode = new Node(id, type, x, y);
    KFK.nodes.push(aNode);
    let nodeGraph = KFK.createNode(aNode);
    KFK.layer.add(nodeGraph);
    KFK.redrawLinks();
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
    KFK.lineLayer.add(connect);
    KFK.redrawLinks();
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
    KFK.tipLineLayer.add(connect);
    KFK.redrawLinks();
};

KFK.redrawLinks = function redrawLinks() {
    KFK.links.forEach(link => {
        var arrow = KFK.lineLayer.findOne('#arrow-' + link.id);
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
        var arrow = KFK.tipLineLayer.findOne('#arrow-' + link.id);
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
    KFK.lineLayer.batchDraw();
    KFK.tipLineLayer.batchDraw();
};

KFK.initLogo = function () {
    KFK.placeNode('START', 'start', 120, KFK.height * 0.5);
    KFK.placeNode('END', 'end', KFK.width - 50, KFK.height * 0.5);
    KFK.placeConnection('START', 'END');
};
KFK.loadImages(images_urls, KFK.initLogo);

KFK.setGuiMode = function (mode) {
    KFK.mode = mode;
}

module.exports = KFK;