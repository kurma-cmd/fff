import { useEffect, useState } from 'react';
import { loadStoryProgress, type CompletedStory } from '../lib/storyProgress';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date(value));
}

export function CompletedReadingTable() {
  const [items, setItems] = useState<CompletedStory[]>([]);
  useEffect(() => { void loadStoryProgress().then(setItems); }, []);

  return <section className="panel completed-reading"><div className="section-title"><div><p className="eyebrow">Выполненные задания</p><h2>Что ты уже прочитал</h2></div><span>{items.length} выполнено</span></div>
    {items.length === 0 ? <div className="reading-empty"><span>📖</span><div><b>Пока нет прочитанных историй</b><p>Открой раздел «Истории», дочитай текст и правильно ответь на вопрос.</p></div></div> : <div className="reading-table" role="table" aria-label="Выполненные задания по чтению">
      <div className="reading-table-head" role="row"><span>Статус</span><span>Задание</span><span>Тип</span><span>Дата</span></div>
      {items.map(item => <div className="reading-table-row" role="row" key={`${item.content_type}-${item.story_name}`}><span className="reading-check" aria-label="Выполнено">✓</span><b>{item.story_name}</b><span>{item.content_type === 'text' ? 'Большой текст' : 'История человека'}</span><time dateTime={item.completed_at}>{formatDate(item.completed_at)}</time></div>)}
    </div>}
  </section>;
}
