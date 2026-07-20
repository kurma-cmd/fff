import type { CostBand, EnglishBand, University } from './universities';

type Seed = [string, string, string, string, string[]?];
const all = ['IT', 'Бизнес', 'Медицина', 'Дизайн'];
const tech = ['IT', 'Инженерия'];
const medical = ['Медицина'];
const defaults: Record<string, [string, EnglishBand, CostBand]> = {
  'Казахстан': ['Казахский / русский / английский', 'B1', 'Низкая'], 'США': ['Английский', 'B2', 'Высокая'], 'Канада': ['Английский / французский', 'C1', 'Высокая'],
  'Германия': ['Немецкий / английский', 'C1', 'Низкая'], 'Великобритания': ['Английский', 'C1', 'Высокая'], 'Франция': ['Французский / английский', 'B2', 'Низкая'],
  'Италия': ['Итальянский / английский', 'B2', 'Низкая'], 'Нидерланды': ['Английский / нидерландский', 'C1', 'Высокая'], 'Чехия': ['Чешский / английский', 'B2', 'Средняя'],
  'Южная Корея': ['Корейский / английский', 'C1', 'Средняя'], 'Япония': ['Японский / английский', 'C1', 'Средняя'], 'Китай': ['Китайский / английский', 'B2', 'Средняя'],
  'Сингапур': ['Английский', 'C1', 'Высокая'], 'Малайзия': ['Английский / малайский', 'B2', 'Низкая'], 'Таиланд': ['Тайский / английский', 'B2', 'Средняя'],
  'Индонезия': ['Индонезийский / английский', 'B2', 'Низкая'], 'Вьетнам': ['Вьетнамский / английский', 'B2', 'Низкая'], 'Турция': ['Турецкий / английский', 'B2', 'Низкая'],
  'ОАЭ': ['Английский / арабский', 'B2', 'Высокая'], 'Катар': ['Английский / арабский', 'C1', 'Высокая'], 'Саудовская Аравия': ['Арабский / английский', 'B2', 'Низкая'], 'Индия': ['Английский / хинди', 'B2', 'Низкая'],
};

