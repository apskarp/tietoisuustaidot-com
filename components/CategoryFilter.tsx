'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { WPCategory } from '@/lib/wordpress'

export function CategoryFilter({ 
  categories, 
  selected,
  totalCount 
}: { 
  categories: WPCategory[]
  selected?: number
  totalCount: number
}) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')

  const buildUrl = (categoryId?: number) => {
    const params = new URLSearchParams()
    if (categoryId) params.set('category', categoryId.toString())
    if (searchQuery) params.set('search', searchQuery)
    const queryString = params.toString()
    return queryString ? `/blogi?${queryString}` : '/blogi'
  }

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        Kategoriat
      </h2>
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildUrl()}
          className={`px-4 py-2 rounded-full transition-all font-medium text-sm ${
            !selected 
              ? 'bg-primary-400 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Kaikki ({totalCount})
        </Link>
        
        {categories.map(category => (
          <Link
            key={category.id}
            href={buildUrl(category.id)}
            className={`px-4 py-2 rounded-full transition-all font-medium text-sm ${
              selected === category.id
                ? 'bg-primary-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name} ({category.count})
          </Link>
        ))}
      </div>
    </div>
  )
}
