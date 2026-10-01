"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  Shield,
  Cog,
  Cloud,
  Code,
  Smartphone,
  Terminal,
  Layers,
  TrendingUp,
  Zap,
  BarChart3,
} from "lucide-react";

const CATEGORIES = ["Tümü", "Siber Güvenlik", "Yazılım", "E-Ticaret", "Otomasyon", "Mobil"];

const PROJECTS = [
  {
    title: "E-Ticaret Platformu",
    subtitle: "Yüksek Performanslı Satış Altyapısı",
    category: "E-Ticaret",
    description:
      "Yüksek trafikli bir e-ticaret platformunun sıfırdan tasarımı ve geliştirilmesi. Mikro-servis mimarisi, CDN entegrasyonu ve gerçek zamanlı stok yönetimi.",
    tech: ["Next.js", "Shopify API", "Tailwind CSS", "PostgreSQL"],
    icon: ShoppingCart,
    accentColor: "#D4874B",
    highlight: { icon: TrendingUp, value: "10K+", label: "Günlük Ziyaretçi" },
    scope: ["Platform Tasarımı", "API Entegrasyonu", "Performans Optimizasyonu"],
  },
  {
    title: "SOC Dashboard",
    subtitle: "Gerçek Zamanlı Tehdit İzleme Merkezi",
    category: "Siber Güvenlik",
    description:
      "Güvenlik izleme merkezi için özel dashboard ve alarm yönetim sistemi. Otomatik tehdit sınıflandırma ve anlık bildirim altyapısı.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    icon: Shield,
    accentColor: "#22C55E",
    highlight: { icon: Zap, value: "<2sn", label: "Alarm Tepki Süresi" },
    scope: ["Dashboard Geliştirme", "SIEM Entegrasyonu", "Alarm Otomasyonu"],
  },
  {
    title: "İş Süreçleri Otomasyonu",
    subtitle: "Uçtan Uca Süreç Dijitalleştirme",
    category: "Otomasyon",
    description:
      "Manuel süreçlerin %80'ini otomatikleştiren kapsamlı bir otomasyon çözümü. 50+ otomatik iş akışı ve mevcut sistemlerle tam entegrasyon.",
    tech: ["Otomasyon", "API", "Bulut Altyapı", "Entegrasyon"],
    icon: Cog,
    accentColor: "#F59E0B",
    highlight: { icon: BarChart3, value: "%80", label: "Otomasyon Oranı" },
    scope: ["Süreç Analizi", "Otomasyon Kurulumu", "Entegrasyon"],
  },
  {
    title: "SaaS Yönetim Paneli",
    subtitle: "Multi-Tenant Bulut Platformu",
    category: "Yazılım",
    description:
      "Multi-tenant mimari ile bulut tabanlı müşteri yönetim platformu. Rol bazlı erişim kontrolü, faturalandırma modülü ve analitik dashboard.",
    tech: ["Next.js", "Drizzle ORM", "Vercel", "Stripe"],
    icon: Cloud,
    accentColor: "#D4874B",
    highlight: { icon: TrendingUp, value: "200+", label: "Aktif Kullanıcı" },
    scope: ["SaaS Mimarisi", "Ödeme Sistemi", "Analitik Panel"],
  },
  {
    title: "Kurumsal Web Sitesi",
    subtitle: "SEO Odaklı Performans Çözümü",
    category: "Yazılım",
    description:
      "Hızlı, SEO-uyumlu ve tamamen yönetilebilir kurumsal web sitesi. Headless CMS, otomatik görsel optimizasyon ve çoklu dil desteği.",
    tech: ["Next.js", "Payload CMS", "Tailwind", "Vercel"],
    icon: Code,
    accentColor: "#D4874B",
    highlight: { icon: Zap, value: "98+", label: "Lighthouse Skoru" },
    scope: ["UI/UX Tasarım", "CMS Entegrasyonu", "SEO Optimizasyonu"],
  },
  {
    title: "Mobil Sipariş Uygulaması",
    subtitle: "Cross-Platform Sipariş Sistemi",
    category: "Mobil",
    description:
      "Restoran zinciri için cross-platform mobil sipariş ve ödeme uygulaması. Push bildirimler, gerçek zamanlı sipariş takibi ve ödeme entegrasyonu.",
    tech: ["React Native", "Firebase", "Stripe", "Node.js"],
    icon: Smartphone,
    accentColor: "#D4874B",
    highlight: { icon: TrendingUp, value: "5K+", label: "İndirme" },
    scope: ["Mobil Geliştirme", "Ödeme Entegrasyonu", "Push Bildirim"],
  },
];

