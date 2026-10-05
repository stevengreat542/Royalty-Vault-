import React, { useState } from 'react';
import { Users, UserPlus, Copy, Check, Share2, ShieldCheck, Zap, Trophy } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';
import { Leaderboard } from './Leaderboard';

export const TeamTab: React.FC = () => {
  const { state, inviteFriend } = useMining();
  const theme = THEME_CONFIGS[state.theme];

  const [activeSubTab, setActiveSubTab] = useState<'leaderboard' | 'squad'>('leaderboard');
  const [copied, setCopied] = useState(false);
  const [friendNameInput, setFriendNameInput] = useState('');

  const referralLink = `https://ais-dev-7rg6rlvuiqypso43wtowip-178918081640.europe-west3.run.app/?ref=${state.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRecruitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inviteFriend(friendNameInput.trim() || undefined);
    setFriendNameInput('');
  };

  const totalTeamHashRate = state.teamMembers.reduce((sum, m) => sum + m.hashRateTHs, 0);

  return (
    <div className="flex flex-col gap-4 pb-8 animate-fade-in">

      {/* Top Sub-Tab Switcher */}
      <div className="grid grid-cols-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
        <button
          onClick={() => setActiveSubTab('leaderboard')}
          className={`py-2.5 px-4 rounded-xl font-bold font-tech text-xs transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'leaderboard'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>GLOBAL LEADERBOARD</span>
        </button>

        <button
          onClick={() => setActiveSubTab('squad')}
          className={`py-2.5 px-4 rounded-xl font-bold font-tech text-xs transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'squad'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>SQUAD PARTNERS</span>
        </button>
      </div>

      {activeSubTab === 'leaderboard' ? (
        <Leaderboard />
      ) : (
        <div className="flex flex-col gap-4">
          
          {/* Squad Overview Banner */}
          <div className={`relative overflow-hidden rounded-2xl bg-slate-900 border ${theme.borderGlow} p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Mining Squad Network</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold font-mono-num text-white">
                    {state.teamMembers.length}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">
                    Partners
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-medium">Squad Contribution</span>
                <div className="text-2xl font-extrabold font-mono-num text-cyan-400 mt-1">
                  +{totalTeamHashRate.toFixed(2)} TH/s
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-amber-400 flex items-center gap-1.5 font-medium">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Earn 15% bonus hash rate & +15 ROYAL for every active partner recruited!</span>
            </div>
          </div>

          {/* Invite Code Box */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col gap-3">
            <h3 className="text-sm font-bold font-tech text-slate-200 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Your Unique Node Partner Code</span>
            </h3>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold font-tech text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

              {/* Partner Invite Input */}
              <form onSubmit={handleRecruitSubmit} className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Enter partner handle (e.g. Satoshi_99)..."
                value={friendNameInput}
                onChange={(e) => setFriendNameInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-amber-500/50 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-bold font-tech text-xs hover:bg-slate-700 transition-all flex items-center gap-1.5 shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>Recruit Partner</span>
              </button>
            </form>
          </div>

          {/* Squad Member List */}
          <div>
            <h3 className="text-sm font-bold font-tech text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Active Mining Partners</span>
            </h3>

            <div className="flex flex-col gap-2.5">
              {state.teamMembers.map(member => (
                <div
                  key={member.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-tech">
                          {member.name}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          member.status === 'mining' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'
                        }`} />
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        Joined {member.joinedDaysAgo}d ago · {member.hashRateTHs} TH/s
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-amber-400 font-mono">
                      +{member.totalContributed.toFixed(2)} ROYAL
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      Contributed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
