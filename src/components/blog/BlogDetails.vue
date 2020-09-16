<template>
  <!-- This component will be rendered as the view for an individual blog details i.e., the user can from this link, read the contents of the blog -->
  <v-container fill-height>
    <v-row>
      <v-col cols="12" class="mt-12 pt-12">
        <v-card flat color="transparent">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ category }}</div>
              <v-list-item-title
                style="white-space: normal; line-height:1.5"
                class="display-4 mb-1"
                >{{ blog.title }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="blog.author.avatar_URL" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ blog.author.name }}</v-list-item-title>
              <v-list-item-subtitle class="overline my-1"
                >{{
                  new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(blog.date))
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <div align="center" class="pa-5">
            <v-img :src="blog.post_thumbnail.URL"> </v-img>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="space-between" class="pa-0">
      <v-col cols="12" md="8">
        <div class="pa-5" v-html="blog.content"></div>
        <!-- <second-section></second-section> -->
      </v-col>
      <v-col cols="12" md="3">
        <div class="sticky--card">
          <v-card color="transparent" flat height="80px"> </v-card>
          <v-card flat class="app-shadow">
            <v-list class="pa-4" flat>
              <v-subheader>Related Posts</v-subheader>
              {{ relatedPosts.length === 0 ? `No related posts` : "" }}
              <v-list-item v-for="post in relatedPosts" :key="post.ID">
                <v-list-item-content>
                  <v-list-item-title> {{ post }}</v-list-item-title>
                  <v-list-item-subtitle></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchRelatedPosts } from "@/business/index";
export default {
  name: "BlogDetails",
  data() {
    return {
      // since the APIs send the categories as maps, We will convert the keys to a string
      category: "",
    };
  },
  computed: {
    blogID() {
      return this.$route.query.blogId;
    },
    blog() {
      if (!this.blogID) return;
      const blog = this.$store.state.posts.filter(
        (post) => post.ID == this.blogID
      )[0];
      return blog;
    },
    relatedPosts() {
      return this.$store.state.relatedPosts;
    },
  },
  watch: {
    // setting up watcheers fpr instantly updating the dom
    blog: {
      async handler(val) {
        console.log(val);
        const arr = Object.keys(val.categories);
        if (arr.length === 1) return (this.category = arr[0]);
        let categories = "";
        arr.forEach((category) => {
          categories += category + " | ";
        });
        this.category = categories;
      },
      immediate: true,
      deep: true,
    },
    blogId: {
      // updating in watchers, for easy updation
      async handler(id) {
        await fetchRelatedPosts(id);
      },
      immediate: true,
    },
  },
  async mounted() {
    // since we are just updating the view(done to optimize performance), we will have to scroll to the top or to an ID when
    // we land on this component. Here I am just scrolling to the top
    window.scrollTo(0, 0);
  },
};
</script>

<style>
h2 {
  padding-top: 32px;
  line-height: 3;
}
h3 {
  padding-top: 12px;
  line-height: 3;
}
p {
  text-align: justify;
}
img {
  height: 100%;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
}
</style>
