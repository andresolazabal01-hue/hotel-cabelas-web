const STATS = [
  { value: "4.9★", label: "Calificación en Google" },
  { value: "63", label: "Reseñas verificadas" },
  { value: "23 + 1", label: "Habitaciones y el apartamento El Triángulo" },
  { value: "24/7", label: "Recepción y atención" },
];

export default function Intro() {
  return (
    <section id="hotel" className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-label">El hotel</p>

            <h2 className="display-soft max-w-xl font-display text-[1.8rem] leading-[1.15] font-normal text-charcoal md:text-[2.1rem] lg:text-[2.5rem]">
              23 habitaciones y un apartamento donde cada detalle está cuidado:{" "}
              <span className="text-brand-dark">limpieza impecable</span>,
              atención las 24 horas y la tranquilidad de estar{" "}
              <span className="text-brand-dark">
                a minutos del centro de Mazatenango
              </span>
              .
            </h2>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-charcoal/60">
              Con una calificación de 4.9 estrellas en Google, Cabelas se ha
              ganado la confianza de sus huéspedes por su limpieza, su seguridad
              y un servicio que se nota desde el ingreso. Son 23 habitaciones en
              tres tipos, más El Triángulo, un apartamento aparte pensado para
              estadías largas.
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal/60">
              La reserva se hace directo por WhatsApp, con nosotros. Sin
              intermediarios y sin comisiones de terceros.
            </p>

            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-charcoal/10 pt-10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-medium text-charcoal">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-xs leading-snug text-charcoal/50">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            {/* El contenedor toma la proporción real del archivo (2000x1124),
                así la fachada entra completa y no queda borde recortado.
                El fondo crema cubre cualquier sobrante de redondeo. */}
            <div className="relative aspect-[500/281] overflow-hidden rounded-panel bg-cream">
              <img
                src="/images/foto-fachada.jpg"
                alt="Fachada de Hotel Cabelas"
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-panel bg-charcoal px-6 py-4">
              <p className="font-display text-sm font-medium text-white">
                Abierto 24 horas
              </p>
              <p className="mt-0.5 text-xs text-white/50">
                Los 7 días de la semana
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
