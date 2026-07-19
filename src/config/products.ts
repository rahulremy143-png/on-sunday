/**
 * The full 16-piece collection, extracted from the legacy site and preserved
 * verbatim in fact (names, materials, craft times, categories). Images map in
 * document order: pieces 1–15 → /media/2.jpeg … /media/16.jpeg, piece 16 →
 * /media/hero-alt.jpeg (the legacy "11.49.00 AM" photo).
 */

export type ProductCategory = 'wood' | 'shell' | 'temple';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  /** Short display name shown on the crystal face. */
  name: string;
  /** Fuller title revealed in the detail view. */
  subtitle: string;
  category: ProductCategory;
  /** Material tag (short). */
  material: string;
  image: string;
  alt: string;
  description: string;
  specs: ProductSpec[];
}

export const CATEGORY_LABELS: Record<ProductCategory | 'all', string> = {
  all: 'All',
  wood: 'Wood',
  shell: 'Shell',
  temple: 'Temple',
};

export const PRODUCTS: Product[] = [
  {
    id: 'rosewood-ganesha',
    name: 'Rosewood Ganesha',
    subtitle: 'Siddhividayak Ganesha',
    category: 'wood',
    material: 'Rosewood',
    image: '/media/2.jpeg',
    alt: 'Hand-carved rosewood Ganesha statue',
    description:
      'Deep-grained heavy Indian rosewood, intricately carved by master woodworkers in Kanyakumari. Captures the detail of the trunk, crown and ornaments.',
    specs: [
      { label: 'Carving time', value: '54 hrs' },
      { label: 'Finish', value: 'Beeswax glaze' },
    ],
  },
  {
    id: 'sandalwood-elephant',
    name: 'Sandalwood Elephant',
    subtitle: 'Ambari Procession Elephant',
    category: 'wood',
    material: 'Sandalwood',
    image: '/media/3.jpeg',
    alt: 'Carved sandalwood procession elephant',
    description:
      'Authentic scented sandalwood sculpture with internal jali (hollow lattice-work carving). Radiates a soothing organic fragrance over decades.',
    specs: [
      { label: 'Carving time', value: '72 hrs' },
      { label: 'Finish', value: 'Raw unpolished' },
    ],
  },
  {
    id: 'mother-of-pearl-box',
    name: 'Mother of Pearl Box',
    subtitle: 'Iridescent Nacre Chest',
    category: 'shell',
    material: 'Seashell',
    image: '/media/4.jpeg',
    alt: 'Mother of pearl inlaid jewellery box',
    description:
      'Lined with hand-polished iridescent mother-of-pearl fragments sourced locally. The shell layers shimmer, reflecting ocean hues.',
    specs: [
      { label: 'Crafting time', value: '28 hrs' },
      { label: 'Material', value: 'Polished shells' },
    ],
  },
  {
    id: 'seashell-mandala',
    name: 'Seashell Mandala',
    subtitle: 'Triveni Sea Mosaic',
    category: 'shell',
    material: 'Mosaic',
    image: '/media/5.jpeg',
    alt: 'Geometric seashell mandala plate',
    description:
      'Geometric mandala compiled from over 200 tiny seashells, cowries and clam-shells, arranged symmetrically to represent the ocean convergence.',
    specs: [
      { label: 'Crafting time', value: '18 hrs' },
      { label: 'Base', value: 'Polished teakwood' },
    ],
  },
  {
    id: 'temple-vilakku',
    name: 'Temple Vilakku',
    subtitle: 'Arulmigu Brass Lamp',
    category: 'temple',
    material: 'Brass',
    image: '/media/6.jpeg',
    alt: 'Sand-cast brass temple oil lamp',
    description:
      'Heavy sand-cast brass vilakku (oil lamp) modelled after the temple lamps of Sannathi Street, etched with floral and peacock detailing.',
    specs: [
      { label: 'Casting time', value: '35 hrs' },
      { label: 'Alloy', value: 'High-grade brass' },
    ],
  },
  {
    id: 'seashell-chime',
    name: 'Seashell Chime',
    subtitle: 'Whispering Shore Chime',
    category: 'shell',
    material: 'Wind chime',
    image: '/media/7.jpeg',
    alt: 'Hand-strung seashell wind chime',
    description:
      'Hand-strung translucent capiz and fan shells that yield a soft, rhythmic whisper, like gentle ocean waves carried on the wind.',
    specs: [
      { label: 'Crafting time', value: '12 hrs' },
      { label: 'Strings', value: 'Invisible nylon' },
    ],
  },
  {
    id: 'teakwood-chest',
    name: 'Teakwood Chest',
    subtitle: 'Artisan Dowry Box',
    category: 'wood',
    material: 'Teak',
    image: '/media/8.jpeg',
    alt: 'Carved Malabar teak dowry chest',
    description:
      'Traditional storage chest carved from seasoned Malabar teak, featuring heavy iron rivets and a traditional security lock-latch.',
    specs: [
      { label: 'Carving time', value: '65 hrs' },
      { label: 'Accents', value: 'Hand-forged iron' },
    ],
  },
  {
    id: 'granite-gopuram',
    name: 'Granite Gopuram',
    subtitle: 'Sannathi Street Gopuram',
    category: 'temple',
    material: 'Stone',
    image: '/media/9.jpeg',
    alt: 'Soapstone temple gopuram model',
    description:
      'Soft soapstone replica of the Dravidian-style temple gopuram entrance, carved by third-generation temple sculptors of Kanyakumari.',
    specs: [
      { label: 'Carving time', value: '80 hrs' },
      { label: 'Material', value: 'Grey soapstone' },
    ],
  },
  {
    id: 'rosewood-panel',
    name: 'Rosewood Panel',
    subtitle: 'Dasavataram Relief',
    category: 'wood',
    material: 'Rosewood',
    image: '/media/10.jpeg',
    alt: 'Rosewood relief wall panel',
    description:
      'Wall panel illustrating sacred iconography in three-dimensional relief. The rich grain of rosewood deepens every shadow and curve.',
    specs: [
      { label: 'Carving time', value: '95 hrs' },
      { label: 'Dimensions', value: '24" x 12"' },
    ],
  },
  {
    id: 'engraved-conch',
    name: 'Engraved Conch',
    subtitle: 'Dakshinavarti Conch',
    category: 'shell',
    material: 'Conch',
    image: '/media/11.jpeg',
    alt: 'Engraved sacred conch shell',
    description:
      'A sacred right-handed conch shell, polished and engraved with spiritual mandalas and floral patterns by local Kanyakumari craftsmen.',
    specs: [
      { label: 'Engraving time', value: '30 hrs' },
      { label: 'Origin', value: 'Gulf of Mannar' },
    ],
  },
  {
    id: 'mahogany-urn',
    name: 'Mahogany Urn',
    subtitle: 'Sacred Kumkum Urn',
    category: 'wood',
    material: 'Mahogany',
    image: '/media/12.jpeg',
    alt: 'Turned mahogany kumkum urn with brass inlay',
    description:
      'Turned mahogany box with a high-polished lacquer finish, styled with temple contours to hold vermilion (kumkum) or sandalwood paste.',
    specs: [
      { label: 'Crafting time', value: '15 hrs' },
      { label: 'Accent', value: 'Brass inlay' },
    ],
  },
  {
    id: 'seashell-frame',
    name: 'Seashell Frame',
    subtitle: 'Kanyakumari Shore Collage',
    category: 'shell',
    material: 'Collage',
    image: '/media/13.jpeg',
    alt: 'Seashell collage in a rustic wooden frame',
    description:
      'A natural collage of coastal scenery, combining scallops, cowries and sea stars, bordered by a rustic distressed wooden frame.',
    specs: [
      { label: 'Crafting time', value: '22 hrs' },
      { label: 'Frame size', value: '12" x 12"' },
    ],
  },
  {
    id: 'terracotta-amman',
    name: 'Terracotta Amman',
    subtitle: 'Devi Bhagavathy Mask',
    category: 'temple',
    material: 'Terracotta',
    image: '/media/14.jpeg',
    alt: 'Terracotta mask of the temple deity',
    description:
      'Earthen terracotta mask, hand-formed, wood-fire baked and painted with natural pigments, capturing the iconic look of the temple deity.',
    specs: [
      { label: 'Crafting time', value: '20 hrs' },
      { label: 'Bake', value: 'Kiln fired' },
    ],
  },
  {
    id: 'rosewood-mirror',
    name: 'Rosewood Mirror',
    subtitle: 'Heritage Mirror Frame',
    category: 'wood',
    material: 'Rosewood',
    image: '/media/15.jpeg',
    alt: 'Carved rosewood mirror frame',
    description:
      'Oval vanity mirror bordered in dark rosewood, featuring intricate Dravidian temple scroll-work and leaf motifs.',
    specs: [
      { label: 'Carving time', value: '40 hrs' },
      { label: 'Glass', value: 'Beveled edge' },
    ],
  },
  {
    id: 'teak-chariot',
    name: 'Teak Chariot',
    subtitle: 'Artisan Temple Rath',
    category: 'temple',
    material: 'Miniature',
    image: '/media/16.jpeg',
    alt: 'Miniature teakwood temple chariot',
    description:
      'A scale model of the temple chariot (rath) with rotating wheels, a pillared canopy and micro engravings, carved entirely from country teakwood.',
    specs: [
      { label: 'Carving time', value: '110 hrs' },
      { label: 'Assembly', value: '48 pieces' },
    ],
  },
  {
    id: 'polished-abalone',
    name: 'Polished Abalone',
    subtitle: 'Iridescent Shore Dish',
    category: 'shell',
    material: 'Abalone',
    image: '/media/hero-alt.jpeg',
    alt: 'Polished abalone shell display dish',
    description:
      'An extra-large natural abalone shell polished to reveal a dazzling interior spectrum, used as a decor tray or incense holder.',
    specs: [
      { label: 'Polishing', value: '8 stages' },
      { label: 'Iridescence', value: 'Natural teal / pink' },
    ],
  },
];
