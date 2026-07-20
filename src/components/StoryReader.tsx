import { useEffect, useState } from 'react';
import type { RoleModel } from '../lib/roleModels';
import { completeStory } from '../lib/storyProgress';
import { originalStory, translateStory, type StoryContent, type StoryLanguage } from '../lib/storyTranslation';

type Stage = 'reading' | 'quiz' | 'mistake' | 'done';
type Props = { person: RoleModel; language: StoryLanguage; onBack: () => void; onComplete: (name: string) => void };

export function StoryReader({ person, language, onBack, onComplete }: Props) {
  const [stage, setStage] = useState<Stage>('reading');
  const [answer, setAnswer] = useState('');
  const [content, setContent] = useState<StoryContent>(() => originalStory(person));
  const [busy, setBusy] = useState(language !== 'Русский');
  const [translationError, setTranslationError] = useState(false);

  useEffect(() => {
    let active = true;
    setBusy(language !== 'Русский'); setTranslationError(false);
    void translateStory(person, language).then(value => {
      if (!active) return;
      if (value) setContent(value); else { setContent(originalStory(person)); setTranslationError(true); }
      setBusy(false);
    });
    return () => { active = false; };
  }, [language, person]);

  async function choose(option: string) {
    setAnswer(option);
    if (option !== content.answer) { setStage('mistake'); return; }
    if (await completeStory(person.name)) onComplete(person.name);
    setStage('done');
  }

  if (busy) return <div className="page-shell"><button className="text-button" onClick={onBack}>← Все истории</button><section className="panel story-translation-loading"><span>🌍</span><h2>Переводим историю на {language}…</h2><p>Факты и вопрос останутся теми же.</p></section></div>;
  return <div className="page-shell"><button className="text-button" onClick={onBack}>← Все истории</button>{translationError && <p className="word-feedback">Перевод не загрузился, поэтому показываем русский текст.</p>}<article className="panel story-article">
    <p className="eyebrow">{person.field} · {person.country} · {person.years} · {language}</p><h1>{person.name}</h1><h2>{content.achievement}</h2><p className="story-reading-time">Большая история · примерно 4 минуты чтения</p>
    <StoryChapter number="01" title="Жизнь до большой идеи" text={content.beginning} />
    <StoryChapter number="02" title="Как появилась идея" text={content.idea} />
    <StoryChapter number="03" title="Как создавался результат" text={content.process} featured />
    <StoryChapter number="04" title="Ошибки, отказы и трудности" text={content.obstacle} />
    <StoryChapter number="05" title="Что изменилось после" text={content.result} />
    <div className="story-lesson"><b>Что можно взять себе</b><p>{content.lesson}</p></div><a href={person.source} target="_blank" rel="noreferrer">Открыть источник и узнать больше ↗</a>
    {stage === 'reading' && <div className="finish-reading"><p>Дочитал историю до конца?</p><button className="primary" onClick={() => setStage('quiz')}>Закончил читать</button></div>}
    {stage !== 'reading' && stage !== 'done' && <section className="story-quiz"><p className="eyebrow">Проверка понимания</p><h3>{content.question}</h3><div className="answer-list">{content.options.map(option => <button className={answer === option ? 'selected-answer' : ''} disabled={stage === 'mistake'} key={option} onClick={() => void choose(option)}>{option}</button>)}</div>{stage === 'mistake' && <div className="story-mistake"><p>В ответе есть ошибка. Вернись к нужному месту текста и попробуй ещё раз.</p><button className="primary" onClick={() => { setAnswer(''); setStage('quiz'); }}>Работать над ошибкой</button></div>}</section>}
    {stage === 'done' && <div className="story-complete"><span>✓</span><div><b>История прочитана</b><p>Галочка добавлена в таблицу раздела «Язык».</p></div><button className="primary" onClick={onBack}>Вернуться к списку</button></div>}
  </article></div>;
}

function StoryChapter({ number, title, text, featured = false }: { number: string; title: string; text: string; featured?: boolean }) {
  return <div className={featured ? 'story-chapter story-chapter-featured' : 'story-chapter'}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>;
}
