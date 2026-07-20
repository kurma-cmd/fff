import { makeUniversity as u, type UniversitySeed } from './universities';
const all = ['IT', 'Бизнес', 'Медицина', 'Дизайн'];
const tech = ['IT', 'Инженерия'];

export const catalogAsia: Record<string, UniversitySeed[]> = {
  'Южная Корея': [
    u('Seoul National University', 'Сеул', 'Корейский / английский', 'Продвинутый', all, 'Средняя', true, true, 'https://admission.snu.ac.kr/international'),
    u('KAIST', 'Тэджон', 'Английский', 'Продвинутый', tech, 'Средняя', true, true, 'https://admission.kaist.ac.kr/intl-undergraduate/'),
    u('Yonsei University', 'Сеул', 'Корейский / английский', 'Продвинутый', all, 'Высокая', true, true, 'https://admission.yonsei.ac.kr/seoul/foreign/html/eng/'),
    u('Korea University', 'Сеул', 'Корейский / английский', 'Продвинутый', all, 'Высокая', true, true, 'https://oia.korea.ac.kr/oia/under/admission.do'),
    u('POSTECH', 'Пхохан', 'Корейский / английский', 'Продвинутый', tech, 'Средняя', true, true, 'https://adm-iu.postech.ac.kr/'),
  ],
  'Япония': [
    u('University of Tokyo', 'Токио', 'Японский / английский', 'Продвинутый', all, 'Средняя', true, true, 'https://www.u-tokyo.ac.jp/en/prospective-students/undergraduate_english.html'),
    u('Waseda University', 'Токио', 'Японский / английский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.waseda.jp/inst/admission/en/'),
    u('Kyoto University', 'Киото', 'Японский / английский', 'Продвинутый', all, 'Средняя', true, true, 'https://www.kyoto-u.ac.jp/en/education-campus/education-and-admissions'),
    u('Osaka University', 'Осака', 'Японский / английский', 'Продвинутый', all, 'Средняя', true, true, 'https://www.osaka-u.ac.jp/en/admissions'),
    u('Tokyo Institute of Science', 'Токио', 'Японский / английский', 'Продвинутый', tech, 'Средняя', true, true, 'https://admissions.isct.ac.jp/en/'),
  ],
  'Китай': [
    u('Tsinghua University', 'Пекин', 'Китайский / английский', 'Продвинутый', all, 'Средняя', true, true, 'https://international.join-tsinghua.edu.cn/'),
    u('Peking University', 'Пекин', 'Китайский / английский', 'Продвинутый', all, 'Средняя', true, true, 'https://www.isd.pku.edu.cn/en/'),
    u('Fudan University', 'Шанхай', 'Китайский / английский', 'Продвинутый', all, 'Средняя', true, true, 'https://iso.fudan.edu.cn/isoenglish/'),
    u('Zhejiang University', 'Ханчжоу', 'Китайский / английский', 'Средний', all, 'Средняя', true, true, 'https://iczu.zju.edu.cn/admissionsen/'),
    u('Shanghai Jiao Tong University', 'Шанхай', 'Китайский / английский', 'Продвинутый', tech, 'Средняя', true, true, 'https://isc.sjtu.edu.cn/EN/'),
  ],
  'Сингапур': [
    u('National University of Singapore', 'Сингапур', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://nus.edu.sg/oam/admissions/international-qualifications'),
    u('Nanyang Technological University', 'Сингапур', 'Английский', 'Продвинутый', all, 'Высокая', true, true, 'https://www.ntu.edu.sg/admissions/undergraduate'),
    u('Singapore Management University', 'Сингапур', 'Английский', 'Продвинутый', ['Бизнес', 'IT', 'Право'], 'Высокая', true, false, 'https://admissions.smu.edu.sg/admissions-requirements'),
    u('Singapore University of Technology and Design', 'Сингапур', 'Английский', 'Продвинутый', ['IT', 'Инженерия', 'Дизайн'], 'Высокая', true, true, 'https://www.sutd.edu.sg/Admissions/Undergraduate'),
    u('Singapore Institute of Technology', 'Сингапур', 'Английский', 'Продвинутый', tech, 'Высокая', true, false, 'https://www.singaporetech.edu.sg/admissions/undergraduate'),
  ],
  'Малайзия': [
    u('Universiti Malaya', 'Куала-Лумпур', 'Английский / малайский', 'Средний', all, 'Низкая', true, true, 'https://study.um.edu.my/'),
    u('Universiti Teknologi Malaysia', 'Джохор-Бару', 'Английский / малайский', 'Средний', tech, 'Низкая', true, true, 'https://admission.utm.my/'),
    u('Universiti Putra Malaysia', 'Серданг', 'Английский / малайский', 'Средний', all, 'Низкая', true, true, 'https://intl.upm.edu.my/'),
    u('Taylor’s University', 'Субанг-Джая', 'Английский', 'Средний', all, 'Средняя', true, true, 'https://university.taylors.edu.my/en/study/how-to-apply.html'),
    u('Monash University Malaysia', 'Субанг-Джая', 'Английский', 'Продвинутый', all, 'Высокая', true, false, 'https://www.monash.edu.my/study/apply'),
  ],
  'Таиланд': [
    u('Chulalongkorn University', 'Бангкок', 'Тайский / английский', 'Средний', all, 'Средняя', true, true, 'https://www.chula.ac.th/en/admissions/'),
    u('Mahidol University', 'Накхонпатхом', 'Тайский / английский', 'Средний', all, 'Средняя', true, true, 'https://mahidol.ac.th/admission/'),
    u('Thammasat University', 'Бангкок', 'Тайский / английский', 'Средний', all, 'Средняя', true, true, 'https://tu.ac.th/en/admission'),
    u('Chiang Mai University', 'Чиангмай', 'Тайский / английский', 'Средний', all, 'Низкая', true, true, 'https://www.cmu.ac.th/en/admission'),
    u('Asian Institute of Technology', 'Патхумтхани', 'Английский', 'Продвинутый', tech, 'Средняя', true, true, 'https://ait.ac.th/admissions/'),
  ],
  'Индонезия': [
    u('Universitas Indonesia', 'Депок', 'Индонезийский / английский', 'Средний', all, 'Низкая', true, true, 'https://admission.ui.ac.id/'),
    u('Institut Teknologi Bandung', 'Бандунг', 'Индонезийский / английский', 'Средний', tech, 'Низкая', true, true, 'https://admission.itb.ac.id/'),
    u('Universitas Gadjah Mada', 'Джокьякарта', 'Индонезийский / английский', 'Средний', all, 'Низкая', true, true, 'https://admission.ugm.ac.id/'),
    u('Airlangga University', 'Сурабая', 'Индонезийский / английский', 'Средний', all, 'Низкая', true, true, 'https://international.unair.ac.id/'),
    u('BINUS University', 'Джакарта', 'Английский / индонезийский', 'Средний', ['IT', 'Бизнес', 'Дизайн'], 'Средняя', true, false, 'https://international.binus.ac.id/admissions/'),
  ],
  'Вьетнам': [
    u('Vietnam National University Hanoi', 'Ханой', 'Вьетнамский / английский', 'Средний', all, 'Низкая', true, true, 'https://www.vnu.edu.vn/eng/'),
    u('Ton Duc Thang University', 'Хошимин', 'Вьетнамский / английский', 'Средний', all, 'Низкая', true, true, 'https://admission.tdtu.edu.vn/en'),
    u('Vietnam National University HCMC', 'Хошимин', 'Вьетнамский / английский', 'Средний', all, 'Низкая', true, true, 'https://vnuhcm.edu.vn/'),
    u('Hanoi University of Science and Technology', 'Ханой', 'Вьетнамский / английский', 'Средний', tech, 'Низкая', true, true, 'https://en.hust.edu.vn/admissions'),
    u('RMIT University Vietnam', 'Хошимин', 'Английский', 'Продвинутый', ['IT', 'Бизнес', 'Дизайн'], 'Высокая', true, false, 'https://www.rmit.edu.vn/study-at-rmit/international-students'),
  ],
};
