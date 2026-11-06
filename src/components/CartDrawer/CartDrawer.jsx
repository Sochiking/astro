import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import Quantity from '../Quantity/Quantity.jsx';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cart, panel, setPanel, updateItem, removeItem } = useStore();
  const close = () => setPanel(null);
  const pct = Math.min(100, (1 - cart.freeShippingLeft / cart.freeShippingTarget) * 100);
  return (
    <>
      <div className={`overlay ${panel === 'cart' ? 'on' : ''}`} onClick={close} />
      <aside className={`cart-drawer ${panel === 'cart' ? 'on' : ''}`}>
        <div className="cd-head"><b>Shopping Cart ({cart.count})</b><button onClick={close}><Icon name="close" /></button></div>
        <div className="cd-ship">
          <p>{cart.freeShippingLeft > 0 ? <>Spend <b>${cart.freeShippingLeft}</b> more for free shipping</> : <>You've unlocked <b>free shipping</b>!</>}</p>
          <div className="bar"><span style={{ width: `${pct}%` }} /></div>
        </div>
        <div className="cd-items">
          {cart.items.length === 0 && <p className="cd-empty">Your cart is empty.<br /><Link to="/shop/fullwidth" onClick={close} className="btn" style={{ marginTop: 16 }}>Start shopping</Link></p>}
          {cart.items.map((i) => (
            <div className="cd-item" key={i.id}>
              <img src={i.product.image} alt="" />
              <div>
                <Link to={`/product/${i.product.slug}`} onClick={close}>{i.product.name}</Link>
                {(i.color || i.size) && <small>{i.size} {i.color && <i className="dot" style={{ background: i.color }} />}</small>}
                <span className="price">${i.product.price}</span>
                <Quantity value={i.qty} onChange={(q) => updateItem(i.id, q)} />
              </div>
              <button onClick={() => removeItem(i.id)} aria-label="Remove"><Icon name="trash" size={16} /></button>
            </div>
          ))}
        </div>
        {cart.items.length > 0 && (
          <div className="cd-foot">
            <div className="row"><span>Subtotal</span><b>${cart.subtotal.toFixed(2)}</b></div>
            <Link to="/cart" onClick={close} className="btn ghost">View cart</Link>
            <Link to="/checkout" onClick={close} className="btn">Checkout</Link>
          </div>
        )}
      </aside>
    </>
  );
}
