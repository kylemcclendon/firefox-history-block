const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')

const stylesHandler = MiniCssExtractPlugin.loader

const config = {
    entry: {
      './history-block': './src/history-block.js',
      './popup/ExceptionsPopup': './src/popup/ExceptionsPopup.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyPlugin({
          patterns: [
            { from: "./src/popup/ExceptionsPopup.html", to: "./popup/ExceptionsPopup.html" },
            { from: "./src/popup/icon2.png", to: "./popup/icon2.png" },
            { from: "./src/manifest.json", to: "./manifest.json" },
          ],
        }),
    ],
    optimization: {
      minimizer: [new TerserPlugin({
        extractComments: false,
      })],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    mode: 'production',
}

module.exports = config
