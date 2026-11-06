// Single door to the backend. Set VITE_API_URL and every call goes to your real server.
// With no URL, calls are answered by src/api/mockServer.js so the site runs today.
import { handle } from './mockServer.js';
const BASE = import.meta.env.VITE_API_URL;
export async function request(method, path, body) {
  if (!BASE) return handle(method, path, body);
  const token = localStorage.getItem('astro_token');
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}
export const get = (p) => request('GET', p);
export const post = (p, b) => request('POST', p, b);
export const patch = (p, b) => request('PATCH', p, b);
export const del = (p) => request('DELETE', p);
