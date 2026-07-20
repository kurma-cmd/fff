import { useEffect, useState } from 'react';
import { generateLanguageLesson, type LessonExercise } from '../lib/languageLessons';

type Props = { language: string; words: [string, string][]; onComplete: (level: string) => void; onCancel: () => void };
const testLevels = ['A1', 'B1', 'C1'];

const getResult = (score: number) => {
  if (score >= 8) return 'C1';
  if (score >= 7) return 'B2';
  if (score >= 5) return 'B1';
  if (score >= 3) return 'A2';
  return 'A1';
};

export function LanguageLevelTest({ language, words, onComplete, onCancel }: Props) {
  const [questions, setQuestions] = useState<LessonExercise[]>();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    void Promise.all(testLevels.map(level => generateLanguageLesson(language, level, 'Тест уровня', words)))
      .then(groups => setQuestions(groups.flatMap(group => group.slice(0, 3))));
  }, [language, words]);

  if (!questions) return <main className="lesson-session"><div className="lesson-session-loading"><span>🧭</span><h2>Готовим тест по языку</h2></div></main>;
  const question = questions[current];
  const answer = (value?: string) => {
    const nextScore = score + Number(value === question.answer);
    if (current === questions.length - 1) onComplete(getResult(nextScore));
    else { setScore(nextScore); setCurrent(value => value + 1); }
  };

  return <main className="lesson-session"><header className="lesson-topbar"><button onClick={onCancel}>×</button><div className="lesson-progress"><i style={{ width: `${(current / questions.length) * 100}%` }} /></div><b>{current + 1}/{questions.length}</b></header><section className="exercise-card"><p className="eyebrow">{language} · определение уровня</p><h1>{question.instruction}</h1><button className="exercise-phrase">{question.phrase}</button><div className="exercise-options">{question.options.map((option, index) => <button key={option} onClick={() => answer(option)}><span>{index + 1}</span>{option}</button>)}</div><button className="unknown-answer" onClick={() => answer()}>Не знаю ответа →</button></section></main>;
}
