import DragScrubVideo from "./DragScrubVideo.jsx";
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
            <p className="section-label">El Triángulo</p>
            <h2 className="display-soft max-w-xl font-display text-[2rem] leading-[1.1] font-normal text-charcoal md:text-[2.5rem] lg:text-[3.1rem]">
              Un apartamento, no una habitación.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-charcoal/55">
            El Triángulo es un espacio aparte dentro de Cabelas, con su propia
            tarifa y su propia lógica. Pensado para grupos de hasta cuatro y
            para quien se queda más de unos días.
          </p>
        </div>

        {/* items-start: cada columna mide lo suyo y la tarjeta no se estira */}
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* El video manda en esta columna: va a ancho completo */}
          <div className="lg:col-span-7">
            <p className="display-soft max-w-xl font-display text-[1.5rem] leading-[1.22] font-normal text-charcoal md:text-[1.9rem]">
              Hasta 4 personas, con dos sofás cama, por{" "}
              <span className="text-brand-dark">Q600 la noche</span>.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">
              El precio es el mismo todos los días del año. El Triángulo no
              entra en el precio de viajero ni en ningún otro descuento — sabes
              desde el inicio exactamente cuánto vas a pagar.
            </p>

            <DragScrubVideo
              src="/videos/apartamento-triangulo.mp4"
              poster="/images/poster-apartamento-triangulo.jpg"
              tone="light"
              ratio="4/5"
              className="mt-10 w-full"
            />
          </div>

          {/* Las cifras bajan junto a la tarjeta para equilibrar la columna,
              que queda fija mientras se recorre el video. */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <dl className="grid grid-cols-3 gap-6 border-t border-charcoal/10 pt-8">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dt className="font-display text-3xl font-medium text-charcoal">
                    {f.value}
                  </dt>
                  <dd className="mt-2 text-xs leading-snug text-charcoal/50">
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-panel bg-charcoal p-8 md:p-9">
              <p className="text-sm text-brand-soft">Estadías largas</p>
              <p className="display-soft mt-4 font-display text-2xl leading-snug font-normal text-white">
                También se renta por mes.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                Es la opción para quien llega a Mazatenango por un proyecto y
                necesita un lugar fijo. Escríbenos con las fechas y te cotizamos
                el mes completo.
              </p>

              <p className="mt-6 text-sm leading-relaxed text-white/40">
                {STAYS.join(" · ")}
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-control bg-brand px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-dark"
              >
                Consultar El Triángulo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
