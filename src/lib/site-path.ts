const siteBase = import.meta.env.BASE_URL;
const normalizedBase = siteBase.endsWith("/") ? siteBase : `${siteBase}/`;

export const withBase = (path: string) => {
  if (!path.startsWith("/") || path.startsWith("//")) return path;

  const suffixIndex = path.search(/[?#]/);
  const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : path.slice(suffixIndex);
  const canonicalPath =
    pathname !== "/" && !pathname.endsWith("/") && !/\.[^/]+$/.test(pathname)
      ? `${pathname}/${suffix}`
      : path;

  if (
    canonicalPath === normalizedBase.slice(0, -1) ||
    canonicalPath.startsWith(normalizedBase)
  ) {
    return canonicalPath;
  }

  return `${normalizedBase}${canonicalPath.slice(1)}`;
};
