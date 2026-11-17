import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Mail,
} from 'lucide-react';
import {
  CartItem,
  PAYMENT_METHODS,
  PaymentMethod,
  STORE_CONTACT,
  buildWhatsappUrl,
} from '../data/services';
import { saveTrackedOrder } from '../data/orders';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onTrackOrder: (orderNumber: string) => void;
}

interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: PaymentMethod;
  totalQuantity: number;
  items: CartItem[];
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onTrackOrder,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BaridiMob');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('يرجى إدخال الاسم ورقم الهاتف لتأكيد الطلب.');
      return;
    }
    setFormError('');
    const orderNum = `DS-${Math.floor(1000 + Math.random() * 9000)}`;
    saveTrackedOrder({
      orderNumber: orderNum,
      customerName: customerName.trim(),
      paymentMethod,
      items,
    });
    setReceipt({
      orderNumber: orderNum,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      paymentMethod,
      totalQuantity,
      items: [...items],
    });
    onClearCart();
  };

  const buildOrderSummaryText = (rec: OrderReceipt) => {
    const lines = [
      `طلب جديد #${rec.orderNumber} — ${STORE_CONTACT.brandArabic}`,
      `العميل: ${rec.customerName}`,
      `الهاتف: ${rec.customerPhone}`,
      `طريقة الدفع: ${rec.paymentMethod}`,
      notes.trim() ? `ملاحظات: ${notes.trim()}` : '',
      `--- تفاصيل الطلب ---`,
      ...rec.items.map(
        (it, idx) =>
          `${idx + 1}. ${it.serviceTitle} (${it.packageLabel}) × ${it.quantity} | المعرف: ${it.targetAccount}`
      ),
      `إجمالي الباقات: ${rec.totalQuantity}`,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const handleCopyReceipt = async () => {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(buildOrderSummaryText(receipt));
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2000);
    } catch {
      // Clipboard fallback ignored silently
    }
  };

  const handleCloseDrawer = () => {
    setReceipt(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="سلة الطلبات"
      onClick={handleCloseDrawer}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-r border-white/10 bg-[#0A1626] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#D9A74A]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-white">
              {receipt ? 'تأكيد الطلب' : 'سلة الطلبات'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="إغلاق السلة"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/8 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {receipt ? (
            <div className="space-y-5">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                <CheckCircle2
                  className="w-10 h-10 text-emerald-400 mx-auto mb-2.5"
                  aria-hidden="true"
                />
                <h3 className="font-display text-lg font-bold text-white">
                  تم تجهيز طلبك بنجاح
                </h3>
                <p className="font-mono-num text-sm font-semibold text-emerald-300 mt-1">
                  رقم المرجع: #{receipt.orderNumber}
                </p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  أرسل ملخص الطلب الآن عبر واتساب أو البريد الإلكتروني لمعرفة التكلفة واستلام بيانات الدفع وتنفيذ الشحن فوراً.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0D1B2E] p-4 space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>الاسم:</span>
                  <span className="font-semibold text-white">{receipt.customerName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>الهاتف:</span>
                  <span className="font-mono-num text-white" dir="ltr">
                    {receipt.customerPhone}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>طريقة الدفع:</span>
                  <span className="font-semibold text-[#F6DDA4]">{receipt.paymentMethod}</span>
                </div>
                <div className="border-t border-white/10 pt-3 space-y-2">
                  {receipt.items.map((item) => (
                    <div key={item.cartId} className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">
                          {item.serviceTitle} — {item.packageLabel}
                        </p>
                        <p className="text-slate-400 truncate" dir="ltr">
                          {item.targetAccount}
                        </p>
                      </div>
                      <span className="font-mono-num font-bold text-[#F6DDA4] shrink-0">
                        ×{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-sm font-bold text-white">
                  <span>عدد الباقات:</span>
                  <span className="font-mono-num text-[#F6DDA4]">
                    {receipt.totalQuantity}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={buildWhatsappUrl(buildOrderSummaryText(receipt))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>إرسال الطلب عبر واتساب ({STORE_CONTACT.phoneDisplay})</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const orderId = receipt.orderNumber;
                    handleCloseDrawer();
                    onTrackOrder(orderId);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9A74A] px-4 py-2.5 text-sm font-bold text-[#07111E] hover:bg-[#EAB95B] transition-colors cursor-pointer"
                >
                  <span>تتبع حالة الطلب الآن</span>
                </button>

                <a
                  href={`mailto:${STORE_CONTACT.email}?subject=${encodeURIComponent(
                    `طلب جديد #${receipt.orderNumber} — Dido Store`
                  )}&body=${encodeURIComponent(buildOrderSummaryText(receipt))}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#0D1B2E] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-[#D9A74A]/50 transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>إرسال عبر البريد الإلكتروني</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {copiedReceipt ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      <span>تم نسخ تفاصيل الطلب</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>نسخ ملخص الطلب</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-12 h-12 text-slate-600 mb-3" aria-hidden="true" />
              <p className="text-base font-bold text-white">سلة الطلبات فارغة</p>
              <p className="text-sm text-slate-400 mt-1 max-w-xs">
                اختر أي خدمة من الكتالوج وحدد الباقة المناسبة لإضافتها هنا.
              </p>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="mt-5 rounded-lg bg-[#D9A74A] px-5 py-2.5 text-sm font-bold text-[#07111E] hover:bg-[#EAB95B] cursor-pointer"
              >
                تصفح الخدمات
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Items List */}
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.cartId}
                    className="rounded-xl border border-white/10 bg-[#0D1B2E] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">
                          {item.serviceTitle}
                        </h3>
                        <p className="text-xs text-[#F6DDA4] font-medium mt-0.5">
                          {item.packageLabel}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 truncate" dir="ltr">
                          ID: {item.targetAccount}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartId)}
                        aria-label={`إزالة ${item.serviceTitle}`}
                        className="rounded p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.cartId, -1)}
                          aria-label="إنقاص الكمية"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-white/12 bg-[#07111E] text-slate-200 hover:border-[#D9A74A] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono-num w-6 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.cartId, 1)}
                          aria-label="زيادة الكمية"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-white/12 bg-[#07111E] text-slate-200 hover:border-[#D9A74A] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs text-slate-400">
                        {item.paymentMethod}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Checkout Form */}
              <form id="cart-checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold text-white">بيانات تأكيد الطلب</h3>

                <div>
                  <label htmlFor="checkout-name" className="block text-xs text-slate-300 mb-1.5">
                    الاسم الكامل
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسمك"
                    className="w-full rounded-lg border border-white/15 bg-[#0D1B2E] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#D9A74A] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="block text-xs text-slate-300 mb-1.5">
                    رقم الهاتف / واتساب
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="055xxxxxxx"
                    dir="ltr"
                    className="w-full rounded-lg border border-white/15 bg-[#0D1B2E] px-3.5 py-2.5 text-sm text-white text-right placeholder:text-slate-500 focus:border-[#D9A74A] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-payment" className="block text-xs text-slate-300 mb-1.5">
                    وسيلة الدفع
                  </label>
                  <select
                    id="checkout-payment"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full rounded-lg border border-white/15 bg-[#0D1B2E] px-3.5 py-2.5 text-sm text-white focus:border-[#D9A74A] focus:outline-none"
                  >
                    {PAYMENT_METHODS.map((pm) => (
                      <option key={pm.id} value={pm.id}>
                        {pm.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="checkout-notes" className="block text-xs text-slate-300 mb-1.5">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <input
                    id="checkout-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: شبكة TRC20 أو توقيت مناسب للتواصل"
                    className="w-full rounded-lg border border-white/15 bg-[#0D1B2E] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#D9A74A] focus:outline-none"
                  />
                </div>

                {formError && (
                  <p className="text-xs font-medium text-red-400" role="alert">
                    {formError}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {!receipt && items.length > 0 && (
          <div className="border-t border-white/10 bg-[#07111E] px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">عدد الباقات في السلة</span>
              <span className="font-mono-num text-lg font-extrabold text-[#F6DDA4]">
                {totalQuantity}
              </span>
            </div>
            <button
              type="submit"
              form="cart-checkout-form"
              className="w-full rounded-xl bg-[#D9A74A] py-3 text-sm font-bold text-[#07111E] hover:bg-[#EAB95B] transition-colors cursor-pointer"
            >
              تأكيد وإنشاء وصل الطلب
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
