import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../chunks/BaseLayout_mjVBkPps.mjs";
import { renderers } from "../renderers.mjs";
const $$Hobbies = createComponent(($$result, $$props, $$slots) => {
  const hobbies = [
    {
      name: "Reading",
      description: "Non-fiction, biographies, and occasionally sci-fi. Always have a book going.",
      icon: "📚"
    },
    {
      name: "Sports",
      description: "Cricket, basketball, and staying active. Love both playing and watching.",
      icon: "🏀"
    },
    {
      name: "Music",
      description: "Exploring different genres, discovering new artists, and curating playlists.",
      icon: "🎵"
    },
    {
      name: "Travel",
      description: "Exploring new places, cultures, and cuisines. Always planning the next trip.",
      icon: "✈️"
    },
    {
      name: "Cooking",
      description: "Experimenting with new recipes and cuisines. Food is an adventure.",
      icon: "🍳"
    },
    {
      name: "Gaming",
      description: "Strategy games, story-driven adventures, and the occasional competitive match.",
      icon: "🎮"
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Hobbies", "description": "Things I enjoy outside of work." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-12"> <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Hobbies</h1> <p class="text-xl text-os-muted">Things I enjoy outside of work.</p> </header> <!-- Hobbies Grid --> <div class="grid gap-6 md:grid-cols-2"> ${hobbies.map((hobby) => renderTemplate`<div class="p-6 bg-os-light/50 rounded-lg border border-os-light hover:border-os-accent transition-colors"> <div class="flex items-start gap-4"> <span class="text-3xl">${hobby.icon}</span> <div> <h3 class="font-semibold text-os-black mb-1">${hobby.name}</h3> <p class="text-os-muted text-sm">${hobby.description}</p> </div> </div> </div>`)} </div> <!-- Current Favorites --> <div class="mt-16"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-6">Current Favorites</h2> <div class="space-y-6"> <div> <h3 class="font-medium text-os-black mb-2">Currently Reading</h3> <p class="text-os-muted">Add your current book here</p> </div> <div> <h3 class="font-medium text-os-black mb-2">Currently Listening</h3> <p class="text-os-muted">Add your current playlist or podcast here</p> </div> <div> <h3 class="font-medium text-os-black mb-2">Currently Playing</h3> <p class="text-os-muted">Add your current game here</p> </div> </div> </div> </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/hobbies.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/hobbies.astro";
const $$url = "/hobbies";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Hobbies,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
