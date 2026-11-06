import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import { useStore } from '../../context/StoreContext.jsx';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import ProductGallery from '../../components/ProductGallery/ProductGallery.jsx';
import ProductInfo from '../../components/ProductInfo/ProductInfo.jsx';
import ProductExtras from '../../components/ProductExtras/ProductExtras.jsx';
import ProductSidebar from '../../components/ProductSidebar/ProductSidebar.jsx';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Rating from '../../components/Rating/Rating.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import './Product.css';

const LAYOUTS = {
  extended: { mode: 'grid' }, scroll: { mode: 'stack', cls: 'sticky-info' }, sticky: { mode: 'stack', cls: 'sticky-info' },
  sticky2: { mode: 'stack', cls: 'sticky-info rev' }, stickycenter: { mode: 'stack', cls: 'sticky-info center' },
  slider: { mode: 'slider' }, slidercenter: { mode: 'slider', cls: 'stack-col' }, large: { mode: 'grid', cls: 'large' },
  small: { mode: 'slider', thumbs: 'left', cls: 'small' }, extbg: { mode: 'grid', cls: 'extbg' },
  sidebar: { mode: 'slider', side: 'right' }, sidebar2: { mode: 'slider', side: 'left' },
};
// Demo pages use a sample product per type; real product URLs come from /product/:slug
const SAMPLE = { simple: 'kipling-art-mini', variable: 'riri-bag', external: 'originals-backpack', boosted: 'kipling-backpack' };

export default function Product({ layout = 'slider', type, extend }) {
  const params = useParams(); const slug = params.slug || SAMPLE[type] || 'kipling-art-mini';
  const { data: p, loading, error } = useApi(() => api.product(slug), [slug]);
  const { data: related } = useApi(() => api.related(slug), [slug]);
  const { pushRecent, toast } = useStore();
  const [tab, setTab] = useState('desc'); const [rv, setRv] = useState({ name: '', text: '' });
  useEffect(() => { if (p) pushRecent(p.id); }, [p?.id]); // eslint-disable-line
  if (loading) return <Spinner size={40} block />;
  if (error) return <div className="container section"><p>{error.message}</p></div>;
  const L = LAYOUTS[layout] || LAYOUTS.slider;
  const images = L.mode === 'grid' ? p.images.slice(0, 4) : p.images;
  const submit = async (e) => { e.preventDefault(); try { const r = await api.addReview(slug, rv); toast(r.message); setRv({ name: '', text: '' }); } catch (er) { toast(er.message, 'err'); } };
  const detail = (
    <div className={`pd-grid ${L.cls || ''}`}>
      <ProductGallery images={images} name={p.name} mode={L.mode} thumbs={L.thumbs} />
      <div className="pd-info"><ProductInfo product={p} type={type || p.type} /><ProductExtras extend={extend} product={p} /></div>
    </div>
  );
  return (
    <div className={`pd layout-${layout} page-fade`}>
      <PageBanner title={p.name} style={2} crumbs={[['Shop', '/shop/fullwidth']]} />
      <div className="container pd-wrap">
        {L.side ? <div className={`pd-side ${L.side}`}><div>{detail}</div><ProductSidebar /></div> : detail}
        <div className="pd-tabs">
          <nav>{[['desc', 'Description'], ['reviews', `Reviews (${p.reviewsCount})`], ['ship', 'Shipping & returns']].map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}</nav>
          <div className="pd-tab" key={tab}>
            {tab === 'desc' && <p>{p.description} Water-resistant fabric, padded back panel and reinforced stitching on every stress point.</p>}
            {tab === 'ship' && <p>Free shipping on orders over $100. Standard delivery takes 3-5 business days. Unused items can be returned within 30 days.</p>}
            {tab === 'reviews' && (<div><Rating value={p.rating} count={p.reviewsCount} />
              <form onSubmit={submit} className="pd-rv"><input className="field" placeholder="Your name" value={rv.name} onChange={(e) => setRv({ ...rv, name: e.target.value })} /><textarea className="field" rows="4" placeholder="Your review" value={rv.text} onChange={(e) => setRv({ ...rv, text: e.target.value })} /><button className="btn">Submit review</button></form></div>)}
          </div>
        </div>
        {related && <section className="pd-related"><SectionTitle title="Related Products" sub="You may also like" /><ProductGrid items={related} cols={4} /></section>}
      </div>
    </div>
  );
}
