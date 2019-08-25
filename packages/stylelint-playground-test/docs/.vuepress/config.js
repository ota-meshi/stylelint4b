const path = require("path")
// eslint-disable-next-line @mysticatea/node/no-extraneous-require
const webpack = require("webpack")

// eslint-disable-next-line require-jsdoc
function resolve(seg) {
    return path.resolve(__dirname, seg)
}

module.exports = {
    base: "/",
    title: "postcss-styl-test",
    description: "postcss-styl-test",
    serviceWorker: true,
    head: [
        // ["link", { rel: "icon", type: "image/png", href: "/logo.png" }]
    ],
    configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                // eslint-disable-next-line @mysticatea/node/no-extraneous-require
                stylus: require.resolve("stylus/lib/stylus"),
                glob: require.resolve("./shim/glob"),
                "safer-buffer": require.resolve("./shim/safer-buffer"),
                sax: require.resolve("./shim/sax"),
                stylelint: resolve("../../../stylelint4b"),
                "postcss-syntax": resolve(
                    "../../../stylelint4b/packages/postcss-syntax",
                ),
                "vue-eslint-editor": resolve(
                    "../../../vue-stylelint-editor/node_modules/vue-eslint-editor",
                ),
            },
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.version": JSON.stringify("v12.13.0"),
                "process.env": "{}",
                "process.platform": '"darwin"',
            }),
        ],
    },
    themeConfig: {
        repo: "ota-meshi/stylelint4b",
        docsRepo: "ota-meshi/stylelint4b",
        docsDir: "packages/postcss-styl-test/docs",
        docsBranch: "master",
        editLinks: true,
        lastUpdated: true,
        serviceWorker: {
            updatePopup: true,
        },

        nav: [{ text: "Home", link: "/" }],
        sidebar: {
            "/": ["/"],
        },
    },
}
