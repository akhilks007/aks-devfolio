'use client';

import { useEffect, useState } from 'react';
import { SECTION_IDS } from './nav-items';

// Tracks which section is currently "in reading position" beneath the fixed
// header. `ids` defaults to the shared module-level SECTION_IDS constant —
// callers should not pass an inline array literal, or the effect below
// re-subscribes every render and thrashes the observer.
export default function useActiveSection(ids: readonly string[] = SECTION_IDS) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const headerH =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * 16 || 64;

    // Ranked by visible pixel height inside the reading band, not
    // intersectionRatio — a tall section that fills the band reports a low
    // ratio while a short section reports 1.0, which would pick the wrong
    // "most visible" section.
    const visiblePx = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visiblePx.set(entry.target.id, entry.isIntersecting ? entry.intersectionRect.height : 0);
        }
        let bestId = '';
        let bestPx = 0;
        for (const section of sections) {
          const px = visiblePx.get(section.id) ?? 0;
          if (px > bestPx) {
            bestPx = px;
            bestId = section.id;
          }
        }
        if (bestId) setActive(bestId);
      },
      {
        rootMargin: `-${Math.round(headerH + 8)}px 0px -55% 0px`,
        threshold: [0, 0.02, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Edge cases an IntersectionObserver band can't express: the very top of
    // the page (before #home's threshold engages) and the very bottom (a
    // short last section, e.g. #contact, can never dominate the band).
    function handleScroll() {
      if (window.scrollY < 8) {
        setActive(ids[0]);
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ids]);

  return active;
}
