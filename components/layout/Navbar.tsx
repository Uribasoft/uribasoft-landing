"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Stack", href: "#tecnologia" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* Scroll progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 2,
          width: `${scrollProgress}%`,
          background:
            "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta), var(--neon-orange), var(--neon-purple))",
          zIndex: 200,
          transition: "width 0.1s linear",
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          background: "rgba(11, 13, 42, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-neon)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo + Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div className="navbar-logo-glow">
              <Image
                src="/logo.png"
                alt="Uribasoft logo"
                width={40}
                height={40}
                priority
                style={{ borderRadius: 12 }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-orbitron)",
                fontWeight: 700,
                fontSize: 20,
                color: "var(--text-primary)",
                letterSpacing: 1,
              }}
            >
              Uribasoft
            </span>
          </a>

          {/* Desktop nav links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
            }}
            className="navbar-desktop-links"
          >
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="navbar-link"
                  data-active={isActive || undefined}
                  style={{
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 600,
                    fontSize: 14,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    textDecoration: "none",
                    color: isActive
                      ? "var(--neon-cyan)"
                      : "var(--text-secondary)",
                    position: "relative",
                    padding: "4px 0",
                    transition: "color 0.25s ease",
                    ...(isActive
                      ? {
                          textShadow: "0 0 8px rgba(0, 245, 255, 0.6)",
                        }
                      : {}),
                  }}
                >
                  {link.label}
                </a>
              );
            })}

            {/* CTA Button */}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, "#contacto")}
              className="navbar-cta"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textDecoration: "none",
                padding: "8px 20px",
                border: "1px solid var(--neon-cyan)",
                borderRadius: 6,
                color: "var(--neon-cyan)",
                background: "transparent",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              Contactanos
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              zIndex: 110,
            }}
          >
            <span
              style={{
                display: "block",
                width: 26,
                height: 2,
                background: "var(--neon-cyan)",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? "rotate(45deg) translateY(7px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 26,
                height: 2,
                background: "var(--neon-cyan)",
                borderRadius: 2,
                transition: "all 0.3s ease",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 26,
                height: 2,
                background: "var(--neon-cyan)",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? "rotate(-45deg) translateY(-7px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "rgba(11, 13, 42, 0.97)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {NAV_LINKS.map((link, i) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  style={{
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 700,
                    fontSize: 28,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    textDecoration: "none",
                    color: isActive
                      ? "var(--neon-cyan)"
                      : "var(--text-primary)",
                    textShadow: isActive
                      ? "0 0 12px rgba(0, 245, 255, 0.7)"
                      : "none",
                    transition: "color 0.25s ease",
                  }}
                >
                  {link.label}
                </motion.a>
              );
            })}

            <motion.a
              href="#contacto"
              onClick={(e) => handleNavClick(e, "#contacto")}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              style={{
                marginTop: 16,
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
                fontSize: 20,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textDecoration: "none",
                padding: "12px 32px",
                border: "1px solid var(--neon-cyan)",
                borderRadius: 6,
                color: "var(--neon-cyan)",
                background: "transparent",
              }}
            >
              Contactanos
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scoped styles */}
      <style jsx global>{`
        .navbar-desktop-links {
          display: flex !important;
        }
        .navbar-hamburger {
          display: none !important;
        }

        .navbar-link:hover {
          color: var(--neon-cyan) !important;
        }
        .navbar-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: var(--neon-cyan);
          box-shadow: 0 0 6px rgba(0, 245, 255, 0.5);
          transition: width 0.3s ease;
        }
        .navbar-link:hover::after,
        .navbar-link[data-active]::after {
          width: 100%;
        }

        .navbar-cta:hover {
          background: var(--neon-cyan) !important;
          color: var(--bg-deep) !important;
          box-shadow: 0 0 16px rgba(0, 245, 255, 0.4);
        }

        .navbar-logo-glow {
          display: flex;
          align-items: center;
          transition: filter 0.3s ease;
        }
        .navbar-logo-glow:hover {
          filter: drop-shadow(0 0 10px rgba(0, 245, 255, 0.7))
            drop-shadow(0 0 20px rgba(0, 245, 255, 0.3));
        }

        @media (max-width: 768px) {
          .navbar-desktop-links {
            display: none !important;
          }
          .navbar-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}