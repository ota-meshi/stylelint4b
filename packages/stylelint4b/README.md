# stylelint4b

[stylelint] which works in browsers.

This idea and implementation is based on [eslint4b].

## Documentation

See [documentation](https://ota-meshi.github.io/stylelint4b/stylelint4b/).

## Installation

```bash
npm install stylelint4b@alpha
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

[stylelint]: https://stylelint.io/
[eslint4b]: https://www.npmjs.com/package/eslint4b
