"use strict"
/* eslint-disable @mysticatea/node/no-extraneous-require */

module.exports = {
    index: require("stylelint"),
    alias: require("./alias-module"),
    "lib/rules/alpha-value-notation": require("stylelint/lib/rules/alpha-value-notation"),
    "lib/rules/at-rule-allowed-list": require("stylelint/lib/rules/at-rule-allowed-list"),
    "lib/rules/at-rule-disallowed-list": require("stylelint/lib/rules/at-rule-disallowed-list"),
    "lib/rules/at-rule-empty-line-before": require("stylelint/lib/rules/at-rule-empty-line-before"),
    "lib/rules/at-rule-name-case": require("stylelint/lib/rules/at-rule-name-case"),
    "lib/rules/at-rule-name-newline-after": require("stylelint/lib/rules/at-rule-name-newline-after"),
    "lib/rules/at-rule-name-space-after": require("stylelint/lib/rules/at-rule-name-space-after"),
    "lib/rules/at-rule-no-unknown": require("stylelint/lib/rules/at-rule-no-unknown"),
    "lib/rules/at-rule-no-vendor-prefix": require("stylelint/lib/rules/at-rule-no-vendor-prefix"),
    "lib/rules/at-rule-property-required-list": require("stylelint/lib/rules/at-rule-property-required-list"),
    "lib/rules/at-rule-semicolon-newline-after": require("stylelint/lib/rules/at-rule-semicolon-newline-after"),
    "lib/rules/at-rule-semicolon-space-before": require("stylelint/lib/rules/at-rule-semicolon-space-before"),
    "lib/rules/block-closing-brace-empty-line-before": require("stylelint/lib/rules/block-closing-brace-empty-line-before"),
    "lib/rules/block-closing-brace-newline-after": require("stylelint/lib/rules/block-closing-brace-newline-after"),
    "lib/rules/block-closing-brace-newline-before": require("stylelint/lib/rules/block-closing-brace-newline-before"),
    "lib/rules/block-closing-brace-space-after": require("stylelint/lib/rules/block-closing-brace-space-after"),
    "lib/rules/block-closing-brace-space-before": require("stylelint/lib/rules/block-closing-brace-space-before"),
    "lib/rules/block-no-empty": require("stylelint/lib/rules/block-no-empty"),
    "lib/rules/block-opening-brace-newline-after": require("stylelint/lib/rules/block-opening-brace-newline-after"),
    "lib/rules/block-opening-brace-newline-before": require("stylelint/lib/rules/block-opening-brace-newline-before"),
    "lib/rules/block-opening-brace-space-after": require("stylelint/lib/rules/block-opening-brace-space-after"),
    "lib/rules/block-opening-brace-space-before": require("stylelint/lib/rules/block-opening-brace-space-before"),
    "lib/rules/color-function-notation": require("stylelint/lib/rules/color-function-notation"),
    "lib/rules/color-hex-alpha": require("stylelint/lib/rules/color-hex-alpha"),
    "lib/rules/color-hex-case": require("stylelint/lib/rules/color-hex-case"),
    "lib/rules/color-hex-length": require("stylelint/lib/rules/color-hex-length"),
    "lib/rules/color-named": require("stylelint/lib/rules/color-named"),
    "lib/rules/color-no-hex": require("stylelint/lib/rules/color-no-hex"),
    "lib/rules/color-no-invalid-hex": require("stylelint/lib/rules/color-no-invalid-hex"),
    "lib/rules/comment-empty-line-before": require("stylelint/lib/rules/comment-empty-line-before"),
    "lib/rules/comment-no-empty": require("stylelint/lib/rules/comment-no-empty"),
    "lib/rules/comment-pattern": require("stylelint/lib/rules/comment-pattern"),
    "lib/rules/comment-whitespace-inside": require("stylelint/lib/rules/comment-whitespace-inside"),
    "lib/rules/comment-word-disallowed-list": require("stylelint/lib/rules/comment-word-disallowed-list"),
    "lib/rules/custom-media-pattern": require("stylelint/lib/rules/custom-media-pattern"),
    "lib/rules/custom-property-empty-line-before": require("stylelint/lib/rules/custom-property-empty-line-before"),
    "lib/rules/custom-property-no-missing-var-function": require("stylelint/lib/rules/custom-property-no-missing-var-function"),
    "lib/rules/custom-property-pattern": require("stylelint/lib/rules/custom-property-pattern"),
    "lib/rules/declaration-bang-space-after": require("stylelint/lib/rules/declaration-bang-space-after"),
    "lib/rules/declaration-bang-space-before": require("stylelint/lib/rules/declaration-bang-space-before"),
    "lib/rules/declaration-block-no-duplicate-custom-properties": require("stylelint/lib/rules/declaration-block-no-duplicate-custom-properties"),
    "lib/rules/declaration-block-no-duplicate-properties": require("stylelint/lib/rules/declaration-block-no-duplicate-properties"),
    "lib/rules/declaration-block-no-redundant-longhand-properties": require("stylelint/lib/rules/declaration-block-no-redundant-longhand-properties"),
    "lib/rules/declaration-block-no-shorthand-property-overrides": require("stylelint/lib/rules/declaration-block-no-shorthand-property-overrides"),
    "lib/rules/declaration-block-semicolon-newline-after": require("stylelint/lib/rules/declaration-block-semicolon-newline-after"),
    "lib/rules/declaration-block-semicolon-newline-before": require("stylelint/lib/rules/declaration-block-semicolon-newline-before"),
    "lib/rules/declaration-block-semicolon-space-after": require("stylelint/lib/rules/declaration-block-semicolon-space-after"),
    "lib/rules/declaration-block-semicolon-space-before": require("stylelint/lib/rules/declaration-block-semicolon-space-before"),
    "lib/rules/declaration-block-single-line-max-declarations": require("stylelint/lib/rules/declaration-block-single-line-max-declarations"),
    "lib/rules/declaration-block-trailing-semicolon": require("stylelint/lib/rules/declaration-block-trailing-semicolon"),
    "lib/rules/declaration-colon-newline-after": require("stylelint/lib/rules/declaration-colon-newline-after"),
    "lib/rules/declaration-colon-space-after": require("stylelint/lib/rules/declaration-colon-space-after"),
    "lib/rules/declaration-colon-space-before": require("stylelint/lib/rules/declaration-colon-space-before"),
    "lib/rules/declaration-empty-line-before": require("stylelint/lib/rules/declaration-empty-line-before"),
    "lib/rules/declaration-no-important": require("stylelint/lib/rules/declaration-no-important"),
    "lib/rules/declaration-property-unit-allowed-list": require("stylelint/lib/rules/declaration-property-unit-allowed-list"),
    "lib/rules/declaration-property-unit-disallowed-list": require("stylelint/lib/rules/declaration-property-unit-disallowed-list"),
    "lib/rules/declaration-property-value-allowed-list": require("stylelint/lib/rules/declaration-property-value-allowed-list"),
    "lib/rules/declaration-property-value-disallowed-list": require("stylelint/lib/rules/declaration-property-value-disallowed-list"),
    "lib/rules/font-family-name-quotes": require("stylelint/lib/rules/font-family-name-quotes"),
    "lib/rules/font-family-no-duplicate-names": require("stylelint/lib/rules/font-family-no-duplicate-names"),
    "lib/rules/font-family-no-missing-generic-family-keyword": require("stylelint/lib/rules/font-family-no-missing-generic-family-keyword"),
    "lib/rules/font-weight-notation": require("stylelint/lib/rules/font-weight-notation"),
    "lib/rules/function-allowed-list": require("stylelint/lib/rules/function-allowed-list"),
    "lib/rules/function-calc-no-unspaced-operator": require("stylelint/lib/rules/function-calc-no-unspaced-operator"),
    "lib/rules/function-comma-newline-after": require("stylelint/lib/rules/function-comma-newline-after"),
    "lib/rules/function-comma-newline-before": require("stylelint/lib/rules/function-comma-newline-before"),
    "lib/rules/function-comma-space-after": require("stylelint/lib/rules/function-comma-space-after"),
    "lib/rules/function-comma-space-before": require("stylelint/lib/rules/function-comma-space-before"),
    "lib/rules/function-disallowed-list": require("stylelint/lib/rules/function-disallowed-list"),
    "lib/rules/function-linear-gradient-no-nonstandard-direction": require("stylelint/lib/rules/function-linear-gradient-no-nonstandard-direction"),
    "lib/rules/function-max-empty-lines": require("stylelint/lib/rules/function-max-empty-lines"),
    "lib/rules/function-name-case": require("stylelint/lib/rules/function-name-case"),
    "lib/rules/function-parentheses-newline-inside": require("stylelint/lib/rules/function-parentheses-newline-inside"),
    "lib/rules/function-parentheses-space-inside": require("stylelint/lib/rules/function-parentheses-space-inside"),
    "lib/rules/function-url-no-scheme-relative": require("stylelint/lib/rules/function-url-no-scheme-relative"),
    "lib/rules/function-url-quotes": require("stylelint/lib/rules/function-url-quotes"),
    "lib/rules/function-url-scheme-allowed-list": require("stylelint/lib/rules/function-url-scheme-allowed-list"),
    "lib/rules/function-url-scheme-disallowed-list": require("stylelint/lib/rules/function-url-scheme-disallowed-list"),
    "lib/rules/function-whitespace-after": require("stylelint/lib/rules/function-whitespace-after"),
    "lib/rules/hue-degree-notation": require("stylelint/lib/rules/hue-degree-notation"),
    "lib/rules/indentation": require("stylelint/lib/rules/indentation"),
    "lib/rules/keyframe-declaration-no-important": require("stylelint/lib/rules/keyframe-declaration-no-important"),
    "lib/rules/keyframes-name-pattern": require("stylelint/lib/rules/keyframes-name-pattern"),
    "lib/rules/length-zero-no-unit": require("stylelint/lib/rules/length-zero-no-unit"),
    "lib/rules/linebreaks": require("stylelint/lib/rules/linebreaks"),
    "lib/rules/max-empty-lines": require("stylelint/lib/rules/max-empty-lines"),
    "lib/rules/max-line-length": require("stylelint/lib/rules/max-line-length"),
    "lib/rules/max-nesting-depth": require("stylelint/lib/rules/max-nesting-depth"),
    "lib/rules/media-feature-colon-space-after": require("stylelint/lib/rules/media-feature-colon-space-after"),
    "lib/rules/media-feature-colon-space-before": require("stylelint/lib/rules/media-feature-colon-space-before"),
    "lib/rules/media-feature-name-allowed-list": require("stylelint/lib/rules/media-feature-name-allowed-list"),
    "lib/rules/media-feature-name-case": require("stylelint/lib/rules/media-feature-name-case"),
    "lib/rules/media-feature-name-disallowed-list": require("stylelint/lib/rules/media-feature-name-disallowed-list"),
    "lib/rules/media-feature-name-no-unknown": require("stylelint/lib/rules/media-feature-name-no-unknown"),
    "lib/rules/media-feature-name-no-vendor-prefix": require("stylelint/lib/rules/media-feature-name-no-vendor-prefix"),
    "lib/rules/media-feature-name-value-allowed-list": require("stylelint/lib/rules/media-feature-name-value-allowed-list"),
    "lib/rules/media-feature-parentheses-space-inside": require("stylelint/lib/rules/media-feature-parentheses-space-inside"),
    "lib/rules/media-feature-range-operator-space-after": require("stylelint/lib/rules/media-feature-range-operator-space-after"),
    "lib/rules/media-feature-range-operator-space-before": require("stylelint/lib/rules/media-feature-range-operator-space-before"),
    "lib/rules/media-query-list-comma-newline-after": require("stylelint/lib/rules/media-query-list-comma-newline-after"),
    "lib/rules/media-query-list-comma-newline-before": require("stylelint/lib/rules/media-query-list-comma-newline-before"),
    "lib/rules/media-query-list-comma-space-after": require("stylelint/lib/rules/media-query-list-comma-space-after"),
    "lib/rules/media-query-list-comma-space-before": require("stylelint/lib/rules/media-query-list-comma-space-before"),
    "lib/rules/named-grid-areas-no-invalid": require("stylelint/lib/rules/named-grid-areas-no-invalid"),
    "lib/rules/no-descending-specificity": require("stylelint/lib/rules/no-descending-specificity"),
    "lib/rules/no-duplicate-at-import-rules": require("stylelint/lib/rules/no-duplicate-at-import-rules"),
    "lib/rules/no-duplicate-selectors": require("stylelint/lib/rules/no-duplicate-selectors"),
    "lib/rules/no-empty-first-line": require("stylelint/lib/rules/no-empty-first-line"),
    "lib/rules/no-empty-source": require("stylelint/lib/rules/no-empty-source"),
    "lib/rules/no-eol-whitespace": require("stylelint/lib/rules/no-eol-whitespace"),
    "lib/rules/no-extra-semicolons": require("stylelint/lib/rules/no-extra-semicolons"),
    "lib/rules/no-invalid-double-slash-comments": require("stylelint/lib/rules/no-invalid-double-slash-comments"),
    "lib/rules/no-invalid-position-at-import-rule": require("stylelint/lib/rules/no-invalid-position-at-import-rule"),
    "lib/rules/no-irregular-whitespace": require("stylelint/lib/rules/no-irregular-whitespace"),
    "lib/rules/no-missing-end-of-source-newline": require("stylelint/lib/rules/no-missing-end-of-source-newline"),
    "lib/rules/no-unknown-animations": require("stylelint/lib/rules/no-unknown-animations"),
    "lib/rules/number-leading-zero": require("stylelint/lib/rules/number-leading-zero"),
    "lib/rules/number-max-precision": require("stylelint/lib/rules/number-max-precision"),
    "lib/rules/number-no-trailing-zeros": require("stylelint/lib/rules/number-no-trailing-zeros"),
    "lib/rules/property-allowed-list": require("stylelint/lib/rules/property-allowed-list"),
    "lib/rules/property-case": require("stylelint/lib/rules/property-case"),
    "lib/rules/property-disallowed-list": require("stylelint/lib/rules/property-disallowed-list"),
    "lib/rules/property-no-unknown": require("stylelint/lib/rules/property-no-unknown"),
    "lib/rules/property-no-vendor-prefix": require("stylelint/lib/rules/property-no-vendor-prefix"),
    "lib/rules/rule-empty-line-before": require("stylelint/lib/rules/rule-empty-line-before"),
    "lib/rules/rule-selector-property-disallowed-list": require("stylelint/lib/rules/rule-selector-property-disallowed-list"),
    "lib/rules/selector-attribute-brackets-space-inside": require("stylelint/lib/rules/selector-attribute-brackets-space-inside"),
    "lib/rules/selector-attribute-name-disallowed-list": require("stylelint/lib/rules/selector-attribute-name-disallowed-list"),
    "lib/rules/selector-attribute-operator-allowed-list": require("stylelint/lib/rules/selector-attribute-operator-allowed-list"),
    "lib/rules/selector-attribute-operator-disallowed-list": require("stylelint/lib/rules/selector-attribute-operator-disallowed-list"),
    "lib/rules/selector-attribute-operator-space-after": require("stylelint/lib/rules/selector-attribute-operator-space-after"),
    "lib/rules/selector-attribute-operator-space-before": require("stylelint/lib/rules/selector-attribute-operator-space-before"),
    "lib/rules/selector-attribute-quotes": require("stylelint/lib/rules/selector-attribute-quotes"),
    "lib/rules/selector-class-pattern": require("stylelint/lib/rules/selector-class-pattern"),
    "lib/rules/selector-combinator-allowed-list": require("stylelint/lib/rules/selector-combinator-allowed-list"),
    "lib/rules/selector-combinator-disallowed-list": require("stylelint/lib/rules/selector-combinator-disallowed-list"),
    "lib/rules/selector-combinator-space-after": require("stylelint/lib/rules/selector-combinator-space-after"),
    "lib/rules/selector-combinator-space-before": require("stylelint/lib/rules/selector-combinator-space-before"),
    "lib/rules/selector-descendant-combinator-no-non-space": require("stylelint/lib/rules/selector-descendant-combinator-no-non-space"),
    "lib/rules/selector-disallowed-list": require("stylelint/lib/rules/selector-disallowed-list"),
    "lib/rules/selector-id-pattern": require("stylelint/lib/rules/selector-id-pattern"),
    "lib/rules/selector-list-comma-newline-after": require("stylelint/lib/rules/selector-list-comma-newline-after"),
    "lib/rules/selector-list-comma-newline-before": require("stylelint/lib/rules/selector-list-comma-newline-before"),
    "lib/rules/selector-list-comma-space-after": require("stylelint/lib/rules/selector-list-comma-space-after"),
    "lib/rules/selector-list-comma-space-before": require("stylelint/lib/rules/selector-list-comma-space-before"),
    "lib/rules/selector-max-attribute": require("stylelint/lib/rules/selector-max-attribute"),
    "lib/rules/selector-max-class": require("stylelint/lib/rules/selector-max-class"),
    "lib/rules/selector-max-combinators": require("stylelint/lib/rules/selector-max-combinators"),
    "lib/rules/selector-max-compound-selectors": require("stylelint/lib/rules/selector-max-compound-selectors"),
    "lib/rules/selector-max-empty-lines": require("stylelint/lib/rules/selector-max-empty-lines"),
    "lib/rules/selector-max-id": require("stylelint/lib/rules/selector-max-id"),
    "lib/rules/selector-max-pseudo-class": require("stylelint/lib/rules/selector-max-pseudo-class"),
    "lib/rules/selector-max-specificity": require("stylelint/lib/rules/selector-max-specificity"),
    "lib/rules/selector-max-type": require("stylelint/lib/rules/selector-max-type"),
    "lib/rules/selector-max-universal": require("stylelint/lib/rules/selector-max-universal"),
    "lib/rules/selector-nested-pattern": require("stylelint/lib/rules/selector-nested-pattern"),
    "lib/rules/selector-no-qualifying-type": require("stylelint/lib/rules/selector-no-qualifying-type"),
    "lib/rules/selector-no-vendor-prefix": require("stylelint/lib/rules/selector-no-vendor-prefix"),
    "lib/rules/selector-pseudo-class-allowed-list": require("stylelint/lib/rules/selector-pseudo-class-allowed-list"),
    "lib/rules/selector-pseudo-class-case": require("stylelint/lib/rules/selector-pseudo-class-case"),
    "lib/rules/selector-pseudo-class-disallowed-list": require("stylelint/lib/rules/selector-pseudo-class-disallowed-list"),
    "lib/rules/selector-pseudo-class-no-unknown": require("stylelint/lib/rules/selector-pseudo-class-no-unknown"),
    "lib/rules/selector-pseudo-class-parentheses-space-inside": require("stylelint/lib/rules/selector-pseudo-class-parentheses-space-inside"),
    "lib/rules/selector-pseudo-element-allowed-list": require("stylelint/lib/rules/selector-pseudo-element-allowed-list"),
    "lib/rules/selector-pseudo-element-case": require("stylelint/lib/rules/selector-pseudo-element-case"),
    "lib/rules/selector-pseudo-element-colon-notation": require("stylelint/lib/rules/selector-pseudo-element-colon-notation"),
    "lib/rules/selector-pseudo-element-disallowed-list": require("stylelint/lib/rules/selector-pseudo-element-disallowed-list"),
    "lib/rules/selector-pseudo-element-no-unknown": require("stylelint/lib/rules/selector-pseudo-element-no-unknown"),
    "lib/rules/selector-type-case": require("stylelint/lib/rules/selector-type-case"),
    "lib/rules/selector-type-no-unknown": require("stylelint/lib/rules/selector-type-no-unknown"),
    "lib/rules/shorthand-property-no-redundant-values": require("stylelint/lib/rules/shorthand-property-no-redundant-values"),
    "lib/rules/string-no-newline": require("stylelint/lib/rules/string-no-newline"),
    "lib/rules/string-quotes": require("stylelint/lib/rules/string-quotes"),
    "lib/rules/time-min-milliseconds": require("stylelint/lib/rules/time-min-milliseconds"),
    "lib/rules/unicode-bom": require("stylelint/lib/rules/unicode-bom"),
    "lib/rules/unit-allowed-list": require("stylelint/lib/rules/unit-allowed-list"),
    "lib/rules/unit-case": require("stylelint/lib/rules/unit-case"),
    "lib/rules/unit-disallowed-list": require("stylelint/lib/rules/unit-disallowed-list"),
    "lib/rules/unit-no-unknown": require("stylelint/lib/rules/unit-no-unknown"),
    "lib/rules/value-keyword-case": require("stylelint/lib/rules/value-keyword-case"),
    "lib/rules/value-list-comma-newline-after": require("stylelint/lib/rules/value-list-comma-newline-after"),
    "lib/rules/value-list-comma-newline-before": require("stylelint/lib/rules/value-list-comma-newline-before"),
    "lib/rules/value-list-comma-space-after": require("stylelint/lib/rules/value-list-comma-space-after"),
    "lib/rules/value-list-comma-space-before": require("stylelint/lib/rules/value-list-comma-space-before"),
    "lib/rules/value-list-max-empty-lines": require("stylelint/lib/rules/value-list-max-empty-lines"),
    "lib/rules/value-no-vendor-prefix": require("stylelint/lib/rules/value-no-vendor-prefix"),
    "lib/reference/keywordSets": require("stylelint/lib/reference/keywordSets"),
    "lib/reference/mathFunctions": require("stylelint/lib/reference/mathFunctions"),
    "lib/reference/propertySets": require("stylelint/lib/reference/propertySets"),
    "lib/reference/punctuationSets": require("stylelint/lib/reference/punctuationSets"),
    "lib/reference/shorthandData": require("stylelint/lib/reference/shorthandData"),
    "lib/utils/addEmptyLineAfter": require("stylelint/lib/utils/addEmptyLineAfter"),
    "lib/utils/addEmptyLineBefore": require("stylelint/lib/utils/addEmptyLineBefore"),
    "lib/utils/arrayEqual": require("stylelint/lib/utils/arrayEqual"),
    "lib/utils/atRuleParamIndex": require("stylelint/lib/utils/atRuleParamIndex"),
    "lib/utils/beforeBlockString": require("stylelint/lib/utils/beforeBlockString"),
    "lib/utils/blockString": require("stylelint/lib/utils/blockString"),
    "lib/utils/blurComments": require("stylelint/lib/utils/blurComments"),
    "lib/utils/blurFunctionArguments": require("stylelint/lib/utils/blurFunctionArguments"),
    "lib/utils/blurInterpolation": require("stylelint/lib/utils/blurInterpolation"),
    "lib/utils/checkAgainstRule": require("stylelint/lib/utils/checkAgainstRule"),
    "lib/utils/checkInvalidCLIOptions": require("stylelint/lib/utils/checkInvalidCLIOptions"),
    "lib/utils/configurationError": require("stylelint/lib/utils/configurationError"),
    "lib/utils/containsString": require("stylelint/lib/utils/containsString"),
    "lib/utils/declarationValueIndex": require("stylelint/lib/utils/declarationValueIndex"),
    "lib/utils/eachDeclarationBlock": require("stylelint/lib/utils/eachDeclarationBlock"),
    "lib/utils/filterFilePaths": require("stylelint/lib/utils/filterFilePaths"),
    "lib/utils/findAnimationName": require("stylelint/lib/utils/findAnimationName"),
    "lib/utils/findAtRuleContext": require("stylelint/lib/utils/findAtRuleContext"),
    "lib/utils/findFontFamily": require("stylelint/lib/utils/findFontFamily"),
    "lib/utils/findListStyleType": require("stylelint/lib/utils/findListStyleType"),
    "lib/utils/functionArgumentsSearch": require("stylelint/lib/utils/functionArgumentsSearch"),
    "lib/utils/getAtRuleParams": require("stylelint/lib/utils/getAtRuleParams"),
    "lib/utils/getDeclarationValue": require("stylelint/lib/utils/getDeclarationValue"),
    "lib/utils/getFormatterOptionsText": require("stylelint/lib/utils/getFormatterOptionsText"),
    "lib/utils/getModulePath": require("stylelint/lib/utils/getModulePath"),
    "lib/utils/getNextNonSharedLineCommentNode": require("stylelint/lib/utils/getNextNonSharedLineCommentNode"),
    "lib/utils/getOsEol": require("stylelint/lib/utils/getOsEol"),
    "lib/utils/getPreviousNonSharedLineCommentNode": require("stylelint/lib/utils/getPreviousNonSharedLineCommentNode"),
    "lib/utils/getRuleSelector": require("stylelint/lib/utils/getRuleSelector"),
    "lib/utils/getSchemeFromUrl": require("stylelint/lib/utils/getSchemeFromUrl"),
    "lib/utils/getUnitFromValueNode": require("stylelint/lib/utils/getUnitFromValueNode"),
    "lib/utils/hasBlock": require("stylelint/lib/utils/hasBlock"),
    "lib/utils/hasEmptyBlock": require("stylelint/lib/utils/hasEmptyBlock"),
    "lib/utils/hasEmptyLine": require("stylelint/lib/utils/hasEmptyLine"),
    "lib/utils/hasInterpolation": require("stylelint/lib/utils/hasInterpolation"),
    "lib/utils/hasLessInterpolation": require("stylelint/lib/utils/hasLessInterpolation"),
    "lib/utils/hasPsvInterpolation": require("stylelint/lib/utils/hasPsvInterpolation"),
    "lib/utils/hasScssInterpolation": require("stylelint/lib/utils/hasScssInterpolation"),
    "lib/utils/hasTplInterpolation": require("stylelint/lib/utils/hasTplInterpolation"),
    "lib/utils/hash": require("stylelint/lib/utils/hash"),
    "lib/utils/isAfterComment": require("stylelint/lib/utils/isAfterComment"),
    "lib/utils/isAfterSingleLineComment": require("stylelint/lib/utils/isAfterSingleLineComment"),
    "lib/utils/isAfterStandardPropertyDeclaration": require("stylelint/lib/utils/isAfterStandardPropertyDeclaration"),
    "lib/utils/isAutoprefixable": require("stylelint/lib/utils/isAutoprefixable"),
    "lib/utils/isBlocklessAtRuleAfterBlocklessAtRule": require("stylelint/lib/utils/isBlocklessAtRuleAfterBlocklessAtRule"),
    "lib/utils/isBlocklessAtRuleAfterSameNameBlocklessAtRule": require("stylelint/lib/utils/isBlocklessAtRuleAfterSameNameBlocklessAtRule"),
    "lib/utils/isContextFunctionalPseudoClass": require("stylelint/lib/utils/isContextFunctionalPseudoClass"),
    "lib/utils/isCounterIncrementCustomIdentValue": require("stylelint/lib/utils/isCounterIncrementCustomIdentValue"),
    "lib/utils/isCounterResetCustomIdentValue": require("stylelint/lib/utils/isCounterResetCustomIdentValue"),
    "lib/utils/isCustomElement": require("stylelint/lib/utils/isCustomElement"),
    "lib/utils/isCustomMediaQuery": require("stylelint/lib/utils/isCustomMediaQuery"),
    "lib/utils/isCustomProperty": require("stylelint/lib/utils/isCustomProperty"),
    "lib/utils/isCustomSelector": require("stylelint/lib/utils/isCustomSelector"),
    "lib/utils/isFirstNested": require("stylelint/lib/utils/isFirstNested"),
    "lib/utils/isFirstNodeOfRoot": require("stylelint/lib/utils/isFirstNodeOfRoot"),
    "lib/utils/isKeyframeRule": require("stylelint/lib/utils/isKeyframeRule"),
    "lib/utils/isKeyframeSelector": require("stylelint/lib/utils/isKeyframeSelector"),
    "lib/utils/isLessVariable": require("stylelint/lib/utils/isLessVariable"),
    "lib/utils/isMathFunction": require("stylelint/lib/utils/isMathFunction"),
    "lib/utils/isNonNegativeInteger": require("stylelint/lib/utils/isNonNegativeInteger"),
    "lib/utils/isNumbery": require("stylelint/lib/utils/isNumbery"),
    "lib/utils/isOnlyWhitespace": require("stylelint/lib/utils/isOnlyWhitespace"),
    "lib/utils/isPathNotFoundError": require("stylelint/lib/utils/isPathNotFoundError"),
    "lib/utils/isRangeContextMediaFeature": require("stylelint/lib/utils/isRangeContextMediaFeature"),
    "lib/utils/isScssVariable": require("stylelint/lib/utils/isScssVariable"),
    "lib/utils/isSharedLineComment": require("stylelint/lib/utils/isSharedLineComment"),
    "lib/utils/isSingleLineString": require("stylelint/lib/utils/isSingleLineString"),
    "lib/utils/isStandardSyntaxAtRule": require("stylelint/lib/utils/isStandardSyntaxAtRule"),
    "lib/utils/isStandardSyntaxColorFunction": require("stylelint/lib/utils/isStandardSyntaxColorFunction"),
    "lib/utils/isStandardSyntaxCombinator": require("stylelint/lib/utils/isStandardSyntaxCombinator"),
    "lib/utils/isStandardSyntaxComment": require("stylelint/lib/utils/isStandardSyntaxComment"),
    "lib/utils/isStandardSyntaxDeclaration": require("stylelint/lib/utils/isStandardSyntaxDeclaration"),
    "lib/utils/isStandardSyntaxFunction": require("stylelint/lib/utils/isStandardSyntaxFunction"),
    "lib/utils/isStandardSyntaxHexColor": require("stylelint/lib/utils/isStandardSyntaxHexColor"),
    "lib/utils/isStandardSyntaxMathFunction": require("stylelint/lib/utils/isStandardSyntaxMathFunction"),
    "lib/utils/isStandardSyntaxMediaFeature": require("stylelint/lib/utils/isStandardSyntaxMediaFeature"),
    "lib/utils/isStandardSyntaxMediaFeatureName": require("stylelint/lib/utils/isStandardSyntaxMediaFeatureName"),
    "lib/utils/isStandardSyntaxProperty": require("stylelint/lib/utils/isStandardSyntaxProperty"),
    "lib/utils/isStandardSyntaxRule": require("stylelint/lib/utils/isStandardSyntaxRule"),
    "lib/utils/isStandardSyntaxSelector": require("stylelint/lib/utils/isStandardSyntaxSelector"),
    "lib/utils/isStandardSyntaxTypeSelector": require("stylelint/lib/utils/isStandardSyntaxTypeSelector"),
    "lib/utils/isStandardSyntaxUrl": require("stylelint/lib/utils/isStandardSyntaxUrl"),
    "lib/utils/isStandardSyntaxValue": require("stylelint/lib/utils/isStandardSyntaxValue"),
    "lib/utils/isValidFontSize": require("stylelint/lib/utils/isValidFontSize"),
    "lib/utils/isValidHex": require("stylelint/lib/utils/isValidHex"),
    "lib/utils/isVariable": require("stylelint/lib/utils/isVariable"),
    "lib/utils/isWhitespace": require("stylelint/lib/utils/isWhitespace"),
    "lib/utils/matchesStringOrRegExp": require("stylelint/lib/utils/matchesStringOrRegExp"),
    "lib/utils/nextNonCommentNode": require("stylelint/lib/utils/nextNonCommentNode"),
    "lib/utils/noFilesFoundError": require("stylelint/lib/utils/noFilesFoundError"),
    "lib/utils/nodeContextLookup": require("stylelint/lib/utils/nodeContextLookup"),
    "lib/utils/optionsMatches": require("stylelint/lib/utils/optionsMatches"),
    "lib/utils/parseSelector": require("stylelint/lib/utils/parseSelector"),
    "lib/utils/putIfAbsent": require("stylelint/lib/utils/putIfAbsent"),
    "lib/utils/rawNodeString": require("stylelint/lib/utils/rawNodeString"),
    "lib/utils/removeEmptyLinesAfter": require("stylelint/lib/utils/removeEmptyLinesAfter"),
    "lib/utils/removeEmptyLinesBefore": require("stylelint/lib/utils/removeEmptyLinesBefore"),
    "lib/utils/report": require("stylelint/lib/utils/report"),
    "lib/utils/ruleMessages": require("stylelint/lib/utils/ruleMessages"),
    "lib/utils/setAtRuleParams": require("stylelint/lib/utils/setAtRuleParams"),
    "lib/utils/setDeclarationValue": require("stylelint/lib/utils/setDeclarationValue"),
    "lib/utils/transformSelector": require("stylelint/lib/utils/transformSelector"),
    "lib/utils/typeGuards": require("stylelint/lib/utils/typeGuards"),
    "lib/utils/validateObjectWithArrayProps": require("stylelint/lib/utils/validateObjectWithArrayProps"),
    "lib/utils/validateOptions": require("stylelint/lib/utils/validateOptions"),
    "lib/utils/validateTypes": require("stylelint/lib/utils/validateTypes"),
    "lib/utils/vendor": require("stylelint/lib/utils/vendor"),
    "lib/utils/whitespaceChecker": require("stylelint/lib/utils/whitespaceChecker"),
    "packages/postcss/lib/at-rule": require("postcss/lib/at-rule"),
    "packages/postcss/lib/comment": require("postcss/lib/comment"),
    "packages/postcss/lib/container": require("postcss/lib/container"),
    "packages/postcss/lib/css-syntax-error": require("postcss/lib/css-syntax-error"),
    "packages/postcss/lib/declaration": require("postcss/lib/declaration"),
    "packages/postcss/lib/document": require("postcss/lib/document"),
    "packages/postcss/lib/fromJSON": require("postcss/lib/fromJSON"),
    "packages/postcss/lib/input": require("postcss/lib/input"),
    "packages/postcss/lib/lazy-result": require("postcss/lib/lazy-result"),
    "packages/postcss/lib/list": require("postcss/lib/list"),
    "packages/postcss/lib/map-generator": require("postcss/lib/map-generator"),
    "packages/postcss/lib/no-work-result": require("postcss/lib/no-work-result"),
    "packages/postcss/lib/node": require("postcss/lib/node"),
    "packages/postcss/lib/parse": require("postcss/lib/parse"),
    "packages/postcss/lib/parser": require("postcss/lib/parser"),
    "packages/postcss/lib/postcss": require("postcss/lib/postcss"),
    "packages/postcss/lib/previous-map": require("postcss/lib/previous-map"),
    "packages/postcss/lib/processor": require("postcss/lib/processor"),
    "packages/postcss/lib/result": require("postcss/lib/result"),
    "packages/postcss/lib/root": require("postcss/lib/root"),
    "packages/postcss/lib/rule": require("postcss/lib/rule"),
    "packages/postcss/lib/stringifier": require("postcss/lib/stringifier"),
    "packages/postcss/lib/stringify": require("postcss/lib/stringify"),
    "packages/postcss/lib/symbols": require("postcss/lib/symbols"),
    "packages/postcss/lib/terminal-highlight": require("postcss/lib/terminal-highlight"),
    "packages/postcss/lib/tokenize": require("postcss/lib/tokenize"),
    "packages/postcss/lib/warn-once": require("postcss/lib/warn-once"),
    "packages/postcss/lib/warning": require("postcss/lib/warning"),
    "packages/postcss/index": require("postcss/lib/postcss"),
}
/* eslint-enable @mysticatea/node/no-extraneous-require */
