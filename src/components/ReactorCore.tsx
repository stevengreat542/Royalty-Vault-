import React, { useState } from 'react';
import { Flame, Play, Sparkles, Zap } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

export const ReactorCore: React.FC = () => {
  const {
    state,
    tapCore,
    startMiningSession,
    setShowStreakModal,
    activeMultiplier
  } = useMining();

  const theme = THEME_CONFIGS[state.theme];
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [isTapped, setIsTapped] = useState(false);

  // Generate 36 radial tick marks
  const ticks = Array.from({ length: 36 });

  // Handle core tap / press
  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const result = tapCore();
    setIsTapped(true);

    setTimeout(() => setIsTapped(false), 150);

    // Get click position relative to reactor element
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = rect.width / 2;
    let clientY = rect.height / 2;

    if ('clientX' in e) {
      clientX = e.clientX - rect.left;
      clientY = e.clientY - rect.top;
    } else if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX - rect.left;
      clientY = e.touches[0].clientY - rect.top;
    }

    // Add floating text particle
    const newParticle: FloatingText = {
      id: Date.now() + Math.random(),
      text: `+${result.amountAdded.toFixed(4)} ROYAL`,
      x: clientX + (Math.random() * 40 - 20),
      y: clientY - 10
    };

    setFloatingTexts(prev => [...prev.slice(-6), newParticle]);

    // Clean up particle after animation
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  // Format countdown timer (HH:MM:SS)
  const getRemainingTimeString = () => {
    if (!state.isSessionActive || !state.sessionEndTime) return '00:00:00';
    const diff = Math.max(0, state.sessionEndTime - Date.now());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 my-2 relative">
      
      {/* Central Quantum Reactor Interactive Dial */}
      <div
        onClick={handleTap}
        onTouchStart={handleTap}
        className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center cursor-pointer select-none touch-none transition-transform duration-100 ${
          isTapped ? 'scale-95' : 'hover:scale-[1.02]'
        }`}
      >
        {/* Floating Particles Overlay */}
        {floatingTexts.map(item => (
          <div
            key={item.id}
            className="absolute pointer-events-none text-xs sm:text-sm font-extrabold text-amber-300 font-mono drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-float-up z-50"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`
            }}
          >
            {item.text}
          </div>
        ))}

        {/* Outer Rotating Radial Ticks Circle */}
        <div className={`absolute inset-0 rounded-full border border-amber-500/20 ${state.isSessionActive ? 'animate-reactor-spin' : ''}`}>
          {ticks.map((_, i) => {
            const angle = i * (360 / 36);
            const isActiveTick = state.isSessionActive && i % 3 === 0;
            return (
              <div
                key={i}
                className="absolute w-full h-full flex justify-center items-start pt-1 pointer-events-none"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className={`w-0.5 transition-all ${
                    isActiveTick
                      ? 'h-3.5 bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                      : 'h-2 bg-slate-700/80'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Inner Pulsing Ring */}
        <div className={`absolute inset-4 rounded-full border-2 ${
          state.isSessionActive ? 'border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.3)] animate-pulse' : 'border-slate-800'
        }`} />

        {/* Central Hexagonal Core Frame */}
        <div className={`relative w-44 h-44 sm:w-48 sm:h-48 rounded-3xl bg-slate-950/90 border-2 ${
          state.isSessionActive
            ? 'border-amber-500 shadow-[0_0_35px_rgba(245,158,11,0.4)]'
            : 'border-slate-800'
        } flex flex-col items-center justify-center p-4 overflow-hidden`}>
          
          {/* Ambient Glow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent pointer-events-none" />

          {/* Central Bitcoin / Open Core Symbol */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg ${
              state.isSessionActive ? 'shadow-amber-500/50 animate-pulse' : ''
            }`}>
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-tech tracking-wider drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                  ₿
                </span>
              </div>
            </div>

            {/* Core Status Subtext */}
            <div className="mt-2 text-center">
              <span className={`text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                state.isSessionActive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {state.isSessionActive ? 'Vault Mining' : 'Tap Vault'}
              </span>
            </div>
          </div>

          {/* Tap Prompt Ripple */}
          <span className="text-[10px] text-slate-400 mt-1 font-mono">
            +{(0.0005 * activeMultiplier).toFixed(4)} ROYAL / tap
          </span>

        </div>
      </div>

      {/* Session Info Footer */}
      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        {state.isSessionActive ? (
          <>
            <div className="text-xs text-slate-400 font-medium">
              Session ends in
            </div>
            
            {/* Giant Countdown Clock */}
            <div className="text-3xl sm:text-4xl font-extrabold font-mono-num tracking-tight text-white drop-shadow-md">
              {getRemainingTimeString()}
            </div>

            <div className="text-xs text-amber-400 font-semibold flex items-center gap-1 font-mono-num">
              <span>This session</span>
              <span className="font-bold">+{state.sessionEarned.toFixed(4)}</span>
              <span>ROYAL</span>
            </div>
          </>
        ) : (
          <button
            onClick={startMiningSession}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold font-tech text-base shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>START 24H MINING SESSION</span>
          </button>
        )}

        {/* Streak Button Tag */}
        <button
          onClick={() => setShowStreakModal(true)}
          className="mt-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-xs font-semibold text-amber-400 hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          <span>{state.streakDays}-day streak</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 ml-0.5" />
        </button>

      </div>

    </div>
  );
};
