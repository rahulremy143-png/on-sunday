import { SITE } from '../config/site';
import styles from './Hero.module.css';

interface HeroProps {
  /** Disable ken-burns + staggered reveal under reduced motion. */
  reducedMotion: boolean;
}

const HEADLINE_LINE_ONE = 'Sri Kanya';
const HEADLINE_LINE_TWO = 'Handicrafts';

/** Split a word into per-character spans for the staggered reveal. */
function AnimatedWord({
  text,
  base,
  reducedMotion,
}: {
  text: string;
  base: number;
  reducedMotion: boolean;
}) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={reducedMotion ? styles.charStatic : styles.char}
          style={reducedMotion ? undefined : { animationDelay: `${base + i * 45}ms` }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </>
  );
}

/**
 * Hero — full-bleed golden-sunrise photograph of Kanyakumari (the Vivekananda
 * Rock Memorial + Thiruvalluvar statue in silhouette). A slow ken-burns drift
 * and a cinematic gradient graded from the photo's own tones (deep charcoal at
 * the bottom-left, where the headline sits over the dark rock/sea) keep the copy
 * legible while the bright amber sky stays untouched. All text is real HTML.
 */
export function Hero({ reducedMotion }: HeroProps) {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true">
        <img
          className={`${styles.photo} ${reducedMotion ? styles.photoStatic : ''}`}
          src="/media/raimond-klavins-dtMxmra_jao-unsplash.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        <div className={styles.grade} />
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>Kanyakumari · Since three generations</p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.visualTitle} aria-hidden="true">
            <span className={styles.line}>
              <AnimatedWord text={HEADLINE_LINE_ONE} base={200} reducedMotion={reducedMotion} />
            </span>
            <span className={`${styles.line} ${styles.lineTwo}`}>
              <AnimatedWord text={HEADLINE_LINE_TWO} base={620} reducedMotion={reducedMotion} />
            </span>
          </span>
          <span className={styles.srOnly}>{SITE.name}</span>
        </h1>

        <p className={styles.tagline}>
          Where the three seas meet, our artisans carve devotion into sandalwood,
          rosewood and seashell — temple figures, coastal keepsakes and heirloom
          craft shaped by hand on Sannathi Street.
        </p>

        <div className={styles.actions}>
          <a className={styles.primaryCta} href="#gallery">
            Explore the collection
          </a>
          <a
            className={styles.secondaryCta}
            href={SITE.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
