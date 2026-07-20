export type LanguageCourse = {
  id: string;
  name: string;
  flag: string;
  exam: string;
  words: [string, string][];
};

export const languageCourses: LanguageCourse[] = [
  { id: 'english', name: 'Английский', flag: '🇬🇧', exam: 'IELTS / TOEFL', words: [['Hello', 'Привет'], ['Thank you', 'Спасибо'], ['University', 'Университет']] },
  { id: 'korean', name: 'Корейский', flag: '🇰🇷', exam: 'TOPIK', words: [['안녕하세요', 'Привет'], ['감사합니다', 'Спасибо'], ['대학교', 'Университет']] },
  { id: 'german', name: 'Немецкий', flag: '🇩🇪', exam: 'TestDaF / Goethe', words: [['Hallo', 'Привет'], ['Danke', 'Спасибо'], ['Universität', 'Университет']] },
  { id: 'french', name: 'Французский', flag: '🇫🇷', exam: 'DELF / DALF', words: [['Bonjour', 'Привет'], ['Merci', 'Спасибо'], ['Université', 'Университет']] },
  { id: 'italian', name: 'Итальянский', flag: '🇮🇹', exam: 'CILS / CELI', words: [['Ciao', 'Привет'], ['Grazie', 'Спасибо'], ['Università', 'Университет']] },
  { id: 'dutch', name: 'Нидерландский', flag: '🇳🇱', exam: 'NT2', words: [['Hallo', 'Привет'], ['Bedankt', 'Спасибо'], ['Universiteit', 'Университет']] },
  { id: 'turkish', name: 'Турецкий', flag: '🇹🇷', exam: 'TÖMER', words: [['Merhaba', 'Привет'], ['Teşekkürler', 'Спасибо'], ['Üniversite', 'Университет']] },
  { id: 'japanese', name: 'Японский', flag: '🇯🇵', exam: 'JLPT', words: [['こんにちは', 'Привет'], ['ありがとう', 'Спасибо'], ['大学', 'Университет']] },
  { id: 'czech', name: 'Чешский', flag: '🇨🇿', exam: 'Чешский B2', words: [['Ahoj', 'Привет'], ['Děkuji', 'Спасибо'], ['Univerzita', 'Университет']] },
  { id: 'chinese', name: 'Китайский', flag: '🇨🇳', exam: 'HSK', words: [['你好', 'Привет'], ['谢谢', 'Спасибо'], ['大学', 'Университет']] },
  { id: 'arabic', name: 'Арабский', flag: '🇦🇪', exam: 'Внутренний тест', words: [['مرحبا', 'Привет'], ['شكرا', 'Спасибо'], ['جامعة', 'Университет']] },
  { id: 'thai', name: 'Тайский', flag: '🇹🇭', exam: 'Внутренний тест', words: [['สวัสดี', 'Привет'], ['ขอบคุณ', 'Спасибо'], ['มหาวิทยาลัย', 'Университет']] },
  { id: 'indonesian', name: 'Индонезийский', flag: '🇮🇩', exam: 'BIPA', words: [['Halo', 'Привет'], ['Terima kasih', 'Спасибо'], ['Universitas', 'Университет']] },
  { id: 'vietnamese', name: 'Вьетнамский', flag: '🇻🇳', exam: 'Внутренний тест', words: [['Xin chào', 'Привет'], ['Cảm ơn', 'Спасибо'], ['Đại học', 'Университет']] },
  { id: 'kazakh', name: 'Казахский', flag: '🇰🇿', exam: 'Зависит от программы', words: [['Сәлем', 'Привет'], ['Рақмет', 'Спасибо'], ['Университет', 'Университет']] },
  { id: 'russian', name: 'Русский', flag: '🇰🇿', exam: 'Зависит от программы', words: [['Привет', 'Приветствие'], ['Спасибо', 'Благодарность'], ['Университет', 'Место учёбы']] },
  { id: 'malay', name: 'Малайский', flag: '🇲🇾', exam: 'Внутренний тест', words: [['Hai', 'Привет'], ['Terima kasih', 'Спасибо'], ['Universiti', 'Университет']] },
  { id: 'hindi', name: 'Хинди', flag: '🇮🇳', exam: 'Внутренний тест', words: [['नमस्ते', 'Привет'], ['धन्यवाद', 'Спасибо'], ['विश्वविद्यालय', 'Университет']] },
];

