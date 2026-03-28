import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Nosotros from "@/components/sections/Nosotros";
import Servicios from "@/components/sections/Servicios";
import Stack from "@/components/sections/Stack";
import Proyectos from "@/components/sections/Proyectos";
import Contacto from "@/components/sections/Contacto";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <Servicios />
        <Stack />
        <Proyectos />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}