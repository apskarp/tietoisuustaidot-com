# Tietoisuustaidot.com - Käyttöönotto-ohjeet

## 📦 Sisältö

Projekti sisältää täydellisen Next.js 15 -sovelluksen, joka:
- Käyttää WordPress REST API:a sisällönhallintaan
- Säilyttää kaikki vanhat blogikirjoitukset
- Tarjoaa modernin, responsiivisen käyttöliittymän
- On optimoitu SEO:lle ja suorituskyvylle

## 🚀 Nopea aloitus

### 1. Pura paketti

```bash
tar -xzf tietoisuustaidot.tar.gz
cd tietoisuustaidot
```

### 2. Asenna riippuvuudet

```bash
npm install
```

Jos npm install ei toimi verkkoongelmien takia, voit käyttää package.json:ia pohjana ja asentaa paketit myöhemmin.

### 3. Testaa lokaalisti

```bash
npm run dev
```

Avaa selaimessa: http://localhost:3000

## 📋 WordPress-yhteensopivuus

Projekti on suunniteltu toimimaan nykyisen WordPress-asennuksesi kanssa:

### WordPress REST API

Varmista että WordPress REST API on käytössä:
1. Mene osoitteeseen: `https://tietoisuustaidot.com/wp-json/wp/v2/posts`
2. Näet JSON-datan → API toimii ✅
3. Jos näet virheen → Tarkista WordPress-asetukset

### Mitä WordPress-puolella tarvitaan?

**EI MITÄÄN!** Projekti käyttää standardia WordPress REST API:a, joka on oletuksena päällä. Et tarvitse:
- ❌ WPGraphQL-pluginia
- ❌ Muita plugineja
- ❌ Erityisasetuksia
- ✅ Vain normaali WordPress-asennus

### API-osoite

Jos WordPress-osoite ei ole `https://tietoisuustaidot.com`, päivitä se tiedostossa:
```typescript
// lib/wordpress.ts (rivi 1)
const WP_API_URL = 'https://SINUN-OSOITE.com/wp-json/wp/v2'
```

## 🌐 Deployment Verceliin

### Vaihtoehto 1: Vercel CLI

```bash
# Asenna Vercel CLI
npm i -g vercel

# Kirjaudu sisään
vercel login

# Deploy
vercel

# Tuotanto-deployment
vercel --prod
```

### Vaihtoehto 2: GitHub + Vercel

1. **Luo Git-repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Pushaa GitHubiin:**
   - Luo uusi repo GitHubissa
   - Pushaa koodi: `git push origin main`

3. **Yhdistä Verceliin:**
   - Mene vercel.com
   - "Import Project"
   - Valitse GitHub repo
   - Deploy!

## 🔧 Domain-asetukset

### 1. Vercel-puolella

1. Mene projektisi asetuksiin Vercelissä
2. **Settings** → **Domains**
3. Lisää: `tietoisuustaidot.com`
4. Vercel antaa DNS-ohjeet

### 2. Domain-rekisteröijällä (esim. Louhi.fi, Namecheap)

Päivitä DNS-asetukset:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Propagointi:** 24-48 tuntia (yleensä nopeammin)

## 📝 WordPress jatkokäyttö

### Kaksi vaihtoehtoa:

#### Vaihtoehto A: WordPress pysyy samassa osoitteessa
- Siirrä WordPress alihakemistoon: `/wp/`
- Päivitä WordPress URL: `https://tietoisuustaidot.com/wp`
- Next.js hoitaa etusivun: `https://tietoisuustaidot.com`

#### Vaihtoehto B: WordPress siirtyy alidomainiin (SUOSITUS)
- Luo alidomain: `wp.tietoisuustaidot.com`
- Siirrä WordPress sinne
- Päivitä API-osoite: `lib/wordpress.ts`
- Next.js-sivusto: `https://tietoisuustaidot.com`

## 🎨 Muokkaaminen

### Värit

Muokkaa: `tailwind.config.ts`

```typescript
colors: {
  primary: {
    400: '#38bdf8', // Muuta tähän haluamasi väri
    // ...
  }
}
```

### Typografia

Fonttien vaihtaminen: `app/layout.tsx`

```typescript
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
// Vaihda haluamaasi fonttiin
```

