"use client";

import { motion } from "framer-motion";
import { Shield, Cpu, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamCard from "@/components/ui/TeamCard";

/* ── Values data ── */
const VALUES = [
  {
    icon: Shield,
    label: "Estándares Internacionales",
    description: "Cada línea de código sigue las mejores prácticas globales de arquitectura, testing y seguridad.",
    color: "var(--neon-cyan)",
    glow: "0 0 12px rgba(0, 245, 255, 0.4)",
  },
  {
    icon: Cpu,
    label: "IA Supervisada",
    description: "Agentes de inteligencia artificial aceleran nuestro flujo sin comprometer la calidad humana.",
    color: "var(--neon-magenta)",
    glow: "0 0 12px rgba(255, 45, 120, 0.4)",
  },
  {
    icon: Zap,
    label: "Entrega Continua",
    description: "Iteraciones rápidas con CI/CD robusto para que cada release llegue sin fricciones.",
    color: "var(--neon-orange)",
    glow: "0 0 12px rgba(255, 107, 26, 0.4)",
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      style={{
        padding: "100px 2rem 20px",
        background: "var(--bg-mid)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionHeader comment="NOSOTROS" title="Quiénes Somos" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {/* ── Top block: text ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Description */}
            <motion.p
              {...fadeUp(0.1)}
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              Somos una empresa premium de desarrollo de software obsesionada con la
              calidad y los estándares internacionales. Integramos agentes de IA
              supervisados para acelerar cada entrega sin comprometer el rigor técnico
              que nos define. Construimos soluciones robustas, escalables y preparadas
              para el futuro de cualquier industria.
            </motion.p>

            {/* Tagline */}
            <motion.p
              {...fadeUp(0.2)}
              className="gradient-text-cyan-orange"
              style={{
                fontFamily: "var(--font-orbitron)",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                margin: 0,
              }}
            >
              Código de calidad. Velocidad del futuro.
            </motion.p>

            {/* Values row */}
            <motion.div
              {...fadeUp(0.35)}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.label}
                    style={{
                      flex: "1 1 200px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    <Icon
                      size={28}
                      color={v.color}
                      style={{ filter: `drop-shadow(${v.glow})` }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-orbitron)",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        color: "var(--text-primary)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {v.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {v.description}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Bottom row: team cards ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              alignItems: "stretch",
            }}
          >
            <div style={{ flex: "1 1 360px", minWidth: "280px" }}>
              <TeamCard
                name="Gabriel Cancellieri"
                role="Co-Founder & Backend Engineer"
                avatar="/gcancellieri.png"
                tags={["Java", "Spring Boot", "PostgreSQL", "AWS"]}
                accentColor="cyan"
                slideFrom="left"
              />
            </div>
            <div style={{ flex: "1 1 360px", minWidth: "280px" }}>
              <TeamCard
                name="Facundo Journade"
                role="Co-Founder & Frontend Engineer"
                avatar="/fjournade.png"
                tags={["React", "Next.js", "TypeScript", "Node.js"]}
                accentColor="magenta"
                slideFrom="right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
