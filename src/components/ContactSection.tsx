import React, { useState } from 'react';
import { Mail, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { STORE_CONTACT, buildWhatsappUrl } from '../data/services';

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard unsupported
    }
  };

  return (
    <section id="contact" className="border-t border-white/10 py-14 lg:py-18 bg-[#081423]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 3-Step Order Flow */}
        <div className="mb-14">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
            كيف تطلب من Dido Store؟
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mb-8">
            ثلاث خطوات واضحة من اختيار الباقة إلى استلام الشحن في حسابك.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-6">
              <span className="font-mono-num text-sm font-bold text-[#D9A74A]">01.</span>
              <h3 className="font-display text-lg font-bold text-white mt-2 mb-2">
                اختر الخدمة والباقة
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                حدّد اللعبة أو العملة أو خدمة Sponsor المطلوبة مع الباقة أو المبلغ المناسب لك بالدينار الجزائري.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-6">
              <span className="font-mono-num text-sm font-bold text-[#D9A74A]">02.</span>
              <h3 className="font-display text-lg font-bold text-white mt-2 mb-2">
                أدخل المعرف وطريقة الدفع
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                اكتب الـ Player ID أو عنوان المحفظة أو رابط الإعلان واختر الدفع عبر BaridiMob أو CCP أو Binance Pay.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-6">
              <span className="font-mono-num text-sm font-bold text-[#D9A74A]">03.</span>
              <h3 className="font-display text-lg font-bold text-white mt-2 mb-2">
                تأكيد وشحن فوري
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                أرسل وصل الطلب عبر واتساب أو الإيميل ليتم تفعيل الشحن مباشرة في حسابك خلال دقائق.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Contact Channels matching the uploaded image */}
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
            قنوات التواصل الرسمية
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mb-8">
            للطلبات الخاصة، تحويلات العملات المشفرة، أو استفسارات الإعلانات الممولة تواصل معنا مباشرة.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp / Phone */}
            <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-6 flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText('phone', STORE_CONTACT.phoneDisplay)}
                    aria-label="نسخ رقم واتساب"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:border-white/25 cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ</span>
                      </>
                    )}
                  </button>
                </div>
                <h3 className="text-sm font-medium text-slate-400">واتساب والهاتف المباشر</h3>
                <p className="font-mono-num text-xl font-bold text-white mt-1" dir="ltr">
                  {STORE_CONTACT.phoneDisplay}
                </p>
              </div>

              <a
                href={buildWhatsappUrl('السلام عليكم Dido Store، أرغب في التواصل معكم.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600/20 border border-emerald-500/35 px-4 py-2.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-600/30 transition-colors"
              >
                <span>مراسلة عبر واتساب</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-6 flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-sky-400" aria-hidden="true" />
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText('email', STORE_CONTACT.email)}
                    aria-label="نسخ البريد الإلكتروني"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:border-white/25 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ</span>
                      </>
                    )}
                  </button>
                </div>
                <h3 className="text-sm font-medium text-slate-400">البريد الإلكتروني الرسمي</h3>
                <p className="font-mono-num text-sm sm:text-base font-bold text-white mt-1 break-all" dir="ltr">
                  {STORE_CONTACT.email}
                </p>
              </div>

              <a
                href={`mailto:${STORE_CONTACT.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500/15 border border-sky-400/35 px-4 py-2.5 text-sm font-semibold text-sky-300 hover:bg-sky-500/25 transition-colors"
              >
                <span>إرسال بريد إلكتروني</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Snapchat */}
            <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-6 flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-yellow-400/15 border border-yellow-400/35 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path
                        d="M12 3c3.2 0 5.2 2.2 5.2 5.2 0 2.2 1 3.7 2.8 4.4-1 .9-2 1.4-3.2 1.7.3 1.3-.8 2.2-2.1 2-1-.2-1.6-.5-2.7-.5s-1.7.3-2.7.5c-1.3.2-2.4-.7-2.1-2-1.2-.3-2.2-.8-3.2-1.7 1.8-.7 2.8-2.2 2.8-4.4C6.8 5.2 8.8 3 12 3Z"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText('snap', STORE_CONTACT.snapchat)}
                    aria-label="نسخ حساب سناب شات"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:border-white/25 cursor-pointer"
                  >
                    {copiedField === 'snap' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ</span>
                      </>
                    )}
                  </button>
                </div>
                <h3 className="text-sm font-medium text-slate-400">حساب سناب شات (Snapchat)</h3>
                <p className="font-mono-num text-xl font-bold text-white mt-1" dir="ltr">
                  @{STORE_CONTACT.snapchat}
                </p>
              </div>

              <a
                href={`https://www.snapchat.com/add/${STORE_CONTACT.snapchat}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400/15 border border-yellow-400/35 px-4 py-2.5 text-sm font-semibold text-yellow-200 hover:bg-yellow-400/25 transition-colors"
              >
                <span>إضافة على سناب شات</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
