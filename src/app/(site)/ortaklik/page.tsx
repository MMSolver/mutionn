"use client";

import { useState } from "react";
import {
  Handshake,
  Users,
  TrendingUp,
  BadgePercent,
  CheckCircle2,
  ArrowRight,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/lib/useTranslation";

const BENEFIT_ICONS: LucideIcon[] = [BadgePercent, TrendingUp, Users, Handshake];

export default function OrtaklikPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[var(--bg-primary)] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-primary)]/10">
              <Handshake className="h-8 w-8 text-[var(--accent-primary)]" />
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
              {t.partnership.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
              {t.partnership.desc}
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits */}
        <ScrollReveal delay={0.1}>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.partnership.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <div
                  key={b.title}
                  className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 transition-colors hover:border-[var(--accent-primary)]/30"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10">
                    <Icon className="h-5 w-5 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* How it works */}
        <ScrollReveal delay={0.1}>
          <div className="mt-24">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
                {t.partnership.howTitle}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                {t.partnership.howSubtitle}
              </h2>
            </div>

            <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
              {t.partnership.steps.map((s, i) => (
                <div key={s.title} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-primary)] font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--bg-primary)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {s.desc}
                  </p>
                  {i < t.partnership.steps.length - 1 && (
                    <ArrowRight className="absolute right-0 top-5 hidden h-5 w-5 -translate-x-1/2 text-[var(--text-muted)] md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Who is it for */}
        <ScrollReveal delay={0.1}>
          <div className="mt-24 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8 md:p-12">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
                  {t.partnership.whoTitle}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                  {t.partnership.whoSubtitle}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t.partnership.whoDesc}
                </p>
              </div>
              <ul className="space-y-3">
                {t.partnership.who.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-primary)]" />
                    <span className="text-sm text-[var(--text-primary)]">
                      {w}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Application form */}
        <ScrollReveal delay={0.1}>
          <div className="mt-24" id="basvuru">
            <div className="mx-auto max-w-2xl">
              <div className="text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
                  {t.partnership.formTitle}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                  {t.partnership.formSubtitle}
                </h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  {t.partnership.formDesc}
                </p>
              </div>

              {submitted ? (
                <div className="mt-10 rounded-2xl border border-[var(--accent-primary)]/30 bg-[var(--bg-secondary)] p-10 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-primary)]/10">
                    <CheckCircle2 className="h-7 w-7 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {t.partnership.successTitle}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    {t.partnership.successDesc}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-10 space-y-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                        {t.partnership.formFields.name}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                        placeholder={t.partnership.formFields.name}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                        {t.partnership.formFields.email}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      {t.partnership.formFields.phone}
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      {t.partnership.formFields.field}
                    </label>
                    <select
                      required
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                    >
                      <option value="">{t.partnership.formFields.selectField}</option>
                      <option value="freelancer">{t.partnership.formFields.freelancer}</option>
                      <option value="ajans">{t.partnership.formFields.agency}</option>
                      <option value="danışman">{t.partnership.formFields.consultant}</option>
                      <option value="satis">{t.partnership.formFields.sales}</option>
                      <option value="diger">{t.partnership.formFields.other}</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      {t.partnership.formFields.note}{" "}
                      <span className="text-[var(--text-muted)]">
                        {t.partnership.formFields.noteOptional}
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                      placeholder={t.partnership.formFields.notePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-base font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
                  >
                    <Send className="h-4 w-4" />
                    {t.partnership.formFields.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
