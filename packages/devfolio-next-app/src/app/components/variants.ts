import type { Variants } from 'motion/react';

// Shared entry-animation variants. No "use client" needed here — this module
// only exports plain data, no hooks or JSX.

// Header children drop *down* into a bar that is already at the top of the
// viewport, so this starts above its resting position.
export const fadeUpBlur: Variants = {
  hidden: { y: -18, opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 320, damping: 26, mass: 0.6 },
  },
};

// Page content rises *into* place from below. Tweened rather than sprung: the
// hero staggers several large blocks and a spring overshoot on 48px-tall text
// reads as wobble.
export const riseBlur: Variants = {
  hidden: { y: 24, opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const reducedFadeUpBlur: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export function staggerContainer(
  staggerChildren = 0.07,
  delayChildren = 0.15,
): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}
