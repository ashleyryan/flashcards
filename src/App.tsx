import { useState } from 'react'
import { INITIAL_WORDS, shuffleWords } from './data/words'
import { useStats, statsStore } from './stores/statsStore'
import { Header } from './components/Header'
import { StatsModal } from './components/StatsModal'
import { GameComplete } from './components/GameComplete'
import { Flashcard } from './components/Flashcard'

function App() {
  const stats = useStats();
  const [remainingWords, setRemainingWords] = useState<string[]>(shuffleWords);
  const [currentWord, setCurrentWord] = useState<string>(() => {
    const shuffled = shuffleWords();
    return shuffled[0] || '';
  });
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

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
    statsStore.updateWordStat(currentWord, true);
    setCorrect(prev => prev + 1);
    const newWords = remainingWords.filter(word => word !== currentWord);
    setRemainingWords(newWords);
    pickNextWord(newWords);
  };

  const handleIncorrect = () => {
    statsStore.updateWordStat(currentWord, false);
    setIncorrect(prev => prev + 1);
    pickNextWord(remainingWords);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-4 overflow-hidden">
      <Header
        onStatsClick={() => setShowStatsModal(true)}
        remaining={remainingWords.length}
        total={INITIAL_WORDS.length}
        correct={correct}
        incorrect={incorrect}
      />

      {showStatsModal && (
        <StatsModal 
          stats={stats}
          onClose={() => setShowStatsModal(false)} 
        />
      )}

      <div className="flex-1 flex items-center justify-center min-h-0">
        {isComplete ? (
          <GameComplete
            correct={correct}
            incorrect={incorrect}
            onPlayAgain={resetGame}
          />
        ) : (
          <Flashcard
            word={currentWord}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        )}
      </div>
    </div>
  );
}

export default App;
