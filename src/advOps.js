const AdvOps = {};
AdvOps.styleCache = {};
import { merge } from "jquery";
import KFK from "./console";

/* 获得一个DIV位于哪个页面上 */
AdvOps.getDivPage = function (div) {
  let onPage = -1;
  let myCenter = { x: KFK.divCenter(div), y: KFK.divMiddle(div) };
  for (let i = 0; i < KFK.pageBounding.Pages.length; i++) {
    if (
      myCenter.x >= KFK.pageBounding.Pages[i].left &&
      myCenter.x < KFK.pageBounding.Pages[i].left + KFK.PageWidth &&
      myCenter.y >= KFK.pageBounding.Pages[i].top &&
      myCenter.y < KFK.pageBounding.Pages[i].top + KFK.PageHeight
    ) {
      onPage = i;
      break;
    }
  }
  return onPage;
};

/* 获得一个图形处于哪个页面上 */
AdvOps.getShapePage = function (shape) {
  let onPage = -1;
  let rect = KFK.getShapeRect(shape);
  let myCenter = { x: rect.center, y: rect.middle };
  for (let i = 0; i < KFK.pageBounding.Pages.length; i++) {
    if (
      myCenter.x >= KFK.pageBounding.Pages[i].left &&
      myCenter.x < KFK.pageBounding.Pages[i].left + KFK.PageWidth &&
      myCenter.y >= KFK.pageBounding.Pages[i].top &&
      myCenter.y < KFK.pageBounding.Pages[i].top + KFK.PageHeight
    ) {
      onPage = i;
      break;
    }
  }
  return onPage;
};


/* 移动单个对象到指定的页面 */
AdvOps.moveSingleElement = async function (pindex) {
  console.log("moveSingleElement");
  let div = KFK.hoverJqDiv();
  if (div) {
    AdvOps.moveSingleDiv(div, pindex);
  } else {
    let shape = KFK.hoverSvgLine();
    if (shape) {
      AdvOps.moveSingleShape(shape, pindex);
    }
  }
};

/* 移动单个DIV到指定页面 */
AdvOps.moveSingleDiv = async function (div, pindex) {
  // 获得div所在的原始页面
  let onPage = AdvOps.getDivPage(div);
  if (onPage === pindex) {
    console.log("move to the same page, just return");
  }
  // 计算目标页面与原始页面的位置差距
  let deltaX =
    KFK.pageBounding.Pages[pindex].left - KFK.pageBounding.Pages[onPage].left;
  let deltaY =
    KFK.pageBounding.Pages[pindex].top - KFK.pageBounding.Pages[onPage].top;
  let oldDiv = div.clone();
  //将div的位置,进行位移
  KFK.divDMove(div, deltaX, deltaY);
  await KFK.syncNodePut("U", div.clone(), "move to page", oldDiv, false, 0, 1);
  //视窗滚动到新位置
  KFK.scrollToNode(div);
};

AdvOps.moveSingleShape = async function (aShape, pindex) {
  let onPage = AdvOps.getShapePage(aShape);
  if (onPage === pindex) {
    console.log("move to the same page, just return");
  }
  let deltaX =
    KFK.pageBounding.Pages[pindex].left - KFK.pageBounding.Pages[onPage].left;
  let deltaY =
    KFK.pageBounding.Pages[pindex].top - KFK.pageBounding.Pages[onPage].top;
  KFK.setShapeToRemember(aShape);
  aShape.dmove(deltaX, deltaY);
  KFK.resetShapeStyleToOrigin(aShape);
  KFK.resetShapeStyleToOrigin(KFK.shapeToRemember);
  await KFK.syncLinePut(
    "U",
    aShape,
    "move between page",
    KFK.shapeToRemember,
    false,
    0,
    1
  );
  KFK.scrollToShape(aShape);
};

