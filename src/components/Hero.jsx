import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Dos tomas distintas, no la misma recortada: la vertical se grabó para
// pantalla de teléfono y llena sola el encuadre. La condición es la forma de
// la pantalla y no el ancho, porque un teléfono acostado es angosto pero
// necesita la horizontal.
const VERTICAL = "(max-aspect-ratio: 3/4)";

export default function Hero() {
  const [vertical, setVertical] = useState(
    () => window.matchMedia(VERTICAL).matches,
  );
  const [bajando, setBajando] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia(VERTICAL);
    const alCambiar = (e) => setVertical(e.matches);
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  // El indicador de scroll era la unica animacion perpetua del sitio: una
  // rayita rebotando para siempre. Ahora responde — desaparece en cuanto
  // el visitante empieza a bajar, que es justo cuando deja de hacer falta.
  useEffect(() => {
    const alDesplazar = () => setBajando(window.scrollY > 24);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  return (
    <section className="relative h-svh overflow-hidden bg-ink">
      {/* Se monta un solo <video>, no dos con hidden/block: un video oculto
          con display:none se descarga igual, y serían megas de datos que el
          visitante nunca ve. El key fuerza un elemento nuevo al cambiar de
          toma, que es más fiable que reasignarle el src al mismo. */}
      {/* El poster es el cuadro cero del propio video, asi que no hay salto
          al relevarse: el navegador lo pinta de inmediato y lo cambia por el
          video en cuanto hay primer cuadro decodificado, sin JS de por medio.
          preload="auto" solo aqui; los videos de habitaciones se quedan en
          metadata para no pelearse por el ancho de banda con este. */}
      <video
        key={vertical ? "vertical" : "horizontal"}
        className="absolute inset-0 h-full w-full object-cover"
        src={vertical ? "/videos/hero-mobile.mp4" : "/videos/hero.mp4"}
        poster={
          vertical
            ? "/images/poster-hero-mobile.jpg"
            : "/images/poster-hero.jpg"
        }
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* El fondo es un cielo nublado muy claro: por pixel llega a 249/255
          justo detras del texto. Van dos capas — una plana que garantiza
          un piso de contraste en cualquier fotograma, y encima el
          degradado, que carga abajo donde estan el texto y los botones y
          afloja arriba para que se siga viendo la fachada. */}
      {/* El velo va un punto mas claro sobre la toma vertical: es mas oscura
          de origen y aguanta menos capa encima. Se decide con el mismo estado
          que elige el video, para que velo y toma nunca se desemparejen. */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          vertical ? "bg-black/16" : "bg-black/18"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${
          vertical
            ? "bg-linear-to-t from-black/68 via-black/56 via-65% to-black/23"
            : "bg-linear-to-t from-black/75 via-black/62 via-65% to-black/26"
        }`}
      />

      {/* Contenido centrado. La entrada del hero es el único momento
          animado del sitio: el resto se sostiene quieto. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-7 text-sm text-white"
        >
          Mazatenango · Suchitepéquez · Guatemala
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="display-soft max-w-4xl font-display text-[2.5rem] leading-[1.08] font-normal text-white md:text-[3.2rem] lg:text-[4.2rem]"
        >
          El descanso que mereces.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <span className="flex items-center gap-2 rounded-control border border-white/30 px-4 py-2 text-sm text-white">
            <span className="text-brand-soft">★</span> 4.9 · 64 reseñas en
            Google
          </span>
          <a
            href="#habitaciones"
            onClick={(e) => {
              e.preventDefault();
              window.__lenis?.scrollTo("#habitaciones");
            }}
            className="btn-solido px-7 py-3"
          >
            Ver habitaciones
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll: entra con el resto del hero y se va al bajar */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: bajando ? 0 : 1 }}
          transition={{ duration: 0.6, delay: bajando ? 0 : 1 }}
          className="h-8 w-px bg-white/40"
        />
      </div>
    </section>
  );
}
