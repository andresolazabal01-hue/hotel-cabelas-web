import FadeIn from "./FadeIn.jsx";
import { WHATSAPP_URL } from "../data.js";

const GALLERY = [
  {
    src: "/images/habitacion-turquesa.jpg",
    alt: "Habitación con pared turquesa y motivo de hojas tropicales",
    title: "El sello de la casa",
    caption: "Acento turquesa con motivo tropical",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    src: "/images/habitacion-madera.jpg",
    alt: "Habitación en tonos cálidos con piso de madera",
    title: "Tonos cálidos y madera",
    caption: "Confort pensado para descansar",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-auto md:h-full",
  },
  {
    src: "/images/foto-bano.jpg",
    alt: "Baño privado con mueble de madera y lavamanos tipo bowl",
    title: "Baño privado",
    caption: "Acabados en madera y detalles limpios",
    span: "md:col-span-12",
    aspect: "aspect-[4/3] md:aspect-[21/8]",
  },
];

const TYPES = [
  {
    tag: "Tipo 1",
    range: "Habitaciones 1 a 8",
    bed: "2 camas matrimoniales",
    normal: "Q450",
    traveler: "Q350",
  },
  {
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

export default function Rooms() {
  return (
    <section id="habitaciones" className="bg-deep py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeIn>
              <p className="mb-6 text-xs font-medium tracking-[0.35em] text-brand-soft uppercase">
                02 — Habitaciones
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="max-w-xl font-display text-4xl leading-tight font-semibold text-cream md:text-5xl">
                23 habitaciones, tres tipos, el mismo estándar.
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-cream/50">
              Las 23 incluyen aire acondicionado, TV y wifi, y se mantienen con
              el estándar de limpieza que destacan las reseñas. La diferencia
              entre un tipo y otro está en la cama, no en el cuidado.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          {GALLERY.map((room, i) => (
            <FadeIn key={room.src} delay={0.1 + i * 0.1} className={room.span}>
              <figure className="group relative h-full overflow-hidden rounded-3xl">
                <img
                  src={room.src}
                  alt={room.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${room.aspect}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                  <div>
                    <p className="font-display text-lg font-semibold text-white md:text-xl">
                      {room.title}
                    </p>
                    <p className="mt-1 text-sm text-white/60">{room.caption}</p>
                  </div>
                  <span className="hidden rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 md:block">
                    A/C · TV · Wifi
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        {/* Cómo funcionan los precios — explicado de frente, no como letra pequeña */}
        <FadeIn delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-brand-soft/25 bg-white/[0.04] md:mt-20">
            <div className="border-b border-white/10 px-7 py-7 md:px-10 md:py-9">
              <p className="text-xs font-medium tracking-[0.3em] text-brand-soft uppercase">
                Cómo funcionan los precios
              </p>
              <h3 className="mt-4 max-w-2xl font-display text-2xl leading-snug font-semibold text-cream md:text-3xl">
                Hay dos precios por noche: el normal y el{" "}
                <span className="text-brand-soft">precio de viajero</span>.
              </h3>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              <div className="bg-deep px-7 py-7 md:px-10 md:py-9">
                <p className="font-display text-lg font-semibold text-cream">
                  Precio normal
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  Se aplica los fines de semana. También de lunes a viernes
                  cuando se hospedan{" "}
                  <strong className="font-semibold text-cream/85">
                    dos personas o más
                  </strong>
                  .
                </p>
              </div>
              <div className="bg-deep px-7 py-7 md:px-10 md:py-9">
                <p className="font-display text-lg font-semibold text-brand-soft">
                  Precio de viajero
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  Tarifa especial de{" "}
                  <strong className="font-semibold text-cream/85">
                    lunes a viernes
                  </strong>
                  , válida únicamente cuando viaja{" "}
                  <strong className="font-semibold text-cream/85">
                    una sola persona
                  </strong>
                  . Si van dos o más, aplica el precio normal aunque sea entre
                  semana.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Los tres tipos con sus precios reales */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {TYPES.map((t, i) => (
            <FadeIn key={t.tag} delay={0.1 + i * 0.08}>
              <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-8">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-xl font-semibold text-cream">
                    {t.tag}
                  </p>
                  <p className="text-xs text-cream/45">{t.range}</p>
                </div>
                <p className="mt-3 text-sm text-brand-soft">{t.bed}</p>

                <dl className="mt-7 space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-cream/55">Precio normal</dt>
                    <dd className="font-display text-2xl font-bold text-cream">
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
                    <dd className="font-display text-2xl font-bold text-brand-soft">
                      {t.traveler}
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 text-xs text-cream/35">Precios por noche</p>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Habitación 5 — la única con cama king */}
        <FadeIn delay={0.1}>
          <div className="mt-5 flex flex-col gap-6 rounded-3xl border border-brand-soft/30 bg-brand/15 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-brand-soft uppercase">
                Habitación 5
              </p>
              <p className="mt-4 font-display text-2xl leading-snug font-semibold text-cream md:text-3xl">
                La única con cama king de todo el hotel.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/60">
                Es del Tipo 1, pero en lugar de las dos camas matrimoniales
                lleva una sola cama king. Si es la que buscas, conviene pedirla
                por número al momento de reservar.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 self-start rounded-full border border-brand-soft/40 px-6 py-3 text-sm font-medium text-cream transition-all hover:bg-brand-soft/10 sm:self-auto"
            >
              Preguntar por la 5
            </a>
          </div>
        </FadeIn>

        {/* Qué incluye toda habitación */}
        <FadeIn delay={0.1}>
          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-9">
            <p className="text-xs font-medium tracking-[0.3em] text-brand-soft uppercase">
              Incluido en las 23 habitaciones
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-cream/75"
                >
                  {item}
                </li>
              ))}
            </ul>

            <dl className="mt-9 grid gap-7 border-t border-white/10 pt-7 sm:grid-cols-3">
              <div>
                <dt className="font-display text-base font-semibold text-cream">
                  Capacidad para 2 personas
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/55">
                  Es la base de cualquier habitación, sin costo adicional.
                </dd>
              </div>
              <div>
                <dt className="font-display text-base font-semibold text-cream">
                  Niños de 0 a 12 años, sin costo
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/55">
                  No pagan extra ni cuentan como persona adicional.
                </dd>
              </div>
              <div>
                <dt className="font-display text-base font-semibold text-cream">
                  Q150 por persona adicional
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/55">
                  De 13 años en adelante. Incluye cama extra dentro de la misma
                  habitación.
                </dd>
              </div>
            </dl>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-brand px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30"
          >
            Consultar disponibilidad
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
