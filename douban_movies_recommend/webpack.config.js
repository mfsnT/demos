var webpack = require('webpack')

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/dist/js',
    filename: '[name].min.js'
  },
  externals: {
     'jquery': 'jQuery'
  }
}