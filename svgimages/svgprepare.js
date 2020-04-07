const lineReader = require('line-reader');
const path = require('path');
const fs = require('fs');
// let svgs =['tip_smile', 'tip_callout4'];
let svgs =
["biz001", "biz002", "biz003", "biz004", "biz005", "biz006", "biz007", "biz008", "biz009", "biz010", "biz011", "biz012", "biz013", "biz014", "biz015", "biz016", "biz017", "biz018", "biz019", "biz020", "biz021", "biz022", "biz023", "biz024", "biz025", "biz026", "biz027", "biz028", "biz029", "biz030", "biz031", "biz032", "biz033", "biz034", "biz035", "biz036", "biz037", "biz038", "biz039", "biz040", "biz041", "biz042", "biz043", "biz044", "biz045", "biz04", "biz047", "biz048", "biz049", "biz050", "biz051", "biz052", "biz053", "biz054", "biz055", "biz056", "biz057", "biz058", "biz059", "biz060"]
for (let i = 0; i < svgs.length; i++) {
    const filePath = `/Users/lucas/dev/cocopad/svgimages/business/${svgs[i]}.svg`;
    let foundLines = 0;
    lineReader.eachLine(filePath, function (line) {
	foundLines ++;
	console.log(`'${svgs[i]}': '${line}',`);
    });
    if(foundLines > 1){
        throw (svgs[i] + " found more than 1 svg lines");
    }
}



