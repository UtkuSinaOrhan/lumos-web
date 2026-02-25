"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroLogo() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => {
      setShow(v < 160); // 160px sonra hero logo kapanır -> navbar'a uçar
    });
    return () => unsub();
  }, [scrollY]);

  return (
    <div className="flex justify-center items-center min-h-[360px]">
      <AnimatePresence initial={false}>
        {show && (
          <motion.img
            key="hero-logo"
            layoutId="lm-logo"
            src="/icon.png"
            alt="LumosMind Logo"
            className="w-[220px] md:w-[320px] lg:w-[380px] select-none
              drop-shadow-[0_0_80px_rgba(139,92,246,0.75)]"
            draggable={false}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}