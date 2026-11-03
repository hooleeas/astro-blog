---
title: 'astro-blog-admin: a real admin panel for a static blog'
subtitle: Content-as-files should not mean editing files by hand forever. astro-blog-admin manages the whole site in the browser through the GitHub API — the blog stays purely static, the admin makes it pleasant.
pubDate: '2026-11-01'
tags:
  - Astro
  - Admin Panel
  - Open Source
category: Projects
cover: 'https://astro-blog-admin.pages.dev/images/cover-admin-intro.webp'
translationKey: astro-blog-admin-intro
draft: false
popular: true
---

Everything in astro-blog is a file. That is great for backups and migration, but not entirely great for daily upkeep: changing one navigation label should not mean opening an editor, hunting for the file, and being careful not to break a format. astro-blog-admin exists for exactly that — an admin panel running on Cloudflare Pages / EdgeOne Pages where, once you log in, posts, notes, site settings and the image bed are all manageable in the browser, while the blog itself stays purely static with zero database.

## Why a static blog needs an admin

### The file advantage stays

The admin does not change the content-as-files foundation. Every character it writes ends up as a commit in the blog repository: posts as Markdown files, settings as JSONC files. Stop using the admin one day, and the files are all still there, building as usual.

### Daily maintenance should be easy

Frequent operations should be a few clicks: publish a post, fix a slogan, swap a cover, add a homepage filter. Push those back into editors and command lines, and a blog soon goes quiet simply because updating it is a chore.

## Login and security

The admin signs you in with GitHub (OAuth via a GitHub App), and only the repository owner gets in. Signed out, admin entry points redirect to the login page, random public URLs are a 404, and unauthorized API calls are rejected outright. There is no home-grown account system — and therefore no password database to leak.

## What it manages

- **Posts**: lists, creation, editing and deletion across five language versions, draft and popular flags, with per-language deletion;
- **Notes**: date changes, renames and the draft switch, all in one card;
- **Page settings**: visual editing of every JSONC settings file — homepage, about, Apple subscriptions, services (the next article goes deeper);
- **Image bed**: upload-and-get-a-link, image management, and a public upload page;
- **Publishing**: every change is committed back to the blog repository through the GitHub API, and the hosting platform rebuilds and ships it.

## How the two projects relate

They are two separately deployed sites: the blog is a static site, the admin is an SSR app with a server side. The admin knows nothing about the blog's build internals — only the file conventions in the repository; the blog does not depend on the admin existing. That loose coupling lets either side be replaced or moved on its own.

Next: the admin's core page, the visual settings editor.
