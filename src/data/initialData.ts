import { Rig, Booster, TaskItem, TeamMember, PayoutTransaction, NetworkBlock } from '../types/mining';

export const INITIAL_RIGS: Rig[] = [
  {
    id: 'antminer_s19',
    name: 'Antminer S19 Mini',
    subtitle: 'Entry Cloud Processor',
    hashRateGHs: 750,
    costOPEN: 15,
    level: 2,
    maxLevel: 10,
    icon: 'Cpu',
    rarity: 'Common',
    unlocked: true,
    description: 'Reliable entry-level ASIC chip array for continuous background mining.'
  },
  {
    id: 'quantum_core_x1',
    name: 'Quantum Vault X1',
    subtitle: 'High-Density Array',
    hashRateGHs: 2500,
    costOPEN: 60,
    level: 1,
    maxLevel: 10,
    icon: 'Zap',
    rarity: 'Rare',
    unlocked: true,
    description: 'Sub-nanometer silicon vault processor designed for reduced thermal friction and high throughput.'
  },
  {
    id: 'cyberfusion_hydro',
    name: 'CyberFusion Hydro',
    subtitle: 'Liquid Cooled Rig',
    hashRateGHs: 8800,
    costOPEN: 250,
    level: 0,
    maxLevel: 10,
    icon: 'Droplets',
    rarity: 'Epic',
    unlocked: false,
    description: 'Immersed hydro-cooling cluster yielding enterprise mining hash performance.'
  },
  {
    id: 'dyson_solar_node',
    name: 'Dyson Solar Matrix',
    subtitle: 'Autonomous Orbital Node',
    hashRateGHs: 25000,
    costOPEN: 1000,
    level: 0,
    maxLevel: 5,
    icon: 'Sun',
    rarity: 'Legendary',
    unlocked: false,
    description: 'Zero-carbon orbital node array generating massive continuous hash output.'
  }
];

export const INITIAL_BOOSTERS: Booster[] = [
  {
    id: 'overclock_surge',
    name: 'Vault Overclock',
    multiplier: 1.5,
    durationMinutes: 60,
    costOPEN: 5,
    icon: 'Flame',
    activeUntil: null,
    description: 'Overclock vault frequency by 50% for 1 hour.'
  },
  {
    id: 'ai_predictive_hash',
    name: 'AI Hash Matrix',
    multiplier: 2.0,
    durationMinutes: 180,
    costOPEN: 18,
    icon: 'Bot',
    activeUntil: null,
    description: 'Deploys AI algorithm to optimize block target nonce discovery for 3 hours.'
  },
  {
    id: 'superconductor_flow',
    name: 'Superconductor Boost',
    multiplier: 3.5,
    durationMinutes: 30,
    costOPEN: 25,
    icon: 'Sparkles',
    activeUntil: null,
    description: 'Zero resistance quantum state delivering 3.5x boost for 30 minutes.'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task_daily_checkin',
    title: 'Daily Protocol Check-in',
    category: 'Daily',
    rewardOPEN: 2.5,
    rewardType: 'OPEN',
    progress: 1,
    maxProgress: 1,
    completed: true,
    claimed: false,
    actionText: 'Claim Reward',
    actionType: 'DAILY_CHECKIN'
  },
  {
    id: 'task_core_taps',
    title: 'Pulse the Vault 20 Times',
    category: 'Daily',
    rewardOPEN: 5.0,
    rewardType: 'OPEN',
    progress: 0,
    maxProgress: 20,
    completed: false,
    claimed: false,
    actionText: 'Tap Vault',
    actionType: 'TAP_VAULT'
  },
  {
    id: 'task_charge_battery',
    title: 'Maintain 100% Vault Energy',
    category: 'Daily',
    rewardOPEN: 3.0,
    rewardType: 'BATTERY',
    progress: 0,
    maxProgress: 1,
    completed: false,
    claimed: false,
    actionText: 'Recharge Energy',
    actionType: 'CHARGE_BATTERY'
  },
  {
    id: 'task_upgrade_rig',
    title: 'Upgrade any Rig Hardware',
    category: 'Achievement',
    rewardOPEN: 12.0,
    rewardType: 'OPEN',
    progress: 0,
    maxProgress: 1,
    completed: false,
    claimed: false,
    actionText: 'Go to Workshop',
    actionType: 'UPGRADE_RIG'
  },
  {
    id: 'task_invite_squad',
    title: 'Recruit 1 Squad Mining Partner',
    category: 'Community',
    rewardOPEN: 25.0,
    rewardType: 'OPEN',
    progress: 0,
    maxProgress: 1,
    completed: false,
    claimed: false,
    actionText: 'Invite Friends',
    actionType: 'INVITE_FRIEND'
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'squad_1',
    name: 'Satoshi_X',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    hashRateTHs: 1.42,
    status: 'mining',
    totalContributed: 42.85,
    joinedDaysAgo: 14
  },
  {
    id: 'squad_2',
    name: 'Cyber_Nakamoto',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    hashRateTHs: 2.15,
    status: 'mining',
    totalContributed: 88.10,
    joinedDaysAgo: 22
  },
  {
    id: 'squad_3',
    name: 'HashHunter_99',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    hashRateTHs: 0.88,
    status: 'idle',
    totalContributed: 19.30,
    joinedDaysAgo: 5
  }
];

