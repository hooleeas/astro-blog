---
title: 'astro-blog: a personal blog that gives content back to files'
subtitle: No database, no dynamic backend — every post, note and site setting is a file in a repository. A purely static personal blog built with Astro.
pubDate: '2026-10-27'
tags:
  - Astro
  - Open Source
  - Blogging
category: Projects
cover: 'https://astro-blog-admin.pages.dev/images/cover-blog-intro.webp'
translationKey: astro-blog-intro
draft: false
popular: true
---

Many personal blogs eventually lose to maintenance: databases to back up, software to upgrade, and one day the server expires and years of writing vanish with it. astro-blog starts from a plain idea — **content is files**. Posts are Markdown, notes are Markdown, site settings are JSONC, and everything lives in a single Git repository. If the repository exists, the blog exists; moving house means cloning it and building once more.

It is built with [Astro](https://astro.build), and the build output is purely static files that can live on any static host: GitHub Pages, Cloudflare Pages, EdgeOne Pages, or the most ordinary web space.

## What it is made of

### Content as files

`src/content/posts/` holds posts in per-language folders, `src/content/notes/` holds short notes, and a few JSONC files in `src/data/` keep the site-wide settings: site info, navigation, the about page, service lists. There is no database and no runtime query — at build time everything is compiled into static pages.

### Pure static generation

On every build, Astro renders Markdown to HTML and generates a separate page set for each language. Speed depends only on the host's CDN, and security stays naturally simple: there is no dynamic interface to attack, because a page is just a file.

### Five languages

The site ships with Simplified Chinese, Traditional Chinese, English, Japanese and Korean. Every post can exist in five versions, and the interface copy is organized per language too, so switching languages gives readers a consistent whole-site experience rather than a translated title.

## Design language

### Floating capsule navigation

At the top floats a capsule-shaped navigation bar with a frosted-glass feel; the current page is marked by a small bubble that slides as you move between sections. The dark-mode toggle carries the site's signature symbol, ◐, and can follow the system or be switched by hand.

### Typography and whitespace

Body text is typeset for reading first: comfortable line height, restrained heading levels, syntax-highlighted code blocks. Mobile spacing is tuned separately — a single post on a phone drops the rounded container in favor of divider lines, keeping the same character as the desktop view.

## Who it is for

- Writers who want a **long-term, self-controlled** site instead of being locked into a platform;
- Engineers comfortable with Git who accept that publishing means committing a file;
- Authors writing for readers in more than one language.

If you would rather have a ready-made online editing experience, its sibling project astro-blog-admin fills exactly that gap. The next article looks at how this blog organizes its five languages.
