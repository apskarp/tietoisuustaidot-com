'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SearchBox() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  // Alusta hakukenttä URL-parametrista
  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    
    if (query.trim()) {
      params.set('search', query.trim())
    } else {
      params.delete('search')
    }
    
    // Reset page when searching
    params.delete('page')
    
    const queryString = params.toString()
    router.push(queryString ? `/blogi?${queryString}` : '/blogi')
  }

  const clearSearch = () => {
    setQuery('')
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    params.delete('page')
    const queryString = params.toString()
    router.push(queryString ? `/blogi?${queryString}` : '/blogi')
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex gap-2 max-w-2xl">
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hae kirjoituksista..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <button 
          type="submit"
          className="px-6 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors font-medium"
        >
          Hae
        </button>

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Tyhjennä haku"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}
