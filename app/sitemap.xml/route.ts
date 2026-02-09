import { getAllPostSlugs } from '@/lib/wordpress'

export async function GET() {
  const slugs = await getAllPostSlugs()
  const baseUrl = 'https://tietoisuustaidot.com'
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blogi</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/tietoja</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${slugs.map(slug => `
  <url>
    <loc>${baseUrl}/blogi/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
