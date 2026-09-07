'use client';

import { useEffect, useRef } from 'react';
import { motion, type Variants, useReducedMotion } from 'motion/react';
import { NAV_ITEMS, SOCIALS } from './nav-items';
import AnimatedChars from './AnimatedChars';
import { SocialIcon } from './icons';
import useBodyScrollLock from './useBodyScrollLock';

type MobileMenuProps = {
  activeId: string;
  onClose: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Full-screen nav overlay. Rendered as a sibling of <motion.header>, never a
// descendant of it — the header carries a persistent inline `transform`
// (from its own entry animation), which would make it the containing block
// for any `position: fixed` descendant and break this panel's full-viewport
// coverage.
export default function MobileMenu({ activeId, onClose, onNavClick, toggleRef }: MobileMenuProps) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(true);

  // Focus trap: focus the first link on open, cycle Tab between the panel's
  // focusable elements plus the toggle button (which renders outside the
  // panel, above it), close on Escape, restore focus to whatever opened it.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      // toggleRef comes first: in DOM order the toggle button (in the header)
      // precedes this panel, so it's the true first/previous stop in the tab
      // sequence, not the last — get this backwards and forward-Tab from the
      // last panel item escapes into page content instead of wrapping.
      const nodes = [
        toggleRef.current,
        ...(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((n): n is HTMLElement => !!n);
      if (nodes.length === 0) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [onClose, toggleRef]);

  const panelVariants: Variants = reduced
    ? { closed: { opacity: 0 }, open: { opacity: 1, transition: { duration: 0.15 } } }
    : {
        closed: {
          clipPath: 'inset(0% 0% 100% 0% round 0px 0px 32px 32px)',
          transition: { type: 'spring', stiffness: 400, damping: 40, when: 'afterChildren' },
        },
        open: {
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 32px 32px)',
          transition: {
            type: 'spring',
            stiffness: 160,
            damping: 26,
            when: 'beforeChildren',
            delayChildren: 0.1,
            staggerChildren: 0.07,
          },
        },
      };

  const groupVariants: Variants = {
    closed: {},
    open: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const itemVariants: Variants = reduced
    ? { closed: { opacity: 0 }, open: { opacity: 1, transition: { duration: 0.15 } } }
    : {
        closed: { opacity: 0, y: 24 },
        open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 26 } },
      };

  const socialsVariants: Variants = reduced
    ? { closed: { opacity: 0 }, open: { opacity: 1, transition: { duration: 0.15, delay: 0.1 } } }
    : { closed: { opacity: 0, y: 16 }, open: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.05 } } };

  return (
    <motion.div
      ref={panelRef}
      id='mobile-menu'
      role='dialog'
      aria-modal='true'
      aria-label='Site menu'
      initial='closed'
      animate='open'
      exit='closed'
      variants={panelVariants}
      className='fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-[#11071f]/97 pt-[var(--header-h)] backdrop-blur-2xl md:hidden'>
      <motion.ul variants={groupVariants} className='flex flex-1 flex-col justify-center gap-2 px-8 py-10'>
        {NAV_ITEMS.map((item) => (
          <motion.li key={item.id} variants={itemVariants}>
            <a
              href={item.href}
              aria-label={item.label}
              aria-current={item.id === activeId ? 'true' : undefined}
              onClick={(e) => onNavClick(e, item.href)}
              className={`block py-3 text-4xl font-semibold tracking-tight outline-none transition-colors sm:text-5xl ${
                item.id === activeId ? 'text-violet-300' : 'text-white/85 hover:text-white'
              }`}>
              <AnimatedChars text={item.label} />
            </a>
          </motion.li>
        ))}
      </motion.ul>
      <motion.div variants={socialsVariants} className='flex flex-wrap gap-5 border-t border-white/10 px-8 py-8'>
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className='grid h-11 w-11 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white'>
            <SocialIcon icon={social.icon} className='h-5 w-5' />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
