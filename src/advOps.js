const AdvOps = {};
AdvOps.styleCache = {};
import { merge } from "jquery";
import KFK from "./console";

AdvOps.treeMap = new Map();
AdvOps.spaceMap = new Map();
AdvOps.HSpace = 40;
AdvOps.VSpace = 20;

/* 获得一个DIV位于哪个页面上 */
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

/* 获得一个图形处于哪个页面上 */
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

/* 移动单个对象到指定的页面 */
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

/* 移动单个DIV到指定页面 */
AdvOps.moveSingleDiv = async function(div, pindex) {
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
  } finally {
    KFK.endTrx();
  }
  if (div) KFK.scrollToNode(div);
  else if (shape) KFK.scrollToShape(shape);
};

AdvOps.getChildren = async function(jqNode) {
  let children = [];
  let childrenIds = KFK.getNodeLinkIds(jqNode, "linkto");
  for (let i = 0; i < childrenIds.length; i++) {
    let jqChild = $(`#${childrenIds[i]}`);
    children.push(jqChild);
  }
  return children;
};

AdvOps.uniquefyKfkObjectArray = function(array) {
  let tmp = [];
  for (let i = 0; i < array.length; i++) {
    let found = false;
    for (let j = 0; j < tmp.length; j++) {
      console.log("j=", j);
      console.log(typeof tmp);
      console.log(typeof tmp[j]);
      if (tmp[j].id === array[i].id) {
        found = true;
        break;
      }
    }
    if (found === false) {
      tmp.push(array[i]);
    }
  }

  return tmp;
};

/**
 * 统计数组中各元素的重复数量,返回出现次数最多的元素及其出现次数, 以及排序结果
 * 例如,如果数组中元素为  [1, 2, 3, 2, 3, 2],
 * 则返回值为: {elem: 2, num: 3, [2:3, 3:2, 1:1]}
 *
 * @param {} arr
 */
AdvOps.findMost3 = function(arr) {
  let maxElem = null,
    maxNum = 0;
  let obj = arr.reduce((p, k) => {
    p[k] ? p[k]++ : (p[k] = 1);
    if (p[k] > maxNum) {
      maxElem = k;
      maxNum++;
    }

    return p;
  }, {});
  return { elem: maxElem, num: maxNum, sorted: obj };
};

AdvOps.existsInGroup = function(group, div) {
  for (let i = 0; i < group.length; i++) {
    if (group[i].attr("id") === div.attr("id")) {
      return true;
    }
  }
  return false;
};

AdvOps.getDescendants = async function(root, aParent, descendants) {
  let directChildren = await AdvOps.getChildren(aParent);
  let clearedDirectChildren = [];
  console.log("directChildren", directChildren);
  for (let i = 0; i < directChildren.length; i++) {
    //保证返回的 descendants 集合中不包含重复项
    if (
      AdvOps.existsInGroup(descendants, directChildren[i]) === false &&
      root.attr("id") !== directChildren[i].attr("id")
    ) {
      clearedDirectChildren.push(directChildren[i]);
      descendants.push(directChildren[i]);
    }
  }
  console.log("clearedDirectChildren", clearedDirectChildren);

  for (let i = 0; i < clearedDirectChildren.length; i++) {
    await AdvOps.getDescendants(root, clearedDirectChildren[i], descendants);
  }
};

AdvOps.collapseDescendants = async function(jqNode) {
  let descendants = [];
  await AdvOps.getDescendants(jqNode, jqNode, descendants);
  console.log(descendants.length);
  for (let i = 0; i < descendants.length; i++) {
    console.log("collapse", descendants[i].attr("id"));
    descendants[i].addClass("nodisplay");
    await AdvOps.hideConnection(descendants[i]);
  }
  await AdvOps.hideConnection(jqNode);
};

/**
 * Expand (show) all descendants of a node
 *
 * jqNode - the node whose descendants to expand
 * ALOE - true|false, Auto Layout On Expand
 */
AdvOps.expandDescendants = async function(jqNode) {
  let descendants = [];
  await AdvOps.getDescendants(jqNode, jqNode, descendants);
  for (let i = 0; i < descendants.length; i++) {
    console.log("expand", descendants[i].attr("id"));
    descendants[i].removeClass("nodisplay");
    descendants[i]
      .find(".ec_button")
      .removeClass("ec_collapsed")
      .addClass("ec_expanded");
    await AdvOps.showConnection(descendants[i]);
  }
  await AdvOps.showConnection(jqNode);
};

