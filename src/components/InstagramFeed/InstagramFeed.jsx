import { useReveal } from '../../hooks/useReveal.js';
import Icon from '../Icon/Icon.jsx';
import './InstagramFeed.css';
export default function InstagramFeed({ data }) {
  const ref = useReveal();
  return (
    <section className="insta container reveal" ref={ref}>
      <div className="insta-head"><h3>Instagram</h3><a href="https://instagram.com" target="_blank" rel="noreferrer">{data.handle}</a></div>
      <div className="insta-grid">{data.images.map((src, i) => <a key={i} href="https://instagram.com" target="_blank" rel="noreferrer"><img src={src} alt="" /><span><Icon name="instagram" size={26} /></span></a>)}</div>
    </section>
  );
}
