import type { StudentProfile } from '../App';

export function ProfileInsights({ profile }: { profile: StudentProfile }) {
  const facts = [
    { icon: '⏳', title: 'Срок и нагрузка', text: `${profile.admissionYear}, занятия — ${profile.studyPace.toLowerCase()}.` },
    { icon: '💰', title: 'Финансовый фильтр', text: `${profile.budget}. Сначала покажем гранты и доступные варианты.` },
    { icon: '🌍', title: 'Экзамены', text: `IELTS: ${profile.ieltsScore || 'не сдавал'}. SAT: ${profile.satScore || 'не сдавал'}.` },
    { icon: '📊', title: 'Учебный профиль', text: `Средний балл: ${profile.grades} из 5. Подберём основные и амбициозные варианты.` },
  ];
  return <section className="panel profile-insights"><div className="section-title"><div><p className="eyebrow">На основе твоих ответов</p><h2>Почему план выглядит именно так</h2></div></div><div className="insight-grid">{facts.map(fact => <article key={fact.title}><span>{fact.icon}</span><div><strong>{fact.title}</strong><p>{fact.text}</p></div></article>)}</div><div className="priority-line"><b>Твои приоритеты:</b> {profile.priorities.join(' · ')}</div></section>;
}
