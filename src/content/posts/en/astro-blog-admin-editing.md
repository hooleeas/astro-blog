---
title: 'Visual editing: change every site setting without touching code'
subtitle: The settings editor in astro-blog-admin turns JSONC configuration into card forms — multilingual fields edited per language, image fields with previews, and a save button that never disturbs the page.
pubDate: '2026-11-02'
tags:
  - Astro
  - Admin Panel
  - Editor
category: Projects
cover: 'https://astro-blog-admin.pages.dev/images/cover-admin-editing.webp'
translationKey: astro-blog-admin-editing
draft: false
popular: false
---

All of the blog's site settings live in a few JSONC files: homepage modules, navigation, about, subscriptions, services — hundreds of fields, many of them multilingual. Editing those files directly is error-prone, and you cannot see what a change will look like. The variable editor in astro-blog-admin renders the configuration as card forms: you see human labels like "Subtitle" and "Link URL", never raw JSON keys.

## What the editor looks like

### Card forms

Configuration is split into cards by structure: one card per object, arrays as expandable entries, strings as inputs, booleans as switches, colors as a text field paired with a swatch. Adding a list item opens a dialog asking for its name first, instead of inserting an empty row; icon-grid lists (like carousel logos) get their own dedicated edit dialog.

### Image fields with previews

Every image-URL field shows its preview above the field's label, updating live as you type and hiding itself if the image fails to load. Icons and avatars preview in a 1:1 square with the whole image fitted inside, never cropped; regular images get a wide preview. You see the picture before you commit to it, so a mistyped URL is obvious at a glance.

## Editing multilingual fields

### The edit-language capsule

Many fields hold not one sentence but five — one per language. At the top of the editor sits an "Edit language" capsule, the very same component as the post editor's: tap to switch, long-press and drag to pick a language. Whichever language is selected, every multilingual field on the page shows and edits only that language, and never overwrites the other translations.

### Switching never refreshes or jitters

Changing language swaps field values in place — no page rebuild, no scroll jump. Saving behaves the same way: it records the file's new version id and leaves the page exactly as it was, reporting success or failure through a small in-page toast. There is not a single native dialog anywhere in the admin that makes you click "OK".

## Saving rules

The editor reads the source files from the repository and writes back through the API with version (sha) checking: if the file changed elsewhere, the save is refused with a prompt to reload instead of silently overwriting. One trade-off is worth stating plainly: visual saves drop the comments in JSONC files, which is why the editor keeps a "raw text" tab for hand-editing when comments matter.

Next: the admin's other half — the image bed, and how one codebase runs on two platforms at once.
