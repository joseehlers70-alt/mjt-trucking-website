import { ArrowUpRight, Gauge, ImageOff, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatMileage, formatPrice, truckDisplayName, truckLocation } from '../lib/inventory.js';
import { whatsappNumber } from '../lib/supabase.js';

const statusLabels = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
};

export default function VehicleCard({ truck }) {
  const displayName = truckDisplayName(truck);
  const message = `Hi MJT, I'm interested in the ${displayName} listed on your website. Is it still available?`;

  return (
    <article className="inventory-card">
      <Link className="inventory-card-image" to={`/trucks/${truck.slug}`}>
        {truck.main_image_url ? (
          <img src={truck.main_image_url} alt={`${truck.year} ${truck.make} ${truck.model}`} loading="lazy" />
        ) : (
          <div className="vehicle-image-fallback" aria-label="Vehicle photo unavailable">
            <ImageOff size={36} />
            <span>Photo unavailable</span>
          </div>
        )}
        <span className={`status-pill status-${truck.status}`}>{statusLabels[truck.status] || truck.status}</span>
        <span className="stock-code">{truck.stock_code}</span>
      </Link>
      <div className="inventory-card-body">
        <div className="inventory-card-heading">
          <div>
            <span>{truck.category}</span>
            <h3>{displayName}</h3>
            {truck.variant && <p>{truck.variant}</p>}
          </div>
          <strong>{formatPrice(truck)}</strong>
        </div>
        <div className="inventory-card-specs">
          <span><Gauge size={17} />{formatMileage(truck.mileage_km)}</span>
          <span><MapPin size={17} />{truckLocation(truck)}</span>
        </div>
        <div className="inventory-card-actions">
          <Link className="button button-primary" to={`/trucks/${truck.slug}`}>
            View Details <ArrowUpRight size={17} />
          </Link>
          <a
            className="button vehicle-whatsapp"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} /> WhatsApp Enquiry
          </a>
        </div>
      </div>
    </article>
  );
}
