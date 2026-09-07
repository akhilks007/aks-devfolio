'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  type Variants,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import DesktopNav from './DesktopNav';
import Magnetic from './Magnetic';
import MenuToggle from './MenuToggle';
import MobileMenu from './MobileMenu';
import { LogoMark } from './icons';
import useActiveSection from './useActiveSection';
import { fadeUpBlur, reducedFadeUpBlur, staggerContainer } from './variants';

const rowVariants = staggerContainer(0.08, 0.15);

const glassVariants: Variants = {
  top: {
    backgroundColor: 'rgba(26,11,46,0)',
    borderColor: 'rgba(139,92,246,0)',
    boxShadow: '0 0px 0px -3px rgba(0,0,0,0)',
  },
  scrolled: {
    backgroundColor: 'rgba(26,11,46,0.72)',
    borderColor: 'rgba(139,92,246,0.15)',
    boxShadow: '0 6px 22px -3px rgba(0,0,0,0.45)',
  },
};

export default function Header() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pendingHash = useRef<string | null>(null);

  const activeId = useActiveSection();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    // hysteresis: different thresholds going down vs up stop the glass state
    // flapping when a user parks the scroll position near the boundary
    setScrolled((prev) => (prev ? v > 8 : v > 24));
  });

  // hydration-safe catch-up: server always renders the "top" state, so a
  // reload mid-page must reconcile scroll position only after mount
  useEffect(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  // pointer spotlight — header is `fixed top-0 left-0`, so clientX/clientY
  // are already header-local; no getBoundingClientRect needed, and it stays
  // correct through scroll for free
  const glowX = useMotionValue(-500);
  const glowY = useMotionValue(-500);
  const glowOpacity = useMotionValue(0);
  const springGlowX = useSpring(glowX, { stiffness: 150, damping: 22, mass: 0.5 });
  const springGlowY = useSpring(glowY, { stiffness: 150, damping: 22, mass: 0.5 });

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduced || e.pointerType !== 'mouse') return;
    glowX.set(e.clientX);
    glowY.set(e.clientY);
  }

  function handlePointerEnter(e: React.PointerEvent<HTMLElement>) {
    if (reduced || e.pointerType !== 'mouse') return;
    glowOpacity.set(1);
  }

  function handlePointerLeave() {
    glowOpacity.set(0);
  }

  function handleMobileNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  }

  function scrollToPending() {
    const href = pendingHash.current;
    pendingHash.current = null;
    if (!href) return;
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;
    history.pushState(null, '', href);
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className='fixed inset-x-0 top-0 z-50 h-[var(--header-h)] text-white'>
        <motion.div
          aria-hidden='true'
          animate={scrolled ? 'scrolled' : 'top'}
          variants={glassVariants}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 border-b transition-[backdrop-filter] duration-300 ${
            scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-none'
          }`}
        />

        <div aria-hidden='true' className='pointer-events-none absolute inset-0 overflow-hidden'>
          <motion.div
            style={{ x: springGlowX, y: springGlowY, opacity: glowOpacity }}
            className='absolute -top-24 -left-24 hidden h-48 w-48 rounded-full bg-violet-500/25 blur-3xl pointer-fine:block'
          />
        </div>

        <motion.div
          variants={rowVariants}
          initial='hidden'
          animate='visible'
          className='relative z-10 flex h-full items-center justify-between px-4 md:px-8'>
          <motion.div variants={reduced ? reducedFadeUpBlur : fadeUpBlur}>
            <Magnetic>
              <a
                href='#home'
                aria-label='Home'
                className='grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-white/10'>
                <LogoMark className='h-6 w-6' />
              </a>
            </Magnetic>
          </motion.div>

          <DesktopNav activeId={activeId} />

          <motion.div variants={reduced ? reducedFadeUpBlur : fadeUpBlur}>
            <MenuToggle ref={toggleRef} open={open} onClick={() => setOpen((v) => !v)} />
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Rendered as a header sibling, not a descendant — see MobileMenu.tsx */}
      <AnimatePresence onExitComplete={scrollToPending}>
        {open && (
          <MobileMenu
            activeId={activeId}
            onClose={() => setOpen(false)}
            onNavClick={handleMobileNavClick}
            toggleRef={toggleRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}
