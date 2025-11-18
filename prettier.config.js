// @ts-check

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  jsxSingleQuote: false,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  printWidth: 100,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: false,
  singleAttributePerLine: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,

  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "(.*)react(.*)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@server/(.*)$",
    "",
    "^@/config$|^(.*)config$",
    "^@/lib$|^@/lib/(.*)$",
    "^@/hooks|^@/hooks/(.*)$",
    "^@/services|^@/services/(.*)$",
    "^@/pages/(.*)$",
    "^@/layouts$|^@/layouts/(.*)$",
    "^@/components$|^@/components/(.*)$",
    "",
    "^[./]",
    ".css$"
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  overrides: [
    {
      files: "*.md",
      options: {
        proseWrap: "never"
      }
    },
    {
      files: "*.css",
      options: {
        // Disable Prettier for CSS files to avoid breaking Tailwind arbitrary values
        parser: "css",
        requirePragma: true
      }
    }
  ]
}
