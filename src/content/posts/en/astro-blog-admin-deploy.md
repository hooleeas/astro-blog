---
title: 'One codebase, two homes: dual storage and dual-platform deployment'
subtitle: The same astro-blog-admin code deploys to both Cloudflare Pages and EdgeOne Pages. Its image bed uses each platform's own storage, yet presents an identical interface and link rules.
pubDate: '2026-11-03'
tags:
  - Astro
  - Image Hosting
  - Deployment
category: Projects
cover: 'https://astro-blog-admin.pages.dev/images/cover-admin-deploy.webp'
translationKey: astro-blog-admin-deploy
draft: false
popular: false
---

astro-blog-admin has an unusual deployment story: one repository, one branch, deployed at the same time to Cloudflare Pages and Tencent EdgeOne Pages, with feature parity and an identical interface on both. This article covers how its built-in image bed lands on the two platforms, and what dual-platform development gives — and teaches.

## The image bed: upload, get a link, done

### A public upload page

The site's root path is a login-free public upload page: pick an image, upload it, get a link — nothing more. It cannot manage images or touch settings. The in-admin image page adds management: large previews, checkbox batch deletion, and a lightbox for full-size viewing. PNG/JPG uploads are converted to WebP in the browser first to save space, and upload progress is a set of thin bars at the top of the page that fade away when done.

### Link rules

Image URLs are root-relative only: `/<prefix>/<filename>`, no domain. The prefix is customizable in settings, and it does not matter which domain serves the page — change domains or platforms and every image URL already written into your posts keeps working. Uploading a file whose name already exists auto-renames it with a suffix instead of overwriting.

## Dual storage: one interface, two backends

### A storage abstraction layer

Upload, read, list and delete all go through one storage layer, dispatched by configuration: on Cloudflare it prefers a bound R2 bucket and falls back to the S3-compatible API; on EdgeOne it uses the platform's own Blob store. Even the settings label is platform-aware — the second storage tier is called "Cloudflare R2" on Cloudflare and "EdgeOne Blob" on EdgeOne, while the stored configuration value stays the same and neither side affects the other.

### Switching does not migrate

The two stores are independent: an image uploaded to R2 is invisible when you switch to Blob, and back again when you switch back. This "no automatic moving" is deliberate — storage is a platform asset, and the code's job is to do things right on the platform it is currently running on.

## Dual-platform deployment

### Platform detection at build time

The build command is identical on both sides. At build time the code detects where it is (from marker variables the platform injects), bakes the answer into the output, and at runtime follows platform-specific storage and configuration paths. One codebase, one branch, two deployments — no near-duplicate repositories to maintain.

### The lesson: variables first, code second

The biggest dual-platform trap is not in the code but in configuration: any change involving environment variables must update and read-back-verify the variables on the platform side first, and only then push code — because a push is a deployment, and reversing the order leaves production running without the variables it needs for a while. Each platform's variables are independent, so the discipline has to be performed twice.

That closes this six-article series: the blog itself, multilingual, content shapes, the admin overview, visual editing, and the image bed with deployment. Both projects are open source — come and see what they look like now in their GitHub repositories.
