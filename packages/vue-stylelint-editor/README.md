# vue-stylelint-editor

This package provides [Vue.js] component of a code editor for [stylelint] playgrounds.

This idea and implementation is based on [eslint4b] and [vue-eslint-editor].

**Currently only Vue2 is supported.**

## Documentation

See [documentation](https://ota-meshi.github.io/stylelint4b/vue-stylelint-editor/).

## Installation

```bash
npm install stylelint4b vue-stylelint-editor
```

## Usage

```vue
<template>
    <stylelint-editor
        :stylelint="stylelint"
        :code="code"
        :config="config"
        :options="options"
    />
</template>

<script>
import StylelintEditor from "vue-stylelint-editor"

export default {
    components: { StylelintEditor },
    props: {
        rules: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            stylelint4b: null,
            code: 'a { color: red; }'
            // stylelint config
            config: {
                extends: [
                    "stylelint-config-standard",
                ],
                rules: {},
            },
            // stylelint linting options
            options: {},
        }
    },
    computed: {
        stylelint() {
            if (!this.stylelint4b) {
                return null
            }

            return this.stylelint4b
        },
    },

    async mounted() {
        // Load linter asynchronously.
        this.stylelint4b = await import("stylelint4b")
    },
}
</script>
```


[eslint4b]: https://www.npmjs.com/package/eslint4b
[vue-eslint-editor]: https://www.npmjs.com/package/vue-eslint-editor
[stylelint]: https://stylelint.io/
[Vue.js]: https://vuejs.org/
