interface GameCompleteProps {
  correct: number;
  incorrect: number;
  onPlayAgain: () => void;
}

export function GameComplete({ correct, incorrect, onPlayAgain }: Readonly<GameCompleteProps>) {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-indigo-600 mb-8">🎉 Great Job! 🎉</h1>
      <p className="text-3xl text-gray-700 mb-8">
        Score: {correct} correct, {incorrect} incorrect
      </p>
      <button
        onClick={onPlayAgain}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
      >
        Play Again
      </button>
    </div>
  );
}
