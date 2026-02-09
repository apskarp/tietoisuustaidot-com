import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Yritykset ja palvelut */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">
              Palvelut
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://skarpconsulting.fi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Skarp Consulting
                </a>
              </li>
              <li>
                <a 
                  href="https://dialogicminds.fi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Dialogic Minds Oy
                </a>
              </li>
            </ul>
          </div>

          {/* Mindfulness ja tutkimus */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">
              Mindfulness ja tutkimus
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://mielenlaboratorio.fi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Mielen laboratorio
                </a>
              </li>
              <li>
                <a 
                  href="https://mielenlaboratorio.fi/podcast" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Mind Laboratory -podcast
                </a>
              </li>
              <li>
                <a 
                  href="https://mielenlaboratorio.fi/koulutukset" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Mindfulness-ohjaajakoulutus
                </a>
              </li>
              <li>
                <a 
                  href="https://nondual.fi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Nondual.fi - Tutkimus
                </a>
              </li>
            </ul>
          </div>

          {/* Sivustosta */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">
              Tietoisuustaidot
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/tietoja"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Tietoja
                </Link>
              </li>
              <li>
                <Link 
                  href="/blogi"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Blogiarkisto
                </Link>
              </li>
              <li>
                <Link 
                  href="/rss.xml"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  RSS-syöte
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Ari-Pekka Skarp. Kaikki oikeudet pidätetään.
          </p>
        </div>
      </div>
    </footer>
  )
}
