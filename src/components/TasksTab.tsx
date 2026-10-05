import React, { useState } from 'react';
import { CheckCircle2, Gift, Sparkles, ChevronRight, Trophy } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';

export const TasksTab: React.FC = () => {
  const { state, claimTaskReward, setActiveTab } = useMining();
  const theme = THEME_CONFIGS[state.theme];

  const [filter, setFilter] = useState<'All' | 'Daily' | 'Achievement' | 'Community'>('All');

  const filteredTasks = state.tasks.filter(t => {
    if (filter === 'All') return true;
    return t.category === filter;
  });

  const handleTaskAction = (task: typeof state.tasks[0]) => {
    if (task.completed && !task.claimed) {
      claimTaskReward(task.id);
      return;
    }

    // Direct user to appropriate screen to complete task
    switch (task.actionType) {
      case 'TAP_CORE':
      case 'CHARGE_BATTERY':
        setActiveTab('home');
        break;
      case 'UPGRADE_RIG':
        setActiveTab('rigs');
        break;
      case 'INVITE_FRIEND':
        setActiveTab('team');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className={`relative overflow-hidden rounded-2xl bg-slate-900 border ${theme.borderGlow} p-5`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Protocol Quests Matrix</span>
            <h3 className="text-xl font-bold font-tech text-white mt-0.5">
              Earn Free Mining Tokens
            </h3>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
        {(['All', 'Daily', 'Achievement', 'Community'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex-1 min-w-[70px] py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              filter === cat
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3">
        {filteredTasks.map(task => {
          const isReadyToClaim = task.completed && !task.claimed;

          return (
            <div
              key={task.id}
              className={`rounded-2xl bg-slate-900 border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isReadyToClaim
                  ? 'border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : task.claimed
                  ? 'border-slate-800/60 opacity-60'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl border shrink-0 ${
                  task.claimed
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : isReadyToClaim
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 animate-bounce'
                    : 'bg-slate-800 border-slate-700 text-amber-400'
                }`}>
                  {task.claimed ? <CheckCircle2 className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white font-tech">
                    {task.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                    <span className="text-amber-400 font-bold">+{task.rewardOPEN} ROYAL</span>
                    <span>·</span>
                    <span>{task.category}</span>
                  </div>

                  {/* Progress bar */}
                  {!task.claimed && (
                    <div className="w-full max-w-xs h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end shrink-0">
                {task.claimed ? (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-4 h-4" /> Claimed
                  </span>
                ) : (
                  <button
                    onClick={() => handleTaskAction(task)}
                    className={`py-2 px-4 rounded-xl font-bold font-tech text-xs transition-all flex items-center gap-1.5 active:scale-95 ${
                      isReadyToClaim
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/25 animate-pulse'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    <span>{isReadyToClaim ? 'CLAIM REWARD' : task.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
