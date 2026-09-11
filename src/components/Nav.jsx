import { useEffect, useState } from "react";
import { abrirReserva } from "../reserva.js";

const LINKS = [
  { href: "#hotel", label: "Sobre nosotros" },
  { href: "#habitaciones", label: "Habitaciones" },
  { href: "#triangulo", label: "El Triángulo" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el panel abierto el fondo no se mueve: Lenis maneja el scroll,
  // así que hay que detenerlo además de bloquear el body.
  useEffect(() => {
    if (!open) return;

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    const alTeclear = (e) => e.key === "Escape" && setOpen(false);
    // Si la ventana crece hasta el menú de escritorio, el panel sobra.
    const alRedimensionar = () => window.innerWidth >= 1024 && setOpen(false);

    window.addEventListener("keydown", alTeclear);
    window.addEventListener("resize", alRedimensionar);

    return () => {
      document.body.style.overflow = previo;
      window.__lenis?.start();
      window.removeEventListener("keydown", alTeclear);
      window.removeEventListener("resize", alRedimensionar);
    };
  }, [open]);

  const irA = (href) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(href, { offset: 0 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goTo = (e, href) => {
    e.preventDefault();
    irA(href);
  };

  // Desde el panel hay que reanudar Lenis aquí mismo: ignora scrollTo
  // mientras está detenido, y esperar al efecto de cierre seria una
  // carrera contra el commit de React.
  const goToDesdePanel = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    window.__lenis?.start();
    irA(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-ink/70 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.__lenis?.scrollTo(0);
            }}
            className="foco-marca flex items-center rounded-control"
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
                  className="foco-marca rounded-control text-sm whitespace-nowrap text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => abrirReserva()}
              className="btn-solido px-5 py-2"
            >
              Reservar
            </button>

            {/* Menú de pantallas chicas: aparece donde los enlaces se ocultan */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="foco-marca -mr-2 grid size-11 place-items-center rounded-control text-white lg:hidden"
            >
              <span className="relative block h-[15px] w-6" aria-hidden="true">
                <span
                  className={`absolute top-0 left-0 block h-px w-6 bg-current transition-transform duration-300 ${EASE} ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute top-[7px] left-0 block h-px w-6 bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-[14px] left-0 block h-px w-6 bg-current transition-transform duration-300 ${EASE} ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu-movil"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-16">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                style={{ transitionDelay: open ? `${90 + i * 55}ms` : "0ms" }}
                className={`transition-all duration-500 ${EASE} ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <a
                  href={l.href}
                  onClick={(e) => goToDesdePanel(e, l.href)}
                  tabIndex={open ? 0 : -1}
                  className="foco-marca display-soft block rounded-control py-5 font-display text-2xl font-normal text-cream transition-colors active:text-brand-soft"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
