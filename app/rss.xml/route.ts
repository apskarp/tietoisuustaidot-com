import { getPosts, getPostUrl } from '@/lib/wordpress'

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const { posts } = await getPosts({ perPage: 50 })
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Tietoisuustaidot</title>
    <link>https://tietoisuustaidot.com</link>
    <description>Tutkimusmatkoja mieleen, tietoisuuteen ja mielekkääseen elämään</description>
    <language>fi</language>
    <atom:link href="https://tietoisuustaidot.com/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => {
      const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, '')
      const cleanExcerpt = post.excerpt.rendered
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#8230;/g, '...')
      
      return `
    <item>
      <title>${escapeXml(cleanTitle)}</title>
      <link>https://tietoisuustaidot.com${getPostUrl(post)}</link>
      <guid>https://tietoisuustaidot.com${getPostUrl(post)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(cleanExcerpt)}</description>
      <content:encoded><![CDATA[${post.content.rendered}]]></content:encoded>
    </item>`
    }).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
