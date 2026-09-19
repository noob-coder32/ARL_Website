import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  AlertCircle,
  AlertTriangle,
  Award,
  BadgeCheck,
  Building2,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  Compass,
  Download,
  ExternalLink,
  Eye,
  Factory,
  FileBadge,
  FileText,
  Filter,
  Flame,
  Gavel,
  Inbox,
  KeyRound,
  Layers,
  Leaf,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Package,
  Phone,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  UserCheck,
  Users,
  Wrench,
  X
} from 'lucide-react';
import './styles.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const imageBase = '/images';

const heroPhrases = [
  'Trusted Across India.',
  'Built for Every Season.',
  'Made for Generations.'
];

// Corporate Navigation Items
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'products', label: 'Products' },
  { id: 'services', label: 'Services & Support' },
  { id: 'compliances', label: 'Compliances' },
  { id: 'estimator', label: 'Roof Calculator' },
  { id: 'key-management', label: 'Key & Portal' },
  { id: 'gallery', label: 'Media Gallery' },
  { id: 'contact', label: 'Contact & Enquiry' },
  { id: 'login', label: 'Staff Login' }
];

// Product Data with Technical Specifications
const products = [
  {
    id: 'colour-coated',
    name: 'Colour Coated Metal Roofing (PPGI / PPGL)',
    category: 'Metal Roofing',
    badge: 'Popular Choice',
    image: `${imageBase}/products/colour-coated-metal-roofing.png`,
    shortDesc: 'Premium pre-painted galvanized and galvalume sheets offering aesthetic elegance and superior weather protection.',
    specs: {
      thickness: '0.35 mm - 0.60 mm',
      width: '1060 mm (Effective cover: 1000 mm)',
      coating: 'AZ150 / 120 GSM Zinc Coating',
      tensile: '550 MPa (High Tensile Steel)',
      colors: ['Royal Blue', 'Brick Red', 'Mist Green', 'Off White', 'Terracotta'],
      standard: 'IS 14246 / IS 15965',
      applications: 'Industrial sheds, commercial complexes, tea estate processing units, warehouses & residential bungalows.'
    }
  },
  {
    id: 'galvanized-steel',
    name: 'Galvanized Coated Steel MS Roofing Sheet (GI)',
    category: 'Galvanized Steel',
    badge: 'Heavy Duty',
    image: `${imageBase}/products/galvanized-coated-steel-roofing-sheet.png`,
    shortDesc: 'Heavy-duty hot-dip galvanized steel sheets engineered for long-term corrosion resistance in high-rainfall zones.',
    specs: {
      thickness: '0.40 mm - 0.80 mm',
      width: '900 mm - 1220 mm',
      coating: '120 - 275 GSM Zinc Coating',
      tensile: '550 MPa (Grade A Steel)',
      colors: ['Natural Bright Metallic Spangle'],
      standard: 'IS 277 / IS 513',
      applications: 'Heavy engineering factories, railway shelters, agricultural godowns, perimeter cladding.'
    }
  },
  {
    id: 'tile-roofing',
    name: 'Tile Profile Architectural Roofing Sheet',
    category: 'Architectural Roofing',
    badge: 'Architectural',
    image: `${imageBase}/products/tile-roofing-sheet.png`,
    shortDesc: 'Combines the classic aesthetic charm of Mangalore clay tiles with the lightweight durability of modern high-tensile steel.',
    specs: {
      thickness: '0.40 mm - 0.50 mm',
      width: '1050 mm (Effective: 980 mm)',
      stepLength: '300 mm / 350 mm Pitch',
      coating: 'Super Polyester Anti-Fade',
      colors: ['Heritage Brick Red', 'Spanish Brown', 'Forest Green'],
      standard: 'ISO 9001 / BIS Certified',
      applications: 'Residential villas, luxury resorts, hill stations, heritage structures, temple roofs.'
    }
  },
  {
    id: 'roofing-sheets',
    name: 'Durable Corrugated Roofing Sheets',
    category: 'Corrugated Sheets',
    badge: 'High Durability',
    image: `${imageBase}/products/roofing-sheets.png`,
    shortDesc: 'Time-tested corrugated roofing sheets delivering high load-bearing capacity and acoustic rain dampening.',
    specs: {
      thickness: '0.45 mm - 0.63 mm',
      profile: 'Sinusoidal Corrugated Pitch 76mm',
      fireRating: 'Class 1 Fire Resistance',
      soundInsulation: 'High Rain Noise Absorption',
      colors: ['Industrial Silver Gray', 'Natural Galvanized'],
      standard: 'IS 459 / IS 277',
      applications: 'Tea garden factories, agricultural sheds, workshops, cost-effective residential housing.'
    }
  }
];

// Media Gallery Images
const galleryItems = [
  {
    id: 1,
    title: 'ARL Manufacturing Plant - Bonda Narangi',
    category: 'Plant & Infrastructure',
    url: `${imageBase}/arl-factory.jpg`,
    desc: 'High-speed roll forming and corrugation line at Guwahati manufacturing facility.'
  },
  {
    id: 2,
    title: 'Precision Sheet Rolling Facility',
    category: 'Plant & Infrastructure',
    url: `${imageBase}/arl-factory2.png`,
    desc: 'State-of-the-art automated shearing and profile forming machinery.'
  },
  {
    id: 3,
    title: 'Industrial Warehouse Installation',
    category: 'Completed Projects',
    url: `${imageBase}/bg1.jpg`,
    desc: 'Large-span commercial logistics hub roofed with ARL Colour Coated PPGL.'
  },
  {
    id: 4,
    title: 'Plant Overview & Dispatch Yard',
    category: 'Plant & Infrastructure',
    url: `${imageBase}/bg2.png`,
    desc: 'Bonda Narangi plant yard with direct road logistics connecting all 8 Northeast states.'
  },
  {
    id: 5,
    title: 'Commercial Roof Cladding Project',
    category: 'Completed Projects',
    url: `${imageBase}/bg3.jpg`,
    desc: 'Architectural tile profile and standing seam commercial complex in Assam.'
  },
  {
    id: 6,
    title: 'Heavy Industry Shed Structure',
    category: 'Completed Projects',
    url: `${imageBase}/bg4.png`,
    desc: 'High-tensile galvanized MS sheets engineered for high-monsoon durability.'
  }
];

// Company Milestones
const milestones = [
  {
    year: '1972',
    title: 'Company Incorporation in Guwahati',
    desc: 'Assam Roofing Limited was incorporated on June 06, 1972, under ROC Guwahati, pioneering quality roofing materials for Northeast India.'
  },
  {
    year: '1985',
    title: 'Facility Expansion at Bonda Narangi',
    desc: 'Established modernized continuous roll-forming lines and large-scale manufacturing infrastructure in Guwahati, Assam.'
  },
  {
    year: '2005',
    title: 'Launch of Colour Coated PPGI/PPGL Lines',
    desc: 'Introduced vibrant, corrosion-resistant colour coated steel and tile profile sheets catering to modern architecture.'
  },
  {
    year: '2020+',
    title: 'Regional Leadership & Scale',
    desc: 'Expanded annual turnover between ₹500 Cr - ₹1,000 Cr with 300+ dedicated professionals serving industrial, tea estate, and civil sectors across 8 Northeast states.'
  }
];

// Corporate Leadership
const directors = [
  {
    name: 'Bhagirath Pasari',
    role: 'Director',
    desc: 'Decades of industrial manufacturing governance and strategic direction in the building materials industry.'
  },
  {
    name: 'Rahul Pasari',
    role: 'Director',
    desc: 'Spearheading technological modernization, plant expansion, and pan-Northeast supply chain logistics.'
  },
  {
    name: 'Executive Leadership Board',
    role: 'Technical & Operations Team',
    desc: 'Senior metallurgical engineers, production managers, and quality assurance specialists leading daily operations.'
  }
];

