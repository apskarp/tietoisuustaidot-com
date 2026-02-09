import { Suspense } from 'react'
import { getPosts, getCategories } from '@/lib/wordpress'
import { BlogCard } from '@/components/BlogCard'
import { Pagination } from '@/components/Pagination'
import { CategoryFilter } from '@/components/CategoryFilter'
import { SearchBox } from '@/components/SearchBox'
import { Hero } from '@/components/Hero'

export const metadata = {
  title: 'Blogiarkisto',
  description: 'Selaa kaikkia tietoisuustaidot.com-blogin kirjoituksia. Aiheina tietoisuus, mindfulness, psykologia ja nondualiteetti.',
}

export default async function BlogiSivu({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; search?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const categoryId = searchParams.category ? parseInt(searchParams.category) : undefined
  const searchQuery = searchParams.search || undefined
  
  const [{ posts, totalPages, total }, categories] = await Promise.all([
    getPosts({ 
      page, 
      perPage: 12,
      categories: categoryId ? [categoryId] : undefined,
      search: searchQuery
    }),
    getCategories()
  ])

  const selectedCategory = categoryId 
    ? categories.find(cat => cat.id === categoryId)
    : null

  return (
    <>
      <Hero 
        title="Blogiarkisto"
        subtitle={searchQuery 
          ? `Hakutulokset: "${searchQuery}"`
          : selectedCategory 
            ? `Kategoria: ${selectedCategory.name}`
            : `${total} kirjoitusta tietoisuudesta ja mielestä`
        }
        compact
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Haku */}
        <SearchBox />

        {/* Kategoriasuodatin */}
        <CategoryFilter 
          categories={categories} 
          selected={categoryId}
          totalCount={total}
        />

        {/* Blogikirjoitukset */}
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Ladataan kirjoituksia...</p>
          </div>
        }>
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Sivutus */}
              <Pagination 
                currentPage={page} 
                totalPages={totalPages}
                categoryParam={searchParams.category}
                searchParam={searchParams.search}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ei hakutuloksia
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `Ei löytynyt kirjoituksia haulla "${searchQuery}"`
                  : 'Ei löytynyt kirjoituksia valituilla suodattimilla'
                }
              </p>
              {(searchQuery || categoryId) && (
                <a 
                  href="/blogi"
                  className="inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Tyhjennä suodattimet ja näytä kaikki →
                </a>
              )}
            </div>
          )}
        </Suspense>
      </div>
    </>
  )
}
