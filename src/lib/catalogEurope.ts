import { makeUniversity as u, type UniversitySeed } from './universities';
const all = ['IT', 'Бизнес', 'Медицина', 'Дизайн'];
const tech = ['IT', 'Инженерия', 'Дизайн'];

export const catalogEurope: Record<string, UniversitySeed[]> = {
  'Германия': [
    u('Technical University of Munich', 'Мюнхен', 'Немецкий / английский', 'Продвинутый', tech, 'Средняя', true, false, 'https://www.tum.de/en/studies/application'),
    u('RWTH Aachen University', 'Ахен', 'Немецкий / английский', 'Продвинутый', tech, 'Низкая', true, false, 'https://www.rwth-aachen.de/go/id/bqrn/lidx/1'),
    u('Heidelberg University', 'Гейдельберг', 'Немецкий / английский', 'Продвинутый', all, 'Средняя', true, false, 'https://www.uni-heidelberg.de/en/study/application-enrolment'),
    u('Free University of Berlin', 'Берлин', 'Немецкий / английский', 'Продвинутый', all, 'Низкая', true, false, 'https://www.fu-berlin.de/en/studium/bewerbung/'),
    u('Karlsruhe Institute of Technology', 'Карлсруэ', 'Немецкий / английский', 'Продвинутый', tech, 'Средняя', true, true, 'https://www.kit.edu/english/study/applying.php'),
  ],
  'Великобритания': [
    u('University of Oxford', 'Оксфорд', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.ox.ac.uk/admissions/undergraduate'),
    u('University of Manchester', 'Манчестер', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.manchester.ac.uk/study/international/'),
    u('University of Edinburgh', 'Эдинбург', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.ed.ac.uk/studying/international'),
    u('University of Warwick', 'Ковентри', 'Английский', 'Продвинутый', ['IT', 'Бизнес', 'Инженерия'], 'Высокая', true, true, 'https://warwick.ac.uk/study/international/admissions/'),
    u('University of Leeds', 'Лидс', 'Английский', 'Средний', all, 'Высокая', true, true, 'https://www.leeds.ac.uk/international-applying'),
  ],
  'Франция': [
    u('Université Paris-Saclay', 'Париж', 'Французский / английский', 'Продвинутый', ['IT', 'Инженерия', 'Медицина'], 'Низкая', true, true, 'https://www.universite-paris-saclay.fr/en/admission'),
    u('Sciences Po', 'Париж', 'Французский / английский', 'Продвинутый', ['Бизнес', 'Право'], 'Средняя', true, true, 'https://www.sciencespo.fr/admissions/en/'),
    u('Sorbonne University', 'Париж', 'Французский / английский', 'Продвинутый', all, 'Низкая', true, false, 'https://www.sorbonne-universite.fr/en/study-sorbonne-university'),
    u('École Polytechnique', 'Палезо', 'Французский / английский', 'Продвинутый', tech, 'Высокая', true, true, 'https://www.polytechnique.edu/en/admissions'),
    u('Université Grenoble Alpes', 'Гренобль', 'Французский / английский', 'Средний', all, 'Низкая', true, true, 'https://www.univ-grenoble-alpes.fr/education/admissions/'),
  ],
  'Италия': [
    u('University of Bologna', 'Болонья', 'Итальянский / английский', 'Средний', all, 'Низкая', true, true, 'https://www.unibo.it/en/study'),
    u('Politecnico di Milano', 'Милан', 'Итальянский / английский', 'Средний', tech, 'Средняя', true, true, 'https://www.polimi.it/en/prospective-students'),
    u('Sapienza University of Rome', 'Рим', 'Итальянский / английский', 'Средний', all, 'Низкая', true, false, 'https://www.uniroma1.it/en/pagina/international-admissions-0'),
    u('University of Padua', 'Падуя', 'Итальянский / английский', 'Средний', all, 'Низкая', true, true, 'https://www.unipd.it/en/how-apply'),
    u('University of Turin', 'Турин', 'Итальянский / английский', 'Средний', all, 'Низкая', true, true, 'https://en.unito.it/studying-unito/application-international-students'),
  ],
  'Нидерланды': [
    u('Delft University of Technology', 'Делфт', 'Английский / нидерландский', 'Продвинутый', tech, 'Высокая', true, true, 'https://www.tudelft.nl/en/education/admission-and-application'),
    u('University of Amsterdam', 'Амстердам', 'Английский / нидерландский', 'Продвинутый', all, 'Высокая', true, false, 'https://www.uva.nl/en/education/admissions/admissions.html'),
    u('Eindhoven University of Technology', 'Эйндховен', 'Английский / нидерландский', 'Продвинутый', tech, 'Высокая', true, true, 'https://www.tue.nl/en/education/become-a-tue-student/admission-and-enrollment'),
    u('University of Groningen', 'Гронинген', 'Английский / нидерландский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.rug.nl/education/application-enrolment-tuition-fees/'),
    u('Maastricht University', 'Маастрихт', 'Английский / нидерландский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.maastrichtuniversity.nl/education/admission-and-enrolment'),
  ],
  'Чехия': [
    u('Charles University', 'Прага', 'Чешский / английский', 'Средний', all, 'Средняя', true, true, 'https://cuni.cz/UKEN-162.html'),
    u('Czech Technical University', 'Прага', 'Чешский / английский', 'Средний', tech, 'Средняя', true, true, 'https://www.cvut.cz/en/how-to-apply'),
    u('Masaryk University', 'Брно', 'Чешский / английский', 'Средний', all, 'Средняя', true, true, 'https://www.muni.cz/en/admissions'),
    u('Brno University of Technology', 'Брно', 'Чешский / английский', 'Средний', tech, 'Средняя', true, true, 'https://www.vut.cz/en/students/programmes'),
    u('University of Economics, Prague', 'Прага', 'Чешский / английский', 'Средний', ['Бизнес', 'IT'], 'Средняя', true, true, 'https://admissions.vse.cz/'),
  ],
};