function CircuitPattern({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.05]"
      viewBox="0 0 400 200"
      fill="none"
    >
      <path d="M0 100 H120 V40 H200 V100 H280 V160 H400" stroke={color} strokeWidth="1" />
      <path d="M0 60 H80 V140 H160 V80 H240 V120 H320 V40 H400" stroke={color} strokeWidth="0.5" />
      <circle cx="120" cy="40" r="3" fill={color} />
      <circle cx="200" cy="100" r="3" fill={color} />
      <circle cx="280" cy="160" r="3" fill={color} />
      <circle cx="80" cy="140" r="3" fill={color} />
      <circle cx="240" cy="120" r="2" fill={color} />
      <circle cx="320" cy="40" r="2" fill={color} />
    </svg>
  );
}

export default function ProjelerPage() {
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const filtered =
    activeFilter === "Tümü"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 px-4 py-1.5">
            <Terminal size={14} className="text-[var(--accent-primary)]" />
            <span className="font-mono text-xs text-[var(--accent-primary)]">
              ~/projeler
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl lg:text-6xl">
            Başarı{" "}
            <span className="text-[var(--accent-primary)]">Hikayeleri</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-secondary)]">
            Her biri özenle tasarlanmış, ölçeklenebilir ve güvenli dijital çözümler.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-lg shadow-[var(--accent-primary)]/20"
                  : "border border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--accent-primary)]/40 hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((project) => {
            const Icon = project.icon;
            const HighlightIcon = project.highlight.icon;
            return (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] transition-all duration-500 hover:border-[var(--accent-primary)]/30 hover:shadow-[0_0_60px_-20px] hover:shadow-[var(--accent-primary)]/15"
              >
                {/* Visual header */}
                <div className="relative h-44 overflow-hidden border-b border-[var(--border-default)]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 30% 50%, ${project.accentColor}12 0%, transparent 70%), radial-gradient(ellipse at 70% 80%, ${project.accentColor}08 0%, transparent 50%)`,
                    }}
                  />
                  <CircuitPattern color={project.accentColor} />

                  {/* Scan lines */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(250,250,250,0.03) 2px, rgba(250,250,250,0.03) 4px)",
                    }}
                  />

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div
                        className="absolute -inset-4 rounded-full opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40"
                        style={{ background: project.accentColor }}
                      />
                      <div
                        className="relative rounded-2xl border p-5 backdrop-blur-sm transition-all duration-500 group-hover:scale-110"
                        style={{
                          borderColor: `${project.accentColor}30`,
                          background: "linear-gradient(135deg, rgba(10,10,10,0.9), rgba(10,10,10,0.7))",
                          boxShadow: `0 0 30px -10px ${project.accentColor}40`,
                        }}
                      >
                        <Icon size={32} strokeWidth={1.5} style={{ color: project.accentColor }} />
                      </div>
                    </div>
                  </div>

                  {/* Category badge — top left */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="rounded-md px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm"
                      style={{
                        color: project.accentColor,
                        background: `${project.accentColor}10`,
                        border: `1px solid ${project.accentColor}20`,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Highlight metric — top right */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 rounded-md border border-[var(--border-default)]/50 bg-[var(--bg-primary)]/70 px-2.5 py-1 backdrop-blur-sm">
                      <HighlightIcon size={12} style={{ color: project.accentColor }} />
                      <span
                        className="font-[family-name:var(--font-heading)] text-sm font-bold"
                        style={{ color: project.accentColor }}
                      >
                        {project.highlight.value}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {project.highlight.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent-primary)]">
                    {project.title}
                  </h2>
                  <p
                    className="mt-0.5 text-xs font-medium"
                    style={{ color: project.accentColor }}
                  >
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.description}
                  </p>

                  {/* Scope tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.scope.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[var(--border-default)]/40 bg-[var(--bg-primary)]/60 px-3 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Divider + tech stack */}
                  <div className="mt-4 border-t border-[var(--border-default)]/50 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-[var(--border-default)]/50 bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-lg rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8">
            <div className="mb-4 inline-flex rounded-xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 p-3">
              <Layers size={24} className="text-[var(--accent-primary)]" />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
              Sonraki Proje Sizinki Olsun
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Dijital hedeflerinizi birlikte gerçeğe dönüştürelim.
            </p>
            <Link
              href="/iletisim"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-8 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              Projenizi Konuşalım <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
