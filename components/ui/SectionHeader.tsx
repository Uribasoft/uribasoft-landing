"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  comment: string;
  title: string;
}

export default function SectionHeader({ comment, title }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "3rem",
        textAlign: "center",
      }}
    >
      <span
        className="glow-cyan"
        style={{
          fontFamily: "var(--font-share-tech-mono)",
          fontSize: "0.8rem",
          color: "var(--neon-cyan)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        // {comment}
      </span>

      <h2
        style={{
          fontFamily: "var(--font-orbitron)",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          color: "var(--text-primary)",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>

      <div
        style={{
          width: "60px",
          height: "2px",
          background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))",
          borderRadius: "1px",
        }}
      />
    </motion.div>
  );
}