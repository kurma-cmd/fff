import type { SignLanguage } from './LanguagePicker';

type FeatureGridProps = { language: SignLanguage };

const russianFeatures = [
  { id: 'learn', icon: '☝️', title: 'Учись', text: 'Короткие уроки, понятные объяснения и полезные жесты на каждый день.', action: 'Открыть уроки' },
  { id: 'practice', icon: '✋', title: 'Практикуйся', text: 'Закрепляй знания с карточками и небольшими тестами.', action: 'Начать практику' },
  { id: 'talk', icon: '💬', title: 'Общайся', text: 'Быстро находи нужные фразы и показывай их собеседнику.', action: 'Открыть разговорник' },
];

const englishFeatures = [
  { id: 'learn', icon: '☝️', title: 'Learn', text: 'Short lessons, clear explanations, and useful signs for everyday life.', action: 'Open lessons' },
  { id: 'practice', icon: '✋', title: 'Practice', text: 'Build your skills with flashcards and quick quizzes.', action: 'Start practicing' },
  { id: 'talk', icon: '💬', title: 'Communicate', text: 'Quickly find useful phrases and show them to the person you are talking to.', action: 'Open phrasebook' },
];

export function FeatureGrid({ language }: FeatureGridProps) {
  const languageName = language === 'rsl' ? 'РЖЯ' : 'ASL';
  const isEnglish = language === 'asl';
  const features = isEnglish ? englishFeatures : russianFeatures;

  return (
    <section className="features" aria-label={isEnglish ? `Features for ${languageName}` : `Возможности для ${languageName}`}>
      {features.map((feature, index) => (
        <article className="feature-card" id={feature.id} key={feature.id}>
          <div className={`feature-icon tone-${index}`} aria-hidden="true">{feature.icon}</div>
          <div className="feature-number">0{index + 1} · {languageName}</div>
          <h2>{feature.title}</h2>
          <p>{feature.text}</p>
          <button type="button" onClick={() => alert(isEnglish ? `${feature.title}: coming soon` : `${feature.title}: раздел скоро появится`)}>
            {feature.action} <span>→</span>
          </button>
        </article>
      ))}
    </section>
  );
}
