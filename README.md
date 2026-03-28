<div align="center">

# `< URIBASOFT />`

### Landing Page

**Software de Calidad para el Futuro**

[![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-Proprietary-8A8FCC)](#licencia)

---

*Single Page Application con estilo **Synthwave + Pixel Art**, smooth scroll,*
*animaciones cinematicas y formulario de contacto funcional.*

</div>

---

## Tabla de Contenidos

- [Sobre el Proyecto](#sobre-el-proyecto)
- [Stack Tecnico](#stack-tecnico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalacion](#instalacion)
- [Variables de Entorno](#variables-de-entorno)
- [Desarrollo Local](#desarrollo-local)
- [Build de Produccion](#build-de-produccion)
- [Secciones de la Landing](#secciones-de-la-landing)
- [Identidad Visual](#identidad-visual)
- [Formulario de Contacto](#formulario-de-contacto)
- [Equipo](#equipo)
- [Licencia](#licencia)

---

## Sobre el Proyecto

**Uribasoft** es una empresa de desarrollo de software que crea soluciones de calidad para todo tipo de industria, basandose en estandares internacionales y acortando tiempos con agentes de IA supervisados.

Esta landing page es la carta de presentacion digital de Uribasoft: una SPA con navegacion fluida, efectos neon, grid perspectivo synthwave, tipografia pixel art y un formulario de contacto completamente funcional que envia emails reales.

> *"Codigo de calidad. Velocidad del futuro."*

---

## Stack Tecnico

| Categoria | Tecnologia | Proposito |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | SSR, routing, API routes |
| **Lenguaje** | TypeScript (strict) | Tipado estatico |
| **Estilos** | Tailwind CSS v4 + CSS Custom Properties | Utilidades + variables neon |
| **Animaciones** | Framer Motion | Scroll animations, hover states, transitions |
| **Fuentes** | Google Fonts via `next/font` | Press Start 2P, Orbitron, Rajdhani, Share Tech Mono |
| **Formulario** | React Hook Form + Zod | Validacion client-side con schema |
| **Email** | Resend | Envio de emails transaccionales |
| **Iconos** | lucide-react | Iconografia consistente |

> **Nota:** No se utilizan librerias de componentes UI (shadcn, Material UI, Chakra, Bootstrap). Todo es custom.

---

## Estructura del Proyecto

```
uribasoft-landing/
├── app/
│   ├── layout.tsx                 # Root layout: fuentes, metadata, globals
│   ├── page.tsx                   # Pagina principal (importa todas las secciones)
│   ├── globals.css                # CSS variables, reset, efectos globales
│   └── api/
│       └── contact/
│           └── route.ts           # API Route - envio de emails con Resend
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Navbar fijo + Intersection Observer + mobile menu
│   │   └── Footer.tsx             # Footer con gradiente decorativo
│   │
│   ├── sections/
│   │   ├── Hero.tsx               # Hero con grid perspectivo + estrellas animadas
│   │   ├── Nosotros.tsx           # Equipo + valores de la empresa
│   │   ├── Servicios.tsx          # Grid de 6 servicios
│   │   ├── Stack.tsx              # Tecnologias + terminal animado (typewriter)
│   │   ├── Proyectos.tsx          # Cards de proyectos destacados
│   │   └── Contacto.tsx           # Formulario de contacto + info
│   │
│   └── ui/
│       ├── NeonButton.tsx         # Boton reutilizable (primary/secondary/outline)
│       ├── SectionHeader.tsx      # Header de seccion con comentario de codigo
│       ├── TeamCard.tsx           # Card de miembro del equipo
│       ├── ServiceCard.tsx        # Card de servicio
│       ├── TechTag.tsx            # Tag de tecnologia
│       └── CustomCaptcha.tsx      # Captcha hold-to-verify gamificado
│
├── lib/
│   └── utils.ts                   # Helpers (cn, etc.)
│
├── public/
│   ├── logo.png                   # Logo Uribasoft (laptop + codigo orbital)
│   ├── gcancellieri.png           # Avatar pixel art - Gabriel Cancellieri
│   └── fjournade.png              # Avatar pixel art - Facundo Journade
│
├── .env.local                     # Variables de entorno (no commiteado)
├── .env.example                   # Template de variables de entorno
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

- **Node.js** >= 18.x ([descargar](https://nodejs.org/))
- **npm** >= 9.x (incluido con Node.js)

Verifica tu instalacion:

```bash
node --version   # v18.x o superior
npm --version    # 9.x o superior
```

---

## Instalacion

**1. Clonar el repositorio**

```bash
git clone https://github.com/uribasoft/uribasoft-landing.git
cd uribasoft-landing
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Configurar variables de entorno**

```bash
cp .env.example .env.local
```

Editar `.env.local` con tus valores reales (ver [Variables de Entorno](#variables-de-entorno)).

---

## Variables de Entorno

| Variable | Requerida | Descripcion |
|---|---|---|
| `RESEND_API_KEY` | Si* | API key de [Resend](https://resend.com) para envio de emails |

> **\*** Sin la API key el formulario de contacto funciona en **modo desarrollo**: loguea los datos en consola y devuelve `200 OK`, pero no envia emails reales.

### Obtener la API key de Resend

1. Crear cuenta gratuita en [resend.com](https://resend.com) (100 emails/dia gratis)
2. Ir a **API Keys** > **Create API Key**
3. Copiar la key (empieza con `re_`) y pegarla en `.env.local`

### Verificacion de dominio (produccion)

Para enviar emails como `noreply@uribasoft.com` es necesario verificar el dominio en Resend:

1. Ir a **Domains** > **Add Domain** > `uribasoft.com`
2. Agregar los registros DNS (TXT, CNAME) que indica Resend en tu proveedor DNS
3. Esperar la verificacion (puede tomar hasta 48hs)

---

## Desarrollo Local

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicacion estara disponible en **[http://localhost:3000](http://localhost:3000)**.

> El servidor usa Turbopack para compilacion ultra rapida en desarrollo.

### Comandos disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Servidor de desarrollo con Turbopack |
| `npm run build` | Build optimizado de produccion |
| `npm run start` | Servir el build de produccion |
| `npm run lint` | Ejecutar ESLint |

---

## Build de Produccion

```bash
npm run build
npm run start
```

El build genera paginas estaticas donde es posible y server-renders las rutas dinamicas (como `/api/contact`).

```
Route (app)
┌ ○ /                    # Estatica (prerendered)
├ ○ /_not-found           # Estatica
└ ƒ /api/contact          # Dinamica (server-rendered)
```

### Deploy

El proyecto esta optimizado para deploy en **Vercel**:

```bash
npx vercel
```

Tambien compatible con **Railway**, **Netlify** (con adapter), o cualquier plataforma que soporte Next.js.

> **Importante:** Configurar `RESEND_API_KEY` como variable de entorno en la plataforma de deploy.

---

## Secciones de la Landing

La pagina es una **Single Page Application** con smooth scroll entre secciones:

### 1. Hero (`#hero`)
> Grid perspectivo synthwave, titulo con efecto glitch, logo flotante animado, metricas rapidas y CTAs.

### 2. Nosotros (`#nosotros`)
> Valores de la empresa + cards del equipo fundador con avatares pixel art.

### 3. Servicios (`#servicios`)
> Grid de 6 cards: Sistemas Clinicos, Backends Enterprise, Frontends Modernos, Agentes IA, DevOps, Consultoria.

### 4. Stack (`#tecnologia`)
> Tecnologias organizadas por categoria + terminal animado con efecto typewriter.

### 5. Proyectos (`#proyectos`)
> Cards destacadas: UribaSalud (plataforma de internacion domiciliaria) y Plataforma Interna (agentes IA).

### 6. Contacto (`#contacto`)
> Formulario validado con React Hook Form + Zod, captcha hold-to-verify gamificado, envio de emails via Resend.

---

## Identidad Visual

La landing sigue una estetica **Synthwave + Pixel Art** con la siguiente paleta:

### Paleta de Colores

```css
/* Backgrounds */
--bg-deep:        #0B0D2A    /* Azul medianoche - fondo base */
--bg-mid:         #0F1035    /* Secciones alternadas */
--bg-surface:     #141640    /* Cards, formularios */

/* Neon */
--neon-cyan:      #00F5FF    /* Cyan electrico */
--neon-magenta:   #FF2D78    /* Magenta vibrante */
--neon-orange:    #FF6B1A    /* Naranja neon */
--neon-purple:    #B44FFF    /* Violeta neon */

/* Texto */
--text-primary:   #E8EAFF    /* Blanco ligeramente violeta */
--text-secondary: #8A8FCC    /* Violeta medio */
--text-muted:     #4A4F8A    /* Violeta oscuro */
```

### Tipografia

| Uso | Fuente | Peso |
|---|---|---|
| Titulos hero (H1) | **Press Start 2P** | 400 |
| Headings (H2, H3) | **Orbitron** | 700-900 |
| Body / UI | **Rajdhani** | 400-600 |
| Codigo / tags | **Share Tech Mono** | 400 |

### Efectos Visuales

- **Grid perspectivo** con CSS 3D en el hero
- **Scanlines** overlay sutil en toda la pagina
- **Glow neon** multicapa en textos y bordes
- **Pixel border** decorativo en cards y botones
- **Estrellas animadas** con parpadeo aleatorio
- **Horizonte synthwave** con gradiente naranja-magenta-violeta
- **Cursor crosshair** personalizado
- **Barra de progreso** neon en el scroll
- **Captcha gamificado** con barra de progreso hold-to-verify

---

## Formulario de Contacto

El formulario implementa multiples capas de validacion y seguridad:

### Validacion

```
Client-side:  React Hook Form + Zod schema
Server-side:  Zod schema (misma validacion) en API Route
Captcha:      Hold-to-verify (2 segundos) - anti-bot gamificado
```

### Campos

| Campo | Tipo | Requerido | Validacion |
|---|---|---|---|
| Nombre completo | `text` | Si | Min. 2 caracteres |
| Email | `email` | Si | Email valido |
| Empresa | `text` | No | - |
| Asunto | `select` | Si | 5 opciones predefinidas |
| Mensaje | `textarea` | Si | Min. 10 caracteres |

### Flujo de envio

```
1. Usuario completa campos obligatorios
2. Completa captcha hold-to-verify (2s)
3. Click en "ENVIAR MENSAJE"
4. POST /api/contact con datos validados
5. Server valida con Zod + envia via Resend
6. Email llega a gcancellieri@uribasoft.com y fjournade@uribasoft.com
7. UI muestra estado: success / error
```

### Captcha Custom

El captcha es un componente artesanal que requiere **mantener presionado un boton durante 2 segundos** para verificar. La barra se llena con un gradiente de cyan a verde en bloques pixel-art, simulando una barra de carga retro.

---

## Equipo

<table>
  <tr>
    <td align="center" width="50%">
      <strong>Gabriel Cancellieri</strong><br/>
      <em>Co-Founder & Backend Engineer</em><br/><br/>
      <code>Java</code> <code>Spring Boot</code> <code>PostgreSQL</code> <code>AWS</code>
    </td>
    <td align="center" width="50%">
      <strong>Facundo Journade</strong><br/>
      <em>Co-Founder & Frontend Engineer</em><br/><br/>
      <code>React</code> <code>Next.js</code> <code>TypeScript</code> <code>Node.js</code>
    </td>
  </tr>
</table>

---

## Licencia

Este proyecto es **propiedad de Uribasoft**. Todos los derechos reservados.

El codigo fuente, diseno, assets y contenido no pueden ser reproducidos, distribuidos ni utilizados sin autorizacion explicita.

---

<div align="center">

Hecho con `<3` + IA supervisada en **Neuquen, Argentina**

**[uribasoft.com](https://uribasoft.com)**

</div>
