import { useState } from 'react';
import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import { useReveal } from '../../hooks/useReveal.js';
import ProductGrid from '../ProductGrid/ProductGrid.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import './ProductTabs.css';
const TABS = [['featured', 'Featured'], ['latest', 'Latest'], ['top', 'Top Rating']];
export default function ProductTabs({ title = 'Best Seller' }) {
  const [tab, setTab] = useState('featured');
  const { data, loading } = useApi(() => api.products({ section: tab }), [tab]);
  const ref = useReveal();
  return (
    <section className="ptabs section container reveal" ref={ref}>
      <h2>{title}</h2>
      <div className="pt-nav">{TABS.map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}</div>
      <div className="pt-body">{loading ? <Spinner block /> : <ProductGrid items={data.items} />}</div>
    </section>
  );
}
