"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { site } from "../data/site";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem } from "../types";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    const nav = useMemo<NavItem[]>(() => site.nav as NavItem[], []);
  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? "backdrop-blur bg-black/30 border-b border-white/10": "backdrop-blur bg-black/20"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 font-semibold tracking-tight text-purple-400/80">
            <motion.div
                layoutId="lm-logo"
                className="w-[28px] h-[28px] md:w-[30px] md:h-[25px]"
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
            >
                <Image
                  src="/icon.png"
                  alt="LumosMind Logo"
                  width={370}
                  height={370}
                  priority
                  className="drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]"
                />
            </motion.div>

            <span>{/* istersen scroll’da küçültürüz */}LumosMind</span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          {nav.map((n: NavItem) => (
            <a key={n.href} href={n.href} className="text-white/80 hover:text-white transition">
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full px-4 py-2 border border-white/20 bg-white/10 hover:bg-white/20 transition"
          >
            {site.ctaPrimary}
          </a>
        </div>

        <button
          className="md:hidden rounded-lg p-2 border bg-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
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
                {site.ctaPrimary}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}