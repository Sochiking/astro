import { Link } from 'react-router-dom';
import './NotFound.css';
export default function NotFound() {
  return <div className="nf page-fade"><h1>404</h1><p>We couldn't find that page.</p><Link to="/" className="btn">Back to home</Link></div>;
}
