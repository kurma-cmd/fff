alter table public.weekly_ai_plans
  add column completed_indices integer[] not null default '{}';

alter table public.saved_universities
  add column intended_program text;
