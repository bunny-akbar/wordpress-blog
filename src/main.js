import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import { fetchCategories, fetchTags } from "@/business/index.js";

Vue.config.productionTip = false;

async function init() {
  await fetchCategories();
  await fetchTags();
}

router.beforeEach(async (to, from, next) => {
  next();
});

new Vue({
  router,
  store,
  vuetify,
  components: { App },
  created() {
    init.call(this);
  },
  template: "<App/>",
}).$mount("#app");
