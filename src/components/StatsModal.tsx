import { useEffect, useRef } from 'react';
import type { WordStats } from '../stores/statsStore';
import { statsStore } from '../stores/statsStore';

interface StatsModalProps {
  stats: Record<string, WordStats>;
  onClose: () => void;
}

export function StatsModal({ stats, onClose }: Readonly<StatsModalProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    return () => {
      if (dialog) {
        dialog.close();
      }
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
      statsStore.clearStats();
      handleClose()
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (dialog && e.target === dialog) {
      handleClose();
    }
  };

  const getTopWords = () => {
    const statsList = Object.values(stats);
    
    const mostCorrect = [...statsList]
      .sort((a, b) => b.correct - a.correct)
      .slice(0, 10);
    
    const mostIncorrect = [...statsList]
      .sort((a, b) => b.incorrect - a.incorrect)
      .slice(0, 10);
    
    return { mostCorrect, mostIncorrect };
  };

  const { mostCorrect, mostIncorrect } = getTopWords();

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="backdrop:bg-black/50 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] p-0 m-auto"
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Word Statistics</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="text-red-600 hover:text-red-800 text-lg font-semibold underline"
            >
              Reset Stats
            </button>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-4xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Most Correct */}
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">✓ Most Correct</h3>
              <div className="space-y-2">
                {mostCorrect.map((stat, index) => (
                  <div key={stat.word} className="bg-green-50 rounded-lg p-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 font-bold text-lg">{index + 1}.</span>
                      <span className="text-xl font-semibold text-gray-800">{stat.word}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-bold text-lg">{stat.correct} ✓</div>
                      <div className="text-red-500 text-sm">{stat.incorrect} ✗</div>
                    </div>
                  </div>
                ))}
                {mostCorrect.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No data yet. Start practicing!</p>
                )}
              </div>
            </div>

            {/* Most Incorrect */}
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">✗ Needs Practice</h3>
              <div className="space-y-2">
                {mostIncorrect.map((stat, index) => (
                  <div key={stat.word} className="bg-red-50 rounded-lg p-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 font-bold text-lg">{index + 1}.</span>
                      <span className="text-xl font-semibold text-gray-800">{stat.word}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-red-600 font-bold text-lg">{stat.incorrect} ✗</div>
                      <div className="text-green-500 text-sm">{stat.correct} ✓</div>
                    </div>
                  </div>
                ))}
                {mostIncorrect.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No data yet. Start practicing!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
