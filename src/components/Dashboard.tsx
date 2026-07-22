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
const admissionMenu: { id: PageName; label: string }[] = [
  { id: 'path', label: 'Мой путь' }, { id: 'universities', label: 'Вузы' },
  { id: 'admission', label: 'Поступление' },
];
const learningMenu: { id: PageName; label: string }[] = [
  { id: 'language', label: 'Язык' }, { id: 'stories', label: 'Истории' }, { id: 'reading', label: 'Тексты' },
];

export function Dashboard({ profile, onProfileChange, onRestart, onSignOut }: Props) {
  const [page, setPage] = useState<PageName>(pageFromPath);
  const [openMenu, setOpenMenu] = useState<'admission' | 'learning' | null>(null);
  const [languageCourse, setLanguageCourse] = useState<string>();
  const [streak, setStreak] = useState(0);
  const navigate = (nextPage: PageName) => {
    window.history.pushState({}, '', pagePaths[nextPage]);
    setPage(nextPage);
    setOpenMenu(null);
  };
  const studyLanguage = (courseId: string) => { setLanguageCourse(courseId); navigate('language'); };
  useEffect(() => { void recordDailyActivity().then(setStreak); }, []);
  useEffect(() => {
    if (window.location.pathname === '/') window.history.replaceState({}, '', pagePaths.path);
    const handleBack = () => setPage(pageFromPath());
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, []);
  const menuItems = (items: { id: PageName; label: string }[]) => items.map(item => <button className={page === item.id ? 'nav-active' : ''} key={item.id} onClick={() => navigate(item.id)}>{item.label}</button>);
  const isAdmission = admissionMenu.some(item => item.id === page);
  return <main><header className="app-header"><button className="logo-button" onClick={() => navigate('path')}><Logo /></button><nav>
    <div className={`nav-direction ${openMenu === 'admission' ? 'open' : ''}`}><button className={isAdmission ? 'direction-active' : ''} onClick={() => setOpenMenu(current => current === 'admission' ? null : 'admission')}>Поступление <i /></button>{openMenu === 'admission' && <div className="nav-submenu">{menuItems(admissionMenu)}</div>}</div>
    <div className={`nav-direction ${openMenu === 'learning' ? 'open' : ''}`}><button className={!isAdmission ? 'direction-active' : ''} onClick={() => setOpenMenu(current => current === 'learning' ? null : 'learning')}>Обучение <i /></button>{openMenu === 'learning' && <div className="nav-submenu">{menuItems(learningMenu)}</div>}</div>
  </nav><div className="header-profile"><StreakBadge days={streak} /><button className="avatar" onClick={onRestart}>{profile.nickname.slice(0, 1).toUpperCase()}</button><button className="logout-button" onClick={onSignOut}>Выйти</button></div></header>
    {page === 'path' && <OverviewPage profile={profile} goTo={navigate} />}
    {page === 'universities' && <UniversitiesPage profile={profile} onStudyLanguage={studyLanguage} />}
    {page === 'admission' && <AdmissionPage profile={profile} onProfileChange={onProfileChange} onOpenCatalog={() => navigate('universities')} />}
    {page === 'language' && <LanguagePage profile={profile} initialCourse={languageCourse} onNavigate={navigate} />}
    {page === 'stories' && <StoriesPage />}
    {page === 'reading' && <ReadingPage />}
    {page === 'tests' && <TestsPage />}
  </main>;
}
