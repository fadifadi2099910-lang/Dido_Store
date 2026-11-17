import React, { useEffect, useState } from 'react';
import {
  Search,
  Clock,
  CheckCircle2,
  Hourglass,
  PackageCheck,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import {
  OrderStatus,
  TrackedOrder,
  findOrderByNumber,
  loadTrackedOrders,
  normalizeOrderNumber,
} from '../data/orders';
import { buildWhatsappUrl } from '../data/services';

interface OrderTrackingSectionProps {
  externalOrderNumber?: string | null;
}

function getStatusConfig(status: OrderStatus) {
  switch (status) {
    case 'تم التسليم':
      return {
        label: 'تم التسليم',
        stepIndex: 2,
        containerClass: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300',
        Icon: CheckCircle2,
      };
    case 'قيد التنفيذ':
      return {
        label: 'قيد التنفيذ',
        stepIndex: 1,
        containerClass: 'border-amber-500/35 bg-amber-500/10 text-amber-300',
        Icon: Clock,
      };
    default:
      return {
        label: 'بانتظار التأكيد',
        stepIndex: 0,
        containerClass: 'border-sky-500/35 bg-sky-500/10 text-sky-300',
        Icon: Hourglass,
      };
  }
}

const TRACKING_STEPS = [
  { id: 0, title: 'استلام الطلب', desc: 'تم تسجيل الطلب في النظام' },
  { id: 1, title: 'قيد التنفيذ', desc: 'جاري شحن الحساب أو التحويل' },
  { id: 2, title: 'تم التسليم', desc: 'اكتمل الشحن بنجاح' },
];

export function OrderTrackingSection({ externalOrderNumber }: OrderTrackingSectionProps) {
  const [orderInput, setOrderInput] = useState('');
  const [searchedCode, setSearchedCode] = useState<string | null>(null);
  const [foundOrder, setFoundOrder] = useState<TrackedOrder | null>(null);
  const [recentOrders, setRecentOrders] = useState<TrackedOrder[]>(() => loadTrackedOrders());

  useEffect(() => {
    setRecentOrders(loadTrackedOrders());
  }, [searchedCode]);

  useEffect(() => {
    if (externalOrderNumber) {
      const normalized = normalizeOrderNumber(externalOrderNumber);
      setOrderInput(normalized);
      setSearchedCode(normalized);
      setFoundOrder(findOrderByNumber(normalized));
      setRecentOrders(loadTrackedOrders());
    }
  }, [externalOrderNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeOrderNumber(orderInput);
    if (!normalized) return;
    setSearchedCode(normalized);
    setFoundOrder(findOrderByNumber(normalized));
  };

  const handleQuickLookup = (code: string) => {
    setOrderInput(code);
    setSearchedCode(code);
    setFoundOrder(findOrderByNumber(code));
  };

  const statusConfig = foundOrder ? getStatusConfig(foundOrder.status) : null;

  return (
    <section id="track" className="border-t border-white/10 py-14 lg:py-18 bg-[#07111E]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Right Search Column */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
              تتبع حالة الطلب
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
              أدخل رقم طلبك (مثال: <span className="font-mono-num text-slate-200" dir="ltr">DS-7390</span>) لمعرفة مرحلته الحالية سواء كان قيد التنفيذ أو تم التسليم.
            </p>

            <form onSubmit={handleSearch} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={orderInput}
                    onChange={(e) => setOrderInput(e.target.value)}
                    placeholder="أدخل رقم الطلب (مثال: DS-4821)"
                    aria-label="رقم الطلب"
                    dir="ltr"
                    className="w-full rounded-xl border border-white/15 bg-[#0D1B2E] py-3 pr-10 pl-4 font-mono-num text-sm text-white text-right placeholder:text-slate-500 focus:border-[#D9A74A] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9A74A] px-6 py-3 text-sm font-bold text-[#07111E] hover:bg-[#EAB95B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDE68A]"
                >
                  تتبع الطلب
                </button>
              </div>
            </form>

            {/* Quick lookup shortcuts */}
            <div className="mt-5 pt-5 border-t border-white/10">
              <span className="block text-xs text-slate-400 mb-2.5">
                أرقام طلبات للتجربة السريعة:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {recentOrders.slice(0, 4).map((ord) => (
                  <button
                    key={ord.orderNumber}
                    type="button"
                    onClick={() => handleQuickLookup(ord.orderNumber)}
                    dir="ltr"
                    className={`font-mono-num rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      searchedCode === ord.orderNumber
                        ? 'border-[#D9A74A] bg-[#D9A74A]/15 text-[#F6DDA4]'
                        : 'border-white/10 bg-[#0D1B2E] text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    #{ord.orderNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Display Panel */}
          <div className="lg:col-span-7">
            {!searchedCode ? (
              <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-8 sm:p-10 text-center">
                <PackageCheck
                  className="w-10 h-10 text-[#D9A74A] mx-auto mb-3"
                  aria-hidden="true"
                />
                <h3 className="font-display text-lg font-bold text-white">
                  جاهز للتحقق من طلبك
                </h3>
                <p className="text-sm text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
                  عند إتمام أي طلب عبر سلة الموقع تحصل على رقم مرجعي بصيغة{' '}
                  <span className="font-mono-num text-slate-200" dir="ltr">DS-XXXX</span>{' '}
                  يمكنك استخدامه هنا لمتابعة حالة التنفيذ.
                </p>
              </div>
            ) : !foundOrder ? (
              <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-8 text-center">
                <AlertCircle
                  className="w-10 h-10 text-amber-400 mx-auto mb-3"
                  aria-hidden="true"
                />
                <h3 className="font-display text-lg font-bold text-white">
                  لم يتم العثور على الطلب{' '}
                  <span className="font-mono-num text-[#F6DDA4]" dir="ltr">
                    #{searchedCode}
                  </span>
                </h3>
                <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  تأكد من كتابة رقم الطلب بشكل صحيح، أو تواصل معنا مباشرة عبر واتساب للتحقق الفوري من حالته.
                </p>
                <a
                  href={buildWhatsappUrl(
                    `السلام عليكم Dido Store، أرغب في الاستفسار عن حالة الطلب رقم #${searchedCode}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600/20 border border-emerald-500/35 px-4 py-2.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-600/30 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>الاستفسار عبر واتساب</span>
                </a>
              </div>
            ) : (
              statusConfig && (
                <div className="rounded-2xl border border-white/12 bg-[#0D1B2E] p-6 sm:p-7 space-y-6">
                  {/* Top Order Summary + Explicit Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <span>العميل: {foundOrder.customerName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{foundOrder.createdAt}</span>
                      </div>
                      <h3 className="font-display text-xl font-extrabold text-white">
                        الطلب{' '}
                        <span className="font-mono-num text-[#F6DDA4]" dir="ltr">
                          #{foundOrder.orderNumber}
                        </span>
                      </h3>
                    </div>

                    <div
                      className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-bold whitespace-nowrap shrink-0 ${statusConfig.containerClass}`}
                    >
                      <statusConfig.Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{statusConfig.label}</span>
                    </div>
                  </div>

                  {/* 3-Step Progress Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TRACKING_STEPS.map((step) => {
                      const reached = step.id <= statusConfig.stepIndex;
                      const isCurrent = step.id === statusConfig.stepIndex;
                      return (
                        <div
                          key={step.id}
                          className={`rounded-xl border p-3.5 transition-colors ${
                            isCurrent
                              ? 'border-[#D9A74A]/60 bg-[#D9A74A]/10'
                              : reached
                              ? 'border-emerald-500/30 bg-emerald-500/5'
                              : 'border-white/8 bg-[#07111E]/60 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-white">{step.title}</span>
                            {reached && (
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 ${
                                  isCurrent && foundOrder.status !== 'تم التسليم'
                                    ? 'text-[#D9A74A]'
                                    : 'text-emerald-400'
                                }`}
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Status Note & Items (No Prices) */}
                  <div className="rounded-xl border border-white/8 bg-[#07111E] p-4 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-200">{foundOrder.statusNote}</p>

                    <div className="border-t border-white/8 pt-3 space-y-2">
                      {foundOrder.items.map((item, idx) => (
                        <div
                          key={`${item.serviceTitle}-${idx}`}
                          className="flex flex-wrap items-center justify-between gap-2 text-xs"
                        >
                          <span className="font-semibold text-white">
                            {item.serviceTitle} — {item.packageLabel} (×{item.quantity})
                          </span>
                          <span className="font-mono-num text-slate-400" dir="ltr">
                            {item.targetAccount}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/8 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                      <span>وسيلة الدفع: {foundOrder.paymentMethod}</span>
                      <a
                        href={buildWhatsappUrl(
                          `السلام عليكم Dido Store، بخصوص الطلب رقم #${foundOrder.orderNumber} (${foundOrder.status})`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-emerald-300 hover:text-emerald-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>تواصل بخصوص هذا الطلب</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
