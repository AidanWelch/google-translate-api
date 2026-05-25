import { defineConfig } from "eslint/config";
import globals from "globals";
import node from "eslint-plugin-n";

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
