import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-primary-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
          Sivua ei löytynyt
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Etsimääsi sivua ei valitettavasti löytynyt. Se on saatettu poistaa 
          tai siirtää toiseen osoitteeseen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors font-medium"
          >
            Etusivulle
          </Link>
          <Link
            href="/blogi"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Selaa blogia
          </Link>
        </div>
      </div>
    </div>
  )
}
