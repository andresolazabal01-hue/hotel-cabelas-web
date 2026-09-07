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

      {/* Overlay oscuro sutil para contraste del logo y el texto */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink/70 to-transparent" />

      {/* Contenido centrado. La entrada del hero es el único momento
          animado del sitio: el resto se sostiene quieto. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-sm text-white/70"
        >
          Mazatenango · Suchitepéquez · Guatemala
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/logo-cabelas.webp"
            alt="Cabelas — El descanso que mereces"
            className="w-[78vw] max-w-[380px] drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:max-w-[560px]"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="display-soft mt-8 font-display text-2xl font-normal text-white/90 md:text-3xl"
        >
          El descanso que mereces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <span className="flex items-center gap-2 rounded-control border border-white/20 px-4 py-2 text-sm text-white/90">
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
