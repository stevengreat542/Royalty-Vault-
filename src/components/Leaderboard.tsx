import React, { useState } from 'react';
import { Trophy, Zap, ShieldAlert, ArrowUp, Sparkles, ChevronRight, Award } from 'lucide-react';
import { useMining } from '../context/MiningContext';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  hashRateGHs: number;
  totalMined: number;
  isCurrentUser?: boolean;
  country: string;
  badge?: string;
}

export const Leaderboard: React.FC = () => {
  const { totalHashRateGHs, state, setShowDepositModal } = useMining();
  const [timeframe, setTimeframe] = useState<'weekly' | 'allTime'>('weekly');

  // Generate top miners data with user injected at dynamic rank based on hash power
  const baseLeaderboard: LeaderboardUser[] = [
    { rank: 1, name: 'Satoshi_Whale_X', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', hashRateGHs: 85000, totalMined: 4820.50, country: '🇺🇸', badge: '🥇 Apex Node' },
    { rank: 2, name: 'Cyber_Matrix_99', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', hashRateGHs: 62000, totalMined: 3190.25, country: '🇩🇪', badge: '🥈 Master Node' },
    { rank: 3, name: 'Nakamoto_Rig', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', hashRateGHs: 48000, totalMined: 2410.80, country: '🇯🇵', badge: '🥉 Hydro Node' },
    { rank: 4, name: 'Quantum_Vault_07', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80', hashRateGHs: 32000, totalMined: 1850.40, country: '🇸🇬' },
    { rank: 5, name: 'Crypto_Dyson_X', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', hashRateGHs: 21000, totalMined: 1220.10, country: '🇬🇧' },
    { rank: 6, name: 'Alpha_Miner_Pro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', hashRateGHs: 14500, totalMined: 890.75, country: '🇨🇦' },
    { rank: 7, name: 'Block_Master_42', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', hashRateGHs: 9800, totalMined: 540.30, country: '🇫🇷' },
    { rank: 8, name: 'Nebula_Cloud_88', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', hashRateGHs: 6400, totalMined: 320.15, country: '🇦🇺' }
  ];

  // User item
  const currentUserItem: LeaderboardUser = {
    rank: 0, // dynamic
    name: state.username || 'Royalty Vault',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    hashRateGHs: totalHashRateGHs,
    totalMined: state.openBalance,
    isCurrentUser: true,
    country: '🌐',
    badge: '⚡ You'
  };

  // Insert user based on hashRateGHs
  const allEntries = [...baseLeaderboard];
  let userInserted = false;
  
  for (let i = 0; i < allEntries.length; i++) {
    if (currentUserItem.hashRateGHs >= allEntries[i].hashRateGHs) {
      allEntries.splice(i, 0, currentUserItem);
      userInserted = true;
      break;
    }
  }
  if (!userInserted) {
    allEntries.push(currentUserItem);
  }

  // Assign ranks
  const rankedLeaderboard = allEntries.map((item, idx) => ({
    ...item,
    rank: idx + 1
  }));

  const userRankData = rankedLeaderboard.find(item => item.isCurrentUser) || {
    rank: rankedLeaderboard.length,
    hashRateGHs: totalHashRateGHs,
    totalMined: state.openBalance
  };

  // Find next rank target
  const nextTarget = rankedLeaderboard.find(item => item.rank === userRankData.rank - 1);
  const hashNeeded = nextTarget ? Math.max(0, nextTarget.hashRateGHs - userRankData.hashRateGHs + 100) : 0;

  return (
    <div className="flex flex-col gap-4 animate-fade-in">

      {/* Season Prize Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border border-amber-500/40 p-4">
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-tech">Season 4 Hash Sprint</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">LIVE</span>
              </div>
              <h4 className="text-sm font-extrabold text-white font-tech mt-0.5">
                Top 3 Miners Share 50,000 ROYAL
              </h4>
            </div>
          </div>

          <button
            onClick={() => setShowDepositModal(true)}
            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs font-tech transition-all shrink-0 active:scale-95 shadow-md shadow-amber-500/20 flex items-center gap-1"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>BOOST RANK</span>
          </button>
        </div>
      </div>

      {/* User Rank Card */}
      <div className="rounded-2xl bg-slate-900 border border-cyan-500/40 p-3.5 flex items-center justify-between shadow-lg shadow-cyan-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-extrabold text-slate-950 text-base font-tech shadow-md">
            #{userRankData.rank}
          </div>
          <div>
            <div className="text-xs font-bold text-white font-tech flex items-center gap-1.5">
              <span>Your Vault Rank</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">You</span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              {userRankData.hashRateGHs >= 1000 
                ? `${(userRankData.hashRateGHs / 1000).toFixed(2)} TH/s` 
                : `${userRankData.hashRateGHs} GH/s`} Hash Power
            </div>
          </div>
        </div>

        {nextTarget ? (
          <div className="text-right">
            <div className="text-[11px] font-bold text-amber-400 font-mono flex items-center gap-1 justify-end">
              <ArrowUp className="w-3 h-3" /> +{hashNeeded} GH/s
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              to reach #{userRankData.rank - 1} ({nextTarget.name.substring(0, 8)}...)
            </div>
          </div>
        ) : (
          <div className="text-right text-xs font-bold text-emerald-400 font-mono">
            🏆 #1 LEADER!
          </div>
        )}
      </div>

      {/* Leaderboard Table List */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold font-tech text-slate-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Global Miner Standings</span>
          </h3>

          <div className="flex bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                timeframe === 'weekly' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('allTime')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                timeframe === 'allTime' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {rankedLeaderboard.map((miner) => {
            const isTop3 = miner.rank <= 3;
            let rankBadgeClass = 'bg-slate-800 text-slate-400 border-slate-700';
            if (miner.rank === 1) rankBadgeClass = 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-500/20';
            if (miner.rank === 2) rankBadgeClass = 'bg-slate-300 text-slate-950 font-black border-slate-200';
            if (miner.rank === 3) rankBadgeClass = 'bg-amber-700 text-white font-black border-amber-600';

            return (
              <div
                key={`${miner.name}-${miner.rank}`}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  miner.isCurrentUser
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : isTop3
                    ? 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                    : 'bg-slate-950/50 border-slate-800/40 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-mono font-bold text-xs shrink-0 ${rankBadgeClass}`}>
                    {miner.rank === 1 ? '🥇' : miner.rank === 2 ? '🥈' : miner.rank === 3 ? '🥉' : `#${miner.rank}`}
                  </div>

                  {/* Avatar & Name */}
                  <img
                    src={miner.avatar}
                    alt={miner.name}
                    className="w-9 h-9 rounded-xl object-cover border border-slate-700 shrink-0"
                  />

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white font-tech truncate max-w-[120px] sm:max-w-[180px]">
                        {miner.name}
                      </span>
                      <span className="text-xs">{miner.country}</span>
                      {miner.isCurrentUser && (
                        <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <Zap className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                      <span>
                        {miner.hashRateGHs >= 1000
                          ? `${(miner.hashRateGHs / 1000).toFixed(2)} TH/s`
                          : `${miner.hashRateGHs} GH/s`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Earnings & Rank Action */}
                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-amber-400">
                    {miner.totalMined.toFixed(2)} ROYAL
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Mined Yield
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
