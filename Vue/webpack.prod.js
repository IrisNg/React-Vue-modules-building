const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/scripts/[name].[hash].js',
  },
  plugins: [
    new CleanWebpackPlugin(), //remove previous build files
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: 'public/favicon.ico',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/icomoon/fonts', to: 'assets/fonts' },
        { from: 'src/assets/images/copy', to: 'assets/images' },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        //minify images
        imageminMozjpeg({
          quality: 70,
          progressive: true,
        }),
        imageminPngquant({
          quality: [0.7, 0.9],
          speed: 1,
          dithering: 1,
        }),
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].[hash].css',
    }),
  ],
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()], //minify css and js
  },
});
