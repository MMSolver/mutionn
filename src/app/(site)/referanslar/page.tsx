"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Quote, ArrowLeft, ArrowRight, Building2, Shield, ShoppingCart, Cpu, Rocket, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const BRANDS = [
  { name: "TechFlow Lojistik", sector: "Lojistik & Taşımacılık" },
  { name: "Anadolu Commerce", sector: "E-Ticaret" },
  { name: "Nexus Fintech", sector: "Finansal Teknoloji" },
  { name: "Atlas Perakende", sector: "Perakende" },
  { name: "Vega İnşaat", sector: "İnşaat & Gayrimenkul" },
  { name: "Pulse Dijital", sector: "Dijital Pazarlama" },
  { name: "Deniz Yazılım", sector: "Yazılım" },
  { name: "Kırmızı Medya", sector: "Medya & İletişim" },
];

const TESTIMONIALS = [
  {
    name: "Ahmet Yılmaz",
    role: "CEO",
    company: "TechFlow Lojistik",
    quote:
      "Tüm sevkiyat takip sistemimizi sıfırdan kurdu. Müşteri memnuniyetimiz %40 arttı, operasyonel hatalarımız neredeyse sıfıra indi. 3 yıldır sorunsuz çalışıyoruz.",
    service: "Özel Yazılım Geliştirme",
    icon: Building2,
  },
  {
    name: "Elif Kara",
    role: "Operasyon Müdürü",
    company: "Anadolu Commerce",
    quote:
      "E-ticaret altyapımızı tamamen yeniledi. Sayfa yüklenme hızımız 4 saniyeden 0.8 saniyeye düştü. Dönüşüm oranlarımız ilk ayda %25 arttı.",
    service: "E-Ticaret Çözümleri",
    icon: ShoppingCart,
  },
  {
    name: "Murat Demir",
    role: "CTO",
    company: "Nexus Fintech",
    quote:
      "Güvenlik denetiminde 12 kritik açık tespit etti ve hepsini 48 saat içinde kapattı. PCI DSS uyumluluk sürecimizi büyük ölçüde hızlandırdı.",
    service: "Siber Güvenlik",
    icon: Shield,
  },
  {
    name: "Selin Arslan",
    role: "Kurucu",
    company: "Pulse Dijital",
    quote:
      "SaaS ürünümüzü MVP'den üretime 3 ayda taşıdı. Şu an 500+ aktif kullanıcıyla sorunsuz çalışıyor. Teknik bilgisi ve iletişimi mükemmel.",
    service: "SaaS Ürün Geliştirme",
    icon: Rocket,
  },
  {
    name: "Burak Özkan",
    role: "Genel Müdür",
    company: "Atlas Perakende",
    quote:
      "50 mağazamızın stok ve sipariş süreçlerini otomatikleştirdi. Günde 3 saat manuel iş tasarrufu sağladık. Yatırımımız 2 ayda kendini amorti etti.",
    service: "Otomasyon Çözümleri",
    icon: Cpu,
  },
  {
    name: "Deniz Aydın",
    role: "Pazarlama Direktörü",
    company: "Kırmızı Medya",
    quote:
      "Mobil uygulamamız App Store'da kategorisinde ilk 50'ye girdi. Kullanıcı deneyimi tasarımı ve performans konusunda beklentimizin üzerinde iş çıkardı.",
    service: "Mobil Uygulama Geliştirme",
    icon: BarChart3,
  },
];

const STATS = [
  { value: "50+", label: "Tamamlanan Proje" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
  { value: "15+", label: "Aktif İş Ortağı" },
  { value: "3+", label: "Yıllık Deneyim" },
];

export default function ReferanslarPage() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setActive(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % TESTIMONIALS.length);
    }, 5000);
  };

  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((active + 1) % TESTIMONIALS.length);

  const current = TESTIMONIALS[active];
  const Icon = current.icon;

  return (
    <div className="bg-[var(--bg-primary)] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
              Referanslar
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
              Güvenilir İş Ortaklıkları
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Farklı sektörlerden firmalarla başarılı projeler gerçekleştirdik.
            </p>
          </div>
        </ScrollReveal>

        {/* Brand scroll band */}
        <ScrollReveal delay={100}>
          <div className="relative mt-16 overflow-hidden">
            <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
            <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />
            <div className="flex animate-scroll-x gap-8">
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="flex shrink-0 items-center gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] px-6 py-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10">
                    <span className="text-lg font-bold text-[var(--accent-primary)]">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">
                      {brand.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                      {brand.sector}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonial Slider */}
        <ScrollReveal delay={200}>
          <div className="mt-20">
            <div className="relative mx-auto max-w-4xl">
              {/* Main card */}
              <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8 md:p-12">
                <div className="flex items-start gap-4">
                  <div className="hidden shrink-0 rounded-xl bg-[var(--accent-primary)]/10 p-3 md:block">
                    <Quote className="h-6 w-6 text-[var(--accent-primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-[var(--accent-primary)] text-[var(--accent-primary)]"
                        />
                      ))}
                    </div>

                    <p
                      className="text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl transition-opacity duration-500"
                      key={active}
                    >
                      &ldquo;{current.quote}&rdquo;
                    </p>

                    <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border-default)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-primary)] text-lg font-bold text-[var(--bg-primary)]">
                          {current.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">
                            {current.name}
                          </p>
                          <p className="text-sm text-[var(--text-muted)]">
                            {current.role}, {current.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-[var(--accent-primary)]/10 px-3 py-1.5">
                        <Icon className="h-4 w-4 text-[var(--accent-primary)]" />
                        <span className="text-xs font-medium text-[var(--accent-primary)]">
                          {current.service}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                  aria-label="Önceki"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === active
                          ? "w-8 bg-[var(--accent-primary)]"
                          : "w-2 bg-[var(--border-default)] hover:bg-[var(--text-muted)]"
                      }`}
                      aria-label={`Referans ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                  aria-label="Sonraki"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* All testimonials grid */}
        <div className="mt-20">
          <ScrollReveal>
            <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
              Tüm Müşteri Görüşleri
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => {
              const TIcon = t.icon;
              return (
                <ScrollReveal key={t.name} delay={i * 80}>
                  <div className="flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 transition-colors hover:border-[var(--accent-primary)]/30">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className="h-3.5 w-3.5 fill-[var(--accent-primary)] text-[var(--accent-primary)]"
                          />
                        ))}
                      </div>
                      <div className="rounded-md bg-[var(--accent-primary)]/10 p-1.5">
                        <TIcon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                      </div>
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)] italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="mt-4 flex items-center gap-3 border-t border-[var(--border-default)] pt-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-sm font-bold text-[var(--accent-primary)]">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {t.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <ScrollReveal delay={100}>
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 text-center"
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

        {/* CTA */}
        <ScrollReveal delay={100}>
          <div className="mt-20 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-10 text-center md:p-14">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              Sıradaki Başarı Hikayesi Sizin Olsun
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[var(--text-secondary)]">
              Projenizi birlikte değerlendirelim. İlk görüşme ücretsiz.
            </p>
            <a
              href="/iletisim"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-8 py-3.5 text-base font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              Ücretsiz Danışmanlık Alın
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
