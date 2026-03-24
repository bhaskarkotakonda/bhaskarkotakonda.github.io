import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from "../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../chunks/BaseLayout_mjVBkPps.mjs";
import { renderers } from "../renderers.mjs";
const $$Content = createComponent(($$result, $$props, $$slots) => {
  const categories = [
    {
      title: "Videos",
      description: "Talks, tutorials, and video content I've created or appeared in.",
      items: [{ title: "Coming soon...", link: null }]
    },
    {
      title: "Podcasts",
      description: "Podcast episodes and audio content.",
      items: [{ title: "Coming soon...", link: null }]
    },
    {
      title: "Reading",
      description: "Recommended sites and long-form reading.",
      items: [{ title: "AI-2027", link: "https://ai-2027.com/" }]
    },
    {
      title: "Talks & Presentations",
      description: "Conference talks and presentations.",
      items: [{ title: "Coming soon...", link: null }]
    },
    {
      title: "Interviews",
      description: "Interviews and features.",
      items: [{ title: "Coming soon...", link: null }]
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Essential Content", "description": "Videos, podcasts, talks, and other media content." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-16"> <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
Essential Content
</h1> <p class="text-xl text-os-muted">
Videos, podcasts, talks, and other media content I've created or been
        featured in.
</p> </header> <!-- Categories --> <div class="space-y-12"> ${categories.map((category) => renderTemplate`<div> <h2 class="text-2xl font-bold mb-2">${category.title}</h2> <p class="text-os-muted mb-6">${category.description}</p> <ul class="space-y-3"> ${category.items.map((item) => renderTemplate`<li class="p-4 bg-os-light/50 rounded-lg"> ${item.link ? renderTemplate`<a${addAttribute(item.link, "href")} target="_blank" rel="noopener noreferrer" class="font-medium hover:text-os-accent"> ${item.title} ↗
</a>` : renderTemplate`<span class="text-os-muted italic">${item.title}</span>`} </li>`)} </ul> </div>`)} </div> </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/content.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/content.astro";
const $$url = "/content";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Content,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
