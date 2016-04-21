module.exports = {
  entry: './src/js/Main.js',
  output: {
    path: "./dist/js",
    filename: 'Main.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|custom)/,
        loader: 'babel',
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
}

/*
publicPath: "/public/",


devServer: {
  inline: true,
  port: 3000,
  host: '127.0.0.1',
},
*/
