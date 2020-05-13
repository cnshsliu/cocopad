const ACM = {};
import KFK from './console';
import BossWS from "./bossws";
import Validator from "./validator";

ACM.registerUser = function () {
    let tmpRegData = KFK.APP.model.register;
    let userid = tmpRegData.userid.trim();
    let pwd = tmpRegData.pwd.trim();
    let name = tmpRegData.name.trim();
    let pwd2 = tmpRegData.pwd2.trim();
    let foundError = false;
    if(!Validator.validateUserId(userid)){
        if(!Validator.validateMobile(userid)){
            KFK.scrLog("账号格式不正确");  return;
        }
    }
    if(!Validator.validateUserName(name)){
        KFK.scrLog("全称需要是2个以上汉字或4个以上英文，最多10个");  return;
    }
    if(!Validator.validateUserPassword(pwd)){
        KFK.scrLog("密码至少8字符，必须含大小写字母数字和特殊字符");  return;
    }
    if(pwd !== pwd2){
        KFK.scrLog("两次密码输入不一致");  return;
    }
    BossWS.start(
        function () {
            BossWS.put("REGUSER", { userid: userid, pwd: pwd, name: name });
        },
        async function (response) {
            response = JSON.parse(response);
            try {
                switch (response.cmd) {
                    case "REGUSER-CODE":
                        KFK.scrLog("请检查邮箱，输入验证码");
                        await KFK.mergeAppData('model', 'register', { step: 'code' });
                        console.log('regtoken', response.sessionToken);
                        sessionStorage.setItem('regtoken', response.sessionToken);
                        break;
                    case "REGUSER-PLSVERIFY":
                        KFK.scrLog(`账号已被注册尚未验证，请重新验证`);
                        await KFK.mergeAppData('model', 'register', { step: 'code' });
                        console.log('regtoken', response.sessionToken);
                        sessionStorage.setItem('regtoken', response.sessionToken);
                        break;
                    case "REGUSER-FALSE":
                        KFK.scrLog("注册失败，请重试");
                        break;
                    case "REGUSER-DUP":
                        KFK.scrLog(`账号已被占用`);
                        break;

                }
            } catch (error) { console.log(error); }
            finally { BossWS.close(); }
        },
        0,
        'registerUser',
        'ONCE'
    );
};

ACM.resendVerifyCode = async function () {
    BossWS.start(
        function () {
            let regtoken = sessionStorage.getItem("regtoken");
            BossWS.put("RESENDCODE", { regtoken: regtoken });
        },
        async function (response) {
            response = JSON.parse(response);
            console.log(response);
            try {
                switch (response.cmd) {
                    case "REGUSER-CODE":
                        KFK.scrLog("请检查邮箱，输入验证码");
                        await KFK.mergeAppData('model', 'register', { step: 'code' });
                        sessionStorage.setItem('regtoken', response.sessionToken);
                        break;
                    case "REGUSER-FALSE":
                        KFK.scrLog(response.msg);
                        await KFK.mergeAppData('model', 'register', { step: 'code' });
                        break;
                }
            } catch (error) { console.log(error); }
            finally { BossWS.close(); }
        },
        0,
        'resendVerifyCode',
        'ONCE'
    );
};


ACM.signin = function () {
    let userid = KFK.APP.model.signin.userid;
    let pwd = KFK.APP.model.signin.pwd;
    let useridOkay = Validator.validateUserId(userid);
    let pwdOkay = Validator.validateUserPassword(pwd);
    if(!useridOkay){
        KFK.scrLog("登录名录入不符合要求");
        return;
    }
    if(!pwdOkay){
        KFK.scrLog("录入密码不符合要求");
        return;
    }
    KFK.info("singin " + userid);
    BossWS.start(
        function () {
            BossWS.put("SIGNIN", { userid: userid, pwd: pwd });
        },
        function (response) {
            response = JSON.parse(response);
            try {
                switch (response.cmd) {
                    case "SIGNIN":
                        let retuser = response.user;
                        KFK.updateCocouser(retuser);
                        KFK.resetAllLocalData();
                        KFK.APP.setData('model', 'isDemoEnv', false);
                        setTimeout(() => { KFK.checkSession(); }, 400);
                        break;
                    case "PLSSIGNIN":
                        KFK.scrLog(response.msg);
                        KFK.removeCocouser();
                        KFK.gotoSignin();
                        break;
                    case "REGUSER-CODE":
                        retuser = response.user;
                        KFK.setAppData('model', 'signInButWaitVerify', true);
                        KFK.updateCocouser(retuser);
                        KFK.scrLog("尚未验证邮箱地址，你可以继续使用，请在一周内完成邮箱验证");
                        sessionStorage.setItem('regtoken', response.user.sessionToken);
                        break;
                }
            } catch (error) { console.log(error); }
            finally { BossWS.close(); }
        },
        0,
        'signin',
        'ONCE'
    );
};


ACM.verifyRegCode = async function () {
    BossWS.start(
        function () {
            let regtoken = sessionStorage.getItem('regtoken');
            BossWS.put("VERIFYREGCODE", { code: KFK.APP.model.register.code, regtoken: regtoken });
        },
        function (response) {
            response = JSON.parse(response);
            try {
                switch (response.cmd) {
                    case "VERIFY-FALSE":
                        KFK.scrLog(response.msg);
                        break;
                    case "VERIFY-EXPIRED":
                        KFK.scrLog("验证码已过期，请重新发送");
                        break;
                    case "VERIFY-WRONGCODE":
                        KFK.scrLog("验证码错误，请重新输入");
                        break;
                    case "VERIFY-SUCCESS":
                        KFK.scrLog("验证成功，请登录");
                        sessionStorage.removeItem('regtoken');
                        localStorage.removeItem("shareCode");
                        KFK.gotoSignin();
                        break;
                    case "VERIFY-ALREAY":
                        KFK.scrLog("已验证过，请直接登录");
                        break;
                }
            } catch (error) { console.log(error); }
            finally { BossWS.close(); }
        },
        0,
        'verifyRegCode',
        'ONCE'
    );
};

export default ACM;