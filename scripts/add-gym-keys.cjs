const fs = require("fs");
const path = require("path");

const ADDITIONS = {
  en: {
    nav: {
      schedule: "Schedule", billing: "Billing", equipment: "Equipment",
      leads: "Leads", analytics: "Analytics", settings: "Settings",
      groups: { people: "People", ops: "Operations" },
    },
    shell: {
      breadcrumb: {
        schedule: "Operations / Schedule", billing: "Operations / Billing",
        equipment: "Operations / Equipment", leads: "People / Leads",
        analytics: "Operations / Analytics", settings: "Operations / Settings",
      },
      screen: {
        schedule: { eyebrow: "Capacity" },
        billing: { eyebrow: "Revenue" },
        equipment: { eyebrow: "Inventory" },
        leads: { eyebrow: "Pipeline" },
        analytics: { eyebrow: "Performance" },
        settings: { eyebrow: "Configuration" },
      },
    },
    commandPalette: { placeholder: "Jump to a screen…" },
    toast: {
      navigated: "Opened {screen}",
      settingsSaved: "Settings saved",
      connected: "{name} connected",
      disconnected: "{name} disconnected",
    },
    schedule: {
      title: "Weekly schedule",
      subtitle: "Heatmap of class fill and PT slots across the week.",
      heatmapLabel: "14-week capacity",
      heatmapNote: "Darker tiles = higher fill rate.",
    },
    billing: {
      title: "Subscriptions",
      subtitle: "Active plans, next charges, and failed payments.",
      col: { member: "Member", plan: "Plan", mrr: "MRR", next: "Next charge", status: "Status" },
      status: { paid: "Paid", due: "Due", failed: "Failed" },
    },
    equipment: {
      title: "Equipment",
      subtitle: "Live status of treadmills, rowers, bikes, and racks.",
      status: { online: "Online", service: "Service", offline: "Offline" },
      liveFeed: "Live equipment events",
    },
    leads: {
      title: "Lead pipeline",
      subtitle: "New, tour booked, trial, and closed-won.",
      stages: { new: "New", tour: "Tour booked", trial: "On trial", closed: "Closed won" },
    },
    analytics: {
      title: "Performance",
      subtitle: "MRR trend, retention cohort, and live events.",
      mrrTitle: "MRR (last 30 days)",
      last30: "Last 30 days",
      liveFeed: "Live activity",
      cohortTitle: "Retention cohort",
      cohortNote: "Percent of members still active in week N after signup.",
    },
    settings: {
      title: "Settings",
      subtitle: "Gym basics, billing, and integrations.",
      basics: "Gym basics",
      fields: { gymName: "Gym name", currency: "Currency", openHours: "Open hours", contact: "Contact" },
      placeholders: { gymName: "Forge Athletic Club", currency: "USD", openHours: "06:00 — 23:00", contact: "hello@forge.gym" },
      save: "Save changes",
      integrationsTitle: "Integrations",
      connected: "Connected", disconnected: "Disconnected",
      connect: "Connect", disconnect: "Disconnect",
      integrations: {
        stripe: "Charge memberships and one-off PT sessions.",
        mindbody: "Sync classes and bookings with MindBody.",
        mailchimp: "Win-back campaigns for at-risk members.",
        slack: "Get a ping in #ops for new signups and cancellations.",
        quickbooks: "Bookkeeping sync nightly.",
        twilio: "Class reminders and overdue payment SMS.",
      },
    },
  },
  ru: {
    nav: {
      schedule: "График", billing: "Биллинг", equipment: "Оборудование",
      leads: "Лиды", analytics: "Аналитика", settings: "Настройки",
      groups: { people: "Люди", ops: "Операции" },
    },
    shell: {
      breadcrumb: {
        schedule: "Операции / График", billing: "Операции / Биллинг",
        equipment: "Операции / Оборудование", leads: "Люди / Лиды",
        analytics: "Операции / Аналитика", settings: "Операции / Настройки",
      },
      screen: {
        schedule: { eyebrow: "Загрузка" },
        billing: { eyebrow: "Доход" },
        equipment: { eyebrow: "Инвентарь" },
        leads: { eyebrow: "Воронка" },
        analytics: { eyebrow: "Показатели" },
        settings: { eyebrow: "Конфигурация" },
      },
    },
    commandPalette: { placeholder: "Перейти к экрану…" },
    toast: {
      navigated: "Открыт {screen}",
      settingsSaved: "Настройки сохранены",
      connected: "{name} подключён",
      disconnected: "{name} отключён",
    },
    schedule: {
      title: "Недельный график",
      subtitle: "Тепловая карта заполняемости занятий и PT-слотов.",
      heatmapLabel: "Загрузка за 14 недель",
      heatmapNote: "Тёмные клетки — выше заполняемость.",
    },
    billing: {
      title: "Подписки",
      subtitle: "Активные тарифы, следующие списания и сбои оплат.",
      col: { member: "Участник", plan: "План", mrr: "MRR", next: "След. оплата", status: "Статус" },
      status: { paid: "Оплачено", due: "К оплате", failed: "Сбой" },
    },
    equipment: {
      title: "Оборудование",
      subtitle: "Статус беговых, гребных, велосипедов и рам.",
      status: { online: "Онлайн", service: "Обслуж.", offline: "Офлайн" },
      liveFeed: "События оборудования",
    },
    leads: {
      title: "Воронка лидов",
      subtitle: "Новые, на туре, на пробном, закрытые.",
      stages: { new: "Новые", tour: "На туре", trial: "Пробный", closed: "Закрытые" },
    },
    analytics: {
      title: "Показатели",
      subtitle: "Тренд MRR, когорта удержания и события в реальном времени.",
      mrrTitle: "MRR (последние 30 дней)",
      last30: "Последние 30 дней",
      liveFeed: "Лента событий",
      cohortTitle: "Когорта удержания",
      cohortNote: "Процент участников, активных в неделю N после регистрации.",
    },
    settings: {
      title: "Настройки",
      subtitle: "Основные данные зала, биллинг и интеграции.",
      basics: "Основные данные",
      fields: { gymName: "Название", currency: "Валюта", openHours: "Часы работы", contact: "Контакт" },
      placeholders: { gymName: "Forge Athletic Club", currency: "USD", openHours: "06:00 — 23:00", contact: "hello@forge.gym" },
      save: "Сохранить",
      integrationsTitle: "Интеграции",
      connected: "Подключено", disconnected: "Отключено",
      connect: "Подключить", disconnect: "Отключить",
      integrations: {
        stripe: "Списания за абонементы и разовые PT-сессии.",
        mindbody: "Синхронизация занятий и записей с MindBody.",
        mailchimp: "Кампании возврата для уходящих участников.",
        slack: "Пинги в #ops для новых записей и отмен.",
        quickbooks: "Бухгалтерия по ночам.",
        twilio: "SMS напоминания о занятиях и долгах.",
      },
    },
  },
  tg: {
    nav: {
      schedule: "График", billing: "Биллинг", equipment: "Таҷҳизот",
      leads: "Лидҳо", analytics: "Аналитика", settings: "Танзимот",
      groups: { people: "Одамон", ops: "Амалиёт" },
    },
    shell: {
      breadcrumb: {
        schedule: "Амалиёт / График", billing: "Амалиёт / Биллинг",
        equipment: "Амалиёт / Таҷҳизот", leads: "Одамон / Лидҳо",
        analytics: "Амалиёт / Аналитика", settings: "Амалиёт / Танзимот",
      },
      screen: {
        schedule: { eyebrow: "Пуркунӣ" },
        billing: { eyebrow: "Даромад" },
        equipment: { eyebrow: "Захира" },
        leads: { eyebrow: "Воронка" },
        analytics: { eyebrow: "Натиҷаҳо" },
        settings: { eyebrow: "Танзим" },
      },
    },
    commandPalette: { placeholder: "Ба экран гузаштан…" },
    toast: {
      navigated: "{screen} кушода шуд",
      settingsSaved: "Танзимот нигоҳ дошта шуд",
      connected: "{name} пайваст",
      disconnected: "{name} канда",
    },
    schedule: {
      title: "Графики ҳафта",
      subtitle: "Харитаи гармии пуркунии машғулиятҳо ва ҷойҳои PT.",
      heatmapLabel: "Пуркунӣ дар 14 ҳафта",
      heatmapNote: "Кулчаҳои сиёҳ — пуркунӣ баландтар.",
    },
    billing: {
      title: "Обуна",
      subtitle: "Нақшаҳои фаъол, пардохтҳои оянда ва нокомиҳо.",
      col: { member: "Аъзо", plan: "Нақша", mrr: "MRR", next: "Пардохти оянда", status: "Ҳолат" },
      status: { paid: "Пардохт", due: "Қарздор", failed: "Нокомӣ" },
    },
    equipment: {
      title: "Таҷҳизот",
      subtitle: "Ҳолати треадмилл, гребниҳо, велосипедҳо ва раҳмат.",
      status: { online: "Онлайн", service: "Хидмат", offline: "Офлайн" },
      liveFeed: "Воқеаҳои таҷҳизот",
    },
    leads: {
      title: "Воронка лидҳо",
      subtitle: "Нав, дар тур, дар тестӣ, пӯшида.",
      stages: { new: "Нав", tour: "Дар тур", trial: "Тестӣ", closed: "Пӯшида" },
    },
    analytics: {
      title: "Натиҷаҳо",
      subtitle: "Тренди MRR, когортаи нигоҳдорӣ ва воқеаҳои зинда.",
      mrrTitle: "MRR (30 рӯзи охирин)",
      last30: "30 рӯзи охирин",
      liveFeed: "Лентаи воқеаҳо",
      cohortTitle: "Когортаи нигоҳдорӣ",
      cohortNote: "Фоизи аъзоёне, ки дар ҳафтаи N баъд аз сабт фаъоланд.",
    },
    settings: {
      title: "Танзимот",
      subtitle: "Маълумоти асосии гим, биллинг ва интегратсияҳо.",
      basics: "Маълумоти асосӣ",
      fields: { gymName: "Ном", currency: "Асъор", openHours: "Соатҳои корӣ", contact: "Тамос" },
      placeholders: { gymName: "Forge Athletic Club", currency: "USD", openHours: "06:00 — 23:00", contact: "hello@forge.gym" },
      save: "Нигоҳ доштан",
      integrationsTitle: "Интегратсияҳо",
      connected: "Пайваст", disconnected: "Канда",
      connect: "Пайваст кардан", disconnect: "Кандан",
      integrations: {
        stripe: "Гирифтан барои абонемент ва PT.",
        mindbody: "Ҳамоҳангсозӣ бо MindBody.",
        mailchimp: "Бозгардондани аъзоёни хоҳида.",
        slack: "Огоҳнома дар #ops.",
        quickbooks: "Ҳисобдории шабона.",
        twilio: "SMS-ёдоварӣ ва қарзҳо.",
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
  if (!data.demoPreview.gym) data.demoPreview.gym = {};
  deepMerge(data.demoPreview.gym, ADDITIONS[locale]);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n");
  console.log(`updated ${locale}.json (gym)`);
}
