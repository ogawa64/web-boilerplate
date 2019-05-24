const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const mode = process.env.NODE_ENV; // "development" or "production"
const baseDir = (mode === 'production') ? '../htdocs/' : '../src/';
const entries = {};
glob.sync('../src/common/js/entries/*.js').map((file)=>{
  entries[file] = path.resolve('../src', file);
});

module.exports = {
  mode: mode || 'production',
  devtool: (mode === 'development')? 'inline-source-map':false,
  entry: {
    index: path.resolve(__dirname, '../src/common/js/entries/index.js')
  },
  // entry: entries,
  output: {
    path: path.resolve(__dirname, `${baseDir}common/js/`),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {modules: false}]]
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  }
};
