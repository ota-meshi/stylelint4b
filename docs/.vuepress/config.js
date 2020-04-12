module.exports = {
    base: "/stylelint4b/",
    title: "stylelint4b",
    description: "stylelint4b",
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
            "/": ["/", "/stylelint4b/", "/vue-stylelint-editor/"],
        },
    },
}
