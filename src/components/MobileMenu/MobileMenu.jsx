import { useState } from 'react';
import { Link } from 'react-router-dom';
import { shopMenu, featuredMenu, blogMenu, pageMenu } from '../../config/navigation.js';
import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import './MobileMenu.css';

const groups = {
  Shop: shopMenu, Featured: featuredMenu.columns, Blog: blogMenu.groups,
  Page: pageMenu.map((p) => ({ title: p.label, items: p.children || [p] })),
};
export default function MobileMenu() {
  const { panel, setPanel } = useStore();
  const [open, setOpen] = useState(null);
  const close = () => setPanel(null);
  return (
    <>
      <div className={`overlay ${panel === 'mobile' ? 'on' : ''}`} onClick={close} />
      <aside className={`mobile-menu ${panel === 'mobile' ? 'on' : ''}`}>
        <div className="mm-head"><b>MENU</b><button onClick={close}><Icon name="close" /></button></div>
        <Link to="/" onClick={close} className="mm-top">Home</Link>
        {Object.entries(groups).map(([label, cols]) => (
          <div key={label}>
            <button className="mm-top" onClick={() => setOpen(open === label ? null : label)}>{label}<Icon name="down" size={14} /></button>
            <div className={`mm-acc ${open === label ? 'open' : ''}`}>
              {cols.map((c) => <div key={c.title}><h5>{c.title}</h5>{c.items.map((i) => <Link key={i.to} to={i.to} onClick={close}>{i.label}</Link>)}</div>)}
            </div>
          </div>
        ))}
        <Link to="/contact" onClick={close} className="mm-top">Contact</Link>
      </aside>
    </>
  );
}
