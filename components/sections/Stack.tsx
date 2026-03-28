"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import TechTag from "@/components/ui/TechTag";

/* ── Tech categories data ── */
const TECH_CATEGORIES = [
  {
    label: "BACKEND",
    color: "var(--neon-cyan)",
    items: ["Java 21", "Spring Boot 3", "PostgreSQL 16", "Flyway", "JWT", "AWS S3"],
  },
  {
    label: "FRONTEND",
    color: "var(--neon-magenta)",
    items: ["React", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "DEVOPS / INFRA",
    color: "var(--neon-orange)",
    items: ["Docker", "GitHub Actions", "Railway", "Vercel", "Cloudflare"],
  },
  {
    label: "AI / TOOLS",
    color: "var(--neon-purple)",
    items: ["OpenAI API", "LangChain", "Cursor", "Claude", "Prompt Engineering"],
  },
];

/* ── Terminal lines ── */
const TERMINAL_LINES = [
  "> initializing uribasoft.core...",
  "> loading modules: [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591] 80%",
  "> standards: ISO 9001 \u2713",
  "> ai_supervisor: ACTIVE",
  "> deploying to production...",
  "> status: ONLINE \u2713",
];

/* ── Typewriter hook ── */
function useTypewriter(lines: string[], isInView: boolean) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  const reset = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLine(0);
    setCurrentChar(0);
    setDone(false);
    startedRef.current = false;
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (startedRef.current) return;
    startedRef.current = true;
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  useEffect(() => {
    if (!startedRef.current || done) return;
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      // Line complete, move to next
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines, done]);

  const typingLine =
    !done && currentLine < lines.length
      ? lines[currentLine].slice(0, currentChar)
      : null;

  return { displayedLines, typingLine, done };
}

/* ── Compute sequential index offset per category ── */
function getCategoryOffset(catIndex: number): number {
  let offset = 0;
  for (let i = 0; i < catIndex; i++) {
    offset += TECH_CATEGORIES[i].items.length;
  }
  return offset;
}

export default function Stack() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: "-100px" });
  const { displayedLines, typingLine, done } = useTypewriter(TERMINAL_LINES, isInView);

  return (
    <section
      id="tecnologia"
      style={{
        padding: "100px 2rem",
        background: "var(--bg-deep)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionHeader comment="STACK" title="Tecnolog\u00edas que dominamos" />

        {/* ── Two-column layout ── */}
        <div
          className="stack-columns"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          {/* ── LEFT: Tech categories ── */}
          <div
            style={{
              flex: "1 1 50%",
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {TECH_CATEGORIES.map((cat, catIndex) => {
              const offset = getCategoryOffset(catIndex);
              return (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: catIndex * 0.1,
                    ease: "easeOut",
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {/* Category label */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3px",
                        height: "18px",
                        background: cat.color,
                        borderRadius: "2px",
                        boxShadow: `0 0 8px ${cat.color}`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-orbitron)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: cat.color,
                        letterSpacing: "0.12em",
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>

                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    {cat.items.map((item, itemIndex) => (
                      <TechTag
                        key={item}
                        name={item}
                        index={offset + itemIndex}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── RIGHT: Terminal panel ── */}
          <div
            ref={terminalRef}
            style={{
              flex: "1 1 42%",
              minWidth: "300px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              style={{
                background: "#080A1A",
                border: "1px solid var(--neon-cyan)",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 0 20px rgba(0, 245, 255, 0.1)",
              }}
            >
              {/* Terminal top bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  borderBottom: "1px solid rgba(0, 245, 255, 0.15)",
                  background: "rgba(0, 0, 0, 0.3)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#FF5F57",
                    }}
                  />
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#FFBD2E",
                    }}
                  />
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#28CA41",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-share-tech-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    marginLeft: "0.5rem",
                  }}
                >
                  uribasoft.terminal
                </span>
              </div>

              {/* Terminal content */}
              <div
                style={{
                  padding: "1.25rem",
                  fontFamily: "var(--font-share-tech-mono)",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  minHeight: "240px",
                }}
              >
                {/* Already typed lines */}
                {displayedLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      color: line.includes("\u2713")
                        ? "#28CA41"
                        : line.includes("ACTIVE") || line.includes("ONLINE")
                          ? "var(--neon-cyan)"
                          : "var(--neon-cyan)",
                      opacity: 0.9,
                    }}
                  >
                    {line}
                  </div>
                ))}

                {/* Currently typing line */}
                {typingLine !== null && (
                  <div
                    style={{
                      color: "var(--neon-cyan)",
                    }}
                  >
                    {typingLine}
                    <span
                      className="terminal-cursor"
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "1.1em",
                        background: "var(--neon-cyan)",
                        marginLeft: "2px",
                        verticalAlign: "text-bottom",
                      }}
                    />
                  </div>
                )}

                {/* Blinking cursor after all lines done */}
                {done && (
                  <div>
                    <span
                      className="terminal-cursor"
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "1.1em",
                        background: "var(--neon-cyan)",
                        verticalAlign: "text-bottom",
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Blinking cursor animation + responsive ── */}
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .terminal-cursor {
          animation: blink 1s step-end infinite;
        }
        @media (max-width: 768px) {
          .stack-columns {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}