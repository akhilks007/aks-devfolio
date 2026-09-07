'use client';

import { motion, type Variants, useReducedMotion } from 'motion/react';

const charVariants: Variants = {
  closed: { y: '110%', opacity: 0, rotateX: -40 },
  open: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 300, damping: 26 },
  },
};

// Splits a label into per-character spans that stagger in under a parent's
// `variants`. Decorative only — the accessible name lives on the enclosing
// <a aria-label>, so this span is hidden from assistive tech.
export default function AnimatedChars({ text }: { text: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span aria-hidden='true'>{text}</span>;
  }

  return (
    <span aria-hidden='true' className='inline-flex overflow-hidden py-[0.1em]'>
      {text.split('').map((ch, i) => (
        <motion.span key={`${ch}-${i}`} variants={charVariants} className='inline-block will-change-transform'>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}
