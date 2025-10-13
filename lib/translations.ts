export type Language = "en" | "es" | "ar" | "lt" | "fr" | "de" | "pt" | "zh"

export const translations = {
  en: {
    // License Screen
    appTitle: "Pocket Option Trading Bot",
    enterLicense: "Enter your license key to access the trading bot",
    licensePlaceholder: "PO-2025-XXXX-XXXX",
    activateLicense: "Activate License",
    validating: "Validating...",
    invalidLicense: "Invalid license key. Please check and try again.",
    usageLimitReached: "This license has reached its usage limit (3 logins). Please contact support for a new license.",
    usageRemaining: "Usage remaining",
    selectLanguage: "Select Language",
    needHelp: "Need Help? Contact Support",
    signalLimitReached: "Signal limit reached (7/7). Upgrade to Premium for unlimited signals!",
    signalsRemaining: "signals remaining",

    // Trading Bot
    balance: "Balance",
    winRate: "Win Rate",
    trades: "Trades",
    profitLoss: "P/L",
    logout: "Logout",
    license: "License",

    // Bot Control
    botControl: "Bot Control",
    startStopTrading: "Start or stop trading",
    running: "Running",
    stopped: "Stopped",
    startBot: "Start Bot",
    stopBot: "Stop Bot",
    autoTrade: "Auto Trade",
    enabled: "Enabled",
    disabled: "Disabled",

    // Manual Trading
    manualTrading: "Manual Trading",
    executeManually: "Execute trades manually",
    call: "CALL",
    put: "PUT",

    // Recent Trades
    recentTrades: "Recent Trades",
    lastTrades: "Last 10 trades",
    noTrades: "No trades yet. Start the bot to begin trading.",
    pending: "Pending",
    win: "Win",
    loss: "Loss",

    // Settings
    trading: "Trading",
    settings: "Settings",
    tradingSettings: "Trading Settings",
    configureBotParams: "Configure bot parameters",
    tradeAmount: "Trade Amount ($)",
    amountPerTrade: "Amount to invest per trade",
    timeframe: "Timeframe (seconds)",
    timeframeDuration: "Duration of each trade",
    seconds: "seconds",
    minute: "minute",
    minutes: "minutes",
    riskLevel: "Risk Level",
    adjustRisk: "Adjust risk tolerance for auto-trading",
    currentConfig: "Current Configuration",

    // Upgrade Message
    upgradeTitle: "UPGRADE TO USE THE BOT SIGNALS AND AUTOMATIC TRADING",
    upgradeDescription:
      "Your current license is limited. Upgrade to unlock full features including bot signals and automatic trading capabilities.",

    // Signal System
    signalSystem: "Signal System",
    liveSignals: "Live Signals",
    waitingForSignal: "Waiting for next signal...",
    analyzingMarket: "Analyzing Market",
    scanningPairs: "Scanning currency pairs...",
    calculatingProbability: "Calculating win probability...",
    generatingSignal: "Generating signal...",
    selectStrategy: "Select Trading Strategy",
    strategy1: "Conservative (Low Risk)",
    strategy2: "Balanced (Medium Risk)",
    strategy3: "Aggressive (High Risk)",
    strategy1Desc: "Focus on high-probability setups with lower returns",
    strategy2Desc: "Balance between risk and reward",
    strategy3Desc: "Higher risk trades with potential for bigger profits",
    confirmStrategy: "Confirm Strategy",
    currentStrategy: "Current Strategy",
    signalStrength: "Signal Strength",
    timeRemaining: "Time Remaining",
    nextSignalIn: "Next Signal In",

    // Advanced Features
    marketAnalysis: "Market Analysis",
    trendIndicator: "Trend Indicator",
    volatility: "Volatility",
    momentum: "Momentum",
    support: "Support",
    resistance: "Resistance",
    rsi: "RSI",
    macd: "MACD",
    volume: "Volume",

    // Performance
    todayProfit: "Today's Profit",
    weeklyProfit: "Weekly Profit",
    monthlyProfit: "Monthly Profit",
    bestPair: "Best Pair",
    avgWinRate: "Avg Win Rate",
    totalSignals: "Total Signals",

    // Auto Trading
    autoTradingLocked: "Auto Trading Locked",
    autoTradingUnlocked: "Auto Trading Unlocked",
    requiresAutoLicense: "Requires AUTO-TRADE-PRO license",
    autoTradingActive: "Auto Trading Active",
    followingSignals: "Following signals automatically",

    // Confidential
    confidential: "CONFIDENTIAL",
  },
  es: {
    // License Screen
    appTitle: "Bot de Trading Pocket Option",
    enterLicense: "Ingrese su clave de licencia para acceder al bot de trading",
    licensePlaceholder: "PO-2025-XXXX-XXXX",
    activateLicense: "Activar Licencia",
    validating: "Validando...",
    invalidLicense: "Clave de licencia inválida. Por favor verifique e intente nuevamente.",
    usageLimitReached:
      "Esta licencia ha alcanzado su límite de uso (3 inicios de sesión). Comuníquese con soporte para obtener una nueva licencia.",
    usageRemaining: "Usos restantes",
    selectLanguage: "Seleccionar Idioma",
    needHelp: "¿Necesitas Ayuda? Contacta Soporte",
    signalLimitReached: "Límite de señales alcanzado (7/7). ¡Actualice a Premium para señales ilimitadas!",
    signalsRemaining: "señales restantes",

    // Trading Bot
    balance: "Balance",
    winRate: "Tasa de Éxito",
    trades: "Operaciones",
    profitLoss: "G/P",
    logout: "Cerrar Sesión",
    license: "Licencia",

    // Bot Control
    botControl: "Control del Bot",
    startStopTrading: "Iniciar o detener trading",
    running: "Ejecutando",
    stopped: "Detenido",
    startBot: "Iniciar Bot",
    stopBot: "Detener Bot",
    autoTrade: "Trading Automático",
    enabled: "Activado",
    disabled: "Desactivado",

    // Manual Trading
    manualTrading: "Trading Manual",
    executeManually: "Ejecutar operaciones manualmente",
    call: "COMPRA",
    put: "VENTA",

    // Recent Trades
    recentTrades: "Operaciones Recientes",
    lastTrades: "Últimas 10 operaciones",
    noTrades: "No hay operaciones aún. Inicie el bot para comenzar a operar.",
    pending: "Pendiente",
    win: "Ganancia",
    loss: "Pérdida",

    // Settings
    trading: "Trading",
    settings: "Configuración",
    tradingSettings: "Configuración de Trading",
    configureBotParams: "Configurar parámetros del bot",
    tradeAmount: "Monto por Operación ($)",
    amountPerTrade: "Monto a invertir por operación",
    timeframe: "Marco Temporal (segundos)",
    timeframeDuration: "Duración de cada operación",
    seconds: "segundos",
    minute: "minuto",
    minutes: "minutos",
    riskLevel: "Nivel de Riesgo",
    adjustRisk: "Ajustar tolerancia al riesgo para trading automático",
    currentConfig: "Configuración Actual",

    // Upgrade Message
    upgradeTitle: "ACTUALICE PARA USAR LAS SEÑALES DEL BOT Y TRADING AUTOMÁTICO",
    upgradeDescription:
      "Su licencia actual es limitada. Actualice para desbloquear todas las funciones, incluidas las señales del bot y las capacidades de trading automático.",

    // Signal System
    signalSystem: "Sistema de Señales",
    liveSignals: "Señales en Vivo",
    waitingForSignal: "Esperando la próxima señal...",
    analyzingMarket: "Analizando Mercado",
    scanningPairs: "Escaneando pares de divisas...",
    calculatingProbability: "Calculando probabilidad de éxito...",
    generatingSignal: "Generando señal...",
    selectStrategy: "Seleccionar Estrategia de Trading",
    strategy1: "Conservadora (Bajo Riesgo)",
    strategy2: "Equilibrada (Riesgo Medio)",
    strategy3: "Agresiva (Alto Riesgo)",
    strategy1Desc: "Enfoque en configuraciones de alta probabilidad con menores retornos",
    strategy2Desc: "Equilibrio entre riesgo y recompensa",
    strategy3Desc: "Operaciones de mayor riesgo con potencial de mayores ganancias",
    confirmStrategy: "Confirmar Estrategia",
    currentStrategy: "Estrategia Actual",
    signalStrength: "Fuerza de Señal",
    timeRemaining: "Tiempo Restante",
    nextSignalIn: "Próxima Señal En",

    marketAnalysis: "Análisis de Mercado",
    trendIndicator: "Indicador de Tendencia",
    volatility: "Volatilidad",
    momentum: "Momento",
    support: "Soporte",
    resistance: "Resistencia",
    rsi: "RSI",
    macd: "MACD",
    volume: "Volumen",

    todayProfit: "Ganancia de Hoy",
    weeklyProfit: "Ganancia Hebdomadaire",
    monthlyProfit: "Ganancia Mensual",
    bestPair: "Mejor Paire",
    avgWinRate: "Tasa de Éxito Promedio",
    totalSignals: "Señales Totales",

    autoTradingLocked: "Trading Automático Bloqueado",
    autoTradingUnlocked: "Trading Automático Desbloqueado",
    requiresAutoLicense: "Requiere licencia AUTO-TRADE-PRO",
    autoTradingActive: "Trading Automático Activo",
    followingSignals: "Siguiendo señales automáticamente",

    confidential: "CONFIDENCIAL",
  },
  ar: {
    // License Screen
    appTitle: "بوت تداول Pocket Option",
    enterLicense: "أدخل مفتاح الترخيص الخاص بك للوصول إلى بوت التداول",
    licensePlaceholder: "PO-2025-XXXX-XXXX",
    activateLicense: "تفعيل الترخيص",
    validating: "جاري التحقق...",
    invalidLicense: "مفتاح ترخيص غير صالح. يرجى التحقق والمحاولة مرة أخرى.",
    usageLimitReached: "وصل هذا الترخيص إلى حد الاستخدام (3 تسجيلات دخول). يرجى الاتصال بالدعم للحصول على ترخيص جديد.",
    usageRemaining: "الاستخدامات المتبقية",
    selectLanguage: "اختر اللغة",
    needHelp: "تحتاج مساعدة؟ اتصل بالدعم",
    signalLimitReached: "تم الوصول إلى حد الإشارات (7/7). قم بالترقية إلى Premium للحصول على إشارات غير محدودة!",
    signalsRemaining: "إشارات متبقية",

    // Trading Bot
    balance: "الرصيد",
    winRate: "معدل الفوز",
    trades: "الصفقات",
    profitLoss: "الربح/الخسارة",
    logout: "تسجيل الخروج",
    license: "الترخيص",

    // Bot Control
    botControl: "التحكم في البوت",
    startStopTrading: "بدء أو إيقاف التداول",
    running: "قيد التشغيل",
    stopped: "متوقف",
    startBot: "تشغيل البوت",
    stopBot: "إيقاف البوت",
    autoTrade: "التداول التلقائي",
    enabled: "مفعل",
    disabled: "معطل",

    // Manual Trading
    manualTrading: "التداول اليدوي",
    executeManually: "تنفيذ الصفقات يدوياً",
    call: "شراء",
    put: "بيع",

    // Recent Trades
    recentTrades: "الصفقات الأخيرة",
    lastTrades: "آخر 10 صفقات",
    noTrades: "لا توجد صفقات بعد. ابدأ البوت لبدء التداول.",
    pending: "قيد الانتظار",
    win: "ربح",
    loss: "خسارة",

    // Settings
    trading: "التداول",
    settings: "الإعدادات",
    tradingSettings: "إعدادات التداول",
    configureBotParams: "تكوين معاملات البوت",
    tradeAmount: "مبلغ الصفقة ($)",
    amountPerTrade: "المبلغ المراد استثماره لكل صفقة",
    timeframe: "الإطار الزمني (ثواني)",
    timeframeDuration: "مدة كل صفقة",
    seconds: "ثواني",
    minute: "دقيقة",
    minutes: "دقائق",
    riskLevel: "مستوى المخاطرة",
    adjustRisk: "ضبط تحمل المخاطر للتداول التلقائي",
    currentConfig: "التكوين الحالي",

    // Upgrade Message
    upgradeTitle: "قم بالترقية لاستخدام إشارات البوت والتداول التلقائي",
    upgradeDescription:
      "ترخيصك الحالي محدود. قم بالترقية لفتح جميع الميزات بما في ذلك إشارات البوت وقدرات التداول التلقائي.",

    // Signal System
    signalSystem: "نظام الإشارات",
    liveSignals: "إشارات مباشرة",
    waitingForSignal: "في انتظار الإشارة التالية...",
    analyzingMarket: "تحليل السوق",
    scanningPairs: "فحص أزواج العملات...",
    calculatingProbability: "حساب احتمالية الفوز...",
    generatingSignal: "توليد الإشارة...",
    selectStrategy: "اختر استراتيجية التداول",
    strategy1: "محافظة (مخاطر منخفضة)",
    strategy2: "متوازنة (مخاطر متوسطة)",
    strategy3: "عدوانية (مخاطر عالية)",
    strategy1Desc: "التركيز على الإعدادات عالية الاحتمالية مع عوائد أقل",
    strategy2Desc: "التوازن بين المخاطرة والمكافأة",
    strategy3Desc: "صفقات عالية المخاطر مع إمكانية تحقيق أرباح أكبر",
    confirmStrategy: "تأكيد الاستراتيجية",
    currentStrategy: "الاستراتيجية الحالية",
    signalStrength: "قوة الإشارة",
    timeRemaining: "الوقت المتبقي",
    nextSignalIn: "الإشارة التالية في",

    marketAnalysis: "تحليل السوق",
    trendIndicator: "مؤشر الاتجاه",
    volatility: "التقلب",
    momentum: "الزخم",
    support: "الدعم",
    resistance: "المقاومة",
    rsi: "RSI",
    macd: "MACD",
    volume: "الحجم",

    todayProfit: "ربح اليوم",
    weeklyProfit: "الربح الأسبوعي",
    monthlyProfit: "الربح الشهري",
    bestPair: "أفضل زوج",
    avgWinRate: "متوسط معدل الفوز",
    totalSignals: "إجمالي الإشارات",

    autoTradingLocked: "التداول التلقائي مقفل",
    autoTradingUnlocked: "التداول التلقائي مفتوح",
    requiresAutoLicense: "يتطلب ترخيص AUTO-TRADE-PRO",
    autoTradingActive: "التداول التلقائي نشط",
    followingSignals: "متابعة الإشارات تلقائياً",

    confidential: "سري",
  },
  lt: {
    // License Screen
    appTitle: "Pocket Option Prekybos Botas",
    enterLicense: "Įveskite licencijos raktą, kad pasiektumėte prekybos botą",
    licensePlaceholder: "PO-2025-XXXX-XXXX",
    activateLicense: "Aktyvuoti Licenciją",
    validating: "Tikrinama...",
    invalidLicense: "Neteisingas licencijos raktas. Patikrinkite ir bandykite dar kartą.",
    usageLimitReached:
      "Ši licencija pasiekė naudojimo limitą (3 prisijungimai). Susisiekite su palaikymu dėl naujos licencijos.",
    usageRemaining: "Likę naudojimai",
    selectLanguage: "Pasirinkti Kalbą",
    needHelp: "Reikia Pagalbos? Susisiekite su Palaikymu",
    signalLimitReached: "Signalų limitas pasiektas (7/7). Atnaujinkite į Premium neribotiems signalams!",
    signalsRemaining: "signalų liko",

    // Trading Bot
    balance: "Balansas",
    winRate: "Laimėjimų Rodiklis",
    trades: "Sandoriai",
    profitLoss: "P/N",
    logout: "Atsijungti",
    license: "Licencija",

    // Bot Control
    botControl: "Boto Valdymas",
    startStopTrading: "Pradėti arba sustabdyti prekybą",
    running: "Veikia",
    stopped: "Sustabdyta",
    startBot: "Paleisti Botą",
    stopBot: "Sustabdyti Botą",
    autoTrade: "Automatinė Prekyba",
    enabled: "Įjungta",
    disabled: "Išjungta",

    // Manual Trading
    manualTrading: "Rankinė Prekyba",
    executeManually: "Vykdyti sandorius rankiniu būdu",
    call: "PIRKTI",
    put: "PARDUOTI",

    // Recent Trades
    recentTrades: "Naujausi Sandoriai",
    lastTrades: "Paskutiniai 10 sandorių",
    noTrades: "Dar nėra sandorių. Paleiskite botą, kad pradėtumėte prekybą.",
    pending: "Laukiama",
    win: "Laimėjimas",
    loss: "Nuostolis",

    // Settings
    trading: "Prekyba",
    settings: "Nustatymai",
    tradingSettings: "Prekybos Nustatymai",
    configureBotParams: "Konfigūruoti boto parametrus",
    tradeAmount: "Sandorio Suma ($)",
    amountPerTrade: "Suma investuoti į kiekvieną sandorį",
    timeframe: "Laiko Rėmas (sekundės)",
    timeframeDuration: "Kiekvieno sandorio trukmė",
    seconds: "sekundės",
    minute: "minutė",
    minutes: "minutės",
    riskLevel: "Rizikos Lygis",
    adjustRisk: "Koreguoti rizikos toleranciją automatinei prekybai",
    currentConfig: "Dabartinė Konfigūracija",

    // Upgrade Message
    upgradeTitle: "ATNAUJINKITE, KAD NAUDOTUMĖTE BOTO SIGNALUS IR AUTOMATINĘ PREKYBĄ",
    upgradeDescription:
      "Jūsų dabartinė licencija yra ribota. Atnaujinkite, kad atrakintumėte visas funkcijas, įskaitant boto signalus ir automatinės prekybos galimybes.",

    // Signal System
    signalSystem: "Signalų Sistema",
    liveSignals: "Tiesioginiai Signalai",
    waitingForSignal: "Laukiama kito signalo...",
    analyzingMarket: "Analizuojama Rinka",
    scanningPairs: "Skenuojamos valiutų poros...",
    calculatingProbability: "Skaičiuojama laimėjimo tikimybė...",
    generatingSignal: "Generuojamas signalas...",
    selectStrategy: "Pasirinkti Prekybos Strategiją",
    strategy1: "Konservatyvi (Maža Rizika)",
    strategy2: "Subalansuota (Vidutinė Rizika)",
    strategy3: "Agresyvi (Didelė Rizika)",
    strategy1Desc: "Dėmesys didelės tikimybės nustatymams su mažesniais grąžomis",
    strategy2Desc: "Balansas tarp rizikos ir atlygio",
    strategy3Desc: "Didesnės rizikos sandoriai su potencialu didesniam pelnui",
    confirmStrategy: "Patvirtinti Strategiją",
    currentStrategy: "Dabartinė Strategija",
    signalStrength: "Signalo Stiprumas",
    timeRemaining: "Likęs Laikas",
    nextSignalIn: "Kitas Signalas Po",

    marketAnalysis: "Rinkos Analizė",
    trendIndicator: "Tendencijos Indikatorius",
    volatility: "Nepastovumas",
    momentum: "Impulsas",
    support: "Parama",
    resistance: "Pasipriešinimas",
    rsi: "RSI",
    macd: "MACD",
    volume: "Apimtis",

    todayProfit: "Šiandienos Pelnas",
    weeklyProfit: "Savaitės Pelnas",
    monthlyProfit: "Mėnesio Pelnas",
    bestPair: "Geriausia Pora",
    avgWinRate: "Vid. Laimėjimų Rodiklis",
    totalSignals: "Viso Signalų",

    autoTradingLocked: "Automatinė Prekyba Užrakinta",
    autoTradingUnlocked: "Automatinė Prekyba Atrakinta",
    requiresAutoLicense: "Reikalinga AUTO-TRADE-PRO licencija",
    autoTradingActive: "Automatinė Prekyba Aktyvi",
    followingSignals: "Automatiškai sekama signalus",

    // Confidential
    confidential: "KONFIDENCIALUS",
  },
  fr: {
    // License Screen
    appTitle: "Bot de Trading Pocket Option",
    enterLicense: "Entrez votre clé de licence pour accéder au bot de trading",
    licensePlaceholder: "PO-2025-XXXX-XXXX",
    activateLicense: "Activer la Licence",
    validating: "Validation...",
    invalidLicense: "Clé de licence invalide. Veuillez vérifier et réessayer.",
    usageLimitReached:
      "Cette licence a atteint sa limite d'utilisation (3 connexions). Veuillez contacter le support pour une nouvelle licence.",
    usageRemaining: "Utilisations restantes",
    selectLanguage: "Sélectionner la Langue",
    needHelp: "Besoin d'Aide? Contactez le Support",
    signalLimitReached: "Limite de signaux atteinte (7/7). Passez à Premium pour des signaux illimités!",
    signalsRemaining: "signaux restants",

    // Trading Bot
    balance: "Solde",
    winRate: "Taux de Réussite",
    trades: "Transactions",
    profitLoss: "P/P",
    logout: "Déconnexion",
    license: "Licence",

    // Bot Control
    botControl: "Contrôle du Bot",
    startStopTrading: "Démarrer ou arrêter le trading",
    running: "En cours",
    stopped: "Arrêté",
    startBot: "Démarrer le Bot",
    stopBot: "Arrêter le Bot",
    autoTrade: "Trading Automatique",
    enabled: "Activé",
    disabled: "Désactivé",

    // Manual Trading
    manualTrading: "Trading Manuel",
    executeManually: "Exécuter les transactions manuellement",
    call: "ACHAT",
    put: "VENTE",

    // Recent Trades
    recentTrades: "Transactions Récentes",
    lastTrades: "10 dernières transactions",
    noTrades: "Aucune transaction pour le moment. Démarrez le bot pour commencer à trader.",
    pending: "En attente",
    win: "Gain",
    loss: "Perte",

    // Settings
    trading: "Trading",
    settings: "Paramètres",
    tradingSettings: "Paramètres de Trading",
    configureBotParams: "Configurer les paramètres du bot",
    tradeAmount: "Montant par Transaction ($)",
    amountPerTrade: "Montant à investir par transaction",
    timeframe: "Période (secondes)",
    timeframeDuration: "Durée de chaque transaction",
    seconds: "secondes",
    minute: "minute",
    minutes: "minutes",
    riskLevel: "Niveau de Risque",
    adjustRisk: "Ajuster la tolérance au risque pour le trading automatique",
    currentConfig: "Configuration Actuelle",

    // Upgrade Message
    upgradeTitle: "MISE À NIVEAU POUR UTILISER LES SIGNAUX DU BOT ET LE TRADING AUTOMATIQUE",
    upgradeDescription:
      "Votre licence actuelle est limitée. Mettez à niveau pour débloquer toutes les fonctionnalités, y compris les signaux du bot et les capacités de trading automatique.",

    // Signal System
    signalSystem: "Système de Signaux",
    liveSignals: "Signaux en Direct",
    waitingForSignal: "En attente du prochain signal...",
    analyzingMarket: "Analyse du Marché",
    scanningPairs: "Analyse des paires de devises...",
    calculatingProbability: "Calcul de la probabilité de gain...",
    generatingSignal: "Génération du signal...",
    selectStrategy: "Sélectionner la Stratégie de Trading",
    strategy1: "Conservatrice (Faible Risque)",
    strategy2: "Équilibrée (Risque Moyen)",
    strategy3: "Agressive (Risque Élevé)",
    strategy1Desc: "Focus sur les configurations à haute probabilité avec des rendements plus faibles",
    strategy2Desc: "Équilibre entre risque et récompense",
    strategy3Desc: "Transactions à risque élevé avec potentiel de profits plus importants",
    confirmStrategy: "Confirmer la Stratégie",
    currentStrategy: "Stratégie Actuelle",
    signalStrength: "Force du Signal",
    timeRemaining: "Temps Restant",
    nextSignalIn: "Prochain Signal Dans",

    marketAnalysis: "Analyse du Marché",
    trendIndicator: "Indicateur de Tendance",
    volatility: "Volatilité",
    momentum: "Momentum",
    support: "Support",
    resistance: "Résistance",
    rsi: "RSI",
    macd: "MACD",
    volume: "Volume",

    todayProfit: "Profit du Jour",
    weeklyProfit: "Profit Hebdomadaire",
    monthlyProfit: "Profit Mensuel",
    bestPair: "Meilleure Paire",
    avgWinRate: "Taux de Réussite Moyen",
    totalSignals: "Total des Signaux",

    autoTradingLocked: "Trading Automatique Verrouillé",
    autoTradingUnlocked: "Trading Automatique Déverrouillé",
    requiresAutoLicense: "Nécessite une licence AUTO-TRADE-PRO",
    autoTradingActive: "Trading Automatique Actif",
    followingSignals: "Suivi automatique des signaux",

    confidential: "CONFIDENTIEL",
  },
  de: {
    // License Screen
    appTitle: "Pocket Option Trading Bot",
    enterLicense: "Geben Sie Ihren Lizenzschlüssel ein, um auf den Trading-Bot zuzugreifen",
    licensePlaceholder: "PO-2025-XXXX-XXXX",
    activateLicense: "Lizenz Aktivieren",
    validating: "Validierung...",
    invalidLicense: "Ungültiger Lizenzschlüssel. Bitte überprüfen und erneut versuchen.",
    usageLimitReached:
      "Diese Lizenz hat ihr Nutzungslimit erreicht (3 Anmeldungen). Bitte kontaktieren Sie den Support für eine neue Lizenz.",
    usageRemaining: "Verbleibende Nutzungen",
    selectLanguage: "Sprache Auswählen",
    needHelp: "Brauchen Sie Hilfe? Support Kontaktieren",
    signalLimitReached: "Signallimit erreicht (7/7). Upgrade auf Premium für unbegrenzte Signale!",
    signalsRemaining: "Signale verbleibend",

    // Trading Bot
    balance: "Guthaben",
    winRate: "Gewinnrate",
    trades: "Trades",
    profitLoss: "G/V",
    logout: "Abmelden",
    license: "Lizenz",

    // Bot Control
    botControl: "Bot-Steuerung",
    startStopTrading: "Trading starten oder stoppen",
    running: "Läuft",
    stopped: "Gestoppt",
    startBot: "Bot Starten",
    stopBot: "Bot Stoppen",
    autoTrade: "Auto-Trading",
    enabled: "Aktiviert",
    disabled: "Deaktiviert",

    // Manual Trading
    manualTrading: "Manuelles Trading",
    executeManually: "Trades manuell ausführen",
    call: "KAUFEN",
    put: "VERKAUFEN",

    // Recent Trades
    recentTrades: "Letzte Trades",
    lastTrades: "Letzte 10 Trades",
    noTrades: "Noch keine Trades. Starten Sie den Bot, um mit dem Trading zu beginnen.",
    pending: "Ausstehend",
    win: "Gewinn",
    loss: "Verlust",

    // Settings
    trading: "Trading",
    settings: "Einstellungen",
    tradingSettings: "Trading-Einstellungen",
    configureBotParams: "Bot-Parameter konfigurieren",
    tradeAmount: "Trade-Betrag ($)",
    amountPerTrade: "Betrag pro Trade investieren",
    timeframe: "Zeitrahmen (Sekunden)",
    timeframeDuration: "Dauer jedes Trades",
    seconds: "Sekunden",
    minute: "Minute",
    minutes: "Minuten",
    riskLevel: "Risikolevel",
    adjustRisk: "Risikotoleranz für Auto-Trading anpassen",
    currentConfig: "Aktuelle Konfiguration",

    // Upgrade Message
    upgradeTitle: "UPGRADE FÜR BOT-SIGNALE UND AUTOMATISCHES TRADING",
    upgradeDescription:
      "Ihre aktuelle Lizenz ist eingeschränkt. Upgraden Sie, um alle Funktionen freizuschalten, einschließlich Bot-Signale und automatische Trading-Funktionen.",

    // Signal System
    signalSystem: "Signal-System",
    liveSignals: "Live-Signale",
    waitingForSignal: "Warten auf nächstes Signal...",
    analyzingMarket: "Marktanalyse",
    scanningPairs: "Währungspaare scannen...",
    calculatingProbability: "Gewinnwahrscheinlichkeit berechnen...",
    generatingSignal: "Signal generieren...",
    selectStrategy: "Trading-Strategie Auswählen",
    strategy1: "Konservativ (Niedriges Risiko)",
    strategy2: "Ausgewogen (Mittleres Risiko)",
    strategy3: "Aggressiv (Hohes Risiko)",
    strategy1Desc: "Fokus auf hochwahrscheinliche Setups mit geringeren Renditen",
    strategy2Desc: "Balance zwischen Risiko und Belohnung",
    strategy3Desc: "Höheres Risiko-Trades mit Potenzial für größere Gewinne",
    confirmStrategy: "Strategie Bestätigen",
    currentStrategy: "Aktuelle Strategie",
    signalStrength: "Signalstärke",
    timeRemaining: "Verbleibende Zeit",
    nextSignalIn: "Nächstes Signal In",

    marketAnalysis: "Marktanalyse",
    trendIndicator: "Trendindikator",
    volatility: "Volatilität",
    momentum: "Momentum",
    support: "Unterstützung",
    resistance: "Widerstand",
    rsi: "RSI",
    macd: "MACD",
    volume: "Volumen",

    todayProfit: "Heutiger Gewinn",
    weeklyProfit: "Wöchentlicher Gewinn",
    monthlyProfit: "Monatlicher Gewinn",
    bestPair: "Bestes Paar",
    avgWinRate: "Durchschn. Gewinnrate",
    totalSignals: "Gesamt Signale",

    autoTradingLocked: "Auto-Trading Gesperrt",
    autoTradingUnlocked: "Auto-Trading Entsperrt",
    requiresAutoLicense: "Erfordert AUTO-TRADE-PRO Lizenz",
    autoTradingActive: "Auto-Trading Aktiv",
    followingSignals: "Signale automatisch folgen",

    confidential: "VERTRAULICH",
  },
  pt: {
    // License Screen
    appTitle: "Bot de Trading Pocket Option",
    enterLicense: "Digite sua chave de licença para acessar o bot de trading",
    licensePlaceholder: "PO-2025-XXXX-XXXX",
    activateLicense: "Ativar Licença",
    validating: "Validando...",
    invalidLicense: "Chave de licença inválida. Por favor, verifique e tente novamente.",
    usageLimitReached:
      "Esta licença atingiu seu limite de uso (3 logins). Entre em contato com o suporte para uma nova licença.",
    usageRemaining: "Usos restantes",
    selectLanguage: "Selecionar Idioma",
    needHelp: "Precisa de Ajuda? Entre em Contato com o Suporte",
    signalLimitReached: "Limite de sinais atingido (7/7). Atualize para Premium para sinais ilimitados!",
    signalsRemaining: "sinais restantes",

    // Trading Bot
    balance: "Saldo",
    winRate: "Taxa de Vitória",
    trades: "Negociações",
    profitLoss: "L/P",
    logout: "Sair",
    license: "Licença",

    // Bot Control
    botControl: "Controle do Bot",
    startStopTrading: "Iniciar ou parar trading",
    running: "Executando",
    stopped: "Parado",
    startBot: "Iniciar Bot",
    stopBot: "Parar Bot",
    autoTrade: "Trading Automático",
    enabled: "Ativado",
    disabled: "Desativado",

    // Manual Trading
    manualTrading: "Trading Manual",
    executeManually: "Executar negociações manualmente",
    call: "COMPRA",
    put: "VENDA",

    // Recent Trades
    recentTrades: "Negociações Recentes",
    lastTrades: "Últimas 10 negociações",
    noTrades: "Ainda não há negociações. Inicie o bot para começar a negociar.",
    pending: "Pendente",
    win: "Vitória",
    loss: "Perda",

    // Settings
    trading: "Trading",
    settings: "Configurações",
    tradingSettings: "Configurações de Trading",
    configureBotParams: "Configurar parâmetros do bot",
    tradeAmount: "Valor da Negociação ($)",
    amountPerTrade: "Valor a investir por negociação",
    timeframe: "Período (segundos)",
    timeframeDuration: "Duração de cada negociação",
    seconds: "segundos",
    minute: "minuto",
    minutes: "minutos",
    riskLevel: "Nível de Risco",
    adjustRisk: "Ajustar tolerância ao risco para trading automático",
    currentConfig: "Configuração Atual",

    // Upgrade Message
    upgradeTitle: "ATUALIZE PARA USAR OS SINAIS DO BOT E TRADING AUTOMÁTICO",
    upgradeDescription:
      "Sua licença atual é limitada. Atualize para desbloquear todos os recursos, incluindo sinais do bot e capacidades de trading automático.",

    // Signal System
    signalSystem: "Sistema de Sinais",
    liveSignals: "Sinais ao Vivo",
    waitingForSignal: "Aguardando próximo sinal...",
    analyzingMarket: "Analisando Mercado",
    scanningPairs: "Escaneando pares de moedas...",
    calculatingProbability: "Calculando probabilidade de vitória...",
    generatingSignal: "Gerando sinal...",
    selectStrategy: "Selecionar Estratégia de Trading",
    strategy1: "Conservadora (Baixo Risco)",
    strategy2: "Equilibrada (Risco Médio)",
    strategy3: "Agressiva (Alto Risco)",
    strategy1Desc: "Foco em configurações de alta probabilidade com retornos menores",
    strategy2Desc: "Equilíbrio entre risco e recompensa",
    strategy3Desc: "Negociações de maior risco com potencial para lucros maiores",
    confirmStrategy: "Confirmar Estratégia",
    currentStrategy: "Estratégia Atual",
    signalStrength: "Força do Sinal",
    timeRemaining: "Tempo Restante",
    nextSignalIn: "Próximo Sinal Em",

    marketAnalysis: "Análise de Mercado",
    trendIndicator: "Indicador de Tendência",
    volatility: "Volatilidade",
    momentum: "Momentum",
    support: "Suporte",
    resistance: "Resistência",
    rsi: "RSI",
    macd: "MACD",
    volume: "Volume",

    todayProfit: "Lucro de Hoje",
    weeklyProfit: "Lucro Semanal",
    monthlyProfit: "Lucro Mensal",
    bestPair: "Melhor Par",
    avgWinRate: "Taxa de Vitória Média",
    totalSignals: "Total de Sinais",

    autoTradingLocked: "Trading Automático Bloqueado",
    autoTradingUnlocked: "Trading Automático Desbloqueado",
    requiresAutoLicense: "Requer licença AUTO-TRADE-PRO",
    autoTradingActive: "Trading Automático Ativo",
    followingSignals: "Seguindo sinais automaticamente",

    confidential: "CONFIDENCIAL",
  },
  zh: {
    // License Screen
    appTitle: "Pocket Option 交易机器人",
    enterLicense: "输入您的许可证密钥以访问交易机器人",
    licensePlaceholder: "PO-2025-XXXX-XXXX",
    activateLicense: "激活许可证",
    validating: "验证中...",
    invalidLicense: "无效的许可证密钥。请检查并重试。",
    usageLimitReached: "此许可证已达到使用限制（3次登录）。请联系支持获取新许可证。",
    usageRemaining: "剩余使用次数",
    selectLanguage: "选择语言",
    needHelp: "需要帮助？联系支持",
    signalLimitReached: "信号限制已达到 (7/7)。升级到高级版以获得无限信号！",
    signalsRemaining: "剩余信号",

    // Trading Bot
    balance: "余额",
    winRate: "胜率",
    trades: "交易",
    profitLoss: "盈亏",
    logout: "登出",
    license: "许可证",

    // Bot Control
    botControl: "机器人控制",
    startStopTrading: "开始或停止交易",
    running: "运行中",
    stopped: "已停止",
    startBot: "启动机器人",
    stopBot: "停止机器人",
    autoTrade: "自动交易",
    enabled: "已启用",
    disabled: "已禁用",

    // Manual Trading
    manualTrading: "手动交易",
    executeManually: "手动执行交易",
    call: "买入",
    put: "卖出",

    // Recent Trades
    recentTrades: "最近交易",
    lastTrades: "最近10笔交易",
    noTrades: "还没有交易。启动机器人开始交易。",
    pending: "待处理",
    win: "盈利",
    loss: "亏损",

    // Settings
    trading: "交易",
    settings: "设置",
    tradingSettings: "交易设置",
    configureBotParams: "配置机器人参数",
    tradeAmount: "交易金额 ($)",
    amountPerTrade: "每笔交易投资金额",
    timeframe: "时间框架（秒）",
    timeframeDuration: "每笔交易的持续时间",
    seconds: "秒",
    minute: "分钟",
    minutes: "分钟",
    riskLevel: "风险等级",
    adjustRisk: "调整自动交易的风险承受能力",
    currentConfig: "当前配置",

    // Upgrade Message
    upgradeTitle: "升级以使用机器人信号和自动交易",
    upgradeDescription: "您当前的许可证受限。升级以解锁所有功能，包括机器人信号和自动交易功能。",

    // Signal System
    signalSystem: "信号系统",
    liveSignals: "实时信号",
    waitingForSignal: "等待下一个信号...",
    analyzingMarket: "分析市场",
    scanningPairs: "扫描货币对...",
    calculatingProbability: "计算胜率...",
    generatingSignal: "生成信号...",
    selectStrategy: "选择交易策略",
    strategy1: "保守型（低风险）",
    strategy2: "平衡型（中等风险）",
    strategy3: "激进型（高风险）",
    strategy1Desc: "专注于高概率设置，回报较低",
    strategy2Desc: "风险与回报之间的平衡",
    strategy3Desc: "高风险交易，潜在利润更大",
    confirmStrategy: "确认策略",
    currentStrategy: "当前策略",
    signalStrength: "信号强度",
    timeRemaining: "剩余时间",
    nextSignalIn: "下一个信号",

    marketAnalysis: "市场分析",
    trendIndicator: "趋势指标",
    volatility: "波动性",
    momentum: "动量",
    support: "支撑",
    resistance: "阻力",
    rsi: "RSI",
    macd: "MACD",
    volume: "成交量",

    todayProfit: "今日利润",
    weeklyProfit: "每周利润",
    monthlyProfit: "每月利润",
    bestPair: "最佳货币对",
    avgWinRate: "平均胜率",
    totalSignals: "总信号数",

    autoTradingLocked: "自动交易已锁定",
    autoTradingUnlocked: "自动交易已解锁",
    requiresAutoLicense: "需要 AUTO-TRADE-PRO 许可证",
    autoTradingActive: "自动交易活跃",
    followingSignals: "自动跟随信号",

    confidential: "机密",
  },
}

export function getTranslation(lang: Language) {
  return {
    ...(translations[lang] || translations.en),
    confidential:
      lang === "en"
        ? "CONFIDENTIAL"
        : lang === "es"
          ? "CONFIDENCIAL"
          : lang === "ar"
            ? "سري"
            : lang === "lt"
              ? "KONFIDENCIALUS"
              : lang === "fr"
                ? "CONFIDENTIEL"
                : lang === "de"
                  ? "VERTRAULICH"
                  : lang === "pt"
                    ? "CONFIDENCIAL"
                    : "机密",
  }
}
