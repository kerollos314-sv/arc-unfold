import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

export const FRAME_COUNT = 150;

const framePath = (i: number) => `/assets/sequence/${String(i).padStart(4, "0")}.webp`;

/**
 * Canvas-based image-sequence player.
 * Every frame is preloaded into memory before playback so scrubbing stays
 * flicker-free in both directions.
 */
export function SequenceCanvas({
  progress,
  onProgress,
}: {
  progress: MotionValue<number>;
  onProgress?: (loaded: number, total: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const draw = (frame: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frame];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;

    ctx.filter = "brightness(0.6) contrast(1.18) saturate(1.15)";
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.filter = "none";

    const grd = ctx.createRadialGradient(
      w / 2,
      h / 2,
      Math.min(w, h) * 0.16,
      w / 2,
      h / 2,
      Math.max(w, h) * 0.72,
    );
    grd.addColorStop(0, "rgba(0,0,0,0)");
    grd.addColorStop(1, "rgba(0,0,0,0.8)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
  };

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;

    const loadOne = (index: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        const done = () => {
          loaded += 1;
          onProgress?.(loaded, FRAME_COUNT);
          resolve();
        };
        img.onload = () => {
          if (index === 0 && !cancelled) requestAnimationFrame(() => draw(0));
          done();
        };
        img.onerror = done;
        img.src = framePath(index + 1);
        images[index] = img;
      });

    (async () => {
      const queue = Array.from({ length: FRAME_COUNT }, (_, i) => i);
      const workers = Array.from({ length: 8 }, async () => {
        while (queue.length && !cancelled) {
          const next = queue.shift();
          if (next === undefined) return;
          await loadOne(next);
        }
      });
      await Promise.all(workers);
      if (cancelled) return;
      setReady(true);
      draw(Math.round(progress.get() * (FRAME_COUNT - 1)));
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(progress, "change", (p: number) => {
    const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
    if (frame === frameRef.current) return;
    frameRef.current = frame;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(frame));
  });

  useEffect(() => {
    const onResize = () => draw(Math.max(frameRef.current, 0));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Exploded technical view of the ATLAS Chronos smartwatch internals"
      className="h-full w-full"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 800ms ease" }}
    />
  );
}
