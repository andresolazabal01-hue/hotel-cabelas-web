import { PHONE_DISPLAY } from "../data.js";
import { abrirReserva } from "../reserva.js";

export default function Booking() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 font-display text-[22vw] leading-none font-normal whitespace-nowrap text-white/[0.04] select-none">
        CABELAS
      </span>

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="section-label-invert">Reserva</p>

        <h2 className="display-soft font-display text-[2.6rem] leading-[1.06] font-normal text-white md:text-[3rem] lg:text-[3.8rem]">
          Reserva <span className="text-brand-soft">directo</span>.
          <br />
          Sin comisiones de terceros.
        </h2>

        <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-white/62">
          El precio de viajero,{" "}
          <span className="text-white/80">
            Q290 a Q350 la noche de lunes a viernes
          </span>
          , solo existe reservando con nosotros. Ninguna plataforma lo tiene,
          porque ninguna plataforma se queda con una comisión de por medio.
        </p>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/62">
          Escríbenos por WhatsApp y confirma tu habitación en minutos, a
          cualquier hora del día. Sin anticipo para apartarla.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => abrirReserva()}
            className="btn-solido px-8 py-4 text-base"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.9-1.4A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3z" />
            </svg>
            WhatsApp {PHONE_DISPLAY}
          </button>
          <span className="text-sm text-white/40">
            Respuesta a cualquier hora · 24/7
          </span>
        </div>
      </div>
    </section>
  );
}
