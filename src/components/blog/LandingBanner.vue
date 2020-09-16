<template>
  <v-card
    :height="$vuetify.breakpoint.xsOnly ? '00px' : `${pageHeight}`"
    dark
    color="primary"
    style="border-radius: 0px"
    flat
  >
    <v-container class="px-0 pt-6" fluid>
      <v-row v-if="isSortingEnabled">
        <v-col align="center" class="pa-0" cols="12">
          <v-card flat color="transparent">
            <div v-if="noPosts" class="display-4 font-weight-light mb-1">
              <div>
                Oh snap!
              </div>
              <div>
                We have no posts in here!
              </div>
              <v-btn text @click="$router.push('/')">
                Take me back
              </v-btn>
            </div>

            <div v-else class="display-3 font-weight-light mb-1">
              <div>
                Presenting Truecaller's
              </div>
              <div>
                <span class="display-4" style="text-transform: uppercase">
                  {{ sortingBy }}
                </span>
              </div>
            </div>
            <v-card-actions>
              <v-spacer> </v-spacer>
              <div>{{ this.$store.state.postCount }} posts in category</div>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="!isSortingEnabled && !$vuetify.breakpoint.xsOnly">
        <v-col class="pa-0" cols="4">
          <v-img
            :height="$vuetify.breakpoint.xsOnly ? '400px' : '700px'"
            style="border-radius: 0px 8px 8px 0px"
            :src="postImage"
          >
          </v-img>
        </v-col>
        <v-col class="pa-12" cols="5">
          <v-card flat color="transparent">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">{{ category }}</div>
                <v-list-item-title
                  style="white-space: normal; line-height:1.5"
                  class="display-4 mb-1"
                  >{{ postTitle }}</v-list-item-title
                >
                <div
                  class="pt-12 pb-6"
                  style="white-space: normal; line-height:1.5; font-size:18px"
                  v-html="excerpt"
                ></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions class="py-6">
              <v-btn @click="navToBlog" text dark>
                Continue Reading <v-icon small right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="author.avatar_URL" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ author.name }}</v-list-item-title>
                <v-list-item-subtitle class="overline my-1"
                  >{{ date === 0 ? "Posted Today" : date + " days ago" }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "LandingBanner",
  data() {
    return {
      noPosts: false,
    };
  },
  computed: {
    postImage() {
      return this.$store.state.posts[0]
        ? this.$store.state.posts[0].post_thumbnail.URL
        : null;
    },
    postTitle() {
      return this.$store.state.posts[0]
        ? this.$store.state.posts[0].title
        : null;
    },
    excerpt() {
      return this.$store.state.posts[0]
        ? this.$store.state.posts[0].excerpt
        : null;
    },
    author() {
      return this.$store.state.posts[0]
        ? this.$store.state.posts[0].author
        : {};
    },
    date() {
      return this.$store.state.posts[0]
        ? Math.round(
            Math.abs(+new Date() - +new Date(this.$store.state.posts[0].date)) /
              8.64e7
          )
        : null;
    },
    category() {
      if (!this.$store.state.posts[0]) return;
      const arr = Object.keys(this.$store.state.posts[0].categories);
      if (arr.length === 1) return arr[0];
      let categories = "";
      arr.forEach((category) => {
        categories += category + " | ";
      });
      return categories;
    },
    isSortingEnabled() {
      if (this.$route.query.category || this.$route.query.tag) return true;
      return this.$route.query.category || this.$route.query.tag;
    },
    sortingBy() {
      return this.$route.query.category || this.$route.query.tag;
    },
    pageHeight() {
      return this.isSortingEnabled ? "500px" : "900px";
    },
    postCount() {
      return this.$store.state.postCount;
    },
  },
  watch: {
    postCount: {
      handler(val) {
        console.log(val);
        if (val === 0) return (this.noPosts = true);
        else return (this.noPosts = false);
      },
    },
    immediate: true,
  },
  methods: {
    navToBlog() {
      const blog = this.$store.state.posts[0];
      this.$router.push(`/${blog.title}?blogId=${blog.ID}`);
    },
  },
};
</script>