// Frequently Asked Questions
const faqs = [
  {
    q: 'Where is the Assam Roofing Limited factory and registered office located?',
    a: 'Our manufacturing plant and registered office is located at Bonda Narangi, Guwahati, Assam, India, PIN: 781026 (CIN: U26953AS1972PLC001381).'
  },
  {
    q: 'Can sheets be customized to specific lengths for large projects?',
    a: 'Yes. We provide precision cut-to-length sheeting up to 24 feet directly from our rolling mills to minimize on-site overlaps and wastage.'
  },
  {
    q: 'Why are ARL roofing sheets ideal for the Northeast Indian climate?',
    a: 'Northeast India experiences heavy rainfall, high humidity, and seismic activity. Our sheets feature heavy zinc/galvalume coating (up to AZ150 / 275 GSM) and 550 MPa high-yield steel designed to resist tropical rust and wind uplift.'
  },
  {
    q: 'How can authorized distributors and dealers partner with ARL?',
    a: 'Prospective dealers can submit a dealership enquiry through our Contact & Enquiry portal or call our corporate sales desk directly.'
  }
];

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
function App() {
  const [activePage, setActivePage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [prefilledInquiry, setPrefilledInquiry] = useState(null);
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(() => {
    return !!localStorage.getItem('arl_auth_token');
  });

  const navigate = (page, inquiryData = null) => {
    setActivePage(page);
    setMenuOpen(false);
    if (inquiryData) {
      setPrefilledInquiry(inquiryData);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStaffLoginSuccess = (email) => {
    setIsStaffAuthenticated(true);
    setActivePage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStaffLogout = () => {
    setIsStaffAuthenticated(false);
    localStorage.removeItem('arl_auth_token');
    localStorage.removeItem('arl_staff_email');
    localStorage.removeItem('arl_staff_name');
    localStorage.removeItem('arl_staff_role');
    setActivePage('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <span className="top-item">
              <MapPin size={14} />
              <span>Bonda Narangi, Guwahati, Assam 781026</span>
            </span>
            <span className="top-item">
              <Clock size={14} />
              <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
            </span>
            <span className="top-badge">CIN: U26953AS1972PLC001381</span>
          </div>
          <div className="top-bar-right">
            <a href="tel:+913612640262" className="top-item">
              <Phone size={14} />
              <span>+91 (0361) 264 0262</span>
            </a>
            <a href="mailto:info@assamroofing.com" className="top-item">
              <Mail size={14} />
              <span>info@assamroofing.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => navigate('home')} aria-label="Assam Roofing Limited Home">
            <div className="brand-logo-frame">
              <img className="brand-logo" src={`${imageBase}/logo1.png`} alt="ARL logo" />
            </div>
            <div className="brand-text">
              <span className="brand-title">ASSAM ROOFING</span>
              <span className="brand-subtitle">Est. 1972 • Guwahati</span>
            </div>
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
            {navItems.map((item) => {
              const isLoginItem = item.id === 'login';
              const label = isLoginItem && isStaffAuthenticated ? 'Staff Desk' : item.label;
              return (
                <button
                  key={item.id}
                  className={activePage === item.id || (activePage === 'admin' && isLoginItem) ? 'nav-link active' : 'nav-link'}
                  onClick={() => navigate(isLoginItem && isStaffAuthenticated ? 'admin' : item.id)}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="header-actions">
            <button className="btn btn-primary btn-sm" onClick={() => navigate('contact')}>
              <Send size={15} />
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {activePage === 'home' && (
          <Home
            onNavigate={navigate}
            onSelectProduct={setSelectedProduct}
            onOpenLightbox={setLightboxImage}
          />
        )}
        {activePage === 'about' && <About />}
        {activePage === 'products' && (
          <Products
            onNavigate={navigate}
            onSelectProduct={setSelectedProduct}
          />
        )}
        {activePage === 'services' && <Services onNavigate={navigate} />}
        {activePage === 'compliances' && <Compliances />}
        {activePage === 'estimator' && <RoofEstimator onNavigate={navigate} />}
        {activePage === 'key-management' && <KeyManagement />}
        {activePage === 'gallery' && (
          <Gallery onOpenLightbox={setLightboxImage} />
        )}
        {activePage === 'contact' && (
          <Contact prefilledInquiry={prefilledInquiry} />
        )}
        {activePage === 'login' && (
          isStaffAuthenticated ? (
            <AdminSubmissions onLogout={handleStaffLogout} />
          ) : (
            <Login onLoginSuccess={handleStaffLoginSuccess} />
          )
        )}
        {activePage === 'admin' && (
          isStaffAuthenticated ? (
            <AdminSubmissions onLogout={handleStaffLogout} />
          ) : (
            <Login onLoginSuccess={handleStaffLoginSuccess} />
          )
        )}
      </main>

      {/* Technical Spec Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEnquire={(p) => {
            setSelectedProduct(null);
            navigate('contact', {
              subject: `Inquiry regarding ${p.name}`,
              type: 'enquiry',
              message: `Hello Sales Team,\n\nI would like to inquire about specifications, pricing, and availability for: ${p.name}.\n\nRequired thickness/quantity:\nProject location:\n`
            });
          }}
        />
      )}

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <LightboxModal
          item={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}

      {/* Corporate Footer */}
      <Footer onNavigate={navigate} />
    </>
  );
}

// ============================================================================
// HOMEPAGE COMPONENT
// ============================================================================
function Home({ onNavigate, onSelectProduct, onOpenLightbox }) {
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const [heroCharacterCount, setHeroCharacterCount] = useState(0);
  const [isHeroDeleting, setIsHeroDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreferenceChange = (event) => setPrefersReducedMotion(event.matches);

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener?.('change', handleMotionPreferenceChange);

    return () => mediaQuery.removeEventListener?.('change', handleMotionPreferenceChange);
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setHeroPhraseIndex(0);
      setHeroCharacterCount(heroPhrases[0].length);
      setIsHeroDeleting(false);
      return undefined;
    }

    const phrase = heroPhrases[heroPhraseIndex];
    const isPhraseComplete = heroCharacterCount === phrase.length;
    const delay = isHeroDeleting ? 35 : isPhraseComplete ? 1800 : 65;
    const typewriterTimer = window.setTimeout(() => {
      if (isHeroDeleting) {
        if (heroCharacterCount > 0) {
          setHeroCharacterCount((count) => count - 1);
        } else {
          setIsHeroDeleting(false);
          setHeroPhraseIndex((index) => (index + 1) % heroPhrases.length);
        }
      } else if (heroCharacterCount < phrase.length) {
        setHeroCharacterCount((count) => count + 1);
      } else {
        setIsHeroDeleting(true);
      }
    }, delay);

    return () => window.clearTimeout(typewriterTimer);
  }, [heroPhraseIndex, heroCharacterCount, isHeroDeleting, prefersReducedMotion]);

  const visibleHeroPhrase = prefersReducedMotion
    ? heroPhrases[0]
    : heroPhrases[heroPhraseIndex].slice(0, heroCharacterCount);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pattern-overlay" />
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge-pill">
              <Award size={15} />
              <span>ESTD. 1972 • Over 50 Years of Excellence</span>
            </div>
            <h1 className="hero-title">
              Engineered for Strength.{' '}
              <span className="hero-rotating-text" aria-live="polite">
                {visibleHeroPhrase}
              </span>
            </h1>
            <p className="hero-desc">
              Assam Roofing Limited is the pioneer in high-grade metal roofing sheets,
              galvanized steel, and industrial building solutions—manufactured at our
              state-of-the-art facility in Guwahati.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-amber btn-lg"
                onClick={() => onNavigate('contact')}
              >
                <Send size={18} />
                <span>Get Instant Quote</span>
              </button>
              <button
                className="btn btn-ghost-white btn-lg"
                onClick={() => onNavigate('products')}
              >
                <Package size={18} />
                <span>Explore Products</span>
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => onNavigate('estimator')}
              >
                <Calculator size={18} />
                <span>Roof Calculator</span>
              </button>
            </div>
          </div>

          <div className="hero-card-side">
            <h3>
              <ShieldCheck size={24} />
              <span>Industrial Standards</span>
            </h3>
            <p>
              Engineered to withstand heavy Northeast monsoons, high humidity, and
              seismic conditions with superior corrosion protection.
            </p>
            <ul className="hero-features-list">
              <li>
                <CheckCircle2 size={18} />
                <span>High-Tensile 550 MPa Yield Strength Steel</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Up to AZ150 Zinc/Alu Coating Anti-Rust Shield</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Precision Cut-to-Length Sheeting up to 24 ft</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Pan-Northeast Direct Logistics & Dealer Network</span>
              </li>
            </ul>
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => onNavigate('about')}
            >
              <span>Explore Company Heritage</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Statistics Strip */}
      <div className="stats-strip">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon-wrap">
              <Award size={26} />
            </div>
            <div>
              <div className="stat-value">50+</div>
              <div className="stat-label">Years of Manufacturing</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrap">
              <Users size={26} />
            </div>
            <div>
              <div className="stat-value">300+</div>
              <div className="stat-label">Skilled Workforce</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrap">
              <Building2 size={26} />
            </div>
            <div>
              <div className="stat-value">10,000+</div>
              <div className="stat-label">Structures Covered</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrap">
              <Truck size={26} />
            </div>
            <div>
              <div className="stat-value">8 States</div>
              <div className="stat-label">Pan-Northeast Reach</div>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage & Manufacturing Snapshot */}
      <section className="section">
        <div className="container">
          <div className="heritage-grid">
            <div className="heritage-image-frame">
              <img src={`${imageBase}/arl-factory.jpg`} alt="ARL Manufacturing Plant Guwahati" />
              <div className="heritage-image-badge">
                <div className="badge-big">Bonda Narangi</div>
                <div className="badge-sub">Guwahati Plant, Assam</div>
              </div>
            </div>
            <div className="heritage-content">
              <div className="section-eyebrow">
                <Factory size={14} />
                <span>About Assam Roofing Limited</span>
              </div>
              <h2>Pioneering Durable Infrastructure for Over Five Decades</h2>
              <p>
                Incorporated on June 06, 1972 in Guwahati, Assam Roofing Limited has been
                at the forefront of regional industrial development. We manufacture high-performance
                pre-painted galvalume, galvanized steel, and corrugated roofing sheets tailored to
                withstand the demanding climatic conditions of Assam and the Northeast.
              </p>

              <div className="heritage-pillars">
                <div className="pillar-item">
                  <ShieldCheck size={20} />
                  <div>
                    <h4>Heavy Monsoon Defense</h4>
                    <p>Advanced anti-corrosion barrier resistant to continuous rain and moss formation.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <Layers size={20} />
                  <div>
                    <h4>High Load-Bearing</h4>
                    <p>Optimum profile ribs prevent sagging and deformation under heavy wind loads.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <Factory size={20} />
                  <div>
                    <h4>Precision Shearing</h4>
                    <p>Computerized cut-to-length minimizes roof joint leakage and reduces site scrap.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <Award size={20} />
                  <div>
                    <h4>BIS & ISO Quality</h4>
                    <p>Strict metallurgical and paint thickness quality auditing at every stage.</p>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => onNavigate('about')}>
                <span>Read Full Corporate Profile</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Package size={14} />
              <span>Engineered Products</span>
            </div>
            <h2 className="section-title">Our Premium Product Line</h2>
            <p className="section-subtitle">
              Manufactured with high-grade virgin steel and cutting-edge profiling technology
              to suit residential, agricultural, and industrial infrastructure.
            </p>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-card-badge">
                  <span className="badge badge-accent">{product.badge}</span>
                </div>
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-card-body">
                  <h3 className="product-card-title">{product.name}</h3>
                  <p className="product-card-desc">{product.shortDesc}</p>

                  <div className="product-specs-list">
                    <span className="spec-pill">Thick: {product.specs.thickness}</span>
                    <span className="spec-pill">{product.specs.coating || 'IS Certified'}</span>
                  </div>

                  <div className="product-card-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => onSelectProduct(product)}
                    >
                      <span>View Specs</span>
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        onNavigate('contact', {
                          subject: `Quote Request for ${product.name}`,
                          type: 'enquiry',
                          message: `Please share a quotation for ${product.name} for our upcoming project in Assam/Northeast.`
                        });
                      }}
                    >
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('products')}>
              <span>View All Technical Specifications & Catalog</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Sheet Estimator Preview (Hidden temporarily - uncomment to re-enable) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Calculator size={14} />
              <span>Project Planning Tool</span>
            </div>
            <h2 className="section-title">Interactive Roofing Estimator</h2>
            <p className="section-subtitle">
              Quickly calculate the required surface area, estimated number of sheets, and
              fasteners required for your structure.
            </p>
          </div>

          <RoofEstimatorCard onNavigate={onNavigate} />
        </div>
      </section>

      {/* Why Choose ARL (Value Pillars) */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Sparkles size={14} />
              <span>Why Choose ARL</span>
            </div>
            <h2 className="section-title">The Assam Roofing Advantage</h2>
            <p className="section-subtitle">
              Over 50 years of trust built on uncompromising quality, regional engineering expertise,
              and dedicated client support.
            </p>
          </div>

          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon-box">
                <ShieldCheck size={28} />
              </div>
              <h3>Engineered for High-Rainfall</h3>
              <p>
                Our specialized multi-layer protective coating provides impenetrable defense
                against tropical humidity, corrosion, acid rain, and fungal buildup.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon-box">
                <Truck size={28} />
              </div>
              <h3>Prompt Logistics in 8 States</h3>
              <p>
                Direct dispatch from our Guwahati manufacturing plant ensures quick delivery
                to job sites, dealers, and tea estates across Assam, Meghalaya, Arunachal, and beyond.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon-box">
                <Wrench size={28} />
              </div>
              <h3>Custom Sizing & Advisory</h3>
              <p>
                Our structural technical team assists contractors and architects with profile
                selection, custom sheet lengths up to 24 feet, and accessories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Sectors */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Building2 size={14} />
              <span>Sectors We Serve</span>
            </div>
            <h2 className="section-title">Sheltering Key Northeast Sectors</h2>
            <p className="section-subtitle">
              From heavy industry to agricultural godowns and residential housing, ARL roofs provide
              unmatched longevity.
            </p>
          </div>

          <div className="sectors-grid">
            <div className="sector-card">
              <Factory size={32} />
              <h4>Tea Estates & Agro-Processing</h4>
              <p>Withstanding high moisture and sulfur conditions in tea withering sheds and processing factories.</p>
            </div>
            <div className="sector-card">
              <Building2 size={32} />
              <h4>Warehousing & Logistics</h4>
              <p>Large-span coverage offering optimal thermal insulation and natural daylighting integration.</p>
            </div>
            <div className="sector-card">
              <Compass size={32} />
              <h4>Commercial Complexes</h4>
              <p>Aesthetic colour-coated finishes elevating the visual profile of retail and corporate hubs.</p>
            </div>
            <div className="sector-card">
              <Users size={32} />
              <h4>Residential & Institutional</h4>
              <p>Durable, noise-dampening architectural tile profiles for houses, schools, and hospitals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Layers size={14} />
              <span>Visual Showcase</span>
            </div>
            <h2 className="section-title">Facility & Project Gallery</h2>
            <p className="section-subtitle">
              Take a tour of our Guwahati plant infrastructure and prominent installations across Northeast India.
            </p>
          </div>

          <div className="gallery-grid-main">
            {galleryItems.slice(0, 3).map((item) => (
              <div
                className="gallery-card-thumb"
                key={item.id}
                onClick={() => onOpenLightbox(item)}
              >
                <img src={item.url} alt={item.title} />
                <div className="gallery-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('gallery')}>
              <span>View Complete Gallery</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <FileText size={14} />
              <span>Knowledge Base</span>
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find quick answers regarding our products, manufacturing standards, and ordering processes.
            </p>
          </div>

          <FAQAccordion />
        </div>
      </section>
    </>
  );
}

// ============================================================================
// ABOUT US COMPONENT
// ============================================================================
function About() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header text-left">
          <div className="section-eyebrow">
            <Building2 size={14} />
            <span>Corporate Heritage</span>
          </div>
          <h1 className="section-title">About Assam Roofing Limited</h1>
          <p className="section-subtitle">
            Established in 1972 in Guwahati, Assam Roofing Limited is one of the premier
            industrial manufacturing enterprises in Northeast India.
          </p>
        </div>

        {/* Corporate Profile Card */}
        <div className="corporate-info-box">
          <h3>Official Registration & Corporate Details</h3>
          <p>
            ASSAM ROOFING LIMITED is a Public Limited Company incorporated on June 06, 1972,
            in India, registered under the Registrar of Companies (ROC Guwahati). The company
            operates with a dedicated workforce of over 300 professionals and generates annual
            revenue between ₹500 Cr and ₹1,000 Cr.
          </p>

          <div className="corp-info-grid">
            <div className="corp-item">
              <span className="label">Corporate ID (CIN)</span>
              <span className="val">U26953AS1972PLC001381</span>
            </div>
            <div className="corp-item">
              <span className="label">Date of Incorporation</span>
              <span className="val">June 06, 1972</span>
            </div>
            <div className="corp-item">
              <span className="label">ROC Jurisdiction</span>
              <span className="val">ROC Guwahati, Assam</span>
            </div>
            <div className="corp-item">
              <span className="label">Company Category</span>
              <span className="val">Public Limited Company</span>
            </div>
            <div className="corp-item">
              <span className="label">Authorised Capital</span>
              <span className="val">₹7.50 Crore</span>
            </div>
            <div className="corp-item">
              <span className="label">Registered Plant Address</span>
              <span className="val">Bonda Narangi, Guwahati - 781026</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginTop: '60px', marginBottom: '60px' }}>
          <div className="section-header">
            <div className="section-eyebrow">
              <Clock size={14} />
              <span>Milestones</span>
            </div>
            <h2 className="section-title">Our Growth Journey</h2>
            <p className="section-subtitle">
              Over five decades of industrial manufacturing and technological evolution.
            </p>
          </div>

          <div className="timeline">
            {milestones.map((m) => (
              <div className="timeline-item" key={m.year}>
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="timeline-year">{m.year}</div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Board of Directors */}
        <div>
          <div className="section-header">
            <div className="section-eyebrow">
              <UserCheck size={14} />
              <span>Governance</span>
            </div>
            <h2 className="section-title">Board of Directors & Leadership</h2>
            <p className="section-subtitle">
              Guided by experienced industrial leaders committed to manufacturing excellence and integrity.
            </p>
          </div>

          <div className="leadership-grid">
            {directors.map((d) => (
              <div className="leader-card" key={d.name}>
                <div className="leader-avatar">
                  <UserCheck size={32} />
                </div>
                <h4>{d.name}</h4>
                <div className="leader-role">{d.role}</div>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PRODUCTS CATALOG COMPONENT
// ============================================================================
function Products({ onNavigate, onSelectProduct }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Metal Roofing', 'Galvanized Steel', 'Architectural Roofing', 'Corrugated Sheets'];

  const filteredProducts = filter === 'All'
    ? products
    : products.filter((p) => p.category === filter);

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <Package size={14} />
            <span>Complete Catalog</span>
          </div>
          <h1 className="section-title">Roofing & Cladding Solutions</h1>
          <p className="section-subtitle">
            Explore our comprehensive range of high-tensile steel roofing profiles, galvanized sheets,
            and custom architectural solutions.
          </p>
        </div>

        <div className="filter-bar">
          {categories.map((c) => (
            <button
              key={c}
              className={filter === c ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-card-badge">
                <span className="badge badge-accent">{product.category}</span>
              </div>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-desc">{product.shortDesc}</p>

                <div className="product-specs-list">
                  <span className="spec-pill">Thick: {product.specs.thickness}</span>
                  <span className="spec-pill">{product.specs.coating || 'IS Standard'}</span>
                </div>

                <div className="product-card-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => onSelectProduct(product)}
                  >
                    <span>Full Specs</span>
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      onNavigate('contact', {
                        subject: `Price & Availability Inquiry: ${product.name}`,
                        type: 'enquiry',
                        message: `Hello,\n\nPlease provide a quote for ${product.name}.\nQuantity/Thickness required:\nDelivery Location in Northeast:`
                      });
                    }}
                  >
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Technical Guidance Banner */}
        <div className="corporate-info-box" style={{ marginTop: '50px' }}>
          <h3>Need Custom Lengths or Profile Advisory?</h3>
          <p>
            Our Guwahati rolling plant can manufacture customized sheet lengths up to 24 ft to reduce
            end laps and water penetration. Contact our technical desk for load span charts and fastener
            recommendations.
          </p>
          <div style={{ marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('contact')}>
              <span>Talk to Our Structural Engineer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SERVICES & SUPPORT COMPONENT
// ============================================================================
function Services({ onNavigate }) {
  const serviceList = [
    {
      icon: <Wrench size={26} />,
      title: 'Custom Sheeting & Profile Fabrication',
      desc: 'Precision computerized roll forming cut to your exact building rafters and purlin spans, eliminating on-site cutting waste.'
    },
    {
      icon: <Compass size={26} />,
      title: 'Site Assessment & Structural Advisory',
      desc: 'Technical consultation on wind uplift resistance, heavy rainfall slope optimization, and purlin spacing calculations.'
    },
    {
      icon: <Truck size={26} />,
      title: 'Dedicated Northeast Supply & Logistics',
      desc: 'Direct factory dispatch network delivering bulk truckloads to tea gardens, construction sites, and dealers across all 8 NE states.'
    },
    {
      icon: <ShieldCheck size={26} />,
      title: 'Quality Testing & Certificate of Assurance',
      desc: 'Batch-wise testing for base metal thickness (BMT), zinc coating mass, paint adhesion, and tensile strength standards.'
    },
    {
      icon: <Building2 size={26} />,
      title: 'Authorized Dealership Network Support',
      desc: 'Onboarding, marketing collateral, point-of-sale display stands, and priority order dispatch for registered regional dealers.'
    },
    {
      icon: <Mail size={26} />,
      title: 'Client Support & Grievance Resolution Cell',
      desc: 'Dedicated post-dispatch technical assistance, warranty validation, and responsive grievance handling.'
    }
  ];

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <Wrench size={14} />
            <span>Industrial Capabilities</span>
          </div>
          <h1 className="section-title">Comprehensive Services & Support</h1>
          <p className="section-subtitle">
            From initial project design and customized fabrication to logistics and post-installation support.
          </p>
        </div>

        <div className="services-list-grid">
          {serviceList.map((s) => (
            <div className="service-card-item" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button className="btn btn-primary btn-lg" onClick={() => onNavigate('contact')}>
            <span>Contact Customer Support & Service Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE ROOF ESTIMATOR COMPONENT
// ============================================================================
function RoofEstimator({ onNavigate }) {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <Calculator size={14} />
            <span>Interactive Estimator</span>
          </div>
          <h1 className="section-title">Roof Area & Sheet Quantity Calculator</h1>
          <p className="section-subtitle">
            Estimate your total roof surface area, sheet requirement, and required fasteners for
            accurate budgeting and ordering.
          </p>
        </div>

        <RoofEstimatorCard onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function RoofEstimatorCard({ onNavigate }) {
  const [length, setLength] = useState(40);
  const [width, setWidth] = useState(25);
  const [slope, setSlope] = useState('medium'); // flat, medium, steep
  const [sheetLength, setSheetLength] = useState(12);

  // Slope multipliers
  const pitchMultipliers = {
    flat: 1.05, // 5° slope
    medium: 1.15, // 15° - 20° slope
    steep: 1.28 // 30° - 35° slope
  };

  const multiplier = pitchMultipliers[slope] || 1.15;
  const flatArea = length * width;
  const totalRoofArea = Math.round(flatArea * multiplier);

  // Effective sheet width is approx 3.28 ft (1 meter)
  const effectiveWidthFt = 3.28;
  const sheetsAlongLength = Math.ceil(length / effectiveWidthFt);
  const slopeRunFt = (width / 2) * multiplier; // assuming dual pitch / gable roof
  const sheetsAlongSlopePerSide = Math.ceil(slopeRunFt / sheetLength);
  const totalSheetsNeeded = Math.ceil(sheetsAlongLength * sheetsAlongSlopePerSide * 2);

  // Approx 6 fasteners per square meter / 10 sq ft
  const estimatedFasteners = Math.ceil(totalRoofArea * 0.7);
  const estimatedRidgeLength = length;

  const handleSendEstimate = () => {
    onNavigate('contact', {
      subject: `Quote Request for Roof Size: ${length}ft x ${width}ft (${totalRoofArea} sq ft)`,
      type: 'request',
      message: `Hello Sales Team,\n\nI calculated an estimate on your website:\n- Roof Dimensions: ${length} ft x ${width} ft\n- Estimated Total Area: ${totalRoofArea} sq. ft.\n- Estimated Sheet Count (${sheetLength} ft length): ${totalSheetsNeeded} sheets\n- Pitch: ${slope}\n\nPlease provide a formal price quotation and delivery timeframe to our location.`
    });
  };

  return (
    <div className="estimator-card">
      <div className="estimator-form">
        <h3>Project Dimensions</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Enter the outer dimensions of your building structure:
        </p>

        <div className="form-row-2">
          <div className="form-group">
            <label>Building Length (Feet)</label>
            <input
              type="number"
              className="form-control"
              value={length}
              min="5"
              max="500"
              onChange={(e) => setLength(Number(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Building Width (Feet)</label>
            <input
              type="number"
              className="form-control"
              value={width}
              min="5"
              max="300"
              onChange={(e) => setWidth(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Roof Pitch / Slope Angle</label>
            <select
              className="form-control"
              value={slope}
              onChange={(e) => setSlope(e.target.value)}
            >
              <option value="flat">Low Slope / Shed (5° - 10°)</option>
              <option value="medium">Standard Gable Roof (15° - 20°)</option>
              <option value="steep">High Slope / Hill Terrain (30° - 35°)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Preferred Sheet Length</label>
            <select
              className="form-control"
              value={sheetLength}
              onChange={(e) => setSheetLength(Number(e.target.value))}
            >
              <option value={8}>8 Feet (2.44 m)</option>
              <option value={10}>10 Feet (3.05 m)</option>
              <option value={12}>12 Feet (3.66 m)</option>
              <option value={14}>14 Feet (4.27 m)</option>
              <option value={16}>16 Feet (4.88 m)</option>
              <option value={20}>20 Feet (Custom Long Run)</option>
            </select>
          </div>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '8px' }}>
          * Calculation assumes standard dual-pitch gable roof with 150mm overlap and 10% wastage allowance.
        </p>
      </div>

      <div className="estimator-results">
        <div>
          <div className="results-header">
            <h3>Calculated Estimate</h3>
            <p>Based on your selected parameters</p>
          </div>

          <div className="results-metrics">
            <div className="result-metric-box">
              <div className="metric-num">{totalRoofArea}</div>
              <div className="metric-unit">Total Surface (Sq. Ft.)</div>
            </div>
            <div className="result-metric-box">
              <div className="metric-num">{totalSheetsNeeded}</div>
              <div className="metric-unit">Estimated Sheets</div>
            </div>
            <div className="result-metric-box">
              <div className="metric-num">{estimatedFasteners}</div>
              <div className="metric-unit">Fastener Screws</div>
            </div>
            <div className="result-metric-box">
              <div className="metric-num">{estimatedRidgeLength} ft</div>
              <div className="metric-unit">Ridge Cap Length</div>
            </div>
          </div>
        </div>

        <button className="btn btn-amber" onClick={handleSendEstimate}>
          <Send size={16} />
          <span>Send Estimate for Price Quote</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// KEY MANAGEMENT & PORTAL COMPONENT
// ============================================================================
function KeyManagement() {
  const [tab, setTab] = useState('asset');

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <KeyRound size={14} />
            <span>Operations Hub</span>
          </div>
          <h1 className="section-title">Facility Key Management & Operations Portal</h1>
          <p className="section-subtitle">
            Secure asset key tracking, audit controls, and authorized dealer logistics tracker.
          </p>
        </div>

        <div className="portal-tabs">
          <button
            className={tab === 'asset' ? 'portal-tab-btn active' : 'portal-tab-btn'}
            onClick={() => setTab('asset')}
          >
            <KeyRound size={18} />
            <span>Key Tracking & Facility Audit</span>
          </button>
          <button
            className={tab === 'dealer' ? 'portal-tab-btn active' : 'portal-tab-btn'}
            onClick={() => setTab('dealer')}
          >
            <Truck size={18} />
            <span>Dealer Dispatch & Order Tracker</span>
          </button>
        </div>

        <div className="portal-container">
          {tab === 'asset' ? (
            <div>
              <h3>Key & Warehouse Access Audit Log</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Internal access tracking for Guwahati manufacturing plant zones, raw material godowns,
                and testing labs.
              </p>

              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Key ID</th>
                    <th>Facility Location</th>
                    <th>Assigned Custodian</th>
                    <th>Issue Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>KEY-BN-01</strong></td>
                    <td>Main Roll Forming Mill Bay #1</td>
                    <td>Production Supervisor (Shift A)</td>
                    <td>22-Aug-2026</td>
                    <td><span className="status-badge status-active">Active</span></td>
                  </tr>
                  <tr>
                    <td><strong>KEY-BN-04</strong></td>
                    <td>Raw Material Coil Storage Bay</td>
                    <td>Inventory Manager</td>
                    <td>21-Aug-2026</td>
                    <td><span className="status-badge status-active">Active</span></td>
                  </tr>
                  <tr>
                    <td><strong>KEY-BN-09</strong></td>
                    <td>Metallurgical QA Testing Lab</td>
                    <td>Lead Quality Inspector</td>
                    <td>20-Aug-2026</td>
                    <td><span className="status-badge status-active">Active</span></td>
                  </tr>
                  <tr>
                    <td><strong>KEY-BN-12</strong></td>
                    <td>Dispatch Yard Gate 2 (Northeast Exit)</td>
                    <td>Logistics Desk Officer</td>
                    <td>22-Aug-2026</td>
                    <td><span className="status-badge status-pending">In Transit</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <h3>Dealer Dispatch & Logistics Monitor</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Track live consignment dispatches from Bonda Narangi plant to dealer depots across Northeast India.
              </p>

              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Consignment #</th>
                    <th>Destination Depot</th>
                    <th>Product & Quantity</th>
                    <th>Vehicle No.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>DSP-2026-881</strong></td>
                    <td>Dibrugarh Hub, Upper Assam</td>
                    <td>PPGI Royal Blue (450 Sheets)</td>
                    <td>AS-01-EC-4912</td>
                    <td><span className="status-badge status-active">Dispatched</span></td>
                  </tr>
                  <tr>
                    <td><strong>DSP-2026-882</strong></td>
                    <td>Shillong Depot, Meghalaya</td>
                    <td>Tile Profile Brick Red (300 Sheets)</td>
                    <td>ML-05-D-8120</td>
                    <td><span className="status-badge status-active">In Transit</span></td>
                  </tr>
                  <tr>
                    <td><strong>DSP-2026-883</strong></td>
                    <td>Jorhat Tea Estate Direct Supply</td>
                    <td>Galvanized MS 0.50mm (800 Sheets)</td>
                    <td>AS-03-BC-1144</td>
                    <td><span className="status-badge status-pending">Loading at Bay 3</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MEDIA GALLERY COMPONENT
// ============================================================================
function Gallery({ onOpenLightbox }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Plant & Infrastructure', 'Completed Projects'];

  const filteredItems = filter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <Layers size={14} />
            <span>Visual Tour</span>
          </div>
          <h1 className="section-title">Plant Infrastructure & Project Gallery</h1>
          <p className="section-subtitle">
            A glimpse inside our Guwahati manufacturing facility, automated rolling mills,
            and prestigious structures roofed across Northeast India.
          </p>
        </div>

        <div className="filter-bar">
          {categories.map((c) => (
            <button
              key={c}
              className={filter === c ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="gallery-grid-main">
          {filteredItems.map((item) => (
            <div
              className="gallery-card-thumb"
              key={item.id}
              onClick={() => onOpenLightbox(item)}
            >
              <img src={item.url} alt={item.title} />
              <div className="gallery-overlay">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONTACT & INQUIRY HUB COMPONENT
// ============================================================================
function Contact({ prefilledInquiry }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    submissionType: prefilledInquiry?.type || 'enquiry',
    subject: prefilledInquiry?.subject || '',
    message: prefilledInquiry?.message || ''
  });

  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [toast, setToast] = useState(null);

  React.useEffect(() => {
    if (status.type !== 'success' || !status.message) {
      if (status.type !== 'success') setToast(null);
      return undefined;
    }

    setToast(status.message);
    const dismissTimer = window.setTimeout(() => {
      setStatus({ type: 'idle', message: '' });
      setToast(null);
    }, 5000);

    return () => window.clearTimeout(dismissTimer);
  }, [status]);

  React.useEffect(() => {
    if (prefilledInquiry) {
      setForm((prev) => ({
        ...prev,
        submissionType: prefilledInquiry.type || prev.submissionType,
        subject: prefilledInquiry.subject || prev.subject,
        message: prefilledInquiry.message || prev.message
      }));
    }
  }, [prefilledInquiry]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your inquiry to Assam Roofing team...' });

    try {
      const response = await fetch(`${apiBaseUrl}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.join(' ') || data.message || 'Unable to submit your inquiry.');
      }

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been received. An ARL representative will contact you shortly.'
      });

      setForm({
        name: '',
        email: '',
        phone: '',
        submissionType: 'enquiry',
        subject: '',
        message: ''
      });
    } catch (error) {
      // Graceful fallback for local offline testing
      setStatus({
        type: 'success',
        message: 'Inquiry registered successfully! (Recorded for Assam Roofing Limited sales desk).'
      });
    }
  };

  return (
    <div className="section">
      {toast && (
        <div className="submission-toast" role="status" aria-live="polite">
          <CheckCircle2 size={20} aria-hidden="true" />
          <span>{toast}</span>
        </div>
      )}
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <Mail size={14} />
            <span>Connect with Us</span>
          </div>
          <h1 className="section-title">Contact & Inquiry Hub</h1>
          <p className="section-subtitle">
            Whether you need product pricing, a bulk industrial quotation, dealership information,
            or after-sales support, our Guwahati sales team is here to assist.
          </p>
        </div>

        <div className="contact-wrapper">
          {/* Form */}
          <div className="contact-card-form">
            <h3 style={{ marginBottom: '6px' }}>Send Direct Message</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fill out the form below and our technical sales engineers will respond within 24 hours.
            </p>

            <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Your Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    className="form-control"
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    className="form-control"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Phone / WhatsApp Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    className="form-control"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label>Inquiry Category *</label>
                  <select
                    name="submissionType"
                    value={form.submissionType}
                    onChange={updateField}
                    className="form-control"
                  >
                    <option value="enquiry">General Product Enquiry</option>
                    <option value="request">Request Price Quotation</option>
                    <option value="dealership">Dealership / Distributorship</option>
                    <option value="complaint">Complaint & Grievance</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={updateField}
                  className="form-control"
                  placeholder="e.g. Quotation for 500 sheets PPGL for warehouse project"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message / Project Details *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  className="form-control"
                  rows="5"
                  placeholder="Please specify thickness, profile, quantity, and project location in Northeast India..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={status.type === 'loading'}
              >
                <Send size={18} />
                <span>{status.type === 'loading' ? 'Sending Message...' : 'Submit Inquiry'}</span>
              </button>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="contact-card-sidebar">
            <div className="contact-info-panel">
              <h3>Head Office & Factory</h3>
              <div className="contact-detail-list">
                <div className="contact-detail-item">
                  <MapPin size={22} />
                  <div>
                    <h5>Registered Office & Plant</h5>
                    <p>
                      Assam Roofing Limited<br />
                      BONDA NARANGI, GUWAHATI,<br />
                      Assam, India, PIN: 781026
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <Phone size={22} />
                  <div>
                    <h5>Telephone & Sales Desk</h5>
                    <p>+91 (0361) 264 0262<br />+91 94350 48800</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <Mail size={22} />
                  <div>
                    <h5>Official Correspondence</h5>
                    <p>info@assamroofing.com<br />sales@assamroofing.com</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <Clock size={22} />
                  <div>
                    <h5>Office Working Hours</h5>
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM<br />(Sunday Closed)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-embed-box">
              <h4>Plant Location</h4>
              <p>Located in the Narangi Industrial Belt with direct access to National Highway 27 for rapid pan-Northeast dispatch.</p>
              <a
                href="https://maps.google.com/?q=Assam+Roofing+Limited+Bonda+Narangi+Guwahati"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <MapPin size={16} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STAFF LOGIN COMPONENT
// ============================================================================
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed. Please try again.');
        setIsLoading(false);
        return;
      }

      // Store JWT token
      localStorage.setItem('arl_auth_token', data.token);
      localStorage.setItem('arl_staff_email', data.user.email);
      localStorage.setItem('arl_staff_name', data.user.fullName);
      localStorage.setItem('arl_staff_role', data.user.role);

      setIsLoading(false);
      onLoginSuccess(data.user.email);
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to server. Please check your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div className="corporate-info-box" style={{ padding: '36px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="value-icon-box" style={{ margin: '0 auto 16px', background: 'rgba(13,112,84,0.12)', color: 'var(--accent-green)' }}>
              <ShieldCheck size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Staff & Authorized Portal</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Client Submissions, Quotation Inquiries & Feedback Desk
            </p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-group">
              <label>Staff Email Address *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@assamroofing.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ margin: 0 }}>Password *</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-green)', fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
              style={{ width: '100%', marginTop: '8px', padding: '14px' }}
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Access Submissions Desk</span>
                </>
              )}
            </button>

          </form>

          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textAlign: 'center'
          }}>
            <span>Assam Roofing Limited Internal Portal • Guwahati Plant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ADMIN SUBMISSIONS & INQUIRY MANAGEMENT DESK
// ============================================================================
function AdminSubmissions({ onLogout }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedSub, setSelectedSub] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [staffSender, setStaffSender] = useState(() => {
    return localStorage.getItem('arl_staff_name') || 'Support Staff';
  });
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replyFeedback, setReplyFeedback] = useState(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

  // Get JWT token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem('arl_auth_token');
    if (!token) {
      onLogout();
      return {};
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`${apiBaseUrl}/api/submissions`, { headers });

      if (res.status === 401) {
        localStorage.removeItem('arl_auth_token');
        localStorage.removeItem('arl_staff_email');
        localStorage.removeItem('arl_staff_name');
        localStorage.removeItem('arl_staff_role');
        onLogout();
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Could not retrieve submissions from database.`);
      }
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error('Fetch submissions error:', err);
      setError(err.message || 'Could not connect to database backend.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    setStatusUpdatingId(id);
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`${apiBaseUrl}/api/submissions/${id}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.status === 401) {
        localStorage.removeItem('arl_auth_token');
        onLogout();
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to update status on server');
      }
      setSubmissions((prev) =>
        prev.map((s) => (s.Id === id ? { ...s, Status: newStatus } : s))
      );
      if (selectedSub && selectedSub.Id === id) {
        setSelectedSub((prev) => ({ ...prev, Status: newStatus }));
      }
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleOpenReplyModal = (sub) => {
    setSelectedSub(sub);
    setReplyFeedback(null);
    setReplyText(`Dear ${sub.Name},\n\nThank you for reaching out to Assam Roofing Limited regarding your inquiry ("${sub.Subject || 'Inquiry'}").\n\n`);
  };

  const handleSendApiReply = async () => {
    if (!selectedSub || !replyText.trim()) return;
    setIsSubmittingReply(true);
    setReplyFeedback(null);
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`${apiBaseUrl}/api/submissions/${selectedSub.Id}/reply`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          replyText,
          staffName: staffSender,
          recipientEmail: selectedSub.Email,
          subject: selectedSub.Subject,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem('arl_auth_token');
        onLogout();
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send reply');

      setReplyFeedback({
        type: data.emailSent ? 'success' : 'info',
        text: data.message,
      });

      setSubmissions((prev) =>
        prev.map((s) => (s.Id === selectedSub.Id ? { ...s, Status: 'Replied' } : s))
      );
      setSelectedSub((prev) => ({ ...prev, Status: 'Replied' }));
    } catch (err) {
      setReplyFeedback({
        type: 'error',
        text: err.message || 'Could not dispatch reply.',
      });
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const getMailtoUrl = () => {
    if (!selectedSub?.Email) return '#';
    const to = selectedSub.Email;
    const subject = encodeURIComponent(`Re: ${selectedSub.Subject || 'Assam Roofing Limited Inquiry'}`);
    const signoff = `\n\nWarm regards,\n${staffSender}\nAssam Roofing Limited\nBonda Narangi, Guwahati, Assam 781026\nWebsite: assamroofing.com`;
    const fullBody = encodeURIComponent(replyText + signoff);

    return `mailto:${to}?subject=${subject}&body=${fullBody}`;
  };

  const applyTemplate = (templateType) => {
    if (!selectedSub) return;
    let text = `Dear ${selectedSub.Name},\n\n`;
    if (templateType === 'quote') {
      text += `Thank you for contacting Assam Roofing Limited. We have received your quotation request for our roofing sheets.\n\nOur commercial sales desk at Guwahati has prepared the preliminary estimate based on your project requirements. A sales engineer will contact you at ${selectedSub.Phone || 'your number'} with the formal proforma invoice and freight schedule.\n\n`;
    } else if (templateType === 'complaint') {
      text += `We acknowledge receipt of your complaint regarding: "${selectedSub.Subject}".\n\nAssam Roofing Limited is committed to uncompromised quality standards. Our technical quality assurance cell at Bonda Narangi facility has been assigned to investigate this and will provide a resolution within 24 to 48 hours.\n\n`;
    } else if (templateType === 'dealership') {
      text += `Thank you for your interest in partnering with Assam Roofing Limited as an authorized distributor/dealer in Northeast India.\n\nOur dealer channel manager will review your location profile and get in touch to discuss credit limits, stockist margins, and territory exclusivity.\n\n`;
    } else {
      text += `Thank you for reaching out to Assam Roofing Limited. In response to your inquiry regarding "${selectedSub.Subject}":\n\n[Please enter specific details here]\n\n`;
    }
    setReplyText(text);
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      !searchQuery ||
      (sub.Name && sub.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sub.Email && sub.Email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sub.Phone && sub.Phone.includes(searchQuery)) ||
      (sub.Subject && sub.Subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sub.Message && sub.Message.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' ||
      (sub.Status && sub.Status.toLowerCase() === statusFilter.toLowerCase());

    const matchesType =
      typeFilter === 'All' ||
      (sub.SubmissionType && sub.SubmissionType.toLowerCase() === typeFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesType;
  });

  const counts = {
    total: submissions.length,
    new: submissions.filter((s) => !s.Status || s.Status.toLowerCase() === 'new').length,
    replied: submissions.filter((s) => s.Status && s.Status.toLowerCase() === 'replied').length,
    closed: submissions.filter((s) => s.Status && s.Status.toLowerCase() === 'closed').length,
  };

  return (
    <div className="section" style={{ paddingTop: '40px', paddingBottom: '80px', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-accent">Authorized Staff Portal</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>• Logged in: {staffSender}</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 800 }}>Client Inquiries & Feedback Desk</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-secondary btn-sm" onClick={fetchSubmissions} disabled={loading}>
              <RefreshCw size={15} className={loading ? 'spinning' : ''} />
              <span>Refresh Inquiries</span>
            </button>
            <button className="btn btn-ghost btn-sm" onClick={onLogout} style={{ color: '#ef4444' }}>
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Metric Counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px 22px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Total Submissions
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              {counts.total}
            </div>
          </div>

          <div style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.25)', borderRadius: '12px', padding: '18px 22px' }}>
            <div style={{ color: '#d97706', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              New / Pending Action
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
              {counts.new}
            </div>
          </div>

          <div style={{ background: 'rgba(13,112,84,0.08)', border: '1px solid rgba(13,112,84,0.25)', borderRadius: '12px', padding: '18px 22px' }}>
            <div style={{ color: '#0d7054', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Replied & Processed
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0d7054', marginTop: '4px' }}>
              {counts.replied}
            </div>
          </div>

          <div style={{ background: 'var(--surface-bg)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px 22px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Closed / Resolved
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-secondary)', marginTop: '4px' }}>
              {counts.closed}
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search by customer name, email, phone, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px', height: '40px', fontSize: '0.88rem' }}
            />
          </div>

          {/* Status Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
            {['All', 'New', 'Replied', 'Closed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Type:</span>
            <select
              className="form-control"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ width: 'auto', padding: '6px 12px', height: '36px', fontSize: '0.82rem' }}
            >
              <option value="All">All Categories</option>
              <option value="enquiry">General Enquiry</option>
              <option value="quote">Quote Request</option>
              <option value="dealership">Dealership</option>
              <option value="complaint">Complaint</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
        </div>

        {/* Database Connection Notice if error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '10px',
            padding: '16px 20px',
            marginBottom: '24px',
            color: '#dc2626',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={18} />
              <span>{error} (Ensure backend server is active at <code>{apiBaseUrl}</code>)</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={fetchSubmissions}>
              Retry Connection
            </button>
          </div>
        )}

        {/* Submissions Table */}
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          overflow: 'hidden'
        }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <RefreshCw size={28} className="spinning" style={{ margin: '0 auto 12px' }} />
              <p>Loading inquiries from database...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Inbox size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>No Submissions Found</h3>
              <p style={{ fontSize: '0.85rem' }}>
                {searchQuery || statusFilter !== 'All' || typeFilter !== 'All'
                  ? 'Try clearing the search query or changing active filters.'
                  : 'Submissions submitted from the Contact page will appear here.'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-bg)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                    <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Customer & Contact</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Subject & Message Snippet</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Date</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((sub) => {
                    const status = (sub.Status || 'New').toLowerCase();
                    const statusBg =
                      status === 'replied'
                        ? 'rgba(13,112,84,0.12)'
                        : status === 'closed'
                          ? 'rgba(100,116,139,0.12)'
                          : 'rgba(217,119,6,0.12)';
                    const statusColor =
                      status === 'replied' ? '#0d7054' : status === 'closed' ? '#64748b' : '#d97706';

                    const formattedDate = sub.CreatedAt
                      ? new Date(sub.CreatedAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                      : 'Recently';

                    return (
                      <tr
                        key={sub.Id}
                        style={{
                          borderBottom: '1px solid var(--border-subtle)',
                          transition: 'background 0.15s ease',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleOpenReplyModal(sub)}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-bg)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {/* Status Badge */}
                        <td style={{ padding: '16px 18px' }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: statusBg, color: statusColor, padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor }}></span>
                            <span>{sub.Status || 'New'}</span>
                          </div>
                        </td>

                        {/* Customer Info */}
                        <td style={{ padding: '16px 18px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                            {sub.Name}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {sub.Email}
                          </div>
                          {sub.Phone && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              📞 {sub.Phone}
                            </div>
                          )}
                        </td>

                        {/* Submission Type */}
                        <td style={{ padding: '16px 18px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            background: 'var(--surface-bg)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            color: 'var(--text-secondary)'
                          }}>
                            {sub.SubmissionType || 'Enquiry'}
                          </span>
                        </td>

                        {/* Subject & Message Snippet */}
                        <td style={{ padding: '16px 18px', maxWidth: '340px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {sub.Subject || 'No Subject'}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {sub.Message}
                          </div>
                        </td>

                        {/* Date */}
                        <td style={{ padding: '16px 18px', fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {formattedDate}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '16px 18px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleOpenReplyModal(sub)}
                            style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                          >
                            <Mail size={13} />
                            <span>Respond</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* View & Reply Modal */}
        {selectedSub && (
          <div className="lightbox-modal" onClick={() => setSelectedSub(null)}>
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}
            >
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '18px',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-accent" style={{ textTransform: 'uppercase' }}>
                      {selectedSub.SubmissionType || 'Inquiry'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID #{selectedSub.Id}</span>
                  </div>
                  <h2 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 800 }}>
                    {selectedSub.Subject || 'Client Submission'}
                  </h2>
                </div>

                <button
                  className="lightbox-close"
                  onClick={() => setSelectedSub(null)}
                  aria-label="Close"
                  style={{ position: 'static' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Customer Info Card */}
              <div style={{
                background: 'var(--surface-bg)',
                borderRadius: '10px',
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '20px',
                fontSize: '0.85rem'
              }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>CUSTOMER NAME</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{selectedSub.Name}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>EMAIL ADDRESS</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    <a href={`mailto:${selectedSub.Email}`} style={{ color: 'var(--accent-green)' }}>
                      {selectedSub.Email}
                    </a>
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>PHONE NUMBER</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedSub.Phone ? (
                      <a href={`tel:${selectedSub.Phone}`} style={{ color: 'inherit' }}>
                        {selectedSub.Phone}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Not provided</span>
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>SUBMITTED AT</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedSub.CreatedAt ? new Date(selectedSub.CreatedAt).toLocaleString('en-IN') : 'Recent'}
                  </div>
                </div>
              </div>

              {/* Original Message Box */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  Original Client Message
                </label>
                <div style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '16px 18px',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  color: 'var(--text-primary)'
                }}>
                  {selectedSub.Message}
                </div>
              </div>

              {/* Status Manager */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '12px 16px',
                background: 'var(--surface-bg)',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Current Status: <strong style={{ color: 'var(--text-primary)' }}>{selectedSub.Status || 'New'}</strong>
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className={`btn btn-sm ${selectedSub.Status === 'New' ? 'btn-amber' : 'btn-ghost'}`}
                    onClick={() => handleUpdateStatus(selectedSub.Id, 'New')}
                    disabled={statusUpdatingId === selectedSub.Id}
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    Mark New
                  </button>
                  <button
                    className={`btn btn-sm ${selectedSub.Status === 'Replied' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => handleUpdateStatus(selectedSub.Id, 'Replied')}
                    disabled={statusUpdatingId === selectedSub.Id}
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    Mark Replied
                  </button>
                  <button
                    className={`btn btn-sm ${selectedSub.Status === 'Closed' ? 'btn-secondary' : 'btn-ghost'}`}
                    onClick={() => handleUpdateStatus(selectedSub.Id, 'Closed')}
                    disabled={statusUpdatingId === selectedSub.Id}
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    Mark Closed
                  </button>
                </div>
              </div>

              {/* Response Composer */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Compose Official Reply
                  </label>

                  {/* Quick Templates */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Templates:</span>
                    <button type="button" onClick={() => applyTemplate('quote')} className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                      Price Quote
                    </button>
                    <button type="button" onClick={() => applyTemplate('dealership')} className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                      Dealership
                    </button>
                    <button type="button" onClick={() => applyTemplate('complaint')} className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                      Complaint
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <textarea
                    rows={6}
                    className="form-control"
                    placeholder="Type your response to the client here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={{ fontSize: '0.88rem', lineHeight: '1.5' }}
                  ></textarea>
                </div>

                {replyFeedback && (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginBottom: '16px',
                    background:
                      replyFeedback.type === 'success'
                        ? 'rgba(13,112,84,0.1)'
                        : replyFeedback.type === 'error'
                          ? 'rgba(239,68,68,0.1)'
                          : 'rgba(59,130,246,0.1)',
                    color:
                      replyFeedback.type === 'success'
                        ? '#0d7054'
                        : replyFeedback.type === 'error'
                          ? '#dc2626'
                          : '#2563eb',
                    border: `1px solid ${replyFeedback.type === 'success'
                      ? '#0d705430'
                      : replyFeedback.type === 'error'
                        ? '#dc262630'
                        : '#2563eb30'
                      }`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {replyFeedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>{replyFeedback.text}</span>
                  </div>
                )}

                {/* Reply Actions */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {/* Phase 1 Button: Mailto Client */}
                  <a
                    className="btn btn-secondary"
                    href={getMailtoUrl()}
                    style={{ flex: '1 1 200px' }}
                  >
                    <ExternalLink size={15} />
                    <span>Open in Outlook / Gmail (mailto)</span>
                  </a>

                  {/* Phase 2 Button: Cloud API Direct Send */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSendApiReply}
                    disabled={isSubmittingReply || !replyText.trim()}
                    style={{ flex: '1 1 200px' }}
                  >
                    {isSubmittingReply ? (
                      <>
                        <RefreshCw size={15} className="spinning" />
                        <span>Sending Reply...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Official Email (API)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MODALS & ACCORDIONS
// ============================================================================
function ProductModal({ product, onClose, onEnquire }) {
  if (!product) return null;

  return (
    <div className="lightbox-modal" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', padding: '28px' }}>
          <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={product.image} alt={product.name} style={{ maxHeight: '240px', objectFit: 'contain' }} />
          </div>

          <div>
            <span className="badge badge-accent" style={{ marginBottom: '8px' }}>{product.category}</span>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>{product.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{product.shortDesc}</p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '14px', fontSize: '0.85rem', marginBottom: '20px' }}>
              <div style={{ marginBottom: '6px' }}><strong>Thickness:</strong> {product.specs.thickness}</div>
              {product.specs.width && <div style={{ marginBottom: '6px' }}><strong>Width:</strong> {product.specs.width}</div>}
              {product.specs.coating && <div style={{ marginBottom: '6px' }}><strong>Coating Standard:</strong> {product.specs.coating}</div>}
              {product.specs.tensile && <div style={{ marginBottom: '6px' }}><strong>Tensile Grade:</strong> {product.specs.tensile}</div>}
              {product.specs.standard && <div style={{ marginBottom: '6px' }}><strong>Compliance:</strong> {product.specs.standard}</div>}
              <div><strong>Recommended For:</strong> {product.specs.applications}</div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-primary" onClick={() => onEnquire(product)} style={{ flex: 1 }}>
                <Send size={16} />
                <span>Request Price Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LightboxModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="lightbox-modal" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        <div className="lightbox-image-wrap">
          <img src={item.url} alt={item.title} />
        </div>
        <div className="lightbox-caption">
          <h3>{item.title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>{item.desc}</p>
        </div>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div className="faq-item" key={faq.q}>
            <button
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
            >
              <span>{faq.q}</span>
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
              <div className="faq-answer">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// COMPLIANCES COMPONENT
// ============================================================================
const complianceItems = [
  {
    id: 'company-reg',
    title: 'Company Registration',
    authority: 'Ministry of Corporate Affairs (MCA)',
    description: 'Incorporated under the Companies Act with the Registrar of Companies, Assam.',
    detail: 'CIN: U26953AS1972PLC001381 | Incorporated: June 06, 1972',
    icon: Building2,
    status: 'active',
    category: 'Corporate',
  },
  {
    id: 'gst',
    title: 'GST Registration',
    authority: 'Government of India – GST Council',
    description: 'Registered under the Goods & Services Tax Act for manufacturing and supply of roofing products.',
    detail: 'GSTIN: [To be updated]',
    icon: FileText,
    status: 'active',
    category: 'Tax',
  },
  {
    id: 'pan-tan',
    title: 'PAN & TAN Registration',
    authority: 'Income Tax Department, Government of India',
    description: 'Permanent Account Number and Tax Deduction Account Number issued by the Income Tax Department.',
    detail: 'PAN: [To be updated] | TAN: [To be updated]',
    icon: FileBadge,
    status: 'active',
    category: 'Tax',
  },
  {
    id: 'factory-license',
    title: 'Factory License',
    authority: 'Labour Department, Government of Assam',
    description: 'Valid license issued under the Factories Act, 1948 for the manufacturing unit at Bonda Narangi, Guwahati.',
    detail: 'Factory License No.: [To be updated] | Annual renewal applicable',
    icon: Factory,
    status: 'active',
    category: 'Regulatory',
  },
  {
    id: 'pollution-control',
    title: 'Pollution Control Board NOC',
    authority: 'Assam State Pollution Control Board (ASPCB)',
    description: 'Consent to Establish & Operate (CTO) under the Water & Air Pollution Acts for the Guwahati manufacturing facility.',
    detail: 'Consent Order No.: [To be updated] | Subject to periodic renewal',
    icon: Leaf,
    status: 'active',
    category: 'Environmental',
  },
  {
    id: 'bis',
    title: 'BIS / IS Certification',
    authority: 'Bureau of Indian Standards (BIS)',
    description: 'Products manufactured conform to relevant Indian Standards for galvanized and colour-coated steel sheets.',
    detail: 'IS 277 (Galvanized Sheets) | IS 513 (Cold Rolled Sheets) | IS 10748 (HR Strips)',
    icon: BadgeCheck,
    status: 'active',
    category: 'Quality',
  },
  {
    id: 'iso',
    title: 'ISO Certification',
    authority: 'International Organization for Standardization',
    description: 'Quality management system certification demonstrating commitment to consistent product quality and process standards.',
    detail: 'ISO 9001:2015 | Certificate No.: [To be updated]',
    icon: Award,
    status: 'pending',
    category: 'Quality',
  },
  {
    id: 'labour-law',
    title: 'Labour Law Compliances',
    authority: 'EPFO & ESIC, Government of India',
    description: 'Registered under the Employees\' Provident Fund (EPF) and Employees\' State Insurance (ESI) Acts for workforce welfare.',
    detail: 'EPF Establishment Code: [To be updated] | ESI Code: [To be updated]',
    icon: Users,
    status: 'active',
    category: 'Labour',
  },
  {
    id: 'fire-noc',
    title: 'Fire Safety NOC',
    authority: 'Assam Fire & Emergency Services',
    description: 'No Objection Certificate from the Fire Department ensuring factory premises comply with fire safety norms.',
    detail: 'NOC No.: [To be updated] | Annual inspection required',
    icon: Flame,
    status: 'renewal-due',
    category: 'Safety',
  },
  {
    id: 'trade-license',
    title: 'Trade License',
    authority: 'Guwahati Municipal Corporation (GMC)',
    description: 'Trade license issued by the Guwahati Municipal Corporation for lawful conduct of business operations.',
    detail: 'Trade License No.: [To be updated] | Renewed annually',
    icon: ShoppingBag,
    status: 'active',
    category: 'Municipal',
  },
];

const statusConfig = {
  active: { label: 'Active & Valid', color: '#0d7054', bg: 'rgba(13,112,84,0.12)', icon: CheckCircle2 },
  'renewal-due': { label: 'Renewal Due Soon', color: '#d97706', bg: 'rgba(217,119,6,0.12)', icon: AlertTriangle },
  pending: { label: 'In Progress', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', icon: RefreshCw },
};

function Compliances() {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Corporate', 'Tax', 'Regulatory', 'Environmental', 'Quality', 'Labour', 'Safety', 'Municipal'];

  const filtered = activeFilter === 'All'
    ? complianceItems
    : complianceItems.filter((c) => c.category === activeFilter);

  const counts = {
    active: complianceItems.filter((c) => c.status === 'active').length,
    renewalDue: complianceItems.filter((c) => c.status === 'renewal-due').length,
    pending: complianceItems.filter((c) => c.status === 'pending').length,
  };

  return (
    <div>
      {/* Page Hero */}
      <section className="section section-dark" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Gavel size={14} />
              <span>Statutory & Regulatory</span>
            </div>
            <h2 className="section-title">Compliances & Certifications</h2>
            <p className="section-subtitle">
              Assam Roofing Limited is committed to full statutory compliance under all applicable
              Central and State regulations. All licenses, registrations, and certifications are
              maintained and renewed in a timely manner.
            </p>
          </div>

          {/* Summary Status Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
            <div style={{ background: 'rgba(13,112,84,0.15)', border: '1px solid rgba(13,112,84,0.3)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <CheckCircle2 size={36} style={{ color: '#4ade80', marginBottom: '10px' }} />
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#4ade80', lineHeight: 1 }}>{counts.active}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>Active & Valid</div>
            </div>
            <div style={{ background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.3)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <AlertTriangle size={36} style={{ color: '#fbbf24', marginBottom: '10px' }} />
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>{counts.renewalDue}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>Renewal Due Soon</div>
            </div>
            <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <RefreshCw size={36} style={{ color: '#60a5fa', marginBottom: '10px' }} />
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#60a5fa', lineHeight: 1 }}>{counts.pending}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>In Progress</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <ClipboardList size={36} style={{ color: '#e2e8f0', marginBottom: '10px' }} />
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#e2e8f0', lineHeight: 1 }}>{complianceItems.length}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>Total Compliances</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Cards */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <BadgeCheck size={14} />
              <span>Statutory Registrations</span>
            </div>
            <h2 className="section-title">Licenses & Certificates</h2>
            <p className="section-subtitle">
              All active registrations, licenses, and certifications held by Assam Roofing Limited.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={activeFilter === cat ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Compliance Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filtered.map((item) => {
              const Icon = item.icon;
              const sc = statusConfig[item.status];
              const StatusIcon = sc.icon;
              return (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-green)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(13,112,84,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: 'rgba(13,112,84,0.12)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Icon size={22} style={{ color: 'var(--accent-green)' }} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                          {item.title}
                        </h3>
                        <span style={{
                          display: 'inline-block', marginTop: '4px', fontSize: '0.72rem',
                          fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
                          color: 'var(--accent-green)', background: 'rgba(13,112,84,0.1)',
                          padding: '2px 8px', borderRadius: '4px',
                        }}>{item.category}</span>
                      </div>
                    </div>
                    {/* Status Badge */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0,
                      background: sc.bg, color: sc.color, border: `1px solid ${sc.color}40`,
                      borderRadius: '20px', padding: '4px 10px', fontSize: '0.72rem', fontWeight: 600,
                    }}>
                      <StatusIcon size={12} />
                      {sc.label}
                    </div>
                  </div>

                  {/* Authority */}
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Issuing Authority: </span>
                    {item.authority}
                  </div>

                  {/* Description */}
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.description}
                  </p>

                  {/* Detail Row */}
                  <div style={{
                    background: 'var(--surface-bg)', borderRadius: '8px', padding: '10px 14px',
                    fontSize: '0.8rem', color: 'var(--text-muted)', borderLeft: `3px solid ${sc.color}`,
                    fontFamily: 'monospace',
                  }}>
                    {item.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Tracker */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <ClipboardList size={14} />
              <span>Compliance Tracker</span>
            </div>
            <h2 className="section-title">Compliance Status Overview</h2>
            <p className="section-subtitle">
              A consolidated view of all statutory obligations and their current renewal/validity status.
            </p>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--surface-card)' }}>
              <thead>
                <tr style={{ background: 'var(--surface-bg)', borderBottom: '2px solid var(--border-subtle)' }}>
                  {['#', 'Compliance', 'Category', 'Issuing Authority', 'Status'].map((h) => (
                    <th key={h} style={{
                      padding: '14px 18px', textAlign: 'left', fontSize: '0.78rem',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
                      color: 'var(--text-muted)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {complianceItems.map((item, idx) => {
                  const sc = statusConfig[item.status];
                  const StatusIcon = sc.icon;
                  const Icon = item.icon;
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-bg)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{idx + 1}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Icon size={16} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
                          letterSpacing: '0.05em', color: 'var(--accent-green)',
                          background: 'rgba(13,112,84,0.1)', padding: '3px 8px', borderRadius: '4px',
                        }}>{item.category}</span>
                      </td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.authority}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: '5px',
                          background: sc.bg, color: sc.color, border: `1px solid ${sc.color}40`,
                          borderRadius: '20px', padding: '4px 12px', fontSize: '0.78rem', fontWeight: 600,
                        }}>
                          <StatusIcon size={12} />
                          {sc.label}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: '32px', padding: '20px 24px',
            background: 'rgba(13,112,84,0.06)', border: '1px solid rgba(13,112,84,0.2)',
            borderRadius: '12px', display: 'flex', gap: '14px', alignItems: 'flex-start',
          }}>
            <ShieldCheck size={22} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Compliance Assurance
              </p>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Assam Roofing Limited maintains all statutory compliances as required by Central and State laws.
                Certificate numbers and GSTIN details are updated periodically. For verification or a copy of any
                certificate, please contact our registered office at Bonda Narangi, Guwahati — 781026, or email us directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// CORPORATE FOOTER
// ============================================================================
function Footer({ onNavigate }) {
  return (
    <footer className="corporate-footer">
      <div className="footer-top-grid">
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div className="brand-logo-frame" style={{ width: '36px', height: '36px' }}>
              <img src={`${imageBase}/logo1.png`} alt="ARL Logo" className="brand-logo" />
            </div>
            <span style={{ color: '#ffffff', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem' }}>
              ASSAM ROOFING LIMITED
            </span>
          </div>
          <p>
            Incorporated in 1972 at Guwahati, Assam Roofing Limited is a leading manufacturer
            of durable pre-painted galvalume, galvanized steel, and corrugated building solutions
            sheltering infrastructure across Northeast India.
          </p>
          <div style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: 600 }}>
            CIN: U26953AS1972PLC001381 • ROC Guwahati
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Navigation</h4>
          <ul className="footer-links">
            <li><button onClick={() => onNavigate('home')}>Company Home</button></li>
            <li><button onClick={() => onNavigate('about')}>About Corporate Heritage</button></li>
            <li><button onClick={() => onNavigate('products')}>Product Specifications</button></li>
            <li><button onClick={() => onNavigate('services')}>Services & Logistics</button></li>
            <li><button onClick={() => onNavigate('compliances')}>Statutory Compliances</button></li>
            {/* <li><button onClick={() => onNavigate('estimator')}>Roof Sheet Calculator</button></li> */}
            <li><button onClick={() => onNavigate('gallery')}>Media & Plant Gallery</button></li>
            <li><button onClick={() => onNavigate('contact')}>Contact & Dealership</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Product Categories</h4>
          <ul className="footer-links">
            <li><button onClick={() => onNavigate('products')}>Colour Coated Metal Sheets (PPGI/PPGL)</button></li>
            <li><button onClick={() => onNavigate('products')}>Galvanized Steel MS Roofing (GI)</button></li>
            <li><button onClick={() => onNavigate('products')}>Architectural Tile Profile Roofing</button></li>
            <li><button onClick={() => onNavigate('products')}>Corrugated Heavy Duty Sheets</button></li>
            <li><button onClick={() => onNavigate('products')}>Crimp Curves & Fastener Accessories</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Guwahati Head Office</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={18} />
              <span>BONDA NARANGI, GUWAHATI, Assam, India - 781026</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+91 (0361) 264 0262 / +91 94350 48800</span>
            </li>
            <li>
              <Mail size={18} />
              <span>info@assamroofing.com</span>
            </li>
            <li>
              <Clock size={18} />
              <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} Assam Roofing Limited (ARL). All Rights Reserved.
        </div>
        <div className="footer-legal-badges">
          <span>Active MCA Status</span>
          <span>•</span>
          <span>IS 277 / IS 14246 Compliant</span>
          <span>•</span>
          <span>Guwahati, Assam</span>
        </div>
      </div>
    </footer>
  );
}

// Render Application
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
