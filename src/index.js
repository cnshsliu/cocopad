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
    toggle: {
      line: false,
    },
    active: { 'tip': false, 'blanket': false, 'p8star': false, 'pin': false, 'text': false, 'yellowtip': false, 'line': false, 'textblock': false },
  },
}).$mount("#app");
KFK.APP = app;
app.toggle = function (key, value) {
  this.$set(this.toggle, key, value);
  if (key === 'line') {
    $('#tool_line').attr('src', this.toggle.line ? app.images['hvline'].src : app.images['line'].src);
  }
};

app.setMode = KFK.setMode;
