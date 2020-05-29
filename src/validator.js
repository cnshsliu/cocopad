"use strict";

const Validator = {};

Validator.validateDocName = function(str) {
  let regex = /^[a-z A-Z0-9_\u4e00-\u9fa5]{3,20}$/;
  if (str.match(regex) && str.trim().length >= 3) return true;
  else return false;
};

Validator.validateUserId = function(str) {
  let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return str.match(regex) !== null;
};
Validator.validateMobile = function(str) {
  let regex = /^1[3-9]\d{9}$/;
  return str.match(regex) !== null;
};

Validator.validateUserPassword = function(str) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
  // 至少8个字符，至少1个大写字母，1个小写字母，1个数字和1个特殊字符：
  return str.match(regex) !== null;
};

Validator.validateOrgName = function(str) {
  const regex1 = /^[a-z A-Z0-9_\u4e00-\u9fa5]{4,20}$/;
  const regex2 = /^[\u4e00-\u9fa5]{4,20}$/;
  if (str.match(regex1) && str.trim().length >= 4) return true;
  if (str.match(regex2)) return true;
  return false;
};

Validator.validateUserName = function(str) {
  const regex1 = /^[a-z A-Z0-9_\u4e00-\u9fa5]{4,10}$/;
  const regex2 = /^[\u4e00-\u9fa5]{2,10}$/;
  if (str.match(regex1) && str.trim().length >= 4) return true;
  if (str.match(regex2)) return true;
  return false;
};

Validator.validatePrjName = function(str) {
  const regex = /^[a-z A-Z0-9_\u4e00-\u9fa5]{3,20}$/;
  if (str.match(regex) && str.trim().length >= 3) return true;
  else return false;
};

export default Validator;
