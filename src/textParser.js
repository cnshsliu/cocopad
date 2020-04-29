const TP = {};
import suuid from "short-uuid";
TP.init = function (txt) {
    TP.txt = txt;
}

TP.setDimension = function (nodeWidth, nodeHeight, nodeHoriSpacing, nodeVertSpacing, rootX, rootY, rootWidth) {
    TP.nodeWidth = nodeWidth;
    TP.nodeHeight = nodeHeight;
    TP.nodeVertSpacing = nodeVertSpacing;
    TP.nodeHoriSpacing = nodeHoriSpacing;
    TP.rootX = rootX; TP.rootY = rootY;
    TP.rootWidth = rootWidth;
}

TP.parse = function (txt = undefined, cb) {
    txt && TP.init(txt);
    if (!TP.txt) return null;

    TP.nodeArr && delete TP.nodeArr;
    TP.sideLevel && delete TP.sideLevel;
    let tmp = TP.txt.split(/\n/);
    TP.nodeArr = tmp.map((str) => {
        return { str: str };
    });
    TP.procLineArr(cb);
};

TP.procLineArr = function (cb) {
    for (let i = 0; i < TP.nodeArr.length; i++) {
        TP.nodeArr[i].parent = -1;
        TP.nodeArr[i].str = TP.nodeArr[i].str.replace(/    /g, '\t');
        let m = TP.nodeArr[i].str.match(/^(\t+)(.*)/);
        if (m) {
            TP.nodeArr[i].tab = m[1].length;
            TP.nodeArr[i].str = m[2].replace(/^\s*/, '');
        } else {
            TP.nodeArr[i].tab = 0;
            TP.nodeArr[i].str = TP.nodeArr[i].str.replace(/^\s*/, '');
        }
    }
    TP.nodeArr = TP.nodeArr.filter((line) => {
        return line.str.length > 0;
    });
    for (let i = 0; i < TP.nodeArr.length; i++) {
        TP.nodeArr[i].nodeid=suuid.generate();
        TP.nodeArr[i].parent_nodeid='unknown';
        for (let j = i; j >= 0; j--) {
            if (TP.nodeArr[j].tab < TP.nodeArr[i].tab) {
                TP.nodeArr[i].parent = j;
                TP.nodeArr[i].parent_nodeid = TP.nodeArr[j].nodeid;
                break;
            }
        }
    }
    TP.markChildSide(-1);
    TP.getLevel('left');
    TP.getLevel('right');
    TP.setPos('left', 0);
    TP.setPos('right', 0);
    console.log(TP.nodeArr);
    cb(TP.nodeArr);
};

TP.childrenCount = function (idx) {
    let ret = 0;
    for (let i = 0; i < TP.nodeArr.length; i++) {
        if (TP.nodeArr[i].parent === idx)
            ret++;
    }
    return ret;
};

TP.descendantCount = function (idx) {
    TP.count = 0;
    TP._drillDown(idx);
    return TP.count;
};

TP._drillDown = function (idx) {
    TP.count += TP.childrenCount(idx);
    for (let i = 0; i < TP.nodeArr.length; i++) {
        if (TP.nodeArr[i].parent === idx) {
            TP._drillDown(i);
        }
    }
};

TP.markChildSide = function (idx) {
    if (idx === -1) {
        let level1 = TP.childrenCount(-1);
        let half = Math.round(level1 * 0.5);
        let childSer = 0;
        for (let i = 0; i < TP.nodeArr.length; i++) {
            if (TP.nodeArr[i].parent === idx) {
                if (childSer < half) {
                    TP.nodeArr[i].side = "left";
                } else {
                    TP.nodeArr[i].side = "right";
                }
                childSer++;
                TP.markChildSide(i);
            }
        }
    } else {
        for (let i = 0; i < TP.nodeArr.length; i++) {
            if (TP.nodeArr[i].parent === idx) {
                TP.nodeArr[i].side = TP.nodeArr[idx].side;
                TP.markChildSide(i);
            }
        }
    }
};

TP.getLevel = function (side, level = 0) {
    TP.sideLevel || (TP.sideLevel = { left: { max: 0, height: 0 }, right: { max: 0, height: 0 } });
    TP.sideLevel[side][level] || (TP.sideLevel[side][level] = 0);
    for (let i = 0; i < TP.nodeArr.length; i++) {
        if (TP.nodeArr[i].side === side && TP.nodeArr[i].tab === level) {
            TP.sideLevel[side][level]++;
        }
    }
    if (TP.sideLevel[side][level] > TP.sideLevel[side].max) {
        TP.sideLevel[side].max = TP.sideLevel[side][level];
        TP.sideLevel[side].height = TP.sideLevel[side].max * TP.nodeHeight +
            (TP.sideLevel[side].max - 1) * TP.nodeVertSpacing;
    }
    if (TP.sideLevel[side][level] > 0) {
        TP.getLevel(side, level + 1);
    }
};

TP.setPos = function (side, level = 0) {
    let levelSer = 0;
    for (let i = 0; i < TP.nodeArr.length; i++) {
        if (TP.nodeArr[i].side === side && TP.nodeArr[i].tab === level) {
            let levelTotalSpace = TP.sideLevel[side].height -
                TP.sideLevel[side][level] * TP.nodeHeight;
            let singleSpace = 0;
            if(TP.sideLevel[side][level]>1){
                singleSpace = levelTotalSpace / (TP.sideLevel[side][level] - 1)
            }
            let centerTop = TP.rootY - TP.sideLevel[side].height * 0.5 +
                singleSpace * levelSer + TP.nodeHeight * 0.5;
            let centerLeft = 0;
            if (side === 'right') {
                centerLeft = TP.rootX + TP.rootWidth * 0.5 +
                    (level + 1) * TP.nodeHoriSpacing + TP.nodeWidth * (level + 0.5);
            } else {
                centerLeft = TP.rootX - TP.rootWidth * 0.5 -
                    (level + 1) * TP.nodeHoriSpacing - TP.nodeWidth * (level + 0.5);
            }
            TP.nodeArr[i].top = Math.round(centerTop);
            TP.nodeArr[i].left = Math.round(centerLeft);
            console.log('side', side, 'levelSer', levelSer, 'height', TP.sideLevel[side].height,
            'totalSpace', levelTotalSpace, 'singleSpace', singleSpace,
            'nodeHeight', TP.nodeHeight, 
            'centerTop', centerTop);

            levelSer++;
        }
    }
    if (levelSer > 0) {
        TP.setPos(side, level + 1);
    }
};

TP.destroy = function () {
    TP.txt && delete TP.txt;
};

exports.TP = TP;
// let txt =
//     "elllo\n" +
//     "\n" +
//     "\tabcd\n" +
//     "        efghijklmn\n" +
//     " \n" +
//     "          a    a\n" +
//     " \t \n" +
//     " " +
//     "hello\n" +
//     "\thello2\n" +
//     "         abcd\n" +
//     "    hello3\n" +
//     "    \thello33\n" +
//     "    \thello33\n" +
//     "    \thello33\n" +
//     "    \thello33\n" +
//     "    hello4\n"
//     ;
// TP.setDimension(100, 20, 10, 10, 1000, 500, 100);
// TP.parse(txt, (arr) => {
//     console.log(arr);
// });
// console.log('-1 children:', TP.childrenCount(-1));
// console.log('-1 descendant:', TP.descendantCount(-1));
// console.log('0 children', TP.childrenCount(0));
// console.log('0 descendant', TP.descendantCount(0));
// console.log(TP.nodeArr);
// console.log(TP.sideLevel);