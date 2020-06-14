//import events from "events";

const app = new Vue({
  data: {},
  computed: {},
  methods: {},
}).$mount("#app");

let urlFull = window.location.href;
let host = $(location).attr("host");
let protocol = $(location).attr("protocol");
let urlBase = protocol + "//" + host;
let urlSearch = window.location.search;
let urlPath = window.location.pathname;
console.log(urlSearch);
