# Astro Blog

[English](./README.md) | [简体中文](./README.zh-Hans.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

A multilingual static blog built with Astro. Write posts in Markdown and manage site copy and page content in JSONC files. Fork this project, replace the example content with your own, and deploy it to a static hosting provider.

## Features

- Simplified Chinese, Traditional Chinese, English, Japanese, and Korean
- Markdown posts with categories, tags, search, and archives
- Short-form notes
- Configurable navigation, home cards, and content pages
- Automatically generated social preview images for posts and pages
- Automated GitHub Pages deployment

## Local development

Requires Node.js 22 and npm. Clone the project and install dependencies:

```bash
git clone https://github.com/hooleeas/astro-blog.git
cd astro-blog
npm install
npm run dev
```

Open the local URL printed in the terminal. Common commands:

```bash
npm run check    # Check Astro pages and types
npm run build    # Build the static site into dist/
npm run preview  # Preview the production build locally
astro new note "quick thought"  # Create a note
astro new post "My first post"  # Create posts in all enabled languages
astro new page tags             # Create /tags/
```

The final argument is the note name, post title, or page path. Supplying it creates the file immediately from the matching template; omit it to enter details interactively. A post is created in every enabled language and the files share a `translationKey`; generated translations start as drafts. On this machine, a zsh wrapper maps `astro new` to the project generator; open a new terminal after setup. On another shell or machine, use `npm run astro -- new page tags`. The generator refuses to overwrite existing files.

## Add a post

Posts are organized by language under `src/content/posts/<language-code>/`, for example:

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

Run `astro new post "My first post"` to create a matching draft in every enabled language directory. Without an argument, the command asks only for the post name; it uses that name for the title and filename, and leaves the subtitle empty. All generated files share a `translationKey`. Or copy a Markdown template for the target language from `templates/posts/` into its language directory and edit the frontmatter and body. Common fields:

| Field | Purpose |
| --- | --- |
| `title`, `subtitle` | Post title and summary |
| `pubDate` | Publication date |
| `tags`, `category` | Tags and category |
| `cover` | Optional cover image URL; leave empty if unused |
| `translationKey` | Shared key that links translated versions |
| `draft` | Set to `true` to keep the post unpublished |
| `popular` | Set to `true` to include it in the popular-post filter |

The directory determines the post language. Use the same `translationKey` for translations of the same post. Markdown supports headings, lists, tables, code, and HTML media elements. See `src/content/posts/en/attention.md` for a formatting example.

## Add a note

Notes are intended for short entries. Run `astro new note "quick thought"` to create one from the template with today's date in its filename. You can also copy `templates/notes/note.md` into `src/content/notes/` manually. The template defaults to `draft: true`; set it to `false` when the note is ready to publish.

## Configure the site

Configuration files in `src/data/` use JSONC, so `//` comments are allowed.

| File | Contents |
| --- | --- |
| `config.jsonc` | Site information, languages, navigation, page headings, and home cards |
| `posts.jsonc` | Article contents, sharing, and donation display options |
| `about.jsonc` | About page |
| `apple.jsonc` | Apple subscription page |
| `services.jsonc` | Charity and services page |

### Languages

Maintain language codes, labels, and `enabled` flags in the `languages` array in `config.jsonc`. Disabling a language hides it from the language selector and its generated language pages; it does not delete that language's post files.

### Home cards

The `home` object in `config.jsonc` configures:

- `creativity`: technology logo carousel
- `feature`: featured link card
- `profile`: profile card

For each card, `visible` controls whether it is shown, and `showOnMobile` controls whether it appears on narrow screens (only when `visible` is `true`). All three cards are disabled by default. Images can use external URLs or site paths to files placed in `public/`.

### Article pages

Use `articlePage` in `posts.jsonc` to control the table of contents, sharing card, and donation card. Place QR code images in `public/` and set their site paths in `donationQrCodes`. The table of contents and sharing card are enabled by default; the donation card is disabled.

## Add a page

Run `astro new page tags` to create `src/pages/tags.astro` from the page template. Alternatively, copy `templates/pages/page.astro.txt` into `src/pages/`, remove the `.txt` suffix, and rename it—for example, `projects.astro` creates `/projects/`.

## Deployment

The site builds to `dist/`. This project is configured for the root domain `https://hooleeas.github.io`, so it uses `/` as its base path.

### Push to GitHub with one command

Run either command from the project directory. The commit message is optional:

| Push | Command | What it does |
| --- | --- | --- |
| Source to the current `origin` repository | `npm run push:source -- "Update blog source"` | Stages and commits project changes, then pushes the current branch |
| Build output to `hooleeas.github.io` | `npm run push:pages -- "Update website"` | Builds the site, replaces the Pages repository contents with `dist/`, and pushes to `main` |

Pushing build output requires write access to `hooleeas/hooleeas.github.io` and GitHub SSH authentication. The second command replaces the website files in that repository; use it only if the repository is dedicated to this site.

### Cloudflare Pages

#### Deploy from a Git repository

In Cloudflare, follow this path:

```text
Compute
  → Workers & Pages
  → Create application
  → Continue to Pages
  → Import an existing Git repository
  → Select a forked project
  → Begin setup
```

Choose the repository and branch to deploy (`hooleeas/astro-blog` and `main` for this project), then configure the build based on the repository contents:

| Repository contents | Build command | Build output directory | Root directory |
| --- | --- | --- | --- |
| Astro source code (this project) | `npm run build` | `dist` | Leave blank |
| Prebuilt static files (the repository root already contains files such as `index.html`) | Leave blank | Leave blank | Leave blank |

Click **Save and Deploy**. When connected to a source-code repository, each push triggers a new build and deployment. If the repository already contains built static files, leave the build command and output directory blank.