const seeds: Seed[] = [
  ['Казахстанско-Российский медицинский университет', 'Алматы', 'Казахстан', 'https://new.krmu.edu.kz/?locale=ru', medical],
  ['Kazakh-British Technical University', 'Алматы', 'Казахстан', 'https://kbtu.edu.kz/en/internationalization/international-admissions-internationalization', ['IT', 'Бизнес', 'Инженерия']],
  ['Казахский национальный медицинский университет', 'Алматы', 'Казахстан', 'https://kaznmu.edu.kz/en/for-applicants-2/', medical],
  ['LMU Munich', 'Мюнхен', 'Германия', 'https://www.lmu.de/en/study/degree-students/applications-for-admission/'], ['Humboldt University of Berlin', 'Берлин', 'Германия', 'https://www.hu-berlin.de/en/studies/admission'], ['TU Berlin', 'Берлин', 'Германия', 'https://www.tu.berlin/en/i-a-office-of-student-affairs/applying'],
  ['University College London', 'Лондон', 'Великобритания', 'https://www.ucl.ac.uk/prospective-students/undergraduate/'], ['University of Glasgow', 'Глазго', 'Великобритания', 'https://www.gla.ac.uk/undergraduate/'], ['University of Bristol', 'Бристоль', 'Великобритания', 'https://www.bristol.ac.uk/study/undergraduate/'],
  ['Claude Bernard University Lyon 1', 'Лион', 'Франция', 'https://www.univ-lyon1.fr/en/education'], ['University of Strasbourg', 'Страсбург', 'Франция', 'https://en.unistra.fr/study/apply'], ['Aix-Marseille University', 'Марсель', 'Франция', 'https://www.univ-amu.fr/en/public/admissions'],
  ['University of Pisa', 'Пиза', 'Италия', 'https://www.unipi.it/index.php/admission'], ['University of Milan', 'Милан', 'Италия', 'https://www.unimi.it/en/study/enrolment'], ['Bocconi University', 'Милан', 'Италия', 'https://www.unibocconi.it/en/applying-bocconi', ['Бизнес', 'Право']],
  ['Utrecht University', 'Утрехт', 'Нидерланды', 'https://www.uu.nl/en/bachelors/application-and-admission'], ['Leiden University', 'Лейден', 'Нидерланды', 'https://www.universiteitleiden.nl/en/education/admission-and-application'], ['University of Twente', 'Энсхеде', 'Нидерланды', 'https://www.utwente.nl/en/education/bachelor/how-to-apply/', tech],
  ['Palacký University Olomouc', 'Оломоуц', 'Чехия', 'https://www.upol.cz/en/students/degree-programmes/'], ['Mendel University in Brno', 'Брно', 'Чехия', 'https://mendelu.cz/en/admissions/'], ['Czech University of Life Sciences Prague', 'Прага', 'Чехия', 'https://www.czu.cz/en/r-9188-study/r-9257-admission'],
  ['Sungkyunkwan University', 'Сеул', 'Южная Корея', 'https://admission-global.skku.edu/eng/'], ['Hanyang University', 'Сеул', 'Южная Корея', 'https://oia.hanyang.ac.kr/admission'], ['Kyung Hee University', 'Сеул', 'Южная Корея', 'https://iadmission.khu.ac.kr/'],
  ['Tohoku University', 'Сендай', 'Япония', 'https://www.tohoku.ac.jp/en/admissions/'], ['Nagoya University', 'Нагоя', 'Япония', 'https://admissions.g30.nagoya-u.ac.jp/'], ['Keio University', 'Токио', 'Япония', 'https://www.keio.ac.jp/en/admissions/'],
  ['University of Science and Technology of China', 'Хэфэй', 'Китай', 'https://isa.ustc.edu.cn/xs/'], ['Nanjing University', 'Нанкин', 'Китай', 'https://hwxy.nju.edu.cn/English/'], ['Wuhan University', 'Ухань', 'Китай', 'https://admission.whu.edu.cn/'],
  ['Singapore University of Social Sciences', 'Сингапур', 'Сингапур', 'https://www.suss.edu.sg/full-time-undergraduate/admissions'], ['James Cook University Singapore', 'Сингапур', 'Сингапур', 'https://www.jcu.edu.sg/courses-and-study/admissions'], ['LASALLE College of the Arts', 'Сингапур', 'Сингапур', 'https://www.lasalle.edu.sg/admissions', ['Дизайн', 'Творчество']],
  ['Universiti Kebangsaan Malaysia', 'Банги', 'Малайзия', 'https://www.ukm.my/portalukm/undergraduate/'], ['Universiti Sains Malaysia', 'Пенанг', 'Малайзия', 'https://admission.usm.my/'], ['UCSI University', 'Куала-Лумпур', 'Малайзия', 'https://www.ucsiuniversity.edu.my/admission'],
  ['Kasetsart University', 'Бангкок', 'Таиланд', 'https://admission.ku.ac.th/'], ['KMUTT', 'Бангкок', 'Таиланд', 'https://admission.kmutt.ac.th/', tech], ['Bangkok University', 'Бангкок', 'Таиланд', 'https://www.bu.ac.th/en/admission-info'],
  ['IPB University', 'Богор', 'Индонезия', 'https://admisi.ipb.ac.id/'], ['Diponegoro University', 'Семаранг', 'Индонезия', 'https://io.undip.ac.id/admission/'], ['Brawijaya University', 'Маланг', 'Индонезия', 'https://selma.ub.ac.id/'],
  ['Duy Tan University', 'Дананг', 'Вьетнам', 'https://duytan.edu.vn/admissions/'], ['VinUniversity', 'Ханой', 'Вьетнам', 'https://admissions.vinuni.edu.vn/'], ['Can Tho University', 'Кантхо', 'Вьетнам', 'https://en.ctu.edu.vn/'],
  ['Oregon State University', 'Корваллис', 'США', 'https://admissions.oregonstate.edu/international'], ['University of Kansas', 'Лоренс', 'США', 'https://world.ku.edu/international-admissions'], ['Temple University', 'Филадельфия', 'США', 'https://admissions.temple.edu/apply/international-students'],
  ['University of Waterloo', 'Ватерлоо', 'Канада', 'https://uwaterloo.ca/future-students/admissions'], ['University of Ottawa', 'Оттава', 'Канада', 'https://www.uottawa.ca/study/undergraduate-studies/international-applicants'], ['University of Calgary', 'Калгари', 'Канада', 'https://discover.ucalgary.ca/portal/international'],
  ['Bilkent University', 'Анкара', 'Турция', 'https://w3.bilkent.edu.tr/international/how-to-apply/'], ['Hacettepe University', 'Анкара', 'Турция', 'https://internationalstudent.hacettepe.edu.tr/'], ['Ankara University', 'Анкара', 'Турция', 'https://iso.ankara.edu.tr/en/'],
  ['Abu Dhabi University', 'Абу-Даби', 'ОАЭ', 'https://www.adu.ac.ae/admissions/admission-in-adu'], ['New York University Abu Dhabi', 'Абу-Даби', 'ОАЭ', 'https://nyuad.nyu.edu/en/admissions/undergraduate.html'], ['University of Dubai', 'Дубай', 'ОАЭ', 'https://ud.ac.ae/admissions/'],
  ['University of Doha for Science and Technology', 'Доха', 'Катар', 'https://www.udst.edu.qa/admissions'], ['Northwestern University in Qatar', 'Доха', 'Катар', 'https://www.qatar.northwestern.edu/admissions/'], ['Virginia Commonwealth Universityarts Qatar', 'Доха', 'Катар', 'https://qatar.vcu.edu/admissions/', ['Дизайн', 'Творчество']],
  ['Princess Nourah bint Abdulrahman University', 'Эр-Рияд', 'Саудовская Аравия', 'https://pnu.edu.sa/en/Deanship/Registration/Pages/Admission.aspx'], ['King Khalid University', 'Абха', 'Саудовская Аравия', 'https://www.kku.edu.sa/en/admission'], ['Effat University', 'Джидда', 'Саудовская Аравия', 'https://www.effatuniversity.edu.sa/English/Admissions/Pages/default.aspx'],
  ['Indian Institute of Technology Madras', 'Ченнаи', 'Индия', 'https://www.iitm.ac.in/academics/study-at-iitm/admissions'], ['Vellore Institute of Technology', 'Веллор', 'Индия', 'https://vit.ac.in/admissions-overview'], ['Amity University', 'Нойда', 'Индия', 'https://www.amity.edu/admissions'],
];

export const catalogMore: University[] = seeds.map(([name, city, country, url, directions]) => {
  const [language, englishBand, cost] = defaults[country];
  return { name, city, country, url, directions: directions ?? all, language, englishBand, cost, funding: true, housing: true };
});
