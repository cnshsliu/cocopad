const lineReader = require('line-reader');

// let svgs =['tip_smile', 'tip_callout4'];
let svgs =
    ['tip', 'tip_cubic',
        'tip_clinder',
        'tip_diamond', 'tip_cone', 'tip_pyramid', 'tip_hexogon', 'tip_parr',
        'tip_heart', 'tip_smile',
        'tip_thunder', 'tip_cloud',
        'tip_check', 'tip_cross',
        'tip_p5star', 'tip_p8star',
        'tip_circle1', 'tip_circle2', 'tip_circle3', 'tip_circle4',
        'tip_callout1', 'tip_callout2', 'tip_callout3', 'tip_callout4',
        'tip_arrow1', 'tip_arrow2', 'tip_arrow3', 'tip_arrow4', 'tip_arrow5', 'tip_arrow6', 'tip_arrow7',
        'tip_sig0', 'tip_sig1'
    ];
for (let i = 0; i < svgs.length; i++) {
    const filePath = `/Users/lucas/dev/cocopad/assets/${svgs[i]}.svg`;
    let foundLines = 0;
    lineReader.eachLine(filePath, function (line) {
        let m = line.match(/<svg xmlns.+<\/svg>/);
        if (m) {
            let line = m[0];
            line = line.replace(/<path d=/g, '<path class="svg_main_path" d=');
            line = line.replace(/<ellipse cx/g, '<ellipse class="svg_main_path" cx');
            console.log(`'${svgs[i]}': '${line}',`)
            foundLines ++;
        }
    });
    if(foundLines > 1){
        throw (svgs[i] + " found more than 1 svg lines");
    }
    if(i === svgs.length-1){

    }
}



