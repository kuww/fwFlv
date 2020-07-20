import Vue from "vue";
import App from "./App.vue";

import fw from "../packages";

Vue.use(fw);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
