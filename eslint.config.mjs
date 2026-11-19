import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * Flat ESLint config: Next.js' own rules (core-web-vitals) plus TypeScript.
 *
 *   npm run lint
 */
const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      /* The client-logo frames use a plain <img>: a logo may be a remote URL
         on the organisation's own server, and next/image would try to optimise
         it through a server this static build does not have. */
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
