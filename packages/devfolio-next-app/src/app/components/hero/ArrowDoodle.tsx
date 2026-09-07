'use client';

import { motion, useReducedMotion } from 'motion/react';

// Inline replacement for /public/arrow@3x.png. A raster PNG can't be
// stroke-animated, so the curve is redrawn as two paths (tail, then head) that
// draw themselves in via pathLength — same technique as LogoMark in
// ../header/icons.tsx.
//
// The greeting sits up and to the right of the memoji, so the stroke starts
// beside the text and sweeps down-and-left, with the head landing on the
// avatar's top-right — matching the reference design.
const TAIL = 'M70 6C46 4 18 12 9 44';
const HEAD = 'M3 31 9 46l15-7';

type ArrowDoodleProps = {
  className?: string;
};

export default function ArrowDoodle({ className }: ArrowDoodleProps) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox='0 0 72 52'
      fill='none'
      aria-hidden='true'
      focusable='false'
      className={className}>
      {[TAIL, HEAD].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke='currentColor'
          strokeWidth={1.5}
          strokeLinecap='round'
          strokeLinejoin='round'
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={
            reduced
              ? { duration: 0 }
              : // the head only starts once the tail has nearly landed, so the
                // stroke reads as one continuous gesture
                { duration: 0.7, delay: 0.55 + i * 0.5, ease: [0.16, 1, 0.3, 1] }
          }
        />
      ))}
    </svg>
  );
}
