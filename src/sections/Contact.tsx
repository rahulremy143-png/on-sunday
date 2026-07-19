import { SITE } from '../config/site';
import { InstagramIcon, WhatsAppIcon } from '../components/icons';
import styles from './Contact.module.css';

/**
 * CONTACT — the finale. The golden-sunrise photograph returns, cropped tighter
 * and graded darker (bottom-anchored), as the closing frame. Over it: the
 * invitation, the WhatsApp + Instagram CTAs and the address, then a small photo
 * credit and copyright line. No decorative SVG — the photograph is the finish.
 */
export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.media} aria-hidden="true">
        <img
          className={styles.photo}
          src="/media/raimond-klavins-dtMxmra_jao-unsplash.jpg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className={styles.grade} />
      </div>

      <div className={styles.inner}>
        <p className={styles.kicker}>Say Hello</p>
        <h2 id="contact-title" className={styles.heading}>
          Let us make something that lasts
        </h2>
        <p className={styles.lead}>
          A temple figure, a wedding gift, a keepsake of the coast — tell us what you
          have in mind and our artisans will shape it by hand. Or simply visit us on
          Sannathi Street.
        </p>

        <div className={styles.actions}>
          <a
            className={styles.whatsapp}
            href={SITE.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Message on WhatsApp
          </a>
          <a
            className={styles.instagram}
            href={SITE.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon /> {SITE.instagram.handle}
          </a>
        </div>

        <address className={styles.address}>
          {SITE.location.street}, {SITE.location.city}, {SITE.location.region} 629702 ·{' '}
          <a href={`tel:${SITE.whatsapp.display.replace(/\s/g, '')}`}>{SITE.whatsapp.display}</a>
        </address>
      </div>

      <footer className={styles.footer}>
        <p className={styles.credit}>
          Photography — Raimond Klavins &amp; Subash Matheswaran, via Unsplash.
        </p>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Sri Kanya Handicrafts · Crafted for Kanyakumari&rsquo;s
          legacy
        </p>
      </footer>
    </section>
  );
}
