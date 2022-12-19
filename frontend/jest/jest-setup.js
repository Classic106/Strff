import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import GlobalComponents from "./globalComponents";
import VueGoodTablePlugin from "vue-good-table";
import Notifications from "vue-notification/dist/ssr.js";

Vue.use(BootstrapVue);
Vue.use(GlobalComponents);
Vue.use(VueGoodTablePlugin);
Vue.use(Notifications);
