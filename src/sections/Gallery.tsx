import { useMemo, useState } from 'react';
import {
  CATEGORY_LABELS,
  PRODUCTS,
  type Product,
  type ProductCategory,
} from '../config/products';
import { ProductCrystal } from '../components/ProductCrystal';
import { ProductModal } from '../components/ProductModal';
import styles from '../components/Gallery.module.css';

type Filter = ProductCategory | 'all';

const FILTERS: Filter[] = ['all', 'wood', 'shell', 'temple'];

/**
 * GALLERY — the collection as interactive "portfolio crystals". A category
 * filter narrows the grid; each crystal opens an accessible detail modal with a
 * pre-filled WhatsApp enquiry deep-link. Cards are keyboard operable (they are
 * <button>s); the modal traps focus and closes on Esc.
 */
export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.kicker}>The Collection</p>
          <h2 id="gallery-title" className={styles.heading}>
            Sixteen pieces, each carved by hand
          </h2>
          <p className={styles.lead}>
            Wood, shell and temple craft from the artisans of Sannathi Street. Select a
            piece to see its story, its making, and to enquire directly.
          </p>
        </div>

        <div className={styles.filters} role="group" aria-label="Filter the collection by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.filterTab} ${filter === f ? styles.filterActive : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {CATEGORY_LABELS[f]}
            </button>
          ))}
        </div>

        <ul className={styles.grid} aria-live="polite">
          {visible.map((product) => (
            <li key={product.id} className={styles.gridItem}>
              <ProductCrystal product={product} onOpen={setSelected} />
            </li>
          ))}
        </ul>
      </div>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
