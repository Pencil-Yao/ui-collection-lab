'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'motion/react';

import './TypingAnimation.css';

const CURSORS = { line: '|', block: '▌', underscore: '_' };

export function TypingAnimation({
  children,
  words,
  className = '',
  duration = 100,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1000,
  loop = false,
  as: Tag = 'span',
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = 'line',
  ...props
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState('typing');
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });

  const wordsToAnimate = useMemo(
    () => words ?? (children ? [children] : []),
    [words, children]
  );
  const hasMultipleWords = wordsToAnimate.length > 1;
  const typingSpeed = typeSpeed ?? duration;
  const deletingSpeed = deleteSpeed ?? typingSpeed / 2;
  const shouldStart = startOnView ? isInView : true;

  const sourceKey = useMemo(
    () => (words ? words.join('\u0000') : children ?? ''),
    [words, children]
  );
  const [prevSourceKey, setPrevSourceKey] = useState(sourceKey);
  if (prevSourceKey !== sourceKey) {
    setPrevSourceKey(sourceKey);
    setDisplayedText('');
    setWordIndex(0);
    setCharIndex(0);
    setPhase('typing');
  }

  useEffect(() => {
    let timeout = null;
    if (!shouldStart || wordsToAnimate.length === 0) return;

    const timeoutDelay =
      delay > 0 && displayedText === ''
        ? delay
        : phase === 'typing'
          ? typingSpeed
          : phase === 'deleting'
            ? deletingSpeed
            : pauseDelay;

    timeout = setTimeout(() => {
      const currentWord = wordsToAnimate[wordIndex] || '';
      const graphemes = Array.from(currentWord);

      if (phase === 'typing') {
        if (charIndex < graphemes.length) {
          setDisplayedText(graphemes.slice(0, charIndex + 1).join(''));
          setCharIndex(charIndex + 1);
        } else if (hasMultipleWords || loop) {
          const isLastWord = wordIndex === wordsToAnimate.length - 1;
          if (!isLastWord || loop) setPhase('pause');
        }
      } else if (phase === 'pause') {
        setPhase('deleting');
      } else if (phase === 'deleting') {
        if (charIndex > 0) {
          setDisplayedText(graphemes.slice(0, charIndex - 1).join(''));
          setCharIndex(charIndex - 1);
        } else {
          setWordIndex((wordIndex + 1) % wordsToAnimate.length);
          setPhase('typing');
        }
      }
    }, timeoutDelay);

    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [
    shouldStart,
    phase,
    charIndex,
    wordIndex,
    displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    delay
  ]);

  const currentGraphemes = Array.from(wordsToAnimate[wordIndex] || '');
  const isComplete =
    !loop &&
    wordIndex === wordsToAnimate.length - 1 &&
    charIndex >= currentGraphemes.length &&
    phase !== 'deleting';

  const shouldShowCursor =
    showCursor &&
    !isComplete &&
    (hasMultipleWords || loop || charIndex < currentGraphemes.length);

  return (
    <Tag
      ref={elementRef}
      className={['typing-animation', className].filter(Boolean).join(' ')}
      {...props}
    >
      {displayedText}
      {shouldShowCursor ? (
        <span
          className={['typing-animation__cursor', blinkCursor ? '' : 'typing-animation__cursor--static']
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        >
          {CURSORS[cursorStyle] || CURSORS.line}
        </span>
      ) : null}
    </Tag>
  );
}

export default TypingAnimation;
