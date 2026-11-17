import React from 'react';
import { STORE_CONTACT } from '../data/services';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060E19] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold gold-metallic-text">
            {STORE_CONTACT.brandArabic}
          </span>
          <span aria-hidden="true">·</span>
          <span>{STORE_CONTACT.tagline}</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-white transition-colors whitespace-nowrap">
            الرئيسية
          </a>
          <a href="#catalog" className="hover:text-white transition-colors whitespace-nowrap">
            الخدمات
          </a>
          <a href="#track" className="hover:text-white transition-colors whitespace-nowrap">
            تتبع الطلب
          </a>
          <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap">
            تواصل معنا
          </a>
        </div>
      </div>
    </footer>
  );
}