AdvOps.moveAllElements = async function (pindex) {
  let div = KFK.hoverJqDiv();
  let shape = KFK.hoverSvgLine();
  let onPage = -1;
  if (div) {
    onPage = AdvOps.getDivPage(div);
  } else if (shape) {
    onPage = AdvOps.getShapePage(shape);
  } else {
    return;
  }
  if (onPage === pindex) {
    console.log("move to the same page, just return");
  }

  KFK.startTrx();
  try {
    let allnodes = KFK.JC3.find(".kfknode");
    let samePageDIVsCount = 0;
    allnodes.each(async (index, aDIV) => {
      let jqDIV = $(aDIV);
      let theCenter = { x: KFK.divCenter(jqDIV), y: KFK.divMiddle(jqDIV) };
      if (
        theCenter.x >= KFK.pageBounding.Pages[onPage].left &&
        theCenter.x < KFK.pageBounding.Pages[onPage].left + KFK.PageWidth &&
        theCenter.y >= KFK.pageBounding.Pages[onPage].top &&
        theCenter.y < KFK.pageBounding.Pages[onPage].top + KFK.PageHeight &&
        KFK.anyLocked(jqDIV) === false &&
        KFK.updateable(jqDIV)
      ) {
        samePageDIVsCount++;
      }
    });
    let allShapes = KFK.JC3.find(".kfkshape");
    let samePageShapesCount = 0;
    allShapes.each(async (index, aShapeDIV) => {
      let aShape = SVG(aShapeDIV);
      let aShapeRect = KFK.getShapeRect(aShape);
      let theCenter = { x: aShapeRect.center, y: aShapeRect.middle };
      if (
        theCenter.x >= KFK.pageBounding.Pages[onPage].left &&
        theCenter.x < KFK.pageBounding.Pages[onPage].left + KFK.PageWidth &&
        theCenter.y >= KFK.pageBounding.Pages[onPage].top &&
        theCenter.y < KFK.pageBounding.Pages[onPage].top + KFK.PageHeight &&
        KFK.anyLocked(aShape) === false
      ) {
        samePageShapesCount++;
      }
    });
    let samePageElemCount = samePageDIVsCount + samePageShapesCount;
    let samePageIndex = 0;
    allnodes.each(async (index, aDIV) => {
      let jqDIV = $(aDIV);
      let theCenter = { x: KFK.divCenter(jqDIV), y: KFK.divMiddle(jqDIV) };
      if (
        theCenter.x >= KFK.pageBounding.Pages[onPage].left &&
        theCenter.x < KFK.pageBounding.Pages[onPage].left + KFK.PageWidth &&
        theCenter.y >= KFK.pageBounding.Pages[onPage].top &&
        theCenter.y < KFK.pageBounding.Pages[onPage].top + KFK.PageHeight &&
        KFK.anyLocked(jqDIV) === false &&
        KFK.updateable(jqDIV)
      ) {
        if (samePageIndex < samePageElemCount) {
          let deltaX =
            KFK.pageBounding.Pages[pindex].left -
            KFK.pageBounding.Pages[onPage].left;
          let deltaY =
            KFK.pageBounding.Pages[pindex].top -
            KFK.pageBounding.Pages[onPage].top;
          let oldDiv = jqDIV.clone();
          KFK.divDMove(jqDIV, deltaX, deltaY);
          await KFK.syncNodePut(
            "U",
            jqDIV,
            "move to page",
            oldDiv,
            false,
            samePageIndex,
            samePageElemCount
          );
          KFK.redrawLinkLines(jqDIV, "after moving");
          samePageIndex++;
        }
      }
    });

    allShapes.each(async (index, aShapeDIV) => {
      let aShape = SVG(aShapeDIV);
      let aShapeRect = KFK.getShapeRect(aShape);
      let theCenter = { x: aShapeRect.center, y: aShapeRect.middle };
      if (
        theCenter.x >= KFK.pageBounding.Pages[onPage].left &&
        theCenter.x < KFK.pageBounding.Pages[onPage].left + KFK.PageWidth &&
        theCenter.y >= KFK.pageBounding.Pages[onPage].top &&
        theCenter.y < KFK.pageBounding.Pages[onPage].top + KFK.PageHeight &&
        KFK.anyLocked(aShape) === false
      ) {
        if (samePageIndex < samePageElemCount) {
          let deltaX =
            KFK.pageBounding.Pages[pindex].left -
            KFK.pageBounding.Pages[onPage].left;
          let deltaY =
            KFK.pageBounding.Pages[pindex].top -
            KFK.pageBounding.Pages[onPage].top;
          KFK.setShapeToRemember(aShape);
          aShape.dmove(deltaX, deltaY);
          KFK.resetShapeStyleToOrigin(aShape);
          KFK.resetShapeStyleToOrigin(KFK.shapeToRemember);
          await KFK.syncLinePut(
            "U",
            aShape,
            "move between page",
            KFK.shapeToRemember,
            false,
            samePageIndex,
            samePageElemCount
          );
          samePageIndex++;
        }
      }
    });

  } finally { KFK.endTrx(); }
  if (div) KFK.scrollToNode(div);
  else if (shape) KFK.scrollToShape(shape);
};

AdvOps.getChildren = async function (jqNode) {
  let children = [];
  let childrenIds = KFK.getNodeLinkIds(jqNode, "linkto");
  console.log("getChilden, ids: ", childrenIds);
  for(let i=0; i<childrenIds.length; i++){
    let jqChild = $(`#${childrenIds[i]}`);
    children.push(jqChild);
  }
  return children;
}

AdvOps.existsInGroup = function(group, div){
  for(let i=0; i<group.length; i++){
    if(group[i].attr("id") === div.attr("id")){
      return true;
    }
  }
  return false;
}

AdvOps.getChildrenRecursively = async function (root, aParent, ret) {
  let directChildren = await AdvOps.getChildren(aParent);
  let clearedDirectChildren = [];
  console.log("directChildren", directChildren);
  for(let i=0; i<directChildren.length; i++){
    if(AdvOps.existsInGroup(ret, directChildren[i]) ===false && root.attr("id") !== directChildren[i].attr("id")){
      clearedDirectChildren.push(directChildren[i]);
      ret.push(directChildren[i]);
    }
  }
  console.log("clearedDirectChildren", clearedDirectChildren);

  for (let i = 0; i < clearedDirectChildren.length; i++) {
    await AdvOps.getChildrenRecursively(root, clearedDirectChildren[i], ret);
  }
}
module.exports.AdvOps = AdvOps;
