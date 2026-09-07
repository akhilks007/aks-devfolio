'use client';

import { useEffect } from 'react';

// Locks body scroll while `locked` is true, restoring the previous inline
// style on release. Paired with `scrollbar-gutter: stable` in globals.css so
// no layout shift or scrollbar-width compensation is needed.
export default function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
