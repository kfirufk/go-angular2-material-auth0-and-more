var ExtendedDefinePlugin = require("extended-define-webpack-plugin");
var appConfig = require("./config/app.config");
var webpack = require("webpack");

module.exports = {
    plugins: [
        new ExtendedDefinePlugin({
            APP_CONFIG: appConfig
        }),
    ],
    tslint: {
        configuration: {
            rules: {
                quotemark: [true, "double"]
            }
        },

        // tslint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // tslint does not interrupt the compilation by default
        // if you want any file with tslint errors to fail
        // set failOnHint to true
        failOnHint: true,

        // name of your formatter (optional)
        formatter: "",

        // path to directory containing formatter (optional)
        formattersDirectory: "node_modules/tslint-loader/formatters/",

        // These options are useful if you want to save output to files
        // for your continuous integration server
        fileOutput: {
            // The directory where each file"s report is saved
            dir: "./webpack-log/",

            // The extension to use for each report"s filename. Defaults to "txt"
            ext: "xml",

            // If true, all files are removed from the report directory at the beginning of run
            clean: true,

            // A string to include at the top of every report file.
            // Useful for some report formats.
            header: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<checkstyle version=\"5.7\">",

            // A string to include at the bottom of every report file.
            // Useful for some report formats.
            footer: "</checkstyle>"
        }
    },
entry: {
    "app": ["./client/ts/app/main.ts"]
},
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    resolve: {
        extensions: ["", ".js", ".ts"],
    },
    module: {
        loaders: [
            {
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
                loaders: [
                    "transform-loader/cacheable?brfs",
                    "transform-loader/cacheable?packageify"
                ]
            }, {
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
                loader: "transform-loader/cacheable?ejsify"
            }, {
                test: /\.json$/,
                loader: "json-loader"
            },

            {test: /\.ts$/, loaders: ["ts-loader"], exclude: /node_modules/},
        ],
        preLoaders: [
            {
                test: /\.ts$/,
                loader: "tslint"
            }
        ],
    }
}
