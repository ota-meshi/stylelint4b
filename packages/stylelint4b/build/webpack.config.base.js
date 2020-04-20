"use strict"

const webpack = require("webpack")

module.exports = {
    resolve: {
        alias: {
            "require-shim": require.resolve("../src/require-shim"),
            // dummy node.js modules
            fs: require.resolve("../src/alias/fs"),
            // replace module
            "import-fresh": require.resolve("../src/alias/import-fresh"),
            browserslist: require.resolve("../src/alias/browserslist"),
            cosmiconfig: require.resolve("../src/alias/cosmiconfig"),
            // ignore modules
            "write-file-atomic": require.resolve(
                "../src/alias/write-file-atomic",
            ),
            globby: require.resolve("../src/alias/globby"),
        },
    },
    module: {
        rules: [
            // resolve
            // ./node_modules/postcss-syntax/...
            // Critical dependency: the request of a dependency is an expression
            {
                test: /node_modules\/stylelint\/lib\/(getPostcssResult)\.js$/u,
                loader: "string-replace-loader",
                options: {
                    search: "require\\(([^\"'].*?)\\)|require\\((.*?[^\"'])\\)",
                    replace: (_, params1, params2) =>
                        `require('require-shim')(${params1 || params2})`,
                    flags: "g",
                },
            },
            // resolve
            // ./node_modules/postcss-syntax/...
            // Critical dependency: the request of a dependency is an expression
            {
                test: /node_modules\/postcss-syntax\/(load-syntax|get-syntax|processor)\.js$/u,
                loader: "string-replace-loader",
                options: {
                    search: "require\\(([^\"'].*?)\\)|require\\((.*?[^\"'])\\)",
                    replace: (_, params1, params2) =>
                        `require('require-shim')(${params1 || params2})`,
                    flags: "g",
                },
            },
            // resolve
            // ./node_modules/@babel/core/lib/config/files/configuration.js 190:25-42
            // ./node_modules/@babel/core/lib/config/files/plugins.js 165:11-24
            // Critical dependency: the request of a dependency is an expression
            {
                test: /node_modules\/@babel\/core\/lib\/config\/files\/(configuration|plugins)\.js$/u,
                loader: "string-replace-loader",
                options: {
                    search: "require\\(\\s*([^\"'].*[^\"'])\\s*\\)",
                    replace: (_, params) =>
                        `require('require-shim')(${params})`,
                    flags: "g",
                },
            },
        ],
    },
    // optimization: {
    //     minimize: false,
    // },
    plugins: [
        ...[
            "stylelint/lib/requireRule.js",
            "stylelint/lib/dynamicRequire.js",
            "stylelint/lib/formatters/index.js",
            "stylelint/lib/utils/getModulePath.js",
            "stylelint/lib/utils/FileCache.js",
            "postcss-syntax/patch-postcss.js",
        ].map(file => {
            const reg = new RegExp(
                `node_modules/${file}`.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"),
                "u",
            )

            return new webpack.NormalModuleReplacementPlugin(
                reg,
                require.resolve(`../src/replacement/${file}`),
            )
        }),
        new webpack.ProvidePlugin({
            // $: 'jquery'
        }),
    ],
}
