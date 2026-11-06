import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import './ProductCard.css';

// hover: 'default' | '1' | '2' | '3' | '4'  (the "9 Product Hover" demos)
export default function ProductCard({ product: p, hover = 'default', list = false }) {
  const { addToCart, setQuickView, toggleWish, isWished } = useStore();
  const actions = (
    <div className="pc-actions">
      <button title="Add to cart" onClick={() => addToCart({ productId: p.id, qty: 1 })}><Icon name="bag" size={15} /></button>
      <button title="Quick view" onClick={() => setQuickView(p)}><Icon name="search" size={15} /></button>
      <button title="Wishlist" className={isWished(p.id) ? 'wished' : ''} onClick={() => toggleWish(p.id)}><Icon name="heart" size={15} /></button>
    </div>
  );
  return (
    <article className={`pcard h-${hover} ${list ? 'is-list' : ''}`}>
      <div className="pc-media">
        {p.discount > 0 && <span className="pc-badge">-{p.discount}%</span>}
        <Link to={`/product/${p.slug}`}><img src={p.image} alt={p.name} loading="lazy" /></Link>
        {actions}
        {hover === '2' && <button className="pc-bar" onClick={() => addToCart({ productId: p.id, qty: 1 })}>Add to cart</button>}
      </div>
      <div className="pc-info">
        <Link to={`/product/${p.slug}`} className="pc-name">{p.name}</Link>
        <div className="price">${p.price.toFixed(2).replace('.00', '')}{p.oldPrice && <s>${p.oldPrice.toFixed(2)}</s>}</div>
        {list && <p className="pc-desc">{p.description}</p>}
        {list && <button className="btn" onClick={() => addToCart({ productId: p.id, qty: 1 })}>Add to cart</button>}
      </div>
    </article>
  );
}
