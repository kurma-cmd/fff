import type { StudentProfile } from '../App';
import type { University } from './universities';
import { supabase } from './supabase';

async function askAi(prompt: string) {
  const { data, error } = await supabase.functions.invoke('ai', { body: {
    system: 'Ты спокойный помощник школьника по поступлению. Используй только переданные данные. Не выдумывай цены, дедлайны, шансы и требования. Пиши кратко и по-русски.', prompt,
  } });
  if (error || !data || typeof data.text !== 'string') throw new Error('AI-помощник сейчас недоступен');
  return data.text.trim();
}

export function suggestNextStep(profile: StudentProfile, context: string) {
  return askAi(`Профиль: ${JSON.stringify(profile)}. Рекомендация приложения: ${context}. Дай одно действие на сегодня: заголовок на первой строке и объяснение до 2 предложений.`);
}

export function compareUniversities(profile: StudentProfile, universities: University[]) {
  const facts = universities.map(({ name, country, city, language, englishBand, directions, cost, funding, housing }) => ({ name, country, city, language, englishBand, directions, cost, funding, housing }));
  return askAi(`Профиль: ${JSON.stringify(profile)}. Вузы: ${JSON.stringify(facts)}. Сравни только по этим данным. Дай краткий вывод, затем по строке «Название — сильная сторона; что проверить» и один следующий шаг.`);
}
