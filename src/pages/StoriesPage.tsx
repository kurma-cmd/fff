import { useEffect, useState } from 'react';
import { StoryReader } from '../components/StoryReader';
import { QadamSelect } from '../components/QadamSelect';

import { roleModels, type RoleModel } from '../lib/roleModels';
import { loadCompletedStories } from '../lib/storyProgress';
import type { StoryLanguage } from '../lib/storyTranslation';

const fields = ['Все', 'Технологии', 'Бизнес', 'Медицина', 'Наука', 'Творчество'];
const icons: Record<string, string> = { Технологии: '💻', Бизнес: '💡', Медицина: '🩺', Наука: '🔬', Творчество: '🎨' };

export function StoriesPage() {
  const [field, setField] = useState('Все');
  const [selected, setSelected] = useState<RoleModel>();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [language, setLanguage] = useState<StoryLanguage>('Русский');
  useEffect(() => { void loadCompletedStories().then(setCompleted); }, []);
  const people = field === 'Все' ? roleModels : roleModels.filter(person => person.field === field);
  const markComplete = (name: string) => setCompleted(current => new Set(current).add(name));

  if (selected) return <StoryReader person={selected} language={language} onBack={() => setSelected(undefined)} onComplete={markComplete} />;
  return <div className="page-shell"><header className="page-hero"><p className="eyebrow">20 реальных историй</p><h1>Люди, которые меняли свои сферы</h1><p>Прочитай историю, закончи проверку понимания — и здесь появится галочка.</p></header><section className="story-language panel"><label htmlFor="story-language"><span>Язык историй</span><b>На каком языке хочешь читать?</b></label><QadamSelect value={language} onChange={value => setLanguage(value as StoryLanguage)} ariaLabel="Язык историй" options={["Русский", "Қазақша", "English"].map(value => ({ value, label: value }))} /></section><div className="filter-row">{fields.map(item => <button className={field === item ? 'filter-active' : ''} key={item} onClick={() => setField(item)}>{item}</button>)}</div><div className="story-grid">{people.map(person => <button className={completed.has(person.name) ? 'story-read' : ''} key={person.name} onClick={() => setSelected(person)}><span>{completed.has(person.name) ? '✓' : icons[person.field]}</span><small>{person.country} · {person.years}</small><h2>{person.name}</h2><p>{person.achievement}</p><b>{completed.has(person.name) ? 'Прочитано' : 'Читать историю →'}</b></button>)}</div></div>;
}

