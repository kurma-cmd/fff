create table public.story_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  story_name text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, story_name)
);

alter table public.story_progress enable row level security;

create policy "read own story progress"
  on public.story_progress for select
  using (auth.uid() = user_id);

create policy "insert own story progress"
  on public.story_progress for insert
  with check (auth.uid() = user_id);

create policy "update own story progress"
  on public.story_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
