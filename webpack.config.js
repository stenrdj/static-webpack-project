// webpack v4
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        hot: true,
        port: 9000
      },
    entry: { 'app.js': './src/script/app.js' , 'core.css' : './src/scss/app.scss'},
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.(html|vue)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [{loader: 'css-loader', options: { url: false }}, 'sass-loader']
                    })
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [{loader: 'css-loader', options: { url: false }}, 'sass-loader']
                    })
            }, {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }, {
                test: /\.(svg|png|jpg|jpeg)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: 'core.css'}),
        new CopyWebpackPlugin([
            {from:'src/images',to:'images'}
        ]),
    ]
};
