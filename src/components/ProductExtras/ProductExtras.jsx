import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import Countdown from '../Countdown/Countdown.jsx';
import './ProductExtras.css';
// extend: promo | trust | countdown | video
export default function ProductExtras({ extend, product }) {
  const [play, setPlay] = useState(false);
  if (extend === 'promo') return <div className="px promo"><b>Limited offer:</b> use code <code>ASTRO10</code> at checkout for 10% off this bag.</div>;
  if (extend === 'trust') return (
    <div className="px trust">
      {[['truck', 'Free shipping', 'On orders over $100'], ['refresh', '30-day returns', 'No questions asked'], ['shield', 'Secure checkout', '256-bit encryption']].map(([i, t, s]) => <div key={t}><Icon name={i} size={26} /><b>{t}</b><small>{s}</small></div>)}
    </div>
  );
  if (extend === 'countdown') return <div className="px cd"><b>Flash sale ends in</b><Countdown hours={24} /></div>;
  if (extend === 'video') return (
    <div className="px video">{play ? <video src={product.videoUrl} controls autoPlay /> : <button onClick={() => setPlay(true)}><img src={product.image} alt="" /><span><Icon name="play" size={24} /></span><em>Watch product video</em></button>}</div>
  );
  return null;
}
