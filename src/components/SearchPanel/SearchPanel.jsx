import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/endpoints.js';
import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import './SearchPanel.css';

// Ajax search: every keystroke (debounced) is answered by GET /search?q=
export default function SearchPanel() {
  const { panel, setPanel } = useStore();
  const [q, setQ] = useState(''); const [res, setRes] = useState([]); const [busy, setBusy] = useState(false);
  const input = useRef(null); const on = panel === 'search';
  useEffect(() => { if (on) setTimeout(() => input.current?.focus(), 300); }, [on]);
  useEffect(() => {
    if (!q.trim()) { setRes([]); return; }
    setBusy(true);
    const t = setTimeout(() => api.search(q).then((r) => { setRes(r); setBusy(false); }), 250);
    return () => clearTimeout(t);
  }, [q]);
  const close = () => setPanel(null);
  return (
    <div className={`search-panel ${on ? 'on' : ''}`}>
      <button className="sp-close" onClick={close}><Icon name="close" size={24} /></button>
      <div className="container sp-body">
        <div className="sp-field"><Icon name="search" size={22} /><input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for bags, backpacks..." /> {busy && <Spinner size={18} />}</div>
        <div className="sp-results">
          {res.map((p) => <Link key={p.id} to={`/product/${p.slug}`} onClick={close} className="sp-item"><img src={p.image} alt="" /><div><b>{p.name}</b><span className="price">${p.price}</span></div></Link>)}
          {!busy && q && res.length === 0 && <p className="sp-empty">No products match &ldquo;{q}&rdquo;.</p>}
        </div>
      </div>
    </div>
  );
}
