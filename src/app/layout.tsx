// =============================================================================
// app/layout.tsx
// -----------------------------------------------------------------------------
// Next.js'in "Root Layout" dosyası. Sitedeki HER sayfa (şu an sadece
// page.tsx var, ama ileride /hakkimizda gibi başka sayfalar eklenirse
// onlar da) bu dosyanın içindeki <html>/<body> yapısını sarmalayıcı olarak
// kullanır. Yani burada tanımlanan <body> class'ları TÜM sayfalarda geçerlidir.
// =============================================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Google Fonts'tan "Inter" fontunu Next.js'in optimize ettiği şekilde yükler
import "./globals.css";                    // Global CSS (Tailwind + temel stiller) her sayfaya uygulanır

// Inter fontunu "latin" karakter setiyle yükler. `inter` değişkeni şu an
// hiçbir yerde kullanılmıyor (className'e eklenmemiş), yani ekranda görünen
// font aslında bu değil, globals.css'teki Arial/Helvetica'dır.
// NE DEĞİŞİRSE NE OLUR?
//  - Bu fontu gerçekten kullanmak istersen, aşağıdaki <body> class'ına
//    `${inter.className}` eklemen gerekir; o zaman sitedeki yazı tipi
//    Inter'e döner.
const inter = Inter({ subsets: ["latin"] });

// metadata: Next.js'in <head> etiketine otomatik yerleştirdiği SEO/paylaşım
// bilgileri. Google arama sonuçlarında ve WhatsApp/Twitter/LinkedIn gibi
// platformlarda paylaşılan link önizlemesinde (Open Graph) bu bilgiler kullanılır.
// NE DEĞİŞİRSE NE OLUR?
//  - title: Tarayıcı sekmesinde ve Google sonuçlarında görünen başlık değişir.
//  - description: Google arama sonucundaki kısa açıklama ve link önizlemesindeki
//    açıklama metni değişir.
//  - openGraph.title / description: Sosyal medyada (WhatsApp, LinkedIn, Twitter
//    vb.) link paylaşılınca çıkan kartın başlık/açıklamasını belirler.
//    ⚠️ Görsel önizleme (og:image) burada tanımlı değil; eklemek istersen
//    `openGraph: { images: ["/icon.png"] }` gibi bir alan eklemen gerekir.
export const metadata: Metadata = {
  title: "LumosMind — Epilepsi için erken uyarı ve geri bildirim",
  description:
    "LumosMind, giyilebilir sensör verisini gerçek zamanlı analiz ederek kriz öncesi erken uyarı ve anlaşılır geri bildirim sağlar.",
  openGraph: {
    title: "LumosMind",
    description:
      "Epilepsi için gerçek zamanlı geri bildirim ve kriz öncesi erken uyarı.",
    type: "website",
  },
};

// RootLayout: Next.js App Router'ın zorunlu kök bileşeni.
// `children` -> o an render edilen sayfanın içeriğidir (bizim durumumuzda
// page.tsx -> <PageShell />).
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang="tr": Tarayıcıya ve ekran okuyuculara sayfanın Türkçe olduğunu
    // söyler (erişilebilirlik + SEO için önemli).
    <html lang="tr">
      {/* <body> class'ları:
          - bg-white / text-black: AÇIK modda beyaz zemin, siyah yazı.
          - dark:bg-[#0b0f2a] / dark:text-white: Kullanıcının sistemi KOYU
            modda ise (Tailwind'in `dark:` varsayılan davranışı
            prefers-color-scheme'e göre çalışır) lacivert-mor zemin, beyaz yazı.
            Sitenin asıl tasarımı bu koyu tema üzerine kurulu.
          - transition-colors duration-300: tema değişirken renkler ani
            değil, 300ms'lik yumuşak bir geçişle değişir.
          NE DEĞİŞİRSE NE OLUR?
           - dark:bg-[#0b0f2a] rengini değiştirirsen sitenin genel koyu
             arkaplan rengi (Hero, Product, vb. section'ların "temel" rengi)
             değişir; ama section'ların çoğu zaten kendi `bg-black/10`,
             `bg-white/5` gibi katmanlarını üstüne bindirir. */}
      <body className="bg-white text-black dark:bg-[#0b0f2a] dark:text-white transition-colors duration-300">        {children}
      </body>
    </html>
  );
}
