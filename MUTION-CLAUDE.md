# MUTION — Profesyonel Dijital Ajans & Siber Güvenlik Sitesi

> **Domain:** mution.com.tr (henüz alınmadı — satın alınacak)
> **Marka:** Mution — Dijital Çözümler, Siber Güvenlik & Yazılım Ajansı
> **Slogan Önerisi:** "Dijital Dönüşümün Güvenli Adresi"

---

## 1. PROJE ÖZETİ

Mution, aşağıdaki hizmetleri sunan üst düzey, profesyonel bir dijital ajans sitesidir:

- **Siber Güvenlik Hizmetleri** — Penetrasyon testleri, güvenlik denetimleri, SIEM kurulumu, endpoint güvenliği, SOC hizmetleri
- **Otomasyon Kurulumları** — n8n, Zapier, Make entegrasyonları, iş süreçleri otomasyonu, API entegrasyonları
- **SaaS Ürünleri** — Şirketler için özel bulut tabanlı yazılım çözümleri
- **Özel Yazılım Geliştirme** — Web uygulamaları, dashboard'lar, yönetim panelleri
- **E-Ticaret Siteleri** — Shopify, WooCommerce, özel e-ticaret altyapıları
- **Mobil Uygulama Geliştirme** — React Native / Flutter ile basit-orta seviye mobil uygulamalar

---

## 2. TEKNOLOJİ STACK'İ

### Frontend (Public Site)
```
Framework:        Next.js 16 (App Router)
Dil:              TypeScript (strict mode)
Styling:          Tailwind CSS v4
UI Kütüphanesi:   shadcn/ui (Base UI primitives)
Animasyonlar:     Framer Motion v12 + GSAP ScrollTrigger
Smooth Scroll:    Lenis
İkonlar:          Lucide React
Font:             Inter (body) + Space Grotesk (headings)
3D (opsiyonel):   Three.js / React Three Fiber (hero section için)
```

### Backend / CMS / Admin Panel
```
CMS:              Payload CMS v3.85+ (Next.js native — aynı /app klasöründe çalışır)
Veritabanı:       PostgreSQL (Supabase veya Neon)
ORM:              Drizzle (Payload ile entegre)
Auth:             Payload built-in auth (admin panel için)
Email:            Resend (iletişim formu + bildirimler)
Dosya Depolama:   Vercel Blob veya Cloudflare R2
```

### Deployment
```
Hosting:          Vercel (öncelikli) veya Coolify (self-hosted)
CI/CD:            GitHub Actions
Analytics:        Plausible veya Umami (privacy-first)
SEO:              next-sitemap + JSON-LD structured data
```

### Referans GitHub Repoları
```
Ajans Template:       github.com/pinak3748/agency-kit-site (Next.js 15, shadcn/ui, GSAP)
Admin Dashboard:      github.com/Kiranism/next-shadcn-dashboard-starter (Next.js 16, shadcn/ui)
Animasyonlar:         github.com/itsjwill/motion-primitives-website (155+ animated components)
Payload CMS:          github.com/payloadcms/payload (45k stars, Next.js native CMS)
Multi-Agent Setup:    github.com/sagullapalli/claude-code-setup (Multi-agent orchestration)
Awwwards Referans:    github.com/WistantKode/k72.agency (Premium agency landing)
```

---

## 3. RENK PALETİ — "Industrial Obsidian"

> **KRİTİK:** Yapay zeka temalı renklerden (mor/mavi gradient, neon, AI-vari parlak renkler) TAMAMEN uzak durulacak.
> Tercih edilen estetik: Endüstriyel, corporate, güvenilir, premium.

