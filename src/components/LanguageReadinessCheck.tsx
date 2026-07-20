type Props = {
  language: string;
  onKnowBasics: () => void;
  onStartFromZero: () => void;
  onCancel: () => void;
};

export function LanguageReadinessCheck({ language, onKnowBasics, onStartFromZero, onCancel }: Props) {
  return <main className="lesson-session">
    <header className="lesson-topbar"><button onClick={onCancel}>×</button></header>
    <section className="exercise-card language-readiness-check">
      <p className="eyebrow">Перед проверкой</p>
      <h1>Ты уже немного знаешь {language.toLowerCase()}?</h1>
      <p>Отвечай честно — это не экзамен. Нам нужно подобрать задания, которые не будут слишком лёгкими или сложными.</p>
      <div className="readiness-actions">
        <button className="primary" onClick={onKnowBasics}>Да, хочу проверить уровень →</button>
        <button className="placement-button" onClick={onStartFromZero}>Нет, начну с азов</button>
      </div>
    </section>
  </main>;
}
