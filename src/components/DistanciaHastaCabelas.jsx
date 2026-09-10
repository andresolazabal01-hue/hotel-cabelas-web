import { useEffect, useRef, useState } from "react";
import { CABELAS_COORDS } from "../data.js";

// El recorrido en carretera siempre es mayor que la línea recta: 1.4 es
// el rodeo típico. Con las velocidades de abajo da una estimación, no
// una ruta — por eso el texto en pantalla dice "aproximadamente".
const FACTOR_CARRETERA = 1.4;

function distanciaKm(lat, lon) {
  const R = 6371;
  const rad = (g) => (g * Math.PI) / 180;
  const dLat = rad(lat - CABELAS_COORDS.lat);
  const dLon = rad(lon - CABELAS_COORDS.lon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(CABELAS_COORDS.lat)) *
      Math.cos(rad(lat)) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function minutosAprox(km) {
  const ruta = km * FACTOR_CARRETERA;
  const velocidad = ruta < 5 ? 25 : ruta < 40 ? 50 : 60;
  return Math.max(1, Math.round((ruta / velocidad) * 60));
}

function textoDistancia(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

function textoTiempo(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const resto = min % 60;
  return resto ? `${h} h ${resto} min` : `${h} h`;
}

export default function DistanciaHastaCabelas() {
  const [estado, setEstado] = useState("inicial");
  const [resultado, setResultado] = useState(null);

  const guardia = useRef(0);
  const contestado = useRef(false);

  useEffect(() => () => clearTimeout(guardia.current), []);

  const calcular = () => {
    // El navegador integrado de WhatsApp o Instagram a veces ni expone la
    // API. Se comprueba antes de tocarla.
    if (!navigator.geolocation?.getCurrentPosition) {
      setEstado("error");
      return;
    }

    contestado.current = false;
    const cerrar = (siguiente) => {
      if (contestado.current) return;
      contestado.current = true;
      clearTimeout(guardia.current);
      siguiente();
    };

    // Cuando el permiso está bloqueado por la app anfitriona, algunos
    // navegadores no llaman de vuelta ni al éxito ni al error, ni respetan
    // su propio timeout: el botón se quedaría girando para siempre.
    guardia.current = setTimeout(() => cerrar(() => setEstado("error")), 6000);

    // La llamada va aquí mismo, sin nada asíncrono de por medio: varios
    // navegadores solo muestran el permiso si sale del gesto del usuario.
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        cerrar(() => {
          // La posición se usa aquí y se descarta: al estado solo entra el
          // resultado ya calculado, nunca las coordenadas.
          const km = distanciaKm(pos.coords.latitude, pos.coords.longitude);
          setResultado({ km, min: minutosAprox(km) });
          setEstado("resuelto");
        }),
      () => cerrar(() => setEstado("error")),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
    );

    setEstado("calculando");
  };

  if (estado === "resuelto") {
    return (
      <div className="border-t border-white/10 pt-5">
        <p className="text-sm text-white/70">Estás a</p>
        <p className="display-soft mt-1 font-display text-4xl leading-none font-medium text-brand-soft md:text-5xl">
          {textoDistancia(resultado.km)}
        </p>
        <p className="mt-3 text-sm text-white/70">
          aproximadamente{" "}
          <span className="text-white">{textoTiempo(resultado.min)}</span> en
          carro
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/60">
          Distancia en línea recta y tiempo estimado, calculados en tu
          navegador. Tu ubicación no se guarda ni se envía a ningún servidor.
        </p>
      </div>
    );
  }

  if (estado === "error") {
    return (
      <div className="border-t border-white/10 pt-5">
        <p role="status" className="text-sm leading-relaxed text-white/70">
          No pudimos calcular tu ubicación automáticamente. Si estás en la app
          de WhatsApp o Instagram, abre este enlace en Chrome o Safari para que
          funcione.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-white/10 pt-5">
      {estado === "calculando" ? (
        <p className="py-3.5 text-center text-sm text-white/70">
          Calculando distancia…
        </p>
      ) : (
        <button
          type="button"
          onClick={calcular}
          className="btn-filete w-full px-6 py-3.5"
        >
          Calcular mi distancia
        </button>
      )}
    </div>
  );
}
