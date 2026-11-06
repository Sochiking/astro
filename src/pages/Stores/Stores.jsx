import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import './Stores.css';
export default function Stores() {
  const { data, loading } = useApi(() => api.stores(), []);
  return (
    <div className="stores page-fade">
      <PageBanner title="Store Locations" style={1} crumbs={[['Contact', '/contact']]} />
      <div className="container stores-body">
        {loading ? <Spinner block /> : data.map((s, i) => (
          <div key={s.id} className="store" style={{ animationDelay: `${i * 100}ms` }}><Icon name="pin" size={28} /><div><h3>{s.name}</h3><p>{s.address}</p><p>{s.phone}</p><small>{s.hours}</small></div></div>
        ))}
      </div>
    </div>
  );
}
