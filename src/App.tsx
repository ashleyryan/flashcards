import { useState } from 'react'

// Sample trick words - you can replace these with your son's actual words
const INITIAL_WORDS = [
  // group 2
  'a','and', 'the','of','is','his',
  // group 3
  'has','to', 'into','as',
  // group 4
  'was','you','said','they','your','I', 'one',
  // group 5
  'have', 'or', 'from',
  // group 6
  'are','where', 'here','what','there','when', 'who',
  // group 7
  'by', 'why','some','very','put','try','come','my','also','two', 'too'
];

function shuffleWords() {
  return [...INITIAL_WORDS].sort(() => Math.random() - 0.5);
}

function App() {
  const [remainingWords, setRemainingWords] = useState<string[]>(shuffleWords);
  const [currentWord, setCurrentWord] = useState<string>(() => {
    const shuffled = shuffleWords();
    return shuffled[0] || '';
  });
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const resetGame = () => {
    const shuffled = shuffleWords();
    setRemainingWords(shuffled);
    setCurrentWord(shuffled[0] || '');
    setCorrect(0);
    setIncorrect(0);
    setIsComplete(false);
  };

  const pickNextWord = (wordsLeft: string[]) => {
    if (wordsLeft.length === 0) {
      setIsComplete(true);
      setCurrentWord('');
    } else {
      const randomIndex = Math.floor(Math.random() * wordsLeft.length);
      setCurrentWord(wordsLeft[randomIndex]);
    }
  };

  const handleCorrect = () => {
    setCorrect(prev => prev + 1);
    const newWords = remainingWords.filter(word => word !== currentWord);
    setRemainingWords(newWords);
    pickNextWord(newWords);
  };

  const handleIncorrect = () => {
    setIncorrect(prev => prev + 1);
    pickNextWord(remainingWords);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-4 overflow-hidden">
      {/* Header with stats */}
      <div className="flex justify-between items-center mb-2 px-4 flex-shrink-0">
        <div className="text-lg font-semibold text-gray-700">
          Remaining: <span className="text-indigo-600 text-2xl">{remainingWords.length}</span> / {INITIAL_WORDS.length}
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

      {/* Main flashcard area */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        {isComplete ? (
          <div className="text-center">
            <h1 className="text-6xl font-bold text-indigo-600 mb-8">🎉 Great Job! 🎉</h1>
            <p className="text-3xl text-gray-700 mb-8">
              Score: {correct} correct, {incorrect} incorrect
            </p>
            <button
              onClick={resetGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full max-w-4xl max-h-full">
            {/* Flashcard */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 h-full flex flex-col relative">
              {/* Word display area */}
              <div className="flex-1 flex items-center justify-center pb-32">
                <p className="text-8xl md:text-9xl font-bold text-gray-800 select-none">
                  {currentWord}
                </p>
              </div>

              {/* Buttons in bottom right corner */}
              <div className="absolute bottom-8 right-8 flex gap-4">
                <button
                  onClick={handleIncorrect}
                  className="bg-red-500 hover:bg-red-600 text-white text-4xl w-24 h-24 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center"
                  aria-label="Incorrect"
                >
                  ✗
                </button>
                <button
                  onClick={handleCorrect}
                  className="bg-green-500 hover:bg-green-600 text-white text-4xl w-24 h-24 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center"
                  aria-label="Correct"
                >
                  ✓
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
