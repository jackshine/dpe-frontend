const path = require('path'),
    utils = require('./../utils'),
    webpack = require('webpack'),
    config = require('../../config'),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./../webpack.config.base.js'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    CompressionWebpackPlugin = require('compression-webpack-plugin'),

    env = config.prod.env;

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: true
        })
    },
    devtool: false,
    output: {
        path: config.prod.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [

        new webpack.DefinePlugin({
            'process.env': env
        }),

        new UglifyJSPlugin(),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),

        new OptimizeCSSPlugin(),

        new HtmlWebpackPlugin({
            filename: config.prod.index,
            template: './src/index.html',
            favicon: './src/assets/images/favicon.ico',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunksSortMode: 'dependency'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => (module.resource && /\.js$/.test(module.resource)
            && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0)
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../../static'),
            to: config.assetsSubDirectory,
            ignore: ['.*']
        }]),

        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })

    ]
});