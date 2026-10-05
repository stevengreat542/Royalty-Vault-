export interface Rig {
  id: string;
  name: string;
  subtitle: string;
  hashRateGHs: number;
  costOPEN: number;
  level: number;
  maxLevel: number;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  unlocked: boolean;
  description: string;
}

export interface Booster {
  id: string;
  name: string;
  multiplier: number;
  durationMinutes: number;
  costOPEN: number;
  icon: string;
  activeUntil: number | null; // timestamp
  description: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: 'Daily' | 'Achievement' | 'Community';
  rewardOPEN: number;
  rewardType: 'OPEN' | 'MULTIPLIER' | 'BATTERY';
  progress: number;
  maxProgress: number;
  completed: boolean;
  claimed: boolean;
  actionText: string;
  actionType: 'TAP_VAULT' | 'TAP_CORE' | 'CHARGE_BATTERY' | 'UPGRADE_RIG' | 'INVITE_FRIEND' | 'DAILY_CHECKIN' | 'LINK_CLICK';
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  hashRateTHs: number;
  status: 'mining' | 'idle';
  totalContributed: number;
  joinedDaysAgo: number;
}

export interface PayoutTransaction {
  id: string;
  amount: number;
  currency: 'ROYAL' | 'BTC';
  timestamp: number;
  txHash: string;
  status: 'Completed' | 'Processing' | 'Pending';
  walletAddress: string;
}

export interface NetworkBlock {
  blockHeight: number;
  hash: string;
  transactionsCount: number;
  miner: string;
  rewardBTC: number;
  timeAgo: string;
}

export type ThemeColor = 'amber' | 'cyan' | 'purple' | 'emerald';

export interface UserAccount {
  username: string;
  email: string;
  nodeWallet: string;
  createdAt: string;
}

export interface MiningState {
  // Balances
  openBalance: number;
  btcBalance: number;
  
  // Mining Rates & State
  isSessionActive: boolean;
  sessionStartTime: number | null;
  sessionEndTime: number | null;
  sessionEarned: number;
  batteryPercent: number;
  multiplier: number;
  
  // Streaks & Rewards
  streakDays: number;
  lastCheckInDate: string | null;
  streakClaimedToday: boolean;
  
  // Rigs & Upgrades
  rigs: Rig[];
  boosters: Booster[];
  
  // Tasks & Referral
  tasks: TaskItem[];
  referralCode: string;
  teamMembers: TeamMember[];
  
  // Wallet
  walletAddress: string;
  transactions: PayoutTransaction[];
  
  // App Theme
  theme: ThemeColor;
  
  // User profile
  username: string;

  // Total stats
  totalTaps: number;
  totalMinedLifetime: number;
}
