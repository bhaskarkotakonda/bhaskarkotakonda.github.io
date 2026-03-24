import { e as createAstro, a as createComponent, r as renderTemplate, d as addAttribute, b as renderComponent, F as Fragment, m as maybeRenderHead, f as renderHead, g as renderSlot } from "./astro/server_8LY360yf.mjs";
import "kleur/colors";
import { jsx, jsxs } from "react/jsx-runtime";
/* empty css                         */
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://bhaskarkotakonda.github.io");
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navbar;
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/career", label: "Career" },
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Blog" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/hobbies", label: "Hobbies" },
    { href: "/content", label: "Recommended Content" }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["", '<header class="sticky top-0 z-50 bg-os-white/80 backdrop-blur-md border-b border-os-light"> <nav class="container-content"> <div class="flex items-center justify-between h-16"> <!-- Logo --> <a href="/" class="text-xl font-bold text-os-black no-underline hover:text-os-accent transition-colors">\nBhaskar Kotakonda\n</a> <!-- Desktop Navigation --> <ul class="hidden md:flex items-center space-x-6"> ', ' </ul> <!-- Mobile menu button --> <button id="mobile-toggle" class="md:hidden px-3 py-2 bg-os-accent text-os-black text-sm font-medium rounded-lg">\n☰\n</button> </div> <!-- Mobile Navigation Drawer --> <ul id="mobile-menu" class="md:hidden hidden flex flex-col space-y-2 mt-2"> ', ' </ul> <script type="module">\n      const toggle = document.getElementById("mobile-toggle");\n      const menu = document.getElementById("mobile-menu");\n      toggle.addEventListener("click", () => {\n        menu.classList.toggle("hidden");\n      });\n    <\/script> </nav> </header>'])), maybeRenderHead(), navLinks.map((link) => renderTemplate`<li${addAttribute(link.dropdown ? "relative group" : "", "class")}> ${link.dropdown ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <button${addAttribute([
    "text-sm font-medium transition-colors flex items-center gap-1",
    currentPath.startsWith(link.href) ? "text-os-black" : "text-os-muted hover:text-os-accent"
  ], "class:list")}> ${link.label} <svg class="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> ${currentPath.startsWith(link.href) && renderTemplate`<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-os-accent"></span>`} </button> <ul class="absolute left-0 top-full mt-2 py-2 bg-os-white border border-os-light rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[120px] z-50"> <li> <a${addAttribute(link.href, "href")} class="block px-4 py-2 text-sm text-os-muted hover:text-os-accent hover:bg-os-light/50 no-underline">
All ${link.label} </a> </li> ${link.dropdown.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute([
    "block px-4 py-2 text-sm no-underline hover:bg-os-light/50",
    currentPath === item.href ? "text-os-black font-medium" : "text-os-muted hover:text-os-accent"
  ], "class:list")}> ${item.label} </a> </li>`)} </ul> ` })}` : renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute([
    "text-sm font-medium no-underline transition-colors relative",
    currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href) ? "text-os-black" : "text-os-muted hover:text-os-accent"
  ], "class:list")}> ${link.label} ${(currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href)) && renderTemplate`<span class="block h-0.5 bg-os-accent mt-1"></span>`} </a>`} </li>`), navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="block px-4 py-2 text-os-black hover:bg-os-light/50 rounded"> ${link.label} </a> </li>`));
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/components/Navbar.astro", void 0);
const socialLinks = [
  {
    href: "https://github.com/bhaskarkotakonda",
    label: "GitHub",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
        clipRule: "evenodd"
      }
    ) })
  },
  {
    href: "https://www.linkedin.com/in/bhaskarkotakonda/",
    label: "LinkedIn",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }) })
  },
  {
    href: "https://x.com/bhaskieboi",
    label: "Twitter",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
  },
  {
    href: "mailto:bhaskar.sai12@gmail.com",
    label: "Email",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          }
        )
      }
    )
  }
];
const footerLinks = [
  { href: "/contact", label: "Contact" }
];
function Footer({ basePath = "" }) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-os-light bg-os-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-content mx-auto px-4 md:px-6 py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-6", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center md:text-left", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-os-muted", children: [
      "© ",
      currentYear,
      " Bhaskar Kotakonda. All rights reserved."
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-6", children: footerLinks.map((link) => /* @__PURE__ */ jsx(
      "a",
      {
        href: `${basePath}${link.href}`,
        className: "text-sm text-os-muted hover:text-os-accent no-underline transition-colors duration-200 ease-out motion-reduce:transition-none",
        children: link.label
      },
      link.href
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: socialLinks.map((link) => /* @__PURE__ */ jsx(
      "a",
      {
        href: link.href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "text-os-muted hover:text-os-accent transition-colors duration-200 ease-out motion-reduce:transition-none",
        "aria-label": link.label,
        children: link.icon
      },
      link.label
    )) })
  ] }) }) });
}
const $$Astro = createAstro("https://bhaskarkotakonda.github.io");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "Bhaskar Kotakonda - A digital home for thoughts, work, and experiments",
    image = "/og-image.png"
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Primary Meta Tags --><title>${title} | Bhaskar Kotakonda</title><meta name="title"${addAttribute(`${title} | Bhaskar Kotakonda`, "content")}><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(`${title} | Bhaskar Kotakonda`, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(image, "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(canonicalURL, "content")}><meta property="twitter:title"${addAttribute(`${title} | Bhaskar Kotakonda`, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(image, "content")}><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- PWA --><link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#0a0a0a"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="Bhaskar Kotakonda"><link rel="apple-touch-icon" href="/icons/icon-192x192.png"><!-- Preconnect for performance --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", Footer, {})} <!-- Service Worker Registration -->  </body> </html>`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/layouts/BaseLayout.astro", void 0);
export {
  $$BaseLayout as $
};
