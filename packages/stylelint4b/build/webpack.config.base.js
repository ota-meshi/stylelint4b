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
            // resolve cjs
            "colord/plugins/names": require.resolve(
                "../node_modules/colord/plugins/names.js",
            ),
            "colord/plugins/hwb": require.resolve(
                "../node_modules/colord/plugins/hwb.js",
            ),
            "colord/plugins/lab": require.resolve(
                "../node_modules/colord/plugins/lab.js",
            ),
            "colord/plugins/lch": require.resolve(
                "../node_modules/colord/plugins/lch.js",
            ),
            // ignore modules
            "write-file-atomic": require.resolve(
                "../src/alias/write-file-atomic",
            ),
            globby: require.resolve("../src/alias/globby"),
            "fast-glob": require.resolve("../src/alias/fast-glob"),
        },
    },
    externals: {
        "postcss-styl": "postcss-styl",
        "postcss-sass": "postcss-sass",
        "postcss-scss": "postcss-scss",
        "postcss-less": "postcss-less",
        "postcss-html": "postcss-html",
        sugarss: "sugarss",
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
            // ./node_modules/stylelint/lib/augmentConfig.js
            // Critical dependency: the request of a dependency is an expression
            {
                test: /node_modules\/stylelint\/lib\/augmentConfig\.js$/u,
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
            "stylelint/lib/formatters/index.js",
            "stylelint/lib/utils/getModulePath.js",
            "stylelint/lib/utils/FileCache.js",
            "stylelint/lib/utils/isPathNotFoundError.js",
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
