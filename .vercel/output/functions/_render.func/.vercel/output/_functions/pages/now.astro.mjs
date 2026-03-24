import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from "../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../chunks/BaseLayout_mjVBkPps.mjs";
import { renderers } from "../renderers.mjs";
const $$Now = createComponent(($$result, $$props, $$slots) => {
  const currentFocus = [
    {
      category: "Work",
      items: [
        "Building developer tools at [Company]",
        "Exploring AI agent architectures",
        "Contributing to open source projects"
      ]
    },
    {
      category: "Learning",
      items: [
        "Deep diving into LLM fine-tuning",
        "Studying distributed systems papers",
        "Improving my writing craft"
      ]
    },
    {
      category: "Creating",
      items: [
        "This Bhaskar Kotakonda site",
        "A CLI tool for personal knowledge management",
        "Weekly technical blog posts"
      ]
    },
    {
      category: "Reading",
      items: [
        '"Designing Data-Intensive Applications" by Martin Kleppmann',
        '"The Art of Doing Science and Engineering" by Richard Hamming',
        "Various papers on attention mechanisms"
      ]
    }
  ];
  const notDoing = [
    "Taking on new freelance projects",
    "Speaking engagements (for now)",
    "Social media beyond Twitter"
  ];
  const lastUpdated = "January 2026";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Now", "description": "What I'm currently focused on." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-16"> <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Now</h1> <p class="text-xl text-os-muted mb-4">
What I'm currently focused on.
</p> <p class="text-sm text-os-muted">
Last updated: ${lastUpdated} · Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">nownownow.com</a> </p> </header> <!-- Current Focus --> <div class="space-y-12 mb-16"> ${currentFocus.map((section) => renderTemplate`<div> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-4"> ${section.category} </h2> <ul class="space-y-3"> ${section.items.map((item) => renderTemplate`<li class="flex items-start gap-3"> <span class="w-1.5 h-1.5 bg-os-accent rounded-full flex-shrink-0 mt-2"></span> <span class="text-os-dark">${unescapeHTML(item)}</span> </li>`)} </ul> </div>`)} </div> <!-- What I'm NOT Doing --> <div class="mb-16 p-6 bg-os-light/50 rounded-lg"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-4">
What I'm Not Doing Right Now
</h2> <ul class="space-y-2"> ${notDoing.map((item) => renderTemplate`<li class="flex items-center gap-3 text-os-muted"> <span class="text-os-gray">✗</span> <span>${item}</span> </li>`)} </ul> <p class="text-sm text-os-muted mt-4">
This helps me stay focused. If you reach out about something on this list, 
        I'll likely decline politely.
</p> </div> <!-- Life Context --> <div class="mb-16"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-4">
Life Context
</h2> <p class="text-lg text-os-dark leading-relaxed mb-4">
Currently based in [City]. My days are structured around deep work in the 
        morning, meetings and collaboration in the afternoon, and learning/writing 
        in the evening.
</p> <p class="text-lg text-os-dark leading-relaxed">
I'm in a season of building—focused on creating things that compound over 
        time rather than chasing short-term wins.
</p> </div> <!-- Theme for the Year --> <div class="p-6 bg-os-accent/10 border-l-4 border-os-accent rounded-r-lg mb-16"> <h2 class="font-semibold text-os-black mb-2">2026 Theme: Depth over Breadth</h2> <p class="text-os-muted">
This year I'm going deep instead of wide. Fewer projects, more mastery. 
        Less scrolling, more reading. Less talking, more shipping.
</p> </div> <!-- Footer --> <div class="pt-8 border-t border-os-light"> <p class="text-os-muted mb-4">
Want to know more about what I'm working on?
</p> <div class="flex flex-wrap gap-4"> <a href="/work" class="btn-outline">
See my work
</a> <a href="/writing" class="btn-outline">
Read my writing
</a> </div> </div> </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/now.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/now.astro";
const $$url = "/now";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Now,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
