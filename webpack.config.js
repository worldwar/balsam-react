const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;
const src = path.resolve(process.cwd(), '.');
const app2 = path.resolve(src, 'app');
const nodeModules = path.resolve(process.cwd(), 'node_modules');
process.env.BABEL_ENV = TARGET;
var production = (process.env.NODE_ENV === 'production');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: ['babel-polyfill',path.resolve(PATHS.app, 'index.js')]
    },
    resolve: {
        modules: [
          app2,
          nodeModules,
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.less'],
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [nodeModules]
        }, {
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: [nodeModules]
        }, {
          test: /\.(jpe?g|png|gif|svg|ico)/i,
          loader: 'file-loader?name=img/img_[hash:8].[ext]'
        }, {
          test: /\.(ttf|eot|svg|woff|woff2)/,
          loader: 'file-loader'
        }, {
          test: /\.(pdf)/,
          loader: 'file-loader'
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },{
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        }],
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        context: path.join(__dirname, 'app'),
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
                save: true
            }),
            new CopyWebpackPlugin([
                {from: 'index.html'}
            ]),
            new webpack.ProvidePlugin({
              $q: path.join(__dirname, 'app/components/global.js')
            })
        ]
    });
}

if (TARGET === 'build') {
    //module.exports = merge(common, {});
    module.exports = merge(common, {
     externals: {
        'Config': JSON.stringify(production ? require('./config.prod.json') : require('./config.dev.json'))
    },
     plugins: [new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })]
});
}
