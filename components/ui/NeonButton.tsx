"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface NeonButtonProps {
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  loading?: boolean;
}

export default function NeonButton({
  variant = "primary",
  href,
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  loading = false,
}: NeonButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.75rem",
    fontFamily: "var(--font-orbitron)",
    fontWeight: 600,
    fontSize: "0.875rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    borderRadius: "4px",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta))",
      color: "var(--bg-deep)",
      border: "none",
    },
    secondary: {
      background: "transparent",
      color: "var(--neon-purple)",
      border: "2px solid var(--neon-purple)",
    },
    outline: {
      background: "transparent",
      color: "var(--neon-cyan)",
      border: "2px solid var(--neon-cyan)",
    },
  };

  const hoverVariants: Record<string, Record<string, React.CSSProperties>> = {
    primary: {
      hover: {
        boxShadow:
          "0 0 15px rgba(0, 245, 255, 0.5), 0 0 30px rgba(255, 45, 120, 0.3)",
        transform: "translateY(-2px)",
      },
    },
    secondary: {
      hover: {
        backgroundColor: "rgba(180, 79, 255, 0.15)",
        transform: "translateY(-2px)",
      },
    },
    outline: {
      hover: {
        backgroundColor: "var(--neon-cyan)",
        color: "var(--bg-deep)",
        transform: "translateY(-2px)",
      },
    },
  };

  const combinedStyle = { ...baseStyles, ...variantStyles[variant] };
  const pixelBorderClass = variant === "primary" ? "pixel-border" : "";

  const content = loading ? (
    <>
      <span
        style={{
          width: "1rem",
          height: "1rem",
          border: "2px solid currentColor",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.6s linear infinite",
        }}
      />
      Cargando...
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${pixelBorderClass} ${className}`}
        style={combinedStyle}
        whileHover={
          !disabled && !loading ? (hoverVariants[variant].hover as any) : undefined
        }
        whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
        onClick={(e) => {
          if (href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: "smooth" });
          }
          onClick?.();
        }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${pixelBorderClass} ${className}`}
      style={combinedStyle}
      whileHover={
        !disabled && !loading ? (hoverVariants[variant].hover as any) : undefined
      }
      whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </motion.button>
  );
}