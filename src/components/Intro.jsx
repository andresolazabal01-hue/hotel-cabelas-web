const STATS = [
  { value: "4.9★", label: "Calificación en Google" },
  { value: "64", label: "Reseñas verificadas" },
  { value: "23 + 1", label: "Habitaciones y el apartamento El Triángulo" },
  { value: "24/7", label: "Recepción y atención" },
];

/* El divisor es el borde izquierdo del dato que sigue, no un elemento
   aparte: así la línea mide exactamente el alto de la fila sin que haya
   que calcularla. En celular la rejilla es 2×2 y se cruzan una vertical
   y una horizontal; desde md se apagan las horizontales y quedan las tres
   verticales de la franja. Los extremos van sin relleno lateral, para que
   el 4.9 y el 24/7 caigan sobre el mismo margen que el titular.

   El relleno vertical vive en la celda y no en el contenedor: si lo lleva
   el contenedor, el filete vertical arranca por dentro y queda flotando a
   80 px de las reglas de arriba y abajo. */
const CELDA = [
  "pt-11 pr-6 pb-9 lg:pt-12 lg:pr-8 lg:pb-12",
  "border-l border-charcoal/10 pt-11 pb-9 pl-6 lg:pt-12 lg:pr-8 lg:pb-12 lg:pl-8",
  "border-t border-charcoal/10 pt-9 pr-6 pb-11 lg:border-t-0 lg:border-l lg:pt-12 lg:pr-8 lg:pb-12 lg:pl-8",
  "border-t border-l border-charcoal/10 pt-9 pb-11 pl-6 lg:border-t-0 lg:pt-12 lg:pb-12 lg:pl-8",
];

export default function Intro() {
  return (
    <section id="hotel" className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* ── Bloque 1 · Bienvenida ───────────────────────────────────────
            El titular crece con el ancho de la pantalla en vez de saltar por
            breakpoints: en un teléfono de 360 px el clamp se apoya en su
            mínimo y la palabra más larga, "Bienvenido", entra sin partirse. */}
        <p className="section-label">Sobre nosotros</p>

        <h2 className="display-soft font-display text-[clamp(2.5rem,8.5vw,4.25rem)] leading-[1.04] font-normal text-charcoal">
          Bienvenido a Cabelas.
        </h2>

        {/* Era el titular grande de la sección; ahora acompaña a la
            bienvenida. Mismas palabras, otro peso. */}
        <p className="display-soft mt-6 max-w-2xl font-display text-[clamp(1.15rem,3.6vw,1.6rem)] leading-[1.4] font-normal text-charcoal/75">
          23 habitaciones y un apartamento donde cada detalle está cuidado:{" "}
          <span className="text-brand-dark">limpieza impecable</span>, atención
          las 24 horas y la tranquilidad de estar{" "}
          <span className="text-brand-dark">
            a minutos del centro de Mazatenango
          </span>
          .
        </p>

        {/* ── Bloque 2 · Los cuatro datos ────────────────────
            Sin íconos: el número en la serif de marca es el que manda, y lo
            único que lo separa del siguiente es un filete. En celular van
            2×2, y la franja de cuatro no entra hasta lg: a 800 px de ancho
            la columna deja 112 px útiles y el "23 + 1" se parte en dos
            renglones. */}
        <dl className="mt-16 grid grid-cols-2 border-y border-charcoal/10 md:mt-20 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={CELDA[i]}>
              <dt className="display-soft font-display text-[2.25rem] leading-none font-normal text-charcoal lg:text-[2.5rem] xl:text-[3rem]">
                {s.value}
              </dt>
              <dd className="mt-3 max-w-[22ch] text-xs leading-snug text-charcoal/50">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* ── Bloque 3 · La fachada ───────────────────────────────────────
            Tres quintos para la foto y dos para el texto: en la rejilla de
            mitades anterior la fachada se quedaba corta. Por debajo de lg se
            apilan — una foto de 4:3 y un párrafo repartidos en un teléfono
            dejan ambas cosas ilegibles. */}
        <div className="mt-24 grid gap-14 md:mt-32 lg:grid-cols-5 lg:items-center lg:gap-16">
          <div className="relative lg:col-span-3">
            {/* El contenedor toma la proporción real del archivo (1280x960),
                así la fachada entra completa y no queda borde recortado.
                El fondo crema cubre cualquier sobrante de redondeo. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-cream">
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

          {/* pt-6 en móvil: la placa de "Abierto 24 horas" sobresale 20 px
              por debajo de la foto y si no se le hace sitio, se le encima al
              primer renglón. */}
          <div className="pt-6 lg:col-span-2 lg:pt-0">
            <p className="max-w-lg text-base leading-relaxed text-charcoal/60">
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
          </div>
        </div>
      </div>
    </section>
  );
}
