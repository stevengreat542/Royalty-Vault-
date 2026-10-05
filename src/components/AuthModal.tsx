import React, { useState } from 'react';
import { X, UserCheck, KeyRound, Mail, User, ShieldCheck, ArrowRight, Lock, Sparkles, LogOut, CheckCircle2, Crown } from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { THEME_CONFIGS } from '../utils/theme';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { state, currentUser, login, register, logout } = useMining();
  const theme = THEME_CONFIGS[state.theme];

  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regReferralCode, setRegReferralCode] = useState('');

  // Feedback messages
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg('Please provide both email address and password.');
      return;
    }

    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    setSuccessMsg('Successfully authenticated! Welcome back to Royalty Vault.');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regUsername.trim()) {
      setErrorMsg('Operator name is required.');
      return;
    }

    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const res = register(regUsername, regEmail, regPassword, regReferralCode);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    setSuccessMsg('Account registered & Mining Node initialized successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  const handleQuickDemoLogin = () => {
    setErrorMsg('');
    login('operator@royaltyvault.io', 'royalty123');
    setSuccessMsg('Logged in as Vault Operator!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl overflow-hidden">
        
        {/* Glow ambient decoration */}
        <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Crown className="w-6 h-6 fill-amber-400/20" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-tech text-white">
              {currentUser ? 'Vault Node Account' : mode === 'login' ? 'Vault Authentication' : 'Create Mining Account'}
            </h3>
            <p className="text-xs text-slate-400">
              {currentUser ? 'Manage active session and credentials' : 'Access your decentralized Bitcoin cloud node'}
            </p>
          </div>
        </div>

        {/* If user is already logged in */}
        {currentUser ? (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Operator Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Name:</span>
                <span className="text-white font-bold">{currentUser.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-200">{currentUser.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Node Address:</span>
                <span className="text-amber-400 text-[11px] font-bold">{currentUser.nodeWallet.substring(0, 10)}...</span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                setSuccessMsg('Logged out successfully.');
                setTimeout(() => setSuccessMsg(''), 1500);
              }}
              className="w-full py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 font-bold font-tech text-xs transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>TERMINATE ACTIVE SESSION (LOGOUT)</span>
            </button>
          </div>
        ) : (
          <>
            {/* Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-4">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'login' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'register' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Register Node
              </button>
            </div>

            {/* Form */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="operator@royaltyvault.io"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:border-amber-500/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Password</span>
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:border-amber-500/50 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold font-tech text-xs shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all mt-1 flex items-center justify-center gap-1.5"
                >
                  <span>AUTHENTICATE & LOG IN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-2 text-[10px] text-slate-500 font-mono">OR</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold font-tech text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-CLICK QUICK OPERATOR LOGIN</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Operator Name / Handle</span>
                  </label>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="Vault Operator X"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:border-amber-500/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="myemail@domain.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:border-amber-500/50 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>Password</span>
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-500/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                      <KeyRound className="w-3 h-3 text-amber-400" />
                      <span>Confirm</span>
                    </label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-500/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Referral Code (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={regReferralCode}
                    onChange={(e) => setRegReferralCode(e.target.value)}
                    placeholder="ROYAL-8899X"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-amber-300 font-mono focus:border-amber-500/50 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold font-tech text-xs shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all mt-1 flex items-center justify-center gap-1.5"
                >
                  <span>INITIALIZE NEW MINING NODE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </>
        )}

        {/* Status Messages */}
        {errorMsg && (
          <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

      </div>
    </div>
  );
};
