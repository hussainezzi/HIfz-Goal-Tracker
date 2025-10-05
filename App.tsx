
import React, { useState } from 'react';
import { AppGoals, GoalCategory, GoalPeriod } from './types';
import Header from './components/Header';
import GoalCard from './components/GoalCard';
import WhatsAppButton from './components/WhatsAppButton';
import JuzSelectorModal from './components/JuzSelectorModal';

const App: React.FC = () => {
  const [goals, setGoals] = useState<AppGoals>({
    murajaat: { today: '', week: '', month: '' },
    juzHaali: { today: '' },
    jadeed: { today: '', week: '', month: '' },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGoalTarget, setActiveGoalTarget] = useState<{
    category: GoalCategory;
    period: GoalPeriod;
  } | null>(null);

  const handleGoalChange = (
    category: GoalCategory,
    period: GoalPeriod,
    value: string
  ) => {
    setGoals((prevGoals) => ({
      ...prevGoals,
      [category]: {
        ...prevGoals[category],
        [period]: value,
      },
    }));
  };
  
  const handleOpenModal = (category: GoalCategory, period: GoalPeriod) => {
    setActiveGoalTarget({ category, period });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveGoalTarget(null);
  };

  const handleSetGoalFromModal = (goalString: string) => {
    if (activeGoalTarget) {
      handleGoalChange(
        activeGoalTarget.category,
        activeGoalTarget.period,
        goalString
      );
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="space-y-6 mt-8">
          <GoalCard
            title="Murajaat"
            subtitle="Revision"
            description="Set your targets for revising previously memorized portions."
            category="murajaat"
            goals={goals.murajaat}
            onGoalChange={handleGoalChange}
            onOpenModal={handleOpenModal}
          />
          <GoalCard
            title="Juz Haali"
            subtitle="Recent Memorization"
            description="Plan your revision for the most recently memorized Juz."
            category="juzHaali"
            goals={goals.juzHaali}
            onGoalChange={handleGoalChange}
            onOpenModal={handleOpenModal}
          />
          <GoalCard
            title="Jadeed"
            subtitle="New Memorization"
            description="Define your goals for memorizing new verses today, this week, and this month."
            category="jadeed"
            goals={goals.jadeed}
            onGoalChange={handleGoalChange}
            onOpenModal={handleOpenModal}
          />
        </main>
        <footer className="mt-8 text-center">
          <WhatsAppButton goals={goals} />
        </footer>
      </div>
      <JuzSelectorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSetGoal={handleSetGoalFromModal}
      />
    </div>
  );
};

export default App;
