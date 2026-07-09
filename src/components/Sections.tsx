// =============================================================================
// components/Sections.tsx
// -----------------------------------------------------------------------------
// Landing page'in TÜM bölümlerinin (section) React bileşenlerini içerir.
// Her bölüm kendi başına export edilen bir fonksiyondur (Hero, Product, vb.)
// ve PageShell.tsx içinde sırayla alt alta render edilir.
//
// Genel çalışma mantığı:
//  - Her bileşen `useApp()` hook'u ile aktif dili (lang: "tr" | "en") alır.
//  - Metinler doğrudan burada yazılmaz; ../data/site.ts dosyasından import
//    edilen objelerden (copy, features, steps, faqs, vb.) `[lang]` ile okunur.
//  - Tekrarlayan görsel yapılar (kart, başlık, sayfa genişliği) küçük ortak
//    bileşenlere (Container, SectionTitle) çıkarılmıştır.
//  - FadeIn / PopHover (Motion.tsx'ten) sayfa kaydırıldıkça beliren/hareket
//    eden animasyon sarmalayıcılarıdır (framer-motion tabanlı).
// =============================================================================

import React from "react";
import { FadeIn, PopHover } from "./Motion"; // Scroll'da beliren fade + hover'da büyüyen animasyon sarmalayıcıları
import WaitlistForm from "./WaitlistForm";   // Waitlist bölümündeki e-posta formu
import HeroLogo from "./HeroLogo";           // Hero'nun en üstündeki logo görseli
import { useApp } from "./AppProvider";      // Aktif dili (tr/en) okumak için context hook'u

// Tüm metin ve veri içerikleri tek merkezden (data/site.ts) import ediliyor.
import {
  site,                          // email, sosyal medya linkleri, nav menüsü
  copy,                          // ana başlık/açıklama/buton metinleri
  features,                     // Product bölümü kartları
  steps,                         // HowItWorks bölümü adımları
  useCases,                      // UseCases bölümü kartları
  faqs,                          // FAQ bölümü soru/cevapları
  trust as trustByLang,          // Hero altındaki güven rozetleri
  stats as statsByLang,          // Hero altındaki istatistik kutucukları
  screenshots,                   // Screenshots (Ürün Kanıtı) bölümü kartları
  team,                          // TeamSection bölümü kartları
} from "../data/site";

// lucide-react ikon seti: sayfada kullanılan tüm ikonlar burada import ediliyor.
import {
  ArrowRight,   // Hero'daki "Demo Talep Et" butonunun ok ikonu
  Shield,       // (şu an kullanılmıyor, ileride güven rozeti için ayrılmış olabilir)
  Sparkles,     // Hero'daki üst rozetin yıldız ikonu
  Activity,     // (şu an kullanılmıyor)
  Instagram,    // İletişim/Footer bölümündeki Instagram ikonu
  Linkedin,     // İletişim/Footer bölümündeki LinkedIn ikonu
  Mail,         // Footer'daki e-posta ikonu
} from "lucide-react";

// -----------------------------------------------------------------------------
// Container: Tüm bölümlerde tekrar eden "ortala + max genişlik + yan boşluk"
// sarmalayıcısı. Sayfa genişliği ne olursa olsun içerik max-w-6xl (≈1152px)
// ile sınırlanır ve ortalanır.
// -----------------------------------------------------------------------------
type ContainerProps = { children: React.ReactNode };

// NE DEĞİŞİRSE NE OLUR?
//  - max-w-6xl (≈1152px) değerini artırırsan (örn. max-w-7xl) içerik daha
//    GENİŞ ekranlarda daha fazla yatay yer kaplar; azaltırsan (max-w-4xl)
//    içerik daha DAR ve ortalanmış görünür — bu değişiklik TÜM section'ları
//    aynı anda etkiler çünkü hepsi bu Container'ı kullanıyor.
function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-6xl px-4">{children}</div>;
}

// -----------------------------------------------------------------------------
// SectionTitle: Her bölümün başında tekrar eden "küçük üst etiket (eyebrow) +
// başlık (title) + açıklama (desc)" üçlüsünü tek yerden üreten yardımcı bileşen.
// Örn: "ÜRÜN" (eyebrow) / "Karmaşık sinyali, anlaşılır karara çevirin." (title)
// -----------------------------------------------------------------------------
type SectionTitleProps = {
  eyebrow: string;
  title: string;
  desc: string;
};

function SectionTitle({ eyebrow, title, desc }: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs tracking-wider uppercase text-white/70">{eyebrow}</p>
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-3 text-white/80 leading-relaxed">{desc}</p>
    </div>
  );
}

