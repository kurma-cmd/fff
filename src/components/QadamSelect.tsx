import { useState } from 'react';

export type SelectOption = { value: string; label: string; note?: string; icon?: string };
type Props = { value: string; options: SelectOption[]; onChange: (value: string) => void; ariaLabel?: string; compact?: boolean };

export function QadamSelect({ value, options, onChange, ariaLabel, compact = false }: Props) {
  const [open, setOpen] = useState(false); const selected = options.find(item => item.value === value) ?? options[0];
  return <div className={`qadam-select ${compact ? 'compact' : ''} ${open ? 'open' : ''}`} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button type="button" className="qadam-select-trigger" onClick={() => setOpen(current => !current)} aria-label={ariaLabel} aria-expanded={open}>{selected?.icon && <span className="select-icon" aria-hidden="true">{selected.icon}</span>}<span className="select-copy"><b>{selected?.label}</b>{selected?.note && <small>{selected.note}</small>}</span><i aria-hidden="true" /></button>
    {open && <div className="qadam-select-menu">{options.map(item => <button type="button" className={item.value === value ? 'active' : ''} onClick={() => { onChange(item.value); setOpen(false); }} key={item.value}>{item.icon && <span className="select-icon" aria-hidden="true">{item.icon}</span>}<span className="select-copy"><b>{item.label}</b>{item.note && <small>{item.note}</small>}</span><strong className="select-check" aria-hidden="true">{item.value === value ? '✓' : ''}</strong></button>)}</div>}
  </div>;
}
