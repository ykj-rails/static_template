import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'

export default {
  mode: 'production',
  entry: './src/js/app.js',
  output: {
    path: `${__dirname}/dest/js`,
    filename: 'app.js'
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          },
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                      safari: 9,
                      esmodules: true
                    },
                    useBuiltIns: 'usage',
                    corejs: 3,
                    modules: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
}
