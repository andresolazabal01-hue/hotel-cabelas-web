import FadeIn from "./FadeIn.jsx";

const POINTS = [
  {
    num: "01",
    title: "Limpieza impecable",
    text: "Habitaciones y baños en estado impecable, cuidados a diario. Es lo primero que mencionan las reseñas.",
    icon: (
      <path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6L12 3zM19 15l.9 2.6L22 18l-2.1.7L19 21l-.9-2.3L16 18l2.1-.4L19 15z" />
    ),
  },
  {
    num: "02",
    title: "Seguridad en el ingreso",
    text: "Acceso controlado y un ambiente privado, para que descanses con total tranquilidad.",
    icon: (
      <path d="M12 2l8 3.5v5.1c0 5-3.4 9.6-8 11.4-4.6-1.8-8-6.4-8-11.4V5.5L12 2zm-1.2 13.6l6-6-1.4-1.4-4.6 4.6-2.2-2.2-1.4 1.4 3.6 3.6z" />
    ),
  },
  {
    num: "03",
    title: "Atención 24/7",
    text: "Recepción atenta a cualquier hora, los 7 días de la semana. Llega cuando lo necesites.",
    icon: (
      <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm1 5h-2v6l4.8 2.9 1-1.7-3.8-2.3V7z" />
    ),
  },
  {
    num: "04",
    title: "Comodidad completa",
    text: "Aire acondicionado, TV, wifi y camas cómodas en todas las habitaciones, bien equipadas.",
    icon: (
      <path d="M4 7h16a2 2 0 012 2v3h-2v6h-2v-2H6v2H4v-6H2V9a2 2 0 012-2zm0 2v3h16V9H4zm2-5h12v2H6V4z" />
    ),
  },
];

export default function Why() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 text-center md:mb-20">
          <FadeIn>
            <p className="mb-6 text-xs font-medium tracking-[0.35em] text-brand-dark uppercase">
              06 — Por qué Cabelas
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight font-semibold text-charcoal md:text-5xl">
              Lo que destacan quienes ya se hospedaron.
            </h2>
          </FadeIn>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <FadeIn key={p.num} delay={0.1 + i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-sand bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-charcoal/8">
                <span className="pointer-events-none absolute -top-3 right-4 font-display text-7xl font-bold text-sand/60 transition-colors duration-500 group-hover:text-brand/15">
                  {p.num}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand-dark">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                    aria-hidden="true"
                  >
                    {p.icon}
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-charcoal">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/55">
                  {p.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-14 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-5 py-2.5 text-sm text-charcoal/60">
            <span className="text-brand">★</span>
            Basado en las 63 reseñas del hotel en Google — 4.9 de 5 estrellas
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
