/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.1.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2023 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";
import VueSweetalert2 from 'vue-sweetalert2';
import VueToastr from "vue-toastr";

// import axios from 'axios'
// import VueAxios from 'vue-axios'
import store from "./store";
import axios from "axios";
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// router setup
import router from "./routes/routes";
import 'sweetalert2/dist/sweetalert2.min.css';

import "./registerServiceWorker";
// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);
Vue.use(VueSweetalert2);
Vue.use(VueToastr);
// Vue.use(VueAxios, axios)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store
});
