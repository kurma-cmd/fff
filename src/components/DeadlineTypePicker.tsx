import { useState } from 'react';
import type { DeadlineType } from '../lib/admissionTracker';

const options: { value: DeadlineType; label: string; icon: string }[] = [
  { value: 'exam', label: 'Экзамен', icon: '✎' }, { value: 'document', label: 'Документы', icon: '▤' },
  { value: 'scholarship', label: 'Грант', icon: '★' }, { value: 'other', label: 'Другое', icon: '•' },
];

export function DeadlineTypePicker({ value, onChange }: { value: DeadlineType; onChange: (value: DeadlineType) => void }) {
  const [open, setOpen] = useState(false); const selected = options.find(item => item.value === value) ?? options[0];
  return <div className={open ? 'deadline-type-picker open' : 'deadline-type-picker'}>
    <button type="button" className="deadline-type-trigger" onClick={() => setOpen(current => !current)}><span><i>{selected.icon}</i>{selected.label}</span><b aria-hidden="true" /></button>
    {open && <div className="deadline-type-menu">{options.map(item => <button type="button" className={item.value === value ? 'active' : ''} onClick={() => { onChange(item.value); setOpen(false); }} key={item.value}><i>{item.icon}</i><span>{item.label}</span>{item.value === value && <b>✓</b>}</button>)}</div>}
  </div>;
}
