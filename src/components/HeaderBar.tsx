import React from 'react';
import { LayoutGrid, ChevronRight, Flame, Sparkles, Crown, User, UserCheck } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';

export const HeaderBar: React.FC = () => {
  const { state, setShowStreakModal, setShowAiAdvisor, setShowAuthModal, currentUser } = useMining();
  const theme = THEME_CONFIGS[state.theme];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0b0c10]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl ${theme.badgeBg} border ${theme.border} flex items-center justify-center font-bold text-amber-400 shadow-md shadow-amber-500/10`}>
            <Crown className="w-5 h-5 text-amber-400 fill-amber-400/20" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold font-tech tracking-tight text-white">
                Royalty Vault
              </span>
              <span className="text-[10px] font-semibold font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                PRO
              </span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          
          {/* Auth Account Button */}
          <button
            onClick={() => setShowAuthModal(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all active:scale-95 ${
              currentUser
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
            }`}
            title={currentUser ? `Logged in as ${currentUser.username}` : 'Login / Register Mining Node'}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 shrink-0" />
            <span className="text-xs font-bold font-tech truncate max-w-[80px] sm:max-w-[100px]">
              {currentUser ? currentUser.username : 'LOGIN'}
            </span>
          </button>

          {/* Daily Streak Button */}
          <button
            onClick={() => setShowStreakModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-medium text-amber-400 hover:bg-amber-500/20 transition-all active:scale-95"
            title="Daily Streak Protocol"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span className="font-mono-num font-semibold">{state.streakDays}d</span>
          </button>

          {/* AI Advisor / Diagnostics */}
          <button
            onClick={() => setShowAiAdvisor(true)}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-600 transition-all active:scale-95"
            title="AI Mining Optimizer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Mining Speed Rate Pill */}
          <button
            onClick={() => setShowAiAdvisor(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.badgeBg} border ${theme.border} text-xs font-semibold ${theme.textAccent} hover:brightness-125 transition-all`}
          >
            <span className="font-mono-num font-bold">24 ROYAL/day</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-70" />
          </button>

        </div>

      </div>
    </header>
  );
};