export const INITIAL_TRANSACTIONS: PayoutTransaction[] = [
  {
    id: 'tx_001',
    amount: 10,
    currency: 'ROYAL' as any,
    timestamp: new Date('2026-10-04T23:09:00').getTime(),
    txHash: '0xa4052237...f38a',
    status: 'Completed',
    walletAddress: 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav'
  },
  {
    id: 'tx_002',
    amount: 10,
    currency: 'OPEN' as any,
    timestamp: new Date('2026-10-02T23:01:00').getTime(),
    txHash: '0x8f2a...9b4c',
    status: 'Completed',
    walletAddress: 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav'
  },
  {
    id: 'tx_003',
    amount: 0.00015,
    currency: 'BTC',
    timestamp: new Date('2026-09-29T23:01:00').getTime(),
    txHash: '0x3c1d...e72f',
    status: 'Completed',
    walletAddress: 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav'
  },
  {
    id: 'tx_004',
    amount: 25,
    currency: 'ROYAL' as any,
    timestamp: new Date('2026-09-25T14:45:00').getTime(),
    txHash: '0x7e2d...4a1b',
    status: 'Completed',
    walletAddress: 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav'
  },
  {
    id: 'tx_005',
    amount: 0.00035,
    currency: 'BTC',
    timestamp: new Date('2026-09-20T18:12:00').getTime(),
    txHash: '0x1b2c...df5e',
    status: 'Completed',
    walletAddress: 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav'
  },
  {
    id: 'tx_006',
    amount: 50,
    currency: 'OPEN' as any,
    timestamp: new Date('2026-09-15T09:30:00').getTime(),
    txHash: '0x4d5e...12af',
    status: 'Completed',
    walletAddress: 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav'
  },
  {
    id: 'tx_007',
    amount: 15,
    currency: 'ROYAL' as any,
    timestamp: new Date('2026-09-10T11:15:00').getTime(),
    txHash: '0x9f8e...cb3d',
    status: 'Completed',
    walletAddress: 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav'
  },
  {
    id: 'tx_008',
    amount: 0.00022,
    currency: 'BTC',
    timestamp: new Date('2026-09-05T20:05:00').getTime(),
    txHash: '0x5a4b...2d3e',
    status: 'Completed',
    walletAddress: 'bc1qrzyumygwrzayq9eyhqq3fs45hs0dvqkwnt0rav'
  }
];

export const GENERATE_NETWORK_BLOCKS = (): NetworkBlock[] => [
  {
    blockHeight: 884920,
    hash: '000000000000000000021a8e73f91d0411a7b629e41209b52c00a0ef',
    transactionsCount: 3824,
    miner: 'Royalty Mining Pool #4',
    rewardBTC: 3.125,
    timeAgo: '2 mins ago'
  },
  {
    blockHeight: 884919,
    hash: '0000000000000000000192eef43110a29810f443b7910931215bb2a',
    transactionsCount: 2910,
    miner: 'AntPool System',
    rewardBTC: 3.125,
    timeAgo: '11 mins ago'
  },
  {
    blockHeight: 884918,
    hash: '00000000000000000003b1291823ab401211115e8d9900c144a1e12',
    transactionsCount: 4102,
    miner: 'Royalty Mining Pool #1',
    rewardBTC: 3.125,
    timeAgo: '19 mins ago'
  },
  {
    blockHeight: 884917,
    hash: '00000000000000000000ff124a9103c81211ef5638a71d90019a82c',
    transactionsCount: 3418,
    miner: 'Foundry USA Pool',
    rewardBTC: 3.125,
    timeAgo: '28 mins ago'
  }
];
