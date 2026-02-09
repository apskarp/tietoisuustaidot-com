import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/wordpress'
import { BlogCard } from '@/components/BlogCard'
import { Hero } from '@/components/Hero'

export default async function Home() {
  const featuredPosts = await getFeaturedPosts(6)

  return (
    <>
      <Hero 
        title="Tietoisuustaidot"
        subtitle="Tutkimusmatkoja mieleen, tietoisuuteen ja mielekkääseen elämään"
      />

      {/* Uusimmat kirjoitukset */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Uusimmat kirjoitukset
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Syvällisiä pohdintoja tietoisuudesta, psykologiasta ja 
            kontemplatiivisesta viisaudesta
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/blogi"
            className="inline-block px-8 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Selaa kaikkia kirjoituksia →
          </Link>
        </div>
      </section>

      {/* Mitä tietoisuustaidot ovat? */}
      <section className="bg-gradient-to-br from-gray-50 to-primary-50/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-center">
            Mitä tietoisuustaidot ovat?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl leading-relaxed mb-4">
              Tietoisuustaidot yhdistävät psykologian, tietoisuustutkimuksen ja 
              kontemplatiivisen viisauden käytännön sovelluksiksi. Tämä blogi 
              tarjoaa syvällisiä pohdintoja ja käytännön harjoituksia mieleen ja 
              tietoisuuteen liittyen.
            </p>
            <p className="text-xl leading-relaxed">
              Kirjoitukset käsittelevät aiheita kuten mindfulness, nondualiteetti, 
              psykoterapia, merkityksellisyys ja tietoisuuden luonne - sekä 
              perinteisten viisaustradioiden että modernin tieteen näkökulmista.
            </p>
          </div>
        </div>
      </section>

      {/* Kirjoittajasta */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Kirjoittajasta
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Ari-Pekka Skarp</strong> on psykologi, psykoterapeutti ja tutkija, 
            joka työskentelee tietoisuuden, psykologian ja nondualiteetin parissa. 
            Hän yhdistää työssään akateemisen tutkimuksen, kliinisen käytännön ja 
            kontemplatiivisen viisauden.
          </p>
          <Link 
            href="/tietoja"
            className="inline-block text-primary-600 hover:text-primary-700 font-medium"
          >
            Lue lisää kirjoittajasta →
          </Link>
        </div>
      </section>
    </>
  )
}
