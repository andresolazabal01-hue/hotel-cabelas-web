import DragScrubVideo from "./DragScrubVideo.jsx";
import { abrirReserva, TIPOS } from "../reserva.js";

const FACTS = [
  { value: "4", label: "Personas como máximo" },
  { value: "2", label: "Sofás cama" },
  { value: "Q600", label: "La noche, para 2 personas" },
  { value: "Q150", label: "Por cada persona adicional" },
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
            tarifa. Pensado para grupos de hasta cuatro y para quien se queda
            más de unos días.
          </p>
        </div>

        {/* items-start: cada columna mide lo suyo y la tarjeta no se estira */}
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* El video manda en esta columna: va a ancho completo */}
          <div className="lg:col-span-7">
            <p className="display-soft max-w-xl font-display text-[1.5rem] leading-[1.22] font-normal text-charcoal md:text-[1.9rem]">
              Máximo 4 personas, con dos sofás cama.{" "}
              <span className="text-brand-dark">Q600 la noche para 2</span>, y
              Q150 adicionales por cada persona extra.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">
              El precio es el mismo todos los días del año. El Triángulo no
              entra en el precio de viajero ni en ningún otro descuento, así que
              sabes desde el inicio exactamente cuánto vas a pagar.
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
            {/* Tres renglones, no tres columnas. Antes esto era la misma
                caja que la franja de "Sobre nosotros" — mismas clases en el
                dt y en el dd — y se leía como el componente reciclado.
                Aquí el dato y su etiqueta comparten renglón, que además es
                lo que pide una columna de 400 px: a tres columnas, "Por
                noche, todos los días" cabe en 120 px. */}
            <dl className="border-t border-charcoal/10">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline gap-4 border-b border-charcoal/10 py-4"
                >
                  <dt className="display-soft min-w-[4.75rem] font-display text-[1.7rem] leading-none font-normal text-charcoal">
                    {f.value}
                  </dt>
                  <dd className="text-sm leading-snug text-charcoal/55">
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
              <p className="mt-4 text-sm leading-relaxed text-white/62">
                Es la opción para quien llega a Mazatenango por un proyecto y
                necesita un lugar fijo. Escríbenos con las fechas y te cotizamos
                el mes completo.
              </p>

              <p className="mt-6 text-sm leading-relaxed text-white/40">
                {STAYS.join(" · ")}
              </p>

              <button
                type="button"
                onClick={() => abrirReserva(TIPOS[3])}
                className="btn-solido mt-8 w-full px-6 py-3.5"
              >
                Consultar El Triángulo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
