'use strict'
import suuid from 'short-uuid';
import Joi from '@hapi/joi';
const Demo = {};

Demo.myuid = function () {
    return suuid.generate();
}

Demo.genearteDemoUser = function () {
    return {
        userid: `demouser_${Demo.myuid()}@cocopad.com`,
        name: '演示用户',
        avatar: 'avatar-0',
    };
}
Demo.genearteDemoPrj = function () {
    return {
        prjid: 'demoprj_${Demo.myuid()}',
        name: '演示项目'
    };
};
Demo.isDemoUser = function (user) {
    let userid = "";
    if (typeof user === 'string') {
        userid = user;
    } else if (user) {
        userid = user.userid;
    } else {
        userid = "demouser_56789@cocopad.com";
    }
    // console.log('>>DEMO.isDemoUser ', userid);
    const schema = Joi.string().regex(
        /^demouser_([A-Za-z0-9_\-\.])+\@cocopad\.com$/
    ).required();
    let { error, value } = schema.validate(userid);
    if (error === undefined) {
        return true;
    } else
        return false;
}

export default Demo;