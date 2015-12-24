module.exports = {
  entry: './src/js/Main.js',
  output: {
    path: "./dist/js",
    publicPath: "/public/",
    filename: 'Main.js'
  },
  devServer: {
    inline: true,
    port: 3000,
    host: '127.0.0.1',
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
