import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from "../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../chunks/BaseLayout_mjVBkPps.mjs";
import { renderers } from "../renderers.mjs";
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const contactMethods = [
    {
      label: "Email",
      value: "bhaskar.sai12@gmail.com",
      href: "mailto:bhaskar.sai12@gmail.com",
      description: "Best for detailed inquiries"
    },
    {
      label: "Twitter",
      value: "@bhaskieboi",
      href: "https://x.com/bhaskieboi",
      description: "For quick questions or DMs"
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/bhaskarkotakonda",
      href: "https://www.linkedin.com/in/bhaskarkotakonda/",
      description: "Professional connections"
    },
    {
      label: "GitHub",
      value: "github.com/bhaskarkotakonda",
      href: "https://github.com/bhaskarkotakonda",
      description: "Code and open source"
    }
  ];
  const topics = [
    "Collaboration opportunities",
    "Speaking or writing",
    "Technical questions",
    "General hello"
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact", "description": "Get in touch with me." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-16"> <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Contact</h1> <p class="text-xl text-os-muted">
Have a question or want to work together? I'd love to hear from you.
</p> </header> <!-- Contact Methods --> <div class="mb-16"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-6">
Reach Out
</h2> <div class="grid gap-4 sm:grid-cols-2"> ${contactMethods.map((method) => renderTemplate`<a${addAttribute(method.href, "href")}${addAttribute(method.href.startsWith("mailto") ? void 0 : "_blank", "target")}${addAttribute(method.href.startsWith("mailto") ? void 0 : "noopener noreferrer", "rel")} class="block p-5 border border-os-light rounded-lg hover:border-os-accent hover:bg-os-accent/5 transition-all no-underline group"> <p class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-1"> ${method.label} </p> <p class="font-medium text-os-black group-hover:text-os-accent-hover transition-colors"> ${method.value} </p> <p class="text-sm text-os-muted mt-1"> ${method.description} </p> </a>`)} </div> </div> <!-- What I'm Open To --> <div class="mb-16"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-4">
What I'm Open To
</h2> <ul class="space-y-2"> ${topics.map((topic) => renderTemplate`<li class="flex items-center gap-3"> <span class="w-1.5 h-1.5 bg-os-accent rounded-full flex-shrink-0"></span> <span class="text-os-dark">${topic}</span> </li>`)} </ul> </div> <!-- Response Time --> <div class="p-6 bg-os-accent/10 border-l-4 border-os-accent rounded-r-lg mb-16"> <p class="font-semibold text-os-black mb-2">Response Time</p> <p class="text-os-muted">
I typically respond within 48 hours for email. For urgent matters, 
        Twitter DM is usually faster. I read everything, even if I can't 
        respond to all messages.
</p> </div> </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/contact.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/contact.astro";
const $$url = "/contact";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
