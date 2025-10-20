import { useEffect, useRef } from 'react';

/**
 * Universal SEO hook for Vite + React 19
 * Supports all major SEO meta tags, OG, Twitter, Canonical & JSON-LD
 */
export function useSEO({
  title = '',
  description = '',
  robots = 'index, follow',
  canonical = '',
  keywords = '',
  viewport = 'width=device-width, initial-scale=1',
  charset = 'UTF-8',
  themeColor = '',
  author = '',
  publisher = '',
  generator = '',
  customTags = [],
  openGraph = {},
  twitter = {},
  structuredData = null,
} = {}) {
  const previousTitle = useRef(document.title);
  const cleanupTags = useRef([]);

  useEffect(() => {
    const head = document.head;
    const newTags = [];

    const setMeta = (key, value, type = 'name') => {
      if (!value) return;
      let tag = head.querySelector(`meta[${type}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(type, key);
        head.appendChild(tag);
        newTags.push(tag);
      }
      tag.setAttribute('content', value);
    };

    const setLink = (rel, href) => {
      if (!href) return;
      let link = head.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        head.appendChild(link);
        newTags.push(link);
      }
      link.setAttribute('href', href);
    };

    // Title
    if (title) document.title = title;

    // Basic SEO
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', robots);

    // Canonical
    setLink('canonical', canonical);

    // Open Graph
    const ogData = {
      'og:title': openGraph.title || title,
      'og:description': openGraph.description || description,
      'og:type': openGraph.type || 'website',
      'og:url': openGraph.url || canonical || window.location.href,
      'og:image': openGraph.image,
      'og:site_name': openGraph.site_name,
    };
    Object.entries(ogData).forEach(([k, v]) => v && setMeta(k, v, 'property'));

    // Twitter Card
    const tw = {
      'twitter:card': twitter.card || 'summary_large_image',
      'twitter:title': twitter.title || title,
      'twitter:description': twitter.description || description,
      'twitter:image': twitter.image || openGraph?.image,
      'twitter:site': twitter.site,
      'twitter:creator': twitter.creator,
    };
    Object.entries(tw).forEach(([k, v]) => v && setMeta(k, v));

    // Structured Data (JSON-LD)
    if (structuredData) {
      // ✅ Remove any previous JSON-LD to avoid duplicates
      document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());

      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      newTags.push(script);
    }

    cleanupTags.current = newTags;

    return () => {
      cleanupTags.current.forEach((el) => el.remove());
      document.title = previousTitle.current;
    };
    // Stringify objects in dependency array to ensure effect runs on content change
  }, [
    title,
    description,
    robots,
    canonical,
    keywords,
    structuredData,
    JSON.stringify(openGraph),
    JSON.stringify(twitter),
  ]);
}
