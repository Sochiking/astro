import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon.jsx';
import './HeroSlider.css';
export default function HeroSlider({ slides }) {
  const [i, setI] = useState(0); const [hold, setHold] = useState(false);
  const go = (n) => setI((n + slides.length) % slides.length);
  useEffect(() => { if (hold) return; const t = setTimeout(() => go(i + 1), 6500); return () => clearTimeout(t); }, [i, hold]); // eslint-disable-line
  return (
    <section className="hero" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      {slides.map((s, n) => (
        <div key={s.id} className={`hs ${n === i ? 'on' : ''}`}>
          <div className="hs-img" style={{ backgroundImage: `url(${s.image})` }} />
          <div className="container hs-text">
            <span className="eyebrow">{s.eyebrow}</span>
            <h1>{s.title.split(' ').map((w, k) => <span key={k}>{w}</span>)}</h1>
            <p>{s.text}</p>
            <Link to={s.link} className="btn">{s.cta}</Link>
          </div>
        </div>
      ))}
      <button className="hs-arrow l" onClick={() => go(i - 1)} aria-label="Previous"><Icon name="left" /></button>
      <button className="hs-arrow r" onClick={() => go(i + 1)} aria-label="Next"><Icon name="right" /></button>
      <div className="hs-dots">{slides.map((_, n) => <button key={n} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} />)}</div>
    </section>
  );
}
