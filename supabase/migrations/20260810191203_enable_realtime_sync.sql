-- Supabase Realtime respects the existing RLS policies on these user-owned tables.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'student_profiles',
    'learning_stats',
    'saved_universities',
    'language_levels',
    'learning_streaks',
    'lesson_progress',
    'exercise_attempts',
    'story_progress',
    'reading_text_progress',
    'admission_deadlines',
    'weekly_ai_plans'
  ] loop
    if to_regclass(format('public.%I', table_name)) is not null
      and not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = table_name
    ) then
      execute format('alter publication supabase_realtime add table public.%I', table_name);
    end if;
  end loop;
end
$$;
