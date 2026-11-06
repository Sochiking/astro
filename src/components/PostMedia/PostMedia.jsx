import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import './PostMedia.css';
// format: standard | gallery | video | audio
export default function PostMedia({ post, format }) {
  const f = format || post.format; const [n, setN] = useState(0); const [play, setPlay] = useState(false);
  const imgs = [post.image, '/images/cat-1.jpg', '/images/cat-3.jpg'];
  if (f === 'gallery') return (
    <div className="pm gallery"><img key={n} src={imgs[n]} alt="" />
      <button className="l" onClick={() => setN((n + 2) % 3)}><Icon name="left" /></button><button className="r" onClick={() => setN((n + 1) % 3)}><Icon name="right" /></button>
      <div className="dots">{imgs.map((_, i) => <i key={i} className={i === n ? 'on' : ''} />)}</div></div>
  );
  if (f === 'video') return (
    <div className="pm video">{play ? <video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" controls autoPlay /> : <><img src={post.image} alt="" /><button className="play" onClick={() => setPlay(true)} aria-label="Play"><Icon name="play" size={26} /></button></>}</div>
  );
  if (f === 'audio') return (
    <div className="pm audio"><img src={post.image} alt="" /><audio controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" /></div>
  );
  return <div className="pm"><img src={post.image} alt="" /></div>;
}
