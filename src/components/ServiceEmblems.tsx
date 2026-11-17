import React from 'react';

export function NetworkMesh({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="1">
        <path d="M18 34 L108 14 L182 88 L94 128 Z" />
        <path d="M108 14 L244 46 L182 88" />
        <path d="M244 46 L338 18 L296 120 L182 88" />
        <path d="M94 128 L182 88 L216 196 L86 218 Z" />
        <path d="M216 196 L296 120 L342 224 L216 196" />
        <path d="M18 34 L42 152 L94 128" />
        <path d="M42 152 L86 218 L22 258" />
      </g>
      <g fill="#38BDF8" fillOpacity="0.45">
        <circle cx="18" cy="34" r="2.5" />
        <circle cx="108" cy="14" r="2.5" />
        <circle cx="182" cy="88" r="3" />
        <circle cx="94" cy="128" r="2.5" />
        <circle cx="244" cy="46" r="2.5" />
        <circle cx="338" cy="18" r="2" />
        <circle cx="296" cy="120" r="2.5" />
        <circle cx="216" cy="196" r="2.5" />
        <circle cx="86" cy="218" r="2" />
      </g>
    </svg>
  );
}

export function ServiceEmblem({ serviceId }: { serviceId: string }) {
  switch (serviceId) {
    case 'pubg-mobile':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#1A1508] border border-[#F59E0B]/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <rect x="4" y="8" width="28" height="20" rx="3" stroke="#F59E0B" strokeWidth="2" />
            <path d="M12 14v8M24 14v8M16 14h4v8h-4z" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 'free-fire':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#1F0B0B] border border-[#EF4444]/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <path
              d="M18 5c2.5 5 8 7.5 8 14a8 8 0 1 1-16 0c0-3.2 1.5-5.8 3.2-8 .4 2.3 1.7 3.5 3.3 3.5 0-3.5.7-6.8 1.5-9.5Z"
              stroke="#F87171"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M18 27l-3.5-4.5h7L18 27Z" fill="#FCA5A5" />
          </svg>
        </div>
      );
    case 'redotpay':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#210913] border border-[#E11D48]/40 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <rect x="4" y="9" width="28" height="18" rx="3" stroke="#FB7185" strokeWidth="2" />
            <path d="M4 15h28" stroke="#E11D48" strokeWidth="2" />
            <circle cx="25" cy="21" r="2.2" fill="#FDA4AF" />
          </svg>
        </div>
      );
    case 'crypto-exchange':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#191409] border border-[#D9A74A]/40 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <circle cx="18" cy="18" r="11" stroke="#D9A74A" strokeWidth="2" />
            <path
              d="M15 12v12M15 13h4.5a2.5 2.5 0 0 1 0 5H15m0 0h5a2.5 2.5 0 0 1 0 5H15"
              stroke="#FDE68A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    case 'sponsor-ads':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#0A1D2E] border border-[#38BDF8]/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <path
              d="M7 15v6h5l9 5V10l-9 5H7Z"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M25 14.5a5 5 0 0 1 0 7M28 11.5a9 9 0 0 1 0 13" stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'netflix':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#1E0808] border border-[#DC2626]/40 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <path d="M11 27V9h3.8l6.4 13.5V9H25v18h-3.8L14.8 13.5V27H11Z" fill="#EF4444" />
          </svg>
        </div>
      );
    case 'tiktok-services':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#0B1B22] border border-[#22D3EE]/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <path
              d="M21 8v12.5a4.5 4.5 0 1 1-3.5-4.4"
              stroke="#22D3EE"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path d="M21 10c1.5 2.3 3.7 3.5 6 3.5" stroke="#FB7185" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'other-games':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#091A2B] border border-[#38BDF8]/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <rect x="6" y="11" width="24" height="14" rx="6" stroke="#38BDF8" strokeWidth="2" />
            <path d="M12 15v6M9 18h6" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
            <circle cx="23" cy="16.5" r="1.4" fill="#FDE68A" />
            <circle cx="26" cy="19.5" r="1.4" fill="#38BDF8" />
          </svg>
        </div>
      );
    case 'ai-tools':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#071F19] border border-emerald-400/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <path
              d="M18 6l2.8 6.8L28 15.5l-5.5 4.8 1.6 7.2L18 23.8l-6.1 3.7 1.6-7.2L8 15.5l7.2-2.7L18 6Z"
              stroke="#34D399"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    case 'streaming-iptv':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#18102B] border border-violet-400/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <rect x="5" y="9" width="26" height="17" rx="3" stroke="#A78BFA" strokeWidth="2" />
            <path d="M15.5 14.2v6.6l6-3.3-6-3.3Z" fill="#DDD6FE" />
            <path d="M13 29h10" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'gift-cards':
      return (
        <div className="w-12 h-12 rounded-xl bg-[#12132B] border border-indigo-400/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <rect x="5" y="10" width="26" height="16" rx="3" stroke="#818CF8" strokeWidth="2" />
            <path d="M5 15h26M15 10v16" stroke="#C7D2FE" strokeWidth="1.8" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 rounded-xl bg-[#1C1A09] border border-[#FACC15]/35 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
            <path
              d="M18 8c4 0 6.5 2.7 6.5 6.5 0 2.7 1.3 4.5 3.5 5.3-1.2 1.1-2.5 1.7-4 2.1.4 1.6-1 2.7-2.6 2.5-1.2-.2-2-.6-3.4-.6s-2.2.4-3.4.6c-1.6.2-3-.9-2.6-2.5-1.5-.4-2.8-1-4-2.1 2.2-.8 3.5-2.6 3.5-5.3C11.5 10.7 14 8 18 8Z"
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
  }
}
