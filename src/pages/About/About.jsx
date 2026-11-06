import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import './About.css';
// name: about | story | team (data comes from GET /pages/:name)
export default function About({ name = 'about' }) {
  const { data: d, loading } = useApi(() => api.page(name), [name]);
  const ref = useReveal();
  if (loading) return <Spinner size={40} block />;
  return (
    <div className="about page-fade">
      <PageBanner title={d.title} style={name === 'team' ? 4 : 1} crumbs={[['About']]} />
      <div className="container about-body reveal" ref={ref}>
        <p className="about-intro">{d.intro}</p>
        {d.body.map((t, i) => <p key={i} className="about-p">{t}</p>)}
        {d.stats?.length > 0 && <div className="about-stats">{d.stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>}
        {d.team && <div className="about-team">{d.team.map((m) => <div key={m.name}><img src={m.image} alt={m.name} /><b>{m.name}</b><span>{m.role}</span></div>)}</div>}
        {name === 'about' && <img className="about-img" src="/images/hero-1.jpg" alt="" />}
      </div>
    </div>
  );
}
