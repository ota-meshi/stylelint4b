# vue-stylelint-editor

This package provides [Vue.js] component of a code editor for [stylelint] playgrounds.

This idea and implementation is based on [eslint4b] and [vue-stylelint-editor].

## Installation

```bash
npm install stylelint4b vue-stylelint-editor
```

## Usage

Basically, the [vue-stylelint-editor] component requires three attributes; `stylelint`, `config`, and `code`.

- `stylelint` is the [stylelint4b] module to does linting and fixing.
- `config` is the [configuration object] for the [stylelint].
- `code` is the source code that the editor shows initially.

For example:

<<< @/docs/.vuepress/components/vue-stylelint-editor-sample01.vue

<vue-stylelint-editor-sample01/>

## 🔧 Properties

### stylelint

```html
<vue-stylelint-editor :stylelint="stylelint4b" />
```

- **Type:** [stylelint4b] | `null`
- **Default value:** `null`

The [stylelint4b] module to does linting and fixing the input code.

This component requires this property in order to work properly, but this property can be `null` in order to use dynamic imports.

### code

```html
<vue-stylelint-editor :code="code" />
<vue-stylelint-editor v-model="code" />
```

- **Type:** `string`
- **Default value:** `""`

The source code which is shown in this code editor.

Users can edit the source code. You can bind a property with `v-model` to receive the edits.

### config

```html
<vue-stylelint-editor :config="config" />
```

- **Type:** `object`
- **Default value:** `{ extends: ["stylelint-config-standard"], rules: {}, }`

The [configuration object] to [stylelint].

### options

```html
<vue-stylelint-editor :options="options" />
```

- **Type:** `object`
- **Default value:** `{}`

The options object to [stylelint].  
Specify options that can be used with the [stylelint's Node.js API].

### dark

```html
<vue-stylelint-editor dark />
```

- **Type:** `boolean`
- **Default value:** `false`

The flag to use dark theme.

### filename

```html
<vue-stylelint-editor filename="a.css" />
```

- **Type:** `string`
- **Default value:** `"a.css"`

The filename of the source code.

Some rules use filenames to lint.
You can customize the filename with this property.

### fix

```html
<vue-stylelint-editor fix />
```

- **Type:** `boolean`
- **Default value:** `false`

The flag to show the "Preview" button that shows fixed code [side by side](https://microsoft.github.io/monaco-editor/playground.html#creating-the-diffeditor-multi-line-example).

### format

```html
<vue-stylelint-editor :format="format" />
```

- **Type:** [ITextModelUpdateOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.itextmodelupdateoptions.html)
- **Default value:** `{ insertSpaces: true, tabSize: 4 }`

The format option object for [Monaco Editor].

### language

```html
<vue-stylelint-editor language="css" />
```

- **Type:** `string`
- **Default value:** `"css"`

The language option object for [Monaco Editor].

You can change syntax highlights and language services in order to play [stylelint] with custom parsers.

## 🔔 Events

### input

```html
<vue-stylelint-editor @input="onInputCode" />
```

- **Type:** `string`

The event which is fired on every edit.

This event is for `v-model` functionality.

### change

```html
<vue-stylelint-editor @change="onChange" />
```

- **Type:** `{code: string, fixedCode: string, messages: Array, fixedMessages: Array}`

The event which is fired on edits asynchronously.

The first argument has the following properties:

- `code` is the current source code.
- `fixedCode` is the autofixed code.
- `messages` is the errors that [stylelint] reported.
- `fixedMessages` is the errors which are remained after autofix.

[eslint4b]: https://www.npmjs.com/package/eslint4b
[vue-stylelint-editor]: https://www.npmjs.com/package/vue-stylelint-editor
[stylelint]: https://stylelint.io/
[Vue.js]: https://vuejs.org/
[stylelint4b]: ../stylelint4b/README.md
[configuration object]: https://stylelint.io/user-guide/usage/node-api#config
[stylelint's Node.js API]: https://stylelint.io/user-guide/usage/node-api#nodejs-api
[Monaco Editor]: https://microsoft.github.io/monaco-editor/
