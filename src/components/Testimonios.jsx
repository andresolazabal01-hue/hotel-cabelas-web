const RESENAS = [
  {
    nombre: "Kathelyn R.",
    texto:
      "Las habitaciones muy limpias, ordenadas, amuebladas con lo que puedas necesitar y todo en perfectas condiciones, ambiente agradable, privado y cerca del cine. La seguridad al ingresar ideal para evitar cualquier inconveniente, nos encantó.",
  },
  {
    nombre: "María Fernanda E.",
    texto:
      "¡Excelente servicio! Habitaciones muy cómodas y limpias. Se encuentra en un lugar céntrico. Y el personal muy amable, buena atención al público.",
  },
  {
    nombre: "Aury M.",
    texto:
      "Un lugar muy cómodo para hospedarte en Mazate. Realmente me gustaron mucho las instalaciones modernas, frescas, y su ubicación tan céntrica. Recomendado ya sea que vayas de paso o bien llegues a pasear unos días en familia.",
  },
];

function Estrellas() {
  return (
    <p aria-label="5 de 5 estrellas" className="text-sm text-brand-soft">
      {"★★★★★".split("").map((e, i) => (
        <span key={i} aria-hidden="true">
          {e}
        </span>
      ))}
    </p>
  );
}

export default function Testimonios() {
  return (
    <section id="testimonios" className="bg-deep py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label-invert">Testimonios</p>
            <h2 className="display-soft max-w-xl font-display text-[2rem] leading-[1.1] font-normal text-cream md:text-[2.5rem] lg:text-[3.1rem]">
              Lo que dicen nuestros huéspedes.
            </h2>
          </div>
          {/* La misma insignia del hero: aqui sirve de respaldo a las tres
              reseñas, que son un recorte de esas 63. */}
          <span className="flex shrink-0 items-center gap-2 self-start rounded-control border border-white/30 px-4 py-2 text-sm text-white md:self-auto">
            <span className="text-brand-soft">★</span> 4.9 · 63 reseñas en
            Google
          </span>
        </div>

        {/* Misma rejilla de filetes que los tipos de habitacion: una sola caja
            dividida, no tres tarjetas sueltas. */}
        <div className="grid gap-px overflow-hidden rounded-panel bg-white/10 lg:grid-cols-3">
          {RESENAS.map((r) => (
            <figure key={r.nombre} className="flex flex-col bg-deep p-7 md:p-8">
              <Estrellas />
              <blockquote className="mt-5 font-display text-[1.05rem] leading-relaxed font-normal text-cream/85">
                {r.texto}
              </blockquote>
              {/* mt-auto pega la atribucion al fondo: las reseñas tienen
                  largos muy distintos y si no, cada nombre queda a su altura. */}
              <figcaption className="mt-auto pt-8">
                <p className="text-sm font-medium text-cream">{r.nombre}</p>
                <p className="mt-1 text-xs text-cream/60">
                  Reseña verificada en Google
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
