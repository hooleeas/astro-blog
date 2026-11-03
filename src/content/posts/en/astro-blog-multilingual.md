---
title: 'Five languages, one site: how astro-blog does multilingual'
subtitle: Multilingual here is not a plugin that translates titles — it is an organizing principle that runs from the content folders through the UI copy to the admin panel.
pubDate: '2026-10-28'
tags:
  - Astro
  - Multilingual
  - Blogging
category: Projects
cover: 'https://astro-blog-admin.pages.dev/images/cover-blog-multilingual.webp'
translationKey: astro-blog-multilingual
draft: false
popular: false
---

astro-blog supports Simplified Chinese, Traditional Chinese, English, Japanese and Korean. This is not an afterthought "translate button in the corner" — it is designed into the content structure from day one: a post can have five language versions, every settings field can be multilingual, and when a reader switches language, the whole site's copy, lists and filters switch with it.

## Language as part of the content structure

### Five versions of every post

Posts live in per-language folders: `src/content/posts/zh-Hans/`, `en/`, `ja/` and so on. The five versions of one post share the same slug and carry the same `translationKey` in their frontmatter, which is how the site knows "these five files are one article". The article you are reading is organized exactly this way.

### What if a language is missing

Not every post needs all five versions. When a language is missing, the post simply does not appear in that language's list — the site never pads a list with a version the reader cannot read. One post fewer is better than one post in the wrong language.

## Multilingual interface copy

### Settings are language maps

It is not just the site title. Navigation labels, page titles, button text — interface elements are stored in the settings files as language maps: one field, five pieces of copy. Rendering picks the current language, falling back to Simplified Chinese and then English, so a page never shows a blank where copy should be.

### Filters understand language too

The homepage category and tag filters carry multilingual labels and match values: Chinese readers see Chinese category names filtering Chinese posts, English readers see English ones, with identical logic underneath.

## The reader's experience

Language switching is a capsule control; one tap changes the page copy, the post cards and the date formats. Post cards are rendered in all languages at build time, so switching is a purely client-side pick — no new request, effective the instant you tap.

The real cost of multilingual is in writing and maintenance: one five-language article is five files. Next, a look at the content shapes — beyond long posts, this blog also has short notes, an archive, and a customizable homepage filter bar.
