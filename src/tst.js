var myDemo = require('./demo');

let demouser = Demo.genearteDemoUser();
console.log(demouser, "is", Demo.isDemoUser(demouser));

let str = "<div id=\"hJgY7BK9Q3BHonoW9xQ97E\" variant=\"default\" nodetype=\"textblock\" edittable=\"true\" class=\"kfknode ui-draggable-dragging shadow1\" lastupdate=\"1585039485893\" style=\"position: absolute; top: 500px; left: 100px; width: 160px; height: 80px; z-index:      -10; padding: 2px; margin: 0px; background: rgb(255, 255, 255); display: flex; border-radius: 20px; border-style: solid; border-color: rgb(51, 51, 51); border-width: 1px; color: rgb(0, 0, 0); justify-content: center; align-items: center;\"><div class=\"innerobj\" style=\"font-size: 18px; padding: 2px;\"></div><div class=\"cocoeditors\" style=\"display: none;\"></div><div class=\"lastcocoeditor\" style=\"display: none;\"></div></div>";
function changeZIndex(str, newzi) {
    return str.replace(/z-index: *-?\d+/, `z-index: ${newzi}`);
}
console.log(str);
console.log(changeZIndex(str, 102));


let obj = {
    ab: 1,
    cd: 2,
};

for (var prop in obj) {
    console.log("Key:" + prop + "   Value:" + obj[prop]);
}

let tstmap = {}
tstmap = { 'a': ['a1', 'a2', 'a3'] };
console.log(tstmap);
let ta = tstmap['a'];
ta[2] = 'a4';
console.log(tstmap);


let KFK = {};

KFK.hisLogArr = [];
KFK.hisLogMap = {};

KFK.putHisLog = function (editor, nodeid) {
    let arrIndex = KFK.hisLogArr.indexOf(editor);
    if (arrIndex >= 0) {
        let subArr = KFK.hisLogMap[editor];
        let subIndex = subArr.indexOf(nodeid);
        if (subIndex > 0) {
            subArr.splice(subIndex, 1);
            subArr.unshift(nodeid);
        } else if (subIndex < 0) {
            subArr.unshift(nodeid);
        }
        if (arrIndex > 0) {
            KFK.hisLogArr.splice(arrIndex, 1);
            KFK.hisLogArr.unshift(editor);
        }
    } else if (arrIndex < 0) {
        KFK.hisLogArr.unshift(editor);
        KFK.hisLogMap[editor] = [nodeid];
    }
};

KFK.removeHisLog = function(nodeid){
    for(key in KFK.hisLogMap){
        let value = KFK.hisLogMap[key];
        let index = value.indexOf(nodeid);
        if(index >= 0){
            value.splice(index, 1);
        }
    }
};

KFK.getHisLog = function(){
    let ret= [];
    KFK.hisLogArr.map((val, index)=>{
        ret.push({
            editor: val,
            hislog: KFK.hisLogMap[val]
        });
    });
    return ret;
};


KFK.putHisLog('lucas', 'node1');
KFK.putHisLog('lucas', 'node2');
KFK.putHisLog('lkh', 'node1');
KFK.putHisLog('lkh', 'node3');
KFK.putHisLog('lucas', 'node1');
KFK.putHisLog('lucas', 'node3');
KFK.putHisLog('lkh', 'node1');

console.log(KFK.getHisLog());

KFK.removeHisLog('node1');
console.log(KFK.getHisLog());