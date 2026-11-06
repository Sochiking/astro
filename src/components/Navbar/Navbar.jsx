import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { mainNav } from '../../config/navigation.js';
import { useStore } from '../../context/StoreContext.jsx';
import { useScrollY } from '../../hooks/useScroll.js';
import Icon from '../Icon/Icon.jsx';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';
import './Navbar.css';

export default function Navbar() {
  const { cart, wishlist, setPanel } = useStore();
  const [open, setOpen] = useState(null);
  const y = useScrollY();
  const item = (n) => (
    <li key={n.label} className={open === n.menu && n.menu ? 'active' : ''} onMouseEnter={() => setOpen(n.menu || null)}>
      {n.to ? <NavLink to={n.to} end>{n.label}</NavLink> : <span className="nav-trigger">{n.label}</span>}
      {open === n.menu && n.menu === 'page' && <MegaMenu type="page" close={() => setOpen(null)} />}
    </li>
  );
  return (
    <header className={`navbar ${y > 120 ? 'stuck' : ''}`} onMouseLeave={() => setOpen(null)}>
      <div className="nav-inner">
        <div className="nav-side">
          <button onClick={() => setPanel('search')} aria-label="Search"><Icon name="search" /></button>
          <Link to="/wishlist" className="nav-icon" aria-label="Wishlist"><Icon name="heart" />{wishlist.ids.length > 0 && <i className="count">{wishlist.ids.length}</i>}</Link>
          <button className="burger" onClick={() => setPanel('mobile')} aria-label="Menu"><Icon name="menu" size={22} /></button>
        </div>
        <ul className="nav-links">
          {mainNav.slice(0, 3).map(item)}
          <li className="logo-slot"><Link to="/" className="logo">ASTRO</Link></li>
          {mainNav.slice(3).map(item)}
        </ul>
        <Link to="/" className="logo logo-mobile">ASTRO</Link>
        <div className="nav-side right">
          <Link to="/account" className="nav-icon" aria-label="Account"><Icon name="user" /></Link>
          <button className="nav-icon" onClick={() => setPanel('cart')} aria-label="Cart"><Icon name="bag" />{cart.count > 0 && <i className="count" key={cart.count}>{cart.count}</i>}</button>
        </div>
      </div>
      {open && open !== 'page' && <MegaMenu type={open} close={() => setOpen(null)} />}
    </header>
  );
}
