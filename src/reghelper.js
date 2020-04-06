'use strict';
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const RegHelper = {
  removeMeta: (txt) => {
    let g = txt.match(/<meta[^>]*>(.*)/su);
    if (g === null) return txt;
    else return g[1];
  },
  isUrl: (txt) => {
    let g = txt.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
    if (g === null) return false;
    else return g[1];
  },
  urlAddress: (txt) => {
    let g = txt.match(/^<a href="([^"]*")>([^<]*)<\/a>/);
    return g;
  },
  getDocIdInUrl: (pathname) => {
    let m = pathname.match(/\/doc\/(.+)\/code\/(.+)/);
    return m;
  },
  getShareCodeInUrl: (pathname) => {
    if (pathname.match(/\/share\/(.+)/)) {
      let sharecode = pathname.substring(pathname.lastIndexOf("/") + 1);
      return sharecode;
    } else {
      return null;
    }
  },
  validateEmails: (emails)=>{
    let mret = emails.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})(\s*,\s*([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4}))*$/);
    return mret;
  }

};

export default  RegHelper;