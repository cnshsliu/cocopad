import Vue from 'vue';
import { BootstrapVue, IconsPlugin, ListGroupPlugin } from 'bootstrap-vue';
import "../scss/custom.scss";
import KFK from './console';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ListGroupPlugin);
const app = new Vue({
  data: {
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
      ['tipyellow',               'tipblue',            'tipred',                 'tipgreen'],
      ['tip_callout_yellow',      'tip_callout_blue',   'tip_callout_red',        'tip_callout_green'],
      ['tip_heart_yellow',        'tip_heart_blue',     'tip_heart_red',          'tip_heart_green'],
      ['tip_arrow_yellow',        'tip_arrow_blue',     'tip_arrow_red',          'tip_arrow_green'],
      ['tip_sig_yellow',          'tip_sig_blue',       'tip_sig_red',            'tip_sig_green'],
    ],
    active: { 'pointer': true, 'tip': false, 'blanket': false, 'p8star': false, 'pin': false, 'text': false, 'yellowtip': false, 'line': false, 'textblock': false },
    show: {
      'arrange_multi_nodes': false,
      'shape_property': false,
      'text_property': false,
    },
    model: {
      rightTabIndex: 0,
      gridWidth: 20,
      snap: true,
      oldSnap: true,
      showGrid: true,
      dragToCreate: true,
      lineToggleMode: false,
      msg: 'hello',
      padbkgcolor: [
        '#C2FFFB', '#D0C8E8', '#FEE8E7', '#E8DFC8', '#B9FFA6',
        '#C2D3FF', '#C8D1E8', '#E8EFFE', '#E8EFFE', '#E8EFFE'
      ],
      textAlign: 'center',
      textAlignOptions: [
        { value: 'flex-start', text: '靠左' },
        { value: 'center', text: '居中' },
        { value: 'flex-end', text: '靠右'}
      ],
      vertAlign: 'center',
      vertAlignOptions: [
        { value: 'flex-start', text: '顶部' },
        { value: 'center', text: '中部' },
        { value: 'flex-end', text: '底部'}
      ],
      showEditor: 'last',
      showEditors: [
        { value: 'none', text: '不显示' },
        { value: 'last', text: '最后一个' },
        { value: 'all', text: '列出全部'}
      ],
    }
  },
  methods: {
    setData(data, key, value) {
      this.$set(this[data], key, value);
      if (key === 'lineToggleMode')
        $('#tool_line').attr('src', this.model.lineToggleMode ? app.images['hvline'].src : app.images['line'].src);
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
    setBGto(color){
      console.log('Set BG to ' + color);
      this.setData('model', 'msg', color);
      $('#containerbkg')[0].style.backgroundColor = color;
    },
    save(){
      KFK.save();
    },
    textAlignChanged(){
      KFK.textAlignChanged();
    },
    vertAlignChanged(){
      KFK.vertAlignChanged();
    },
    fullScreen(){
      KFK.toggleFullScreen();
    },
    toggleRight(){
      KFK.toggleRightPanel();
    },
    setTip(tip){
      KFK.setTipVariant(tip);
    },
    showEditorChanged (){
      KFK.showEditorChanged();
    },
  },
}).$mount("#app");
KFK.APP = app;
