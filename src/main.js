import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from "@/router";
import utility from "./util/utility";

Vue.config.productionTip = false;
Vue.use(ElementUI);

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(utility);


new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
