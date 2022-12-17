import Vue from "vue";
import GlobalComponents from "./globalComponents";
import BootstrapVue from "bootstrap-vue";
import VueGoodTablePlugin from "vue-good-table";
import vSelect from "vue-select";

Vue.use(BootstrapVue);
Vue.use(GlobalComponents);
Vue.use(VueGoodTablePlugin);
Vue.component("v-select", vSelect);
