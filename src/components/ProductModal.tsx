import { useEffect, useRef } from 'react';
import type { Product } from '../config/products';
import { CATEGORY_LABELS } from '../config/products';
import { SITE } from '../config/site';
import { WhatsAppIcon } from './icons';
import styles from './Gallery.module.css';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

function enquireHref(product: Product): string {
  const text = `Hi! I'm interested in the ${product.name} (${product.subtitle}) from Sri Kanya Handicrafts.`;
  return `${SITE.whatsapp.href}?text=${encodeURIComponent(text)}`;
}

/**
 * Expanded product detail, presented as an accessible modal dialog:
 *  - role="dialog" aria-modal, labelled/described by its content
 *  - Esc closes; backdrop click closes
 *  - focus moves to the dialog on open and is restored to the opener on close
 *  - focus is kept within the dialog while open (simple wrap trap)
 */
export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialog) {
        const focusables = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      openerRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-desc"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close details"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div className={styles.modalGrid}>
          <figure className={styles.modalMedia}>
            <img src={product.image} alt={product.alt} />
          </figure>

          <div className={styles.modalBody}>
            <p className={styles.modalCategory}>{CATEGORY_LABELS[product.category]} · {product.material}</p>
            <h3 id="product-modal-title" className={styles.modalTitle}>
              {product.name}
            </h3>
            <p className={styles.modalSubtitle}>{product.subtitle}</p>
            <p id="product-modal-desc" className={styles.modalDesc}>
              {product.description}
            </p>

            <dl className={styles.specs}>
              {product.specs.map((spec) => (
                <div key={spec.label} className={styles.spec}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>

            <a
              className={styles.enquire}
              href={enquireHref(product)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
