const SHARE = {};
import KFK from './console';
import RegHelper from './reghelper';
import ClipboardJs from "clipboard";
import { BIconFileEarmarkBreak, BIconFileEarmarkSpreadsheet } from 'bootstrap-vue';

SHARE.cancelShare = async function () {
    KFK.mergeAppData("model.share", {code:'', emai:''});
    KFK.showDialog({shareDialog: false});
};

SHARE.shareThisDoc = async function(){
    SHARE.startShare(KFK.APP.model.cocodoc.doc_id);
}
SHARE.shareDoc = async function (item, index, button) {
    SHARE.startShare(item._id);
};
SHARE.startShare = async function(doc_id){
    await KFK.mergeAppData('model', 'share', { code: '', email: '' });
    KFK.askShareCode(doc_id);
    KFK.showDialog({ shareDialog: true });
    if (KFK.clipboard) { delete KFK.clipboard; }
    KFK.clipboard = new ClipboardJs("#shareitBtn", {
        text: function (trigger) {
            if (KFK.APP.model.share.code === '') {
                KFK.scrLog('尚未成功获得分享代码');
                KFK.showDialog({shareDialog: false});
                return "";
            } else {
                try {
                    SHARE.doEmailShare();
                } catch (error) {
                    console.log(error.message);
                }
                KFK.showDialog({shareDialog: false});
                KFK.scrLog('分享代码已复制到剪贴板');
                return KFK.dataToShare;
            }
        }
    });
};

SHARE.onWsMsg = async (response) => {
    switch (response.cmd) {
        case "SHARECODE":
            await KFK.mergeAppData('model.share', { code: response.code });
            KFK.dataToShare = `http://localhost:1234/share/${response.code}`;
            break;
        case 'EMAILSHARE':
            KFK.scrLog('分享邮件已发送, 你也可以现在到任何沟通工具中进行粘贴');
            break;
    }
};


SHARE.doEmailShare = async () => {
    let emails = KFK.APP.model.share.email.trim();
    if (emails.length === 0) { return ; }
    emails = emails.replace('，', ',');
    let mret = RegHelper.validateEmails(emails);
    if (mret === null) {
        KFK.scrLog('邮件地址填写格式有误');
        return;
    } else {
        await KFK.mergeAppData('model.share', { email: emails });
        KFK.sendCmd("EMAILSHARE", KFK.APP.model.share);
    }
};



export default SHARE;