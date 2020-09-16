<template>
  <v-app class="overflow-hidden">
    <v-app-bar app color="primary" dark elevate-on-scroll>
      <div class="d-flex align-center">
        <h1 @click="$router.push('/')">truecaller</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
.app-shadow {
  box-shadow: 0px 4px 12px rgba(12, 39, 58, 0.1) !important;
}
.sticky--card {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>