### Ana Palet
```css
:root {
  /* Backgrounds */
  --bg-primary:       #0A0A0A;    /* Derin siyah — ana arka plan */
  --bg-secondary:     #141414;    /* Koyu gri — kart/section arka planları */
  --bg-tertiary:      #1C1C1C;    /* Hafif gri — hover/active states */
  --bg-surface:       #242424;    /* Surface elemanları */

  /* Accent — Terracotta/Amber (AI'dan uzak, endüstriyel) */
  --accent-primary:   #C4804A;    /* Terra cotta — ana CTA rengi */
  --accent-hover:     #D4905A;    /* Hover state */
  --accent-muted:     #8B5E3C;    /* Muted accent */

  /* Text */
  --text-primary:     #FAFAFA;    /* Ana metin — saf beyaz DEĞİL */
  --text-secondary:   #A3A3A3;    /* İkincil metin */
  --text-muted:       #737373;    /* Pasif metin */

  /* Borders */
  --border-default:   #2A2A2A;    /* Varsayılan border */
  --border-hover:     #404040;    /* Hover border */

  /* Status Colors */
  --success:          #22C55E;    /* Yeşil — başarılı */
  --warning:          #F59E0B;    /* Amber — uyarı */
  --error:            #EF4444;    /* Kırmızı — hata */
  --info:             #3B82F6;    /* Mavi — bilgi */
}
```

### Light Mode Alternatifi (Admin panel ve bazı sayfalar için)
```css
[data-theme="light"] {
  --bg-primary:       #FAFAF8;
  --bg-secondary:     #F5F0EB;
  --bg-tertiary:      #E8E0D8;
  --bg-surface:       #FFFFFF;
  --accent-primary:   #9A5B2E;
  --text-primary:     #1A1A1A;
  --text-secondary:   #525252;
  --text-muted:       #8A8A8A;
  --border-default:   #E5E5E5;
  --border-hover:     #D4D4D4;
}
```

### Tipografi
```
Headings:    Space Grotesk — 700/800 weight, letter-spacing: -0.02em
Body:        Inter — 400/500 weight, line-height: 1.6
Mono/Code:   JetBrains Mono — code blokları ve teknik içerik için
```

---

## 4. SAYFA YAPISI VE ROUTING

```
/                           → Ana Sayfa (Hero + Hizmetler Özet + Showcase + CTA)
/hizmetler                  → Tüm Hizmetler (grid layout)
/hizmetler/siber-guvenlik   → Siber Güvenlik detay sayfası
/hizmetler/otomasyon        → Otomasyon Kurulumları detay sayfası
/hizmetler/saas             → SaaS Ürünleri detay sayfası
/hizmetler/yazilim          → Özel Yazılım Geliştirme detay sayfası
/hizmetler/e-ticaret        → E-Ticaret Siteleri detay sayfası
/hizmetler/mobil-uygulama   → Mobil Uygulama Geliştirme detay sayfası
/projeler                   → Portfolyo / Tamamlanan Projeler
/projeler/[slug]            → Proje Detay Sayfası
/hakkimizda                 → Hakkımızda (Vizyon, Misyon, Ekip)
/blog                       → Blog listesi
/blog/[slug]                → Blog yazısı detay
/iletisim                   → İletişim formu + harita + bilgiler
/fiyatlandirma              → Fiyatlandırma paketleri (opsiyonel)
/admin                      → Payload CMS Admin Panel (giriş gerekli)
```

---

## 5. SAYFA DETAYLARI VE BİLEŞENLER

### 5.1 Ana Sayfa (/)

