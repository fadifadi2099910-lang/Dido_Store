import React, { useEffect, useState } from 'react';
import {
  X,
  Check,
  ShoppingBag,
  MessageCircle,
  AlertCircle,
  Heart,
  Bell,
  BellRing,
  Trash2,
} from 'lucide-react';
import {
  CartItem,
  PAYMENT_METHODS,
  PaymentMethod,
  RestockAlert,
  StoreService,
  buildWhatsappUrl,
} from '../data/services';
import { ServiceEmblem } from './ServiceEmblems';

interface ProductModalProps {
  service: StoreService | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string) => void;
  existingAlert?: RestockAlert;
  onSaveAlert: (alert: RestockAlert) => void;
  onRemoveAlert: (serviceId: string) => void;
}

export function ProductModal({
  service,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  existingAlert,
  onSaveAlert,
  onRemoveAlert,
}: ProductModalProps) {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('');
  const [customUsd, setCustomUsd] = useState<string>('');
  const [useCustomUsd, setUseCustomUsd] = useState(false);
  const [targetAccount, setTargetAccount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BaridiMob');
  const [alertContact, setAlertContact] = useState('');
  const [error, setError] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (service) {
      setSelectedPkgId(service.packages[0]?.id ?? '');
      setCustomUsd('15');
      setUseCustomUsd(false);
      setTargetAccount('');
      setPaymentMethod('BaridiMob');
      setAlertContact(existingAlert?.contact ?? '');
      setError('');
      setAddedSuccess(false);
    }
  }, [service, existingAlert]);

  useEffect(() => {
    if (!service) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [service, onClose]);

  if (!service) return null;

  const isOutOfStock = service.inStock === false;
  const selectedPkg =
    service.packages.find((p) => p.id === selectedPkgId) ?? service.packages[0];

  const parsedCustomUsd = Math.max(1, Number(customUsd) || 0);
  const effectiveLabel =
    useCustomUsd && service.supportsCustomUsd
      ? `كمية مخصصة: $${parsedCustomUsd} USD`
      : selectedPkg.label;

  const whatsappMessage = [
    `السلام عليكم Dido Store، أرغب في طلب الخدمة التالية والاستفسار عن السعر:`,
    `• الخدمة: ${service.title}`,
    `• الباقة: ${effectiveLabel}`,
    `• الحساب / المعرف: ${targetAccount.trim() || 'سيتم إرساله هنا'}`,
    `• طريقة الدفع المفضلة: ${paymentMethod}`,
  ].join('\n');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAccount.trim()) {
      setError(`يرجى إدخال ${service.inputLabel} لإضافة الطلب إلى السلة.`);
      return;
    }
    if (useCustomUsd && parsedCustomUsd < 5) {
      setError('الحد الأدنى للمبلغ المخصص هو $5 USD.');
      return;
    }
    setError('');
    onAddToCart({
      cartId: `${service.id}-${effectiveLabel}-${Date.now()}`,
      serviceId: service.id,
      serviceTitle: service.title,
      packageLabel: effectiveLabel,
      quantity: 1,
      targetAccount: targetAccount.trim(),
      paymentMethod,
    });
    setAddedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 650);
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = alertContact.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
    const digitsOnly = cleaned.replace(/[\s\-+()]/g, '');
    const isValidPhone = /^\d{8,15}$/.test(digitsOnly);

    if (!isValidEmail && !isValidPhone) {
      setError('يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف صالح للتواصل معك.');
      return;
    }
    setError('');
    onSaveAlert({
      serviceId: service.id,
      serviceTitle: service.title,
      desiredPackage: effectiveLabel,
      contact: cleaned,
      createdAt: 'الآن',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-white/12 bg-[#0A1626] p-6 sm:p-8 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-4">
            <ServiceEmblem serviceId={service.id} />
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>{service.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className={isOutOfStock ? 'text-amber-300 font-medium' : ''}>
                  {service.deliveryTime}
                </span>
              </div>
              <h2
                id="modal-service-title"
                className="font-display text-xl sm:text-2xl font-bold text-white"
              >
                {service.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleFavorite(service.id)}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
              className={`rounded-lg border p-2 transition-colors cursor-pointer ${
                isFavorite
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-400 hover:bg-rose-500/25'
                  : 'border-white/10 text-slate-400 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-400' : ''}`} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق نافذة الخدمة"
              className="rounded-lg p-2 text-slate-400 hover:bg-white/8 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isOutOfStock ? (
          <form onSubmit={handleAlertSubmit} className="mt-6 space-y-6">
            {/* Out of stock status banner */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/35 bg-amber-500/10 p-4">
              <Bell className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-bold text-amber-200">
                  هذه الخدمة خارج المخزون حالياً
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  اختر الباقة التي تهمك وأدخل بريدك الإلكتروني أو رقم هاتفك، وسنتواصل معك فور توفر الخدمة من جديد.
                </p>
              </div>
            </div>

            {/* Desired Package */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                1. الباقة المطلوبة عند التوفر
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.packages.map((pkg) => {
                  const selected = pkg.id === selectedPkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 text-right transition-colors cursor-pointer ${
                        selected
                          ? 'border-amber-400 bg-amber-400/12 text-white'
                          : 'border-white/10 bg-[#0D1B2E] text-slate-200 hover:border-white/25'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="block text-sm font-bold truncate">{pkg.label}</span>
                        {pkg.sublabel && (
                          <span className="block text-xs text-slate-400 mt-0.5 truncate">
                            {pkg.sublabel}
                          </span>
                        )}
                      </div>
                      {selected && (
                        <Check className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {existingAlert ? (
              <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <BellRing
                      className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        تم تسجيل طلب التنبيه بنجاح
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        سنتواصل معك عبر{' '}
                        <span className="font-mono-num font-bold text-emerald-300" dir="ltr">
                          {existingAlert.contact}
                        </span>{' '}
                        فور توفر <span className="text-white font-semibold">{existingAlert.desiredPackage}</span>.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveAlert(service.id)}
                    aria-label="إلغاء التنبيه"
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 hover:border-red-400/40 hover:text-red-300 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>إلغاء</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    هل ترغب بحجز مسبق عبر الدعم؟
                  </span>
                  <a
                    href={buildWhatsappUrl(
                      `السلام عليكم Dido Store، سجّلت تنبيه توفر لخدمة (${service.title} - ${existingAlert.desiredPackage}) عبر ${existingAlert.contact}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>تأكيد التنبيه عبر واتساب</span>
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="restock-contact-input"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    2. البريد الإلكتروني أو رقم الهاتف للتنبيه
                  </label>
                  <input
                    id="restock-contact-input"
                    type="text"
                    value={alertContact}
                    onChange={(e) => {
                      setAlertContact(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="name@example.com أو 055xxxxxxx"
                    dir="ltr"
                    className="w-full rounded-xl border border-white/15 bg-[#0D1B2E] px-4 py-3 text-sm text-white text-right placeholder:text-slate-500 focus:border-[#D9A74A] focus:outline-none"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    يُستخدم هذا الرقم أو البريد لإشعارك فور إعادة توفير الخدمة فقط.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded-lg border border-red-500/35 bg-red-500/10 px-3.5 py-2.5 text-xs font-medium text-red-200"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-slate-400">الباقة المطلوبة</span>
                    <span className="text-sm font-bold text-amber-300">{effectiveLabel}</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D9A74A] px-5 py-2.5 text-sm font-bold text-[#07111E] hover:bg-[#EAB95B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Bell className="w-4 h-4" aria-hidden="true" />
                    <span>تنبيه عند توفر الخدمة</span>
                  </button>
                </div>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={handleAdd} className="mt-6 space-y-6">
            {/* Package Selection Grid */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <label className="text-sm font-semibold text-white">1. اختر الباقة</label>
                {service.supportsCustomUsd && (
                  <button
                    type="button"
                    onClick={() => setUseCustomUsd((prev) => !prev)}
                    className="text-xs font-semibold text-[#D9A74A] hover:text-[#F6DDA4] underline underline-offset-4 cursor-pointer"
                  >
                    {useCustomUsd ? 'العودة إلى الباقات الجاهزة' : 'أو تحديد كمية مخصصة ($ USD)'}
                  </button>
                )}
              </div>

              {!useCustomUsd ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.packages.map((pkg) => {
                    const selected = pkg.id === selectedPkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 text-right transition-colors cursor-pointer ${
                          selected
                            ? 'border-[#D9A74A] bg-[#D9A74A]/12 text-white'
                            : 'border-white/10 bg-[#0D1B2E] text-slate-200 hover:border-white/25'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="block text-sm font-bold truncate">{pkg.label}</span>
                          {pkg.sublabel && (
                            <span className="block text-xs text-slate-400 mt-0.5 truncate">
                              {pkg.sublabel}
                            </span>
                          )}
                        </div>
                        {selected && (
                          <Check className="w-4 h-4 text-[#D9A74A] shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-[#D9A74A]/40 bg-[#0D1B2E] p-4">
                  <label htmlFor="custom-usd-input" className="block text-xs text-slate-300 mb-1.5">
                    المبلغ المطلوب بالدولار (الحد الأدنى $5)
                  </label>
                  <input
                    id="custom-usd-input"
                    type="number"
                    min={5}
                    max={2000}
                    value={customUsd}
                    onChange={(e) => setCustomUsd(e.target.value)}
                    dir="ltr"
                    className="w-full rounded-lg border border-white/15 bg-[#07111E] px-3.5 py-2.5 font-mono-num text-base font-bold text-white focus:border-[#D9A74A] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Target Account / ID Input */}
            <div>
              <label htmlFor="target-account" className="block text-sm font-semibold text-white mb-2">
                2. {service.inputLabel}
              </label>
              <input
                id="target-account"
                type="text"
                value={targetAccount}
                onChange={(e) => {
                  setTargetAccount(e.target.value);
                  if (error) setError('');
                }}
                placeholder={service.inputPlaceholder}
                dir="ltr"
                className="w-full rounded-xl border border-white/15 bg-[#0D1B2E] px-4 py-3 text-sm text-white placeholder:text-slate-500 text-right focus:border-[#D9A74A] focus:outline-none"
              />
              <p className="text-xs text-slate-400 mt-1.5">{service.inputHint}</p>
            </div>

            {/* Payment Method */}
            <div>
              <span className="block text-sm font-semibold text-white mb-2">3. طريقة الدفع المفضلة</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PAYMENT_METHODS.map((pm) => {
                  const active = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`rounded-xl border px-3 py-2.5 text-right transition-colors cursor-pointer ${
                        active
                          ? 'border-[#D9A74A] bg-[#D9A74A]/12 text-white'
                          : 'border-white/10 bg-[#0D1B2E] text-slate-300 hover:border-white/25'
                      }`}
                    >
                      <span className="block text-xs font-bold">{pm.label}</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">{pm.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-red-500/35 bg-red-500/10 px-3.5 py-2.5 text-xs font-medium text-red-200"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Purchase Summary & Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-slate-400">الباقة المختارة</span>
                <span className="text-base font-bold text-[#F6DDA4]">{effectiveLabel}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsappUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-600/15 px-4 py-2.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-600/25 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>طلب عبر واتساب</span>
                </a>

                <button
                  type="submit"
                  disabled={addedSuccess}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D9A74A] px-5 py-2.5 text-sm font-bold text-[#07111E] hover:bg-[#EAB95B] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-80"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>تمت الإضافة للسلة</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      <span>أضف إلى السلة</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
