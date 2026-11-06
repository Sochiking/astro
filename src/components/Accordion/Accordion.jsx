import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import './Accordion.css';
export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">{items.map((it, n) => (
      <div key={it.id} className={`acc-item ${open === n ? 'open' : ''}`}>
        <button onClick={() => setOpen(open === n ? -1 : n)}>{it.q}<Icon name={open === n ? 'minus' : 'plus'} size={16} /></button>
        <div className="acc-a"><p>{it.a}</p></div>
      </div>
    ))}</div>
  );
}
