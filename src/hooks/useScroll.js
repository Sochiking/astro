import { useEffect, useState } from 'react';
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => { const f = () => setY(window.scrollY); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  return y;
}
