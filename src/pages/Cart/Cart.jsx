import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import Quantity from '../../components/Quantity/Quantity.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import './Cart.css';
export default function Cart() {
  const { cart, updateItem, removeItem, applyCoupon } = useStore(); const [code, setCode] = useState('');
  return (
    <div className="cartp page-fade">
      <PageBanner title="Shopping Cart" style={1} />
      <div className="container cart-body">
        {cart.items.length === 0 ? <p className="cart-empty">Your cart is empty. <Link to="/shop/fullwidth" className="btn">Continue shopping</Link></p> : (<>
          <div className="cart-list">{cart.items.map((i) => (
            <div key={i.id} className="cart-row">
              <img src={i.product.image} alt="" /><div><Link to={`/product/${i.product.slug}`}>{i.product.name}</Link><span className="price">${i.product.price}</span></div>
              <Quantity value={i.qty} onChange={(q) => updateItem(i.id, q)} /><b>${(i.product.price * i.qty).toFixed(2)}</b>
              <button onClick={() => removeItem(i.id)} aria-label="Remove"><Icon name="trash" size={16} /></button>
            </div>))}</div>
          <aside className="cart-sum">
            <h3>Order summary</h3>
            <div><span>Subtotal</span><b>${cart.subtotal.toFixed(2)}</b></div>
            {cart.discount > 0 && <div><span>Discount ({cart.coupon.code})</span><b>-${cart.discount.toFixed(2)}</b></div>}
            <div><span>Shipping</span><b>{cart.shipping ? `$${cart.shipping}` : 'Free'}</b></div>
            <div className="tot"><span>Total</span><b>${cart.total.toFixed(2)}</b></div>
            <form onSubmit={async (e) => { e.preventDefault(); if (await applyCoupon(code)) setCode(''); }}><input className="field" placeholder="Coupon code (ASTRO10)" value={code} onChange={(e) => setCode(e.target.value)} /><button className="btn dark">Apply</button></form>
            <Link to="/checkout" className="btn">Proceed to checkout</Link>
          </aside></>)}
      </div>
    </div>
  );
}
