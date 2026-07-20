export type SignLanguage = 'rsl' | 'asl';

type LanguagePickerProps = {
  value: SignLanguage;
  onChange: (language: SignLanguage) => void;
};

export function LanguagePicker({ value, onChange }: LanguagePickerProps) {
  const isEnglish = value === 'asl';
  const languages: { id: SignLanguage; flag: string; name: string; description: string }[] = [
    { id: 'rsl', flag: '🇷🇺', name: 'РЖЯ', description: isEnglish ? 'Russian Sign Language' : 'Русский жестовый язык' },
    { id: 'asl', flag: '🇺🇸', name: 'ASL', description: isEnglish ? 'American Sign Language' : 'Американский жестовый язык' },
  ];

  return (
    <div className="language-picker" aria-label={isEnglish ? 'Choose a sign language' : 'Выберите жестовый язык'}>
      {languages.map((language) => (
        <button
          className={value === language.id ? 'language active' : 'language'}
          key={language.id}
          onClick={() => onChange(language.id)}
          type="button"
          aria-pressed={value === language.id}
        >
          <span className="flag" aria-hidden="true">{language.flag}</span>
          <span><strong>{language.name}</strong><small>{language.description}</small></span>
          <span className="check" aria-hidden="true">✓</span>
        </button>
      ))}
    </div>
  );
}
