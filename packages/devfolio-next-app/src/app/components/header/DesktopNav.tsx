'use client';

import { motion } from 'motion/react';
import { NAV_ITEMS } from './nav-items';
import NavLink from './NavLink';
import { staggerContainer } from '../variants';

const listVariants = staggerContainer(0.06, 0);

type DesktopNavProps = {
  activeId: string;
};

export default function DesktopNav({ activeId }: DesktopNavProps) {
  return (
    <motion.ul variants={listVariants} className='hidden items-center gap-1 md:flex lg:gap-2'>
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.id} item={item} isActive={item.id === activeId} />
      ))}
    </motion.ul>
  );
}
