import { a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from "../chunks/astro/server_8LY360yf.mjs";
import "kleur/colors";
import { $ as $$BaseLayout } from "../chunks/BaseLayout_mjVBkPps.mjs";
import { renderers } from "../renderers.mjs";
const $$Projects = createComponent(($$result, $$props, $$slots) => {
  const projects = [
    {
      title: "Project Name",
      description: "A brief description of what this project does and the problem it solves.",
      tech: ["TypeScript", "React", "Node.js"],
      link: "https://github.com/bhaskarkotakonda",
      status: "In Progress"
    }
    // Add more projects here
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Projects", "description": "A collection of projects I've built and am working on." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-narrow py-20 md:py-32"> <!-- Header --> <header class="mb-16"> <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Projects</h1> <p class="text-xl text-os-muted">
A collection of things I've built, am building, or have contributed to.
</p> </header> <!-- Projects Grid --> <div class="space-y-8"> ${projects.map((project) => renderTemplate`<div class="p-6 border border-os-light rounded-lg hover:border-os-accent transition-colors"> <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4"> <div> <h2 class="text-xl font-bold text-os-black">${project.title}</h2> ${project.status && renderTemplate`<span class="inline-block mt-2 text-xs font-medium px-2 py-1 bg-os-accent/10 text-os-accent rounded"> ${project.status} </span>`} </div> ${project.link && renderTemplate`<a${addAttribute(project.link, "href")} target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-os-accent hover:underline">
View Project →
</a>`} </div> <p class="text-os-muted mb-4">${project.description}</p> <div class="flex flex-wrap gap-2"> ${project.tech.map((t) => renderTemplate`<span class="text-xs font-medium px-2 py-1 bg-os-light rounded"> ${t} </span>`)} </div> </div>`)} </div> <!-- Empty State / Coming Soon --> <div class="mt-12 p-8 bg-os-light/50 rounded-lg text-center"> <p class="text-os-muted">
More projects coming soon. Check out my <a href="https://github.com/bhaskarkotakonda" target="_blank" rel="noopener noreferrer" class="text-os-accent hover:underline">GitHub</a> for the latest work.
</p> </div> </section> ` })}`;
}, "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/projects.astro", void 0);
const $$file = "/Users/bhaskarkotakonda/.gemini/antigravity/scratch/portfolio_os/bhaskarkotakonda.github.io/src/pages/projects.astro";
const $$url = "/projects";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