```
[Navigation]
  — Logo (sol) + Menü linkleri (orta) + "İletişim" CTA butonu (sağ)
  — Scroll'da blur backdrop + shrink efekti
  — Mobilde hamburger menü (Framer Motion ile açılır panel)

[Hero Section]
  — Tam ekran (100vh)
  — Sol: Başlık + Alt başlık + 2 CTA buton
  — Sağ: Abstract 3D shape veya grid/mesh animasyonu (Three.js veya SVG animasyon)
  — GSAP ile text reveal animasyonu (clip-path veya y-translate)
  — Particle/grid background (subtle, performans dostu)
  — Başlık örneği: "Dijital Altyapınızı Güçlendiriyoruz"
  — Alt başlık: "Siber güvenlik, otomasyon ve yazılım çözümleriyle işinizi koruyun ve büyütün."

[Marquee / Logo Bar]
  — "Güvendiğimiz Teknolojiler" veya "Çözüm Ortaklarımız"
  — Sonsuz yatay scroll (CSS marquee, JavaScript değil)
  — Gri tonlarında teknoloji logoları (Next.js, AWS, Cloudflare, n8n, vb.)

[Hizmetler Grid]
  — 6 hizmet kartı (2x3 veya 3x2 grid)
  — Her kart: ikon + başlık + kısa açıklama + "Detaylar →" linki
  — Hover'da: border glow efekti (accent renk) + slight scale
  — GSAP ScrollTrigger ile staggered reveal

[Rakamlarla Biz]
  — 4 adet counter (animated number count-up)
  — Örnek: "50+ Proje" / "99.9% Uptime" / "7/24 Destek" / "15+ Müşteri"
  — Scroll'a girdiğinde counter başlar

[Öne Çıkan Projeler]
  — 3 proje showcase kartı (büyük görseller)
  — Hover'da overlay + proje başlığı + kategori badge
  — "Tüm Projeler →" CTA

[Testimonials / Müşteri Yorumları]
  — Carousel/slider (Swiper.js veya custom)
  — Müşteri fotoğrafı + yorum + isim + şirket
  — Auto-play + manual navigation

[CTA Section]
  — Tam genişlik dark/gradient section
  — "Projenizi Hayata Geçirelim" + İletişim butonu
  — Subtle background pattern veya mesh gradient

[Footer]
  — 4 kolon: Logo+açıklama, Hizmetler linkleri, Şirket linkleri, İletişim bilgileri
  — Sosyal medya ikonları
  — Copyright + Gizlilik Politikası + Kullanım Koşulları
```

### 5.2 Hizmet Detay Sayfaları (/hizmetler/[slug])

```
Her hizmet sayfası şu yapıda:
  — Hero banner (hizmete özel ikon + başlık + açıklama)
  — "Ne Sunuyoruz" bölümü (feature list with icons)
  — "Süreç" bölümü (numbered steps timeline)
  — "Kullandığımız Teknolojiler" (tech stack icons)
  — İlgili projeler showcase
  — CTA bölümü ("Bu hizmeti almak ister misiniz?")
  — FAQ accordion (Payload CMS'den yönetilebilir)
```

### 5.3 Siber Güvenlik Sayfası (Özel İçerik)

```
Ek bölümler:
  — Güvenlik Hizmetleri alt kategorileri:
    • Penetrasyon Testi & Zafiyet Taraması
    • SIEM Kurulumu & Log Yönetimi
    • Endpoint Güvenliği
    • SOC (Security Operations Center) Hizmeti
    • Güvenlik Farkındalık Eğitimleri
    • Olay Müdahale (Incident Response)
  — "Güvenlik Skorunuz" interaktif mini assessment tool (opsiyonel)
  — Sertifikalar ve yetkinlikler section
```

### 5.4 İletişim Sayfası (/iletisim)

```
  — İletişim formu (react-hook-form + zod validation)
    Fields: Ad Soyad, E-posta, Telefon, Şirket (opsiyonel), Hizmet seçimi (dropdown), Mesaj
  — Form gönderimi: Resend API ile e-posta + Payload CMS'e kayıt
  — Google Maps embed veya Leaflet harita
  — Direkt iletişim bilgileri (telefon, e-posta, adres)
  — Sosyal medya linkleri
```

---

## 6. PAYLOAD CMS — ADMİN PANELİ YAPISI

### Collections (Veritabanı Tabloları)

