import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "../data.js";

const LINKS = [
  { href: "#hotel", label: "El hotel" },
  { href: "#habitaciones", label: "Habitaciones" },
  { href: "#triangulo", label: "El Triángulo" },
  { href: "#recorrido", label: "Recorrido" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (e, href) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(href, { offset: 0 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/70 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.__lenis?.scrollTo(0);
          }}
          className="flex items-center"
        >
          <img
            src="/images/logo-cabelas.webp"
            alt="Cabelas"
            className="h-11 w-auto md:h-12"
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex xl:gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className="text-sm whitespace-nowrap text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-control bg-brand px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          Reservar
        </a>
      </nav>
    </header>
  );
}
