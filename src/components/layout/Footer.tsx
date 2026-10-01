import Link from "next/link";
import { SITE_NAME, NAV_ITEMS, SERVICES } from "@/lib/constants";

const COMPANY_LINKS = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Projeler", href: "/projeler" },
  { label: "Fiyatlandırma", href: "/fiyatlandirma" },
] as const;

export function Footer() {
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
              Dijital dönüşümün güvenli adresi. Siber güvenlik, otomasyon ve
              yazılım çözümleriyle işinizi koruyun ve büyütün.
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Hizmetler
            </h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Şirket
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              İletişim
            </h3>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li>info@mution.com.tr</li>
              <li>İstanbul, Türkiye</li>
            </ul>
            <Link
              href="/iletisim"
              className="mt-6 inline-flex rounded-lg border border-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-[var(--accent-primary)] transition-colors hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)]"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-default)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Tüm hakları
            saklıdır.
          </p>
          <div className="flex gap-6">
            <Link
              href="/iletisim"
              className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
