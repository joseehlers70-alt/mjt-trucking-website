import { ArrowLeft, Check, Gauge, MapPin, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import InventoryState from '../components/InventoryState.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import { formatMileage, formatPrice, getTruckBySlug, truckLocation } from '../lib/inventory.js';
import { whatsappNumber } from '../lib/supabase.js';

export default function TruckDetailPage() {
  const { slug } = useParams();
  const [truck, setTruck] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTruckBySlug(slug)
      .then((data) => {
        setTruck(data);
        setActiveImage(data?.main_image_url || data?.image_urls?.[0] || '');
      })
      .catch((requestError) => setError(requestError.message || 'This vehicle could not be loaded.'))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!truck) return;
    document.title = `${truck.year} ${truck.make} ${truck.model} | MJT Trucking`;
    return () => {
      document.title = 'MJT Trucking | Quality Used Trucks & Trailers for Sale';
    };
  }, [truck]);

  if (!truck) {
    return (
      <SiteLayout>
        <section className="page-hero section-dark"><div className="container"><h1>Vehicle details</h1></div></section>
        <section className="section"><div className="container"><InventoryState loading={loading} error={error} /></div></section>
      </SiteLayout>
    );
  }

  const gallery = [...new Set([truck.main_image_url, ...(truck.image_urls || [])].filter(Boolean))];
  const message = `Hi MJT, I'm interested in the ${truck.year} ${truck.make} ${truck.model} listed on your website. Is it still available?`;

  const specs = [
    ['Year', truck.year],
    ['Mileage', formatMileage(truck.mileage_km)],
    ['Condition', truck.condition],
    ['Transmission', truck.transmission],
    ['Fuel type', truck.fuel_type],
    ['Axle configuration', truck.axle_config],
    ['Engine', truck.engine],
    ['Horsepower', truck.horsepower ? `${truck.horsepower} hp` : null],
    ['GVM', truck.gvm_kg ? `${truck.gvm_kg.toLocaleString('en-ZA')} kg` : null],
    ['Tare', truck.tare_kg ? `${truck.tare_kg.toLocaleString('en-ZA')} kg` : null],
    ['Colour', truck.colour],
    ['Stock code', truck.stock_code],
  ].filter(([, value]) => value);

  return (
    <SiteLayout>
      <section className="truck-detail-page section-dark">
        <div className="container">
          <Link className="detail-back" to="/trucks"><ArrowLeft size={18} /> Back to available trucks</Link>
          <div className="detail-layout">
            <div className="detail-gallery">
              <div className="detail-main-image">
                {activeImage ? <img src={activeImage} alt={truck.title} /> : <div className="vehicle-image-fallback"><img src="/images/mjt-trucking-logo-transparent-hd.png" alt="" /></div>}
                <span className={`status-pill status-${truck.status}`}>{truck.status}</span>
              </div>
              {gallery.length > 1 && (
                <div className="detail-thumbnails">
                  {gallery.map((image) => (
                    <button className={image === activeImage ? 'active' : ''} type="button" key={image} onClick={() => setActiveImage(image)}>
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <aside className="detail-summary">
              <span className="detail-category">{truck.category}</span>
              <h1>{truck.title}</h1>
              {truck.variant && <p className="detail-variant">{truck.variant}</p>}
              <strong className="detail-price">{formatPrice(truck)}</strong>
              <div className="detail-location"><MapPin size={18} /> {truckLocation(truck)}</div>
              <div className="detail-mileage"><Gauge size={18} /> {formatMileage(truck.mileage_km)}</div>
              <a
                className="button button-primary detail-whatsapp"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={19} /> WhatsApp Enquiry
              </a>
              <p className="detail-note">Availability, pricing, mileage, and specifications must be confirmed with MJT Trucking.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section detail-information">
        <div className="container detail-information-grid">
          <div>
            <div className="section-heading compact-heading">
              <p className="eyebrow">Vehicle Overview</p>
              <h2>Details and specifications</h2>
            </div>
            <p className="detail-description">{truck.description || 'Contact MJT Trucking for a complete description of this vehicle.'}</p>
            {truck.features?.length > 0 && (
              <div className="feature-checklist">
                {truck.features.map((feature) => <span key={feature}><Check size={17} /> {feature}</span>)}
              </div>
            )}
          </div>
          <dl className="detail-spec-grid">
            {specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>
      </section>
    </SiteLayout>
  );
}
