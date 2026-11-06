import { Link } from 'react-router-dom';
import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import './BlogSidebar.css';
export default function BlogSidebar() {
  const { data } = useApi(() => api.posts({ limit: 4 }), []);
  return (
    <aside className="bside">
      <div className="bs-box"><h4>Search</h4><input className="field" placeholder="Search posts..." /></div>
      <div className="bs-box"><h4>Recent Posts</h4>{(data || []).map((p) => <Link key={p.id} to={`/post/${p.slug}`} className="bs-post"><img src={p.image} alt="" /><div><b>{p.title}</b><small>{p.date}</small></div></Link>)}</div>
      <div className="bs-box"><h4>Categories</h4><ul>{['Lifestyle', 'Fitness', 'Travel', 'Care guides'].map((c) => <li key={c}><Link to="/blog/right-sidebar">{c}</Link></li>)}</ul></div>
      <div className="bs-box"><h4>Tags</h4><div className="bs-tags">{['bags', 'backpack', 'leather', 'gym', 'spring'].map((t) => <Link key={t} to="/blog/right-sidebar">{t}</Link>)}</div></div>
    </aside>
  );
}
