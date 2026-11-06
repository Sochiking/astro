import './SectionTitle.css';
export default function SectionTitle({ title, sub }) {
  return <div className="stitle"><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
}
