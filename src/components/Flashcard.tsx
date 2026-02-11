interface FlashcardProps {
  word: string;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export function Flashcard({ word, onCorrect, onIncorrect }: Readonly<FlashcardProps>) {
  return (
    <div className="relative w-full h-full max-w-4xl max-h-full">
      <div className="bg-white rounded-3xl shadow-2xl p-8 h-full flex flex-col relative">
        {/* Word display area */}
        <div className="flex-1 flex items-center justify-center pb-32">
          <p className="text-8xl md:text-9xl font-bold text-gray-800 select-none">
            {word}
          </p>
        </div>

        {/* Buttons in bottom right corner */}
        <div className="absolute bottom-8 right-8 flex gap-4">
          <button
            onClick={onIncorrect}
            className="bg-red-500 hover:bg-red-600 text-white text-4xl w-24 h-24 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center"
            aria-label="Incorrect"
          >
            ✗
          </button>
          <button
            onClick={onCorrect}
            className="bg-green-500 hover:bg-green-600 text-white text-4xl w-24 h-24 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center"
            aria-label="Correct"
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}
