import { useState } from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../../config/navigation.js';
import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import './Footer.css';

export default function Footer() {
  const { data: info } = useApi(() => api.storeInfo(), []);
  const { toast } = useStore();
  const [email, setEmail] = useState('');
  const subscribe = async (e) => { e.preventDefault(); try { const r = await api.newsletter(email); toast(r.message); setEmail(''); } catch (err) { toast(err.message, 'err'); } };
  return (
    <footer className="footer">
      <div className="container fgrid">
        <div>
          <Link to="/" className="flogo">ASTRO</Link>
          {info && <p>{info.address}</p>}
          {info && <p><span>Phone:</span> <a href={`tel:${info.phone}`}>{info.phone}</a><br /><span>Email:</span><br /><a href={`mailto:${info.email}`}>{info.email}</a></p>}
          <div className="fsocial">{['facebook', 'twitter', 'instagram', 'pinterest'].map((n) => <a key={n} href="#top" aria-label={n}><Icon name={n} size={16} /></a>)}</div>
        </div>
        {Object.entries(footerLinks).map(([t, links]) => (
          <div key={t}><h4>{t}</h4><ul>{links.map(([l, to]) => <li key={l}><Link to={to}>{l}</Link></li>)}</ul></div>
        ))}
        <div>
          <h4>Visit Our Store</h4>
          <Link to="/page/contact/stores" className="fmap" aria-label="Store map">
            <svg viewBox="0 0 200 110"><rect width="200" height="110" fill="#e9e9e9" /><path d="M0 40h200M0 80h200M50 0v110M120 0v110M170 0v110" stroke="#fff" strokeWidth="5" /><path d="M10 10l60 90M140 0l50 110" stroke="#ddd" strokeWidth="3" /></svg>
            <span className="pin"><Icon name="pin" size={22} /></span>
          </Link>
          <form onSubmit={subscribe} className="fnews"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" /><button>Join</button></form>
        </div>
      </div>
      <div className="fbottom">&copy; {new Date().getFullYear()} Astro. All rights reserved.</div>
    </footer>
  );
}
