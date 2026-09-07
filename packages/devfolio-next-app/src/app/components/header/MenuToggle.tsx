'use client';

import { forwardRef } from 'react';
import { motion, type Variants } from 'motion/react';

const spring = { type: 'spring', stiffness: 420, damping: 30 } as const;

const topVariants: Variants = {
  closed: { rotate: 0, y: -6 },
  open: { rotate: 45, y: 0 },
};
const middleVariants: Variants = {
  closed: { opacity: 1, scaleX: 1 },
  open: { opacity: 0, scaleX: 0.2 },
};
const bottomVariants: Variants = {
  closed: { rotate: 0, y: 6 },
  open: { rotate: -45, y: 0 },
};

type MenuToggleProps = {
  open: boolean;
  onClick: () => void;
};

// Hamburger <-> X morph built from three independent bars, forwardRef'd so
// the mobile-menu focus trap can include the toggle in its tab cycle even
// though the toggle renders outside the trapped panel.
const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProps>(function MenuToggle(
  { open, onClick },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type='button'
      aria-expanded={open}
      aria-controls='mobile-menu'
      aria-label={open ? 'Close menu' : 'Open menu'}
      animate={open ? 'open' : 'closed'}
      initial={false}
      onClick={onClick}
      className='relative grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden'>
      <motion.span
        variants={topVariants}
        transition={spring}
        className='absolute h-[2px] w-5 rounded-full bg-white'
      />
      <motion.span
        variants={middleVariants}
        transition={{ duration: 0.15 }}
        className='absolute h-[2px] w-5 rounded-full bg-white'
      />
      <motion.span
        variants={bottomVariants}
        transition={spring}
        className='absolute h-[2px] w-5 rounded-full bg-white'
      />
    </motion.button>
  );
});

export default MenuToggle;
