<template>
    <vue-stylelint-editor
        v-model="code"
        class="hero-playground-block"
        fix
        :stylelint="stylelint"
        :style="{ height }"
        :config="config"
        dark
        :format="format"
        language="css"
        filename="a.css"
    >
    </vue-stylelint-editor>
</template>

<script>
import VueStylelintEditor from "vue-stylelint-editor"

const CODE_DEFAULT = "a {color: #FFF; }"
export default {
    name: "HeroPlaygroundBlock",
    components: { VueStylelintEditor },
    data() {
        return {
            stylelint4b: null,
            alias: null,
            code: CODE_DEFAULT,
        }
    },
    computed: {
        format() {
            return {
                insertSpaces: true,
                tabSize: 2,
            }
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
                extends: "stylelint-config-standard",
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
            this.stylelint4b = await import("stylelint4b")
        },
    },
}
</script>
<style scoped>
.hero-playground-block {
    width: 100%;
    margin: 1em 0;
}
</style>
