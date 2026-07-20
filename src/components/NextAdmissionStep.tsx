import { useEffect, useState } from 'react';
import { loadDeadlines, loadTrackedUniversities, type Deadline, type TrackedUniversity } from '../lib/admissionTracker';
import type { PageName } from './Dashboard';
import type { StudentProfile } from '../App';
import { suggestNextStep } from '../lib/aiAdmission';

type Step = { eyebrow: string; title: string; description: string; result: string; button: string; page: PageName; urgent?: boolean };
const daysUntil = (date: string) => { const today = new Date(); today.setHours(0, 0, 0, 0); return Math.ceil((new Date(`${date}T00:00:00`).getTime() - today.getTime()) / 86_400_000); };

function getStep(universities: TrackedUniversity[], deadlines: Deadline[]): Step {
  if (!universities.length) return { eyebrow: 'Начни с выбора', title: 'Собери короткий список из 3 вузов', description: 'Сравни требования и сохрани только те варианты, в которые действительно готов подаваться.', result: 'В трекере появятся первые университеты', button: 'Выбрать университеты', page: 'universities' };
  const personal = deadlines.filter(item => !item.completed).map(item => ({ title: item.title, date: item.due_date }));
  const university = universities.filter(item => item.deadline).map(item => ({ title: item.university_name, date: item.deadline as string }));
  const nearest = [...personal, ...university].sort((a, b) => a.date.localeCompare(b.date))[0];
  if (!nearest) return { eyebrow: 'Следующий шаг', title: 'Добавь первый точный дедлайн', description: `В списке уже ${universities.length} ${universities.length === 1 ? 'вуз' : 'вуза'}, но без дат невозможно составить план подготовки.`, result: 'Ближайшая дата появится в календаре', button: 'Добавить дедлайн', page: 'admission' };
  const days = daysUntil(nearest.date);
  if (days <= 30) return { eyebrow: days < 0 ? 'Срок прошёл' : 'Ближайший дедлайн', title: nearest.title, description: days < 0 ? `Дата была ${Math.abs(days)} дн. назад. Проверь статус и обнови календарь.` : days === 0 ? 'Дедлайн сегодня. Проверь документы перед отправкой.' : `До дедлайна осталось ${days} дн. Проверь следующий незавершённый этап.`, result: 'Понятный план до ближайшей даты', button: 'Открыть поступление', page: 'admission', urgent: true };
  const unfinished = universities.find(item => !['submitted', 'accepted', 'declined'].includes(item.status));
  return unfinished ? { eyebrow: 'Фокус на сегодня', title: `Продвинь заявку в ${unfinished.university_name}`, description: 'Проверь требования программы и обнови статус после одного конкретного действия.', result: 'Одна заявка станет на шаг ближе к подаче', button: 'Открыть трекер', page: 'admission' } : { eyebrow: 'Всё под контролем', title: 'Проверь календарь поступления', description: 'Все сохранённые заявки уже поданы или завершены. Следи за ответами и новыми датами.', result: 'Ни один важный срок не потеряется', button: 'Открыть календарь', page: 'admission' };
}

export function NextAdmissionStep({ profile, goTo }: { profile: StudentProfile; goTo: (page: PageName) => void }) {
  const [universities, setUniversities] = useState<TrackedUniversity[]>([]); const [deadlines, setDeadlines] = useState<Deadline[]>([]); const [loaded, setLoaded] = useState(false);
  const [aiStep, setAiStep] = useState(''); const [aiBusy, setAiBusy] = useState(false); const [aiError, setAiError] = useState('');
  useEffect(() => { void Promise.all([loadTrackedUniversities(), loadDeadlines()]).then(([tracked, dates]) => { setUniversities(tracked); setDeadlines(dates); setLoaded(true); }); }, []);
  if (!loaded) return <section className="panel next-step-card"><p className="eyebrow">Следующий шаг</p><p className="empty-progress">Проверяем твой план поступления…</p></section>;
  const step = getStep(universities, deadlines);
  async function personalize() { setAiBusy(true); setAiError(''); try { setAiStep(await suggestNextStep(profile, `${step.title}. ${step.description}`)); } catch { setAiError('AI-помощник сейчас недоступен'); } finally { setAiBusy(false); } }
  return <section className={step.urgent ? 'panel next-step-card urgent' : 'panel next-step-card'}><div className="next-step-heading"><div><p className="eyebrow">{step.eyebrow}</p><h2>{step.title}</h2></div><span>{step.urgent ? 'Важно' : '1 действие'}</span></div><p className="next-step-description">{step.description}</p>{aiStep && <div className="ai-next-step"><span>✦</span><p>{aiStep}</p></div>}{aiError && <p className="ai-next-error">{aiError}. Базовый шаг остаётся актуальным.</p>}<div className="next-step-result"><span>✓</span><div><small>Результат</small><b>{step.result}</b></div></div><div className="next-step-actions"><button className="primary" onClick={() => goTo(step.page)}>{step.button} →</button><button className="ai-step-button" disabled={aiBusy} onClick={() => void personalize()}>{aiBusy ? 'Думаю…' : aiStep ? 'Обновить совет ✦' : 'Уточнить с AI ✦'}</button></div></section>;
}
