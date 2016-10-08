var appConfig = require("./config/app.config");
var webpack = require("webpack");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");

module.exports = {
    plugins: [
       new DefinePlugin({
           APP_CONFIG: appConfig
       }),
        new LoaderOptionsPlugin({
            options: {
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
                }
            }
        })

    ],
    devtool: 'source-map',
    entry: {
        "app": ["./client/ts/app/main.ts"]
    },
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.ts$/,
                loader: 'tslint',
                exclude: /(node_modules)/,
                enforce: 'pre'
            },
        ],
    }
}
