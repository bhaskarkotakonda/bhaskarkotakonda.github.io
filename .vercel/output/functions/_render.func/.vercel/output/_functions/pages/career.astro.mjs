import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../chunks/BaseLayout_mjVBkPps.mjs";
import { renderers } from "../renderers.mjs";
const $$Career = createComponent(($$result, $$props, $$slots) => {
  const experience = [
    {
      company: "Current Company",
      role: "Software Engineer",
      period: "2023 - Present",
      description: "Building developer tools and AI-powered applications. Leading technical initiatives and mentoring junior engineers."
    },
    {
      company: "Previous Company",
      role: "Senior Developer",
      period: "2021 - 2023",
      description: "Worked on large-scale distributed systems and led a team of 5 engineers on critical infrastructure projects."
    },
    {
      company: "Startup Inc",
      role: "Full Stack Developer",
      period: "2019 - 2021",
      description: "Early employee at a fast-growing startup. Built core product features and established engineering best practices."
    }
  ];
  const skills = [
    "TypeScript",
    "Python",
    "React",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Kubernetes",
    "Machine Learning",
    "System Design"
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Career", "description": "My professional journey and work experience." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-16"> <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Career</h1> <p class="text-xl text-os-muted">
My professional journey and the work I've done along the way.
</p> </header> <!-- Experience --> <div class="mb-16"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-8">Experience</h2> <div class="space-y-8"> ${experience.map((job) => renderTemplate`<div class="border-l-2 border-os-light pl-6 hover:border-os-accent transition-colors"> <div class="flex flex-wrap items-baseline justify-between gap-2 mb-2"> <h3 class="text-xl font-bold">${job.role}</h3> <span class="text-sm text-os-muted">${job.period}</span> </div> <p class="text-os-accent font-medium mb-2">${job.company}</p> <p class="text-os-dark">${job.description}</p> </div>`)} </div> </div> <!-- Skills --> <div class="mb-16"> <h2 class="text-sm font-semibold text-os-muted uppercase tracking-wider mb-4">Skills</h2> <ul class="flex flex-wrap gap-2"> ${skills.map((skill) => renderTemplate`<li class="px-3 py-1.5 bg-os-light text-os-dark text-sm rounded-full"> ${skill} </li>`)} </ul> </div> <!-- CTA --> <div class="p-6 bg-os-accent/10 border-l-4 border-os-accent rounded-r-lg"> <p class="font-semibold text-os-black mb-2">Looking to connect?</p> <p class="text-os-muted text-sm">
I'm always open to discussing new opportunities and interesting projects.
<a href="/contact">Get in touch</a>.
</p> </div> </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/career.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/career.astro";
const $$url = "/career";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Career,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
