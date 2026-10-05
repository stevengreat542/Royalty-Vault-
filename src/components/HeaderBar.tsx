import React from 'react';
import { LayoutGrid, ChevronRight, Flame, Sparkles, Crown, User, UserCheck } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';
import logoImg from '../assets/images/royalty_vault_logo_new_1791166309923.jpg';

export const HeaderBar: React.FC = () => {
  const { state, setShowStreakModal, setShowAiAdvisor, setShowAuthModal, currentUser } = useMining();
  const theme = THEME_CONFIGS[state.theme];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0b0c10]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Circular Crown Logo Container */}
          <div className="w-10 h-10 rounded-full border border-amber-500 overflow-hidden shadow-md shadow-amber-500/20 shrink-0">
            <img 
              src={logoImg} 
              alt="Royalty Sovereign Vault Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Stacked Text */}
          <div className="flex flex-col -space-y-0.5 leading-none shrink-0">
            <span className="text-[14px] sm:text-base font-black font-tech tracking-wider text-white uppercase">
              Royalty
            </span>
            <span className="text-[14px] sm:text-base font-black font-tech tracking-wider text-white uppercase">
              Vault
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Auth Account Button (Golden border, golden text, rounded-full) */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500 bg-[#0b0c10] text-amber-500 hover:bg-amber-500/10 transition-all active:scale-95 shrink-0"
            title={currentUser ? `Logged in as ${currentUser.username}` : 'Login / Register Mining Node'}
          >
            <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 shrink-0" />
            <span className="text-xs font-bold font-tech text-amber-500 shrink-0 leading-none">
              {currentUser ? currentUser.username : 'LOGIN'}
            </span>
          </button>

          {/* Daily Streak Button (Golden border, golden text, rounded-full) */}
          <button
            onClick={() => setShowStreakModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500 bg-[#0b0c10] text-amber-500 hover:bg-amber-500/10 transition-all active:scale-95 shrink-0"
            title="Daily Streak Protocol"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
            <span className="font-mono-num font-bold text-xs text-amber-500 leading-none">{state.streakDays}d</span>
          </button>

        </div>

      </div>
    </header>
  );
};
