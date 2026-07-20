import { useEffect, useState } from 'react';
import type { StudentProfile } from '../App';
import { generateWeeklyPlan, loadActiveWeeklyPlan, saveWeeklyPlan, saveWeeklyProgress, type WeeklyPlanTask } from '../lib/aiWeeklyPlan';
import type { PageName } from './Dashboard';

type Props = { profile: StudentProfile; goTo: (page: PageName) => void };

export function WeeklyPlan({ profile, goTo }: Props) {
  const [tasks, setTasks] = useState<WeeklyPlanTask[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const icons: Record<PageName, string> = { path: '🧭', universities: '🎓', admission: '📄', language: '🌍', stories: '📖', reading: '📝', tests: '✓' };
  useEffect(() => { void loadActiveWeeklyPlan().then(plan => { setTasks(plan.tasks); setCompleted(plan.completed); }); }, []);

  async function toggleTask(index: number) {
    const next = completed.includes(index) ? completed.filter(item => item !== index) : [...completed, index];
    if (await saveWeeklyProgress(next)) setCompleted(next);
  }

  async function createPlan() {
    setLoading(true);
    setError('');
    try { const next = await generateWeeklyPlan(profile); if (await saveWeeklyPlan(next)) setTasks(next); else setError('Не получилось сохранить план'); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Не получилось составить план'); }
    finally { setLoading(false); }
  }

  return <section className="weekly-plan">
    <div className="weekly-heading"><div><p className="tag">AI-ПЛАН НА НЕДЕЛЮ</p><h2>{tasks.length ? 'Твои шаги к поступлению' : 'Составь свой персональный план'}</h2><p>{tasks.length ? 'Выполни эти шаги в течение недели. Следующий план будет уже на новую неделю.' : 'Помощник учтёт цель, страны, язык и удобный темп занятий.'}</p></div>{tasks.length ? <span className="ai-plan-ready">✓ План готов</span> : <button className="ai-plan-button" onClick={() => void createPlan()} disabled={loading}>{loading ? 'Составляю…' : 'Составить с AI ✦'}</button>}</div>
    {error && <p className="ai-plan-error" role="alert">{error}. Попробуй ещё раз чуть позже.</p>}
    {!tasks.length && <div className={loading ? 'ai-plan-empty loading' : 'ai-plan-empty'}><span>✦</span><div><b>{loading ? 'Собираем шаги именно для тебя…' : 'Здесь появятся задачи на неделю'}</b><p>{loading ? 'Это может занять несколько секунд.' : 'Никаких шаблонных заданий до нажатия — только сгенерированный план.'}</p></div></div>}
    {tasks.length > 0 && <><div className="weekly-progress"><span><i style={{ width: `${completed.length / tasks.length * 100}%` }} /></span><b>{completed.length} из {tasks.length} выполнено</b></div><div className="weekly-tasks ai-tasks">{tasks.map((task, index) => <article className={completed.includes(index) ? 'done' : ''} key={`${task.title}-${index}`}><button className="task-open" onClick={() => goTo(task.page)}><span>{icons[task.page]}</span><div><small>ДЕНЬ {index + 1}</small><b>{task.title}</b><p>{task.note}</p></div><strong>Открыть →</strong></button><button className="task-complete" onClick={() => void toggleTask(index)}>{completed.includes(index) ? '✓ Выполнено' : '○ Отметить'}</button></article>)}</div><p className="ai-plan-note">✦ План создан помощником и не заменяет официальные требования университетов.</p></>}
  </section>;
}
