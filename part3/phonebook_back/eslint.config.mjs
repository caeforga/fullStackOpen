import globals from "globals"
import pluginJs from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin-js"


export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" }},
  { ignores: ["mongo.js", "dist", "eslint.config.mjs"]},
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "eqeqeq": "error",
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
          'error', 'always'
      ],
      'arrow-spacing': [
          'error', { 'before': true, 'after': true }
      ],
      "no-console": 0,
    }
    },
  { 
    plugins: {
      stylistic
    },
    rules: {
      "stylistic/indent": ["error", 4],
      "stylistic/linebreak-style": ["error", "windows"],
      "stylistic/quotes": ["error", "single"],
      "stylistic/semi": ["error", "never"]
    }
  }
]