import { readFile, writeFile } from 'node:fs/promises';

const sourceUrl = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json';
const countryNames = {
  Kazakhstan: 'Казахстан', 'United States': 'США', Germany: 'Германия',
  'South Korea': 'Южная Корея', 'United Kingdom': 'Великобритания', Canada: 'Канада',
  France: 'Франция', Italy: 'Италия', Netherlands: 'Нидерланды', Turkey: 'Турция',
  Japan: 'Япония', Czechia: 'Чехия', China: 'Китай', Singapore: 'Сингапур',
  Malaysia: 'Малайзия', 'United Arab Emirates': 'ОАЭ', Qatar: 'Катар',
  'Saudi Arabia': 'Саудовская Аравия', India: 'Индия', Thailand: 'Таиланд',
  Indonesia: 'Индонезия', Vietnam: 'Вьетнам',
};
const defaults = {
  Казахстан: ['Казахский / русский / английский', 'B1', 'Низкая'],
  США: ['Английский', 'C1', 'Высокая'], Германия: ['Немецкий / английский', 'C1', 'Низкая'],
  'Южная Корея': ['Корейский / английский', 'C1', 'Средняя'],
  Великобритания: ['Английский', 'C1', 'Высокая'], Канада: ['Английский / французский', 'C1', 'Высокая'],
  Франция: ['Французский / английский', 'B2', 'Низкая'], Италия: ['Итальянский / английский', 'B2', 'Низкая'],
  Нидерланды: ['Нидерландский / английский', 'C1', 'Высокая'], Турция: ['Турецкий / английский', 'B2', 'Низкая'],
  Япония: ['Японский / английский', 'C1', 'Средняя'], Чехия: ['Чешский / английский', 'B2', 'Средняя'],
  Китай: ['Китайский / английский', 'B2', 'Средняя'], Сингапур: ['Английский', 'C1', 'Высокая'],
  Малайзия: ['Малайский / английский', 'B2', 'Низкая'], ОАЭ: ['Арабский / английский', 'B2', 'Высокая'],
  Катар: ['Арабский / английский', 'C1', 'Высокая'], 'Саудовская Аравия': ['Арабский / английский', 'B2', 'Низкая'],
  Индия: ['Английский / хинди', 'B2', 'Низкая'], Таиланд: ['Тайский / английский', 'B2', 'Средняя'],
  Индонезия: ['Индонезийский / английский', 'B2', 'Низкая'], Вьетнам: ['Вьетнамский / английский', 'B2', 'Низкая'],
};

const files = ['catalogEurope.ts', 'catalogAsia.ts', 'catalogWorld.ts', 'catalogMore.ts', 'catalogStrongExpansion.ts'];
const existing = new Set();
for (const file of files) {
  const text = await readFile(new URL(`../src/lib/${file}`, import.meta.url), 'utf8');
  for (const match of text.matchAll(/(?:u\(|\[)\s*['"]([^'"]+)['"]\s*,/g)) existing.add(match[1].toLowerCase());
}

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Dataset request failed: ${response.status}`);
const records = await response.json();
const groups = new Map(Object.keys(countryNames).map(country => [country, []]));
for (const item of records) {
  if (!groups.has(item.country) || existing.has(item.name.toLowerCase())) continue;
  const url = item.web_pages?.find(value => value.startsWith('https://')) ?? item.web_pages?.[0];
  if (!url || groups.get(item.country).some(value => value.name === item.name)) continue;
  groups.get(item.country).push({ name: item.name, url });
}

const selected = [];
while (selected.length < 279) {
  let added = false;
  for (const country of Object.keys(countryNames)) {
    const item = groups.get(country).shift();
    if (!item) continue;
    selected.push({ ...item, country: countryNames[country] });
    added = true;
    if (selected.length === 279) break;
  }
  if (!added) throw new Error('Not enough unique universities');
}

const quote = value => JSON.stringify(value);
const rows = selected.map(({ name, country, url }) => {
  const [language, englishBand, cost] = defaults[country];
  return `  { name: ${quote(name)}, city: 'Город уточняется', country: ${quote(country)}, language: ${quote(language)}, englishBand: '${englishBand}', directions: all, cost: '${cost}', funding: false, housing: false, url: ${quote(url)} },`;
});
const chunks = Array.from({ length: 4 }, (_, index) => rows.slice(index * 70, (index + 1) * 70));
for (const [index, chunk] of chunks.entries()) {
  const output = `import type { University } from './universities';\n\nconst all = ['IT', 'Бизнес', 'Медицина', 'Дизайн', 'Инженерия', 'Право'];\n\n// Названия и сайты: Hipo university-domains-list. Остальные поля — ориентиры каталога.\nexport const catalogGlobalExpansion${index + 1}: University[] = [\n${chunk.join('\n')}\n];\n`;
  await writeFile(new URL(`../src/lib/catalogGlobalExpansion${index + 1}.ts`, import.meta.url), output);
}
const indexFile = `${chunks.map((_, index) => `import { catalogGlobalExpansion${index + 1} } from './catalogGlobalExpansion${index + 1}';`).join('\n')}\n\nexport const catalogGlobalExpansion = [${chunks.map((_, index) => `...catalogGlobalExpansion${index + 1}`).join(', ')}];\n`;
await writeFile(new URL('../src/lib/catalogGlobalExpansion.ts', import.meta.url), indexFile);
console.log(`Generated ${selected.length} universities`);
