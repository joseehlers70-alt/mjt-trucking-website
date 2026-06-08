import { LoaderCircle, MessageCircle, Truck } from 'lucide-react';
import { whatsappNumber } from '../lib/supabase.js';

export default function InventoryState({ loading, error }) {
  if (loading) {
    return (
      <div className="inventory-state">
        <LoaderCircle className="spin" size={34} />
        <strong>Loading available vehicles</strong>
      </div>
    );
  }

  return (
    <div className="inventory-state">
      <Truck size={38} />
      <strong>No vehicles are currently listed. Please contact MJT directly for current availability.</strong>
      {error && <p className="form-error" role="alert">Inventory connection error: {error}</p>}
      <a
        className="button button-primary"
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi MJT, please let me know which trucks or trailers are currently available.')}`}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={18} /> Contact MJT
      </a>
    </div>
  );
}
