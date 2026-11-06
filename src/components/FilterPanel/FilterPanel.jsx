import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import './FilterPanel.css';
const CATS = [['', 'All'], ['men', 'Men'], ['women', 'Women'], ['accessories', 'Accessories']];
const COLORS = ['1f3a8a', '8a5a2b', '111'];
const SORTS = [['', 'Featured'], ['popular', 'Best selling'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low'], ['rating', 'Top rated'], ['name', 'Name A-Z']];

function Fields({ f, set, accordion }) {
  const [open, setOpen] = useState('cat');
  const Sec = ({ id, title, children }) => (
    <div className={`fp-sec ${accordion ? (open === id ? 'open' : '') : 'open'}`}>
      <h5 onClick={() => accordion && setOpen(open === id ? '' : id)}>{title}{accordion && <Icon name="down" size={14} />}</h5><div className="fp-body">{children}</div>
    </div>
  );
  return (
    <>
      <Sec id="cat" title="Categories">{CATS.map(([v, l]) => <button key={v} className={f.category === v ? 'on' : ''} onClick={() => set({ category: v })}>{l}</button>)}</Sec>
      <Sec id="price" title={`Max price: $${f.maxPrice || 100}`}><input type="range" min="20" max="100" value={f.maxPrice || 100} onChange={(e) => set({ maxPrice: e.target.value })} /></Sec>
      <Sec id="color" title="Colour"><div className="fp-colors">{COLORS.map((c) => <button key={c} style={{ background: `#${c}` }} className={f.color === c ? 'on' : ''} onClick={() => set({ color: f.color === c ? '' : c })} aria-label={c} />)}</div></Sec>
      <Sec id="sale" title="Availability"><label className="fp-check"><input type="checkbox" checked={f.onSale === 'true'} onChange={(e) => set({ onSale: e.target.checked ? 'true' : '' })} /> On sale only</label></Sec>
      <button className="fp-reset" onClick={() => set({ category: '', maxPrice: '', color: '', onSale: '' })}>Reset filters</button>
    </>
  );
}

// variant: sidebar | accordion | drawer | offcanvas | dropdown | dropdown2 | sticky
export default function FilterPanel({ variant, f, set, open, onClose }) {
  if (variant === 'sidebar') return <aside className="fp-side"><Fields f={f} set={set} /></aside>;
  if (variant === 'accordion') return <aside className="fp-side"><Fields f={f} set={set} accordion /></aside>;
  if (variant === 'drawer' || variant === 'offcanvas') return (
    <>
      <div className={`overlay ${open ? 'on' : ''}`} onClick={onClose} />
      <aside className={`fp-drawer ${variant} ${open ? 'on' : ''}`}><div className="fp-dhead"><b>Filter</b><button onClick={onClose}><Icon name="close" /></button></div><Fields f={f} set={set} accordion={variant === 'offcanvas'} /><button className="btn" onClick={onClose}>Show results</button></aside>
    </>
  );
  const Drop = ({ label, children }) => <div className="fp-drop"><button>{label} <Icon name="down" size={12} /></button><div className="fp-menu">{children}</div></div>;
  return (
    <div className={`fp-bar ${variant}`}>
      <Drop label="Category">{CATS.map(([v, l]) => <button key={v} className={f.category === v ? 'on' : ''} onClick={() => set({ category: v })}>{l}</button>)}</Drop>
      <Drop label="Colour">{COLORS.map((c) => <button key={c} onClick={() => set({ color: f.color === c ? '' : c })}><i style={{ background: `#${c}` }} />{f.color === c ? 'Selected' : 'Colour'}</button>)}</Drop>
      <Drop label="Price"><input type="range" min="20" max="100" value={f.maxPrice || 100} onChange={(e) => set({ maxPrice: e.target.value })} /><small>Up to ${f.maxPrice || 100}</small></Drop>
      <Drop label="Sort">{SORTS.map(([v, l]) => <button key={v} className={f.sort === v ? 'on' : ''} onClick={() => set({ sort: v })}>{l}</button>)}</Drop>
      <button className="fp-reset" onClick={() => set({ category: '', maxPrice: '', color: '', onSale: '' })}>Clear</button>
    </div>
  );
}
export { SORTS };
