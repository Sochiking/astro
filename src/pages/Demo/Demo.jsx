import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import { useStore } from '../../context/StoreContext.jsx';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import ShareButtons from '../../components/ShareButtons/ShareButtons.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import './Demo.css';

const META = {
  quickview: ['Quickview Popup', 'Hover any bag and press the magnifier to open the product in a popup without leaving the page.'],
  minicartDraw: ['Minicart Draws', 'Adding a bag slides the mini cart in from the right with a free-shipping progress bar.'],
  quickadd: ['Quick Add To Cart', 'Add straight from the listing with one click. No page load needed.'],
  hover1: ['Product Hover Style 1', 'Actions slide in vertically from the right edge.'], hover2: ['Product Hover Style 2', 'A full-width add-to-cart bar slides up from the bottom.'],
  hover3: ['Product Hover Style 3', 'A warm tint fades in and the actions appear in the centre.'], hover4: ['Product Hover Style 4', 'The whole card lifts with a soft shadow.'],
  hoverAll: ['All Hover Styles', 'Every product hover effect on one page.'],
  ajaxSearch: ['Ajax Search', 'Results load from the server as you type.'], minicart: ['Minicart', 'The live cart, rendered inline.'],
  recent: ['Recently Viewed Products', 'Open a few products and they appear here.'], social: ['Social Share', 'Share any page on social networks or copy the link.'],
};

export default function Demo({ kind }) {
  const [title, text] = META[kind] || ['Demo', ''];
  const { data } = useApi(() => api.products({ limit: 8 }), []);
  const { cart, addToCart, setQuickView, setPanel, recentIds, removeItem } = useStore();
  const [q, setQ] = useState(''); const [res, setRes] = useState([]); const [rec, setRec] = useState(null);
  useEffect(() => { if (kind === 'ajaxSearch') { const t = setTimeout(() => api.search(q).then(setRes), 200); return () => clearTimeout(t); } }, [q, kind]);
  useEffect(() => { if (kind === 'recent') api.recent(recentIds).then(setRec); }, [kind, recentIds]);
  const items = data?.items || [];
  const hover = /^hover[1-4]$/.test(kind) ? kind.slice(-1) : 'default';
  let body = <Spinner block />;
  if (data) {
    if (kind === 'hoverAll') body = ['default', '1', '2', '3', '4'].map((h) => <div key={h} className="demo-block"><h3>{h === 'default' ? 'Default' : `Style ${h}`}</h3><ProductGrid items={items.slice(0, 4)} cols={4} hover={h} /></div>);
    else if (kind === 'quickview') body = <><button className="btn" onClick={() => setQuickView(items[0])}>Open a sample popup</button><div className="demo-block"><ProductGrid items={items} cols={4} /></div></>;
    else if (kind === 'minicartDraw') body = <div className="demo-actions"><button className="btn" onClick={() => addToCart({ productId: items[1].id, qty: 1 })}>Add a bag and open the drawer</button><button className="btn ghost" onClick={() => setPanel('cart')}>Just open the drawer</button></div>;
    else if (kind === 'quickadd') body = <div className="qa-grid">{items.map((p) => <div key={p.id} className="qa"><img src={p.image} alt="" /><b>{p.name}</b><span className="price">${p.price}</span><button className="btn" onClick={() => addToCart({ productId: p.id, qty: 1 }, false)}><Icon name="plus" size={14} /> Quick add</button></div>)}</div>;
    else if (kind === 'ajaxSearch') body = <div className="demo-search"><div className="field-wrap"><Icon name="search" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try &quot;kipling&quot;" /></div>{res.map((p) => <Link key={p.id} to={`/product/${p.slug}`}><img src={p.image} alt="" />{p.name}<span className="price">${p.price}</span></Link>)}<button className="btn ghost" onClick={() => setPanel('search')}>Open full-screen search</button></div>;
    else if (kind === 'minicart') body = <div className="demo-mini">{cart.items.length === 0 ? <p>Your cart is empty. Add something from <Link to="/shop/fullwidth">the shop</Link>.</p> : cart.items.map((i) => <div key={i.id}><img src={i.product.image} alt="" /><span>{i.product.name} × {i.qty}</span><b>${(i.product.price * i.qty).toFixed(2)}</b><button onClick={() => removeItem(i.id)}><Icon name="trash" size={15} /></button></div>)}<div className="tot">Total <b>${cart.total.toFixed(2)}</b></div></div>;
    else if (kind === 'recent') body = rec ? (rec.length ? <ProductGrid items={rec} cols={4} /> : <p className="demo-note">Nothing viewed yet. <Link to="/shop/fullwidth">Browse the shop</Link> and open a product.</p>) : <Spinner block />;
    else if (kind === 'social') body = <div className="demo-share"><ShareButtons title="Astro bags" /></div>;
    else body = <ProductGrid items={items} cols={4} hover={hover} />;
  }
  return (
    <div className="demo page-fade">
      <PageBanner title={title} style={1} crumbs={[['Featured']]} />
      <div className="container demo-body"><p className="demo-note">{text}</p>{body}</div>
    </div>
  );
}
