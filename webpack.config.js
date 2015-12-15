module.exports = {
    entry: './src/js/Main.jsx',
    output: {
        path: "./dist/js",
        publicPath: "/public/",
        filename: 'Main.js'
    },
    devServer: {
        inline: true,
        port: 3000
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