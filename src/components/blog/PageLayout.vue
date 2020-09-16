<template>
  <!-- a simple layout that handles the loading time and the views -->
  <v-container
    class="pa-0"
    :style="
      loading
        ? 'background-color: rgb(12, 39, 58)'
        : 'background-color: transparent'
    "
    fluid
    fill-height
  >
    <v-row v-show="loading">
      <v-col align="center" cols="12">
        <v-card flat color="transparent">
          <div
            class="font-weight-regular white--text"
            :class="$vuetify.breakpoint.xsOnly ? 'display-3' : 'display-4'"
          >
            Working our magic... <br />
            Please hold on...
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-show="!loading">
      <v-col class="pa-0" cols="12">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PageLayoutWrapper",
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>
