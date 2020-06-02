const AdvOps = {};
AdvOps.styleCache = {};
import KFK from "./console";

AdvOps.getDivPage = function(div) {
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

AdvOps.getShapePage = function(shape) {
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
AdvOps.moveSingleElement = async function(pindex) {
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

AdvOps.moveSingleDiv = async function(div, pindex) {
  let onPage = AdvOps.getDivPage(div);
  if (onPage === pindex) {
    console.log("move to the same page, just return");
  }
  let deltaX =
    KFK.pageBounding.Pages[pindex].left - KFK.pageBounding.Pages[onPage].left;
  let deltaY =
    KFK.pageBounding.Pages[pindex].top - KFK.pageBounding.Pages[onPage].top;
  let oldDiv = div.clone();
  KFK.divDMove(div, deltaX, deltaY);
  await KFK.syncNodePut("U", div.clone(), "move to page", oldDiv, false, 0, 1);
  KFK.scrollToNode(div);
};

AdvOps.moveSingleShape = async function(aShape, pindex) {
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

AdvOps.moveAllElements = async function(pindex) {
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
  if (div) KFK.scrollToNode(div);
  else if (shape) KFK.scrollToShape(shape);
};

module.exports.AdvOps = AdvOps;