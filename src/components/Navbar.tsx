// =============================================================================
// components/Navbar.tsx
// -----------------------------------------------------------------------------
// Sayfanın en üstünde SABİT (fixed) duran, scroll edilse bile ekrandan
// kaybolmayan navigasyon (menü) çubuğu. Masaüstünde yatay menü, mobilde
// hamburger (☰) menü olarak çalışır. Ayrıca dil değiştirme (TR/EN) butonu
// da burada.
// =============================================================================

"use client"; // useState/useEffect gibi React hook'ları + tarayıcı olayları
              // (scroll event) kullandığı için client bileşeni olmalı.

import { useApp } from "./AppProvider";         // Aktif dil (lang) ve değiştirme fonksiyonu
import Image from "next/image";                 // Next.js'in optimize edilmiş <img> alternatifi
import { useEffect, useMemo, useState } from "react";
import { copy, site } from "../data/site";      // Metinler (copy) ve menü linkleri (site.nav)
import { Menu, X } from "lucide-react";         // Hamburger menü ikonu (Menu) ve kapatma ikonu (X)
import { motion, AnimatePresence } from "framer-motion"; // Mobil menünün açılış/kapanış animasyonu
import type { NavItem } from "../types";        // Menü öğesi tipi ({ label, href })

export default function Navbar() {

  const { lang, setLang } = useApp();           // aktif dil + dil değiştirme fonksiyonu
  const [open, setOpen] = useState(false);      // mobil (hamburger) menü açık mı?
  const [scrolled, setScrolled] = useState(false); // sayfa 12px'den fazla kaydırıldı mı?

  // Sayfa scroll edildikçe `scrolled` state'ini günceller. Bu, Navbar'ın
  // arkaplanının sayfa en tepedeyken daha SAYDAM, aşağı kaydırılınca daha
  // OPAK (bulanıklaştırılmış koyu) görünmesini sağlamak için kullanılıyor.
  // NE DEĞİŞİRSE NE OLUR?
  //  - `window.scrollY > 12` eşiğini artırırsan (örn. 100) kullanıcı daha
  //    fazla kaydırmadan Navbar'ın arkaplanı değişmez.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); // sayfa yüklendiği an mevcut scroll durumunu da kontrol et
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll); // temizlik: bileşen kaldırılınca listener'ı kaldır (memory leak önlenir)
  }, []);

    // Aktif dile göre menü linkleri (site.ts -> site.nav.tr veya site.nav.en)
    const nav = site.nav[lang];
  return (
    // Navbar'ın kendisi: `fixed inset-x-0 top-0 z-50` -> ekranın en üstüne
    // yapışık kalır, scroll edilse bile yerinde durur, z-50 ile diğer
    // içeriklerin ÜSTÜNDE görünür.
    // `scrolled` durumuna göre arkaplan class'ı değişir (yukarıdaki useEffect
    // ile kontrol edilir):
    //   - scrolled=true  -> bg-black/30 + alt border (daha belirgin)
    //   - scrolled=false -> bg-black/20 (daha saydam)
    <div
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? "backdrop-blur bg-black/30 border-b border-white/10": "backdrop-blur bg-black/20"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Sol taraf: logo + marka adı. href="#" tıklanınca sayfanın en
            başına döner (varsayılan tarayıcı davranışı). */}
        <a href="#" className="flex items-center gap-3 font-semibold tracking-tight text-purple-400/80">
            {/* motion.div + layoutId="lm-logo": framer-motion'ın "shared
                layout animation" özelliği. Eğer sayfanın başka bir yerinde
                de aynı layoutId'ye sahip bir eleman olsaydı, aralarında
                geçiş yapılırken (örn. konum değiştiğinde) yumuşak bir
                animasyon oluşurdu. Şu an tek başına kullanıldığı için pratik
                bir etkisi yok, ama ileride ikinci bir logo yeri eklenirse
                (örn. mobil menü içinde) ikisi arasında akıcı geçiş sağlar. */}
            <motion.div
                layoutId="lm-logo"
                className="w-[28px] h-[28px] md:w-[30px] md:h-[25px]"
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
            >
                <Image
                  src="/icon.png" // public/icon.png'den okunur (HeroLogo.tsx ile aynı dosya)
                  alt="LumosMind Logo"
                  width={370}   // Next.js Image için ZORUNLU: gerçek görsel oranını bilmesi için
                  height={370}  // (ekrandaki boyut yukarıdaki className ile ayrıca kontrol ediliyor)
                  priority      // Bu görseli SAYFA YÜKLENİR YÜKLENMEZ öncelikli yükle (lazy-load yapma);
                                // Navbar her zaman görünür olduğu için mantıklı bir seçim.
                  className="drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" // hafif mor ışıma efekti
                />
            </motion.div>

            {/* Marka adı metni. İçindeki yorum satırı geliştiriciye not:
                "istersen scroll'da küçültürüz" — yani `scrolled` state'i
                kullanılarak buraya da bir boyut geçişi eklenebilir, ama şu
                an eklenmemiş. */}
            <span>{/* istersen scroll’da küçültürüz */}LumosMind</span>
        </a>

        {/* Masaüstü menüsü: `hidden md:flex` -> mobilde GİZLİ, md (768px)
            ve üzeri ekranlarda YATAY flex olarak görünür. */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          {/* site.ts -> nav dizisindeki her öğe için bir link üretir.
              NE DEĞİŞİRSE NE OLUR?
               - site.ts'teki nav dizisine yeni bir { label, href } eklersen,
                 bu menüye OTOMATİK olarak yeni bir link eklenir (bu dosyada
                 hiçbir değişiklik yapmana gerek kalmaz). */}
          {nav.map((n: NavItem) => (
            <a key={n.href} href={n.href} className="text-white/80 hover:text-white transition">
              {n.label}
            </a>
          ))}
          {/* Ana çağrı (CTA) butonu: her zaman #contact bölümüne götürür,
              metni copy[lang].ctaPrimary'den gelir ("Demo Talep Et" / "Request Demo"). */}
          <a
            href="#contact"
            className="rounded-full px-4 py-2 border border-white/20 bg-white/10 hover:bg-white/20 transition"
          >
            {copy[lang].ctaPrimary}
          </a>
        </div>

      <div className="flex items-center gap-3 ml-4">

        {/* Language Toggle: Tıklanınca dili TR<->EN arasında değiştirir.
            Bu, AppProvider.tsx'teki `setLang` fonksiyonunu çağırır; bu
            değişiklik TÜM sayfadaki (Navbar dahil her section) metinleri
            anında günceller çünkü hepsi aynı Context'i okuyor. */}
        <button
          onClick={() => setLang(lang === "tr" ? "en" : "tr")}
          className="text-xs border border-white/20 px-3 py-1 rounded-lg hover:bg-white/10 transition"
        >
          {lang === "tr" ? "EN" : "TR"}
        </button>

      </div>
        {/* Hamburger menü butonu: sadece mobilde görünür (md:hidden).
            `open` state'ini tersine çevirir; ikon açık/kapalı durumuna göre
            X veya Menu olarak değişir. */}
        <button
          className="md:hidden rounded-lg p-2 border bg-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobil açılır menü: AnimatePresence + motion.div ile açılırken/
          kapanırken yükseklik (height) ve saydamlık (opacity) animasyonlu
          geçiş yapar. `open` false olunca framer-motion önce "exit"
          animasyonunu oynatır, SONRA elemanı DOM'dan kaldırır (bu yüzden
          AnimatePresence gerekli — normal `{open && ...}` ile bu tür çıkış
          animasyonu yapılamaz). */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
              {/* Aynı nav listesi, bu kez ALT ALTA (mobil menü). Her linke
                  tıklanınca `setOpen(false)` ile menü otomatik kapanır. */}
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-2"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 border bg-neutral-900 text-white text-center"
              >
                {copy[lang].ctaPrimary}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

</div>
    

  );
}
