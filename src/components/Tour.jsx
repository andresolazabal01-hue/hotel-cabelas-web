import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import useVideoScrub from "../hooks/useVideoScrub.js";

function TourBlock({ title, videoSrc }) {
  const blockRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start start", "end end"],
  });

  useVideoScrub(videoRef, scrollYProgress);

  return (
    <div ref={blockRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-6 lg:flex-row lg:gap-20 lg:px-10">
          <div className="max-w-xs pt-16 text-center lg:pt-0 lg:text-left">
            <p className="mb-4 text-xs font-medium tracking-[0.35em] text-brand-dark uppercase">
              05 — Recorrido
            </p>
            <h2 className="font-display text-2xl leading-tight font-semibold text-charcoal md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 hidden text-sm leading-relaxed text-charcoal/55 lg:block">
              Video real grabado en el hotel, sin edición. Desliza hacia abajo
              para avanzar el recorrido a tu ritmo.
            </p>

            {/* Barra de progreso del recorrido */}
            <div className="mx-auto mt-5 h-1 w-full max-w-xs overflow-hidden rounded-full bg-sand lg:mx-0 lg:mt-8">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full w-full origin-left rounded-full bg-brand"
              />
            </div>
          </div>

          <div className="relative">
            <video
              ref={videoRef}
              className="h-[58svh] rounded-3xl object-cover shadow-2xl shadow-charcoal/25 md:h-[74svh]"
              src={videoSrc}
              muted
              playsInline
              preload="auto"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-charcoal/10 ring-inset" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Tour() {
  return (
    <section id="recorrido" className="bg-cream">
      <TourBlock
        title="Recorre la habitación con tu scroll."
        videoSrc="/videos/hotel-cabelas-video1.mp4"
      />
      <TourBlock
        title="Recorre el exterior con tu scroll."
        videoSrc="/videos/recorrido-afuera.mp4"
      />
    </section>
  );
}
