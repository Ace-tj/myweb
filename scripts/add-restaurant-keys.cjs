const fs = require("fs");
const path = require("path");

const ADDITIONS = {
  en: {
    nav: {
      orders: "Orders",
      customers: "Guests",
      inventory: "Inventory",
      staff: "Staff",
      settings: "Settings",
      groups: { service: "Service", back: "Back of house" },
    },
    breadcrumb: {
      orders: "Service / Orders",
      customers: "Back / Guests",
      inventory: "Back / Inventory",
      staff: "Back / Staff",
      settings: "Back / Settings",
    },
    header: {
      ordersTitle: "Active orders",
      ordersSubtitle: "POS tickets, fired, served, and paid — in one view.",
      customersTitle: "Guest book",
      customersSubtitle: "Lifetime value, recent visits, and loyalty tiers.",
      inventoryTitle: "Inventory",
      inventorySubtitle: "Stock movement, low-stock alerts, and one-tap reorder.",
      staffTitle: "Staff & shifts",
      staffSubtitle: "Today's roster — on shift, incoming, and clocked out.",
      settingsTitle: "Settings",
      settingsSubtitle: "Restaurant basics, taxes, and integrations.",
    },
    screen: {
      orders: { eyebrow: "Live tickets" },
      customers: { eyebrow: "Loyalty" },
      inventory: { eyebrow: "Stock" },
      staff: { eyebrow: "Roster" },
      settings: { eyebrow: "Configuration" },
    },
    kpi: {
      orders: {
        0: { label: "Open tickets", value: "12", trend: "Avg ticket 4 dishes" },
        1: { label: "Revenue (today)", value: "$2,486", trend: "+18% vs last Mon" },
        2: { label: "Comps", value: "$24", trend: "Within budget" },
        3: { label: "Send-out rate", value: "92%", trend: "+3 pp WoW" },
      },
      customers: {
        0: { label: "Active guests", value: "520", trend: "+12% this quarter" },
        1: { label: "New this month", value: "72", trend: "Strong word of mouth" },
        2: { label: "Avg LTV", value: "$540", trend: "+$60 YoY" },
        3: { label: "Repeat in 30d", value: "5×", trend: "Top tier loyalty" },
      },
      inventory: {
        0: { label: "SKUs total", value: "132", trend: "Auto-replenish on" },
        1: { label: "Low stock", value: "4", trend: "Reorder suggested" },
        2: { label: "Critical", value: "1", trend: "Basil — order now" },
        3: { label: "Spend this week", value: "$1,040", trend: "−6% vs last week" },
      },
      staff: {
        0: { label: "On shift now", value: "14", trend: "Coverage healthy" },
        1: { label: "Incoming", value: "8", trend: "Next clock-in 17:00" },
        2: { label: "Punctuality", value: "94%", trend: "Trending up" },
        3: { label: "Open shifts", value: "2", trend: "Need cover Friday" },
      },
      settings: {
        0: { label: "Uptime (30d)", value: "100%", trend: "All green" },
        1: { label: "Integrations", value: "8 active", trend: "+2 this month" },
        2: { label: "Team seats", value: "10 / 15", trend: "Room to grow" },
        3: { label: "API calls (24h)", value: "2.6K", trend: "Within limits" },
      },
    },
    actions: {
      floor: "Seat walk-in",
      kitchen: "Fire next",
      menu: "Add item",
      orders: "New order",
      reservations: "New booking",
      customers: "Add guest",
      inventory: "Add SKU",
      staff: "Schedule shift",
      reports: "Export",
      settings: "Save changes",
    },
    commandPalette: { placeholder: "Jump to a screen…" },
    toast: {
      navigated: "Opened {screen}",
      actionRun: "Action queued",
      firedTo: "Fired to kitchen · {table}",
      messageSent: "Message sent to {name}",
      reordered: "Reorder placed for {sku}",
      settingsSaved: "Settings saved",
      connected: "{name} connected",
      disconnected: "{name} disconnected",
    },
    orders: {
      col: { id: "ID", table: "Table", guest: "Guest", items: "Items", total: "Total", status: "Status" },
      status: { open: "Open", fired: "Fired", served: "Served", paid: "Paid" },
      liveFeed: "Live ticket events",
      feed: {
        paid: "{id} paid",
        fired: "{id} fired to kitchen",
        served: "{id} served",
        opened: "{id} opened",
      },
    },
    customers: {
      col: { guest: "Guest", tier: "Tier", visits: "Visits", ltv: "LTV", last: "Last seen" },
      tiers: { vip: "VIP", regular: "Regular", new: "New", atrisk: "At risk" },
      message: "Message",
    },
    inventory: {
      heatTitle: "Stock movement",
      heatAria: "Inventory movement heatmap",
      heatNote: "Each tile is a day · darker = more units moved.",
      alertsTitle: "Low-stock alerts",
      col: { sku: "SKU", name: "Item", stock: "On hand", reorder: "Reorder at", status: "Status" },
      status: { ok: "Healthy", low: "Low", critical: "Critical" },
      reorder: "Reorder",
      liveFeed: "Live stock movements",
    },
    staff: {
      roles: {
        headChef: "Head chef",
        sousChef: "Sous chef",
        lineChef: "Line cook",
        server: "Server",
        host: "Host",
        bartender: "Bartender",
        dishwasher: "Dishwasher",
      },
      status: { on: "On shift", incoming: "Incoming", ended: "Clocked out" },
      contact: "Message",
    },
    reports: { revenueTrend: "Revenue trend", last30: "Last 30 days" },
    settings: {
      basicsTitle: "Restaurant basics",
      fields: { restaurantName: "Name", currency: "Currency", timezone: "Timezone", contactEmail: "Contact email" },
      placeholders: { restaurantName: "Trattoria Forno", currency: "TJS", timezone: "Asia/Dushanbe", contactEmail: "hello@trattoria.tj" },
      save: "Save changes",
      integrationsTitle: "Integrations",
      connected: "Connected", disconnected: "Disconnected",
      connect: "Connect", disconnect: "Disconnect",
      integrations: {
        stripe: "Card payments at the table — Tap to Pay supported.",
        opentable: "Sync reservations to your floor plan.",
        yandex: "Receive delivery orders from Yandex Eda.",
        glovo: "Enable Glovo deliveries from your kitchen.",
        quickbooks: "Bookkeeping and tax reports sync nightly.",
        twilio: "SMS reservation reminders to guests.",
      },
    },
  },
  ru: {
    nav: {
      orders: "Заказы", customers: "Гости", inventory: "Склад", staff: "Команда", settings: "Настройки",
      groups: { service: "Зал", back: "Бэк-офис" },
    },
    breadcrumb: {
      orders: "Зал / Заказы", customers: "Бэк / Гости", inventory: "Бэк / Склад",
      staff: "Бэк / Команда", settings: "Бэк / Настройки",
    },
    header: {
      ordersTitle: "Активные заказы",
      ordersSubtitle: "Чеки POS, отправленные, поданные и оплаченные — в одном виде.",
      customersTitle: "Книга гостей",
      customersSubtitle: "LTV, недавние визиты и уровни лояльности.",
      inventoryTitle: "Склад",
      inventorySubtitle: "Движение запасов, оповещения и заказ в один клик.",
      staffTitle: "Команда и смены",
      staffSubtitle: "Сегодняшний график — на смене, прибывающие и ушедшие.",
      settingsTitle: "Настройки",
      settingsSubtitle: "Основные данные ресторана, налоги и интеграции.",
    },
    screen: {
      orders: { eyebrow: "Активные чеки" },
      customers: { eyebrow: "Лояльность" },
      inventory: { eyebrow: "Запасы" },
      staff: { eyebrow: "График" },
      settings: { eyebrow: "Конфигурация" },
    },
    kpi: {
      orders: {
        0: { label: "Открытых чеков", value: "12", trend: "В среднем 4 блюда" },
        1: { label: "Выручка (сегодня)", value: "$2 486", trend: "+18% к прошлому пн" },
        2: { label: "Компенсации", value: "$24", trend: "В рамках бюджета" },
        3: { label: "Выдача", value: "92%", trend: "+3 п.п. WoW" },
      },
      customers: {
        0: { label: "Активные гости", value: "520", trend: "+12% за квартал" },
        1: { label: "Новые за месяц", value: "72", trend: "Сильное сарафанное радио" },
        2: { label: "Средний LTV", value: "$540", trend: "+$60 YoY" },
        3: { label: "Повторно за 30д", value: "5×", trend: "Высокая лояльность" },
      },
      inventory: {
        0: { label: "Всего SKU", value: "132", trend: "Авто-пополнение" },
        1: { label: "Низкий остаток", value: "4", trend: "Нужен заказ" },
        2: { label: "Критично", value: "1", trend: "Базилик — срочно" },
        3: { label: "Расход за неделю", value: "$1 040", trend: "−6% к неделе" },
      },
      staff: {
        0: { label: "На смене сейчас", value: "14", trend: "Покрытие хорошее" },
        1: { label: "Прибывают", value: "8", trend: "Следующий в 17:00" },
        2: { label: "Пунктуальность", value: "94%", trend: "Растёт" },
        3: { label: "Открытых смен", value: "2", trend: "Пятница не закрыта" },
      },
      settings: {
        0: { label: "Аптайм (30д)", value: "100%", trend: "Всё в порядке" },
        1: { label: "Интеграций", value: "8 активных", trend: "+2 за месяц" },
        2: { label: "Места команды", value: "10 / 15", trend: "Есть резерв" },
        3: { label: "API за 24ч", value: "2,6K", trend: "В пределах" },
      },
    },
    actions: {
      floor: "Усадить гостей", kitchen: "Запустить", menu: "Добавить", orders: "Новый заказ",
      reservations: "Новая бронь", customers: "Добавить гостя", inventory: "Новый SKU",
      staff: "Назначить смену", reports: "Экспорт", settings: "Сохранить",
    },
    commandPalette: { placeholder: "Перейти к экрану…" },
    toast: {
      navigated: "Открыт {screen}",
      actionRun: "Действие в очереди",
      firedTo: "Запущено на кухню · {table}",
      messageSent: "Сообщение отправлено {name}",
      reordered: "Заказ оформлен для {sku}",
      settingsSaved: "Настройки сохранены",
      connected: "{name} подключён",
      disconnected: "{name} отключён",
    },
    orders: {
      col: { id: "ID", table: "Стол", guest: "Гость", items: "Блюд", total: "Сумма", status: "Статус" },
      status: { open: "Открыт", fired: "Запущен", served: "Подан", paid: "Оплачен" },
      liveFeed: "События в реальном времени",
      feed: { paid: "{id} оплачен", fired: "{id} запущен", served: "{id} подан", opened: "{id} открыт" },
    },
    customers: {
      col: { guest: "Гость", tier: "Уровень", visits: "Визитов", ltv: "LTV", last: "Был" },
      tiers: { vip: "VIP", regular: "Постоянный", new: "Новый", atrisk: "В риске" },
      message: "Написать",
    },
    inventory: {
      heatTitle: "Движение запасов",
      heatAria: "Тепловая карта движения склада",
      heatNote: "Клетка — день · ярче = больше движения.",
      alertsTitle: "Оповещения о низком остатке",
      col: { sku: "SKU", name: "Позиция", stock: "Остаток", reorder: "Точка заказа", status: "Статус" },
      status: { ok: "Норма", low: "Низкий", critical: "Критично" },
      reorder: "Заказать",
      liveFeed: "Движения в реальном времени",
    },
    staff: {
      roles: {
        headChef: "Шеф-повар", sousChef: "Су-шеф", lineChef: "Повар линии",
        server: "Официант", host: "Хост", bartender: "Бармен", dishwasher: "Посудомойщик",
      },
      status: { on: "На смене", incoming: "Прибывает", ended: "Ушёл" },
      contact: "Написать",
    },
    reports: { revenueTrend: "Тренд выручки", last30: "Последние 30 дней" },
    settings: {
      basicsTitle: "Основные данные",
      fields: { restaurantName: "Название", currency: "Валюта", timezone: "Часовой пояс", contactEmail: "Email" },
      placeholders: { restaurantName: "Trattoria Forno", currency: "TJS", timezone: "Asia/Dushanbe", contactEmail: "hello@trattoria.tj" },
      save: "Сохранить",
      integrationsTitle: "Интеграции",
      connected: "Подключено", disconnected: "Отключено",
      connect: "Подключить", disconnect: "Отключить",
      integrations: {
        stripe: "Оплата у стола — Tap to Pay.",
        opentable: "Синхронизация бронирований с залом.",
        yandex: "Принимайте доставки от Яндекс Еда.",
        glovo: "Активируйте доставки Glovo с кухни.",
        quickbooks: "Бухгалтерия и налоги ночью.",
        twilio: "SMS-напоминания гостям.",
      },
    },
  },
  tg: {
    nav: {
      orders: "Фармоишҳо", customers: "Меҳмонон", inventory: "Анбор", staff: "Гурӯҳ", settings: "Танзимот",
      groups: { service: "Толор", back: "Бэк-офис" },
    },
    breadcrumb: {
      orders: "Толор / Фармоишҳо", customers: "Бэк / Меҳмонон", inventory: "Бэк / Анбор",
      staff: "Бэк / Гурӯҳ", settings: "Бэк / Танзимот",
    },
    header: {
      ordersTitle: "Фармоишҳои фаъол",
      ordersSubtitle: "Чекҳои POS — фиристода, хизмат, пардохт — дар як ҷой.",
      customersTitle: "Дафтари меҳмонон",
      customersSubtitle: "LTV, ташрифоти охирин ва дараҷаҳои вафодорӣ.",
      inventoryTitle: "Анбор",
      inventorySubtitle: "Ҳаракати захира, ҳушдорҳо ва фармоиш бо як зер.",
      staffTitle: "Гурӯҳ ва смена",
      staffSubtitle: "Графики имрӯза — дар смена, омадан ва баромадан.",
      settingsTitle: "Танзимот",
      settingsSubtitle: "Маълумоти асосии тарабхона, андоз ва интегратсияҳо.",
    },
    screen: {
      orders: { eyebrow: "Чекҳои зинда" },
      customers: { eyebrow: "Вафодорӣ" },
      inventory: { eyebrow: "Захира" },
      staff: { eyebrow: "График" },
      settings: { eyebrow: "Танзим" },
    },
    kpi: {
      orders: {
        0: { label: "Чекҳои кушод", value: "12", trend: "Миёна 4 хӯрок" },
        1: { label: "Даромад (имрӯз)", value: "$2 486", trend: "+18% нисбати д.ш." },
        2: { label: "Тахфифҳо", value: "$24", trend: "Дар буҷет" },
        3: { label: "Сурогат", value: "92%", trend: "+3 п.п. WoW" },
      },
      customers: {
        0: { label: "Меҳмонони фаъол", value: "520", trend: "+12% дар чоряк" },
        1: { label: "Нав дар моҳ", value: "72", trend: "Аз даҳон ба даҳон" },
        2: { label: "LTV миёна", value: "$540", trend: "+$60 YoY" },
        3: { label: "Такрор дар 30 рӯз", value: "5×", trend: "Вафодории баланд" },
      },
      inventory: {
        0: { label: "Ҳамаи SKU", value: "132", trend: "Худпуркунӣ" },
        1: { label: "Захираи паст", value: "4", trend: "Фармоиш зарур" },
        2: { label: "Зарурӣ", value: "1", trend: "Райхон — фавран" },
        3: { label: "Хароҷот дар ҳафта", value: "$1 040", trend: "−6%" },
      },
      staff: {
        0: { label: "Ҳозир дар смена", value: "14", trend: "Пӯшиш хуб" },
        1: { label: "Меоянд", value: "8", trend: "Дар 17:00" },
        2: { label: "Пунктуалӣ", value: "94%", trend: "Меафзояд" },
        3: { label: "Сменаҳои кушод", value: "2", trend: "Ҷумъа кушод" },
      },
      settings: {
        0: { label: "Аптайм (30 рӯз)", value: "100%", trend: "Ҳама хуб" },
        1: { label: "Интегратсияҳо", value: "8 фаъол", trend: "+2 дар моҳ" },
        2: { label: "Ҷойҳои даста", value: "10 / 15", trend: "Ҷой ҳаст" },
        3: { label: "API дар 24с", value: "2,6K", trend: "Дар ҳудуд" },
      },
    },
    actions: {
      floor: "Нишондан", kitchen: "Сар кардан", menu: "Илова", orders: "Фармоиши нав",
      reservations: "Брони нав", customers: "Меҳмони нав", inventory: "SKU-и нав",
      staff: "Сменаро таъин", reports: "Содирот", settings: "Нигоҳ доштан",
    },
    commandPalette: { placeholder: "Ба экран гузаштан…" },
    toast: {
      navigated: "{screen} кушода шуд",
      actionRun: "Амал дар навбат",
      firedTo: "Ба ошпазхона фиристода шуд · {table}",
      messageSent: "Паём ба {name} фиристода шуд",
      reordered: "Фармоиш барои {sku} гузошта шуд",
      settingsSaved: "Танзимот нигоҳ дошта шуд",
      connected: "{name} пайваст",
      disconnected: "{name} канда",
    },
    orders: {
      col: { id: "ID", table: "Миз", guest: "Меҳмон", items: "Хӯрок", total: "Маблағ", status: "Ҳолат" },
      status: { open: "Кушод", fired: "Сар", served: "Хизмат", paid: "Пардохт" },
      liveFeed: "Воқеаҳои зинда",
      feed: { paid: "{id} пардохт шуд", fired: "{id} сар шуд", served: "{id} хизмат шуд", opened: "{id} кушода шуд" },
    },
    customers: {
      col: { guest: "Меҳмон", tier: "Дараҷа", visits: "Ташриф", ltv: "LTV", last: "Охирин" },
      tiers: { vip: "VIP", regular: "Доимӣ", new: "Нав", atrisk: "Дар хатар" },
      message: "Паём",
    },
    inventory: {
      heatTitle: "Ҳаракати захира",
      heatAria: "Харитаи гармии ҳаракат",
      heatNote: "Кулча — рӯз · равшанӣ = ҳаракати бештар.",
      alertsTitle: "Ҳушдорҳои захираи кам",
      col: { sku: "SKU", name: "Маҳсулот", stock: "Дар ҳозира", reorder: "Нуқтаи фармоиш", status: "Ҳолат" },
      status: { ok: "Меъёр", low: "Кам", critical: "Зарурӣ" },
      reorder: "Фармоиш",
      liveFeed: "Ҳаракатҳои зинда",
    },
    staff: {
      roles: {
        headChef: "Сарошпаз", sousChef: "Су-шеф", lineChef: "Ошпази хат",
        server: "Хидматрасон", host: "Хост", bartender: "Бармен", dishwasher: "Зарфшӯй",
      },
      status: { on: "Дар смена", incoming: "Меояд", ended: "Баромад" },
      contact: "Паём",
    },
    reports: { revenueTrend: "Тренди даромад", last30: "30 рӯзи охирин" },
    settings: {
      basicsTitle: "Маълумоти асосӣ",
      fields: { restaurantName: "Ном", currency: "Асъор", timezone: "Минтақаи вақт", contactEmail: "Email" },
      placeholders: { restaurantName: "Trattoria Forno", currency: "TJS", timezone: "Asia/Dushanbe", contactEmail: "hello@trattoria.tj" },
      save: "Нигоҳ доштан",
      integrationsTitle: "Интегратсияҳо",
      connected: "Пайваст", disconnected: "Канда",
      connect: "Пайваст кардан", disconnect: "Кандан",
      integrations: {
        stripe: "Пардохт дар миз — Tap to Pay.",
        opentable: "Брунҳо бо нақшаи толор ҳамоҳанг мешаванд.",
        yandex: "Фармоишҳои расондан аз Яндекс Еда.",
        glovo: "Расондан тавассути Glovo.",
        quickbooks: "Ҳисобдорӣ ва андоз шабона.",
        twilio: "SMS-ёдоварӣ ба меҳмонон.",
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
  if (!data.demoPreview) data.demoPreview = {};
  if (!data.demoPreview.restaurant) data.demoPreview.restaurant = {};
  deepMerge(data.demoPreview.restaurant, ADDITIONS[locale]);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n");
  console.log(`updated ${locale}.json (restaurant)`);
}
