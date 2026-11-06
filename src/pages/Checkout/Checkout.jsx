import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/endpoints.js';
import { useStore } from '../../context/StoreContext.jsx';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import './Checkout.css';
export default function Checkout() {
  const { cart, user, refreshCart, toast } = useStore();
  const [f, setF] = useState({ name: user?.name || '', email: user?.email || '', address: '', city: '', payment: 'card' });
  const [order, setOrder] = useState(null); const [busy, setBusy] = useState(false);
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => { e.preventDefault(); setBusy(true); try { setOrder(await api.checkout(f)); refreshCart(); } catch (er) { toast(er.message, 'err'); } setBusy(false); };
  if (order) return <div className="page-fade"><PageBanner title="Order placed" style={1} /><div className="container co-done"><h2>Thank you!</h2><p>Your order <b>{order.orderId}</b> totalling ${order.total.toFixed(2)} is confirmed.</p><Link to="/" className="btn">Back to home</Link></div></div>;
  return (
    <div className="page-fade">
      <PageBanner title="Checkout" style={1} crumbs={[['Cart', '/cart']]} />
      <form className="container co-body" onSubmit={submit}>
        <div className="co-form">
          <h3>Billing details</h3>
          <input className="field" placeholder="Full name" value={f.name} onChange={on('name')} />
          <input className="field" placeholder="Email" value={f.email} onChange={on('email')} />
          <input className="field" placeholder="Street address" value={f.address} onChange={on('address')} />
          <input className="field" placeholder="City" value={f.city} onChange={on('city')} />
          <select className="field" value={f.payment} onChange={on('payment')}><option value="card">Credit card</option><option value="paypal">PayPal</option><option value="cod">Cash on delivery</option></select>
        </div>
        <aside className="co-sum"><h3>Your order</h3>
          {cart.items.map((i) => <div key={i.id}><span>{i.product.name} × {i.qty}</span><b>${(i.product.price * i.qty).toFixed(2)}</b></div>)}
          <div><span>Shipping</span><b>{cart.shipping ? `$${cart.shipping}` : 'Free'}</b></div><div className="tot"><span>Total</span><b>${cart.total.toFixed(2)}</b></div>
          <button className="btn" disabled={busy || !cart.items.length}>{busy ? 'Placing order...' : 'Place order'}</button>
        </aside>
      </form>
    </div>
  );
}
