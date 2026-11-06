import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal.js';
import './CategoryBanners.css';
export default function CategoryBanners({ items }) {
  const ref = useReveal();
  return (
    <section className="cats reveal" ref={ref}>
      {items.map((c) => (
        <Link key={c.id} to={c.link} className="cat"><img src={c.image} alt={c.name} /><span>{c.name}</span></Link>
      ))}
    </section>
  );
}
