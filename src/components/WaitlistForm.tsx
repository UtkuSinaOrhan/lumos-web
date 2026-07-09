// =============================================================================
// components/WaitlistForm.tsx
// -----------------------------------------------------------------------------
// "Waitlist" (bekleme listesi) bölümünde gösterilen basit e-posta formu.
// Gerçek bir backend/veritabanı YOKTUR — form, kullanıcının e-posta
// istemcisini (Gmail, Outlook, Mail uygulaması vb.) önceden doldurulmuş bir
// "mailto:" linkiyle açar. Yani şu an bu form aslında bir e-posta TASLAĞI
// oluşturucu gibi çalışıyor; gönderim işini kullanıcının kendi mail
// uygulaması yapıyor.
// =============================================================================

"use client"; // useState/useMemo kullanıldığı ve tarayıcıya özel
              // `window.location.href` ataması yapıldığı için client bileşeni.

import { useMemo, useState } from "react";
import { site } from "../data/site"; // site.email buradan gelir

export default function WaitlistForm() {
  const [email, setEmail] = useState("");            // kullanıcının yazdığı e-posta
  const [ok, setOk] = useState<string | null>(null);  // kullanıcıya gösterilecek durum mesajı (hata veya başarı)

  // mailto linkini üretir. useMemo kullanılmasının nedeni: `email` değişmediği
  // sürece bu hesaplamanın HER render'da tekrar yapılmasını önlemek
  // (performans optimizasyonu; burada maliyet düşük olsa da iyi bir alışkanlık).
  //
  // NE DEĞİŞİRSE NE OLUR?
  //  - subject metnini değiştirirsen, açılan e-postanın KONU satırı değişir.
  //  - body şablonundaki metni değiştirirsen, e-postanın gövde metni değişir
  //    (kullanıcının girdiği e-posta adresi ${email} ile otomatik eklenir).
  //  - site.email (site.ts içinde) değiştirilirse, form artık FARKLI bir
  //    adrese e-posta göndermeye çalışır.
  const mailto = useMemo(() => {
    const subject = encodeURIComponent("LumosMind Waitlist / Demo Talebi");
    const body = encodeURIComponent(
      `Merhaba LumosMind,\n\nWaitlist'e katılmak / demo talep etmek istiyorum.\n\nE-posta: ${email}\n\nTeşekkürler.`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [email]);

  // Form gönderildiğinde (submit) çalışır.
  function onSubmit(e: React.FormEvent) {
    e.preventDefault(); // tarayıcının varsayılan "sayfayı yenile" davranışını engeller

    // Basit bir e-posta formatı kontrolü (regex). Bu regex "en azından
    // bir @ ve bir . içeriyor mu" seviyesinde bir kontroldür; %100 RFC
    // uyumlu e-posta doğrulaması YAPMAZ (örn. "a@b.c" gibi kenar durumları
    // geçer, ama bu basit landing page formu için yeterlidir).
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setOk("Lütfen geçerli bir e-posta gir."); // hata mesajı göster, işlemi durdur
      return;
    }
    setOk("Tamam! Mail ekranını açıyorum…");
    // Kullanıcıyı mailto: linkine yönlendirir -> tarayıcı, sistemde
    // tanımlı VARSAYILAN e-posta uygulamasını (varsa) açar.
    // NOT: Kullanıcının bilgisayarında e-posta istemcisi tanımlı değilse
    // (örn. sadece web tabanlı Gmail kullanıyorsa) bu işe yaramayabilir.
    window.location.href = mailto;
  }

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresin"
          className="w-full rounded-2xl px-4 py-3 text-neutral-900 outline-none border border-white/15 bg-white"
        />
        <button
          type="submit"
          className="rounded-2xl px-5 py-3 bg-neutral-900 text-white border border-white/15 hover:bg-neutral-800 transition"
        >
          Waitlist’e Katıl
        </button>
      </div>
      {/* Sadece `ok` state'i doluysa (hata ya da başarı mesajı) gösterilir. */}
      {ok && <div className="mt-3 text-sm opacity-80">{ok}</div>}
      <div className="mt-3 text-xs opacity-60">
        Not: Form demo amaçlıdır; şu an mail ile talep topluyor.
      </div>
    </form>
  );
}
