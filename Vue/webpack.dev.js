const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { HotModuleReplacementPlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/scripts/[name].js',
  },
  devServer: {
    historyApiFallback: true, //Serve index.html regardless of url
    setup(app) {
      //Redirect POST request to the same url in GET
      app.post('*', (req, res) => {
        res.redirect(req.originalUrl);
      });
    },
  },
  plugins: [
    new HotModuleReplacementPlugin(), //Hot reload
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      showErrors: true,
      cache: true,
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: 'public/favicon.ico',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/icomoon/fonts', to: 'assets/fonts' }, //icomoon icons
        { from: 'src/assets/images/copy', to: 'assets/images' }, //images in sass/scss url(..)
        { from: 'src/api', to: 'api' }, //Fake api json
      ],
    }),
    new MiniCssExtractPlugin({ filename: 'assets/styles/[name].css' }), //output css into separate file rather than include inside bundle.js
  ],
});
