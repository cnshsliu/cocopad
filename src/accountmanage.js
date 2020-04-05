const ACM = {};
import KFK from './console';
import WS from "./ws";

ACM.registerUser = function () {
    let tmpRegData = KFK.APP.model.register;
    let userid = tmpRegData.userid.trim();
    let pwd = tmpRegData.pwd.trim();
    let name = tmpRegData.name.trim();
    let pwd2 = tmpRegData.pwd2.trim();
    let foundError = false;
    KFK.APP.state.reg.userid = KFK.validateUserId(userid);
    KFK.APP.state.reg.name = KFK.validateUserName(name);
    KFK.APP.state.reg.pwd = KFK.validateUserPassword(pwd);
    KFK.APP.state.reg.pwd2 = pwd === pwd2;
    if (!(
        KFK.APP.state.reg.userid &&
        KFK.APP.state.reg.name &&
        KFK.APP.state.reg.pwd &&
        KFK.APP.state.reg.pwd2
    )) {
        KFK.APP.setData("model", "register", tmpRegData);
        return;
    }
    WS.start(
        function () {
            WS.put("REGUSER", { userid: userid, pwd: pwd, name: name });
        },
        function (data) {
            data = JSON.parse(data);
            if (data.payload) {
                try {
                    switch (data.payload.cmd) {
                        case "REGUSER-CODE":
                            KFK.scrLog("请检查邮箱，输入验证码");
                            let tmpReg = KFK.APP.model.register;
                            tmpReg.step = "code";
                            KFK.setAppData('model', 'register', tmpReg);
                            console.log('regtoken', data.payload.data.sessionToken);
                            sessionStorage.setItem('regtoken', data.payload.data.sessionToken);
                            break;
                        case "REGUSER-PLSVERIFY":
                            KFK.scrLog(`账号已被注册尚未验证，请重新验证`);
                            tmpReg = KFK.APP.model.register;
                            tmpReg.step = "code";
                            KFK.setAppData('model', 'register', tmpReg);
                            console.log('regtoken', data.payload.data.sessionToken);
                            sessionStorage.setItem('regtoken', data.payload.data.sessionToken);
                            break;
                        case "REGUSER-FALSE":
                            KFK.scrLog("注册失败，请重试");
                            break;
                        case "REGUSER-DUP":
                            KFK.scrLog(`账号${data.payload.data.userid}已被占用`);
                            break;

                    }
                } catch (error) { console.log(error); }
                finally { WS.close(); }
            }
        },
        0,
        'registerUser',
        'ONCE'
    );
};

ACM.signin = function () {
    let userid = KFK.APP.model.signin.userid;
    let pwd = KFK.APP.model.signin.pwd;
    KFK.info("singin " + userid);
    WS.start(
        function () {
            WS.put("SIGNIN", { userid: userid, pwd: pwd });
        },
        function (data) {
            data = JSON.parse(data);
            if (data.payload) {
                try {
                    switch (data.payload.cmd) {
                        case "SIGNIN":
                            let retuser = data.payload.data;
                            KFK.setCocouser(retuser);
                            KFK.resetAllLocalData();
                            KFK.APP.setData('model', 'isDemoEnv', false);
                            setTimeout(() => { KFK.gotoWork(); }, 500);
                            break;
                        case "PLSSIGNIN":
                            KFK.scrLog(data.payload.error);
                            KFK.removeCocouser();
                            KFK.gotoSignin();
                            break;
                        case "REGUSER-CODE":
                            retuser = data.payload.data;
                            KFK.setAppData('model', 'signInButWaitVerify', true);
                            KFK.setCocouser(retuser);
                            KFK.scrLog("尚未验证邮箱地址，你可以继续使用，请在一周内完成邮箱验证");
                            sessionStorage.setItem('regtoken', data.payload.data.sessionToken);
                            break;
                    }
                } catch (error) { console.log(error); }
                finally { WS.close(); }
            }
        },
        0,
        'signin',
        'ONCE'
    );
};

ACM.signout = function () {
    KFK.WS.put("SIGNOUT", { userid: KFK.APP.model.cocouser.userid });
    KFK.resetAllLocalData();
    localStorage.removeItem('cocouser');
    KFK.APP.model.cocouser = {
        userid: "",
        name: "",
        avatar: "avatar-0",
        avatar_src: null
    };
};

ACM.verifyRegCode = async function () {
    WS.start(
        function () {
            let regtoken = sessionStorage.getItem('regtoken');
            WS.put("VERIFYREGCODE", { code: KFK.APP.model.register.code, regtoken: regtoken });
        },
        function (data) {
            data = JSON.parse(data);
            if (data.payload) {
                try {
                    switch (data.payload.cmd) {
                        case "VERIFY-FALSE":
                            KFK.scrLog("注册失败，请重试");
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
                            KFK.gotoSignin();
                            break;
                        case "VERIFY-ALREAY":
                            KFK.scrLog("已验证过，请直接登录");
                            break;
                    }
                } catch (error) { console.log(error); }
                finally { WS.close(); }
            }
        },
        0,
        'verifyRegCode',
        'ONCE'
    );
};

ACM.resendVerifyCode = async function () {
    WS.start(
        function () {
            let regtoken = sessionStorage.getItem("regtoken");
            WS.put("RESENDCODE", { regtoken: regtoken });
        },
        function (data) {
            data = JSON.parse(data);
            console.log(data);
            if (data.payload && data.payload.cmd) {
                try {
                    switch (data.payload.cmd) {
                        case "REGUSER-CODE":
                            KFK.scrLog("请检查邮箱，输入验证码");
                            let tmpReg = KFK.APP.model.register;
                            tmpReg.step = "code";
                            KFK.setAppData('model', 'register', tmpReg);
                            sessionStorage.setItem('regtoken', data.payload.data.sessionToken);
                            break;
                        case "REGUSER-FALSE":
                            KFK.scrLog(data.payload.msg);
                            tmpReg = KFK.APP.model.register;
                            tmpReg.step = "code";
                            KFK.setAppData('model', 'register', tmpReg);
                            break;
                    }
                } catch (error) { console.log(error); }
                finally { WS.close(); }
            }
        },
        0,
        'resendVerifyCode',
        'ONCE'
    );
};

export default ACM;