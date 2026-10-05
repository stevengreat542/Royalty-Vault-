import React from 'react';
import { X, Flame, CheckCircle, Gift, Sparkles } from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const StreakModal: React.FC = () => {
  const {
    state,
    showStreakModal,
    setShowStreakModal,
    claimStreakReward
  } = useMining();

  if (!showStreakModal) return null;

  const streakDaysList = [
    { day: 1, reward: '+5 ROYAL', rewardType: 'Tokens' },
    { day: 2, reward: '+10 ROYAL', rewardType: 'Tokens' },
    { day: 3, reward: '+15 ROYAL', rewardType: 'Tokens' },
    { day: 4, reward: '+20 ROYAL', rewardType: 'Tokens' },
    { day: 5, reward: '+30 ROYAL', rewardType: 'Tokens' },
    { day: 6, reward: '+50 ROYAL', rewardType: 'Tokens' },
    { day: 7, reward: '+100 ROYAL + 2x Boost', rewardType: 'Jackpot' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/50 p-6 shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col gap-4 overflow-hidden">
        
        {/* Background ambient lighting */}
        <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setShowStreakModal(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2 shadow-lg shadow-amber-500/10">
            <Flame className="w-8 h-8 fill-amber-400/30" />
          </div>
          <h3 className="text-xl font-extrabold font-tech text-white">
            Daily Mining Protocol Streak
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Maintain your daily node pulse to unlock compounding hash rewards and token multipliers!
          </p>
        </div>

        {/* Grid of Days */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 my-2">
          {streakDaysList.map((item) => {
            const isCompleted = item.day < state.streakDays || (item.day === state.streakDays && state.streakClaimedToday);
            const isCurrent = item.day === state.streakDays && !state.streakClaimedToday;

            return (
              <div
                key={item.day}
                className={`flex flex-col items-center justify-between p-2 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105'
                    : isCompleted
                    ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] font-bold tracking-wider uppercase font-mono">
                  Day {item.day}
                </span>

                <div className="my-1.5">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                  ) : item.day === 7 ? (
                    <Gift className="w-5 h-5 text-amber-400 mx-auto animate-bounce" />
                  ) : (
                    <Flame className={`w-5 h-5 mx-auto ${isCurrent ? 'text-amber-400' : 'text-slate-600'}`} />
                  )}
                </div>

                <span className="text-[9px] font-bold font-mono text-white leading-tight">
                  {item.reward}
                </span>
              </div>
            );
          })}
        </div>

        {/* Claim Action CTA */}
        {!state.streakClaimedToday ? (
          <button
            onClick={() => {
              claimStreakReward();
              setShowStreakModal(false);
            }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold font-tech text-base shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            <span>CLAIM DAY {state.streakDays} STREAK REWARD</span>
          </button>
        ) : (
          <div className="w-full py-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-center text-xs flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Streak Reward Claimed for Today! Next unlock in 24h</span>
          </div>
        )}

      </div>
    </div>
  );
};
