import { useCallback, useEffect, useRef, useState } from 'react';
import { AmbientOcean } from '../audio/ambient';

/**
 * React wrapper around AmbientOcean. Exposes `enabled` state and a `toggle`
 * that must be invoked from a user gesture (a button click). Never autoplays.
 */
export function useAmbientAudio() {
  const engineRef = useRef<AmbientOcean | null>(null);
  const [enabled, setEnabled] = useState(false);

  if (engineRef.current === null && typeof window !== 'undefined') {
    engineRef.current = new AmbientOcean();
  }

  const toggle = useCallback(async () => {
    const engine = engineRef.current;
    if (!engine) return;
    if (engine.isPlaying) {
      await engine.stop();
      setEnabled(false);
    } else {
      await engine.start();
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    return () => engineRef.current?.dispose();
  }, []);

  return { enabled, toggle };
}
