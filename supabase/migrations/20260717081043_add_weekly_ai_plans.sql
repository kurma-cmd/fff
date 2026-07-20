create table public.weekly_ai_plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tasks jsonb not null check (jsonb_typeof(tasks) = 'array'),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days')
);

alter table public.weekly_ai_plans enable row level security;
create policy "read own weekly plan" on public.weekly_ai_plans for select using (auth.uid() = user_id);
create policy "insert own weekly plan" on public.weekly_ai_plans for insert with check (auth.uid() = user_id);
create policy "update own weekly plan" on public.weekly_ai_plans for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own weekly plan" on public.weekly_ai_plans for delete using (auth.uid() = user_id);
