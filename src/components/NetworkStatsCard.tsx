import React, { useState, useEffect } from 'react';
import { Users, Globe2, Activity } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';

export const NetworkStatsCard: React.FC = () => {
  const { state } = useMining();
  const theme = THEME_CONFIGS[state.theme];

  const [networkMined, setNetworkMined] = useState(6262236.5726);
  const [onlineMiners, setOnlineMiners] = useState(95495);

  // Live simulation tick for total network mined
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkMined(prev => prev + 0.1428 + Math.random() * 0.05);
      if (Math.random() > 0.7) {
        setOnlineMiners(prev => prev + (Math.random() > 0.4 ? 1 : -1));
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Format number with Indian / International comma grouping style
  const formattedMined = networkMined.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  });

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-900/90 border ${theme.borderGlow} p-4 transition-all`}>
      {/* Background glow mesh */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${theme.badgeBg} blur-2xl pointer-events-none`} />

      <div className="relative z-10 flex flex-col gap-2">
        {/* Header row */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide text-slate-300">Total mined on network</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Users className="w-3.5 h-3.5" />
            <span className="font-mono-num text-slate-300 font-semibold">{onlineMiners.toLocaleString()}</span>
            <span>users</span>
          </div>
        </div>

        {/* Main metric string */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className={`text-2xl sm:text-3xl font-extrabold font-mono-num tracking-tight ${theme.textAccent}`}>
            {formattedMined}
          </span>
          <span className="text-sm font-bold text-slate-400 tracking-wider font-tech">
            ROYAL
          </span>
        </div>

        {/* Sub-bar: Network hash telemetry */}
        <div className="mt-1 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pool Efficiency: <strong className="text-slate-200">99.82%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Net Speed: <strong className="text-slate-200">142.8 EH/s</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
