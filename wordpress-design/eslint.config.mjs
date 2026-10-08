import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    // Decorative SVG icons and the hero glow: next/image does not optimize SVG
    // without `dangerouslyAllowSVG`, so a plain <img> is correct here.
    files: ["app/_components/**/*.js"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
