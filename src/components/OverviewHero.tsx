import type { StudentProfile } from '../App';
import heroImage from '../assets/qadam-my-path.png';
import type { PageName } from './Dashboard';

export function OverviewHero({ profile, goTo }: { profile: StudentProfile; goTo: (page: PageName) => void }) {
  return <section className="overview-hero"><div className="overview-hero-copy"><p className="hero-kicker"><span />Твой маршрут уже строится</p><h1>{profile.nickname}, следующий шаг — ближе, чем кажется.</h1><p>Qadam соединяет университеты, язык и дедлайны в один понятный путь к поступлению.</p><div className="hero-actions"><button className="primary" onClick={() => goTo('admission')}>Продолжить поступление →</button><button onClick={() => goTo('universities')}>Смотреть университеты</button></div><div className="hero-facts"><span><b>{profile.admissionYear}</b><small>год поступления</small></span><span><b>{profile.countries.length}</b><small>стран в плане</small></span><span><b>{profile.englishLevel}</b><small>уровень языка</small></span></div></div><div className="overview-hero-art"><img src={heroImage} alt="Личный маршрут ученика к университету" /><div className="hero-floating-card"><span>↗</span><div><small>Твоя цель</small><b>{profile.direction}</b></div></div></div></section>;
}
