import { Route, Routes } from 'react-router-dom';
import { allPageLinks } from './config/navigation.js';
import TopBar from './components/TopBar/TopBar.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import CartDrawer from './components/CartDrawer/CartDrawer.jsx';
import MobileMenu from './components/MobileMenu/MobileMenu.jsx';
import SearchPanel from './components/SearchPanel/SearchPanel.jsx';
import QuickView from './components/QuickView/QuickView.jsx';
import ScrollTop from './components/ScrollTop/ScrollTop.jsx';
import Toasts from './components/Toasts/Toasts.jsx';
import RouteScroll from './components/RouteScroll/RouteScroll.jsx';
import Home from './pages/Home/Home.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Product from './pages/Product/Product.jsx';
import Demo from './pages/Demo/Demo.jsx';
import Blog from './pages/Blog/Blog.jsx';
import Post from './pages/Post/Post.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Stores from './pages/Stores/Stores.jsx';
import Faqs from './pages/Faqs/Faqs.jsx';
import Account from './pages/Account/Account.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Wishlist from './pages/Wishlist/Wishlist.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

const PAGES = { shop: Shop, product: Product, demo: Demo, blog: Blog, post: Post, about: About, contact: Contact, stores: Stores, faqs: Faqs };

export default function App() {
  return (
    <>
      <RouteScroll />
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* one route per link found in the navbar menus */}
          {allPageLinks.map((l) => { const C = PAGES[l.page]; return <Route key={l.to} path={l.to} element={<C {...l.props} />} />; })}
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer /><MobileMenu /><SearchPanel /><QuickView /><ScrollTop /><Toasts />
    </>
  );
}
