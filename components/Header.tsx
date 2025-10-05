
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-primary-dark tracking-tight">
        Hifz Goal Tracker
      </h1>
      <p className="mt-3 text-lg text-light-text max-w-md mx-auto">
        Set your daily, weekly, and monthly Qur'an memorization goals and share them with your teacher.
      </p>
    </header>
  );
};

export default Header;
