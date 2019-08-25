<template>
    <stylelint-editor
        ref="editor"
        class="stylelint-code-block"
        :stylelint="stylelint"
        :code="code"
        :style="{ height }"
        :config="config"
        :options="options"
        dark
        :fix="fix"
        :format="format"
        :language="language"
        :filename="filename"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
    />
</template>

<script>
import StylelintEditor from "vue-stylelint-editor"

export default {
    name: "StylelintCodeBlock",
    components: { StylelintEditor },
    props: {
        fix: {
            type: Boolean,
        },
        rules: {
            type: Object,
            default() {
                return {}
            },
        },
        dark: {
            type: Boolean,
        },
        filename: {
            type: String,
            default: "a.css",
        },
    },

    data() {
        return {
            stylelint4b: null,
            format: {
                insertSpaces: true,
                tabSize: 2,
            },
            options: {},
        }
    },
    computed: {
        code() {
            return `${this.computeCodeFromSlot(this.$slots.default).trim()}\n`
        },

        height() {
            const lines = this.code.split("\n").length
            return `${Math.max(120, 20 * (1 + lines))}px`
        },
        language() {
            return "css"
        },
        stylelint() {
            if (!this.stylelint4b) {
                return null
            }

            return this.stylelint4b
        },
        config() {
            const recommended = {
                ...require("stylelint-plugin-stylus/recommended"),
            }
            delete recommended.plugins
            const standard = {
                ...require("stylelint-plugin-stylus/standard"),
            }
            delete standard.plugins
            delete standard.extends
            return {
                plugins: [require("stylelint-plugin-stylus")],
                extends: ["stylelint-config-standard", recommended, standard],
                rules: {},
            }
        },
    },

    mounted() {
        // Load linter asynchronously.
        this.loadStylelint4b()
        this.loadConfig()
    },
    methods: {
        async loadStylelint4b() {
            const stylelint4b = await import("stylelint4b")
            this.stylelint4b = stylelint4b
        },
        async loadConfig() {
            const customSyntax = await import(
                "stylelint-plugin-stylus/custom-syntax"
            )
            this.options = {
                customSyntax,
            }
        },
        /**
         * @param {VNode[]} nodes
         * @returns {string}
         */
        computeCodeFromSlot(nodes) {
            if (!Array.isArray(nodes)) {
                return ""
            }
            return nodes
                .map(
                    node =>
                        node.text || this.computeCodeFromSlot(node.children),
                )
                .join("")
        },
    },
}
</script>
<style scoped>
.stylelint-code-block {
    width: 100%;
    margin: 1em 0;
}
</style>
