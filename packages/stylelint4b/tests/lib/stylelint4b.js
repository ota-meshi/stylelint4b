"use strict"

const { expect } = require("chai")
const stylelint4b = require("../..")
const alias = require("../../alias")

const config = {
    extends: "stylelint-config-standard",
    overrides: [
        {
            files: ["*.scss"],
            customSyntax: "postcss-scss",
        },
        {
            files: ["*.less"],
            customSyntax: "postcss-less",
        },
        {
            files: ["*.vue"],
            customSyntax: require("postcss-html")(),
        },
    ],
}
describe("stylelint4b", () => {
    before(() =>
        alias.defineAliases({
            "postcss-scss": import("postcss-scss"),
            "postcss-less": import("postcss-less"),
        }),
    )
    it("CSS", () =>
        stylelint4b
            .lint({
                code: `
.cl {
    color: red
}
`,
                codeFilename: "a.css",
                config,
            })
            .then(resultObject => {
                const actual = resultObject.results[0].warnings
                expect(actual.map(normalizeWarning)).to.deep.equal([
                    {
                        line: 3,
                        rule: "declaration-block-trailing-semicolon",
                    },
                    {
                        line: 1,
                        rule: "no-empty-first-line",
                    },
                    {
                        line: 3,
                        rule: "indentation",
                    },
                ])
            }))
    it("CSS fix", () =>
        stylelint4b
            .lint({
                code: `
.cl {
    color: red
}
`,
                codeFilename: "a.css",
                config,
                fix: true,
            })
            .then(resultObject => {
                expect(resultObject.results[0].warnings).to.deep.equal([])
                expect(resultObject.output).to.equal(`.cl {
  color: red;
}
`)
            }))

    it("SCSS", () =>
        stylelint4b
            .lint({
                code: `
.cl {
    color: red
}
`,
                codeFilename: "a.scss",
                config,
            })
            .then(resultObject => {
                const actual = resultObject.results[0].warnings
                expect(actual.map(normalizeWarning)).to.deep.equal([
                    {
                        line: 3,
                        rule: "declaration-block-trailing-semicolon",
                    },
                    {
                        line: 1,
                        rule: "no-empty-first-line",
                    },
                    {
                        line: 3,
                        rule: "indentation",
                    },
                ])
            }))
    it("less", () =>
        stylelint4b
            .lint({
                code: `
.cl {
    color: red
}
`,
                codeFilename: "a.less",
                config,
            })
            .then(resultObject => {
                const actual = resultObject.results[0].warnings
                expect(actual.map(normalizeWarning)).to.deep.equal([
                    {
                        line: 3,
                        rule: "declaration-block-trailing-semicolon",
                    },
                    {
                        line: 1,
                        rule: "no-empty-first-line",
                    },
                    {
                        line: 3,
                        rule: "indentation",
                    },
                ])
            }))

    it("Vue SFC", () =>
        stylelint4b
            .lint({
                code: `
<style>
.cl {
    color: red
}
</style>
`,
                codeFilename: "a.vue",
                config,
            })
            .then(resultObject => {
                const actual = resultObject.results[0].warnings
                expect(actual.map(normalizeWarning)).to.deep.equal([
                    {
                        line: 4,
                        rule: "declaration-block-trailing-semicolon",
                    },
                    {
                        line: 4,
                        rule: "indentation",
                    },
                ])
            }))
})

/** Normalize */
function normalizeWarning(w) {
    return {
        line: w.line,
        rule: w.rule,
    }
}
