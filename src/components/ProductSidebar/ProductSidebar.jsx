import { Link } from 'react-router-dom';
import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import './ProductSidebar.css';
export default function ProductSidebar() {
  const { data } = useApi(() => api.products({ section: 'top' }), []);
  return (
    <aside className="psb"><h4>Top Rated</h4>
      {(data?.items || []).map((p) => <Link key={p.id} to={`/product/${p.slug}`} className="psb-item"><img src={p.image} alt="" /><div><b>{p.name}</b><span className="price">${p.price}</span></div></Link>)}
      <h4>Categories</h4><ul>{[['men', 'Men'], ['women', 'Women'], ['accessories', 'Accessories']].map(([v, l]) => <li key={v}><Link to={`/shop/fullwidth?category=${v}`}>{l}</Link></li>)}</ul>
    </aside>
  );
}
