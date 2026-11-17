import { CartItem, PaymentMethod } from './services';

export type OrderStatus = 'بانتظار التأكيد' | 'قيد التنفيذ' | 'تم التسليم';

export interface TrackedOrderItem {
  serviceTitle: string;
  packageLabel: string;
  quantity: number;
  targetAccount: string;
}

export interface TrackedOrder {
  orderNumber: string;
  customerName: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  statusNote: string;
  items: TrackedOrderItem[];
}

const ORDERS_STORAGE_KEY = 'dido_store_orders_v1';

export const INITIAL_ORDERS: TrackedOrder[] = [
  {
    orderNumber: 'DS-4821',
    customerName: 'أمين ب.',
    paymentMethod: 'BaridiMob',
    status: 'تم التسليم',
    createdAt: 'اليوم · 14:20',
    statusNote: 'تم شحن الشدات إلى معرف اللاعب بنجاح.',
    items: [
      {
        serviceTitle: 'شحن شدات PUBG Mobile',
        packageLabel: '660 UC',
        quantity: 1,
        targetAccount: '5148293041',
      },
    ],
  },
  {
    orderNumber: 'DS-7390',
    customerName: 'ياسين م.',
    paymentMethod: 'CCP',
    status: 'قيد التنفيذ',
    createdAt: 'اليوم · 16:05',
    statusNote: 'تم استلام تأكيد الدفع وجاري شحن الرصيد الآن.',
    items: [
      {
        serviceTitle: 'شحن وتفعيل Redotpay',
        packageLabel: 'شحن 50 USD',
        quantity: 1,
        targetAccount: 'UID 88291042',
      },
    ],
  },
  {
    orderNumber: 'DS-1045',
    customerName: 'سارة ك.',
    paymentMethod: 'USDT (Binance Pay)',
    status: 'تم التسليم',
    createdAt: 'أمس · 21:40',
    statusNote: 'تم تسليم بيانات الاشتراك وتفعيل الحساب.',
    items: [
      {
        serviceTitle: 'اشتراكات Netflix 4K',
        packageLabel: 'بروفايل خاص — 3 أشهر',
        quantity: 1,
        targetAccount: 'sara.k@example.com',
      },
    ],
  },
];

export function normalizeOrderNumber(raw: string): string {
  return raw.trim().replace(/^#/, '').toUpperCase();
}

export function loadTrackedOrders(): TrackedOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw) as TrackedOrder[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveTrackedOrder(params: {
  orderNumber: string;
  customerName: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
}): TrackedOrder {
  const newOrder: TrackedOrder = {
    orderNumber: normalizeOrderNumber(params.orderNumber),
    customerName: params.customerName,
    paymentMethod: params.paymentMethod,
    status: 'قيد التنفيذ',
    createdAt: 'الآن',
    statusNote: 'تم تسجيل طلبك وهو الآن قيد المراجعة والتنفيذ.',
    items: params.items.map((it) => ({
      serviceTitle: it.serviceTitle,
      packageLabel: it.packageLabel,
      quantity: it.quantity,
      targetAccount: it.targetAccount,
    })),
  };

  try {
    const existing = loadTrackedOrders();
    const filtered = existing.filter(
      (o) => normalizeOrderNumber(o.orderNumber) !== newOrder.orderNumber
    );
    const updated = [newOrder, ...filtered];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage unavailable
  }

  return newOrder;
}

export function findOrderByNumber(query: string): TrackedOrder | null {
  const normalized = normalizeOrderNumber(query);
  if (!normalized) return null;
  const orders = loadTrackedOrders();
  return (
    orders.find((o) => normalizeOrderNumber(o.orderNumber) === normalized) ?? null
  );
}
