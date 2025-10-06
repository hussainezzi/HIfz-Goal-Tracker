
import React, { useState, useEffect } from 'react';

interface JuzSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetGoal: (goalString: string) => void;
}

const JuzSelectorModal: React.FC<JuzSelectorModalProps> = ({ isOpen, onClose, onSetGoal }) => {
  if (!isOpen) return null;

  const [isRange, setIsRange] = useState(false);
  const [fromJuz, setFromJuz] = useState(1);
  const [fromPage, setFromPage] = useState(1);
  const [toJuz, setToJuz] = useState(1);
  const [toPage, setToPage] = useState(1);
  
  const juzOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  const pageOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    // Basic validation to keep 'to' after 'from'
    if (toJuz < fromJuz) {
      setToJuz(fromJuz);
      setToPage(fromPage);
    } else if (toJuz === fromJuz && toPage < fromPage) {
      setToPage(fromPage);
    }
  }, [fromJuz, fromPage, toJuz, toPage]);

  const handleSetGoal = () => {
    let goalString = '';
    if (!isRange) {
      goalString = `Juz ${fromJuz}, Page ${fromPage}`;
    } else {
      if (fromJuz === toJuz) {
        if (fromPage === 1 && toPage === 20) {
          goalString = `Juz ${fromJuz} (full)`;
        } else if (fromPage === toPage) {
           goalString = `Juz ${fromJuz}, Page ${fromPage}`;
        } else {
          goalString = `Juz ${fromJuz}, Pages ${fromPage}-${toPage}`;
        }
      } else {
        goalString = `From Juz ${fromJuz}, Page ${fromPage} to Juz ${toJuz}, Page ${toPage}`;
      }
    }
    onSetGoal(goalString);
  };
  
  const renderSelect = (value: number, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: number[]) => (
     <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-primary-dark mb-4">Select Goal Range</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-dark-text mb-2">From</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-text mb-1">ألجزء</label>
                {renderSelect(fromJuz, (e) => setFromJuz(Number(e.target.value)), juzOptions)}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-text mb-1">ألصفحة</label>
                {renderSelect(fromPage, (e) => setFromPage(Number(e.target.value)), pageOptions)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox"
              id="isRange"
              checked={isRange}
              onChange={(e) => setIsRange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isRange" className="ml-2 block text-sm text-dark-text">Set an end point for the range</label>
          </div>

          {isRange && (
             <div className="animate-fade-in">
              <h3 className="font-semibold text-dark-text mb-2">To</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-1">ألجزء</label>
                  {renderSelect(toJuz, (e) => setToJuz(Number(e.target.value)), juzOptions)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-1">ألصفحة</label>
                  {renderSelect(toPage, (e) => setToPage(Number(e.target.value)), pageOptions)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSetGoal}
            className="px-6 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
          >
            Set Goal
          </button>
        </div>
      </div>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default JuzSelectorModal;
