export const SITE_NAME = "Mution";
export const SITE_DESCRIPTION =
  "Siber güvenlik, otomasyon ve yazılım çözümleriyle işinizi koruyun ve büyütün.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const NAV_ITEMS = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Fiyatlandırma", href: "/fiyatlandirma" },
  { label: "İş Ortaklığı", href: "/ortaklik" },
] as const;

export const SERVICES = [
  {
    title: "Siber Güvenlik",
    slug: "siber-guvenlik",
    description:
      "İşletmenizi dijital tehditlere karşı koruyoruz. Güvenlik açıklarını tespit ediyor, sürekli izleme ile riskleri minimize ediyoruz.",
    icon: "Shield",
  },
  {
    title: "Otomasyon Çözümleri",
    slug: "otomasyon",
    description:
      "Tekrarlayan iş süreçlerinizi otomatikleştiriyoruz. Zamandan tasarruf edin, hata oranını sıfıra indirin, ekibinizi stratejik işlere odaklayın.",
    icon: "Cog",
  },
  {
    title: "SaaS Ürün Geliştirme",
    slug: "saas",
    description:
      "Fikrinizi ölçeklenebilir bir bulut ürününe dönüştürüyoruz. Abonelik yönetimi, kullanıcı paneli ve analitik dahil.",
    icon: "Cloud",
  },
  {
    title: "Özel Yazılım Geliştirme",
    slug: "yazilim",
    description:
      "İşletmenize özel web uygulamaları ve yönetim panelleri geliştiriyoruz. Tam size uygun, hızlı ve güvenli çözümler.",
    icon: "Code",
  },
  {
    title: "E-Ticaret Çözümleri",
    slug: "e-ticaret",
    description:
      "Online satış altyapınızı kuruyoruz. Ödeme sistemleri, stok yönetimi ve müşteri deneyimi optimizasyonu ile satışlarınızı artırın.",
    icon: "ShoppingCart",
  },
  {
    title: "Mobil Uygulama Geliştirme",
    slug: "mobil-uygulama",
    description:
      "iOS ve Android için profesyonel mobil uygulamalar geliştiriyoruz. Müşterilerinize her yerden ulaşın.",
    icon: "Smartphone",
  },
  {
    title: "Dijital Reklam Yönetimi",
    slug: "dijital-reklam",
    description:
      "Meta, TikTok ve Google Ads platformlarında veri odaklı reklam kampanyaları yönetiyoruz. Sektörünüze özel stratejiyle bütçenizi en verimli şekilde kullanın.",
    icon: "Target",
  },
] as const;
