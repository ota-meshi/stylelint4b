<template>
    <stylelint-code-block
        v-model="code"
        fix
        :extends="['stylelint-config-standard']"
    >
    </stylelint-code-block>
</template>

<script>
import StylelintCodeBlock from "./stylelint-code-block.vue"

const CODE_DEFAULT = "a {color: #FFF; }"
export default {
    name: "PlaygroundBlock",
    components: { StylelintCodeBlock },
    data() {
        return {
            code: CODE_DEFAULT,
        }
    },
}
</script>
