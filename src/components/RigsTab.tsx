import React from 'react';
import { Cpu, Zap, Flame, Bot, Sparkles, Droplets, Sun, ChevronUp, Lock, QrCode, Wallet } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';

export const RigsTab: React.FC = () => {
  const {
    state,
    upgradeRig,
    activateBooster,
    totalHashRateGHs,
    activeMultiplier,
    setShowDepositModal
  } = useMining();

  const theme = THEME_CONFIGS[state.theme];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-amber-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-blue-400" />;
      case 'Sun': return <Sun className="w-6 h-6 text-amber-300" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <Cpu className="w-6 h-6 text-amber-400" />;
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      case 'Epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'Rare':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-8 animate-fade-in">
      
      {/* Top Banner: Total Hashing Capacity */}
      <div className={`relative overflow-hidden rounded-2xl bg-slate-900 border ${theme.borderGlow} p-5`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Global Node Hash Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold font-mono-num text-white">
                {(totalHashRateGHs / 1000).toFixed(2)}
              </span>
              <span className={`text-base font-bold font-tech ${theme.textAccent}`}>
                TH/s
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium">Active Boost</span>
            <div className="text-2xl font-extrabold font-mono-num text-amber-400 mt-1">
              {activeMultiplier.toFixed(2)}x
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowDepositModal(true)}
          className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold font-tech text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4 text-slate-950" />
          <span>INSTANT UPGRADE HASHRATE (CRYPTO WALLET DIRECT)</span>
        </button>
      </div>

      {/* Overclock Boosters */}
      <div>
        <h3 className="text-sm font-bold font-tech text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Quantum Power Boosters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {state.boosters.map(booster => {
            const isActive = booster.activeUntil && booster.activeUntil > Date.now();
            const canAfford = state.openBalance >= booster.costOPEN;

            return (
              <div
                key={booster.id}
                className={`rounded-2xl bg-slate-900 border p-3 flex flex-col justify-between gap-3 ${
                  isActive ? 'border-amber-500/60 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                      {getIcon(booster.icon)}
                    </div>
                    <span className="text-xs font-bold font-mono text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                      {booster.multiplier}x BOOST
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-2 font-tech">
                    {booster.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {booster.description}
                  </p>
                </div>

                {isActive ? (
                  <div className="py-2 px-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-center text-xs font-bold text-amber-300 font-mono">
                    ACTIVE NOW
                  </div>
                ) : (
                  <button
                    onClick={() => activateBooster(booster.id)}
                    disabled={!canAfford}
                    className={`w-full py-2 px-3 rounded-xl font-bold font-tech text-xs transition-all flex items-center justify-center gap-1.5 ${
                      canAfford
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-500 border border-slate-700/80 cursor-not-allowed'
                    }`}
                  >
                    <span>Activate for {booster.costOPEN} ROYAL</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hardware Rig Workshop */}
      <div>
        <h3 className="text-sm font-bold font-tech text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Hardware Mining Rigs</span>
        </h3>

        <div className="flex flex-col gap-3">
          {state.rigs.map(rig => {
            const upgradeCost = rig.costOPEN * (rig.level + 1);
            const canAfford = state.openBalance >= upgradeCost;

            return (
              <div
                key={rig.id}
                className={`rounded-2xl bg-slate-900 border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  rig.unlocked ? 'border-slate-800' : 'border-slate-800/60 opacity-80'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0">
                    {getIcon(rig.icon)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white font-tech">
                        {rig.name}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getRarityBadge(rig.rarity)}`}>
                        {rig.rarity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5">
                      {rig.subtitle} · <span className="text-amber-400 font-mono font-bold">+{rig.hashRateGHs * Math.max(1, rig.level)} GH/s</span>
                    </p>

                    <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                      {rig.description}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0 shrink-0">
                  <div className="text-xs text-slate-400 mb-1">
                    Level <span className="font-mono font-bold text-white">{rig.level}/{rig.maxLevel}</span>
                  </div>

                  {rig.level < rig.maxLevel ? (
                    <button
                      onClick={() => upgradeRig(rig.id)}
                      disabled={!canAfford}
                      className={`py-2 px-4 rounded-xl font-bold font-tech text-xs transition-all flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 hover:brightness-110 active:scale-95 shadow-md shadow-amber-500/20'
                          : 'bg-slate-800 text-slate-500 border border-slate-700/80 cursor-not-allowed'
                      }`}
                    >
                      <ChevronUp className="w-4 h-4" />
                      <span>Upgrade ({upgradeCost} ROYAL)</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      MAX LEVEL
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
