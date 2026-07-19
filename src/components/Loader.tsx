import { useEffect, useRef, useState } from 'react';
import { SITE } from '../config/site';
import styles from './Loader.module.css';

interface LoaderProps {
  /** Called once the loader has fully faded out. */
  onDone: () => void;
  /** When true, skip the animated ramp and finish quickly (reduced motion). */
  reducedMotion: boolean;
}

/**
 * Cinematic loading sequence: the SK monogram over a hairline progress arc.
 * Progress eases toward 100% and, once there, the overlay fades and unmounts.
 * Self-contained (procedural hero has no heavy assets to await).
 */
export function Loader({ onDone, reducedMotion }: LoaderProps) {
  const [progress, setProgress] = useState(reducedMotion ? 100 : 0);
  const [leaving, setLeaving] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    if (reducedMotion) {
      const t = window.setTimeout(() => setLeaving(true), 200);
      return () => window.clearTimeout(t);
    }

    const start = performance.now();
    const DURATION = 2200;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setLeaving(true), 260);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reducedMotion]);

  const handleTransitionEnd = () => {
    if (leaving) onDone();
  };

  return (
    <div
      className={`${styles.overlay} ${leaving ? styles.leaving : ''}`}
      onTransitionEnd={handleTransitionEnd}
      role="progressbar"
      aria-label="Loading the Sri Kanya Handicrafts experience"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className={styles.mark}>
        <span className={styles.monogram}>{SITE.monogram}</span>
        <span className={styles.ring} aria-hidden="true" />
      </div>
      <p className={styles.name}>{SITE.name}</p>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.fill} style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <p className={styles.percent} aria-hidden="true">
        {progress}%
      </p>
    </div>
  );
}
