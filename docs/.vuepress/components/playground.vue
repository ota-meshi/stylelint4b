<template>
    <div class="playground">
        <label>FileName:</label> <input v-model.trim="filename" />
        <vue-stylelint-editor
            ref="editor"
            v-model="code"
            class="playground__editor"
            fix
            :stylelint="stylelint"
            :style="{ height: editorHeight }"
            :config="objectConfig"
            dark
            :format="format"
            :language="language"
            :filename="filename"
            @change="onChange"
        >
        </vue-stylelint-editor>
        <div class="playground__tools">
            <json-editor
                ref="jsonEditor"
                v-model="config"
                class="playground__json-editor"
                dark
                :format="format"
                :style="{ height: jsonEditorHeight }"
            ></json-editor>
            <ul class="playground__messages">
                <li v-if="configError">Config Error: {{ configError }}</li>
                <template v-for="(message, i) in messages">
                    <li :key="i">
                        [{{ message.line }}:{{ message.column }}]
                        {{ message.text }}
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import path from "path"
import VueStylelintEditor from "vue-stylelint-editor"
import JsonEditor from "./playground/components/JsonEditor.vue"
import { deserializeState, serializeState } from "./playground/state"

const CODE_DEFAULT = "a {color: #FFF; }"
const CONFIG_DEFAULT = `{
  "extends": "stylelint-config-standard"
}`
const FILENAME_DEFAULT = "test.css"
export default {
    name: "Playground",
    components: { VueStylelintEditor, JsonEditor },
    data() {
        const serializedString =
            (typeof window !== "undefined" && window.location.hash.slice(1)) ||
            ""
        const state = deserializeState(serializedString)
        return {
            stylelint4b: null,
            alias: null,
            code: state.code || CODE_DEFAULT,
            config: state.config || CONFIG_DEFAULT,
            filename: state.filename || FILENAME_DEFAULT,
            messages: [],
        }
    },
    computed: {
        objectConfig() {
            try {
                return JSON.parse(this.config)
            } catch {
                return {}
            }
        },
        configError() {
            try {
                JSON.parse(this.config)
                return ""
            } catch (e) {
                return e.message
            }
        },
        language() {
            const ext = path.extname(this.filename)
            if (!ext) {
                return "css"
            }
            switch (ext.toLowerCase()) {
                case ".js":
                case ".ts":
                    return "javascript"
                case ".html":
                case ".vue":
                    return "html"
                case ".styl":
                case ".stylus":
                    return "stylus"
                default:
                    break
            }
            return "css"
        },
        serializedString() {
            const code = CODE_DEFAULT === this.code ? undefined : this.code
            const config =
                CONFIG_DEFAULT === this.config ? undefined : this.config
            const filename =
                FILENAME_DEFAULT === this.filename ? undefined : this.filename
            const serializedString = serializeState({
                code,
                config,
                filename,
            })
            return serializedString
        },
        format() {
            return {
                insertSpaces: true,
                tabSize: 2,
            }
        },
        editorHeight() {
            const lines = this.code.split("\n").length
            return `${Math.max(120, 20 * (1 + lines))}px`
        },
        jsonEditorHeight() {
            const lines = this.config.split("\n").length
            return `${Math.max(120, 20 * (1 + lines))}px`
        },
        stylelint() {
            if (!this.stylelint4b) {
                return null
            }

            return this.stylelint4b
        },
    },
    watch: {
        serializedString(serializedString) {
            if (typeof window !== "undefined") {
                window.location.replace(`#${serializedString}`)
            }
        },
        async editorHeight() {
            await this.$nextTick()

            this.$refs.editor.codeEditor.layout()
            if (this.$refs.editor.fixedCodeEditor) {
                this.$refs.editor.fixedCodeEditor.layout()
            }
        },
        async jsonEditorHeight() {
            await this.$nextTick()

            this.$refs.jsonEditor.editor.layout()
        },
    },
    mounted() {
        // Load linter asynchronously.
        this.loadStylelint4b()

        if (typeof window !== "undefined") {
            window.addEventListener("hashchange", this.onUrlHashChange)
        }
    },
    beforeDestroey() {
        if (typeof window !== "undefined") {
            window.removeEventListener("hashchange", this.onUrlHashChange)
        }
    },
    methods: {
        async loadStylelint4b() {
            this.stylelint4b = await import("stylelint4b")
        },
        onUrlHashChange() {
            const serializedString =
                (typeof window !== "undefined" &&
                    window.location.hash.slice(1)) ||
                ""
            if (serializedString !== this.serializedString) {
                const state = deserializeState(serializedString)
                this.code = state.code || CODE_DEFAULT
                this.config = state.config || CONFIG_DEFAULT
                this.filename = state.filename || FILENAME_DEFAULT
            }
        },
        onChange({ messages }) {
            this.messages = messages || []
        },
    },
}
</script>
<style scoped>
.playground {
    width: 100%;
    margin: 1em 0;
}

.playground__editor {
    margin: 1em 0;
    max-height: calc(100vh - 200px);
}

.playground__tools {
    display: flex;
}

.playground__json-editor {
    width: 50%;
    max-height: calc(100vh - 200px);
}

.playground__messages {
    width: 50%;
    padding: 0 1em 0 4em;
    margin: 0;
    font-size: 0.8rem;
    max-height: calc(100vh - 200px);
    overflow: auto;
}
</style>
