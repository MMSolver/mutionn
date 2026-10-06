"use client";

import Link from "next/link";
import {
  Shield,
  Cog,
  Cloud,
  Code,
  ShoppingCart,
  Smartphone,
  Target,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/lib/useTranslation";

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  Cog,
  Cloud,
  Code,
  ShoppingCart,
  Smartphone,
  Target,
};

export default function HizmetlerPage() {
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
              {t.services.title}
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              {t.services.desc}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            const isWide = i === 0 || i === 3;
            return (
              <ScrollReveal
                key={service.slug}
                delay={0.08 * i}
                className={isWide ? "sm:col-span-2 lg:col-span-7" : "lg:col-span-5"}
              >
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="scan-hover group flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8 transition-all duration-300 hover:border-[var(--accent-primary)]/40 hover:shadow-[0_0_30px_-10px_var(--accent-primary)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="mb-5 inline-flex rounded-lg bg-[var(--accent-primary)]/10 p-3">
                      {Icon && (
                        <Icon
                          size={28}
                          className="text-[var(--accent-primary)]"
                        />
                      )}
                    </div>
                    <ArrowRight size={16} className="text-[var(--text-muted)] transition-all group-hover:translate-x-1 group-hover:text-[var(--accent-primary)]" />
                  </div>
                  <h2 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">
                    {t.services.items[i].title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {t.services.items[i].desc}
                  </p>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
