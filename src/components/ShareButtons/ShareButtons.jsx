import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import './ShareButtons.css';
export default function ShareButtons({ title = 'Astro' }) {
  const { toast } = useStore(); const url = encodeURIComponent(window.location.href); const t = encodeURIComponent(title);
  const links = { facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`, twitter: `https://twitter.com/intent/tweet?url=${url}&text=${t}`, pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${t}` };
  return (
    <div className="share"><span>Share:</span>
      {Object.entries(links).map(([n, h]) => <a key={n} href={h} target="_blank" rel="noreferrer" aria-label={n}><Icon name={n} size={15} /></a>)}
      <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast('Link copied'); }} aria-label="Copy link"><Icon name="link" size={15} /></button>
    </div>
  );
}
