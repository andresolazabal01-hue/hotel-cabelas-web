import { useState } from "react";
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

  // Sin soporte o con permiso denegado el bloque desaparece: la dirección
  // completa ya está en esta misma sección, así que no falta nada.
  if (estado === "sin-resultado") return null;

  const calcular = () => {
    if (!("geolocation" in navigator)) {
      setEstado("sin-resultado");
      return;
    }
    setEstado("calculando");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // La posición se usa aquí y se descarta: al estado solo entra el
        // resultado ya calculado, nunca las coordenadas.
        const km = distanciaKm(pos.coords.latitude, pos.coords.longitude);
        setResultado({ km, min: minutosAprox(km) });
        setEstado("resuelto");
      },
      () => setEstado("sin-resultado"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 },
    );
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
