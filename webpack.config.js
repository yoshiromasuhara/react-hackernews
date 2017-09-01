var webpack = require('webpack')
var path = require('path')
var eslintpath = path.resolve(__dirname, 'src/')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  entry: './src/main.js',
  output: {
    path: './static',
    publicPath: '/static/',
    filename: 'build.js'
  },
  plugins: [
      new ExtractTextPlugin('app.css', {
          allChunks: true
      })
  ],
  module: {
    noParse: /es6-promise\.js$/,
    loaders: [
      {
          include: path.resolve(__dirname, './src'),
          test: /\.sass$/,
          loaders: [
              'style-loader',
              'css?modules&importLoaders=1&localIdentName=[[name]__[local]___[hash:base64:5]',
              'resolve-url',
              'sass-loader'
          ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
            comments: false,
            compact: true
        },
        loader: 'babel-loader'
      }
    ]
  },
  babel: {
    presets: ['es2015','react'],
    plugins: ['transform-runtime']
  }
}]

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
