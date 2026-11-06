import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal.js';
import SectionTitle from '../SectionTitle/SectionTitle.jsx';
import './Testimonials.css';
export default function Testimonials({ items }) {
  const [i, setI] = useState(0); const max = items.length - 3; const ref = useReveal();
  return (
    <section className="testi section container reveal" ref={ref}>
      <SectionTitle title="What They Say" sub="Do not wait any longer and discover other related fashion products" />
      <div className="tt-view"><div className="tt-track" style={{ transform: `translateX(-${i * (100 / 3)}%)` }}>
        {items.map((t) => (
          <figure key={t.id} className="tt">
            {t.avatar ? <img src={t.avatar} alt={t.name} /> : <span className="tt-av">{t.name[0]}</span>}
            <div className="tt-stars">★★★★★</div><blockquote>&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption><b>{t.name}</b><small>{t.role}</small></figcaption>
          </figure>
        ))}
      </div></div>
      <div className="tt-dots">{Array.from({ length: max + 1 }, (_, n) => <button key={n} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Testimonials ${n + 1}`} />)}</div>
    </section>
  );
}
