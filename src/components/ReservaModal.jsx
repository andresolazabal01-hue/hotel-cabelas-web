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

// El valor que viaja al mensaje lleva la descripción entre paréntesis
// ("Tipo 1 (2 camas matrimoniales)"). En pantalla se parte en dos: el
// nombre pesa y la descripción acompaña debajo, sin el paréntesis.
function partir(valor) {
  const m = valor.match(/^(.+?) \((.+)\)$/);
  return m
    ? { nombre: m[1], descripcion: m[2] }
    : { nombre: valor, descripcion: "" };
}

const ETIQUETA = "text-sm text-cream/70";
const GRUPO = "border-t border-white/8 py-7";

function Icono({ d, className = "size-[18px]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}

/* Dropdown propio. El select nativo pinta su lista con los colores del
   sistema — aquí, gris claro sobre blanco — y eso no se corrige con CSS.
   La lista se despliega dentro del flujo, no flotando: en un contenedor
   con scroll una capa absoluta se recorta contra el borde. */
function SelectorTipo({ valor, onChange, idEtiqueta }) {
  const [abierto, setAbierto] = useState(false);
  const [marcado, setMarcado] = useState(0);
  const caja = useRef(null);
  const disparador = useRef(null);
  const lista = useRef(null);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e) => {
      if (!caja.current?.contains(e.target)) setAbierto(false);
    };
    document.addEventListener("pointerdown", fuera);
    return () => document.removeEventListener("pointerdown", fuera);
  }, [abierto]);

  // Desplegada en el flujo, la lista puede quedar por debajo del borde del
  // cuerpo con scroll: se la trae a la vista al abrir.
  useEffect(() => {
    if (abierto) lista.current?.scrollIntoView({ block: "nearest" });
  }, [abierto]);

  const abrir = () => {
    setMarcado(Math.max(0, TIPOS.indexOf(valor)));
    setAbierto(true);
  };

  const elegir = (t) => {
    onChange(t);
    setAbierto(false);
    disparador.current?.focus();
  };

  const alTeclear = (e) => {
    // Escape cierra la lista, no el modal: hay que cortar la propagación
    // antes de que el evento llegue al listener de la ventana.
    if (e.key === "Escape" && abierto) {
      e.stopPropagation();
      setAbierto(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!abierto) {
        abrir();
        return;
      }
      const paso = e.key === "ArrowDown" ? 1 : TIPOS.length - 1;
      setMarcado((i) => (i + paso) % TIPOS.length);
      return;
    }
    if (abierto && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      elegir(TIPOS[marcado]);
    }
  };

  const elegido = valor ? partir(valor) : null;

  return (
    <div ref={caja} onKeyDown={alTeclear}>
      <button
        ref={disparador}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-labelledby={idEtiqueta}
        aria-activedescendant={abierto ? `tipo-opcion-${marcado}` : undefined}
        data-abierto={abierto ? "true" : "false"}
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        className="campo mt-2 flex items-center justify-between gap-4 text-left"
      >
        {elegido ? (
          <span className="min-w-0">
            <span className="block truncate text-cream">{elegido.nombre}</span>
            <span className="mt-0.5 block truncate text-sm text-cream/60">
              {elegido.descripcion}
            </span>
          </span>
        ) : (
          <span className="text-cream/55">Elegir…</span>
        )}
        <Icono
          d={<path d="m6 9.5 6 6 6-6" />}
          className={`size-[18px] shrink-0 text-cream/60 transition-transform duration-200 ${
            abierto ? "-scale-y-100" : ""
          }`}
        />
      </button>

      {abierto ? (
        <ul
          ref={lista}
          role="listbox"
          aria-labelledby={idEtiqueta}
          className="mt-1.5 overflow-hidden rounded-control border border-brand-soft/30 bg-ink"
        >
          {TIPOS.map((t, i) => {
            const { nombre, descripcion } = partir(t);
            const activo = t === valor;
            return (
              <li key={t}>
                <button
                  id={`tipo-opcion-${i}`}
                  type="button"
                  role="option"
                  aria-selected={activo}
                  tabIndex={-1}
                  onClick={() => elegir(t)}
                  onPointerEnter={() => setMarcado(i)}
                  className={`flex w-full items-center gap-3 border-b border-white/6 px-4 py-3 text-left transition-colors duration-150 last:border-b-0 ${
                    i === marcado ? "bg-brand-soft/12" : ""
                  }`}
                >
                  {/* Filete de 2 px a la izquierda de la opción elegida:
                      marca el estado sin recurrir a una palomita de librería. */}
                  <span
                    aria-hidden="true"
                    className={`h-8 w-[2px] shrink-0 ${
                      activo ? "bg-brand-soft" : "bg-transparent"
                    }`}
                  />
                  <span className="min-w-0">
                    <span className="block text-base text-cream">{nombre}</span>
                    <span className="mt-0.5 block text-sm text-cream/60">
                      {descripcion}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

// onChange recibe un actualizador, no un valor: dos toques seguidos en el
// mismo frame leerían el mismo "valor" del closure y se perdería uno.
function Contador({ etiqueta, valor, minimo, onChange }) {
  const boton =
    "foco-marca grid size-11 shrink-0 place-items-center rounded-control border border-white/15 text-cream transition-colors duration-200 hover:border-brand-soft hover:bg-brand-soft/10 active:bg-brand-soft/20 disabled:border-white/8 disabled:text-cream/25 disabled:hover:bg-transparent";
  return (
    <div>
      <span className={ETIQUETA}>{etiqueta}</span>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          className={boton}
          onClick={() => onChange((v) => Math.max(minimo, v - 1))}
          disabled={valor <= minimo}
          aria-label={`Quitar ${etiqueta.toLowerCase()}`}
        >
          <Icono d={<path d="M6 12h12" />} />
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
          onClick={() => onChange((v) => v + 1)}
          aria-label={`Agregar ${etiqueta.toLowerCase()}`}
        >
          <Icono d={<path d="M12 6v12M6 12h12" />} />
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
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/85 backdrop-blur-md sm:items-center sm:p-6"
      onClick={() => setAbierto(false)}
    >
      {/* Tres bandas: cabecera y pie quietos, y el medio con el scroll. Así el
          botón de reservar queda siempre a la vista, incluso con el teclado
          del celular abierto encogiendo la ventana. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-reserva"
        onClick={(e) => e.stopPropagation()}
        className="hoja-reserva flex w-full max-w-lg flex-col overflow-hidden rounded-t-panel bg-charcoal sm:rounded-panel"
      >
        {/* Con la ventana baja la cabecera cede altura: queda más formulario
            a la vista sin sacrificar nada del contenido. */}
        <div className="shrink-0 px-6 pt-6 pb-5 baja:pt-4 baja:pb-3 sm:px-8 sm:pt-7 sm:baja:pt-4">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="section-label-invert">Reserva</p>
              <h2
                id="titulo-reserva"
                className="display-soft font-display text-[1.7rem] leading-tight font-normal text-cream baja:text-[1.35rem]"
              >
                Arma tu reserva.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
              className="foco-marca -mt-1 -mr-2 grid size-11 shrink-0 place-items-center rounded-control text-cream/60 transition-colors duration-200 hover:bg-white/6 hover:text-cream"
            >
              <Icono d={<path d="M6 6l12 12M18 6L6 18" />} className="size-5" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-cream/60">
            Completa los datos y te llevamos a WhatsApp con el mensaje ya
            escrito. Nada se envía a ningún servidor.
          </p>
        </div>

        {/* data-lenis-prevent: Lenis escucha la rueda y el touchmove a nivel
            de documento y, mientras está detenido, cancela los dos. Con eso
            el scroll de esta caja quedaba muerto aunque la barra se viera.
            El atributo le dice que no toque los gestos que nacen aquí. */}
        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8"
        >
          {/* Los filetes agrupan: fechas, habitación, personas y detalle son
              cuatro decisiones distintas, no cinco campos separados por el
              mismo hueco repetido. */}
          <div className="grid gap-4 border-t border-white/8 py-7 sm:grid-cols-2 sm:gap-5">
            <label className="block">
              <span className={ETIQUETA}>Llegada</span>
              <input
                ref={primerCampo}
                type="date"
                value={llegada}
                min={hoyISO()}
                onChange={(e) => {
                  setLlegada(e.target.value);
                  setError("");
                }}
                className="campo mt-2"
              />
            </label>
            <label className="block">
              <span className={ETIQUETA}>Salida</span>
              <input
                type="date"
                value={salida}
                min={llegada || hoyISO()}
                onChange={(e) => {
                  setSalida(e.target.value);
                  setError("");
                }}
                className="campo mt-2"
              />
            </label>
          </div>

          <div className={GRUPO}>
            <span id="etiqueta-tipo" className={ETIQUETA}>
              Tipo de habitación
            </span>
            <SelectorTipo
              valor={tipo}
              idEtiqueta="etiqueta-tipo"
              onChange={(t) => {
                setTipo(t);
                setError("");
              }}
            />
          </div>

          <div className={`${GRUPO} grid grid-cols-2 gap-5`}>
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

          <label className="block border-t border-white/8 pt-7 pb-8">
            <span className={ETIQUETA}>Detalle extra</span>
            <textarea
              rows={3}
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="Ej. parqueo seguro, hora estimada de llegada..."
              className="campo mt-2 resize-none"
            />
          </label>
        </div>

        <div className="shrink-0 border-t border-white/10 bg-charcoal px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
          {error ? (
            <p role="alert" className="mb-4 text-sm text-brand-soft">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={enviar}
            className="btn-solido w-full px-6 py-4 text-base"
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
    </div>
  );
}
