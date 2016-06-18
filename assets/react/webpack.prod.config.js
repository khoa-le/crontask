//run command line to deploy: ./node_modules/webpack/bin/webpack.js --config webpack.prod.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, './'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Order the modules and chunks by occurrence.
    // This saves space, because often referenced modules
    // and chunks get smaller ids.
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract inline css from modules into separate files
    //new ExtractTextPlugin("styles/main.css"),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
