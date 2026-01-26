-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'manager', 'artist', 'investor')) default 'manager',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ARTISTS (Roster)
create table if not exists public.artists (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  genre text,
  status text check (status in ('New', 'Rising', 'Stable', 'Superstar')) default 'New',
  avatar_url text,
  monthly_listeners bigint default 0,
  total_streams bigint default 0,
  manager_id uuid references public.profiles(id),
  created_at timestamp with time zone default now()
);

-- FANS (CRM)
create table if not exists public.fans (
  id uuid default uuid_generate_v4() primary key,
  email text,
  phone text,
  name text,
  platform text, -- Spotify, Apple, etc.
  status text check (status in ('Casual', 'Fan', 'Super Fan', 'Visionary')) default 'Casual',
  score int default 0,
  source text, -- 'Pre-save', 'Merch', etc.
  location text,
  created_at timestamp with time zone default now()
);

-- CAMPAIGNS (Marketing)
create table if not exists public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  artist_id uuid references public.artists(id),
  type text, -- 'Pre-save', 'Merch', 'Tour'
  channel text, -- 'WhatsApp', 'Email', 'Instagram'
  status text check (status in ('Draft', 'Active', 'Completed')) default 'Draft',
  sent_count int default 0,
  open_rate decimal(5,2),
  revenue_generated decimal(10,2) default 0,
  created_at timestamp with time zone default now()
);

-- FINANCIALS (Treasury)
create table if not exists public.transactions (
  id uuid default uuid_generate_v4() primary key,
  description text not null,
  amount decimal(12,2) not null,
  type text check (type in ('credit', 'debit')) not null,
  category text, -- 'Royalties', 'Marketing', 'Advance'
  status text check (status in ('Pending', 'Completed', 'Failed')) default 'Pending',
  date timestamp with time zone default now(),
  related_artist_id uuid references public.artists(id)
);

-- Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.artists enable row level security;
alter table public.fans enable row level security;
alter table public.campaigns enable row level security;
alter table public.transactions enable row level security;

-- Create basic policies (Allow read/write for authenticated users for now)
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Authenticated users can view artists" on public.artists;
create policy "Authenticated users can view artists" on public.artists for select using (auth.role() = 'authenticated');
drop policy if exists "Authenticated users can view fans" on public.fans;
create policy "Authenticated users can view fans" on public.fans for select using (auth.role() = 'authenticated');
drop policy if exists "Authenticated users can view campaigns" on public.campaigns;
create policy "Authenticated users can view campaigns" on public.campaigns for select using (auth.role() = 'authenticated');
drop policy if exists "Authenticated users can view transactions" on public.transactions;
create policy "Authenticated users can view transactions" on public.transactions for select using (auth.role() = 'authenticated');
