<template>
  <!-- This is a component that displayes the list to blogs available  -->
  <v-container>
    <v-row>
      <v-col cols="12" class="pa-5" md="6" v-for="blog in blogs" :key="blog.id">
        <v-card
          style="border-radius:0px"
          class="mx-auto"
          color="transparent"
          flat
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="blog.post_thumbnail ? blog.post_thumbnail.URL : ''"
          >
            <v-card-title
              class="subtitle-1"
              style="background-color:rgba(12,39,58,.6);white-space:nowrap"
              >{{ blog.title }}</v-card-title
            >
          </v-img>

          <v-card-subtitle class="overline px-0">{{
            setCategories(blog.categories)
          }}</v-card-subtitle>

          <v-card-text class="pa-0 text--primary">
            <div v-html="blog.excerpt.slice(0, 160) + '...'"></div>
            <!-- <div>Whitsunday Island, Whitsunday Islands</div> -->
          </v-card-text>

          <v-card-actions class="pa-0">
            <v-btn text @click="navToBlog(blog.ID)">
              Continue Reading <v-icon small right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>

          <v-card-actions class="px-0">
            <v-list class="pa-0" color="transparent">
              <v-list-item class="pa-0">
                <v-list-item-avatar>
                  <v-img :src="blog.author.avatar_URL" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ blog.author.name }}</v-list-item-title>
                  <v-list-item-subtitle class="overline my-1">{{
                    calcDate(blog.date) === 0
                      ? "Posted Today"
                      : calcDate(blog.date) + " days ago"
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BlogList",
  computed: {
    blogs() {
      return this.$store.state.posts;
    },
  },
  methods: {
    setCategories(obj) {
      // function that converts all available categories in the map to string
      const arr = Object.keys(obj);
      if (arr.length === 1) return arr[0];
      let categories = "";
      arr.forEach((category) => {
        categories += category + " | ";
      });
      return categories;
    },
    calcDate(d) {
      // to determine how many days before the post was made
      return Math.round(Math.abs(+new Date() - +new Date(d)) / 8.64e7);
    },
    navToBlog(blogId) {
      // router navigation
      const blog = this.$store.state.posts.filter(
        (post) => post.ID == blogId
      )[0];

      this.$router.push(`/${blog.title}?blogId=${blog.ID}`);
    },
  },
};
</script>
