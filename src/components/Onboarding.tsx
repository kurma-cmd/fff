import { useState } from 'react';
import type { StudentProfile } from '../App';
import { QadamSelect } from './QadamSelect';
import { uploadResume } from '../lib/resume';

type Props = { onComplete: (profile: StudentProfile) => void };
const directions = ['IT и технологии', 'Бизнес', 'Медицина', 'Дизайн', 'Инженерия', 'Право', 'Наука', 'Творчество'];
const countries = ['Казахстан', 'США', 'Германия', 'Южная Корея', 'Великобритания', 'Канада', 'Франция', 'Италия', 'Нидерланды', 'Турция', 'Япония', 'Чехия', 'Китай', 'Сингапур', 'Малайзия', 'ОАЭ', 'Катар', 'Саудовская Аравия', 'Индия', 'Таиланд', 'Индонезия', 'Вьетнам'];
const priorities = ['Полный грант', 'Сильная программа', 'Безопасная страна', 'Недорогое жильё', 'Обучение на английском', 'Работа после учёбы'];
const selectOptions = (items: string[]) => items.map(value => ({ value, label: value }));
const levelFromIelts = (score: number) => score >= 7 ? 'C1' : score >= 5.5 ? 'B2' : score >= 4 ? 'B1' : score > 0 ? 'A2' : 'A1';

const initialProfile: StudentProfile = {
  nickname: '', grade: '9 класс', direction: directions[0], country: countries[0], countries: [countries[0]],
  goal: 'Поступить на грант', admissionYear: 'Через 2 года', studyPace: '20 минут в день', grades: '4.0',
  ieltsScore: '', satScore: '', resumePath: '', resumeName: '', englishLevel: 'A1', languageReadiness: 'Готов учить с нуля', budget: 'Только полный грант', priorities: ['Полный грант'],
};

export function Onboarding({ onComplete }: Props) {
  const [profile, setProfile] = useState(initialProfile);
  const [resumeStatus, setResumeStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const set = <K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) => setProfile(current => ({ ...current, [key]: value }));
  const toggleCountry = (country: string) => setProfile(current => {
    const selected = current.countries.includes(country) ? current.countries.filter(item => item !== country) : current.countries.length < 5 ? [...current.countries, country] : current.countries;
    return { ...current, countries: selected, country: selected[0] ?? '' };
  });
  const togglePriority = (priority: string) => set('priorities', profile.priorities.includes(priority) ? profile.priorities.filter(item => item !== priority) : [...profile.priorities, priority]);
  const ielts = Number(profile.ieltsScore);
  const sat = Number(profile.satScore);
  const isValid = profile.nickname.trim().length >= 2 && profile.countries.length > 0 && Number(profile.grades) >= 2 && Number(profile.grades) <= 5
    && (profile.ieltsScore === '' || (ielts >= 0 && ielts <= 9)) && (profile.satScore === '' || sat === 0 || (sat >= 400 && sat <= 1600));
  const finish = () => onComplete({ ...profile, englishLevel: levelFromIelts(ielts), goal: profile.priorities[0] ?? 'Поступить в университет' });
  const addResume = async (file?: File) => {
    if (!file) return;
    setIsUploading(true);
    setResumeStatus('Загружаем…');
    try {
      const result = await uploadResume(file);
      setProfile(current => ({ ...current, resumePath: result.path, resumeName: result.name }));
      setResumeStatus('Резюме добавлено ✓');
    } catch (error) {
      setResumeStatus(error instanceof Error ? error.message : 'Не удалось загрузить файл.');
    } finally { setIsUploading(false); }
  };

  return <main className="onboarding"><header className="simple-header"><Logo /><span>Личный план</span></header>
    <section className="profile-form"><header><p className="eyebrow">Твой маршрут</p><h1>Расскажи о себе</h1><p>Все на одной странице — без тестов и лишних шагов.</p></header>
      <div className="profile-fields">
        <label><span>Имя или ник</span><input value={profile.nickname} onChange={event => set('nickname', event.target.value)} placeholder="Например, qadam_hero" maxLength={20} /></label>
        <label><span>Класс</span><QadamSelect value={profile.grade} onChange={value => set('grade', value)} options={selectOptions(['7 класс', '8 класс', '9 класс', '10 класс', '11 класс'])} /></label>
        <label><span>Когда планируешь поступать</span><QadamSelect value={profile.admissionYear} onChange={value => set('admissionYear', value)} options={selectOptions(['Через 1 год', 'Через 2 года', 'Через 3 года', 'Через 4 года или позже'])} /></label>
        <label><span>Темп подготовки</span><QadamSelect value={profile.studyPace} onChange={value => set('studyPace', value)} options={selectOptions(['10 минут в день', '20 минут в день', '30 минут в день', '3 раза в неделю', 'Только по выходным'])} /></label>
        <label><span>Направление</span><QadamSelect value={profile.direction} onChange={value => set('direction', value)} options={selectOptions(directions)} /></label>
        <label><span>Средний балл из 5</span><input type="number" min="2" max="5" step="0.1" value={profile.grades} onChange={event => set('grades', event.target.value)} /></label>
        <label className="score-field"><span>IELTS</span><input type="number" min="0" max="9" step="0.5" value={profile.ieltsScore} onChange={event => set('ieltsScore', event.target.value)} placeholder="Например, 6.5" /><small>Оставь пустым, если не сдавал</small></label>
        <label className="score-field"><span>SAT</span><input type="number" min="0" max="1600" step="10" value={profile.satScore} onChange={event => set('satScore', event.target.value)} placeholder="Например, 1250" /><small>Оставь пустым, если не сдавал</small></label>
        <label><span>Бюджет</span><QadamSelect value={profile.budget} onChange={value => set('budget', value)} options={selectOptions(['Только полный грант', 'Нужна частичная стипендия', 'До $3 000 в год', 'До $10 000 в год', 'До $20 000 в год'])} /></label>
        <label><span>Новый язык</span><QadamSelect value={profile.languageReadiness} onChange={value => set('languageReadiness', value)} options={selectOptions(['Готов учить с нуля', 'Готов улучшать знания', 'Предпочитаю учиться на английском', 'Не хочу учить новый язык'])} /></label>
      </div>
      <fieldset className="profile-choices"><legend>Страны <small>до 5</small></legend><div>{countries.map(item => <button type="button" key={item} className={profile.countries.includes(item) ? 'selected' : ''} onClick={() => toggleCountry(item)}>{item}</button>)}</div></fieldset>
      <fieldset className="profile-choices"><legend>Что важнее всего</legend><div>{priorities.map(item => <button type="button" key={item} className={profile.priorities.includes(item) ? 'selected' : ''} onClick={() => togglePriority(item)}>{item}</button>)}</div></fieldset>
      <div className="resume-upload"><div><b>Резюме</b><p>Добавь PDF, DOC или DOCX до 5 МБ. Файл будет виден только тебе.</p>{profile.resumeName && <small>{profile.resumeName}</small>}{resumeStatus && <span>{resumeStatus}</span>}</div><label className={isUploading ? 'disabled' : ''}><input type="file" accept=".pdf,.doc,.docx" disabled={isUploading} onChange={event => void addResume(event.target.files?.[0])} />{profile.resumeName ? 'Заменить файл' : 'Выбрать файл'}</label></div>
      <button className="primary profile-submit" disabled={!isValid || isUploading} onClick={finish}>Создать мой план →</button><p className="privacy-note">🔒 Ответы и резюме доступны только тебе.</p>
    </section>
  </main>;
}

export function Logo() { return <div className="logo"><span>Q</span> Qadam</div>; }
