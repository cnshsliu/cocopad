const DivStyler = {};
DivStyler.styleCache = {};
import KFK from './console';


DivStyler.NodeOuterStyleNames = ["background-color", "border-color ", "border-width", "border-style", "border-radius"];
DivStyler.NodeInnerStyleNames = ["font-size", "color", "justify-content", "align-items", "text-align-last", "text-align", "font-family", "font-weight", "font-style"];
DivStyler.copyStyle = function () {
    let div = KFK.getHoverFocusLastCreate();
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
        let div = KFK.getHoverFocusLastCreate();
        if (div.attr("id") === DivStyler.styleCache.nodeid) return;
        let oldDiv = div.clone();
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

        await KFK.syncNodePut("U", div, "paste style", oldDiv, false, 0, 1);
    } catch (error) {
        console.error(error);
    }
};

DivStyler.fontSmaller = async function () {
    try {
        let div = KFK.getHoverFocusLastCreate();
        let oldDiv = div.clone();
        let innerDiv = div.find('.innerobj');
        let fontSize = innerDiv.css("font-size");
        if (!fontSize) fontSize = "18px";
        fontSize = KFK.unpx(fontSize);
        let newFontSize = fontSize - 1;
        newFontSize = newFontSize < 8 ? 8 : newFontSize;
        if (newFontSize != fontSize) {
            innerDiv.css('font-size', newFontSize);
            await KFK.syncNodePut("U", div, "change font", oldDiv, false, 0, 1);
        }
    } catch (error) {
        console.error(error);
    }
}
DivStyler.fontBigger = async function () {
    try {
        let div = KFK.getHoverFocusLastCreate();
        let oldDiv = div.clone();
        let innerDiv = div.find('.innerobj');
        let fontSize = innerDiv.css("font-size");
        if (!fontSize) fontSize = "18px";
        fontSize = KFK.unpx(fontSize);
        let newFontSize = fontSize + 1;
        newFontSize = newFontSize > 100 ? 100 : newFontSize;
        if (newFontSize != fontSize) {
            innerDiv.css('font-size', newFontSize);
            await KFK.syncNodePut("U", div, "change font", oldDiv, false, 0, 1);
        }
    } catch (error) {
        console.error(error);
    }
}
DivStyler.vertSizeSmaller = async function () {
    try {
        let div = KFK.getHoverFocusLastCreate();
        let nodeType = div.attr('nodetype');
        let oldDiv = div.clone();
        let tmpTop = KFK.divTop(div);
        let tmpHeight = KFK.divHeight(div);
        tmpTop = tmpTop + 2;
        tmpHeight = tmpHeight - 4;
        let minH = 20;
        if (KFK.config.node[nodeType].minHeight) {
            minH = KFK.config.node[nodeType].minHeight;
        }
        if(tmpHeight >= minH){
            div.css('top', tmpTop);
            div.css('height', tmpHeight);
            await KFK.syncNodePut("U", div, "change height", oldDiv, false, 0, 1);
        }
    } catch (error) {
        console.error(error);
    }
};


DivStyler.horiSizeBigger = async function () {
    try {
        let div = KFK.getHoverFocusLastCreate();
        let oldDiv = div.clone();
        let tmpLeft = KFK.divLeft(div);
        let tmpWidth = KFK.divWidth(div);
        tmpLeft = tmpLeft - 2;
        tmpWidth = tmpWidth + 4;
        div.css('left', tmpLeft);
        div.css('width', tmpWidth);
        await KFK.syncNodePut("U", div, "change width", oldDiv, false, 0, 1);
    } catch (error) {
        console.error(error);
    }
}
DivStyler.horiSizeSmaller = async function () {
    try {
        let div = KFK.getHoverFocusLastCreate();
        let nodeType = div.attr('nodetype');
        let oldDiv = div.clone();
        let tmpLeft = KFK.divLeft(div);
        let tmpWidth = KFK.divWidth(div);
        tmpLeft = tmpLeft + 2;
        tmpWidth = tmpWidth - 4;
        let minW = 20;
        if (KFK.config.node[nodeType].minWidth) {
            minW = KFK.config.node[nodeType].minWidth;
        }
        if (tmpWidth >= minW) {
            div.css('left', tmpLeft);
            div.css('width', tmpWidth);
            await KFK.syncNodePut("U", div, "change width", oldDiv, false, 0, 1);
        }
    } catch (error) {
        console.error(error);
    }
}
DivStyler.vertSizeBigger = async function () {
    try {
        let div = KFK.getHoverFocusLastCreate();
        let oldDiv = div.clone();
        let tmpTop = KFK.divTop(div);
        let tmpHeight = KFK.divHeight(div);
        tmpTop = tmpTop - 2;
        tmpHeight = tmpHeight + 4;
        div.css('top', tmpTop);
        div.css('height', tmpHeight);
        await KFK.syncNodePut("U", div, "change height", oldDiv, false, 0, 1);
    } catch (error) {
        console.error(error);
    }
}
module.exports.DivStyler = DivStyler;