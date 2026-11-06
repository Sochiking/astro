import { useStore } from '../../context/StoreContext.jsx';
import Icon from '../Icon/Icon.jsx';
import './Toasts.css';
export default function Toasts() {
  const { toasts } = useStore();
  return <div className="toasts">{toasts.map((t) => <div key={t.id} className={`toast ${t.type}`}><Icon name={t.type === 'err' ? 'close' : 'check'} size={16} />{t.message}</div>)}</div>;
}
