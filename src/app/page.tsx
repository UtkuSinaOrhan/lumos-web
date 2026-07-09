// =============================================================================
// app/page.tsx
// -----------------------------------------------------------------------------
// Next.js App Router'da bu dosya "/" (ana sayfa / kök URL) adresine denk gelir.
// İçeriği kasıtlı olarak çok sade tutulmuş: tüm gerçek sayfa yapısı
// components/PageShell.tsx içine taşınmış, burada sadece onu render ediyoruz.
//
// NE DEĞİŞİRSE NE OLUR?
//  - Bu dosyanın konumunu/adını değiştirirsen (örn. app/hakkimizda/page.tsx
//    olarak kopyalarsan) Next.js otomatik olarak "/hakkimizda" adresinde
//    yeni bir sayfa oluşturur (App Router'ın dosya-tabanlı routing mantığı).
//  - Burada başka bileşenler render edersen (örn. <PageShell /> yerine
//    <AboutPage />) ana sayfanın tamamen farklı bir içerik göstermesini
//    sağlarsın.
// =============================================================================

import PageShell from "../components/PageShell";

export default function Page() {
  return <PageShell />;
}
