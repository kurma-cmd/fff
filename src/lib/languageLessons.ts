import { supabase } from './supabase';

export type ExerciseType = 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'translation';
export type LessonExercise = { type: ExerciseType; instruction: string; phrase: string; options: string[]; answer: string; hint: string };

const exerciseTypes: ExerciseType[] = ['vocabulary', 'grammar', 'reading', 'listening', 'translation'];
const exercise = (type: ExerciseType, instruction: string, phrase: string, options: string[], answer: string, hint: string): LessonExercise => ({ type, instruction, phrase, options, answer, hint });

const englishByLevel: Record<string, LessonExercise[]> = {
  A2: [
    exercise('grammar', 'Выбери правильную форму', 'She ___ to the library every Tuesday.', ['go', 'goes', 'is go'], 'goes', 'После she в Present Simple добавляем -s.'),
    exercise('reading', 'Прочитай и ответь', 'Leo studies in the morning because he works at a café in the evening. When does Leo study?', ['In the morning', 'In the evening', 'At night'], 'In the morning', 'Ответ прямо указан в первой части предложения.'),
    exercise('listening', 'Прослушай и выбери смысл', 'The lesson starts at half past nine.', ['Урок начинается в 9:30', 'Урок заканчивается в 9:30', 'Урок начинается в 8:30'], 'Урок начинается в 9:30', 'Half past nine — половина десятого, 9:30.'),
    exercise('vocabulary', 'Подбери значение выражения', 'I am looking forward to the trip.', ['Я жду поездку с радостью', 'Я отменяю поездку', 'Я опоздал на поездку'], 'Я жду поездку с радостью', 'Look forward to — ждать чего-то с радостью.'),
    exercise('translation', 'Выбери точный перевод', 'I have already finished my homework.', ['Я уже закончил домашнюю работу', 'Я сейчас начинаю домашнюю работу', 'Я никогда не делал домашнюю работу'], 'Я уже закончил домашнюю работу', 'Already показывает, что действие уже завершено.'),
  ],
  B1: [
    exercise('grammar', 'Закончи условное предложение', 'If I had more time, I ___ another language.', ['would learn', 'will learn', 'learned'], 'would learn', 'Во втором типе: if + Past Simple, would + глагол.'),
    exercise('reading', 'Определи главную мысль', 'Although online classes are flexible, many students miss face-to-face discussions and find it harder to stay motivated.', ['Онлайн-учёба удобна, но имеет сложности', 'Все студенты предпочитают онлайн', 'Очные занятия всегда дешевле'], 'Онлайн-учёба удобна, но имеет сложности', 'Although противопоставляет преимущество и недостатки.'),
    exercise('listening', 'Прослушай объявление', 'Students must submit the assignment by Friday, but they may ask for an extension in advance.', ['Сдать до пятницы, продление попросить заранее', 'Сдать после пятницы без разрешения', 'Задание отменили'], 'Сдать до пятницы, продление попросить заранее', 'Must — обязан, may — можно.'),
    exercise('vocabulary', 'Что значит выделенное выражение?', 'The scholarship will cover the cost of accommodation.', ['Оплатит стоимость жилья', 'Повысит стоимость жилья', 'Поможет найти работу'], 'Оплатит стоимость жилья', 'Cover the cost — покрыть расходы.'),
    exercise('translation', 'Выбери естественный перевод', 'I used to feel nervous before presentations, but now I enjoy them.', ['Раньше я нервничал перед презентациями, а теперь они мне нравятся', 'Я всегда любил презентации', 'Я всё ещё избегаю презентаций'], 'Раньше я нервничал перед презентациями, а теперь они мне нравятся', 'Used to описывает привычку или состояние в прошлом.'),
  ],
  B2: [
    exercise('grammar', 'Выбери грамматически точный вариант', 'Had I known about the deadline, I ___ my application earlier.', ['would have submitted', 'will submit', 'would submit'], 'would have submitted', 'Инверсия Had I known заменяет If I had known.'),
    exercise('reading', 'Прочитай текст и сделай вывод', 'The university introduced recorded lectures to improve accessibility. Attendance did not fall; instead, students used the recordings to review difficult material before exams.', ['Записи помогли повторять сложный материал', 'Студенты перестали посещать лекции', 'Университет отменил экзамены'], 'Записи помогли повторять сложный материал', 'Instead показывает результат, противоположный опасению.'),
    exercise('listening', 'Прослушай фрагмент лекции и выбери вывод', 'While the initial results appear promising, the sample was too small to establish a reliable connection between sleep and academic performance.', ['Нужны дополнительные исследования', 'Связь уже полностью доказана', 'Сон не влияет на учёбу'], 'Нужны дополнительные исследования', 'Small sample и reliable указывают на ограниченность вывода.'),
    exercise('vocabulary', 'Определи значение слова по контексту', 'The committee considered the candidate’s experience highly relevant to the research project.', ['Напрямую связанный и полезный', 'Случайный и неожиданный', 'Недостаточный'], 'Напрямую связанный и полезный', 'Relevant — имеющий прямое отношение к теме.'),
    exercise('translation', 'Выбери наиболее точный перевод', 'Despite being offered a place, she decided to defer her admission for a year.', ['Несмотря на зачисление, она отложила начало учёбы на год', 'Она отказалась подавать документы', 'Её поступление перенесли без согласия'], 'Несмотря на зачисление, она отложила начало учёбы на год', 'Defer admission — официально перенести начало обучения.'),
  ],
  C1: [
    exercise('grammar', 'Выбери точную академическую конструкцию', 'Only after the data had been independently verified ___ the researchers publish their findings.', ['did', 'had', 'were'], 'did', 'После Only after нужна инверсия: did the researchers publish.'),
    exercise('reading', 'Определи позицию автора', 'Standardised tests offer a convenient measure of performance; nevertheless, treating them as the sole indicator of ability risks overlooking creativity, resilience, and contextual disadvantage.', ['Тесты полезны, но не должны быть единственным критерием', 'Стандартные тесты необходимо отменить', 'Креативность невозможно оценивать'], 'Тесты полезны, но не должны быть единственным критерием', 'Nevertheless вводит ограничение основного утверждения.'),
    exercise('listening', 'Прослушай и определи степень уверенности', 'The findings may indicate a correlation, yet they fall short of demonstrating a direct causal relationship.', ['Связь возможна, но причинность не доказана', 'Причинность доказана окончательно', 'Между явлениями нет никакой связи'], 'Связь возможна, но причинность не доказана', 'May и fall short показывают осторожный вывод.'),
    exercise('vocabulary', 'Выбери ближайшее значение', 'The proposed reform could have far-reaching implications for international applicants.', ['Масштабные долгосрочные последствия', 'Небольшое временное влияние', 'Очевидные преимущества'], 'Масштабные долгосрочные последствия', 'Far-reaching — влияющий широко и надолго.'),
    exercise('translation', 'Выбери точный академический перевод', 'The evidence is compelling, albeit insufficient to warrant an immediate change in policy.', ['Доказательства убедительны, хотя их недостаточно для немедленной смены политики', 'Доказательства полностью опровергают политику', 'Политику уже изменили из-за недостатка данных'], 'Доказательства убедительны, хотя их недостаточно для немедленной смены политики', 'Albeit означает «хотя», warrant — давать достаточное основание.'),
  ],
};

