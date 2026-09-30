import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    // These icons are sub-1KB local SVGs. next/image does not optimize SVG
    // without `dangerouslyAllowSVG`, so a plain <img> is correct here.
    files: ["app/_components/**/*.js", "app/page.js", "app/about/page.js", "app/academy/AcademyPage.js"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    // The split font sheets are served from /public so the relative url() next to
    // each @font-face resolves. Bundling them through an import would break that.
    files: ["app/layout.js"],
    rules: {
      "@next/next/no-css-tags": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
