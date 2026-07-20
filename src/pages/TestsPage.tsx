import { useEffect, useState } from 'react';
import { loadCompletedLessons } from '../lib/learningProgress';

const questions = [
  ['Choose the correct sentence.', 'She has finished her project.', 'She have finished her project.'],
  ['What does “deadline” mean?', 'The final time to finish something', 'A free day'],
  ['Complete: If I had more time, I ___ another course.', 'would take', 'will took'],
  ['Choose the natural phrase.', 'I am looking forward to studying abroad.', 'I am looking forward study abroad.'],
  ['What is the main purpose of a scholarship?', 'To support education costs', 'To choose a dormitory'],
  ['Complete: The application ___ yesterday.', 'was submitted', 'submitted was'],
  ['Choose the best connector: ___ it was difficult, she continued.', 'Although', 'Because of'],
  ['What does “reliable source” mean?', 'Information that can be trusted', 'A very short text'],
  ['Complete: He has studied English ___ three years.', 'for', 'since'],
  ['Choose the formal request.', 'Could you please clarify the requirement?', 'Tell me this now.'],
];

export function TestsPage() {
  const [lessonCount, setLessonCount] = useState(0); const [current, setCurrent] = useState(0); const [score, setScore] = useState(0); const [finished, setFinished] = useState(false);
  useEffect(() => { void loadCompletedLessons().then(items => setLessonCount(items.filter(item => item.startsWith('english-') && !item.endsWith('-script')).length)); }, []);
  const unlocked = lessonCount >= 12; const question = questions[current];
  function answer(option: string) { const nextScore = score + Number(option === question[1]); if (current + 1 === questions.length) { setScore(nextScore); setFinished(true); } else { setScore(nextScore); setCurrent(current + 1); } }
  if (!unlocked) return <div className="page-shell"><header className="page-hero"><p className="eyebrow">Проверка знаний</p><h1>Тесты</h1><p>Контрольная открывается после учебного блока, а не раньше.</p></header><section className="panel test-locked"><span>🔒</span><h2>Сначала заверши 12 уроков английского</h2><p>Пройдено {lessonCount} из 12. Осталось {Math.max(0, 12 - lessonCount)}.</p><i><b style={{ width: `${Math.min(100, lessonCount / 12 * 100)}%` }} /></i></section></div>;
  if (finished) { const percent = score * 10; const passed = percent >= 65; return <div className="page-shell"><section className="panel test-result"><span>{passed ? '🎓' : '📚'}</span><p className="eyebrow">Результат теста</p><h1>{percent}%</h1><h2>{passed ? 'Тест пройден' : 'Нужно ещё немного повторить'}</h2><p>Для прохождения необходимо набрать не меньше 65%.</p><button className="primary" onClick={() => { setCurrent(0); setScore(0); setFinished(false); }}>Пройти ещё раз</button></section></div>; }
  return <main className="lesson-session"><header className="lesson-topbar"><span>Тест после 12 уроков</span><div className="lesson-progress"><i style={{ width: `${current / questions.length * 100}%` }} /></div><b>{current + 1}/{questions.length}</b></header><section className="exercise-card"><p className="eyebrow">Английский · итоговая проверка</p><h1>{question[0]}</h1><div className="exercise-options">{question.slice(1).map((option, index) => <button key={option} onClick={() => answer(option)}><span>{index + 1}</span>{option}</button>)}</div></section></main>;
}
