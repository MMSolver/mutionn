"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/lib/useTranslation";

export default function FiyatlandirmaPage() {
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
              {t.pricing.badge}
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
              {t.pricing.title}
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              {t.pricing.desc}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.pricing.plans.map((plan, i) => {
            const isPopular = i === 1;
            return (
              <ScrollReveal key={plan.name} delay={0.15 * i}>
                <div
                  className={`relative flex h-full flex-col rounded-xl border p-8 ${
                    isPopular
                      ? "border-[var(--accent-primary)] shadow-[0_0_40px_-15px_var(--accent-primary)]"
                      : "border-[var(--border-default)]"
                  } bg-[var(--bg-secondary)]`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent-primary)] px-4 py-1 text-xs font-semibold text-[var(--bg-primary)]">
                      {t.pricing.popular}
                    </span>
                  )}

                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {plan.desc}
                  </p>

                  <p className="mt-6 font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--accent-primary)]">
                    {plan.price}
                  </p>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[var(--accent-primary)]"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/iletisim"
                    className={`mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                      isPopular
                        ? "bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)]"
                        : "border border-[var(--border-hover)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                    }`}
                  >
                    {t.pricing.cta}
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
