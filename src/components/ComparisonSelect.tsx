import { useMemo, useState } from 'react';
import type { University } from '../lib/universities';

type Props = { value: string; options: University[]; unavailable: string[]; onChange: (name: string) => void };

export function ComparisonSelect({ value, options, unavailable, onChange }: Props) {
  const [open, setOpen] = useState(false); const [query, setQuery] = useState('');
  const selected = options.find(item => item.name === value);
  const filtered = useMemo(() => options.filter(item => `${item.name} ${item.country}`.toLowerCase().includes(query.toLowerCase())), [options, query]);
  function choose(name: string) { onChange(name); setOpen(false); setQuery(''); }

  return <div className={open ? 'comparison-picker open' : 'comparison-picker'}>
    <button className="comparison-picker-trigger" type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
      {selected ? <span><b>{selected.name}</b><small>{selected.country} · {selected.cost}</small></span> : <span><b>Выбрать университет</b><small>Из сохранённого списка</small></span>}<i aria-hidden="true" />
    </button>
    {open && <div className="comparison-picker-menu">
      <label><span>⌕</span><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Найти университет…" /></label>
      <div>{filtered.map(item => { const disabled = unavailable.includes(item.name) && item.name !== value; return <button type="button" disabled={disabled} className={item.name === value ? 'active' : ''} onClick={() => choose(item.name)} key={item.name}><span><b>{item.name}</b><small>{item.city} · {item.country}</small></span>{item.name === value && <strong>✓</strong>}</button>; })}{filtered.length === 0 && <p>Ничего не найдено</p>}</div>
    </div>}
  </div>;
}
