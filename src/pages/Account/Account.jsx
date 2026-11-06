import { useState } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import './Account.css';
export default function Account() {
  const { user, login, logout } = useStore();
  const [mode, setMode] = useState('login'); const [f, setF] = useState({ name: '', email: '', password: '' });
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => { e.preventDefault(); if (await login(mode, f)) setF({ name: '', email: '', password: '' }); };
  return (
    <div className="account page-fade">
      <PageBanner title="My Account" style={1} />
      <div className="container acc-body">
        {user ? (
          <div className="acc-card"><h3>Hello, {user.name}</h3><p>{user.email}</p><button className="btn dark" onClick={logout}>Sign out</button></div>
        ) : (
          <form className="acc-card" onSubmit={submit}>
            <div className="acc-tabs"><button type="button" className={mode === 'login' ? 'on' : ''} onClick={() => setMode('login')}>Login</button><button type="button" className={mode === 'register' ? 'on' : ''} onClick={() => setMode('register')}>Register</button></div>
            {mode === 'register' && <input className="field" placeholder="Full name" value={f.name} onChange={on('name')} />}
            <input className="field" placeholder="Email" value={f.email} onChange={on('email')} />
            <input className="field" type="password" placeholder="Password" value={f.password} onChange={on('password')} />
            <button className="btn">{mode === 'login' ? 'Login' : 'Create account'}</button>
          </form>
        )}
      </div>
    </div>
  );
}
