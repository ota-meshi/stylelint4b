<template>
    <div
        :class="{ 'vue-stylelint-editor-dark': dark }"
        class="vue-stylelint-editor-root"
    >
        <transition name="vue-stylelint-editor-fade" @before-enter="fadeIn">
            <div
                v-if="monaco"
                key="editor"
                class="vue-stylelint-editor-swap-container"
            >
                <div ref="monaco" class="vue-stylelint-editor-monaco" />
                <div v-if="fix" class="vue-stylelint-editor-actions">
                    <label>
                        <input v-model="previewFix" type="checkbox" />
                        Preview
                    </label>
                    <button @click="applyAutofix">
                        Apply
                    </button>
                </div>
            </div>
            <div
                v-else
                key="placeholder"
                class="vue-stylelint-editor-swap-container"
            >
                <code class="vue-stylelint-editor-placeholder-code">{{
                    code
                }}</code>
                <transition name="vue-stylelint-editor-fade">
                    <div
                        v-if="monacoLoadingError"
                        key="error"
                        class="vue-stylelint-editor-placeholder-error"
                    >
                        Failed to load this editor
                    </div>
                    <div
                        v-else
                        key="loading"
                        class="vue-stylelint-editor-placeholder-loading"
                    >
                        <div
                            class="vue-stylelint-editor-placeholder-loading-icon"
                        >
                            <div />
                            <div />
                            <div />
                        </div>
                        <div
                            class="vue-stylelint-editor-placeholder-loading-message"
                        >
                            Now loading...
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
import { languageSetup } from "./languages"

const EDITOR_OPTS = {
    autoIndent: true,
    automaticLayout: true,
    find: {
        autoFindInSelection: true,
        seedSearchStringFromSelection: true,
    },
    minimap: { enabled: false },
    renderControlCharacters: true,
    renderIndentGuides: true,
    renderValidationDecorations: "on",
    renderWhitespace: "boundary",
    scrollBeyondLastLine: false,
}

/**
 * Ensure that a given value is a positive value.
 * @param {number|undefined} value The value to check.
 * @param {number} defaultValue The default value which is used if the `value` is undefined.
 * @returns {number} The positive value as the result.
 */
function ensurePositiveInt(value, defaultValue) {
    return Math.max(1, (value !== undefined ? value : defaultValue) | 0)
}

/**
 * Update the value of a given editor.
 * @param {monaco.editor.IStandaloneEditor} editor The editor to update.
 * @param {string} value The new value.
 * @returns {void}
 */
function updateValue(editor, value) {
    const model = editor.getModel()
    if (model != null && value !== model.getValue()) {
        model.setValue(value)
    }
}

/**
 * Dispose.
 * @param {any} x The target object.
 * @returns {void}
 */
function dispose(x) {
    if (x == null) {
        return
    }

    if (x.getOriginalEditor) {
        dispose(x.getOriginalEditor())
    }
    if (x.getModifiedEditor) {
        dispose(x.getModifiedEditor())
    }
    if (x.getModel) {
        dispose(x.getModel())
    }
    if (x.dispose) {
        x.dispose()
    }
}

