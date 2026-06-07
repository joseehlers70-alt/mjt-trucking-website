import { isSupabaseConfigured, supabase } from './supabase.js';

const IMAGE_BUCKET = 'truck-images';

const truckFields = `
  id, stock_code, slug, title, make, model, variant, category, year, mileage_km,
  price, price_is_poa, condition, transmission, fuel_type, axle_config, engine,
  horsepower, gvm_kg, tare_kg, colour, location_city, location_province,
  description, features, image_urls, main_image_url, status, is_published,
  created_at, updated_at
`;

const writableTruckFields = [
  'stock_code',
  'slug',
  'title',
  'make',
  'model',
  'variant',
  'category',
  'year',
  'mileage_km',
  'price',
  'price_is_poa',
  'condition',
  'transmission',
  'fuel_type',
  'axle_config',
  'engine',
  'horsepower',
  'gvm_kg',
  'tare_kg',
  'colour',
  'location_city',
  'location_province',
  'description',
  'features',
  'image_urls',
  'main_image_url',
  'status',
  'is_published',
];

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
  const payload = Object.fromEntries(
    writableTruckFields
      .filter((field) => Object.hasOwn(values, field))
      .map((field) => [field, values[field]]),
  );

  payload.features = values.features ?? [];
  payload.image_urls = values.image_urls ?? [];
  payload.main_image_url = values.main_image_url || payload.image_urls[0] || null;
  payload.price = values.price_is_poa ? null : values.price;

  if (payload.is_published && !payload.main_image_url) {
    throw new Error('Upload at least one vehicle photo before publishing this listing.');
  }

  const operation = values.id
    ? supabase.from('trucks').update(payload).eq('id', values.id)
    : supabase.from('trucks').insert(payload);

  const { data, error } = await operation.select(truckFields).single();
  if (error) throw error;
  return data;
}

export async function deleteTruck(truck) {
  requireSupabase();
  const { error } = await supabase.from('trucks').delete().eq('id', truck.id);
  if (error) throw error;
  try {
    await removeTruckImages(truck.image_urls ?? []);
  } catch (storageError) {
    console.error('The listing was deleted, but its stored images could not be removed.', storageError);
  }
}

export async function uploadTruckImages(files, stockCode) {
  requireSupabase();
  const urls = [];

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      throw new Error(`${file.name} is not a supported image file.`);
    }
    if (file.size > 12 * 1024 * 1024) {
      throw new Error(`${file.name} is larger than the 12 MB upload limit.`);
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeCode = stockCode.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'vehicle';
    const path = `${safeCode}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) throw error;

    const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

export async function removeTruckImages(urls) {
  requireSupabase();
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  const paths = urls
    .map((url) => {
      const markerIndex = url.indexOf(marker);
      return markerIndex >= 0 ? decodeURIComponent(url.slice(markerIndex + marker.length)) : '';
    })
    .filter(Boolean);

  if (!paths.length) return;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).remove(paths);
  if (error) throw error;
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
  return [truck.location_city, truck.location_province].filter(Boolean).join(', ') || 'Contact MJT';
}

export function truckDisplayName(truck) {
  return [truck.year, truck.make, truck.model].filter(Boolean).join(' ');
}

export function createSlug({ year, make, model, stock_code: stockCode }) {
  return [year, make, model, stockCode]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
