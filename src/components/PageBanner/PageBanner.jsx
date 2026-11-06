import { Link } from 'react-router-dom';
import './PageBanner.css';
// style 1-6 = the "Shop Heading" variants in the menu.
export default function PageBanner({ title, crumbs = [], style = 1, image = '/images/cat-2.jpg', chips = [] }) {
  const trail = <nav className="pb-crumbs"><Link to="/">Home</Link>{crumbs.map(([l, to]) => <span key={l}>/ {to ? <Link to={to}>{l}</Link> : l}</span>)}<span>/ {title}</span></nav>;
  return (
    <section className={`pbanner pb-${style}`} style={style === 3 ? { '--bg': `url(${image})` } : undefined}>
      <div className="container pb-in">
        <h1>{title}</h1>{trail}
        {style === 6 && chips.length > 0 && <div className="pb-chips">{chips.map(([l, to]) => <Link key={l} to={to}>{l}</Link>)}</div>}
      </div>
    </section>
  );
}
