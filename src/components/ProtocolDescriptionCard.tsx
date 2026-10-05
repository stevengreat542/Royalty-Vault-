import React, { useState } from 'react';
import { Crown, Copy, Check, ShieldCheck, Cpu } from 'lucide-react';

export const ProtocolDescriptionCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const officialName = "Royalty Sovereign Vault Protocol (RSVP)";
  const officialDescription = "The Royalty Sovereign Vault Protocol (RSVP) is a next-generation decentralized cloud-hashing network designed to bridge high-throughput SHA-256 cloud-mining resources with automated, micro-frequency hardware optimization. Operating under the native ROYAL utility asset alongside secure Bitcoin (BTC) reward distributions, RSVP enables node operators to orchestrate virtual ASIC rigs, optimize block-target discovery through intelligent AI-driven overclocking, and monitor on-chain hash rates within a secure, high-fidelity cryptographic ledger. RSVP establishes a premium, gas-efficient mining environment with zero-friction protocol withdrawals, dedicated squad partner rewards, and daily interactive battery-pulse integrity checks.";

  const handleCopy = () => {
    const textToCopy = `============================================================\nOFFICIAL BRAND NAME:\n${officialName}\n============================================================\n\nDESCRIPTION:\n${officialDescription}\n\n============================================================\nKEY TECHNICAL FEATURES:\n1. Autonomous Hash-Rate Allocation: Deploy modular micro-processing clusters, ranging from entry-level Antminer S19 Minis to enterprise-grade Dyson Solar Matrix arrays.\n2. AI-Optimized Overclocking: Integrates predictive AI booster matrices to optimize target block nonce searches, multiplying processing output by up to 3.5x.\n3. Consensus Energy Integrity: Real-time on-chain thermodynamic battery tracking to ensure 100% mining efficiency through daily interactive pulse check-ins.\n4. Symmetric Double-Token Ledger: Parallel asset accounting in ROYAL and BTC, offering on-demand withdrawals directly to verified external wallet addresses.\n============================================================`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold font-mono tracking-widest text-amber-400 uppercase">
          Official System Manifest
        </span>
      </div>

      <h3 className="text-sm font-extrabold font-tech text-white tracking-wide mb-2 flex items-center gap-1.5">
        <Crown className="w-4 h-4 text-amber-500 fill-amber-500/20" />
        <span>{officialName}</span>
      </h3>

      <p className="text-slate-400 text-xs leading-relaxed font-sans mb-4 text-justify">
        {officialDescription}
      </p>

      <div className="flex items-center justify-between gap-3 border-t border-slate-850 pt-3">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>v1.0.4 Legit Architecture</span>
        </div>

        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-tech transition-all active:scale-95 flex items-center gap-1.5 ${
            copied
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
              : 'bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
          }`}
        >
          {copied ? (
            <>
              <span>COPIED SUCCESSFULLY</span>
              <Check className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>COPY PLATFORM MANIFEST</span>
              <Copy className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
