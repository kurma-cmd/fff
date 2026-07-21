import { useEffect, useState } from 'react';
import type { StudentProfile } from '../App';
import { LanguagePage } from '../pages/LanguagePage';
import { OverviewPage } from '../pages/OverviewPage';
import { UniversitiesPage } from '../pages/UniversitiesPage';
import { StoriesPage } from '../pages/StoriesPage';
import { ReadingPage } from '../pages/ReadingPage';
import { TestsPage } from '../pages/TestsPage';
import { AdmissionPage } from '../pages/AdmissionPage';
import { Logo } from './Onboarding';
import { StreakBadge } from './StreakBadge';
import { recordDailyActivity } from '../lib/learningProgress';

type Props = { profile: StudentProfile; onProfileChange: (profile: StudentProfile) => void; onRestart: () => void; onSignOut: () => void };
export type PageName = 'path' | 'universities' | 'admission' | 'language' | 'stories' | 'reading' | 'tests';
const pagePaths: Record<PageName, string> = {
  path: '/path', universities: '/universities', admission: '/admission',
  language: '/language', stories: '/stories', reading: '/reading', tests: '/tests',
};

function pageFromPath(): PageName {
  const entry = Object.entries(pagePaths).find(([, path]) => path === window.location.pathname);
  return entry ? entry[0] as PageName : 'path';
}
const menu: { id: PageName; label: string }[] = [
  { id: 'path', label: 'Мой путь' }, { id: 'universities', label: 'Вузы' },
  { id: 'admission', label: 'Поступление' }, { id: 'language', label: 'Язык' }, { id: 'stories', label: 'Истории' }, { id: 'reading', label: 'Тексты' },
];

export function Dashboard({ profile, onProfileChange, onRestart, onSignOut }: Props) {
  const [page, setPage] = useState<PageName>(pageFromPath);
  const [languageCourse, setLanguageCourse] = useState<string>();
  const [streak, setStreak] = useState(0);
  const navigate = (nextPage: PageName) => {
    window.history.pushState({}, '', pagePaths[nextPage]);
    setPage(nextPage);
  };
  const studyLanguage = (courseId: string) => { setLanguageCourse(courseId); navigate('language'); };
  useEffect(() => { void recordDailyActivity().then(setStreak); }, []);
  useEffect(() => {
    if (window.location.pathname === '/') window.history.replaceState({}, '', pagePaths.path);
    const handleBack = () => setPage(pageFromPath());
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, []);
  return <main><header className="app-header"><button className="logo-button" onClick={() => navigate('path')}><Logo /></button><nav>{menu.map(item => <button className={page === item.id ? 'nav-active' : ''} key={item.id} onClick={() => navigate(item.id)}>{item.label}</button>)}</nav><div className="header-profile"><StreakBadge days={streak} /><button className="avatar" onClick={onRestart}>{profile.nickname.slice(0, 1).toUpperCase()}</button><button className="logout-button" onClick={onSignOut}>Выйти</button></div></header>
    {page === 'path' && <OverviewPage profile={profile} goTo={navigate} />}
    {page === 'universities' && <UniversitiesPage profile={profile} onStudyLanguage={studyLanguage} />}
    {page === 'admission' && <AdmissionPage profile={profile} onProfileChange={onProfileChange} onOpenCatalog={() => navigate('universities')} />}
    {page === 'language' && <LanguagePage profile={profile} initialCourse={languageCourse} onNavigate={navigate} />}
    {page === 'stories' && <StoriesPage />}
    {page === 'reading' && <ReadingPage />}
    {page === 'tests' && <TestsPage />}
  </main>;
}
