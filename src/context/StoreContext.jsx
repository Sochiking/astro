import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { api } from '../api/endpoints.js';

// UI-only state. Totals, discounts, auth and stock rules all come back from the server.
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState({ items: [], count: 0, subtotal: 0, total: 0, shipping: 0, discount: 0, freeShippingLeft: 100, freeShippingTarget: 100 });
  const [wishlist, setWishlist] = useState({ ids: [], items: [] });
  const [user, setUser] = useState(null);
  const [panel, setPanel] = useState(null); // 'cart' | 'search' | 'mobile' | null
  const [quickView, setQuickView] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [recentIds, setRecentIds] = useState(() => JSON.parse(sessionStorage.getItem('recent') || '[]'));
  const tid = useRef(0);

  const toast = useCallback((message, type = 'ok') => {
    const id = ++tid.current;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  const run = useCallback(async (fn, okMsg) => {
    try { const r = await fn(); if (okMsg) toast(okMsg); return r; } catch (e) { toast(e.message, 'err'); return null; }
  }, [toast]);

  useEffect(() => { api.cart().then(setCart); api.wishlist().then(setWishlist); api.me().then(setUser); }, []);

  const value = {
    cart, wishlist, user, panel, setPanel, quickView, setQuickView, toasts, toast, recentIds,
    addToCart: async (data, open = true) => { const c = await run(() => api.addToCart(data), 'Added to cart'); if (c) { setCart(c); if (open) setPanel('cart'); } return c; },
    updateItem: async (id, qty) => { const c = await run(() => api.updateCartItem(id, qty)); if (c) setCart(c); },
    removeItem: async (id) => { const c = await run(() => api.removeCartItem(id), 'Removed from cart'); if (c) setCart(c); },
    applyCoupon: async (code) => { const c = await run(() => api.applyCoupon(code), 'Coupon applied'); if (c) setCart(c); return !!c; },
    refreshCart: () => api.cart().then(setCart),
    toggleWish: async (productId) => { const w = await run(() => api.toggleWishlist(productId)); if (w) { setWishlist(w); toast(w.ids.includes(productId) ? 'Saved to wishlist' : 'Removed from wishlist'); } },
    isWished: (id) => wishlist.ids.includes(id),
    login: async (mode, data) => { const u = await run(() => (mode === 'login' ? api.login(data) : api.register(data)), mode === 'login' ? 'Welcome back!' : 'Account created'); if (u) setUser(u); return !!u; },
    logout: async () => { await api.logout(); setUser(null); toast('Signed out'); },
    pushRecent: (id) => setRecentIds((r) => { const n = [id, ...r.filter((x) => x !== id)].slice(0, 8); sessionStorage.setItem('recent', JSON.stringify(n)); return n; }),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
