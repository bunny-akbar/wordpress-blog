import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    categories: [],
    showLoader: false,
    topTags: [],
    postCount: 0,
    relatedPosts: [],
    snackbar: {
      show: false,
      color: "",
      message: "",
    },
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = payload;
    },
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_TOP_TAGS(state, payload) {
      state.topTags = payload;
    },
    SET_POST_COUNT(state, payload) {
      state.postCount = payload;
    },
    SET_RELATED_POSTS(state, payload) {
      state.relatedPosts = payload;
    },
    TOGGLE_LOADER(state, payload) {
      state.showLoader = payload;
    },
    TOGGLE_SNACKBAR(state, payload) {
      state.snackbar = payload;
    },
  },
  actions: {},
  modules: {},
});
