import { api } from '../../api/endpoints.js';
import { useApi } from '../../hooks/useApi.js';
import HeroSlider from '../../components/HeroSlider/HeroSlider.jsx';
import CategoryBanners from '../../components/CategoryBanners/CategoryBanners.jsx';
import BrandStrip from '../../components/BrandStrip/BrandStrip.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import ProductTabs from '../../components/ProductTabs/ProductTabs.jsx';
import DealBanner from '../../components/DealBanner/DealBanner.jsx';
import PromoBanner from '../../components/PromoBanner/PromoBanner.jsx';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';
import InstagramFeed from '../../components/InstagramFeed/InstagramFeed.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import './Home.css';

export default function Home() {
  const { data: h, loading } = useApi(() => api.home(), []);
  const { data: arrivals } = useApi(() => api.products({ section: 'new' }), []);
  const ref = useReveal();
  if (loading) return <div className="home-load"><Spinner size={40} block /></div>;
  return (
    <div className="home">
      <HeroSlider slides={h.slides} />
      <CategoryBanners items={h.categories} />
      <BrandStrip brands={h.brands} />
      <section className="section container reveal home-arrivals" ref={ref}>
        <SectionTitle title="New Arrival" sub="Do not wait any longer and discover other related fashion products" />
        {arrivals ? <ProductGrid items={arrivals.items} /> : <Spinner block />}
      </section>
      <DealBanner deal={h.deal} />
      <ProductTabs title="Best Seller" />
      <PromoBanner promo={h.promo} />
      <Testimonials items={h.testimonials} />
      <InstagramFeed data={h.instagram} />
    </div>
  );
}
