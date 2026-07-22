export type ReadingText = { language: string; title: string; level: string; paragraphs: string[]; question: string; options: string[]; answer: string };
export const readingTexts: ReadingText[] = [
  { language: 'English', title: 'The Garden Above the City', level: 'B1–B2 · 6 min', paragraphs: [
    'A group of students noticed that the roof of their school was empty while the neighbourhood had very few green spaces. During a science lesson, they wondered whether the roof could become a small garden.',
    'Before planting anything, the students spoke to an engineer and measured how much weight the roof could safely hold. They chose light containers, collected rainwater and selected plants that could survive strong wind.',
    'The first harvest was small, but the project changed the school. Biology classes used the garden for experiments, and the cafeteria added fresh herbs to several meals.',
    'The students learned that an exciting idea becomes useful only after careful research, cooperation and many small improvements.'
  ], question: 'Why did the students speak to an engineer?', options: ['To make sure the roof was safe', 'To sell the vegetables', 'To design a new cafeteria'], answer: 'To make sure the roof was safe' },
  { language: 'English', title: 'The Library That Never Closed', level: 'B1–B2 · 6 min', paragraphs: [
    'When sixteen-year-old Maya moved to a new town, the local library became the first place where she felt at home. Every afternoon students filled its tables. Some came to read, while others needed a quiet place to finish homework because they had no reliable internet at home.',
    'One Friday, a notice appeared: the library would close earlier because there were not enough employees. Maya realised that many students would lose their only comfortable study space. Instead of simply complaining, she interviewed visitors and asked what they actually needed.',
    'Maya suggested a supervised student club. Volunteers could organise books, help younger pupils and run study sessions. The librarian explained that safety rules, training and permission were necessary. Maya formed a team, prepared a schedule and wrote a clear proposal.',
    'The first meeting attracted seven people. A month later, more than forty students attended each week. The library became available for two extra evenings. Maya learned that useful change begins by listening carefully, testing a small idea and improving it with other people.'
  ], question: 'Why did Maya interview library visitors?', options: ['To understand what they truly needed', 'To sell them new books', 'To choose a new librarian'], answer: 'To understand what they truly needed' },
  { language: 'Русский', title: 'Сад над городом', level: 'B1–B2 · 6 минут', paragraphs: [
    'Ученики заметили, что крыша их школы пустует, а в районе почти нет зелёных мест. На уроке биологии они решили проверить, можно ли создать там небольшой сад.',
    'Перед началом работы школьники поговорили с инженером и узнали, какую нагрузку выдержит крыша. Они выбрали лёгкие контейнеры, организовали сбор дождевой воды и нашли устойчивые к ветру растения.',
    'Первый урожай оказался небольшим, но проект изменил школу. В саду начали проводить опыты, а в столовой стали использовать свежую зелень.',
    'Команда поняла, что интересная идея становится полезной благодаря исследованию, совместной работе и постоянным улучшениям.'
  ], question: 'Зачем ученики обратились к инженеру?', options: ['Чтобы убедиться в безопасности крыши', 'Чтобы продать урожай', 'Чтобы перестроить столовую'], answer: 'Чтобы убедиться в безопасности крыши' },
  { language: 'Русский', title: 'Библиотека, которая не закрывалась', level: 'B1–B2 · 6 минут', paragraphs: [
    'Когда шестнадцатилетняя Майя переехала в новый город, местная библиотека стала первым местом, где она почувствовала себя дома. После уроков здесь собирались школьники: одни читали, другим требовалось спокойное место для домашней работы.',
    'Однажды появилось объявление о сокращении часов работы. Майя поняла, что многие ученики потеряют место для занятий. Вместо обычной жалобы она поговорила с посетителями и узнала, что им действительно нужно.',
    'Майя предложила клуб волонтёров. Ученики могли помогать младшим школьникам и проводить совместные занятия. Она собрала команду, подготовила правила безопасности, расписание и понятный план.',
    'На первую встречу пришли семь человек, а через месяц клуб посещали больше сорока учеников. Майя поняла: изменения начинаются с внимательного разговора, небольшой проверки идеи и совместной работы.'
  ], question: 'Зачем Майя разговаривала с посетителями?', options: ['Чтобы понять их реальные потребности', 'Чтобы продать им книги', 'Чтобы выбрать нового библиотекаря'], answer: 'Чтобы понять их реальные потребности' },
  { language: 'Қазақша', title: 'Қала үстіндегі бақ', level: 'B1–B2 · 6 минут', paragraphs: [
    'Оқушылар мектеп шатырының бос тұрғанын, ал ауданда жасыл орындардың аз екенін байқады. Биология сабағында олар шатырда шағын бақ жасау идеясын ұсынды.',
    'Жұмысты бастамас бұрын оқушылар инженермен сөйлесіп, шатырдың қауіпсіз көтере алатын салмағын анықтады. Олар жеңіл ыдыстар мен желге төзімді өсімдіктерді таңдады.',
    'Алғашқы өнім аз болды, бірақ жоба мектеп өмірін өзгертті. Биология сабақтары бақта өтіп, асханада жаңа піскен көк шөп қолданыла бастады.',
    'Оқушылар жақсы идеяның зерттеу, бірлескен жұмыс және шағын жақсартулар арқылы пайдалы жобаға айналатынын түсінді.'
  ], question: 'Оқушылар инженермен не үшін сөйлесті?', options: ['Шатырдың қауіпсіздігін тексеру үшін', 'Өнімді сату үшін', 'Асхананы қайта салу үшін'], answer: 'Шатырдың қауіпсіздігін тексеру үшін' },
  { language: 'Қазақша', title: 'Жабылмайтын кітапхана', level: 'B1–B2 · 6 минут', paragraphs: [
    'Он алты жастағы Майя жаңа қалаға көшкенде, жергілікті кітапхана өзін жайлы сезінген алғашқы орын болды. Сабақтан кейін мұнда оқушылар кітап оқып, үй тапсырмасын орындайтын.',
    'Бір күні кітапхананың жұмыс уақыты қысқаратыны хабарланды. Майя көптеген оқушы оқу орнынан айырылатынын түсінді. Ол шағымданбай, келушілерден не қажет екенін сұрады.',
    'Майя еріктілер клубын ұсынды. Оқушылар кіші сыныптарға көмектесіп, бірге оқу сабақтарын өткізе алатын еді. Ол команда жинап, қауіпсіздік ережелері мен нақты жоспар дайындады.',
    'Алғашқы кездесуге жеті адам келді, ал бір айдан кейін клубқа қырықтан астам оқушы қатысты. Майя өзгеріс адамдарды тыңдаудан және шағын идеяны тексеруден басталатынын түсінді.'
  ], question: 'Майя келушілермен не үшін сөйлесті?', options: ['Олардың нақты қажеттілігін білу үшін', 'Кітап сату үшін', 'Жаңа кітапханашы таңдау үшін'], answer: 'Олардың нақты қажеттілігін білу үшін' }
];
