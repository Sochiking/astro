import './BrandStrip.css';
export default function BrandStrip({ brands }) {
  return (
    <section className="brands container">
      {brands.map((b, i) => <span key={b.name} className={`brand ${b.style}`} style={{ animationDelay: `${i * 80}ms` }}>{b.name}</span>)}
    </section>
  );
}
