import {
  ADDRESS,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
  PHONE_DISPLAY,
  WAZE_URL,
  WHATSAPP_URL,
} from "../data.js";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-charcoal pt-20 pb-8 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <img
              src="/images/logo-cabelas.webp"
              alt="Cabelas — El descanso que mereces"
              className="h-16 w-auto md:h-20"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
              Hospedaje impecable en el corazón de Mazatenango. Limpieza,
              seguridad y atención las 24 horas.
            </p>

            <dl className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-brand-soft">Dirección</dt>
                <dd className="mt-3 text-sm leading-relaxed text-white/70">
                  {ADDRESS}
                  <br />
                  Guatemala
                </dd>
              </div>
              <div>
                <dt className="text-sm text-brand-soft">Contacto</dt>
                <dd className="mt-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="foco-marca rounded-control text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {PHONE_DISPLAY} (WhatsApp)
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-brand-soft">Horario</dt>
                <dd className="mt-3 text-sm leading-relaxed text-white/70">
                  Abierto 24 horas
                  <br />
                  Los 7 días de la semana
                </dd>
              </div>
              <div>
                <dt className="text-sm text-brand-soft">A un paso</dt>
                <dd className="mt-3 text-sm leading-relaxed text-white/70">
                  Restaurante El Pirata
                  <br />
                  contiguo al hotel
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            <iframe
              title="Ubicación de Hotel Cabelas en Google Maps"
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full rounded-panel border-0 opacity-90 grayscale lg:min-h-[22rem] lg:flex-1"
            />

            {/* Atajos a la ruta ya trazada, que el mapa embebido no permite */}
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={WAZE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-filete px-6 py-3.5"
              >
                Abrir en Waze
              </a>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-filete px-6 py-3.5"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row">
          <p>© 2026 Hotel Cabelas — Mazatenango, Suchitepéquez, Guatemala</p>
          <p>Propuesta de diseño · Demo sin compromiso</p>
        </div>
      </div>
    </footer>
  );
}
