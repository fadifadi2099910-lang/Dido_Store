import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ServiceCategory } from '../data/services';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: 'all' | ServiceCategory) => void;
}

export function Header({ cartCount, onOpenCart, onSelectCategory }: HeaderProps) {
  const handleNavClick = (category: 'all' | ServiceCategory) => {
    onSelectCategory(category);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07111E]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 h-16">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#hero"
          className="font-display text-xl font-extrabold tracking-tight gold-metallic-text whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A74A] rounded"
        >
          Dido Store
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#catalog"
            onClick={() => handleNavClick('all')}
            className="hover:text-[#F6DDA4] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D9A74A]/60"
          >
            الخدمات
          </a>
          <a
            href="#catalog"
            onClick={() => handleNavClick('games')}
            className="hover:text-[#F6DDA4] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D9A74A]/60"
          >
            شحن الألعاب
          </a>
          <a
            href="#track"
            className="hover:text-[#F6DDA4] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D9A74A]/60"
          >
            تتبع الطلب
          </a>
          <a
            href="#contact"
            className="hover:text-[#F6DDA4] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D9A74A]/60"
          >
            تواصل معنا
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#D9A74A] px-4 py-2 text-sm font-semibold text-[#07111E] hover:bg-[#EAB95B] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDE68A]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>سلة الطلبات</span>
            <span className="font-mono-num inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-[#07111E]/15 px-1.5 text-xs font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
