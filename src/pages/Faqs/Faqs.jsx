import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import Accordion from '../../components/Accordion/Accordion.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
export default function Faqs() {
  const { data, loading } = useApi(() => api.faqs(), []);
  return (
    <div className="page-fade">
      <PageBanner title="FAQs" style={1} />
      <div className="container" style={{ maxWidth: 820, padding: '50px 0 90px' }}>{loading ? <Spinner block /> : <Accordion items={data} />}</div>
    </div>
  );
}