/**
 * 遍历脑图树
 *
 *  jqNode - 从这个节点开始遍历
 */
AdvOps.traverseTree = async function(jqNode) {
  let myId = jqNode.attr("id");
  let children = await AdvOps.getChildren(jqNode);
  if (children.length > 0) {
    AdvOps.spaceMap.set(myId, 0);
    for (let i = 0; i < children.length; i++) {
      let childId = children[i].attr("id");
      if (AdvOps.treeMap.has(childId) === false) {
        //第一个父节点为真正父节点，其它为参考父节点
        AdvOps.treeMap.set(childId, myId);
      }
      await AdvOps.traverseTree(children[i]);
    }
  } else {
    let myHeight = KFK.divHeight(jqNode);
    AdvOps.spaceMap.set(myId, myHeight);
    await AdvOps.reverseAddSpace(myId, myHeight);
  }
};

AdvOps.reverseAddSpace = async function(myId, myHeight) {
  if (AdvOps.treeMap.has(myId)) {
    let parentId = AdvOps.treeMap.get(myId);
    let tmp1 = AdvOps.spaceMap.get(parentId);
    if (tmp1 == 0) {
      tmp1 += myHeight;
    } else {
      tmp1 += AdvOps.VSpace + myHeight; //If this is not the first descendant, add one VSpace beforehead;
    }
    AdvOps.spaceMap.set(parentId, tmp1);
    await AdvOps.reverseAddSpace(parentId, myHeight);
  }
};

AdvOps.placeChildrenAuto = async function(jqNode) {
  let tmp =
    KFK.divTop(jqNode) +
    KFK.divHeight(jqNode) * 0.5 -
    AdvOps.spaceMap.get(jqNode.attr("id")) * 0.5;
  jqNode.removeClass("nodisplay");
  jqNode
    .find(".ec_button")
    .removeClass("ec_collapsed")
    .addClass("ec_expanded");
  await AdvOps.showConnection(jqNode);
  let children = await AdvOps.getChildren(jqNode);
  let childLeft = KFK.divLeft(jqNode) + KFK.divWidth(jqNode) + AdvOps.HSpace;
  for (let i = 0; i < children.length; i++) {
    let childSpace = AdvOps.spaceMap.get(children[i].attr("id"));
    let childTop = tmp + childSpace * 0.5 - KFK.divHeight(children[i]) * 0.5;
    children[i].css("left", childLeft);
    children[i].css("top", childTop);
    await AdvOps.placeChildrenAuto(children[i]);
    tmp = tmp + childSpace + AdvOps.VSpace;
  }
  KFK.redrawLinkLines(jqNode);
};

AdvOps.autoLayoutDescendants = async function(jqNode) {
  AdvOps.treeMap.clear();
  AdvOps.spaceMap.clear();
  await AdvOps.traverseTree(jqNode);
  await AdvOps.placeChildrenAuto(jqNode);
};

/**
 * Hide connections from a node
 *
 * jqFrom - a node from which the connections to be hiddden
 */
AdvOps.hideConnection = async function(jqFrom) {
  await AdvOps.toggleConnectionVisibility(jqFrom, false);
};

/**
 * Show connections from a node
 *
 * jqFrom - a node from which the connections to be shown
 */
AdvOps.showConnection = async function(jqFrom) {
  await AdvOps.toggleConnectionVisibility(jqFrom, true);
};

/**
 * Toggle visibility of connections from a node
 *
 * jqFrom - a node from which the visibility of the connections to be toggled
 */
AdvOps.toggleConnectionVisibility = async function(jqFrom, visible) {
  let myId = jqFrom.attr("id");
  let toIds = KFK.stringToArray(jqFrom.attr("linkto"));
  toIds.forEach((toId) => {
    let lineClassSelector = `.connect_${myId}_${toId}`;
    let triClassSelector = `.connect_${myId}_${toId}_triangle`;
    try {
      if (visible)
        KFK.svgDraw.findOne(lineClassSelector).removeClass("nodisplay");
      else KFK.svgDraw.findOne(lineClassSelector).addClass("nodisplay");
    } catch (err) {
    } finally {
    }
    try {
      if (visible)
        KFK.svgDraw.findOne(triClassSelector).removeClass("nodisplay");
      else KFK.svgDraw.findOne(triClassSelector).addClass("nodisplay");
    } catch (err) {
    } finally {
    }
  });
};

module.exports.AdvOps = AdvOps;
