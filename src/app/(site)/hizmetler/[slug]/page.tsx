import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import { ServiceDetailContent } from "@/components/ServiceDetailContent";

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
  const serviceIndex = SERVICES.findIndex((s) => s.slug === slug);
  if (serviceIndex === -1) notFound();

  const details = SERVICE_DETAILS[slug];

  return (
    <ServiceDetailContent
      slug={slug}
      serviceIndex={serviceIndex}
      features={details?.features ?? []}
      process={details?.process ?? []}
    />
  );
}
