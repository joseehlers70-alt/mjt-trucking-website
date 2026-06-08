import { isSupabaseConfigured, supabase } from './supabase.js';

const IMAGE_BUCKET = 'truck-images';

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

function trucksTable() {
  requireSupabase();
  return supabase.schema('public').from('trucks');
}

function throwInventoryError(operation, error) {
  console.error(`[MJT Inventory] ${operation} failed.`, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });
  throw new Error(error.message || `Supabase could not ${operation.toLowerCase()}.`);
}

export async function getPublishedTrucks({ limit } = {}) {
  requireSupabase();

  const { data, error } = await trucksTable()
    .select('*')
    .eq('is_published', true);

  console.info('[MJT Inventory] Supabase published trucks query result', {
    rowCount: data?.length ?? 0,
    trucks: data ?? [],
  });

  if (error) {
    console.error('[MJT Inventory] Supabase published trucks query error', error);
    throwInventoryError('load published vehicles', error);
  }

  const trucks = [...(data ?? [])].sort((first, second) => {
    if (!first.created_at || !second.created_at) return 0;
    return new Date(second.created_at) - new Date(first.created_at);
  });

  return limit ? trucks.slice(0, limit) : trucks;
}

export async function getTruckBySlug(slug) {
  requireSupabase();

  const { data, error } = await trucksTable()
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) throwInventoryError('load vehicle details', error);
  return data;
}

export async function getAdminTrucks() {
  const { data, error } = await trucksTable()
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throwInventoryError('load admin inventory', error);
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
    ? trucksTable().update(payload).eq('id', values.id)
    : trucksTable().insert(payload);

  const { data, error } = await operation.select('*').single();
  if (error) throw error;
  return data;
}

export async function deleteTruck(truck) {
  requireSupabase();
  const { error } = await trucksTable().delete().eq('id', truck.id);
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
