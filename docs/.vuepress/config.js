const path = require("path")
// eslint-disable-next-line @mysticatea/node/no-extraneous-require
const webpack = require("webpack")

const DEV = process.env.NODE_ENV === "development"

const webpackAlias = {
    // eslint-disable-next-line @mysticatea/node/no-extraneous-require
    stylus: require.resolve("stylus/lib/stylus"),
    stylelint: DEV
        ? path.resolve(__dirname, "../../packages/stylelint4b")
        : path.resolve(__dirname, "../../node_modules/stylelint4b"),
    postcss: DEV
        ? path.resolve(__dirname, "../../packages/stylelint4b/packages/postcss")
        : path.resolve(
              __dirname,
              "../../node_modules/stylelint4b/packages/postcss",
          ),
    sax: require.resolve("./shim/sax"),
    glob: require.resolve("./shim/glob"),
}

const webpackPlugins = [
    new webpack.NormalModuleReplacementPlugin(
        /node_modules\/stylus\/lib\/cache\/memory\.js/u,
        // eslint-disable-next-line @mysticatea/node/no-extraneous-require
        require.resolve("stylus/lib/cache/null"),
    ),
    new webpack.DefinePlugin({
        "process.version": JSON.stringify("v12.13.0"),
        "process.platform": '"darwin"',
        "process.env": "{}",
    }),
]

module.exports = {
    base: "/stylelint4b/",
    title: "stylelint4b & vue-stylelint-editor",
    description: "stylelint which works in browsers.",

    configureWebpack: DEV
        ? {
              resolve: {
                  alias: {
                      stylelint4b: path.resolve(
                          __dirname,
                          "../../packages/stylelint4b",
                      ),
                      "vue-stylelint-editor": path.resolve(
                          __dirname,
                          "../../packages/vue-stylelint-editor",
                      ),
                      ...webpackAlias,
                  },
              },
              plugins: webpackPlugins,
          }
        : {
              resolve: {
                  alias: webpackAlias,
              },
              plugins: webpackPlugins,
          },
    head: [
        // ["link", { rel: "icon", type: "image/png", href: "/logo.png" }]
    ],
    patterns: ["**/*.md"],
    themeConfig: {
        repo: "ota-meshi/stylelint4b",
        docsRepo: "ota-meshi/stylelint4b",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,
        lastUpdated: true,

        nav: [
            { text: "stylelint4b", link: "/stylelint4b/" },
            { text: "vue-stylelint-editor", link: "/vue-stylelint-editor/" },
        ],

        sidebar: {
            "/": [
                "/",
                "/stylelint4b/",
                "/vue-stylelint-editor/",
                "/examples/",
                "/Playground.html",
            ],
        },
    },
}
