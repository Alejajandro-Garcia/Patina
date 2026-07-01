// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      // console.log/info/warn are errors; debug/error are downgraded to warnings below
      "no-console": ["error", { allow: ["debug", "error"] }],
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name='debug']",
          message: "Unexpected console.debug statement.",
        },
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name='error']",
          message: "Unexpected console.error statement.",
        },
      ],
      "no-var": "error",
    },
  },
]);
