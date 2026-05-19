const fs = require("fs");
const path = require("path");

const ADDITIONS = {
  en: {
    nav: { clients: "Clients", banking: "Banking", taxes: "Taxes", payroll: "Payroll", projects: "Projects", settings: "Settings" },
    commandPalette: { placeholder: "Jump to a screen…", group: "Workspace" },
    toast: {
      navigated: "Opened {screen}",
      payrollProcessed: "Payroll run queued",
      settingsSaved: "Settings saved",
      connected: "{name} connected", disconnected: "{name} disconnected",
    },
    shell: {
      breadcrumb: {
        clients: "Workspace / Clients", banking: "Workspace / Banking",
        taxes: "Workspace / Taxes", payroll: "Workspace / Payroll",
        projects: "Workspace / Projects", settings: "Workspace / Settings",
      },
      screen: {
        clients: { eyebrow: "Roster", title: "Clients", subtitle: "Active engagements, YTD revenue, and outstanding balances." },
        banking: { eyebrow: "Cash", title: "Banking", subtitle: "Cash flow, account balances, and live transaction feed." },
        taxes: { eyebrow: "Compliance", title: "Taxes", subtitle: "Estimated payments, document tracker, and deadlines." },
        payroll: { eyebrow: "People", title: "Payroll", subtitle: "Run payroll, review withholdings, and approve net pay." },
        projects: { eyebrow: "Engagements", title: "Projects", subtitle: "Budget vs spend across active client engagements." },
        settings: { eyebrow: "Configuration", title: "Settings", subtitle: "Firm basics and third-party integrations." },
      },
      kpi: {
        clients: {
          0: { label: "Active clients", value: "42", trend: "+4 this quarter" },
          1: { label: "AR outstanding", value: "$42,180", trend: "Within terms" },
          2: { label: "New this month", value: "3", trend: "Strong pipeline" },
          3: { label: "Avg engagement", value: "$18.4K", trend: "+$2.2K YoY" },
        },
        banking: {
          0: { label: "Cash on hand", value: "$581,560", trend: "+$28K this week" },
          1: { label: "Inflows (30d)", value: "$184K", trend: "+12.4% MoM" },
          2: { label: "Outflows (30d)", value: "$76K", trend: "Stable" },
          3: { label: "Float", value: "0 days", trend: "Same-day settle" },
        },
        taxes: {
          0: { label: "Next deadline", value: "Jun 15", trend: "Q2 estimated" },
          1: { label: "Paid YTD", value: "$28.4K", trend: "On track" },
          2: { label: "Docs received", value: "84%", trend: "16% pending" },
          3: { label: "Filings open", value: "6", trend: "2 due this month" },
        },
        payroll: {
          0: { label: "Employees", value: "12", trend: "Full-time + contract" },
          1: { label: "This run", value: "$28,790", trend: "Net to bank" },
          2: { label: "YTD payroll", value: "$348K", trend: "Within budget" },
          3: { label: "Tax remit", value: "$72.4K", trend: "Automated" },
        },
        projects: {
          0: { label: "Active projects", value: "12", trend: "+2 this month" },
          1: { label: "Budget consumed", value: "62%", trend: "Healthy" },
          2: { label: "At-risk", value: "1", trend: "Sunset Coast 95%" },
          3: { label: "Avg margin", value: "38%", trend: "+4 pp YoY" },
        },
        settings: {
          0: { label: "Uptime (30d)", value: "99.99%", trend: "All systems green" },
          1: { label: "Integrations", value: "8 active", trend: "+2 this month" },
          2: { label: "Team seats", value: "6 / 10", trend: "Room to grow" },
          3: { label: "API calls (24h)", value: "1.2K", trend: "Within limits" },
        },
      },
    },
    clientsScreen: {
      col: { name: "Client", industry: "Industry", ytd: "YTD revenue", outstanding: "Outstanding", status: "Status" },
      status: { active: "Active", overdue: "Overdue", draft: "Draft" },
    },
    banking: { cashFlow: "Cash flow", last30: "Last 30 days", liveFeed: "Live transactions" },
    taxes: {
      estPaymentsTitle: "Estimated payments",
      docTrackerTitle: "Document tracker",
      status: { paid: "Paid", due: "Due", future: "Future" },
      col: { doc: "Document", form: "Form", received: "Received", status: "Status" },
      docStatus: { received: "Received", pending: "Pending" },
    },
    payroll: {
      runTitle: "Payroll run · May 2025",
      runPayroll: "Run payroll",
      col: { employee: "Employee", role: "Role", gross: "Gross", net: "Net", status: "Status" },
      status: { ready: "Ready", draft: "Draft" },
    },
    projects: { spent: "Spent", complete: "complete" },
    settings: {
      firmBasics: "Firm basics",
      fields: { firmName: "Firm name", ein: "EIN", address: "Address", fiscalYear: "Fiscal year end" },
      placeholders: { firmName: "Ledger & Lane CPAs", ein: "12-3456789", address: "1100 King St, Dushanbe", fiscalYear: "December 31" },
      save: "Save changes",
      integrationsTitle: "Integrations",
      connected: "Connected", disconnected: "Disconnected",
      connect: "Connect", disconnect: "Disconnect",
      integrations: {
        quickbooks: "Two-way sync with QuickBooks Online.",
        xero: "Connect a Xero org for unified ledger.",
        stripe: "Auto-import Stripe payouts as revenue.",
        plaid: "Bank-feed all client accounts via Plaid.",
        gusto: "Pull payroll runs into the ledger nightly.",
        docusign: "Send engagement letters and W-9s.",
      },
    },
  },
  ru: {
    nav: { clients: "Клиенты", banking: "Банки", taxes: "Налоги", payroll: "Зарплата", projects: "Проекты", settings: "Настройки" },
    commandPalette: { placeholder: "Перейти к экрану…", group: "Рабочая область" },
    toast: {
      navigated: "Открыт {screen}",
      payrollProcessed: "Зарплата в очереди",
      settingsSaved: "Настройки сохранены",
      connected: "{name} подключён", disconnected: "{name} отключён",
    },
    shell: {
      breadcrumb: {
        clients: "Рабочая / Клиенты", banking: "Рабочая / Банки",
        taxes: "Рабочая / Налоги", payroll: "Рабочая / Зарплата",
        projects: "Рабочая / Проекты", settings: "Рабочая / Настройки",
      },
      screen: {
        clients: { eyebrow: "Реестр", title: "Клиенты", subtitle: "Активные проекты, доход YTD и задолженность." },
        banking: { eyebrow: "Деньги", title: "Банки", subtitle: "Денежный поток, остатки и лента транзакций." },
        taxes: { eyebrow: "Соответствие", title: "Налоги", subtitle: "Авансовые платежи, документы и дедлайны." },
        payroll: { eyebrow: "Сотрудники", title: "Зарплата", subtitle: "Расчёт, удержания и подтверждение к выплате." },
        projects: { eyebrow: "Проекты", title: "Проекты", subtitle: "Бюджет и расход по активным клиентам." },
        settings: { eyebrow: "Конфигурация", title: "Настройки", subtitle: "Основные данные и интеграции." },
      },
      kpi: {
        clients: {
          0: { label: "Активных клиентов", value: "42", trend: "+4 за квартал" },
          1: { label: "Дебиторка", value: "$42 180", trend: "В рамках сроков" },
          2: { label: "Новые за месяц", value: "3", trend: "Сильная воронка" },
          3: { label: "Ср. проект", value: "$18,4K", trend: "+$2,2K YoY" },
        },
        banking: {
          0: { label: "Денег на счетах", value: "$581 560", trend: "+$28K за неделю" },
          1: { label: "Поступления (30д)", value: "$184K", trend: "+12,4% MoM" },
          2: { label: "Расходы (30д)", value: "$76K", trend: "Стабильно" },
          3: { label: "Float", value: "0 дней", trend: "В тот же день" },
        },
        taxes: {
          0: { label: "След. срок", value: "15 июня", trend: "Q2 авансы" },
          1: { label: "Оплачено YTD", value: "$28,4K", trend: "По плану" },
          2: { label: "Документов", value: "84%", trend: "16% ожидаются" },
          3: { label: "Открытых отчётов", value: "6", trend: "2 в этом месяце" },
        },
        payroll: {
          0: { label: "Сотрудников", value: "12", trend: "Штат + контракт" },
          1: { label: "Этот расчёт", value: "$28 790", trend: "К выплате" },
          2: { label: "YTD ФОТ", value: "$348K", trend: "В бюджете" },
          3: { label: "Перечислено налогов", value: "$72,4K", trend: "Автоматически" },
        },
        projects: {
          0: { label: "Активных проектов", value: "12", trend: "+2 за месяц" },
          1: { label: "Бюджета использовано", value: "62%", trend: "Норма" },
          2: { label: "Под риском", value: "1", trend: "Sunset Coast 95%" },
          3: { label: "Ср. маржа", value: "38%", trend: "+4 п.п. YoY" },
        },
        settings: {
          0: { label: "Аптайм (30д)", value: "99,99%", trend: "Всё в порядке" },
          1: { label: "Интеграций", value: "8 активных", trend: "+2 за месяц" },
          2: { label: "Места команды", value: "6 / 10", trend: "Есть резерв" },
          3: { label: "API за 24ч", value: "1,2K", trend: "В пределах" },
        },
      },
    },
    clientsScreen: {
      col: { name: "Клиент", industry: "Отрасль", ytd: "YTD доход", outstanding: "Долг", status: "Статус" },
      status: { active: "Активный", overdue: "Просрочка", draft: "Черновик" },
    },
    banking: { cashFlow: "Денежный поток", last30: "Последние 30 дней", liveFeed: "Транзакции в реальном времени" },
    taxes: {
      estPaymentsTitle: "Авансовые платежи",
      docTrackerTitle: "Трекер документов",
      status: { paid: "Оплачен", due: "К оплате", future: "Будущий" },
      col: { doc: "Документ", form: "Форма", received: "Получено", status: "Статус" },
      docStatus: { received: "Получен", pending: "Ожидание" },
    },
    payroll: {
      runTitle: "Расчёт · Май 2025",
      runPayroll: "Запустить расчёт",
      col: { employee: "Сотрудник", role: "Роль", gross: "Брутто", net: "Нетто", status: "Статус" },
      status: { ready: "Готов", draft: "Черновик" },
    },
    projects: { spent: "Потрачено", complete: "выполнено" },
    settings: {
      firmBasics: "Основные данные фирмы",
      fields: { firmName: "Название фирмы", ein: "EIN/ИНН", address: "Адрес", fiscalYear: "Конец фискального года" },
      placeholders: { firmName: "Ledger & Lane CPAs", ein: "12-3456789", address: "ул. Кинг 1100, Душанбе", fiscalYear: "31 декабря" },
      save: "Сохранить",
      integrationsTitle: "Интеграции",
      connected: "Подключено", disconnected: "Отключено",
      connect: "Подключить", disconnect: "Отключить",
      integrations: {
        quickbooks: "Двусторонняя синхронизация с QuickBooks Online.",
        xero: "Подключите Xero для единого реестра.",
        stripe: "Автоимпорт выплат Stripe как дохода.",
        plaid: "Банковские фиды клиентов через Plaid.",
        gusto: "Расчёт ФОТ синхронизируется ночью.",
        docusign: "Отправка соглашений и W-9.",
      },
    },
  },
  tg: {
    nav: { clients: "Муштариён", banking: "Бонк", taxes: "Андоз", payroll: "Маош", projects: "Лоиҳаҳо", settings: "Танзимот" },
    commandPalette: { placeholder: "Ба экран гузаштан…", group: "Соҳаи корӣ" },
    toast: {
      navigated: "{screen} кушода шуд",
      payrollProcessed: "Маош дар навбат",
      settingsSaved: "Танзимот нигоҳ дошта шуд",
      connected: "{name} пайваст", disconnected: "{name} канда",
    },
    shell: {
      breadcrumb: {
        clients: "Корӣ / Муштариён", banking: "Корӣ / Бонк",
        taxes: "Корӣ / Андоз", payroll: "Корӣ / Маош",
        projects: "Корӣ / Лоиҳаҳо", settings: "Корӣ / Танзимот",
      },
      screen: {
        clients: { eyebrow: "Феҳраст", title: "Муштариён", subtitle: "Корҳои фаъол, даромад YTD ва қарзҳо." },
        banking: { eyebrow: "Маблағ", title: "Бонк", subtitle: "Ҷараёни маблағ, тавозун ва лентаи транзаксияҳо." },
        taxes: { eyebrow: "Мутобиқат", title: "Андоз", subtitle: "Пардохтҳои арзёбӣ, ҳуҷҷатҳо ва мӯҳлатҳо." },
        payroll: { eyebrow: "Кормандон", title: "Маош", subtitle: "Ҳисобкунӣ, тарҳҳо ва тасдиқи пардохт." },
        projects: { eyebrow: "Лоиҳаҳо", title: "Лоиҳаҳо", subtitle: "Буҷет ва хароҷот барои муштариёни фаъол." },
        settings: { eyebrow: "Танзим", title: "Танзимот", subtitle: "Маълумоти асосии ширкат ва интегратсияҳо." },
      },
      kpi: {
        clients: {
          0: { label: "Муштариёни фаъол", value: "42", trend: "+4 дар чоряк" },
          1: { label: "Қарздорӣ", value: "$42 180", trend: "Дар мӯҳлат" },
          2: { label: "Нав дар моҳ", value: "3", trend: "Воронкаи сахт" },
          3: { label: "Лоиҳаи миёна", value: "$18,4K", trend: "+$2,2K YoY" },
        },
        banking: {
          0: { label: "Маблағи дастрас", value: "$581 560", trend: "+$28K дар ҳафта" },
          1: { label: "Воридот (30 рӯз)", value: "$184K", trend: "+12,4% MoM" },
          2: { label: "Хароҷот (30 рӯз)", value: "$76K", trend: "Устувор" },
          3: { label: "Float", value: "0 рӯз", trend: "Дар як рӯз" },
        },
        taxes: {
          0: { label: "Мӯҳлати оянда", value: "15 июн", trend: "Q2 авансҳо" },
          1: { label: "Пардохт YTD", value: "$28,4K", trend: "Дар нақша" },
          2: { label: "Ҳуҷҷатҳо", value: "84%", trend: "16% мунтазир" },
          3: { label: "Ҳисоботи кушод", value: "6", trend: "2 дар ин моҳ" },
        },
        payroll: {
          0: { label: "Кормандон", value: "12", trend: "Штат + шартнома" },
          1: { label: "Ин ҳисоб", value: "$28 790", trend: "Барои пардохт" },
          2: { label: "YTD ФОТ", value: "$348K", trend: "Дар буҷет" },
          3: { label: "Андоз ҳавола", value: "$72,4K", trend: "Худкор" },
        },
        projects: {
          0: { label: "Лоиҳаҳои фаъол", value: "12", trend: "+2 дар моҳ" },
          1: { label: "Буҷет истифода", value: "62%", trend: "Меъёр" },
          2: { label: "Дар хатар", value: "1", trend: "Sunset Coast 95%" },
          3: { label: "Маржаи миёна", value: "38%", trend: "+4 п.п. YoY" },
        },
        settings: {
          0: { label: "Аптайм (30 рӯз)", value: "99,99%", trend: "Ҳама хуб" },
          1: { label: "Интегратсияҳо", value: "8 фаъол", trend: "+2 дар моҳ" },
          2: { label: "Ҷойҳои даста", value: "6 / 10", trend: "Ҷой ҳаст" },
          3: { label: "API дар 24с", value: "1,2K", trend: "Дар ҳудуд" },
        },
      },
    },
    clientsScreen: {
      col: { name: "Муштарӣ", industry: "Соҳа", ytd: "Даромади YTD", outstanding: "Қарз", status: "Ҳолат" },
      status: { active: "Фаъол", overdue: "Гузашта", draft: "Хом" },
    },
    banking: { cashFlow: "Ҷараёни маблағ", last30: "30 рӯзи охирин", liveFeed: "Транзаксияҳои зинда" },
    taxes: {
      estPaymentsTitle: "Пардохтҳои арзёбӣ",
      docTrackerTitle: "Пайгирии ҳуҷҷатҳо",
      status: { paid: "Пардохт", due: "Қарздор", future: "Оянда" },
      col: { doc: "Ҳуҷҷат", form: "Шакл", received: "Гирифт", status: "Ҳолат" },
      docStatus: { received: "Гирифташуда", pending: "Мунтазир" },
    },
    payroll: {
      runTitle: "Ҳисоб · Май 2025",
      runPayroll: "Иҷро кардан",
      col: { employee: "Корманд", role: "Нақш", gross: "Брутто", net: "Нетто", status: "Ҳолат" },
      status: { ready: "Тайёр", draft: "Хом" },
    },
    projects: { spent: "Хароҷот", complete: "анҷом" },
    settings: {
      firmBasics: "Маълумоти асосии ширкат",
      fields: { firmName: "Номи ширкат", ein: "EIN/ИНН", address: "Суроға", fiscalYear: "Охири соли фискалӣ" },
      placeholders: { firmName: "Ledger & Lane CPAs", ein: "12-3456789", address: "King St 1100, Душанбе", fiscalYear: "31 декабр" },
      save: "Нигоҳ доштан",
      integrationsTitle: "Интегратсияҳо",
      connected: "Пайваст", disconnected: "Канда",
      connect: "Пайваст кардан", disconnect: "Кандан",
      integrations: {
        quickbooks: "Ҳамоҳангсозии дуҷониба бо QuickBooks Online.",
        xero: "Xero-ро барои реестри ягона пайваст кунед.",
        stripe: "Автоимпорти пардохтҳои Stripe.",
        plaid: "Фидҳои бонкӣ бо Plaid.",
        gusto: "ФОТ шабона ҳамоҳанг мешавад.",
        docusign: "Фиристодани шартномаҳо ва W-9.",
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
  if (!data.demoPreview.accounting) data.demoPreview.accounting = {};
  deepMerge(data.demoPreview.accounting, ADDITIONS[locale]);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n");
  console.log(`updated ${locale}.json (accounting)`);
}
