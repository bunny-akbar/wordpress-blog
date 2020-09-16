<template>
  <div class="sticky--card">
    <v-card color="transparent" flat height="80px"> </v-card>
    <v-card flat class="app-shadow">
      <v-list class="pa-4" flat>
        <v-subheader>Categories</v-subheader>
        <v-chip
          v-for="category in categories"
          :key="category.id"
          class="ma-1"
          color="#8d99a2"
          small
          dark
          text-color="white"
          @click="refreshPosts('category', category.slug)"
        >
          {{ category.name }}
        </v-chip>
      </v-list>
      <v-list class="pa-4" flat>
        <v-subheader>Top Tags</v-subheader>
        <v-chip
          v-for="tag in tags"
          :key="tag.id"
          class="ma-1"
          color="#555555"
          label
          small
          dark
          text-color="white"
          @click="refreshPosts('tag', tag.slug)"
        >
          {{ tag.name }}
        </v-chip>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Categories",
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    tags() {
      return this.$store.state.topTags;
    },
  },
  methods: {
    pickColor() {
      const random = Math.random();
      console.log(random);
      if (random <= 0) return this.pickColor();
      return `rgba(12, 39, 58, ${random})`;
    },
    refreshPosts(by, value) {
      this.$router.push(`?${by}=${value}`);
    },
  },
};
</script>
