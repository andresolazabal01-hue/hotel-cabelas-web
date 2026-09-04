import { useEffect } from "react";

/**
 * Vincula el avance de un <video> al progreso de scroll (MotionValue 0–1).
 * El video queda pausado y su currentTime se controla manualmente.
 *
 * Compatible con moviles:
 * - iOS ignora `preload` y no pinta frames hasta desbloquear el video:
 *   un play()+pause() silencioso al montar (permitido por ir muted) lo activa.
 * - Los seeks se encadenan con el evento `seeked` para no encolar mas
 *   busquedas de las que el decodificador del telefono puede procesar.
 */
export default function useVideoScrub(videoRef, progress) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.load();
    const unlock = video.play();
    if (unlock) {
      unlock
        .then(() => {
          video.pause();
          video.currentTime = 0;
        })
        .catch(() => {});
    }

    let target = 0;
    const apply = () => {
      if (!video.duration) return;
      const t = Math.min(target, 0.999) * video.duration;
      if (Math.abs(t - video.currentTime) > 0.01) {
        video.currentTime = t;
      }
    };

    const onSeeked = () => apply();
    const onLoaded = () => apply();
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onLoaded);

    const unsubscribe = progress.on("change", (p) => {
      target = p;
      if (!video.seeking) apply();
    });

    return () => {
      unsubscribe();
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoaded);
    };
  }, [videoRef, progress]);
}
