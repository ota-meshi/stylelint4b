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
      :options="options"
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
import path from "path";
import VueStylelintEditor from "vue-stylelint-editor";
import JsonEditor from "./playground/components/JsonEditor.vue";
import yaml from "js-yaml";
import stripComments from "strip-json-comments";
import { deserializeState, serializeState } from "./playground/state";

const CODE_DEFAULT = "a {color: #FFF; }";
const CONFIG_DEFAULT = `{
  "extends": "stylelint-config-standard"
}`;
const FILENAME_DEFAULT = "test.css";

// eslint-disable-next-line require-jsdoc
function parseConfig(str) {
  let error = null;

  try {
    return JSON.parse(stripComments(str));
  } catch (e) {
    error = error || e;
  }
  try {
    return yaml.safeLoad(stripComments(str));
  } catch (e) {
    error = error || e;
  }
  throw error;
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Playground",
  components: { VueStylelintEditor, JsonEditor },
  data() {
    const serializedString =
      (typeof window !== "undefined" && window.location.hash.slice(1)) || "";
    const state = deserializeState(serializedString);
    return {
      stylelint4b: null,
      alias: null,
      code: state.code || CODE_DEFAULT,
      config: state.config || CONFIG_DEFAULT,
      filename: state.filename || FILENAME_DEFAULT,
      messages: [],
    };
  },
  computed: {
    options() {
      return {
        reportNeedlessDisables: true,
      };
    },
    objectConfig() {
      const alias = this.alias;
      if (!alias) {
        return {};
      }
      try {
        return parseConfig(this.config);
      } catch {
        /* nop */
      }
      return {};
    },
    configError() {
      try {
        parseConfig(this.config);
        return "";
      } catch (e) {
        return e.message;
      }
    },
    language() {
      const ext = path.extname(this.filename);
      if (!ext) {
        return "css";
      }
      switch (ext.toLowerCase()) {
        case ".js":
        case ".ts":
          return "javascript";
        case ".html":
        case ".vue":
          return "html";
        case ".styl":
        case ".stylus":
          return "stylus";
        case ".scss":
        case ".sass":
          return "scss";
        default:
          break;
      }
      return "css";
    },
    serializedString() {
      const code = CODE_DEFAULT === this.code ? undefined : this.code;
      const config = CONFIG_DEFAULT === this.config ? undefined : this.config;
      const filename =
        FILENAME_DEFAULT === this.filename ? undefined : this.filename;
      const serializedString = serializeState({
        code,
        config,
        filename,
      });
      return serializedString;
    },
    format() {
      return {
        insertSpaces: true,
        tabSize: 2,
      };
    },
    editorHeight() {
      const lines = this.code.split("\n").length;
      return `${Math.max(120, 20 * (1 + lines))}px`;
    },
    jsonEditorHeight() {
      const lines = this.config.split("\n").length;
      return `${Math.max(120, 20 * (1 + lines))}px`;
    },
    stylelint() {
      if (!this.stylelint4b) {
        return null;
      }

      return this.stylelint4b;
    },
  },
  watch: {
    serializedString(serializedString) {
      if (typeof window !== "undefined") {
        window.location.replace(`#${serializedString}`);
      }
    },
    async editorHeight() {
      await this.$nextTick();

      this.$refs.editor.codeEditor.layout();
      if (this.$refs.editor.fixedCodeEditor) {
        this.$refs.editor.fixedCodeEditor.layout();
      }
    },
    async jsonEditorHeight() {
      await this.$nextTick();

      this.$refs.jsonEditor.editor.layout();
    },
  },
  mounted() {
    // Load linter asynchronously.
    this.loadStylelint4b();

    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", this.onUrlHashChange);
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("hashchange", this.onUrlHashChange);
    }
  },
  methods: {
    async loadStylelint4b() {
      const [stylelint4b, alias] = await Promise.all([
        import("stylelint4b"),
        import("stylelint4b/alias"),
      ]);

      await alias.defineAliases({
        "postcss-scss": import("postcss-scss"),
        "postcss-html": import("postcss-html"),
        [require.resolve("stylelint-stylus/recommended")]: import(
          "stylelint-stylus/recommended"
        ),
        "stylelint-stylus/standard": import("stylelint-stylus/standard"),
        "stylelint-stylus": import("stylelint-stylus"),
        [require.resolve("stylelint-stylus")]: import("stylelint-stylus"),
        "stylelint-scss": import("stylelint-scss"),
        "stylelint-order": import("stylelint-order"),
      });
      this.stylelint4b = stylelint4b;
      this.alias = alias;
    },
    onUrlHashChange() {
      const serializedString =
        (typeof window !== "undefined" && window.location.hash.slice(1)) || "";
      if (serializedString !== this.serializedString) {
        const state = deserializeState(serializedString);
        this.code = state.code || CODE_DEFAULT;
        this.config = state.config || CONFIG_DEFAULT;
        this.filename = state.filename || FILENAME_DEFAULT;
      }
    },
    onChange({ messages }) {
      this.messages = messages || [];
    },
  },
};
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
