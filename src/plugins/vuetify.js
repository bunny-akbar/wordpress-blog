import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0f273a",
        secondary: "#062132",
        sec1: "#1f3847",
        sec2: "#384D5B",
        sec3: "#516470",
        sec4: "#6a7a84",
        sec5: "#839099",
        sec6: "#9ba6ad",
        sec7: "#b5bdc2",
        sec8: "#cdd3d6",
        sec9: "#F2F4F4",
        sec10: "#F7F8F8",
        accent: "#EA6E2E",
        error: "#F85757",
        errorSec: "#FFD7D7",
        info: "#062132",
        success: "#4cbfb0",
        warning: "#FFC107",
        iconColor: "#6a7a84",
        selectedBgColor: "#f0fbfa",
        menuColor: "#616161",
      },
      dark: {
        primary: "#0094A1",
        priA: "#4cbfb0",
        priA7: "#b7e5df",
        priA9: "eef9f8",
        priB1: "#004a51",
        priB2: "#006069",
        priB7: "#99d4d9",
        secondary: "#062132",
        sec1: "#1F3847",
        sec3: "#516470",
        sec4: "#6a7a84",
        sec5: "#839099",
        sec6: "#9ba6ad",
        sec7: "#b5bdc2",
        sec8: "#cdd3d6",
        accent: "#EA6E2E",
        error: "#F85757",
        errorSec: "#FFD7D7",
        info: "#2196F3",
        success: "#4cbfb0",
        warning: "#FFC107",
        iconColor: "#6a7a84",
        selectedBgColor: "#f0fbfa",
        menuColor: "#616161",
      },
    },
    options: {
      customProperties: true,
    },
  },
  icons: {
    iconfont: "mdi",
  },
});
