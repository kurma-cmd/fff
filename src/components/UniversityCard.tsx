import { useState } from 'react';
import { getAdmissionGuide } from '../lib/admissionGuide';
import { getCompetitionLevel, getEnglishMatch, getProfileMatch } from '../lib/universityCatalog';
import type { University } from '../lib/universities';
import type { StudentProfile } from '../App';
import { getUniversityLanguageInfo } from '../lib/languageCourses';

type Props = { university: University; profile: StudentProfile; onStudyLanguage: (courseId: string) => void; saved: boolean; onToggleSaved: (name: string) => void };

export function UniversityCard({ university, profile, onStudyLanguage, saved, onToggleSaved }: Props) {
  const [expanded, setExpanded] = useState(false);
  const match = getEnglishMatch(profile.englishLevel, university);
  const profileMatch = getProfileMatch(profile, university);
  const competition = getCompetitionLevel(university);
  const admission = getAdmissionGuide(university);
  const language = getUniversityLanguageInfo(university.name, university.country, university.language);
  const preparation = match.score === 3 ? 'Английский соответствует ориентиру, но это только один из критериев' : match.score === 2 ? 'Для языкового ориентира нужен ещё один уровень' : 'Сначала нужна языковая подготовка';
  return <article className="university-card">
    <div className="uni-heading"><div className="uni-logo">🎓</div><div><h3>{university.name}</h3><p>{university.city} · {university.country}</p></div><span className={`match-badge match-${match.score}`}>{match.label}</span></div>
    <p className="uni-summary">{profileMatch.reasons.length ? `Почему в подборке: ${profileMatch.reasons.join(', ')}. ` : ''}{preparation}.</p>
    <div className={`competition-note ${competition.tone}`}><b>{competition.label}</b><p>{competition.note}</p></div>
    <div className="uni-main-facts"><span><b>Язык</b>{university.language}</span><span><b>Стоимость</b>{university.cost}</span></div>
    <button className="uni-details-toggle" onClick={() => setExpanded(value => !value)} aria-expanded={expanded}>{expanded ? 'Скрыть подробности ↑' : 'Подробнее о вузе ↓'}</button>
    {expanded && <div className="uni-details">
    <div className={language.required ? 'uni-language required' : 'uni-language optional'}><span>{language.course.flag}</span><div><b>{language.required ? 'Язык нужен' : 'Язык программы'}</b><p>{language.status}</p></div><button onClick={() => onStudyLanguage(language.course.id)}>Открыть {language.course.name.toLowerCase()} →</button></div>
    <div className="uni-facts">
      <span><b>Язык обучения</b>{university.language}</span>
      <span><b>Ориентир по английскому</b>{university.englishBand}</span>
      <span><b>Стоимость</b>{university.cost}</span>
      <span><b>Финансирование</b>{university.funding ? 'Есть гранты / стипендии' : 'Не указано'}</span>
      <span><b>Жильё</b>{university.housing ? 'Есть варианты для студентов' : 'Искать самостоятельно'}</span>
      <span><b>Направления</b>{university.directions.join(', ')}</span>
      <span><b>Формат поступления</b>Требования зависят от выбранной программы</span>
      <span><b>Что проверить</b>Дедлайн, экзамены и список документов</span>
    </div>
    <div className="admission-requirements">
      <h4>Ориентиры для поступления</h4>
      <div><span><b>IELTS</b>{admission.ielts}</span><span><b>TOEFL</b>{admission.toefl}</span><span><b>GPA</b>{admission.gpa}</span><span><b>SAT</b>{admission.sat}</span></div>
      <p>{admission.note}</p>
    </div>
    <div className="deadline-guide"><span>📅</span><div><b>Примерное окно подачи</b><strong>{admission.applicationWindow}</strong><small>{admission.checkWhen}. Точная дата — по официальной ссылке.</small></div></div>
    <div className="verification-note">Каталог обновлён 16 июля 2026 · Перед подачей обязательно сверь требования выбранной программы</div>
    </div>}
    <div className="uni-actions"><a className="official-link" href={university.url} target="_blank" rel="noreferrer">Проверить условия на сайте вуза ↗</a><button className={saved ? 'save-uni saved' : 'save-uni'} onClick={() => onToggleSaved(university.name)}>{saved ? '★ Сохранено' : '☆ В мой список'}</button></div>
  </article>;
}
