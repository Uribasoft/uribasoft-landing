"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

const HOLD_DURATION_MS = 2000;
const TICK_MS = 16;
const BLOCK_COUNT = 20;

export function CustomCaptchaWithReset({
  onVerified,
  resetKey,
}: {
  onVerified: () => void;
  resetKey: number;
}) {
  const [progress, setProgress] = useState(0);
  const [verified, setVerified] = useState(false);
  const [holding, setHolding] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  const clearHoldInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Reset when resetKey changes
  useEffect(() => {
    clearHoldInterval();
    setVerified(false);
    setHolding(false);
    progressRef.current = 0;
    setProgress(0);
  }, [resetKey, clearHoldInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearHoldInterval();
  }, [clearHoldInterval]);

  const startHold = useCallback(() => {
    if (verified) return;
    setHolding(true);

    intervalRef.current = setInterval(() => {
      progressRef.current = Math.min(
        progressRef.current + (TICK_MS / HOLD_DURATION_MS) * 100,
        100
      );
      setProgress(progressRef.current);

      if (progressRef.current >= 100) {
        clearHoldInterval();
        setVerified(true);
        setHolding(false);
        onVerified();
      }
    }, TICK_MS);
  }, [verified, onVerified, clearHoldInterval]);

  const stopHold = useCallback(() => {
    if (verified) return;
    clearHoldInterval();
    setHolding(false);
    progressRef.current = 0;
    setProgress(0);
  }, [verified, clearHoldInterval]);

  /* ── Derived styles ── */
  const borderColor = verified
    ? "#00FF88"
    : holding
      ? "var(--neon-cyan)"
      : "var(--border-neon)";

  const boxShadow = verified
    ? "0 0 12px rgba(0, 255, 136, 0.2)"
    : holding
      ? "0 0 12px rgba(0, 245, 255, 0.2)"
      : "none";

  const textColor = verified
    ? "#00FF88"
    : holding
      ? "var(--neon-cyan)"
      : "var(--text-secondary)";

  const textShadow = verified
    ? "0 0 8px rgba(0, 255, 136, 0.5)"
    : holding
      ? "0 0 8px rgba(0, 245, 255, 0.4)"
      : "none";

  const filledBlocks = Math.floor(progress / (100 / BLOCK_COUNT));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {/* Status label */}
      <span
        style={{
          fontFamily: "var(--font-share-tech-mono)",
          fontSize: "0.7rem",
          color: verified ? "#00FF88" : "var(--text-muted)",
          letterSpacing: "0.05em",
          transition: "color 0.3s ease",
        }}
      >
        {verified
          ? "> VERIFICACIÓN COMPLETA ✓"
          : holding
            ? "> VERIFICANDO..."
            : "> MANTENÉ PRESIONADO PARA VERIFICAR"}
      </span>

      {/* Hold-to-verify button */}
      <button
        type="button"
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
        onTouchCancel={stopHold}
        disabled={verified}
        style={{
          position: "relative",
          width: "100%",
          height: 48,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor,
          borderRadius: "4px",
          background: "rgba(0, 0, 0, 0.3)",
          cursor: verified ? "default" : "pointer",
          overflow: "hidden",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow,
          outline: "none",
        }}
      >
        {/* Gradient fill behind blocks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${progress}%`,
            background: verified
              ? "linear-gradient(90deg, rgba(0, 255, 136, 0.25), rgba(0, 255, 136, 0.15))"
              : "linear-gradient(90deg, rgba(0, 245, 255, 0.2), rgba(0, 255, 136, 0.2))",
            transition: verified ? "none" : "width 0.05s linear",
            pointerEvents: "none",
          }}
        />

        {/* Pixel-art progress blocks */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            gap: 2,
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "50%",
                background:
                  i < filledBlocks
                    ? verified
                      ? "#00FF88"
                      : `hsl(${183 - (i / (BLOCK_COUNT - 1)) * 31}, 100%, 50%)`
                    : "rgba(255,255,255,0.04)",
                opacity: i < filledBlocks ? (verified ? 0.7 : 0.5) : 1,
                borderRadius: "1px",
                transition: "background 0.06s ease",
              }}
            />
          ))}
        </div>

        {/* Center label */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            height: "100%",
            fontFamily: "var(--font-share-tech-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: textColor,
            textShadow,
            transition: "color 0.2s ease, text-shadow 0.2s ease",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          <ShieldCheck
            size={16}
            style={{
              opacity: verified ? 1 : 0.6,
              transition: "opacity 0.3s ease",
            }}
          />
          {verified
            ? "HUMANO VERIFICADO"
            : holding
              ? `[${"█".repeat(filledBlocks)}${"░".repeat(BLOCK_COUNT - filledBlocks)}]`
              : "MANTENER PRESIONADO"}
        </div>
      </button>
    </div>
  );
}
