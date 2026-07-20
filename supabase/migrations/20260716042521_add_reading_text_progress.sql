alter table public.story_progress
  add column content_type text not null default 'story'
  check (content_type in ('story', 'text'));
