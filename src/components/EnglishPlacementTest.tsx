import { useState } from 'react';

type Skill = 'Грамматика' | 'Слова' | 'Чтение' | 'Аудирование' | 'Письмо';
type Question = {
  level: number;
  skill: Skill;
  prompt: string;
  options?: string[];
  answer: string;
  spoken?: string;
};

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const totalQuestions = 10;
const questions: Question[] = [
  { level: 0, skill: 'Грамматика', prompt: 'I ___ a student.', options: ['am', 'is', 'are'], answer: 'am' },
  { level: 0, skill: 'Аудирование', prompt: 'Прослушай и выбери услышанное число.', options: ['13', '30', '33'], answer: '13', spoken: 'thirteen' },
  { level: 1, skill: 'Слова', prompt: 'Какое слово противоположно “expensive”?', options: ['cheap', 'large', 'slow'], answer: 'cheap' },
  { level: 1, skill: 'Письмо', prompt: 'Напиши по-английски: «Я учусь каждый день».', answer: 'i study every day' },
  { level: 2, skill: 'Чтение', prompt: 'Mia missed the bus, so she arrived late. Почему Mia опоздала?', options: ['She missed the bus', 'She woke up late', 'She got lost'], answer: 'She missed the bus' },
  { level: 2, skill: 'Грамматика', prompt: 'If it rains tomorrow, we ___ at home.', options: ['stay', 'will stay', 'would stay'], answer: 'will stay' },
  { level: 3, skill: 'Аудирование', prompt: 'Прослушай фразу. Когда перенесли встречу?', options: ['На вторник', 'На четверг', 'На пятницу'], answer: 'На четверг', spoken: 'The meeting has been moved from Tuesday to Thursday.' },
  { level: 3, skill: 'Письмо', prompt: 'Закончи фразу одним словом: The application must ___ before Friday.', answer: 'be submitted' },
  { level: 4, skill: 'Чтение', prompt: '“The results were inconclusive.” Что это означает?', options: ['Результат не дал ясного вывода', 'Результат был отличным', 'Результат не опубликовали'], answer: 'Результат не дал ясного вывода' },
  { level: 4, skill: 'Грамматика', prompt: 'Not only ___ the deadline, but she also submitted extra research.', options: ['she met', 'did she meet', 'she did meet'], answer: 'did she meet' },
  { level: 5, skill: 'Слова', prompt: 'Какое слово точнее всего означает “убедительный аргумент”?', options: ['compelling', 'ordinary', 'incomplete'], answer: 'compelling' },
  { level: 5, skill: 'Письмо', prompt: 'Впиши пропуск: Had it not been ___ the scholarship, he could not have enrolled.', answer: 'for' },
];

const normalize = (value: string) => value.trim().toLowerCase().replace(/[.!?]/g, '').replace(/\s+/g, ' ');

export function EnglishPlacementTest({ savedLevel, onComplete }: { savedLevel: string; onComplete: (level: string) => void }) {
  const [used, setUsed] = useState<number[]>([]);
  const [ability, setAbility] = useState(2);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState(savedLevel);
  const [writtenAnswer, setWrittenAnswer] = useState('');

  const candidates = questions.map((question, index) => ({ question, index })).filter(item => !used.includes(item.index));
  const next = candidates.sort((a, b) => Math.abs(a.question.level - ability) - Math.abs(b.question.level - ability))[0];

  function submit(value: string) {
    const isCorrect = normalize(value) === normalize(next.question.answer);
    const nextAbility = Math.max(0, Math.min(5, ability + (isCorrect ? 0.45 : -0.35)));
    const nextUsed = [...used, next.index];
    const nextCorrect = correctCount + Number(isCorrect);
    setAbility(nextAbility);
    setCorrectCount(nextCorrect);
    setUsed(nextUsed);
    setWrittenAnswer('');
    if (nextUsed.length === totalQuestions) {
      const level = levels[Math.round(nextAbility)];
      setResult(level);
      onComplete(level);
    }
  }

  function listen() {
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(next.question.spoken));
  }

  function restart() {
    setUsed([]); setAbility(2); setCorrectCount(0); setResult(''); setWrittenAnswer(''); onComplete('');
  }

  if (result) return <div className="test-result"><span>✓</span><div><p>Предварительный уровень CEFR</p><h2>{result}</h2><small>{used.length ? `${correctCount} точных ответов из ${totalQuestions}` : 'Уровень уже определён'}</small></div><button onClick={restart}>Пройти ещё раз</button></div>;

  const question = next.question;
  return <div className="placement-test">
    <div className="test-meta"><span>Вопрос {used.length + 1} из {totalQuestions}</span><span>{question.skill} · сложность подстраивается</span></div>
    <div className="test-progress"><i style={{ width: `${(used.length / totalQuestions) * 100}%` }} /></div>
    {question.spoken && <button className="listen-button" type="button" onClick={listen}>🔊 Прослушать фразу</button>}
    <h2>{question.prompt}</h2>
    {question.options
      ? <div className="test-options">{question.options.map((option, index) => <button key={option} onClick={() => submit(option)}><b>{String.fromCharCode(65 + index)}</b>{option}</button>)}</div>
      : <form className="written-answer" onSubmit={event => { event.preventDefault(); submit(writtenAnswer); }}><input value={writtenAnswer} onChange={event => setWrittenAnswer(event.target.value)} placeholder="Напиши короткий ответ" required /><button className="primary">Ответить →</button></form>}
    <p className="test-tip">Ошибаться нормально: следующий вопрос станет подходящей сложности.</p>
  </div>;
}
