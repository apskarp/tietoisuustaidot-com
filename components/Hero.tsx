interface HeroProps {
  title: string
  subtitle?: string
  compact?: boolean
}

export function Hero({ title, subtitle, compact = false }: HeroProps) {
  return (
    <section className={`relative overflow-hidden ${compact ? 'py-12' : 'py-20'} bg-gradient-to-br from-primary-50 via-white to-accent-50`}>
      {/* Generatiivinen tausta-animaatio */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Aaltomaiset viivat tietoisuuden virtauksena */}
          <path
            d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0,150 Q250,100 500,150 T1000,150 T1500,150 T2000,150"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.1"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`font-serif font-bold text-gray-900 ${compact ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl lg:text-7xl'} mb-4`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-gray-700 max-w-3xl mx-auto ${compact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
