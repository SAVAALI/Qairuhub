-- Run this script once in Supabase Dashboard → SQL Editor → New query.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 100),
  description text not null check (char_length(description) between 1 and 700),
  tech_stack text[] not null check (cardinality(tech_stack) between 1 and 10),
  contact text not null check (char_length(contact) between 1 and 250),
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- The board is public: anyone may read ideas and submit a new one.
create policy "Anyone can view projects" on public.projects for select using (true);
create policy "Anyone can publish projects" on public.projects for insert with check (true);

-- No update or delete policy is intentionally granted to anonymous visitors.
