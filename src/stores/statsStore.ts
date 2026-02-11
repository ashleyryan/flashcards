import { useSyncExternalStore } from 'react';

export interface WordStats {
  word: string;
  correct: number;
  incorrect: number;
}

const STATS_KEY = 'flashcard_stats';

// Store for word statistics using useSyncExternalStore pattern
export const statsStore = {
  cache: null as Record<string, WordStats> | null,

  getStats(): Record<string, WordStats> {
    if (this.cache !== null) {
      return this.cache;
    }
    const stored = localStorage.getItem(STATS_KEY);
    this.cache = stored ? JSON.parse(stored) : {};
    return this.cache!;
  },
  
  setStats(stats: Record<string, WordStats>) {
    this.cache = stats;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    this.notifyListeners();
  },
  
  updateWordStat(word: string, isCorrect: boolean) {
    const stats = this.getStats();
    if (!stats[word]) {
      stats[word] = { word, correct: 0, incorrect: 0 };
    }
    if (isCorrect) {
      stats[word].correct++;
    } else {
      stats[word].incorrect++;
    }
    this.setStats(stats);
  },
  
  clearStats() {
    this.cache = {};
    localStorage.setItem(STATS_KEY, JSON.stringify({}));
    this.notifyListeners();
  },
  
  listeners: new Set<() => void>(),
  
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  
  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
};

export function useStats() {
  return useSyncExternalStore(
    (callback) => statsStore.subscribe(callback),
    () => statsStore.getStats(),
    () => statsStore.getStats()
  );
}
