-- LearntoDig: modul progress + AI istifadə limiti
-- Supabase SQL Editor-da bir dəfə işlədin. Təkrar işlətmək təhlükəsizdir.

-- 1) Modul progress
create table if not exists public.module_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  module_id   text not null,
  section_id  text not null,
  status      text not null check (status in ('in_progress','completed')),
  score       numeric,
  updated_at  timestamptz not null default now(),
  unique (user_id, module_id, section_id)
);

alter table public.module_progress enable row level security;

drop policy if exists "progress_select_own" on public.module_progress;
drop policy if exists "progress_insert_own" on public.module_progress;
drop policy if exists "progress_update_own" on public.module_progress;

create policy "progress_select_own" on public.module_progress
  for select to authenticated using (auth.uid() = user_id);
create policy "progress_insert_own" on public.module_progress
  for insert to authenticated with check (auth.uid() = user_id);
create policy "progress_update_own" on public.module_progress
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

grant select, insert, update on public.module_progress to authenticated;

create index if not exists module_progress_user_idx on public.module_progress (user_id, module_id);

-- 2) AI istifadə qeydi (saatlıq limit üçün)
create table if not exists public.ai_usage (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  scope       text not null,
  created_at  timestamptz not null default now()
);

alter table public.ai_usage enable row level security;

drop policy if exists "ai_usage_select_own" on public.ai_usage;
drop policy if exists "ai_usage_insert_own" on public.ai_usage;

create policy "ai_usage_select_own" on public.ai_usage
  for select to authenticated using (auth.uid() = user_id);
create policy "ai_usage_insert_own" on public.ai_usage
  for insert to authenticated with check (auth.uid() = user_id);

grant select, insert on public.ai_usage to authenticated;
grant usage, select on all sequences in schema public to authenticated;

create index if not exists ai_usage_user_time_idx on public.ai_usage (user_id, created_at desc);
