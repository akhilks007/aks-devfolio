// Single source of truth for hero copy. Plain data, so no "use client" — this
// module is imported by both the client Hero and the server layout's metadata.
//
// TODO: swap `company` for the real employer before shipping.

export const HERO = {
  greeting: 'Hello! I Am',
  name: 'Akhil',
  /**
   * Cycled by <Typewriter />. The first entry doubles as the static fallback
   * for reduced-motion users and as the accessible headline, so keep the most
   * accurate title first.
   */
  roles: [
    'React Developer.',
    'Frontend Engineer.',
    'UI Craftsman.',
  ],
  currentRolePrefix: 'Currently, I’m a Frontend Engineer at',
  company: { name: 'Acme Corp', href: '#' },
  bio:
    'A React developer building fast, accessible interfaces for the web. ' +
    'I work day to day in React, Next.js and TypeScript, turning design ' +
    'systems into components that stay maintainable long after launch.',
} as const;

export const SITE_TITLE = `${HERO.name} — ${HERO.roles[0].replace('.', '')}`;
export const SITE_DESCRIPTION = HERO.bio;
