
import React, { useMemo } from 'react';
import { AppGoals } from '../types';
import { WHATSAPP_ICON } from '../constants';

interface WhatsAppButtonProps {
  goals: AppGoals;
}

const formatMessage = (goals: AppGoals): string => {
  let message = "Assalamu Alaikum, Muhaffiz.\n\nHere are my Hifz goals:\n";

  const sections: { title: string; goals: any }[] = [
    { title: "Murajaat (Revision)", goals: goals.murajaat },
    { title: "Juz Haali (Recent)", goals: goals.juzHaali },
    { title: "Jadeed (New)", goals: goals.jadeed },
  ];

  let hasGoals = false;

  sections.forEach(section => {
    const goalEntries = Object.entries(section.goals).filter(
      ([_, value]) => (value as string).trim() !== ''
    );

    if (goalEntries.length > 0) {
      hasGoals = true;
      message += `\n*${section.title}:*\n`;
      goalEntries.forEach(([period, value]) => {
        const periodTitle = period.charAt(0).toUpperCase() + period.slice(1);
        message += `- ${periodTitle}'s: ${value}\n`;
      });
    }
  });

  if (!hasGoals) {
    return ""; 
  }

  message += "\nJazakAllah Khair.";
  return message;
};

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ goals }) => {
  const formattedMessage = useMemo(() => formatMessage(goals), [goals]);
  const isDisabled = formattedMessage === "";

  const href = isDisabled
    ? '#'
    : `https://wa.me/?text=${encodeURIComponent(formattedMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center px-8 py-4 border border-transparent 
        text-base font-medium rounded-full shadow-lg text-white 
        bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-primary-dark transition-all duration-300 
        transform hover:scale-105
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
        }
      }}
    >
      {WHATSAPP_ICON}
      <span className="ml-3">Share Goals on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
