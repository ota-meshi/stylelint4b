"use strict"

const { expect } = require("chai")
const stylelint4b = require("../../dist/stylelint4b")

const config = {
    extends: "stylelint-config-standard",
}
describe("stylelint4b", () => {
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
                expect(resultObject.output).to.equal(`
.cl {
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

    it("Sass", () =>
        stylelint4b
            .lint({
                code: `
.cl
    color: red;
`,
                codeFilename: "a.sass",
                config,
            })
            .then(resultObject => {
                const actual = resultObject.results[0].warnings
                expect(actual).to.deep.equal([
                    {
                        line: 4,
                        column: 15,
                        rule: "block-closing-brace-newline-before",
                        severity: "error",
                        text:
                            'Expected newline before "}" of a multi-line block (block-closing-brace-newline-before)',
                    },
                    {
                        line: 2,
                        column: 4,
                        rule: "block-opening-brace-space-before",
                        severity: "error",
                        text:
                            'Expected single space before "{" (block-opening-brace-space-before)',
                    },
                    {
                        line: 3,
                        column: 14,
                        rule: "declaration-block-trailing-semicolon",
                        severity: "error",
                        text:
                            "Expected a trailing semicolon (declaration-block-trailing-semicolon)",
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
})
