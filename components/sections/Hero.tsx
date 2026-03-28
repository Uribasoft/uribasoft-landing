"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import NeonButton from "@/components/ui/NeonButton";
import { useEffect, useState } from "react";

/* ── Deterministic star data (seeded, not random at render) ── */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rng = seededRandom(42);
const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${(rng() * 100).toFixed(2)}%`,
  top: `${(rng() * 100).toFixed(2)}%`,
  duration: `${2 + rng() * 4}s`,
  delay: `${rng() * 5}s`,
}));

/* ── Metrics data ── */
const METRICS = [
  { value: "5+", label: "años" },
  { value: "15+", label: "módulos" },
  { value: "2", label: "industrias" },
];

/* ── Animation variants ── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" as const } },
});

const fadeScale = (delay: number) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay, ease: "easeOut" as const } },
});

export default function Hero() {
  const [glitch, setGlitch] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setGlitch(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const titleWords = ["SOLUCIONES", "DEL FUTURO"];

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg-deep)",
      }}
    >
      {/* ── Stars background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {STARS.map((star) => (
          <div
            key={star.id}
            className="star"
            style={
              {
                position: "absolute",
                left: star.left,
                top: star.top,
                "--duration": star.duration,
                "--delay": star.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ── Synthwave horizon ── */}
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: 0,
          width: "100%",
          height: "120px",
          background:
            "linear-gradient(transparent, #FF6B1A 30%, #FF2D78 60%, #B44FFF 80%, transparent)",
          opacity: 0.15,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Grid perspective ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div className="grid-perspective" style={{ width: "100%", height: "100%" }} />
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "120px 2rem 80px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* ── Left column ── */}
        <div
          style={{
            flex: "1 1 58%",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Tag */}
          <motion.div {...fadeUp(0.2)}>
            <span
              className="glow-cyan"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-share-tech-mono)",
                fontSize: "0.85rem",
                color: "var(--neon-cyan)",
                letterSpacing: "0.15em",
                border: "1px solid var(--border-neon)",
                padding: "0.4rem 1rem",
                borderRadius: "3px",
              }}
            >
              [ SOFTWARE STUDIO ]
            </span>
          </motion.div>

          {/* H1 title */}
          <h1
            className="gradient-text-cyan-magenta"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "clamp(18px, 3vw, 28px)",
              lineHeight: 1.6,
              margin: 0,
              textShadow: glitch
                ? "2px 0 #FF2D78, -2px 0 #00F5FF"
                : "none",
              transition: "text-shadow 0.1s ease",
            }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={word}
                style={{ display: "block" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" as const }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.6)}
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: "480px",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            Desarrollamos software de calidad internacional para cualquier
            industria, acelerando cada entrega con agentes de IA supervisados.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeScale(0.8)}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <NeonButton variant="primary" href="#proyectos">
              Ver nuestro trabajo
            </NeonButton>
            <NeonButton variant="secondary" href="#contacto">
              Hablemos
            </NeonButton>
          </motion.div>

          {/* Metrics row */}
          <motion.div
            {...fadeUp(1.0)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              marginTop: "0.5rem",
            }}
          >
            {METRICS.map((m, i) => (
              <div key={m.label} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && (
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background: "var(--neon-cyan)",
                      opacity: 0.4,
                      margin: "0 1.5rem",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.15rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-orbitron)",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "var(--neon-cyan)",
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            flex: "1 1 38%",
            minWidth: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Pulsing radial glow behind logo */}
          <motion.div
            animate={{
              scale: [0.95, 1.05, 0.95],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, rgba(180, 79, 255, 0.1) 50%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Floating logo */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ position: "relative", width: "320px", height: "320px" }}
          >
            <Image
              src="/logo.png"
              alt="Uribasoft logo"
              fill
              style={{ objectFit: "contain", borderRadius: 15 }}
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-share-tech-mono)",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.2em",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} color="var(--neon-cyan)" />
        </motion.div>
      </motion.div>
    </section>
  );
}