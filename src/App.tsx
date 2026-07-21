import { useEffect, useState } from 'react';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Onboarding } from './components/Onboarding';
import { supabase } from './lib/supabase';
import { LandingPage } from './pages/LandingPage';
import { loadProfile, saveProfile } from './lib/userData';

export type StudentProfile = {
  nickname: string;
  grade: string;
  direction: string;
  country: string;
  countries: string[];
  goal: string;
  studyPace: string;
  admissionYear: string;
  grades: string;
  ieltsScore: string;
  satScore: string;
  resumePath: string;
  resumeName: string;
  englishLevel: string;
  languageReadiness: string;
  budget: string;
  priorities: string[];
};

export default function App() {
  const appPaths = ['/path', '/universities', '/admission', '/language', '/stories', '/reading', '/tests'];
  const isAppPath = appPaths.includes(window.location.pathname);
  const isAuthCallback = new URLSearchParams(window.location.search).get('auth') === 'callback';
  const isRecovery = new URLSearchParams(window.location.search).get('auth') === 'recovery';
  const hasPendingGoogleAuth = sessionStorage.getItem('qadam_google_auth_pending') === 'true';
  const [screen, setScreen] = useState<'landing' | 'auth' | 'app'>(isAppPath ? 'app' : isAuthCallback || isRecovery || hasPendingGoogleAuth ? 'auth' : 'landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
      if (isAppPath && !data.session) setScreen('auth');
      if ((isAuthCallback || hasPendingGoogleAuth) && data.session) {
        sessionStorage.removeItem('qadam_google_auth_pending');
        setScreen('app');
        window.history.replaceState({}, '', window.location.pathname);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(Boolean(session));
      if ((isAuthCallback || hasPendingGoogleAuth) && event === 'SIGNED_IN' && session) {
        sessionStorage.removeItem('qadam_google_auth_pending');
        setScreen('app');
        window.history.replaceState({}, '', window.location.pathname);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [hasPendingGoogleAuth, isAppPath, isAuthCallback]);

  useEffect(() => { if (screen === 'app' && isAuthenticated) void loadProfile().then(value => { setProfile(value); setProfileLoaded(true); }); }, [isAuthenticated, screen]);

  async function finishOnboarding(value: StudentProfile) { if (await saveProfile(value)) setProfile(value); }
  async function signOut() { await supabase.auth.signOut(); setProfile(null); setProfileLoaded(false); setScreen('landing'); }

  if (screen === 'landing') {
    return <LandingPage onStart={() => setScreen('auth')} />;
  }

  if (isAuthenticated === null) {
    return <main className="auth-loading">Загрузка…</main>;
  }

  if (screen === 'auth') {
    return (
      <Auth
        isRecovery={isRecovery}
        isAuthenticated={isAuthenticated}
        onBack={() => setScreen('landing')}
        onAuthenticated={() => setScreen('app')}
      />
    );
  }

  if (!profileLoaded) return <main className="auth-loading">Загружаем твой план…</main>;

  return profile
    ? <Dashboard profile={profile} onProfileChange={setProfile} onRestart={() => setProfile(null)} onSignOut={signOut} />
    : <Onboarding onComplete={finishOnboarding} />;
}
