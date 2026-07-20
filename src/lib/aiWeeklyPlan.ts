import type { StudentProfile } from '../App';
import type { PageName } from '../components/Dashboard';
import { supabase } from './supabase';

export type WeeklyPlanTask = {
  title: string;
  note: string;
  page: PageName;
};

const allowedPages = new Set<PageName>([
  'path', 'universities', 'admission', 'language', 'stories', 'reading', 'tests',
]);

function parseTasks(text: string): WeeklyPlanTask[] {
  const json = text.match(/\[[\s\S]*\]/)?.[0];
  if (!json) throw new Error('ИИ вернул план в непонятном формате');

  const value: unknown = JSON.parse(json);
  if (!Array.isArray(value)) throw new Error('План должен быть списком');

  const tasks = value.filter((task): task is WeeklyPlanTask => {
    if (!task || typeof task !== 'object') return false;
    const item = task as Record<string, unknown>;
    return typeof item.title === 'string'
      && typeof item.note === 'string'
      && typeof item.page === 'string'
      && allowedPages.has(item.page as PageName);
  }).slice(0, 5);

  if (tasks.length < 3) throw new Error('Не получилось составить полный план');
  return tasks;
}

function isTasks(value: unknown): value is WeeklyPlanTask[] {
  return Array.isArray(value) && value.every(task => task && typeof task === 'object'
    && typeof (task as WeeklyPlanTask).title === 'string'
    && typeof (task as WeeklyPlanTask).note === 'string'
    && allowedPages.has((task as WeeklyPlanTask).page));
}

export async function loadActiveWeeklyPlan() {
  const { data } = await supabase.from('weekly_ai_plans').select('tasks,expires_at,completed_indices').maybeSingle();
  if (!data || new Date(data.expires_at).getTime() <= Date.now() || !isTasks(data.tasks)) return { tasks: [], completed: [] };
  return { tasks: data.tasks.slice(0, 5), completed: Array.isArray(data.completed_indices) ? data.completed_indices : [] };
}

export async function saveWeeklyProgress(completed: number[]) {
  return !(await supabase.from('weekly_ai_plans').update({ completed_indices: completed }).gt('expires_at', new Date().toISOString())).error;
}

export async function saveWeeklyPlan(tasks: WeeklyPlanTask[]) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return false;
  const expiresAt = new Date(Date.now() + 7 * 86_400_000).toISOString();
  const { error } = await supabase.from('weekly_ai_plans').upsert({ user_id: auth.user.id, tasks, created_at: new Date().toISOString(), expires_at: expiresAt });
  return !error;
}

export async function generateWeeklyPlan(profile: StudentProfile) {
  const { data, error } = await supabase.functions.invoke('ai', {
    body: {
      system: 'Ты спокойный наставник школьника по поступлению. Давай конкретные, реалистичные и короткие действия. Не выдумывай дедлайны, цены и требования вузов.',
      prompt: `Составь план на ближайшие 7 дней для ученика. Профиль: ${JSON.stringify(profile)}.
Верни только JSON-массив из 5 объектов: {"title":"до 55 символов","note":"одно конкретное действие и ожидаемый результат, до 110 символов","page":"раздел"}.
Раздел строго один из: universities, admission, language, stories, reading, tests. Учитывай темп ученика и сбалансируй поступление с языком.`,
    },
  });

  if (error) throw new Error('AI-помощник сейчас недоступен');
  if (!data || typeof data.text !== 'string') throw new Error('AI-помощник не вернул план');
  return parseTasks(data.text);
}
