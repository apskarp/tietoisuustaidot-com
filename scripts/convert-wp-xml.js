const fs = require('fs')
const path = require('path')

const xmlFile = process.argv[2]
if (!xmlFile) {
  console.error('Usage: node convert-wp-xml.js <wordpress-export.xml>')
  process.exit(1)
}

const xml = fs.readFileSync(xmlFile, 'utf-8')

// Extract all <item> blocks
const items = []
const itemRegex = /<item>([\s\S]*?)<\/item>/g
let match

while ((match = itemRegex.exec(xml)) !== null) {
  const item = match[1]

  // Only include posts (not pages, attachments, etc.)
  const postType = extractCDATA(item, 'wp:post_type')
  if (postType !== 'post') continue

  // Only include published posts
  const status = extractCDATA(item, 'wp:status')
  if (status !== 'publish') continue

  const title = extractCDATA(item, 'title')
  const slug = extractCDATA(item, 'wp:post_name')
  const date = extractCDATA(item, 'wp:post_date_gmt')
  const modified = extractCDATA(item, 'wp:post_modified_gmt')
  const content = extractCDATA(item, 'content:encoded')
  const excerpt = extractCDATA(item, 'excerpt:encoded')

  // Extract categories
  const categories = []
  const catRegex = /<category domain="category" nicename="([^"]*)">\s*<!\[CDATA\[(.*?)\]\]>\s*<\/category>/g
  let catMatch
  while ((catMatch = catRegex.exec(item)) !== null) {
    categories.push({ slug: catMatch[1], name: catMatch[2] })
  }

  // Extract tags
  const tags = []
  const tagRegex = /<category domain="post_tag" nicename="([^"]*)">\s*<!\[CDATA\[(.*?)\]\]>\s*<\/category>/g
  let tagMatch
  while ((tagMatch = tagRegex.exec(item)) !== null) {
    tags.push({ slug: tagMatch[1], name: tagMatch[2] })
  }

  // Extract featured image from content (first img src)
  let featuredImage = ''
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/)
  if (imgMatch) {
    featuredImage = imgMatch[1]
    // Remove query params like ?w=648
    featuredImage = featuredImage.split('?')[0]
  }

  items.push({
    title,
    slug,
    date: date ? `${date.replace(' ', 'T')}Z` : '',
    modified: modified ? `${modified.replace(' ', 'T')}Z` : '',
    content,
    excerpt,
    featuredImage,
    categories,
    tags,
  })
}

// Sort by date descending (newest first)
items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const outputPath = path.join(__dirname, '..', 'data', 'posts.json')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8')

console.log(`Converted ${items.length} posts to ${outputPath}`)

function extractCDATA(text, tag) {
  // Handle tags with colons (namespaced)
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // Try CDATA first
  const cdataRegex = new RegExp(`<${escapedTag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${escapedTag}>`)
  const cdataMatch = text.match(cdataRegex)
  if (cdataMatch) return cdataMatch[1]
  // Try plain text
  const plainRegex = new RegExp(`<${escapedTag}>([^<]*)</${escapedTag}>`)
  const plainMatch = text.match(plainRegex)
  if (plainMatch) return plainMatch[1]
  return ''
}