```typescript
// Payload CMS Collection yapısı

// 1. SAYFALAR
Pages: {
  fields: [title, slug, content (richText), seo (meta), status (draft/published)]
}

// 2. HİZMETLER
Services: {
  fields: [
    title, slug, shortDescription, fullDescription (richText),
    icon (select), heroImage (upload), features (array),
    technologies (array), process (array of steps),
    faq (array), order (number), isActive (boolean),
    seo (group: metaTitle, metaDescription, ogImage)
  ]
}

// 3. PROJELER
Projects: {
  fields: [
    title, slug, client, category (relation to Services),
    description (richText), thumbnail (upload),
    images (array of uploads), technologies (array),
    projectUrl, completionDate, isFeatured (boolean),
    testimonial (group: quote, author, role)
  ]
}

// 4. BLOG YAZILARI
BlogPosts: {
  fields: [
    title, slug, excerpt, content (richText),
    coverImage (upload), author (relation to Team),
    category (select), tags (array), publishedAt,
    readingTime (virtual), status (draft/published),
    seo (group)
  ]
}

// 5. EKİP
Team: {
  fields: [
    name, role, bio, photo (upload),
    socialLinks (group: linkedin, github, twitter),
    order (number), isActive (boolean)
  ]
}

// 6. MÜŞTERİ YORUMLARI
Testimonials: {
  fields: [
    quote, clientName, clientRole, company,
    clientPhoto (upload), rating (1-5),
    relatedProject (relation), isActive (boolean)
  ]
}

// 7. İLETİŞİM FORMLARI
ContactSubmissions: {
  fields: [
    name, email, phone, company, service (select),
    message, status (new/read/replied/archived),
    notes (admin only), submittedAt
  ]
  // Admin panelde: liste görünümü + durum filtreleme + bulk actions
}

// 8. GENEL AYARLAR (Global)
SiteSettings: {
  fields: [
    siteName, logo (upload), favicon (upload),
    contactEmail, contactPhone, address,
    socialLinks (group), googleAnalyticsId,
    maintenanceMode (boolean),
    announcementBar (group: text, link, isActive)
  ]
}

// 9. MEDYA
Media: {
  fields: [alt, caption]
  // Otomatik: webp dönüşümü, responsive sizes, lazy loading
}

// 10. SSS
FAQ: {
  fields: [
    question, answer (richText),
    category (relation to Services),
    order (number), isActive (boolean)
  ]
}

// 11. FİYATLANDIRMA PAKETLERİ
PricingPlans: {
  fields: [
    name, description, price, currency, billingPeriod,
    features (array of {text, included: boolean}),
    ctaText, ctaLink, isPopular (boolean),
    order (number), isActive (boolean)
  ]
}

// 12. TEKNOLOJİLER
Technologies: {
  fields: [
    name, logo (upload), category (select: frontend/backend/security/devops/mobile),
    url, order (number)
  ]
}
```

### Admin Panel Özellikleri

```
✅ Dashboard:
   — Toplam form gönderimi sayısı (bugün/bu hafta/bu ay)
   — Son iletişim formları listesi
   — Yayındaki blog yazısı sayısı
   — Proje sayısı
   — Hızlı erişim butonları

✅ İçerik Yönetimi:
   — Rich text editör (Lexical — Payload native)
   — Medya kütüphanesi (drag & drop upload)
   — Versiyon geçmişi (her içerik için)
   — Draft/Published workflow
   — Zamanlanmış yayın

✅ SEO Yönetimi:
   — Her sayfa/yazı için: meta title, meta description, og:image
   — Otomatik sitemap.xml oluşturma
   — robots.txt yönetimi

✅ Kullanıcı Yönetimi:
   — Admin, Editor, Viewer rolleri
   — İki faktörlü doğrulama (opsiyonel)

✅ Form Yönetimi:
   — Gelen formları listeleme, filtreleme, durumunu güncelleme
   — E-posta bildirimi (yeni form geldiğinde)
   — CSV export

✅ Özelleştirme:
   — Hizmet ekleme/kaldırma/sıralama
   — Blog kategorileri yönetimi
   — Testimonial onaylama sistemi
   — Fiyatlandırma paketlerini güncelleme
   — Site geneli ayarlar (logo, iletişim bilgileri, sosyal medya)
   — Bakım modu açma/kapama
   — Duyuru barı açma/kapama
```

---

## 7. MULTI-AGENT MİMARİSİ (Böl ve Yönet)

> Her ajan kendi görevine odaklanır. Ana orchestrator koordine eder.

### Agent Yapısı (.claude/agents/)

```
.claude/agents/
├── orchestrator.md          → Ana koordinatör ajan
├── frontend-architect.md    → Frontend tasarım ve bileşenler
├── backend-engineer.md      → Payload CMS, API, veritabanı
├── security-specialist.md   → Güvenlik best practices, CSP, headers
├── seo-optimizer.md         → SEO, performans, accessibility
├── content-writer.md        → Türkçe içerik üretimi
└── qa-tester.md             → Test, doğrulama, review
```

