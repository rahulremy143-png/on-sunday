import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useInView } from '../hooks/useInView';
import styles from './Story.module.css';

interface Chapter {
  index: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  alt: string;
}

const CHAPTERS: Chapter[] = [
  {
    index: '01',
    kicker: 'Sannathi Street · Kovil Street',
    title: 'The road to the temple',
    body: 'Leading directly to the ancient Arulmigu Bhagavathy Amman Temple, Sannathi Street is a conduit of incense, bells and colour. Sri Kanya Handicrafts stands in the heart of this temple road, carrying forward generations of native craftsmanship that captures the essence of South Indian devotion.',
    image: '/media/hero.jpeg',
    alt: 'Inside Sri Kanya Handicrafts, on Sannathi Street beside the Bhagavathy Amman Temple, Kanyakumari',
  },
  {
    index: '02',
    kicker: 'The Collection',
    title: 'Devotion you can hold',
    body: 'Temple deities and coastal keepsakes fill the shelves — sandalwood and rosewood figures, seashell and mother-of-pearl work, brass lamps and miniature gopurams. No two pieces are alike; each still carries the mark of the maker’s hand.',
    image: '/media/hero-alt.jpeg',
    alt: 'Handcrafted wood, shell and temple pieces on display at Sri Kanya Handicrafts',
  },
];

/** Reveal wrapper: fades + rises into view, or renders static under reduced motion. */
function Reveal({
  children,
  reducedMotion,
  className,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const shown = reducedMotion || inView;
  return (
    <div
      ref={ref}
      className={`${className ?? ''} ${styles.reveal} ${shown ? styles.revealed : ''} ${
        reducedMotion ? styles.noMotion : ''
      }`}
    >
      {children}
    </div>
  );
}

/** The artisan film — muted, plays when in view / on hover, native controls as fallback. */
function ArtisanFilm({ reducedMotion }: { reducedMotion: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4, once: false });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    if (inView) {
      void video.play().catch(() => {
        /* autoplay may be blocked; controls remain available */
      });
    } else {
      video.pause();
    }
  }, [inView, reducedMotion]);

  const onEnter = () => {
    if (reducedMotion) return;
    void videoRef.current?.play().catch(() => {});
  };

  return (
    <figure className={styles.filmWrap} ref={ref}>
      <div className={styles.filmFrame} onMouseEnter={onEnter}>
        <video
          ref={videoRef}
          className={styles.video}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster="/media/hero-alt.jpeg"
        >
          <source src="/media/artisan.mp4" type="video/mp4" />
          Your browser does not support the video tag. Visit us on Sannathi Street,
          Kanyakumari to see the craft in person.
        </video>
      </div>
      <figcaption className={styles.filmCaption}>
        The craftsman&rsquo;s touch — hover to play, or use the controls.
      </figcaption>
    </figure>
  );
}

/**
 * STORY — scroll-driven heritage chapters. Two illustrated chapters (the shore,
 * the temple road) reveal as you scroll, followed by the artisan film. All
 * reveals fall back to a plain static layout under prefers-reduced-motion.
 */
export function Story() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="story" className={styles.section} aria-labelledby="story-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Our Heritage</p>
          <h2 id="story-title" className={styles.heading}>
            Carved by the coast, kept by devotion
          </h2>
          <p className={styles.lead}>
            At Triveni Sangam — the cape where the Arabian Sea, the Bay of Bengal and
            the Indian Ocean meet — the light changes hour by hour. Every piece we make
            carries a little of that shore home.
          </p>
        </div>

        <div className={styles.chapters}>
        {CHAPTERS.map((chapter, i) => (
          <Reveal
            key={chapter.index}
            reducedMotion={reducedMotion}
            className={`${styles.chapter} ${i % 2 === 1 ? styles.chapterReverse : ''}`}
          >
            <figure className={styles.chapterMedia}>
              <img src={chapter.image} alt={chapter.alt} loading="lazy" />
              <span className={styles.chapterIndex} aria-hidden="true">
                {chapter.index}
              </span>
            </figure>
            <div className={styles.chapterText}>
              <p className={styles.chapterKicker}>{chapter.kicker}</p>
              <h3 className={styles.chapterTitle}>{chapter.title}</h3>
              <p className={styles.chapterBody}>{chapter.body}</p>
            </div>
          </Reveal>
        ))}

        <Reveal reducedMotion={reducedMotion} className={styles.chapter}>
          <div className={styles.chapterText}>
            <p className={styles.chapterKicker}>The Artisan Heritage</p>
            <h3 className={styles.chapterTitle}>Age-old hands, living craft</h3>
            <p className={styles.chapterBody}>
              From deep-grained rosewoods to iridescent shells gathered on the Cape
              Comorin shore, each carving is shaped by techniques passed down through
              generations. Watch the work take form — grain, patience and devotion.
            </p>
          </div>
          <ArtisanFilm reducedMotion={reducedMotion} />
        </Reveal>
        </div>
      </div>
    </section>
  );
}
