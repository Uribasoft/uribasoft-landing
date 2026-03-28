"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ExternalLink, Copy, Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { CustomCaptchaWithReset } from "@/components/ui/CustomCaptcha";

/* ── Zod schema ── */
const contactSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  empresa: z.string().optional(),
  asunto: z.string().min(1, "Seleccioná un asunto"),
  mensaje: z.string().min(10, "Mínimo 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ASUNTO_OPTIONS = [
  "Desarrollo a medida",
  "Consultoría de arquitectura",
  "Integración de IA",
  "Infraestructura y DevOps",
  "Otro",
];

/* ── Contact info items ── */
const CONTACTS = [
  { type: "email" as const, value: "gcancellieri@uribasoft.com" },
  { type: "email" as const, value: "fjournade@uribasoft.com" },
  { type: "github" as const, value: "github.com/uribasoft", href: "https://github.com/uribasoft" },
];

/* ── Shared input styles ── */
const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  fontFamily: "var(--font-rajdhani)",
  fontSize: "1rem",
  color: "var(--text-primary)",
  background: "rgba(0,0,0,0.3)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "var(--border-neon)",
  borderRadius: "4px",
  outline: "none",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-rajdhani)",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "var(--text-secondary)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "0.4rem",
  display: "block",
};

const errorStyle: React.CSSProperties = {
  fontFamily: "var(--font-share-tech-mono)",
  fontSize: "0.7rem",
  color: "#FF4466",
  marginTop: "0.3rem",
};

