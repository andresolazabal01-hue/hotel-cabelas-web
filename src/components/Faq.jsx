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
    <section id="preguntas" className="fondo-sand py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <p className="section-label">Preguntas frecuentes</p>
          <h2 className="display-soft max-w-2xl font-display text-[2rem] leading-[1.1] font-normal text-charcoal md:text-[2.5rem] lg:text-[3.1rem]">
            Lo que casi siempre nos preguntan antes de reservar.
          </h2>
        </div>

        {/* Lista editorial: pregunta y respuesta enfrentadas, sin tarjetas */}
        <dl className="border-t border-charcoal/15">
          {FAQS.map((item) => (
            <div
              key={item.q}
              className="grid gap-3 border-b border-charcoal/15 py-8 md:grid-cols-12 md:gap-10 md:py-10"
            >
              <dt className="font-display text-lg leading-snug font-medium text-charcoal md:col-span-5">
                {item.q}
              </dt>
              <dd className="text-sm leading-relaxed text-charcoal/60 md:col-span-7 md:pt-1">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
