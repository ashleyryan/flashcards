interface HeaderProps {
  onStatsClick: () => void;
  remaining: number;
  total: number;
  correct: number;
  incorrect: number;
}

export function Header({ onStatsClick, remaining, total, correct, incorrect }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-2 px-4 flex-shrink-0">
      <button
        onClick={onStatsClick}
        className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 underline"
      >
        📊 Stats
      </button>
      <div className="text-lg font-semibold text-gray-700">
        Remaining: <span className="text-indigo-600 text-2xl">{remaining}</span> / {total}
      </div>
      <div className="flex gap-6 text-lg font-semibold">
        <div className="text-green-600">
          ✓ <span className="text-2xl">{correct}</span>
        </div>
        <div className="text-red-600">
          ✗ <span className="text-2xl">{incorrect}</span>
        </div>
      </div>
    </div>
  );
}
