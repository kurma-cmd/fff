import { useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthMode = 'signup' | 'signin';

function getAuthErrorMessage(message: string, mode: AuthMode) {
  if (message.toLowerCase().includes('invalid login credentials')) {
    return 'Не удалось войти. Проверь почту и пароль. Если ты регистрировался через Google, нажми «Продолжить с Google».';
  }
  if (message.toLowerCase().includes('user already registered')) {
    return 'Аккаунт с этой почтой уже существует. Нажми «Войти» или продолжи через Google.';
  }
  if (message.toLowerCase().includes('password')) {
    return 'Пароль должен содержать минимум 6 символов.';
  }
  if (message.toLowerCase().includes('email')) {
    return 'Проверь, правильно ли написана электронная почта.';
  }
  return mode === 'signin'
    ? 'Не удалось войти. Проверь данные и попробуй ещё раз.'
    : 'Не удалось создать аккаунт. Попробуй ещё раз.';
}

type AuthProps = {
  isRecovery: boolean;
  isAuthenticated: boolean;
  onBack: () => void;
  onAuthenticated: () => void;
};

export function Auth({ isRecovery, isAuthenticated, onBack, onAuthenticated }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [recovery, setRecovery] = useState(isRecovery);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    const result = mode === 'signup'
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);

    if (result.error) {
      setMessage(getAuthErrorMessage(result.error.message, mode));
      return;
    }

    if (result.data.session) {
      onAuthenticated();
      return;
    }

    setMessage('Аккаунт создан! Проверь почту и подтверди регистрацию.');
  }

  async function handleGoogleAuth() {
    setBusy(true);
    setMessage('');
    sessionStorage.setItem('qadam_google_auth_pending', 'true');
    const redirectTo = `${window.location.origin}/?auth=callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: { prompt: 'select_account' },
      },
    });
    if (error) {
      sessionStorage.removeItem('qadam_google_auth_pending');
      setBusy(false);
      setMessage('Не удалось открыть Google. Попробуй ещё раз или используй почту.');
    }
  }

  async function requestPasswordReset() {
    if (!email) { setMessage('Сначала введи электронную почту.'); return; }
    setBusy(true); const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/?auth=recovery` }); setBusy(false);
    setMessage(error ? 'Не удалось отправить письмо. Проверь почту.' : 'Письмо отправлено. Открой ссылку внутри, чтобы задать новый пароль.');
  }

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); const { error } = await supabase.auth.updateUser({ password }); setBusy(false);
    if (error) setMessage('Не удалось изменить пароль. Ссылка могла устареть.'); else { window.history.replaceState({}, '', window.location.pathname); setRecovery(false); setMessage('Пароль изменён. Теперь можно продолжить.'); }
  }

  function switchMode() {
    setMode((current) => current === 'signup' ? 'signin' : 'signup');
    setMessage('');
  }

  const isSignup = mode === 'signup';

  return (
    <main className="auth-page">
      <header className="simple-header">
        <div className="logo"><span>Q</span> Qadam</div>
        <button className="auth-back" type="button" onClick={onBack}>← На главную</button>
      </header>

      <section className="auth-card">
        <div className="flow-steps" aria-label="Этапы настройки">
          <span className="complete">1. О приложении</span>
          <span className="active">2. Аккаунт</span>
          <span>3. Тест</span>
          <span>4. План</span>
        </div>
        <p className="eyebrow">Добро пожаловать</p>
        <h1>{recovery ? 'Новый пароль' : isSignup ? 'Создай аккаунт' : 'Войди в аккаунт'}</h1>
        <p className="auth-lead">
          {isSignup
            ? 'Сохраняй свой план поступления и возвращайся к нему с любого устройства.'
            : 'Продолжи работу над своим планом поступления.'}
        </p>

        {isAuthenticated && (
          <div className="existing-session">
            <strong>Ты уже вошёл в аккаунт</strong>
            <p>Нажми кнопку, чтобы перейти к следующему этапу — короткому тесту.</p>
            <button className="primary" type="button" onClick={onAuthenticated}>
              Продолжить к тесту →
            </button>
          </div>
        )}

        {!recovery && <><button className="google-auth" type="button" onClick={handleGoogleAuth} disabled={busy}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.5Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.3l-3.3-2.6c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.1v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.5 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9.1L6.5 14Z"/><path fill="#EA4335" d="M12 6a5.4 5.4 0 0 1 3.8 1.5l2.9-2.8A9.7 9.7 0 0 0 3.1 7.5l3.4 2.6A5.9 5.9 0 0 1 12 6Z"/></svg>
          Продолжить с Google
        </button><div className="auth-divider"><span>или по электронной почте</span></div></>}

        <form onSubmit={recovery ? updatePassword : handleSubmit} className="auth-form">
          {!recovery && <label>
            Электронная почта
            <input
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>}
          <label>
            Пароль
            <input
              type="password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              placeholder="Минимум 6 символов"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>
          <button className="primary" type="submit" disabled={busy}>
            {busy ? 'Подождите…' : recovery ? 'Сохранить новый пароль' : isSignup ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>

        {message && <p className="auth-message" role="status">{message}</p>}

        {!recovery && mode === 'signin' && <button className="auth-switch" type="button" onClick={requestPasswordReset}>Забыли пароль?</button>}
        {!recovery && <button className="auth-switch" type="button" onClick={switchMode}>
          {isSignup ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </button>}
      </section>
    </main>
  );
}
