import { useMemo, useState } from 'react';
import type { WritingSystem } from '../lib/writingSystems';

type Props = { system: WritingSystem; completed: boolean; onComplete: () => void };

export function WritingSystemLesson({ system, completed, onComplete }: Props) {
  const [open, setOpen] = useState(!completed);
  const [answer, setAnswer] = useState('');
  const target = system.symbols[1];
  const options = useMemo(() => [target.sound, system.symbols[3].sound, system.symbols[4].sound], [system, target]);
  if (!open) return <button className="script-summary" onClick={() => setOpen(true)}><span>{completed ? '✓' : '文'}</span><div><b>{system.title}</b><small>{completed ? 'Основы пройдены · повторить' : 'Начать с письменности'}</small></div><strong>Открыть →</strong></button>;
  return <section className="script-lesson"><div className="section-title"><div><p className="eyebrow">Шаг 0 · письменность</p><h2>{system.title}</h2></div><button className="text-button" onClick={() => setOpen(false)}>Свернуть</button></div><p>{system.description}</p><div className="symbol-grid">{system.symbols.map(item => <button key={item.symbol} onClick={() => speechSynthesis.speak(new SpeechSynthesisUtterance(item.example.split(' — ')[0]))}><b>{item.symbol}</b><span>{item.sound}</span><small>{item.example}</small></button>)}</div><div className="script-quiz"><b>Как читается символ «{target.symbol}»?</b><div>{options.map(option => <button className={answer === option ? 'selected' : ''} key={option} onClick={() => setAnswer(option)}>{option}</button>)}</div>{answer && (answer === target.sound ? <button className="primary" onClick={onComplete}>Верно! Завершить азбуку →</button> : <p>Попробуй ещё раз — нажми на символ выше и послушай.</p>)}</div></section>;
}
