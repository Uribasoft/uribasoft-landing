"use client";

import Image from "next/image";

const FOOTER_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-deep)",
        borderTop: "1px solid var(--neon-cyan)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Logo + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/logo.png" alt="Uribasoft logo" width={28} height={28} />
          <span
            style={{
              fontFamily: "var(--font-orbitron)",
              fontWeight: 700,
              fontSize: 16,
              color: "var(--text-primary)",
              letterSpacing: 1,
            }}
          >
            Uribasoft
          </span>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: 14,
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          &copy; 2026 Uribasoft &mdash; Todos los derechos reservados
        </p>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                fontSize: 14,
                color: "var(--text-secondary)",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--neon-cyan)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-share-tech-mono)",
            fontSize: 12,
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          Hecho con &hearts; + IA supervisada en Neuqu&eacute;n, Argentina
        </p>
      </div>

      {/* Bottom decorative gradient line */}
      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta), var(--neon-orange), var(--neon-purple))",
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            gap: 20px !important;
          }
        }
      `}</style>
    </footer>
  );
}