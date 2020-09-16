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
    errorHandler(error);
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
    errorHandler(error);
  }
}

async function fetchTags() {
  try {
    const res = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/tags`
    );
    const sorted = res.data.tags.sort((a, b) => b.post_count - a.post_count);
    const topTen = sorted.slice(0, 10);
    store.commit("SET_TOP_TAGS", topTen);
    return true;
  } catch (error) {
    errorHandler(error);
  }
}

async function fetchPostsbyTagOrCategory(type, value) {
  try {
    const res = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts?${type}=${value}&&?number=25`
    );
    store.commit("SET_POSTS", res.data.posts);
    store.commit("SET_POST_COUNT", res.data.found);
    window.scrollTo(0, 0);
    return true;
  } catch (error) {
    errorHandler(error);
  }
}

async function fetchRelatedPosts(postID) {
  try {
    const res = await axios.post(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/${postID}/related`
    );
    store.commit("SET_RELATED_POSTS", res.data.posts);
    return true;
  } catch (error) {
    errorHandler(error);
  }
}

async function fetchPostsByPage(page, category, tag) {
  try {
    let url = `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts?page=${page}&&per_page=25`;

    if (category)
      url = `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts?category=${category}&&page=${page}&&per_page=25`;
    if (tag)
      url = `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts?tag=${tag}&&page=${page}&&per_page=25`;
    const res = await axios.get(url);
    store.commit("SET_POSTS", res.data.posts);
    store.commit("SET_POST_COUNT", res.data.found);
    return true;
  } catch (error) {
    errorHandler(error);
  }
}

function errorHandler(err) {
  errorHandler(err);
  let message = null;

  if (err.response) {
    // client received an error response (5xx, 4xx)
    if (err.response.status >= 500 && err.response.status != 503)
      message = `The server ran into an internal issue. Please try again or contact admin.`;
    else if (err.response.status === 503)
      message = `Server not available at the moment. Please try again later`;
    else if (err.response.status >= 400 && err.response.status < 500)
      message = err.response.data.message + ". Please try again.";
  } else if (err.request) {
    // client never received a response, or request never left
    message = "Failed to reach the server. Please try again.";
  } else {
    // anything else
    message =
      "We encountered an unexpected error! Please try after some time or contact support.";
  }

  store.commit("TOGGLE_SNACKBAR", {
    show: true,
    message: message || "We encountered a problem! Please contact support.",
    color: "error",
  });
  return false;
}
