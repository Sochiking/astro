import { useEffect, useState } from 'react';
// Tiny data-fetching hook: { data, loading, error }. Re-runs when deps change.
export function useApi(fn, deps = []) {
  const [s, set] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let live = true;
    set((p) => ({ ...p, loading: true, error: null }));
    fn().then((data) => live && set({ data, loading: false, error: null })).catch((error) => live && set({ data: null, loading: false, error }));
    return () => { live = false; };
  }, deps); // eslint-disable-line
  return s;
}
