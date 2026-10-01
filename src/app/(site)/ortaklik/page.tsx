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
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const BENEFITS = [
  {
    icon: BadgePercent,
    title: "Proje Bazlı Komisyon",
    description:
      "Yönlendirdiğiniz her proje için cazip bir komisyon kazanın. Proje büyüklüğüne göre kazancınız artar.",
  },
  {
    icon: TrendingUp,
    title: "Sürekli Kazanç",
    description:
      "Getirdiğiniz müşteri devam eden hizmet aldığında siz de kazanmaya devam edersiniz.",
  },
  {
    icon: Users,
    title: "Sıfır Risk",
    description:
      "Herhangi bir yatırım veya bağlayıcılık yok. Sadece müşteri yönlendirin, gerisini biz halledelim.",
  },
  {
    icon: Handshake,
    title: "Şeffaf Süreç",
    description:
      "Her aşamada bilgilendirilirsiniz. Proje durumu, ödeme zamanlaması — her şey açık ve net.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Başvurun",
    description: "Aşağıdaki formu doldurun, sizinle iletişime geçelim.",
  },
  {
    step: "02",
    title: "Müşteri Yönlendirin",
    description:
      "Çevrenizdeki dijital çözüm ihtiyacı olan işletmeleri bize yönlendirin.",
  },
  {
    step: "03",
    title: "Biz Çalışalım",
    description:
      "Müşteriyle görüşme, teklif ve proje sürecini biz yürütüyoruz.",
  },
  {
    step: "04",
    title: "Kazancınızı Alın",
    description: "Proje tamamlandığında komisyonunuz hesabınıza aktarılır.",
  },
];

const WHO = [
  "Freelancer yazılımcılar ve tasarımcılar",
  "Dijital pazarlama ajansları",
  "İş danışmanları ve muhasebeciler",
  "Sektörel satış temsilcileri",
  "Geniş iş ağına sahip profesyoneller",
  "Sosyal çevresi geniş, işletme sahipleriyle bağlantılı kişiler",
];

export default function OrtaklikPage() {
  const [submitted, setSubmitted] = useState(false);

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
              Birlikte Büyüyelim
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
              Çevrenizdeki işletmeleri Mution&apos;a yönlendirin, her başarılı
              projeden kazanç elde edin. Teknik bilgi gerekmez — siz tanıştırın,
              gerisini biz halledelim.
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits */}
        <ScrollReveal delay={0.1}>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
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
                    {b.description}
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
                Nasıl Çalışır?
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                4 Adımda İş Ortaklığı
              </h2>
            </div>

            <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
              {STEPS.map((s, i) => (
                <div key={s.step} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-primary)] font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--bg-primary)]">
                    {s.step}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {s.description}
                  </p>
                  {i < STEPS.length - 1 && (
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
                  Kimler Başvurabilir?
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                  İş Ağınızı Gelire Dönüştürün
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Teknik bilgi gerekmez. İster bir sektör profesyoneli olun,
                  ister geniş bir sosyal çevreniz olsun — tanıdığınız
                  işletmelerin dijital ihtiyaçlarını fark edebiliyorsanız, bu
                  program tam size göre.
                </p>
              </div>
              <ul className="space-y-3">
                {WHO.map((w) => (
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
                  Başvuru
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                  İş Ortağımız Olun
                </h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  Formu doldurun, detayları birlikte konuşalım.
                </p>
              </div>

              {submitted ? (
                <div className="mt-10 rounded-2xl border border-[var(--accent-primary)]/30 bg-[var(--bg-secondary)] p-10 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-primary)]/10">
                    <CheckCircle2 className="h-7 w-7 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    Başvurunuz Alındı
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    En kısa sürede sizinle iletişime geçeceğiz. Teşekkürler!
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
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                        E-posta
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
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      Mesleğiniz / Alanınız
                    </label>
                    <select
                      required
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                    >
                      <option value="">Seçiniz</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="ajans">Dijital Ajans</option>
                      <option value="danışman">İş Danışmanı</option>
                      <option value="satis">Satış Temsilcisi</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      Kısa Not{" "}
                      <span className="text-[var(--text-muted)]">
                        (opsiyonel)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                      placeholder="Kendinizden ve iş ağınızdan kısaca bahsedin..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-base font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
                  >
                    <Send className="h-4 w-4" />
                    Başvuruyu Gönder
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