export const countryCourses: Record<string, string[]> = {
  Казахстан: ['kazakh', 'russian'], США: ['english'], Канада: ['english', 'french'], Германия: ['german'],
  'Южная Корея': ['korean'], Великобритания: ['english'], Франция: ['french'], Италия: ['italian'],
  Нидерланды: ['dutch'], Турция: ['turkish'], Япония: ['japanese'], Чехия: ['czech'], Китай: ['chinese'],
  Сингапур: ['english'], Малайзия: ['english', 'malay'], ОАЭ: ['english', 'arabic'], Катар: ['english', 'arabic'],
  'Саудовская Аравия': ['arabic', 'english'], Индия: ['english', 'hindi'], Таиланд: ['thai', 'english'], Индонезия: ['indonesian', 'english'], Вьетнам: ['vietnamese', 'english'],
};

const getCoreLessonTitles = (level: string) => level === 'A1' || level === 'A2' ? [
  'Приветствие и знакомство', 'Числа и время', 'Семья и друзья', 'Город и транспорт',
  'Еда и покупки', 'Моё расписание', 'На кампусе', 'Вопрос преподавателю',
  'Анкета студента', 'Простое собеседование', 'В общежитии', 'Итоговый диалог',
] : level === 'B1' || level === 'B2' ? [
  'Уверенное знакомство', 'Объясняем своё мнение', 'Учебные привычки', 'Планы и дедлайны',
  'Лекция и конспект', 'Обсуждение проекта', 'Письмо преподавателю', 'Презентация идеи',
  'Мотивационное письмо', 'Интервью в вуз', 'Жизнь за границей', 'Итоговая дискуссия',
] : [
  'Академическое знакомство', 'Аргумент и контраргумент', 'Сложный научный текст', 'Причина и следствие',
  'Анализ лекции', 'Исследовательская дискуссия', 'Формальная переписка', 'Защита презентации',
  'Мотивационное эссе', 'Сложное интервью', 'Межкультурная коммуникация', 'Итоговые дебаты',
];

const nextLessonTitles = ['Разговор в новой ситуации', 'Новости и главная мысль', 'Фильм: понимаем диалог', 'Живая речь и сокращения', 'Объясняем сложную идею', 'Сравниваем две точки зрения', 'Письмо в университет', 'Обсуждаем исследование', 'Собеседование без заучивания', 'Дискуссия и аргументы', 'Большой текст без перевода', 'Финальный проект'];
export const getLessonTitles = (level: string) => [...getCoreLessonTitles(level), ...nextLessonTitles];

export function getUniversityLanguageInfo(name: string, country: string, instructionLanguage: string) {
  const courseId = countryCourses[country]?.find(id => id !== 'english') ?? 'english';
  const course = languageCourses.find(item => item.id === courseId) ?? languageCourses[0];
  if (name === 'KAIST') return { course, status: 'Для поступления нужен английский. Корейский понадобится после зачисления и для жизни.', required: false };
  const instruction = instructionLanguage.toLowerCase();
  if (instruction === 'английский' && courseId !== 'english') return { course, status: `${course.name} не обязателен для этой программы, но полезен для жизни и работы.`, required: false };
  if (instruction.includes('англ') && (instruction.includes('/') || instruction.includes('или'))) return { course, status: `Зависит от программы: можно выбрать английский или ${course.name.toLowerCase()}.`, required: false };
  return { course, status: `${course.name} нужен для обучения на этой программе.`, required: true };
}
