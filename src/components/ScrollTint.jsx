import { useEffect } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

// Recorrido del tinte a lo largo de la página, en colores de la paleta:
// frío al entrar, cálido en el centro, frío otra vez al cerrar.
const RECORRIDO = [
  { p: 0, rgb: [148, 163, 186] }, // brand-soft
  { p: 0.5, rgb: [200, 166, 120] }, // wood
  { p: 1, rgb: [74, 106, 150] }, // brand
];

// Smootherstep: el cambio se siente continuo, sin acelerones.
const suavizar = (t) => t * t * t * (t * (t * 6 - 15) + 10);

function tinteEn(p) {
  if (p <= 0) return RECORRIDO[0].rgb;
  for (let i = 1; i < RECORRIDO.length; i++) {
    if (p > RECORRIDO[i].p) continue;
    const a = RECORRIDO[i - 1];
    const b = RECORRIDO[i];
    const t = suavizar((p - a.p) / (b.p - a.p));
    return [0, 1, 2].map((k) =>
      Math.round(a.rgb[k] + (b.rgb[k] - a.rgb[k]) * t),
    );
  }
  return RECORRIDO[RECORRIDO.length - 1].rgb;
}

export default function ScrollTint() {
  const { scrollYProgress } = useScroll();

  const aplicar = (p) => {
    const [r, g, b] = tinteEn(p);
    document.documentElement.style.setProperty(
      "--tinte",
      `rgb(${r}, ${g}, ${b})`,
    );
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    aplicar(p);
  });

  useEffect(() => {
    // Con movimiento reducido el tinte se queda quieto en el punto medio
    // del recorrido, en vez de acompañar al scroll.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const inicial = () => aplicar(reduce.matches ? 0.5 : scrollYProgress.get());
    inicial();
    reduce.addEventListener("change", inicial);
    return () => reduce.removeEventListener("change", inicial);
  }, [scrollYProgress]);

  return null;
}
