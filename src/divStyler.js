const DivStyler = {};
DivStyler.styleCache = {};
import KFK from './console';


DivStyler.NodeOuterStyleNames = ["background-color", "border-color ", "border-width", "border-style", "border-radius"];
DivStyler.NodeInnerStyleNames = ["font-size", "color", "justify-content", "align-items", "text-align-last", "text-align", "font-family", "font-weight", "font-style"];
DivStyler.copyStyle = function () {
    let div = KFK.getHoverFocusLastCreate();
    if (!div) return;
    let innerDiv = div.find('.innerobj');
    DivStyler.styleCache.nodetype = div.attr("nodetype");
    DivStyler.styleCache.nodeid = div.attr("id");
    DivStyler.styleCache.outerStyle = DivStyler.NodeOuterStyleNames.map((cssName) => {
        return div.css(cssName);
    });
    DivStyler.styleCache.innerStyle = DivStyler.NodeInnerStyleNames.map((cssName) => {
        return innerDiv.css(cssName);
    });
};

DivStyler.pasteStyle = async function () {
    if (!DivStyler.styleCache.nodetype) return;
    try {
        await KFK.updateSelectedDIVs('paste style', async function (div) {
            let innerDiv = div.find('.innerobj');
            let myNodeType = div.attr('nodetype');
            if (myNodeType === DivStyler.styleCache.nodetype) {
                for (let i = 0; i < DivStyler.NodeOuterStyleNames.length; i++) {
                    if (DivStyler.styleCache.outerStyle[i])
                        div.css(DivStyler.NodeOuterStyleNames[i], DivStyler.styleCache.outerStyle[i]);
                }
            }
            for (let i = 0; i < DivStyler.NodeInnerStyleNames.length; i++) {
                if (DivStyler.styleCache.innerStyle[i])
                    innerDiv.css(DivStyler.NodeInnerStyleNames[i], DivStyler.styleCache.innerStyle[i]);
            }
        });
    } catch (error) {
        console.error(error);
    }
};

DivStyler.fontSmaller = async function () {
    try {
        await KFK.updateSelectedDIVs('font smaller', async function (div) {
            let innerDiv = div.find('.innerobj');
            let fontSize = innerDiv.css("font-size");
            if (!fontSize) fontSize = "18px";
            fontSize = KFK.unpx(fontSize);
            let newFontSize = fontSize - 1;
            newFontSize = newFontSize < 8 ? 8 : newFontSize;
            innerDiv.css('font-size', newFontSize);
        });
    } catch (error) {
        console.error(error);
    }
}
DivStyler.fontBigger = async function () {
    try {
        await KFK.updateSelectedDIVs('font smaller', async function (div) {
            let innerDiv = div.find('.innerobj');
            let fontSize = innerDiv.css("font-size");
            if (!fontSize) fontSize = "18px";
            fontSize = KFK.unpx(fontSize);
            let newFontSize = fontSize + 1;
            newFontSize = newFontSize > 100 ? 100 : newFontSize;
            innerDiv.css('font-size', newFontSize);
        });
    } catch (error) {
        console.error(error);
    }
}
DivStyler.vertSizeSmaller = async function (delta) {
    try {
        let divNum = await KFK.updateSelectedDIVs('set border width', async function (div) {
            let nodeType = div.attr('nodetype');
            let tmpTop = KFK.divTop(div);
            let tmpHeight = KFK.divHeight(div);
            tmpTop = tmpTop + delta;
            tmpHeight = tmpHeight - delta * 2;
            let minH = 20;
            if (KFK.config.node[nodeType].minHeight) {
                minH = KFK.config.node[nodeType].minHeight;
            }
            if (tmpHeight >= minH) {
                div.css('top', tmpTop);
                div.css('height', tmpHeight);
            }
        });
        if (divNum === 0) {
            let shape = KFK.hoverSvgLine();
            shape && (KFK.morphedShape = shape);
            KFK.morphedShape && DivStyler.resizeShape(KFK.morphedShape, 'vertSizeSmaller', delta);
        }
    } catch (error) {
        console.error(error);
    }
};


