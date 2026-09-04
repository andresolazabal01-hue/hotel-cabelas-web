import FadeIn from "./FadeIn.jsx";
import { WHATSAPP_URL } from "../data.js";

const FACTS = [
  { value: "4", label: "Personas como máximo" },
  { value: "2", label: "Sofás cama" },
  { value: "Q600", label: "Por noche, todos los días" },
];

const STAYS = [
  "Técnicos en proyecto",
  "Trabajo temporal",
  "Equipos deportivos",
  "Estadías por temporada",
];

export default function Triangulo() {
  return (
    <section id="triangulo" className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeIn>
              <p className="mb-6 text-xs font-medium tracking-[0.35em] text-brand-dark uppercase">
                03 — El Triángulo
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="max-w-xl font-display text-4xl leading-tight font-semibold text-charcoal md:text-5xl">
                Un apartamento, no una habitación.
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-charcoal/55">
              El Triángulo es un espacio aparte dentro de Cabelas, con su propia
              tarifa y su propia lógica. Pensado para grupos de hasta cuatro y
              para quien se queda más de unos días.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-10 rounded-3xl border border-sand bg-white p-8 md:p-10">
              <div>
                <p className="max-w-xl font-display text-2xl leading-snug font-semibold text-charcoal md:text-3xl">
                  Hasta 4 personas, con dos sofás cama, por{" "}
                  <span className="text-brand-dark">Q600 la noche</span>.
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/60">
                  El precio es el mismo todos los días del año. El Triángulo no
                  entra en el precio de viajero ni en ningún otro descuento —
                  sabes desde el inicio exactamente cuánto vas a pagar.
                </p>
              </div>

              <dl className="grid gap-8 border-t border-sand pt-8 sm:grid-cols-3">
                {FACTS.map((f) => (
                  <div key={f.label}>
                    <dt className="font-display text-3xl font-bold text-charcoal">
                      {f.value}
                    </dt>
                    <dd className="mt-2 text-xs leading-snug text-charcoal/50">
                      {f.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-charcoal p-8 md:p-10">
              <div>
                <p className="text-xs font-medium tracking-[0.3em] text-brand-soft uppercase">
                  Estadías largas
                </p>
                <p className="mt-5 font-display text-2xl leading-snug font-semibold text-white">
                  También se renta por mes.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  Es la opción para quien llega a Mazatenango por un proyecto y
                  necesita un lugar fijo. Escríbenos con las fechas y te
                  cotizamos el mes completo.
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {STAYS.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/70"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand px-6 py-3.5 text-center text-sm font-medium text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30"
              >
                Consultar El Triángulo
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
