const POINTS = [
  {
    title: "Sin costo para huéspedes",
    text: "El acceso está incluido con tu habitación. No se paga entrada ni consumo mínimo por usarla.",
  },
  {
    title: "Se mantiene limpia",
    text: "Recibe mantenimiento constante y el agua se trata con regularidad. Al entrar al restaurante puede verse antes de usarla.",
  },
  {
    title: "Contiguo al hotel",
    text: "Está justo al lado. Se llega caminando desde la recepción, sin tomar transporte ni salir a la calle principal.",
  },
];

export default function Pool() {
  return (
    <section id="piscina" className="bg-deep py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Todo el texto en una sola columna, en orden vertical */}
          <div>
            <p className="section-label-invert">Piscina</p>
            <h2 className="display-soft max-w-xl font-display text-[2rem] leading-[1.1] font-normal text-cream md:text-[2.5rem] lg:text-[3.1rem]">
              Piscina incluida, a un paso del hotel.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/60">
              Nuestros huéspedes tienen acceso gratuito a la piscina del
              Restaurante El Pirata, contiguo a Cabelas. No es parte del hotel:
              es un beneficio que tienes por hospedarte con nosotros.
            </p>

            <dl className="mt-12 border-t border-white/10">
              {POINTS.map((p) => (
                <div key={p.title} className="border-b border-white/10 py-7">
                  <dt className="font-display text-lg font-medium text-cream">
                    {p.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-cream/55">
                    {p.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* El contenedor va con items-start. En escritorio la foto sale
              del flujo (absolute) para no imponer su propio alto: así la
              fila la mide el texto y la columna se estira a ese alto,
              quedando ambas parejas y sin aire debajo. */}
          <figure className="relative w-full overflow-hidden rounded-panel lg:h-full lg:self-stretch">
            <img
              src="/images/piscina-1.jpg"
              alt="Piscina del Restaurante El Pirata, contigua a Hotel Cabelas"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            />
          </figure>
        </div>

        <p className="mt-14 max-w-xl text-sm leading-relaxed text-cream/40">
          La piscina pertenece al Restaurante El Pirata: se accede desde adentro
          y no es visible desde el ingreso del hotel. Los horarios de uso
          dependen del restaurante, y en recepción te confirmamos el del día.
        </p>
      </div>
    </section>
  );
}
