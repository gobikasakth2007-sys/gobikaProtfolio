import { useState, useEffect } from 'react';

interface TypingTextProps {
  phrases: string[];
}

export function TypingText({ phrases }: TypingTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const safePhrases = phrases.length > 0 ? phrases : ['Java Developer'];
  const currentPhrase = safePhrases[phraseIndex % safePhrases.length];

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setCharIndex(currentPhrase.length);
      return;
    }

    let timeoutId: number;

    if (!isDeleting && charIndex < currentPhrase.length) {
      timeoutId = window.setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, 65);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, 1700);
    } else if (isDeleting && charIndex > 0) {
      timeoutId = window.setTimeout(() => {
        setCharIndex((c) => c - 1);
      }, 36);
    } else {
      setIsDeleting(false);
      setPhraseIndex((idx) => (idx + 1) % safePhrases.length);
    }

    return () => window.clearTimeout(timeoutId);
  }, [charIndex, isDeleting, currentPhrase, safePhrases.length]);

  const displayed = currentPhrase.slice(0, charIndex);

  return (
    <span className="inline-flex items-center font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400">
      <span>{displayed}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.1em] w-[2px] bg-blue-500 dark:bg-blue-400 animate-pulse"
      />
    </span>
  );
}
