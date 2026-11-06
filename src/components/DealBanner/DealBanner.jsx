import { Link } from 'react-router-dom';
import Countdown from '../Countdown/Countdown.jsx';
import './DealBanner.css';
export default function DealBanner({ deal }) {
  const [a, b, c, d] = deal.products;
  return (
    <section className="deal">
      <img className="d-bag l1" src={a.image} alt="" /><img className="d-bag l2" src={b.image} alt="" />
      <img className="d-bag r1" src={c.image} alt="" /><img className="d-bag r2" src={d.image} alt="" />
      <div className="deal-text">
        <h2>{deal.title}</h2><p>{deal.text}</p>
        <Countdown hours={deal.endsInHours} />
        <Link to={deal.link} className="btn">Shop Now</Link>
      </div>
    </section>
  );
}
