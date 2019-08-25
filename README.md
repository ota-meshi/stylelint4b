# stylelint4b

`stylelint` which works in browsers.

## Installation

```bash
npm install stylelint4b
```

## Usage

```js
const stylelint4b = require("stylelint4b")

const config = {
    extends: "stylelint-config-standard",
}

const result = await stylelint4b
            .lint({
                code: `
.cl {
    color: red
}
`,
                codeFilename: "a.css",
                config,
                fix
            })

const warnings = resultObject.results[0].warnings
const output = resultObject.output
```