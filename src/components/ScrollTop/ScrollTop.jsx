import Icon from '../Icon/Icon.jsx';
import { useScrollY } from '../../hooks/useScroll.js';
import './ScrollTop.css';
export default function ScrollTop() {
  const y = useScrollY();
  return <button className={`scrolltop ${y > 400 ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0 })} aria-label="Back to top"><Icon name="up" /></button>;
}
