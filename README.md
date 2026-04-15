# AthleticTrainerJob.com

A unified Next.js application serving both the marketing site and blog for Cognito Systems (a PSI joint venture). This project recruits athletic trainers for military healthcare careers in Army H2F and Marine Corps SMIP programs.

## Architecture

This single Vercel project serves two domains from one codebase:

| Domain | Content | How it works |
|--------|---------|--------------|
| `athletictrainerjob.com` | Marketing landing page (Webflow export) | `next.config.ts` rewrites `/` → `home.html` |
| `blog.athletictrainerjob.com` | Next.js blog | Middleware rewrites `/` → `/blog` route |

Both domains point to the same Vercel deployment. Hostname-based routing is handled by:

1. **`src/middleware.ts`** — detects `blog.athletictrainerjob.com` and rewrites the root to the `/blog` page
2. **`next.config.ts` rewrites** — serves static HTML pages (`home.html`, `job-description.html`, `thankyou.html`) on the main domain only, using a `has: [{ type: 'host' }]` condition to skip the blog subdomain
3. **`public/js/vendor/blog_link_injector.js`** — injects a "Blog" nav link into the Webflow marketing pages pointing to `blog.athletictrainerjob.com`

## Project Overview

- **Framework:** Next.js 14+ with App Router
- **Content System:** MDX files with frontmatter
- **Styling:** Tailwind CSS with custom design tokens
- **Deployment:** Vercel (single project, two domains)
- **TypeScript:** Full type safety throughout
- **Marketing Site:** Webflow export served as static HTML

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mattcretzman/athletictrainer-blog.git
cd athletictrainer-blog
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) — serves the marketing landing page.
5. Open [http://localhost:3000/blog](http://localhost:3000/blog) — serves the blog.

> **Note:** The middleware hostname routing only applies in production. In local dev, visit `/blog` directly.

## Project Structure

```
athletictrainer-blog/
├── content/
│   ├── posts/                  # MDX blog articles
│   └── authors/                # Author JSON profiles
├── public/
│   ├── home.html               # Webflow marketing landing page
│   ├── job-description.html    # Webflow job description page
│   ├── thankyou.html           # Webflow thank you page
│   ├── css/                    # Webflow stylesheets
│   ├── js/
│   │   ├── vendor/
│   │   │   ├── blog_link_injector.js   # Injects Blog nav link
│   │   │   ├── nav_text_fixes.js       # Nav text corrections
│   │   │   └── ...                     # Webflow/Mapbox vendor scripts
│   │   └── webflow.js
│   ├── images/
│   │   ├── blog/               # Blog post featured images
│   │   └── ...                 # Webflow site images
│   └── videos/                 # Hero video assets
├── src/
│   ├── middleware.ts            # Hostname-based routing
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Navbar + Footer)
│   │   └── blog/
│   │       ├── page.tsx                # Blog index
│   │       ├── [slug]/page.tsx         # Individual posts
│   │       ├── category/[category]/page.tsx
│   │       └── author/[slug]/page.tsx
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Container
│   │   ├── blog/               # PostCard, Sidebar, Pagination, etc.
│   │   ├── mdx/                # Custom MDX components
│   │   └── seo/                # Schema markup components
│   ├── lib/
│   │   ├── mdx.ts              # MDX parsing and queries
│   │   ├── posts.ts            # Post pagination and filtering
│   │   └── utils.ts            # Helper functions
│   └── styles/
│       └── globals.css         # Tailwind + custom CSS
├── next.config.ts              # Rewrites, image config, MDX setup
├── tailwind.config.ts          # Tailwind with design tokens
└── tsconfig.json
```

## Domain & Routing Details

### Marketing Site (`athletictrainerjob.com`)

The Webflow-exported marketing site is served as static HTML from `public/`. Key rewrites in `next.config.ts`:

```
/                → /home.html         (main landing page)
/job-description → /job-description.html
/thankyou        → /thankyou.html
```

These rewrites use a `has` host condition so they only apply on the main domain, not on `blog.athletictrainerjob.com`.

The marketing site nav includes a dynamically injected "Blog" link (via `blog_link_injector.js`) that points to `https://blog.athletictrainerjob.com`.

### Blog (`blog.athletictrainerjob.com`)

The Next.js blog app serves all `/blog/*` routes. The middleware in `src/middleware.ts` rewrites the root `/` to `/blog` when the hostname is `blog.athletictrainerjob.com`, so visitors see the blog index directly.

The blog's Navbar links "Home" back to `https://athletictrainerjob.com` (the main site).

## Creating Content

### Adding a New Blog Post

1. Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "Your Post Title"
slug: "your-post-slug"
description: "Brief description for SEO and previews"
date: "2026-02-15"
author: "psi-editorial"
category: "H2F Program"
tags: ["tag1", "tag2"]
featuredImage: "/images/blog/your-image.jpg"
featuredImageAlt: "Image description"
readingTime: 12
published: true
featured: false
seoTitle: "SEO-optimized title"
seoDescription: "SEO meta description"
canonicalUrl: "https://blog.athletictrainerjob.com/blog/your-post-slug"
schema: "Article"
primaryKeyword: "main keyword"
relatedPosts: ["related-post-1", "related-post-2"]
---

Your content here using MDX and custom components.
```

2. Add your featured image to `public/images/blog/` (or reference an existing image in `public/images/`)

3. Build and test:
```bash
npm run build
npm run dev
```

### Custom MDX Components

**Callout**
```mdx
<Callout type="info|warning|tip|mission">
Your callout content here
</Callout>
```

**FAQ**
```mdx
<FAQ>
  <FAQItem question="Your question?">
    Answer content
  </FAQItem>
</FAQ>
```

**Job CTA**
```mdx
<JobCTA location="Fort Riley" program="H2F" />
```

**Salary Range**
```mdx
<SalaryRange min={60000} max={90000} disclaimer={true} />
```

**Location Card**
```mdx
<LocationCard
  name="Fort Riley"
  state="Kansas"
  program="H2F"
  description="Brief description"
/>
```

### Adding Authors

Create a JSON file in `content/authors/`:

```json
{
  "slug": "author-slug",
  "name": "Author Name",
  "title": "Author Title",
  "bio": "Author biography",
  "photo": "/images/authors/photo.jpg",
  "linkedin": "https://linkedin.com/in/..."
}
```

## SEO Features

- Dynamic meta tags (title, description, Open Graph, Twitter Cards)
- Canonical URLs on all pages
- Article structured data (JSON-LD)
- FAQ and Breadcrumb structured data
- Dynamic sitemap at `/blog/sitemap.xml`
- RSS feed at `/blog/feed.xml`
- Performance optimized images via `next/image`

## Deployment

Deployment is automatic via GitHub → Vercel integration. Pushing to `main` triggers a production build.

### Vercel Project Domains

| Domain | Type |
|--------|------|
| `athletictrainerjob.com` | Production (main site) |
| `www.athletictrainerjob.com` | Production (redirect) |
| `blog.athletictrainerjob.com` | Production (blog) |

### Build Settings

- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Output Mode:** `standalone`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Troubleshooting

**Blog shows 404 on `blog.athletictrainerjob.com`:**
- Verify `src/middleware.ts` exists and rewrites `/` to `/blog`
- Check the `has` host condition in `next.config.ts` isn't blocking the blog subdomain

**Marketing site shows on blog subdomain:**
- The `beforeFiles` rewrite for `/` → `home.html` must have the `has: [{ type: 'host', value: '(?!blog\\.).*' }]` condition

**Images not loading on blog posts:**
- Confirm image files exist in `public/images/` or `public/images/blog/`
- Check `featuredImage` paths in MDX frontmatter match actual filenames
- Verify `next.config.ts` `images.remotePatterns` includes the hostname for remote images

**Blog nav link missing on marketing site:**
- Check `public/js/vendor/blog_link_injector.js` is loaded in `home.html`
- The injector looks for a nav link with text "Community" to insert after

## Content Guidelines

### Blog Post Requirements

1. **Frontmatter:** Complete all required fields
2. **Images:** WebP or JPG format, optimized, with alt text
3. **Length:** Minimum 1,500 words for SEO value
4. **Headings:** Proper H2/H3 structure
5. **Internal Links:** Link to 2-3 related posts
6. **CTAs:** Include at least one JobCTA component
7. **SEO:** Target one primary keyword naturally

### Brand Voice

- **Tone:** Professional, authoritative, warm
- **Perspective:** Second person ("you")
- **Style:** "Trusted advisor" not "recruiter"
- **Vocabulary:**
  - Use "athletic trainer" not "AT" in first reference
  - Use "service members" not "troops"
  - Use "military healthcare" not "military medicine"

## License

© 2026 Planned Systems International. All rights reserved.
