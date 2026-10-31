import { defineConfig } from 'astro/config';

const base = '';
const prefixMarkdownUrls = () => (tree) => {
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element' && node.properties) {
      for (const key of ['href', 'src', 'poster']) {
        let value = node.properties[key];
        if (
          key === 'href' &&
          typeof value === 'string' &&
          value.startsWith('/') &&
          !value.startsWith('//')
        ) {
          const suffixIndex = value.search(/[?#]/);
          const pathname = suffixIndex === -1 ? value : value.slice(0, suffixIndex);
          const suffix = suffixIndex === -1 ? '' : value.slice(suffixIndex);
          if (
            pathname !== '/' &&
            !pathname.endsWith('/') &&
            !/\.[^/]+$/.test(pathname)
          ) {
            value = `${pathname}/${suffix}`;
          }
        }
        if (
          typeof value === 'string' &&
          base &&
          value.startsWith('/') &&
          !value.startsWith('//') &&
          value !== base &&
          !value.startsWith(`${base}/`)
        ) {
          value = `${base}${value}`;
        }
        node.properties[key] = value;
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(visit);
  };
  visit(tree);
};

export default defineConfig({
  site: 'https://hooleeas.github.io',
  base: base || '/',
  redirects: {
    '/services': `${base}/charity/`,
  },
  server: { allowedHosts: true },
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
    rehypePlugins: [prefixMarkdownUrls],
  }
});
