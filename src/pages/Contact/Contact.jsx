import { useState } from 'react';
import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import { useStore } from '../../context/StoreContext.jsx';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import './Contact.css';
export default function Contact() {
  const { data: info } = useApi(() => api.storeInfo(), []);
  const { toast } = useStore();
  const [f, setF] = useState({ name: '', email: '', message: '' }); const [busy, setBusy] = useState(false);
  const submit = async (e) => { e.preventDefault(); setBusy(true); try { const r = await api.contact(f); toast(r.message); setF({ name: '', email: '', message: '' }); } catch (er) { toast(er.message, 'err'); } setBusy(false); };
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="contact page-fade">
      <PageBanner title="Contact Us" style={1} crumbs={[['Contact']]} />
      <div className="container contact-body">
        <div className="contact-info">
          <h3>Get in touch</h3>
          {info && <><p><Icon name="pin" /> {info.address}</p><p><Icon name="user" /> {info.phone}</p><p><Icon name="link" /> {info.email}</p><p>{info.hours}</p></>}
        </div>
        <form onSubmit={submit}>
          <div className="two"><input className="field" placeholder="Your name" value={f.name} onChange={on('name')} /><input className="field" placeholder="Your email" value={f.email} onChange={on('email')} /></div>
          <textarea className="field" rows="6" placeholder="How can we help?" value={f.message} onChange={on('message')} />
          <button className="btn" disabled={busy}>{busy ? 'Sending...' : 'Send message'}</button>
        </form>
      </div>
    </div>
  );
}
