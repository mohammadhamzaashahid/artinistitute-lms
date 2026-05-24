"use client";

import { useEffect, useMemo, useState } from "react";

export default function TypingWords({
  words = ["commuting.", "walking.", "traveling.", "resting."],
  typingSpeed = 70,
  deletingSpeed = 45,
  pause = 1200,
}) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!safeWords.length) return;

    const currentWord = safeWords[wordIndex % safeWords.length];

    let timeout;

    if (!isDeleting && displayedText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayedText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % safeWords.length);
      }, 180);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayedText((prev) => {
            if (isDeleting) {
              return currentWord.slice(0, Math.max(prev.length - 1, 0));
            }

            return currentWord.slice(0, prev.length + 1);
          });
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    wordIndex,
    safeWords,
    typingSpeed,
    deletingSpeed,
    pause,
  ]);

  return (
    <span className="inline-flex items-center text-[#377dff]">
      {displayedText}
      <span className="ml-2 inline-block h-[0.9em] w-[3px] translate-y-[4px] animate-pulse rounded-full bg-[#dbe6ff]" />
    </span>
  );
}