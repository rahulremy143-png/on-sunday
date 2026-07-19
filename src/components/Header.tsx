import { SITE } from '../config/site';
import { AmbientToggle } from './AmbientToggle';
import { InstagramIcon, WhatsAppIcon } from './icons';
import styles from './Header.module.css';

/**
 * Minimal fixed site chrome. In Phase 2 the section links moved into the
 * fixed <ConstellationNav>; the header now carries the brand wordmark, the
 * ambient-audio toggle, and the WhatsApp/Instagram links.
 */
export function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#hero">
        <span className={styles.monogram}>{SITE.monogram}</span>
        <span className={styles.wordmark}>{SITE.name}</span>
      </a>

      <div className={styles.actions}>
        <AmbientToggle />
        <a
          className={styles.iconBtn}
          href={SITE.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${SITE.name} on WhatsApp`}
        >
          <WhatsAppIcon />
        </a>
        <a
          className={styles.iconBtn}
          href={SITE.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${SITE.name} on Instagram`}
        >
          <InstagramIcon />
        </a>
      </div>
    </header>
  );
}
