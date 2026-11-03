import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import {
  assertUniquePostTranslations,
  getPostGroups,
  getPostHref,
  getPostHrefForLanguage,
  getPostLanguage,
  getPostsByLanguage,
  getSharedPostCover,
  type Post,
} from "../../lib/posts";
import { siteContent } from "../../lib/parse-jsonc";
import aboutText from "../../data/about.jsonc?raw";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import charityText from "../../data/services.jsonc?raw";
import { parseJsonc, type LocalizedText } from "../../lib/parse-jsonc";

type PreviewProps = {
  title?: string;
  subtitle?: string;
  pubDate?: string;
  category?: string;
  tags?: string[];
  cover?: string;
  imageKind: "cover" | "avatar" | "icon";
  stats?: {
    days: string;
    posts: string;
    words: string;
    labels: [string, string, string];
  };
};

type PageContent = {
  pageTitle: LocalizedText;
  pageSubtitle?: LocalizedText;
  introduction?: { detail: LocalizedText };
};

const wrapText = (text: string, maxWidth: number, maxLines: number) => {
  const words = text.match(/[A-Za-z0-9]+(?:['’.-][A-Za-z0-9]+)*|[^\s]/gu) ?? [];
  const lines: string[] = [];
  let line = "";
  let width = 0;
  let truncated = false;

  for (const word of words) {
    const wordWidth = /^[A-Za-z0-9]/.test(word) ? word.length * 0.56 : 1;
    const needsSpace = Boolean(line && /^[A-Za-z0-9]/.test(word) && /[A-Za-z0-9]$/u.test(line));
    const spaceWidth = needsSpace ? 0.35 : 0;
    if (line && width + spaceWidth + wordWidth > maxWidth) {
      lines.push(line);
      line = "";
      width = 0;
      if (lines.length === maxLines) {
        truncated = true;
        break;
      }
    }
    line += `${needsSpace ? " " : ""}${word}`;
    width += spaceWidth + wordWidth;
  }

  if (line && lines.length < maxLines) lines.push(line);
  if (truncated && lines.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[\s.,;:!?]+$/u, "")}…`;
  }
  return lines;
};

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

const renderLines = (lines: string[], x: number, y: number, lineHeight: number, className: string) =>
  lines
    .map(
      (line, index) =>
        `<text class="${className}" x="${x}" y="${y + index * lineHeight}">${escapeXml(line)}</text>`,
    )
    .join("");

const createOverlay = ({ title, subtitle, pubDate, category, tags = [], stats }: PreviewProps) => {
  const titleLines = title ? wrapText(title, 13, 2) : [];
  const subtitleLines = subtitle ? wrapText(subtitle, 23, 3) : [];
  const titleStartY = 195;
  const subtitleStartY = titleStartY + titleLines.length * 75 + 6;
  const visibleTags = tags.slice(0, 4);
  let tagX = 885;
  const tagTop = Math.min(
    512,
    subtitleStartY + Math.max(subtitleLines.length - 1, 0) * 45 + 60,
  );
  const tagElements = visibleTags
    .map((tag) => {
      const width = Math.min(300, Math.max(132, Array.from(tag).length * 42 + 54));
      const element = `<rect x="${tagX}" y="${tagTop}" width="${width}" height="51" rx="25.5" fill="none" stroke="#f2a33a" stroke-width="3"/><text class="tag" x="${tagX + width / 2}" y="${tagTop + 34}" text-anchor="middle">${escapeXml(tag)}</text>`;
      tagX += width + 18;
      return element;
    })
    .join("");
  const statsPanel = stats
    ? `<g>
        <rect x="885" y="118" width="855" height="160" rx="24" fill="#23282e"/>
        <text class="stat-value" x="1312" y="207" text-anchor="middle">${escapeXml(stats.days)}</text>
        <text class="stat-label" x="1312" y="248" text-anchor="middle">${escapeXml(stats.labels[0])}</text>
        <rect x="885" y="300" width="415" height="160" rx="24" fill="#23282e"/>
        <text class="stat-value" x="1092" y="389" text-anchor="middle">${escapeXml(stats.posts)}</text>
        <text class="stat-label" x="1092" y="430" text-anchor="middle">${escapeXml(stats.labels[1])}</text>
        <rect x="1325" y="300" width="415" height="160" rx="24" fill="#23282e"/>
        <text class="stat-value" x="1532" y="389" text-anchor="middle">${escapeXml(stats.words)}</text>
        <text class="stat-label" x="1532" y="430" text-anchor="middle">${escapeXml(stats.labels[2])}</text>
      </g>`
    : "";

  return Buffer.from(
    `<svg width="1800" height="600" viewBox="0 0 1800 600" xmlns="http://www.w3.org/2000/svg">
      <style>
        text { font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif; }
        .meta { fill: #f2a33a; font: 700 27px/1.2 ui-monospace, monospace; letter-spacing: 2.25px; }
        .title { fill: #f1f3f5; font-size: 72px; font-weight: 800; letter-spacing: -2.5px; }
        .subtitle { fill: #c1c7cf; font-size: 36px; font-weight: 600; }
        .tag { fill: #f2a33a; font-size: 27px; font-weight: 800; }
        .stat-value { fill: #f1f3f5; font-size: 66px; font-weight: 800; font-variant-numeric: tabular-nums; }
        .stat-label { fill: #c1c7cf; font-size: 30px; font-weight: 600; }
      </style>
      <rect x="825" width="975" height="600" fill="#111315"/>
      ${statsPanel}
      ${!stats && (pubDate || category) ? `<text class="meta" x="885" y="114">${escapeXml([pubDate, category].filter(Boolean).join(" · "))}</text>` : ""}
      ${renderLines(titleLines, 885, titleStartY, 75, "title")}
      ${renderLines(subtitleLines, 885, subtitleStartY, 45, "subtitle")}
      ${tagElements}
    </svg>`,
  );
};

export async function getStaticPaths() {
  const posts: Post[] = await getCollection(
    "posts",
    (post: Post) => !post.data.draft,
  );
  assertUniquePostTranslations(posts);

  const articlePaths = getPostGroups(posts).flatMap((group) => {
    const defaultPost =
      group.find((item) => getPostLanguage(item) === "zh-Hans") ??
      group.find((item) => getPostLanguage(item) === "zh") ??
      group[0];
    const defaultPath = {
      params: { slug: `posts${getPostHref(defaultPost, posts)}` },
      props: {
        title: defaultPost.data.title,
        subtitle: defaultPost.data.subtitle,
        pubDate: defaultPost.data.pubDate.toISOString().slice(0, 10),
        category: defaultPost.data.category,
        tags: defaultPost.data.tags,
        cover: getSharedPostCover(defaultPost, posts),
        imageKind: "cover",
      } satisfies PreviewProps,
    };
    const localizedPaths = group.map((post) => {
      const language = getPostLanguage(post);
      return {
        params: {
          slug: `posts${getPostHrefForLanguage(post, posts, language)}`,
        },
        props: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          pubDate: post.data.pubDate.toISOString().slice(0, 10),
          category: post.data.category,
          tags: post.data.tags,
          cover: getSharedPostCover(post, posts),
          imageKind: "cover",
        } satisfies PreviewProps,
      };
    });
    return [defaultPath, ...localizedPaths];
  });

  const about = parseJsonc<PageContent>(aboutText, "src/data/about.jsonc");
  // apple 页面数据是可选的自用数据：文件不存在时跳过 /apple 的 OG 图，仓库照常构建
  const appleFilePath = join(process.cwd(), "src/data/apple.jsonc");
  const appleText = existsSync(appleFilePath) ? readFileSync(appleFilePath, "utf-8") : undefined;
  const apple = appleText ? parseJsonc<PageContent>(appleText, "src/data/apple.jsonc") : null;
  const charity = parseJsonc<PageContent>(charityText, "src/data/services.jsonc");
  const homePosts = getPostsByLanguage(posts, "zh-Hans");
  const countWords = (markdown: string) => {
    const text = markdown
      .replace(/^---[\s\S]*?---\s*/, "")
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]*>/g, " ")
      .replace(/[`*_>#~|]/g, " ");
    const chineseCharacters = text.match(/\p{Script=Han}/gu)?.length ?? 0;
    const latinWords = text.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
    return chineseCharacters + latinWords;
  };
  const homeWordCount = homePosts.reduce((total, post) => {
    if (typeof post.body !== "string") {
      throw new Error(`Article body is missing for "${post.id}".`);
    }
    return total + countWords(post.body);
  }, 0);
  const establishedAt = new Date(`${siteContent.site.establishedAt}T00:00:00Z`);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const daysOnline = Math.max(1, Math.floor((today - establishedAt.getTime()) / 86_400_000) + 1);
  const pagePaths: { params: { slug: string }; props: PreviewProps }[] = [
    {
      params: { slug: "pages/home" },
      props: {
        imageKind: "icon",
        stats: {
          days: daysOnline.toLocaleString("zh-CN"),
          posts: homePosts.length.toLocaleString("zh-CN"),
          words: homeWordCount.toLocaleString("zh-CN"),
          labels: ["建站天数", "文章总数", "全站字数"],
        },
      },
    },
    {
      params: { slug: "pages/about" },
      props: {
        title: about.pageTitle["zh-Hans"],
        subtitle: about.introduction?.detail["zh-Hans"],
        imageKind: "avatar",
      },
    },
    ...(apple
      ? [
          {
            params: { slug: "pages/apple" },
            props: {
              title: apple.pageTitle["zh-Hans"],
              subtitle: apple.pageSubtitle?.["zh-Hans"],
              imageKind: "icon" as const,
            },
          },
        ]
      : []),
    {
      params: { slug: "pages/archive" },
      props: {
        title: siteContent.pages.archive.pageTitle["zh-Hans"],
        subtitle: siteContent.pages.archive.pageSubtitle["zh-Hans"],
        imageKind: "icon",
      },
    },
    {
      params: { slug: "pages/notes" },
      props: {
        title: siteContent.pages.notes.pageTitle["zh-Hans"],
        subtitle: siteContent.pages.notes.pageSubtitle["zh-Hans"],
        imageKind: "icon",
      },
    },
    {
      params: { slug: "pages/charity" },
      props: {
        title: charity.pageTitle["zh-Hans"],
        subtitle: charity.pageSubtitle?.["zh-Hans"],
        imageKind: "icon",
      },
    },
  ];

  const localizedPagePaths = siteContent.languages
    .filter(({ enabled }) => enabled)
    .flatMap(({ code }) => {
      const locale = {
        "zh-Hans": "zh-CN",
        "zh-Hant": "zh-TW",
        en: "en-US",
        ja: "ja-JP",
        ko: "ko-KR",
      }[code] ?? code;
      const labels: Record<string, [string, string, string]> = {
        "zh-Hans": ["建站天数", "文章总数", "全站字数"],
        "zh-Hant": ["建站天數", "文章總數", "全站字數"],
        en: ["Days online", "Articles", "Words"],
        ja: ["運営日数", "記事数", "総単語数"],
        ko: ["운영 일수", "전체 글 수", "전체 단어 수"],
      };
      const home: PreviewProps = {
        imageKind: "icon",
        stats: {
          days: daysOnline.toLocaleString(locale),
          posts: homePosts.length.toLocaleString(locale),
          words: homeWordCount.toLocaleString(locale),
          labels: labels[code] ?? labels.en,
        },
      };
      const pages: Record<string, PreviewProps> = {
        about: {
          title: about.pageTitle[code],
          subtitle: about.introduction?.detail[code],
          imageKind: "avatar",
        },
        ...(apple
          ? {
              apple: {
                title: apple.pageTitle[code],
                subtitle: apple.pageSubtitle?.[code],
                imageKind: "icon" as const,
              },
            }
          : {}),
        archive: {
          title: siteContent.pages.archive.pageTitle[code],
          subtitle: siteContent.pages.archive.pageSubtitle[code],
          imageKind: "icon",
        },
        notes: {
          title: siteContent.pages.notes.pageTitle[code],
          subtitle: siteContent.pages.notes.pageSubtitle[code],
          imageKind: "icon",
        },
        charity: {
          title: charity.pageTitle[code],
          subtitle: charity.pageSubtitle?.[code],
          imageKind: "icon",
        },
      };
      return [
        { params: { slug: `pages/${code.toLowerCase()}/home` }, props: home },
        ...Object.entries(pages).map(([slug, props]) => ({
          params: { slug: `pages/${code.toLowerCase()}/${slug}` },
          props,
        })),
      ];
    });

  return [...articlePaths, ...pagePaths, ...localizedPagePaths];
}

export const GET: APIRoute = async ({ props }) => {
  const { cover, imageKind } = props as PreviewProps;
  let coverImage: Buffer;

  if (imageKind === "cover" && cover) {
    const response = await fetch(cover);
    if (!response.ok) {
      throw new Error(`Failed to fetch article cover "${cover}": ${response.status} ${response.statusText}`);
    }
    coverImage = Buffer.from(await response.arrayBuffer());
  } else {
    const imagePath =
      imageKind === "avatar"
        ? "../../../public/images/avatar.webp"
        : "../../../public/icon/icon_512x512.png";
    coverImage = await sharp(fileURLToPath(new URL(imagePath, import.meta.url))).toBuffer();
  }

  const imageOverlay = await sharp(coverImage)
    .resize(
      imageKind === "cover" ? 800 : 450,
      imageKind === "cover" ? 450 : 450,
      { fit: imageKind === "cover" ? "cover" : "contain" },
    )
    .png()
    .toBuffer();
  const image = await sharp({
    create: { width: 1800, height: 600, channels: 3, background: "#111315" },
  })
    .composite([
      {
        input: imageOverlay,
        left: imageKind === "cover" ? 0 : 175,
        top: 75,
      },
      { input: createOverlay(props as PreviewProps) },
    ])
    .png()
    .toBuffer();

  return new Response(Uint8Array.from(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
