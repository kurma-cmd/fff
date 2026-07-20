create table public.student_profiles (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  profile jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.student_profiles enable row level security;
create policy "read own profile" on public.student_profiles for select using (auth.uid() = user_id);
create policy "insert own profile" on public.student_profiles for insert with check (auth.uid() = user_id);
create policy "update own profile" on public.student_profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.learning_stats (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  xp integer not null default 0 check (xp >= 0),
  updated_at timestamptz not null default now()
);
alter table public.learning_stats enable row level security;
create policy "read own stats" on public.learning_stats for select using (auth.uid() = user_id);
create policy "insert own stats" on public.learning_stats for insert with check (auth.uid() = user_id);
create policy "update own stats" on public.learning_stats for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.saved_universities (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  university_name text not null,
  saved_at timestamptz not null default now(),
  primary key (user_id, university_name)
);
alter table public.saved_universities enable row level security;
create policy "read own saved universities" on public.saved_universities for select using (auth.uid() = user_id);
create policy "insert own saved universities" on public.saved_universities for insert with check (auth.uid() = user_id);
create policy "delete own saved universities" on public.saved_universities for delete using (auth.uid() = user_id);

create table public.language_levels (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  course_id text not null,
  level text not null check (level in ('A1','A2','B1','B2','C1','C2')),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);
alter table public.language_levels enable row level security;
create policy "read own language levels" on public.language_levels for select using (auth.uid() = user_id);
create policy "insert own language levels" on public.language_levels for insert with check (auth.uid() = user_id);
create policy "update own language levels" on public.language_levels for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
