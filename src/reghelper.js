let txt1 = '<meta charset="utf-8"><img src="https://svgjs.com/docs/3.0/assets/images/logo-svg-js-01d-128.png" alt="SVG.js logo"></img>';
let txt2 = 'http://localhost:1234/doc/5e831143d542dbad345e646a';
'use strict';

const RegHelper = {
  removeMeta: (txt) => {
    let g = txt.match(/<meta[^>]*>(.*)/su);
    if(g === null) return txt;
    else return g[1];
  },
  isUrl: (txt)=>{
      let g = txt.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
      if(g===null) return false;
      else return g[1];
  }
};
export {RegHelper};