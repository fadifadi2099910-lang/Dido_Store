import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, ArrowLeft, Heart, Bell, BellRing } from 'lucide-react';
import {
  CATEGORY_TABS,
  RestockAlert,
  SERVICES,
  ServiceCategory,
  StoreService,
} from '../data/services';
import { ServiceEmblem } from './ServiceEmblems';

export type CatalogFilter = 'all' | 'offers' | 'favorites' | ServiceCategory;

interface CatalogSectionProps {
  activeCategory: CatalogFilter;
  onSelectCategory: (category: CatalogFilter) => void;
  onSelectService: (service: StoreService) => void;
  favoriteIds: string[];
  onToggleFavorite: (serviceId: string) => void;
  restockAlerts: RestockAlert[];
}

export function CatalogSection({
  activeCategory,
  onSelectCategory,
  onSelectService,
  favoriteIds,
  onToggleFavorite,
  restockAlerts,
}: CatalogSectionProps) {
  const [query, setQuery] = useState('');

  const filteredServices = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'offers'
          ? Boolean(service.hasActiveOffer)
          : activeCategory === 'favorites'
          ? favoriteIds.includes(service.id)
          : service.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalized) return true;
      return (
        service.title.toLowerCase().includes(normalized) ||
        service.englishName.toLowerCase().includes(normalized) ||
        service.shortDesc.toLowerCase().includes(normalized) ||
        service.categoryLabel.toLowerCase().includes(normalized) ||
        service.packages.some((p) => p.label.toLowerCase().includes(normalized))
      );
    });
  }, [activeCategory, favoriteIds, query]);

  return (
    <section id="catalog" className="py-14 lg:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header + Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              كتالوج الخدمات والباقات
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              اختر الخدمة المناسبة لعرض الباقات والعروض الحالية، أو احفظ خدماتك المعتادة في المفضلة للوصول السريع.
            </p>
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن لعبة، ChatGPT، IPTV..."
              aria-label="ابحث في الخدمات"
              className="w-full rounded-lg border border-white/12 bg-[#0D1B2E] py-2.5 pr-10 pl-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#D9A74A] focus:outline-none"
            />
          </div>
        </div>

        {/* Segmented Category Filter Tabs + Favorites Tab */}
        <div
          role="tablist"
          aria-label="تصنيفات الخدمات"
          className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#0D1B2E] border border-white/8 p-1.5 mb-8"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A74A] ${
                  isActive
                    ? 'bg-[#D9A74A] text-[#07111E]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'favorites'}
            onClick={() => onSelectCategory('favorites')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A74A] ${
              activeCategory === 'favorites'
                ? 'bg-[#D9A74A] text-[#07111E]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 shrink-0 ${
                activeCategory === 'favorites'
                  ? 'fill-[#07111E] text-[#07111E]'
                  : favoriteIds.length > 0
                  ? 'fill-rose-400 text-rose-400'
                  : ''
              }`}
              aria-hidden="true"
            />
            <span>المفضلة</span>
            <span className="font-mono-num text-xs opacity-80">({favoriteIds.length})</span>
          </button>
        </div>

        {/* 3-Column Service Grid */}
        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0D1B2E] p-12 text-center">
            {activeCategory === 'favorites' && !query.trim() ? (
              <>
                <Heart className="w-8 h-8 text-slate-500 mx-auto mb-3" aria-hidden="true" />
                <p className="text-base font-semibold text-white">قائمة المفضلة فارغة حالياً</p>
                <p className="text-sm text-slate-400 mt-1 mb-5">
                  اضغط على أيقونة القلب في أي خدمة لحفظها هنا والوصول إليها بسرعة لاحقاً.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectCategory('all')}
                  className="rounded-lg bg-[#D9A74A] px-4 py-2 text-sm font-semibold text-[#07111E] hover:bg-[#EAB95B] cursor-pointer"
                >
                  تصفح جميع الخدمات
                </button>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-8 h-8 text-slate-500 mx-auto mb-3" aria-hidden="true" />
                <p className="text-base font-semibold text-white">لم يتم العثور على خدمات مطابقة</p>
                <p className="text-sm text-slate-400 mt-1 mb-5">
                  جرّب البحث بكلمة أخرى أو اعرض جميع التصنيفات.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    onSelectCategory('all');
                  }}
                  className="rounded-lg bg-[#D9A74A] px-4 py-2 text-sm font-semibold text-[#07111E] hover:bg-[#EAB95B] cursor-pointer"
                >
                  عرض جميع الخدمات
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isFavorite = favoriteIds.includes(service.id);
              const isOutOfStock = service.inStock === false;
              const hasAlert = restockAlerts.some((a) => a.serviceId === service.id);

              return (
                <article
                  key={service.id}
                  className={`group flex flex-col justify-between rounded-2xl border p-6 transition-transform duration-150 hover:-translate-y-0.5 ${
                    isOutOfStock
                      ? 'border-amber-500/20 bg-[#0D1B2E]/85 hover:border-amber-400/45'
                      : 'border-white/10 bg-[#0D1B2E] hover:border-[#D9A74A]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <ServiceEmblem serviceId={service.id} />
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-num text-xs text-slate-400" dir="ltr">
                          {service.packages.length} باقات
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(service.id)}
                          aria-pressed={isFavorite}
                          aria-label={
                            isFavorite
                              ? `إزالة ${service.title} من المفضلة`
                              : `حفظ ${service.title} في المفضلة`
                          }
                          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A74A] ${
                            isFavorite
                              ? 'border-rose-500/40 bg-rose-500/15 text-rose-400 hover:bg-rose-500/25'
                              : 'border-white/10 bg-[#07111E] text-slate-400 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Clean unboxed metadata kicker */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{service.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className={isOutOfStock ? 'text-amber-300 font-medium' : ''}>
                        {service.deliveryTime}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-2 mb-3">
                      {service.shortDesc}
                    </p>

                    {service.offerSummary && (
                      <p className="text-xs font-medium text-[#D9A74A] mb-5">
                        {service.offerSummary}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/8 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[11px] text-slate-400">
                        {isOutOfStock ? 'التوفر' : 'التسعير'}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          isOutOfStock ? 'text-amber-300' : 'text-[#F6DDA4]'
                        }`}
                      >
                        {isOutOfStock ? 'غير متوفر حالياً' : 'حسب الباقة المختارة'}
                      </span>
                    </div>

                    {isOutOfStock ? (
                      <button
                        type="button"
                        onClick={() => onSelectService(service)}
                        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A74A] ${
                          hasAlert
                            ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                            : 'border-amber-400/35 bg-amber-400/10 text-amber-200 hover:bg-amber-400 hover:text-[#07111E]'
                        }`}
                      >
                        {hasAlert ? (
                          <>
                            <BellRing className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>تم تفعيل التنبيه</span>
                          </>
                        ) : (
                          <>
                            <Bell className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>تنبيه عند التوفر</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectService(service)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#152842] border border-[#D9A74A]/30 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#F6DDA4] hover:bg-[#D9A74A] hover:text-[#07111E] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A74A]"
                      >
                        <span>اختيار الباقة</span>
                        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
