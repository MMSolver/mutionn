import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const SERVICE_DETAILS: Record<
  string,
  { features: string[]; process: string[] }
> = {
  "siber-guvenlik": {
    features: [
      "Sistemlerinizdeki güvenlik açıklarını tespit ve raporlama",
      "Sürekli tehdit izleme ve anlık uyarı sistemi",
      "Çalışan cihazları ve uç noktalarını koruma altına alma",
      "Güvenlik operasyon merkezi ile kesintisiz izleme",
      "Güvenlik politikası oluşturma ve dokümantasyon desteği",
      "Saldırı anında hızlı müdahale ve hasar kontrolü",
    ],
    process: [
      "Mevcut altyapınızı analiz ediyor, zayıf noktaları belirliyoruz",
      "Riskleri önceliklendirip size özel bir güvenlik planı çıkarıyoruz",
      "Koruma sistemlerini kuruyor ve yapılandırıyoruz",
      "Tüm sistemi devreye alıp ekibinizi bilgilendiriyoruz",
      "Düzenli izleme ile sürekli güvende kalmanızı sağlıyoruz",
    ],
  },
  otomasyon: {
    features: [
      "Tekrarlayan manuel işlerinizi otomatik hale getirme",
      "Farklı yazılımlarınız arasında veri aktarımı sağlama",
      "Belirli koşullara göre otomatik tetiklenen iş akışları",
      "Departmanlar arası veri tutarlılığını sağlama",
      "Otomatik rapor oluşturma ve ilgili kişilere iletme",
      "Mevcut sistemlerinize sorunsuz entegrasyon",
    ],
    process: [
      "Mevcut iş süreçlerinizi analiz ediyor, darboğazları tespit ediyoruz",
      "Hangi süreçlerin otomatikleştirileceğini birlikte belirliyoruz",
      "Otomasyon altyapısını kuruyor ve yapılandırıyoruz",
      "Test sürecinde her senaryoyu doğrulayıp optimize ediyoruz",
      "Kullanım kılavuzunu hazırlıyor ve sistemi canlıya alıyoruz",
    ],
  },
  saas: {
    features: [
      "Fikrinize özel bulut tabanlı yazılım geliştirme",
      "Her müşterinizin kendi alanında çalışacağı güvenli yapı",
      "Kullanıcı sayınız arttıkça otomatik ölçeklenen altyapı",
      "Abonelik yönetimi ve otomatik faturalandırma",
      "Kullanıcı davranışlarını takip eden analitik panel",
      "Güvenli giriş, yetkilendirme ve kullanıcı yönetimi",
    ],
    process: [
      "Ürün fikrinizi analiz edip hedef kitlenizi tanımlıyoruz",
      "Ölçeklenebilir bir teknik mimari tasarlıyoruz",
      "Çalışan bir ilk sürümü hızla geliştirip teslim ediyoruz",
      "Gerçek kullanıcı geri bildirimleriyle ürünü iyileştiriyoruz",
      "Ürününüzü yayına alıyor ve performansını takip ediyoruz",
    ],
  },
  yazilim: {
    features: [
      "İşletmenize özel web tabanlı uygulamalar",
      "Verilerinizi görselleştiren yönetim panelleri",
      "Sistemlerinizin birbiriyle konuşmasını sağlayan altyapı",
      "Büyük veri hacimlerinde bile hızlı çalışan veritabanları",
      "Hız ve performans odaklı optimizasyon",
      "Yayın sonrası teknik destek ve güncelleme hizmeti",
    ],
    process: [
      "İhtiyaçlarınızı dinliyor, projenin kapsamını birlikte belirliyoruz",
      "Kullanıcı deneyimi odaklı arayüz tasarımı yapıyoruz",
      "Kısa döngülerle geliştiriyor, her adımda size gösteriyoruz",
      "Kapsamlı test süreciyle hatasız bir ürün teslim ediyoruz",
      "Yayına alıyor ve sürekli destek sağlıyoruz",
    ],
  },
  "e-ticaret": {
    features: [
      "Markanıza özel online mağaza tasarımı ve kurulumu",
      "Kredi kartı, havale ve kapıda ödeme entegrasyonu",
      "Otomatik stok takibi ve kargo firması entegrasyonu",
      "Arama motorlarında üst sıralarda yer almanızı sağlayan optimizasyon",
      "Mobil uyumlu, her cihazda kusursuz alışveriş deneyimi",
      "Satış verilerinizi takip edeceğiniz analitik panel",
    ],
    process: [
      "Satış modelinizi ve hedef kitlenizi analiz ediyoruz",
      "İhtiyaçlarınıza en uygun altyapıyı belirliyoruz",
      "Mağazanızı tasarlayıp geliştiriyoruz",
      "Ödeme ve kargo sistemlerini entegre ediyoruz",
      "Mağazanızı yayına alıyor, ilk satışlarınızda yanınızda oluyoruz",
    ],
  },
  "mobil-uygulama": {
    features: [
      "Tek seferde hem iPhone hem Android için uygulama geliştirme",
      "Hızlı, akıcı ve göze hoş gelen kullanıcı arayüzü",
      "Kullanıcılarınıza anlık bildirim gönderme altyapısı",
      "İnternet olmadan da çalışabilen uygulama yapısı",
      "App Store ve Google Play'de yayınlama süreci yönetimi",
      "Yayın sonrası güncelleme ve teknik destek",
    ],
    process: [
      "Uygulama fikrinizi şekillendiriyor, ekranları tasarlıyoruz",
      "Kullanıcı dostu arayüz tasarımını oluşturuyoruz",
      "Uygulamayı geliştiriyor, her aşamada test ediyoruz",
      "Sınırlı kullanıcı grubuyla deneme sürümü yayınlıyoruz",
      "Mağaza onay sürecini yönetiyor ve uygulamayı yayına alıyoruz",
    ],
  },
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const service = SERVICES.find((s) => s.slug === slug);
    return {
      title: service?.title ?? "Hizmet",
      description: service?.description,
    };
  });
}

export default async function HizmetDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const details = SERVICE_DETAILS[slug];

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link
          href="/hizmetler"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft size={16} />
          Tüm Hizmetler
        </Link>

        <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
          Hizmet Detayı
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {service.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          {service.description}
        </p>

        {details && (
          <>
            {/* Features */}
            <div className="mt-16">
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                Ne Sunuyoruz
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {details.features.map((feature) => (
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

            {/* Process */}
            <div className="mt-16">
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                Çalışma Sürecimiz
              </h2>
              <div className="space-y-4">
                {details.process.map((step, i) => (
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

        {/* CTA */}
        <div className="mt-20 rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
            Size Nasıl Yardımcı Olabiliriz?
          </h3>
          <p className="mt-2 text-[var(--text-secondary)]">
            İhtiyacınızı dinleyelim ve size en uygun çözümü birlikte belirleyelim. İlk görüşme ücretsiz.
          </p>
          <Link
            href="/iletisim"
            className="mt-6 inline-flex rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            İletişime Geçin
          </Link>
        </div>
      </div>
    </section>
  );
}
