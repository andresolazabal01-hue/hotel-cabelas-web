import { useCallback, useEffect, useRef, useState } from "react";

// El recorrido es proporcional al ancho del bloque: arrastrar de un borde
// al otro recorre el video entero. Un valor fijo en pixeles se sentia bien
// en escritorio y roto en un telefono, donde el bloque mide la mitad y los
// videos largos pedian varias pasadas para avanzar un poco.

const TONES = {
  dark: {
    track: "bg-white/15",
    fill: "bg-brand-soft",
    tag: "font-display text-lg font-medium text-cream",
    bed: "text-sm text-brand-soft",
  },
  light: {
    track: "bg-charcoal/12",
    fill: "bg-brand",
    tag: "font-display text-lg font-medium text-charcoal",
    bed: "text-sm text-brand-dark",
  },
};

export default function DragScrubVideo({
  src,
  poster,
  title,
  subtitle,
  tone = "dark",
  ratio = "9/16",
  maxVh = 70,
  maxWidth,
  className = "",
}) {
  const [ratioW, ratioH] = ratio.split("/").map(Number);

  // El alto se limita acotando el ancho: ancho = alto x proporcion. Asi el
  // bloque entra en pantalla sin deformar el video ni recortarlo.
  const altoTope = `calc(${maxVh}svh * ${ratioW} / ${ratioH})`;
  const cap = maxWidth ? `min(${maxWidth}, ${altoTope})` : altoTope;
  const videoRef = useRef(null);
  const drag = useRef({ active: false, x: 0, t: 0 });
  const raf = useRef(0);
  const pending = useRef(null);

  const [progress, setProgress] = useState(0);
  const [touched, setTouched] = useState(false);

  const t = TONES[tone] ?? TONES.dark;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Arranca detenido en el primer cuadro: nunca se reproduce solo.
    video.pause();

    // El archivo completo se trae solo cuando el bloque se acerca a la
    // pantalla; asi el arrastre responde sin descargar todo de entrada.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.preload = "auto";
        video.load();
        io.disconnect();
      },
      { rootMargin: "400px" },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Un seek por cuadro: encadenar currentTime sin throttle traba el video.
  const flush = useCallback(() => {
    raf.current = 0;
    const video = videoRef.current;
    if (!video || pending.current === null) return;
    video.currentTime = pending.current;
    setProgress(video.duration ? pending.current / video.duration : 0);
    pending.current = null;
  }, []);

  const seek = useCallback(
    (time) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || !video.duration) return;
      pending.current = Math.min(Math.max(time, 0), video.duration);
      if (!raf.current) raf.current = requestAnimationFrame(flush);
    },
    [flush],
  );

  const onPointerDown = (e) => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    drag.current = {
      active: true,
      x: e.clientX,
      t: video.currentTime,
      ancho: e.currentTarget.clientWidth,
    };
    // Puede lanzar si el puntero ya no esta activo; el arrastre funciona
    // igual sin captura, asi que no vale tumbar el componente por esto.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* sin captura */
    }
    setTouched(true);
  };

  const onPointerMove = (e) => {
    const { active, x, t, ancho } = drag.current;
    const video = videoRef.current;
    if (!active || !ancho || !video?.duration) return;
    seek(t + ((e.clientX - x) / ancho) * video.duration);
  };

  const onPointerUp = (e) => {
    drag.current.active = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* ya liberado */
    }
  };

  // El arrastre no llega por teclado: las flechas recorren lo mismo.
  const onKeyDown = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const step = e.shiftKey ? 1 : 0.25;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setTouched(true);
      seek(video.currentTime + step);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setTouched(true);
      seek(video.currentTime - step);
    }
  };

  return (
    <figure className={className} style={{ maxWidth: cap }}>
      {title ? <h4 className={t.tag}>{title}</h4> : null}
      {subtitle ? <p className={`mt-1 ${t.bed}`}>{subtitle}</p> : null}

      <div
        role="slider"
        aria-label={`Recorrido en video: ${title ?? "habitación"}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className={`foco-marca relative cursor-ew-resize touch-pan-y overflow-hidden rounded-panel select-none ${title ? "mt-5" : ""}`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          style={{ aspectRatio: `${ratioW} / ${ratioH}` }}
          className="pointer-events-none block w-full bg-ink object-cover"
        />

        {/* Pista de uso: se desvanece con el primer arrastre */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-linear-to-t from-ink/70 to-transparent pt-12 pb-5 transition-opacity duration-500 ${
            touched ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="flex items-center gap-2.5 rounded-control bg-ink/75 px-4 py-2.5 text-sm text-white backdrop-blur-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[18px]"
            >
              <path d="M6.5 9 3.5 12l3 3" />
              <path d="m17.5 9 3 3-3 3" />
              <path d="M4 12h16" />
            </svg>
            Arrastra para recorrer
          </span>
        </div>
      </div>

      <div className={`mt-3 h-[3px] w-full overflow-hidden ${t.track}`}>
        <div
          className={`h-full origin-left ${t.fill}`}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </figure>
  );
}
