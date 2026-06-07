create extension if not exists "pgcrypto";

create table if not exists public.trucks (
  id uuid primary key default gen_random_uuid(),
  stock_code text unique not null,
  slug text unique not null,
  title text not null,
  make text not null,
  model text not null,
  variant text,
  category text not null,
  year integer not null check (year between 1950 and 2100),
  mileage_km integer check (mileage_km >= 0),
  price numeric(14, 2) check (price >= 0),
  price_is_poa boolean not null default false,
  condition text not null default 'Used',
  transmission text,
  fuel_type text,
  axle_config text,
  engine text,
  horsepower integer check (horsepower >= 0),
  gvm_kg integer check (gvm_kg >= 0),
  tare_kg integer check (tare_kg >= 0),
  colour text,
  location_city text not null default 'Boksburg',
  location_province text not null default 'Gauteng',
  description text,
  features text[] not null default '{}',
  image_urls text[] not null default '{}',
  main_image_url text,
  status text not null default 'available'
    check (status in ('available', 'reserved', 'sold')),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trucks_set_updated_at on public.trucks;
create trigger trucks_set_updated_at
before update on public.trucks
for each row execute function public.set_updated_at();

alter table public.trucks enable row level security;

drop policy if exists "Public can view published trucks" on public.trucks;
create policy "Public can view published trucks"
on public.trucks for select
using (is_published = true);

drop policy if exists "Authenticated users can view all trucks" on public.trucks;
create policy "Authenticated users can view all trucks"
on public.trucks for select
to authenticated
using (true);

drop policy if exists "Authenticated users can create trucks" on public.trucks;
create policy "Authenticated users can create trucks"
on public.trucks for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update trucks" on public.trucks;
create policy "Authenticated users can update trucks"
on public.trucks for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete trucks" on public.trucks;
create policy "Authenticated users can delete trucks"
on public.trucks for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('truck-images', 'truck-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view truck images" on storage.objects;
create policy "Public can view truck images"
on storage.objects for select
using (bucket_id = 'truck-images');

drop policy if exists "Authenticated users can upload truck images" on storage.objects;
create policy "Authenticated users can upload truck images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'truck-images');

drop policy if exists "Authenticated users can update truck images" on storage.objects;
create policy "Authenticated users can update truck images"
on storage.objects for update
to authenticated
using (bucket_id = 'truck-images');

drop policy if exists "Authenticated users can delete truck images" on storage.objects;
create policy "Authenticated users can delete truck images"
on storage.objects for delete
to authenticated
using (bucket_id = 'truck-images');
