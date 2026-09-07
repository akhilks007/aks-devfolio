'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  type Variants,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import classes from '../../styles.module.css';
import { reducedFadeUpBlur, riseBlur, staggerContainer } from '../variants';
import ArrowDoodle from './ArrowDoodle';
import Typewriter from './Typewriter';
import { HERO } from './hero-content';

const heroContainer = staggerContainer(0.09, 0.2);

// The memoji gets its own variant so it can scale up as it rises — a flat
// translate on a 258px circle reads as sliding paper.
const memojiVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax is measured against the hero's own box, so it is unaffected by
  // where the section sits on the page.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Hooks can't be called conditionally, so the transforms are always created
  // and simply left unapplied when the user asked for reduced motion.
  const memojiY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const memojiOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const item = reduced ? reducedFadeUpBlur : riseBlur;

  return (
    <section
      ref={heroRef}
      id='home'
      className='px-6 pt-10 pb-20 md:px-16 md:pt-16 lg:px-24'>
      <motion.div
        variants={heroContainer}
        initial='hidden'
        animate='visible'
        className='flex w-full flex-col'>
        <motion.div
          style={reduced ? undefined : { y: memojiY, opacity: memojiOpacity }}
          className='flex flex-col items-center'>
          <motion.div
            variants={reduced ? reducedFadeUpBlur : memojiVariants}
            className='relative mt-12 aspect-square w-[min(58vw,258px)] sm:mt-16'>
            {/* The glow is sized off the avatar rather than a fixed box, so it
                scales with it on every viewport. */}
            <div
              aria-hidden='true'
              className={`${classes['image-wrapper']} pointer-events-none absolute inset-[-32%]`}
            />
            <Image
              src='/me@3x.png'
              alt={`${HERO.name}'s memoji`}
              fill
              priority
              sizes='(max-width: 640px) 58vw, 258px'
              className='relative z-10 object-contain'
            />

            {/* The greeting is anchored to the memoji rather than to the page,
                so it tracks the avatar at every width instead of drifting off
                to one side. Centred above it on phones; up and to the right,
                with the arrow sweeping back down at the avatar, once there is
                room for the arrow. */}
            <motion.div
              variants={item}
              className='absolute bottom-full left-1/2 flex -translate-x-1/2 items-end gap-1 pb-2 font-[family-name:var(--font-preahvihear)] whitespace-nowrap sm:left-[55%] sm:translate-x-0 sm:pb-1'>
              <ArrowDoodle className='hidden h-12 w-16 shrink-0 text-white/40 sm:block' />
              <p className='text-base text-white sm:mb-7 sm:text-lg'>
                {HERO.greeting}{' '}
                <span className='text-violet-300'>{HERO.name}</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { y: textY }}
          className='mt-10 text-center md:mt-14'>
          <motion.h1
            variants={item}
            className='min-h-[2.4em] text-3xl font-bold text-white sm:min-h-[1.2em] sm:text-4xl md:text-5xl lg:text-6xl'>
            I&apos;m a <Typewriter words={HERO.roles} />
          </motion.h1>

          <motion.p variants={item} className='mt-4 text-sm text-white/70 md:text-base'>
            {HERO.currentRolePrefix}{' '}
            <a
              href={HERO.company.href}
              className='font-medium text-violet-300 underline-offset-4 transition-colors hover:text-violet-200 hover:underline'>
              {HERO.company.name}
            </a>
          </motion.p>

          <motion.p
            variants={item}
            className='mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/60 md:text-base'>
            {HERO.bio}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
