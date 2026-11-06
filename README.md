# ASTRO – Bags Store (React + Vite)

```bash
npm install
npm run dev
```

## Structure
- `src/components/<Name>/<Name>.jsx + <Name>.css` – every component has its own pair.
- `src/pages/<Name>/<Name>.jsx + <Name>.css` – every page has its own pair.
- `src/config/navigation.js` – single source for the navbar menus AND the router. Every dropdown link (68) becomes a route automatically.
- `src/context/StoreContext.jsx` – UI state only (open drawers, toasts). Cart, wishlist and user are whatever the server returns.
- `src/api/` – the backend boundary (see below).

## Connecting your backend
All business logic (prices, discounts, free-shipping threshold, coupons, stock, auth, search, filtering, sorting, pagination, orders) lives in `src/api/mockServer.js`. React only renders what the API returns.

1. Copy `.env.example` to `.env` and set `VITE_API_URL=http://localhost:5000/api`.
2. Implement the routes below. Every call goes through `src/api/client.js`, so nothing else changes.
3. Delete `src/api/mockServer.js` and `mockData.js` when done. Auth: the client sends `Authorization: Bearer <astro_token>`.

| Method | Route | Notes |
|---|---|---|
| GET | /home | slides, categories, brands, deal{products,endsInHours}, promo, testimonials, instagram |
| GET | /store-info, /stores, /faqs, /pages/(about, story, team) | |
| GET | /products | query: section (featured/latest/top/new), category, minPrice, maxPrice, color, onSale, q, sort, page, limit. Returns `{items,total,page,pages,hasMore}` |
| GET | /products/:slug, /products/:slug/related, /products/recent?ids=1,2 | |
| POST | /products/:slug/reviews | `{name,text}` |
| GET | /search?q= | ajax search |
| GET | /cart | `{items[{id,qty,color,size,product}],count,subtotal,discount,coupon,shipping,total,freeShippingLeft,freeShippingTarget}` |
| POST | /cart/items | `{productId,qty,color?,size?}` returns the full cart |
| PATCH / DELETE | /cart/items/:id | `{qty}` returns the full cart |
| POST | /cart/coupon | `{code}` (the mock accepts ASTRO10) |
| GET / POST | /wishlist, /wishlist/toggle | `{productId}` returns `{ids,items}` |
| GET | /auth/me | user or null |
| POST | /auth/login, /auth/register, /auth/logout | |
| POST | /checkout | `{name,email,address,city,payment}` returns `{orderId,total}` |
| POST | /newsletter, /contact | |
| GET | /blog?limit=&format=, /blog/:slug | |

## Notes
- Images in `public/images` were cropped from the screen recording, so they are low resolution. Replace them with originals (keep the file names, or update `mockData.js`).
- Fonts (Poppins, Michroma) load from Google Fonts.
- The About / Contact submenus were not opened in the video, so Our Story, Our Team and Store Locations are placeholder content.
