var path = require("path");
var webpack = require("webpack");

// webpack sets the NODE_ENV when calling it with -p or -d
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}

var webpackConfig = {
    cache: true,
    entry: "./src/scripts/index.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx-loader?insertPragma=React.DOM&harmony" } // also adds ES6 support
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
           "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ],
    resolve: {
        root: path.join(__dirname, "scripts"),
        modulesDirectories: ["node_modules"]
    }
};

if(process.env.NODE_ENV == 'production') {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = webpackConfig;
