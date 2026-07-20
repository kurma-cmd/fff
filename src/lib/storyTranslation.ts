import { roleModelJourneys } from './roleModelJourneys';
import type { RoleModel } from './roleModels';
import { supabase } from './supabase';

export type StoryLanguage = 'Русский' | 'English' | 'Қазақша';
export type StoryContent = {
  achievement: string; beginning: string; idea: string; process: string;
  obstacle: string; result: string; lesson: string; question: string;
  options: string[]; answer: string;
};

export function originalStory(person: RoleModel): StoryContent {
  const journey = roleModelJourneys[person.name];
  return { achievement: person.achievement, beginning: journey?.beginning ?? person.story,
    idea: person.story, process: journey?.process ?? person.story, obstacle: journey?.obstacle ?? person.story,
    result: `${person.achievement}. Этот результат показал другим людям новый способ решать похожие задачи.`,
    lesson: person.lesson, question: person.question, options: person.options, answer: person.answer };
}

function parseTranslation(value: string) {
  try {
    const parsed = JSON.parse(value.replace(/^```json\s*|\s*```$/g, '')) as StoryContent;
    if (!parsed.question || parsed.options?.length !== 3 || !parsed.options.includes(parsed.answer)) return;
    return parsed;
  } catch { return; }
}

export async function translateStory(person: RoleModel, language: StoryLanguage) {
  const original = originalStory(person);
  if (language === 'Русский') return original;
  const prompt = `Translate every string in this JSON into ${language}. Keep names, dates and facts accurate. Keep exactly the same keys and exactly 3 options. The answer must exactly match one translated option. Return only valid JSON: ${JSON.stringify(original)}`;
  const { data, error } = await supabase.functions.invoke('ai', { body: { prompt, system: 'You are a careful educational translator. Do not add or remove facts. Return JSON only.' } });
  if (error || typeof data?.text !== 'string') return;
  return parseTranslation(data.text);
}