function basicFallback(words: [string, string][], topic: string): LessonExercise[] {
  const start = [...topic].reduce((sum, character) => sum + character.charCodeAt(0), 0) % words.length;
  const lessonWords = Array.from({ length: Math.min(5, words.length) }, (_, index) => words[(start + index) % words.length]);
  return lessonWords.map(([word, meaning], index) => { const distractors = words.filter(item => item[1] !== meaning).slice(start + index + 1).concat(words).map(item => item[1]); const options = [meaning, ...new Set(distractors)].slice(0, 3); return exercise(index === 2 ? 'listening' : 'vocabulary', index === 2 ? 'Прослушай и выбери перевод' : 'Выбери перевод', word, options, meaning, `${word} означает «${meaning}».`); });
}

const isExercise = (value: unknown): value is LessonExercise => { if (!value || typeof value !== 'object') return false; const item = value as Record<string, unknown>; return ['instruction', 'phrase', 'answer', 'hint'].every(key => typeof item[key] === 'string') && exerciseTypes.includes(item.type as ExerciseType) && Array.isArray(item.options) && item.options.length >= 2 && item.options.every(option => typeof option === 'string'); };
const fallback = (language: string, level: string, words: [string, string][], topic: string) => language === 'Английский' ? englishByLevel[level === 'A1' ? 'A2' : level === 'C2' ? 'C1' : level] ?? englishByLevel.B1 : basicFallback(words, topic);
const matchesLevel = (items: LessonExercise[], level: string) => !['B2', 'C1', 'C2'].includes(level) || items.reduce((sum, item) => sum + item.phrase.length, 0) / items.length >= (level === 'B2' ? 45 : 60);

export async function generateLanguageLesson(language: string, level: string, topic: string, words: [string, string][]) {
  const prompt = `Создай урок ${language} уровня ${level} по теме «${topic}». Ровно 5 заданий и ровно по одному типу: vocabulary, grammar, reading, listening, translation. Для reading дай связный текст, для listening — естественное предложение, для grammar — конструкцию уровня ${level}. Запрещено использовать задания ниже ${level}. Верни только JSON-массив: {"type":"...","instruction":"на русском","phrase":"на изучаемом языке","options":["3 варианта"],"answer":"один из options","hint":"объяснение правила или смысла"}.`;
  const { data, error } = await supabase.functions.invoke('ai', { body: { prompt, system: 'Ты строгий CEFR-методист. Урок должен развивать навык, а не проверять элементарные слова ниже уровня ученика.' } });
  if (error || typeof data?.text !== 'string') return fallback(language, level, words, topic);
  try { const parsed: unknown = JSON.parse(data.text.replace(/^```json\s*|\s*```$/g, '')); return Array.isArray(parsed) && parsed.length === 5 && parsed.every(isExercise) && matchesLevel(parsed, level) ? parsed : fallback(language, level, words, topic); } catch { return fallback(language, level, words, topic); }
}
