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
  { label: "İş Ortaklığı", href: "/ortaklik" },
] as const;

export const SERVICES = [
  {
    title: "Dijital Reklam Yönetimi",
    slug: "dijital-reklam",
    description:
      "Instagram, Facebook, TikTok ve Google'da müşteri bulan reklam kampanyaları kuruyoruz. Bütçeniz nereye gidiyor, kaç kişi geldi, kaçı müşteri oldu — her şeyi raporluyoruz.",
    icon: "Target",
  },
  {
    title: "E-Ticaret Çözümleri",
    slug: "e-ticaret",
    description:
      "İnternetten satış yapmak istiyorsanız mağazanızı kuruyoruz. Ödeme alma, kargo takibi, stok yönetimi — hepsi hazır, siz sadece ürünlerinizi ekleyin.",
    icon: "ShoppingCart",
  },
  {
    title: "Özel Yazılım Geliştirme",
    slug: "yazilim",
    description:
      "Excel'le yönettiğiniz işleri size özel bir yazılıma taşıyoruz. Müşteri takibi, sipariş yönetimi, raporlama — işinize özel, her cihazdan erişilebilir.",
    icon: "Code",
  },
  {
    title: "Otomasyon Çözümleri",
    slug: "otomasyon",
    description:
      "Her gün elle yaptığınız tekrarlayan işleri otomatik hale getiriyoruz. Fatura kesimi, stok uyarısı, müşteri bildirimi — sistem sizin yerinize çalışsın.",
    icon: "Cog",
  },
  {
    title: "Mobil Uygulama Geliştirme",
    slug: "mobil-uygulama",
    description:
      "Müşterilerinizin telefonundan sipariş vermesini, randevu almasını veya hesabını yönetmesini istiyorsanız — iPhone ve Android için uygulama yapıyoruz.",
    icon: "Smartphone",
  },
  {
    title: "Siber Güvenlik",
    slug: "siber-guvenlik",
    description:
      "Şirket verilerinizi ve müşteri bilgilerinizi koruma altına alıyoruz. Güvenlik açıklarını tespit edip kapatıyor, sisteminizi 7/24 izliyoruz.",
    icon: "Shield",
  },
  {
    title: "SaaS Ürün Geliştirme",
    slug: "saas",
    description:
      "Kendi yazılım ürününüzü çıkarmak istiyorsanız — fikrinizi abonelik modelli, ölçeklenebilir bir bulut ürününe dönüştürüyoruz.",
    icon: "Cloud",
  },
] as const;
