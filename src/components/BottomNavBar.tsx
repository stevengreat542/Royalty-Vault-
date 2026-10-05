import React from 'react';
import { Home, Cpu, Users, CheckSquare, User, Wallet } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';

export const BottomNavBar: React.FC = () => {
  const { state, activeTab, setActiveTab } = useMining();
  const theme = THEME_CONFIGS[state.theme];

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rigs', label: 'Rigs', icon: Cpu },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'wallet', label: 'Wallet', icon: Wallet }
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0c10]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2">
      <div className="max-w-2xl mx-auto grid grid-cols-5 items-center h-14">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
                isActive
                  ? `${theme.textAccent} font-bold`
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Top Active Indicator bar */}
              {isActive && (
                <div className={`absolute -top-2 w-8 h-1 rounded-full ${
                  state.theme === 'amber' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' :
                  state.theme === 'cyan' ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' :
                  state.theme === 'purple' ? 'bg-purple-400 shadow-[0_0_8px_#a855f7]' :
                  'bg-emerald-400 shadow-[0_0_8px_#10b981]'
                }`} />
              )}

              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-medium tracking-tight mt-1 font-tech">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
