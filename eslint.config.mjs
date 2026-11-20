import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx,cjs,mjs}"],
    extends: [js.configs.recommended, react.configs.flat.recommended, react.configs.flat["jsx-runtime"]],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    settings: {
      react: {
        version: "19.0"
      }
    },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      // only the rule the old recommended preset enforced; v7's preset adds React Compiler rules this code predates
      "react-hooks/rules-of-hooks": "error",
      "react-refresh/only-export-components": "off",
      "react/prop-types": "off"
    }
  }
]);