export default function Contacto() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "all",
  });

  const watchedFields = watch(["nombre", "email", "asunto", "mensaje"]);
  const requiredFieldsFilled = watchedFields.every((v) => v && v.length > 0);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitStatus("success");
      reset();
      setCaptchaVerified(false);
      setCaptchaResetKey((k) => k + 1);
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }
  };

  const handleCopy = async (email: string) => {
    await navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--neon-cyan)";
    e.target.style.boxShadow = "0 0 10px rgba(0, 245, 255, 0.2)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--border-neon)";
    e.target.style.boxShadow = "none";
  };

  const getErrorBorderStyle = (fieldName: keyof ContactFormData): React.CSSProperties =>
    errors[fieldName]
      ? { borderColor: "#FF4466", boxShadow: "0 0 8px rgba(255, 68, 102, 0.3)" }
      : {};

  /* ── Submit button styles by status ── */
  const submitButtonStyles: Record<string, React.CSSProperties> = {
    idle: {
      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta))",
      color: "var(--bg-deep)",
    },
    loading: {
      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta))",
      color: "var(--bg-deep)",
      opacity: 0.7,
    },
    success: {
      background: "#00FF88",
      color: "var(--bg-deep)",
    },
    error: {
      background: "#FF4466",
      color: "#fff",
    },
  };

  const submitLabels: Record<string, string> = {
    idle: "ENVIAR MENSAJE",
    loading: "ENVIANDO...",
    success: "MENSAJE ENVIADO \u2713",
    error: "ERROR \u2014 REINTENTAR",
  };

  return (
    <section
      id="contacto"
      style={{
        padding: "100px 2rem",
        background: "var(--bg-mid)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionHeader comment="CONTACTO" title="Trabajemos juntos" />

        {/* ── Intro text ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto 3rem",
            lineHeight: 1.6,
          }}
        >
          ¿Tenés un proyecto en mente? Contanos de qué se trata. Respondemos en
          menos de 24 horas.
        </motion.p>

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* ── LEFT COLUMN: Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              paddingTop: "1rem",
            }}
          >
            {CONTACTS.map((contact) => (
              <div
                key={contact.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: contact.type === "email" ? "pointer" : "default",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--neon-cyan)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
                onClick={() =>
                  contact.type === "email" && handleCopy(contact.value)
                }
              >
                {contact.type === "email" ? (
                  <Mail size={18} style={{ color: "inherit", flexShrink: 0 }} />
                ) : (
                  <ExternalLink size={18} style={{ color: "inherit", flexShrink: 0 }} />
                )}
                {contact.type === "github" ? (
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontSize: "1rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {contact.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontSize: "1rem",
                      color: "inherit",
                    }}
                  >
                    {contact.value}
                  </span>
                )}
                {contact.type === "email" && (
                  <span style={{ marginLeft: "auto", flexShrink: 0 }}>
                    {copiedEmail === contact.value ? (
                      <Check size={14} style={{ color: "#00FF88" }} />
                    ) : (
                      <Copy size={14} style={{ color: "var(--text-muted)", opacity: 0.6 }} />
                    )}
                  </span>
                )}
              </div>
            ))}

            <div
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-share-tech-mono)",
                fontSize: "0.75rem",
                color: "var(--neon-cyan)",
                letterSpacing: "0.05em",
              }}
            >
              [ TIEMPO DE RESPUESTA PROMEDIO: &lt; 24H ]
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Form ── */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-neon)",
              borderRadius: "8px",
              padding: "2rem",
              boxShadow: "0 0 20px rgba(0, 245, 255, 0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Nombre */}
            <div>
              <label style={labelStyle}>Nombre completo *</label>
              <input
                {...register("nombre")}
                placeholder="Tu nombre"
                style={{
                  ...inputBaseStyle,
                  ...getErrorBorderStyle("nombre"),
                }}
                onFocus={handleFocus}
                onBlur={(e) => {
                  handleBlur(e);
                  register("nombre").onBlur(e);
                }}
              />
              {errors.nombre && (
                <p style={errorStyle}>{errors.nombre.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email *</label>
              <input
                {...register("email")}
                type="email"
                placeholder="tu@email.com"
                style={{
                  ...inputBaseStyle,
                  ...getErrorBorderStyle("email"),
                }}
                onFocus={handleFocus}
                onBlur={(e) => {
                  handleBlur(e);
                  register("email").onBlur(e);
                }}
              />
              {errors.email && (
                <p style={errorStyle}>{errors.email.message}</p>
              )}
            </div>

            {/* Empresa */}
            <div>
              <label style={labelStyle}>Empresa</label>
              <input
                {...register("empresa")}
                placeholder="Nombre de tu empresa (opcional)"
                style={inputBaseStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Asunto */}
            <div>
              <label style={labelStyle}>Asunto *</label>
              <select
                {...register("asunto")}
                defaultValue=""
                style={{
                  ...inputBaseStyle,
                  ...getErrorBorderStyle("asunto"),
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238A8FCC' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  paddingRight: "2.5rem",
                  cursor: "pointer",
                }}
                onFocus={handleFocus as any}
                onBlur={(e) => {
                  (handleBlur as any)(e);
                  register("asunto").onBlur(e);
                }}
              >
                <option value="" disabled style={{ color: "var(--text-muted)" }}>
                  Seleccioná un asunto
                </option>
                {ASUNTO_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.asunto && (
                <p style={errorStyle}>{errors.asunto.message}</p>
              )}
            </div>

            {/* Mensaje */}
            <div>
              <label style={labelStyle}>Mensaje *</label>
              <textarea
                {...register("mensaje")}
                placeholder="Contanos sobre tu proyecto..."
                rows={4}
                style={{
                  ...inputBaseStyle,
                  ...getErrorBorderStyle("mensaje"),
                  resize: "vertical",
                  minHeight: "100px",
                }}
                onFocus={handleFocus as any}
                onBlur={(e) => {
                  (handleBlur as any)(e);
                  register("mensaje").onBlur(e);
                }}
              />
              {errors.mensaje && (
                <p style={errorStyle}>{errors.mensaje.message}</p>
              )}
            </div>

            {/* Captcha */}
            <CustomCaptchaWithReset
              onVerified={() => setCaptchaVerified(true)}
              resetKey={captchaResetKey}
            />

            {/* Submit */}
            <div>
              <motion.button
                type="submit"
                disabled={!requiredFieldsFilled || !isValid || !captchaVerified || submitStatus === "loading" || submitStatus === "success"}
                className="pixel-border"
                whileHover={
                  requiredFieldsFilled && isValid && captchaVerified && submitStatus === "idle"
                    ? {
                        boxShadow:
                          "0 0 15px rgba(0, 245, 255, 0.5), 0 0 30px rgba(255, 45, 120, 0.3)",
                        transform: "translateY(-2px)",
                      }
                    : undefined
                }
                whileTap={requiredFieldsFilled && isValid && captchaVerified && submitStatus === "idle" ? { scale: 0.97 } : undefined}
                style={{
                  width: "100%",
                  padding: "0.9rem 1.75rem",
                  fontFamily: "var(--font-orbitron)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  border: "none",
                  borderRadius: "4px",
                  cursor:
                    !requiredFieldsFilled || !isValid || !captchaVerified || submitStatus === "loading" || submitStatus === "success"
                      ? "not-allowed"
                      : "pointer",
                  opacity: (!requiredFieldsFilled || !isValid || !captchaVerified) && submitStatus === "idle" ? 0.4 : 1,
                  transition: "all 0.3s ease",
                  ...submitButtonStyles[submitStatus],
                }}
              >
                {submitLabels[submitStatus]}
              </motion.button>
              {(!requiredFieldsFilled || !isValid) && submitStatus === "idle" && (
                <p
                  style={{
                    fontFamily: "var(--font-share-tech-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    marginTop: "0.5rem",
                    textAlign: "center",
                    letterSpacing: "0.03em",
                  }}
                >
                  * Completá todos los campos obligatorios para enviar.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>

      {/* ── Responsive breakpoints ── */}
      <style>{`
        @media (max-width: 768px) {
          #contacto > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
        #contacto input::placeholder,
        #contacto textarea::placeholder,
        #contacto select option[value=""][disabled] {
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}