const POINTS = [
  {
    title: "Limpieza impecable",
    text: "Habitaciones y baños en estado impecable, cuidados a diario. Es lo primero que mencionan las reseñas.",
    icon: (
      <>
        <path d="M12 3.4l1.85 5.05 5.05 1.85-5.05 1.85L12 17.2l-1.85-5.05L5.1 10.3l5.05-1.85L12 3.4z" />
        <path d="M18.8 15.6l.72 1.98 1.98.72-1.98.72-.72 1.98-.72-1.98-1.98-.72 1.98-.72.72-1.98z" />
      </>
    ),
  },
  {
    title: "Seguridad en el ingreso",
    text: "Acceso controlado y un ambiente privado, para que descanses con total tranquilidad.",
    icon: (
      <>
        <path d="M12 2.9l7.3 3.15v4.85c0 4.55-3.05 8.8-7.3 10.2-4.25-1.4-7.3-5.65-7.3-10.2V6.05L12 2.9z" />
        <path d="M8.9 11.8l2.2 2.2 4.1-4.1" />
      </>
    ),
  },
  {
    title: "Atención 24/7",
    text: "Recepción atenta a cualquier hora, los 7 días de la semana. Llega cuando lo necesites.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.6" />
        <path d="M12 7.2V12l3.2 1.9" />
      </>
    ),
  },
  {
    title: "Comodidad completa",
    text: "Aire acondicionado, TV, wifi y camas cómodas en todas las habitaciones, bien equipadas.",
    icon: (
      <>
        <path d="M3.2 19.2V6.4" />
        <path d="M3.2 12.1h12.3a5.3 5.3 0 015.3 5.3v1.8" />
        <path d="M3.2 16.2h17.6" />
        <circle cx="7.7" cy="9.2" r="1.9" />
      </>
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
              {/* Trazo de 1.6, el mismo que la hoja de reserva y el control
                  de video. Antes eran siluetas macizas: dos juegos de iconos
                  distintos conviviendo en el mismo sitio. */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-[22px] text-brand"
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
          Basado en las 64 reseñas del hotel en Google, 4.9 de 5 estrellas
        </p>
      </div>
    </section>
  );
}
