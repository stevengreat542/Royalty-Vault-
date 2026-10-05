import React, { useState } from 'react';
import { Wallet, Zap, Users, Clock, Battery, ArrowRightLeft, Sparkles, RefreshCw, QrCode } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';

export const MiningBalanceCard: React.FC = () => {
  const {
    state,
    activeMultiplier,
    rechargeBattery,
    setActiveTab,
    setShowDepositModal,
    openToBtcRate
  } = useMining();

  const theme = THEME_CONFIGS[state.theme];
  const [showBtcPrimary, setShowBtcPrimary] = useState(false);

  // Format countdown timer (HH:MM:SS)
  const getRemainingTimeString = () => {
    if (!state.isSessionActive || !state.sessionEndTime) return '00:00:00';
    const diff = Math.max(0, state.sessionEndTime - Date.now());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formattedOpen = state.openBalance.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  });

  const formattedBtc = state.btcBalance.toFixed(8);

  return (
    <div className={`relative rounded-2xl bg-slate-900/90 border ${theme.borderGlow} p-4 transition-all flex flex-col gap-3`}>
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.badgeBg} border ${theme.border} flex items-center justify-center p-1.5`}>
            {/* OpenCore Badge SVG */}
            <svg className="w-full h-full text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12M6 12h12" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <span>Mining balance</span>
              <button 
                onClick={() => setShowBtcPrimary(!showBtcPrimary)}
                className="text-slate-500 hover:text-amber-400 transition-colors p-0.5"
                title="Toggle Primary View"
              >
                <ArrowRightLeft className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex items-baseline gap-2 mt-0.5">
              {!showBtcPrimary ? (
                <>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono-num text-white tracking-tight">
                    {formattedOpen}
                  </span>
                  <span className={`text-sm font-bold font-tech ${theme.textAccent}`}>
                    ROYAL
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono-num text-amber-400 tracking-tight">
                    {formattedBtc}
                  </span>
                  <span className="text-sm font-bold font-tech text-amber-500">
                    BTC
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowDepositModal(true)}
            className="px-2.5 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-all text-xs font-bold font-tech flex items-center gap-1.5 active:scale-95 shadow-md"
            title="Buy Hashrate via Crypto Wallet"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">BUY HASHRATE</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`w-10 h-10 rounded-2xl bg-slate-800 border ${theme.border} flex items-center justify-center ${theme.textAccent} hover:brightness-125 transition-all shadow-md active:scale-95`}
            title="Open Wallet"
          >
            <Wallet className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Battery / Energy Bar */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Battery className="w-3.5 h-3.5 text-amber-400" />
            <span>Energy Vault ({Math.round(state.batteryPercent)}%)</span>
          </span>
          {state.batteryPercent < 100 && (
            <button
              onClick={rechargeBattery}
              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline underline-offset-2"
            >
              <RefreshCw className="w-3 h-3 animate-spin-slow" />
              Recharge 100%
            </button>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-3 rounded-full bg-slate-800 border border-slate-700/60 p-0.5 overflow-hidden relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] relative"
            style={{ width: `${Math.max(2, state.batteryPercent)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Triple Stat Badges */}
      <div className="grid grid-cols-3 gap-2 mt-1">
        {/* Multiplier */}
        <button
          onClick={() => setActiveTab('rigs')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 text-xs font-medium text-slate-200 transition-all active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
          <span className="font-mono-num font-bold text-amber-300">{activeMultiplier.toFixed(2)}x</span>
        </button>

        {/* Squad members */}
        <button
          onClick={() => setActiveTab('team')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 text-xs font-medium text-slate-200 transition-all active:scale-95"
        >
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono-num font-bold">{state.teamMembers.length}</span>
        </button>

        {/* Countdown timer */}
        <div className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono-num font-bold text-slate-100">{getRemainingTimeString()}</span>
        </div>
      </div>

      {/* Secondary BTC Asset Bar */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
            ₿
          </div>
          <span className="font-semibold text-slate-300">Bitcoin (BTC)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono-num font-bold text-amber-400">{formattedBtc}</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold tracking-wider uppercase">
            Live
          </span>
        </div>
      </div>

    </div>
  );
};
