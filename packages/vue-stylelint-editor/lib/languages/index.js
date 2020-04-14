import stylus from "./stylus"

let languageSetted = false

/**
 * Setup Monarch
 * @param {object} monaco monaco object
 * @returns {void}
 */
export function languageSetup(monaco) {
    if (languageSetted) {
        return
    }
    languageSetted = true
    stylusLanguageSetup(monaco)
}

/**
 * Setup Monarch for stylus
 * @param {object} monaco monaco object
 * @returns {void}
 */
function stylusLanguageSetup(monaco) {
    monaco.languages.register({ id: "stylus" })
    monaco.languages.setMonarchTokensProvider("stylus", stylus)
}
