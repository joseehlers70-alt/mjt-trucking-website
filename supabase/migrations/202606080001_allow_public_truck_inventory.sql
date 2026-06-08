alter table public.trucks enable row level security;

grant usage on schema public to anon, authenticated;
grant select on table public.trucks to anon, authenticated;

drop policy if exists "Public can view published trucks" on public.trucks;
create policy "Public can view published trucks"
on public.trucks
for select
to anon, authenticated
using (is_published = true);
