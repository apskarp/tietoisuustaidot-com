const fs = require('fs')
const path = require('path')

const postsPath = path.join(__dirname, '..', 'data', 'posts.json')
const uploadsDir = path.join(__dirname, '..', 'public', 'images', 'uploads')

// Build index of all local files by filename
function buildFileIndex() {
  const index = {}
  function walk(dir, rel) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      const relPath = path.join(rel, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath, relPath)
      } else {
        const name = entry.name.toLowerCase()
        // Store as /images/uploads/YYYY/MM/filename
        index[name] = '/images/uploads/' + relPath.replace(/\\/g, '/')
      }
    }
  }
  walk(uploadsDir, '')
  return index
}

const fileIndex = buildFileIndex()
console.log(`Found ${Object.keys(fileIndex).length} local image files`)

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

// Pattern to match WordPress upload URLs
const wpUploadPattern = /https?:\/\/tietoisuustaidot\.com\/wp-content\/uploads\//g
const wpUploadPatternSingle = /https?:\/\/tietoisuustaidot\.com\/wp-content\/uploads\/(.+)/

function replaceWpUrls(text) {
  if (!text) return text
  return text.replace(/https?:\/\/tietoisuustaidot\.com\/wp-content\/uploads\//g, '/images/uploads/')
}

let featuredFixed = 0
let featuredExtracted = 0
let contentFixed = 0

for (const post of posts) {
  // Fix featured image
  if (post.featuredImage) {
    const match = post.featuredImage.match(wpUploadPatternSingle)
    if (match) {
      post.featuredImage = '/images/uploads/' + match[1]
      featuredFixed++
    } else if (!post.featuredImage.startsWith('/')) {
      // External URL - try to find by filename
      const url = post.featuredImage
      const filename = url.split('/').pop().split('?')[0].toLowerCase()
      if (fileIndex[filename]) {
        post.featuredImage = fileIndex[filename]
        featuredFixed++
      } else {
        console.log(`Could not resolve external featured image: ${url} (${post.slug})`)
      }
    }
  }

  // For posts without featured image, extract from content
  if (!post.featuredImage && post.content) {
    const imgMatch = post.content.match(/<img[^>]+src=["']([^"']+)["']/)
    if (imgMatch) {
      const src = imgMatch[1]
      const wpMatch = src.match(wpUploadPatternSingle)
      if (wpMatch) {
        post.featuredImage = '/images/uploads/' + wpMatch[1]
        featuredExtracted++
      } else {
        // Try to find by filename in local files
        const filename = src.split('/').pop().split('?')[0].toLowerCase()
        if (fileIndex[filename]) {
          post.featuredImage = fileIndex[filename]
          featuredExtracted++
        }
      }
    }
  }

  // Fix all image URLs in content
  if (post.content) {
    const before = post.content
    post.content = replaceWpUrls(post.content)
    if (post.content !== before) contentFixed++
  }
}

console.log(`Featured images fixed from WP URLs: ${featuredFixed}`)
console.log(`Featured images extracted from content: ${featuredExtracted}`)
console.log(`Posts with content image URLs fixed: ${contentFixed}`)

// Check for remaining external image references
let remaining = 0
for (const post of posts) {
  if (post.featuredImage && !post.featuredImage.startsWith('/')) {
    console.log(`  Still external: ${post.featuredImage} (${post.slug})`)
    remaining++
  }
}
console.log(`Remaining external featured images: ${remaining}`)

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + '\n')
console.log('Updated posts.json')
