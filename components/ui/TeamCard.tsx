"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  avatar: string;
  tags: string[];
  accentColor?: "cyan" | "magenta";
  slideFrom?: "left" | "right";
}

const accentMap = {
  cyan: {
    color: "var(--neon-cyan)",
    border: "2px solid var(--neon-cyan)",
    glow: "0 0 12px rgba(0, 245, 255, 0.3)",
    glowHover: "0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.2)",
  },
  magenta: {
    color: "var(--neon-magenta)",
    border: "2px solid var(--neon-magenta)",
    glow: "0 0 12px rgba(255, 45, 120, 0.3)",
    glowHover: "0 0 20px rgba(255, 45, 120, 0.5), 0 0 40px rgba(255, 45, 120, 0.2)",
  },
};

export default function TeamCard({
  name,
  role,
  avatar,
  tags,
  accentColor = "cyan",
  slideFrom = "left",
}: TeamCardProps) {
  const accent = accentMap[accentColor];
  const slideX = slideFrom === "left" ? -60 : 60;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: "var(--bg-surface)",
        border: accent.border,
        borderRadius: "8px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        boxShadow: accent.glow,
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = accent.glowHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = accent.glow;
      }}
    >
      {/* Avatar */}
      <div
        style={{
          position: "relative",
          width: "120px",
          height: "120px",
          borderRadius: "4px",
          overflow: "hidden",
          border: accent.border,
        }}
      >
        <Image
          src={avatar}
          alt={name}
          fill
          style={{ objectFit: "cover", imageRendering: "pixelated" }}
        />
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "var(--font-orbitron)",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "var(--text-primary)",
          margin: 0,
          textAlign: "center",
        }}
      >
        {name}
      </h3>

      {/* Role */}
      <span
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontSize: "1rem",
          fontWeight: 500,
          color: accent.color,
          textAlign: "center",
        }}
      >
        {role}
      </span>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-share-tech-mono)",
              fontSize: "0.7rem",
              color: "var(--neon-purple)",
              background: "rgba(180, 79, 255, 0.15)",
              border: "1px solid var(--neon-purple)",
              borderRadius: "3px",
              padding: "0.2rem 0.5rem",
              letterSpacing: "0.05em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}