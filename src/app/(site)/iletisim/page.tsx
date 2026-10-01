"use client";

import { useState } from "react";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export default function IletisimPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
            İletişim
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            Bize Ulaşın
          </h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Projeniz hakkında konuşmak veya teklif almak için formu doldurun.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="space-y-8 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-[var(--accent-primary)]/10 p-3">
                <Mail size={20} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  E-posta
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
                  Hızlı İletişim
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Formu doldurun, aynı gün dönüş yapalım
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-[var(--accent-primary)]/10 p-3">
                <MapPin size={20} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  Adres
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  İstanbul, Türkiye
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8 lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-[var(--success)]/10 p-4">
                  <Send size={32} className="text-[var(--success)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  Mesajınız Gönderildi
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      E-posta
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                    Hizmet
                  </label>
                  <select className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <option value="">Hizmet seçin</option>
                    <option>Siber Güvenlik</option>
                    <option>Otomasyon Çözümleri</option>
                    <option>SaaS Ürün Geliştirme</option>
                    <option>Özel Yazılım Geliştirme</option>
                    <option>E-Ticaret Çözümleri</option>
                    <option>Mobil Uygulama Geliştirme</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                    Mesaj
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                    placeholder="Projeniz hakkında kısaca bilgi verin..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
                >
                  Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
