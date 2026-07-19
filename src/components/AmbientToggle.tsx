import { useAmbientAudio } from '../hooks/useAmbientAudio';
import { SoundOffIcon, SoundOnIcon } from './icons';
import styles from './Header.module.css';

/**
 * Ambient-audio toggle. Generates a gentle Web Audio ocean wash (no asset),
 * OFF by default; starts only on this click (a user gesture). Never autoplays.
 */
export function AmbientToggle() {
  const { enabled, toggle } = useAmbientAudio();

  return (
    <button
      type="button"
      className={`${styles.iconBtn} ${enabled ? styles.iconBtnActive : ''}`}
      onClick={() => void toggle()}
      aria-pressed={enabled}
      aria-label={enabled ? 'Mute ambient ocean sound' : 'Play ambient ocean sound'}
      title={enabled ? 'Mute ambience' : 'Play ambience'}
    >
      {enabled ? <SoundOnIcon /> : <SoundOffIcon />}
    </button>
  );
}
