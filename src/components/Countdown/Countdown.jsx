import { useEffect, useState } from 'react';
import './Countdown.css';
export default function Countdown({ hours = 36, expiredText = 'Expired' }) {
  const [end] = useState(() => Date.now() + hours * 3600 * 1000);
  const [left, setLeft] = useState(end - Date.now());
  useEffect(() => { const t = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000); return () => clearInterval(t); }, [end]);
  if (left <= 0) return <p className="cd-expired">{expiredText}</p>;
  const s = Math.floor(left / 1000), parts = [['Days', Math.floor(s / 86400)], ['Hrs', Math.floor(s % 86400 / 3600)], ['Min', Math.floor(s % 3600 / 60)], ['Sec', s % 60]];
  return <div className="countdown">{parts.map(([l, v]) => <div key={l}><b key={v}>{String(v).padStart(2, '0')}</b><small>{l}</small></div>)}</div>;
}
