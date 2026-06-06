import { ArrowUpRight, Fuel, Gauge, MapPin, MessageCircle, Settings2, Truck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { vehicles } from '../data/vehicles.js';
import '../vehicles.css';

const filters = [
  { label: 'All Vehicles', value: 'all' },
  { label: 'Truck Tractors', value: 'Truck Tractor' },
  { label: 'Rigid Trucks', value: 'Rigid Truck' },
  { label: 'Van Body Trucks', value: 'Van Body Truck' },
  { label: 'Transport Available', value: 'transport' },
];

const disclaimer = 'Vehicle availability, mileage, and specifications must be confirmed directly with MJT Trucking.';

function getWhatsAppUrl(title) {
  const message = `Hi Sisco, I am interested in the ${title} listed on the MJT Trucking website.`;
  return `https://wa.me/27713319387?text=${encodeURIComponent(message)}`;
}

export default function AvailableVehicles() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const visibleVehicles = vehicles.filter((vehicle) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'transport') return vehicle.transportAvailable;
    return vehicle.category === activeFilter;
  });

  useEffect(() => {
    if (!selectedVehicle) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedVehicle(null);
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedVehicle]);

  return (
    <section className="section vehicle-marketplace section-dark" id="available-vehicles">
      <div className="container">
        <div className="marketplace-heading reveal">
          <div className="section-heading">
            <p className="eyebrow">Trucks for Sale</p>
            <h2>Available Vehicles</h2>
            <p>
              Explore our demo commercial vehicle marketplace. These mock listings show how confirmed MJT stock will
              be presented once vehicle details and photography are supplied.
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
              className={activeFilter === filter.value ? 'vehicle-filter vehicle-filter--active' : 'vehicle-filter'}
              type="button"
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="vehicle-grid">
          {visibleVehicles.map((vehicle) => (
            <article className="vehicle-card reveal" key={vehicle.id}>
              <div className="vehicle-image">
                <img src={vehicle.image} alt={`${vehicle.title} mock listing`} loading="lazy" />
                <div className="vehicle-badges">
                  <span className="vehicle-status">{vehicle.status}</span>
                  <span className="vehicle-category-badge">{vehicle.category}</span>
                </div>
                <span className="vehicle-tag">{vehicle.tag}</span>
              </div>

              <div className="vehicle-content">
                <div className="vehicle-title-row">
                  <div>
                    <span className="vehicle-listing-label">Mock vehicle listing</span>
                    <h3>{vehicle.title}</h3>
                  </div>
                  <div className="vehicle-price">
                    <span>Price</span>
                    <strong>{vehicle.price}</strong>
                  </div>
                </div>

                <div className="vehicle-specs">
                  <span>
                    <Gauge size={18} />
                    <small>Mileage</small>
                    <strong>{vehicle.mileage}</strong>
                  </span>
                  <span>
                    <Settings2 size={18} />
                    <small>Transmission</small>
                    <strong>{vehicle.transmission}</strong>
                  </span>
                  <span>
                    <Truck size={18} />
                    <small>Drive</small>
                    <strong>{vehicle.drive}</strong>
                  </span>
                  <span>
                    <Fuel size={18} />
                    <small>Fuel</small>
                    <strong>{vehicle.fuel}</strong>
                  </span>
                  <span>
                    <MapPin size={18} />
                    <small>Location</small>
                    <strong>{vehicle.location}</strong>
                  </span>
                </div>

                <div className="vehicle-actions">
                  <button className="button button-primary" type="button" onClick={() => setSelectedVehicle(vehicle)}>
                    View Details
                    <ArrowUpRight size={18} />
                  </button>
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

        <p className="vehicle-disclaimer">{disclaimer}</p>
      </div>

      {selectedVehicle && (
        <div className="vehicle-modal-backdrop" role="presentation" onMouseDown={() => setSelectedVehicle(null)}>
          <div
            className="vehicle-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vehicle-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="vehicle-modal-close"
              type="button"
              aria-label="Close vehicle details"
              onClick={() => setSelectedVehicle(null)}
            >
              <X size={22} />
            </button>

            <div className="vehicle-modal-image">
              <img src={selectedVehicle.image} alt={`${selectedVehicle.title} mock listing`} />
              <span className="vehicle-status">{selectedVehicle.status}</span>
            </div>

            <div className="vehicle-modal-content">
              <div className="vehicle-modal-heading">
                <div>
                  <span className="vehicle-listing-label">Mock vehicle listing</span>
                  <h3 id="vehicle-modal-title">{selectedVehicle.title}</h3>
                  <p>{selectedVehicle.tag}</p>
                </div>
                <div className="vehicle-price">
                  <span>Price</span>
                  <strong>{selectedVehicle.price}</strong>
                </div>
              </div>

              <div className="vehicle-modal-section">
                <h4>Overview</h4>
                <p>{selectedVehicle.overview}</p>
              </div>

              <div className="vehicle-modal-section">
                <h4>Key specs</h4>
                <dl className="vehicle-detail-specs">
                  <div><dt>Category</dt><dd>{selectedVehicle.category}</dd></div>
                  <div><dt>Mileage</dt><dd>{selectedVehicle.mileage}</dd></div>
                  <div><dt>Transmission</dt><dd>{selectedVehicle.transmission}</dd></div>
                  <div><dt>Drive</dt><dd>{selectedVehicle.drive}</dd></div>
                  <div><dt>Fuel</dt><dd>{selectedVehicle.fuel}</dd></div>
                  <div><dt>Location</dt><dd>{selectedVehicle.location}</dd></div>
                </dl>
              </div>

              <div className="vehicle-modal-actions">
                <a className="button button-primary" href="#quote" onClick={() => setSelectedVehicle(null)}>
                  Enquire Now
                  <ArrowUpRight size={18} />
                </a>
                <a
                  className="button vehicle-whatsapp"
                  href={getWhatsAppUrl(selectedVehicle.title)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  WhatsApp Sisco
                </a>
              </div>
              <p className="vehicle-modal-disclaimer">{disclaimer}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
