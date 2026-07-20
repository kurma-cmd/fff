import type { PageName } from './Dashboard';

type Action = PageName | 'lesson' | 'words' | 'translator';
type Task = { title: string; time: string; instruction: string; result: string; action: Action; button: string };

const c1Tasks: Task[] = [
  { title: 'Урок уровня B2–C1', time: '8 минут', instruction: 'Пройди один урок английского без переводчика. Ошибочные задания повтори сразу.', result: '5 проверенных ответов', action: 'lesson', button: 'Открыть урок' },
  { title: 'Большой текст', time: '12 минут', instruction: 'Прочитай один текст на English и ответь на все вопросы. При ошибке найди доказательство в абзаце.', result: '1 текст и тест без ошибок', action: 'reading', button: 'Читать текст' },
  { title: '5 выражений из текста', time: '8 минут', instruction: 'Выбери пять незнакомых выражений. Для каждого придумай своё предложение, а не только перевод.', result: '5 фраз в активном словаре', action: 'words', button: 'Разобрать слова' },
  { title: 'История на английском', time: '8 минут', instruction: 'Прочитай одну историю на English и пройди вопрос на понимание.', result: '1 законченная история', action: 'stories', button: 'Выбрать историю' },
  { title: 'Устный пересказ', time: '5 минут', instruction: 'Закрой текст и перескажи его вслух за 90 секунд: идея, два факта и свой вывод.', result: 'Связная речь без чтения', action: 'stories', button: 'Открыть истории' },
  { title: 'Короткое академическое письмо', time: '10 минут', instruction: 'Напиши 120–150 слов по теме прочитанного: тезис, два аргумента и вывод. Затем проверь только трудные фразы.', result: '1 структурированный абзац', action: 'translator', button: 'Открыть помощник' },
];

const targets: Record<string, { target: string; weeks: string }> = {
  A1: { target: 'A2', weeks: '12–16 недель' }, A2: { target: 'B1', weeks: '16–24 недели' },
  B1: { target: 'B2', weeks: '20–28 недель' }, B2: { target: 'C1', weeks: '16–24 недели' },
  C1: { target: 'C2', weeks: '20–32 недели' }, C2: { target: 'экзамену', weeks: '8–12 недель' },
};

export function EnglishStudyPlan({ level, onNavigate }: { level: string; onNavigate: (page: PageName) => void }) {
  const plan = targets[level] ?? targets.A1;
  function open(action: Action) {
    if (action === 'reading' || action === 'stories') { onNavigate(action); return; }
    document.getElementById(action === 'lesson' ? 'language-courses' : action)?.scrollIntoView({ behavior: 'smooth' });
  }
  return <section className="panel daily-study-plan"><div className="section-title"><div><p className="eyebrow">Сегодня · твой CEFR: {level}</p><h2>6 шагов на пути к {plan.target}</h2></div><span>≈ 50 минут</span></div><p className="daily-plan-lead">Это конкретная тренировка на сегодня. Для заметного роста повторяй такой цикл 5 дней в неделю, меняя уроки и тексты.</p>
    <div className="daily-task-list">{c1Tasks.map((task, index) => <article key={task.title}><span>{index + 1}</span><div><div className="daily-task-title"><h3>{task.title}</h3><small>{task.time}</small></div><p>{task.instruction}</p><b>Результат сегодня: {task.result}</b></div><button onClick={() => open(task.action)}>{task.button} →</button></article>)}</div>
    <div className="study-outcomes"><h3>Что изменится со временем</h3><div><article><b>Через 4 недели</b><p>Станет легче читать длинные тексты и пересказывать главную мысль.</p></article><article><b>Через 12 недель</b><p>Словарь и письмо станут точнее; ответы будут требовать меньше перевода.</p></article><article><b>Через {plan.weeks}</b><p>Можно ожидать готовность к полноценной проверке уровня {plan.target}, если заниматься регулярно и разбирать ошибки.</p></article></div></div><p className="data-note">Срок — ориентир, а не гарантия. Уровень C1 подтверждается полноценным CEFR-тестом или официальным экзаменом.</p>
  </section>;
}
