import { useEffect, useState } from 'react';
import { loadCompletedLessons } from '../lib/learningProgress';

type Props = { onOpen: () => void };

export function LanguageTestsCard({ onOpen }: Props) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    void loadCompletedLessons().then(items => {
      setCompleted(items.filter(item => item.startsWith('english-') && !item.endsWith('-script')).length);
    });
  }, []);

  const unlocked = completed >= 12;
  const progress = Math.min(100, completed / 12 * 100);

  return <section className="language-tests-card">
    <div className="language-tests-icon">{unlocked ? '✓' : 'Aa'}</div>
    <div className="language-tests-copy">
      <p className="eyebrow">ПРОВЕРКА УРОВНЯ</p>
      <h2>{unlocked ? 'Итоговый тест уже открыт' : 'Тесты находятся здесь'}</h2>
      <p>{unlocked ? 'Проверь знания после учебного блока и узнай результат.' : `Заверши 12 уроков английского, чтобы открыть итоговую проверку. Пройдено ${completed} из 12.`}</p>
      <div className="language-tests-progress"><i style={{ width: `${progress}%` }} /></div>
    </div>
    <button onClick={onOpen}>{unlocked ? 'Начать тест →' : 'Посмотреть тесты →'}</button>
  </section>;
}
