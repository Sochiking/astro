import './Rating.css';
export default function Rating({ value = 0, count }) {
  return <span className="rating">{[1, 2, 3, 4, 5].map((n) => <span key={n} className={n <= Math.round(value) ? 'on' : ''}>★</span>)}{count != null && <em>({count})</em>}</span>;
}
