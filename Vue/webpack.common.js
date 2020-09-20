const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    vendor: path.resolve(__dirname, 'src/assets/scripts/vendor.js'),
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        //Stylesheet section in each single file component
        test: /\.(sa|sc|c)ss$/,
        exclude: /main\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader', //Inject these sfc stylesheets into dom when component is loaded
          {
            loader: 'css-loader',
            options: {
              url: false, //ignore and don't bundle assets of urls in sass/scss (eg image url and icon font face imports - these will be copied over separately to output paths set in plugins section)
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            //Feed these reusable scss files into every vue single file component without having to import manually
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(__dirname, 'src/assets/styles/common/_variables.scss'),
                path.resolve(__dirname, 'src/assets/styles/common/_mixins.scss'),
                path.resolve(__dirname, 'src/assets/styles/common/_helpers.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /main\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, //outputs compiled css into separate file rather than inside bundle.js
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
              name: '[name].[contenthash].[ext]',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
};
