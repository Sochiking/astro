import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import BlogCard from '../../components/BlogCard/BlogCard.jsx';
import BlogSidebar from '../../components/BlogSidebar/BlogSidebar.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import './Blog.css';
// sidebar: left | right | none     style: list | grid | masonry
export default function Blog({ sidebar = 'right', style = 'grid' }) {
  const { data, loading } = useApi(() => api.posts(), []);
  return (
    <div className="blog page-fade">
      <PageBanner title="Blog" style={1} />
      <div className={`container blog-body sb-${sidebar}`}>
        {sidebar === 'left' && <BlogSidebar />}
        <div className={`blog-list ${style}`}>{loading ? <Spinner block /> : data.map((p, i) => <div key={p.id} style={{ animationDelay: `${i * 80}ms` }} className="bl-item"><BlogCard post={p} style={style} /></div>)}</div>
        {sidebar === 'right' && <BlogSidebar />}
      </div>
    </div>
  );
}
