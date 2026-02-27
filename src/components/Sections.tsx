import React from "react";
import { FadeIn, PopHover } from "./Motion";
import WaitlistForm from "./WaitlistForm";
import HeroLogo from "./HeroLogo";
import { useApp } from "./AppProvider";

import {
  site,
  copy,
  features,
  steps,
  useCases,
  faqs,
  trust as trustByLang,
  stats as statsByLang,
  screenshots,
  team,
} from "../data/site";

import { ArrowRight, Shield, Sparkles, Activity } from "lucide-react";

type ContainerProps = { children: React.ReactNode };

function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-6xl px-4">{children}</div>;
}

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

export function Hero() {
  const { lang } = useApp();
  const t = copy[lang];
  const trustList = trustByLang[lang];
  const statsList = statsByLang[lang];

  return (
    <section className="relative pt-28 md:pt-32 pb-16 text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-[#6d28d9]/40 via-[#1d4ed8]/35 to-[#0ea5e9]/25 blur-3xl opacity-60" />
      </div>

      <Container>
        <div className="flex justify-center mb-8">
          <HeroLogo />
        </div>

        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-2 text-xs text-white/90">
          <Sparkles size={14} />
          {lang === "tr"
            ? "Erken uyarı • Gerçek zamanlı geri bildirim • Mobil deneyim"
            : "Early warning • Real-time feedback • Mobile experience"}
        </p>

        <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-white max-w-3xl mx-auto">
          {t.tagline}
        </h1>

        <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          {t.description}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <PopHover>
            <a
              href="#contact"
              className="rounded-2xl px-6 py-3 bg-white text-[#0b0f2a] font-medium hover:opacity-90 transition inline-flex items-center justify-center gap-2"
            >
              {t.ctaPrimary} <ArrowRight size={18} />
            </a>
          </PopHover>

          <a
            href="#how"
            className="rounded-2xl px-6 py-3 border border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
          >
            {t.ctaSecondary}
          </a>
        </div>

        {/* Trust + stats dil bağımsız bırakıldı (istersen TR/EN de yaparız) */}
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

export function HowItWorks() {
  const { lang } = useApp();

  return (
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
                    ? "LumosMind demosunu görmek ister misin?"
                    : "Want to see the LumosMind demo?"}
                </h3>
                <p className="mt-3 text-white/80 leading-relaxed">
                  {lang === "tr"
                    ? "Kapsamı (sensör türleri, MVP hedefi, bildirim akışı) netleştirip demo planı çıkaralım."
                    : "Let’s clarify scope (sensor types, MVP goals, alert flow) and create a demo plan."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    lang === "tr" ? "LumosMind Demo Talebi" : "LumosMind Demo Request"
                  )}`}
                  className="rounded-2xl px-5 py-3 bg-white text-[#0b0f2a] text-center font-medium hover:opacity-90 transition"
                >
                  {lang === "tr" ? "E-posta Gönder" : "Send email"}
                </a>
                <a
                  href="#product"
                  className="rounded-2xl px-5 py-3 border border-white/20 text-center bg-white/10 text-white hover:bg-white/20 transition"
                >
                  {lang === "tr" ? "Özelliklere Dön" : "Back to features"}
                </a>
              </div>
            </div>

            <div className="mt-6 text-sm text-white/70">
              {lang === "tr" ? "İletişim" : "Contact"}:{" "}
              <span className="underline">{site.email}</span>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  const { lang } = useApp();
  const t = copy[lang];

  return (
    <footer className="border-t border-white/10 py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-semibold text-white">{t.name}</div>
          <div className="text-sm text-white/60">{t.footerNote}</div>
        </div>
      </Container>
    </footer>
  );
}