'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { NavItem } from './nav-items';
import Magnetic from './Magnetic';
import { fadeUpBlur, reducedFadeUpBlur } from './variants';

type NavLinkProps = {
  item: NavItem;
  isActive: boolean;
};

// Both copies live in a box that is exactly one line tall, so `100%` means
// the same distance for each and they move in lockstep. Measuring against the
// padded <a> instead would move them by different amounts and leave a sliver
// of the outgoing label visible in the padding.
const rollOut = {
  rest: { y: '0%' },
  hover: { y: '-100%' },
};
const rollIn = {
  rest: { y: '100%' },
  hover: { y: '0%' },
};
const rollTransition = { duration: 0.28, ease: [0.16, 1, 0.3, 1] } as const;

export default function NavLink({ item, isActive }: NavLinkProps) {
  const reduced = useReducedMotion();

  return (
    <motion.li variants={reduced ? reducedFadeUpBlur : fadeUpBlur} className='relative'>
      {isActive && (
        <motion.span
          layoutId='nav-pill-desktop'
          className='absolute inset-0 -z-10 rounded-full bg-white/8 ring-1 ring-violet-400/25'
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32, mass: 0.6 }}
        />
      )}
      <Magnetic>
        <motion.a
          href={item.href}
          aria-current={isActive ? 'true' : undefined}
          initial='rest'
          whileHover='hover'
          whileFocus='hover'
          className='relative block rounded-full px-4 py-2 text-[13px] font-medium text-white/80 outline-none focus-visible:ring-2 focus-visible:ring-violet-400 md:text-[15px]'>
          <span className='relative block overflow-hidden'>
            <motion.span variants={rollOut} transition={rollTransition} className='block'>
              {item.label}
            </motion.span>
            <motion.span
              aria-hidden='true'
              variants={rollIn}
              transition={rollTransition}
              className='absolute inset-0 block text-violet-300'>
              {item.label}
            </motion.span>
          </span>
        </motion.a>
      </Magnetic>
    </motion.li>
  );
}
