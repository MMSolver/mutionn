"use client";

import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/useTranslation";

const SERVICE_SLUGS = [
  "dijital-reklam",
  "e-ticaret",
  "yazilim",
  "otomasyon",
  "mobil-uygulama",
] as const;

const COMPANY_HREFS = [
  { key: "hakkimizda" as const, href: "/hakkimizda" },
  { key: "projeler" as const, href: "/projeler" },
  { key: "referanslar" as const, href: "/referanslar" },
  { key: "ortaklik" as const, href: "/ortaklik" },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                {SITE_NAME}
                <span className="text-[var(--accent-primary)]">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.footer.desc}
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {t.footer.servicesTitle}
            </h3>
            <ul className="space-y-3">
              {SERVICE_SLUGS.map((slug, i) => (
                <li key={slug}>
                  <Link
                    href={`/hizmetler/${slug}`}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {t.services.items[i].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {t.footer.companyTitle}
            </h3>
            <ul className="space-y-3">
              {COMPANY_HREFS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li>info@mution.com.tr</li>
              <li>{t.contact.info.locationVal}</li>
            </ul>
            <Link
              href="/iletisim"
              className="mt-6 inline-flex rounded-lg border border-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-[var(--accent-primary)] transition-colors hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)]"
            >
              {t.footer.contactBtn}
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-default)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} {SITE_NAME}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link
              href="/iletisim"
              className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            >
              {t.nav.iletisim}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
