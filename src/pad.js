import Vue from 'vue';
import Joi from '@hapi/joi';
import { BootstrapVue, IconsPlugin, ListGroupPlugin, VBHoverPlugin } from 'bootstrap-vue';
import events from 'events';
import "../scss/custom.scss";
import KFK from './console';
import ACM from './accountmanage';
import EXP from './explorermanage';
import SHARE from './sharemanage';
import { NodeController } from './nodeController';
import { DocController } from './docController';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ListGroupPlugin);
Vue.use(VBHoverPlugin);
const app = new Vue({

  data: {
    selected: 'A',
    state: {
      profile: { name: null, oldpwd: null, newpwd: null, newpwd2: null, },
      reg: { userid: null, name: null, pwd: null, pwd2: null, },
      newdoc: { name: null, pwd: null, },
      newprj: { name: null, },
      copydoc: { name: null },
    },
    RegUserIdState: null,
    RegUserNameState: null,
    KFK: KFK,
    ACM: ACM,
    EXP: EXP,
    SHARE: SHARE,
    seen: true,
    modalShow: false,
    modal_title: '',
    modal_text: '',
    showSIGNINFORM: false,
    showCONSOLE: false,
    showCREATEROOM: false,
    showINVITATION: false,
    lockMode: KFK.lockMode,
    images: KFK.images,
    tip_groups: [
      {
        title: 'abcd', div: '#toolbox2', svgs:
          [
            'tip', 'tip_cubic', 'tip_clinder',
            'tip_diamond', 'tip_cone', 'tip_pyramid', 'tip_hexogon', 'tip_parr',
            'tip_heart', 'tip_smile',
            'tip_thunder', 'tip_cloud',
            'tip_check', 'tip_cross',
            'tip_p5star', 'tip_p8star',
            'tip_circle1', 'tip_circle2', 'tip_circle3', 'tip_circle4',
            'tip_callout1', 'tip_callout2', 'tip_callout3', 'tip_callout4',
            'tip_arrow1', 'tip_arrow2', 'tip_arrow3', 'tip_arrow4', 'tip_arrow5', 'tip_arrow6', 'tip_arrow7',
            'tip_sig0', 'tip_sig1'
          ]
      },
      {
        title: 'OPQR', div: '#toolbox3', svgs:
          ["biz001", "biz002", "biz003", "biz004", "biz005", "biz006", "biz007", "biz008", "biz009", "biz010", "biz011", "biz012", "biz013", "biz014", "biz015", "biz016", "biz017", "biz018", "biz019", "biz020", "biz021", "biz022", "biz023", "biz024", "biz025", "biz026", "biz027", "biz028", "biz029", "biz030", "biz031", "biz032", "biz033", "biz034", "biz035", "biz036", "biz037", "biz038", "biz039", "biz040", "biz041", "biz042", "biz043", "biz044", "biz045", "biz04", "biz047", "biz048", "biz049", "biz050", "biz051", "biz052", "biz053", "biz054", "biz055", "biz056", "biz057", "biz058", "biz059", "biz060"],
      }
    ],
    toolActiveState: { 'pointer': true, 'tip': false, 'blanket': false, 'p8star': false, 'pin': false, 'text': false, 'yellowtip': false, 'line': false, 'textblock': false, 'lock': false, 'minimap': false, 'connect': false, 'clean': false },
    docNavTabIndex: 0,
    show: {
      'loading': false,
      'waiting': true,
      'wsready': false,
      'arrange_multi_nodes': false,
      'shape_property': false,
      'customfont': false,
      'customline': true,
      'signinform': false,
      'explorer': true,
      'actionlog': false,
      'form': { newdoc: false, newprj: false, prjlist: true, doclist: false, share: false, bottomlinks: false, explorerTabIndex: 0 },
      'section': { signin: false, register: false, explorer: false, designer: false, minimap: true },
      'dialog': { inputDocPasswordDialog: false, resetDocPasswordDialog: false, userPasswordDialog: false, copyDocDialog: false, setAclDialog: false, pasteContentDialog: false, MsgBox: false, shareDialog: false },
    },
    model: {
      readonlyDesc: '只读',
      currentDoc: { acl: 'O' },
      invitor: { usrid: '', name: '' },
      showHelp: false,
      accordion: { myorg: true },
      org: {
        neworg: {
          name: '',
        },
        newuserid: '',
        changeorgname: '',
      },
      share: { code: '', email: '', lifeshare: false, msg: '临时分享, 48小时后过期', url: '' },
      signInButWaitVerify: false,
      regForShared: false, //是否是接受到分享链接的用户来注册？
      loading_value: 0,
      msgbox: { title: '', content: '' },
      connect: {
        color: 'red', width: 3,
        triangle: {
          width: 1,
          color: 'blue',
          fill: 'blue'
        }
      },
      line: {
        color: '#306EF6', width: 6, linecap: false,
      },
      paste: {
        content: '',
        display: '',
        box: 'none',
        ctype: 'text',
        showcontent: false,
        showdisplay: false,
        showbox: false,
        options: [
          { item: 'none', name: '无' },
          { item: 'border', name: '仅边框' },
          { item: 'all', name: '边框和底色' },
        ],
      },
      avatarLoaded: false,
      copyToPrjId: null,
      actionlog: [],
      profileToSet: {
        name: '',
        avatar: 'avatar-0',
        oldpwd: '',
        newpwd: '',
      },
      check: { copyOrMove: 'copy' },
      hidepassword: true,
      inputUserPwd: '',
      docOldPwd: '',
      docNewPwd: '',
      newprjname: '',
      newdocname: '',
      newdocpwd: '',
      opendocpwd: '',
      docLoaded: false,
      cocoprj: { prjid: 'all', name: '我最近使用过的白板' },
      lastrealproject: { prjid: '', name: '' },
      cocodoc: { doc_id: 'dummydocnotallowed', name: '', prjid: 'dummydocnotallowed', owner: 'dummydocnotallowed', readonly: false, ownerAvatar_src: '../assets/cocopad.svg' },
      cocouser: { userid: '', name: '', avatar: 'avatar-0', avatar_src: null },
      cocoorg: { orgid: 'ORGID', name: 'ORGNAME', logo: 'corp-0', logo_src: '', owner: '', ownername: '张三' },
      orgusers: {},
      vorgs: [],
      myorgs: [],
      listdocoption: {},
      listprjoption: {},
      register: { userid: '', pwd: '', pwd2: '', name: '', step: 'reg', code: '' },
      signin: { userid: '', pwd: '' },
      docfields: [{ key: 'name', label: '文档名称' }, { key: 'owner', label: '发起人' }, { key: 'readonly_icon', label: '只读' }, { key: 'protect_icon', label: '密保' }, { key: 'acl', label: '权限范围' }, { key: 'operations', label: '其它', variant: 'danger' }],
      vorgfields: [{ key: 'name', label: '名称' }, { key: 'owner', label: '发起人' }, { key: 'operations', label: '相关操作' }],
      myorgfields: [{ key: 'name', label: '名称' }, { key: 'grade', label: '等级' }, { key: 'operations', label: '相关操作' }],
      useridfields: [{ key: 'userid', label: '用户ID' }, { key: 'operations', label: '操作', variant: 'danger' }],
      prjfields: [{ key: 'name', label: '项目名称' }, { key: 'operations', label: '相关操作' }],
      prjwarning: '',
      docs: [],
      prjs: [],
      perPage: 15,
      currentPrjPage: 1,
      currentDocPage: 1,
      rightTabIndex: 2,
      defaultGridWidth: 20,
      gridWidth: 20,
      oldSnap: true,
      cococonfig: {
        bgcolor: '#ABABAB',
        snap: true,
        showgrid: true,
        showlock: true,
        showbounding: true,
      },
      dragToCreate: true,
      lineToggleMode: false,
      msg: '',
      tipBkgColor: '#f7f7c6',
      shapeBkgColor: '#ffffff',
      lineColor: '#000000',
      lineWidth: 1,
      padbkgcolor: [
        '#C2FFFB', '#D0C8E8', '#FEE8E7', '#E8DFC8', '#B9FFA6',
        '#C2D3FF', '#C8D1E8', '#E8EFFE', '#E8EFFE', '#E8EFFE'
      ],
      textAlign: 'center',
      textAlignOptions: [
        { value: 'flex-start', text: '靠左' },
        { value: 'center', text: '居中' },
        { value: 'flex-end', text: '靠右' }
      ],
      vertAlign: 'center',
      vertAlignOptions: [
        { value: 'flex-start', text: '顶部' },
        { value: 'center', text: '中部' },
        { value: 'flex-end', text: '底部' }
      ],
      showEditor: 'last',
      showEditors: [
        { value: 'none', text: '不显示' },
        { value: 'last', text: '最后一个' },
        { value: 'all', text: '列出全部' }
      ],
      isDemoEnv: true,
      svgs: {},
      svgsData: {},
    }
  },
  computed: {
    prjListOptions() {
      let ret = [];
      this.model.prjs.forEach((prj, index) => {
        if (['all', 'others', 'mine'].indexOf(prj.prjid) < 0) {
          ret.push({
            value: prj.prjid,
            text: prj.name,
          })
        }
      })
      return ret;
    },
    avatarListOptions() {
      let ret = [];
      this.model.avatars.forEach((prj, index) => {
        ret.push({
          value: prj.prjid,
          text: prj.name,
        })
      })
      return ret;
    },

    doccount() {
      return this.model.docs.length;
    },
    prjcount() {
      return this.model.prjs.length;
    },
    userIdState() {
      const schema = Joi.string().regex(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        // 邮箱地址
      ).required();
      let str = this.model.signin.userid;
      let { error, value } = schema.validate(str);
      if (error === undefined)
        return true;
      else
        return false;
    },


    docNameState() {
      const schema = Joi.string().regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/).required();
      let str = this.model.newdocname;
      let { error, value } = schema.validate(str);
      if (error === undefined)
        return true;
      else
        return false;
    },
    copyToDocNameState() {
      const schema = Joi.string().regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/).required();
      let str = this.model.copyToDocName;
      let { error, value } = schema.validate(str);
      if (error === undefined)
        return true;
      else
        return false;
    },
    prjNameState() {
      const schema = Joi.string().regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/).required();
      let str = this.model.newprjname;
      let { error, value } = schema.validate(str);
      if (error === undefined)
        return true;
      else
        return false;
    },
  },
  methods: {
    getInvitationUrl() {
      if (this.model.cocouser.ivtcode === null) {
        return '';
      } else {
        let jloc = $(location);
        return jloc.attr('protocol') + "//" + jloc.attr('host') + "/r/" + this.model.cocouser.ivtcode;
      }
    },
    getAvatarSrc(name) {
      // console.log(">>GOt avatar: ", name);
      if (this.model.avatars && this.model.avatars[name])
        return this.model.avatars[name].src;
      else
        return $('#defaultavatar').attr('src');
    },
    toggleHidePassword() {
      this.setData('model', 'hidepassword', !this.model.hidepassword);
    },
    focusOnPwdInput() {
      this.setData('model', 'passwordinputok', "show");
      this.$refs.focusThis.focus();
    },
    focusOnOldPwdInput() {
      this.$refs.focusOldPwd.focus();
    },
    focusOnUserPwdInput() {
      this.$refs.focusUserPwd.focus();
    },
    async setData(data, key, value) {
      await this.$set(this[data], key, value);
    },

    setMode(mode) {
      KFK.setMode(mode);
    },
    KfkAlign(direction) {
      KFK.alignNodes(direction);
    },

    dragToCreateChanged(checked) {
      console.log(`dragToCreate ${checked}`);
    },
    save() {
      KFK.save();
    },
    textAlignChanged() {
      KFK.textAlignChanged();
    },
    vertAlignChanged() {
      KFK.vertAlignChanged();
    },
    setTipVariant(tip) {
      KFK.setTipVariant(tip);
    },
    showEditorChanged(show_editor) {
      KFK.onShowEditorChanged(show_editor);
    },
    changeSVGFill() {
      KFK.changeSVGFill();
    },
    handleTipHover(tip) {
      console.log('Hover on ' + tip);
      // $('#tipvariant_'+tip).style.visibility= "hidden";
    },
  },
}).$mount("#app");

//To prevent listener number exceeds problems
const emitter = new events.EventEmitter();
emitter.setMaxListeners(0);
// emitter.setMaxListeners(0);
DocController.KFK = KFK;
NodeController.KFK = KFK;
KFK.DocController = DocController;
KFK.NodeController = NodeController;
KFK.APP = app;
