import { renderers } from "./renderers.mjs";
import { c as createExports } from "./chunks/entrypoint_BY5QSG9I.mjs";
import { manifest } from "./manifest_BCnBe0S3.mjs";
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/404.astro.mjs");
const _page2 = () => import("./pages/about.astro.mjs");
const _page3 = () => import("./pages/career.astro.mjs");
const _page4 = () => import("./pages/contact.astro.mjs");
const _page5 = () => import("./pages/content.astro.mjs");
const _page6 = () => import("./pages/hobbies.astro.mjs");
const _page7 = () => import("./pages/newsletter.astro.mjs");
const _page8 = () => import("./pages/now.astro.mjs");
const _page9 = () => import("./pages/os/dashboard.astro.mjs");
const _page10 = () => import("./pages/privacy.astro.mjs");
const _page11 = () => import("./pages/projects.astro.mjs");
const _page12 = () => import("./pages/work.astro.mjs");
const _page13 = () => import("./pages/writing/ai.astro.mjs");
const _page14 = () => import("./pages/writing/food.astro.mjs");
const _page15 = () => import("./pages/writing/product.astro.mjs");
const _page16 = () => import("./pages/writing/sports.astro.mjs");
const _page17 = () => import("./pages/writing/_slug_.astro.mjs");
const _page18 = () => import("./pages/writing.astro.mjs");
const _page19 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/404.astro", _page1],
  ["src/pages/about.astro", _page2],
  ["src/pages/career.astro", _page3],
  ["src/pages/contact.astro", _page4],
  ["src/pages/content.astro", _page5],
  ["src/pages/hobbies.astro", _page6],
  ["src/pages/newsletter.astro", _page7],
  ["src/pages/now.astro", _page8],
  ["src/pages/os/dashboard.astro", _page9],
  ["src/pages/privacy.astro", _page10],
  ["src/pages/projects.astro", _page11],
  ["src/pages/work.astro", _page12],
  ["src/pages/writing/ai.astro", _page13],
  ["src/pages/writing/food.astro", _page14],
  ["src/pages/writing/product.astro", _page15],
  ["src/pages/writing/sports.astro", _page16],
  ["src/pages/writing/[slug].astro", _page17],
  ["src/pages/writing/index.astro", _page18],
  ["src/pages/index.astro", _page19]
]);
const serverIslandMap = /* @__PURE__ */ new Map();
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  middleware: () => import("./_astro-internal_middleware.mjs")
});
const _args = {
  "middlewareSecret": "bfbb295e-a66f-4dc6-be9a-6aca9a79844d",
  "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
