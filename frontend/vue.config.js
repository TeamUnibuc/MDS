module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.API_URL,
        changeOrigin: true
      },
    }
  }
};