### Agent Detayları

#### 1. Orchestrator (Ana Koordinatör)
```markdown
---
name: orchestrator
description: Projenin ana koordinatörü. Görevleri dağıtır, ilerlemeyi takip eder, çakışmaları çözer.
model: opus
tools: [read, write, edit, bash, grep, glob, agent]
---

## Görev
- Kullanıcıdan gelen talepleri analiz et ve uygun ajana yönlendir
- Ajanlar arası bağımlılıkları yönet
- Projenin genel durumunu .claude/memory/project-status.md'de güncelle
- Kod çakışmalarını çöz
- Her sprint sonunda özet rapor hazırla

## Kurallar
- Doğrudan kod yazma — ilgili ajana devret
- Her ajan sonucu döndüğünde doğrula
- Kritik kararlar için kullanıcıya danış
```

#### 2. Frontend Architect
```markdown
---
name: frontend-architect
description: Frontend bileşenler, sayfalar, animasyonlar ve responsive tasarım
model: sonnet
tools: [read, write, edit, bash, grep, glob]
---

## Görev
- Next.js sayfa ve layout yapısını oluştur
- shadcn/ui bileşenlerini customize et
- Framer Motion + GSAP animasyonları implement et
- Responsive tasarımı garanti et (mobile-first)
- Tailwind CSS ile renk sistemi ve tipografiyi kur

## Teknoloji
- Next.js 16 App Router
- TypeScript strict
- Tailwind CSS v4
- shadcn/ui
- Framer Motion v12
- GSAP + ScrollTrigger
- Lenis (smooth scroll)

## Standartlar
- Her bileşen /src/components/ altında
- Sayfa bileşenleri /src/app/(site)/ altında
- Ortak layout: /src/app/(site)/layout.tsx
- Reusable bileşenler: /src/components/ui/ (shadcn) ve /src/components/sections/
- Animasyon hook'ları: /src/hooks/
- Tüm görseller next/image ile optimize
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
```

#### 3. Backend Engineer
```markdown
---
name: backend-engineer
description: Payload CMS kurulumu, veritabanı şeması, API endpoints, admin panel
model: sonnet
tools: [read, write, edit, bash, grep, glob]
---

## Görev
- Payload CMS'i Next.js projesine entegre et
- Collection şemalarını oluştur (Section 6'daki tüm collection'lar)
- Admin panel custom dashboard oluştur
- İletişim formu API endpoint'i + Resend entegrasyonu
- Medya upload pipeline (otomatik webp, resize)
- Seed data oluştur (demo içerik)
- Veritabanı migration'ları yönet

## Yapı
/src/
├── app/
│   ├── (site)/          → Public site route'ları
│   └── (payload)/       → Admin panel route'ları (auto-generated)
├── collections/         → Payload collection config'leri
├── globals/             → Payload global config'leri (SiteSettings)
├── access/              → Access control fonksiyonları
├── hooks/               → Payload afterChange/beforeChange hook'ları
└── payload.config.ts    → Ana Payload config
```

#### 4. Security Specialist
```markdown
---
name: security-specialist
description: Web güvenliği, CSP headers, rate limiting, input validation
model: sonnet
tools: [read, write, edit, bash, grep]
---

## Görev
- Content Security Policy (CSP) headers kur
- Rate limiting implement et (iletişim formu için)
- Input sanitization ve validation
- CORS policy'leri düzenle
- next.config.ts security headers
- Payload CMS admin panel güvenliği (IP whitelist opsiyonel)
- Dependency audit (npm audit)
- .env dosyası yönetimi (.env.example oluştur)

## Kontrol Listesi
- [ ] Strict CSP headers
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Rate limiting (API routes)
- [ ] CSRF koruması
- [ ] SQL injection koruması (Drizzle ORM ile parametrize)
- [ ] XSS koruması (React default + DOMPurify for richtext)
- [ ] Secrets management (.env)
```

