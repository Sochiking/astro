import './Icon.css';
const P = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  heart: <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.600-9 9-9 9Z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>,
  bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  close: <path d="M5 5l14 14M19 5 5 19" />,
  left: <path d="m15 5-7 7 7 7" />, right: <path d="m9 5 7 7-7 7" />, up: <path d="M12 19V5M5 12l7-7 7 7" />,
  down: <path d="m5 9 7 7 7-7" />, plus: <path d="M12 5v14M5 12h14" />, minus: <path d="M5 12h14" />,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />, menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  check: <path d="m5 12 5 5 9-10" />, filter: <path d="M3 5h18M6 12h12M10 19h4" />,
  grid: <><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></>,
  list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  play: <path d="M7 4v16l13-8L7 4Z" />, pin: <><path d="M12 22s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z" /><circle cx="12" cy="10" r="2.500" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.500 6.500h.01" /></>,
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />,
  twitter: <path d="M22 5c-1 .6-2 .9-3 1a4 4 0 0 0-7 3C8 9 5 7 3 4c-1 3 0 5 2 7-1 0-2-.3-2-.5 0 2 1.500 4 3.500 4.500-.7.2-1.500.2-2 .1.600 1.800 2.300 3 4.200 3A8 8 0 0 1 2 20c9 5 19-1 19-11l1-4Z" />,
  pinterest: <path d="M12 3a9 9 0 0 0-3 17.500c-.1-.8 0-2 .2-2.800l1.200-5s-.3-.6-.3-1.500c0-1.400.8-2.400 1.800-2.400.9 0 1.300.6 1.300 1.400 0 .9-.6 2.200-.9 3.400-.2 1 .5 1.800 1.500 1.800 1.800 0 3.200-1.900 3.200-4.600 0-2.400-1.700-4-4.200-4a4.300 4.300 0 0 0-4.500 4.300c0 .9.300 1.800.7 2.300" />,
  link: <path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1" />,
  truck: <><path d="M2 6h12v10H2zM14 10h4l4 3v3h-8" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  shield: <path d="M12 3 4 6v6c0 5 3.500 8 8 9 4.500-1 8-4 8-9V6l-8-3Z" />,
  refresh: <path d="M20 11a8 8 0 1 0-2 6M20 4v7h-7" />,
};
export default function Icon({ name, size = 18, className = '' }) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{P[name]}</svg>;
}
