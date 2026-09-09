import { useEffect, useRef, useState } from "react";
import { EVENTO_RESERVA, TIPOS } from "../reserva.js";
import { WHATSAPP_NUMERO } from "../data.js";

// Fecha de hoy en local. toISOString daría UTC y en Guatemala (UTC-6)
// eso adelanta un día durante buena parte de la tarde.
function hoyISO() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// Se formatea partiendo la cadena, sin construir un Date: pasar por Date
// vuelve a meter el corrimiento de zona horaria.
function fechaLegible(iso) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

const plural = (n, singular, pluralPalabra) =>
  `${n} ${n === 1 ? singular : pluralPalabra}`;

function armarMensaje({ llegada, salida, tipo, adultos, ninos, detalle }) {
  const personas =
    plural(adultos, "adulto", "adultos") +
    (ninos > 0 ? `, ${plural(ninos, "niño", "niños")}` : "");

  const lineas = [
    "¡Hola, Hotel Cabelas! 👋 Me gustaría confirmar la siguiente reserva:",
    `📅 Fechas: ${fechaLegible(llegada)} al ${fechaLegible(salida)}`,
    `🛏️ Habitación: ${tipo}`,
    `👥 Personas: ${personas}`,
  ];
  if (detalle.trim()) lineas.push(`📝 Detalle: ${detalle.trim()}`);
  lineas.push("", "¿Me confirman disponibilidad y el costo total, por favor?");

  return lineas.join("\n");
}

const CAMPO =
  "w-full rounded-control border border-white/15 bg-white/5 px-4 py-3.5 text-base text-cream placeholder:text-cream/35 focus:border-brand-soft focus:outline-none [color-scheme:dark]";

function Contador({ etiqueta, valor, minimo, onChange }) {
  const boton =
    "grid size-11 shrink-0 place-items-center rounded-control border border-white/15 text-lg text-cream transition-colors hover:border-brand-soft hover:bg-brand-soft/10 disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-transparent";
  return (
    <div>
      <span className="text-sm text-cream/70">{etiqueta}</span>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          className={boton}
          onClick={() => onChange(Math.max(minimo, valor - 1))}
          disabled={valor <= minimo}
          aria-label={`Quitar ${etiqueta.toLowerCase()}`}
        >
          −
        </button>
        <span
          aria-live="polite"
          className="min-w-8 text-center font-display text-2xl font-medium text-cream"
        >
          {valor}
        </span>
        <button
          type="button"
          className={boton}
          onClick={() => onChange(valor + 1)}
          aria-label={`Agregar ${etiqueta.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function ReservaModal() {
  const [abierto, setAbierto] = useState(false);
  const [llegada, setLlegada] = useState("");
  const [salida, setSalida] = useState("");
  const [tipo, setTipo] = useState("");
  const [adultos, setAdultos] = useState(2);
  const [ninos, setNinos] = useState(0);
  const [detalle, setDetalle] = useState("");
  const [error, setError] = useState("");

  const primerCampo = useRef(null);

  useEffect(() => {
    const alAbrir = (e) => {
      const pedido = e.detail?.tipo;
      if (pedido && TIPOS.includes(pedido)) setTipo(pedido);
      setError("");
      setAbierto(true);
    };
    window.addEventListener(EVENTO_RESERVA, alAbrir);
    return () => window.removeEventListener(EVENTO_RESERVA, alAbrir);
  }, []);

  // Mismo bloqueo que el menú móvil: Lenis maneja el scroll, así que
  // hay que detenerlo además del body.
  useEffect(() => {
    if (!abierto) return;

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    primerCampo.current?.focus();

    const alTeclear = (e) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alTeclear);

    return () => {
      document.body.style.overflow = previo;
      window.__lenis?.start();
      window.removeEventListener("keydown", alTeclear);
    };
  }, [abierto]);

  if (!abierto) return null;

  const enviar = () => {
    if (!llegada || !salida) {
      setError("Elige la fecha de llegada y la de salida.");
      return;
    }
    // Las fechas ISO se comparan como texto sin ambigüedad.
    if (salida <= llegada) {
      setError("La salida tiene que ser después de la llegada.");
      return;
    }
    if (!tipo) {
      setError("Elige el tipo de habitación.");
      return;
    }

    const mensaje = armarMensaje({
      llegada,
      salida,
      tipo,
      adultos,
      ninos,
      detalle,
    });
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

    const ventana = window.open(url, "_blank", "noopener,noreferrer");
    if (!ventana) window.location.href = url;
    setAbierto(false);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-ink/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onClick={() => setAbierto(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-reserva"
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-lg rounded-panel bg-charcoal p-6 sm:p-8"
      >
        <button
          type="button"
          onClick={() => setAbierto(false)}
          aria-label="Cerrar"
          className="absolute top-4 right-4 grid size-11 place-items-center text-cream/60 transition-colors hover:text-cream"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="size-5"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="section-label-invert">Reserva</p>
        <h2
          id="titulo-reserva"
          className="display-soft font-display text-[1.7rem] leading-tight font-normal text-cream"
        >
          Arma tu reserva.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/60">
          Completa los datos y te llevamos a WhatsApp con el mensaje ya escrito.
          Nada se envía a ningún servidor.
        </p>

        <div className="mt-7 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-cream/70">Llegada</span>
              <input
                ref={primerCampo}
                type="date"
                value={llegada}
                min={hoyISO()}
                onChange={(e) => {
                  setLlegada(e.target.value);
                  setError("");
                }}
                className={`mt-2 ${CAMPO}`}
              />
            </label>
            <label className="block">
              <span className="text-sm text-cream/70">Salida</span>
              <input
                type="date"
                value={salida}
                min={llegada || hoyISO()}
                onChange={(e) => {
                  setSalida(e.target.value);
                  setError("");
                }}
                className={`mt-2 ${CAMPO}`}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm text-cream/70">Tipo de habitación</span>
            <select
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
                setError("");
              }}
              className={`mt-2 ${CAMPO}`}
            >
              <option value="">Elegir…</option>
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-5">
            <Contador
              etiqueta="Adultos"
              valor={adultos}
              minimo={1}
              onChange={setAdultos}
            />
            <Contador
              etiqueta="Niños"
              valor={ninos}
              minimo={0}
              onChange={setNinos}
            />
          </div>

          <label className="block">
            <span className="text-sm text-cream/70">Detalle extra</span>
            <textarea
              rows={3}
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="Ej. parqueo seguro, hora estimada de llegada..."
              className={`mt-2 resize-none ${CAMPO}`}
            />
          </label>
        </div>

        {error ? (
          <p role="alert" className="mt-5 text-sm text-brand-soft">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={enviar}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-control bg-brand px-6 py-4 text-base font-medium text-white transition-colors hover:bg-brand-dark"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
            aria-hidden="true"
          >
            <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.9-1.4A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3z" />
          </svg>
          Reservar por WhatsApp
        </button>
      </div>
    </div>
  );
}
