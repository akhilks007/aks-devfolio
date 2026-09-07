'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

type BackgroundFXProps = {
  /** Periodic streaks crossing the viewport. */
  comets?: boolean;
  /** Violet gradient blob that trails the mouse. */
  spotlight?: boolean;
  /** Average gap between comet spawns; each wait is jittered ±40%. */
  cometIntervalMs?: number;
  /** Ceiling on comets alive at once, so a slow tab can't pile them up. */
  maxComets?: number;
  /** Diameter of the mouse gradient, in rem. See SPOTLIGHT_SIZE_REM. */
  spotlightSizeRem?: number;
};

type Comet = {
  id: number;
  /** Spawn point, in viewport percentages. */
  startX: number;
  startY: number;
  /** Travel distance in px, applied down-right along the streak's own angle. */
  distance: number;
  angleDeg: number;
  lengthPx: number;
  durationS: number;
};

const SPOTLIGHT_SPRING = { stiffness: 150, damping: 22, mass: 0.5 };

// ─────────────────────────────────────────────────────────────────────────────
// MOUSE-GRADIENT RADIUS — change this one number (rem). It is the blob's full
// diameter; the centring offset is derived from it, so nothing else to touch.
// 16 = tight, 24 = current, 40 = broad wash. Override per-mount with the
// `spotlightSizeRem` prop. For softness rather than size, edit `blur-3xl` on
// the blob's className below; for intensity, `bg-violet-600/20`.
// ─────────────────────────────────────────────────────────────────────────────
const SPOTLIGHT_SIZE_REM = 24;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

let nextCometId = 0;

function createComet(): Comet {
  // Comets enter from the top edge or the left edge and travel down-right, so
  // they always cross the viewport rather than clipping a corner.
  const fromTop = Math.random() < 0.6;

  return {
    id: nextCometId++,
    startX: fromTop ? randomBetween(-10, 80) : randomBetween(-15, -5),
    startY: fromTop ? randomBetween(-15, -5) : randomBetween(-5, 60),
    distance: randomBetween(900, 1700),
    angleDeg: randomBetween(25, 48),
    lengthPx: randomBetween(90, 200),
    durationS: randomBetween(1.6, 2.8),
  };
}

export default function BackgroundFX({
  comets = true,
  spotlight = true,
  cometIntervalMs = 9000,
  maxComets = 3,
  spotlightSizeRem = SPOTLIGHT_SIZE_REM,
}: BackgroundFXProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Comet[]>([]);

  const cometsOn = comets && !reduced;
  const spotlightOn = spotlight && !reduced;

  const spawnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!cometsOn) {
      setActive([]);
      return;
    }

    function schedule() {
      const jitter = randomBetween(0.6, 1.4);
      spawnTimer.current = setTimeout(() => {
        // A hidden tab doesn't paint, so spawning there would just queue up a
        // burst that all fires at once on return.
        if (!document.hidden) {
          setActive((prev) =>
            prev.length >= maxComets ? prev : [...prev, createComet()],
          );
        }
        schedule();
      }, cometIntervalMs * jitter);
    }

    schedule();

    return () => {
      if (spawnTimer.current) clearTimeout(spawnTimer.current);
    };
  }, [cometsOn, cometIntervalMs, maxComets]);

  const removeComet = useCallback((id: number) => {
    setActive((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Pointer spotlight. This layer is `fixed inset-0`, so clientX/clientY are
  // already layer-local — no getBoundingClientRect needed, same as Header.
  const glowX = useMotionValue(-1000);
  const glowY = useMotionValue(-1000);
  const glowOpacity = useMotionValue(0);
  const springGlowX = useSpring(glowX, SPOTLIGHT_SPRING);
  const springGlowY = useSpring(glowY, SPOTLIGHT_SPRING);

  useEffect(() => {
    if (!spotlightOn) {
      glowOpacity.set(0);
      return;
    }

    function handlePointerMove(e: PointerEvent) {
      if (e.pointerType !== 'mouse') return;
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      glowOpacity.set(1);
    }

    function handlePointerLeave() {
      glowOpacity.set(0);
    }

    // The layer itself is pointer-events-none, so the listener has to live on
    // the window to see anything.
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [spotlightOn, glowX, glowY, glowOpacity]);

  return (
    <div
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
      {spotlightOn && (
        <motion.div
          style={{
            x: springGlowX,
            y: springGlowY,
            opacity: glowOpacity,
            width: `${spotlightSizeRem}rem`,
            height: `${spotlightSizeRem}rem`,
            // pulled back by half the diameter so the blob is centred on the
            // cursor rather than hanging off its bottom-right
            marginLeft: `-${spotlightSizeRem / 2}rem`,
            marginTop: `-${spotlightSizeRem / 2}rem`,
          }}
          className='absolute top-0 left-0 hidden rounded-full bg-violet-600/20 blur-3xl transition-opacity duration-500 pointer-fine:block'
        />
      )}

      {active.map((comet) => (
        <motion.div
          key={comet.id}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: comet.distance * Math.cos((comet.angleDeg * Math.PI) / 180),
            y: comet.distance * Math.sin((comet.angleDeg * Math.PI) / 180),
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: comet.durationS,
            ease: 'linear',
            opacity: { times: [0, 0.12, 0.75, 1], duration: comet.durationS },
          }}
          onAnimationComplete={() => removeComet(comet.id)}
          style={{
            left: `${comet.startX}%`,
            top: `${comet.startY}%`,
            width: comet.lengthPx,
            rotate: comet.angleDeg,
          }}
          className='absolute h-px origin-left bg-gradient-to-r from-transparent via-violet-300/60 to-white/90'
        />
      ))}
    </div>
  );
}
