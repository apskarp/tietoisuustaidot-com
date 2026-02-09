import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
  categoryParam?: string
  searchParam?: string
}

export function Pagination({ 
  currentPage, 
  totalPages,
  baseUrl = '/blogi',
  categoryParam,
  searchParam
}: PaginationProps) {
  if (totalPages <= 1) return null

  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    if (page > 1) params.set('page', page.toString())
    if (categoryParam) params.set('category', categoryParam)
    if (searchParam) params.set('search', searchParam)
    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  // Näytä max 7 sivunumeroa kerralla
  let visiblePages: (number | -1)[] = pages
  if (totalPages > 7) {
    if (currentPage <= 4) {
      visiblePages = [...pages.slice(0, 5), -1, totalPages]
    } else if (currentPage >= totalPages - 3) {
      visiblePages = [1, -1, ...pages.slice(totalPages - 5)]
    } else {
      visiblePages = [
        1, 
        -1, 
        currentPage - 1, 
        currentPage, 
        currentPage + 1, 
        -1, 
        totalPages
      ]
    }
  }

  return (
    <nav className="flex justify-center items-center gap-2 flex-wrap" aria-label="Sivutus">
      {/* Edellinen */}
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          ← Edellinen
        </Link>
      )}

      {/* Sivunumerot */}
      <div className="flex gap-2">
        {visiblePages.map((page, idx) => {
          if (page === -1) {
            return (
              <span 
                key={`ellipsis-${idx}`} 
                className="px-2 py-2 text-gray-500"
              >
                ...
              </span>
            )
          }

          return (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`px-4 py-2 border rounded-lg transition-colors font-medium ${
                currentPage === page
                  ? 'bg-primary-400 text-white border-primary-400'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Seuraava */}
      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          Seuraava →
        </Link>
      )}
    </nav>
  )
}
