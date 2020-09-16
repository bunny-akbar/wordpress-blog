// this folder contains all the required business logic for the application.
// talks to any external server shall happen in the business logic, independent of any component
import axios from "axios";
import store from "@/store";

export {
  fetchBlogs,
  fetchCategories,
  fetchTags,
  fetchPostsbyTagOrCategory,
  fetchRelatedPosts,
  fetchPostsByPage,
};

const siteId = "107403796";

async function fetchBlogs() {
  // fetches first 25 posts

  try {
    const res = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts?number=25`
    );
    store.commit("SET_POSTS", res.data.posts);
    store.commit("SET_POST_COUNT", res.data.found);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function fetchCategories() {
  try {
    const res = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/categories`
    );
    store.commit("SET_CATEGORIES", res.data.categories);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function fetchTags() {
  try {
    const res = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/tags`
    );
    const sorted = res.data.tags.sort((a, b) => b.post_count - a.post_count);
    const topTen = sorted.slice(0, 10);
    console.log(topTen);
    store.commit("SET_TOP_TAGS", topTen);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function fetchPostsbyTagOrCategory(type, value) {
  try {
    const res = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts?${type}=${value}&&?number=25`
    );
    console.log(res.data);
    store.commit("SET_POSTS", res.data.posts);
    store.commit("SET_POST_COUNT", res.data.found);
    window.scrollTo(0, 0);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function fetchRelatedPosts(postID) {
  try {
    const res = await axios.post(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/${postID}/related`
    );
    console.log(res.data);
    store.commit("SET_RELATED_POSTS", res.data.posts);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function fetchPostsByPage(page, category) {
  try {
    const res = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts?category=${category}&&page=${page}&&per_page=25`
    );
    store.commit("SET_POSTS", res.data.posts);
    store.commit("SET_POST_COUNT", res.data.found);
    return true;
  } catch (error) {
    console.log(error);
  }
}
