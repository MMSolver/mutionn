"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
  Building2,
  Shield,
  ShoppingCart,
  Cpu,
  Rocket,
  BarChart3,
  Globe,
  Layers,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/lib/useTranslation";

const BRANDS = [
  { name: "TechFlow Lojistik", sector: "Lojistik & Taşımacılık" },
  { name: "Anadolu Commerce", sector: "E-Ticaret" },
  { name: "Nexus Fintech", sector: "Finansal Teknoloji" },
  { name: "Atlas Perakende", sector: "Perakende" },
  { name: "Vega İnşaat", sector: "İnşaat & Gayrimenkul" },
  { name: "Pulse Dijital", sector: "Dijital Pazarlama" },
  { name: "Deniz Yazılım", sector: "Yazılım" },
  { name: "Kırmızı Medya", sector: "Medya & İletişim" },
  { name: "Orion Sağlık", sector: "Sağlık Teknolojisi" },
  { name: "Kale Sigorta", sector: "Sigortacılık" },
  { name: "Zirve Danışmanlık", sector: "Yönetim Danışmanlığı" },
  { name: "Akıllı Tarım", sector: "Tarım Teknolojisi" },
];

const TESTIMONIALS = [
  {
    name: "Ahmet Yılmaz",
    role: "CEO",
    company: "TechFlow Lojistik",
    quote:
      "Tüm sevkiyat takip sistemimizi sıfırdan kurdu. Müşteri memnuniyetimiz %40 arttı, operasyonel hatalarımız neredeyse sıfıra indi. 3 yıldır sorunsuz çalışıyoruz.",
    service: "Özel Yazılım Geliştirme",
    metric: "%40 müşteri memnuniyeti artışı",
    icon: Building2,
  },
  {
    name: "Elif Kara",
    role: "Operasyon Müdürü",
    company: "Anadolu Commerce",
    quote:
      "E-ticaret altyapımızı tamamen yeniledi. Sayfa yüklenme hızımız 4 saniyeden 0.8 saniyeye düştü. Dönüşüm oranlarımız ilk ayda %25 arttı.",
    service: "E-Ticaret Çözümleri",
    metric: "%25 dönüşüm artışı",
    icon: ShoppingCart,
  },
  {
    name: "Murat Demir",
    role: "CTO",
    company: "Nexus Fintech",
    quote:
      "Güvenlik denetiminde 12 kritik açık tespit etti ve hepsini 48 saat içinde kapattı. PCI DSS uyumluluk sürecimizi büyük ölçüde hızlandırdı.",
    service: "Siber Güvenlik",
    metric: "12 kritik açık kapatıldı",
    icon: Shield,
  },
  {
    name: "Selin Arslan",
    role: "Kurucu",
    company: "Pulse Dijital",
    quote:
      "SaaS ürünümüzü MVP'den üretime 3 ayda taşıdı. Şu an 500+ aktif kullanıcıyla sorunsuz çalışıyor. Teknik bilgisi ve iletişimi mükemmel.",
    service: "SaaS Ürün Geliştirme",
    metric: "500+ aktif kullanıcı",
    icon: Rocket,
  },
  {
    name: "Burak Özkan",
    role: "Genel Müdür",
    company: "Atlas Perakende",
    quote:
      "50 mağazamızın stok ve sipariş süreçlerini otomatikleştirdi. Günde 3 saat manuel iş tasarrufu sağladık. Yatırımımız 2 ayda kendini amorti etti.",
    service: "Otomasyon Çözümleri",
    metric: "Günde 3 saat tasarruf",
    icon: Cpu,
  },
  {
    name: "Deniz Aydın",
    role: "Pazarlama Direktörü",
    company: "Kırmızı Medya",
    quote:
      "Mobil uygulamamız App Store'da kategorisinde ilk 50'ye girdi. Kullanıcı deneyimi tasarımı ve performans konusunda beklentimizin üzerinde iş çıkardı.",
    service: "Mobil Uygulama Geliştirme",
    metric: "App Store ilk 50",
    icon: BarChart3,
  },
  {
    name: "Canan Yıldırım",
    role: "IT Müdürü",
    company: "Kale Sigorta",
    quote:
      "Yıllık penetrasyon testi ve güvenlik izleme hizmetiyle KVKK uyum sürecimizi sorunsuz tamamladık. Siber güvenlik konusunda tam güven duyuyoruz.",
    service: "Siber Güvenlik",
    metric: "KVKK tam uyum",
    icon: Shield,
  },
  {
    name: "Oğuz Tan",
    role: "Kurucu Ortak",
    company: "Orion Sağlık",
    quote:
      "Hasta takip sistemimiz sayesinde randevu kaçırma oranımız %60 azaldı. Hastalarımız uygulamayı çok seviyor, biz de operasyonel olarak rahatladık.",
    service: "Özel Yazılım Geliştirme",
    metric: "%60 randevu kaçırma azalması",
    icon: Globe,
  },
  {
    name: "Zeynep Koç",
    role: "E-Ticaret Müdürü",
    company: "Vega İnşaat",
    quote:
      "Online malzeme satış platformumuzu kurdu. İlk 6 ayda 200+ B2B müşteri kazandık. Ödeme ve kargo entegrasyonları kusursuz çalışıyor.",
    service: "E-Ticaret Çözümleri",
    metric: "6 ayda 200+ B2B müşteri",
    icon: Layers,
  },
  {
    name: "Emre Çelik",
    role: "Operasyon Direktörü",
    company: "Zirve Danışmanlık",
    quote:
      "CRM ve proje yönetim araçlarımızı tek bir panelde birleştirdi. Ekibimizin verimliliği gözle görülür şekilde arttı, raporlama sürelerimiz yarıya indi.",
    service: "Otomasyon Çözümleri",
    metric: "Raporlama süresi %50 azaldı",
    icon: Briefcase,
  },
];

