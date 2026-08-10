import { useEffect, useState } from 'react';
import type { StudentProfile } from '../App';
import { loadTrackedUniversities, type TrackedUniversity } from '../lib/admissionTracker';
import { calculateReadiness } from '../lib/admissionReadiness';
import type { PageName } from './Dashboard';

type Props = { profile: StudentProfile; goTo: (page: PageName) => void };

export function ReadinessMap({ profile, goTo }: Props) {
  const [universities, setUniversities] = useState<TrackedUniversity[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void loadTrackedUniversities().then(items => {
      setUniversities(items.slice(0, 3));
      setLoaded(true);
    });
  }, []);

  return <section className="readiness-map">
    <div className="readiness-map-heading">
      <div><p className="eyebrow">Главная карта Qadam</p><h2>Насколько готовы твои заявки</h2></div>
      <p>Процент считается только по заполненным и проверяемым пунктам.</p>
    </div>

    {!loaded && <div className="readiness-map-empty">Собираем твою карту…</div>}
    {loaded && !universities.length && <div className="readiness-map-empty">
      <span>◎</span><div><h3>Добавь первые университеты</h3><p>Выбери до трёх вузов — Qadam покажет сильные стороны и следующие шаги.</p></div>
      <button className="primary" onClick={() => goTo('universities')}>Выбрать вузы →</button>
    </div>}

    {universities.length > 0 && <div className="readiness-grid">{universities.map(item => {
      const result = calculateReadiness(profile, item);
      const nextSteps = result.checks.filter(check => !check.passed).slice(0, 3);
      return <article className="readiness-card" key={item.university_name}>
        <div className="readiness-card-top"><span className="readiness-category">По фактам профиля</span><small>{item.intended_program || 'Программа не выбрана'}</small></div>
        <h3>{item.university_name}</h3>
        <div className="readiness-score"><strong>{result.percentage}<small>%</small></strong><div><span><i style={{ width: `${result.percentage}%` }} /></span><p>{result.completed} из {result.total} пунктов выполнено</p></div></div>
        <div className="readiness-checks">{result.checks.map(check => <span className={check.passed ? 'passed' : ''} key={check.label}>{check.passed ? '✓' : '○'} {check.label}</span>)}</div>
        <div className="readiness-actions-list"><b>Следующие проверяемые шаги</b>{nextSteps.length
          ? nextSteps.map(check => <div key={check.nextStep}><span>{check.nextStep}</span><strong>→</strong></div>)
          : <div><span>Все пункты карты заполнены</span><strong>✓</strong></div>}
        </div>
        <button className="readiness-open" onClick={() => goTo('admission')}>Открыть заявку →</button>
      </article>;
    })}</div>}
    <p className="readiness-disclaimer">Карта не оценивает шанс поступления. Требования и даты необходимо сверять на официальном сайте выбранной программы.</p>
  </section>;
}
