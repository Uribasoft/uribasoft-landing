"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  iconColor: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  tag,
  iconColor,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-neon)",
        borderRadius: "8px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = iconColor;
        el.style.boxShadow = `0 0 15px ${iconColor}40, 0 0 30px ${iconColor}20`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-neon)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      <Icon size={32} color={iconColor} strokeWidth={1.5} />

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-orbitron)",
          fontWeight: 500,
          fontSize: "1.05rem",
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontSize: "1rem",
          color: "var(--text-secondary)",
          margin: 0,
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Tag pill */}
      <span
        style={{
          alignSelf: "flex-start",
          fontFamily: "var(--font-share-tech-mono)",
          fontSize: "0.7rem",
          color: "var(--neon-purple)",
          background: "rgba(180, 79, 255, 0.15)",
          border: "1px solid var(--neon-purple)",
          borderRadius: "3px",
          padding: "0.2rem 0.6rem",
          letterSpacing: "0.05em",
        }}
      >
        {tag}
      </span>
    </motion.div>
  );
}