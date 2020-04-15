const path = require("path")

const DEV = process.env.NODE_ENV === "development"

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
                  },
              },
          }
        : undefined,
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
