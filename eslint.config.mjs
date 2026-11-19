import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

/**
 * Flat ESLint config: Next.js' own rules (core-web-vitals) plus TypeScript.
 *
 * Requires the dev dependencies declared in package.json — run `npm install`
 * once, then `npm run lint`.
 */
export default [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      /* The client-logo frames use a plain <img>: the logos may be remote
         URLs on the organisations' own servers, which next/image would try to
         optimise through a server this static build does not have. */
      "@next/next/no-img-element": "off",
    },
  },
];
