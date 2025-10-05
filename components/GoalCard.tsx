
import React from 'react';
import { Goal, GoalCategory, GoalPeriod } from '../types';
import GoalInput from './GoalInput';

interface GoalCardProps {
  title: string;
  subtitle: string;
  description: string;
  category: GoalCategory;
  goals: Goal;
  onGoalChange: (category: GoalCategory, period: GoalPeriod, value: string) => void;
  onOpenModal: (category: GoalCategory, period: GoalPeriod) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  title,
  subtitle,
  description,
  category,
  goals,
  onGoalChange,
  onOpenModal,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-baseline">
          <h2 className="text-2xl font-bold text-primary-dark">{title}</h2>
          <p className="ml-2 text-sm font-semibold text-primary">({subtitle})</p>
        </div>
        <p className="mt-1 text-light-text">{description}</p>
        <div className="mt-6 space-y-4">
          {Object.keys(goals).map((period) => (
            <GoalInput
              key={period}
              label={`${period.charAt(0).toUpperCase() + period.slice(1)}'s Goal`}
              value={goals[period as GoalPeriod] as string}
              onChange={(e) =>
                onGoalChange(category, period as GoalPeriod, e.target.value)
              }
              placeholder={`e.g., Surah Al-Baqarah, Ayah 1-20`}
              onOpenModal={() => onOpenModal(category, period as GoalPeriod)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalCard;
