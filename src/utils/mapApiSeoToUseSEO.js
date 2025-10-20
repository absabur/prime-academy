// src/utils/seoMapper.js

export function mapApiSeoToUseSEO(apiData) {
  if (!apiData) return {};

  return {
    title: apiData.meta_title,
    description: apiData.meta_description,
    robots: apiData.robots_meta,
    canonical: apiData.canonical_url,
    keywords: apiData.meta_keywords,

    openGraph: {
      title: apiData.og_title,
      description: apiData.og_description,
      url: apiData.og_url,
      type: apiData.og_type,
      image: apiData.og_image,
      site_name: apiData.page_name,
    },

    twitter: {
      card: apiData.twitter_card,
      title: apiData.twitter_title,
      description: apiData.twitter_description,
      image: apiData.twitter_image,
      site: apiData.twitter_site,
      creator: apiData.twitter_creator,
    },

    structuredData: apiData.structured_data || null,
  };
}
