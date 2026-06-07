import { isSupabaseConfigured, supabase } from './supabase.js';

const truckFields = `
  id, stock_code, slug, title, make, model, variant, category, year, mileage_km,
  price, price_is_poa, condition, transmission, fuel_type, axle_config, engine,
  horsepower, gvm_kg, tare_kg, colour, location_city, location_province,
  description, features, image_urls, main_image_url, status, is_published,
  created_at, updated_at
`;

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.');
  }
}

export async function getPublishedTrucks({ limit } = {}) {
  if (!isSupabaseConfigured) return [];

  let query = supabase
    .from('trucks')
    .select(truckFields)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getTruckBySlug(slug) {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('trucks')
    .select(truckFields)
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getAdminTrucks() {
  requireSupabase();
  const { data, error } = await supabase
    .from('trucks')
    .select(truckFields)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function saveTruck(values) {
  requireSupabase();
  const payload = {
    ...values,
    features: values.features ?? [],
    image_urls: values.image_urls ?? [],
    main_image_url: values.main_image_url || values.image_urls?.[0] || null,
  };

  const operation = payload.id
    ? supabase.from('trucks').update(payload).eq('id', payload.id)
    : supabase.from('trucks').insert(payload);

  const { data, error } = await operation.select(truckFields).single();
  if (error) throw error;
  return data;
}

export async function deleteTruck(id) {
  requireSupabase();
  const { error } = await supabase.from('trucks').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadTruckImages(files, stockCode) {
  requireSupabase();
  const urls = [];

  for (const file of files) {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeCode = stockCode.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const path = `${safeCode}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from('truck-images').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) throw error;

    const { data } = supabase.storage.from('truck-images').getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

export function formatPrice(truck) {
  if (truck.price_is_poa || truck.price === null || truck.price === undefined) return 'POA';
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(Number(truck.price));
}

export function formatMileage(mileage) {
  if (mileage === null || mileage === undefined) return 'Contact MJT';
  return `${new Intl.NumberFormat('en-ZA').format(mileage)} km`;
}

export function truckLocation(truck) {
  return [truck.location_city, truck.location_province].filter(Boolean).join(', ');
}

export function createSlug({ year, make, model, stock_code: stockCode }) {
  return [year, make, model, stockCode]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
