// In-browser stand-in for your real API. All business rules live here, not in React components.
import { products, posts, home, storeInfo, stores, faqs, pages } from './mockData.js';
const LS = (k, d) => { try { return JSON.parse(localStorage.getItem('astro_' + k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem('astro_' + k, JSON.stringify(v));
const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));
const bySlug = (s) => products.find((p) => p.slug === s);
const byId = (id) => products.find((p) => p.id === Number(id));
const slim = (p) => p;

function cartView() {
  const items = LS('cart', []).map((i) => ({ ...i, product: byId(i.productId) }));
  const subtotal = +items.reduce((s, i) => s + i.product.price * i.qty, 0).toFixed(2);
  const coupon = LS('coupon', null);
  const discount = coupon ? +(subtotal * coupon.percent / 100).toFixed(2) : 0;
  const net = subtotal - discount;
  const shipping = net === 0 || net >= storeInfo.freeShipping ? 0 : 7.9;
  return { items, count: items.reduce((s, i) => s + i.qty, 0), subtotal, discount, coupon, shipping, total: +(net + shipping).toFixed(2),
    freeShippingLeft: Math.max(0, +(storeInfo.freeShipping - net).toFixed(2)), freeShippingTarget: storeInfo.freeShipping };
}
const wishView = () => { const ids = LS('wish', []); return { ids, items: ids.map(byId).filter(Boolean) }; };

function listProducts(q) {
  let r = [...products];
  if (q.section === 'featured') r = r.filter((p) => p.featured);
  if (q.section === 'latest') r = r.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  if (q.section === 'top') r = r.sort((a, b) => b.rating - a.rating || b.sold - a.sold).slice(0, 3);
  if (q.section === 'new') r = r.slice(0, 3);
  if (q.category) r = r.filter((p) => p.category === q.category);
  if (q.maxPrice) r = r.filter((p) => p.price <= +q.maxPrice);
  if (q.minPrice) r = r.filter((p) => p.price >= +q.minPrice);
  if (q.color) r = r.filter((p) => p.colors.includes('#' + q.color));
  if (q.onSale === 'true') r = r.filter((p) => p.oldPrice);
  if (q.q) r = r.filter((p) => p.name.toLowerCase().includes(q.q.toLowerCase()));
  const sorts = { 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price, 'name': (a, b) => a.name.localeCompare(b.name), 'rating': (a, b) => b.rating - a.rating, 'popular': (a, b) => b.sold - a.sold };
  if (sorts[q.sort]) r.sort(sorts[q.sort]);
  const page = +q.page || 1, limit = +q.limit || 9, total = r.length;
  return { items: r.slice((page - 1) * limit, page * limit).map(slim), total, page, pages: Math.max(1, Math.ceil(total / limit)), hasMore: page * limit < total };
}

export async function handle(method, fullPath, body = {}) {
  await wait(fullPath.startsWith('/search') ? 150 : 350);
  const [path, query] = fullPath.split('?');
  const q = Object.fromEntries(new URLSearchParams(query || ''));
  const key = `${method} ${path}`;
  let m;
  if (key === 'GET /home') return { ...home, deal: { ...home.deal, products: home.deal.productSlugs.map(bySlug), endsInHours: 48 } };
  if (key === 'GET /store-info') return storeInfo;
  if (key === 'GET /stores') return stores;
  if (key === 'GET /faqs') return faqs;
  if ((m = path.match(/^\/pages\/(\w+)$/)) && method === 'GET') return pages[m[1]];
  if (key === 'GET /products') return listProducts(q);
  if (key === 'GET /products/recent') return (q.ids || '').split(',').filter(Boolean).map(byId).filter(Boolean);
  if ((m = path.match(/^\/products\/([\w-]+)\/related$/))) return products.filter((p) => p.slug !== m[1]).slice(0, 4);
  if ((m = path.match(/^\/products\/([\w-]+)\/reviews$/)) && method === 'POST') return { ok: true, message: 'Thanks! Your review is awaiting approval.' };
  if ((m = path.match(/^\/products\/([\w-]+)$/))) { const p = bySlug(m[1]); if (!p) throw new Error('Product not found'); return p; }
  if (key === 'GET /search') return q.q ? products.filter((p) => p.name.toLowerCase().includes(q.q.toLowerCase())).slice(0, 5) : [];
  if (key === 'GET /blog') {
    let r = posts; if (q.format) r = r.filter((p) => p.format === q.format);
    return q.limit ? r.slice(0, +q.limit) : r;
  }
  if ((m = path.match(/^\/blog\/([\w-]+)$/))) { const p = posts.find((x) => x.slug === m[1]) || posts[0]; return { ...p, body: ['Stay consistent, pack smart and listen to your body. A good bag makes both easier.', 'Choose a bag with a padded back and adjustable straps so the weight sits evenly, whatever the day brings.'], related: posts.filter((x) => x.id !== p.id).slice(0, 3) }; }
  if (key === 'GET /cart') return cartView();
  if (key === 'POST /cart/items') {
    const p = byId(body.productId); if (!p) throw new Error('Product not found');
    const qty = Math.max(1, +body.qty || 1), cart = LS('cart', []);
    const hit = cart.find((i) => i.productId === p.id && i.color === body.color && i.size === body.size);
    if (hit) hit.qty += qty; else cart.push({ id: Date.now(), productId: p.id, qty, color: body.color || null, size: body.size || null });
    save('cart', cart); return cartView();
  }
  if ((m = path.match(/^\/cart\/items\/(\d+)$/))) {
    let cart = LS('cart', []);
    if (method === 'PATCH') cart = cart.map((i) => (i.id === +m[1] ? { ...i, qty: Math.max(1, +body.qty) } : i));
    if (method === 'DELETE') cart = cart.filter((i) => i.id !== +m[1]);
    save('cart', cart); return cartView();
  }
  if (key === 'POST /cart/coupon') {
    if ((body.code || '').toUpperCase() !== 'ASTRO10') throw new Error('Invalid coupon. Try ASTRO10');
    save('coupon', { code: 'ASTRO10', percent: 10 }); return cartView();
  }
  if (key === 'GET /wishlist') return wishView();
  if (key === 'POST /wishlist/toggle') {
    let ids = LS('wish', []); ids = ids.includes(body.productId) ? ids.filter((i) => i !== body.productId) : [...ids, body.productId];
    save('wish', ids); return wishView();
  }
  if (key === 'GET /auth/me') return LS('user', null);
  if (key === 'POST /auth/login') {
    if (!body.email || (body.password || '').length < 4) throw new Error('Enter a valid email and a password of 4+ characters');
    const u = { id: 1, name: body.email.split('@')[0], email: body.email }; save('user', u); localStorage.setItem('astro_token', 'demo'); return u;
  }
  if (key === 'POST /auth/register') {
    if (!body.name || !body.email || (body.password || '').length < 6) throw new Error('Name, email and a 6+ character password are required');
    const u = { id: 1, name: body.name, email: body.email }; save('user', u); localStorage.setItem('astro_token', 'demo'); return u;
  }
  if (key === 'POST /auth/logout') { localStorage.removeItem('astro_user'); localStorage.removeItem('astro_token'); return { ok: true }; }
  if (key === 'POST /newsletter') { if (!/\S+@\S+\.\S+/.test(body.email || '')) throw new Error('Please enter a valid email'); return { message: 'Subscribed! Check your inbox.' }; }
  if (key === 'POST /contact') { if (!body.name || !body.email || !body.message) throw new Error('Please fill in all fields'); return { message: "Message sent. We'll reply within one business day." }; }
  if (key === 'POST /checkout') {
    const c = cartView(); if (!c.items.length) throw new Error('Your cart is empty');
    if (!body.name || !body.email || !body.address) throw new Error('Name, email and address are required');
    save('cart', []); save('coupon', null); return { orderId: 'AST-' + Date.now().toString().slice(-6), total: c.total };
  }
  throw new Error(`No mock route for ${key}`);
}
