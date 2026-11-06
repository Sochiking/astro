import Icon from '../Icon/Icon.jsx';
import './Quantity.css';
export default function Quantity({ value, onChange, min = 1 }) {
  return (
    <div className="qty">
      <button onClick={() => onChange(Math.max(min, value - 1))} aria-label="Decrease"><Icon name="minus" size={14} /></button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Increase"><Icon name="plus" size={14} /></button>
    </div>
  );
}
