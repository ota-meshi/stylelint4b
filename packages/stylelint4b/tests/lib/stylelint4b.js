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
                expect(actual).to.deep.equal([
                    {
                        line: 3,
                        column: 14,
                        rule: "declaration-block-trailing-semicolon",
                        severity: "error",
                        text:
                            "Expected a trailing semicolon (declaration-block-trailing-semicolon)",
                    },
                    {
                        line: 1,
                        column: 1,
                        rule: "no-empty-first-line",
                        severity: "error",
                        text: "Unexpected empty line (no-empty-first-line)",
                    },
                    {
                        line: 3,
                        column: 5,
                        rule: "indentation",
                        severity: "error",
                        text: "Expected indentation of 2 spaces (indentation)",
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
                expect(actual).to.deep.equal([
                    {
                        line: 3,
                        column: 14,
                        rule: "declaration-block-trailing-semicolon",
                        severity: "error",
                        text:
                            "Expected a trailing semicolon (declaration-block-trailing-semicolon)",
                    },
                    {
                        line: 1,
                        column: 1,
                        rule: "no-empty-first-line",
                        severity: "error",
                        text: "Unexpected empty line (no-empty-first-line)",
                    },
                    {
                        line: 3,
                        column: 5,
                        rule: "indentation",
                        severity: "error",
                        text: "Expected indentation of 2 spaces (indentation)",
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
                expect(actual).to.deep.equal([
                    {
                        line: 3,
                        column: 14,
                        rule: "declaration-block-trailing-semicolon",
                        severity: "error",
                        text:
                            "Expected a trailing semicolon (declaration-block-trailing-semicolon)",
                    },
                    {
                        line: 1,
                        column: 1,
                        rule: "no-empty-first-line",
                        severity: "error",
                        text: "Unexpected empty line (no-empty-first-line)",
                    },
                    {
                        line: 3,
                        column: 5,
                        rule: "indentation",
                        severity: "error",
                        text: "Expected indentation of 2 spaces (indentation)",
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
                expect(actual).to.deep.equal([
                    {
                        line: 4,
                        column: 14,
                        rule: "declaration-block-trailing-semicolon",
                        severity: "error",
                        text:
                            "Expected a trailing semicolon (declaration-block-trailing-semicolon)",
                    },
                    {
                        line: 4,
                        column: 5,
                        rule: "indentation",
                        severity: "error",
                        text: "Expected indentation of 2 spaces (indentation)",
                    },
                ])
            }))
})
