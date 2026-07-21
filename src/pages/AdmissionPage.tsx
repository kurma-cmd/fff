import { useEffect, useState } from 'react';
import type { StudentProfile } from '../App';
import { ApplicationTracker } from '../components/ApplicationTracker';
import { DeadlineCalendar } from '../components/DeadlineCalendar';
import { ResumeCard } from '../components/ResumeCard';
import { addDeadline, deleteDeadline, loadDeadlines, loadTrackedUniversities, toggleDeadline, updateTrackedUniversity, type Deadline, type DeadlineType, type TrackedUniversity } from '../lib/admissionTracker';

type Props = { profile: StudentProfile; onProfileChange: (profile: StudentProfile) => void; onOpenCatalog: () => void };

export function AdmissionPage({ profile, onProfileChange, onOpenCatalog }: Props) {
  const [tab, setTab] = useState<'applications' | 'deadlines'>('applications');
  const [universities, setUniversities] = useState<TrackedUniversity[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  useEffect(() => { void loadTrackedUniversities().then(setUniversities); void loadDeadlines().then(setDeadlines); }, []);
  async function changeUniversity(name: string, values: Partial<Pick<TrackedUniversity, 'status' | 'deadline' | 'intended_program'>>) { if (await updateTrackedUniversity(name, values)) setUniversities(current => current.map(item => item.university_name === name ? { ...item, ...values } : item)); }
  async function createDeadline(title: string, type: DeadlineType, date: string) { const item = await addDeadline(title, type, date); if (item) setDeadlines(current => [...current, item]); }
  async function changeDeadline(item: Deadline) { if (await toggleDeadline(item.id, !item.completed)) setDeadlines(current => current.map(value => value.id === item.id ? { ...value, completed: !value.completed } : value)); }
  async function removeDeadline(id: string) { if (await deleteDeadline(id)) setDeadlines(current => current.filter(item => item.id !== id)); }
  return <div className="page-shell admission-page">
    <header className="page-hero"><p className="eyebrow">Всё в одном месте</p><h1>Моё поступление</h1><p>Собирай документы, следи за заявками и дедлайнами.</p></header>
    <ResumeCard profile={profile} onChange={onProfileChange} />
    <div className="admission-tabs"><button className={tab === 'applications' ? 'active' : ''} onClick={() => setTab('applications')}><b>Заявки</b><small>{universities.length} вузов</small></button><button className={tab === 'deadlines' ? 'active' : ''} onClick={() => setTab('deadlines')}><b>Дедлайны</b><small>{deadlines.filter(item => !item.completed).length} впереди</small></button></div>
    <div className="admission-single">{tab === 'applications' ? <ApplicationTracker items={universities} onChange={(name, values) => void changeUniversity(name, values)} onOpenCatalog={onOpenCatalog} /> : <DeadlineCalendar deadlines={deadlines} universities={universities} onAdd={(title, type, date) => void createDeadline(title, type, date)} onToggle={item => void changeDeadline(item)} onDelete={id => void removeDeadline(id)} />}</div>
  </div>;
}
