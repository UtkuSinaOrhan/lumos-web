"use client";

import { useMemo, useState } from "react";
import { site } from "../data/site";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState<string | null>(null);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("LumosMind Waitlist / Demo Talebi");
    const body = encodeURIComponent(
      `Merhaba LumosMind,\n\nWaitlist'e katılmak / demo talep etmek istiyorum.\n\nE-posta: ${email}\n\nTeşekkürler.`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [email]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setOk("Lütfen geçerli bir e-posta gir.");
      return;
    }
    setOk("Tamam! Mail ekranını açıyorum…");
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
      {ok && <div className="mt-3 text-sm opacity-80">{ok}</div>}
      <div className="mt-3 text-xs opacity-60">
        Not: Form demo amaçlıdır; şu an mail ile talep topluyor.
      </div>
    </form>
  );
}