export default {
    name: "VueStylelintEditor",

    model: {
        prop: "code",
        event: "input",
    },

    props: {
        stylelint: {
            type: null,
            default: null,
        },
        code: {
            type: String,
            default: "",
        },
        config: {
            type: Object,
            default() {
                return {
                    extends: ["stylelint-config-standard"],
                    rules: {},
                }
            },
        },
        options: {
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
        fix: {
            type: Boolean,
        },
        format: {
            type: Object,
            default() {
                return { insertSpaces: true, tabSize: 4 }
            },
        },
        language: {
            type: String,
            default: "css",
        },
    },

    data() {
        return {
            monaco: null,
            monacoLoadingError: null,
            loadLanguage: null,
            editor: null,
            editing: false,
            messages: [],
            fixedCode: this.code,
            fixedMessages: [],
            previewFix: false,
            requestFix: false,
        }
    },

    computed: {
        codeEditor() {
            const editor = this.editor
            if (editor != null) {
                if (editor.getOriginalEditor != null) {
                    return editor.getOriginalEditor()
                }
                return editor
            }
            return null
        },

        fixedCodeEditor() {
            const editor = this.editor
            if (editor != null && editor.getModifiedEditor != null) {
                return editor.getModifiedEditor()
            }
            return null
        },
    },

    watch: {
        stylelint() {
            this.invalidate()
        },

        code(value) {
            this.updateCode(value)
        },

        previewFix() {
            this.initialize()
        },

        config: {
            handler() {
                this.invalidate()
            },
            deep: true,
        },

        filename() {
            this.invalidate()
        },

        fix() {
            this.initialize()
        },

        fixedCode(value) {
            const editor = this.fixedCodeEditor
            if (editor != null) {
                updateValue(editor, value)
            }
        },

        fixedMessages(value) {
            const editor = this.fixedCodeEditor
            if (editor != null) {
                this.updateMarkers(editor, value)
            }
        },

        format(value) {
            const editor = this.codeEditor
            if (editor != null) {
                editor.getModel().updateOptions(value)
            }
        },

        messages(value) {
            const editor = this.codeEditor
            if (editor != null) {
                this.updateMarkers(editor, value)
            }
        },

        language(value) {
            const { monaco, loadLanguage } = this
            if (monaco == null) {
                // Skip because the initialization logic does this.
                return
            }

            ;(async () => {
                // Load the language editor of the current language.
                await loadLanguage(value)

                // Skip if the language is not latest
                if (value !== this.language) {
                    return
                }

                // Set the language to the current editors.
                for (const editor of [this.codeEditor, this.fixedCodeEditor]) {
                    if (editor != null) {
                        monaco.editor.setModelLanguage(editor.getModel(), value)
                    }
                }
            })().catch(error => {
                console.error("Failed to set the language '%s':", value, error)
            })
        },
    },

    mounted() {
        ;(async () => {
            // Load the monaco editor lazily.
            const { monaco, loadLanguage } = await import(
                "vue-eslint-editor/dist/monaco"
            )
            // Load the language editor of the current language.
            await loadLanguage(this.language)
            // Finish loading.
            this.monaco = monaco
            this.loadLanguage = loadLanguage
            languageSetup(monaco)
            monaco.languages.css.cssDefaults.setDiagnosticsOptions({
                validate: false,
            })
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                {
                    validate: false,
                },
            )
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                {
                    validate: false,
                },
            )
        })().catch(error => {
            console.error("Failed to load Monaco editor:", error)
            this.monacoLoadingError = error
        })
    },

    beforeDestroy() {
        dispose(this.editor)
        this.$refs.monaco.innerHTML = ""
        this.editor = null
    },

    methods: {
        fadeIn(el) {
            if (this.$refs.monaco && this.$refs.monaco.parentNode === el) {
                this.initialize()
            }
        },

        async initialize() {
            if (this.monaco != null) {
                dispose(this.editor)
                this.$refs.monaco.innerHTML = ""
                this.editor = this.previewFix
                    ? this.createTwoPaneEditor()
                    : this.createEditor()
                await this.lint()
            }
        },

        createEditor() {
            const { code, dark, format, language, messages, monaco } = this

            // Create model.
            const model = monaco.editor.createModel(code, language)
            model.updateOptions(format)
            model.onDidChangeContent(() => {
                this.$emit("input", model.getValue())
                this.invalidate()
            })

            // Create editor.
            const editor = monaco.editor.create(this.$refs.monaco, {
                model,
                theme: dark ? "vs-dark" : "vs",
                ...EDITOR_OPTS,
            })
            this.updateMarkers(editor, messages)

            return editor
        },

        createTwoPaneEditor() {
            const {
                code,
                dark,
                fixedCode,
                fixedMessages,
                format,
                language,
                messages,
                monaco,
            } = this

            // Somehow `createDiffEditor` doesn't have `model` option.
            const editor = monaco.editor.createDiffEditor(this.$refs.monaco, {
                originalEditable: true,
                theme: dark ? "vs-dark" : "vs",
                ...EDITOR_OPTS,
            })
            const original = monaco.editor.createModel(code, language)
            const modified = monaco.editor.createModel(fixedCode, language)
            const leftEditor = editor.getOriginalEditor()
            const rightEditor = editor.getModifiedEditor()

            rightEditor.updateOptions({ readOnly: true })
            original.updateOptions(format)

            // Set change event.
            original.onDidChangeContent(() => {
                const newCode = original.getValue()

                this.fixedCode = newCode
                this.$emit("input", newCode)
                this.invalidate()
            })

            // Set model.
            editor.setModel({ original, modified })

            // Set markers.
            this.updateMarkers(leftEditor, messages)
            this.updateMarkers(rightEditor, fixedMessages)

            return editor
        },

        messageToMarker(message) {
            const { monaco, stylelint } = this
            const startLineNumber = ensurePositiveInt(message.line, 1)
            const startColumn = ensurePositiveInt(message.column, 1)
            const endLineNumber = ensurePositiveInt(
                message.endLine,
                startLineNumber,
            )
            const endColumn = ensurePositiveInt(message.endColumn, startColumn)

            const docUrl =
                message.rule && stylelint.rules[message.rule]
                    ? `https://stylelint.io/user-guide/rules/${message.rule}`
                    : null
            const code = docUrl
                ? { value: message.rule, link: docUrl }
                : message.rule || "FATAL"

            return {
                code,
                severity:
                    message.severity === "warning"
                        ? monaco.MarkerSeverity.Warning
                        : monaco.MarkerSeverity.Error,
                source: "stylelint",
                message: message.text,
                startLineNumber,
                startColumn,
                endLineNumber,
                endColumn,
            }
        },

        updateMarkers(editor, messages) {
            const { monaco } = this
            const model = editor.getModel()
            const id = editor.getId()
            const markers = messages.map(this.messageToMarker, this)

            monaco.editor.setModelMarkers(model, id, markers)
        },

        updateCode(value) {
            const editor = this.codeEditor
            if (editor != null) {
                updateValue(editor, value)
            }
            this.invalidate()
        },

        invalidate() {
            if (this.editor != null && !this.editing) {
                this.editing = true
                setTimeout(async () => {
                    await this.lint()
                    this.editing = false
                }, 667)
            }
        },

        async lint() {
            const { codeEditor: editor, config, filename, stylelint } = this
            if (editor == null || stylelint == null) {
                return
            }
            const options = this.options || {}
            const model = editor.getModel()
            const code = model.getValue()

            // Lint
            try {
                const ret = await stylelint.lint({
                    ...options,
                    code,
                    codeFilename: filename,
                    config,
                    fix: false,
                })
                this.messages = getAllWarnings(ret)
            } catch (err) {
                this.messages = [
                    {
                        fatal: true,
                        text: err.message,
                        line: 1,
                        column: 0,
                    },
                ]
            }

            // Fix
            try {
                const ret = await stylelint.lint({
                    ...options,
                    code,
                    codeFilename: filename,
                    config,
                    fix: true,
                })
                this.fixedCode =
                    ret.output &&
                    typeof ret.output === "string" &&
                    ret.output !== code
                        ? ret.output
                        : code
                this.fixedMessages = getAllWarnings(ret)
            } catch (err) {
                this.fixedCode = code
                this.fixedMessages = [
                    {
                        fatal: true,
                        text: err.message,
                        line: 1,
                        column: 0,
                    },
                ]
            }

            this.$emit("change", {
                code,
                messages: this.messages,
                fixedCode: this.fixedCode,
                fixedMessages: this.fixedMessages,
            })

            if (this.requestFix) {
                this.requestFix = false
                if (this.fixedCode !== this.code) {
                    this.$emit("input", this.fixedCode)
                    this.updateCode(this.fixedCode)
                }
            }
        },

        applyAutofix() {
            const { code, fixedCode, editing } = this
            if (editing) {
                this.requestFix = true
            } else if (fixedCode !== code) {
                this.$emit("input", fixedCode)
                this.updateCode(fixedCode)
            }
        },
    },
}

