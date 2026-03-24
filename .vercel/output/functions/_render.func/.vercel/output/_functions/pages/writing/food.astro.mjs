import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from "../../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../../chunks/BaseLayout_mjVBkPps.mjs";
import { g as getCollection } from "../../chunks/_astro_content_DJGO8Shv.mjs";
import { renderers } from "../../renderers.mjs";
const $$Food = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("blog", ({ data }) => !data.draft);
  const posts = allPosts.filter(
    (post) => post.data.tags?.some(
      (tag) => ["food", "cooking", "recipes", "restaurants", "cuisine"].includes(tag.toLowerCase())
    )
  ).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Food Writing", "description": "Explorations in food, cooking, and culinary adventures." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-16"> <nav class="text-sm text-os-muted mb-4"> <a href="/writing" class="hover:text-os-accent no-underline">Writing</a> <span class="mx-2">/</span> <span>Food</span> </nav> <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Food</h1> <p class="text-xl text-os-muted">
Culinary adventures, recipes, and explorations of food culture around the world.
</p> </header> <!-- Posts --> ${posts.length === 0 ? renderTemplate`<div class="py-16 text-center"> <p class="text-os-muted mb-4">No food posts yet. Check back soon!</p> <a href="/writing" class="text-os-accent hover:text-os-accent-hover">
← View all writing
</a> </div>` : renderTemplate`<div class="space-y-6"> ${posts.map((post) => {
    const formattedDate = new Date(post.data.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return renderTemplate`<article class="group p-6 border border-os-light rounded-lg hover:border-os-accent transition-colors"> <a${addAttribute(`/writing/${post.slug}`, "href")} class="no-underline"> <h2 class="text-xl font-bold mb-2 group-hover:text-os-accent transition-colors"> ${post.data.title} </h2> <p class="text-os-muted text-sm mb-3">${formattedDate}</p> ${post.data.description && renderTemplate`<p class="text-os-dark">${post.data.description}</p>`} </a> </article>`;
  })} </div>`} <!-- Topics --> <div class="mt-16 pt-8 border-t border-os-light"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-4">Related Topics</h2> <div class="flex flex-wrap gap-2"> <span class="px-3 py-1.5 bg-os-light text-os-dark text-sm rounded-full">Cooking</span> <span class="px-3 py-1.5 bg-os-light text-os-dark text-sm rounded-full">Recipes</span> <span class="px-3 py-1.5 bg-os-light text-os-dark text-sm rounded-full">Restaurants</span> <span class="px-3 py-1.5 bg-os-light text-os-dark text-sm rounded-full">Food Culture</span> </div> </div> </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/writing/food.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/writing/food.astro";
const $$url = "/writing/food";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Food,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
