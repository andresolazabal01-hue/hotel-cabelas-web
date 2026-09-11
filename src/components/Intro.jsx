/* Cuatro datos, cuatro iconos de trazo. El grosor es el mismo 1.6 que usan
   el resto de iconos de linea del sitio (modal de reserva, control de video):
   a distintos grosores la franja se ve armada con piezas de dos juegos. */
function Trazo({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6 text-brand"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const STATS = [
  {
    value: "4.9★",
    label: "Calificación en Google",
    icon: (
      <path d="M12 3.4l2.7 5.5 6 .87-4.35 4.24 1.03 6L12 17.24 6.62 20.07l1.03-6L3.3 9.83l6-.87L12 3.4z" />
    ),
  },
  {
    value: "64",
    label: "Reseñas verificadas",
    icon: (
      <>
        <path d="M15.5 19.5v-1.6a3.5 3.5 0 00-3.5-3.5H7a3.5 3.5 0 00-3.5 3.5v1.6" />
        <circle cx="9.5" cy="7.5" r="3.1" />
        <path d="M16.4 4.8a3.1 3.1 0 010 5.5M20.5 19.5v-1.6a3.5 3.5 0 00-2.6-3.38" />
      </>
    ),
  },
  {
    value: "23 + 1",
    label: "Habitaciones y el apartamento El Triángulo",
    icon: (
      <>
        <path d="M6 20V5.2a1.2 1.2 0 011.2-1.2h9.6a1.2 1.2 0 011.2 1.2V20" />
        <path d="M4 20h16" />
        <path d="M14.9 12.3h.01" />
      </>
    ),
  },
  {
    value: "24/7",
    label: "Recepción y atención",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.4" />
        <path d="M12 7.3V12l3.1 1.85" />
      </>
    ),
  },
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

        {/* ── Bloque 2 · Los cuatro datos ─────────────────────────────────
            En celular van 2×2: a cuatro columnas cada dato queda en 70 px y
            la etiqueta del apartamento se parte en seis líneas. Desde md sí
            entran en franja. */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-11 border-y border-charcoal/10 py-11 sm:gap-x-10 md:mt-20 md:grid-cols-4 md:py-12">
          {STATS.map((s) => (
            <div key={s.label}>
              <Trazo>{s.icon}</Trazo>
              <dt className="mt-4 font-display text-3xl leading-none font-medium text-charcoal md:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-2.5 max-w-[22ch] text-xs leading-snug text-charcoal/50">
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
