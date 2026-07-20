import { useState } from 'react';
import type { StudentProfile } from '../App';
import { EnglishPlacementTest } from './EnglishPlacementTest';
import { QadamSelect } from './QadamSelect';


type Props = { onComplete: (profile: StudentProfile) => void };
type SingleField = Exclude<keyof StudentProfile, 'priorities' | 'countries'>;
const directions = ['IT и технологии', 'Бизнес', 'Медицина', 'Дизайн', 'Инженерия', 'Право', 'Наука', 'Творчество'];
const countries = ['Казахстан', 'США', 'Германия', 'Южная Корея', 'Великобритания', 'Канада', 'Франция', 'Италия', 'Нидерланды', 'Турция', 'Япония', 'Чехия', 'Китай', 'Сингапур', 'Малайзия', 'ОАЭ', 'Катар', 'Саудовская Аравия', 'Индия', 'Таиланд', 'Индонезия', 'Вьетнам'];
const questions = [
  { title: 'Как к тебе обращаться?', subtitle: 'Это имя будет видно только в твоём личном плане. Настоящее имя указывать не обязательно.' },
  { title: 'Через сколько лет хочешь начать учёбу в университете?', subtitle: 'Так мы растянем подготовку на правильное количество месяцев.' },
  { title: 'Сколько времени удобно заниматься?', subtitle: 'Составим план, который не будет мешать школе и отдыху.' },
  { title: 'Что тебе интересно?', subtitle: 'Предложим подходящие профессии и программы.' },
  { title: 'В каких странах ты хочешь учиться?', subtitle: 'Можно выбрать до пяти стран для сравнения.' },
  { title: 'Какой у тебя средний балл?', subtitle: 'Укажи среднюю оценку по шкале от 2 до 5. Это поможет разделить варианты на основные и амбициозные.' },
  { title: 'Мини-приключение по английскому', subtitle: 'Около 10 коротких заданий. Сложность подстроится под тебя, будут чтение, звук и письмо.' },
  { title: 'Насколько ты готов учить новый язык?', subtitle: 'Не переживай, если пока не знаешь язык — можно начать с самого начала.' },
  { title: 'Какой бюджет подходит семье?', subtitle: 'Можно выбрать грант, доступный вариант или платное обучение.' },
  { title: 'Что для тебя важнее всего?', subtitle: 'Выбери несколько пунктов — они повлияют на подбор.' },
];
const options: Partial<Record<SingleField, string[]>> = {
  admissionYear: ['Через 1 год', 'Через 2 года', 'Через 3 года', 'Через 4 года или позже'],
  studyPace: ['10 минут в день', '20 минут в день', '30 минут в день', '3 раза в неделю', 'Только по выходным', 'Составить гибкий план'],
  direction: directions, country: countries,
  languageReadiness: ['Готов учить с нуля', 'Готов улучшать свои знания', 'Предпочитаю страну, где достаточно английского', 'Не хочу учить новый язык'],
  budget: ['Только полный грант', 'Нужна частичная стипендия', 'До $3 000 в год', 'До $10 000 в год', 'До $20 000 в год', 'Сначала хочу сравнить цены'],
};
const priorityOptions = ['Полный грант', 'Сильная программа', 'Безопасная страна', 'Недорогое жильё', 'Обучение на английском', 'Поддержка слабослышащих', 'Работа после учёбы', 'Активная студенческая жизнь'];
const countryFlagCodes: Record<string, string> = { 'Казахстан': 'kz', 'США': 'us', 'Германия': 'de', 'Южная Корея': 'kr', 'Великобритания': 'gb', 'Канада': 'ca', 'Франция': 'fr', 'Италия': 'it', 'Нидерланды': 'nl', 'Турция': 'tr', 'Япония': 'jp', 'Чехия': 'cz', 'Китай': 'cn', 'Сингапур': 'sg', 'Малайзия': 'my', 'ОАЭ': 'ae', 'Катар': 'qa', 'Саудовская Аравия': 'sa', 'Индия': 'in', 'Таиланд': 'th', 'Индонезия': 'id', 'Вьетнам': 'vn' };

