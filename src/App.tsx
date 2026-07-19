import { useState } from 'react';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Story } from './sections/Story';
import { Gallery } from './sections/Gallery';
import { Location } from './sections/Location';
import { Contact } from './sections/Contact';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

/**
 * App composition — a photography-led single-page experience.
 *
 * The two Kanyakumari photographs are the visual backbone: the sunrise hero and
 * the finale, with flat graded backdrops (warm charcoal → deep ink → cobalt sea)
 * between them so products and copy stay legible. No WebGL — each section owns
 * its own background.
 *
 * Sections live in <main> in scroll order and keep their ids
 * (hero/story/gallery/location/contact) for anchor navigation.
 */
export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <a className="skip-link" href="#story">
        Skip to content
      </a>

      {!loaded && <Loader onDone={() => setLoaded(true)} reducedMotion={reducedMotion} />}

      <Header />

      <main>
        <Hero reducedMotion={reducedMotion} />
        <Story />
        <Gallery />
        <Location />
        <Contact />
      </main>
    </>
  );
}
