// Every backend route the frontend uses. Replace the server, keep this contract.
import { get, post, patch, del } from './client.js';
const qs = (o = {}) => {
  const s = new URLSearchParams(Object.entries(o).filter(([, v]) => v !== '' && v != null)).toString();
  return s ? `?${s}` : '';
};
export const api = {
  home: () => get('/home'),
  storeInfo: () => get('/store-info'),
  recentPosts: () => get('/blog?limit=3'),
  products: (params) => get(`/products${qs(params)}`),
  product: (slug) => get(`/products/${slug}`),
  related: (slug) => get(`/products/${slug}/related`),
  recent: (ids) => get(`/products/recent${qs({ ids: ids.join(',') })}`),
  search: (q) => get(`/search${qs({ q })}`),
  addReview: (slug, data) => post(`/products/${slug}/reviews`, data),
  cart: () => get('/cart'),
  addToCart: (data) => post('/cart/items', data),
  updateCartItem: (id, qty) => patch(`/cart/items/${id}`, { qty }),
  removeCartItem: (id) => del(`/cart/items/${id}`),
  applyCoupon: (code) => post('/cart/coupon', { code }),
  wishlist: () => get('/wishlist'),
  toggleWishlist: (productId) => post('/wishlist/toggle', { productId }),
  me: () => get('/auth/me'),
  login: (data) => post('/auth/login', data),
  register: (data) => post('/auth/register', data),
  logout: () => post('/auth/logout'),
  checkout: (data) => post('/checkout', data),
  newsletter: (email) => post('/newsletter', { email }),
  contact: (data) => post('/contact', data),
  posts: (params) => get(`/blog${qs(params)}`),
  post: (slug) => get(`/blog/${slug}`),
  faqs: () => get('/faqs'),
  page: (name) => get(`/pages/${name}`),
  stores: () => get('/stores'),
};
