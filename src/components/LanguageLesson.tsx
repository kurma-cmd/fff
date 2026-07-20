import { useEffect, useState } from 'react';
import { generateLanguageLesson, type LessonExercise } from '../lib/languageLessons';
import { recordExerciseAttempt } from '../lib/learningAnalytics';

type Props = { courseId: string; language: string; level: string; title: string; words: [string, string][]; onBack: () => void; onComplete: () => void };

export function LanguageLesson({ courseId, language, level, title, words, onBack, onComplete }: Props) {
  const [exercises, setExercises] = useState<LessonExercise[]>();
  const [current, setCurrent] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => { void generateLanguageLesson(language, level, title, words).then(setExercises); }, [language, level, title, words]);
  if (!exercises) return <main className="lesson-session"><div className="lesson-session-loading"><span>✨</span><h2>Создаём урок уровня {level}</h2><p>Подбираем задания по теме «{title}»…</p></div></main>;
  if (hearts === 0) return <main className="lesson-session"><section className="lesson-finish"><span>💪</span><p className="eyebrow">Попытка закончилась</p><h1>Ошибки помогают учиться</h1><p className="auth-lead">Повтори урок — задания уже знакомы, и теперь получится лучше.</p><button className="primary" onClick={() => { setCurrent(0); setHearts(3); setAnswer(''); setChecked(false); setCorrectCount(0); }}>Попробовать ещё раз</button><button className="auth-switch" onClick={onBack}>Вернуться к дорожке</button></section></main>;
  if (current === exercises.length) return <main className="lesson-session"><section className="lesson-finish"><span>🏆</span><p className="eyebrow">Урок завершён</p><h1>Отличная работа!</h1><div className="lesson-rewards"><div><b>{correctCount}/5</b><small>верных ответов</small></div><div><b>{hearts}/3</b><small>жизней осталось</small></div></div><button className="primary" onClick={onComplete}>Продолжить путь →</button></section></main>;

  const exercise = exercises[current];
  const isCorrect = answer === exercise.answer;
  function check() { if (!answer) return; setChecked(true); void recordExerciseAttempt(courseId, exercise, answer); if (isCorrect) setCorrectCount(value => value + 1); else setHearts(value => Math.max(0, value - 1)); }
  function next() { setAnswer(''); setChecked(false); setCurrent(value => value + 1); }
  function speak() { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(exercise.phrase)); }

  return <main className="lesson-session">
    <header className="lesson-topbar"><button onClick={onBack} aria-label="Закрыть урок">×</button><div className="lesson-progress"><i style={{ width: `${((current + Number(checked)) / exercises.length) * 100}%` }} /></div><div className="lesson-hearts">♥ {hearts}</div></header>
    <section className="exercise-card"><p className="eyebrow">{language} · {level} · {current + 1} из 5</p><h1>{exercise.instruction}</h1>
      {exercise.type === 'listening' ? <button className="sound-orb" onClick={speak}>🔊<small>Прослушать</small></button> : <button className="exercise-phrase" onClick={speak}>{exercise.phrase}<small>🔊 Нажми, чтобы услышать</small></button>}
      <div className="exercise-options">{exercise.options.map((option, index) => <button disabled={checked} className={answer === option ? 'chosen' : ''} key={option} onClick={() => setAnswer(option)}><span>{index + 1}</span>{option}</button>)}</div>
    </section>
    <footer className={checked ? isCorrect ? 'lesson-check correct' : 'lesson-check wrong' : 'lesson-check'}>{checked ? <div><span>{isCorrect ? '✓' : '!'}</span><div><b>{isCorrect ? 'Правильно!' : 'Почти получилось'}</b><p>{isCorrect ? exercise.answer : exercise.hint}</p></div></div> : <span />}{checked ? <button onClick={next}>Дальше →</button> : <button disabled={!answer} onClick={check}>Проверить</button>}</footer>
  </main>;
}
