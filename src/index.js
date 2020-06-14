//import events from "events";
import "../scss/custom.scss";
import FP from "./firstpage";

const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/foo", component: Foo },
    { path: "/bar", component: Bar },
  ],
});

const app = new Vue({
  router: router,
  data: {
    FP: FP,
    show: {
      reseller: true,
    },
  },
  computed: {},
  methods: {
    gotoSignin() {
      window.location = "/pad/signin";
    },
    gotoSignon() {
      window.location = "/pad/signon";
    },
  },
}).$mount("#app");

FP.startTypeWriter();
let urlFull = window.location.href;
let host = $(location).attr("host");
let protocol = $(location).attr("protocol");
let urlBase = protocol + "//" + host;
let urlSearch = window.location.search;
let urlPath = window.location.pathname;
console.log(urlSearch);
