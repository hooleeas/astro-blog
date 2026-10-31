let controller: AbortController | undefined;

const initializeTableOfContents = () => {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;
  const language = document.documentElement.dataset.language || "zh-Hans";
  const article =
    document.querySelector<HTMLElement>(`.localized-article[lang="${language}"]`) ??
    document.querySelector<HTMLElement>('.localized-article[lang="zh-Hans"]') ??
    document.querySelector<HTMLElement>('.localized-article[lang="zh"]') ??
    document.querySelector<HTMLElement>(".localized-article");
  const links = [...(article?.querySelectorAll<HTMLAnchorElement>(".toc a") ?? [])];
  const headings = links
    .map((link) => article?.querySelector(link.getAttribute("href") || ""))
    .filter((heading): heading is Element => heading !== null);
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;
      const heading = article?.querySelector(link.getAttribute("href") || "");
      if (!heading) return;
      event.preventDefault();
      window.history.pushState(window.history.state, "", link.hash);
      heading.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    }, { signal });
  });
  let activeId = '';
  let frame = 0;

  const updateActiveHeading = () => {
    const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
    const marker = Math.max(headerBottom + 32, window.innerHeight * 0.25);
    let current = headings[0];

    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= marker) current = heading;
    });

    const nextId = current?.id || '';
    if (nextId === activeId) return;
    activeId = nextId;
    links.forEach((link) => {
      link.classList.toggle('active', decodeURIComponent(link.hash.slice(1)) === activeId);
    });
    const activeLink = links.find((link) => decodeURIComponent(link.hash.slice(1)) === activeId);
    const toc = activeLink?.closest<HTMLElement>(".toc");
    if (!activeLink || !toc) return;
    const linkRect = activeLink.getBoundingClientRect();
    const tocRect = toc.getBoundingClientRect();
    const scrollDelta = linkRect.top < tocRect.top
      ? linkRect.top - tocRect.top
      : linkRect.bottom > tocRect.bottom
        ? linkRect.bottom - tocRect.bottom
        : 0;
    if (scrollDelta) toc.scrollTop += scrollDelta;
  };

  updateActiveHeading();
  window.addEventListener('scroll', () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      updateActiveHeading();
    });
  }, { passive: true, signal });
};

document.addEventListener('astro:page-load', initializeTableOfContents);
document.addEventListener('site-language-change', initializeTableOfContents);
initializeTableOfContents();
