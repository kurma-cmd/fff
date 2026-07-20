export type EnglishBand = 'B1' | 'B2' | 'C1';
type LegacyEnglishBand = 'Начальный' | 'Средний' | 'Продвинутый';
export type CostBand = 'Низкая' | 'Средняя' | 'Высокая';

export type University = {
  name: string;
  city: string;
  country: string;
  language: string;
  englishBand: EnglishBand;
  directions: string[];
  cost: CostBand;
  funding: boolean;
  housing: boolean;
  url: string;
};

export type UniversitySeed = Omit<University, 'country'>;

export const makeUniversity = (
  name: string,
  city: string,
  language: string,
  englishBand: LegacyEnglishBand | EnglishBand,
  directions: string[],
  cost: CostBand,
  funding: boolean,
  housing: boolean,
  url: string,
): UniversitySeed => ({ name, city, language, englishBand: ({ Начальный: 'B1', Средний: 'B2', Продвинутый: 'C1' } as Record<LegacyEnglishBand, EnglishBand>)[englishBand as LegacyEnglishBand] ?? englishBand as EnglishBand, directions, cost, funding, housing, url });

export const languagePlans: Record<string, { language: string; target: string; exam: string; note: string }> = {
  'Казахстан': { language: 'Английский', target: 'B2', exam: 'IELTS / внутренний тест', note: 'Точный уровень зависит от программы.' },
  'Южная Корея': { language: 'Корейский или английский', target: 'TOPIK 3–4 / B2', exam: 'TOPIK / IELTS / TOEFL', note: 'Есть программы полностью на английском.' },
  'Германия': { language: 'Немецкий или английский', target: 'B2–C1', exam: 'TestDaF / DSH / IELTS', note: 'На бакалавриате особенно много программ на немецком.' },
  'США': { language: 'Английский', target: 'B2–C1', exam: 'IELTS / TOEFL / Duolingo', note: 'Допустимый экзамен определяет университет.' },
};
