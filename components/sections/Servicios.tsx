"use client";

import { motion } from "framer-motion";
import { Heart, Server, Monitor, Cpu, Cloud, LayoutDashboard } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";

/* ── Services data ── */
const SERVICES = [
  {
    icon: Heart,
    title: "Sistemas Clínicos y de Salud",
    description:
      "Plataformas de internación domiciliaria, gestión clínica, trazabilidad de visitas y scoring NEWS2.",
    tag: "Healthcare",
    iconColor: "var(--neon-magenta)",
  },
  {
    icon: Server,
    title: "Backends Enterprise",
    description:
      "APIs REST robustas con Spring Boot / Node.js, arquitectura modular, multi-tenant, JWT y migraciones Flyway.",
    tag: "Backend",
    iconColor: "var(--neon-cyan)",
  },
  {
    icon: Monitor,
    title: "Frontends Modernos",
    description:
      "Interfaces React y Next.js con diseño de producto, dashboards operativos y paneles administrativos.",
    tag: "Frontend",
    iconColor: "var(--neon-purple)",
  },
  {
    icon: Cpu,
    title: "Agentes IA Supervisados",
    description:
      "Integración de LLMs con control humano en el loop: scoring automático, recomendaciones clínicas y análisis predictivo.",
    tag: "AI/ML",
    iconColor: "var(--neon-orange)",
  },
  {
    icon: Cloud,
    title: "Infraestructura y DevOps",
    description:
      "CI/CD con GitHub Actions, containerización Docker, deploy en Railway/Vercel, ambientes de dev y prod separados.",
    tag: "DevOps",
    iconColor: "var(--neon-cyan)",
  },
  {
    icon: LayoutDashboard,
    title: "Consultoría de Arquitectura",
    description:
      "Diseño de sistemas desde cero: modelo de datos, definición de stack, arquitectura de microservicios y estándares de calidad.",
    tag: "Architecture",
    iconColor: "var(--neon-magenta)",
  },
];

export default function Servicios() {
  return (
    <section
      id="servicios"
      style={{
        padding: "100px 2rem",
        background: "var(--bg-mid)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionHeader comment="SERVICIOS" title="Qué construimos" />

        {/* ── Services grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                tag={service.tag}
                iconColor={service.iconColor}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Responsive breakpoints ── */}
      <style>{`
        @media (max-width: 1024px) {
          #servicios > div > div:last-of-type {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #servicios > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}