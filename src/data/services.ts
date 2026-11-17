export type ServiceCategory = 'games' | 'crypto' | 'sponsor' | 'subscriptions';

export interface ServicePackage {
  id: string;
  label: string;
  sublabel?: string;
}

export interface StoreService {
  id: string;
  title: string;
  englishName: string;
  category: ServiceCategory;
  categoryLabel: string;
  deliveryTime: string;
  shortDesc: string;
  offerSummary?: string;
  hasActiveOffer?: boolean;
  inputLabel: string;
  inputPlaceholder: string;
  inputHint: string;
  accentColor: string;
  packages: ServicePackage[];
  supportsCustomUsd?: boolean;
  inStock?: boolean;
}

export interface RestockAlert {
  serviceId: string;
  serviceTitle: string;
  desiredPackage: string;
  contact: string;
  createdAt: string;
}

export interface CartItem {
  cartId: string;
  serviceId: string;
  serviceTitle: string;
  packageLabel: string;
  quantity: number;
  targetAccount: string;
  paymentMethod: PaymentMethod;
}

export type PaymentMethod = 'BaridiMob' | 'CCP' | 'USDT (Binance Pay)';

export const STORE_CONTACT = {
  brandName: 'Dido Store',
  brandArabic: 'Dido Store للشحن',
  tagline: 'الخدمات الرقمية • شحن الألعاب • العملات المشفرة',
  phoneDisplay: '0552583422',
  whatsappIntl: '213552583422',
  email: 'fadifadi2099910@gmail.com',
  snapchat: 'did_xox',
} as const;

export const CATEGORY_TABS: { id: 'all' | 'offers' | ServiceCategory; label: string }[] = [
  { id: 'all', label: 'جميع الخدمات' },
  { id: 'offers', label: 'العروض الحالية' },
  { id: 'games', label: 'شحن الألعاب' },
  { id: 'crypto', label: 'العملات و Redotpay' },
  { id: 'sponsor', label: 'الإعلانات الممولة' },
  { id: 'subscriptions', label: 'الاشتراكات الرقمية' },
];

export const PAYMENT_METHODS: { id: PaymentMethod; label: string; note: string }[] = [
  { id: 'BaridiMob', label: 'بريدي موب (BaridiMob)', note: 'تحويل فوري عبر التطبيق' },
  { id: 'CCP', label: 'بريد الجزائر (CCP)', note: 'دفع عبر الحساب البريدي' },
  { id: 'USDT (Binance Pay)', label: 'Binance Pay / USDT', note: 'دفع بالعملات الرقمية بدون عمولة' },
];

