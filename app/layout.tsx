import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  weight: "400",
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start",
  weight: "400",
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.ico",
  },
  title: "Uribasoft — Software de Calidad para el Futuro",
  description:
    "Empresa de desarrollo de soluciones tecnológicas para cualquier industria. Estándares internacionales, entrega rápida con IA supervisada.",
  openGraph: {
    title: "Uribasoft — Software de Calidad para el Futuro",
    description:
      "Empresa de desarrollo de soluciones tecnológicas para cualquier industria. Estándares internacionales, entrega rápida con IA supervisada.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uribasoft — Software de Calidad para el Futuro",
    description:
      "Empresa de desarrollo de soluciones tecnológicas para cualquier industria.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} ${pressStart2P.variable}`}
    >
      <body className="font-[var(--font-rajdhani)] tracking-[0.02em] antialiased">
        {children}
      </body>
    </html>
  );
}