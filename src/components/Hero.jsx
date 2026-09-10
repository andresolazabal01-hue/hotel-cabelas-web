import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const VERTICAL = "(max-aspect-ratio: 3/4)";

export default function Hero() {
  // El relleno borroso solo existe en vertical. Montarlo siempre significaria
  // un segundo video decodificando en escritorio sin que llegue a verse.
  const [vertical, setVertical] = useState(
    () => window.matchMedia(VERTICAL).matches,
  );

  useEffect(() => {
    const consulta = window.matchMedia(VERTICAL);
    const alCambiar = (e) => setVertical(e.matches);
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  return (
    <section className="relative h-svh overflow-hidden bg-ink">
      {/* En vertical el cuadro se muestra completo con object-contain, lo que
          deja franjas libres arriba y abajo: el video es 16:9 y la pantalla
          no. Esas franjas las llena una copia del mismo video, ampliada y
          desenfocada, para que el hueco no se lea como un vacio. La copia
          va detras y no la ve un lector de pantalla. */}
      {vertical ? (
        <video
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : null}

      {/* En escritorio sigue cubriendo, que es como ya se veia bien. */}
      <video
        className="absolute inset-0 h-full w-full object-cover retrato:object-contain"
        src="/videos/hero.mp4"
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
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/70 via-65% to-black/30" />

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
            <span className="text-brand-soft">★</span> 4.9 · 63 reseñas en
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

      {/* Indicador de scroll */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-white/40"
        />
      </div>
    </section>
  );
}
