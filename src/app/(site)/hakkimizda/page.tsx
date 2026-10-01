"use client";

import dynamic from "next/dynamic";
import { Target, Eye, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const Globe = dynamic(
  () => import("@/components/three/Globe").then((m) => m.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent-primary)] border-t-transparent" />
      </div>
    ),
  }
);

const VALUES = [
  {
    icon: Target,
    title: "Misyonumuz",
    description:
      "İşletmelerin dijital altyapılarını güçlendirerek, güvenli ve verimli bir şekilde büyümelerini sağlamak.",
  },
  {
    icon: Eye,
    title: "Vizyonumuz",
    description:
      "Türkiye'nin en güvenilir dijital dönüşüm ortağı olarak, her ölçekteki işletmenin teknolojiye erişimini kolaylaştırmak.",
  },
  {
    icon: Users,
    title: "Değerlerimiz",
    description:
      "Şeffaflık, güvenilirlik ve sürekli gelişim. Müşterilerimizin başarısı, bizim başarımızdır.",
  },
];

export default function HakkimizdaPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
              Biz Kimiz
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
              Hakkımızda
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Siber güvenlik, otomasyon ve yazılım alanındaki uzmanlığımızla
              dijital dönüşümünüzü gerçekleştiriyoruz.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {VALUES.map((value, i) => (
            <ScrollReveal key={value.title} delay={0.15 * i}>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8">
                <div className="mb-4 inline-flex rounded-lg bg-[var(--accent-primary)]/10 p-3">
                  <value.icon
                    size={24}
                    className="text-[var(--accent-primary)]"
                  />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-24 flex flex-col items-center gap-12 lg:flex-row">
            <div className="flex-1">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--text-primary)]">
                Global Perspektif,{" "}
                <span className="text-[var(--accent-primary)]">
                  Yerel Uzmanlık
                </span>
              </h2>
              <p className="mt-4 text-[var(--text-secondary)]">
                Uluslararası standartlarda hizmet sunarken, yerel iş
                ihtiyaçlarını derinlemesine anlıyoruz. Dünya çapında kullanılan
                teknolojileri, Türk iş kültürüne uygun çözümlere dönüştürüyoruz.
              </p>
            </div>
            <div className="w-full max-w-md flex-1">
              <Globe className="h-[400px] w-full" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
