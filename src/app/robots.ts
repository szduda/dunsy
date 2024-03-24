import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/foladmin/',
    },
    sitemap: 'https://dunsy.app/sitemap.xml',
  }
}
