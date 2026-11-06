// One source of truth: the navbar menus AND the router are both built from this file,
// so every link in every dropdown is guaranteed to have a page.
const L = (label, to, page, props = {}, badge) => ({ label, to, page, props, badge });
const shop = (label, slug, props, badge) => L(label, `/shop/${slug}`, 'shop', props, badge);
const prod = (label, slug, props, badge) => L(label, `/product-page/${slug}`, 'product', props, badge);
const demo = (label, slug, kind) => L(label, `/featured/${slug}`, 'demo', { kind });
const blog = (label, slug, props) => L(label, `/blog/${slug}`, 'blog', props);
const post = (label, slug, props) => L(label, `/post/${slug}`, 'post', props);

export const shopMenu = [
  { title: 'Shop Layouts', items: [
    shop('Fullwidth', 'fullwidth', { layout: 'fullwidth' }), shop('Sidebar Layouts', 'sidebar', { layout: 'sidebar' }),
    shop('Infinity Scroll', 'infinity-scroll', { layout: 'infinite' }), shop('Background Mordern', 'background-modern', { layout: 'background' }),
    shop('List View', 'list-view', { layout: 'list' }), shop('Banner Morden', 'banner-modern', { layout: 'banner' }) ] },
  { title: 'Shop Heading', items: [1, 2, 3, 4, 5, 6].map((n) => shop(`Heading Style ${n}`, `heading-style-${n}`, { heading: n })) },
  { title: 'Filter Layout', items: [
    shop('Drawer Filter', 'drawer-filter', { filter: 'drawer' }, 'NEW'), shop('Off Canvas', 'off-canvas', { filter: 'offcanvas' }),
    shop('Filter Dropdown', 'filter-dropdown', { filter: 'dropdown' }), shop('Filter Dropdown 2', 'filter-dropdown-2', { filter: 'dropdown2' }),
    shop('Filter Acordition', 'filter-accordion', { filter: 'accordion' }), shop('Filter Sticky', 'filter-sticky', { filter: 'sticky' }, 'HOT') ] },
  { title: 'Product Layouts', items: [
    prod('Product Extented', 'extended', { layout: 'extended' }), prod('Product Scroll', 'scroll', { layout: 'scroll' }),
    prod('Product Sticky', 'sticky', { layout: 'sticky' }), prod('Product Sticky 2', 'sticky-2', { layout: 'sticky2' }),
    prod('Sticky Center', 'sticky-center', { layout: 'stickycenter' }), prod('Product Slider Gallery', 'slider-gallery', { layout: 'slider' }),
    prod('Product Slider Center', 'slider-center', { layout: 'slidercenter' }), prod('Product Large Grid', 'large-grid', { layout: 'large' }),
    prod('Product Small Grid', 'small-grid', { layout: 'small' }), prod('Product Extended-Background', 'extended-background', { layout: 'extbg' }),
    prod('Product Sidebar', 'sidebar', { layout: 'sidebar' }), prod('Product Sidebar 2', 'sidebar-2', { layout: 'sidebar2' }) ] },
  { title: 'Product Types', items: [
    prod('Simple', 'type-simple', { type: 'simple' }, 'NEW'), prod('Variable Select', 'type-variable', { type: 'variable' }),
    prod('External / Affiliate', 'type-external', { type: 'external' }, 'HOT'), prod('Boosted Sale', 'type-boosted', { type: 'boosted' }) ] },
  { title: 'Product Extends', items: [
    prod('Promo Text', 'extend-promo', { extend: 'promo' }), prod('Trust Sale', 'extend-trust', { extend: 'trust' }),
    prod('Countdown', 'extend-countdown', { extend: 'countdown' }), prod('Featured Video', 'extend-video', { extend: 'video' }) ] },
];

export const featuredMenu = {
  columns: [
    { title: 'Animate Demos', items: [demo('Quickview-Popup', 'quickview-popup', 'quickview'), demo('Minicart Draws', 'minicart-draws', 'minicartDraw'), demo('Quick Add to cart', 'quick-add-to-cart', 'quickadd')] },
    { title: '9 Product Hover', items: [1, 2, 3, 4].map((n) => demo(`Product Hover Style ${n}`, `hover-style-${n}`, `hover${n}`)).concat(demo('All Style', 'hover-all', 'hoverAll')) },
    { title: 'Theme Element', items: [demo('Ajax Search', 'ajax-search', 'ajaxSearch'), demo('Minicart', 'minicart', 'minicart'), demo('Recently Products', 'recently-products', 'recent'), demo('Social Share', 'social-share', 'social')] },
  ],
  image: '/images/menu-feature.jpg',
};

export const blogMenu = {
  groups: [
    { title: 'Blog Layout', items: [blog('Blog Left Sidebar', 'left-sidebar', { sidebar: 'left' }), blog('Blog Right Sidebar', 'right-sidebar', { sidebar: 'right' }), blog('Blog Without Sidebar', 'without-sidebar', { sidebar: 'none' })] },
    { title: 'Blog Style', items: [blog('Blog List', 'style-list', { style: 'list', sidebar: 'right' }), blog('Blog Grid', 'style-grid', { style: 'grid', sidebar: 'none' }), blog('Blog Masonry', 'style-masonry', { style: 'masonry', sidebar: 'none' })] },
    { title: 'Post Layout', items: [post('Left Sidebar', 'layout-left-sidebar', { sidebar: 'left' }), post('Right Sidebar', 'layout-right-sidebar', { sidebar: 'right' }), post('Without Sidebar', 'layout-without-sidebar', { sidebar: 'none' })] },
    { title: 'Post Format', items: [post('Post format gallery', 'format-gallery', { format: 'gallery' }), post('Post format video', 'format-video', { format: 'video' }), post('Post format audio', 'format-audio', { format: 'audio' })] },
  ],
};

export const pageMenu = [
  { label: 'About', children: [L('Our Story', '/page/about/our-story', 'about', { name: 'story' }), L('About Us', '/page/about', 'about', { name: 'about' }), L('Our Team', '/page/about/team', 'about', { name: 'team' })] },
  { label: 'Contact', children: [L('Contact Us', '/contact', 'contact'), L('Store Locations', '/page/contact/stores', 'stores')] },
  L('Faqs', '/page/faqs', 'faqs'),
];

export const mainNav = [
  { label: 'Home', to: '/' }, { label: 'Shop', menu: 'shop' }, { label: 'Featured', menu: 'featured' },
  { label: 'Blog', menu: 'blog' }, { label: 'Page', menu: 'page' }, { label: 'Contact', to: '/contact' },
];
export const footerLinks = {
  'Custom Service': [['Shipping info', '/page/faqs'], ['Refunds & returns', '/page/faqs'], ['Terms & conditions', '/page/faqs'], ['My account', '/account']],
  Information: [['Our blog', '/blog/right-sidebar'], ['About Us', '/page/about'], ['Contact Us', '/contact'], ['FAQs', '/page/faqs']],
};

// Flatten every linkable item so App.jsx can register a route for each.
export const allPageLinks = [
  ...shopMenu.flatMap((c) => c.items), ...featuredMenu.columns.flatMap((c) => c.items), ...blogMenu.groups.flatMap((g) => g.items),
  ...pageMenu.flatMap((p) => (p.children ? p.children : [p])),
];
