import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    // truecaller home page
    path: "",
    name: "Home",
    component: () => import("@/components/blog/Index.vue"),
  },
  {
    // for blog details
    path: "/:blogName",
    component: () => import("@/components/blog/BlogDetails.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
