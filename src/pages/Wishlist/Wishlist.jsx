import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx';
import PageBanner from '../../components/PageBanner/PageBanner.jsx';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
export default function Wishlist() {
  const { wishlist } = useStore();
  return (
    <div className="page-fade">
      <PageBanner title="Wishlist" style={1} />
      <div className="container" style={{ padding: '50px 0 90px' }}>
        {wishlist.items.length ? <ProductGrid items={wishlist.items} cols={4} /> : <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Your wishlist is empty. <Link to="/shop/fullwidth" style={{ color: 'var(--accent)' }}>Find something you love</Link>.</p>}
      </div>
    </div>
  );
}
