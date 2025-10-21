-- Create notices and blogs tables
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  author_email text,
  image_url text,
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  author_email text,
  image_url text,
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.notices enable row level security;
alter table public.blogs enable row level security;

-- Public read access for notices and blogs
create policy "notices_public_read"
  on public.notices for select
  using (true);

create policy "blogs_public_read"
  on public.blogs for select
  using (true);

-- Admin write access (for now allow authenticated server actions)
create policy "notices_admin_insert"
  on public.notices for insert
  with check (true);

create policy "notices_admin_update"
  on public.notices for update
  using (true);

create policy "notices_admin_delete"
  on public.notices for delete
  using (true);

create policy "blogs_admin_insert"
  on public.blogs for insert
  with check (true);

create policy "blogs_admin_update"
  on public.blogs for update
  using (true);

create policy "blogs_admin_delete"
  on public.blogs for delete
  using (true);

-- Indexes
create index if not exists idx_notices_created_at on public.notices(created_at);
create index if not exists idx_blogs_created_at on public.blogs(created_at);
