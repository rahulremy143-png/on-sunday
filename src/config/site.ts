/**
 * Single source of truth for the shop's identity + contact details.
 * Phase 2 sections should import from here rather than re-hardcoding.
 */
export const SITE = {
  name: 'Sri Kanya Handicrafts',
  monogram: 'SK',
  tagline: 'Artisan woodcraft where three seas meet',
  location: {
    street: 'Sannathi Street, near Bhagavathy Amman Temple',
    city: 'Kanyakumari',
    region: 'Tamil Nadu',
    country: 'India',
  },
  whatsapp: {
    display: '+91 95000 83229',
    href: 'https://wa.me/919500083229',
  },
  instagram: {
    handle: '@srikanya_handicrafts',
    href: 'https://www.instagram.com/srikanya_handicrafts',
  },
  nav: [
    { id: 'story', label: 'Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'location', label: 'Location' },
    { id: 'contact', label: 'Contact' },
  ],
} as const;
