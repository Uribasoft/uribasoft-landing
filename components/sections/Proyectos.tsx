"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

/* ── Tag colors ── */
const TAG_COLORS: Record<string, string> = {
  Healthcare: "var(--neon-magenta)",
  Java: "var(--neon-orange)",
  "Spring Boot": "var(--neon-orange)",
  React: "var(--neon-cyan)",
  "Multi-tenant": "var(--neon-purple)",
  "AI/ML": "var(--neon-orange)",
  Internal: "var(--neon-purple)",
  TypeScript: "var(--neon-cyan)",
  "Next.js": "var(--neon-cyan)",
};

/* ── Project data ── */
const PROJECTS = [
  {
    id: "uribasalud",
    visualBg: "linear-gradient(135deg, #075B5E, #0A7F83)",
    visualLabel: "UribaSalud",
    visualIcon: "❤",
    visualGlow: "var(--neon-orange)",
    title: "UribaSalud",
    subtitle: "Plataforma de Internación Domiciliaria",
    description:
      "Sistema integral para la gestión clínica y operativa de programas de HaD: visitas con geofencing, score NEWS2, facturación automática y arquitectura multi-tenant.",
    tags: ["Healthcare", "Java", "Spring Boot", "React", "Multi-tenant"],
    cta: { label: "Ver caso de uso →", href: "#", enabled: true },
  },
  {
    id: "plataforma-interna",
    visualBg: "linear-gradient(135deg, #0A0C20, #12153A)",
    visualLabel: "</>",
    visualIcon: null,
    visualGlow: "var(--neon-purple)",
    title: "Plataforma Interna",
    subtitle: "Agentes IA para Desarrollo Acelerado",
    description:
      "Herramientas internas para acelerar el desarrollo con agentes supervisados: generación de código, revisión de PRs, testing automatizado y documentación continua.",
    tags: ["AI/ML", "Internal", "TypeScript", "Next.js"],
    cta: { label: "Próximamente →", href: undefined, enabled: false },
  },
];

export default function Proyectos() {
  return (
    <section
      id="proyectos"
      style={{
        padding: "100px 2rem",
        background: "var(--bg-deep)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionHeader comment="PROYECTOS" title="Lo que construimos" />

        {/* ── Projects grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 25px rgba(0, 245, 255, 0.2), 0 0 50px rgba(0, 245, 255, 0.05)",
              }}
              style={{
                minHeight: "420px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-neon)",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.3s ease",
                cursor: "default",
              }}
            >
              {/* ── Top visual area ── */}
              <div
                style={{
                  height: "200px",
                  background: project.visualBg,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {project.visualIcon && (
                  <span
                    style={{
                      fontSize: "2rem",
                      filter: `drop-shadow(0 0 12px ${project.visualGlow})`,
                    }}
                  >
                    {project.visualIcon}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: "var(--font-press-start)",
                    fontSize: project.visualIcon ? "0.7rem" : "1.5rem",
                    color: "var(--text-primary)",
                    textShadow: `0 0 20px ${project.visualGlow}, 0 0 40px ${project.visualGlow}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  {project.visualLabel}
                </span>
                {/* Subtle scanline overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* ── Bottom content area ── */}
              <div
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-orbitron)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-orbitron)",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                    letterSpacing: "0.03em",
                  }}
                >
                  {project.subtitle}
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-rajdhani)",
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </p>

                {/* ── Tags ── */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginTop: "auto",
                    paddingTop: "0.5rem",
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-share-tech-mono)",
                        fontSize: "0.7rem",
                        color: TAG_COLORS[tag] || "var(--neon-cyan)",
                        border: `1px solid ${TAG_COLORS[tag] || "var(--neon-cyan)"}`,
                        borderRadius: "4px",
                        padding: "0.2rem 0.6rem",
                        letterSpacing: "0.05em",
                        background: `${TAG_COLORS[tag] || "var(--neon-cyan)"}15`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ── CTA ── */}
                <div style={{ marginTop: "0.5rem" }}>
                  {project.cta.enabled ? (
                    <a
                      href={project.cta.href}
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--neon-cyan)",
                        textDecoration: "none",
                        letterSpacing: "0.03em",
                        transition: "text-shadow 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.textShadow =
                          "0 0 10px rgba(0, 245, 255, 0.6)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.textShadow = "none")
                      }
                    >
                      {project.cta.label}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        letterSpacing: "0.03em",
                        cursor: "not-allowed",
                      }}
                    >
                      {project.cta.label}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Responsive breakpoints ── */}
      <style>{`
        @media (max-width: 768px) {
          #proyectos > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}