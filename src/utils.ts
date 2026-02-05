export const filterChars = (str: string) => {
  return str
    .toLowerCase()
    .split("")
    .filter((ch) => /[a-zA-Z0-9]/.test(ch));
};

export const countChars = (chars: string[]) => {
  const counts: { [ch: string]: number } = {};
  for (const ch of chars) {
    counts[ch] = (counts[ch] || 0) + 1;
  }
  return counts;
};

export const hasMinRequiredChars = (originalSentence: string, anagram: string) => {
  const originalCounts = countChars(filterChars(originalSentence));
  const anagramCounts = countChars(filterChars(anagram));

  for (const ch of Object.keys(originalCounts)) {
    if ((anagramCounts[ch] || 0) < originalCounts[ch]) {
      return false;
    }
  }

  return true;
};

export const extraCharPresent = (originalSentence: string, anagram: string, allowRepeats: boolean) => {
  const originalCounts = countChars(filterChars(originalSentence));
  const anagramChars = filterChars(anagram);
  const anagramCounts = countChars(anagramChars);

  if (!allowRepeats) {
    for (const ch of Object.keys(anagramCounts)) {
      if ((anagramCounts[ch] || 0) > (originalCounts[ch] || 0)) {
        return true;
      }
    }
  } else {
    for (const ch of Object.keys(anagramCounts)) {
      if ((originalCounts[ch] || 0) === 0) {
        return true;
      }
    }
  }

  return false;
};

export const validateAnagram = (
  original: string,
  typed: string,
  allowRepeats: boolean,
  filterFn: (s: string) => string[],
) => {
  const normalizedAnagram = filterFn(typed).join("");
  const normalizedOriginal = filterFn(original).join("");

  const isNotSameWord = normalizedAnagram !== normalizedOriginal;
  const hasRequiredLength = !allowRepeats
    ? normalizedAnagram.length === normalizedOriginal.length
    : normalizedAnagram.length >= normalizedOriginal.length;

  if (
    !isNotSameWord ||
    !hasRequiredLength ||
    !hasMinRequiredChars(original, typed) ||
    extraCharPresent(original, typed, allowRepeats)
  ) {
    return false;
  }

  return true;
};
