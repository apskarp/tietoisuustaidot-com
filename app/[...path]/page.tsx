import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'
import { getPostBySlug, getAllPostPaths } from '@/lib/wordpress'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const paths = await getAllPostPaths()
  return paths.map(p => ({
    path: [p.year, p.month, p.day, p.slug]
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  if (path.length !== 4) return { title: 'Sivua ei löytynyt' }

  const slug = path[3]
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Kirjoitusta ei löytynyt' }
  }

  const cleanExcerpt = post.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '...')
    .slice(0, 160)

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]

  return {
    title: post.title.rendered,
    description: cleanExcerpt,
    openGraph: {
      title: post.title.rendered,
      description: cleanExcerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      ...(featuredImage && {
        images: [
          {
            url: featuredImage.source_url,
            width: featuredImage.media_details?.width || 1200,
            height: featuredImage.media_details?.height || 630,
            alt: featuredImage.alt_text || post.title.rendered,
          },
        ],
      }),
    },
  }
}

export default async function BlogiArtikkeli({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params

  // Only handle /YYYY/MM/DD/slug format
  if (path.length !== 4) {
    notFound()
  }

  const slug = path[3]
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
  const categories = post._embedded?.['wp:term']?.[0] || []
  const author = post._embedded?.author?.[0]

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-gray-600">
          <li>
            <Link href="/" className="hover:text-primary-600">
              Etusivu
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blogi" className="hover:text-primary-600">
              Blogi
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-[200px]">
            {post.title.rendered.replace(/<[^>]*>/g, '')}
          </li>
        </ol>
      </nav>

      {/* Kategoriat */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/blogi?category=${cat.id}`}
              className="text-sm px-3 py-1 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors font-medium"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Otsikko */}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {/* Meta-tiedot */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
        <time className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {format(new Date(post.date), 'd. MMMM yyyy', { locale: fi })}
        </time>

        {author && (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {author.name}
          </div>
        )}
      </div>

      {/* Featured image */}
      {featuredImage && (
        <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      {/* Sisältö */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Päivitetty */}
      {post.modified !== post.date && (
        <p className="text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
          Päivitetty {format(new Date(post.modified), 'd. MMMM yyyy', { locale: fi })}
        </p>
      )}

      {/* Takaisin blogiin */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blogi"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Takaisin blogiin
        </Link>
      </div>
    </article>
  )
}
