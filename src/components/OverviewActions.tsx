import type { PageName } from './Dashboard';

const actions: { page: PageName; icon: string; title: string; text: string; tone: string }[] = [
  { page: 'universities', icon: '⌂', title: 'Подобрать вуз', text: 'Сравнить требования и гранты', tone: 'mint' },
  { page: 'language', icon: 'Aa', title: 'Язык', text: 'План и задания на сегодня', tone: 'cream' },
  { page: 'reading', icon: '◫', title: 'Тексты', text: 'Чтение с проверкой понимания', tone: 'sage' },
  { page: 'stories', icon: '✦', title: 'Истории', text: 'Опыт людей из разных сфер', tone: 'gold' },
];

export function OverviewActions({ goTo }: { goTo: (page: PageName) => void }) {
  return <section className="overview-actions"><div className="overview-section-heading"><div><p className="eyebrow">Быстрый старт</p><h2>Куда пойдём дальше?</h2></div><p>Все инструменты работают как одна система.</p></div><div>{actions.map(action => <button className={`overview-action ${action.tone}`} key={action.page} onClick={() => goTo(action.page)}><span>{action.icon}</span><div><b>{action.title}</b><small>{action.text}</small></div><strong>↗</strong></button>)}</div></section>;
}
