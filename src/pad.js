import Vue from 'vue';
import { BootstrapVue, IconsPlugin, ListGroupPlugin, VBHoverPlugin } from 'bootstrap-vue';
import events from 'events';

import "../scss/custom.scss";
import KFK from './console';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ListGroupPlugin);
Vue.use(VBHoverPlugin);
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
      ['tip', 'tip_heart', 'tip_callout2', 'tip_cloud', 'tip_sig'],
      ['tip_circle', 'tip_p5star', 'tip_p8star', 'tip_cubic', 'tip_clinder'],
      ['tip_circle2', 'tip_check', 'tip_cross', 'tip_thunder', 'tip_smile'],
      ['tip_circle3', 'tip_arrow', 'tip_arrow2', 'tip_arrow3', 'tip_arrow4'],
    ],
    active: { 'pointer': true, 'tip': false, 'blanket': false, 'p8star': false, 'pin': false, 'text': false, 'yellowtip': false, 'line': false, 'textblock': false },
    show: {
      'arrange_multi_nodes': false,
      'shape_property': false,
      'text_property': false,
      'customline': true,
    },
    model: {
      rightTabIndex: 2,
      gridWidth: 20,
      snap: true,
      oldSnap: true,
      showGrid: true,
      dragToCreate: true,
      lineToggleMode: false,
      msg: 'hello',
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
    fullScreen() {
      KFK.toggleFullScreen();
    },
    toggleRight() {
      KFK.toggleRightPanel();
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
    handleTipHover(tip){
      console.log('Hover on ' + tip);
      // $('#tipvariant_'+tip).style.visibility= "hidden";
    },
  },
}).$mount("#app");

//To prevent listener number exceeds problems
const emitter = new events.EventEmitter();
emitter.setMaxListeners(100);
// emitter.setMaxListeners(0);

KFK.APP = app;
