
import React from 'react';
import { JUZ_SELECTOR_ICON } from '../constants';

interface GoalInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onOpenModal: () => void;
}

const GoalInput: React.FC<GoalInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  onOpenModal,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-dark-text mb-1">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
        />
        <button
          type="button"
          onClick={onOpenModal}
          aria-label="Open Juz and Page selector"
          className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
        >
          {JUZ_SELECTOR_ICON}
        </button>
      </div>
    </div>
  );
};

export default GoalInput;
