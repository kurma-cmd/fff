import { useState } from 'react';
import type { Deadline, DeadlineType, TrackedUniversity } from '../lib/admissionTracker';
import { DeadlineTypePicker } from './DeadlineTypePicker';

const typeLabels: Record<DeadlineType, string> = { exam: 'Экзамен', document: 'Документы', scholarship: 'Грант', other: 'Другое' };
type Props = { deadlines: Deadline[]; universities: TrackedUniversity[]; onAdd: (title: string, type: DeadlineType, date: string) => void; onToggle: (item: Deadline) => void; onDelete: (id: string) => void };

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function DeadlineCalendar({ deadlines, universities, onAdd, onToggle, onDelete }: Props) {
  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [title, setTitle] = useState('');
  const [type, setType] = useState<DeadlineType>('exam');
  const [date, setDate] = useState('');
  const universityDates = universities.filter(item => item.deadline).map(item => ({ id: item.university_name, title: item.university_name, due_date: item.deadline as string }));
  const upcoming = [...deadlines.map(item => ({ ...item, source: 'custom' as const })), ...universityDates.map(item => ({ ...item, event_type: 'other' as DeadlineType, completed: false, source: 'university' as const }))].sort((a, b) => a.due_date.localeCompare(b.due_date));
  const firstOffset = (month.getDay() + 6) % 7;
  const daysCount = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: firstOffset + daysCount }, (_, index) => index < firstOffset ? null : index - firstOffset + 1);

  function selectDay(day: number) {
    setDate(dateKey(new Date(month.getFullYear(), month.getMonth(), day)));
  }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !date) return;
    onAdd(title.trim(), type, date);
    setTitle('');
  }

  return <section className="panel deadline-calendar">
    <div className="section-title"><div><p className="eyebrow">Календарь дедлайнов</p><h2>Важные даты</h2></div><span>{upcoming.filter(item => !item.completed).length} впереди</span></div>
    <div className="calendar-toolbar"><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Предыдущий месяц">←</button><strong>{month.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}</strong><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Следующий месяц">→</button></div>
    <div className="calendar-weekdays">{['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => <span key={day}>{day}</span>)}</div>
    <div className="calendar-grid">{cells.map((day, index) => day ? <button className={`${date === dateKey(new Date(month.getFullYear(), month.getMonth(), day)) ? 'selected' : ''} ${dateKey(today) === dateKey(new Date(month.getFullYear(), month.getMonth(), day)) ? 'today' : ''}`} onClick={() => selectDay(day)} key={day}><span>{day}</span>{upcoming.some(item => item.due_date === dateKey(new Date(month.getFullYear(), month.getMonth(), day))) && <i />}</button> : <span key={`empty-${index}`} />)}</div>
    <form className="calendar-event-form" onSubmit={submit}><p>{date ? `Событие на ${new Date(`${date}T00:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}` : 'Нажми на дату в календаре'}</p><input value={title} onChange={event => setTitle(event.target.value)} placeholder="Что будет в этот день?" maxLength={120} required disabled={!date} /><div><DeadlineTypePicker value={type} onChange={setType} /><button disabled={!date}>Добавить событие</button></div></form>
    <div className="deadline-list">{upcoming.map(item => <article className={item.completed ? 'deadline-done' : ''} key={`${item.source}-${item.id}`}><time dateTime={item.due_date}><b>{new Date(`${item.due_date}T00:00:00`).toLocaleDateString('ru-RU', { day: '2-digit' })}</b><small>{new Date(`${item.due_date}T00:00:00`).toLocaleDateString('ru-RU', { month: 'short' })}</small></time><div><span>{item.source === 'university' ? 'Дедлайн вуза' : typeLabels[item.event_type]}</span><h3>{item.title}</h3></div>{item.source === 'custom' && <><button className="deadline-check" onClick={() => onToggle(item)}>{item.completed ? '↶ Вернуть' : '✓ Готово'}</button><button className="deadline-delete" onClick={() => onDelete(item.id)} aria-label="Удалить">×</button></>}</article>)}</div>
  </section>;
}
