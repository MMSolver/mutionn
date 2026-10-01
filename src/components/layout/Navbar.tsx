"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-default)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {SITE_NAME}
            <span className="text-[var(--accent-primary)]">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                pathname === item.href
                  ? "text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/iletisim"
            className="hidden rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)] lg:inline-flex"
          >
            İletişim
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] lg:hidden"
            aria-label="Menüyü aç"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-b border-[var(--border-default)] bg-[var(--bg-primary)]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-6 pb-6 pt-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    pathname === item.href
                      ? "bg-[var(--bg-secondary)] text-[var(--accent-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/iletisim"
                className="mt-4 block rounded-lg bg-[var(--accent-primary)] px-4 py-3 text-center text-base font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                İletişim
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
