import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export type PostLanguage = string;

const normalizeLanguageCode = (language: string) =>
  language
    .split("-")
    .map((part, index) => {
      if (index === 0) return part.toLowerCase();
      if (part.length === 4) return `${part[0].toUpperCase()}${part.slice(1).toLowerCase()}`;
      if (part.length === 2) return part.toUpperCase();
      return part.toLowerCase();
    })
    .join("-");

export const getPostLanguage = (post: Post): PostLanguage => {
  const rawLanguage = post.id.split("/")[0];
  if (!/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(rawLanguage)) {
    throw new Error(
      `Article "${post.id}" must be stored in a language-code folder under src/content/posts/.`,
    );
  }
  return normalizeLanguageCode(rawLanguage);
};

export const getPostTranslationGroup = (post: Post) =>
  post.data.translationKey
    ? `translation:${post.data.translationKey}`
    : `post:${post.id}`;

export const getPostGroups = (posts: Post[]) => {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const key = getPostTranslationGroup(post);
    groups.set(key, [...(groups.get(key) ?? []), post]);
  }
  return [...groups.values()];
};

export const getPostInLanguage = (posts: Post[], language: PostLanguage) =>
  posts.find((post) => getPostLanguage(post) === language) ??
  posts.find((post) => getPostLanguage(post) === "zh-Hans") ??
  posts.find((post) => getPostLanguage(post) === "zh") ??
  posts[0];

export const getPostHref = (post: Post, posts: Post[]) => {
  const group = getPostGroups(posts).find((items) =>
    items.some((item) => item.id === post.id),
  );
  const routePost =
    group?.find((item) => getPostLanguage(item) === "zh-Hans") ??
    group?.find((item) => getPostLanguage(item) === "zh") ??
    group?.[0] ??
    post;
  return `/${routePost.id.replace(/^[^/]+\//, "")}`;
};

export const getPostHrefForLanguage = (
  post: Post,
  posts: Post[],
  language: PostLanguage,
) => `/${language.toLowerCase()}${getPostHref(post, posts)}`;

export const assertUniquePostTranslations = (posts: Post[]) => {
  const languagesByKey = new Map<string, Set<string>>();
  for (const post of posts) {
    const language = getPostLanguage(post);
    if (!post.data.translationKey) continue;
    const languages = languagesByKey.get(post.data.translationKey) ?? new Set<string>();
    if (languages.has(language)) {
      throw new Error(
        `Duplicate ${language} article for translationKey "${post.data.translationKey}".`,
      );
    }
    languages.add(language);
    languagesByKey.set(post.data.translationKey, languages);
  }
  const routes = new Map<string, string>();
  for (const group of getPostGroups(posts)) {
    const route = group[0] ? getPostHref(group[0], posts) : "/";
    const key = getPostTranslationGroup(group[0]);
    const existingGroup = routes.get(route);
    if (existingGroup && existingGroup !== key) {
      throw new Error(`Multiple article groups resolve to the same URL "${route}".`);
    }
    routes.set(route, key);
  }
};

export const getPostsByLanguage = (posts: Post[], language: PostLanguage) => {
  return getPostGroups(posts)
    .map((group) => getPostInLanguage(group, language))
    .filter((post): post is Post => post !== undefined);
};
