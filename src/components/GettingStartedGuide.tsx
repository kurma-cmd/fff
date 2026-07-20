import type { PageName } from './Dashboard';
const steps: { title: string; text: string; page: PageName }[] = [
  { title: 'Сохрани 3 вуза', text: 'Собери короткий список вариантов.', page: 'universities' },
  { title: 'Выбери программу', text: 'Укажи направление для каждого вуза.', page: 'admission' },
  { title: 'Добавь дедлайн', text: 'Зафиксируй ближайшую важную дату.', page: 'admission' },
  { title: 'Создай план', text: 'Получи задачи на текущую неделю.', page: 'path' },
];
export function GettingStartedGuide({ goTo }: { goTo: (page: PageName) => void }) {
  return <section className="start-guide"><div><p className="eyebrow">С ЧЕГО НАЧАТЬ</p><h2>Четыре шага до рабочего маршрута</h2></div><div>{steps.map((step, index) => <button onClick={() => goTo(step.page)} key={step.title}><span>{index + 1}</span><div><b>{step.title}</b><small>{step.text}</small></div><strong>→</strong></button>)}</div></section>;
}
