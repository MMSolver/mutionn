"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

interface ServiceDetailContentProps {
  slug: string;
  serviceIndex: number;
  features: string[];
  process: string[];
}

export function ServiceDetailContent({
  slug,
  serviceIndex,
  features,
  process,
}: ServiceDetailContentProps) {
  const { t } = useTranslation();
  const service = t.services.items[serviceIndex];

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link
          href="/hizmetler"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft size={16} />
          {t.serviceDetail.back}
        </Link>

        <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
          {t.serviceDetail.badge}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {service.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          {service.desc}
        </p>

        {features.length > 0 && (
          <>
            <div className="mt-16">
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                {t.serviceDetail.features}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4"
                  >
                    <CheckCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-[var(--accent-primary)]"
                    />
                    <span className="text-sm text-[var(--text-secondary)]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                {t.serviceDetail.process}
              </h2>
              <div className="space-y-4">
                {process.map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-primary)] text-sm font-bold text-[var(--bg-primary)]">
                      {i + 1}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-20 rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
            {t.serviceDetail.ctaTitle}
          </h3>
          <p className="mt-2 text-[var(--text-secondary)]">
            {t.serviceDetail.ctaDesc}
          </p>
          <Link
            href="/iletisim"
            className="mt-6 inline-flex rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            {t.serviceDetail.ctaButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
