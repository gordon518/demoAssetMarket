const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const proxy = require('http-proxy-middleware')
const baseConfig = require('./webpack.base.conf.js')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        port: 3000,
        proxy: [
            {
                context: [`/api/*`],
                target: 'http://localhost:8888',
                secure: false
            }
        ],
        open: false,
    },
    plugins: [
        // Only update what has changed on hot reload
        new webpack.HotModuleReplacementPlugin(),
    ],
})
