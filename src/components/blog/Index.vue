<template>
  <!-- This component will serve as a wrapper component for all the components that will be rendered on the blog home page -->
  <layout-wrapper :loading="loading">
    <landing-banner></landing-banner>
    <v-container>
      <v-row justify="space-between" class="pa-0">
        <v-col cols="12" md="8">
          <second-section></second-section>
          <v-pagination
            v-model="pageNumber"
            class="my-4"
            total-visible="8"
            @input="navToPage"
            :length="Math.round($store.state.postCount / 25)"
          ></v-pagination>
        </v-col>
        <v-col cols="12" md="3">
          <categories v-if="this.$store.state.postCount > 0" />
        </v-col>
      </v-row>
    </v-container>
  </layout-wrapper>
</template>

<script>
import {
  fetchBlogs,
  fetchPostsbyTagOrCategory,
  fetchPostsByPage,
} from "@/business/index";
export default {
  name: "BlogsWrapper",
  data() {
    return {
      loading: true,
      pageNumber: 1,
    };
  },
  components: {
    LayoutWrapper: () => import("./PageLayout"),
    LandingBanner: () => import("./LandingBanner"),
    SecondSection: () => import("./BlogList"),
    Categories: () => import("./CategoriesAndTags"),
  },
  computed: {
    category() {
      return this.$route.query.category;
    },
    tag() {
      return this.$route.query.tag;
    },
    page() {
      return this.$route.query.page ? parseInt(this.$route.query.page) : 1;
    },
  },
  watch: {
    // setting up watcheers for instantly updating the dom
    category: {
      async handler(newVal) {
        // for watching category update. We will instabtly update the posts as and when the category changes
        this.loading = true;
        if (!newVal && !this.tag) {
          await fetchBlogs();
          this.loading = false;
          return;
        }
        await fetchPostsbyTagOrCategory("category", this.category);
        this.loading = false;
      },
      immediate: true,
    },
    tag: {
      // for watchinh tag changes. serves same purpose as category watcher but for tags
      async handler(newVal) {
        this.loading = true;
        if (!newVal && !this.category) {
          await fetchBlogs();
          this.loading = false;
          return;
        }
        await fetchPostsbyTagOrCategory("tag", this.tag);
        this.loading = false;
      },
      immediate: true,
    },
    page: {
      // for watchinh tag changes. serves same purpose as category watcher but for page
      async handler(page) {
        if (!page) return;
        this.loading = true;
        this.pageNumber = page;
        await fetchPostsByPage(page, this.category, this.tag);
        this.loading = false;
      },
    },
  },
  methods: {
    navToPage(page) {
      // to support pagination and categories. we can also use a dedicated route for categories.
      // this is just a choice to keep both as query params
      if (this.category)
        return this.$router.push(`?category=${this.category}&&page=${page}`);
      if (this.tag) return this.$router.push(`?tag=${this.tag}&&page=${page}`);
      this.$router.push(`?page=${page}`);
    },
  },
};
</script>
