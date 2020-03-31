import Vue from 'vue';
import Joi from '@hapi/joi';
import { BootstrapVue, IconsPlugin, ListGroupPlugin, VBHoverPlugin } from 'bootstrap-vue';
import events from 'events';

import "../scss/custom.scss";
import KFK from './console';
import { NodeController } from './nodeController';
import { DocController } from './docController';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ListGroupPlugin);
Vue.use(VBHoverPlugin);
const app = new Vue({
  data: {
    state: {
      profile:{
          name: null,
          oldpwd: null,
          newpwd: null,
          newpwd2: null,
      },
      reg: {
        userid: null,
        name: null,
        pwd: null,
        pwd2: null,
      }
    },
    RegUserIdState: null,
    RegUserNameState: null,
    KFK: KFK,
    seen: true,
    modalShow: false,
    modal_title: '',
    modal_text: '',
    showLOGINFORM: false,
    showCONSOLE: false,
    showCREATEROOM: false,
    showINVITATION: false,
    lockMode: KFK.lockMode,
    images: KFK.images,
    tip_groups: [
      ['tip', 'tip_heart', 'tip_callout2', 'tip_cloud', 'tip_sig'],
      ['tip_circle', 'tip_p5star', 'tip_p8star', 'tip_cubic', 'tip_clinder'],
      ['tip_circle2', 'tip_check', 'tip_cross', 'tip_thunder', 'tip_smile'],
      ['tip_circle3', 'tip_arrow', 'tip_arrow2', 'tip_arrow3', 'tip_arrow4'],
    ],
    //TODO: 没有用户信息时，显示注册页面而不是登录页面
    active: { 'pointer': true, 'tip': false, 'blanket': false, 'p8star': false, 'pin': false, 'text': false, 'yellowtip': false, 'line': false, 'textblock': false, 'lock': false, 'minimap':false, 'connect':false },
    show: {
      'wsready': false,
      'arrange_multi_nodes': false,
      'shape_property': false,
      'text_property': false,
      'customline': true,
      'waitingws': true,
      'loginform': false,
      'explorer': true,
      'actionlog': false,
      'form': { newdoc: false, newprj: false, prjlist: true, doclist: false, share: false, bottomlinks: false, explorerTabIndex: 0 },
      'section': { login: false, register: false, explorer: false, designer: false, minimap:true },
      'dialog': { inputDocPasswordDialog: false, resetDocPasswordDialog: false, userPasswordDialog: false, copyDocDialog: false },
    },
    model: {
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
      project: { prjid: '', name: '' },
      lastrealproject: { prjid: '', name: '' },
      cocodoc: { doc_id: 'dummydocnotallowed', name: '', prjid: 'dummydocnotallowed', owner: 'dummydocnotallowed', readonly: false },
      cocouser: { userid: '', name: '', avatar: 'avatar-0', avatar_src: null },
      listdocoption: {},
      listprjoption: {},
      register: { userid: '', pwd: '', pwd2: '', name: '' },
      login: { userid: '', pwd: '' },
      share: {},
      docfields: [{ key: 'name', label: '名称' }, { key: 'readonly_icon', label: '模式' }, { key: 'security_icon', label: '密保' }, { key: 'copydoc', label: '复制' }, { key: 'share_icon', label: '分享' }, { key: 'owner', label: '发起人' }, { key: 'operation', label: '操作' }],
      prjfields: [{ key: 'name', label: '名称' }, { key: 'operation', label: '操作' }],
      prjwarning: '',
      docs: [],
      prjs: [],
      perPage: 10,
      currentPrjPage: 1,
      currentDocPage: 1,
      rightTabIndex: 2,
      defaultGridWidth: 20,
      gridWidth: 20,
      snap: true,
      oldSnap: true,
      showGrid: true,
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
    }
  },
  computed: {

    prjListOptions() {
      let ret = [];
      this.model.prjs.forEach((prj, index) => {
        if (prj.prjid !== 'all' && prj.prjid !== 'mine') {
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
      let str = this.model.login.userid;
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
    setData(data, key, value) {
      this.$set(this[data], key, value);
    },

    setMode(mode) {
      KFK.setMode(mode);
    },
    KfkAlign(direction) {
      KFK.alignNodes(direction);
    },
    showGridChanged(checked) {
      console.log(`showGrid ${checked}`);
      // if (!checked) { app.setData('model', 'oldSnap', app.model.snap); app.setData('model', 'snap', false); }
      // else { app.setData('model', 'snap', app.model.oldSnap); }
      KFK.showGridChanged(checked);
    },
    snapChanged(checked) {
      console.log(`snap ${checked}`);
    },
    dragToCreateChanged(checked) {
      console.log(`dragToCreate ${checked}`);
    },
    setBGto(color) {
      console.log('Set BG to ' + color);
      this.setData('model', 'msg', color);
      $('#containerbkg')[0].style.backgroundColor = color;
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
    deletePrjItem(item, index, button) {
      console.log(item);
      console.log(index);
      this.$bvModal.msgBoxConfirm('删除项目:' + item.name, {
        title: '请确认',
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: '确认',
        cancelTitle: '取消',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value) {
            for (let i = 0; i < this.model.prjs.length; i++) {
              if (this.model.prjs[i].prjid === item.prjid) {
                KFK.deletePrj(item.prjid);
                this.model.prjs.splice(i, 1);
                break;
              }
            }
          }
        })
        .catch(err => { })
    },

    deleteDocItem(item, index, button) {
      this.$bvModal.msgBoxConfirm('删除文档:' + item.name, {
        title: '请确认',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: '确认',
        cancelTitle: '取消',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value) {
            for (let i = 0; i < this.model.docs.length; i++) {
              if (this.model.docs[i]._id === item._id) {
                KFK.deleteDoc(item._id);
                this.model.docs.splice(i, 1);
                break;
              }
            }
          }
        })
        .catch(err => { })
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
