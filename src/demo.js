'use strict'
import suuid from 'short-uuid';
import Joi from '@hapi/joi';
const Demo = {};

Demo.isDemoUser = function (user) {
    let str = "demo@cocopaddemo.com";
    if(user.userid){
        str = user.userid;
    }else if(typeof user === 'string'){
        str = user;
    }else{
        return false;
    }
    return str.indexOf('@cocopaddemo.com')>0;
}

export default Demo;