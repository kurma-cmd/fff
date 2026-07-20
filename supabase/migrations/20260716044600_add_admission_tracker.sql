alter table public.saved_universities
  add column status text not null default 'researching'
    check (status in ('researching', 'documents', 'ready', 'submitted', 'accepted', 'declined')),
  add column deadline date;

create policy "update own saved universities"
  on public.saved_universities for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table public.admission_deadlines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  event_type text not null check (event_type in ('exam', 'document', 'scholarship', 'other')),
  due_date date not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.admission_deadlines enable row level security;
create policy "read own admission deadlines" on public.admission_deadlines for select using (auth.uid() = user_id);
create policy "insert own admission deadlines" on public.admission_deadlines for insert with check (auth.uid() = user_id);
create policy "update own admission deadlines" on public.admission_deadlines for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own admission deadlines" on public.admission_deadlines for delete using (auth.uid() = user_id);