DivStyler.horiSizeBigger = async function (delta) {
    try {
        let divNum = await KFK.updateSelectedDIVs('set border width', async function (div) {
            let tmpLeft = KFK.divLeft(div);
            let tmpWidth = KFK.divWidth(div);
            tmpLeft = tmpLeft - delta;
            tmpWidth = tmpWidth + delta * 2;
            div.css('left', tmpLeft);
            div.css('width', tmpWidth);
        });
        if (divNum === 0) {
            let shape = KFK.hoverSvgLine();
            shape && (KFK.morphedShape = shape);
            KFK.morphedShape && DivStyler.resizeShape(KFK.morphedShape, 'horiSizeBigger', delta);
        }
    } catch (error) {
        console.error(error);
    }
}
DivStyler.horiSizeSmaller = async function (delta) {
    try {
        let divNum = await KFK.updateSelectedDIVs('set border width', async function (div) {
            let nodeType = div.attr('nodetype');
            let tmpLeft = KFK.divLeft(div);
            let tmpWidth = KFK.divWidth(div);
            tmpLeft = tmpLeft + delta;
            tmpWidth = tmpWidth - delta * 2;
            let minW = 20;
            if (KFK.config.node[nodeType].minWidth) {
                minW = KFK.config.node[nodeType].minWidth;
            }
            if (tmpWidth >= minW) {
                div.css('left', tmpLeft);
                div.css('width', tmpWidth);
            }
        });
        if (divNum === 0) {
            let shape = KFK.hoverSvgLine();
            shape && (KFK.morphedShape = shape);
            KFK.morphedShape && DivStyler.resizeShape(KFK.morphedShape, 'horiSizeSmaller', delta);
        }
    } catch (error) {
        console.error(error);
    }
}
DivStyler.vertSizeBigger = async function (delta) {
    try {
        let divNum = await KFK.updateSelectedDIVs('set border width', async function (div) {
            let tmpTop = KFK.divTop(div);
            let tmpHeight = KFK.divHeight(div);
            tmpTop = tmpTop - delta;
            tmpHeight = tmpHeight + delta * 2;
            div.css('top', tmpTop);
            div.css('height', tmpHeight);
        });
        if (divNum === 0) {
            let shape = KFK.hoverSvgLine();
            shape && (KFK.morphedShape = shape);
            KFK.morphedShape && DivStyler.resizeShape(KFK.morphedShape, 'vertSizeBigger', delta);
        }
    } catch (error) {
        console.error(error);
    }
};
DivStyler.zoom = async function (direction, delta) {
    try {
        if (!KFK.morphedShape) {
            let shape = KFK.hoverSvgLine();
            shape && (KFK.morphedShape = shape);
        }
        KFK.morphedShape && DivStyler.zoomShape(KFK.morphedShape, direction, delta);
    } catch (error) {
        console.error(error);
    }
};
DivStyler.zoomShape = async function (shape, direction, delta) {
    // let cpt = { x: shape.cx(), y: shape.cy() };
    // let rect = { w: shape.width(), h: shape.height() };
    // rect.w += delta;
    // rect.h += delta;
    let tmpw = KFK.shapeSizeOrigin.w + delta;
    let tmph = KFK.shapeSizeOrigin.h + delta;
    tmpw = tmpw < 10 ? 10 : tmpw;
    tmph = tmph < 10 ? 10 : tmph;
    shape.size(tmpw, tmph);
    shape.center(KFK.shapeSizeCenter.x, KFK.shapeSizeCenter.y);
};
/**
 * 对shape边框进行横向和纵向扩展
 */
