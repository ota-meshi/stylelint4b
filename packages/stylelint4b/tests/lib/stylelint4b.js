/* globals globalThis -- global */
"use strict";

const { expect } = require("chai");
const stylelint4b = require("../..");
const alias = require("../../alias");

if (typeof process === "undefined") {
  globalThis.process = {
    cwd() {
      return "";
    },
  };
}

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
};
describe("stylelint4b", () => {
  before(() =>
    alias.defineAliases({
      "postcss-scss": import("postcss-scss"),
      "postcss-less": import("postcss-less"),
    }),
  );
  it("CSS", () =>
    stylelint4b
      .lint({
        code: `
.cl {
    color: #ff0000
}
`,
        codeFilename: "a.css",
        config,
      })
      .then((resultObject) => {
        const actual = resultObject.results[0].warnings;
        expect(actual.map(normalizeWarning)).to.deep.equal([
          {
            line: 3,
            rule: "color-hex-length",
          },
        ]);
      }));
  it("CSS fix", () =>
    stylelint4b
      .lint({
        code: `
.cl {
    color: #ff0000
}
`,
        codeFilename: "a.css",
        config,
        fix: true,
      })
      .then((resultObject) => {
        expect(resultObject.results[0].warnings).to.deep.equal([]);
        expect(resultObject.output).to.equal(`
.cl {
    color: #f00
}
`);
      }));

  it("SCSS", () =>
    stylelint4b
      .lint({
        code: `
.cl {
    color: #ff0000
}
`,
        codeFilename: "a.scss",
        config,
      })
      .then((resultObject) => {
        const actual = resultObject.results[0].warnings;
        expect(actual.map(normalizeWarning)).to.deep.equal([
          {
            line: 3,
            rule: "color-hex-length",
          },
        ]);
      }));
  it("less", () =>
    stylelint4b
      .lint({
        code: `
.cl {
    color: #ff0000
}
`,
        codeFilename: "a.less",
        config,
      })
      .then((resultObject) => {
        const actual = resultObject.results[0].warnings;
        expect(actual.map(normalizeWarning)).to.deep.equal([
          {
            line: 3,
            rule: "color-hex-length",
          },
        ]);
      }));

  it("Vue SFC", () =>
    stylelint4b
      .lint({
        code: `
<style>
.cl {
    color: #ff0000
}
</style>
`,
        codeFilename: "a.vue",
        config,
      })
      .then((resultObject) => {
        const actual = resultObject.results[0].warnings;
        expect(actual.map(normalizeWarning)).to.deep.equal([
          {
            line: 4,
            rule: "color-hex-length",
          },
        ]);
      }));
});

/** Normalize */
function normalizeWarning(w) {
  return {
    line: w.line,
    rule: w.rule,
  };
}
