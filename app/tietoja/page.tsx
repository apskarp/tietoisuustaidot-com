import { Hero } from '@/components/Hero'
import Image from 'next/image'

export const metadata = {
  title: 'Tietoja',
  description: 'Ari-Pekka Skarp on psykologi, psykoterapeutti ja tutkija, joka työskentelee tietoisuuden, psykologian ja nondualiteetin parissa.',
}

export default function TietojaPage() {
  return (
    <>
      <Hero 
        title="Tietoja"
        subtitle="Kirjoittajasta ja tietoisuustaidoista"
        compact
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profiilikuva ja esittely */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            {/* Profiilikuva - sama kuin mielenlaboratorio.fi:ssä */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/profile.jpg"
                  alt="Ari-Pekka Skarp"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>

            {/* Lyhyt esittely */}
            <div className="flex-1">
              <h2 className="text-3xl font-serif font-semibold mb-4">
                Ari-Pekka Skarp
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Psykologi, psykoterapeutti ja tutkija, joka yhdistää työssään 
                akateemisen tutkimuksen, kliinisen käytännön ja kontemplatiivisen 
                viisauden.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Yli 25 vuoden kokemus psykologian, psykoterapian ja jungilaisesta 
                valmennuksesta. Erikoistunut tietoisuuden, nondualiteetin ja 
                sekulaarin spiritualiteetin tutkimukseen.
              </p>
            </div>
          </div>
        </div>

        {/* Koulutus ja tausta */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-6">
            Koulutus ja tausta
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Väitöskirjatutkimus Åbo Akademissa keskittyy nondualiteettiin, 
              sekulaariin spiritualiteettiin ja nykyaikaisiin henkisiin opettajiin. 
              Tutkimus hyödyntää foucault'laista diskurssianalyysiä ja tarkastelee 
              tietoisuuden luonnetta sekä perinteisten viisaustraditioiden että 
              modernin tieteen näkökulmista.
            </p>
            <p>
              Tutkinnot psykologiasta, kasvatustieteestä ja tekniikasta muodostavat 
              monipuolisen pohjan tietoisuuden tutkimukselle ja käytännön työlle.
            </p>
          </div>
        </section>

        {/* Työskentely */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-6">
            Työskentely
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skarp Consulting */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-serif font-semibold mb-3">
                Skarp Consulting
              </h3>
              <p className="text-gray-700 mb-4">
                Organisaatiokonsultointi, työnohjaus, koulutus ja valmennus. 
                Dialogisuus ja tietoisuus organisaatioiden kehittämisessä.
              </p>
              <a 
                href="https://skarpconsulting.fi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Lue lisää →
              </a>
            </div>

            {/* Dialogic Minds */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-serif font-semibold mb-3">
                Dialogic Minds Oy
              </h3>
              <p className="text-gray-700 mb-4">
                Psykoterapia, jungilainen valmennus ja yksilötyö. 
                Syvyyspsykologinen ja eksistentiaalinen lähestymistapa.
              </p>
              <a 
                href="https://dialogicminds.fi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Lue lisää →
              </a>
            </div>

            {/* Mielen laboratorio */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-serif font-semibold mb-3">
                Mielen laboratorio
              </h3>
              <p className="text-gray-700 mb-4">
                Mindfulness-kirjat, koulutusohjelmat, retiiitit ja podcast. 
                Tietoisuusharjoitusten teoria ja käytäntö.
              </p>
              <a 
                href="https://mielenlaboratorio.fi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Lue lisää →
              </a>
            </div>

            {/* Nondual.fi */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-serif font-semibold mb-3">
                Nondual.fi
              </h3>
              <p className="text-gray-700 mb-4">
                Tutkimushanke nondualiteetista. Akateeminen tutkimus 
                yhdistettynä käytännön kokemukseen ja viisaustraditioihin.
              </p>
              <a 
                href="https://nondual.fi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Lue lisää →
              </a>
            </div>
          </div>
        </section>

        {/* Julkaisut */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-6">
            Julkaisut
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Kolme kirjaa tietoisuudesta ja mindfulnessista, joissa yhdistyvät 
              tieteellinen tutkimus, filosofinen pohdinta ja käytännön harjoitukset. 
              Kirjat tarjoavat syvällisen johdatuksen tietoisuuden tutkimukseen ja 
              kontemplatiiviseen harjoitukseen.
            </p>
            <p>
              Lisäksi aktiivinen julkaisutoiminta Mind Laboratory -podcastissa, 
              joka käsittelee tietoisuutta, mindfulnessia ja psykologiaa 
              tutkimuksen ja käytännön näkökulmista.
            </p>
          </div>
        </section>

        {/* Tietoisuustaidot-blogi */}
        <section className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-8">
          <h2 className="text-3xl font-serif font-semibold mb-4">
            Tietoisuustaidot-blogi
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Tämä blogi on syntynyt halusta jakaa ajatuksia ja havaintoja 
              tietoisuudesta, psykologiasta ja mielekkäästä elämästä. Kirjoitukset 
              käsittelevät aiheita monipuolisesti - perinteisistä viisaustraditioista 
              moderniin tietoisuustutkimukseen, mindfulness-harjoituksista 
              nondualiteettiin.
            </p>
            <p>
              Tavoitteena on tehdä syvällisiä käsitteitä ymmärrettäviksi ja 
              tarjota käytännön näkökulmia tietoisuuden kehittämiseen. 
              Kirjoitukset syntyvät usein omista pohdinnoista, asiakastyöstä 
              saaduista oivalluksista ja tutkimustyöstä.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
