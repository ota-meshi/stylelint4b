<template>
    <stylelint-editor
        style="height: 300px; border: solid 1px #ddd;"
        :stylelint="stylelint4b"
        :code="code"
        :config="config"
        fix
    />
</template>

<script>
import StylelintEditor from "vue-stylelint-editor"

export default {
    components: { StylelintEditor },
    data() {
        return {
            stylelint4b: null,
            code: "a { color: red; \n}",
            // stylelint config
            config: {
                extends: ["stylelint-config-standard"],
            },
        }
    },
    async mounted() {
        // Load linter asynchronously.
        this.stylelint4b = await import("stylelint4b")
    },
}
</script>