#### 5. SEO Optimizer
```markdown
---
name: seo-optimizer
description: SEO meta tags, yapılandırılmış veri, performans, accessibility
model: haiku
tools: [read, write, edit, grep]
---

## Görev
- Her sayfa için meta tags (title, description, og:image)
- JSON-LD structured data (Organization, Service, Article, BreadcrumbList)
- Otomatik sitemap.xml (next-sitemap)
- robots.txt oluşturma
- Canonical URL'ler
- Hreflang tags (Türkçe/İngilizce planı varsa)
- Image alt text kontrolü
- Heading hierarchy kontrolü (h1 > h2 > h3)
- Lighthouse score kontrolü (hedef: 90+ tüm kategorilerde)
- WCAG 2.1 AA accessibility kontrolü

## Dosyalar
/src/lib/seo.ts            → SEO utility fonksiyonları
/src/lib/structured-data.ts → JSON-LD generators
/next-sitemap.config.js     → Sitemap config
/public/robots.txt           → Robots dosyası
```

#### 6. Content Writer
```markdown
---
name: content-writer
description: Türkçe web içerikleri, hizmet açıklamaları, blog yazıları, SEO metinleri
model: sonnet
tools: [read, write, edit]
---

## Görev
- Tüm sayfalar için Türkçe içerik üret
- Hizmet açıklamaları (profesyonel, teknik ama anlaşılır)
- Blog için örnek yazılar (3-5 adet seed content)
- Meta description'lar (155 karakter max)
- CTA metinleri
- FAQ içerikleri (her hizmet için 5-8 soru)
- E-posta şablonları (iletişim formu yanıtı)

## Ton ve Stil
- Profesyonel ama sıcak
- Teknik terimler Türkçe karşılıklarıyla birlikte
- "Biz" dili (kurumsal ama samimi)
- Aktif cümleler tercih et
- Her paragraf max 3-4 cümle
```

#### 7. QA Tester
```markdown
---
name: qa-tester
description: Test, doğrulama, kod review, accessibility ve performans kontrolü
model: haiku
tools: [read, bash, grep, glob]
---

## Görev
- TypeScript tip hatalarını kontrol et (tsc --noEmit)
- ESLint + Prettier uyumluluğu
- Responsive test (mobile, tablet, desktop breakpoints)
- Cross-browser uyumluluk notu
- Lighthouse audit çalıştır
- Broken link kontrolü
- Form validation testi
- Admin panel CRUD işlem testi
- Build başarılı mı kontrolü (next build)
- Bundle size analizi (@next/bundle-analyzer)

## Komutlar
npm run lint          → ESLint kontrolü
npm run type-check    → TypeScript kontrolü
npm run build         → Production build testi
npm run analyze       → Bundle boyut analizi
```

---

## 8. PROJE DOSYA YAPISI

