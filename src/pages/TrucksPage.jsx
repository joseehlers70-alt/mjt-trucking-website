import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import InventoryState from '../components/InventoryState.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { useTrucks } from '../hooks/useTrucks.js';

const initialFilters = {
  search: '',
  make: '',
  model: '',
  category: '',
  status: '',
  minYear: '',
  maxYear: '',
  minPrice: '',
  maxPrice: '',
  maxMileage: '',
};

export default function TrucksPage() {
  const { trucks, loading, error } = useTrucks();
  const [filters, setFilters] = useState(initialFilters);

  const options = useMemo(
    () => ({
      makes: [...new Set(trucks.map((truck) => truck.make).filter(Boolean))].sort(),
      models: [...new Set(trucks.map((truck) => truck.model).filter(Boolean))].sort(),
      categories: [...new Set(trucks.map((truck) => truck.category).filter(Boolean))].sort(),
    }),
    [trucks],
  );

  const filteredTrucks = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return trucks.filter((truck) => {
      const searchable = [truck.title, truck.make, truck.model, truck.variant, truck.stock_code]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (term && !searchable.includes(term)) return false;
      if (filters.make && truck.make !== filters.make) return false;
      if (filters.model && truck.model !== filters.model) return false;
      if (filters.category && truck.category !== filters.category) return false;
      if (filters.status && truck.status !== filters.status) return false;
      if (filters.minYear && truck.year < Number(filters.minYear)) return false;
      if (filters.maxYear && truck.year > Number(filters.maxYear)) return false;
      if (filters.minPrice && !truck.price_is_poa && Number(truck.price) < Number(filters.minPrice)) return false;
      if (filters.maxPrice && !truck.price_is_poa && Number(truck.price) > Number(filters.maxPrice)) return false;
      if (filters.maxMileage && Number(truck.mileage_km) > Number(filters.maxMileage)) return false;
      return true;
    });
  }, [filters, trucks]);

  const updateFilter = (event) => {
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <SiteLayout>
      <section className="page-hero inventory-page-hero section-dark">
        <div className="container">
          <p className="eyebrow">MJT Trucking Inventory</p>
          <h1>Available Trucks</h1>
          <p>Search published trucks and trailers, compare key details, and contact MJT directly.</p>
        </div>
      </section>

      <section className="section inventory-browser">
        <div className="container inventory-layout">
          <aside className="filter-panel">
            <div className="filter-title">
              <span><SlidersHorizontal size={19} /> Filters</span>
              <button type="button" onClick={() => setFilters(initialFilters)} aria-label="Clear filters"><X size={18} /></button>
            </div>
            <label className="search-field">
              <span>Search inventory</span>
              <div><Search size={18} /><input name="search" aria-label="Search by make, model, or stock code" value={filters.search} onChange={updateFilter} /></div>
            </label>
            <FilterSelect label="Make" name="make" value={filters.make} options={options.makes} onChange={updateFilter} />
            <FilterSelect label="Model" name="model" value={filters.model} options={options.models} onChange={updateFilter} />
            <FilterSelect label="Body type" name="category" value={filters.category} options={options.categories} onChange={updateFilter} />
            <FilterSelect label="Status" name="status" value={filters.status} options={['available', 'reserved', 'sold']} onChange={updateFilter} />
            <div className="filter-pair">
              <FilterInput label="Year from" name="minYear" value={filters.minYear} onChange={updateFilter} />
              <FilterInput label="Year to" name="maxYear" value={filters.maxYear} onChange={updateFilter} />
            </div>
            <div className="filter-pair">
              <FilterInput label="Price from" name="minPrice" value={filters.minPrice} onChange={updateFilter} />
              <FilterInput label="Price to" name="maxPrice" value={filters.maxPrice} onChange={updateFilter} />
            </div>
            <FilterInput label="Maximum mileage" name="maxMileage" value={filters.maxMileage} onChange={updateFilter} />
          </aside>

          <div>
            <div className="inventory-results-heading">
              <strong>{filteredTrucks.length} {filteredTrucks.length === 1 ? 'vehicle' : 'vehicles'}</strong>
              <span>Prices and specifications must be confirmed directly with MJT Trucking.</span>
            </div>
            {filteredTrucks.length > 0 ? (
              <div className="inventory-grid inventory-grid-two">
                {filteredTrucks.map((truck) => <VehicleCard key={truck.id} truck={truck} />)}
              </div>
            ) : (
              <InventoryState loading={loading} error={error} />
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterSelect({ label, name, value, options, onChange }) {
  return (
    <label>
      <span>{label}</span>
      <select name={name} value={value} onChange={onChange}>
        <option value="">All</option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function FilterInput({ label, name, value, onChange }) {
  return (
    <label>
      <span>{label}</span>
      <input type="number" min="0" name={name} value={value} onChange={onChange} />
    </label>
  );
}
