---
title: 'More than posts: notes, archive and homepage filters'
subtitle: Beyond long-form posts, astro-blog gives short thoughts their own notes, old content an archive, and the homepage a filter bar you define yourself.
pubDate: '2026-10-29'
tags:
  - Astro
  - Writing
  - Blogging
category: Projects
cover: 'https://astro-blog-admin.pages.dev/images/cover-blog-reading.webp'
translationKey: astro-blog-reading
draft: false
popular: false
---

A blog holds more than one kind of content. Carefully written essays and passing thoughts jotted down in a hurry get in each other's way when they share a single list. astro-blog splits content into two shapes, and gives what accumulates an archive and filters, so the site stays easy to browse as it grows.

## Two shapes of content

### Posts: the complete form

Posts are the formal long content: title, subtitle, cover, category, tags and language versions, nothing missing. They appear in the homepage list and the archive, and form the body of the site.

### Notes: short, dated entries

Notes are lighter: the filename is the date plus a title, and the body can be a few sentences. They suit recording one idea, one link, one quote from the day — with no pressure to "make it a whole article". A draft switch can hide a note until you are ready to publish it.

## Archive: making old content findable

### A time-ordered archive page

Once posts pile up, paging through the homepage is not enough. The archive page lists everything by time; its title and description are multilingual too, and it is the fastest route for returning readers to find an old piece.

### Categories and tags

Every post has one category and several tags. Categories carry the broad direction, tags the finer-grained topics, and both are used by the archive and the homepage filters.

## Homepage filters: your call

The filter bar above the homepage list is not hard-coded. In the settings you can:

- Toggle the two built-in filters, "this month" and "popular";
- Add as many category and tag filters as you like;
- Give every filter a label and a match value in all five languages.

Popular posts are decided by each post's own `popular` flag — no view-count machinery. A static site has no database, and in that world simple is reliable.

## Reading details

- Dark mode follows the system or switches by hand, using the site's ◐ symbol as the toggle;
- Post pages support multi-level headings, tables, highlighted code, images and audio/video embeds — the showcase post demonstrates the full set;
- Mobile layout is tuned on its own: lists hide covers, single posts trade rounded corners for divider lines, and small screens stay clean.

That is the content side. Next, behind the curtain: the admin panel built for these files, astro-blog-admin.
