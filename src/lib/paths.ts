// Prefixes root-relative paths (nav links, image/video src) with Astro's
// configured `base` so the site works when deployed under a subpath, e.g.
// GitHub Pages project sites (https://user.github.io/repo-name/).
// External URLs are left untouched.
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
}
