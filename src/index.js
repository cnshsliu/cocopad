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
    toggle: { line: false, },
    active: { 'pointer': true, 'tip': false, 'blanket': false, 'p8star': false, 'pin': false, 'text': false, 'yellowtip': false, 'line': false, 'textblock': false },
    show: {
      'arrange_multi_nodes': false,
      'shape_property': false,
    },
    model: {
      rightTabIndex: 0,
      gridWidth: 20,
      snap: true,
      oldSnap: true,
      showGrid: true,
    }
  },
}).$mount("#app");
KFK.APP = app;
app.setData = function (data, key, value) {
  this.$set(this[data], key, value);
};
app.KfkAlign = function (direction) {
  KFK.alignNodes(direction);
}
app.toggle = function (key, value) {
  this.$set(this.toggle, key, value);
  if (key === 'line') {
    $('#tool_line').attr('src', this.toggle.line ? app.images['hvline'].src : app.images['line'].src);
  }
};
app.showGridChanged = function (checked) {
  console.log(`showGrid ${checked}`);
  if (!checked) {
    app.setData('model', 'oldSnap', app.model.snap);
    app.setData('model', 'snap', false);
  }
  else {
    app.setData('model', 'snap', app.model.oldSnap);
  }
  KFK.showGridChanged(checked);
}

app.snapChanged = function (checked) {
  console.log(`snap ${checked}`);
}

app.setMode = KFK.setMode;
