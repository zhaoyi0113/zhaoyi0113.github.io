const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: [
    'babel-polyfill',
    './index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    //filename: 'app.[hash].js'
    filename: 'app.js'
  },
  module: {
    rules: [{
        test: /\.(jsx?)$/,
        exclude: /(node_modules|.tmp-globalize-webpack)/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=assets/[name].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(svg)$/i,
        use: [{
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            query: {
              svgo: {
                plugins: [{
                  removeTitle: false
                }],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      // {
      //   test: /\.(png|woff|eot|ttf|woff2)(\?.*$|$)/,
      //   loader: 'url-loader?limit=100000&mimetype=application/font-woff'
      // },
      {
        test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'resolve-url-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({ hash: false, template: 'index.html', filename: './index.html' })
  ],
  node: {
    fs: 'empty',
    module: 'empty'
  }
};
