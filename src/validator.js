'use strict';
import Joi from "@hapi/joi";

const Validator = {};

Validator.validateDocName = function (str) {
    const schema = Joi.string()
        .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/)
        .required();
    let { error, value } = schema.validate(str);
    return (error === undefined || error === null);
};


Validator.validateUserId = function (str) {
    const schema = Joi.string()
        .regex(
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            // 邮箱地址  validate email address
        )
        .required();
    let { error, value } = schema.validate(str);
    return (error === undefined || error === null);
};

Validator.validateUserPassword = function (str) {
    const schema = Joi.string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
            // 至少8个字符，至少1个大写字母，1个小写字母，1个数字和1个特殊字符：
        )
        .required();
    let { error, value } = schema.validate(str);
    return (error === undefined || error === null);
};



Validator.validateOrgName = function (str) {
    const schema1 = Joi.string()
        .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{4,20}$/)
        .required();
    const schema2 = Joi.string()
        .regex(/^[\u4e00-\u9fa5]{4,20}$/)
        .required();
    let { error, value } = schema1.validate(str);
    if (!error) {
        return true;
    } else {
        let { error, value } = schema2.validate(str);
        if (!error) {
            return true;
        } else {
            return false;
        }
    }
};

Validator.validateUserName = function (str) {
    const schema1 = Joi.string()
        .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{4,10}$/)
        .required();
    const schema2 = Joi.string()
        .regex(/^[\u4e00-\u9fa5]{2,10}$/)
        .required();
    let { error, value } = schema1.validate(str);
    if (!error) {
        return true;
    } else {
        let { error, value } = schema2.validate(str);
        if (!error) {
            return true;
        } else {
            return false;
        }
    }
};

Validator.validatePrjName = function (str) {
    const schema = Joi.string()
        .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/)
        .required();
    let { error, value } = schema.validate(str);
    if (error === undefined || error === null) {
        return true;
    } else {
        return false;
    }
};


export default Validator;