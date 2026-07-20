import { supabase } from './supabase';

const localDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const dayDifference = (first: string, second: string) => {
  const start = new Date(`${first}T00:00:00`).getTime();
  const end = new Date(`${second}T00:00:00`).getTime();
  return Math.round((end - start) / 86_400_000);
};

export async function recordDailyActivity() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return 0;
  const { data } = await supabase.from('learning_streaks').select('streak_count,last_active_date').maybeSingle();
  const today = localDate();
  if (data?.last_active_date === today) return data.streak_count;
  const streak = data && dayDifference(data.last_active_date, today) === 1 ? data.streak_count + 1 : 1;
  const { error } = await supabase.from('learning_streaks').upsert({ user_id: userData.user.id, streak_count: streak, last_active_date: today, updated_at: new Date().toISOString() });
  return error ? 0 : streak;
}

export async function loadCompletedLessons() {
  const { data } = await supabase.from('lesson_progress').select('course_id,lesson_id');
  return (data ?? []).map(item => `${item.course_id}-${item.lesson_id}`);
}

export async function completeLesson(courseId: string, lessonId: string) {
  const { error } = await supabase.from('lesson_progress').upsert({ course_id: courseId, lesson_id: lessonId });
  return !error;
}
