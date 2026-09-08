import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-svh overflow-hidden bg-ink">
      {/* Video horizontal de fondo en bucle */}
      <video
        className="absolute inset-0 h-svh w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* El fondo es un cielo nublado, muy claro (gris medio 186/255): sin
          suficiente velo el texto blanco se queda en 3.2:1. El degradado
          carga hacia abajo, donde estan el texto y los botones, y afloja
          arriba para que se siga viendo la fachada. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/60 via-65% to-black/25" />

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
            className="rounded-control bg-brand px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
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
