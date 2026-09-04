import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn.jsx";

const STATS = [
  { value: "4.9★", label: "Calificación en Google" },
  { value: "63", label: "Reseñas verificadas" },
  { value: "23 + 1", label: "Habitaciones y el apartamento El Triángulo" },
  { value: "24/7", label: "Recepción y atención" },
];

export default function Intro() {
  const imgWrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="hotel" className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <p className="mb-6 text-xs font-medium tracking-[0.35em] text-brand-dark uppercase">
                01 — El hotel
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-3xl leading-snug font-semibold text-charcoal md:text-[2.6rem]">
                23 habitaciones y un apartamento donde cada detalle está
                cuidado:{" "}
                <span className="text-brand-dark">limpieza impecable</span>,
                atención las 24 horas y la tranquilidad de estar{" "}
                <span className="text-brand-dark">
                  a minutos del centro de Mazatenango
                </span>
                .
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-charcoal/60">
                Con una calificación de 4.9 estrellas en Google, Cabelas se ha
                ganado la confianza de sus huéspedes por su limpieza, su
                seguridad y un servicio que se nota desde el ingreso. Son 23
                habitaciones en tres tipos, más El Triángulo, un apartamento
                aparte pensado para estadías largas.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal/60">
                La reserva se hace directo por WhatsApp, con nosotros. Sin
                intermediarios y sin comisiones de terceros.
              </p>
            </FadeIn>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {STATS.map((s, i) => (
                <FadeIn key={s.label} delay={0.1 + i * 0.08}>
                  <p className="font-display text-3xl font-bold text-charcoal">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-charcoal/50">
                    {s.label}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.15} className="relative">
            <div
              ref={imgWrapRef}
              className="relative overflow-hidden rounded-3xl"
            >
              <motion.img
                style={{ y: imgY }}
                src="/images/foto-principal.jpg"
                alt="Hotel Cabelas"
                loading="lazy"
                className="aspect-[4/5] w-full scale-110 object-cover md:aspect-[3/4]"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl bg-charcoal px-6 py-4 shadow-xl">
              <p className="font-display text-sm font-semibold text-white">
                Abierto 24 horas
              </p>
              <p className="mt-0.5 text-xs text-white/50">
                Los 7 días de la semana
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
