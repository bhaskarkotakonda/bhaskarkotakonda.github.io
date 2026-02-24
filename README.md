# Bhaskar Kotakonda — Personal Website

> **Live site:** [bhaskarkotakonda1.github.io](https://bhaskarkotakonda1.github.io)

A Progressive Web App (PWA) personal website and blog built with **Astro 4**, **React 18**, and **Tailwind CSS 3**. Statically generated and deployed to GitHub Pages.

---

## Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Pages](#-pages)
- [Components](#-components)
- [Content Collections](#-content-collections)
- [Design Tokens](#-design-tokens)
- [Writing Blog Posts](#-writing-blog-posts)
- [Configuration](#-configuration)
- [PWA Setup](#-pwa-setup)
- [Deployment](#-deployment)
- [Scripts Reference](#-scripts-reference)
- [Tech Stack](#-tech-stack)
- [License](#-license)

---

## ✨ Features

- ⚡ **Static Site Generation** — Built with Astro for zero-JS-by-default performance
- 📱 **PWA Ready** — Installable with offline fallback via service worker
- 📝 **MDX Blog** — Posts with component-enhanced Markdown, tag filtering, and reading time
- 🎨 **Design System** — Tailwind CSS with a custom `os-*` color palette and spacing scale
- 🔍 **Search Palette** — Cmd+K / Ctrl+K command palette with keyboard navigation
- 📊 **SEO Optimized** — Open Graph meta, Twitter cards, sitemap generation
- ⚛️ **React Islands** — Interactive components (Navbar, Search, Toast) hydrated on demand
- 🚀 **GitHub Pages** — Automatic deployment on push to `main`

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Setup

```bash
# Clone the repository
git clone https://github.com/bhaskarkotakonda1/bhaskarkotakonda1.github.io.git
cd bhaskarkotakonda1.github.io

# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 📁 Project Structure

```
bhaskarkotakonda1.github.io/
├── public/
│   ├── icons/                # PWA icons (72×72 → 512×512)
│   │   └── placeholder.txt   # Replace with actual icon PNGs
│   ├── images/               # Static images (hero photo, etc.)
│   ├── manifest.json          # PWA web app manifest
│   ├── offline.html           # Offline fallback page
│   └── sw.js                  # Service worker (shell + runtime caching)
│
├── src/
│   ├── env.d.ts               # Astro TypeScript environment reference
│   │
│   ├── components/            # UI components (Astro + React)
│   │   ├── Navbar.astro       # Server-rendered navigation bar
│   │   ├── Navbar.tsx         # React navbar (unused alternative)
│   │   ├── Footer.astro       # Server-rendered site footer
│   │   ├── Footer.tsx         # React footer (unused alternative)
│   │   ├── Button.tsx         # Button + ButtonLink with variants/sizes
│   │   ├── Card.tsx           # Composable Card (Header/Title/Content/Footer)
│   │   ├── ListTable.tsx      # Data table for items with tags and dates
│   │   ├── SearchPalette.tsx  # Cmd+K search command palette
│   │   ├── TagChip.tsx        # Tag chip (link / button / static)
│   │   ├── Toast.tsx          # Toast notification + useToast hook
│   │   └── index.ts           # Barrel re-export for all React components
│   │
│   ├── content/               # Astro Content Collections
│   │   ├── config.ts          # Collection schemas (blog, jds)
│   │   ├── blog/              # MDX blog posts
│   │   │   ├── ai-anti-marxian-force.mdx
│   │   │   ├── ai-spending-600-billion-conundrum.mdx
│   │   │   ├── building-pwa-with-astro.mdx
│   │   │   ├── endgame-ai-corporate-transformation.mdx
│   │   │   ├── navigating-career-post-ai-labour-world.mdx
│   │   │   └── welcome.mdx
│   │   └── jds/               # Job description analyses (Markdown)
│   │       ├── pm-compute-google.md
│   │       ├── pm-databases-analytics-google.md
│   │       ├── pm-generative-ai-google.md
│   │       ├── pm-gke-ai-google.md
│   │       ├── pm-google-cloud.md
│   │       ├── sr-pm-kernels-amazon.md
│   │       ├── sr-pm-s3-amazon.md
│   │       ├── tpm-compute-infra-google.md
│   │       ├── tpm-core-infra-meta.md
│   │       └── tpm-ml-google.md
│   │
│   ├── layouts/               # Page layouts
│   │   ├── BaseLayout.astro   # Primary HTML shell (SEO, OG, PWA, nav, footer)
│   │   ├── BlogPostLayout.astro # Blog post wrapper (date, title, tags, prose)
│   │   └── Layout.astro       # Extended layout (fullWidth, hideNavbar options)
│   │
│   ├── lib/                   # Shared utilities & types
│   │   └── types.ts           # TypeScript interfaces (User, Item, DailyLog, etc.)
│   │
│   ├── pages/                 # File-based routing
│   │   ├── index.astro        # Homepage — hero, tagline, about summary
│   │   ├── 404.astro          # Custom 404 page
│   │   ├── about.astro        # About me — bio, background, interests
│   │   ├── career.astro       # Career — work experience timeline & skills
│   │   ├── contact.astro      # Contact — methods, topics, response times
│   │   ├── content.astro      # Essential content — videos, podcasts, talks
│   │   ├── hobbies.astro      # Hobbies — interests with icons
│   │   ├── newsletter.astro   # Newsletter — embedded Substack
│   │   ├── now.astro          # /now page — current focus & context
│   │   ├── privacy.astro      # Privacy policy
│   │   ├── projects.astro     # Projects showcase
│   │   ├── work.astro         # Work portfolio — problem/solution/impact
│   │   └── writing/           # Blog section
│   │       ├── index.astro    # Blog index — all posts grouped by year
│   │       ├── [slug].astro   # Dynamic blog post page (reading time, share)
│   │       ├── ai.astro       # Tag filter — AI posts
│   │       ├── food.astro     # Tag filter — food posts
│   │       ├── product.astro  # Tag filter — product posts
│   │       └── sports.astro   # Tag filter — sports posts
│   │
│   └── styles/
│       └── global.css         # Tailwind layers + design tokens + prose styles
│
├── astro.config.mjs           # Astro config (site URL, integrations, Shiki)
├── tailwind.config.js         # Tailwind config (colors, fonts, spacing, animations)
├── tsconfig.json              # TypeScript config (strict, path aliases)
├── package.json               # Dependencies & scripts
└── README.md                  # ← You are here
```

---

## 📄 Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.astro` | Homepage with hero image, name, and tagline |
| `/about` | `about.astro` | Bio, current role, background, interests |
| `/work` | `work.astro` | Work portfolio with problem/solution/impact cards |
| `/projects` | `projects.astro` | Projects showcase |
| `/career` | `career.astro` | Work experience timeline and skills |
| `/writing` | `writing/index.astro` | Blog index — posts grouped by year |
| `/writing/:slug` | `writing/[slug].astro` | Individual blog post with reading time |
| `/writing/ai` | `writing/ai.astro` | Blog posts filtered by AI tag |
| `/writing/food` | `writing/food.astro` | Blog posts filtered by food tag |
| `/writing/product` | `writing/product.astro` | Blog posts filtered by product tag |
| `/writing/sports` | `writing/sports.astro` | Blog posts filtered by sports tag |
| `/contact` | `contact.astro` | Contact methods and topics |
| `/newsletter` | `newsletter.astro` | Embedded Substack newsletter |
| `/hobbies` | `hobbies.astro` | Hobbies and interests |
| `/content` | `content.astro` | Essential content (videos, podcasts, talks) |
| `/now` | `now.astro` | What I'm focused on right now |
| `/privacy` | `privacy.astro` | Privacy policy |
| `/404` | `404.astro` | Custom error page |

---

## 🧩 Components

### Astro Components (server-rendered)

| Component | Description |
|-----------|-------------|
| `Navbar.astro` | Top navigation bar with desktop links and mobile hamburger menu |
| `Footer.astro` | Site footer with social links (GitHub, Twitter/X, LinkedIn, Email) and copyright |

### React Components (client-hydrated)

| Component | Description |
|-----------|-------------|
| `Button.tsx` | Reusable button with 4 variants (`primary`, `secondary`, `outline`, `ghost`), 3 sizes, and loading state. Also exports `ButtonLink` for anchor elements styled as buttons. |
| `Card.tsx` | Composable card with sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `ListTable.tsx` | Data table for displaying items with title, tags, status badges, and formatted dates |
| `SearchPalette.tsx` | Cmd+K / Ctrl+K search command palette with keyboard navigation, grouped results, and backdrop. Exports `useSearchPalette` hook. |
| `TagChip.tsx` | Tag/chip that renders as `<a>`, `<button>`, or `<span>` depending on props |
| `Toast.tsx` | Toast notification (success / error / info / warning) with auto-dismiss. Exports `useToast` hook. |
| `index.ts` | Barrel file re-exporting all React components |

---

## 📚 Content Collections

Defined in `src/content/config.ts` using Astro's content collections API.

### `blog` Collection

MDX files in `src/content/blog/`. Schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Post title |
| `description` | `string` | Yes | Short summary for SEO/previews |
| `date` | `string` | Yes | Publication date (`YYYY-MM-DD`) |
| `tags` | `string[]` | No | Topic tags (e.g., `ai`, `product`, `food`) |
| `draft` | `boolean` | No | If `true`, excluded from production builds |

### `jds` Collection

Markdown files in `src/content/jds/`. Contains job description analyses for PM/TPM roles at Google, Amazon, and Meta.

---

## 🎨 Design Tokens

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `os-black` | `#0a0a0a` | Primary text |
| `os-dark` | `#171717` | Dark backgrounds |
| `os-gray` | `#404040` | Secondary borders |
| `os-muted` | `#737373` | Muted / secondary text |
| `os-light` | `#e5e5e5` | Light borders, dividers |
| `os-white` | `#fafafa` | Page background |
| `os-accent` | `#facc15` | Primary accent (yellow) |
| `os-accent-hover` | `#eab308` | Accent hover state |
| `os-accent-light` | `#fef08a` | Accent light variant |

### Typography

- **Font stack:** System UI (`system-ui`, `-apple-system`, `Segoe UI`, …)
- **Mono font:** `SF Mono`, `Monaco`, `Fira Mono`, …
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Spacing

4px baseline grid — see `tailwind.config.js` for full scale (2px–128px).

### Shadows

`os-sm`, `os-md`, `os-lg`, `os-xl` — progressively larger elevation shadows.

### Animations

`fade-in`, `slide-up`, `slide-down` — 0.3s ease transitions. All respect `prefers-reduced-motion`.

---

## 📝 Writing Blog Posts

1. Create an `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description for SEO and social cards"
date: "2025-01-15"
tags: ["ai", "product"]
draft: false
---

Your **MDX** content here. You can use React components:

import { Button } from '../components';

<Button variant="primary">Click me</Button>
```

2. The post automatically appears at `/writing/your-post-title`.
3. Tag-filtered pages (`/writing/ai`, `/writing/product`, etc.) update automatically.

---

## 🔧 Configuration

### `astro.config.mjs`

| Setting | Value | Notes |
|---------|-------|-------|
| `site` | `https://bhaskarkotakonda1.github.io` | Used for sitemap & canonical URLs |
| `output` | `static` | Full static site generation |
| `integrations` | React, Tailwind, MDX, Sitemap | All enabled |
| `markdown.shikiConfig.theme` | `github-dark` | Syntax highlighting theme |

### `tailwind.config.js`

Custom design system extending Tailwind defaults:
- **Colors:** `os-*` palette (see Design Tokens above)
- **Fonts:** System UI + monospace stacks
- **Spacing:** 4px baseline grid (0.5–32 scale)
- **Max widths:** `prose` (65ch), `content` (1200px), `narrow` (720px)
- **Shadows:** `os-sm` through `os-xl`
- **Animations:** `fade-in`, `slide-up`, `slide-down` with keyframes

### `tsconfig.json`

- Extends `astro/tsconfigs/strict`
- **Path aliases:** `@/*` → `src/*`, `@components/*`, `@layouts/*`, `@pages/*`, `@styles/*`, `@content/*`, `@utils/*`
- JSX configured for React (`react-jsx`)

---

## 📱 PWA Setup

The site is configured as a Progressive Web App:

1. **Manifest** (`public/manifest.json`) — Defines app name, theme color (`#0a0a0a`), background color, display mode (`standalone`), and icon sizes.
2. **Service Worker** (`public/sw.js`) — Implements three caching strategies:
   - **Shell caching** — Core HTML/CSS/JS cached on install
   - **Static asset caching** — Images and fonts cached on first fetch
   - **Runtime caching** — API/dynamic requests with network-first fallback
3. **Offline fallback** (`public/offline.html`) — Shown when offline and requested page isn't cached.
4. **Icons** — Place PWA icons (72×72 through 512×512) in `public/icons/`.

> **Note:** Icon PNG files are not yet included — replace `public/icons/placeholder.txt` with actual icon assets.

---

## 🚀 Deployment

### GitHub Pages (automatic)

Push to the `main` branch. GitHub Actions builds and deploys to [bhaskarkotakonda1.github.io](https://bhaskarkotakonda1.github.io).

### Manual deployment

```bash
# Build the site
npm run build

# Deploy to GitHub Pages via gh-pages
npm run deploy

# — or upload the contents of dist/ to any static host
```

---

## 📜 Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `astro dev` | Start dev server with HMR (`localhost:4321`) |
| `start` | `astro dev` | Alias for `dev` |
| `build` | `astro check && astro build` | Type-check then build for production |
| `preview` | `astro preview` | Preview the production build locally |
| `deploy` | `npm run build && gh-pages -d dist` | Build and push `dist/` to `gh-pages` branch |

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | [Astro](https://astro.build) | 4.x |
| UI Library | [React](https://react.dev) | 18.x |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 3.x |
| Content | [MDX](https://mdxjs.com) via `@astrojs/mdx` | 3.x |
| Type Safety | [TypeScript](https://typescriptlang.org) | 5.x |
| Deployment | [GitHub Pages](https://pages.github.com) | — |
| SEO | `@astrojs/sitemap` | 3.x |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with [Astro](https://astro.build) · Deployed on [GitHub Pages](https://pages.github.com)
