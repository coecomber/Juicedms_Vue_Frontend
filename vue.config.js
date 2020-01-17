const webpack = require("webpack");
const fs = require('fs')

module.exports = {
  devServer: {
    port: 9000,
    // https: {
    //   key: fs.readFileSync('certs/server.key'),
    //   cert: fs.readFileSync('certs/server.cert')
    // }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery"
      })
    ]
  }
};
