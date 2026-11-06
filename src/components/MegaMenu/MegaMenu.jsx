import { Link } from 'react-router-dom';
import { shopMenu, featuredMenu, blogMenu, pageMenu } from '../../config/navigation.js';
import { useApi } from '../../hooks/useApi.js';
import { api } from '../../api/endpoints.js';
import './MegaMenu.css';

const Badge = ({ b }) => b && <i className={`mm-badge ${b.toLowerCase()}`}>{b}</i>;
const Col = ({ title, items, close }) => (
  <div className="mm-col">
    {title && <h4>{title}</h4>}
    <ul>{items.map((i) => <li key={i.to}><Link to={i.to} onClick={close}>{i.label}</Link><Badge b={i.badge} /></li>)}</ul>
  </div>
);

function RecentPosts({ close }) {
  const { data } = useApi(() => api.recentPosts(), []);
  return (
    <div className="mm-col mm-recent"><h4>Recent Post</h4>
      {(data || []).map((p) => (
        <Link key={p.id} to={`/post/${p.slug}`} onClick={close} className="mm-post">
          <img src={p.image} alt="" />
          <div><b>{p.title}</b><small>{p.date} <span>|</span> {p.comments} Comments</small></div>
        </Link>
      ))}
    </div>
  );
}

export default function MegaMenu({ type, close }) {
  if (type === 'shop') return <div className="mega mm-full"><div className="container mm-grid6">{shopMenu.map((c) => <Col key={c.title} {...c} close={close} />)}</div></div>;
  if (type === 'featured') return (
    <div className="mega mm-feat"><div className="mm-featwrap">
      <div className="mm-grid3">{featuredMenu.columns.map((c) => <Col key={c.title} {...c} close={close} />)}</div>
      <Link to="/shop/fullwidth" onClick={close} className="mm-img"><img src={featuredMenu.image} alt="Featured" /></Link>
    </div></div>
  );
  if (type === 'blog') return (
    <div className="mega mm-full"><div className="container mm-blog">
      <div>{[0, 2].map((i) => <Col key={i} {...blogMenu.groups[i]} close={close} />)}</div>
      <div>{[1, 3].map((i) => <Col key={i} {...blogMenu.groups[i]} close={close} />)}</div>
      <RecentPosts close={close} />
    </div></div>
  );
  return (
    <ul className="mega mm-drop">
      {pageMenu.map((p) => p.children ? (
        <li key={p.label} className="has-sub"><span>{p.label}<b>›</b></span>
          <ul className="mm-sub">{p.children.map((c) => <li key={c.to}><Link to={c.to} onClick={close}>{c.label}</Link></li>)}</ul></li>
      ) : <li key={p.to}><Link to={p.to} onClick={close}>{p.label}</Link></li>)}
    </ul>
  );
}
