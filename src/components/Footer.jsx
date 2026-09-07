import {
  ADDRESS,
  MAPS_EMBED_URL,
  PHONE_DISPLAY,
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
                    className="text-sm text-white/70 transition-colors hover:text-white"
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

          <iframe
            title="Ubicación de Hotel Cabelas en Google Maps"
            src={MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full rounded-panel border-0 opacity-90 grayscale lg:h-full lg:min-h-[22rem]"
          />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row">
          <p>© 2026 Hotel Cabelas — Mazatenango, Suchitepéquez, Guatemala</p>
          <p>Propuesta de diseño · Demo sin compromiso</p>
        </div>
      </div>
    </footer>
  );
}
