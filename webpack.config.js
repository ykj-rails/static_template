import webpack from 'webpack'

export default {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    path: `${__dirname}/dest/js`,
    filename: 'app.js'
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
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