/**
 * Get all warnings
 */
function getAllWarnings(result) {
    let warnings = result.results[0].warnings

    if (result.needlessDisables && result.needlessDisables[0]) {
        warnings = [
            ...warnings,
            ...result.needlessDisables[0].ranges.map(range => ({
                rule: range.unusedRule,
                text: `unused rule: ${range.unusedRule}, start line: ${
                    range.start
                }${range.end ? `, end line: ${range.end}` : ""}`,
                line: range.start,
                column: 0,
                severity: "warning",
                endLine: range.end,
                endColumn: 0,
            })),
        ]
    }
    return warnings
}
</script>

<style>
.vue-stylelint-editor-root {
    position: relative;
}

.vue-stylelint-editor-swap-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.vue-stylelint-editor-monaco {
    width: 100%;
    height: 100%;
}

.vue-stylelint-editor-actions {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 20px;
    bottom: 8px;
    border: 1px solid gray;
    border-radius: 4px;
    opacity: 0.3;
    transition: opacity 0.3s;
}

.vue-stylelint-editor-actions,
.vue-stylelint-editor-actions button {
    background-color: #fff;
    color: #1e1e1e;
}

.vue-stylelint-editor-actions:hover {
    opacity: 1;
}

.vue-stylelint-editor-actions::before {
    content: "\1F527";
    display: inline-block;
    margin: 2px;
    padding: 5px;
    font-size: 1em;
    vertical-align: middle;
}

