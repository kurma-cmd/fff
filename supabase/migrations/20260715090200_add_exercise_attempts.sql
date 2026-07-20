create table public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  course_id text not null,
  skill text not null,
  instruction text not null,
  phrase text not null,
  options jsonb not null,
  chosen_answer text not null,
  correct_answer text not null,
  is_correct boolean not null,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.exercise_attempts enable row level security;
create policy "read own attempts" on public.exercise_attempts for select using (auth.uid() = user_id);
create policy "insert own attempts" on public.exercise_attempts for insert with check (auth.uid() = user_id);
create policy "update own attempts" on public.exercise_attempts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
grant select, insert, update on public.exercise_attempts to authenticated;
