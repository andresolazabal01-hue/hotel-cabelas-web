const POINTS = [
  {
    title: "Sin costo para huéspedes",
    text: "El acceso está incluido con tu habitación. No se paga entrada ni consumo mínimo por usarla.",
  },
  {
    title: "Se mantiene limpia",
    text: "Recibe mantenimiento constante y el agua se trata con regularidad. Si quieres verla antes de entrar, se puede — está a la vista.",
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
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label-invert">Piscina</p>
            <h2 className="display-soft max-w-xl font-display text-[2rem] leading-[1.1] font-normal text-cream md:text-[2.5rem] lg:text-[3.1rem]">
              Piscina incluida, a un paso del hotel.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/50">
            Nuestros huéspedes tienen acceso gratuito a la piscina del
            Restaurante El Pirata, contiguo a Cabelas. No es parte del hotel: es
            un beneficio que tienes por hospedarte con nosotros.
          </p>
        </div>

        {/* Tres apuntes en columnas abiertas, separados por filete */}
        <dl className="grid border-t border-white/10 md:grid-cols-3">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="border-b border-white/10 py-9 md:border-b-0 md:pr-10 md:pb-0"
            >
              <dt className="font-display text-lg font-medium text-cream">
                {p.title}
              </dt>
              <dd className="mt-3 max-w-sm text-sm leading-relaxed text-cream/55">
                {p.text}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-14 max-w-xl text-sm leading-relaxed text-cream/40">
          La piscina pertenece al Restaurante El Pirata. Los horarios de uso
          dependen del restaurante — en recepción te confirmamos el del día.
        </p>
      </div>
    </section>
  );
}
