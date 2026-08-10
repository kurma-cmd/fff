import type { StudentProfile } from '../App';
import type { TrackedUniversity } from './admissionTracker';
import { universityCatalog } from './universityCatalog';

export type ReadinessCheck = { label: string; passed: boolean; nextStep: string };
export type ReadinessResult = {
  completed: number;
  total: number;
  percentage: number;
  checks: ReadinessCheck[];
};

const englishLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export function calculateReadiness(profile: StudentProfile, tracked: TrackedUniversity): ReadinessResult {
  const university = universityCatalog.find(item => item.name === tracked.university_name);
  const currentEnglish = englishLevels.indexOf(profile.englishLevel);
  const requiredEnglish = university ? englishLevels.indexOf(university.englishBand) : -1;
  const englishIsKnown = requiredEnglish >= 0;

  const checks: ReadinessCheck[] = [
    { label: 'Точная программа выбрана', passed: Boolean(tracked.intended_program), nextStep: 'Выбрать точную программу' },
    { label: 'Дедлайн сохранён', passed: Boolean(tracked.deadline), nextStep: 'Проверить официальный дедлайн' },
    { label: 'Резюме загружено', passed: Boolean(profile.resumePath), nextStep: 'Подготовить первое резюме' },
    { label: 'Средний балл указан', passed: Boolean(profile.grades), nextStep: 'Добавить средний балл' },
    { label: 'Результат экзамена указан', passed: Boolean(profile.ieltsScore || profile.satScore), nextStep: 'Добавить IELTS, TOEFL или SAT' },
  ];

  if (englishIsKnown) checks.push({
    label: `Английский соответствует ориентиру ${university?.englishBand}`,
    passed: currentEnglish >= requiredEnglish,
    nextStep: `Поднять английский до ${university?.englishBand}`,
  });

  const completed = checks.filter(check => check.passed).length;
  const total = checks.length;
  return { completed, total, percentage: Math.round(completed / total * 100), checks };
}