function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  featured?: boolean;
}) {
  const Icon = testimonial.icon;
  return (
    <div
      className={`flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] transition-colors hover:border-[var(--accent-primary)]/30 ${
        featured ? "p-8" : "p-6"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(5)].map((_, j) => (
            <Star
              key={j}
              className={`${featured ? "h-4 w-4" : "h-3.5 w-3.5"} fill-[var(--accent-primary)] text-[var(--accent-primary)]`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-md bg-[var(--accent-primary)]/10 px-2 py-1">
          <Icon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
          <span className="text-[10px] font-medium text-[var(--accent-primary)]">
            {testimonial.service}
          </span>
        </div>
      </div>

      <p
        className={`flex-1 leading-relaxed text-[var(--text-secondary)] italic ${
          featured ? "text-base" : "text-sm"
        }`}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-3 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)]/5 px-3 py-1 text-xs font-semibold text-[var(--accent-primary)]">
          <TrendingUp className="h-3 w-3" />
          {testimonial.metric}
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-[var(--border-default)] pt-4">
        <div
          className={`flex items-center justify-center rounded-full bg-[var(--accent-primary)] font-bold text-[var(--bg-primary)] ${
            featured ? "h-11 w-11 text-base" : "h-9 w-9 text-sm"
          }`}
        >
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p
            className={`font-semibold text-[var(--text-primary)] ${featured ? "text-base" : "text-sm"}`}
          >
            {testimonial.name}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReferanslarPage() {
  const [slide, setSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSlides = Math.ceil(TESTIMONIALS.length / 3);
  const { t } = useTranslation();

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlide((p) => (p + 1) % totalSlides);
    }, 6000);
  }, [totalSlides]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  const goTo = (index: number) => {
    setSlide(index);
    startAutoplay();
  };

  const prev = () => goTo((slide - 1 + totalSlides) % totalSlides);
  const next = () => goTo((slide + 1) % totalSlides);

  const visibleCards = TESTIMONIALS.slice(slide * 3, slide * 3 + 3);

  const STATS = [
    { value: "50+", label: t.references.stats.projects },
    { value: "%98", label: t.references.stats.satisfaction },
    { value: "15+", label: t.references.stats.partners },
    { value: "3+", label: t.references.stats.experience },
  ];

  return (
    <div className="bg-[var(--bg-primary)] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
              {t.references.badge}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
              {t.references.title}
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              {t.references.desc}
            </p>
          </div>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5 text-center"
              >
                <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--accent-primary)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Brand scroll band */}
        <ScrollReveal delay={0.15}>
          <div className="mt-16">
            <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
              {t.references.brands}
            </p>
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
              <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />
              <div className="flex animate-scroll-x gap-6">
                {[...BRANDS, ...BRANDS].map((brand, i) => (
                  <div
                    key={`${brand.name}-${i}`}
                    className="flex shrink-0 items-center gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] px-5 py-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10">
                      <span className="text-base font-bold text-[var(--accent-primary)]">
                        {brand.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="whitespace-nowrap text-sm font-semibold text-[var(--text-primary)]">
                        {brand.name}
                      </p>
                      <p className="whitespace-nowrap text-xs text-[var(--text-muted)]">
                        {brand.sector}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Testimonial Slider */}
        <ScrollReveal delay={0.2}>
          <div className="mt-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
                  {t.references.testimonialsBadge}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                  {t.references.testimonialsTitle}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                  aria-label="Previous"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                  aria-label="Next"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3" key={slide}>
              {visibleCards.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} featured />
              ))}
            </div>

            {/* Dots */}
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === slide
                      ? "w-10 bg-[var(--accent-primary)]"
                      : "w-2 bg-[var(--border-default)] hover:bg-[var(--text-muted)]"
                  }`}
                  aria-label={`${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Highlight quote */}
        <ScrollReveal delay={0.1}>
          <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-secondary)] p-10 text-center md:p-14">
            <Quote className="mx-auto mb-6 h-10 w-10 text-[var(--accent-primary)] opacity-40" />
            <p className="text-xl leading-relaxed text-[var(--text-secondary)] italic md:text-2xl">
              &ldquo;Teknik konulardaki uzmanlığı kadar iletişimi de çok
              kuvvetli. Projeyi teslim ettikten sonra da destek devam ediyor.
              Uzun vadeli çalışabileceğiniz ender isimlerden.&rdquo;
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[var(--accent-primary)] text-[var(--accent-primary)]"
                  />
                ))}
              </div>
              <p className="font-semibold text-[var(--text-primary)]">
                Hakan Erdoğan
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                CTO, Akıllı Tarım
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Full grid */}
        <div className="mt-20">
          <ScrollReveal>
            <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
              {t.references.allTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-[var(--text-secondary)]">
              {t.references.allDesc}
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TESTIMONIALS.map((testimonial, i) => (
              <ScrollReveal key={testimonial.name} delay={i * 0.08}>
                <TestimonialCard testimonial={testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.1}>
          <div className="mt-20 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-10 text-center md:p-14">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              {t.references.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[var(--text-secondary)]">
              {t.references.ctaDesc}
            </p>
            <a
              href="/iletisim"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-8 py-3.5 text-base font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              {t.references.ctaButton}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
