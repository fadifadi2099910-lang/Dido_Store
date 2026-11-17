import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Zap, CreditCard, Headphones } from 'lucide-react';
import { STORE_CONTACT, buildWhatsappUrl } from '../data/services';
import { NetworkMesh } from './ServiceEmblems';

export function Hero() {
  const [imgError, setImgError] = useState(false);

  const directWhatsappHref = buildWhatsappUrl(
    'السلام عليكم Dido Store، أرغب في الاستفسار عن باقات الشحن والخدمات الرقمية.'
  );

  return (
    <section id="hero" className="relative overflow-hidden border-b border-white/10">
      {/* Subtle corner geometric network inspired by the brand banner */}
      <NetworkMesh className="pointer-events-none absolute -top-6 -left-10 w-72 h-56 opacity-70" />
      <NetworkMesh className="pointer-events-none absolute -bottom-10 -right-10 w-72 h-56 opacity-50 rotate-180" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Primary Editorial / Storefront Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#D9A74A] tracking-wide mb-3">
              {STORE_CONTACT.tagline}
            </p>

            <h1
              className="font-display font-extrabold leading-[1.2] text-white mb-5"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                textWrap: 'balance',
              }}
            >
              <span className="gold-metallic-text">Dido Store</span> للشحن الفوري والمضمون
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              وجهتك الموثوقة في الجزائر لشحن شدات <span className="text-white font-medium">PUBG Mobile</span> وجواهر{' '}
              <span className="text-white font-medium">Free Fire</span>، وتفعيل بطاقات{' '}
              <span className="text-white font-medium">Redotpay</span>، وتبادل العملات المشفرة{' '}
              <span className="text-white font-medium">USDT / Crypto</span>، وإطلاق حملات{' '}
              <span className="text-white font-medium">Sponsor</span> الممولة.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D9A74A] px-6 py-3 text-sm font-bold text-[#07111E] hover:bg-[#EAB95B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDE68A]"
              >
                <span>تصفح الباقات والخدمات</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={directWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#0D1B2E] px-5 py-3 text-sm font-semibold text-slate-100 hover:border-[#D9A74A]/60 hover:text-[#F6DDA4] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A74A]"
              >
                <span>طلب مباشر عبر واتساب</span>
              </a>
            </div>
          </div>

          {/* Showcase Media Column featuring the user's attached Dido Store visual */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full overflow-hidden rounded-2xl border border-[#D9A74A]/25 bg-[#0A1626] min-h-[260px] lg:min-h-full">
              {!imgError ? (
                <>
                  <img
                    src="/assets/aistudio/t_l_chargement_8485ebca.jpg"
                    alt="Dido Store للشحن — الخدمات الرقمية وشحن الألعاب والعملات المشفرة"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111E]/75 via-transparent to-[#07111E]/15"
                  />
                  <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-4 text-xs text-slate-200">
                    <span className="font-medium">خدمة فورية عبر الـ ID أو المحفظة</span>
                    <span className="font-mono-num text-[#F6DDA4] font-semibold" dir="ltr">
                      {STORE_CONTACT.phoneDisplay}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#0D1B2E] to-[#07111E]">
                  <span className="font-display text-3xl font-extrabold gold-metallic-text mb-2">
                    Dido Store للشحن
                  </span>
                  <span className="text-sm text-slate-300">{STORE_CONTACT.tagline}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Trust & Payment Strip below the hero split */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/10 pt-8">
          <div className="flex items-start gap-3.5 rounded-xl bg-[#0D1B2E] border border-white/8 p-4">
            <Zap className="w-5 h-5 text-[#D9A74A] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-white">شحن سريع ومباشر</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                تنفيذ أغلب طلبات الألعاب والعملات خلال 5 إلى 15 دقيقة.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl bg-[#0D1B2E] border border-white/8 p-4">
            <CreditCard className="w-5 h-5 text-[#D9A74A] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-white">دفع محلي مرن</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                الدفع عبر BaridiMob و CCP أو التحويل عبر Binance Pay.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl bg-[#0D1B2E] border border-white/8 p-4">
            <ShieldCheck className="w-5 h-5 text-[#D9A74A] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-white">ضمان كامل على الحساب</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                شحن رسمي بالآيدي أو التحويل المباشر دون طلب كلمة السر.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl bg-[#0D1B2E] border border-white/8 p-4">
            <Headphones className="w-5 h-5 text-[#D9A74A] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-white">مرافقة ودعم مباشر</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                تواصل فوري عبر واتساب وسناب شات لمتابعة طلبك خطوة بخطوة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
