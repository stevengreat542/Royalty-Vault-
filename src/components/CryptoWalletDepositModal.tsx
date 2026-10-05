import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ArrowRight, ShieldCheck, Zap, Wallet, Layers } from 'lucide-react';
import { useMining } from '../context/MiningContext';

interface CryptoWalletDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CryptoNetwork = 'BTC' | 'USDT_TRC20' | 'USDT_BEP20';

const HASHRATE_PACKAGES = [
  { id: 'starter', name: 'Starter Boost', priceUSD: 10, hashRateAdded: 500, btcAmount: 0.000155, tag: 'Popular' },
  { id: 'pro', name: 'Pro Vault Node', priceUSD: 25, hashRateAdded: 1500, btcAmount: 0.000389, tag: 'Best Value' },
  { id: 'enterprise', name: 'Quantum Cluster', priceUSD: 50, hashRateAdded: 3500, btcAmount: 0.000778, tag: '3x Speed' },
  { id: 'whale', name: 'Dyson Matrix Rig', priceUSD: 100, hashRateAdded: 8000, btcAmount: 0.001556, tag: 'VIP Tier' },
  { id: 'master', name: 'Master Vault Sub', priceUSD: 200, hashRateAdded: 18000, btcAmount: 0.003112, tag: 'Sub Tier 1' },
  { id: 'apex', name: 'Apex Titan Sub', priceUSD: 300, hashRateAdded: 30000, btcAmount: 0.004668, tag: 'Sub Tier 2' },
  { id: 'ultra', name: 'Ultra Fusion Sub', priceUSD: 400, hashRateAdded: 45000, btcAmount: 0.006224, tag: 'Sub Tier 3' },
  { id: 'godlike', name: 'Galactic Core Sub', priceUSD: 500, hashRateAdded: 65000, btcAmount: 0.007780, tag: 'Max Power' }
];

export const CryptoWalletDepositModal: React.FC<CryptoWalletDepositModalProps> = ({ isOpen, onClose }) => {
  const { state } = useMining();
  const operatorWallet = state.walletAddress || 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav';

  const [selectedNetwork, setSelectedNetwork] = useState<CryptoNetwork>('BTC');
  const [selectedPkg, setSelectedPkg] = useState(HASHRATE_PACKAGES[1]);
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(operatorWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash || txHash.trim().length < 8) {
      setErrorMsg('Please enter a valid Transaction Hash / TxID from your Crypto Wallet.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  // Generate QR code URL dynamically
  const getQrData = () => {
    if (selectedNetwork === 'BTC') {
      return `bitcoin:${operatorWallet}?amount=${selectedPkg.btcAmount}`;
    }
    return operatorWallet;
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getQrData())}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Glow ambient */}
        <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-tech text-white">
              Crypto Wallet Deposit Portal
            </h3>
            <p className="text-xs text-slate-400">
              Direct On-Chain Payment to Vault Operator
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white font-tech">
              Deposit Proof Broadcasted!
            </h4>
            <p className="text-xs text-slate-300">
              Your payment of <strong className="text-amber-400">${selectedPkg.priceUSD} USD</strong> ({selectedPkg.btcAmount} BTC) is being verified on the blockchain. Your +{selectedPkg.hashRateAdded} GH/s boost will activate upon 1 confirmation!
            </p>
            <button
              onClick={() => { setSubmitted(false); setTxHash(''); onClose(); }}
              className="mt-2 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs font-tech hover:brightness-110"
            >
              DONE
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {/* Network Switcher */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Asset / Network:</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedNetwork('BTC')}
                  className={`py-2 text-xs font-bold font-tech rounded-xl transition-all ${
                    selectedNetwork === 'BTC' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ₿ BTC Native
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNetwork('USDT_TRC20')}
                  className={`py-2 text-xs font-bold font-tech rounded-xl transition-all ${
                    selectedNetwork === 'USDT_TRC20' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ₮ USDT (TRC20)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNetwork('USDT_BEP20')}
                  className={`py-2 text-xs font-bold font-tech rounded-xl transition-all ${
                    selectedNetwork === 'USDT_BEP20' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ₮ USDT (BEP20)
                </button>
              </div>
            </div>
            
            {/* Package Selector */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1.5 block">
                Select Mining Hash Power Package:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {HASHRATE_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkg(pkg)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                      selectedPkg.id === pkg.id
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {pkg.tag && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {pkg.tag}
                      </span>
                    )}
                    <div className="font-bold text-xs font-tech text-white">{pkg.name}</div>
                    <div className="text-amber-400 font-mono text-xs font-extrabold mt-1">
                      ${pkg.priceUSD} USD <span className="text-[10px] text-slate-400">({selectedNetwork === 'BTC' ? `${pkg.btcAmount} BTC` : `${pkg.priceUSD} USDT`})</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-emerald-400/20" /> +{pkg.hashRateAdded} GH/s
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code and Wallet Address Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center gap-3">
              <div className="text-xs font-bold text-amber-300 font-tech flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Scan in Any Crypto Wallet App</span>
              </div>

              {/* QR Code Image */}
              <div className="p-2 bg-white rounded-2xl shadow-lg border border-slate-700">
                <img
                  src={qrCodeUrl}
                  alt="Crypto Wallet QR Code"
                  className="w-36 h-36 rounded-xl"
                />
              </div>

              {/* Operator Wallet Address */}
              <div className="w-full">
                <div className="text-[10px] text-slate-400 font-mono mb-1">
                  Crypto Wallet Deposit Address ({selectedNetwork}):
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-400 break-all">
                  <span className="flex-1 truncate text-left">{operatorWallet}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-all shrink-0"
                    title="Copy Address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Tx Proof Form */}
            <form onSubmit={handleSubmitProof} className="flex flex-col gap-2.5">
              <div>
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">
                  Transaction Hash / TxID:
                </label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="e.g. 8f2a9b4c0e1d2f3a..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-500/50 focus:outline-none"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold font-tech text-xs shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>VERIFY & BROADCAST PAYMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Payments settle directly on-chain into your Crypto Wallet with zero platform deductions.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
