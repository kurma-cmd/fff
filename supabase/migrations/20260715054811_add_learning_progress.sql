create table public.learning_streaks (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  streak_count integer not null default 1 check (streak_count > 0),
  last_active_date date not null default current_date,
  updated_at timestamptz not null default now()
);

alter table public.learning_streaks enable row level security;

create policy "read own learning streak"
  on public.learning_streaks for select using (auth.uid() = user_id);
create policy "insert own learning streak"
  on public.learning_streaks for insert with check (auth.uid() = user_id);
create policy "update own learning streak"
  on public.learning_streaks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.lesson_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "read own lesson progress"
  on public.lesson_progress for select using (auth.uid() = user_id);
create policy "insert own lesson progress"
  on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "delete own lesson progress"
  on public.lesson_progress for delete using (auth.uid() = user_id);
