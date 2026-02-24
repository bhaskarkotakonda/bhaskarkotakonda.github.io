# Bhaskar Kotakonda

A Progressive Web App (PWA) serving as a personal operating system for the web. Built with Astro, React, and TailwindCSS.

## ✨ Features

- ⚡ **Blazing Fast** - Static site generation with Astro
- 📱 **PWA Ready** - Installable with offline support
- 📝 **MDX Blog** - Write posts with component-enhanced markdown
- 🎨 **Beautiful Design** - Tailwind CSS with custom design tokens
- 📊 **SEO Optimized** - Meta tags, sitemap, and RSS feed
- 🚀 **GitHub Pages** - Automatic deployment

## 🚀 Quick Start

```bash
# Navigate to project
cd bhaskar-kotakonda

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
bhaskar-kotakonda/
├── public/
│   ├── icons/           # PWA icons
│   ├── favicon.svg      # Site favicon
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service worker
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts    # Content collections config
│   │   └── blog/        # MDX blog posts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── work.astro
│   │   ├── about.astro
│   │   ├── login.astro
│   │   ├── privacy.astro
│   │   ├── 404.astro
│   │   └── writing/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎨 Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `os-black` | `#0a0a0a` | Primary text |
| `os-white` | `#fafafa` | Background |
| `os-accent` | `#facc15` | Accent/highlight |
| `os-muted` | `#737373` | Secondary text |

### Typography
- **Font Family**: System font stack
- **Headings**: Font weight 700-800
- **Body**: Font weight 400-500

## 📝 Writing Blog Posts

Create MDX files in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description"
date: "2024-01-01"
tags: ["topic1", "topic2"]
---

Your content here...
```

## 🚀 Deployment

### GitHub Pages

1. Update `astro.config.mjs`:
   - Set `site` to your GitHub Pages URL
   - Set `base` to your repository name

2. Push to the `main` branch - GitHub Actions handles the rest!

### Manual Build

```bash
npm run build
# Upload contents of `dist/` to your host
```

## 🔧 Configuration

### Astro Config (`astro.config.mjs`)
- Site URL and base path
- Integrations (React, Tailwind, MDX)
- Markdown/syntax highlighting

### Tailwind Config (`tailwind.config.js`)
- Custom color palette
- Typography scale
- Spacing system
- Animations

## 📱 PWA Setup

1. Add your icons to `public/icons/` (72x72 to 512x512)
2. Update `public/manifest.json` with your app info
3. The service worker (`public/sw.js`) handles caching

## 📄 License

MIT License - feel free to use this for your own Bhaskar Kotakonda!

---

Built with ❤️ using [Astro](https://astro.build)
