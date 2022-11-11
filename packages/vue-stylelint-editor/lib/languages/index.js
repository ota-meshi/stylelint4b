import stylus from "./stylus";
import scss from "./scss";

let languageSetted = false;

/**
 * Setup Monarch
 * @param {object} monaco monaco object
 * @returns {void}
 */
export function languageSetup(monaco) {
  if (languageSetted) {
    return;
  }
  languageSetted = true;
  stylusLanguageSetup(monaco);
  scssLanguageSetup(monaco);
}

/**
 * Setup Monarch for stylus
 * @param {object} monaco monaco object
 * @returns {void}
 */
function stylusLanguageSetup(monaco) {
  monaco.languages.register({ id: "stylus" });
  monaco.languages.setMonarchTokensProvider("stylus", stylus);
}

/**
 * Setup Monarch for scss
 * @param {object} monaco monaco object
 * @returns {void}
 */
function scssLanguageSetup(monaco) {
  monaco.languages.register({ id: "scss" });
  monaco.languages.setMonarchTokensProvider("scss", scss);
}
