const POINTS = [
  {
    title: "Limpieza impecable",
    text: "Habitaciones y baños en estado impecable, cuidados a diario. Es lo primero que mencionan las reseñas.",
    icon: (
      <path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6L12 3zM19 15l.9 2.6L22 18l-2.1.7L19 21l-.9-2.3L16 18l2.1-.4L19 15z" />
    ),
  },
  {
    title: "Seguridad en el ingreso",
    text: "Acceso controlado y un ambiente privado, para que descanses con total tranquilidad.",
    icon: (
      <path d="M12 2l8 3.5v5.1c0 5-3.4 9.6-8 11.4-4.6-1.8-8-6.4-8-11.4V5.5L12 2zm-1.2 13.6l6-6-1.4-1.4-4.6 4.6-2.2-2.2-1.4 1.4 3.6 3.6z" />
    ),
  },
  {
    title: "Atención 24/7",
    text: "Recepción atenta a cualquier hora, los 7 días de la semana. Llega cuando lo necesites.",
    icon: (
      <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm1 5h-2v6l4.8 2.9 1-1.7-3.8-2.3V7z" />
    ),
  },
  {
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
        <div className="mb-14 md:mb-20">
          <p className="section-label">Por qué Cabelas</p>
          <h2 className="display-soft max-w-2xl font-display text-[2rem] leading-[1.1] font-normal text-charcoal md:text-[2.5rem] lg:text-[3.1rem]">
            Lo que destacan quienes ya se hospedaron.
          </h2>
        </div>

        {/* Cuatro apuntes en rejilla abierta: ninguno necesita ser una tarjeta */}
        <dl className="grid border-t border-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="border-b border-charcoal/10 py-9 sm:pr-10 lg:border-b-0 lg:pb-0"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-brand"
                aria-hidden="true"
              >
                {p.icon}
              </svg>
              <dt className="mt-5 font-display text-lg font-medium text-charcoal">
                {p.title}
              </dt>
              <dd className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/55">
                {p.text}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-14 flex items-center gap-2 text-sm text-charcoal/50">
          <span className="text-brand">★</span>
          Basado en las 63 reseñas del hotel en Google — 4.9 de 5 estrellas
        </p>
      </div>
    </section>
  );
}
