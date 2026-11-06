import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx';
// Scroll to top and close any open drawer whenever the route changes.
export default function RouteScroll() {
  const { pathname } = useLocation(); const { setPanel } = useStore();
  useEffect(() => { window.scrollTo(0, 0); setPanel(null); }, [pathname]); // eslint-disable-line
  return null;
}
