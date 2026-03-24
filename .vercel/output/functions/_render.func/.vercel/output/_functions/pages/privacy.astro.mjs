import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../chunks/BaseLayout_mjVBkPps.mjs";
import { renderers } from "../renderers.mjs";
const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Privacy Policy" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-16 md:py-24"> <h1 class="text-4xl font-bold mb-8">Privacy Policy</h1> <div class="prose"> <p class="text-os-muted mb-8">
Last updated: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} </p> <h2>Overview</h2> <p>
This website respects your privacy. This policy explains how we collect, 
        use, and protect any information that you provide when using this website.
</p> <h2>Information We Collect</h2> <p>
This is a static website. We do not collect personal information unless 
        you voluntarily provide it through contact forms or newsletter signups.
</p> <h2>Cookies</h2> <p>
This website may use minimal cookies for analytics purposes. You can 
        disable cookies in your browser settings.
</p> <h2>Third-Party Services</h2> <p>
We may use third-party services for analytics. These services have their 
        own privacy policies.
</p> <h2>Contact</h2> <p>
If you have questions about this privacy policy, please contact us at${" "} <a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a>.
</p> </div> </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/privacy.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/privacy.astro";
const $$url = "/privacy";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
