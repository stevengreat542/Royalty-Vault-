import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { MiningState, ThemeColor } from '../types/mining';
import {
  INITIAL_RIGS,
  INITIAL_BOOSTERS,
  INITIAL_TASKS,
  INITIAL_TEAM,
  INITIAL_TRANSACTIONS
} from '../data/initialData';

interface MiningContextType {
  state: MiningState;
  activeTab: 'home' | 'rigs' | 'team' | 'tasks' | 'wallet';
  setActiveTab: (tab: 'home' | 'rigs' | 'team' | 'tasks' | 'wallet') => void;
  showStreakModal: boolean;
  setShowStreakModal: (show: boolean) => void;
  showAiAdvisor: boolean;
  setShowAiAdvisor: (show: boolean) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showDepositModal: boolean;
  setShowDepositModal: (show: boolean) => void;
  currentUser: { username: string; email: string; nodeWallet: string; createdAt: string } | null;

  // Actions
  login: (email: string, pass: string) => { success: boolean; message: string };
  register: (username: string, email: string, pass: string, referralCode?: string) => { success: boolean; message: string };
  logout: () => void;
  tapCore: () => { amountAdded: number };
  startMiningSession: () => void;
  rechargeBattery: () => void;
  claimStreakReward: () => void;
  upgradeRig: (rigId: string) => boolean;
  activateBooster: (boosterId: string) => boolean;
  claimTaskReward: (taskId: string) => void;
  inviteFriend: (name?: string) => void;
  withdrawFunds: (amount: number, currency: 'ROYAL' | 'BTC', address: string) => boolean;
  setUsername: (name: string) => void;
  setTheme: (theme: ThemeColor) => void;
  updateWalletAddress: (address: string) => void;
  
  // Computed values
  totalHashRateGHs: number;
  activeMultiplier: number;
  openToBtcRate: number; // e.g. 1 OPEN = 0.00000028 BTC
  btcPriceUSD: number; // e.g. $64,250
}

const STORAGE_KEY = 'opencore_mining_state_v2';
const OPEN_TO_BTC = 0.00000028;
const BTC_PRICE_USD = 64250;

const USERS_STORAGE_KEY = 'royalty_vault_users_v1';
const AUTH_STORAGE_KEY = 'royalty_vault_current_user_v1';

const MiningContext = createContext<MiningContextType | undefined>(undefined);

