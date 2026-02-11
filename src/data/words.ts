
export const INITIAL_WORDS = [
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

export function shuffleWords(): string[] {
  return [...INITIAL_WORDS].sort(() => Math.random() - 0.5);
}
