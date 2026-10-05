import React from 'react';
import { Share2, ArrowUpRight } from 'lucide-react';

export const SocialChannelsCard: React.FC = () => {
  const channels = [
    {
      name: 'Telegram',
      url: 'https://t.me/RoyaltyVault',
      color: 'hover:text-[#26A69A] hover:bg-[#26A69A]/10 border-[#26A69A]/20',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.15-.31.3-.47.45l-4.59 4.31c-.13.12-.32.14-.47.05l-2.45-1.48c-.37-.23-.3-.79.13-.91l8.36-4.18c.37-.18.73.19.49.56z" />
        </svg>
      ),
      handle: '@RoyaltyVault_Global'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/RoyaltyVault',
      color: 'hover:text-[#E1306C] hover:bg-[#E1306C]/10 border-[#E1306C]/20',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      handle: '@royalty.vault'
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@RoyaltyVault',
      color: 'hover:text-[#00f2fe] hover:bg-[#00f2fe]/10 border-[#00f2fe]/20',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.53-4.01-1.46-.07-.06-.11-.07-.19-.01-.06.84-.07 1.68-.07 2.52 0 3.1-.96 6.22-3.41 7.82-2.5 1.68-6.11 1.95-8.68.32-2.71-1.68-4.04-5.26-3.13-8.32C3.8 7.37 7.07 4.7 10.45 5.17c.07.01.11-.02.11-.1V1c-.24-.03-.49-.07-.74-.07C5.14.93 1.01 5.03 1.01 10s4.04 9.07 9.07 9.07c4.61 0 8.44-3.48 8.97-8.01.07-1.92.05-3.85.05-5.77-.66.47-1.38.85-2.15 1.12-.89.31-1.85.45-2.8.41-.05-2.22-.04-4.44-.04-6.66l-.58-.14z" />
        </svg>
      ),
      handle: '@royaltyvault'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@RoyaltyVault',
      color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10 border-[#FF0000]/20',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
        </svg>
      ),
      handle: 'Royalty Vault TV'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/RoyaltyVault',
      color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10 border-[#1877F2]/20',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      handle: 'Royalty Vault Official'
    }
  ];

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl relative">
      <div className="flex items-center justify-between mb-4 border-b border-slate-850 pb-2.5">
        <h3 className="text-xs font-bold font-tech text-slate-300 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-amber-500" />
          <span>OFFICIAL COMMUNITY CHANNELS</span>
        </h3>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">
          Join Hub
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {channels.map((ch) => (
          <a
            key={ch.name}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850 transition-all active:scale-[0.98] ${ch.color}`}
          >
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                {ch.icon}
              </div>
              <div className="text-left">
                <div className="font-tech text-xs font-bold text-white">
                  {ch.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {ch.handle}
                </div>
              </div>
            </div>
            
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};
