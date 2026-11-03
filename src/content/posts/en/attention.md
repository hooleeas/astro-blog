---
title: 'Markdown Content Showcase: From Headings to Media'
subtitle: >-
  A ready-to-preview article template demonstrating heading levels, text
  formatting, lists, tables, code, and media.
pubDate: '2026-10-31'
tags:
  - Markdown
  - Writing guide
  - Example
category: Guides
cover: 'https://astro-blog-admin.pages.dev/images/demo_attention.webp'
translationKey: markdown-content-showcase
draft: false
popular: false
---

This is a **ready-to-use Markdown article example**. Use it to see how content appears on the site, then copy, edit, and replace it with your own. The headings, descriptions, and media URLs below are demonstration material.

> Make the content clear first, then choose its formatting. Good formatting helps readers understand; it does not replace the content.

## Article structure

Use heading levels to organize topics. Start each section with an introduction, then add more specific subsections when needed.

### A subsection under a topic

This is a regular paragraph. Use paragraphs to introduce background, explain an idea, or preview what comes next. Leave a blank line between paragraphs.

#### A more specific section

Headings can be nested further. Use heading levels in order rather than skipping levels just to change the font size.

##### Inline text formatting

The body supports **bold**, *italic*, ~~strikethrough~~, `inline code`, and [regular links](https://example.com). Use these to highlight terms, command names, or references.

## Lists and quotes

### Unordered list

- First item: list a point or material.
- Second item: an item can be a complete sentence.
- Third item: indent two spaces for nested items:
  - Sub-item A
  - Sub-item B

### Ordered list

1. Identify the problem to solve.
2. Explain the process step by step.
3. Summarize the result or what to do next.

### Task list

- [x] Add a title and summary
- [x] Create the article structure
- [ ] Replace the sample with your own content

## Tables

Tables work well for short, comparable information:

| Content type | Good for | Example |
| --- | --- | --- |
| Paragraph | Introduction and explanation | Background |
| List | Related points | Preparation |
| Code | Technical examples | Configuration |

## Code

Use inline code for commands such as `npm run build`. Add a language identifier to a fenced code block for syntax highlighting:

```ts
type Article = {
  title: string;
  published: boolean;
};

const example: Article = {
  title: "Markdown Content Showcase",
  published: true,
};

console.log(example.title);
```

You can use other language identifiers, such as Shell:

```bash
npm install
npm run dev
```

## Images and media

### Images

Insert images with Markdown. This example uses the site avatar; replace it with an image from the `public/` directory when writing your own article.

![Site image example](/images/avatar.webp)

Use HTML when you need a specific size or CSS class:

<img class="square-image" src="/images/avatar.webp" alt="Square image example" />

### Audio

Use the HTML `<audio>` element for audio. Replace the sample URL with an audio file you have permission to use:

<audio controls preload="none">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
  Your browser does not support audio playback.
</audio>

### Video files

Use `<video>` to play a video file. Replace `src` with a local media path or an accessible video URL:

<video controls preload="metadata" poster="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

### Embedded video

Some video platforms provide iframe embed code. This example uses YouTube's privacy-enhanced mode; replace the video ID and check that embedding is allowed before publishing:

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ"
    title="Embedded video example"
    width="1280"
    height="720"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## Extra notes

Use collapsible content for supplementary explanations, or remove it when not needed:

<details>
  <summary>Show a supplementary note</summary>
  <p>Use this space for terminology, extra tips, or details that are not essential to the main text.</p>
</details>

## In summary

An article can combine an introduction, sections at different heading levels, media, and a conclusion. You do not need to use every component; choose the format that suits the content. Remember to replace the text, images, and media URLs in this example.
