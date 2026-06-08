import { useEffect, useState } from 'react';
import { getPublishedTrucks } from '../lib/inventory.js';

export function useTrucks(options) {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getPublishedTrucks(options)
      .then((data) => {
        if (active) {
          console.info(`[MJT Inventory] Loaded ${data.length} published available vehicle(s) from Supabase.`);
          setTrucks(data);
          setError('');
        }
      })
      .catch((requestError) => {
        console.error('[MJT Inventory] Supabase vehicle request failed.', requestError);
        if (active) {
          setTrucks([]);
          setError(requestError.message || 'Vehicle listings could not be loaded.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [options?.limit]);

  return { trucks, loading, error };
}