```
mution/
├── .claude/
│   ├── agents/
│   │   ├── orchestrator.md
│   │   ├── frontend-architect.md
│   │   ├── backend-engineer.md
│   │   ├── security-specialist.md
│   │   ├── seo-optimizer.md
│   │   ├── content-writer.md
│   │   └── qa-tester.md
│   ├── memory/
│   │   └── project-status.md
│   ├── skills/
│   │   ├── payload-collection.md
│   │   ├── component-pattern.md
│   │   └── animation-pattern.md
│   └── settings.json
│
├── CLAUDE.md                          → Bu dosya (ana context)
│
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── projects/
│   │   └── team/
│   ├── robots.txt
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── (site)/                    → Public site
│   │   │   ├── layout.tsx             → Ana layout (Nav + Footer)
│   │   │   ├── page.tsx               → Ana sayfa
│   │   │   ├── hizmetler/
│   │   │   │   ├── page.tsx           → Tüm hizmetler
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx       → Hizmet detay
│   │   │   ├── projeler/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── hakkimizda/
│   │   │   │   └── page.tsx
│   │   │   ├── iletisim/
│   │   │   │   └── page.tsx
│   │   │   └── fiyatlandirma/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (payload)/                 → Payload admin panel (auto)
│   │   │   └── admin/
│   │   │       └── [[...segments]]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts           → İletişim formu API
│   │   │   └── [...payload]/
│   │   │       └── route.ts           → Payload REST API
│   │   │
│   │   ├── layout.tsx                 → Root layout
│   │   └── globals.css                → Global stiller + CSS variables
│   │
│   ├── collections/
│   │   ├── Services.ts
│   │   ├── Projects.ts
│   │   ├── BlogPosts.ts
│   │   ├── Team.ts
│   │   ├── Testimonials.ts
│   │   ├── ContactSubmissions.ts
│   │   ├── FAQ.ts
│   │   ├── PricingPlans.ts
│   │   ├── Technologies.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   │
│   ├── globals/
│   │   └── SiteSettings.ts
│   │
│   ├── components/
│   │   ├── ui/                        → shadcn/ui bileşenleri (customized)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── PageTransition.tsx
│   │   │
│   │   ├── sections/                  → Sayfa section bileşenleri
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── ProjectShowcase.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── TechMarquee.tsx
│   │   │   ├── BlogPreview.tsx
│   │   │   └── ContactForm.tsx
│   │   │
│   │   └── shared/                    → Paylaşılan bileşenler
│   │       ├── AnimatedText.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── ServiceCard.tsx
│   │       ├── BlogCard.tsx
│   │       └── ScrollProgress.tsx
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts      → GSAP ScrollTrigger hook
│   │   ├── useReducedMotion.ts        → Accessibility motion hook
│   │   ├── useLenis.ts               → Smooth scroll hook
│   │   └── useCountUp.ts             → Counter animasyon hook
│   │
│   ├── lib/
│   │   ├── payload.ts                 → Payload client
│   │   ├── seo.ts                     → SEO utilities
│   │   ├── structured-data.ts         → JSON-LD generators
│   │   ├── resend.ts                  → Email client
│   │   ├── utils.ts                   → Genel utility fonksiyonları
│   │   └── constants.ts              → Sabit değerler, navigation items
│   │
│   ├── styles/
│   │   └── animations.css             → GSAP/Framer Motion keyframes
│   │
│   ├── types/
│   │   ├── payload.ts                 → Payload auto-generated types
│   │   └── index.ts                   → Genel type tanımları
│   │
│   └── payload.config.ts             → Payload CMS ana config
│
├── .env.example                       → Environment variables template
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 9. ANİMASYON STANDARTLARI

```
1. Sayfa Geçişleri:
   — Framer Motion AnimatePresence
   — Fade + slight y-translate (duration: 0.5s, ease: [0.25, 0.1, 0.25, 1])

2. Scroll Reveal:
   — GSAP ScrollTrigger
   — Threshold: 20% (element viewport'un %20'sine girdiğinde tetikle)
   — Stagger: 0.1s (çoklu elementler için)
   — Duration: 0.8s
   — Ease: "power3.out"

3. Hover Efektleri:
   — CSS transitions (GPU-accelerated: transform, opacity)
   — Duration: 0.3s
   — Scale: 1.02 (kartlar için) / 1.05 (butonlar için)

4. Text Reveal:
   — Clip-path veya overflow-hidden + y-translate
   — Character-by-character veya word-by-word
   — Sadece hero ve section heading'ler için

5. Performans Kuralları:
   — will-change: sadece aktif animasyonlarda
   — prefers-reduced-motion: reduce — tüm animasyonları devre dışı bırak
   — Intersection Observer ile lazy animation loading
   — 60fps hedefi
```

---

## 10. ENVIRONMENT VARIABLES

```env
# .env.example

# Payload CMS
PAYLOAD_SECRET=your_payload_secret_here
DATABASE_URI=postgresql://user:password@host:5432/mution

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=info@mution.com.tr

# Vercel Blob (File Storage)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxx

# Analytics (Opsiyonel)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=mution.com.tr

# Site
NEXT_PUBLIC_SITE_URL=https://mution.com.tr
NEXT_PUBLIC_SITE_NAME=Mution

# Google Maps (İletişim sayfası)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

---

## 11. GELİŞTİRME ADIMLARI (Sprint Planı)

