const fs = require('fs')
const path = require('path')

const postsPath = path.join(__dirname, '..', 'data', 'posts.json')
const xmlPath = '/Users/apskarp/Downloads/tietoisuustaidot.WordPress.2026-02-10 (2).xml'

const xml = fs.readFileSync(xmlPath, 'utf-8')
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

// Parse all items from the media XML
const itemPattern = /<item>([\s\S]*?)<\/item>/g
const attachments = {} // post_id -> attachment_url

let match
while ((match = itemPattern.exec(xml)) !== null) {
  const item = match[1]
  const idMatch = item.match(/<wp:post_id>(\d+)<\/wp:post_id>/)
  const urlMatch = item.match(/<wp:attachment_url><!\[CDATA\[(.+?)\]\]>/)
  if (idMatch && urlMatch) {
    attachments[idMatch[1]] = urlMatch[1]
  }
}

console.log('Attachments loaded:', Object.keys(attachments).length)

// Now parse the posts XML (the one with _thumbnail_id)
const postsXmlPath = '/Users/apskarp/Downloads/tietoisuustaidot.WordPress.2026-02-10.xml'
const postsXml = fs.readFileSync(postsXmlPath, 'utf-8')

const postItemPattern = /<item>([\s\S]*?)<\/item>/g
const thumbnailMap = {} // slug -> attachment URL

let m2
while ((m2 = postItemPattern.exec(postsXml)) !== null) {
  const item = m2[1]
  const slugMatch = item.match(/<wp:post_name><!\[CDATA\[(.+?)\]\]>/)
  const thumbMatch = item.match(/<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]>/)

  if (slugMatch && thumbMatch) {
    const slug = slugMatch[1]
    const thumbId = thumbMatch[1]
    const url = attachments[thumbId]
    if (url) {
      // Convert to local path
      const pathMatch = url.match(/wp-content\/uploads\/(.+)/)
      thumbnailMap[slug] = pathMatch ? '/images/uploads/' + pathMatch[1] : url
    } else {
      console.log('Attachment ID ' + thumbId + ' not found for: ' + slug)
    }
  }
}

console.log('Thumbnail mappings found:', Object.keys(thumbnailMap).length)
console.log('')

// Update posts
let updated = 0
for (const post of posts) {
  if (!post.featuredImage && thumbnailMap[post.slug]) {
    post.featuredImage = thumbnailMap[post.slug]
    console.log('SET:', post.slug, '=>', post.featuredImage)
    updated++
  }
}

// Check remaining
const stillEmpty = posts.filter(p => !p.featuredImage)
if (stillEmpty.length > 0) {
  console.log('\nStill without featured image:')
  for (const p of stillEmpty) {
    console.log('  ', p.slug)
  }
}

console.log('\nUpdated:', updated, 'posts')
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + '\n')
console.log('Saved posts.json')
