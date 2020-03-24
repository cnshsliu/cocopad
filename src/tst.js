let str = "<div id=\"hJgY7BK9Q3BHonoW9xQ97E\" variant=\"default\" nodetype=\"textblock\" edittable=\"true\" class=\"kfknode ui-draggable-dragging shadow1\" lastupdate=\"1585039485893\" style=\"position: absolute; top: 500px; left: 100px; width: 160px; height: 80px; z-index:      -10; padding: 2px; margin: 0px; background: rgb(255, 255, 255); display: flex; border-radius: 20px; border-style: solid; border-color: rgb(51, 51, 51); border-width: 1px; color: rgb(0, 0, 0); justify-content: center; align-items: center;\"><div class=\"innerobj\" style=\"font-size: 18px; padding: 2px;\"></div><div class=\"cocoeditors\" style=\"display: none;\"></div><div class=\"lastcocoeditor\" style=\"display: none;\"></div></div>";
function changeZIndex(str, newzi){
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