import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sivusto */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">
              Sivusto
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Etusivu
                </Link>
              </li>
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
                  Blogi
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

          {/* Projektit */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">
              Projektit
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
                  href="https://mielenlaboratorio.fi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Mielenlaboratorio
                </a>
              </li>
              <li>
                <a
                  href="https://nondual.fi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Nondual.fi
                </a>
              </li>
            </ul>
          </div>

          {/* Yhteystiedot */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">
              Yhteystiedot
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ap@nondual.fi"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  ap@nondual.fi
                </a>
              </li>
              <li className="text-gray-600">
                Oulu, Suomi
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} tietoisuustaidot.com – Kaikki oikeudet pidätetään.
          </p>
        </div>
      </div>
    </footer>
  )
}
