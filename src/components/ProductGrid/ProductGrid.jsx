import ProductCard from '../ProductCard/ProductCard.jsx';
import './ProductGrid.css';
export default function ProductGrid({ items, cols = 3, hover = 'default', list = false }) {
  if (!items.length) return <p className="pg-empty">No products found.</p>;
  return (
    <div className={`pgrid ${list ? 'list' : ''}`} style={{ '--cols': cols }}>
      {items.map((p, i) => <div key={p.id} className="pg-item" style={{ animationDelay: `${i * 70}ms` }}><ProductCard product={p} hover={hover} list={list} /></div>)}
    </div>
  );
}
