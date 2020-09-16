<template>
  <v-overlay v-model="$store.state.showLoader" color="secondary">
    <v-container fill-height>
      <v-row justify="center">
        <v-col align="center">
          <div
            class="font-weight-light white--text"
            :class="$vuetify.breakpoint.xsOnly ? 'display-3' : 'display-4'"
          >
            Please Wait... <br />
          </div>
          <v-progress-linear
            :size="$vuetify.breakpoint.xsOnly ? '40' : '140'"
            :width="60"
            height="4"
            rounded
            color="white"
            indeterminate
          />
        </v-col>
        <v-col v-if="false" align="center">
          <div
            class="font-weight-light white--text pt-12"
            :class="$vuetify.breakpoint.xsOnly ? 'display-3' : 'display-4'"
          >
            Please Wait... <br />
          </div>
          <v-progress-circular
            :size="$vuetify.breakpoint.xsOnly ? '40' : '140'"
            :width="60"
            height="4"
            rounded
            color="white"
            indeterminate
          />
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
export default {
  name: "LoaderGlobal",
  methods: {
    hexToRGB(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } else {
        return `rgba(${r}, ${g}, ${b})`;
      }
    },
  },
};
</script>
