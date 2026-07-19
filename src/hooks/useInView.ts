import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Fraction of the element that must be visible to trigger. */
  threshold?: number;
  /** Root margin, e.g. to trigger slightly before entry. */
  rootMargin?: string;
  /** Stay "in view" once triggered (default true — reveals don't reverse). */
  once?: boolean;
}

/**
 * Generic IntersectionObserver reveal hook. Returns a ref to attach and a
 * boolean that flips true when the element enters the viewport. Used by the
 * Story chapters for scroll-driven reveals. Callers should skip the animation
 * (but keep content visible) under reduced motion.
 */
export function useInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.25,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
