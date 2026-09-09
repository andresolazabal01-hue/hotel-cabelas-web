import { useEffect } from "react";
import Lenis from "lenis";
import ReservaModal from "./components/ReservaModal.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import Marquee from "./components/Marquee.jsx";
import Rooms from "./components/Rooms.jsx";
import Triangulo from "./components/Triangulo.jsx";
import Pool from "./components/Pool.jsx";
import Why from "./components/Why.jsx";
import Faq from "./components/Faq.jsx";
import Booking from "./components/Booking.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;

    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Marquee />
        <Rooms />
        <Triangulo />
        <Pool />
        <Why />
        <Faq />
        <Booking />
      </main>
      <Footer />
      <ReservaModal />
    </>
  );
}
