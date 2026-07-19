import type { Product } from '../config/products';
import { CATEGORY_LABELS } from '../config/products';
import { useTilt } from '../hooks/useTilt';
import styles from './Gallery.module.css';

interface ProductCrystalProps {
  product: Product;
  onOpen: (product: Product) => void;
}

/**
 * A single portfolio "crystal": a glass-sheen card with pointer-driven 3D tilt.
 * Behaves as a button — focusable, activated by Enter/Space — and opens the
 * detail view. Tilt is pure CSS (custom props from useTilt); no WebGL required.
 */
export function ProductCrystal({ product, onOpen }: ProductCrystalProps) {
  const tilt = useTilt();

  return (
    <button
      type="button"
      className={styles.crystal}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      onClick={() => onOpen(product)}
      aria-label={`${product.name} — ${CATEGORY_LABELS[product.category]}. View details.`}
    >
      <span className={styles.crystalInner}>
        <span className={styles.crystalMedia}>
          <img src={product.image} alt={product.alt} loading="lazy" />
          <span className={styles.sheen} aria-hidden="true" />
        </span>
        <span className={styles.crystalHud}>
          <span className={styles.categoryBadge}>{CATEGORY_LABELS[product.category]}</span>
          <span className={styles.crystalName}>{product.name}</span>
          <span className={styles.crystalMaterial}>{product.material}</span>
        </span>
      </span>
    </button>
  );
}