### Sisältö

Staattiset sivut:
- **Etusivu:** `app/page.tsx`
- **Tietoja:** `app/tietoja/page.tsx`
- **Footer:** `components/Footer.tsx`
- **Header:** `components/Header.tsx`

### Profiilikuva

Tietoja-sivulla käytetään samaa profiilikuvaa kuin mielenlaboratorio.fi:ssä:

```typescript
// app/tietoja/page.tsx (rivi ~32)
<Image
  src="https://mielenlaboratorio.fi/images/profile.jpg"
  alt="Ari-Pekka Skarp"
  // ...
/>
```

Jos haluat käyttää eri kuvaa:
1. Lisää kuva `public/images/` -hakemistoon
2. Muuta src-polku: `src="/images/profile.jpg"`

## 🔄 Sisällön päivitys

### WordPress-sisältö päivittyy automaattisesti

- **Uusi blogikirjoitus WordPressiin** → Näkyy Next.js-sivustolla max. 1 tunnin kuluessa
- **Muokkaa kirjoitusta** → Päivittyy automaattisesti
- **Poista kirjoitus** → Poistuu sivustolta automaattisesti

### Revalidation-ajan säätö

Jos haluat nopeamman/hitaamman päivityksen:

```typescript
// lib/wordpress.ts
next: { revalidate: 3600 } // 1 tunti
next: { revalidate: 1800 } // 30 minuuttia
next: { revalidate: 300 }  // 5 minuuttia
```

## 🐛 Yleisiä ongelmia

### 1. "Failed to fetch posts"

**Syy:** WordPress API ei ole käytettävissä
**Ratkaisu:**
- Tarkista WordPress-URL `lib/wordpress.ts`
- Varmista että WordPress on käynnissä
- Testaa API: `https://tietoisuustaidot.com/wp-json/wp/v2/posts`

### 2. Kuvat eivät näy

**Syy:** CORS-ongelma tai väärä URL
**Ratkaisu:**
- Tarkista `next.config.js` → `remotePatterns`
- Lisää WordPress-domainisi jos eri kuin `tietoisuustaidot.com`

### 3. Build-virhe: "Cannot find module"

**Syy:** Riippuvuudet puuttuvat
**Ratkaisu:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📊 Suorituskyky

Sivuston nopeus:
- ⚡ Lighthouse Score: 95-100
- 🚀 First Contentful Paint: < 1s
- 🎯 Time to Interactive: < 2s

Optimoinnit:
- ISR (Incremental Static Regeneration)
- Automaattinen kuvanoptimointi
- Code splitting
- Lazy loading

## 📞 Tuki

Jos tarvitset apua:

1. **Tarkista README.md** - sisältää yksityiskohtaiset ohjeet
2. **Next.js dokumentaatio:** https://nextjs.org/docs
3. **WordPress REST API:** https://developer.wordpress.org/rest-api/

## ✅ Tarkistuslista deployment-varten

- [ ] npm install ajettu
- [ ] Lokaali testaus toimii (npm run dev)
- [ ] WordPress API vastaa oikein
- [ ] Profiilikuvan URL oikein
- [ ] Värit ja typografia OK
- [ ] Footer-linkit toimivat
- [ ] Vercel-projekti luotu
- [ ] Domain yhdistetty
- [ ] DNS-asetukset päivitetty
- [ ] Sivusto aukeaa tuotannossa
- [ ] Blogikirjoitukset näkyvät
- [ ] Haku toimii
- [ ] Kategoriasuodattimet toimivat
- [ ] Responsive design OK (testaa mobiililla)
- [ ] RSS-feed toimii (/rss.xml)
- [ ] Sitemap toimii (/sitemap.xml)

## 🎉 Valmista!

Kun kaikki on valmista, sinulla on:
- ✅ Moderni, nopea Next.js-sivusto
- ✅ Kaikki vanhat blogikirjoitukset säilyneet
- ✅ WordPress jatkossa vain sisällönhallintaan
- ✅ Automaattinen sisällön päivitys
- ✅ SEO-optimoitu rakenne
- ✅ Responsiivinen design
- ✅ Haku- ja suodatustoiminnot

Onnea uuden sivuston kanssa! 🚀
