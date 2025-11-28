import js from "@eslint/js";//检验js代码的
import globals from "globals";
import tseslint from "typescript-eslint";//检验ts代码的
import pluginVue from "eslint-plugin-vue";//vue
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  // 关闭多单词组件名警告
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off"
    }
  }
]);
