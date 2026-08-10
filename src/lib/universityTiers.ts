import { catalogStrongExpansion } from './catalogStrongExpansion';
import type { University } from './universities';

export type UniversityTier = 'super' | 'top' | 'strong' | 'other';

export const universityTierOrder: UniversityTier[] = ['super', 'top', 'strong', 'other'];

export const universityTierInfo: Record<UniversityTier, { label: string; description: string }> = {
  super: { label: 'Супер-топ', description: 'Всемирно известные вузы с крайне высоким конкурсом' },
  top: { label: 'Топовые', description: 'Очень сильные университеты с высокой конкуренцией' },
  strong: { label: 'Сильные', description: 'Качественные вузы с заметными программами' },
  other: { label: 'Другие варианты', description: 'Дополнительные университеты для широкого выбора' },
};

const superTop = new Set([
  'Harvard University', 'Stanford University', 'Massachusetts Institute of Technology',
  'University of Oxford', 'University of Cambridge', 'Imperial College London',
  'Tsinghua University', 'Peking University', 'National University of Singapore',
]);

const top = new Set([
  'London School of Economics', 'KAIST', 'Seoul National University',
  'University of California, Berkeley', 'Georgia Institute of Technology',
  'Université PSL', 'Erasmus University Rotterdam', 'Wageningen University & Research',
  'University of Tokyo', 'Kyoto University', 'Nanyang Technological University',
]);

const strong = new Set(catalogStrongExpansion.map(university => university.name));

const ivyLeague = new Set([
  'Brown University', 'Columbia University', 'Cornell University', 'Dartmouth College',
  'Harvard University', 'University of Pennsylvania', 'Princeton University', 'Yale University',
]);

export function getUniversityTier(university: University): UniversityTier {
  if (superTop.has(university.name)) return 'super';
  if (top.has(university.name)) return 'top';
  if (strong.has(university.name)) return 'strong';
  return 'other';
}

export function isIvyLeague(university: University) {
  return ivyLeague.has(university.name);
}
