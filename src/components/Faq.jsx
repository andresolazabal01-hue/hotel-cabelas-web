import FadeIn from "./FadeIn.jsx";

const FAQS = [
  {
    q: "¿A qué hora es el check-in y el check-out?",
    a: "El check-in es a partir de las 2:00 pm y el check-out es a las 12:00 pm.",
  },
  {
    q: "¿Cómo puedo pagar?",
    a: "Aceptamos transferencia, efectivo y tarjeta. Pagar con tarjeta no tiene ningún recargo: el precio es el mismo por cualquiera de las tres formas.",
  },
  {
    q: "¿Tengo que dar un anticipo para apartar?",
    a: "No. No pedimos anticipo ni depósito para dejar tu reserva apartada. Escríbenos, confirmamos disponibilidad y listo.",
  },
  {
    q: "¿Dan factura?",
    a: "Sí, entregamos factura. Solo avísanos al momento de reservar o al hacer el pago.",
  },
  {
    q: "¿Puedo llevar a mi mascota?",
    a: "No, por el momento no recibimos mascotas en el hotel.",
  },
  {
    q: "¿Se puede reservar el hotel completo?",
    a: "Sí, se puede reservar el hotel completo para grupos o eventos, sujeto a disponibilidad. Ten en cuenta que no contamos con salón para reuniones: lo que se reserva es el hospedaje.",
  },
];

export default function Faq() {
  return (
    <section id="preguntas" className="bg-sand py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <FadeIn>
            <p className="mb-6 text-xs font-medium tracking-[0.35em] text-brand-dark uppercase">
              07 — Preguntas frecuentes
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="max-w-2xl font-display text-4xl leading-tight font-semibold text-charcoal md:text-5xl">
              Lo que casi siempre nos preguntan antes de reservar.
            </h2>
          </FadeIn>
        </div>

        <dl className="grid gap-5 md:grid-cols-2">
          {FAQS.map((item, i) => (
            <FadeIn key={item.q} delay={0.1 + (i % 2) * 0.08}>
              <div className="h-full rounded-3xl border border-charcoal/8 bg-white p-8 md:p-9">
                <dt className="font-display text-lg leading-snug font-semibold text-charcoal">
                  {item.q}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-charcoal/60">
                  {item.a}
                </dd>
              </div>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  );
}
