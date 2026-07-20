import { useState } from 'react';
import type { StudentProfile } from '../App';
import { CompletedReadingTable } from '../components/CompletedReadingTable';
import { CountryLanguagePlans } from '../components/CountryLanguagePlans';
import type { PageName } from '../components/Dashboard';
import { EnglishStudyPlan } from '../components/EnglishStudyPlan';
import { LanguageCourseCatalog } from '../components/LanguageCourseCatalog';
import { LanguageTestsCard } from '../components/LanguageTestsCard';
import { Translator } from '../components/Translator';
import { WordExplorer } from '../components/WordExplorer';

export function LanguagePage({ profile, initialCourse, onNavigate }: { profile: StudentProfile; initialCourse?: string; onNavigate: (page: PageName) => void }) {
  const [showTools, setShowTools] = useState(false);
  return <div className="page-shell language-page">
    <header className="page-hero"><p className="eyebrow">Персональная подготовка</p><h1>Языки для поступления и жизни</h1><p>Сначала — курс и задача на сегодня. Остальные инструменты открывай, когда они понадобятся.</p></header>
    <LanguageTestsCard onOpen={() => onNavigate('tests')} />
    <LanguageCourseCatalog countries={profile.countries} initialCourse={initialCourse} level={profile.englishLevel} />
    <EnglishStudyPlan level={profile.englishLevel} onNavigate={onNavigate} />
    <button className="section-reveal" onClick={() => setShowTools(value => !value)} aria-expanded={showTools}><span><b>Дополнительные инструменты</b><small>Переводчик, разбор слов, история занятий и языки стран</small></span><strong>{showTools ? 'Скрыть ↑' : 'Открыть ↓'}</strong></button>
    {showTools && <div className="revealed-section"><CompletedReadingTable /><CountryLanguagePlans countries={profile.countries} readiness={profile.languageReadiness} /><div id="translator"><Translator /></div><div id="words"><WordExplorer countries={profile.countries} /></div><section className="panel"><div className="section-title"><div><p className="eyebrow">Навыки</p><h2>Четыре части подготовки</h2></div></div><div className="four-skills"><article>📖<h3>Reading</h3><p>Тексты о вузах, задания и новые слова.</p></article><article>🎧<h3>Listening</h3><p>Разные акценты и вопросы на понимание.</p></article><article>✍️<h3>Writing</h3><p>Эссе, письма и понятные исправления.</p></article><article>🎙️<h3>Speaking</h3><p>Запись ответа и тренировка произношения.</p></article></div></section></div>}
  </div>;
}
