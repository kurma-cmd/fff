type LanguageInfo = { language: string; target: string; exam: string; importance: string };

const languageInfo: Record<string, LanguageInfo> = {
  'Казахстан': { language: 'Казахский / русский', target: 'B1 для повседневной жизни', exam: 'Зависит от программы', importance: 'Для англоязычной программы может не требоваться.' },
  'США': { language: 'Английский', target: 'B2–C1', exam: 'IELTS / TOEFL', importance: 'Основной язык учёбы и жизни.' },
  'Канада': { language: 'Английский / французский', target: 'B2–C1', exam: 'IELTS / TOEFL / TEF', importance: 'Французский особенно важен для франкоязычных программ.' },
  'Германия': { language: 'Немецкий', target: 'B2–C1', exam: 'TestDaF / DSH / Goethe', importance: 'Нужен для немецкоязычных программ; для английских полезен в жизни.' },
  'Южная Корея': { language: 'Корейский', target: 'TOPIK 3–4', exam: 'TOPIK', importance: 'Нужен для корейских программ и сильно помогает в быту.' },
  'Великобритания': { language: 'Английский', target: 'B2–C1', exam: 'IELTS / TOEFL', importance: 'Основной язык обучения.' },
  'Франция': { language: 'Французский', target: 'B2–C1', exam: 'DELF / DALF / TCF', importance: 'Часто нужен на бакалавриате; для английских программ полезен в жизни.' },
  'Италия': { language: 'Итальянский', target: 'B2', exam: 'CILS / CELI', importance: 'Нужен для италоязычных программ.' },
  'Нидерланды': { language: 'Нидерландский', target: 'B1–B2', exam: 'NT2', importance: 'Многие программы доступны на английском, но язык полезен для жизни и работы.' },
  'Турция': { language: 'Турецкий', target: 'B2', exam: 'TÖMER', importance: 'Нужен для турецкоязычных программ.' },
  'Япония': { language: 'Японский', target: 'JLPT N2', exam: 'JLPT / EJU', importance: 'Нужен для большинства японских программ и повседневной жизни.' },
  'Чехия': { language: 'Чешский', target: 'B2', exam: 'Сертификат чешского B2', importance: 'Чешские программы могут быть бесплатнее англоязычных.' },
  'Китай': { language: 'Китайский', target: 'HSK 4–5', exam: 'HSK', importance: 'Нужен для программ на китайском.' },
  'Сингапур': { language: 'Английский', target: 'B2–C1', exam: 'IELTS / TOEFL', importance: 'Основной язык обучения.' },
  'Малайзия': { language: 'Английский', target: 'B2', exam: 'IELTS / TOEFL / MUET', importance: 'Во многих университетах достаточно английского.' },
  'ОАЭ': { language: 'Английский / арабский', target: 'B2 по английскому', exam: 'IELTS / TOEFL', importance: 'Для многих программ достаточно английского; арабский полезен в жизни.' },
  'Катар': { language: 'Английский / арабский', target: 'B2–C1 по английскому', exam: 'IELTS / TOEFL', importance: 'Язык зависит от программы.' },
  'Саудовская Аравия': { language: 'Арабский / английский', target: 'B2 по языку программы', exam: 'IELTS / TOEFL или внутренний тест', importance: 'Требование зависит от программы.' },
  'Индия': { language: 'Английский', target: 'B2', exam: 'IELTS / TOEFL или внутренний тест', importance: 'Во многих университетах обучение проходит на английском.' },
  'Таиланд': { language: 'Тайский / английский', target: 'B2 по языку программы', exam: 'IELTS / TOEFL', importance: 'Для международных программ обычно достаточно английского.' },
  'Индонезия': { language: 'Индонезийский / английский', target: 'B1–B2', exam: 'BIPA / IELTS / TOEFL', importance: 'Язык зависит от программы.' },
  'Вьетнам': { language: 'Вьетнамский / английский', target: 'B1–B2', exam: 'IELTS / TOEFL или внутренний тест', importance: 'Для международной программы может быть достаточно английского.' },
};

export function CountryLanguagePlans({ countries, readiness }: { countries: string[]; readiness: string }) {
  return <section className="panel country-languages">
    <div className="section-title"><div><p className="eyebrow">Языки выбранных стран</p><h2>Что ещё может понадобиться</h2></div></div>
    <p className="language-readiness">Твой ответ: <b>{readiness}</b></p>
    <div className="country-language-grid">{countries.map(country => {
      const info = languageInfo[country];
      if (!info) return null;
      return <article key={country}><span>🌍</span><div><small>{country}</small><h3>{info.language}</h3><p>{info.importance}</p><dl><div><dt>Цель</dt><dd>{info.target}</dd></div><div><dt>Экзамен</dt><dd>{info.exam}</dd></div></dl></div></article>;
    })}</div>
    <p className="data-note">Перед началом подготовки выбери конкретную программу: язык обучения всегда важнее общего языка страны.</p>
  </section>;
}
