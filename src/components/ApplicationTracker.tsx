import type { ApplicationStatus, TrackedUniversity } from '../lib/admissionTracker';
import { QadamDatePicker } from './QadamDatePicker';
import { QadamSelect } from './QadamSelect';
import { universityCatalog } from '../lib/universityCatalog';


const statuses: { value: ApplicationStatus; label: string }[] = [
  { value: 'researching', label: 'Изучаю' }, { value: 'documents', label: 'Готовлю документы' },
  { value: 'ready', label: 'Готов к подаче' }, { value: 'submitted', label: 'Заявка подана' },
  { value: 'accepted', label: 'Поступил' }, { value: 'declined', label: 'Отказ' },
];
type Props = { items: TrackedUniversity[]; onChange: (name: string, values: Partial<Pick<TrackedUniversity, 'status' | 'deadline' | 'intended_program'>>) => void; onOpenCatalog: () => void };

export function ApplicationTracker({ items, onChange, onOpenCatalog }: Props) {
  return <section className="panel application-tracker"><div className="section-title"><div><p className="eyebrow">Трекер поступления</p><h2>Мои университеты</h2></div><span>{items.length} в списке</span></div>
    {items.length === 0 ? <div className="tracker-empty"><span>🎓</span><div><b>Список пока пуст</b><p>Сохрани университет в каталоге — он автоматически появится здесь.</p></div><button onClick={onOpenCatalog}>Выбрать вузы →</button></div> : <div className="tracker-table"><div className="tracker-head"><span>Университет</span><span>Статус</span><span>Дедлайн</span></div>{items.map(item => { const university = universityCatalog.find(value => value.name === item.university_name); const programs = university?.directions ?? []; return <div className="tracker-row" key={item.university_name}><div className="tracker-university"><b>{item.university_name}</b><QadamSelect compact value={item.intended_program ?? ''} options={[{ value: '', label: 'Выбрать направление' }, ...programs.map(value => ({ value, label: value }))]} onChange={intended_program => onChange(item.university_name, { intended_program: intended_program || null })} /></div><div className="tracker-field"><span>Статус заявки</span><QadamSelect compact value={item.status} options={statuses} onChange={value => onChange(item.university_name, { status: value as ApplicationStatus })} /></div><div className="tracker-field"><span>Дедлайн вуза</span><QadamDatePicker value={item.deadline ?? ''} onChange={deadline => onChange(item.university_name, { deadline })} /></div></div>; })}</div>}
  </section>;
}

