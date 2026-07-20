import { makeUniversity as u, type UniversitySeed } from './universities';
const all = ['IT', 'Бизнес', 'Медицина', 'Дизайн'];
const tech = ['IT', 'Инженерия'];

export const catalogWorld: Record<string, UniversitySeed[]> = {
  'Казахстан': [
    u('Nazarbayev University', 'Астана', 'Английский', 'Средний', all, 'Средняя', true, true, 'https://apply.nu.edu.kz/en/admissions'),
    u('KIMEP University', 'Алматы', 'Английский', 'Средний', ['IT', 'Бизнес', 'Право'], 'Средняя', true, true, 'https://www.kimep.kz/prospective-students/en/admission/'),
    u('SDU University', 'Алматы', 'Английский / казахский', 'Средний', ['IT', 'Бизнес', 'Инженерия'], 'Низкая', true, true, 'https://sdu.edu.kz/en/admission/'),
    u('Satbayev University', 'Алматы', 'Казахский / русский / английский', 'Начальный', tech, 'Низкая', true, true, 'https://satbayev.university/en/entrant'),
    u('Astana IT University', 'Астана', 'Английский', 'Средний', ['IT', 'Бизнес', 'Инженерия'], 'Низкая', true, true, 'https://astanait.edu.kz/en/admission/'),
  ],
  'США': [
    u('Arizona State University', 'Темпе', 'Английский', 'Средний', all, 'Высокая', true, true, 'https://admission.asu.edu/apply/international'),
    u('University of South Florida', 'Тампа', 'Английский', 'Средний', all, 'Высокая', true, true, 'https://www.usf.edu/admissions/international/'),
    u('Iowa State University', 'Эймс', 'Английский', 'Средний', all, 'Высокая', true, true, 'https://www.iastate.edu/admission-and-aid/admissions/international-admissions'),
    u('University of Arizona', 'Тусон', 'Английский', 'Средний', all, 'Высокая', true, true, 'https://international-admissions.arizona.edu/'),
    u('Illinois Institute of Technology', 'Чикаго', 'Английский', 'Продвинутый', tech, 'Высокая', true, true, 'https://www.iit.edu/admissions-aid/undergraduate-admission/international-undergraduate-students'),
  ],
  'Канада': [
    u('University of Toronto', 'Торонто', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://future.utoronto.ca/international-students/'),
    u('University of British Columbia', 'Ванкувер', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://you.ubc.ca/applying-ubc/'),
    u('McGill University', 'Монреаль', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.mcgill.ca/undergraduate-admissions/'),
    u('University of Alberta', 'Эдмонтон', 'Английский', 'Средний', all, 'Высокая', true, true, 'https://www.ualberta.ca/en/admissions/international-admissions/index.html'),
    u('Simon Fraser University', 'Бернаби', 'Английский', 'Средний', all, 'Высокая', true, true, 'https://www.sfu.ca/students/admission.html'),
  ],
  'Турция': [
    u('Middle East Technical University', 'Анкара', 'Английский', 'Средний', tech, 'Низкая', true, true, 'https://iso.metu.edu.tr/'),
    u('Boğaziçi University', 'Стамбул', 'Английский', 'Продвинутый', all, 'Низкая', true, true, 'https://adaylar.bogazici.edu.tr/en-EN/Page/Admissions/StudentsFromAbroad'),
    u('Koç University', 'Стамбул', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://international.ku.edu.tr/undergraduate-programs/how-to-apply/'),
    u('Sabancı University', 'Стамбул', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.sabanciuniv.edu/en/undergraduate-admissions'),
    u('Istanbul Technical University', 'Стамбул', 'Турецкий / английский', 'Средний', tech, 'Низкая', true, true, 'https://www.sis.itu.edu.tr/EN/student/foreign/'),
  ],
  'ОАЭ': [
    u('Khalifa University', 'Абу-Даби', 'Английский', 'Продвинутый', tech, 'Высокая', true, true, 'https://www.ku.ac.ae/undergraduate-admissions'),
    u('United Arab Emirates University', 'Аль-Айн', 'Арабский / английский', 'Средний', all, 'Средняя', true, true, 'https://www.uaeu.ac.ae/en/admission/'),
    u('American University of Sharjah', 'Шарджа', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.aus.edu/admissions/bachelors-degrees'),
    u('University of Sharjah', 'Шарджа', 'Арабский / английский', 'Средний', all, 'Средняя', true, true, 'https://www.sharjah.ac.ae/en/Admissions/ug'),
    u('Zayed University', 'Абу-Даби / Дубай', 'Английский', 'Средний', all, 'Средняя', true, false, 'https://www.zu.ac.ae/main/en/admission/undergraduate-programs.aspx'),
  ],
  'Катар': [
    u('Qatar University', 'Доха', 'Арабский / английский', 'Средний', all, 'Средняя', true, true, 'https://www.qu.edu.qa/en-us/students/admission/undergraduate'),
    u('Hamad Bin Khalifa University', 'Доха', 'Английский / арабский', 'Продвинутый', tech, 'Высокая', true, true, 'https://www.hbku.edu.qa/en/admissions'),
    u('Carnegie Mellon University Qatar', 'Доха', 'Английский', 'Продвинутый', ['IT', 'Бизнес'], 'Высокая', true, true, 'https://www.qatar.cmu.edu/admission/'),
    u('Georgetown University Qatar', 'Доха', 'Английский', 'Продвинутый', ['Бизнес', 'Право'], 'Высокая', true, true, 'https://www.qatar.georgetown.edu/admissions/'),
    u('Weill Cornell Medicine-Qatar', 'Доха', 'Английский', 'Продвинутый', ['Медицина'], 'Высокая', true, true, 'https://qatar-weill.cornell.edu/admissions'),
  ],
  'Саудовская Аравия': [
    u('King Abdulaziz University', 'Джидда', 'Арабский / английский', 'Средний', all, 'Низкая', true, true, 'https://admission.kau.edu.sa/'),
    u('King Fahd University of Petroleum and Minerals', 'Дахран', 'Английский / арабский', 'Продвинутый', tech, 'Низкая', true, true, 'https://admissions.kfupm.edu.sa/'),
    u('King Saud University', 'Эр-Рияд', 'Арабский / английский', 'Средний', all, 'Низкая', true, true, 'https://ksu.edu.sa/en/admission'),
    u('Alfaisal University', 'Эр-Рияд', 'Английский', 'Продвинутый', all, 'Высокая', true, false, 'https://admissions.alfaisal.edu/'),
    u('Prince Sultan University', 'Эр-Рияд', 'Английский', 'Средний', ['IT', 'Бизнес', 'Инженерия'], 'Средняя', true, false, 'https://www.psu.edu.sa/en/admissions'),
  ],
  'Индия': [
    u('Indian Institute of Technology Bombay', 'Мумбаи', 'Английский', 'Продвинутый', tech, 'Низкая', true, true, 'https://www.iitb.ac.in/newacadhome/Admissions.jsp'),
    u('University of Delhi', 'Дели', 'Английский / хинди', 'Средний', all, 'Низкая', true, true, 'https://admission.uod.ac.in/'),
    u('Indian Institute of Technology Delhi', 'Дели', 'Английский', 'Продвинутый', tech, 'Низкая', true, true, 'https://home.iitd.ac.in/for-students-admissions.php'),
    u('Manipal Academy of Higher Education', 'Манипал', 'Английский', 'Средний', all, 'Средняя', true, true, 'https://www.manipal.edu/mu/admission.html'),
    u('Ashoka University', 'Сонипат', 'Английский', 'Продвинутый', ['Бизнес', 'IT', 'Право'], 'Высокая', true, true, 'https://www.ashoka.edu.in/admissions/'),
  ],
};