DivStyler.resizeShape = async function (shape, direction, delta) {
    let sType = DivStyler.shapeType(shape);
    console.log(sType);
    let smallIndex = -1;
    let bigIndex = -1;
    if (sType === 'line') {
        let arr = shape.array();
        let rect = {
            l: Math.min(arr[0][0], arr[1][0]),
            t: Math.min(arr[0][1], arr[1][1]),
            r: Math.max(arr[0][0], arr[1][0]),
            b: Math.max(arr[0][1], arr[1][1])
        };

        switch (direction) {
            case "vertSizeBigger":
                if (arr[0][1] == rect.b) {
                    smallIndex = 1;
                    bigIndex = 0;
                } else {
                    smallIndex = 0;
                    bigIndex = 1;
                }
                arr[smallIndex][1] -= delta;
                arr[bigIndex][1] += delta;
                break;
            case "vertSizeSmaller":
                if (arr[0][1] == rect.b) {
                    smallIndex = 1;
                    bigIndex = 0;
                } else {
                    smallIndex = 0;
                    bigIndex = 1;
                }
                arr[smallIndex][1] += delta;
                arr[bigIndex][1] -= delta;
                break;
            case "horiSizeBigger":
                console.log("Bigger");
                if (arr[0][0] == rect.r) {
                    smallIndex = 1;
                    bigIndex = 0;
                } else {
                    smallIndex = 0;
                    bigIndex = 1;
                }
                arr[smallIndex][0] -= delta;
                arr[bigIndex][0] += delta;
                break;
            case "horiSizeSmaller":
                console.log("Smaller");
                if (arr[0][0] == rect.r) {
                    smallIndex = 1;
                    bigIndex = 0;
                } else {
                    smallIndex = 0;
                    bigIndex = 1;
                }
                arr[smallIndex][0] += delta;
                arr[bigIndex][0] -= delta;
                break;
        }
        shape.plot(arr);
    } else if (sType === 'rectangle' || sType === 'ellipse' ||
        sType === 'polygon' || sType === 'polyline' ||
        sType === 'freehand') {
        let cpt = {
            x: shape.cx(),
            y: shape.cy()
        };
        let rect = {
            w: shape.width(),
            h: shape.height()
        };
        switch (direction) {
            case "vertSizeBigger":
                rect.h += 2 * delta;
                break;
            case "vertSizeSmaller":
                rect.h -= 2 * delta;
                rect.h = rect.h < 10 ? 10 : rect.h;
                break;
            case "horiSizeBigger":
                rect.w += 2 * delta;
                break;
            case "horiSizeSmaller":
                rect.w -= 2 * delta;
                rect.w = rect.w < 10 ? 10 : rect.w;
                break;
        }
        shape.size(rect.w, rect.h);
        shape.center(cpt.x, cpt.y);
    }
};
DivStyler.shapeType = function (shape) {
    let ret = 'line';
    if (shape.hasClass('kfkline')) {
        ret = "line";
    } else if (shape.hasClass('kfkrectangle')) {
        ret = "rectangle";
    } else if (shape.hasClass('kfkellipse')) {
        ret = "ellipse";
    } else if (shape.hasClass('kfkpolyline')) {
        ret = "polyline";
    } else if (shape.hasClass('kfkpolygon')) {
        ret = "polygon";
    } else if (shape.hasClass('kfkfreehand')) {
        ret = "freehand";
    }
    return ret;
};
DivStyler.alignItem = async function (keyCode) {
    let divNum = await KFK.updateSelectedDIVs('set border width', async function (div) {
        let divInner = div.find('.innerobj');
        switch (keyCode) {
            case 66: // key B
                let fst = divInner.css('font-weight');
                if (fst === '700')
                    divInner.css('font-weight', '400');
                else
                    divInner.css('font-weight', '700');
                break;
            case 73: //key I
                if (divInner.css('font-style') === 'italic')
                    divInner.css('font-style', '');
                else
                    divInner.css('font-style', 'italic');
                break;
            case 69: // key E
                divInner.css("justify-content", 'center');
                divInner.css("text-align", 'center');
                divInner.css("text-align-last", 'center');
                break;
            case 76: // key L
                divInner.css("justify-content", 'flex-start');
                divInner.css("text-align", 'left');
                divInner.css("text-align-last", 'left');
                break;
            case 82: // key R
                divInner.css("justify-content", 'flex-end');
                divInner.css("text-align", 'right');
                divInner.css("text-align-last", 'right');
                break;
        }
    });
};
module.exports.DivStyler = DivStyler;
