"use strict"

const webpack = require("webpack")

const nodeLibAlias = Object.fromEntries(
    Object.entries(require("node-libs-browser")).filter(([_, v]) => v),
)
module.exports = {
    resolve: {
        alias: {
            ...nodeLibAlias,
            "require-shim": require.resolve("../src/require-shim"),
            // dummy node.js modules
            fs: require.resolve("../src/alias/fs"),
            // replace module
            "import-fresh": require.resolve("../src/alias/import-fresh"),
            browserslist: require.resolve("../src/alias/browserslist"),
            cosmiconfig: require.resolve("../src/alias/cosmiconfig"),
            "css-functions-list$": require.resolve(
                "../src/alias/css-functions-list",
            ),
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
            "css-functions-list/index.json": require.resolve(
                "../node_modules/css-functions-list/cjs/index.json",
            ),
            // ignore modules
            "write-file-atomic": require.resolve(
                "../src/alias/write-file-atomic",
            ),
            globby: require.resolve("../src/alias/globby"),
            "fast-glob": require.resolve("../src/alias/fast-glob"),
            path: require.resolve("../src/alias/path"),
            module: require.resolve("../src/alias/module"),
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
            // resolve
            // ./node_modules/stylelint/lib/rules/index.js
            // Critical dependency: the request of a dependency is an expression
            {
                test: /node_modules\/stylelint\/lib\/rules\/index\.js$/u,
                loader: "string-replace-loader",
                options: {
                    search: "_importLazy\\(require\\)",
                    replace: () => "_importLazy",
                    flags: "g",
                },
            },
            {
                test: /node_modules\/stylelint\/lib\/rules\/index\.js$/u,
                loader: "string-replace-loader",
                options: {
                    search:
                        "importLazy\\(\\s*([\"'][^\"'].*[^\"'][\"']),?\\s*\\)",
                    replace: (_, params) =>
                        `importLazy(() => require(${params}))()`,
                    flags: "g",
                },
            },

            // resolve
            // ./node_modules/stylelint/lib/rules/function-no-unknown/index.js
            // Critical dependency: the request of a dependency is an expression
            {
                test: /node_modules\/stylelint\/lib\/rules\/function-no-unknown\/index\.js$/u,
                loader: "string-replace-loader",
                options: {
                    search: "JSON.parse\\([^\\n]+\\)",
                    replace: () => "require('css-functions-list/index.json');",
                    flags: "g",
                },
            },
            {
                test: /node_modules\/stylelint\/lib\/rules\/function-no-unknown\/index\.js$/u,
                loader: "string-replace-loader",
                options: {
                    search: "new URL",
                    replace: () => "( ()=>{/*URL*/} )",
                    flags: "g",
                },
            },
            {
                test: /node_modules\/.*\.js$/u,
                loader: "string-replace-loader",
                options: {
                    search: "process.cwd\\s*\\(\\)",
                    replace: "''",
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
        new webpack.DefinePlugin({
            "process.platform": '"b"',
            "process.cwd": "(()=>'')",
        }),
        new webpack.ProvidePlugin({
            // $: 'jquery'
        }),
    ],
}
