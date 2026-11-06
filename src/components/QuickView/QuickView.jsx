import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import Quantity from '../Quantity/Quantity.jsx';
import Rating from '../Rating/Rating.jsx';
import './QuickView.css';
export default function QuickView() {
  const { quickView: p, setQuickView, addToCart } = useStore();
  const [qty, setQty] = useState(1);
  if (!p) return null;
  const close = () => { setQuickView(null); setQty(1); };
  return (
    <div className="qv-wrap" onClick={close}>
      <div className="qv" onClick={(e) => e.stopPropagation()}>
        <button className="qv-x" onClick={close}><Icon name="close" /></button>
        <div className="qv-img"><img src={p.image} alt={p.name} /></div>
        <div className="qv-body">
          <h3>{p.name}</h3><Rating value={p.rating} count={p.reviewsCount} />
          <div className="price qv-price">${p.price}{p.oldPrice && <s>${p.oldPrice}</s>}</div>
          <p>{p.description}</p>
          <div className="qv-row"><Quantity value={qty} onChange={setQty} /><button className="btn" onClick={() => { addToCart({ productId: p.id, qty }); close(); }}>Add to cart</button></div>
          <Link to={`/product/${p.slug}`} onClick={close} className="qv-link">View full details</Link>
        </div>
      </div>
    </div>
  );
}
