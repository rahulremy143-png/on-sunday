import { useCallback, useRef } from 'react';

interface TiltHandlers {
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: (e: React.PointerEvent<HTMLElement>) => void;
}

/**
 * Pointer-driven 3D tilt for the gallery "crystals". Writes CSS custom
 * properties (--rx, --ry, --mx, --my) on the element so the transform + glass
 * sheen live in CSS. No-op under reduced motion or on coarse (touch) pointers.
 */
export function useTilt(max = 5): TiltHandlers {
  const raf = useRef(0);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'touch') return;
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`);
        el.style.setProperty('--rx', `${-(py - 0.5) * 2 * max}deg`);
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
      });
    },
    [max],
  );

  const onPointerLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    // Reset to rest — the CSS transition eases the transform back.
    const el = e.currentTarget;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  }, []);

  return { onPointerMove, onPointerLeave };
}
