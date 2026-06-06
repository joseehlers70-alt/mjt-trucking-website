import { ArrowUpRight, Gauge, MapPin, MessageCircle, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { vehicles } from '../data/vehicles.js';
import '../vehicles.css';

const filters = ['All Vehicles', 'Truck Tractors', 'Rigid Trucks', 'Vans', 'Transport Available'];

function getWhatsAppUrl(title) {
  const message = `Hi Sisco, I am interested in the ${title} listed on the MJT Trucking website.`;
  return `https://wa.me/27713319387?text=${encodeURIComponent(message)}`;
}

export default function AvailableVehicles() {
  const [activeFilter, setActiveFilter] = useState('All Vehicles');

  const visibleVehicles = vehicles.filter((vehicle) => {
    if (activeFilter === 'All Vehicles') return true;
    if (activeFilter === 'Transport Available') return vehicle.transportAvailable;
    return vehicle.category === activeFilter;
  });

  return (
    <section className="section vehicle-marketplace section-dark" id="available-vehicles">
      <div className="container">
        <div className="marketplace-heading reveal">
          <div className="section-heading">
            <p className="eyebrow">Trucks for Sale</p>
            <h2>Available Vehicles</h2>
            <p>
              Browse mock commercial truck and van listings. Real stock information and vehicle photos can be updated
              from one simple data file as inventory changes.
            </p>
          </div>
          <div className="marketplace-count">
            <strong>{visibleVehicles.length}</strong>
            <span>{visibleVehicles.length === 1 ? 'vehicle' : 'vehicles'} shown</span>
          </div>
        </div>

        <div className="vehicle-filters reveal" aria-label="Filter available vehicles">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? 'vehicle-filter vehicle-filter--active' : 'vehicle-filter'}
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="vehicle-grid">
          {visibleVehicles.map((vehicle) => (
            <article className="vehicle-card reveal" key={vehicle.id}>
              <div className="vehicle-image">
                <img src={vehicle.image} alt={`${vehicle.title} mock listing`} loading="lazy" />
                <span className="vehicle-status">{vehicle.status}</span>
                {vehicle.transportAvailable && <span className="transport-status">Transport available</span>}
              </div>

              <div className="vehicle-content">
                <div className="vehicle-title-row">
                  <div>
                    <span className="vehicle-category">{vehicle.category}</span>
                    <h3>{vehicle.title}</h3>
                  </div>
                  <strong className="vehicle-price">{vehicle.price}</strong>
                </div>

                <div className="vehicle-specs">
                  <span>
                    <Gauge size={18} />
                    {vehicle.mileage}
                  </span>
                  <span>
                    <Settings2 size={18} />
                    {vehicle.transmission}
                  </span>
                  <span>
                    <MapPin size={18} />
                    {vehicle.location}
                  </span>
                </div>

                <div className="vehicle-actions">
                  <a className="button button-primary" href="#quote">
                    Enquire Now
                    <ArrowUpRight size={18} />
                  </a>
                  <a
                    className="button vehicle-whatsapp"
                    href={getWhatsAppUrl(vehicle.title)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Sisco
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="vehicle-disclaimer">
          Vehicle availability, mileage, and specifications must be confirmed directly with MJT Trucking.
        </p>
      </div>
    </section>
  );
}
