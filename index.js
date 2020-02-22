import Vue from 'vue';
import { BootstrapVue, IconsPlugin, ListGroupPlugin } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import "./scss/custom.scss";
import KFK from '/src/console';
// import 'custom.scss'; 

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
    icons: KFK.images,
  },
}).$mount("#app");
KFK.APP = app;
console.log(KFK.images['sub']);

app.setMode =  KFK.setGuiMode;
