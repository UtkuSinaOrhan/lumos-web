// =============================================================================
// components/PageShell.tsx
// -----------------------------------------------------------------------------
// Sitenin İSKELETİ (shell). page.tsx bu bileşeni render eder; burası da
// tüm section bileşenlerini (Sections.tsx'ten) DOĞRU SIRAYLA alt alta dizer.
//
// SAYFADAKİ BÖLÜM SIRASINI DEĞİŞTİRMEK İSTERSEN: aşağıdaki <main> içindeki
// bileşen satırlarının SIRASINI değiştirmen yeterli — örn. <FAQ />'yu
// <UseCases />'tan önce göstermek istersen, sadece o iki satırı yer
// değiştir. Sections.tsx'te başka hiçbir şeye dokunmana gerek yok.
//
// BİR BÖLÜMÜ TAMAMEN KALDIRMAK İSTERSEN: ilgili <Bileşen /> satırını silmen
// yeterli (örn. <Waitlist /> satırını silersen "Bekleme listesi" bölümü
// sitede hiç görünmez, ama Navbar'daki linkler de ona göre gözden geçirilmeli).
// =============================================================================

"use client"; // AppProvider (Context/state) ve framer-motion (LayoutGroup)
              // içerdiği için client bileşeni olmalı.

import Navbar from "./Navbar";
import {AppProvider} from "./AppProvider"; // Dil (tr/en) state'ini tüm alt ağaca sağlayan sarmalayıcı
import {
  Hero,        // Üst karşılama bölümü
  Product,     // "Ürün" özellik kartları
  HowItWorks,  // "Nasıl Çalışır" 3 adım
  UseCases,    // "Kullanım" senaryoları
  Screenshots, // "Ürün Kanıtı" mockup kartları
  TeamSection, // "Ekip & Güven"
  FAQ,         // Sık sorulan sorular
  Waitlist,    // Bekleme listesi formu
  ContactCTA,  // Asıl iletişim bölümü (e-posta + Instagram + LinkedIn)
  Footer,      // Sayfa altı (marka adı + telif + sosyal ikonlar)
} from "./Sections";
import { LayoutGroup } from "framer-motion"; // Navbar'daki logo animasyonunun (layoutId) doğru çalışması için gereken grup sarmalayıcı

export default function PageShell() {
  return (
    // LayoutGroup: framer-motion'a "bu ağaç içindeki aynı layoutId'ye sahip
    // elemanlar birbirleriyle ilişkilidir" bilgisini verir (Navbar.tsx'teki
    // layoutId="lm-logo" için gerekli altyapı).
    <LayoutGroup>
      {/* AppProvider: İÇİNDEKİ HER ŞEYE (Navbar dahil tüm section'lara) aktif
          dil bilgisini ve dil değiştirme fonksiyonunu sağlar. Bu satırın
          dışına bir bileşen koyarsan (örn. Navbar'ı buranın dışına alırsan)
          o bileşen useApp() çağırdığında HATA fırlatır (AppProvider.tsx'teki
          "must be used inside AppProvider" kontrolü nedeniyle). */}
      <AppProvider>
        <main className="min-h-screen text-white">
          <Navbar />
          <Hero />
          <Product />
          <HowItWorks />
          <UseCases />
          <Screenshots />
          <TeamSection />
          <FAQ />
          <Waitlist />
          <ContactCTA />
          <Footer />
        </main>
      </AppProvider>
    </LayoutGroup>
  );
}
