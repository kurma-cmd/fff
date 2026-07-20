import { useMemo, useState } from 'react';
import { countryCourses, languageCourses } from '../lib/languageCourses';
import { supabase } from '../lib/supabase';
import { QadamSelect } from './QadamSelect';


type WordInsight = { meaning: string; example: string; usage: string; partOfSpeech: string };
const isInsight = (value: unknown): value is WordInsight => { if (!value || typeof value !== 'object') return false; const item = value as Record<string, unknown>; return ['meaning', 'example', 'usage', 'partOfSpeech'].every(key => typeof item[key] === 'string'); };
const cleanJson = (text: string) => text.replace(/^```json\s*|\s*```$/g, '');

export function WordExplorer({ countries }: { countries: string[] }) {
  const courses = useMemo(() => { const ids = new Set(['english', ...countries.flatMap(country => countryCourses[country] ?? [])]); return languageCourses.filter(course => ids.has(course.id)); }, [countries]);
  const [courseId, setCourseId] = useState('english');
  const [word, setWord] = useState('');
  const [insight, setInsight] = useState<WordInsight>();
  const [ownExample, setOwnExample] = useState('');
  const [feedback, setFeedback] = useState('');
  const [busy, setBusy] = useState(false);
  const course = languageCourses.find(item => item.id === courseId) ?? languageCourses[0];

  async function explore(event: React.FormEvent) {
    event.preventDefault(); if (!word.trim()) return; setBusy(true); setInsight(undefined); setFeedback(''); setOwnExample('');
    const prompt = `Разбери слово или короткое выражение «${word.trim()}» на языке «${course.name}» для школьника. Не давай перевод на русский. Объясни смысл простыми словами через ситуацию и контекст полностью на языке «${course.name}». Пример, объяснение употребления и часть речи тоже напиши только на языке «${course.name}». Верни только JSON: {"meaning":"объяснение смысла на изучаемом языке","example":"пример на изучаемом языке","usage":"когда и как употреблять на изучаемом языке","partOfSpeech":"часть речи на изучаемом языке"}.`;
    const { data, error } = await supabase.functions.invoke('ai', { body: { prompt, system: 'Ты доброжелательный преподаватель языка. Учи через смысл, контекст и активное использование.' } });
    setBusy(false); if (error || typeof data?.text !== 'string') { setFeedback('Не удалось разобрать слово. Попробуй ещё раз.'); return; }
    try { const parsed: unknown = JSON.parse(cleanJson(data.text)); if (isInsight(parsed)) setInsight(parsed); else setFeedback('Ответ получился неполным. Попробуй другое слово.'); } catch { setFeedback('Не удалось прочитать разбор. Попробуй ещё раз.'); }
  }

  async function checkExample(event: React.FormEvent) {
    event.preventDefault(); if (!insight || !ownExample.trim()) return; setBusy(true); setFeedback('');
    const prompt = `Ученик изучает «${word}» (${insight.meaning}) на языке ${course.name} и написал: «${ownExample.trim()}». Проверь, правильно ли слово употреблено. Ответь на русском в 2 коротких предложениях: сначала что получилось, затем одно точное исправление или более естественный вариант. Не переписывай всё без необходимости.`;
    const { data, error } = await supabase.functions.invoke('ai', { body: { prompt, system: 'Ты поддерживающий преподаватель. Исправляй конкретно и без оценочных ярлыков.' } });
    setBusy(false); setFeedback(error || typeof data?.text !== 'string' ? 'Не удалось проверить пример. Попробуй ещё раз.' : data.text);
  }

  return <section className="panel word-explorer"><div className="section-title"><div><p className="eyebrow">Запоминай через контекст</p><h2>Разбор нового слова</h2></div><QadamSelect compact value={courseId} onChange={value => { setCourseId(value); setInsight(undefined); setFeedback(''); }} options={courses.map(item => ({ value: item.id, label: `${item.flag} ${item.name}` }))} /></div><p className="language-note">Здесь нет готового перевода. Сначала пойми смысл, затем используй слово в собственном предложении.</p><form className="word-search" onSubmit={explore}><input value={word} onChange={event => setWord(event.target.value)} placeholder={`Напиши слово на языке: ${course.name}`} /><button disabled={busy}>{busy ? 'Разбираем…' : 'Понять слово →'}</button></form>{insight && <div className="word-insight"><div className="word-title"><div><small>{insight.partOfSpeech}</small><h3>{word}</h3></div><button onClick={() => speechSynthesis.speak(new SpeechSynthesisUtterance(word))}>🔊 Слово</button></div><article><b>Что оно означает</b><p>{insight.meaning}</p></article><button className="context-example" onClick={() => speechSynthesis.speak(new SpeechSynthesisUtterance(insight.example))}><span>💬</span><div><b>Пример в контексте</b><p>{insight.example}</p><small>🔊 Нажми, чтобы услышать</small></div></button><article><b>Когда употреблять</b><p>{insight.usage}</p></article><form className="own-example" onSubmit={checkExample}><label><b>Теперь придумай свой пример</b><span>Так слово закрепится в памяти намного лучше.</span><textarea value={ownExample} onChange={event => setOwnExample(event.target.value)} placeholder={`Напиши предложение со словом «${word}»`} required /></label><button className="primary" disabled={busy}>Проверить мой пример</button></form></div>}{feedback && <p className="word-feedback">{feedback}</p>}</section>;
}

