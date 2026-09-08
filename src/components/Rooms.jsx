import DragScrubVideo from "./DragScrubVideo.jsx";
import { WHATSAPP_URL } from "../data.js";

const TYPES = [
  {
    tag: "Tipo 1",
    range: "Habitaciones 1 a 8",
    bed: "2 camas matrimoniales",
    normal: "Q450",
    traveler: "Q350",
    src: "/videos/habitacion-2-matrimoniales.mp4",
    poster: "/images/poster-habitacion-2-matrimoniales.jpg",
  },
  {
    // Sin grabación todavía: la tarjeta lleva su propio tratamiento.
    // Cuando haya foto de este tipo, entra aquí como src/poster.
    tag: "Tipo 2",
    range: "Habitaciones 9 a 17",
    bed: "1 cama matrimonial",
    normal: "Q390",
    traveler: "Q290",
  },
  {
    tag: "Tipo 3",
    range: "Habitaciones 18 a 23",
    bed: "Cama extra size",
    normal: "Q450",
    traveler: "Q350",
    src: "/videos/habitacion-extra-size.mp4",
    poster: "/images/poster-habitacion-extra-size.jpg",
  },
];

const INCLUDED = [
  "Wifi",
  "Parqueo",
  "Agua caliente",
  "Aire acondicionado",
  "TV",
  "Baño privado",
];

const CAPACITY = [
  {
    title: "Capacidad para 2 personas",
    text: "Es la base de cualquier habitación, sin costo adicional.",
  },
  {
    title: "Niños de 0 a 12 años, sin costo",
    text: "No pagan extra ni cuentan como persona adicional.",
  },
  {
    title: "Q150 por persona adicional",
    text: "De 13 años en adelante. Incluye cama extra dentro de la misma habitación.",
  },
];

export default function Rooms() {
  return (
    <section id="habitaciones" className="fondo-deep py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label-invert">Habitaciones</p>
            <h2 className="display-soft max-w-xl font-display text-[2rem] leading-[1.1] font-normal text-cream md:text-[2.5rem] lg:text-[3.1rem]">
              23 habitaciones, tres tipos, el mismo estándar.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/60">
            Las 23 incluyen aire acondicionado, TV y wifi, y se mantienen con el
            estándar de limpieza que destacan las reseñas. La diferencia entre
            un tipo y otro está en la cama, no en el cuidado.
          </p>
        </div>

        {/* Cómo funcionan los precios — abierto sobre el fondo, sin caja */}
        <div className="border-t border-white/10 pt-14">
          <p className="section-label-invert">Cómo funcionan los precios</p>
          <h3 className="display-soft max-w-2xl font-display text-[1.7rem] leading-[1.16] font-normal text-cream md:text-[2rem] lg:text-[2.4rem]">
            Hay dos precios por noche: el normal y el{" "}
            <span className="text-brand-soft">precio de viajero</span>.
          </h3>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-display text-lg font-medium text-cream">
                Precio normal
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/60">
                Se aplica los fines de semana. También de lunes a viernes cuando
                se hospedan{" "}
                <strong className="font-medium text-cream/90">
                  dos personas o más
                </strong>
                .
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-medium text-brand-soft">
                Precio de viajero
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/60">
                Tarifa especial de{" "}
                <strong className="font-medium text-cream/90">
                  lunes a viernes
                </strong>
                , válida únicamente cuando viaja{" "}
                <strong className="font-medium text-cream/90">
                  una sola persona
                </strong>
                . Si van dos o más, aplica el precio normal aunque sea entre
                semana.
              </p>
            </div>
          </div>
        </div>

        {/* Los tres tipos: una sola tabla con filetes, no tres tarjetas */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-panel bg-white/10 md:mt-16 lg:grid-cols-3">
          {TYPES.map((t) => (
            <article
              key={t.tag}
              className="flex flex-col fondo-deep p-7 md:p-8"
            >
              <h4 className="font-display text-xl font-medium text-cream">
                {t.tag}
              </h4>
              <p className="mt-1 text-xs text-cream/45">{t.range}</p>
              <p className="mt-3 text-sm text-brand-soft">{t.bed}</p>

              {t.src ? (
                <DragScrubVideo
                  src={t.src}
                  poster={t.poster}
                  tone="dark"
                  ratio="4/5"
                  className="mt-6 w-full"
                />
              ) : (
                /* Tipo 2 aún no tiene grabación. La ranura la ocupa una
                   cita: contenido propio, no un hueco esperando media.
                   Mismo filete bajo el bloque que la barra de progreso
                   de los otros dos, para que la fila no se descuadre. */
                <figure
                  className="mt-6 w-full"
                  style={{ maxWidth: "calc(70svh * 4 / 5)" }}
                >
                  <div className="flex aspect-[4/5] items-center rounded-panel bg-linear-to-b from-brand/18 to-brand/5 px-6 md:px-7">
                    <p className="display-soft max-w-sm font-display text-[1.4rem] leading-[1.45] font-normal text-cream/75 sm:max-w-md sm:text-[2rem] lg:max-w-sm lg:text-[1.4rem]">
                      <span className="text-brand-soft">
                        La habitación del viajero.
                      </span>{" "}
                      Pensada para quien llega por trabajo, no por vacaciones —
                      lo esencial, sin nada de más.
                    </p>
                  </div>
                  <div className="mt-3 h-[3px] w-full bg-white/10" />
                </figure>
              )}

              <dl className="mt-auto space-y-4 pt-8">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm whitespace-nowrap text-cream/55">
                    Precio normal
                  </dt>
                  <dd className="font-display text-2xl font-medium text-cream">
                    {t.normal}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-cream/55">
                    Precio de viajero
                    <span className="mt-0.5 block text-xs text-cream/35">
                      Lunes a viernes, 1 persona
                    </span>
                  </dt>
                  <dd className="font-display text-2xl font-medium text-brand-soft">
                    {t.traveler}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-xs text-cream/35">Precios por noche</p>
            </article>
          ))}
        </div>

        {/* Habitación 5 — banda de énfasis, con otro peso que la tabla */}
        <div className="mt-5 flex flex-col gap-7 rounded-panel bg-brand/20 p-8 sm:flex-row sm:items-center sm:justify-between md:p-12">
          <div>
            <p className="mb-4 text-sm text-brand-soft">Habitación 5</p>
            <p className="display-soft font-display text-[1.7rem] leading-[1.15] font-normal text-cream md:text-[2.2rem]">
              La única con cama king de todo el hotel.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/60">
              Es del Tipo 1, pero en lugar de las dos camas matrimoniales lleva
              una sola cama king. Si es la que buscas, conviene pedirla por
              número al momento de reservar.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 self-start rounded-control border border-brand-soft/40 px-6 py-3 text-sm font-medium text-cream transition-colors hover:border-brand-soft hover:bg-brand-soft/10 sm:self-auto"
          >
            Preguntar por la 5
          </a>
        </div>

        {/* Qué incluye — bloque abierto, sin caja ni pastillas */}
        <div className="mt-20 border-t border-white/10 pt-14 md:mt-28">
          <p className="section-label-invert">
            Incluido en las 23 habitaciones
          </p>
          <p className="max-w-3xl font-display text-xl leading-relaxed font-normal text-cream md:text-2xl">
            {INCLUDED.join(" · ")}
          </p>

          <dl className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {CAPACITY.map((c) => (
              <div key={c.title}>
                <dt className="font-display text-base font-medium text-cream">
                  {c.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/55">
                  {c.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-control bg-brand px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Consultar disponibilidad
          </a>
        </div>
      </div>
    </section>
  );
}
