'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const TYPE_MS = 55;
const DELETE_MS = 35;
const HOLD_MS = 1800;
// Beat between finishing a delete and starting the next word, so the caret
// blinks alone for a moment instead of snapping straight into new text.
const SWITCH_MS = 350;

type TypewriterProps = {
  /** Cycled in order, then looped. Must not be empty. */
  words: readonly string[];
  className?: string;
};

export default function Typewriter({ words, className }: TypewriterProps) {
  const reduced = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const word = words[wordIndex % words.length];

    // One self-rescheduling timeout rather than an interval: each phase has a
    // different cadence, and this way there is only ever one timer to clear.
    let delay: number;
    if (!deleting && text === word) {
      delay = HOLD_MS;
    } else if (deleting && text === '') {
      delay = SWITCH_MS;
    } else {
      delay = deleting ? DELETE_MS : TYPE_MS;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, reduced]);

  // Nothing cycles under reduced motion, so the visible text is already stable
  // and can serve as the accessible text directly.
  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={className}>
      {/* The cycling text is decorative churn for assistive tech — partial
          words would be announced on every keystroke — so the accessible
          headline is a single stable string. */}
      <span className='sr-only'>{words[0]}</span>

      <span aria-hidden='true'>
        {text}
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            times: [0, 0.5, 0.5, 1],
            repeat: Infinity,
            ease: 'linear',
          }}
          className='ml-0.5 inline-block font-light text-violet-300'>
          |
        </motion.span>
      </span>
    </span>
  );
}