### Sprint 1: Temel Altyapı (1-2 gün)
```
1. Next.js 16 projesi oluştur (create-next-app)
2. Tailwind CSS v4 + shadcn/ui kur
3. Payload CMS entegre et (PostgreSQL ile)
4. Renk sistemi ve tipografiyi globals.css'e ekle
5. Temel layout (Navbar + Footer) oluştur
6. Framer Motion + GSAP + Lenis kur
7. ESLint + Prettier konfigüre et
8. .env.example oluştur
```

### Sprint 2: Payload CMS Collections (1 gün)
```
1. Tüm collection'ları oluştur (Section 6)
2. SiteSettings global'ini oluştur
3. Access control (admin, editor rolleri)
4. Seed data (demo hizmetler, projeler, blog yazıları)
5. Admin panel custom dashboard (opsiyonel)
6. Medya upload pipeline
```

### Sprint 3: Public Site — Ana Sayfa (1-2 gün)
```
1. Hero section (animasyonlu)
2. Tech marquee
3. Services grid
4. Stats counter
5. Project showcase
6. Testimonials slider
7. CTA section
8. Responsive kontrol
```

### Sprint 4: Alt Sayfalar (1-2 gün)
```
1. Hizmetler ana sayfa + 6 detay sayfası
2. Projeler listesi + detay sayfası
3. Hakkımızda sayfası
4. Blog listesi + detay sayfası
5. İletişim sayfası (form + harita)
6. Fiyatlandırma sayfası
```

### Sprint 5: İçerik & SEO (1 gün)
```
1. Tüm sayfalar için Türkçe içerik
2. Meta tags ve OG images
3. JSON-LD structured data
4. Sitemap + robots.txt
5. Lighthouse audit ve optimizasyon
```

### Sprint 6: Güvenlik & Final (1 gün)
```
1. Security headers
2. Rate limiting
3. Form validation güçlendirme
4. Cross-browser test
5. Performance optimization (lazy loading, code splitting)
6. Final build test
7. Deployment hazırlığı
```

---

## 12. YASAKLAR VE KURALLAR

```
❌ YAPMA:
- Yapay zeka temalı renkler kullanma (mor/mavi gradientler, neon, parlak teknoloji renkleri)
- AI ile ilgili görseller/ikonlar kullanma (robot, beyin, neural network görselleri)
- Lorem ipsum bırakma — tüm içerik Türkçe olmalı
- inline style kullanma — her şey Tailwind CSS ile
- any tipi kullanma — strict TypeScript
- console.log bırakma — production kodda olmaz
- Hardcoded içerik — her şey Payload CMS'den gelecek
- Gereksiz npm paketi ekleme — bundle boyutuna dikkat

✅ YAP:
- Mobile-first responsive tasarım
- Semantic HTML (main, section, article, nav, footer)
- Image optimization (next/image, webp, lazy loading)
- Accessibility (ARIA labels, keyboard navigation, focus states)
- Error boundaries ve loading states
- TypeScript strict mode
- Git conventional commits (feat:, fix:, docs:, style:, refactor:)
- Her component için prop types tanımla
- Server Components varsayılan, Client Components sadece gerektiğinde ("use client")
```

---

## 13. NOTLAR

- **Domain:** mution.com.tr henüz alınmadı. Development sırasında localhost:3000 kullanılacak.
- **Dil:** Site şu an sadece Türkçe. İleride İngilizce eklenebilir (next-intl ile).
- **Ödeme:** Site üzerinden ödeme alınmayacak. Fiyatlandırma sayfası bilgi amaçlı.
- **Blog:** Payload CMS üzerinden yönetilecek. Markdown + Rich Text desteği.
- **İletişim Formu:** Honeypot + rate limiting ile spam koruması.
- **Admin Panel:** /admin yolunda, sadece yetkili kullanıcılar erişebilir.
- **Vercel:** Ücretsiz plan ile başlanabilir. Custom domain eklendiğinde pro plana geçilebilir.

---

> Bu dosya Claude Code'a verildiğinde, orchestrator ajanı görevleri diğer ajanlara dağıtarak projeyi paralel olarak inşa edecektir. Her ajan kendi uzmanlık alanında çalışır ve sonuçları orchestrator'a raporlar.
