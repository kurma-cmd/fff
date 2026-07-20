import { useEffect, useMemo, useState } from 'react';
import { countryCourses, getLessonTitles, languageCourses } from '../lib/languageCourses';
import { completeLesson, loadCompletedLessons } from '../lib/learningProgress';
import { LanguageLesson } from './LanguageLesson';
import { loadLanguageLevels, resetLanguageLevel, saveLanguageLevel } from '../lib/userData';
import { LanguageLevelTest } from './LanguageLevelTest';
import { writingSystems } from '../lib/writingSystems';
import { WritingSystemLesson } from './WritingSystemLesson';
import { LanguageReadinessCheck } from './LanguageReadinessCheck';
import { getCourseVocabulary } from '../lib/languageVocabulary';

type Props = { countries: string[]; initialCourse?: string; level: string };

export function LanguageCourseCatalog({ countries, initialCourse, level }: Props) {
  const available = useMemo(() => {
    const ids = new Set(['english', ...countries.flatMap(country => countryCourses[country] ?? [])]);
    return languageCourses.filter(course => ids.has(course.id));
  }, [countries]);
  const [selectedId, setSelectedId] = useState(initialCourse ?? '');
  const [started, setStarted] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeLesson, setActiveLesson] = useState<number>();
  const [testing, setTesting] = useState(false);
  const [checkingReadiness, setCheckingReadiness] = useState(false);
  const [courseLevels, setCourseLevels] = useState<Record<string, string>>({ english: level });
  const selected = languageCourses.find(course => course.id === selectedId);
  const selectedWords = selected ? getCourseVocabulary(selected.id, selected.words) : [];
  const courseLevel = selected ? courseLevels[selected.id] ?? (selected.id === 'english' ? level : 'A1') : level;
  const lessonTitles = getLessonTitles(courseLevel);
  const completedForCourse = completed.filter(item => item.startsWith(`${selectedId}-`));
  const hasStarted = started.includes(selectedId) || completedForCourse.length > 0;

  useEffect(() => { void loadCompletedLessons().then(setCompleted); void loadLanguageLevels().then(values => setCourseLevels(current => ({ ...current, ...values, english: level }))); }, [level]);

  if (selected && checkingReadiness) return <LanguageReadinessCheck language={selected.name} onCancel={() => setCheckingReadiness(false)} onKnowBasics={() => { setCheckingReadiness(false); setTesting(true); }} onStartFromZero={() => void saveLanguageLevel(selected.id, 'A1').then(saved => { if (saved) setCourseLevels(current => ({ ...current, [selected.id]: 'A1' })); setStarted(current => [...new Set([...current, selected.id])]); setCheckingReadiness(false); })} />;

  if (selected && testing) return <LanguageLevelTest language={selected.name} words={selectedWords} onCancel={() => setTesting(false)} onComplete={result => void saveLanguageLevel(selected.id, result).then(saved => { if (saved) setCourseLevels(current => ({ ...current, [selected.id]: result })); setTesting(false); })} />;

  if (selected && activeLesson !== undefined) {
    const lessonId = String(activeLesson);
    const progressId = `${selected.id}-${lessonId}`;
    return <LanguageLesson courseId={selected.id} language={selected.name} level={courseLevel} title={lessonTitles[activeLesson]} words={selectedWords} onBack={() => setActiveLesson(undefined)} onComplete={() => void completeLesson(selected.id, lessonId).then(saved => { if (saved) setCompleted(current => [...new Set([...current, progressId])]); setActiveLesson(undefined); })} />;
  }

  if (selected) return <section className="panel course-view">
    <button className="text-button" onClick={() => { setSelectedId(''); setActiveLesson(undefined); }}>← Все языки</button>
    <div className="course-heading"><span>{selected.flag}</span><div><p className="eyebrow">Игровой курс · уровень {courseLevel}</p><h2>{selected.name}</h2><small>{completedForCourse.length} из 24 уроков · экзамен: {selected.exam}</small></div><div className="course-level-actions"><button className="placement-button" onClick={() => setCheckingReadiness(true)}>Проверить мой уровень</button>{selected.id !== 'english' && courseLevels[selected.id] && <button className="text-button" onClick={() => void resetLanguageLevel(selected.id).then(reset => { if (reset) setCourseLevels(current => { const next = { ...current }; delete next[selected.id]; return next; }); })}>Сбросить уровень</button>}</div></div>
    {writingSystems[selected.id] && <WritingSystemLesson system={writingSystems[selected.id]} completed={completed.includes(`${selected.id}-script`)} onComplete={() => void completeLesson(selected.id, 'script').then(saved => { if (saved) setCompleted(current => [...new Set([...current, `${selected.id}-script`])]); })} />}
    {!hasStarted ? <div className="course-start"><span>🚀</span><h3>Начать новый путь?</h3><p>Короткие игровые уроки по 3–5 минут. В каждом — фразы, звук, перевод и задания с проверкой.</p><button className="primary" onClick={() => setStarted([...started, selected.id])}>Начать первый урок →</button></div> : <>
      <div className="path-unit"><div><p>РАЗДЕЛ 1 · УРОВЕНЬ {courseLevel}</p><h3>{courseLevel === 'A1' || courseLevel === 'A2' ? 'Первые шаги' : 'Уверенное общение'}</h3></div><span>{completedForCourse.length}/24 пройдено</span></div>
      <div className="lesson-path">{lessonTitles.map((title, index) => { const lessonId = `${selected.id}-${index}`; const done = completed.includes(lessonId); const unlocked = index === 0 || completed.includes(`${selected.id}-${index - 1}`); return <div className={`path-step step-${index % 3}`} key={title}><button disabled={!unlocked} className={done ? 'path-node done' : unlocked ? 'path-node current' : 'path-node locked'} onClick={() => setActiveLesson(index)}><span>{done ? '✓' : unlocked ? index === 0 && !done ? '★' : '▶' : '🔒'}</span></button><div><b>{title}</b><small>{done ? 'Пройдено · можно повторить' : unlocked ? '5 заданий · 3–5 минут' : 'Сначала пройди прошлый урок'}</small></div></div>; })}</div>
    </>}
  </section>;

  return <section className="panel course-catalog" id="language-courses"><div className="section-title"><div><p className="eyebrow">Ты выбираешь сам</p><h2>Языки для твоих стран</h2></div><span>{available.length} курсов</span></div><p className="language-note">Английский доступен всегда. Местные языки добавлены по выбранным странам — их можно учить для программы, работы или комфортной жизни.</p><div className="course-grid">{available.map(course => <button key={course.id} onClick={() => setSelectedId(course.id)}><span>{course.flag}</span><div><b>{course.name}</b><small>24 занятия · тест после каждых 12 · {course.exam}</small></div><strong>{started.includes(course.id) ? 'Продолжить →' : 'Посмотреть →'}</strong></button>)}</div></section>;
}

