import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal.js';
import './PromoBanner.css';
export default function PromoBanner({ promo }) {
  const ref = useReveal();
  return (
    <section className="promo section container reveal" ref={ref}>
      <div className="promo-img"><img src={promo.image} alt={promo.title} /></div>
      <div className="promo-text">
        <span className="eyebrow-s">{promo.eyebrow}</span><h2>{promo.title}</h2><p>{promo.text}</p>
        <Link to={promo.link} className="btn">{promo.cta}</Link>
      </div>
    </section>
  );
}
