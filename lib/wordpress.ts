const WP_API_URL = 'https://tietoisuustaidot.com/wp-json/wp/v2'

const WP_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; NextJS/1.0; +https://tietoisuustaidot.com)',
  'Accept': 'application/json',
}

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

/**
 * Hae blogikirjoitukset WordPress REST API:sta
 */
export async function getPosts(params?: {
  page?: number
  perPage?: number
  categories?: number[]
  search?: string
}): Promise<PostsResponse> {
  const searchParams = new URLSearchParams({
    _embed: 'true',
    per_page: (params?.perPage || 12).toString(),
    page: (params?.page || 1).toString(),
    ...(params?.categories && params.categories.length > 0 && { 
      categories: params.categories.join(',') 
    }),
    ...(params?.search && { search: params.search }),
  })

  try {
    const res = await fetch(`${WP_API_URL}/posts?${searchParams}`, {
      headers: WP_HEADERS,
      next: { revalidate: 3600 } // Cache 1 tunti
    })

    if (!res.ok) {
      console.error('WordPress API error:', res.status, res.statusText)
      return { posts: [], totalPages: 0, total: 0 }
    }

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1')
    const total = parseInt(res.headers.get('X-WP-Total') || '0')
    const posts = await res.json()

    return { posts, totalPages, total }
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return { posts: [], totalPages: 0, total: 0 }
  }
}

/**
 * Hae yksittäinen blogikirjoitus slugin perusteella
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed=true`, {
      headers: WP_HEADERS,
      next: { revalidate: 3600 }
    })

    if (!res.ok) {
      return null
    }

    const posts = await res.json()
    return posts[0] || null
  } catch (error) {
    console.error('Failed to fetch post:', error)
    return null
  }
}

/**
 * Hae kaikki kategoriat
 */
export async function getCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(`${WP_API_URL}/categories?per_page=100&orderby=count&order=desc`, {
      headers: WP_HEADERS,
      next: { revalidate: 86400 } // Cache 24h
    })

    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status)
      return []
    }

    const categories = await res.json()
    return categories.filter((cat: WPCategory) => cat.count > 0)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

/**
 * Hae uusimmat kirjoitukset (esim. etusivulle)
 */
export async function getFeaturedPosts(count: number = 3): Promise<WPPost[]> {
  const { posts } = await getPosts({ perPage: count })
  return posts
}

/**
 * Hae kaikki postien slugit (static generation varten)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs: string[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const res = await fetch(
        `${WP_API_URL}/posts?per_page=100&page=${page}&_fields=slug`,
        { headers: WP_HEADERS, next: { revalidate: 86400 } }
      )

      if (!res.ok) break

      const posts = await res.json()
      slugs.push(...posts.map((p: { slug: string }) => p.slug))

      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1')
      hasMore = page < totalPages
      page++
    }

    return slugs
  } catch (error) {
    console.error('Failed to fetch post slugs:', error)
    return []
  }
}
