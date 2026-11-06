import { useState } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import Quantity from '../Quantity/Quantity.jsx';
import Rating from '../Rating/Rating.jsx';
import Countdown from '../Countdown/Countdown.jsx';
import ShareButtons from '../ShareButtons/ShareButtons.jsx';
import './ProductInfo.css';

// type: simple | variable | external | boosted  (decided by the product record on the backend)
export default function ProductInfo({ product: p, type = p.type }) {
  const { addToCart, toggleWish, isWished } = useStore();
  const [qty, setQty] = useState(1); const [color, setColor] = useState(p.colors[0]); const [size, setSize] = useState(p.sizes[0]);
  const left = Math.max(0, p.stock - p.sold); const pct = Math.min(100, Math.round((p.sold / (p.sold + left)) * 100));
  const opts = type === 'variable' ? { color, size } : {};
  return (
    <div className="pinfo">
      <h1>{p.name}</h1>
      <div className="pi-row"><Rating value={p.rating} count={p.reviewsCount} /><span className="pi-stock">{p.stock > 0 ? 'In stock' : 'Out of stock'}</span></div>
      <div className="price pi-price">${p.price.toFixed(2)}{p.oldPrice && <s>${p.oldPrice.toFixed(2)}</s>}{p.discount > 0 && <em>Save {p.discount}%</em>}</div>
      <p className="pi-desc">{p.description}</p>
      {type === 'boosted' && (
        <div className="pi-boost"><b>Hurry! Only {left} left in stock.</b><div className="bar"><span style={{ width: `${pct}%` }} /></div><small>Sale ends in</small><Countdown hours={12} /></div>
      )}
      {type === 'variable' && (<>
        <div className="pi-opt"><label>Colour</label>{p.colors.map((c) => <button key={c} className={`sw ${c === color ? 'on' : ''}`} style={{ background: c }} onClick={() => setColor(c)} aria-label={c} />)}</div>
        <div className="pi-opt"><label>Size</label>{p.sizes.map((s) => <button key={s} className={`sz ${s === size ? 'on' : ''}`} onClick={() => setSize(s)}>{s}</button>)}</div>
      </>)}
      <div className="pi-buy">
        {type === 'external'
          ? <a className="btn" href={p.externalUrl} target="_blank" rel="noreferrer">Buy on Amazon</a>
          : <><Quantity value={qty} onChange={setQty} /><button className="btn" onClick={() => addToCart({ productId: p.id, qty, ...opts })}>Add to cart</button></>}
        <button className={`pi-wish ${isWished(p.id) ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Wishlist"><Icon name="heart" /></button>
      </div>
      <ul className="pi-meta"><li><span>SKU:</span> {p.sku}</li><li><span>Category:</span> {p.category}</li></ul>
      <ShareButtons title={p.name} />
    </div>
  );
}
