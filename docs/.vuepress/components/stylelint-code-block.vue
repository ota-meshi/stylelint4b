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
        language="css"
        filename="a.css"
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
        value: {
            type: String,
            default: undefined,
        },
        fix: {
            type: Boolean,
        },
        rules: {
            type: Object,
            default() {
                return {}
            },
        },
        extends: {
            type: Array,
            default() {
                return []
            },
        },
    },

    data() {
        return {
            stylelint4b: null,
            alias: null,
            format: {
                insertSpaces: true,
                tabSize: 2,
            },
            options: {},
        }
    },
    computed: {
        code() {
            return this.value != null
                ? this.value
                : `${this.computeCodeFromSlot(this.$slots.default).trim()}\n`
        },

        height() {
            const lines = this.code.split("\n").length
            return `${Math.max(120, 20 * (1 + lines))}px`
        },
        stylelint() {
            if (!this.stylelint4b) {
                return null
            }

            return this.stylelint4b
        },
        config() {
            const alias = this.alias
            if (!alias) {
                return {}
            }

            return {
                extends: this.extends,
                rules: this.rules,
            }
        },
    },
    watch: {
        async height() {
            await this.$nextTick()

            this.$refs.editor.codeEditor.layout()
            if (this.$refs.editor.fixedCodeEditor) {
                this.$refs.editor.fixedCodeEditor.layout()
            }
        },
    },

    mounted() {
        // Load linter asynchronously.
        this.loadStylelint4b()
    },
    methods: {
        async loadStylelint4b() {
            const [stylelint4b, alias] = await Promise.all([
                import("stylelint4b"),
                import("stylelint4b/alias"),
            ])
            this.stylelint4b = stylelint4b
            this.$emit("setup", { alias })
            this.alias = alias
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
