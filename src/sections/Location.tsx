import { SITE } from '../config/site';
import { useShopStatus } from '../hooks/useShopStatus';
import styles from './Location.module.css';

const MAPS_URL =
  'https://maps.google.com/?q=Sri+Kanya+Handicrafts+Sannathi+Street+Kanyakumari';

const DIRECTIONS = [
  'Begin at Kanyakumari Junction Railway Station.',
  'Walk east along Sannathi Street, the temple road.',
  'Find us on the street, directly before the Bhagavathy Amman Temple.',
];

/**
 * LOCATION — an editorial split: the walking directions, live open/closed
 * indicator (9 AM – 9 PM IST) and Google Maps link on the left, the daylight
 * photograph of the cape (Vivekananda Rock + Thiruvalluvar statue over the
 * cobalt sea) on the right. All information also exists as plain text.
 */
export function Location() {
  const status = useShopStatus();

  return (
    <section id="location" className={styles.section} aria-labelledby="location-title">
      <div className={styles.grid}>
        <div className={styles.info}>
          <p className={styles.kicker}>Find Us</p>
          <h2 id="location-title" className={styles.heading}>
            On Sannathi Street, Kanyakumari
          </h2>

          <p
            className={`${styles.status} ${status.open ? styles.open : styles.closed}`}
            role="status"
          >
            <span className={styles.statusDot} aria-hidden="true" />
            {status.open ? 'Open now' : 'Closed now'} · 9:00 AM – 9:00 PM daily
          </p>

          <address className={styles.address}>
            {SITE.location.street}
            <br />
            {SITE.location.city}, {SITE.location.region} 629702, {SITE.location.country}
          </address>
          <p className={styles.landmark}>
            Directly in front of the Arulmigu Bhagavathy Amman Temple, where the three
            seas meet.
          </p>

          <ol className={styles.directions}>
            {DIRECTIONS.map((step, i) => (
              <li key={i}>
                <span className={styles.stepNum} aria-hidden="true">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <a className={styles.mapsBtn} href={MAPS_URL} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </div>

        <figure className={styles.photoCard}>
          <img
            className={styles.photo}
            src="/media/subash-matheswaran-GCeTOmPAGms-unsplash.jpg"
            alt="The Vivekananda Rock Memorial and Thiruvalluvar statue on the rock island off Kanyakumari, seen across the daytime sea"
            loading="lazy"
            decoding="async"
          />
          <figcaption className={styles.photoCaption}>
            Kanyakumari, where the three seas meet — a short walk from the shop.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
