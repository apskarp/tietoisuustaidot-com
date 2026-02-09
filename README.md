# Tietoisuustaidot.com - Next.js-sivusto

Moderni Next.js-versio tietoisuustaidot.com-blogista, joka käyttää WordPress REST API:a sisällönhallintaan.

## 🎯 Ominaisuudet

- **Moderni Next.js 15** App Routerilla
- **WordPress Headless CMS** - käytä WordPressiä sisällönhallintaan
- **Täysi blogiarkisto** - kaikki vanhat kirjoitukset säilyvät
- **Responsiivinen design** - toimii kaikilla laitteilla
- **Optimoitu suorituskyky** - ISR (Incremental Static Regeneration)
- **SEO-optimoitu** - metadata, sitemap, RSS-feed
- **Hakutoiminto** - etsi kirjoituksista
- **Kategorisuodattimet** - selaa aiheittain
- **Paginaatio** - selkeä sivutus

## 🚀 Käyttöönotto

### 1. Asenna riippuvuudet

```bash
npm install
```

### 2. Kehityspalvelin

```bash
npm run dev
```

Avaa [http://localhost:3000](http://localhost:3000) selaimessa.

### 3. Tuotanto-build

```bash
npm run build
npm run start
```

## 📁 Projektirakenne

```
tietoisuustaidot/
├── app/                      # Next.js App Router
│   ├── blogi/               # Blogisivut
│   │   ├── [slug]/          # Yksittäinen blogikirjoitus
│   │   └── page.tsx         # Blogilistasivu
│   ├── tietoja/             # Tietoja-sivu
│   ├── rss.xml/             # RSS-feed
│   ├── sitemap.xml/         # Dynaaminen sitemap
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Etusivu
│   └── globals.css          # Globaalit tyylit
├── components/              # React-komponentit
│   ├── Header.tsx           # Navigaatio
│   ├── Footer.tsx           # Footer
│   ├── Hero.tsx             # Hero-osio
│   ├── BlogCard.tsx         # Blogikortti
│   ├── Pagination.tsx       # Sivutus
│   ├── CategoryFilter.tsx   # Kategorisuodatin
│   └── SearchBox.tsx        # Hakukenttä
├── lib/                     # Apufunktiot
│   └── wordpress.ts         # WordPress REST API
└── public/                  # Staattiset tiedostot
    └── robots.txt
```

## 🔧 WordPress REST API

Sivusto käyttää WordPress REST API:a sisällönhallintaan. API-kutsu:

```typescript
// Hae blogikirjoitukset
const { posts, totalPages, total } = await getPosts({
  page: 1,
  perPage: 12,
  categories: [1, 2],
  search: 'mindfulness'
})

// Hae yksittäinen kirjoitus
const post = await getPostBySlug('artikkelin-slug')

// Hae kategoriat
const categories = await getCategories()
```

### API-endpointit

- `GET /wp-json/wp/v2/posts` - Hae kirjoitukset
- `GET /wp-json/wp/v2/posts?slug={slug}` - Hae kirjoitus slugilla
- `GET /wp-json/wp/v2/categories` - Hae kategoriat

## 🎨 Design System

### Värit

- **Primary (Sininen)**: Tietoisuus, avoimuus
  - `primary-400`: #38bdf8 (pääväri)
  - `primary-600`: #0284c7 (hover)

- **Accent (Violetti)**: Syvyys, kontemplatio
  - `accent-500`: #8b5cf6

### Typografia

- **Otsikot**: Cormorant Garamond (serif)
- **Leipäteksti**: DM Sans (sans-serif)

## 📱 Responsiivisuus

Sivusto on täysin responsiivinen ja toimii kaikilla näyttöko'oilla:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔍 SEO

- Dynaamiset meta-tagit jokaiselle sivulle
- Open Graph -tuki
- Sitemap.xml automaattisesti generoitu
- RSS-feed (/rss.xml)
- Robots.txt

## 🚀 Deployment (Vercel)

### 1. Asenna Vercel CLI

```bash
npm i -g vercel
```

### 2. Deploy projektisi

```bash
vercel
```

### 3. Tuotanto-deployment

```bash
vercel --prod
```

### 4. Domain-asetukset

1. Mene Vercel Dashboardiin
2. Valitse projekti
3. Settings → Domains
4. Lisää custom domain: `tietoisuustaidot.com`
5. Seuraa Vercel-ohjeita DNS-asetusten päivitykseen

## 🔄 Sisällön päivitys

Sisältö päivittyy automaattisesti WordPressistä:

- **Revalidation**: 1 tunti (3600 sekuntia)
- Muokkaa revalidation-aikaa `lib/wordpress.ts`-tiedostossa:

```typescript
next: { revalidate: 3600 } // 1 tunti
```

## 📊 Suorituskyky

- **ISR (Incremental Static Regeneration)**: Sivut generoidaan staattisesti ja päivittyvät automaattisesti
- **Image Optimization**: Next.js Image-komponentti optimoi kuvat automaattisesti
- **Code Splitting**: Automaattinen JavaScript-bundlien jako
- **Lazy Loading**: Kuvat ja komponentit ladataan tarvittaessa

## 🛠️ Kehitys

### Lisää uusi sivu

1. Luo uusi hakemisto `app/`-kansioon
2. Luo `page.tsx`-tiedosto
3. Lisää navigaatioon `components/Header.tsx`

### Muokkaa tyylejä

- Globaalit tyylit: `app/globals.css`
- Tailwind-config: `tailwind.config.ts`
- Komponentit: inline Tailwind-luokat

### Lisää uusi komponentti

1. Luo uusi tiedosto `components/`-kansioon
2. Export komponentti
3. Importoi ja käytä sivuilla

## 📝 Lisenssi

© 2026 Ari-Pekka Skarp. Kaikki oikeudet pidätetään.

## 🤝 Tuki

Ongelmien tai kysymysten kanssa, ota yhteyttä:
- Verkkosivut: [skarpconsulting.fi](https://skarpconsulting.fi)
- Mielen laboratorio: [mielenlaboratorio.fi](https://mielenlaboratorio.fi)
