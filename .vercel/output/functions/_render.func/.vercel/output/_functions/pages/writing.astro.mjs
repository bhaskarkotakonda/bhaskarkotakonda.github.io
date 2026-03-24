import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from "../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../chunks/BaseLayout_mjVBkPps.mjs";
import { g as getCollection } from "../chunks/_astro_content_DJGO8Shv.mjs";
import { renderers } from "../renderers.mjs";
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  const postsByYear = sortedPosts.reduce(
    (acc, post) => {
      const year = new Date(post.data.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {}
  );
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Writing", "description": "Thoughts, tutorials, and reflections on technology and life." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-16"> <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Writing</h1> <p class="text-xl text-os-muted">
Thoughts on building products, technology, and life.
</p> </header> ${sortedPosts.length === 0 ? renderTemplate`<div class="py-16"> <p class="text-os-muted">No posts yet. Check back soon!</p> </div>` : renderTemplate`<div class="space-y-12"> ${years.map((year) => renderTemplate`<section> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-6"> ${year} </h2> <ul class="space-y-4"> ${postsByYear[Number(year)].map((post) => {
    const formattedDate = new Date(
      post.data.date
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return renderTemplate`<li class="group"> <a${addAttribute(`/writing/${post.slug}`, "href")} class="flex items-baseline justify-between gap-4 no-underline py-2 -mx-2 px-2 rounded hover:bg-os-light/50 transition-colors"> <span class="font-medium text-os-black group-hover:text-os-accent-hover transition-colors"> ${post.data.title} </span> <span class="text-sm text-os-muted whitespace-nowrap"> ${formattedDate} </span> </a> </li>`;
  })} </ul> </section>`)} </div>`} <!-- Tags Section (if posts have tags) --> ${sortedPosts.some((p) => p.data.tags?.length) && renderTemplate`<div class="mt-16 pt-8 border-t border-os-light"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-4">
Topics
</h2> <div class="flex flex-wrap gap-2"> ${[...new Set(sortedPosts.flatMap((p) => p.data.tags || []))].map(
    (tag) => renderTemplate`<span class="px-3 py-1.5 bg-os-light text-os-dark text-sm rounded-full"> ${tag} </span>`
  )} </div> </div>`} </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/writing/index.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/writing/index.astro";
const $$url = "/writing";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
