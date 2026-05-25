import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
//import js from "@eslint/js";
//import { FlatCompat } from "@eslint/eslintrc";
import node from "eslint-plugin-n";

const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//const compat = new FlatCompat({
//    baseDirectory: __dirname,
//    recommendedConfig: js.configs.recommended,
//    allConfig: js.configs.all
//});

export default defineConfig([
	{
		plugins: {n: node},
		extends: ["n/mixed-esm-and-cjs"],


		languageOptions: {
			globals: {
				...globals.node,
			},

			ecmaVersion: "latest",
		},

		rules: {
			"no-console": "error",

			"max-nested-callbacks": ["error", {
				max: 3,
			}],

			"max-params": ["error", {
				max: 4,
			}],

			"max-lines": ["error", {
				max: 400,
				skipComments: true,
				skipBlankLines: true,
			}],

			semi: ["error", "always"],
			quotes: ["error", "single"],
			indent: ["error", "tab"],

			"no-multiple-empty-lines": ["error", {
				max: 1,
			}],

			"space-before-function-paren": ["error", {
				anonymous: "always",
				named: "never",
				asyncArrow: "always",
			}],

			"no-constant-condition": ["error", {
				checkLoops: false,
			}],

			"no-dupe-keys": "warn",
		}
	}, {
        files: ["tools/updatelanguages.mjs"], 
			rules: {
            	"n/no-unsupported-features/node-builtins": ["error", { version: ">=24.0.0" }],
            	"n/no-unsupported-features/es-builtins": ["error", { version: ">=24.0.0" }],
        },
	},
]);
