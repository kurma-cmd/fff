import { UniversityCard } from './UniversityCard';
import type { University } from '../lib/universities';
import type { StudentProfile } from '../App';
import { getUniversityTier, universityTierInfo, universityTierOrder } from '../lib/universityTiers';

type Props = { universities: University[]; country: string; profile: StudentProfile; onStudyLanguage: (courseId: string) => void; saved: Set<string>; onToggleSaved: (name: string) => void };

export function UniversityList({ universities, country, profile, onStudyLanguage, saved, onToggleSaved }: Props) {
  if (universities.length === 0) return <section className="panel empty-catalog"><h2>По этим фильтрам ничего не найдено</h2><p>Попробуй выбрать другую стоимость или убрать один из фильтров.</p></section>;
  const groups = universityTierOrder.map(tier => ({
    tier,
    universities: universities.filter(university => getUniversityTier(university) === tier),
  })).filter(group => group.universities.length > 0);

  return <div className="country-catalog" id="universities">
    <section className="panel country-section">
      <div className="section-title"><div><p className="eyebrow">Выбранная страна</p><h2>{country}</h2></div><span>{universities.length} вузов</span></div>
      <div className="tier-groups">{groups.map(group => <section className={`tier-group tier-${group.tier}`} key={group.tier}>
        <header className="tier-heading"><div><span>{universityTierInfo[group.tier].label}</span><p>{universityTierInfo[group.tier].description}</p></div><strong>{group.universities.length}</strong></header>
        <div className="university-list">{group.universities.map(university => <UniversityCard university={university} profile={profile} onStudyLanguage={onStudyLanguage} saved={saved.has(university.name)} onToggleSaved={onToggleSaved} key={university.name} />)}</div>
      </section>)}</div>
    </section>
    <p className="data-note catalog-note">Уровень языка и стоимость — ориентиры для первого выбора. Точные требования, цены и сроки зависят от программы и года: проверяй их на официальном сайте вуза.</p>
  </div>;
}
