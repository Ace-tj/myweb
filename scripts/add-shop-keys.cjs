/* Adds new translation keys for the expanded shop demo into en/ru/tg JSON. */
const fs = require("fs");
const path = require("path");

const ADDITIONS = {
  en: {
    tabs: {
      checkout: "Checkout",
      customers: "Customers",
      analytics: "Analytics",
      inventory: "Inventory",
      promotions: "Promotions",
      settings: "Settings",
    },
    nav: {
      groups: { storefront: "Storefront", admin: "Admin" },
    },
    commandPalette: { placeholder: "Search or jump to…" },
    toast: {
      navigated: "Opened {screen}",
      viewingProduct: "Loading product…",
      savedToWishlist: "Saved {name} to wishlist",
      added: "{name} added to cart",
      paymentCaptured: "Payment captured",
      reorderPlaced: "Reorder placed for {sku}",
      promotionScheduled: "{code} is scheduled",
      settingsSaved: "Settings saved",
      connected: "{name} connected",
      disconnected: "{name} disconnected",
      messageSent: "Message sent to {name}",
    },
    shell: {
      breadcrumb: {
        checkout: "Storefront / Checkout",
        customers: "Admin / Customers",
        analytics: "Admin / Analytics",
        inventory: "Admin / Inventory",
        promotions: "Admin / Promotions",
        settings: "Admin / Settings",
      },
      screen: {
        checkout: { eyebrow: "Step-by-step", title: "Checkout", subtitle: "Address, payment, and review — all in one flow." },
        customers: { eyebrow: "People", title: "Customers", subtitle: "Segmented list with lifetime value, activity, and outreach." },
        analytics: { eyebrow: "Performance", title: "Analytics", subtitle: "Revenue trends, retention cohorts, and live activity." },
        inventory: { eyebrow: "Stock", title: "Inventory", subtitle: "Stock heatmap, low-stock alerts, and reorder actions." },
        promotions: { eyebrow: "Campaigns", title: "Promotions", subtitle: "Build coupons with live preview and track redemptions." },
        settings: { eyebrow: "Configuration", title: "Settings", subtitle: "Store basics, taxes, and third-party integrations." },
      },
      kpi: {
        checkout: {
          avgCheckoutTime: { label: "Avg checkout time", value: "2:12", trend: "Down 18s vs last week" },
          successRate: { label: "Success rate", value: "95.2%", trend: "+2.1 pp this month" },
          dropoffStep: { label: "Top drop-off", value: "Payment", trend: "12% abandoned at step 2" },
          applePayShare: { label: "Apple Pay share", value: "52%", trend: "+24 pp YoY" },
        },
        customers: {
          totalActive: { label: "Active customers", value: "4,820", trend: "+12% this quarter" },
          newThisMonth: { label: "New this month", value: "486", trend: "Best month of the year" },
          avgLtv: { label: "Avg LTV", value: "$362", trend: "+$28 vs last quarter" },
          churn: { label: "Churn", value: "4.1%", trend: "Down 0.6 pp" },
        },
        analytics: {
          revenue30d: { label: "Revenue (30d)", value: "$148.2K", trend: "+34% vs prior period" },
          orders30d: { label: "Orders (30d)", value: "1,184", trend: "+22% MoM" },
          conversion: { label: "Conversion", value: "3.6%", trend: "+0.4 pp" },
          repeatRate: { label: "Repeat rate", value: "46%", trend: "+8 pp YoY" },
        },
        inventory: {
          skusTotal: { label: "SKUs total", value: "240", trend: "+12 since April" },
          unitsOnHand: { label: "Units on hand", value: "11,240", trend: "Auto-replenish on" },
          lowStock: { label: "Low stock", value: "8", trend: "Reorder suggested" },
          deadStock: { label: "Dead stock", value: "11", trend: "Down 7 this month" },
        },
        promotions: {
          activeCampaigns: { label: "Active campaigns", value: "7", trend: "2 ending this week" },
          couponsUsed: { label: "Coupons used", value: "1,420", trend: "+38% WoW" },
          discountSpend: { label: "Discount spend", value: "$1,820", trend: "Within budget" },
          roi: { label: "Campaign ROI", value: "320%", trend: "Trending up" },
        },
        settings: {
          uptime: { label: "Uptime (30d)", value: "99.98%", trend: "All systems green" },
          integrations: { label: "Integrations", value: "8 active", trend: "+2 this month" },
          teamSeats: { label: "Team seats", value: "6 / 10", trend: "Room to grow" },
          apiCalls: { label: "API calls (24h)", value: "2.6K", trend: "Within limits" },
        },
      },
    },
    checkout: {
      steps: { shipping: "Shipping", payment: "Payment", review: "Review", done: "Done" },
      fields: {
        fullName: "Full name", email: "Email", address: "Address", city: "City", postalCode: "Postal code",
        cardNumber: "Card number", cardName: "Name on card", cardExpiry: "Expiry", cardCvc: "CVC",
      },
      placeholders: {
        fullName: "Aigerim Yusupova", email: "you@example.com",
        address: "17 Rudaki Ave", city: "Dushanbe", postalCode: "734001",
        cardNumber: "4242 4242 4242 4242", cardName: "AIGERIM Y", cardExpiry: "08 / 28", cardCvc: "123",
      },
      methods: { card: "Card", applePay: "Apple Pay", paypal: "PayPal", klarna: "Klarna" },
      back: "Back", next: "Next", placeOrder: "Place order", startAnother: "Start another",
      reviewTitle: "Review and confirm", shipTo: "Ship to", payWith: "Pay with", payerNote: "Charged on confirmation",
      successTitle: "Order placed", successSubtitle: "Order {id} is on its way",
      estDelivery: "Estimated delivery", tax: "Tax", fastPickHint: "Free same-day pickup at Dushanbe HQ", summaryTitle: "Order summary",
    },
    customers: {
      segments: { all: "All", vip: "VIP", active: "Active", new: "New", atrisk: "At risk" },
      col: { customer: "Customer", segment: "Segment", orders: "Orders", ltv: "LTV", activity: "Activity", last: "Last seen" },
      message: "Message",
    },
    analytics: {
      revenueTitle: "Revenue", last30: "Last 30 days", liveFeed: "Live activity",
      cohortTitle: "Retention cohort", cohortNote: "Percent of customers who returned in week N after first order.",
      heatmapTitle: "Orders by day", heatmapAria: "Orders heatmap", heatmapNote: "Darker tiles indicate higher order volume.",
    },
    inventory: {
      heatTitle: "Stock movement", heatAria: "Stock movement heatmap",
      heatNote: "Each tile is a day · color intensity = units shifted.",
      liveFeed: "Live stock movements", alertsTitle: "Low-stock alerts",
      col: { sku: "SKU", product: "Product", stock: "On hand", reorder: "Reorder at", status: "Status" },
      status: { ok: "Healthy", low: "Low", critical: "Critical" },
      reorder: "Reorder",
    },
    promotions: {
      builderTitle: "Coupon builder",
      fields: { code: "Code", percent: "Discount", starts: "Starts", ends: "Ends" },
      schedule: "Schedule campaign", previewLabel: "Live preview",
      exampleCart: "Example cart", afterDiscount: "After discount",
      campaignsTitle: "Active campaigns",
      col: { id: "ID", name: "Name", redemptions: "Uses", spend: "Spend", status: "Status" },
      status: { active: "Active", scheduled: "Scheduled", ended: "Ended" },
    },
    settings: {
      storeBasics: "Store basics",
      fields: { storeName: "Store name", currency: "Currency", timezone: "Timezone", contactEmail: "Contact email" },
      placeholders: { storeName: "Maison & Moss", currency: "USD", timezone: "Asia/Dushanbe", contactEmail: "hello@maisonmoss.co" },
      save: "Save changes",
      integrationsTitle: "Integrations",
      integrationsCount: "{count} of {total} connected",
      connected: "Connected", disconnected: "Disconnected", connect: "Connect", disconnect: "Disconnect",
      integrations: {
        stripe: "Capture payments globally — Visa, Mastercard, Apple Pay.",
        shopify: "Sync orders and inventory with your storefront.",
        mailchimp: "Send broadcasts and recover abandoned carts.",
        klaviyo: "Behavior-driven email and SMS flows.",
        slack: "Get a ping in #orders for each new order.",
        ga: "Track customer journeys and traffic sources.",
      },
    },
  },
  ru: {
    tabs: { checkout: "Оплата", customers: "Клиенты", analytics: "Аналитика", inventory: "Склад", promotions: "Акции", settings: "Настройки" },
    nav: { groups: { storefront: "Витрина", admin: "Админ" } },
    commandPalette: { placeholder: "Найти или перейти…" },
    toast: {
      navigated: "Открыт {screen}",
      viewingProduct: "Загрузка товара…",
      savedToWishlist: "{name} в избранном",
      added: "{name} в корзине",
      paymentCaptured: "Платёж принят",
      reorderPlaced: "Пополнение для {sku} оформлено",
      promotionScheduled: "{code} запланирован",
      settingsSaved: "Настройки сохранены",
      connected: "{name} подключён",
      disconnected: "{name} отключён",
      messageSent: "Сообщение отправлено {name}",
    },
    shell: {
      breadcrumb: {
        checkout: "Витрина / Оплата",
        customers: "Админ / Клиенты",
        analytics: "Админ / Аналитика",
        inventory: "Админ / Склад",
        promotions: "Админ / Акции",
        settings: "Админ / Настройки",
      },
      screen: {
        checkout: { eyebrow: "Шаг за шагом", title: "Оформление заказа", subtitle: "Адрес, оплата и подтверждение — в одном потоке." },
        customers: { eyebrow: "Люди", title: "Клиенты", subtitle: "Сегменты с LTV, активностью и связью." },
        analytics: { eyebrow: "Показатели", title: "Аналитика", subtitle: "Доход, удержание и события в реальном времени." },
        inventory: { eyebrow: "Запасы", title: "Склад", subtitle: "Тепловая карта, оповещения и заказы поставщикам." },
        promotions: { eyebrow: "Кампании", title: "Акции", subtitle: "Создавайте купоны с превью и отслеживайте использование." },
        settings: { eyebrow: "Настройка", title: "Настройки", subtitle: "Основные данные, налоги и интеграции." },
      },
      kpi: {
        checkout: {
          avgCheckoutTime: { label: "Среднее время оплаты", value: "2:12", trend: "−18с против недели" },
          successRate: { label: "Успех оплат", value: "95,2%", trend: "+2,1 п.п. за месяц" },
          dropoffStep: { label: "Точка ухода", value: "Оплата", trend: "12% уходят на шаге 2" },
          applePayShare: { label: "Доля Apple Pay", value: "52%", trend: "+24 п.п. YoY" },
        },
        customers: {
          totalActive: { label: "Активные клиенты", value: "4 820", trend: "+12% за квартал" },
          newThisMonth: { label: "Новых за месяц", value: "486", trend: "Рекорд года" },
          avgLtv: { label: "Средний LTV", value: "$362", trend: "+$28 к прошлому кв." },
          churn: { label: "Отток", value: "4,1%", trend: "−0,6 п.п." },
        },
        analytics: {
          revenue30d: { label: "Доход (30д)", value: "$148,2K", trend: "+34% к периоду" },
          orders30d: { label: "Заказов (30д)", value: "1 184", trend: "+22% MoM" },
          conversion: { label: "Конверсия", value: "3,6%", trend: "+0,4 п.п." },
          repeatRate: { label: "Повторные", value: "46%", trend: "+8 п.п. YoY" },
        },
        inventory: {
          skusTotal: { label: "Всего SKU", value: "240", trend: "+12 с апреля" },
          unitsOnHand: { label: "Единиц в наличии", value: "11 240", trend: "Авто-пополнение" },
          lowStock: { label: "Мало остатков", value: "8", trend: "Нужен заказ" },
          deadStock: { label: "Мертвый сток", value: "11", trend: "−7 за месяц" },
        },
        promotions: {
          activeCampaigns: { label: "Активных кампаний", value: "7", trend: "2 завершаются" },
          couponsUsed: { label: "Куполов использовано", value: "1 420", trend: "+38% WoW" },
          discountSpend: { label: "Расход на скидки", value: "$1 820", trend: "В рамках бюджета" },
          roi: { label: "ROI кампаний", value: "320%", trend: "Растёт" },
        },
        settings: {
          uptime: { label: "Аптайм (30д)", value: "99,98%", trend: "Всё работает" },
          integrations: { label: "Интеграций", value: "8 активных", trend: "+2 за месяц" },
          teamSeats: { label: "Места команды", value: "6 / 10", trend: "Есть резерв" },
          apiCalls: { label: "API за 24ч", value: "2,6K", trend: "В пределах лимита" },
        },
      },
    },
    checkout: {
      steps: { shipping: "Доставка", payment: "Оплата", review: "Проверка", done: "Готово" },
      fields: {
        fullName: "Имя и фамилия", email: "Email", address: "Адрес", city: "Город", postalCode: "Индекс",
        cardNumber: "Номер карты", cardName: "Имя на карте", cardExpiry: "Срок", cardCvc: "CVC",
      },
      placeholders: {
        fullName: "Айгерим Юсупова", email: "you@example.com",
        address: "пр. Рудаки 17", city: "Душанбе", postalCode: "734001",
        cardNumber: "4242 4242 4242 4242", cardName: "AIGERIM Y", cardExpiry: "08 / 28", cardCvc: "123",
      },
      methods: { card: "Карта", applePay: "Apple Pay", paypal: "PayPal", klarna: "Klarna" },
      back: "Назад", next: "Далее", placeOrder: "Оформить заказ", startAnother: "Новый заказ",
      reviewTitle: "Проверьте и подтвердите", shipTo: "Доставка", payWith: "Оплата", payerNote: "Списание при подтверждении",
      successTitle: "Заказ оформлен", successSubtitle: "Заказ {id} в пути",
      estDelivery: "Дата доставки", tax: "Налог", fastPickHint: "Бесплатный самовывоз из офиса в Душанбе", summaryTitle: "Сводка заказа",
    },
    customers: {
      segments: { all: "Все", vip: "VIP", active: "Активные", new: "Новые", atrisk: "В риске" },
      col: { customer: "Клиент", segment: "Сегмент", orders: "Заказов", ltv: "LTV", activity: "Активность", last: "Был" },
      message: "Написать",
    },
    analytics: {
      revenueTitle: "Доход", last30: "Последние 30 дней", liveFeed: "Лента в реальном времени",
      cohortTitle: "Когорта удержания", cohortNote: "Процент клиентов, вернувшихся в неделю N после первого заказа.",
      heatmapTitle: "Заказы по дням", heatmapAria: "Тепловая карта заказов", heatmapNote: "Тёмные клетки — выше объём.",
    },
    inventory: {
      heatTitle: "Движение склада", heatAria: "Тепловая карта движения",
      heatNote: "Клетка — день · яркость = единиц перемещено.",
      liveFeed: "Движения в реальном времени", alertsTitle: "Оповещения о низком остатке",
      col: { sku: "SKU", product: "Товар", stock: "Остаток", reorder: "Точка заказа", status: "Статус" },
      status: { ok: "Норма", low: "Низкий", critical: "Критично" },
      reorder: "Заказать",
    },
    promotions: {
      builderTitle: "Конструктор купона",
      fields: { code: "Код", percent: "Скидка", starts: "Начало", ends: "Конец" },
      schedule: "Запланировать", previewLabel: "Превью",
      exampleCart: "Пример корзины", afterDiscount: "После скидки",
      campaignsTitle: "Активные кампании",
      col: { id: "ID", name: "Название", redemptions: "Применений", spend: "Расход", status: "Статус" },
      status: { active: "Активна", scheduled: "Запланирована", ended: "Завершена" },
    },
    settings: {
      storeBasics: "Основные данные",
      fields: { storeName: "Название магазина", currency: "Валюта", timezone: "Часовой пояс", contactEmail: "Email для связи" },
      placeholders: { storeName: "Maison & Moss", currency: "USD", timezone: "Asia/Dushanbe", contactEmail: "hello@maisonmoss.co" },
      save: "Сохранить",
      integrationsTitle: "Интеграции",
      integrationsCount: "{count} из {total} подключено",
      connected: "Подключено", disconnected: "Отключено", connect: "Подключить", disconnect: "Отключить",
      integrations: {
        stripe: "Принимайте платежи по всему миру — Visa, Mastercard, Apple Pay.",
        shopify: "Синхронизация заказов и остатков с витриной.",
        mailchimp: "Рассылки и возврат брошенных корзин.",
        klaviyo: "Поведенческие письма и SMS.",
        slack: "Уведомления в #orders на каждый заказ.",
        ga: "Отслеживание трафика и пути клиента.",
      },
    },
  },
  tg: {
    tabs: { checkout: "Пардохт", customers: "Муштариён", analytics: "Аналитика", inventory: "Анбор", promotions: "Аксияҳо", settings: "Танзимот" },
    nav: { groups: { storefront: "Магазин", admin: "Идора" } },
    commandPalette: { placeholder: "Ҷустуҷӯ ё гузаштан…" },
    toast: {
      navigated: "{screen} кушода шуд",
      viewingProduct: "Маҳсулот бор мешавад…",
      savedToWishlist: "{name} ба рӯйхати орзу илова шуд",
      added: "{name} ба сабад илова шуд",
      paymentCaptured: "Пардохт қабул шуд",
      reorderPlaced: "Дубораборкунӣ барои {sku} ба қайд гирифта шуд",
      promotionScheduled: "{code} ба нақша гирифта шуд",
      settingsSaved: "Танзимот нигоҳ дошта шуд",
      connected: "{name} пайваст шуд",
      disconnected: "{name} канда шуд",
      messageSent: "Паём ба {name} фиристода шуд",
    },
    shell: {
      breadcrumb: {
        checkout: "Магазин / Пардохт",
        customers: "Идора / Муштариён",
        analytics: "Идора / Аналитика",
        inventory: "Идора / Анбор",
        promotions: "Идора / Аксияҳо",
        settings: "Идора / Танзимот",
      },
      screen: {
        checkout: { eyebrow: "Қадам ба қадам", title: "Пардохт", subtitle: "Суроға, пардохт ва тасдиқ — дар як ҷараён." },
        customers: { eyebrow: "Одамон", title: "Муштариён", subtitle: "Сегментҳо бо LTV, фаъолият ва тамос." },
        analytics: { eyebrow: "Натиҷаҳо", title: "Аналитика", subtitle: "Даромад, нигоҳдорӣ ва фаъолияти зинда." },
        inventory: { eyebrow: "Захираҳо", title: "Анбор", subtitle: "Харитаи гармӣ, ҳушдорҳо ва дубораборкунӣ." },
        promotions: { eyebrow: "Кампанияҳо", title: "Аксияҳо", subtitle: "Купонҳоро бо пешнамоиш созед ва истифодаро пайгирӣ кунед." },
        settings: { eyebrow: "Танзим", title: "Танзимот", subtitle: "Маълумоти асосӣ, андоз ва интегратсияҳо." },
      },
      kpi: {
        checkout: {
          avgCheckoutTime: { label: "Вақти миёнаи пардохт", value: "2:12", trend: "−18с нисбати ҳафта" },
          successRate: { label: "Муваффақияти пардохт", value: "95,2%", trend: "+2,1 п.п. дар як моҳ" },
          dropoffStep: { label: "Нуқтаи рафтан", value: "Пардохт", trend: "12% дар қадами 2 мераванд" },
          applePayShare: { label: "Ҳиссаи Apple Pay", value: "52%", trend: "+24 п.п. YoY" },
        },
        customers: {
          totalActive: { label: "Муштариёни фаъол", value: "4 820", trend: "+12% дар чоряк" },
          newThisMonth: { label: "Нав дар моҳ", value: "486", trend: "Беҳтарин моҳи сол" },
          avgLtv: { label: "LTV миёна", value: "$362", trend: "+$28 нисбати чоряки гузашта" },
          churn: { label: "Хуруҷ", value: "4,1%", trend: "−0,6 п.п." },
        },
        analytics: {
          revenue30d: { label: "Даромад (30 рӯз)", value: "$148,2K", trend: "+34% нисбати давра" },
          orders30d: { label: "Фармоишҳо (30 рӯз)", value: "1 184", trend: "+22% MoM" },
          conversion: { label: "Конверсия", value: "3,6%", trend: "+0,4 п.п." },
          repeatRate: { label: "Такрорӣ", value: "46%", trend: "+8 п.п. YoY" },
        },
        inventory: {
          skusTotal: { label: "Ҳамаи SKU", value: "240", trend: "+12 аз апрел" },
          unitsOnHand: { label: "Воҳид дар ҳозира", value: "11 240", trend: "Худпуркунӣ фаъол" },
          lowStock: { label: "Захираи кам", value: "8", trend: "Фармоиш зарур аст" },
          deadStock: { label: "Захираи мурда", value: "11", trend: "−7 дар як моҳ" },
        },
        promotions: {
          activeCampaigns: { label: "Кампанияҳои фаъол", value: "7", trend: "2 ба охир мерасанд" },
          couponsUsed: { label: "Купонҳои истифодашуда", value: "1 420", trend: "+38% WoW" },
          discountSpend: { label: "Хароҷот ба тахфиф", value: "$1 820", trend: "Дар буҷет" },
          roi: { label: "ROI кампанияҳо", value: "320%", trend: "Меафзояд" },
        },
        settings: {
          uptime: { label: "Аптайм (30 рӯз)", value: "99,98%", trend: "Ҳама хуб аст" },
          integrations: { label: "Интегратсияҳо", value: "8 фаъол", trend: "+2 дар як моҳ" },
          teamSeats: { label: "Ҷойҳои даста", value: "6 / 10", trend: "Ҷой ҳаст" },
          apiCalls: { label: "API дар 24с", value: "2,6K", trend: "Дар ҳудуди ҳад" },
        },
      },
    },
    checkout: {
      steps: { shipping: "Расондан", payment: "Пардохт", review: "Санҷиш", done: "Тайёр" },
      fields: {
        fullName: "Ном ва насаб", email: "Email", address: "Суроға", city: "Шаҳр", postalCode: "Индекс",
        cardNumber: "Рақами корт", cardName: "Ном дар корт", cardExpiry: "Муҳлат", cardCvc: "CVC",
      },
      placeholders: {
        fullName: "Айгерим Юсупова", email: "you@example.com",
        address: "хиёбони Рӯдакӣ 17", city: "Душанбе", postalCode: "734001",
        cardNumber: "4242 4242 4242 4242", cardName: "AIGERIM Y", cardExpiry: "08 / 28", cardCvc: "123",
      },
      methods: { card: "Корт", applePay: "Apple Pay", paypal: "PayPal", klarna: "Klarna" },
      back: "Қафо", next: "Пеш", placeOrder: "Фармоиш диҳед", startAnother: "Фармоиши нав",
      reviewTitle: "Тафтиш ва тасдиқ кунед", shipTo: "Расондан ба", payWith: "Пардохт бо", payerNote: "Гирифтан ҳангоми тасдиқ",
      successTitle: "Фармоиш қабул шуд", successSubtitle: "Фармоиши {id} дар роҳ аст",
      estDelivery: "Санаи тахминии расондан", tax: "Андоз", fastPickHint: "Гирифтан аз дафтари Душанбе ройгон", summaryTitle: "Хулосаи фармоиш",
    },
    customers: {
      segments: { all: "Ҳама", vip: "VIP", active: "Фаъол", new: "Нав", atrisk: "Дар хатар" },
      col: { customer: "Муштарӣ", segment: "Сегмент", orders: "Фармоиш", ltv: "LTV", activity: "Фаъолият", last: "Охирин" },
      message: "Паём",
    },
    analytics: {
      revenueTitle: "Даромад", last30: "30 рӯзи охирин", liveFeed: "Фаъолияти зинда",
      cohortTitle: "Когортаи нигоҳдорӣ", cohortNote: "Фоизи муштариёне, ки дар ҳафтаи N баргаштаанд.",
      heatmapTitle: "Фармоишҳо аз рӯи рӯзҳо", heatmapAria: "Харитаи гармии фармоишҳо", heatmapNote: "Кулчаҳои сиёҳ — ҳаҷми бештар.",
    },
    inventory: {
      heatTitle: "Ҳаракати захира", heatAria: "Харитаи гармии ҳаракати захира",
      heatNote: "Ҳар як кулча як рӯз — равшанӣ = воҳидҳои ҳаракатшуда.",
      liveFeed: "Ҳаракатҳои зинда", alertsTitle: "Ҳушдорҳои захираи кам",
      col: { sku: "SKU", product: "Маҳсулот", stock: "Дар ҳозира", reorder: "Нуқтаи фармоиш", status: "Ҳолат" },
      status: { ok: "Меъёр", low: "Кам", critical: "Зарурӣ" },
      reorder: "Фармоиш",
    },
    promotions: {
      builderTitle: "Конструктори купон",
      fields: { code: "Код", percent: "Тахфиф", starts: "Сар", ends: "Охир" },
      schedule: "Нақша гирифтан", previewLabel: "Пешнамоиш",
      exampleCart: "Сабади мисол", afterDiscount: "Баъд аз тахфиф",
      campaignsTitle: "Кампанияҳои фаъол",
      col: { id: "ID", name: "Ном", redemptions: "Истифода", spend: "Хароҷот", status: "Ҳолат" },
      status: { active: "Фаъол", scheduled: "Нақшавӣ", ended: "Анҷом" },
    },
    settings: {
      storeBasics: "Маълумоти асосӣ",
      fields: { storeName: "Номи магазин", currency: "Асъор", timezone: "Минтақаи вақт", contactEmail: "Email тамос" },
      placeholders: { storeName: "Maison & Moss", currency: "USD", timezone: "Asia/Dushanbe", contactEmail: "hello@maisonmoss.co" },
      save: "Нигоҳ доштан",
      integrationsTitle: "Интегратсияҳо",
      integrationsCount: "{count} аз {total} пайвастшуда",
      connected: "Пайваст", disconnected: "Канда", connect: "Пайваст кардан", disconnect: "Кандан",
      integrations: {
        stripe: "Пардохтҳо аз тамоми ҷаҳон — Visa, Mastercard, Apple Pay.",
        shopify: "Ҳамоҳангсозии фармоишҳо ва захира.",
        mailchimp: "Паёмҳои оммавӣ ва бозгардондани сабадҳои партофташуда.",
        klaviyo: "Email ва SMS-и рафторӣ.",
        slack: "Огоҳнома дар #orders барои ҳар як фармоиш.",
        ga: "Пайгирии роҳи муштарӣ ва манбаъҳои трафик.",
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
  if (!data.demoPreview.shopping) data.demoPreview.shopping = {};
  deepMerge(data.demoPreview.shopping, ADDITIONS[locale]);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n");
  console.log(`updated ${locale}.json`);
}