export function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<StudentProfile>({ nickname: '', grade: '9 класс', direction: directions[0], country: countries[0], countries: [countries[0]], goal: 'Поступить на грант', admissionYear: 'Через 2 года', studyPace: '10 минут в день', grades: '4.0', englishLevel: '', languageReadiness: 'Готов учить с нуля', budget: 'Только полный грант', priorities: ['Полный грант'] });
  const fields: SingleField[] = ['nickname', 'admissionYear', 'studyPace', 'direction', 'country', 'grades', 'englishLevel', 'languageReadiness', 'budget', 'goal'];
  const field = fields[step];
  const set = (key: SingleField, value: string) => setProfile({ ...profile, [key]: value });
  const togglePriority = (value: string) => setProfile({ ...profile, priorities: profile.priorities.includes(value) ? profile.priorities.filter(item => item !== value) : [...profile.priorities, value] });
  const toggleCountry = (value: string) => {
    const selected = profile.countries.includes(value) ? profile.countries.filter(item => item !== value) : profile.countries.length < 5 ? [...profile.countries, value] : profile.countries;
    setProfile({ ...profile, countries: selected, country: selected[0] ?? '' });
  };
  const choices = field === 'goal' ? priorityOptions : options[field] ?? [];
  const averageGrade = Number(profile.grades);
  const canContinue = step === 0 ? profile.nickname.trim().length >= 2 : field === 'country' ? profile.countries.length > 0 : field === 'grades' ? averageGrade >= 2 && averageGrade <= 5 : field === 'goal' ? profile.priorities.length > 0 : field === 'englishLevel' ? profile.englishLevel.length > 0 : true;

  return <main className="onboarding"><header className="simple-header"><Logo /><span>Шаг {step + 1} из {questions.length}</span></header>
    <section className="quiz-card"><div className="flow-steps"><span className="complete">1. О приложении</span><span className="complete">2. Аккаунт</span><span className="active">3. Тест</span><span>4. План</span></div><div className="progress"><i style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div><p className="eyebrow">Твой личный маршрут</p><h1>{questions[step].title}</h1><p className="lead">{questions[step].subtitle}</p>
      {step === 0 && <><input className="nickname-input" value={profile.nickname} onChange={event => set('nickname', event.target.value)} placeholder="Например, qadam_hero" maxLength={20} autoFocus /><label className="select-label compact-label">Твой класс<QadamSelect value={profile.grade} onChange={value => set('grade', value)} options={['7 класс', '8 класс', '9 класс', '10 класс', '11 класс'].map(value => ({ value, label: value }))} /></label></>}
      {step > 0 && field !== 'englishLevel' && field !== 'grades' && <div className="option-grid">{choices.map((choice, index) => { const selected = field === 'country' ? profile.countries.includes(choice) : field === 'goal' ? profile.priorities.includes(choice) : profile[field] === choice; const icon = ['🎯', '📚', '🌍', '✨', '💡', '🏠'][index] ?? '✓'; return <button key={choice} className={selected ? 'option selected' : 'option'} onClick={() => field === 'country' ? toggleCountry(choice) : field === 'goal' ? togglePriority(choice) : set(field, choice)}>{field === 'country' ? <img className="country-flag" src={`https://flagcdn.com/w40/${countryFlagCodes[choice]}.png`} alt="" /> : <span>{icon}</span>}{choice}<b>✓</b></button>; })}</div>}
      {field === 'grades' && <div className="grade-entry"><span>📚</span><label>Средний балл<input type="number" min="2" max="5" step="0.1" value={profile.grades} onChange={event => set('grades', event.target.value)} /></label><small>Например: 4.3 из 5</small></div>}
      {field === 'englishLevel' && <EnglishPlacementTest savedLevel={profile.englishLevel} onComplete={level => set('englishLevel', level)} />}
      {field === 'country' && <p className="selection-count">Выбрано: {profile.countries.length} из 5</p>}
      {field === 'admissionYear' && <label className="custom-answer">Или напиши свой вариант<input value={options.admissionYear?.includes(profile.admissionYear) ? '' : profile.admissionYear} onChange={event => set('admissionYear', event.target.value)} placeholder="Например: после колледжа" /></label>}
      <div className="quiz-actions">{step > 0 && <button className="back-button" onClick={() => setStep(step - 1)}>← Назад</button>}<button className="primary" disabled={!canContinue} onClick={() => step < questions.length - 1 ? setStep(step + 1) : onComplete({ ...profile, goal: profile.priorities[0] })}>{step < questions.length - 1 ? 'Продолжить' : 'Создать мой план'} →</button></div>
      <p className="privacy-note">🔒 Ответы нужны только для твоих рекомендаций.</p>
    </section>
  </main>;
}

export function Logo() { return <div className="logo"><span>Q</span> Qadam</div>; }