.vue-stylelint-editor-dark .vue-stylelint-editor-actions,
.vue-stylelint-editor-dark .vue-stylelint-editor-actions button {
    background-color: #1e1e1e;
    color: #d4d4d4;
}

.vue-stylelint-editor-actions > * {
    display: inline-block;
    box-sizing: border-box;
    width: 80px;
    margin: 2px;
    padding: 4px 8px;
    border: 1px solid gray;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1em;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
}

.vue-stylelint-editor-root .vue-stylelint-editor-actions > *:hover {
    background-color: rgba(128, 128, 128, 0.2);
}

.vue-stylelint-editor-root .vue-stylelint-editor-actions > *:active {
    background-color: rgba(128, 128, 128, 0.4);
}

.vue-stylelint-editor-actions input[type="checkbox"] {
    display: none;
}

.vue-stylelint-editor-root .vue-stylelint-editor-placeholder-code {
    display: block;
    box-sizing: border-box;
    height: 100%;
    white-space: pre;
    background-color: #fff;
    color: #1e1e1e;
}

.vue-stylelint-editor-root.vue-stylelint-editor-dark
    .vue-stylelint-editor-placeholder-code {
    background-color: #1e1e1e;
    color: #d4d4d4;
}

.vue-stylelint-editor-placeholder-loading,
.vue-stylelint-editor-placeholder-error {
    position: absolute;
    right: 8px;
    bottom: 8px;
    pointer-events: none;
}

.vue-stylelint-editor-placeholder-loading {
    line-height: 1.5em;
}

.vue-stylelint-editor-placeholder-error {
    color: #f44336;
}

.vue-stylelint-editor-placeholder-loading-icon {
    display: inline-block;
    position: relative;
    width: 1.5em;
    height: 1.5em;
    margin-right: 4px;
    vertical-align: middle;
}

.vue-stylelint-editor-placeholder-loading-icon > div {
    position: absolute;
    border-radius: 50%;
    border-color: #3eaf7c;
    border-width: 2px;
    border-style: none solid none solid;
    animation: VueStylelintEditorLoadingIcon 1s linear infinite;
}

.vue-stylelint-editor-placeholder-loading-icon > div:nth-child(1) {
    height: 100%;
    width: 100%;
    animation-duration: 1.3s;
}

.vue-stylelint-editor-placeholder-loading-icon > div:nth-child(2) {
    top: 1px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 2px);
    animation-duration: 0.7s;
}

.vue-stylelint-editor-placeholder-loading-icon > div:nth-child(3) {
    top: 2px;
    left: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 4px);
    animation-duration: 1s;
}

.vue-stylelint-editor-placeholder-loading-message {
    display: inline-block;
    color: gray;
    vertical-align: middle;
}

@keyframes VueStylelintEditorLoadingIcon {
    0% {
        transform: rotateY(0deg);
    }

    50% {
        transform: rotateY(210deg);
    }

    100% {
        transform: rotateY(360deg);
    }
}

.vue-stylelint-editor-fade-enter-active,
.vue-stylelint-editor-fade-leave-active {
    transition: opacity 0.3s ease;
}

.vue-stylelint-editor-fade-enter,
.vue-stylelint-editor-fade-leave-to {
    opacity: 0;
}
</style>
