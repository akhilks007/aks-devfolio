import type { Variants } from 'motion/react';

// Shared entry-animation variants for header children. No "use client"
// needed here — this module only exports plain data, no hooks or JSX.

export const fadeUpBlur: Variants = {
  hidden: { y: -18, opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 320, damping: 26, mass: 0.6 },
  },
};

export const reducedFadeUpBlur: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export function staggerContainer(staggerChildren = 0.07, delayChildren = 0.15): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}
