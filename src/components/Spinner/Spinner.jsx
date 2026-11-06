import './Spinner.css';
export default function Spinner({ size = 28, block = false }) {
  const s = <span className="spinner" style={{ width: size, height: size }} />;
  return block ? <div className="spinner-block">{s}</div> : s;
}
