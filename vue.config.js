const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src/core/")],
          indentedSyntax: true,
        },
        prependData: '@import "~@/sass/main.scss"',
      },
    },
  },
  transpileDependencies: ["vuetify"],

  // This is required aswe want templates to be compiled at run time(improves performance)
  runtimeCompiler: true,

  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          "@": resolve("src"),
        },
      },
      devtool: "source-map",
    };
  },
};
