import { Link } from 'react-router-dom';
import './BlogCard.css';
export default function BlogCard({ post: p, style = 'grid' }) {
  return (
    <article className={`bcard b-${style}`}>
      <Link to={`/post/${p.slug}`} className="bc-img"><img src={p.image} alt={p.title} />{p.format !== 'standard' && <i>{p.format}</i>}</Link>
      <div className="bc-body">
        <small>{p.date} <span>|</span> {p.comments} Comments</small>
        <h3><Link to={`/post/${p.slug}`}>{p.title}</Link></h3><p>{p.excerpt}</p>
        <Link to={`/post/${p.slug}`} className="bc-more">Read more</Link>
      </div>
    </article>
  );
}
