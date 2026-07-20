import { catalogAsia } from './catalogAsia';
import { catalogEurope } from './catalogEurope';
import { catalogWorld } from './catalogWorld';
import { catalogMore } from './catalogMore';
import { catalogStrongExpansion } from './catalogStrongExpansion';
import type { University, UniversitySeed } from './universities';

const groups: Record<string, UniversitySeed[]> = { ...catalogEurope, ...catalogAsia, ...catalogWorld };

export const universityCatalog: University[] = Object.entries(groups).flatMap(([country, universities]) =>
  universities.map(university => ({ ...university, country })),
).concat(catalogMore, catalogStrongExpansion);

const englishRanks: Record<string, number> = {
  A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6,
};

export function getEnglishMatch(level: string, university: University) {
  const current = englishRanks[level] ?? 1;
  const required = englishRanks[university.englishBand];
  if (current >= required) return { label: 'Английский: подходит', score: 3 };
  if (required - current === 1) return { label: 'Английский: нужен +1 уровень', score: 2 };
  return { label: 'Английский: нужна подготовка', score: 1 };
}

const extremelyCompetitive = new Set([
  'Harvard University', 'Stanford University', 'Massachusetts Institute of Technology',
  'University of Oxford', 'University of Cambridge', 'Imperial College London',
  'London School of Economics', 'Tsinghua University', 'Peking University',
  'National University of Singapore', 'KAIST', 'Seoul National University',
]);

export function getCompetitionLevel(university: University) {
  if (extremelyCompetitive.has(university.name)) return { label: 'Крайне высокий конкурс', tone: 'extreme', note: 'Даже отличные оценки и сильный английский не означают высокий шанс зачисления. Нужны сильные достижения, профиль и запасные варианты.' };
  return { label: 'Конкурс нужно проверить', tone: 'unknown', note: 'Селективность зависит от программы, года и категории поступающего. Не считай совпадение по фильтрам оценкой шанса.' };
}

type MatchProfile = {
  direction: string;
  englishLevel: string;
  grades: string;
  budget: string;
  priorities: string[];
};

export function getProfileMatch(profile: MatchProfile, university: University) {
  const reasons: string[] = [];
  let score = getEnglishMatch(profile.englishLevel, university).score * 2;
  if (university.directions.includes(profile.direction)) { score += 4; reasons.push('есть твоё направление'); }
  if (profile.budget.includes('грант') || profile.priorities.includes('Полный грант')) {
    if (university.funding) { score += 3; reasons.push('есть финансирование'); }
  }
  if (profile.budget.includes('$3 000') && university.cost === 'Низкая') { score += 2; reasons.push('ближе к бюджету'); }
  if (profile.priorities.includes('Недорогое жильё') && university.housing) { score += 2; reasons.push('есть жильё'); }
  if (profile.priorities.includes('Обучение на английском') && university.language.toLowerCase().includes('англ')) { score += 2; reasons.push('обучение на английском'); }
  const grade = Number(profile.grades);
  const targetGrade = university.englishBand === 'C1' ? 4.4 : university.englishBand === 'B2' ? 4 : 3.5;
  if (grade >= targetGrade) { score += 2; reasons.push('оценки соответствуют базовому ориентиру'); }
  return { score, reasons: reasons.slice(0, 3) };
}
