import { useMemo, useState } from 'react';
import type { StudentProfile } from '../App';
import { UniversityFilters, type UniversityFilterState } from '../components/UniversityFilters';
import { UniversityList } from '../components/UniversityList';
import { getEnglishMatch, getProfileMatch, universityCatalog } from '../lib/universityCatalog';
import { loadSavedUniversities, setUniversitySaved } from '../lib/userData';
import { useEffect } from 'react';
import { UniversityComparison } from '../components/UniversityComparison';

type Props = { profile: StudentProfile; onStudyLanguage: (courseId: string) => void };

export function UniversitiesPage({ profile, onStudyLanguage }: Props) {
  const [activeCountry, setActiveCountry] = useState(profile.countries[0]);
  const [filters, setFilters] = useState<UniversityFilterState>({ direction: 'Все', cost: 'Любая', fundingOnly: false, suitableEnglishOnly: false });
  const [saved, setSaved] = useState<Set<string>>(new Set());
  useEffect(() => { void loadSavedUniversities().then(setSaved); }, []);
  const toggleSaved = async (name: string) => { const next = !saved.has(name); if (await setUniversitySaved(name, next)) setSaved(current => { const value = new Set(current); next ? value.add(name) : value.delete(name); return value; }); };
  const universities = useMemo(() => universityCatalog
    .filter(university => university.country === activeCountry)
    .filter(university => filters.direction === 'Все' || university.directions.includes(filters.direction))
    .filter(university => filters.cost === 'Любая' || university.cost === filters.cost)
    .filter(university => !filters.fundingOnly || university.funding)
    .filter(university => !filters.suitableEnglishOnly || getEnglishMatch(profile.englishLevel, university).score === 3)
    .sort((a, b) => getProfileMatch(profile, b).score - getProfileMatch(profile, a).score),
  [activeCountry, filters, profile]);

  return <div className="page-shell">
    <header className="page-hero"><p className="eyebrow">База университетов</p><h1>Сначала выбери страну</h1><p>Выше покажем варианты, которые ближе к твоему направлению, баллу, бюджету, языку и приоритетам.</p></header>
    <div className="country-picker">{profile.countries.map(country => {
      const count = universityCatalog.filter(university => university.country === country).length;
      return <button className={country === activeCountry ? 'active' : ''} onClick={() => setActiveCountry(country)} key={country}>{country}<small>{count} вузов</small></button>;
    })}</div>
    <aside className="admission-reality"><span>!</span><div><b>Важно: приложение не оценивает твои достижения</b><p>Олимпиады, проекты, портфолио, эссе, рекомендации и внеклассная активность часто сильно влияют на поступление. Загружать их в Qadam не нужно — учитывай их самостоятельно и сверяй требования программы.</p></div></aside>
    <UniversityComparison profile={profile} saved={saved} />
    <UniversityFilters filters={filters} onChange={setFilters} />
    <UniversityList universities={universities} country={activeCountry} profile={profile} onStudyLanguage={onStudyLanguage} saved={saved} onToggleSaved={toggleSaved} />
  </div>;
}

