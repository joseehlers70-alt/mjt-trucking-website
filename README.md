# MJT Trucking Sales Platform

React and Vite website for MJT Trucking's published truck and trailer inventory.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and add the Supabase project URL, anonymous key, and WhatsApp number.

The browser application accepts either the requested `NEXT_PUBLIC_*` variables or their `VITE_*` aliases. The
`SUPABASE_SERVICE_ROLE_KEY` must remain server-side and is intentionally never imported by the Vite browser
application. Admin access uses Supabase Authentication with row-level security and the anonymous client key.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/migrations/202606070001_create_trucks.sql` in the SQL editor.
3. Create the MJT admin user under Authentication.
4. Add the environment variables to the deployment platform.

The migration creates:

- The `trucks` inventory table.
- Row-level security for published public records and authenticated management.
- The public `truck-images` bucket and authenticated upload policies.

## Admin

Open `/admin/login` and sign in with the Supabase Authentication user. The admin can add, edit, publish, unpublish,
mark status, upload photos, select the lead photo, and delete inventory. Public pages only query records where
`is_published = true`.

## Build

```bash
npm run build
```
