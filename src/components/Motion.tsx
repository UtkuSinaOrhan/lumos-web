// =============================================================================
// components/Motion.tsx
// -----------------------------------------------------------------------------
// Sitede tekrar tekrar kullanılan iki küçük "animasyon sarmalayıcı" (wrapper)
// bileşeni. framer-motion kütüphanesini kullanır. Sections.tsx içindeki
// hemen her kart/bölüm bunlardan biriyle sarmalanmış durumda.
// =============================================================================

"use client"; // framer-motion tarayıcıda çalışan bir animasyon kütüphanesi
              // olduğu için bu dosya client bileşeni olmak zorunda.

import { motion } from "framer-motion";

// FadeIn: İçine aldığı her şeyi, kullanıcı O KISMA SCROLL EDİP GELDİĞİNDE
// (viewport'a girdiğinde) yumuşakça belirmesini (opacity 0->1) ve hafifçe
// yukarı kaymasını (y ekseninde) sağlayan sarmalayıcı.
//
// Props:
//   children -> içine sarmalanan JSX (kart, başlık, vb.)
//   delay    -> animasyonun kaç saniye GECİKMELİ başlayacağı (varsayılan 0).
//               Sections.tsx'te genelde `delay={i * 0.05}` gibi kullanılır;
//               bu sayede bir listedeki kartlar hepsi aynı anda değil,
//               birbiri ardına (staggered) belirir.
//   y        -> başlangıçta kaç piksel AŞAĞIDA duracağı (varsayılan 14px);
//               animasyon bu mesafeyi 0'a indirirken yukarı doğru kayma
//               hissi verir.
//
// NE DEĞİŞİRSE NE OLUR?
//  - duration: 0.6 değerini artırırsan animasyon daha YAVAŞ, azaltırsan
//    daha HIZLI oynar.
//  - viewport={{ once: true }} -> Animasyon sadece İLK KEZ görünürken oynar;
//    `once: false` yaparsan kullanıcı yukarı/aşağı her kaydırdığında
//    animasyon TEKRAR tekrar oynar (genelde rahatsız edici olur).
//  - margin: "-80px" -> Elemanın ekrana girmesinden 80px ÖNCE değil, 80px
//    İÇERİ girdikten sonra animasyonun tetiklenmesini sağlar (yani element
//    ekranın biraz daha içine girmeden animasyon başlamaz).
export const FadeIn = ({
  children,
  delay = 0,
  y = 14,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}                     // Başlangıç durumu: görünmez ve y kadar aşağıda
    whileInView={{ opacity: 1, y: 0 }}              // Ekrana girince: tam görünür ve orijinal konumunda
    viewport={{ once: true, margin: "-80px" }}      // Sadece bir kez oyna, tetikleme eşiği -80px
    transition={{ duration: 0.6, ease: "easeOut", delay }} // 0.6sn, yavaşlayarak biten bir geçiş eğrisi
  >
    {children}
  </motion.div>
);

// PopHover: Fare üzerine gelince (hover) hafifçe BÜYÜYEN, tıklanınca
// (tap/click) hafifçe KÜÇÜLEN bir "buton/interaktif eleman" sarmalayıcısı.
// Sections.tsx -> Hero() içinde ana "Demo Talep Et" butonunu sarmalamak
// için kullanılıyor; kullanıcıya butonun tıklanabilir olduğunu his olarak
// hissettirir.
//
// NE DEĞİŞİRSE NE OLUR?
//  - scale: 1.03 -> 1.1 yaparsan hover'da buton çok daha belirgin büyür
//    (abartılı görünebilir). 1.0'a yakın değerler daha "zarif" durur.
//  - whileTap scale: 0.98 -> tıklama anında butonun ne kadar "basılmış"
//    hissi vereceğini belirler; 1'e ne kadar yakınsa etki o kadar az olur.
export const PopHover = ({ children }: { children: React.ReactNode }) => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
    {children}
  </motion.div>
);
