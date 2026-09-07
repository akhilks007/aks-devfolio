'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { SocialIconKey } from './nav-items';

type IconProps = {
  className?: string;
};

// The three subpaths baked into /public/logo.svg's single <path>, split out so
// each stroke can draw itself in on mount via animated pathLength.
const LOGO_PATHS = ['M0 2h35', 'M0 40.552h35', 'M21.438 2 7 20.828 21.438 41'];

export function LogoMark({ className }: IconProps) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox='0 0 35 43'
      fill='none'
      aria-hidden='true'
      focusable='false'
      className={className}>
      {LOGO_PATHS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke='currentColor'
          strokeWidth={4}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }
          }
        />
      ))}
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' focusable='false' className={className}>
      <path d='M12 .5C5.73.5.5 5.73.5 12.02c0 5.03 3.26 9.3 7.79 10.8.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5Z' />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' focusable='false' className={className}>
      <path d='M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z' />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' focusable='false' className={className}>
      <path d='M18.24 2.25h3.32l-7.26 8.3 8.54 11.2h-6.68l-5.23-6.84-5.99 6.84H1.62l7.76-8.88L1.2 2.25h6.85l4.73 6.25 5.46-6.25Zm-1.17 17.5h1.84L7.01 4.14H5.03l12.04 15.61Z' />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' focusable='false' className={className}>
      <path d='M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.5 7.8 6.24L19.8 6H4.2ZM20 7.68l-7.38 5.9a1 1 0 0 1-1.24 0L4 7.68V18h16V7.68Z' />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<SocialIconKey, (props: IconProps) => React.JSX.Element> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  mail: MailIcon,
};

export function SocialIcon({ icon, className }: { icon: SocialIconKey } & IconProps) {
  const Icon = SOCIAL_ICON_MAP[icon];
  return <Icon className={className} />;
}
