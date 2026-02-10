import postsData from '@/data/posts.json'

interface LocalPost {
  title: string
  slug: string
  date: string
  modified: string
  content: string
  excerpt: string
  featuredImage: string
  categories: Array<{ slug: string; name: string }>
  tags: Array<{ slug: string; name: string }>
}

const allPosts: LocalPost[] = postsData as LocalPost[]

export interface WPPost {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
      media_details?: {
        width: number
        height: number
      }
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
    author?: Array<{
      id: number
      name: string
      description: string
    }>
  }
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
  description: string
}

export interface PostsResponse {
  posts: WPPost[]
  totalPages: number
  total: number
}

// Build category list from all posts
function buildCategories(): WPCategory[] {
  const catMap = new Map<string, { name: string; count: number }>()
  for (const post of allPosts) {
    for (const cat of post.categories) {
      const existing = catMap.get(cat.slug)
      if (existing) {
        existing.count++
      } else {
        catMap.set(cat.slug, { name: cat.name, count: 1 })
      }
    }
  }
  let id = 1
  return Array.from(catMap.entries())
    .map(([slug, { name, count }]) => ({ id: id++, slug, name, count, description: '' }))
    .sort((a, b) => b.count - a.count)
}

const categoryList = buildCategories()

function toWPPost(post: LocalPost, index: number): WPPost {
  return {
    id: index + 1,
    date: post.date,
    modified: post.modified,
    slug: post.slug,
    status: 'publish',
    title: { rendered: post.title },
    content: { rendered: post.content },
    excerpt: { rendered: post.excerpt || `<p>${post.content.replace(/<[^>]*>/g, '').slice(0, 200)}...</p>` },
    author: 1,
    featured_media: post.featuredImage ? 1 : 0,
    categories: post.categories.map(c => {
      const found = categoryList.find(cat => cat.slug === c.slug)
      return found?.id ?? 0
    }),
    tags: [],
    _embedded: {
      ...(post.featuredImage && {
        'wp:featuredmedia': [{
          source_url: post.featuredImage,
          alt_text: post.title,
        }],
      }),
      'wp:term': [post.categories.map(c => {
        const found = categoryList.find(cat => cat.slug === c.slug)
        return { id: found?.id ?? 0, name: c.name, slug: c.slug }
      })],
      author: [{ id: 1, name: 'Ari-Pekka Skarp', description: '' }],
    },
  }
}

export async function getPosts(params?: {
  page?: number
  perPage?: number
  categories?: number[]
  search?: string
}): Promise<PostsResponse> {
  const page = params?.page || 1
  const perPage = params?.perPage || 12

  let filtered = allPosts

  if (params?.categories && params.categories.length > 0) {
    filtered = filtered.filter(post =>
      post.categories.some(c => {
        const found = categoryList.find(cat => cat.slug === c.slug)
        return found && params.categories!.includes(found.id)
      })
    )
  }

  if (params?.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    )
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const paged = filtered.slice(start, start + perPage)

  return {
    posts: paged.map((p, i) => toWPPost(p, start + i)),
    totalPages,
    total,
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const index = allPosts.findIndex(p => p.slug === slug)
  if (index === -1) return null
  return toWPPost(allPosts[index], index)
}

export async function getCategories(): Promise<WPCategory[]> {
  return categoryList.filter(cat => cat.count > 0)
}

export async function getFeaturedPosts(count: number = 3): Promise<WPPost[]> {
  const { posts } = await getPosts({ perPage: count })
  return posts
}

export async function getAllPostSlugs(): Promise<string[]> {
  return allPosts.map(p => p.slug)
}

export function getPostUrl(post: WPPost): string {
  const d = new Date(post.date)
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `/${year}/${month}/${day}/${post.slug}`
}

export async function getAllPostPaths(): Promise<Array<{ year: string; month: string; day: string; slug: string }>> {
  return allPosts.map(p => {
    const d = new Date(p.date)
    return {
      year: String(d.getUTCFullYear()),
      month: String(d.getUTCMonth() + 1).padStart(2, '0'),
      day: String(d.getUTCDate()).padStart(2, '0'),
      slug: p.slug,
    }
  })
}
