const fs = require('fs')
const path = require('path')
const axios = require('axios')

const postsPath = path.join(__dirname, '..', 'data', 'posts.json')
const outputDir = path.join(__dirname, '..', 'public', 'images', 'uploads')

fs.mkdirSync(outputDir, { recursive: true })

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

// Collect all unique image URLs from post content and featuredImage
const urlSet = new Set()
for (const post of posts) {
  // Featured image
  if (post.featuredImage && post.featuredImage.startsWith('http')) {
    urlSet.add(post.featuredImage)
  }
  // All img src in content
  const imgRegex = /(?:src|href)="(https?:\/\/tietoisuustaidot\.com\/wp-content\/uploads\/[^"?]+)/g
  let m
  while ((m = imgRegex.exec(post.content)) !== null) {
    urlSet.add(m[1])
  }
}

const urls = Array.from(urlSet)
console.log(`Found ${urls.length} unique image URLs to download`)

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Referer': 'https://tietoisuustaidot.com/',
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  let ok = 0
  let fail = 0
  const urlToLocal = {}

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const urlPath = new URL(url).pathname
    // Preserve the uploads directory structure
    const relativePath = urlPath.replace('/wp-content/uploads/', '')
    const outputPath = path.join(outputDir, relativePath)

    // Create subdirectories
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })

    // Skip if already downloaded
    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 100) {
      urlToLocal[url] = `/images/uploads/${relativePath}`
      ok++
      console.log(`SKIP [${i + 1}/${urls.length}] ${relativePath} (exists)`)
      continue
    }

    try {
      const response = await axios.get(url, {
        headers,
        responseType: 'arraybuffer',
        timeout: 30000,
        maxRedirects: 5,
      })

      const contentType = response.headers['content-type'] || ''
      if (contentType.includes('text/html')) {
        console.log(`FAIL [${i + 1}/${urls.length}] ${relativePath}: got HTML`)
        fail++
      } else {
        fs.writeFileSync(outputPath, response.data)
        urlToLocal[url] = `/images/uploads/${relativePath}`
        const sizeKB = (response.data.length / 1024).toFixed(0)
        console.log(`OK   [${i + 1}/${urls.length}] ${relativePath} (${sizeKB} KB)`)
        ok++
      }
    } catch (err) {
      const status = err.response?.status || err.message
      console.log(`FAIL [${i + 1}/${urls.length}] ${relativePath}: ${status}`)
      fail++
    }

    await sleep(2000)
  }

  // Update posts.json with local paths
  let replacements = 0
  for (const post of posts) {
    // Update featuredImage
    if (post.featuredImage && urlToLocal[post.featuredImage]) {
      post.featuredImage = urlToLocal[post.featuredImage]
      replacements++
    }
    // Update content image URLs
    for (const [remoteUrl, localPath] of Object.entries(urlToLocal)) {
      if (post.content.includes(remoteUrl)) {
        post.content = post.content.split(remoteUrl).join(localPath)
        replacements++
      }
    }
  }

  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8')
  console.log(`\nDone: ${ok} OK, ${fail} failed out of ${urls.length} total`)
  console.log(`Updated ${replacements} URL references in posts.json`)
}

main()
