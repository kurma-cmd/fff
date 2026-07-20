import { useMemo, useState } from 'react';
import type { StudentProfile } from '../App';
import { compareUniversities } from '../lib/aiAdmission';
import { universityCatalog } from '../lib/universityCatalog';
import { ComparisonSelect } from './ComparisonSelect';

export function UniversityComparison({ profile, saved }: { profile: StudentProfile; saved: Set<string> }) {
  const options = useMemo(() => universityCatalog.filter(item => saved.has(item.name)), [saved]);
  const [selected, setSelected] = useState(['', '']);
  const [expanded, setExpanded] = useState(false);
  const [result, setResult] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  if (options.length < 2) return null;

  const chosen = selected.filter(Boolean);
  function choose(index: number, name: string) {
    setSelected(current => current.map((item, itemIndex) => itemIndex === index ? name : item));
    setResult(''); setError('');
  }
  async function compare() {
    setBusy(true); setError(''); setResult('');
    try { setResult(await compareUniversities(profile, options.filter(item => chosen.includes(item.name)))); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Не получилось сравнить'); }
    finally { setBusy(false); }
  }

  if (!expanded) return <button className="comparison-invite" onClick={() => setExpanded(true)}><span>✦</span><div><p className="eyebrow">AI-СРАВНЕНИЕ</p><b>Сравнить сохранённые вузы</b><small>{options.length} вариантов в твоём списке</small></div><strong>Открыть →</strong></button>;
  return <section className="university-comparison"><div className="comparison-heading"><div><p className="eyebrow">AI-СРАВНЕНИЕ</p><h2>Сравни сохранённые вузы</h2><p>Выбери два варианта и при желании добавь третий.</p></div><button className="comparison-close" onClick={() => setExpanded(false)}>Свернуть ↑</button></div>
    <div className="comparison-selects">{selected.map((value, index) => <div className="comparison-field" key={index}><span>{index + 1}{index === 2 ? ' · необязательно' : ''}</span><ComparisonSelect value={value} options={options} unavailable={chosen} onChange={name => choose(index, name)} /></div>)}</div>
    <div className="comparison-controls">{selected.length === 2 && <button className="comparison-third" onClick={() => setSelected(current => [...current, ''])}>+ Добавить третий вуз</button>}{selected.length === 3 && <button className="comparison-third" onClick={() => { setSelected(current => current.slice(0, 2)); setResult(''); }}>Убрать третий</button>}<button className="comparison-action" disabled={chosen.length < 2 || busy} onClick={() => void compare()}>{busy ? 'Сравниваю…' : `Сравнить ${chosen.length || ''} с AI →`}</button></div>
    {error && <p className="comparison-error">{error}. Попробуй позже.</p>}{result && <div className="comparison-result"><b>Вывод помощника</b><p>{result}</p><small>Проверь точные условия на официальных сайтах вузов.</small></div>}
  </section>;
}
