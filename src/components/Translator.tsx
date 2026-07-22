import { useState } from 'react';
import { languageCourses } from '../lib/languageCourses';
import { supabase } from '../lib/supabase';
import { QadamSelect } from './QadamSelect';

type Translation = { translation: string; note: string };

function parseTranslation(text: string): Translation | undefined {
  try {
    const value: unknown = JSON.parse(text.replace(/^```json\s*|\s*```$/g, ''));
    if (!value || typeof value !== 'object') return;
    const item = value as Record<string, unknown>;
    if (typeof item.translation !== 'string' || typeof item.note !== 'string') return;
    return { translation: item.translation, note: item.note };
  } catch {
    return;
  }
}

export function Translator() {
  const [fromId, setFromId] = useState('english');
  const [toId, setToId] = useState('russian');
  const [source, setSource] = useState('');
  const [result, setResult] = useState<Translation>();
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const from = languageCourses.find(item => item.id === fromId) ?? languageCourses[0];
  const to = languageCourses.find(item => item.id === toId) ?? languageCourses[0];

  function swapLanguages() {
    setFromId(toId);
    setToId(fromId);
    setSource(result?.translation ?? source);
    setResult(undefined);
    setMessage('');
  }

  async function translate(event: React.FormEvent) {
    event.preventDefault();
    if (!source.trim()) return;
    setBusy(true);
    setResult(undefined);
    setMessage('');
    const prompt = `Переведи текст с языка «${from.name}» на язык «${to.name}»: «${source.trim()}». Сохрани смысл и естественный стиль. Верни только JSON: {"translation":"перевод","note":"короткая полезная подсказка о значении или употреблении на русском"}.`;
    const { data, error } = await supabase.functions.invoke('ai', {
      body: { prompt, system: 'Ты точный переводчик и преподаватель языков. Не добавляй ничего вне JSON.' },
    });
    setBusy(false);
    if (error || typeof data?.text !== 'string') {
      setMessage('Переводчик пока не ответил. Попробуй ещё раз.');
      return;
    }
    const parsed = parseTranslation(data.text);
    if (parsed) setResult(parsed);
    else setMessage('Не удалось прочитать перевод. Попробуй ещё раз.');
  }

  return <section className="panel translator">
    <div className="section-title"><div><p className="eyebrow">Быстрый помощник</p><h2>Переводчик</h2></div></div>
    <div className="translator-languages">
      <QadamSelect value={fromId} onChange={setFromId} ariaLabel="Исходный язык" options={languageCourses.map(language => ({ value: language.id, label: language.name, icon: language.flag }))} />
      <button type="button" onClick={swapLanguages} aria-label="Поменять языки местами">⇄</button>
      <QadamSelect value={toId} onChange={setToId} ariaLabel="Язык перевода" options={languageCourses.map(language => ({ value: language.id, label: language.name, icon: language.flag }))} />
    </div>
    <form className="translator-form" onSubmit={translate}>
      <textarea value={source} onChange={event => setSource(event.target.value)} placeholder="Напиши слово, предложение или небольшой текст" maxLength={1500} required />
      <button className="primary" disabled={busy}>{busy ? 'Переводим…' : 'Перевести →'}</button>
    </form>
    {result && <div className="translation-result"><b>{result.translation}</b><p>{result.note}</p><button type="button" onClick={() => speechSynthesis.speak(new SpeechSynthesisUtterance(result.translation))}>🔊 Послушать перевод</button></div>}
    {message && <p className="word-feedback">{message}</p>}
  </section>;
}
