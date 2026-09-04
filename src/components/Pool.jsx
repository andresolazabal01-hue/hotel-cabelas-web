import FadeIn from "./FadeIn.jsx";

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
            <FadeIn>
              <p className="mb-6 text-xs font-medium tracking-[0.35em] text-brand-soft uppercase">
                04 — Piscina
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="max-w-xl font-display text-4xl leading-tight font-semibold text-cream md:text-5xl">
                Piscina incluida, a un paso del hotel.
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-cream/50">
              Nuestros huéspedes tienen acceso gratuito a la piscina del
              Restaurante El Pirata, contiguo a Cabelas. No es parte del hotel:
              es un beneficio que tienes por hospedarte con nosotros.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 + i * 0.08}>
              <article className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-9">
                <h3 className="font-display text-lg font-semibold text-cream">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/55">
                  {p.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-10 text-center">
          <p className="mx-auto inline-flex max-w-xl rounded-2xl border border-white/15 px-6 py-4 text-sm leading-relaxed text-cream/55">
            La piscina pertenece al Restaurante El Pirata. Los horarios de uso
            dependen del restaurante — en recepción te confirmamos el del día.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
