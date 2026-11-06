import { useParams } from 'react-router-dom';
import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import PostMedia from '../../components/PostMedia/PostMedia.jsx';
import BlogSidebar from '../../components/BlogSidebar/BlogSidebar.jsx';
import BlogCard from '../../components/BlogCard/BlogCard.jsx';
import ShareButtons from '../../components/ShareButtons/ShareButtons.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import './Post.css';
const SAMPLE = { gallery: 'collagen-and-white-tissue', video: 'whats-the-best-time-to-gym', audio: 'how-to-choose-a-backpack' };
// sidebar: left | right | none     format: gallery | video | audio (demo pages use a sample post)
export default function Post({ sidebar = 'right', format }) {
  const { slug: s } = useParams(); const slug = s || SAMPLE[format] || 'training-during-ramadan';
  const { data: p, loading } = useApi(() => api.post(slug), [slug]);
  if (loading) return <Spinner size={40} block />;
  return (
    <div className="post page-fade">
      <PageBanner title={p.title} style={1} crumbs={[['Blog', '/blog/right-sidebar']]} />
      <div className={`container post-body sb-${sidebar}`}>
        {sidebar === 'left' && <BlogSidebar />}
        <article>
          <PostMedia post={p} format={format} />
          <small className="post-meta">{p.date} <span>|</span> {p.comments} Comments</small>
          <h2>{p.title}</h2>
          {p.body.map((t, i) => <p key={i}>{t}</p>)}
          <p>{p.excerpt}</p>
          <div className="post-share"><ShareButtons title={p.title} /></div>
          <h3 className="post-rel">Related posts</h3>
          <div className="post-relgrid">{p.related.map((r) => <BlogCard key={r.id} post={r} />)}</div>
        </article>
        {sidebar === 'right' && <BlogSidebar />}
      </div>
    </div>
  );
}
