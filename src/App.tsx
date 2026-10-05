import React from 'react';
import { MiningProvider, useMining } from './context/MiningContext';
import { HeaderBar } from './components/HeaderBar';
import { NetworkStatsCard } from './components/NetworkStatsCard';
import { MiningBalanceCard } from './components/MiningBalanceCard';
import { ReactorCore } from './components/ReactorCore';
import { ProtocolDescriptionCard } from './components/ProtocolDescriptionCard';
import { SocialChannelsCard } from './components/SocialChannelsCard';
import { RigsTab } from './components/RigsTab';
import { TeamTab } from './components/TeamTab';
import { TasksTab } from './components/TasksTab';
import { WalletTab } from './components/WalletTab';
import { BottomNavBar } from './components/BottomNavBar';
import { StreakModal } from './components/StreakModal';
import { AiAdvisorDrawer } from './components/AiAdvisorDrawer';
import { AuthModal } from './components/AuthModal';
import { CryptoWalletDepositModal } from './components/CryptoWalletDepositModal';

const MainContent: React.FC = () => {
  const { activeTab, showAuthModal, setShowAuthModal, showDepositModal, setShowDepositModal } = useMining();

  return (
    <main className="max-w-xl mx-auto px-4 pt-3 pb-24 flex flex-col gap-4">
      {activeTab === 'home' && (
        <>
          <NetworkStatsCard />
          <MiningBalanceCard />
          <ReactorCore />
          <ProtocolDescriptionCard />
          <SocialChannelsCard />
        </>
      )}

      {activeTab === 'rigs' && <RigsTab />}
      {activeTab === 'team' && <TeamTab />}
      {activeTab === 'tasks' && <TasksTab />}
      {activeTab === 'wallet' && <WalletTab />}

      <StreakModal />
      <AiAdvisorDrawer />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CryptoWalletDepositModal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} />
    </main>
  );
};

export default function App() {
  return (
    <MiningProvider>
      <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
        <HeaderBar />
        <MainContent />
        <BottomNavBar />
      </div>
    </MiningProvider>
  );
}