// =============================================================================
// Hero: Sayfanın en üstündeki ana karşılama bölümü.
// İçerik sırası: logo → küçük rozet (Sparkles ikonlu) → ana başlık (H1) →
// açıklama paragrafı → 2 buton (Demo Talep Et / Nasıl Çalışır) → güven
// rozetleri (trust) → istatistik kutucukları (stats).
// =============================================================================
export function Hero() {
  const { lang } = useApp();
  const t = copy[lang];                 // aktif dile göre metinler (tagline, description, cta'lar)
  const trustList = trustByLang[lang];  // aktif dile göre güven rozeti listesi
  const statsList = statsByLang[lang];  // aktif dile göre istatistik listesi

  return (
    <section className="relative pt-28 md:pt-32 pb-16 text-center">
      {/* Arka planda bulanık (blur) mor/mavi bir ışık hüzmesi efekti (dekoratif, tıklanamaz) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-[#6d28d9]/40 via-[#1d4ed8]/35 to-[#0ea5e9]/25 blur-3xl opacity-60" />
      </div>

      <Container>
        {/* Marka logosu */}
        <div className="flex justify-center mb-8">
          <HeroLogo />
        </div>

        {/* Üstteki küçük "pill" rozet: 3 kısa özelliği kısaca özetler */}
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-2 text-xs text-white/90">
          <Sparkles size={14} />
          {lang === "tr"
            ? "Erken uyarı • Gerçek zamanlı geri bildirim • Mobil deneyim"
            : "Early warning • Real-time feedback • Mobile experience"}
        </p>

        {/* Ana başlık (H1) — SEO ve görsel hiyerarşi açısından sayfanın en önemli metni */}
        <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-white max-w-3xl mx-auto">
          {t.tagline}
        </h1>

        {/* Kısa açıklama paragrafı */}
        <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          {t.description}
        </p>

        {/* Ana + ikincil çağrı butonları (CTA) */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          {/* PopHover: fareyle üzerine gelince hafif büyüyen, tıklayınca hafif küçülen animasyon */}
          <PopHover>
            <a
              href="#contact" // Sayfa içi kaydırma: ContactCTA bölümüne (id="contact") gider
              className="rounded-2xl px-6 py-3 bg-white text-[#0b0f2a] font-medium hover:opacity-90 transition inline-flex items-center justify-center gap-2"
            >
              {t.ctaPrimary} <ArrowRight size={18} />
            </a>
          </PopHover>

          <a
            href="#how" // HowItWorks bölümüne (id="how") gider
            className="rounded-2xl px-6 py-3 border border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
          >
            {t.ctaSecondary}
          </a>
        </div>

        {/* Trust + stats dil bağımsız bırakıldı (istersen TR/EN de yaparız) */}
        {/* Güven rozetleri: "AI destekli risk puanlaması" gibi kısa etiketler */}
          {trustList?.length ? (
            <div className="mt-10 flex flex-wrap justify-center gap-2 text-xs">
              {trustList.map((x: string) => (
                <span
                  key={x}
                  className="rounded-full border border-white/15 bg-white/10 backdrop-blur px-3 py-1 text-white/85"
                >
                  {x}
                </span>
              ))}
            </div>
          ) : null}

        {/* İstatistik kutucukları: kısa etiket (k) + değer/açıklama (v) çifti */}
        {statsList?.length ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {statsList.map((s: { k: string; v: string }) => (
              <div
                key={s.k}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4"
              >
                <div className="text-xs text-white/65">{s.k}</div>
                <div className="mt-1 font-semibold text-white">{s.v}</div>
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

// =============================================================================
// Product: "Ürün" bölümü — 6 adet özellik kartını (features) grid halinde
// gösterir. id="product" sayesinde Navbar/Hero'dan buraya kaydırılabilir.
// =============================================================================
export function Product() {
  const { lang } = useApp();

  return (
    <section id="product" className="py-16">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={lang === "tr" ? "Ürün" : "Product"}
            title={
              lang === "tr"
                ? "Karmaşık sinyali, anlaşılır karara çevirin."
                : "Turn complex signals into clear decisions."
            }
            desc={
              lang === "tr"
                ? "LumosMind; kullanıcı deneyimini öncelikleyen, giyilebilir sinyal verisini gerçek zamanlı analiz eden ve uyarı akışını güvenle yöneten bir platform yaklaşımıdır."
                : "LumosMind is a platform approach that prioritizes user experience, analyzes wearable signals in real time, and safely orchestrates alert workflows."
            }
          />
        </FadeIn>

        {/* features[lang] dizisi map'lenerek her özellik için bir kart üretilir.
            delay={i * 0.03}: kartlar sırayla, birbiri ardına hafif gecikmeyle belirir.
            NE DEĞİŞİRSE NE OLUR?
             - site.ts -> features dizisine eleman eklemek/çıkarmak burada
               HİÇBİR KOD DEĞİŞİKLİĞİ gerektirmez; grid otomatik uyum sağlar.
             - grid sütun sayısını (sm:grid-cols-2 lg:grid-cols-3) artırırsan
               kartlar daha DAR ve yan yana daha FAZLA görünür. */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features[lang].map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.03}>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition">
                <div className="font-semibold text-white">{f.title}</div>
                <p className="mt-2 text-white/80 leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

// =============================================================================
// HowItWorks: "Nasıl Çalışır" bölümü — 3 adımlık akışı (steps) numaralı
// kartlar halinde gösterir. id="how".
// =============================================================================
export function HowItWorks() {
  const { lang } = useApp();

  return (
    // id="how" -> Navbar/Hero'daki "#how" linklerinin hedefi BURASI.
    // NE DEĞİŞİRSE NE OLUR?
    //  - Bu id'yi değiştirirsen (örn. "how-it-works" yaparsan), site.ts'teki
    //    nav dizisindeki href="#how" değerini de AYNI ŞEKİLDE güncellemen
    //    gerekir; aksi halde o menü linki artık hiçbir yere kaydırmaz.
    <section id="how" className="py-16 border-t border-white/10 bg-black/10">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={lang === "tr" ? "Nasıl Çalışır" : "How it works"}
            title={lang === "tr" ? "3 adımda basit akış" : "A simple 3-step flow"}
            desc={
              lang === "tr"
                ? "Giyilebilir veri → akıllı analiz → kullanıcıya ve bakım ekibine doğru zamanda doğru mesaj."
                : "Wearable data → intelligent analysis → the right message to the user and caregivers at the right time."
            }
          />
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {steps[lang].map((s, idx) => (
            <FadeIn key={s.title} delay={idx * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition">
                {/* Adım numarası: 0 → "01", 1 → "02" ... (padStart ile iki haneli yapılır) */}
                <div className="text-xs text-white/65">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-semibold text-white">{s.title}</div>
                <p className="mt-2 text-white/80 leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

// =============================================================================
// UseCases: "Kullanım" bölümü — hedef kitlelere göre (kullanıcı, bakım veren,
// klinik ekip) fayda kartlarını gösterir. id="use".
// =============================================================================
export function UseCases() {
  const { lang } = useApp();

  return (
    <section id="use" className="py-16">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={lang === "tr" ? "Kullanım" : "Use cases"}
            title={
              lang === "tr" ? "Kimin için, ne sağlar?" : "Who is it for, and what does it enable?"
            }
            desc={
              lang === "tr"
                ? "LumosMind; kullanıcı, bakım veren ve klinik ekip tarafında daha iyi kararlar ve daha güvenli süreçler hedefler."
                : "LumosMind aims for better decisions and safer processes for users, caregivers, and clinical teams."
            }
          />
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {useCases[lang].map((u, i) => (
            <FadeIn key={u.title} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition">
                <div className="font-semibold text-white">{u.title}</div>
                <p className="mt-2 text-white/80 leading-relaxed">{u.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

// =============================================================================
// Screenshots: "Ürün Kanıtı" bölümü — henüz gerçek görsel/mockup olmadığı için
// her kartta boş bir "placeholder" kutu (h-28 border'lı div) gösterilir.
// İleride buraya gerçek ekran görüntüsü/<img> eklenebilir. id="proof".
// =============================================================================
export function Screenshots() {
  const { lang } = useApp();

  return (
    <section id="proof" className="py-16 border-t border-white/10 bg-black/10">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={lang === "tr" ? "Ürün Kanıtı" : "Product proof"}
            title={
              lang === "tr" ? "Üründen hızlı kanıtlar" : "Quick proof from the product"
            }
            desc={
              lang === "tr"
                ? "Pitch için: Ne inşa ediyoruz, kullanıcı ne görecek, akış nasıl işleyecek?"
                : "For pitching: What we’re building, what users will see, and how the flow works."
            }
          />
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {screenshots[lang].map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition">
                <div className="font-semibold text-white">{s.title}</div>
                <p className="mt-2 text-white/80 leading-relaxed">{s.desc}</p>
                {/* Gerçek görsel/mockup gelene kadar boş yer tutucu kutu */}
                <div className="mt-5 h-28 rounded-2xl border border-white/10 bg-white/5" />
                <div className="mt-2 text-xs text-white/65">
                  {lang === "tr" ? "Mockup yer tutucu" : "Mockup placeholder"}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

// =============================================================================
// TeamSection: "Ekip & Güven" bölümü — ekip/iş birliği kartlarını (team)
// gösterir. Kullanıcıya "bu ürünü kim/nasıl teslim edecek" güvenini verir.
// =============================================================================
export function TeamSection() {
  const { lang } = useApp();

  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={lang === "tr" ? "Ekip & Güven" : "Team & credibility"}
            title={
              lang === "tr"
                ? "Ürünü güvenle teslim edecek ekip yaklaşımı"
                : "A team approach you can trust to deliver"
            }
            desc={
              lang === "tr"
                ? "Health-tech’te hız kadar doğrulama ve güvenlik de kritik. Bu yüzden iteratif MVP + pilot odaklı ilerliyoruz."
                : "In health-tech, validation and safety matter as much as speed. We move with an iterative MVP + pilot-driven approach."
            }
          />
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {team[lang].map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition">
                <div className="font-semibold text-white">{m.name}</div>
                <div className="mt-1 text-sm text-white/70">{m.role}</div>
                <p className="mt-3 text-white/80 leading-relaxed">{m.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

// =============================================================================
// FAQ: "SSS" bölümü — soru/cevapları (faqs) native HTML <details>/<summary>
// elemanlarıyla açılır-kapanır (accordion) şekilde gösterir. JS gerekmeden
// tarayıcı tarafından yönetilir; "group-open:" Tailwind sınıfı <details>
// açıkken "+" ikonunu 45° döndürüp "×" görünümü verir. id="faq".
// =============================================================================
export function FAQ() {
  const { lang } = useApp();

  return (
    <section id="faq" className="py-16 border-t border-white/10 bg-black/10">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={lang === "tr" ? "SSS" : "FAQ"}
            title={lang === "tr" ? "En sık sorulanlar" : "Frequently asked questions"}
            desc={
              lang === "tr"
                ? "Ürünü netleştirmek için kısa cevaplar."
                : "Short answers to clarify the product."
            }
          />
        </FadeIn>

        {/* NE DEĞİŞİRSE NE OLUR?
             - <details> yerine <div onClick={...}> + useState kullanırsan
               animasyonlu açılış/kapanış (framer-motion ile height animasyonu)
               ekleyebilirsin, ama JS state yönetimi gerekir (native <details>
               bunu tarayıcıya bırakıyor, daha basit ama daha az kontrol
               sağlıyor). */}
        <div className="mt-10 grid gap-3">
          {faqs[lang].map((f, i) => (
            <FadeIn key={f.q} delay={i * 0.03}>
              <details className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition">
                <summary className="cursor-pointer list-none font-semibold flex items-center justify-between text-white">
                  {f.q}
                  <span className="text-white/60 group-open:rotate-45 transition">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-white/80 leading-relaxed">{f.a}</p>
              </details>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

// =============================================================================
// Waitlist: "Bekleme listesi" bölümü — e-posta toplayan WaitlistForm
// bileşenini bir kart içine yerleştirir. id="waitlist".
// (WaitlistForm.tsx: formu submit edince mailto: linki ile e-posta istemcisini açar.)
// =============================================================================
export function Waitlist() {
  const { lang } = useApp();

  return (
    <section
      id="waitlist"
      className="py-16 border-t border-white/10 bg-black/10"
    >
      <Container>
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 md:p-10">
          <FadeIn y={10}>
            <div className="max-w-2xl">
              <p className="text-xs tracking-wider uppercase text-white/70">
                {lang === "tr" ? "Waitlist" : "Waitlist"}
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {lang === "tr"
                  ? "Pilot / demo için listeye katıl"
                  : "Join the waitlist for pilot / demo"}
              </h3>
              <p className="mt-3 text-white/80 leading-relaxed">
                {lang === "tr"
                  ? "Kapsamı netleştirip (sensör, MVP, bildirim akışı) kısa bir demo planı çıkaralım."
                  : "Let’s align on scope (sensors, MVP, alert flow) and create a short demo plan."}
              </p>
              <WaitlistForm />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

// =============================================================================
// ContactCTA: SİTENİN ASIL "İLETİŞİM" BÖLÜMÜ (id="contact").
// Navbar, Hero ve mobil menüdeki "Demo Talep Et" linkleri buraya kaydırır.
// İçerik:
//   1) Başlık + açıklama (sol taraf)
//   2) İki buton: "E-posta Gönder" (mailto: linki, konu otomatik dolu) ve
//      "Özelliklere Dön" (#product'a geri kaydırır)
//   3) Alt satırda: e-posta adresi (metin) + Instagram/LinkedIn linkleri
//      (ikon + isim şeklinde, yeni sekmede açılır: target="_blank")
// =============================================================================
export function ContactCTA() {
  const { lang } = useApp();
  const t = copy[lang];

  return (
    <section id="contact" className="py-16">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur text-white p-8 md:p-10">
          <FadeIn y={10}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                  {lang === "tr"
                    ? "LumosMind ile iletişime geçmek ister misin?"
                    : "Want to get in touch with LumosMind?"}
                </h3>
                <p className="mt-3 text-white/80 leading-relaxed">
                  {lang === "tr"
                    ? "Yan taraftaki butona tıklayarak bize e-posta yoluyla ulaşabilir, sosyal medya hesaplarımızdan bizi daha yakından tanıyabilirsiniz."
                    : "You can reach us via email by clicking the button on the side, and get to know us better through our social media accounts."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* mailto: linki — tıklanınca kullanıcının varsayılan e-posta
                    uygulaması açılır.*/}
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-2xl px-5 py-3 bg-white text-[#0b0f2a] text-center font-medium hover:opacity-90 transition"
                >
                  {lang === "tr" ? "E-posta Gönder" : "Send email"}
                </a>
                <a
                  href="#product" // Product bölümüne geri kaydırır
                  className="rounded-2xl px-5 py-3 border border-white/20 text-center bg-white/10 text-white hover:bg-white/20 transition"
                >
                  {lang === "tr" ? "Özelliklere Dön" : "Back to features"}
                </a>
              </div>
            </div>

            {/* İletişim satırı: e-posta adresi + sosyal medya linkleri.
                sm ve üzeri ekranlarda yan yana (flex-row), mobilde alt alta (flex-col). */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-white/70">
              <div>
                {lang === "tr" ? "Sosyal Medya Hesaplarımız" : "Social Media Accounts"}:{" "}
              </div>

              <div className="flex items-center gap-3">
                {/* target="_blank" + rel="noopener noreferrer": linki yeni sekmede
                    açar; "noopener noreferrer" güvenlik amaçlı (yeni sekmenin bu
                    sayfaya erişimini engeller). URL'ler data/site.ts -> site.social'dan gelir.
                    NE DEĞİŞİRSE NE OLUR?
                     - site.ts -> site.social.instagram/linkedin değerini
                       değiştirmek BURADAKİ linki de OTOMATİK günceller
                       (Footer'daki ikon linkleriyle birlikte, çünkü ikisi de
                       aynı site.social objesini okuyor).
                     - target="_blank" satırını silersen link YENİ SEKME yerine
                       AYNI sekmede açılır (kullanıcı "geri" tuşuyla döner). */}
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition"
                >
                  <Instagram size={24} />
                  Instagram
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition"
                >
                  <Linkedin size={24} />
                  LinkedIn
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

// =============================================================================
// Footer: Sayfanın en altındaki kapanış şeridi.
// Sol: marka adı + telif hakkı notu (copy[lang].footerNote)
// Sağ: yuvarlak ikon butonlar — e-posta (mailto:), Instagram, LinkedIn.
// Tasarım dili sitenin geri kalanıyla aynı: border-white/15, bg-white/10,
// backdrop-blur, hover'da bg-white/20'ye geçiş.
// =============================================================================
export function Footer() {
  const { lang } = useApp();
  const t = copy[lang];

  return (
    <footer className="border-t border-white/10 py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Sol taraf: marka adı + footer notu (telif hakkı) */}
          <div>
            <div className="font-semibold text-white">{t.name}</div>
            <div className="mt-1 text-sm text-white/60">{t.footerNote}</div>
          </div>

          {/* Sağ taraf: e-posta + sosyal medya ikon butonları.
              Her biri 40x40px (h-10 w-10) yuvarlak buton; aria-label ekran
              okuyucular (erişilebilirlik) için ikonun ne anlama geldiğini belirtir. */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              aria-label="E-posta"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur text-white/80 hover:bg-white/20 hover:text-white transition"
            >
              <Mail size={18} />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur text-white/80 hover:bg-white/20 hover:text-white transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur text-white/80 hover:bg-white/20 hover:text-white transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
