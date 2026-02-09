'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary-700">
              Tietoisuustaidot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Etusivu
            </Link>
            <Link 
              href="/blogi" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Blogi
            </Link>
            <Link 
              href="/tietoja" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Tietoja
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Etusivu
              </Link>
              <Link 
                href="/blogi" 
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogi
              </Link>
              <Link 
                href="/tietoja" 
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tietoja
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
