import heroImage from '../assets/qadam-hero.png';

type LandingPageProps = { onStart: () => void };

const features = [
  { number: '01', title: 'Поймём твою цель', text: 'Страны, направление, бюджет и год поступления складываются в личный маршрут.', icon: '◎' },
  { number: '02', title: 'Соберём систему', text: 'Университеты, язык, дедлайны и документы будут связаны в одном месте.', icon: '⌘' },
  { number: '03', title: 'Дадим следующий шаг', text: 'Каждый день ты видишь одно понятное действие вместо большого списка задач.', icon: '↗' },
];

export function LandingPage({ onStart }: LandingPageProps) {
  return <main className="landing-v2"><header className="simple-header landing-header"><div className="logo"><span>Q</span> Qadam</div><div className="landing-header-note"><span />Поступай осознанно</div></header>
    <section className="landing-hero-v2"><div className="landing-copy"><div className="landing-steps" aria-label="Этапы настройки"><span className="active"><b>1</b>Знакомство</span><span><b>2</b>Аккаунт</span><span><b>3</b>Профиль</span><span><b>4</b>Твой план</span></div><p className="hero-kicker"><span />Твой путь начинается здесь</p><h1>Поступление становится понятным.</h1><p className="landing-lead">Qadam превращает большую цель в маршрут: подходящие вузы, нужный язык, важные даты и конкретные шаги на каждый день.</p><div className="landing-cta"><button className="primary" onClick={onStart}>Создать свой маршрут →</button><small>Бесплатно · настройка займёт около 5 минут</small></div><div className="landing-trust"><span><b>20+</b><small>стран</small></span><span><b>220+</b><small>университетов</small></span><span><b>1</b><small>единый план</small></span></div></div>
      <div className="landing-visual"><img src={heroImage} alt="Путь к международному университету" /><div className="landing-float-card top"><span>✓</span><div><small>Следующий шаг</small><b>Выбрать 3 университета</b></div></div><div className="landing-float-card bottom"><span>24</span><div><small>До дедлайна</small><b>дня под контролем</b></div></div></div>
    </section>
    <section className="landing-proof"><div className="overview-section-heading"><div><p className="eyebrow">Не просто список функций</p><h2>От мечты — к понятному действию</h2></div><p>Qadam соединяет решения, которые обычно разбросаны по десяткам вкладок.</p></div><div className="landing-feature-grid">{features.map(feature => <article key={feature.number}><div><span>{feature.icon}</span><small>{feature.number}</small></div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div></section>
    <section className="landing-final"><div><p className="eyebrow">Твой следующий шаг</p><h2>Сначала расскажи, куда хочешь прийти.</h2></div><button className="primary" onClick={onStart}>Начать бесплатно →</button></section>
  </main>;
}
