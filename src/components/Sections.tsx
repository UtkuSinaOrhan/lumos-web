import React from "react";
import { FadeIn, PopHover } from "./Motion";
import WaitlistForm from "./WaitlistForm";
import HeroLogo from "./HeroLogo";
import {
  site,
  features,
  steps,
  useCases,
  faqs,
  trust,
  stats,
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
  return (
    <section className="relative pt-28 md:pt-32 pb-14">
      {/* Background blobs (purple/navy) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-[#6d28d9]/40 via-[#1d4ed8]/35 to-[#0ea5e9]/25 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 h-[340px] w-[340px] rounded-full bg-gradient-to-tr from-[#0b5bd3]/25 via-[#7c3aed]/25 to-[#0b0f2a]/25 blur-3xl opacity-50" />
      </div>

      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeIn>
            {/* Top badge */}
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-3 py-1 text-xs text-white/90">
              <Sparkles size={14} />
              Erken uyarı • Gerçek zamanlı geri bildirim • Mobil deneyim
            </p>

            <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-white">
              {site.tagline}
            </h1>

            <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
              {site.description}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <PopHover>
                {/* Primary */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 bg-white text-[#0b0f2a] font-medium hover:opacity-90 transition"
                >
                  {site.ctaPrimary} <ArrowRight size={18} />
                </a>
              </PopHover>

              {/* Secondary */}
              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 border border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
              >
                {site.ctaSecondary}
              </a>
            </div>

            {/* Trust chips */}
            {trust?.length ? (
              <div className="mt-7 flex flex-wrap gap-2 text-xs">
                {trust.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/10 backdrop-blur px-3 py-1 text-white/85"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Mini stats */}
            {stats?.length ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.map((s) => (
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

            {/* Two highlight cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
                <div className="flex items-center gap-2 font-medium text-white">
                  <Shield size={18} /> Gizlilik Odaklı
                </div>
                <p className="mt-2 text-white/80">
                  Kontrollü paylaşım ve minimum veri yaklaşımı.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
                <div className="flex items-center gap-2 font-medium text-white">
                  <Activity size={18} /> Anlık Trendler
                </div>
                <p className="mt-2 text-white/80">
                  Risk seviyesini anlaşılır şekilde izleyin.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ✅ Right side: big logo that shrinks/fades on scroll */}
          <FadeIn delay={0.05}>
            <HeroLogo />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export function Product() {
  return (
    <section id="product" className="py-16">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow="Ürün"
            title="Karmaşık sinyali, anlaşılır karara çevirin."
            desc="LumosMind; kullanıcı deneyimini öncelikleyen, giyilebilir sinyal verisini gerçek zamanlı analiz eden ve uyarı akışını güvenle yöneten bir platform yaklaşımıdır."
          />
        </FadeIn>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
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
  return (
    <section id="how" className="py-16 border-t border-white/10 bg-black/10">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow="Nasıl Çalışır"
            title="3 adımda basit akış"
            desc="Giyilebilir veri → akıllı analiz → kullanıcıya ve bakım ekibine doğru zamanda doğru mesaj."
          />
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {steps.map((s, idx) => (
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
  return (
    <section id="use" className="py-16">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow="Kullanım"
            title="Kimin için, ne sağlar?"
            desc="LumosMind; kullanıcı, bakım veren ve klinik ekip tarafında daha iyi kararlar ve daha güvenli süreçler hedefler."
          />
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {useCases.map((u, i) => (
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
  return (
    <section id="proof" className="py-16 border-t border-white/10 bg-black/10">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow="Product Proof"
            title="Üründen hızlı kanıtlar"
            desc="Pitch için: Ne inşa ediyoruz, kullanıcı ne görecek, akış nasıl işleyecek?"
          />
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {screenshots.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition">
                <div className="font-semibold text-white">{s.title}</div>
                <p className="mt-2 text-white/80 leading-relaxed">{s.desc}</p>

                <div className="mt-5 h-28 rounded-2xl border border-white/10 bg-white/5" />
                <div className="mt-2 text-xs text-white/65">
                  Mockup placeholder
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
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow="Team & Credibility"
            title="Ürünü güvenle teslim edecek ekip yaklaşımı"
            desc="Health-tech’te hız kadar doğrulama ve güvenlik de kritik. Bu yüzden iteratif MVP + pilot odaklı ilerliyoruz."
          />
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {team.map((m, i) => (
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
  return (
    <section id="faq" className="py-16 border-t border-white/10 bg-black/10">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow="SSS"
            title="En sık sorulanlar"
            desc="Ürünü netleştirmek için kısa cevaplar."
          />
        </FadeIn>

        <div className="mt-10 grid gap-3">
          {faqs.map((f, i) => (
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
                Waitlist
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Pilot / demo için listeye katıl
              </h3>
              <p className="mt-3 text-white/80 leading-relaxed">
                Kapsamı netleştirip (sensör, MVP, bildirim akışı) kısa bir demo
                planı çıkaralım.
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
  return (
    <section id="contact" className="py-16">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur text-white p-8 md:p-10">
          <FadeIn y={10}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                  LumosMind demosunu görmek ister misin?
                </h3>
                <p className="mt-3 text-white/80 leading-relaxed">
                  Kapsamı (sensör türleri, MVP hedefi, bildirim akışı)
                  netleştirip demo planı çıkaralım.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    "LumosMind Demo Talebi"
                  )}`}
                  className="rounded-2xl px-5 py-3 bg-white text-[#0b0f2a] text-center font-medium hover:opacity-90 transition"
                >
                  E-posta Gönder
                </a>
                <a
                  href="#product"
                  className="rounded-2xl px-5 py-3 border border-white/20 text-center bg-white/10 text-white hover:bg-white/20 transition"
                >
                  Özelliklere Dön
                </a>
              </div>
            </div>

            <div className="mt-6 text-sm text-white/70">
              İletişim: <span className="underline">{site.email}</span>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-semibold text-white">{site.name}</div>
          <div className="text-sm text-white/60">{site.footerNote}</div>
        </div>
      </Container>
    </footer>
  );
}