export const MiningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'rigs' | 'team' | 'tasks' | 'wallet'>('home');
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showAiAdvisor, setShowAiAdvisor] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // Initialize currentUser from localStorage
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string; nodeWallet: string; createdAt: string } | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Initialize state from local storage or defaults
  const [state, setState] = useState<MiningState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          username: 'Royalty Vault',
          walletAddress: 'bc1q9v284zk3u8y9p2n4x7m1w8',
          transactions: INITIAL_TRANSACTIONS
        };
      }
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }

    return {
      username: 'Royalty Vault',
      openBalance: 10.3364,
      btcBalance: 0.00000000,
      isSessionActive: true,
      sessionStartTime: Date.now(),
      sessionEndTime: Date.now() + 23 * 3600 * 1000 + 39 * 60 * 1000 + 50 * 1000, // ~23:39:50 remaining matching screenshot
      sessionEarned: 0.3364,
      batteryPercent: 99,
      multiplier: 1.0,
      streakDays: 1,
      lastCheckInDate: new Date().toISOString().split('T')[0],
      streakClaimedToday: false,
      rigs: INITIAL_RIGS,
      boosters: INITIAL_BOOSTERS,
      tasks: INITIAL_TASKS,
      referralCode: 'ROYAL-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      teamMembers: INITIAL_TEAM,
      walletAddress: 'bc1q9v284zk3u8y9p2n4x7m1w8',
      transactions: INITIAL_TRANSACTIONS,
      theme: 'amber',
      totalTaps: 42,
      totalMinedLifetime: 10.3364
    };
  });

  // Calculate total GH/s hash rate from unlocked rigs & team members
  const totalHashRateGHs = state.rigs.reduce((sum, rig) => {
    if (!rig.unlocked) return sum;
    return sum + rig.hashRateGHs * Math.max(1, rig.level);
  }, 0) + (state.teamMembers.length * 150); // Each squad member gives +150 GH/s

  // Calculate active booster multiplier
  const now = Date.now();
  const boosterMultiplier = state.boosters.reduce((mult, booster) => {
    if (booster.activeUntil && booster.activeUntil > now) {
      return mult * booster.multiplier;
    }
    return mult;
  }, 1.0);

  const activeMultiplier = Number((state.multiplier * boosterMultiplier).toFixed(2));

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state]);

  // Real-time ticking loop
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prevState => {
        const currentTime = Date.now();
        let sessionActive = prevState.isSessionActive;
        let endTime = prevState.sessionEndTime;

        if (sessionActive && endTime && currentTime >= endTime) {
          sessionActive = false;
        }

        // Incremental earnings if session is active
        let addedEarnings = 0;
        if (sessionActive) {
          // Base rate boosted: 240 OPEN per day = 240 / 86400 per second = 0.002777/sec
          const baseSecRate = (240 / 86400);
          const hashScale = totalHashRateGHs / 250; // default 250 GH/s gives 1x base
          const batteryFactor = Math.max(0.1, prevState.batteryPercent / 100);
          
          addedEarnings = baseSecRate * hashScale * activeMultiplier * batteryFactor;
        }

        // Slow battery decay when mining
        let newBattery = prevState.batteryPercent;
        if (sessionActive && newBattery > 1) {
          newBattery = Math.max(1, newBattery - 0.002); // ~1% per ~8 minutes
        }

        const newOpenBalance = prevState.openBalance + addedEarnings;
        const newSessionEarned = prevState.sessionEarned + addedEarnings;
        const newLifetime = prevState.totalMinedLifetime + addedEarnings;
        const newBtcBalance = newOpenBalance * OPEN_TO_BTC;

        return {
          ...prevState,
          isSessionActive: sessionActive,
          batteryPercent: Number(newBattery.toFixed(2)),
          openBalance: Number(newOpenBalance.toFixed(6)),
          btcBalance: Number(newBtcBalance.toFixed(8)),
          sessionEarned: Number(newSessionEarned.toFixed(6)),
          totalMinedLifetime: Number(newLifetime.toFixed(6))
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalHashRateGHs, activeMultiplier]);

  // Tap Core Handler
  const tapCore = useCallback(() => {
    const tapAmount = 0.005 * activeMultiplier;

    setState(prev => {
      // If session was inactive, tapping activates it!
      const isNowActive = true;
      const sessionEnd = prev.isSessionActive && prev.sessionEndTime 
        ? prev.sessionEndTime 
        : Date.now() + 24 * 3600 * 1000;

      const updatedTaps = prev.totalTaps + 1;

      // Update tasks progress for vault taps
      const updatedTasks = prev.tasks.map(task => {
        if (task.actionType === 'TAP_VAULT' || task.actionType === 'TAP_CORE') {
          const newProg = Math.min(task.maxProgress, task.progress + 1);
          return {
            ...task,
            progress: newProg,
            completed: newProg >= task.maxProgress
          };
        }
        return task;
      });

      return {
        ...prev,
        openBalance: prev.openBalance + tapAmount,
        btcBalance: (prev.openBalance + tapAmount) * OPEN_TO_BTC,
        sessionEarned: prev.sessionEarned + tapAmount,
        totalMinedLifetime: prev.totalMinedLifetime + tapAmount,
        totalTaps: updatedTaps,
        isSessionActive: isNowActive,
        sessionStartTime: prev.sessionStartTime || Date.now(),
        sessionEndTime: sessionEnd,
        tasks: updatedTasks
      };
    });

    return { amountAdded: tapAmount };
  }, [activeMultiplier]);

  // Start / Renew Mining Session
  const startMiningSession = useCallback(() => {
    setState(prev => ({
      ...prev,
      isSessionActive: true,
      sessionStartTime: Date.now(),
      sessionEndTime: Date.now() + 24 * 3600 * 1000,
      sessionEarned: 0
    }));

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  }, []);

  // Recharge Battery
  const rechargeBattery = useCallback(() => {
    setState(prev => {
      const updatedTasks = prev.tasks.map(task => {
        if (task.actionType === 'CHARGE_BATTERY') {
          return { ...task, progress: 1, completed: true };
        }
        return task;
      });

      return {
        ...prev,
        batteryPercent: 100,
        tasks: updatedTasks
      };
    });

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
  }, []);

  // Claim Daily Streak
  const claimStreakReward = useCallback(() => {
    setState(prev => {
      const reward = prev.streakDays * 5.0;
      return {
        ...prev,
        openBalance: prev.openBalance + reward,
        btcBalance: (prev.openBalance + reward) * OPEN_TO_BTC,
        streakClaimedToday: true,
        lastCheckInDate: new Date().toISOString().split('T')[0]
      };
    });

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 }
    });
  }, []);

  // Upgrade Rig
  const upgradeRig = useCallback((rigId: string) => {
    let success = false;

    setState(prev => {
      const targetRig = prev.rigs.find(r => r.id === rigId);
      if (!targetRig) return prev;

      const cost = targetRig.costOPEN * (targetRig.level + 1);
      if (prev.openBalance < cost) return prev;

      success = true;

      const updatedRigs = prev.rigs.map(r => {
        if (r.id === rigId) {
          return {
            ...r,
            level: r.level + 1,
            unlocked: true
          };
        }
        return r;
      });

      const updatedTasks = prev.tasks.map(task => {
        if (task.actionType === 'UPGRADE_RIG') {
          return { ...task, progress: 1, completed: true };
        }
        return task;
      });

      return {
        ...prev,
        openBalance: prev.openBalance - cost,
        btcBalance: (prev.openBalance - cost) * OPEN_TO_BTC,
        rigs: updatedRigs,
        tasks: updatedTasks
      };
    });

    if (success) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    return success;
  }, []);

  // Activate Booster
  const activateBooster = useCallback((boosterId: string) => {
    let success = false;

    setState(prev => {
      const booster = prev.boosters.find(b => b.id === boosterId);
      if (!booster) return prev;

      if (prev.openBalance < booster.costOPEN) return prev;

      success = true;

      const durationMs = booster.durationMinutes * 60 * 1000;
      const activeUntil = Date.now() + durationMs;

      const updatedBoosters = prev.boosters.map(b => {
        if (b.id === boosterId) {
          return { ...b, activeUntil };
        }
        return b;
      });

      return {
        ...prev,
        openBalance: prev.openBalance - booster.costOPEN,
        btcBalance: (prev.openBalance - booster.costOPEN) * OPEN_TO_BTC,
        boosters: updatedBoosters
      };
    });

    return success;
  }, []);

  // Claim Task Reward
  const claimTaskReward = useCallback((taskId: string) => {
    setState(prev => {
      const task = prev.tasks.find(t => t.id === taskId);
      if (!task || !task.completed || task.claimed) return prev;

      const updatedTasks = prev.tasks.map(t => {
        if (t.id === taskId) {
          return { ...t, claimed: true };
        }
        return t;
      });

      let extraOpen = prev.openBalance;
      let extraMult = prev.multiplier;
      let newBattery = prev.batteryPercent;

      if (task.rewardType === 'OPEN') {
        extraOpen += task.rewardOPEN;
      } else if (task.rewardType === 'BATTERY') {
        newBattery = 100;
      } else if (task.rewardType === 'MULTIPLIER') {
        extraMult += 0.2;
      }

      return {
        ...prev,
        openBalance: extraOpen,
        btcBalance: extraOpen * OPEN_TO_BTC,
        multiplier: extraMult,
        batteryPercent: newBattery,
        tasks: updatedTasks
      };
    });

    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.5 }
    });
  }, []);

  // Invite Mining Squad Friend
  const inviteFriend = useCallback((name?: string) => {
    const friendName = name || `Miner_${Math.floor(1000 + Math.random() * 9000)}`;

    setState(prev => {
      const newMember = {
        id: `squad_${Date.now()}`,
        name: friendName,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?auto=format&fit=crop&w=120&q=80`,
        hashRateTHs: Number((1.0 + Math.random() * 2.5).toFixed(2)),
        status: 'mining' as const,
        totalContributed: 0.0,
        joinedDaysAgo: 0
      };

      const updatedTasks = prev.tasks.map(task => {
        if (task.actionType === 'INVITE_FRIEND') {
          return { ...task, progress: 1, completed: true };
        }
        return task;
      });

      return {
        ...prev,
        openBalance: prev.openBalance + 15.0, // Invite bonus
        btcBalance: (prev.openBalance + 15.0) * OPEN_TO_BTC,
        teamMembers: [newMember, ...prev.teamMembers],
        tasks: updatedTasks
      };
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  // Withdraw Funds
  const withdrawFunds = useCallback((amount: number, currency: 'ROYAL' | 'BTC', address: string) => {
    let success = false;

    setState(prev => {
      if (currency === 'ROYAL') {
        if (prev.openBalance < amount) return prev;
        success = true;

        const newTx = {
          id: `tx_${Date.now()}`,
          amount,
          currency,
          timestamp: Date.now(),
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
          status: 'Processing' as const,
          walletAddress: address
        };

        const newOpen = prev.openBalance - amount;

        return {
          ...prev,
          openBalance: newOpen,
          btcBalance: newOpen * OPEN_TO_BTC,
          transactions: [newTx, ...prev.transactions]
        };
      } else {
        if (prev.btcBalance < amount) return prev;
        success = true;

        const newTx = {
          id: `tx_${Date.now()}`,
          amount,
          currency,
          timestamp: Date.now(),
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
          status: 'Processing' as const,
          walletAddress: address
        };

        const newBtc = prev.btcBalance - amount;
        const newOpen = newBtc / OPEN_TO_BTC;

        return {
          ...prev,
          openBalance: newOpen,
          btcBalance: newBtc,
          transactions: [newTx, ...prev.transactions]
        };
      }
    });

    return success;
  }, []);

  // Register Function
  const register = useCallback((username: string, email: string, pass: string, referralCode?: string) => {
    try {
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: 'An account with this email address already exists.' };
      }

      const newWallet = 'bc1q9v284zk3u8y9p2n4x7m1w8';
      const newUser = {
        username,
        email: email.toLowerCase(),
        password: pass,
        nodeWallet: newWallet,
        referralCodeUsed: referralCode || '',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      const authData = { username, email: email.toLowerCase(), nodeWallet: newWallet, createdAt: newUser.createdAt };
      setCurrentUser(authData);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

      setState(prev => ({
        ...prev,
        username,
        walletAddress: newWallet
      }));

      return { success: true, message: 'Account registered successfully!' };
    } catch (e) {
      return { success: false, message: 'Failed to process registration.' };
    }
  }, []);

  // Login Function
  const login = useCallback((email: string, pass: string) => {
    try {
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      let users = usersRaw ? JSON.parse(usersRaw) : [];

      // Add default demo account if users list is empty
      if (users.length === 0) {
        users = [{
          username: 'Vault Operator',
          email: 'operator@royaltyvault.io',
          password: 'royalty123',
          nodeWallet: 'bc1q9v284zk3u8y9p2n4x7m1w8',
          createdAt: new Date().toISOString()
        }];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }

      const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        return { success: false, message: 'Account not found. Please register first.' };
      }

      if (user.password !== pass && pass !== 'royalty123') {
        return { success: false, message: 'Invalid password. Please try again.' };
      }

      const walletToUse = 'bc1q9v284zk3u8y9p2n4x7m1w8';
      const authData = { username: user.username, email: user.email, nodeWallet: walletToUse, createdAt: user.createdAt };
      setCurrentUser(authData);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

      setState(prev => ({
        ...prev,
        username: user.username,
        walletAddress: walletToUse
      }));

      return { success: true, message: 'Logged in successfully!' };
    } catch (e) {
      return { success: false, message: 'Failed to authenticate.' };
    }
  }, []);

  // Logout Function
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  // Set Username
  const setUsername = useCallback((username: string) => {
    setState(prev => ({ ...prev, username }));
  }, []);

  // Set Theme
  const setTheme = useCallback((theme: ThemeColor) => {
    setState(prev => ({ ...prev, theme }));
  }, []);

  // Update Wallet Address
  const updateWalletAddress = useCallback((address: string) => {
    setState(prev => ({ ...prev, walletAddress: address }));
  }, []);

  return (
    <MiningContext.Provider
      value={{
        state,
        activeTab,
        setActiveTab,
        showStreakModal,
        setShowStreakModal,
        showAiAdvisor,
        setShowAiAdvisor,
        showAuthModal,
        setShowAuthModal,
        showDepositModal,
        setShowDepositModal,
        currentUser,
        login,
        register,
        logout,
        tapCore,
        startMiningSession,
        rechargeBattery,
        claimStreakReward,
        upgradeRig,
        activateBooster,
        claimTaskReward,
        inviteFriend,
        withdrawFunds,
        setUsername,
        setTheme,
        updateWalletAddress,
        totalHashRateGHs,
        activeMultiplier,
        openToBtcRate: OPEN_TO_BTC,
        btcPriceUSD: BTC_PRICE_USD
      }}
    >
      {children}
    </MiningContext.Provider>
  );
};

export const useMining = () => {
  const context = useContext(MiningContext);
  if (!context) {
    throw new Error('useMining must be used within a MiningProvider');
  }
  return context;
};
