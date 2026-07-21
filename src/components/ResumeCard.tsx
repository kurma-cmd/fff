import { useState } from 'react';
import type { StudentProfile } from '../App';
import { getResumeUrl, uploadResume } from '../lib/resume';
import { saveProfile } from '../lib/userData';

type Props = { profile: StudentProfile; onChange: (profile: StudentProfile) => void };

export function ResumeCard({ profile, onChange }: Props) {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const hasResume = Boolean(profile.resumePath);
  const replace = async (file?: File) => {
    if (!file) return;
    setBusy(true); setStatus('Загружаем…');
    try {
      const resume = await uploadResume(file);
      const updated = { ...profile, resumePath: resume.path, resumeName: resume.name };
      if (!await saveProfile(updated)) throw new Error('Не удалось сохранить резюме в профиле.');
      onChange(updated); setStatus('Сохранено ✓');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Попробуй ещё раз.'); }
    finally { setBusy(false); }
  };
  const open = async () => {
    if (!profile.resumePath) return;
    setBusy(true); setStatus('');
    try { window.open(await getResumeUrl(profile.resumePath), '_blank', 'noopener,noreferrer'); }
    catch (error) { setStatus(error instanceof Error ? error.message : 'Не удалось открыть файл.'); }
    finally { setBusy(false); }
  };
  return <section className={hasResume ? 'resume-card complete' : 'resume-card'}><span className="resume-icon">{hasResume ? '✓' : '1'}</span><div><p className="eyebrow">Документы для заявки</p><h2>{hasResume ? 'Резюме готово' : 'Добавь резюме'}</h2><p>{hasResume ? `${profile.resumeName} уже в твоём плане. Проверь его перед каждой подачей.` : 'Резюме — один из главных шагов подготовки к поступлению.'}</p>{status && <small>{status}</small>}</div><div className="resume-actions">{hasResume && <button disabled={busy} onClick={() => void open()}>Открыть</button>}<label className={busy ? 'disabled' : ''}><input type="file" accept=".pdf,.doc,.docx" disabled={busy} onChange={event => void replace(event.target.files?.[0])} />{hasResume ? 'Заменить' : 'Добавить PDF / DOCX'}</label></div></section>;
}
