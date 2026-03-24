import { e as createAstro, a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment } from "../../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../../chunks/BaseLayout_mjVBkPps.mjs";
import { g as getCollection } from "../../chunks/_astro_content_DJGO8Shv.mjs";
import { renderers } from "../../renderers.mjs";
const $$Astro = createAstro("https://bhaskarkotakonda.github.io");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post } = Astro2.props;
  const { Content } = await post.render();
  const formattedDate = new Date(post.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const wordCount = post.body.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": post.data.title, "description": post.data.description || `Read ${post.data.title} on Personal OS` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-12"> <div class="mb-4"> <a href="/writing" class="text-sm text-os-muted hover:text-os-accent transition-colors no-underline">
← Back to Writing
</a> </div> <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-balance"> ${post.data.title} </h1> <div class="flex flex-wrap items-center gap-4 text-sm text-os-muted"> <time${addAttribute(post.data.date, "datetime")}>${formattedDate}</time> <span>·</span> <span>${readingTime} min read</span> ${post.data.author && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <span>·</span> <span>By ${post.data.author}</span> ` })}`} </div> ${post.data.tags && post.data.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mt-4"> ${post.data.tags.map((tag) => renderTemplate`<span class="px-2 py-1 text-xs font-medium text-os-muted bg-os-light rounded"> ${tag} </span>`)} </div>`} </header> <!-- Content --> <div class="prose prose-lg max-w-none"> ${renderComponent($$result2, "Content", Content, {})} </div> <!-- Footer --> <footer class="mt-16 pt-8 border-t border-os-light"> <!-- Share Section --> <div class="mb-8"> <p class="text-sm text-os-muted mb-3">Share this post:</p> <div class="flex gap-4"> <a${addAttribute(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.data.title)}&url=${encodeURIComponent(`https://bhaskarkotakonda1.github.io/writing/${post.slug}`)}`, "href")} target="_blank" rel="noopener noreferrer" class="text-os-muted hover:text-os-accent transition-colors">
Twitter
</a> <a${addAttribute(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://bhaskarkotakonda1.github.io/writing/${post.slug}`)}`, "href")} target="_blank" rel="noopener noreferrer" class="text-os-muted hover:text-os-accent transition-colors">
LinkedIn
</a> </div> </div> <!-- Navigation --> <div class="flex justify-between items-center"> <a href="/writing" class="text-os-black hover:text-os-accent-hover transition-colors">
← All posts
</a> <a href="/contact" class="text-os-muted hover:text-os-accent transition-colors">
Questions? Get in touch →
</a> </div> </footer> </article> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/writing/[slug].astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/writing/[slug].astro";
const $$url = "/writing/[slug]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
