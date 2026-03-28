"use client";

import { motion } from "framer-motion";

interface TechTagProps {
  name: string;
  index: number;
}

export default function TechTag({ name, index }: TechTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: 0.03 * index,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        borderColor: "var(--neon-cyan)",
        boxShadow: "0 0 10px rgba(0, 245, 255, 0.3)",
      }}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-share-tech-mono)",
        fontSize: "0.8rem",
        color: "var(--text-primary)",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-neon)",
        borderRadius: "4px",
        padding: "0.4rem 0.85rem",
        cursor: "default",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {name}
    </motion.span>
  );
}