const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: false,
  chainWebpack: (config) => {
    config.module
      .rule("js")
      .exclude.add(/node_modules\/pdfjs-dist/)
      .end();
  },
});
