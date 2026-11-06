import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import './ProductGallery.css';
// mode: slider (main + thumbs) | stack (vertical scroll) | grid (2-up)
export default function ProductGallery({ images, name, mode = 'slider', thumbs = 'bottom' }) {
  const [n, setN] = useState(0);
  if (mode === 'stack') return <div className="pgal stack">{images.map((s, i) => <div key={i} className="pg-big"><img src={s} alt={`${name} ${i + 1}`} /></div>)}</div>;
  if (mode === 'grid') return <div className="pgal grid">{images.map((s, i) => <div key={i} className="pg-big"><img src={s} alt={`${name} ${i + 1}`} /></div>)}</div>;
  return (
    <div className={`pgal slider t-${thumbs}`}>
      <div className="pg-main">
        <img key={n} src={images[n]} alt={name} />
        <button className="l" onClick={() => setN((n + images.length - 1) % images.length)}><Icon name="left" /></button>
        <button className="r" onClick={() => setN((n + 1) % images.length)}><Icon name="right" /></button>
      </div>
      <div className="pg-thumbs">{images.map((s, i) => <button key={i} className={i === n ? 'on' : ''} onClick={() => setN(i)}><img src={s} alt="" /></button>)}</div>
    </div>
  );
}
