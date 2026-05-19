const fs = require("fs");
const path = require("path");

const ADDITIONS = {
  en: {
    nav: { consulting: "Consulting", partners: "Partners", payments: "Payments", visa: "Visa", analytics: "Analytics", settings: "Settings" },
    commandPalette: { placeholder: "Jump to a screen…", group: "Workspace" },
    toast: {
      navigated: "Opened {screen}",
      sessionConfirmed: "Session confirmed with {name}",
      settingsSaved: "Settings saved",
      connected: "{name} connected", disconnected: "{name} disconnected",
    },
    shell: {
      breadcrumb: {
        consulting: "Workspace / Consulting", partners: "Workspace / Partners",
        payments: "Workspace / Payments", visa: "Workspace / Visa",
        analytics: "Workspace / Analytics", settings: "Workspace / Settings",
      },
    },
    screen: {
      consulting: { eyebrow: "1-on-1", title: "Consulting sessions", subtitle: "Today's calendar of student meetings and rehearsals." },
      partners: { eyebrow: "Network", title: "University partners", subtitle: "Active partnerships with placement counts and commission rates." },
      payments: { eyebrow: "Money", title: "Payments", subtitle: "Service fees, tuition installments, and visa fees." },
      visa: { eyebrow: "Pipeline", title: "Visa tracker", subtitle: "Document prep, submission, interview, issued, and departed." },
      analytics: { eyebrow: "Performance", title: "Analytics", subtitle: "Revenue trend, conversion, and live activity." },
      settings: { eyebrow: "Configuration", title: "Settings", subtitle: "Agency basics and partner integrations." },
    },
    kpi: {
      consulting: {
        0: { label: "Sessions today", value: "8", trend: "All confirmed" },
        1: { label: "Avg duration", value: "52 min", trend: "On target" },
        2: { label: "Rating (90d)", value: "4.9", trend: "Trending up" },
        3: { label: "No-shows", value: "2%", trend: "Down from 6%" },
      },
      partners: {
        0: { label: "Active partners", value: "31", trend: "+4 this year" },
        1: { label: "Placements (YTD)", value: "310", trend: "+22% MoM" },
        2: { label: "Avg commission", value: "15.2%", trend: "Stable" },
        3: { label: "Hot partners", value: "6", trend: "Tsinghua + SJTU" },
      },
      payments: {
        0: { label: "Outstanding", value: "$184K", trend: "Mostly tuition" },
        1: { label: "Collected (30d)", value: "$96K", trend: "+18% MoM" },
        2: { label: "Overdue", value: "$8.4K", trend: "1 case · escalated" },
        3: { label: "Avg ticket", value: "$5.2K", trend: "+$0.6K YoY" },
      },
      visa: {
        0: { label: "In pipeline", value: "34", trend: "All on schedule" },
        1: { label: "Interview pass", value: "94%", trend: "+3 pp YoY" },
        2: { label: "Avg processing", value: "18 days", trend: "Down from 24" },
        3: { label: "Departed (YTD)", value: "126", trend: "Record year" },
      },
      analytics: {
        0: { label: "Revenue (30d)", value: "$96K", trend: "+18% MoM" },
        1: { label: "Conversion", value: "32%", trend: "Inquiry → Departed" },
        2: { label: "Avg cycle", value: "84 days", trend: "Inquiry → Visa" },
        3: { label: "NPS", value: "72", trend: "Word of mouth strong" },
      },
      settings: {
        0: { label: "Uptime (30d)", value: "100%", trend: "All green" },
        1: { label: "Integrations", value: "6 active", trend: "+1 this month" },
        2: { label: "Team seats", value: "8 / 12", trend: "Room to grow" },
        3: { label: "API calls (24h)", value: "880", trend: "Within limits" },
      },
    },
    consulting: { mode: { inPerson: "In-person", video: "Video" }, confirm: "Confirm" },
    partners: { hot: "Hot", placements: "Placements", commission: "Commission" },
    payments: {
      col: { student: "Student", purpose: "Purpose", amount: "Amount", due: "Due", status: "Status" },
      status: { paid: "Paid", due: "Due", partial: "Partial", overdue: "Overdue", scheduled: "Scheduled" },
    },
    visa: {
      stages: {
        docPrep: "Doc prep",
        submitted: "Submitted",
        interview: "Interview",
        issued: "Issued",
        departed: "Departed",
      },
    },
    analytics: { revenueTitle: "Revenue (last 30 days)", last30: "Last 30 days", liveFeed: "Live activity" },
    settings: {
      basicsTitle: "Agency basics",
      fields: { agencyName: "Agency name", contactEmail: "Contact email", officeAddress: "Office address", license: "License #" },
      placeholders: { agencyName: "Silk Road Education", contactEmail: "hello@silkroad.edu", officeAddress: "Rudaki Ave 17, Dushanbe", license: "TJ-EDU-2024-138" },
      save: "Save changes",
      integrationsTitle: "Integrations",
      connected: "Connected", disconnected: "Disconnected",
      connect: "Connect", disconnect: "Disconnect",
      integrations: {
        wechat: "Chat with students and parents on WeChat.",
        stripe: "Take service fees in USD, EUR, CNY.",
        docusign: "Send and sign service agreements digitally.",
        zoom: "1-on-1 consulting via Zoom meetings.",
        mailchimp: "Drip campaigns for inquiries and waitlists.",
        notion: "Share doc templates and checklists with clients.",
      },
    },
  },
  ru: {
    nav: { consulting: "Консультации", partners: "Партнёры", payments: "Платежи", visa: "Виза", analytics: "Аналитика", settings: "Настройки" },
    commandPalette: { placeholder: "Перейти к экрану…", group: "Рабочая область" },
    toast: {
      navigated: "Открыт {screen}",
      sessionConfirmed: "Сессия с {name} подтверждена",
      settingsSaved: "Настройки сохранены",
      connected: "{name} подключён", disconnected: "{name} отключён",
    },
    shell: {
      breadcrumb: {
        consulting: "Рабочая / Консультации", partners: "Рабочая / Партнёры",
        payments: "Рабочая / Платежи", visa: "Рабочая / Виза",
        analytics: "Рабочая / Аналитика", settings: "Рабочая / Настройки",
      },
    },
    screen: {
      consulting: { eyebrow: "1-на-1", title: "Консультации", subtitle: "Календарь встреч и репетиций со студентами." },
      partners: { eyebrow: "Сеть", title: "Партнёры", subtitle: "Активные партнёрства с количеством зачислений и комиссией." },
      payments: { eyebrow: "Деньги", title: "Платежи", subtitle: "Сервисные сборы, обучение и визовые сборы." },
      visa: { eyebrow: "Воронка", title: "Трекер виз", subtitle: "Подготовка, подача, собеседование, выдача, отъезд." },
      analytics: { eyebrow: "Показатели", title: "Аналитика", subtitle: "Тренд выручки, конверсия и события в реальном времени." },
      settings: { eyebrow: "Конфигурация", title: "Настройки", subtitle: "Основные данные агентства и интеграции." },
    },
    kpi: {
      consulting: {
        0: { label: "Сессий сегодня", value: "8", trend: "Все подтверждены" },
        1: { label: "Ср. длительность", value: "52 мин", trend: "В норме" },
        2: { label: "Рейтинг (90д)", value: "4,9", trend: "Растёт" },
        3: { label: "Неявки", value: "2%", trend: "Снизилось с 6%" },
      },
      partners: {
        0: { label: "Активных партнёров", value: "31", trend: "+4 за год" },
        1: { label: "Зачислений (YTD)", value: "310", trend: "+22% MoM" },
        2: { label: "Ср. комиссия", value: "15,2%", trend: "Стабильно" },
        3: { label: "Горячих партнёров", value: "6", trend: "Tsinghua + SJTU" },
      },
      payments: {
        0: { label: "К получению", value: "$184K", trend: "В основном обучение" },
        1: { label: "Получено (30д)", value: "$96K", trend: "+18% MoM" },
        2: { label: "Просрочка", value: "$8,4K", trend: "1 случай" },
        3: { label: "Ср. чек", value: "$5,2K", trend: "+$0,6K YoY" },
      },
      visa: {
        0: { label: "В воронке", value: "34", trend: "По графику" },
        1: { label: "Успех собес.", value: "94%", trend: "+3 п.п. YoY" },
        2: { label: "Ср. обработка", value: "18 дней", trend: "Было 24" },
        3: { label: "Уехали (YTD)", value: "126", trend: "Рекордный год" },
      },
      analytics: {
        0: { label: "Доход (30д)", value: "$96K", trend: "+18% MoM" },
        1: { label: "Конверсия", value: "32%", trend: "Запрос → Отъезд" },
        2: { label: "Ср. цикл", value: "84 дня", trend: "Запрос → Виза" },
        3: { label: "NPS", value: "72", trend: "Сарафан силён" },
      },
      settings: {
        0: { label: "Аптайм (30д)", value: "100%", trend: "Всё в порядке" },
        1: { label: "Интеграций", value: "6 активных", trend: "+1 за месяц" },
        2: { label: "Места команды", value: "8 / 12", trend: "Есть резерв" },
        3: { label: "API за 24ч", value: "880", trend: "В пределах" },
      },
    },
    consulting: { mode: { inPerson: "Очно", video: "Видео" }, confirm: "Подтвердить" },
    partners: { hot: "Топ", placements: "Зачисления", commission: "Комиссия" },
    payments: {
      col: { student: "Студент", purpose: "Назначение", amount: "Сумма", due: "Срок", status: "Статус" },
      status: { paid: "Оплачено", due: "К оплате", partial: "Частично", overdue: "Просрочка", scheduled: "В графике" },
    },
    visa: {
      stages: { docPrep: "Подг. док.", submitted: "Подано", interview: "Собес.", issued: "Выдана", departed: "Уехал" },
    },
    analytics: { revenueTitle: "Выручка (30 дней)", last30: "Последние 30 дней", liveFeed: "Лента событий" },
    settings: {
      basicsTitle: "Основные данные",
      fields: { agencyName: "Название", contactEmail: "Email", officeAddress: "Адрес офиса", license: "Лицензия №" },
      placeholders: { agencyName: "Silk Road Education", contactEmail: "hello@silkroad.edu", officeAddress: "пр. Рудаки 17, Душанбе", license: "TJ-EDU-2024-138" },
      save: "Сохранить",
      integrationsTitle: "Интеграции",
      connected: "Подключено", disconnected: "Отключено",
      connect: "Подключить", disconnect: "Отключить",
      integrations: {
        wechat: "Общение со студентами и родителями в WeChat.",
        stripe: "Принимаем USD, EUR, CNY.",
        docusign: "Электронные подписи соглашений.",
        zoom: "Консультации через Zoom.",
        mailchimp: "Капельные кампании для запросов.",
        notion: "Шаблоны и чек-листы клиентам.",
      },
    },
  },
  tg: {
    nav: { consulting: "Машварат", partners: "Шарикон", payments: "Пардохт", visa: "Виза", analytics: "Аналитика", settings: "Танзимот" },
    commandPalette: { placeholder: "Ба экран гузаштан…", group: "Соҳаи корӣ" },
    toast: {
      navigated: "{screen} кушода шуд",
      sessionConfirmed: "Машварат бо {name} тасдиқ шуд",
      settingsSaved: "Танзимот нигоҳ дошта шуд",
      connected: "{name} пайваст", disconnected: "{name} канда",
    },
    shell: {
      breadcrumb: {
        consulting: "Корӣ / Машварат", partners: "Корӣ / Шарикон",
        payments: "Корӣ / Пардохт", visa: "Корӣ / Виза",
        analytics: "Корӣ / Аналитика", settings: "Корӣ / Танзимот",
      },
    },
    screen: {
      consulting: { eyebrow: "1-ба-1", title: "Машваратҳо", subtitle: "Календари вохӯриҳо ва машқҳо бо донишҷӯён." },
      partners: { eyebrow: "Шабака", title: "Шарикон", subtitle: "Шарикии фаъол бо шумораи қабул ва комиссия." },
      payments: { eyebrow: "Маблағ", title: "Пардохт", subtitle: "Хидмат, таҳсил ва визавӣ." },
      visa: { eyebrow: "Воронка", title: "Пайгирии виза", subtitle: "Тайёрӣ, супоридан, мусоҳиба, додан, рафтан." },
      analytics: { eyebrow: "Натиҷаҳо", title: "Аналитика", subtitle: "Тренди даромад, конверсия ва фаъолияти зинда." },
      settings: { eyebrow: "Танзим", title: "Танзимот", subtitle: "Маълумоти асосии агентӣ ва интегратсияҳо." },
    },
    kpi: {
      consulting: {
        0: { label: "Машварат имрӯз", value: "8", trend: "Ҳама тасдиқ шуданд" },
        1: { label: "Давомнокӣ", value: "52 дақ", trend: "Дар меъёр" },
        2: { label: "Рейтинг (90 рӯз)", value: "4,9", trend: "Меафзояд" },
        3: { label: "Нонаёшӣ", value: "2%", trend: "Аз 6% паст" },
      },
      partners: {
        0: { label: "Шарикони фаъол", value: "31", trend: "+4 дар сол" },
        1: { label: "Қабулҳо (YTD)", value: "310", trend: "+22% MoM" },
        2: { label: "Комиссияи миёна", value: "15,2%", trend: "Устувор" },
        3: { label: "Шарикони фаъол", value: "6", trend: "Tsinghua + SJTU" },
      },
      payments: {
        0: { label: "Қарзҳо", value: "$184K", trend: "Асосан таҳсил" },
        1: { label: "Гирифташуда (30 рӯз)", value: "$96K", trend: "+18% MoM" },
        2: { label: "Гузашта", value: "$8,4K", trend: "1 ҳолат" },
        3: { label: "Чеки миёна", value: "$5,2K", trend: "+$0,6K YoY" },
      },
      visa: {
        0: { label: "Дар воронка", value: "34", trend: "Дар вақт" },
        1: { label: "Муваффақият", value: "94%", trend: "+3 п.п. YoY" },
        2: { label: "Коркард", value: "18 рӯз", trend: "Аз 24 кам" },
        3: { label: "Рафтанд (YTD)", value: "126", trend: "Соли рекордӣ" },
      },
      analytics: {
        0: { label: "Даромад (30 рӯз)", value: "$96K", trend: "+18% MoM" },
        1: { label: "Конверсия", value: "32%", trend: "Дархост → Рафт" },
        2: { label: "Давраи миёна", value: "84 рӯз", trend: "Дархост → Виза" },
        3: { label: "NPS", value: "72", trend: "Аз даҳон ба даҳон" },
      },
      settings: {
        0: { label: "Аптайм (30 рӯз)", value: "100%", trend: "Ҳама хуб" },
        1: { label: "Интегратсияҳо", value: "6 фаъол", trend: "+1 дар моҳ" },
        2: { label: "Ҷойҳои даста", value: "8 / 12", trend: "Ҷой ҳаст" },
        3: { label: "API дар 24с", value: "880", trend: "Дар ҳудуд" },
      },
    },
    consulting: { mode: { inPerson: "Шахсан", video: "Видео" }, confirm: "Тасдиқ кардан" },
    partners: { hot: "Топ", placements: "Қабулҳо", commission: "Комиссия" },
    payments: {
      col: { student: "Донишҷӯ", purpose: "Мақсад", amount: "Маблағ", due: "Мӯҳлат", status: "Ҳолат" },
      status: { paid: "Пардохт", due: "Қарздор", partial: "Қисман", overdue: "Гузашта", scheduled: "Нақшавӣ" },
    },
    visa: {
      stages: { docPrep: "Ҳуҷҷат тайёр", submitted: "Супорида", interview: "Мусоҳиба", issued: "Додашуда", departed: "Рафт" },
    },
    analytics: { revenueTitle: "Даромад (30 рӯз)", last30: "30 рӯзи охирин", liveFeed: "Лентаи воқеаҳо" },
    settings: {
      basicsTitle: "Маълумоти асосӣ",
      fields: { agencyName: "Номи агентӣ", contactEmail: "Email", officeAddress: "Суроғаи дафтар", license: "№ литсензия" },
      placeholders: { agencyName: "Silk Road Education", contactEmail: "hello@silkroad.edu", officeAddress: "хиёбони Рӯдакӣ 17, Душанбе", license: "TJ-EDU-2024-138" },
      save: "Нигоҳ доштан",
      integrationsTitle: "Интегратсияҳо",
      connected: "Пайваст", disconnected: "Канда",
      connect: "Пайваст кардан", disconnect: "Кандан",
      integrations: {
        wechat: "Сӯҳбат бо донишҷӯён ва волидайн дар WeChat.",
        stripe: "Пардохт дар USD, EUR, CNY.",
        docusign: "Имзои электронии шартномаҳо.",
        zoom: "Машварат тавассути Zoom.",
        mailchimp: "Капкорӣ ва бозгардондан.",
        notion: "Қолабҳо ва рӯйхатҳо барои муштариён.",
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
  if (!data.demoPreview["china-agency"]) data.demoPreview["china-agency"] = {};
  deepMerge(data.demoPreview["china-agency"], ADDITIONS[locale]);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n");
  console.log(`updated ${locale}.json (china-agency)`);
}
