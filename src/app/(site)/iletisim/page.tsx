"use client";

import { useState } from "react";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/lib/useTranslation";

export default function IletisimPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
              {t.contact.title}
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              {t.contact.desc}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <ScrollReveal direction="left" delay={0.1} className="space-y-8 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-[var(--accent-primary)]/10 p-3">
                <Mail size={20} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {t.contact.info.email}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  info@mution.com.tr
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-[var(--accent-primary)]/10 p-3">
                <MessageSquare size={20} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {t.contact.info.quick}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t.contact.info.quickDesc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-[var(--accent-primary)]/10 p-3">
                <MapPin size={20} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {t.contact.info.address}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t.contact.info.locationVal}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-3">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-[var(--success)]/10 p-4">
                  <Send size={32} className="text-[var(--success)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  {t.contact.form.success}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {t.contact.form.successDesc}
                </p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: formData.get("name"),
                        email: formData.get("email"),
                        service: formData.get("service"),
                        message: formData.get("message"),
                      }),
                    });
                    if (res.ok) setSubmitted(true);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                      placeholder={t.contact.form.name}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                    {t.contact.form.service}
                  </label>
                  <select name="service" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <option value="">{t.contact.form.selectService}</option>
                    {t.services.items.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-50"
                >
                  {loading ? "Gönderiliyor..." : t.contact.form.submit}
                </button>
              </form>
            )}
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
