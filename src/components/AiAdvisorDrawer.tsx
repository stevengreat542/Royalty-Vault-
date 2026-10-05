import React, { useState, useEffect } from 'react';
import { X, Sparkles, Bot, RefreshCw, Zap } from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const AiAdvisorDrawer: React.FC = () => {
  const {
    state,
    showAiAdvisor,
    setShowAiAdvisor,
    totalHashRateGHs,
    activeMultiplier
  } = useMining();

  const [adviceText, setAdviceText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAiAdvice = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalHashRateGHs,
          openBalance: state.openBalance,
          batteryPercent: state.batteryPercent,
          activeMultiplier
        })
      });
      const data = await res.json();
      setAdviceText(data.advice || 'Node operating at peak capacity.');
    } catch (e) {
      setAdviceText('⚡ **Node Telemetry**: Network latency optimal. Keep your energy core charged and upgrade ASIC rigs in the Workshop for maximum yield.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAiAdvisor && !adviceText) {
      fetchAiAdvice();
    }
  }, [showAiAdvisor]);

  if (!showAiAdvisor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-cyan-500/50 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col gap-4 overflow-hidden max-h-[85vh] overflow-y-auto">
        
        {/* Background glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={() => setShowAiAdvisor(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-tech text-white flex items-center gap-1.5">
              Royalty Miner AI Agent
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs text-slate-400">
              Real-time quantum pool analysis & node optimization strategy
            </p>
          </div>
        </div>

        {/* Diagnostic Output Area */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 leading-relaxed min-h-[140px] flex flex-col justify-between">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2 text-cyan-400">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Analyzing global mining telemetry & block height...</span>
            </div>
          ) : (
            <div className="whitespace-pre-line text-slate-200">
              {adviceText}
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAiAdvice}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold font-tech text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>RE-RUN TELEMETRY ANALYSIS</span>
          </button>
        </div>

      </div>
    </div>
  );
};
