import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thankyou', '/api/'],
      },
    ],
    sitemap: 'https://www.athletictrainerjob.com/sitemap.xml',
  };
}
