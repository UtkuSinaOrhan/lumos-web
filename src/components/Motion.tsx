"use client";

import { motion } from "framer-motion";

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
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

export const PopHover = ({ children }: { children: React.ReactNode }) => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
    {children}
  </motion.div>
);