// =============================================================================
// components/HeroLogo.tsx
// -----------------------------------------------------------------------------
// Hero bölümünün en üstünde gösterilen büyük logo görselini render eden küçük,
// tek amaçlı bir bileşen. Sections.tsx -> Hero() içinde <HeroLogo /> olarak
// kullanılır.
// =============================================================================

"use client"; // Şu an client tarafına özel bir şey (state, event) yok ama
              // ileride etkileşim eklenirse (örn. tıklanınca animasyon)
              // hazır olması için "use client" işaretlenmiş.

export default function HeroLogo() {
  return (
    // Logoyu ortalayan, üstten/alttan boşluk bırakan sarmalayıcı.
    <div className="flex justify-center items-center pt-8 pb-6">
      <img
        src="/icon.png" // public/icon.png dosyasından okunur. Dosya adı/yolu
                         // değişirse (örn. public/logo.svg) bu src'yi de
                         // güncellemen gerekir, aksi halde görsel kırık çıkar.
        alt="LumosMind Logo" // Görsel yüklenemezse veya ekran okuyucu
                              // kullanılıyorsa gösterilen alternatif metin
                              // (erişilebilirlik + SEO için önemli).
        draggable={false} // Kullanıcının logoyu sürükleyip başka yere
                           // bırakmasını (drag&drop) engeller; sade bir
                           // görsel deneyim için.
        // Boyut: mobilde 180px, orta ekranda (md) 240px, büyük ekranda (lg) 300px
        // genişlik. select-none: metin gibi seçilmesini engeller.
        // drop-shadow(...): logonun etrafında mor/parlak bir ışıma (glow) efekti.
        // NE DEĞİŞİRSE NE OLUR?
        //  - w-[180px] vb. değerleri artırırsan logo büyür.
        //  - rgba(139,92,246,0.65) rengini değiştirirsen ışıma rengi değişir
        //    (şu an mor/purple tonunda, sitenin genel renk temasıyla uyumlu).
        className="w-[180px] md:w-[240px] lg:w-[300px] select-none drop-shadow-[0_0_70px_rgba(139,92,246,0.65)]"
      />
    </div>
  );
}
