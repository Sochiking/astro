// Seed data that your real database will replace.
const I = (n) => `/images/${n}.jpg`;
const mk = (id, slug, name, price, old, img, extra = {}) => ({
  id, slug, name, price, oldPrice: old || null,
  discount: old ? Math.round((1 - price / old) * 100) : 0,
  image: I(img), images: [I(img), I('cat-1'), I('cat-2'), I('cat-3')],
  category: 'women', rating: 4.5, reviewsCount: 12, stock: 24, sold: 40,
  colors: ['#1f3a8a', '#8a5a2b', '#111'], sizes: ['S', 'M', 'L'],
  description: 'Roomy, lightweight and made to last. Adjustable straps let you wear it two ways, with a zipped main compartment and plenty of pockets for everyday carry.',
  type: 'simple', createdAt: id, sku: 'AST-' + (1000 + id), externalUrl: 'https://www.amazon.com', videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', ...extra,
});
export const products = [
  mk(1, 'kipling-art-mini', 'Kipling Art Mini', 35, null, 'p-art-mini', { featured: true, rating: 5, sold: 120, category: 'women' }),
  mk(2, 'riri-bag', 'Riri Bag', 49.99, 100, 'p-riri', { featured: true, rating: 4, sold: 98, category: 'women', type: 'variable' }),
  mk(3, 'tasmo-bag', 'Tasmo Bag', 70, null, 'p-tasmo', { featured: true, rating: 5, sold: 75, category: 'men' }),
  mk(4, 'tole-green-bag', 'Tole Green Bag', 45, null, 'p-tole', { rating: 4, sold: 30, category: 'men' }),
  mk(5, 'originals-backpack', 'Originals Backpack', 55, null, 'p-originals', { rating: 4, sold: 51, category: 'accessories', type: 'external' }),
  mk(6, 'kipling-backpack', 'Kipling Backpack', 33.5, 70, 'p-kipling-backpack', { rating: 5, sold: 88, category: 'accessories', type: 'boosted' }),
  mk(7, 'kipling-wheel-backpack', 'Kipling Wheeled Backpack', 33.5, 70, 'p-kipling-wheel', { rating: 5, sold: 140, category: 'accessories' }),
  mk(8, '4f-backpack', '4F Backpack', 25, null, 'p-4f', { rating: 5, sold: 160, category: 'men' }),
  mk(9, 'cure-spinner', 'Cure Spinner', 99.99, null, 'p-cure', { rating: 4, sold: 22, category: 'accessories' }),
];
export const posts = [
  { id: 1, slug: 'training-during-ramadan', title: 'Training During Ramadan', date: 'Jul 06, 2022', comments: 0, image: I('blog-1'), format: 'standard', excerpt: 'How to keep your routine light, hydrated and on track while fasting, and which bag to pack for the gym.' },
  { id: 2, slug: 'collagen-and-white-tissue', title: 'Collagen And White Tissue', date: 'Jul 06, 2022', comments: 0, image: I('blog-2'), format: 'gallery', excerpt: 'A simple guide to recovery, tissue health and travelling light with the right carry.' },
  { id: 3, slug: 'whats-the-best-time-to-gym', title: "What's The Best Time To Gym?", date: 'Jul 06, 2022', comments: 0, image: I('blog-3'), format: 'video', excerpt: 'Morning, noon or night? We look at the evidence and at what to carry for each.' },
  { id: 4, slug: 'how-to-choose-a-backpack', title: 'How To Choose A Backpack', date: 'Jun 21, 2022', comments: 2, image: I('p-originals'), format: 'audio', excerpt: 'Capacity, straps, fabric and fit: the four things that matter when buying a backpack.' },
  { id: 5, slug: 'care-for-leather-bags', title: 'Care For Leather Bags', date: 'Jun 02, 2022', comments: 1, image: I('cat-3'), format: 'standard', excerpt: 'Keep leather supple and scuff-free with five easy habits.' },
  { id: 6, slug: 'spring-colour-trends', title: 'Spring Colour Trends', date: 'May 18, 2022', comments: 4, image: I('hero-2'), format: 'gallery', excerpt: 'Pastels, citrus yellows and soft denim blues lead this season.' },
];
export const home = {
  slides: [
    { id: 1, eyebrow: 'Up to 15% off', title: 'Summer Collection', text: 'Change up the straps to suit your mood. Wear them two ways for two different looks', cta: 'Shop Now', link: '/shop/fullwidth', image: I('hero-1') },
    { id: 2, eyebrow: 'Up to 15% off', title: 'Spring Collection', text: 'Change up the straps to suit your mood. Wear them two ways for two different looks', cta: 'Shop Now', link: '/shop/fullwidth', image: I('hero-2') },
  ],
  categories: [
    { id: 'men', name: 'Men', image: I('cat-1'), link: '/shop/fullwidth?category=men' },
    { id: 'women', name: 'Women', image: I('cat-2'), link: '/shop/fullwidth?category=women' },
    { id: 'accessories', name: 'Accessories', image: I('cat-3'), link: '/shop/fullwidth?category=accessories' },
  ],
  brands: [{ name: 'REISS', style: 'sans' }, { name: 'Joules', style: 'script' }, { name: 'ROMAN', style: 'sans' }, { name: 'baker', style: 'serif' }, { name: 'LIPSY', style: 'sans' }, { name: 'Boden', style: 'script' }],
  deal: { title: 'Best Deal Today', text: "Today's only sale products", link: '/shop/fullwidth', productSlugs: ['tasmo-bag', 'kipling-art-mini', 'riri-bag', 'tole-green-bag'] },
  promo: { eyebrow: 'Discount Gifts', title: 'Gifts Under $50', text: 'Give your friends 12% off. When your friends buy from your invite link, you get 12%!', cta: 'Shop Now', link: '/shop/fullwidth?maxPrice=50', image: I('gift') },
  testimonials: [
    { id: 1, name: 'Melvin McKinney', role: 'Customer', avatar: null, text: 'I wanted to thank you for the service from you and the team. We will always look forward to shopping at your store.' },
    { id: 2, name: 'Devon Lane', role: 'Customer', avatar: I('avatar-1'), text: 'I had a wonderful experience shopping in your store today. Thank you for your help and for the story that your shop has to tell' },
    { id: 3, name: 'Annette Black', role: 'Customer', avatar: null, text: 'Fantastic makeup, went on great and I felt so much better protected all day! Would recommend to anyone.' },
    { id: 4, name: 'Cody Fisher', role: 'Customer', avatar: null, text: 'Great quality and the delivery was quicker than promised. The straps are really comfortable.' },
  ],
  instagram: { handle: '@Astro_Bag', images: [I('insta-1'), I('insta-2'), I('insta-3'), I('insta-4')] },
};
export const storeInfo = {
  address: '121 King Street, Collins Melbourne West Victoria 8007, Australia', phone: '(+01) 234-567-89', email: 'support@mycompany.com',
  freeShipping: 100, hours: 'Mon-Sat 9:00-18:00',
};
export const stores = [
  { id: 1, name: 'Melbourne Flagship', address: '121 King Street, Collins Melbourne, VIC 8007', phone: '(+01) 234-567-89', hours: 'Mon-Sat 9:00-18:00' },
  { id: 2, name: 'Sydney Pop-up', address: '48 George Street, Sydney, NSW 2000', phone: '(+01) 234-567-90', hours: 'Daily 10:00-20:00' },
];
export const faqs = [
  { id: 1, q: 'How long does shipping take?', a: 'Orders ship within 24 hours and arrive in 3-5 business days. Orders above $100 ship free.' },
  { id: 2, q: 'Can I return or exchange a bag?', a: 'Yes. Unused bags can be returned within 30 days for a refund or exchange.' },
  { id: 3, q: 'How do I track my order?', a: 'Once your order ships we email a tracking link. You can also see it in My Account.' },
  { id: 4, q: 'Which payment methods do you accept?', a: 'All major cards, PayPal and bank transfer.' },
  { id: 5, q: 'Do you offer a warranty?', a: 'Every bag has a 12-month warranty against manufacturing defects.' },
];
export const pages = {
  about: { title: 'About Astro', intro: 'We design everyday bags with honest materials and playful colour.', body: ['Astro began in a small Melbourne studio with one idea: a bag should work as hard as you do and still look great doing it.', 'Today we ship to more than 40 countries, and every design is tested on real commutes, gym runs and weekend trips.'], stats: [['12k+', 'Happy customers'], ['40+', 'Countries'], ['150', 'Designs'], ['4.8', 'Average rating']] },
  story: { title: 'Our Story', intro: 'From a market stall to a worldwide label.', body: ['2014: the first 50 backpacks sold out in a weekend.', '2018: we opened the Melbourne flagship.', '2022: a new sustainable materials range launched.'], stats: [] },
  team: { title: 'Our Team', intro: 'The people behind every stitch.', body: [], team: [{ name: 'Ava Collins', role: 'Founder', image: I('avatar-1') }, { name: 'Noah Reed', role: 'Head of Design', image: I('cat-1') }, { name: 'Mia Chen', role: 'Operations', image: I('cat-2') }] },
};
