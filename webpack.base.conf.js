const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            // vendor's CSS
            {
                test: /\.css$/,
                include:/node_modules/,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:false
                        }
                    }
                ]
            },
            //our code's CSS
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    }
                ]
            },
            // JavaScript,JSX,TS
            {
                test: /\.(tsx?|js)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env',
                              '@babel/react',{
                              'plugins': ['@babel/plugin-proposal-class-properties']}]
                },
            },
            // Images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
    ]
};