export const SERVICES: StoreService[] = [
  {
    id: 'pubg-mobile',
    title: 'شحن شدات PUBG Mobile',
    englishName: 'PUBG Mobile UC',
    category: 'games',
    categoryLabel: 'شحن الألعاب',
    deliveryTime: 'تسليم خلال 5 دقائق',
    shortDesc: 'شحن شدات ببجي موبايل وباقات الرويال باس مباشرة عبر الـ ID لجميع السيرفرات.',
    offerSummary: 'عرض الموسم: باقة الرويال باس + بونص UC إضافي',
    hasActiveOffer: true,
    inputLabel: 'معرف اللاعب (Player ID)',
    inputPlaceholder: 'مثال: 5148293041',
    inputHint: 'تأكد من نسخ رقم الـ ID الصحيح من ملفك الشخصي داخل اللعبة.',
    accentColor: '#F59E0B',
    inStock: true,
    packages: [
      { id: 'pubg-60', label: '60 UC', sublabel: 'باقة البداية السريعة' },
      { id: 'pubg-325', label: '325 UC (300 + 25)', sublabel: 'الأكثر طلباً' },
      { id: 'pubg-rp', label: 'باقة Royale Pass + 660 UC', sublabel: 'عرض الموسم الحالي' },
      { id: 'pubg-1800', label: '1800 UC (1500 + 300)', sublabel: 'بونص إضافي' },
      { id: 'pubg-3850', label: '3850 UC (3000 + 850)', sublabel: 'شحن مميز' },
      { id: 'pubg-8100', label: '8100 UC (6000 + 2100)', sublabel: 'الباقة القصوى' },
    ],
  },
  {
    id: 'free-fire',
    title: 'شحن جواهر Free Fire',
    englishName: 'Free Fire Diamonds',
    category: 'games',
    categoryLabel: 'شحن الألعاب',
    deliveryTime: 'تسليم خلال 5 دقائق',
    shortDesc: 'شحن جواهر فري فاير وبويا باس والعضويات عن طريق ID مع بونص إضافي.',
    offerSummary: 'عرض حالي: العضوية الشهرية + Booyah Pass',
    hasActiveOffer: true,
    inputLabel: 'معرف اللاعب (Free Fire ID)',
    inputPlaceholder: 'مثال: 2094817263',
    inputHint: 'يصل الشحن مباشرة إلى حسابك بالآيدي دون الحاجة لكلمة المرور.',
    accentColor: '#EF4444',
    inStock: true,
    packages: [
      { id: 'ff-110', label: '100 + 10 جوهرة', sublabel: 'باقة سريعة' },
      { id: 'ff-341', label: '310 + 31 جوهرة', sublabel: 'الأكثر مبيعاً' },
      { id: 'ff-572', label: '520 + 52 جوهرة', sublabel: 'قيمة ممتازة' },
      { id: 'ff-1166', label: '1060 + 106 جوهرة', sublabel: 'باقة متقدمة' },
      { id: 'ff-weekly', label: 'العضوية الأسبوعية + Booyah Pass', sublabel: 'عرض البويا الحالي' },
      { id: 'ff-monthly', label: 'العضوية الشهرية (جواهر يومية)', sublabel: 'تفعيل مباشر' },
    ],
  },
  {
    id: 'other-games',
    title: 'eFootball · Valorant · MLBB · Roblox',
    englishName: 'Trending Games Top-Up',
    category: 'games',
    categoryLabel: 'شحن الألعاب',
    deliveryTime: 'تسليم خلال 10 دقائق',
    shortDesc: 'شحن كوينز eFootball، نقاط Valorant، جواهر Mobile Legends، وبطاقات Roblox.',
    offerSummary: 'باقات الألعاب الرائجة حالياً بالتفعيل الفوري',
    hasActiveOffer: true,
    inputLabel: 'معرف الحساب أو اسم اللعبة والـ ID',
    inputPlaceholder: 'مثال: eFootball ID أو Riot ID#TAG',
    inputHint: 'اذكر اسم اللعبة مع المعرف الخاص بك لتنفيذ الشحن مباشرة.',
    accentColor: '#38BDF8',
    inStock: true,
    packages: [
      { id: 'og-efootball-1040', label: 'eFootball — 1040 Coins', sublabel: 'الأكثر طلباً حالياً' },
      { id: 'og-efootball-2130', label: 'eFootball — 2130 Coins', sublabel: 'عرض الباكات' },
      { id: 'og-mlbb-weekly', label: 'Mobile Legends — Weekly Diamond Pass', sublabel: 'شحن بالـ ID + Server' },
      { id: 'og-valorant-1000', label: 'Valorant — 1000 VP / 2050 VP', sublabel: 'كود أو شحن مباشر' },
      { id: 'og-roblox-800', label: 'Roblox — 800 / 1700 Robux', sublabel: 'كود رقمي مضمون' },
    ],
  },
  {
    id: 'redotpay',
    title: 'شحن وتفعيل Redotpay',
    englishName: 'Redotpay Visa & USD',
    category: 'crypto',
    categoryLabel: 'البطاقات والعملات',
    deliveryTime: 'شحن فوري',
    shortDesc: 'شحن رصيد بطاقة Redotpay بالدولار أو USDT لتفعيل البطاقة الافتراضية والشراء أونلاين.',
    offerSummary: 'عرض التفعيل: رصيد تفعيل البطاقة + تحويل فوري',
    hasActiveOffer: true,
    inputLabel: 'معرف Redotpay UID أو البريد الإلكتروني',
    inputPlaceholder: 'مثال: UID 88291042 أو email@domain.com',
    inputHint: 'التحويل داخلي مجاني وسريع إلى حسابك في Redotpay.',
    accentColor: '#E11D48',
    supportsCustomUsd: true,
    inStock: true,
    packages: [
      { id: 'rp-card', label: 'باقة تفعيل البطاقة الافتراضية ($10)', sublabel: 'لتفعيل فيزا Redotpay فوراً' },
      { id: 'rp-20', label: 'شحن 20 USD', sublabel: 'تحويل مباشر' },
      { id: 'rp-50', label: 'شحن 50 USD', sublabel: 'الأكثر طلباً للمتسوقين' },
      { id: 'rp-100', label: 'شحن 100 USD', sublabel: 'تحويل كميات كبيرة' },
    ],
  },
  {
    id: 'crypto-exchange',
    title: 'شراء وبيع العملات المشفرة',
    englishName: 'USDT · BTC · ETH · SOL · TON',
    category: 'crypto',
    categoryLabel: 'العملات المشفرة',
    deliveryTime: 'تحويل خلال 10 دقائق',
    shortDesc: 'تحويل USDT و Bitcoin و Ethereum و Solana و TON عبر الشبكات السريعة و Binance Pay.',
    offerSummary: 'متاح الآن: شحن TON و Solana و USDT بدون تأخير',
    hasActiveOffer: false,
    inputLabel: 'عنوان المحفظة أو Binance Pay ID',
    inputPlaceholder: 'مثال: TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
    inputHint: 'يرجى كتابة الشبكة المطلوبة (TRC20 / BEP20 / TON / SOL) بوضوح مع العنوان.',
    accentColor: '#F59E0B',
    supportsCustomUsd: true,
    inStock: true,
    packages: [
      { id: 'cr-10', label: '10 USDT / Binance Pay', sublabel: 'تحويل فوري' },
      { id: 'cr-25', label: '25 USDT (TRC20 / BEP20)', sublabel: 'باقة قياسية' },
      { id: 'cr-ton', label: 'عملة TON / Telegram Stars', sublabel: 'الأكثر رواجاً حالياً' },
      { id: 'cr-sol', label: 'Solana (SOL) / BTC / ETH', sublabel: 'شحن محافظ Web3' },
      { id: 'cr-100', label: '100 USDT / Crypto', sublabel: 'تحويل مميز' },
    ],
  },
  {
    id: 'sponsor-ads',
    title: 'تمويل الإعلانات Sponsor',
    englishName: 'Facebook · Instagram · TikTok Ads',
    category: 'sponsor',
    categoryLabel: 'الإعلانات الممولة',
    deliveryTime: 'تفعيل خلال 30 دقيقة',
    shortDesc: 'حملات إعلانية ممولة احترافية على Facebook و Instagram و TikTok باستهداف دقيق في الجزائر.',
    offerSummary: 'عرض المتاجر: إعداد الجمهور المستهدف مجاناً مع الحملة',
    hasActiveOffer: true,
    inputLabel: 'رابط الصفحة أو المنشور المراد ترويجه',
    inputPlaceholder: 'https://www.instagram.com/p/... أو رابط الصفحة',
    inputHint: 'يشمل ضبط الجمهور المستهدف ومتابعة نتائج الحملة الإعلانية.',
    accentColor: '#38BDF8',
    inStock: true,
    packages: [
      { id: 'sp-5', label: 'حملة 5 دولار ($5)', sublabel: 'تجريبية — يومان إلى 3 أيام' },
      { id: 'sp-10', label: 'حملة 10 دولار ($10)', sublabel: 'تفاعل ومبيعات متوسطة' },
      { id: 'sp-25', label: 'باقة المتاجر 25 دولار ($25)', sublabel: 'استهداف ولايات ومبيعات' },
      { id: 'sp-combo', label: 'حملة مزدوجة IG + TikTok ($30)', sublabel: 'عرض إطلاق المنتجات' },
      { id: 'sp-50', label: 'باقة النمو 50 دولار ($50)', sublabel: 'حملة شهرية متكاملة' },
    ],
  },
  {
    id: 'netflix',
    title: 'اشتراكات Netflix 4K',
    englishName: 'Netflix Ultra HD',
    category: 'subscriptions',
    categoryLabel: 'الاشتراكات الرقمية',
    deliveryTime: 'تسليم فوري',
    shortDesc: 'حسابات وبروفايلات Netflix أصلية بجودة 4K UHD وبضمان كامل طوال مدة الاشتراك.',
    offerSummary: 'عرض حالي: باقة 3 أشهر بضمان كامل واستبدال فوري',
    hasActiveOffer: true,
    inputLabel: 'البريد الإلكتروني أو رقم الواتساب للاستلام',
    inputPlaceholder: 'name@example.com أو 055xxxxxxx',
    inputHint: 'تصل بيانات الدخول أو تفعيل الحساب مباشرة مع ضمان الاستمرارية.',
    accentColor: '#DC2626',
    inStock: true,
    packages: [
      { id: 'nf-1m-profile', label: 'بروفايل خاص 4K — شهر واحد', sublabel: 'شاشة واحدة برمز PIN' },
      { id: 'nf-3m-profile', label: 'عرض بروفايل 4K — 3 أشهر', sublabel: 'الأكثر طلباً حالياً' },
      { id: 'nf-1m-full', label: 'حساب كامل خاص — شهر واحد', sublabel: '5 شاشات 4K' },
      { id: 'nf-1y-profile', label: 'بروفايل خاص — سنة كاملة', sublabel: 'اشتراك سنوي مضمون' },
    ],
  },
  {
    id: 'ai-tools',
    title: 'ChatGPT Plus · Canva Pro · CapCut',
    englishName: 'AI & Creative Subscriptions',
    category: 'subscriptions',
    categoryLabel: 'الاشتراكات والذكاء الاصطناعي',
    deliveryTime: 'تسليم خلال 15 دقيقة',
    shortDesc: 'اشتراكات أدوات الذكاء الاصطناعي والتصميم الأكثر طلباً: ChatGPT Plus و Canva Pro و CapCut Pro.',
    offerSummary: 'جديد وحالي: باقات ChatGPT Plus و Canva Pro السنوية',
    hasActiveOffer: true,
    inputLabel: 'البريد الإلكتروني الخاص بالتفعيل',
    inputPlaceholder: 'name@example.com',
    inputHint: 'يتم التفعيل على حسابك الشخصي أو تسليم حساب جاهز حسب الباقة المختارة.',
    accentColor: '#10B981',
    inStock: true,
    packages: [
      { id: 'ai-chatgpt-shared', label: 'ChatGPT Plus — شهر واحد', sublabel: 'تفعيل رسمي ومستقر' },
      { id: 'ai-chatgpt-private', label: 'ChatGPT Plus — حساب خاص على إيميلك', sublabel: 'كامل الخصوصية' },
      { id: 'ai-canva-1y', label: 'Canva Pro — سنة كاملة (على إيميلك)', sublabel: 'عرض المصممين الحالي' },
      { id: 'ai-capcut-pro', label: 'CapCut Pro — شهر / سنة', sublabel: 'لمونتاج الفيديوهات بدون علامة' },
    ],
  },
  {
    id: 'streaming-iptv',
    title: 'IPTV 4K · Shahid VIP · Spotify',
    englishName: 'Streaming & Sports Bundles',
    category: 'subscriptions',
    categoryLabel: 'اشتراكات البث والترفيه',
    deliveryTime: 'تفعيل خلال 10 دقائق',
    shortDesc: 'سيرفرات IPTV 4K للمباريات والأفلام بدون تقطيع، واشتراكات Shahid VIP و Spotify Premium.',
    offerSummary: 'عرض البث الرياضي: اشتراك IPTV 4K سنوي + تجربة مجانية',
    hasActiveOffer: true,
    inputLabel: 'نوع الجهاز أو البريد الإلكتروني للاستلام',
    inputPlaceholder: 'Smart TV / Android / iPhone أو البريد',
    inputHint: 'نرسل لك كود التفعيل وإرشادات التشغيل لجميع الشاشات والهواتف.',
    accentColor: '#8B5CF6',
    inStock: true,
    packages: [
      { id: 'st-iptv-6m', label: 'IPTV 4K — 6 أشهر (قنوات رياضية وأفلام)', sublabel: 'يدعم التلفاز والهاتف' },
      { id: 'st-iptv-1y', label: 'عرض IPTV 4K — سنة كاملة', sublabel: 'جودة 4K بدون تقطيع' },
      { id: 'st-shahid-3m', label: 'Shahid VIP شامل الرياضة — 3 أشهر', sublabel: 'حساب رسمي' },
      { id: 'st-spotify-1y', label: 'Spotify Premium — 3 أشهر / سنة', sublabel: 'تفعيل على حسابك' },
    ],
  },
  {
    id: 'tiktok-services',
    title: 'شحن عملات وترويج TikTok',
    englishName: 'TikTok Coins & Promote',
    category: 'subscriptions',
    categoryLabel: 'الاشتراكات والمنصات',
    deliveryTime: 'تسليم خلال 15 دقيقة',
    shortDesc: 'شحن عملات تيك توك للهدايا والبث المباشر أو تمويل فيديوهات TikTok لزيادة المشاهدات.',
    hasActiveOffer: false,
    inputLabel: 'اسم المستخدم في TikTok (@username)',
    inputPlaceholder: 'مثال: @dido_store',
    inputHint: 'تأكد من أن الحساب عام (Public) قبل تأكيد طلب الترويج أو الشحن.',
    accentColor: '#22D3EE',
    inStock: true,
    packages: [
      { id: 'tt-350', label: '350 عملة تيك توك', sublabel: 'شحن مباشر' },
      { id: 'tt-700', label: '700 عملة تيك توك', sublabel: 'الأكثر طلباً' },
      { id: 'tt-1400', label: '1400 عملة تيك توك', sublabel: 'شحن للبث المباشر' },
      { id: 'tt-promo', label: 'ترويج فيديو ($10)', sublabel: 'وصول محلي موجه' },
    ],
  },
  {
    id: 'snapchat-services',
    title: 'خدمات واشتراك Snapchat+',
    englishName: 'Snapchat Plus & Ads',
    category: 'subscriptions',
    categoryLabel: 'الاشتراكات والمنصات',
    deliveryTime: 'تسليم خلال 15 دقيقة',
    shortDesc: 'تفعيل اشتراك Snapchat+ الرسمي وإطلاق حملات إعلانية ممولة على سناب شات.',
    hasActiveOffer: false,
    inputLabel: 'حساب Snapchat الخاص بك',
    inputPlaceholder: 'مثال: did_xox',
    inputHint: 'نضمن تفعيل الاشتراك الرسمي أو إعداد الإعلان بأعلى جودة.',
    accentColor: '#FACC15',
    inStock: true,
    packages: [
      { id: 'sc-1m', label: 'Snapchat+ شهر واحد', sublabel: 'تفعيل رسمي' },
      { id: 'sc-3m', label: 'Snapchat+ 3 أشهر', sublabel: 'اشتراك ربع سنوي' },
      { id: 'sc-6m', label: 'Snapchat+ 6 أشهر', sublabel: 'اشتراك نصف سنوي' },
      { id: 'sc-ads', label: 'حملة إعلانية Snapchat ($15)', sublabel: 'إعلان ممول' },
    ],
  },
  {
    id: 'gift-cards',
    title: 'بطاقات PlayStation و Steam',
    englishName: 'PSN · Xbox · Steam Cards',
    category: 'games',
    categoryLabel: 'البطاقات الرقمية',
    deliveryTime: 'خارج المخزون مؤقتاً',
    shortDesc: 'بطاقات شحن متجر PlayStation (US / FR) ومحفظة Steam و Xbox بجميع الفئات.',
    inputLabel: 'البريد الإلكتروني أو الهاتف',
    inputPlaceholder: 'name@example.com أو 055xxxxxxx',
    inputHint: 'يمكنك تفعيل التنبيه ليصلك إشعار فور توفر البطاقات الجديدة.',
    accentColor: '#6366F1',
    inStock: false,
    packages: [
      { id: 'gc-psn-10', label: 'PlayStation Card $10 (US)', sublabel: 'كود رقمي' },
      { id: 'gc-psn-20', label: 'PlayStation Card $20 / €20', sublabel: 'متجر أمريكي / فرنسي' },
      { id: 'gc-steam-20', label: 'Steam Wallet $20', sublabel: 'شحن محفظة ستيم' },
    ],
  },
];

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${STORE_CONTACT.whatsappIntl}?text=${encodeURIComponent(message)}`;
}
