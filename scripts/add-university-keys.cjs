const fs = require("fs");
const path = require("path");

const ADDITIONS = {
  en: {
    nav: {
      students: "Students", faculty: "Faculty", admissions: "Admissions",
      finance: "Finance", analytics: "Analytics", settings: "Settings",
      groups: { academics: "Academics", people: "People", admin: "Administration" },
    },
    commandPalette: { placeholder: "Jump to a screen…" },
    toast: {
      navigated: "Opened {screen}",
      settingsSaved: "Settings saved",
      connected: "{name} connected",
      disconnected: "{name} disconnected",
    },
    shell: {
      breadcrumbs: {
        dashboard: "Faculty Portal · Spring 2026",
        courses: "Teaching · My Courses",
        gradebook: "Assessment · Gradebook",
        schedule: "This Week · Schedule",
        students: "People · Students",
        faculty: "People · Faculty",
        admissions: "People · Admissions",
        finance: "Administration · Finance",
        analytics: "Administration · Analytics",
        settings: "Administration · Settings",
      },
      screen: {
        students:   { eyebrow: "Roster",   title: "Students",     subtitle: "Active roster with GPA and program enrollment." },
        faculty:    { eyebrow: "Faculty",  title: "Faculty",      subtitle: "Teaching staff with current load and department." },
        admissions: { eyebrow: "Pipeline", title: "Admissions",   subtitle: "Funnel from application to offer for Fall 2026 intake." },
        finance:    { eyebrow: "Tuition",  title: "Finance",      subtitle: "Tuition status by student and program — paid, due, overdue." },
        analytics:  { eyebrow: "Insights", title: "Analytics",    subtitle: "Enrollment trend, retention cohort and live academic events." },
        settings:   { eyebrow: "Configure",title: "Settings",     subtitle: "University basics and integrations across systems of record." },
      },
    },
    students: {
      list: {
        "0": { name: "Aslan Karimov" },
        "1": { name: "Bermet Joldoshova" },
        "2": { name: "Chen Wei" },
        "3": { name: "Diyora Nazarova" },
        "4": { name: "Erlan Sariev" },
        "5": { name: "Farida Okafor" },
        "6": { name: "Gulnoza Rahimi" },
        "7": { name: "Hamid Tursunov" },
      },
      programs: { cs: "BSc Computer Science", econ: "BA Economics", phil: "BA Philosophy", bio: "BSc Biology" },
      status: { active: "Active", probation: "Probation", alumni: "Alumni" },
    },
    faculty: {
      list: {
        "0": { name: "Dr. Mira Hassan",   title: "Associate Professor" },
        "1": { name: "Prof. A. Volkov",   title: "Department Chair" },
        "2": { name: "Dr. F. Okafor",     title: "Senior Lecturer" },
        "3": { name: "Dr. K. Sato",       title: "Assistant Professor" },
        "4": { name: "Dr. R. Ahmadi",     title: "Lecturer" },
        "5": { name: "Prof. S. Lindgren", title: "Visiting Professor" },
      },
      dept: { cs: "Computer Science", econ: "Economics", phil: "Philosophy", bio: "Biology" },
      hoursWeek: "h / wk",
    },
    admissions: {
      stages: { applied: "Applied", reviewing: "Reviewing", interview: "Interview", offered: "Offered" },
      applicants: "Top applicants",
      sample: {
        "0": { name: "Alima Bek", src: "International · KZ" },
        "1": { name: "Tomás Ruiz", src: "Transfer · ES" },
        "2": { name: "Yuki Tanaka", src: "Direct · JP" },
      },
    },
    finance: {
      col: { student: "Student", program: "Program", tuition: "Tuition", due: "Due", status: "Status" },
      status: { paid: "Paid", due: "Due", overdue: "Overdue" },
    },
    analytics: {
      enrollTitle: "Total enrollment",
      last10: "Last 10 terms",
      liveFeed: "Live activity",
      cohortTitle: "Retention cohort",
      cohortNote: "Percent of students from each cohort still enrolled in week N.",
      events: {
        applied:     "New application: Alima Bek",
        appliedMeta: "International · just now",
        graded:      "Grade submitted: CS401 HW3",
        gradedMeta:  "Dr. Hassan · 28s ago",
        paid:        "Tuition paid: $14,800",
        paidMeta:    "Daler S. · 1m ago",
        enrolled:    "Course enrolled: PHIL150",
        enrolledMeta:"Iskandar Z. · Spring 2026",
        dropped:     "Course dropped: ECON210",
        droppedMeta: "Erlan S. · refund pending",
        interview:   "Interview scheduled",
        interviewMeta:"Tomás Ruiz · Fri 10:00",
      },
    },
    settings: {
      basics: "University basics",
      fields: { universityName: "University name", term: "Active term", registrar: "Registrar", contact: "Contact" },
      placeholders: {
        universityName: "Westmoor University",
        term: "Spring 2026",
        registrar: "Office of the Registrar",
        contact: "registrar@westmoor.edu",
      },
      save: "Save changes",
      integrationsTitle: "Integrations",
      connected: "Connected",
      disconnected: "Disconnected",
      connect: "Connect",
      disconnect: "Disconnect",
      integrations: {
        canvas: "Sync courses, assignments and grades with Canvas LMS.",
        banner: "Student Information System for records and registration.",
        stripe: "Tuition payments and refunds.",
        zoom: "Provision class meetings and office hours.",
        slack: "Department channels and faculty announcements.",
        turnitin: "Originality checks for written assignments.",
      },
    },
  },
  ru: {
    nav: {
      students: "Студенты", faculty: "Преподаватели", admissions: "Приём",
      finance: "Финансы", analytics: "Аналитика", settings: "Настройки",
      groups: { academics: "Учёба", people: "Люди", admin: "Администрация" },
    },
    commandPalette: { placeholder: "Перейти к экрану…" },
    toast: {
      navigated: "Открыт {screen}",
      settingsSaved: "Настройки сохранены",
      connected: "{name} подключён",
      disconnected: "{name} отключён",
    },
    shell: {
      breadcrumbs: {
        dashboard: "Портал преподавателя · Весна 2026",
        courses: "Преподавание · Мои курсы",
        gradebook: "Оценки · Журнал",
        schedule: "Эта неделя · Расписание",
        students: "Люди · Студенты",
        faculty: "Люди · Преподаватели",
        admissions: "Люди · Приём",
        finance: "Администрация · Финансы",
        analytics: "Администрация · Аналитика",
        settings: "Администрация · Настройки",
      },
      screen: {
        students:   { eyebrow: "Список", title: "Студенты",      subtitle: "Активный список со средним баллом и программой." },
        faculty:    { eyebrow: "Кадры",  title: "Преподаватели", subtitle: "Преподавательский состав и текущая нагрузка." },
        admissions: { eyebrow: "Воронка",title: "Приём",         subtitle: "Воронка от заявки до оффера на осень 2026." },
        finance:    { eyebrow: "Оплата", title: "Финансы",       subtitle: "Статус оплаты обучения — оплачено, к оплате, просрочено." },
        analytics:  { eyebrow: "Метрики",title: "Аналитика",     subtitle: "Тренд набора, когортное удержание и события в реальном времени." },
        settings:   { eyebrow: "Настройка",title: "Настройки",   subtitle: "Параметры университета и интеграции." },
      },
    },
    students: {
      list: {
        "0": { name: "Аслан Каримов" },
        "1": { name: "Бермет Жолдошова" },
        "2": { name: "Чен Вэй" },
        "3": { name: "Диёра Назарова" },
        "4": { name: "Эрлан Сариев" },
        "5": { name: "Фарида Окафор" },
        "6": { name: "Гулноза Рахими" },
        "7": { name: "Хамид Турсунов" },
      },
      programs: { cs: "БSc Информатика", econ: "БА Экономика", phil: "БА Философия", bio: "БSc Биология" },
      status: { active: "Активен", probation: "Условно", alumni: "Выпускник" },
    },
    faculty: {
      list: {
        "0": { name: "Д-р Мира Хассан",     title: "Доцент" },
        "1": { name: "Проф. А. Волков",     title: "Зав. кафедрой" },
        "2": { name: "Д-р Ф. Окафор",       title: "Старший преп." },
        "3": { name: "Д-р К. Сато",         title: "Ассистент" },
        "4": { name: "Д-р Р. Ахмади",       title: "Преподаватель" },
        "5": { name: "Проф. С. Линдгрен",   title: "Приглаш. профессор" },
      },
      dept: { cs: "Информатика", econ: "Экономика", phil: "Философия", bio: "Биология" },
      hoursWeek: "ч / нед",
    },
    admissions: {
      stages: { applied: "Заявки", reviewing: "Рассмотрение", interview: "Собеседование", offered: "Оффер" },
      applicants: "Топ заявок",
      sample: {
        "0": { name: "Алима Бек",    src: "Международная · KZ" },
        "1": { name: "Томас Руис",   src: "Перевод · ES" },
        "2": { name: "Юки Танака",   src: "Прямая · JP" },
      },
    },
    finance: {
      col: { student: "Студент", program: "Программа", tuition: "Сумма", due: "Срок", status: "Статус" },
      status: { paid: "Оплачено", due: "К оплате", overdue: "Просрочено" },
    },
    analytics: {
      enrollTitle: "Общее число студентов",
      last10: "Последние 10 семестров",
      liveFeed: "Лента событий",
      cohortTitle: "Когорта удержания",
      cohortNote: "Процент студентов когорты, активных в неделю N.",
      events: {
        applied:     "Новая заявка: Алима Бек",
        appliedMeta: "Международная · только что",
        graded:      "Выставлена оценка: CS401 ДЗ3",
        gradedMeta:  "Д-р Хассан · 28с назад",
        paid:        "Оплата обучения: $14 800",
        paidMeta:    "Далер С. · 1мин назад",
        enrolled:    "Записан на курс: PHIL150",
        enrolledMeta:"Искандар З. · Весна 2026",
        dropped:     "Снят с курса: ECON210",
        droppedMeta: "Эрлан С. · возврат",
        interview:   "Собеседование назначено",
        interviewMeta:"Томас Руис · Пт 10:00",
      },
    },
    settings: {
      basics: "Основные данные",
      fields: { universityName: "Название", term: "Текущий семестр", registrar: "Регистратура", contact: "Контакт" },
      placeholders: {
        universityName: "Westmoor University",
        term: "Весна 2026",
        registrar: "Регистратурa",
        contact: "registrar@westmoor.edu",
      },
      save: "Сохранить",
      integrationsTitle: "Интеграции",
      connected: "Подключено",
      disconnected: "Отключено",
      connect: "Подключить",
      disconnect: "Отключить",
      integrations: {
        canvas: "Курсы, задания и оценки через Canvas LMS.",
        banner: "Информационная система студентов (SIS).",
        stripe: "Оплата обучения и возвраты.",
        zoom: "Онлайн занятия и консультации.",
        slack: "Кафедральные каналы и объявления.",
        turnitin: "Проверка работ на оригинальность.",
      },
    },
  },
  tg: {
    nav: {
      students: "Донишҷӯён", faculty: "Омӯзгорон", admissions: "Қабул",
      finance: "Молия", analytics: "Аналитика", settings: "Танзимот",
      groups: { academics: "Таълим", people: "Одамон", admin: "Маъмурият" },
    },
    commandPalette: { placeholder: "Ба экран гузаштан…" },
    toast: {
      navigated: "{screen} кушода шуд",
      settingsSaved: "Танзимот нигоҳ дошта шуд",
      connected: "{name} пайваст",
      disconnected: "{name} канда",
    },
    shell: {
      breadcrumbs: {
        dashboard: "Портали омӯзгор · Баҳори 2026",
        courses: "Таълим · Курсҳои ман",
        gradebook: "Баҳо · Журнал",
        schedule: "Ин ҳафта · Ҷадвал",
        students: "Одамон · Донишҷӯён",
        faculty: "Одамон · Омӯзгорон",
        admissions: "Одамон · Қабул",
        finance: "Маъмурият · Молия",
        analytics: "Маъмурият · Аналитика",
        settings: "Маъмурият · Танзимот",
      },
      screen: {
        students:   { eyebrow: "Рӯйхат",  title: "Донишҷӯён",  subtitle: "Рӯйхати фаъол бо GPA ва барнома." },
        faculty:    { eyebrow: "Омӯзгор", title: "Омӯзгорон",  subtitle: "Ҳайати омӯзгорон ва бори таълимӣ." },
        admissions: { eyebrow: "Воронка", title: "Қабул",      subtitle: "Воронка аз ариза то оффер барои тирамоҳи 2026." },
        finance:    { eyebrow: "Пардохт", title: "Молия",      subtitle: "Ҳолати пардохти таҳсил — пардохт, қарз, мӯҳлат гузашта." },
        analytics:  { eyebrow: "Нишондиҳандаҳо", title: "Аналитика", subtitle: "Тренди қабул, нигоҳдории когорта ва воқеаҳои зинда." },
        settings:   { eyebrow: "Танзим",  title: "Танзимот",   subtitle: "Параметрҳои донишгоҳ ва интегратсияҳо." },
      },
    },
    students: {
      list: {
        "0": { name: "Аслан Каримов" },
        "1": { name: "Бермет Ҷолдошова" },
        "2": { name: "Чен Вэй" },
        "3": { name: "Диёра Назарова" },
        "4": { name: "Эрлан Сариев" },
        "5": { name: "Фарида Окафор" },
        "6": { name: "Гулноза Раҳимӣ" },
        "7": { name: "Ҳамид Турсунов" },
      },
      programs: { cs: "БSc Информатика", econ: "БА Иқтисод", phil: "БА Фалсафа", bio: "БSc Биология" },
      status: { active: "Фаъол", probation: "Шартӣ", alumni: "Хатмкунанда" },
    },
    faculty: {
      list: {
        "0": { name: "Д-р Мира Ҳассан",   title: "Дотсент" },
        "1": { name: "Проф. А. Волков",   title: "Сарвари кафедра" },
        "2": { name: "Д-р Ф. Окафор",     title: "Омӯзгори калон" },
        "3": { name: "Д-р К. Сато",       title: "Ассистент" },
        "4": { name: "Д-р Р. Аҳмадӣ",     title: "Омӯзгор" },
        "5": { name: "Проф. С. Линдгрен", title: "Профессори меҳмон" },
      },
      dept: { cs: "Информатика", econ: "Иқтисод", phil: "Фалсафа", bio: "Биология" },
      hoursWeek: "соат / ҳафта",
    },
    admissions: {
      stages: { applied: "Аризаҳо", reviewing: "Баррасӣ", interview: "Мусоҳиба", offered: "Оффер" },
      applicants: "Беҳтарин аризаҳо",
      sample: {
        "0": { name: "Алима Бек",    src: "Байналмилалӣ · KZ" },
        "1": { name: "Томас Руис",   src: "Гузариш · ES" },
        "2": { name: "Юки Танака",   src: "Бевосита · JP" },
      },
    },
    finance: {
      col: { student: "Донишҷӯ", program: "Барнома", tuition: "Маблағ", due: "Мӯҳлат", status: "Ҳолат" },
      status: { paid: "Пардохт", due: "Қарздор", overdue: "Мӯҳлат гузашт" },
    },
    analytics: {
      enrollTitle: "Шумораи умумии донишҷӯён",
      last10: "10 семестри охирин",
      liveFeed: "Лентаи воқеаҳо",
      cohortTitle: "Когортаи нигоҳдорӣ",
      cohortNote: "Фоизи донишҷӯёни когорта, ки дар ҳафтаи N фаъоланд.",
      events: {
        applied:     "Аризаи нав: Алима Бек",
        appliedMeta: "Байналмилалӣ · ҳозир",
        graded:      "Баҳо гузошта шуд: CS401 ДВ3",
        gradedMeta:  "Д-р Ҳассан · 28с пеш",
        paid:        "Пардохти таҳсил: $14,800",
        paidMeta:    "Далер С. · 1дақ пеш",
        enrolled:    "Сабт ба курс: PHIL150",
        enrolledMeta:"Искандар З. · Баҳори 2026",
        dropped:     "Аз курс берун: ECON210",
        droppedMeta: "Эрлан С. · бозгашти маблағ",
        interview:   "Мусоҳиба таъин шуд",
        interviewMeta:"Томас Руис · Ҷум 10:00",
      },
    },
    settings: {
      basics: "Маълумоти асосии донишгоҳ",
      fields: { universityName: "Номи донишгоҳ", term: "Семестри ҷорӣ", registrar: "Дафтари сабт", contact: "Тамос" },
      placeholders: {
        universityName: "Westmoor University",
        term: "Баҳори 2026",
        registrar: "Дафтари сабт",
        contact: "registrar@westmoor.edu",
      },
      save: "Нигоҳ доштан",
      integrationsTitle: "Интегратсияҳо",
      connected: "Пайваст",
      disconnected: "Канда",
      connect: "Пайваст кардан",
      disconnect: "Кандан",
      integrations: {
        canvas: "Курсҳо, вазифаҳо ва баҳоҳо тавассути Canvas LMS.",
        banner: "Системаи иттилоотии донишҷӯён (SIS).",
        stripe: "Пардохти таҳсил ва бозгашт.",
        zoom: "Дарсҳои онлайн ва машваратҳо.",
        slack: "Каналҳои кафедра ва эълонҳо.",
        turnitin: "Санҷиши асолати корҳои хаттӣ.",
      },
    },
  },
};

function deepMerge(target, source) {
  for (const k of Object.keys(source)) {
    if (
      source[k] && typeof source[k] === "object" && !Array.isArray(source[k]) &&
      target[k] && typeof target[k] === "object" && !Array.isArray(target[k])
    ) {
      deepMerge(target[k], source[k]);
    } else {
      target[k] = source[k];
    }
  }
  return target;
}

for (const locale of ["en", "ru", "tg"]) {
  const fp = path.join(__dirname, "..", "src", "i18n", "messages", `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(fp, "utf8"));
  if (!data.demoPreview.university) data.demoPreview.university = {};
  deepMerge(data.demoPreview.university, ADDITIONS[locale]);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n");
  console.log(`updated ${locale}.json (university)`);
}
