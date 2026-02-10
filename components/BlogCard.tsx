import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'
import { WPPost, getPostUrl } from '@/lib/wordpress'

export function BlogCard({ post }: { post: WPPost }) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
  const categories = post._embedded?.['wp:term']?.[0] || []

  // Puhdista excerpt HTML-tageista
  const cleanExcerpt = post.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '...')
    .trim()

  return (
    <Link 
      href={getPostUrl(post)}
      className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
    >
      {/* Kuva */}
      {featuredImage && (
        <div className="relative w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        {/* Kategoriat */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map(cat => (
              <span 
                key={cat.id}
                className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full font-medium"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Päivämäärä */}
        <time className="text-sm text-gray-500 block mb-2">
          {format(new Date(post.date), 'd.M.yyyy', { locale: fi })}
        </time>

        {/* Otsikko */}
        <h2 
          className="text-xl font-serif font-semibold mb-3 group-hover:text-primary-600 transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Ote */}
        <p className="text-gray-700 line-clamp-3 text-sm leading-relaxed">
          {cleanExcerpt}
        </p>

        {/* Lue lisää */}
        <span className="inline-flex items-center mt-4 text-primary-600 group-hover:text-primary-700 font-medium text-sm">
          Lue lisää
          <svg 
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
