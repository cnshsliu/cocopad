const SHARE = {};
import KFK from './console';
import RegHelper from './reghelper';
import ClipboardJs from "clipboard";
import { BIconFileEarmarkBreak, BIconFileEarmarkSpreadsheet } from 'bootstrap-vue';

SHARE.cancelShare = async function () {
    KFK.showDialog({ shareDialog: false });
};

// 这个是designer界面上的分享按钮调用的
//TODO: 是否允许临时用户继续分享？
SHARE.shareThisDoc = async function () {
    SHARE.startShare({
        D: KFK.APP.model.cocodoc.doc_id,
        O: KFK.APP.model.cocodoc.owner,
        U: KFK.APP.model.cocouser.userid,
    });
}
//这个1是文档列表中用到的，所以有item, 有index
//item是当前行的文档对象，index是其顺序
SHARE.shareDoc = async function (item, index, button) {
    SHARE.startShare({
        D: item._id,
        O: item.owner,
        U: KFK.APP.model.cocouser.userid,
    });
};
//上面两个函数一起调用过来
SHARE.startShare = async function (share) {
    let url = "http://localhost:1234/doc/";
    url = url + KFK.codeToBase64(JSON.stringify(share));
    KFK.APP.model.share.url = url;
    KFK.mergeAppData('model.share', {url: url});

    //这个dialog使用div实现的，初始设了noshow防止启动时闪现
    $('#shareDialog').removeClass('noshow');
    //向服务端要临时sharecode
    KFK.showDialog({ shareDialog: true });
    if (KFK.clipboard) { delete KFK.clipboard; }
    //注册分享按钮，实现放入剪贴板
    //借用clipboardjs的回调方法，刚好把doEmailShare也放在这里
    KFK.clipboard = new ClipboardJs("#shareItBtn", {
        text: function (trigger) {
            KFK.showDialog({ shareDialog: false });
            KFK.scrLog('分享代码已复制到剪贴板');
            return KFK.APP.model.share.url;
        }
    });
};

//由KFK转过来
SHARE.onWsMsg = async (response) => {
    switch (response.cmd) {
        case "SHARECODE":
            //收到sharecode侯，就更新相关数据
            await KFK.mergeAppData('model.share', { code: response.code });
            break;
        case 'EMAILSHARE':
            let url = response.url;
            console.log(url);
            KFK.mergeAppData('model.share', { url: url });
            $('#shareItBtn').css('visibility', 'visible');
            $('#shareItUrl').css('visibility', 'visible');
            $('#shareItOut').css('visibility', 'hidden');
            $('#shareItEmail').css('visibility', 'hidden');
            if (KFK.APP.model.share.email.trim().length > 0)
                KFK.scrLog("邮件已发送,你现在可以选择是否复制到粘贴板");
            else
                KFK.scrLog("分享以配置好,你现在可以选择是否复制到粘贴板");
            break;
        default:
            KFK.warn('SHARE receied an unknown command');
            break;
    }
};


SHARE.doEmailShare = async () => {
    let emails = KFK.APP.model.share.email.trim();
    emails = emails.replace('，', ',');
    if (emails.trim().length > 0) {
        let mret = RegHelper.validateEmails(emails);
        if (mret === null) {
            KFK.scrLog('邮件地址填写格式有误');
            return;
        }
    }
    await KFK.mergeAppData('model.share', { email: emails, name: KFK.APP.model.cocouser.name });
    //把完整的model.share送到服务器端
    KFK.sendCmd("EMAILSHARE", KFK.APP.model.share);
};



export default SHARE;