import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../api/endpoints.js';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import FilterPanel, { SORTS } from '../../components/FilterPanel/FilterPanel.jsx';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import './Shop.css';

// layout: fullwidth | sidebar | infinite | background | list | banner
// heading: 1-6   filter: sidebar | accordion | drawer | offcanvas | dropdown | dropdown2 | sticky
export default function Shop({ layout = 'fullwidth', heading, filter }) {
  const [sp, setSp] = useSearchParams();
  const f = { category: sp.get('category') || '', maxPrice: sp.get('maxPrice') || '', color: sp.get('color') || '', onSale: sp.get('onSale') || '', sort: sp.get('sort') || '' };
  const set = (patch) => { const n = new URLSearchParams(sp); Object.entries(patch).forEach(([k, v]) => (v ? n.set(k, v) : n.delete(k))); setSp(n, { replace: true }); setPage(1); };
  const variant = filter || (layout === 'sidebar' ? 'sidebar' : 'dropdown');
  const [view, setView] = useState(layout === 'list' ? 'list' : 'grid'); const [cols, setCols] = useState(layout === 'sidebar' ? 3 : 4);
  const [page, setPage] = useState(1); const [res, setRes] = useState({ items: [], total: 0, pages: 1 }); const [loading, setLoading] = useState(true); const [panel, setPanel] = useState(false);
  const infinite = layout === 'infinite'; const key = JSON.stringify(f); const sentinel = useRef(null);
  const limit = infinite ? 3 : 6;

  useEffect(() => { setView(layout === 'list' ? 'list' : 'grid'); }, [layout]);
  useEffect(() => {
    let live = true; setLoading(true);
    api.products({ ...f, page, limit }).then((r) => { if (!live) return; setRes((p) => ({ ...r, items: infinite && page > 1 ? [...p.items, ...r.items] : r.items })); setLoading(false); });
    return () => { live = false; };
  }, [key, page, infinite]); // eslint-disable-line
  useEffect(() => {
    if (!infinite || !sentinel.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !loading && page < res.pages) setPage((p) => p + 1); }, { rootMargin: '200px' });
    io.observe(sentinel.current); return () => io.disconnect();
  }, [infinite, loading, page, res.pages]);

  const style = heading || (layout === 'background' ? 3 : 1);
  const sidebar = variant === 'sidebar' || variant === 'accordion';
  const toolbar = (
    <div className="shop-bar">
      <div className="sb-left">
        {(variant === 'drawer' || variant === 'offcanvas') && <button className="btn ghost sb-filter" onClick={() => setPanel(true)}><Icon name="filter" size={15} /> Filter</button>}
        <span>{res.total} products</span>
      </div>
      <div className="sb-right">
        <select className="field" value={f.sort} onChange={(e) => set({ sort: e.target.value })}>{SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')} aria-label="Grid"><Icon name="grid" size={16} /></button>
        <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')} aria-label="List"><Icon name="list" size={16} /></button>
        {view === 'grid' && [2, 3, 4].map((c) => <button key={c} className={`cols ${cols === c ? 'on' : ''}`} onClick={() => setCols(c)}>{c}</button>)}
      </div>
    </div>
  );
  return (
    <div className={`shop layout-${layout} page-fade`}>
      {layout === 'banner' && <div className="shop-hero"><img src="/images/hero-2.jpg" alt="" /><div><span>Up to 15% off</span><h2>Spring Collection</h2></div></div>}
      <PageBanner title="Shop" style={style} image="/images/hero-1.jpg" chips={[['Men', '/shop/fullwidth?category=men'], ['Women', '/shop/fullwidth?category=women'], ['Accessories', '/shop/fullwidth?category=accessories']]} />
      <div className="container shop-body">
        {(variant === 'dropdown' || variant === 'dropdown2' || variant === 'sticky') && <FilterPanel variant={variant} f={f} set={set} />}
        <div className={`shop-main ${sidebar ? 'with-side' : ''}`}>
          {sidebar && <FilterPanel variant={variant} f={f} set={set} />}
          <div>
            {toolbar}
            {loading && page === 1 ? <Spinner block /> : <ProductGrid items={res.items} cols={cols} list={view === 'list'} />}
            {infinite && <div ref={sentinel} className="sentinel">{loading && page > 1 ? <Spinner /> : page >= res.pages && <small>You have reached the end</small>}</div>}
            {!infinite && res.pages > 1 && <div className="pager">{Array.from({ length: res.pages }, (_, i) => <button key={i} className={page === i + 1 ? 'on' : ''} onClick={() => { setPage(i + 1); window.scrollTo({ top: 200, behavior: 'smooth' }); }}>{i + 1}</button>)}</div>}
          </div>
        </div>
      </div>
      {(variant === 'drawer' || variant === 'offcanvas') && <FilterPanel variant={variant} f={f} set={set} open={panel} onClose={() => setPanel(false)} />}
    </div>
  );
}
